  // ===================== Logger =====================

  var _pluginLogs = [];
  var _LOG_MAX = 500;

  function pluginLog(level, msg) {
    var entry = {
      time: new Date(),
      level: level || "info",
      msg: typeof msg === "string" ? msg : String(msg),
    };
    _pluginLogs.push(entry);
    if (_pluginLogs.length > _LOG_MAX) _pluginLogs.splice(0, _pluginLogs.length - _LOG_MAX);
    var prefix = "[AI Edit][" + entry.level.toUpperCase() + "]";
    if (level === "error") console.error(prefix, entry.msg);
    else if (level === "warn") console.warn(prefix, entry.msg);
    else console.log(prefix, entry.msg);
  }

  function getPluginLogs() {
    return _pluginLogs.slice();
  }

  function clearPluginLogs() {
    _pluginLogs = [];
  }

  function formatLogTime(d) {
    var h = String(d.getHours()).padStart(2, "0");
    var m = String(d.getMinutes()).padStart(2, "0");
    var s = String(d.getSeconds()).padStart(2, "0");
    return h + ":" + m + ":" + s;
  }

  function formatLogsAsText() {
    return _pluginLogs.map(function (e) {
      var t = e.time.getFullYear() + "-" +
        String(e.time.getMonth() + 1).padStart(2, "0") + "-" +
        String(e.time.getDate()).padStart(2, "0") + " " + formatLogTime(e.time);
      return "[" + t + "] [" + e.level.toUpperCase() + "] " + e.msg;
    }).join("\n");
  }

  // Capture unhandled errors
  window.addEventListener("error", function (ev) {
    var msg = (ev.message || "Unknown error") + (ev.filename ? " (" + ev.filename + ":" + ev.lineno + ")" : "");
    if (msg.indexOf("AI Edit") >= 0 || msg.indexOf("ai-edit") >= 0 || msg.indexOf("feishu") >= 0) {
      pluginLog("error", msg);
    }
  });

  window.addEventListener("unhandledrejection", function (ev) {
    var msg = ev.reason ? (ev.reason.message || String(ev.reason)) : "Unhandled promise rejection";
    if (msg.indexOf("AI Edit") >= 0 || msg.indexOf("ai-edit") >= 0 || msg.indexOf("feishu") >= 0 || msg.indexOf("Feishu") >= 0) {
      pluginLog("error", msg);
    }
  });

  // ===================== Log Panel UI =====================

  function showLogPanel() {
    var existing = document.querySelector(".ai-log-overlay");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.className = "ai-edit-overlay ai-log-overlay";

    var panel = document.createElement("div");
    panel.className = "ai-edit-panel ai-log-panel";

    var header = document.createElement("div");
    header.className = "ai-edit-panel-header";
    header.innerHTML = '<h3>' + escHTML(L.logTitle) + '</h3>' +
      '<button class="ai-edit-close" data-log-action="close">&times;</button>';

    var body = document.createElement("div");
    body.className = "ai-edit-panel-body ai-log-body";

    var logList = document.createElement("div");
    logList.className = "ai-log-list";
    logList.id = "ai-log-list";
    renderLogEntries(logList);
    body.appendChild(logList);

    var footer = document.createElement("div");
    footer.className = "ai-edit-panel-footer";
    footer.innerHTML =
      '<button class="ai-btn secondary" data-log-action="clear">' + escHTML(L.logClear) + '</button>' +
      '<span class="ai-edit-spacer"></span>' +
      '<button class="ai-btn secondary" data-log-action="copy">' + escHTML(L.logCopy) + '</button>' +
      '<button class="ai-btn primary" data-log-action="close">' + escHTML(L.closeBtn) + '</button>';

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(footer);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      var action = e.target.dataset.logAction;
      if (!action && e.target === overlay) action = "close";
      if (!action) return;

      if (action === "close") {
        overlay.remove();
      } else if (action === "copy") {
        var text = formatLogsAsText();
        writeToClipboard(text || L.logEmpty);
        showToast(L.logCopied, "success");
      } else if (action === "clear") {
        clearPluginLogs();
        renderLogEntries(logList);
        showToast(L.logCleared, "success");
      }
    });
  }

  function renderLogEntries(container) {
    var logs = getPluginLogs();
    if (logs.length === 0) {
      container.innerHTML = '<div class="ai-log-empty">' + escHTML(L.logEmpty) + '</div>';
      return;
    }
    var html = "";
    for (var i = logs.length - 1; i >= 0; i--) {
      var e = logs[i];
      var levelClass = "ai-log-" + e.level;
      html += '<div class="ai-log-entry ' + levelClass + '">' +
        '<span class="ai-log-time">' + formatLogTime(e.time) + '</span>' +
        '<span class="ai-log-level">' + e.level.toUpperCase() + '</span>' +
        '<span class="ai-log-msg">' + escHTML(e.msg) + '</span>' +
        '</div>';
    }
    container.innerHTML = html;
  }
