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
          var blockEl = findSpecialBlock(target);
          if (blockEl) {
            var cm = getBlockCM(blockEl);
            if (!cm) {
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

    console.log("[AI Edit] " + L.loaded);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 500);
  } else {
    window.addEventListener("DOMContentLoaded", function () {
      setTimeout(init, 500);
    });
  }
