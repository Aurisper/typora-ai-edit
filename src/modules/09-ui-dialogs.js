  // ===================== Prompt Dialog Helpers =====================

  function buildPromptDialogHTML(title, label, placeholder, inputId, cfg, opts) {
    opts = opts || {};
    var extra = opts.extraCheckboxes || "";
    var caps = getModelCapabilities(cfg);
    var webDisabled = cfg.provider === "openai_compat" && !caps.web_search;

    return '<div class="ai-prompt-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(title) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-prompt-body">' +
      "<label id='ai-stream-label'>" + escHTML(label) + "</label>" +
      '<textarea id="' + inputId + '" rows="5" placeholder="' + escHTML(placeholder) + '"></textarea>' +
      '<div class="ai-prompt-options" id="ai-stream-options">' +
      '<label class="ai-prompt-checkbox" style="' + (webDisabled ? "opacity:.4" : "") + '"><input type="checkbox" id="ai-prompt-web" ' +
      (cfg.web_search && !webDisabled ? "checked" : "") +
      (webDisabled ? " disabled" : "") +
      "> " + escHTML(L.webSearch) + "</label>" +
      extra +
      "</div>" +
      "</div>" +
      '<div class="ai-edit-panel-footer" id="ai-stream-footer">' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn primary" data-action="go">' + escHTML(L.start) + '</button>' +
      "</div>" +
      "</div>";
  }

  function transformToStreaming(overlay, inputId) {
    var inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.readOnly = true;
      inputEl.value = L.streamWaiting;
      inputEl.style.fontFamily = "-apple-system,BlinkMacSystemFont,sans-serif";
      inputEl.style.fontSize = "13px";
      inputEl.style.lineHeight = "1.6";
      inputEl.rows = 12;
      inputEl.style.color = "inherit";
      inputEl.style.cursor = "default";
    }
    var optionsEl = document.getElementById("ai-stream-options");
    if (optionsEl) optionsEl.style.display = "none";
    var labelEl = document.getElementById("ai-stream-label");
    if (labelEl) labelEl.style.display = "none";

    var footer = document.getElementById("ai-stream-footer");
    if (footer) {
      footer.innerHTML =
        '<button class="ai-btn secondary" data-action="stop" style="background:#d93025;color:#fff">' + escHTML(L.stop) + '</button>' +
        '<div class="ai-edit-spacer"></div>';
    }

    return {
      outputEl: inputEl,
      started: false,
      append: function (delta) {
        if (!this.started) {
          this.started = true;
          if (this.outputEl) this.outputEl.value = "";
        }
        if (this.outputEl) {
          this.outputEl.value += delta;
          this.outputEl.scrollTop = this.outputEl.scrollHeight;
        }
      },
      showResult: function (confirmLabel, extraButtons) {
        if (footer) {
          var html = '<button class="ai-btn secondary" data-action="copy">' + escHTML(L.copyBtn) + '</button>' +
            '<div class="ai-edit-spacer"></div>' +
            '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>';
          if (extraButtons) html += extraButtons;
          html += '<button class="ai-btn primary" data-action="confirm">' + escHTML(confirmLabel) + '</button>';
          footer.innerHTML = html;
        }
        if (this.outputEl) {
          this.outputEl.readOnly = false;
          this.outputEl.style.cursor = "";
        }
      },
      showError: function (msg) {
        if (this.outputEl) {
          this.outputEl.value += "\n\n--- ERROR ---\n" + msg;
          this.outputEl.scrollTop = this.outputEl.scrollHeight;
          this.outputEl.style.color = "#d93025";
        }
        if (footer) {
          footer.innerHTML =
            '<div class="ai-edit-spacer"></div>' +
            '<button class="ai-btn primary" data-action="close">' + escHTML(L.confirmOk) + '</button>';
        }
      },
      getResult: function () {
        return this.outputEl ? this.outputEl.value : "";
      },
    };
  }

  // ===================== Optimize Prompt Dialog =====================

  function showPromptDialog(cfg, withContext) {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    var title = withContext ? L.optimizeCtxTitle : L.optimizeTitle;
    overlay.innerHTML = buildPromptDialogHTML(title, L.extraLabel, L.extraPlaceholder, "ai-prompt-input", cfg);
    document.body.appendChild(overlay);

    var inputEl = document.getElementById("ai-prompt-input");
    setTimeout(function () { inputEl.focus(); }, 50);

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        doGo();
      }
    });

    var running = false;
    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) { if (e.target === overlay && !running) overlay.remove(); return; }
      var act = btn.dataset.action;
      if (act === "close") { overlay.remove(); }
      else if (act === "go") { doGo(); }
      else if (act === "stop") { abortCurrentRequest(); }
      else if (act === "copy") { writeToClipboard(stream.getResult()); showToast(L.copied, "success"); }
      else if (act === "confirm") {
        var result = stream.getResult().trim();
        overlay.remove();
        if (result) {
          (async function () {
            await sleep(150);
            var ok = await restoreAndReplace(result);
            showToast(ok ? L.optDone : L.optReplaceFail, ok ? "success" : "error");
          })();
        }
      }
    });

    var stream;
    function doGo() {
      if (running) return;
      var extraPrompt = document.getElementById("ai-prompt-input").value.trim();
      var useWeb = document.getElementById("ai-prompt-web").checked;

      if (!savedSelection || !savedSelection.text) { showToast(L.selectFirst, "error"); return; }
      running = true;
      stream = transformToStreaming(overlay, "ai-prompt-input");

      var key = withContext ? "optimize_with_context" : "optimize";
      var prompts = cfg.prompts[key];
      if (!prompts) { stream.showError(L.promptMissing); running = false; return; }

      var selText = savedSelection.text;
      var docText = withContext ? getDocumentText() : "";
      var userPrompt = prompts.user.replace(/\{selection\}/g, selText).replace(/\{document\}/g, docText);
      if (extraPrompt) userPrompt = L.extraReq + extraPrompt + "\n\n" + userPrompt;

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      runCfg._onChunk = function (delta) { stream.append(delta); };

      callAPI(prompts.system, userPrompt, runCfg).then(function (result) {
        currentAbort = null;
        running = false;
        if (result && result.trim()) {
          stream.showResult(L.confirmReplace);
        } else {
          stream.showError(L.emptyResult);
        }
      }).catch(function (e) {
        currentAbort = null;
        running = false;
        if (e.name === "AbortError") {
          stream.showResult(L.confirmReplace);
        } else {
          pluginLog("error", "Optimize failed: " + e.message);
          stream.showError(e.message);
        }
      });
    }
  }

  // ===================== Image Prompt Dialog =====================

  function showImagePromptDialog(cfg) {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    overlay.innerHTML = buildPromptDialogHTML(L.imgTitle, L.imgLabel, L.imgPlaceholder, "ai-prompt-input", cfg);
    document.body.appendChild(overlay);

    var inputEl = document.getElementById("ai-prompt-input");
    setTimeout(function () { inputEl.focus(); }, 50);

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); doGo(); }
    });

    var running = false;
    var stream;
    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) { if (e.target === overlay && !running) overlay.remove(); return; }
      var act = btn.dataset.action;
      if (act === "close") { overlay.remove(); }
      else if (act === "go") { doGo(); }
      else if (act === "stop") { abortCurrentRequest(); }
      else if (act === "copy") { writeToClipboard(stream.getResult()); showToast(L.copied, "success"); }
      else if (act === "insert-img") {
        var result = stream.getResult().trim();
        if (result) insertAfterImage(result);
        overlay.remove();
      }
      else if (act === "confirm") {
        var result = stream.getResult().trim();
        if (result) { writeToClipboard(result); showToast(L.copied, "success"); }
        overlay.remove();
      }
    });

    async function doGo() {
      if (running) return;
      var extraPrompt = document.getElementById("ai-prompt-input").value.trim();
      var useWeb = document.getElementById("ai-prompt-web").checked;

      if (!savedImage) { showToast(L.noImage, "error"); return; }
      running = true;
      stream = transformToStreaming(overlay, "ai-prompt-input");

      var imageUrl = await getImageDataUrl(savedImage);
      if (!imageUrl) { stream.showError(L.imgReadFail); running = false; return; }
      imageUrl = await compressImageDataUrl(imageUrl);

      var prompts = cfg.prompts.describe_image || DEFAULT_CONFIG.prompts.describe_image;
      var systemPrompt, userPrompt;
      if (extraPrompt) {
        systemPrompt = isChinese
          ? "你是一位智能助手，请根据用户的指示分析图片并回答。"
          : "You are a helpful assistant. Analyze the image and respond according to the user's instructions.";
        userPrompt = extraPrompt;
      } else {
        systemPrompt = prompts.system;
        userPrompt = prompts.user;
      }

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      runCfg._onChunk = function (delta) { stream.append(delta); };

      callAPI(systemPrompt, userPrompt, runCfg, imageUrl).then(function (result) {
        currentAbort = null;
        running = false;
        if (result && result.trim()) {
          var insertBtn = '<button class="ai-btn primary" data-action="insert-img" style="margin-right:8px">' + escHTML(L.insertBtn) + '</button>';
          stream.showResult(L.copyBtn, insertBtn);
        } else {
          stream.showError(L.emptyResult);
        }
      }).catch(function (e) {
        currentAbort = null;
        running = false;
        if (e.name === "AbortError") {
          var insertBtn = '<button class="ai-btn primary" data-action="insert-img" style="margin-right:8px">' + escHTML(L.insertBtn) + '</button>';
          stream.showResult(L.copyBtn, insertBtn);
        } else {
          pluginLog("error", "Image analysis failed: " + e.message);
          stream.showError(e.message);
        }
      });
    }
  }
