  // ===================== AI Q&A =====================

  function showQAPromptDialog() {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var codeCtx = getCodeBlockContext();

    var cfg = loadConfig();
    var ctxCheckbox = '<label class="ai-prompt-checkbox" style="margin-left:16px"><input type="checkbox" id="ai-qa-ctx"> ' +
      escHTML(L.qaIncludeDoc) + "</label>";

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    overlay.innerHTML = buildPromptDialogHTML(L.qaTitle, L.qaLabel, L.qaPlaceholder, "ai-qa-input", cfg, { extraCheckboxes: ctxCheckbox });
    document.body.appendChild(overlay);

    if (codeCtx) {
      var hintEl = document.createElement("div");
      hintEl.style.cssText = "padding:4px 20px 0;font-size:12px;color:#1a73e8;font-weight:500";
      hintEl.textContent = L.codeBlockHint;
      var body = overlay.querySelector(".ai-prompt-body");
      if (body) body.insertBefore(hintEl, body.firstChild);
    }

    var inputEl = document.getElementById("ai-qa-input");
    setTimeout(function () { inputEl.focus(); }, 50);

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); doGo(); }
    });

    var running = false;
    var stream;
    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) { if (e.target === overlay && !running) overlay.remove(); return; }
      var act = btn.dataset.action;
      if (act === "close") { overlay.remove(); }
      else if (act === "go") { doGo(); }
      else if (act === "stop") { abortCurrentRequest(); }
      else if (act === "copy") { writeToClipboard(stream.getResult()); showToast(L.copied, "success"); }
      else if (act === "replace-block") {
        var result = stripCodeFences(stream.getResult());
        if (result && codeCtx) {
          (async function () {
            overlay.remove();
            var ok = await replaceCodeBlock(codeCtx, result);
            showToast(ok ? L.optDone : L.optReplaceFail, ok ? "success" : "error");
          })();
        }
      }
      else if (act === "confirm") {
        var result = stream.getResult().trim();
        if (result) {
          insertQAResponse(result);
          showToast(L.qaDone, "success");
        }
        overlay.remove();
      }
    });

    function doGo() {
      if (running) return;
      var question = document.getElementById("ai-qa-input").value.trim();
      if (!question) return;
      var useWeb = document.getElementById("ai-prompt-web").checked;
      var withContext = document.getElementById("ai-qa-ctx").checked;

      running = true;
      stream = transformToStreaming(overlay, "ai-qa-input");

      var systemPrompt, userPrompt;

      if (codeCtx) {
        systemPrompt = isChinese
          ? "你是一位编程助手。用户正在编辑一个代码块。如果用户要求修改代码，请直接返回完整的修改后代码，不要添加任何解释、markdown 标记或代码围栏（```）。如果用户询问关于代码的问题，请用 Markdown 格式回答。"
          : "You are a coding assistant. The user is editing a code block. If the user asks to modify the code, return ONLY the complete modified code without any explanation, markdown formatting, or code fences (```). If the user asks a question about the code, respond in Markdown format.";
        userPrompt = (isChinese ? "代码块内容：\n\n" : "Code block:\n\n") +
          codeCtx.source + "\n\n" +
          (isChinese ? "用户要求：" : "User request: ") + question;
        if (withContext) {
          userPrompt += "\n\n" + (isChinese ? "完整文档上下文：\n\n<document>\n" : "Full document context:\n\n<document>\n") +
            getDocumentText() + "\n</document>";
        }
      } else {
        var key = withContext ? "qa_with_context" : "qa";
        var prompts = cfg.prompts[key];
        if (!prompts) prompts = DEFAULT_CONFIG.prompts[key];
        var docText = withContext ? getDocumentText() : "";
        systemPrompt = prompts.system;
        userPrompt = prompts.user.replace(/\{question\}/g, question).replace(/\{document\}/g, docText);
      }

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      runCfg._onChunk = function (delta) { stream.append(delta); };

      callAPI(systemPrompt, userPrompt, runCfg).then(function (result) {
        currentAbort = null;
        running = false;
        if (result && result.trim()) {
          if (codeCtx) {
            var replBtn = '<button class="ai-btn primary" data-action="replace-block" style="margin-right:8px">' + escHTML(L.replaceBlock) + '</button>';
            stream.showResult(L.confirmInsert, replBtn);
          } else {
            stream.showResult(L.confirmInsert);
          }
        } else {
          stream.showError(L.emptyResult);
        }
      }).catch(function (e) {
        currentAbort = null;
        running = false;
        if (e.name === "AbortError") {
          if (codeCtx) {
            var replBtn = '<button class="ai-btn primary" data-action="replace-block" style="margin-right:8px">' + escHTML(L.replaceBlock) + '</button>';
            stream.showResult(L.confirmInsert, replBtn);
          } else {
            stream.showResult(L.confirmInsert);
          }
        } else {
          stream.showError(e.message);
          console.error("[AI Edit]", e);
        }
      });
    }
  }

  function insertQAResponse(text) {
    var lines = text.split("\n");
    var quoted = lines.map(function (l) { return "> " + l; }).join("\n");
    quoted = "\n\n" + quoted + "\n\n";

    try {
      var sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        var node = sel.focusNode;
        var block = node && (node.nodeType === 1 ? node : node.parentElement);
        if (block) {
          var p = block.closest("[cid]") || block.closest("p") || block.closest("li") || block;
          if (p) {
            var range = document.createRange();
            range.setStartAfter(p);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
      document.execCommand("insertText", false, quoted);
    } catch (e) {
      console.error("[AI Edit] insertQAResponse:", e);
      writeToClipboard(text);
      showToast(L.insertFail, "error");
    }
  }
