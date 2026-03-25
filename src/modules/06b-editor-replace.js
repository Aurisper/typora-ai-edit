  // ===================== Editor: Selection & Replace =====================

  function saveCurrentSelection(contextTarget) {
    var sel = window.getSelection();
    var node = (sel && (sel.anchorNode || sel.focusNode)) || contextTarget;

    var blockEl = null;
    if (node) blockEl = findSpecialBlock(node);
    if (!blockEl && contextTarget) blockEl = findSpecialBlock(contextTarget);
    if (!blockEl) blockEl = findFocusedBlock();

    if (blockEl) {
      var cm = getBlockCM(blockEl);
      if (cm) {
        var cmSel = cm.getSelection();
        var hasCmSel = cmSel && cmSel.length > 0;
        savedSelection = {
          text: hasCmSel ? cmSel : cm.getValue(),
          isBlock: true,
          blockCM: cm,
          blockEl: blockEl,
          cmFrom: hasCmSel ? cm.getCursor("from") : null,
          cmTo: hasCmSel ? cm.getCursor("to") : null,
          fullBlock: !hasCmSel,
        };
        return;
      }
      if (blockEl.classList.contains("md-htmlblock") || blockEl.classList.contains("md-rawblock")) {
        var source = getHtmlBlockSource(blockEl);
        if (source) {
          savedSelection = {
            text: source,
            isBlock: true,
            isRendered: true,
            blockEl: blockEl,
            originalSource: source,
          };
          return;
        }
      }
    }

    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      savedSelection = {
        range: sel.getRangeAt(0).cloneRange(),
        text: sel.toString(),
      };
    }
  }

  function restoreSelection() {
    if (!savedSelection || !savedSelection.range) return;
    try {
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelection.range);
    } catch (e) {
      console.warn("[AI Edit] restoreSelection:", e);
    }
  }

  async function restoreAndReplace(newText) {
    if (!savedSelection) return false;
    try {
      if (savedSelection.isBlock && savedSelection.blockCM) {
        var cm = getBlockCM(savedSelection.blockEl);
        if (!cm) cm = await reactivateBlockCM(savedSelection.blockEl);
        if (!cm) cm = savedSelection.blockCM;
        try {
          if (savedSelection.fullBlock) {
            cm.setValue(newText);
          } else {
            cm.setSelection(savedSelection.cmFrom, savedSelection.cmTo);
            cm.replaceSelection(newText);
          }
          savedSelection = null;
          return true;
        } catch (e) {
          console.warn("[AI Edit] CM replace failed, falling back:", e);
          var ok = await replaceInMarkdown(savedSelection.text, newText);
          savedSelection = null;
          return ok;
        }
      }

      if (savedSelection.isBlock && savedSelection.isRendered) {
        var ok = await replaceInMarkdown(savedSelection.originalSource, newText);
        savedSelection = null;
        return ok;
      }

      restoreSelection();
      document.execCommand("insertText", false, newText);
      savedSelection = null;
      return true;
    } catch (e) {
      console.error("[AI Edit] replaceSelection:", e);
      return false;
    }
  }

  function sleep(ms) {
    return new Promise(function (r) { setTimeout(r, ms); });
  }

  async function replaceInMarkdown(oldSource, newSource) {
    try {
      var md = getDocumentText();
      if (!md || md.indexOf(oldSource) === -1) {
        writeToClipboard(newSource);
        return false;
      }
      var newMd = md.replace(oldSource, newSource);
      var filePath = null;
      try { filePath = window.File && window.File.filePath; } catch (_) {}
      if (!filePath) try { filePath = window.File && window.File.bundle && window.File.bundle.filePath; } catch (_) {}
      if (!filePath) {
        try {
          var u = decodeURIComponent(window.location.pathname);
          if (u && u.endsWith(".md")) filePath = u;
        } catch (_) {}
      }
      if (filePath) {
        var fs = null;
        try { fs = (window.reqnode || require)("fs"); } catch (_) {}
        if (fs) {
          fs.writeFileSync(filePath, newMd, "utf8");
          await sleep(150);
          try {
            if (window.File && typeof window.File.reloadContent === "function") {
              window.File.reloadContent(true, function () {});
              return true;
            }
          } catch (_) {}
          try {
            if (window.File && window.File.editor && typeof window.File.editor.reload === "function") {
              window.File.editor.reload();
              return true;
            }
          } catch (_) {}
          location.reload();
          return true;
        }
      }
    } catch (e) {
      console.error("[AI Edit] replaceInMarkdown:", e);
    }
    writeToClipboard(newSource);
    return false;
  }

  async function replaceCodeBlock(codeCtx, newText) {
    try {
      if (codeCtx.blockEl) {
        var cm = getBlockCM(codeCtx.blockEl);
        if (!cm) cm = await reactivateBlockCM(codeCtx.blockEl);
        if (cm) {
          try {
            cm.setValue(newText);
            return true;
          } catch (e) {
            console.warn("[AI Edit] CM setValue failed:", e);
          }
        }
      }
      return await replaceInMarkdown(codeCtx.originalSource || codeCtx.source, newText);
    } catch (e) {
      console.error("[AI Edit] replaceCodeBlock:", e);
      writeToClipboard(newText);
      return false;
    }
  }
