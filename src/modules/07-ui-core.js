  // ===================== UI Core: Toast, Clipboard, Shortcuts =====================

  function escHTML(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showToast(msg, type, duration) {
    if (duration === undefined) duration = 3000;
    var old = document.getElementById("ai-edit-toast");
    if (old) old.remove();

    var el = document.createElement("div");
    el.id = "ai-edit-toast";
    el.className = "ai-edit-toast ai-edit-toast-" + type;
    el.textContent = msg;
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("show");
    });
    setTimeout(function () {
      el.classList.remove("show");
      setTimeout(function () {
        el.remove();
      }, 300);
    }, duration);
  }

  function writeToClipboard(text) {
    try {
      var cb = (window.reqnode || require)("electron").clipboard;
      cb.writeText(text);
      return;
    } catch (_) {}
    try { navigator.clipboard.writeText(text); } catch (_) {}
  }

  function insertAfterImage(text) {
    if (!savedImage) return;
    try {
      var imgBlock = savedImage.closest("[cid]") || savedImage.closest("p") || savedImage.parentNode;
      var range = document.createRange();
      range.setStartAfter(imgBlock);
      range.collapse(true);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand("insertText", false, "\n" + text);
      showToast(L.inserted, "success");
    } catch (e) {
      console.error("[AI Edit] insertAfterImage:", e);
      writeToClipboard(text);
      showToast(L.insertFail, "error");
    }
  }

  // ===================== Shortcut helpers =====================

  function shortcutDisplay(sc) {
    if (!sc) return "";
    var parts = [];
    if (sc.metaKey) parts.push("\u2318");
    if (sc.ctrlKey) parts.push("\u2303");
    if (sc.altKey) parts.push("\u2325");
    if (sc.shiftKey) parts.push("\u21E7");
    parts.push(sc.key.toUpperCase());
    return parts.join("");
  }

  function shortcutMatches(e, sc) {
    if (!sc) return false;
    return (
      e.key.toLowerCase() === sc.key.toLowerCase() &&
      !!e.metaKey === !!sc.metaKey &&
      !!e.shiftKey === !!sc.shiftKey &&
      !!e.ctrlKey === !!sc.ctrlKey &&
      !!e.altKey === !!sc.altKey
    );
  }

  function showProgressToast(msg) {
    var old = document.getElementById("ai-edit-toast");
    if (old) old.remove();

    var el = document.createElement("div");
    el.id = "ai-edit-toast";
    el.className = "ai-edit-toast ai-edit-toast-progress";

    var spinner = document.createElement("span");
    spinner.className = "ai-toast-spinner";

    var text = document.createElement("span");
    text.textContent = msg;

    var stopBtn = document.createElement("button");
    stopBtn.className = "ai-toast-stop";
    stopBtn.textContent = L.stop;
    stopBtn.addEventListener("click", function () {
      abortCurrentRequest();
    });

    el.appendChild(spinner);
    el.appendChild(text);
    el.appendChild(stopBtn);
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add("show");
    });
    return el;
  }

  function initShortcutRecorder(inputId, currentSc) {
    var el = document.getElementById(inputId);
    if (!el) return;
    el._shortcut = currentSc ? { ...currentSc } : null;
    el.addEventListener("keydown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (["Meta", "Control", "Alt", "Shift"].indexOf(e.key) >= 0) return;
      var sc = {
        key: e.key.toLowerCase(),
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
      };
      el._shortcut = sc;
      el.value = shortcutDisplay(sc);
    });
  }
