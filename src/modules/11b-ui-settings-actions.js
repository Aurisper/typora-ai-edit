  // ===================== Settings: Save / Reset / Test =====================

  function settingsHandleSave(cfg, overlay) {
    cfg.provider = document.getElementById("ai-s-provider").value;
    if (cfg.provider === "openai_compat") {
      cfg.openai_compat.base_url = document.getElementById("ai-s-oc-url").value.trim();
      cfg.openai_compat.api_key = document.getElementById("ai-s-oc-key").value.trim();
      cfg.openai_compat.models_input = document.getElementById("ai-s-oc-models").value.trim();
    }
    cfg.prompts.optimize.system = document.getElementById("ai-s-opt-sys").value;
    cfg.prompts.optimize.user = document.getElementById("ai-s-opt-usr").value;
    cfg.prompts.optimize_with_context.system = document.getElementById("ai-s-ctx-sys").value;
    cfg.prompts.optimize_with_context.user = document.getElementById("ai-s-ctx-usr").value;
    cfg.prompts.describe_image.system = document.getElementById("ai-s-img-sys").value;
    cfg.prompts.describe_image.user = document.getElementById("ai-s-img-usr").value;
    if (!cfg.prompts.qa) cfg.prompts.qa = {};
    cfg.prompts.qa.system = document.getElementById("ai-s-qa-sys").value;
    cfg.prompts.qa.user = document.getElementById("ai-s-qa-usr").value;
    if (!cfg.prompts.qa_with_context) cfg.prompts.qa_with_context = {};
    cfg.prompts.qa_with_context.system = document.getElementById("ai-s-qac-sys").value;
    cfg.prompts.qa_with_context.user = document.getElementById("ai-s-qac-usr").value;
    var scQa = document.getElementById("ai-s-sc-qa")._shortcut;
    if (scQa) cfg.shortcuts.qa = scQa;
    cfg.tavily = cfg.tavily || {};
    cfg.tavily.api_key = document.getElementById("ai-s-tavily-key").value.trim();
    cfg.feishu = cfg.feishu || {};
    cfg.feishu.app_id = document.getElementById("ai-s-feishu-appid").value.trim();
    cfg.feishu.app_secret = document.getElementById("ai-s-feishu-secret").value.trim();
    cfg.feishu.target_folder = document.getElementById("ai-s-feishu-folder").value.trim();
    saveConfig(cfg);
    pluginLog("info", "Settings saved");
    overlay.remove();
    showToast(L.saved, "success");
  }

  function settingsHandleReset() {
    document.getElementById("ai-s-opt-sys").value = DEFAULT_CONFIG.prompts.optimize.system;
    document.getElementById("ai-s-opt-usr").value = DEFAULT_CONFIG.prompts.optimize.user;
    document.getElementById("ai-s-ctx-sys").value = DEFAULT_CONFIG.prompts.optimize_with_context.system;
    document.getElementById("ai-s-ctx-usr").value = DEFAULT_CONFIG.prompts.optimize_with_context.user;
    document.getElementById("ai-s-img-sys").value = DEFAULT_CONFIG.prompts.describe_image.system;
    document.getElementById("ai-s-img-usr").value = DEFAULT_CONFIG.prompts.describe_image.user;
    document.getElementById("ai-s-qa-sys").value = DEFAULT_CONFIG.prompts.qa.system;
    document.getElementById("ai-s-qa-usr").value = DEFAULT_CONFIG.prompts.qa.user;
    document.getElementById("ai-s-qac-sys").value = DEFAULT_CONFIG.prompts.qa_with_context.system;
    document.getElementById("ai-s-qac-usr").value = DEFAULT_CONFIG.prompts.qa_with_context.user;
    var defQa = DEFAULT_CONFIG.shortcuts.qa;
    document.getElementById("ai-s-sc-qa").value = shortcutDisplay(defQa);
    document.getElementById("ai-s-sc-qa")._shortcut = defQa;
    document.getElementById("ai-s-tavily-key").value = "";
    document.getElementById("ai-s-feishu-appid").value = "";
    document.getElementById("ai-s-feishu-secret").value = "";
    document.getElementById("ai-s-feishu-folder").value = "";
    showToast(L.restored, "info");
  }

  function settingsHandleTestModels(cfg, btn, overlay) {
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
  }
