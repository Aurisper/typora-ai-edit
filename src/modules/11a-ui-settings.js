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
      '<textarea id="ai-s-opt-sys" rows="3">' + escHTML(cfg.prompts.optimize.system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-opt-usr" rows="5">' + escHTML(cfg.prompts.optimize.user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelection) + '</p>' +
      "<h4>" + escHTML(L.feat2) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-sys" rows="3">' + escHTML(cfg.prompts.optimize_with_context.system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-usr" rows="5">' + escHTML(cfg.prompts.optimize_with_context.user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelDoc) + '</p>' +
      "<h4>" + escHTML(L.feat3) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-img-sys" rows="3">' + escHTML(cfg.prompts.describe_image.system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-img-usr" rows="3">' + escHTML(cfg.prompts.describe_image.user) + "</textarea>" +
      "<h4>" + escHTML(L.feat4) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-qa-sys" rows="3">' + escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qa-usr" rows="3">' + escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}" : "Available variables: {question}") + '</p>' +
      "<label>" + escHTML(L.sysPrompt) + " (" + escHTML(L.qaIncludeDoc) + ")</label>" +
      '<textarea id="ai-s-qac-sys" rows="3">' + escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qac-usr" rows="5">' + escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}, {document}" : "Available variables: {question}, {document}") + '</p>' +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.shortcutLabel) + "</h4>" +
      '<p class="ai-edit-hint">' + escHTML(L.shortcutHint) + '</p>' +
      '<div class="ai-shortcut-row">' +
      "<label>" + escHTML(L.shortcutQA) + "</label>" +
      '<input type="text" id="ai-s-sc-qa" class="ai-shortcut-input" readonly value="' +
      shortcutDisplay(cfg.shortcuts.qa) + '" />' +
      "</div>" +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.tavilySection) + "</h4>" +
      "<label>" + escHTML(L.tavilyApiKey) + "</label>" +
      '<input type="password" id="ai-s-tavily-key" class="ai-text-input" placeholder="tvly-xxxxxxxxxxxxxxxx" value="' +
      escHTML((cfg.tavily && cfg.tavily.api_key) || "") + '" />' +
      '<p class="ai-edit-hint">' + escHTML(L.tavilyHint) + '</p>' +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.feishuSection) + "</h4>" +
      "<label>" + escHTML(L.feishuAppId) + "</label>" +
      '<input type="text" id="ai-s-feishu-appid" class="ai-text-input" placeholder="cli_xxxxxxxxxxxxx" value="' +
      escHTML(cfg.feishu.app_id || "") + '" />' +
      "<label>" + escHTML(L.feishuAppSecret) + "</label>" +
      '<input type="password" id="ai-s-feishu-secret" class="ai-text-input" value="' +
      escHTML(cfg.feishu.app_secret || "") + '" />' +
      "<label>" + escHTML(L.feishuTargetFolder) + "</label>" +
      '<input type="text" id="ai-s-feishu-folder" class="ai-text-input" value="' +
      escHTML(cfg.feishu.target_folder || "") + '" />' +
      '<p class="ai-edit-hint">' + escHTML(L.feishuFolderHint) + '</p>' +
      "<label>" + escHTML(L.feishuDefaultEditor) + "</label>" +
      '<input type="text" id="ai-s-feishu-editor-userid" class="ai-text-input" placeholder="9ddf747a" value="' +
      escHTML((cfg.feishu && cfg.feishu.default_editor_userid) || "") + '" />' +
      '<p class="ai-edit-hint">' + escHTML(L.feishuDefaultEditorHint) + '</p>' +

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
        settingsHandleTestModels(cfg, btn, overlay);
      } else if (act === "save") {
        settingsHandleSave(cfg, overlay);
      } else if (act === "reset") {
        settingsHandleReset();
      }
    });

    initShortcutRecorder("ai-s-sc-qa", cfg.shortcuts.qa);
  }
