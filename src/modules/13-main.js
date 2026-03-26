  // ===================== Init =====================

  function init() {
    injectStyles();

    document.addEventListener(
      "contextmenu",
      function (e) {
        var target = e.target;
        var isEditor =
          target.closest && (target.closest("#write") || target.closest(".CodeMirror"));
        if (!isEditor) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        var sel = getSelectedText();
        if (sel.length > 0) {
          saveCurrentSelection(target);
        } else {
          savedSelection = null;
          var blockEl = findSpecialBlock(target) || findFocusedBlock();
          if (blockEl) {
            var cm = getBlockCM(blockEl);
            if (cm) {
              savedSelection = {
                text: cm.getValue(),
                isBlock: true,
                blockCM: cm,
                blockEl: blockEl,
                fullBlock: true,
              };
            } else {
              var source = getHtmlBlockSource(blockEl);
              if (source) {
                savedSelection = {
                  text: source,
                  isBlock: true,
                  isRendered: true,
                  blockEl: blockEl,
                  originalSource: source,
                };
              }
            }
          }
        }

        if (target.tagName === "IMG") {
          savedImage = target;
        } else if (target.querySelector) {
          savedImage = target.querySelector("img");
        } else {
          savedImage = null;
        }

        showMenu(e.clientX, e.clientY);
      },
      true
    );

    document.addEventListener("keydown", function (e) {
      var sel = getSelectedText();
      if (sel.length > 0) return;
      var cfg = loadConfig();
      var sc = cfg.shortcuts || {};
      if (shortcutMatches(e, sc.qa)) {
        e.preventDefault();
        e.stopPropagation();
        showQAPromptDialog();
      }
    }, true);

    try {
      var pendingEdit = localStorage.getItem("typora-ai-edit-feishu-editing");
      if (pendingEdit) {
        localStorage.removeItem("typora-ai-edit-feishu-editing");
        _feishuEditState = JSON.parse(pendingEdit);
        showFeishuEditBar();
        pluginLog("info", "Feishu edit state restored: " + _feishuEditState.title);
      }
    } catch (_) {}

    pluginLog("info", L.loaded);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 500);
  } else {
    window.addEventListener("DOMContentLoaded", function () {
      setTimeout(init, 500);
    });
  }
