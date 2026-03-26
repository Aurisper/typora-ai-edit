  // ===================== Feishu: Title & Utility =====================

  async function generateTitle(docContent, cfg) {
    var sysPrompt = isChinese
      ? "你是一位标题生成助手。请根据文档内容生成一个简洁、准确的标题。只返回标题本身，不要任何解释、引号或标点。最长20个字。"
      : "You are a title generator. Generate a concise, accurate title for the document. Return only the title itself, no quotes, explanations, or punctuation. Max 15 words.";
    var userPrompt = docContent.slice(0, 3000);

    var title = await callAPI(sysPrompt, userPrompt, { ...cfg, _onChunk: null, web_search: false });
    title = title.replace(/^["'"""'']+|["'"""'']+$/g, "").trim();
    if (!title) title = isChinese ? "未命名文档" : "Untitled Document";
    if (title.length > 60) title = title.slice(0, 60);
    return title;
  }

  function simpleHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  // ===================== Feishu: Archive Flow & UI =====================

  async function archiveToFeishu() {
    var docContent = getDocumentText();
    if (!docContent || !docContent.trim()) {
      showToast(L.feishuNoContent, "error");
      return;
    }

    var creds = loadFeishuCredentials();
    if (!creds) {
      showToast(L.feishuNoCreds, "error", 5000);
      return;
    }

    var cfg = loadConfig();
    var filePath = (window.File && window.File.filePath) || null;
    var sessionKey = filePath || ("unsaved-" + simpleHash(docContent.slice(0, 200)));
    var progress = showFeishuProgress();
    var progressEl = progress.el;
    var signal = progress.signal;

    try {
      updateFeishuProgress(progressEl, L.feishuStepTitle, 1);
      var title = await generateTitle(docContent, cfg);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      pluginLog("info", "Feishu: title generated: " + title);

      updateFeishuProgress(progressEl, L.feishuStepConvert, 2);
      var docxBlob = convertToDocxBlob(docContent);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      pluginLog("info", "Feishu: DOCX blob created: " + docxBlob.size + " bytes");

      updateFeishuProgress(progressEl, L.feishuStepAuth, 3);
      var token = await getFeishuTenantToken(signal);

      var session = getFeishuSession(sessionKey);
      if (session && session.feishu_doc_token) {
        updateFeishuProgress(progressEl, L.feishuStepDelete, 3);
        await feishuDeleteDoc(token, session.feishu_doc_token);
      }

      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      updateFeishuProgress(progressEl, L.feishuStepUpload, 4);
      var fileToken = await feishuUploadBlob(token, docxBlob, title + ".docx", signal);
      pluginLog("info", "Feishu: uploaded, file_token: " + fileToken);

      var folderToken = (cfg.feishu && cfg.feishu.target_folder) || "";
      updateFeishuProgress(progressEl, L.feishuStepImport, 5);
      var ticket = await feishuCreateImportTask(token, fileToken, title, folderToken, signal);
      pluginLog("info", "Feishu: import task created, ticket: " + ticket);

      updateFeishuProgress(progressEl, L.feishuStepPoll, 5);
      var result = await feishuPollImportResult(token, ticket, signal);
      pluginLog("info", "Feishu: import done, url: " + result.url);

      setFeishuSession(sessionKey, {
        title: title,
        feishu_doc_token: result.token,
        feishu_doc_url: result.url,
        last_archived_at: new Date().toISOString(),
        content_cache: docContent.slice(0, 5000),
        full_content: docContent,
      });

      removeFeishuProgress(progressEl);
      showFeishuSuccess(title, result.url);

    } catch (e) {
      removeFeishuProgress(progressEl);
      if (e.name === "AbortError") {
        pluginLog("info", "Feishu archive stopped by user");
        showToast(L.feishuStopped, "info");
      } else {
        pluginLog("error", "Feishu archive failed: " + e.message);
        showToast(L.feishuFailed + e.message, "error", 5000);
      }
    }
  }

  // ===================== Feishu progress UI =====================

  function showFeishuProgress() {
    var old = document.getElementById("ai-feishu-progress");
    if (old) old.remove();

    var ac = new AbortController();

    var el = document.createElement("div");
    el.id = "ai-feishu-progress";
    el.className = "ai-feishu-progress";
    el.innerHTML =
      '<div class="ai-feishu-progress-inner">' +
        '<div class="ai-feishu-title">' + escHTML(L.feishuArchiving) + '</div>' +
        '<div class="ai-feishu-steps">' +
          buildStepHTML(1) + buildStepHTML(2) + buildStepHTML(3) +
          buildStepHTML(4) + buildStepHTML(5) +
        '</div>' +
        '<div class="ai-feishu-status"></div>' +
        '<button class="ai-feishu-stop">' + escHTML(L.feishuStop) + '</button>' +
      '</div>';

    el.querySelector(".ai-feishu-stop").addEventListener("click", function () {
      ac.abort();
    });

    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    return { el: el, signal: ac.signal };
  }

  function buildStepHTML(n) {
    var labels = [L.feishuStepTitle, L.feishuStepConvert, L.feishuStepAuth,
                  L.feishuStepUpload, L.feishuStepImport];
    return '<div class="ai-feishu-step" data-step="' + n + '">' +
      '<span class="ai-feishu-step-dot"></span>' +
      '<span class="ai-feishu-step-label">' + escHTML(labels[n - 1]) + '</span></div>';
  }

  function updateFeishuProgress(el, msg, activeStep) {
    if (!el) return;
    var status = el.querySelector(".ai-feishu-status");
    if (status) status.textContent = msg;

    var steps = el.querySelectorAll(".ai-feishu-step");
    for (var i = 0; i < steps.length; i++) {
      var stepNum = parseInt(steps[i].getAttribute("data-step"));
      steps[i].classList.toggle("done", stepNum < activeStep);
      steps[i].classList.toggle("active", stepNum === activeStep);
    }
  }

  function removeFeishuProgress(el) {
    if (el) {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    }
  }

  function showFeishuSuccess(title, url) {
    var old = document.getElementById("ai-feishu-success");
    if (old) old.remove();

    var el = document.createElement("div");
    el.id = "ai-feishu-success";
    el.className = "ai-feishu-success";
    el.innerHTML =
      '<div class="ai-feishu-success-inner">' +
        '<div class="ai-feishu-success-icon">✓</div>' +
        '<div class="ai-feishu-success-title">' + escHTML(L.feishuDone) + '</div>' +
        '<div class="ai-feishu-success-doc">' + escHTML(title) + '</div>' +
        '<a class="ai-feishu-success-link" href="' + escHTML(url) + '" target="_blank">' +
          escHTML(L.feishuOpenDoc) + '</a>' +
        '<div class="ai-feishu-success-actions">' +
          '<button class="ai-feishu-btn-copy">' + escHTML(L.feishuCopyLink) + '</button>' +
          '<button class="ai-feishu-btn-close">' + escHTML(L.closeBtn) + '</button>' +
        '</div>' +
      '</div>';

    el.querySelector(".ai-feishu-btn-copy").addEventListener("click", function () {
      writeToClipboard(url);
      showToast(L.copied, "success");
    });
    el.querySelector(".ai-feishu-btn-close").addEventListener("click", function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    });

    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
  }

  // ===================== Feishu Document Manager =====================

  var _docMgrState = { query: "", page: 1 };
  var DOC_PAGE_SIZE = 10;

  function showFeishuDocManager() {
    var old = document.querySelector(".ai-edit-overlay.ai-docmgr-overlay");
    if (old) old.remove();

    _docMgrState = { query: "", page: 1 };

    var overlay = document.createElement("div");
    overlay.className = "ai-edit-overlay ai-docmgr-overlay";

    var panel = document.createElement("div");
    panel.className = "ai-edit-panel ai-docmgr-panel";

    var header = document.createElement("div");
    header.className = "ai-edit-panel-header";
    header.innerHTML =
      '<h3>' + escHTML(L.feishuDocManager) + '</h3>' +
      '<button class="ai-edit-close">&times;</button>';

    var searchBar = document.createElement("div");
    searchBar.className = "ai-docmgr-search";
    searchBar.innerHTML =
      '<input type="text" class="ai-docmgr-search-input" placeholder="' + escHTML(L.feishuDocSearch) + '">';

    var body = document.createElement("div");
    body.className = "ai-edit-panel-body ai-docmgr-body";

    panel.appendChild(header);
    panel.appendChild(searchBar);
    panel.appendChild(body);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    var searchInput = searchBar.querySelector(".ai-docmgr-search-input");
    var debounceTimer = null;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        _docMgrState.query = searchInput.value.trim();
        _docMgrState.page = 1;
        renderDocList(body);
      }, 200);
    });

    renderDocList(body);

    header.querySelector(".ai-edit-close").addEventListener("click", function () {
      overlay.remove();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  function filterDocs(sessions, keys, query) {
    if (!query) {
      return keys.map(function (k) { return { key: k, matchType: null }; });
    }
    var q = query.toLowerCase();
    var results = [];
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var s = sessions[k];
      var title = (s.title || k).toLowerCase();
      if (title.indexOf(q) >= 0) {
        results.push({ key: k, matchType: "title" });
      } else if (s.content_cache && s.content_cache.toLowerCase().indexOf(q) >= 0) {
        results.push({ key: k, matchType: "content" });
      }
    }
    return results;
  }

  function renderDocList(container) {
    var sessions = loadFeishuSessions();
    var keys = Object.keys(sessions);

    keys.sort(function (a, b) {
      var ta = sessions[a].last_archived_at || "";
      var tb = sessions[b].last_archived_at || "";
      return tb.localeCompare(ta);
    });

    var filtered = filterDocs(sessions, keys, _docMgrState.query);
    var totalCount = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalCount / DOC_PAGE_SIZE));
    if (_docMgrState.page > totalPages) _docMgrState.page = totalPages;
    var start = (_docMgrState.page - 1) * DOC_PAGE_SIZE;
    var pageItems = filtered.slice(start, start + DOC_PAGE_SIZE);

    if (keys.length === 0) {
      container.innerHTML = '<div class="ai-docmgr-empty">' + escHTML(L.feishuDocEmpty) + '</div>';
      return;
    }

    if (totalCount === 0) {
      container.innerHTML = '<div class="ai-docmgr-empty">' + escHTML(L.feishuDocNoMatch) + '</div>';
      return;
    }

    var html = '<div class="ai-docmgr-status">' +
      escHTML(L.feishuDocCount.replace("{count}", totalCount)) + '</div>';
    html += '<div class="ai-docmgr-list">';

    for (var i = 0; i < pageItems.length; i++) {
      var item = pageItems[i];
      var key = item.key;
      var s = sessions[key];
      var title = s.title || key;
      var url = s.feishu_doc_url || "";
      var time = s.last_archived_at ? formatDocTime(s.last_archived_at) : "";
      var localName = key.indexOf("/") >= 0 ? key.slice(key.lastIndexOf("/") + 1) : key;

      html += '<div class="ai-docmgr-item" data-key="' + escHTML(key) + '">';
      html += '<div class="ai-docmgr-item-main">';
      html += '<div class="ai-docmgr-item-title">';
      if (url) {
        html += '<a href="' + escHTML(url) + '" target="_blank" class="ai-docmgr-link">' + escHTML(title) + '</a>';
      } else {
        html += '<span>' + escHTML(title) + '</span>';
      }
      if (item.matchType) {
        var badge = item.matchType === "title" ? L.feishuDocMatchTitle : L.feishuDocMatchContent;
        html += '<span class="ai-docmgr-badge ai-docmgr-badge-' + item.matchType + '">' + escHTML(badge) + '</span>';
      }
      html += '</div>';
      html += '<div class="ai-docmgr-item-meta">';
      if (time) html += '<span class="ai-docmgr-time">' + escHTML(L.feishuDocTime + time) + '</span>';
      html += '<span class="ai-docmgr-local">' + escHTML(localName) + '</span>';
      html += '</div>';
      html += '</div>';
      html += '<div class="ai-docmgr-actions">';
      html += '<button class="ai-docmgr-edit" data-key="' + escHTML(key) + '">' +
              escHTML(L.feishuDocEdit) + '</button>';
      html += '<button class="ai-docmgr-del" data-key="' + escHTML(key) + '" title="' + escHTML(L.feishuDocDelete) + '">' +
              escHTML(L.feishuDocDelete) + '</button>';
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';

    if (totalPages > 1) {
      var pageInfo = L.feishuDocPageInfo
        .replace("{page}", _docMgrState.page)
        .replace("{total}", totalPages);
      html += '<div class="ai-docmgr-pager">';
      html += '<button class="ai-docmgr-pager-btn ai-docmgr-prev"' +
        (_docMgrState.page <= 1 ? ' disabled' : '') + '>' + escHTML(L.feishuDocPrev) + '</button>';
      html += '<span class="ai-docmgr-pager-info">' + escHTML(pageInfo) + '</span>';
      html += '<button class="ai-docmgr-pager-btn ai-docmgr-next"' +
        (_docMgrState.page >= totalPages ? ' disabled' : '') + '>' + escHTML(L.feishuDocNext) + '</button>';
      html += '</div>';
    }

    container.innerHTML = html;

    var prevBtn = container.querySelector(".ai-docmgr-prev");
    var nextBtn = container.querySelector(".ai-docmgr-next");
    if (prevBtn) prevBtn.addEventListener("click", function () {
      if (_docMgrState.page > 1) { _docMgrState.page--; renderDocList(container); }
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      if (_docMgrState.page < totalPages) { _docMgrState.page++; renderDocList(container); }
    });

    container.querySelectorAll(".ai-docmgr-edit").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-key");
        handleDocEdit(btn, k);
      });
    });

    container.querySelectorAll(".ai-docmgr-del").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-key");
        var sess = loadFeishuSessions()[k];
        if (!sess) return;
        var msg = L.feishuDocConfirmDelete.replace("{title}", sess.title || k);
        if (!confirm(msg)) return;
        handleDocDelete(btn, k, container);
      });
    });
  }

  async function handleDocDelete(btn, sessionKey, container) {
    btn.textContent = L.feishuDocDeleting;
    btn.disabled = true;

    try {
      var sessions = loadFeishuSessions();
      var session = sessions[sessionKey];

      if (session && session.feishu_doc_token) {
        var token = await getFeishuTenantToken();
        await feishuDeleteDoc(token, session.feishu_doc_token);
      }

      delete sessions[sessionKey];
      saveFeishuSessions(sessions);
      pluginLog("info", "Feishu doc removed: " + (session && session.title || sessionKey));
      showToast(L.feishuDocDeleted, "success");
      renderDocList(container);
    } catch (e) {
      pluginLog("error", "Feishu doc delete failed: " + e.message);
      showToast(L.feishuDocDeleteFail + e.message, "error", 4000);
      btn.textContent = L.feishuDocDelete;
      btn.disabled = false;
    }
  }

  function formatDocTime(iso) {
    try {
      var d = new Date(iso);
      var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
      return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
        " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
    } catch (_) { return iso; }
  }

  // ===================== Feishu: Edit & Save-back =====================

  var _feishuEditState = null;

  function handleDocEdit(btn, sessionKey) {
    var sessions = loadFeishuSessions();
    var session = sessions[sessionKey];
    if (!session) return;

    var content = session.full_content || session.content_cache || "";
    if (!content) {
      showToast(L.feishuDocEditNoContent, "error", 3000);
      return;
    }

    btn.textContent = L.feishuDocEditing;
    btn.disabled = true;

    try {
      var fs = null;
      try { fs = (window.reqnode || require)("fs"); } catch (_) {}

      var filePath = (window.File && window.File.filePath) || null;

      if (filePath && fs) {
        fs.writeFileSync(filePath, content, "utf8");
      } else if (fs) {
        var os = null;
        try { os = (window.reqnode || require)("os"); } catch (_) {}
        var tmpDir = (os && os.tmpdir()) || "/tmp";
        var safeName = (session.title || "feishu-doc").replace(/[^\w\u4e00-\u9fff-]/g, "_");
        filePath = tmpDir + "/" + safeName + ".md";
        fs.writeFileSync(filePath, content, "utf8");
        if (window.File && typeof window.File.editor !== "undefined") {
          window.open("file://" + filePath);
        }
      }

      if (filePath) {
        _feishuEditState = {
          sessionKey: sessionKey,
          title: session.title,
          feishu_doc_token: session.feishu_doc_token,
          feishu_doc_url: session.feishu_doc_url,
        };

        setTimeout(function () {
          try {
            if (window.File && typeof window.File.reloadContent === "function") {
              window.File.reloadContent(true, function () {});
            } else if (window.File && window.File.editor && typeof window.File.editor.reload === "function") {
              window.File.editor.reload();
            }
          } catch (_) {}
        }, 200);

        showFeishuEditBar();

        var overlay = document.querySelector(".ai-edit-overlay.ai-docmgr-overlay");
        if (overlay) overlay.remove();

        pluginLog("info", "Feishu doc loaded for editing: " + session.title);
        showToast(L.feishuDocEditLoaded, "success");
      }
    } catch (e) {
      pluginLog("error", "Feishu doc edit load failed: " + e.message);
      showToast(L.feishuDocEditFail + e.message, "error", 4000);
      btn.textContent = L.feishuDocEdit;
      btn.disabled = false;
    }
  }

  function showFeishuEditBar() {
    removeFeishuEditBar();
    if (!_feishuEditState) return;

    var bar = document.createElement("div");
    bar.id = "ai-feishu-edit-bar";
    bar.className = "ai-feishu-edit-bar";
    bar.innerHTML =
      '<span class="ai-feishu-edit-bar-text">' +
        escHTML(L.feishuDocSaveBackTip.replace("{title}", _feishuEditState.title)) +
      '</span>' +
      '<div class="ai-feishu-edit-bar-actions">' +
        '<button class="ai-feishu-edit-bar-save">' + escHTML(L.feishuDocSaveBack) + '</button>' +
        '<button class="ai-feishu-edit-bar-close">&times;</button>' +
      '</div>';

    bar.querySelector(".ai-feishu-edit-bar-save").addEventListener("click", function () {
      saveBackToFeishu();
    });
    bar.querySelector(".ai-feishu-edit-bar-close").addEventListener("click", function () {
      _feishuEditState = null;
      removeFeishuEditBar();
    });

    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add("show"); });
  }

  function removeFeishuEditBar() {
    var bar = document.getElementById("ai-feishu-edit-bar");
    if (bar) bar.remove();
  }

  async function saveBackToFeishu() {
    if (!_feishuEditState) return;

    var docContent = getDocumentText();
    if (!docContent || !docContent.trim()) {
      showToast(L.feishuNoContent, "error");
      return;
    }

    var creds = loadFeishuCredentials();
    if (!creds) {
      showToast(L.feishuNoCreds, "error", 5000);
      return;
    }

    var cfg = loadConfig();
    var editState = _feishuEditState;
    var progress = showFeishuProgress();
    var progressEl = progress.el;
    var signal = progress.signal;

    try {
      updateFeishuProgress(progressEl, L.feishuStepConvert, 2);
      var docxBlob = convertToDocxBlob(docContent);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");

      updateFeishuProgress(progressEl, L.feishuStepAuth, 3);
      var token = await getFeishuTenantToken(signal);

      if (editState.feishu_doc_token) {
        updateFeishuProgress(progressEl, L.feishuStepDelete, 3);
        await feishuDeleteDoc(token, editState.feishu_doc_token);
      }

      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      updateFeishuProgress(progressEl, L.feishuStepUpload, 4);
      var fileToken = await feishuUploadBlob(token, docxBlob, editState.title + ".docx", signal);

      var folderToken = (cfg.feishu && cfg.feishu.target_folder) || "";
      updateFeishuProgress(progressEl, L.feishuStepImport, 5);
      var ticket = await feishuCreateImportTask(token, fileToken, editState.title, folderToken, signal);

      updateFeishuProgress(progressEl, L.feishuStepPoll, 5);
      var result = await feishuPollImportResult(token, ticket, signal);

      setFeishuSession(editState.sessionKey, {
        title: editState.title,
        feishu_doc_token: result.token,
        feishu_doc_url: result.url,
        last_archived_at: new Date().toISOString(),
        content_cache: docContent.slice(0, 5000),
        full_content: docContent,
      });

      _feishuEditState.feishu_doc_token = result.token;
      _feishuEditState.feishu_doc_url = result.url;

      removeFeishuProgress(progressEl);
      showToast(L.feishuDocSaved, "success");
      pluginLog("info", "Feishu doc updated: " + editState.title + " → " + result.url);

    } catch (e) {
      removeFeishuProgress(progressEl);
      if (e.name === "AbortError") {
        pluginLog("info", "Feishu save-back stopped by user");
        showToast(L.feishuStopped, "info");
      } else {
        pluginLog("error", "Feishu save-back failed: " + e.message);
        showToast(L.feishuFailed + e.message, "error", 5000);
      }
    }
  }
