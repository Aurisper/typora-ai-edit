  // ===================== Editor helpers =====================

  let savedSelection = null;
  let savedImage = null;

  function findSpecialBlock(node) {
    if (!node) return null;
    var el = node.nodeType === 3 ? node.parentElement : node;
    while (el && el.id !== "write" && el !== document.body) {
      if (el.classList) {
        if (el.classList.contains("md-htmlblock") || el.classList.contains("md-rawblock")) return el;
        if (el.classList.contains("md-fences")) return el;
        if (el.classList.contains("md-math-block")) return el;
      }
      el = el.parentElement;
    }
    return null;
  }

  function getBlockCM(blockEl) {
    var cmEl = blockEl.querySelector(".CodeMirror");
    return cmEl && cmEl.CodeMirror ? cmEl.CodeMirror : null;
  }

  async function reactivateBlockCM(blockEl) {
    if (!blockEl || !blockEl.parentNode) return null;
    var cm = getBlockCM(blockEl);
    if (cm) return cm;
    try {
      var clickTarget = blockEl.querySelector(".CodeMirror") ||
        blockEl.querySelector("pre") || blockEl;
      clickTarget.click();
      await sleep(200);
      cm = getBlockCM(blockEl);
      if (cm) return cm;
      blockEl.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      blockEl.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      blockEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await sleep(300);
      cm = getBlockCM(blockEl);
    } catch (e) {
      console.warn("[AI Edit] reactivateBlockCM:", e);
    }
    return cm;
  }

  function getHtmlBlockSource(blockEl) {
    var md = getDocumentText();
    if (!md) return null;
    var container = blockEl.querySelector(".md-htmlblock-container") || blockEl;
    var firstEl = container.children && container.children[0];
    if (!firstEl || !firstEl.tagName) return null;
    var tagName = firstEl.tagName.toLowerCase();
    var regex = new RegExp("(<" + tagName + "\\b[\\s\\S]*?<\\/" + tagName + ">)", "gi");
    var matches = [];
    var m;
    while ((m = regex.exec(md)) !== null) {
      matches.push(m[1]);
    }
    if (matches.length === 0) return null;
    if (matches.length === 1) return matches[0];
    var blockText = container.textContent.replace(/\s+/g, " ").trim();
    for (var i = 0; i < matches.length; i++) {
      var tmp = document.createElement("div");
      tmp.innerHTML = matches[i];
      if (tmp.textContent.replace(/\s+/g, " ").trim() === blockText) return matches[i];
    }
    return matches[0];
  }

  function findFocusedBlock() {
    var focused = document.querySelector(".md-fences.md-focus") ||
      document.querySelector(".md-htmlblock.md-focus") ||
      document.querySelector(".md-rawblock.md-focus") ||
      document.querySelector(".md-math-block.md-focus");
    if (focused) return focused;

    var ae = document.activeElement;
    if (ae) {
      var block = findSpecialBlock(ae);
      if (block) return block;
      var cmWrap = ae.closest && ae.closest(".CodeMirror");
      if (cmWrap) {
        block = findSpecialBlock(cmWrap);
        if (block) return block;
      }
    }

    var focusedCM = document.querySelector(".CodeMirror-focused");
    if (focusedCM) {
      var block = findSpecialBlock(focusedCM);
      if (block) return block;
    }

    return null;
  }

  function getCodeBlockContext() {
    var blockEl = null;

    var sel = window.getSelection();
    var node = sel && (sel.anchorNode || sel.focusNode);
    if (node) blockEl = findSpecialBlock(node);

    if (!blockEl) blockEl = findFocusedBlock();

    if (!blockEl) return null;
    var cm = getBlockCM(blockEl);
    if (cm) {
      return { source: cm.getValue(), blockEl: blockEl, cm: cm };
    }
    if (blockEl.classList.contains("md-htmlblock") || blockEl.classList.contains("md-rawblock")) {
      var source = getHtmlBlockSource(blockEl);
      if (source) {
        return { source: source, blockEl: blockEl, isRendered: true, originalSource: source };
      }
    }
    return null;
  }

  function stripCodeFences(text) {
    var t = text.trim();
    var m = t.match(/^```[\w-]*\n([\s\S]*?)\n```\s*$/);
    return m ? m[1] : t;
  }

  function getSelectedText() {
    var sel = window.getSelection();
    var text = sel ? sel.toString() : "";
    if (text) return text;

    if (sel && (sel.anchorNode || sel.focusNode)) {
      var blockEl = findSpecialBlock(sel.anchorNode || sel.focusNode);
      if (blockEl) {
        var cm = getBlockCM(blockEl);
        if (cm) return cm.getSelection() || "";
      }
    }

    var focusedBlock = findFocusedBlock();
    if (focusedBlock) {
      var cm = getBlockCM(focusedBlock);
      if (cm) return cm.getSelection() || "";
    }

    return "";
  }

  function getDocumentText() {
    try {
      if (window.File && window.File.editor) {
        return window.File.editor.getMarkdown();
      }
    } catch (_) {}
    return "";
  }

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
