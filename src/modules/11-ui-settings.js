  // ===================== Settings Panel =====================

  function showSettingsPanel() {
    const existing = document.getElementById("ai-edit-settings");
    if (existing) existing.remove();

    const cfg = loadConfig();
    const overlay = document.createElement("div");
    overlay.id = "ai-edit-settings";
    overlay.className = "ai-edit-overlay";

    var oauthOk = false;
    try { oauthOk = !!readToken(); } catch (_) {}

    var ocModelsHtml = "";
    var ocModels = (cfg.openai_compat && cfg.openai_compat.models) || [];
    if (ocModels.length > 0) {
      ocModelsHtml = '<div class="ai-edit-hint" style="margin-top:8px">';
      for (var mi = 0; mi < ocModels.length; mi++) {
        var mm = ocModels[mi];
        var badge = mm.available ? "\u2713" : "\u2717";
        var ws = mm.web_search ? " \uD83C\uDF10" : "";
        var vs = mm.vision ? " \uD83D\uDDBC" : "";
        ocModelsHtml += '<div style="font-size:12px;margin:2px 0;color:' +
          (mm.available ? "#0d904f" : "#d93025") + '">' +
          badge + " " + escHTML(mm.name) + ws + vs + "</div>";
      }
      ocModelsHtml += "</div>";
    }

    overlay.innerHTML =
      '<div class="ai-edit-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(L.settingsTitle) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-edit-panel-body">' +

      "<h4>" + escHTML(L.providerLabel) + "</h4>" +
      '<select id="ai-s-provider" class="ai-select">' +
      '<option value="chatgpt"' + (cfg.provider !== "openai_compat" ? " selected" : "") + '>' + escHTML(L.providerChatGPT) + '</option>' +
      '<option value="openai_compat"' + (cfg.provider === "openai_compat" ? " selected" : "") + '>' + escHTML(L.providerOpenAI) + '</option>' +
      '</select>' +

      '<div id="ai-s-chatgpt-section"' + (cfg.provider === "openai_compat" ? ' style="display:none"' : '') + '>' +
      '<div class="ai-provider-status" style="margin:8px 0;font-size:13px;color:' +
      (oauthOk ? "#0d904f" : "#d93025") + '">' +
      (oauthOk ? "\u2713 " + escHTML(L.oauthConnected) : "\u2717 " + escHTML(L.oauthDisconnected)) +
      "</div>" +
      '</div>' +

      '<div id="ai-s-openai-section"' + (cfg.provider !== "openai_compat" ? ' style="display:none"' : '') + '>' +
      "<label>" + escHTML(L.apiUrl) + "</label>" +
      '<input type="text" id="ai-s-oc-url" class="ai-text-input" placeholder="https://api.example.com/v1" value="' +
      escHTML(cfg.openai_compat.base_url || "") + '" />' +
      "<label>" + escHTML(L.apiKey) + "</label>" +
      '<input type="password" id="ai-s-oc-key" class="ai-text-input" value="' +
      escHTML(cfg.openai_compat.api_key || "") + '" />' +
      "<label>" + escHTML(L.modelsInput) + "</label>" +
      '<input type="text" id="ai-s-oc-models" class="ai-text-input" placeholder="gpt-4o, deepseek-v3, claude-3" value="' +
      escHTML(cfg.openai_compat.models_input || "") + '" />' +
      '<div style="margin-top:10px">' +
      '<button class="ai-btn primary" data-action="test-models">' + escHTML(L.saveAndTest) + '</button>' +
      '</div>' +
      '<div id="ai-test-log" style="display:none;margin-top:10px;max-height:200px;overflow-y:auto;background:var(--ai-bg,#f6f6f6);border:1px solid var(--ai-border,#ddd);border-radius:6px;padding:8px;font-family:monospace;font-size:11px;line-height:1.6;white-space:pre-wrap;color:var(--ai-fg,#333)"></div>' +
      ocModelsHtml +
      '</div>' +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +

      "<h4>" + escHTML(L.feat1) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-opt-sys" rows="3">' +
      escHTML(cfg.prompts.optimize.system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-opt-usr" rows="5">' +
      escHTML(cfg.prompts.optimize.user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelection) + '</p>' +
      "<h4>" + escHTML(L.feat2) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-sys" rows="3">' +
      escHTML(cfg.prompts.optimize_with_context.system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-usr" rows="5">' +
      escHTML(cfg.prompts.optimize_with_context.user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelDoc) + '</p>' +
      "<h4>" + escHTML(L.feat3) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-img-sys" rows="3">' +
      escHTML(cfg.prompts.describe_image.system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-img-usr" rows="3">' +
      escHTML(cfg.prompts.describe_image.user) +
      "</textarea>" +
      "<h4>" + escHTML(L.feat4) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-qa-sys" rows="3">' +
      escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qa-usr" rows="3">' +
      escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}" : "Available variables: {question}") + '</p>' +
      "<label>" + escHTML(L.sysPrompt) + " (" + escHTML(L.qaIncludeDoc) + ")</label>" +
      '<textarea id="ai-s-qac-sys" rows="3">' +
      escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qac-usr" rows="5">' +
      escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}, {document}" : "Available variables: {question}, {document}") + '</p>' +
      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.shortcutLabel) + "</h4>" +
      '<p class="ai-edit-hint">' + escHTML(L.shortcutHint) + '</p>' +
      '<div class="ai-shortcut-row">' +
      "<label>" + escHTML(L.shortcutQA) + "</label>" +
      '<input type="text" id="ai-s-sc-qa" class="ai-shortcut-input" readonly value="' +
      shortcutDisplay(cfg.shortcuts.qa) + '" />' +
      "</div>" +
      "</div>" +
      '<div class="ai-edit-panel-footer">' +
      '<button class="ai-btn secondary" data-action="reset">' + escHTML(L.resetDefaults) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<button class="ai-btn primary" data-action="save">' + escHTML(L.save) + '</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    var providerSel = document.getElementById("ai-s-provider");
    providerSel.addEventListener("change", function () {
      var isCG = providerSel.value !== "openai_compat";
      document.getElementById("ai-s-chatgpt-section").style.display = isCG ? "" : "none";
      document.getElementById("ai-s-openai-section").style.display = isCG ? "none" : "";
    });

    overlay.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target === overlay) overlay.remove();
        return;
      }
      const act = btn.dataset.action;
      if (act === "close") {
        overlay.remove();
      } else if (act === "test-models") {
        var testUrl = document.getElementById("ai-s-oc-url").value.trim();
        var testKey = document.getElementById("ai-s-oc-key").value.trim();
        var testInput = document.getElementById("ai-s-oc-models").value.trim();
        var modelsInputEl = document.getElementById("ai-s-oc-models");
        if (!testUrl || !testKey) {
          showToast(L.testMissingFields, "error", 3000);
          return;
        }
        btn.disabled = true;
        btn.style.opacity = ".5";
        var logEl = document.getElementById("ai-test-log");
        if (logEl) {
          logEl.style.display = "block";
          logEl.textContent = "";
        }
        function appendLog(msg) {
          if (!logEl) return;
          logEl.textContent += msg + "\n";
          logEl.scrollTop = logEl.scrollHeight;
        }
        (async function () {
          var names;
          if (testInput) {
            names = testInput.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
          } else {
            appendLog(L.testLogAutoFetch);
            try {
              var mResp = await fetch(testUrl.replace(/\/+$/, "") + "/models", {
                headers: { Authorization: "Bearer " + testKey },
              });
              if (mResp.ok) {
                var mData = await mResp.json();
                if (mData.data && mData.data.length > 0) {
                  names = mData.data.map(function (m) { return m.id; });
                  appendLog(L.testLogAutoFetchOk.replace("{count}", names.length));
                  var autoInput = names.join(", ");
                  modelsInputEl.value = autoInput;
                  testInput = autoInput;
                } else {
                  appendLog(L.testLogAutoFetchFail);
                  btn.disabled = false;
                  btn.style.opacity = "1";
                  return;
                }
              } else {
                appendLog(L.testLogAutoFetchFail + " (HTTP " + mResp.status + ")");
                btn.disabled = false;
                btn.style.opacity = "1";
                return;
              }
            } catch (fetchErr) {
              appendLog(L.testLogAutoFetchFail + " (" + fetchErr.message + ")");
              btn.disabled = false;
              btn.style.opacity = "1";
              return;
            }
          }
          try {
            var results = await testOpenAIModels(testUrl, testKey, names, appendLog);
            cfg.openai_compat.base_url = testUrl;
            cfg.openai_compat.api_key = testKey;
            cfg.openai_compat.models_input = testInput;
            cfg.openai_compat.models = results;
            var avail = results.filter(function (r) { return r.available; });
            if (avail.length > 0) {
              cfg.provider = "openai_compat";
              cfg.model = avail[0].name;
              appendLog("\n" + L.testLogComplete.replace("{count}", avail.length));
            } else {
              appendLog("\n" + L.allUnavailable);
            }
            saveConfig(cfg);
            btn.disabled = false;
            btn.style.opacity = "1";
            var oldOcModels = overlay.querySelector(".ai-edit-hint");
            if (oldOcModels) oldOcModels.remove();
            var newHtml = "";
            for (var ri = 0; ri < results.length; ri++) {
              var rm = results[ri];
              var rbadge = rm.available ? "\u2713" : "\u2717";
              var rws = rm.web_search ? " \uD83C\uDF10" : "";
              var rvs = rm.vision ? " \uD83D\uDDBC" : "";
              newHtml += '<div style="font-size:12px;margin:2px 0;color:' +
                (rm.available ? "#0d904f" : "#d93025") + '">' +
                rbadge + " " + escHTML(rm.name) + rws + rvs + "</div>";
            }
            if (newHtml) {
              var hintDiv = document.createElement("div");
              hintDiv.className = "ai-edit-hint";
              hintDiv.style.marginTop = "8px";
              hintDiv.innerHTML = newHtml;
              logEl.parentNode.insertBefore(hintDiv, logEl.nextSibling);
            }
          } catch (err) {
            appendLog("\n\u2717 " + L.allUnavailable + " (" + err.message + ")");
            btn.disabled = false;
            btn.style.opacity = "1";
          }
        })();
        return;
      } else if (act === "save") {
        cfg.provider = document.getElementById("ai-s-provider").value;
        if (cfg.provider === "openai_compat") {
          cfg.openai_compat.base_url = document.getElementById("ai-s-oc-url").value.trim();
          cfg.openai_compat.api_key = document.getElementById("ai-s-oc-key").value.trim();
          cfg.openai_compat.models_input = document.getElementById("ai-s-oc-models").value.trim();
        }
        cfg.prompts.optimize.system =
          document.getElementById("ai-s-opt-sys").value;
        cfg.prompts.optimize.user =
          document.getElementById("ai-s-opt-usr").value;
        cfg.prompts.optimize_with_context.system =
          document.getElementById("ai-s-ctx-sys").value;
        cfg.prompts.optimize_with_context.user =
          document.getElementById("ai-s-ctx-usr").value;
        cfg.prompts.describe_image.system =
          document.getElementById("ai-s-img-sys").value;
        cfg.prompts.describe_image.user =
          document.getElementById("ai-s-img-usr").value;
        if (!cfg.prompts.qa) cfg.prompts.qa = {};
        cfg.prompts.qa.system = document.getElementById("ai-s-qa-sys").value;
        cfg.prompts.qa.user = document.getElementById("ai-s-qa-usr").value;
        if (!cfg.prompts.qa_with_context) cfg.prompts.qa_with_context = {};
        cfg.prompts.qa_with_context.system = document.getElementById("ai-s-qac-sys").value;
        cfg.prompts.qa_with_context.user = document.getElementById("ai-s-qac-usr").value;
        var scQa = document.getElementById("ai-s-sc-qa")._shortcut;
        if (scQa) cfg.shortcuts.qa = scQa;
        saveConfig(cfg);
        overlay.remove();
        showToast(L.saved, "success");
      } else if (act === "reset") {
        document.getElementById("ai-s-opt-sys").value =
          DEFAULT_CONFIG.prompts.optimize.system;
        document.getElementById("ai-s-opt-usr").value =
          DEFAULT_CONFIG.prompts.optimize.user;
        document.getElementById("ai-s-ctx-sys").value =
          DEFAULT_CONFIG.prompts.optimize_with_context.system;
        document.getElementById("ai-s-ctx-usr").value =
          DEFAULT_CONFIG.prompts.optimize_with_context.user;
        document.getElementById("ai-s-img-sys").value =
          DEFAULT_CONFIG.prompts.describe_image.system;
        document.getElementById("ai-s-img-usr").value =
          DEFAULT_CONFIG.prompts.describe_image.user;
        document.getElementById("ai-s-qa-sys").value =
          DEFAULT_CONFIG.prompts.qa.system;
        document.getElementById("ai-s-qa-usr").value =
          DEFAULT_CONFIG.prompts.qa.user;
        document.getElementById("ai-s-qac-sys").value =
          DEFAULT_CONFIG.prompts.qa_with_context.system;
        document.getElementById("ai-s-qac-usr").value =
          DEFAULT_CONFIG.prompts.qa_with_context.user;
        var defQa = DEFAULT_CONFIG.shortcuts.qa;
        document.getElementById("ai-s-sc-qa").value = shortcutDisplay(defQa);
        document.getElementById("ai-s-sc-qa")._shortcut = defQa;
        showToast(L.restored, "info");
      }
    });

    initShortcutRecorder("ai-s-sc-qa", cfg.shortcuts.qa);
  }
