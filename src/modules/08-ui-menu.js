  // ===================== Context Menu =====================

  let menuEl = null;

  function buildMenuHTML(cfg, hasSel, hasImage) {
    var html = "";

    var caps = getModelCapabilities(cfg);

    if (hasImage) {
      if (caps.vision) {
        html +=
          '<div class="ai-menu-item" data-action="describe_image">' +
          '<span class="ai-menu-icon">🖼</span>' + escHTML(L.describeImage) + '</div>';
      }

      var curZoom = savedImage ? (parseFloat(savedImage.style.zoom) || 1) : 1;
      var sizes = [1, 0.75, 0.5, 0.33, 0.25, 0.1];
      html += '<div class="ai-menu-item ai-menu-sub" data-action="size-parent">';
      html += '<span class="ai-menu-icon">↔</span>' + escHTML(L.imageSize);
      html += '<span class="ai-menu-arrow">▸</span>';
      html += '<div class="ai-menu-submenu">';
      for (var s = 0; s < sizes.length; s++) {
        var pct = Math.round(sizes[s] * 100);
        var ck = Math.abs(curZoom - sizes[s]) < 0.01 ? "✓ " : "\u2003";
        html += '<div class="ai-menu-item" data-action="set-size" data-size="' + sizes[s] + '">' +
          ck + pct + '%</div>';
      }
      html += '</div></div>';
      html += '<div class="ai-menu-sep"></div>';
    }

    if (hasSel) {
      html +=
        '<div class="ai-menu-item" data-action="optimize">' +
        '<span class="ai-menu-icon">✦</span>' + escHTML(L.optimizeSelection) + '</div>';
      html +=
        '<div class="ai-menu-item" data-action="optimize_ctx">' +
        '<span class="ai-menu-icon">✦</span>' + escHTML(L.optimizeWithContext) + '</div>';
      html += '<div class="ai-menu-sep"></div>';
    }

    if (!hasSel) {
      html +=
        '<div class="ai-menu-item" data-action="qa">' +
        '<span class="ai-menu-icon">💬</span>' + escHTML(L.qaAsk) +
        '<span class="ai-menu-shortcut">' + shortcutDisplay(cfg.shortcuts.qa) + '</span></div>';
      html += '<div class="ai-menu-sep"></div>';
    }

    if (hasSel) {
      html +=
        '<div class="ai-menu-item" data-action="cut">' +
        '<span class="ai-menu-icon">✂</span>' + escHTML(L.cut) +
        '<span class="ai-menu-shortcut">⌘X</span></div>';
      html +=
        '<div class="ai-menu-item" data-action="copy">' +
        '<span class="ai-menu-icon">⧉</span>' + escHTML(L.copy) +
        '<span class="ai-menu-shortcut">⌘C</span></div>';
    }
    html +=
      '<div class="ai-menu-item" data-action="paste">' +
      '<span class="ai-menu-icon">📋</span>' + escHTML(L.paste) +
      '<span class="ai-menu-shortcut">⌘V</span></div>';
    html += '<div class="ai-menu-sep"></div>';

    html += '<div class="ai-menu-item ai-menu-sub" data-action="model-parent">';
    html += '<span class="ai-menu-icon">⚙</span>' + escHTML(L.aiModel);
    html += '<span class="ai-menu-arrow">▸</span>';
    html += '<div class="ai-menu-submenu">';

    if (cfg.provider === "openai_compat") {
      var ocModels = (cfg.openai_compat && cfg.openai_compat.models) || [];
      for (var i = 0; i < ocModels.length; i++) {
        var om = ocModels[i];
        if (!om.available) continue;
        var ck = om.name === cfg.model ? "\u2713 " : "\u2003";
        html += '<div class="ai-menu-item" data-action="set-model" data-model="' +
          escHTML(om.name) + '">' + ck + escHTML(om.name) + "</div>";
      }
    } else {
      for (var i = 0; i < cfg.models.length; i++) {
        var m = cfg.models[i];
        var ck = m === cfg.model ? "\u2713 " : "\u2003";
        html += '<div class="ai-menu-item" data-action="set-model" data-model="' +
          m + '">' + ck + m + "</div>";
      }
    }
    html += "</div></div>";

    var webDisabled = cfg.provider === "openai_compat" && !caps.web_search;
    var wc = cfg.web_search && !webDisabled ? "\u2713 " : "\u2003";
    html +=
      '<div class="ai-menu-item' + (webDisabled ? " disabled" : "") + '" data-action="toggle-web">' +
      '<span class="ai-menu-icon">🌐</span>' +
      wc +
      escHTML(L.aiWebSearch) + "</div>";
    html += '<div class="ai-menu-sep"></div>';
    html +=
      '<div class="ai-menu-item" data-action="settings">' +
      '<span class="ai-menu-icon">⚙</span>' + escHTML(L.aiEditSettings) + '</div>';

    return html;
  }

  function showMenu(x, y) {
    hideMenu();
    const cfg = loadConfig();
    const hasSel = !!savedSelection && !!savedSelection.text;
    const hasImage = !!savedImage;

    menuEl = document.createElement("div");
    menuEl.className = "ai-edit-menu";
    menuEl.innerHTML = buildMenuHTML(cfg, hasSel, hasImage);
    document.body.appendChild(menuEl);

    const r = menuEl.getBoundingClientRect();
    if (x + r.width > window.innerWidth) x = window.innerWidth - r.width - 8;
    if (y + r.height > window.innerHeight)
      y = window.innerHeight - r.height - 8;
    if (x < 0) x = 8;
    if (y < 0) y = 8;
    menuEl.style.left = x + "px";
    menuEl.style.top = y + "px";

    menuEl.addEventListener("click", onMenuClick);
    setTimeout(function () {
      document.addEventListener("mousedown", onOutsideClick);
    }, 0);
  }

  function hideMenu() {
    if (menuEl) {
      menuEl.remove();
      menuEl = null;
    }
    document.removeEventListener("mousedown", onOutsideClick);
  }

  function onOutsideClick(e) {
    if (menuEl && !menuEl.contains(e.target)) {
      hideMenu();
    }
  }

  async function onMenuClick(e) {
    const item = e.target.closest("[data-action]");
    if (!item) return;
    if (item.dataset.action === "model-parent" || item.dataset.action === "size-parent" || item.dataset.action === "shortcuts-parent") return;

    const action = item.dataset.action;
    const cfg = loadConfig();
    hideMenu();

    if (action === "cut") {
      restoreSelection();
      document.execCommand("cut");
      return;
    } else if (action === "copy") {
      restoreSelection();
      document.execCommand("copy");
      return;
    } else if (action === "paste") {
      doPaste();
      return;
    } else if (action === "set-size") {
      if (savedImage) {
        var size = parseFloat(item.dataset.size);
        savedImage.style.zoom = size === 1 ? "" : String(size);
      }
      return;
    } else if (action === "describe_image") {
      showImagePromptDialog(cfg);
      return;
    } else if (action === "qa") {
      showQAPromptDialog();
      return;
    } else if (action === "optimize") {
      showPromptDialog(cfg, false);
      return;
    } else if (action === "optimize_ctx") {
      showPromptDialog(cfg, true);
      return;
    } else if (action === "set-model") {
      cfg.model = item.dataset.model;
      saveConfig(cfg);
      showToast(L.modelSwitched + cfg.model, "success");
    } else if (action === "toggle-web") {
      var mc = getModelCapabilities(cfg);
      if (cfg.provider === "openai_compat" && !mc.web_search) {
        showToast(L.webNotSupported, "info");
        return;
      }
      cfg.web_search = !cfg.web_search;
      saveConfig(cfg);
      showToast(cfg.web_search ? L.webSearchOn : L.webSearchOff, "success");
    } else if (action === "settings") {
      showSettingsPanel();
    }
  }

  // ===================== Paste (Electron clipboard) =====================

  function doPaste() {
    var clipText = null;
    try {
      var cb = require("electron").clipboard;
      clipText = cb.readText();
    } catch (_) {}
    if (!clipText && window.reqnode) {
      try {
        clipText = window.reqnode("electron").clipboard.readText();
      } catch (_) {}
    }
    if (clipText) {
      restoreSelection();
      document.execCommand("insertText", false, clipText);
    } else {
      navigator.clipboard
        .readText()
        .then(function (text) {
          restoreSelection();
          document.execCommand("insertText", false, text);
        })
        .catch(function () {
          showToast(L.pasteFailed, "error");
        });
    }
  }
