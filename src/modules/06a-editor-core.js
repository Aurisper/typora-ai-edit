  // ===================== Editor: Block Finding & Text =====================

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
