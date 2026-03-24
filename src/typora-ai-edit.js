(function () {
  "use strict";

  const CODEX_URL = "https://chatgpt.com/backend-api/codex/responses";
  const CONFIG_KEY = "typora-ai-edit-config";

  // ===================== i18n =====================

  var isChinese = /^zh/i.test(
    (navigator.language || (navigator.languages && navigator.languages[0]) || "en")
  );

  var L = isChinese
    ? {
        describeImage: "AI 图片解读",
        optimizeSelection: "AI 优化选中文字",
        optimizeWithContext: "AI 优化选中文字（参考全文）",
        cut: "剪切", copy: "复制", paste: "粘贴",
        aiModel: "AI 模型",
        aiWebSearch: "AI 联网搜索",
        aiEditSettings: "AI 编辑设置\u2026",
        modelSwitched: "模型已切换: ",
        webSearchOn: "联网搜索已开启",
        webSearchOff: "联网搜索已关闭",
        pasteFailed: "粘贴失败，请使用 \u2318V",
        tokenFailed: "Token 读取失败: ",
        oauthUnavailable: "OAuth Token 不可用",
        optimizeTitle: "AI 优化选中文字",
        optimizeCtxTitle: "AI 优化选中文字（参考全文）",
        extraLabel: "额外优化指示（可留空，直接点开始即按默认提示词优化）",
        extraPlaceholder: "例如：请让语气更正式 / 缩短到100字以内 / 改为英文\u2026",
        webSearch: "联网搜索",
        cancel: "取消",
        start: "开始",
        imgTitle: "AI 图片解读",
        imgLabel: "额外指示（可留空，直接点开始即按默认方式解读）",
        imgPlaceholder: "例如：关注图中文字 / 描述图表数据 / 提取所有数字\u2026",
        imgResultTitle: "AI 图片分析结果",
        copyBtn: "复制",
        closeBtn: "关闭",
        insertBtn: "插入到图片下方",
        settingsTitle: "AI 编辑设置",
        feat1: "功能一：AI 优化选中文字",
        feat2: "功能二：AI 优化选中文字（参考全文）",
        feat3: "功能三：AI 图片解读",
        sysPrompt: "系统提示词",
        usrPrompt: "用户提示词",
        varsSelection: "可用变量: {selection}",
        varsSelDoc: "可用变量: {selection}, {document}",
        resetDefaults: "恢复默认",
        save: "保存",
        saved: "设置已保存",
        restored: "已恢复默认值（请点保存生效）",
        promptMissing: "提示词配置缺失",
        selectFirst: "请先选中文字",
        extraReq: "额外要求: ",
        optimizing: "AI 正在优化\u2026",
        optDone: "AI 优化完成",
        optReplaceFail: "替换失败，请重试",
        emptyResult: "AI 返回结果为空",
        optStopped: "已停止优化",
        optFailed: "优化失败: ",
        noImage: "未检测到图片",
        imgReadFail: "图片数据读取失败",
        analyzing: "AI 正在分析图片\u2026",
        anaStopped: "分析已停止",
        anaFailed: "分析失败: ",
        copied: "已复制到剪贴板",
        inserted: "已插入到图片下方",
        insertFail: "插入失败，已复制到剪贴板",
        imageSize: "图片大小",
        stop: "停止",
        loaded: "插件已加载。右键选中文字即可使用 AI 编辑功能。",
      }
    : {
        describeImage: "AI Describe Image",
        optimizeSelection: "AI Optimize Selection",
        optimizeWithContext: "AI Optimize (With Context)",
        cut: "Cut", copy: "Copy", paste: "Paste",
        aiModel: "AI Model",
        aiWebSearch: "AI Web Search",
        aiEditSettings: "AI Edit Settings\u2026",
        modelSwitched: "Model switched to: ",
        webSearchOn: "Web search enabled",
        webSearchOff: "Web search disabled",
        pasteFailed: "Paste failed, please use \u2318V",
        tokenFailed: "Token read failed: ",
        oauthUnavailable: "OAuth Token unavailable",
        optimizeTitle: "AI Optimize Selection",
        optimizeCtxTitle: "AI Optimize Selection (With Context)",
        extraLabel: "Additional instructions (optional \u2014 leave empty to use default prompts)",
        extraPlaceholder: "e.g. Make the tone more formal / Shorten to 100 words / Translate to English\u2026",
        webSearch: "Web Search",
        cancel: "Cancel",
        start: "Start",
        imgTitle: "AI Describe Image",
        imgLabel: "Additional instructions (optional \u2014 leave empty for general description)",
        imgPlaceholder: "e.g. Focus on the text in the image / Describe the chart data / Extract all visible numbers\u2026",
        imgResultTitle: "AI Image Analysis",
        copyBtn: "Copy",
        closeBtn: "Close",
        insertBtn: "Insert Below Image",
        settingsTitle: "AI Edit Settings",
        feat1: "Feature 1: AI Optimize Selection",
        feat2: "Feature 2: AI Optimize Selection (With Context)",
        feat3: "Feature 3: AI Describe Image",
        sysPrompt: "System Prompt",
        usrPrompt: "User Prompt",
        varsSelection: "Available variables: {selection}",
        varsSelDoc: "Available variables: {selection}, {document}",
        resetDefaults: "Reset Defaults",
        save: "Save",
        saved: "Settings saved",
        restored: "Defaults restored (click Save to apply)",
        promptMissing: "Prompt configuration missing",
        selectFirst: "Please select text first",
        extraReq: "Additional requirements: ",
        optimizing: "AI optimizing\u2026",
        optDone: "AI optimization complete",
        optReplaceFail: "Replace failed, please retry",
        emptyResult: "AI returned empty result",
        optStopped: "Optimization stopped",
        optFailed: "Optimization failed: ",
        noImage: "No image detected",
        imgReadFail: "Failed to read image data",
        analyzing: "AI analyzing image\u2026",
        anaStopped: "Analysis stopped",
        anaFailed: "Analysis failed: ",
        copied: "Copied to clipboard",
        inserted: "Inserted below image",
        insertFail: "Insert failed \u2014 text copied to clipboard",
        imageSize: "Image Size",
        stop: "Stop",
        loaded: "Plugin loaded. Right-click on selected text to use AI editing features.",
      };

  const DEFAULT_CONFIG = {
    model: "gpt-5.4",
    web_search: false,
    models: [
      "gpt-5.4",
      "gpt-5.4-mini",
      "gpt-5.2",
      "gpt-5.1",
      "gpt-5",
      "gpt-5.3-codex",
      "gpt-5.2-codex",
      "gpt-5.1-codex",
      "gpt-5-codex",
    ],
    prompts: isChinese
      ? {
          optimize: {
            system: "你是一位专业编辑，擅长文字润色与优化。",
            user: "请优化以下文字。保持原意，提高流畅度和专业性。只返回优化后的文字，不要任何解释。\n\n{selection}",
          },
          optimize_with_context: {
            system: "你是一位专业编辑，擅长结合全文语境对选中部分进行润色优化。",
            user: "以下是完整文档：\n\n<document>\n{document}\n</document>\n\n请优化以下选中部分，确保结果与全文的风格、逻辑和术语保持一致。只返回优化后的文字，不要任何解释。\n\n<selection>\n{selection}\n</selection>",
          },
          describe_image: {
            system: "你是一位专业的图像分析师，擅长详细解读和描述视觉内容。",
            user: "请详细分析和描述以下图片。提供全面的解读，包括关键元素、背景信息以及图中可见的文字。",
          },
        }
      : {
          optimize: {
            system: "You are a professional editor skilled at text polishing and optimization.",
            user: "Please optimize the following text. Keep the original meaning, improve fluency and professionalism. Return only the optimized text without any explanation.\n\n{selection}",
          },
          optimize_with_context: {
            system: "You are a professional editor skilled at polishing and optimizing text within the context of a full document.",
            user: "Here is the full document:\n\n<document>\n{document}\n</document>\n\nPlease optimize the following selected portion, ensuring the result is consistent with the full document's style, logic, and terminology. Return only the optimized text without any explanation.\n\n<selection>\n{selection}\n</selection>",
          },
          describe_image: {
            system: "You are a professional image analyst skilled at interpreting and describing visual content in detail.",
            user: "Please analyze and describe the following image in detail. Provide a comprehensive interpretation including key elements, context, and any text visible in the image.",
          },
        },
  };

  // ===================== Config =====================

  function loadConfig() {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          prompts: { ...DEFAULT_CONFIG.prompts, ...(parsed.prompts || {}) },
        };
      }
    } catch (e) {
      console.error("[AI Edit] loadConfig:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  function saveConfig(cfg) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  }

  // ===================== Token =====================

  function getHomePath() {
    // 1. process.env.HOME
    try {
      if (typeof process !== "undefined" && process.env && process.env.HOME) {
        return process.env.HOME;
      }
    } catch (_) {}
    // 2. Typora _options.appDataPath → extract home
    try {
      var adp = window._options && window._options.appDataPath;
      if (adp) {
        var m = adp.match(/^(\/Users\/[^/]+)/);
        if (m) return m[1];
      }
    } catch (_) {}
    // 3. Typora _options.userPath or similar
    try {
      if (window._options) {
        var up = window._options.userPath || window._options.homePath;
        if (up) return up;
      }
    } catch (_) {}
    // 4. Try reading from bridge
    try {
      if (window.bridge && window.bridge.callSync) {
        var whoami = window.bridge.callSync("controller.runCommandSync", "whoami");
        if (whoami && typeof whoami === "string") {
          return "/Users/" + whoami.trim();
        }
      }
    } catch (_) {}
    // 5. Fallback: derive from document path or __dirname
    try {
      var dp = window.dirname || window.__dirname;
      if (dp) {
        var um = dp.match(/^(\/Users\/[^/]+)/);
        if (um) return um[1];
      }
    } catch (_) {}
    return null;
  }

  function getTokenPath() {
    var home = getHomePath();
    if (!home) {
      console.error("[AI Edit] Cannot determine user home directory. Available info:", {
        process_env: typeof process !== "undefined" && process.env ? process.env.HOME : "N/A",
        _options: window._options ? Object.keys(window._options).join(",") : "N/A",
        bridge: !!window.bridge,
        reqnode: !!window.reqnode,
        dirname: window.dirname || window.__dirname || "N/A",
      });
    }
    return (home || "") + "/Library/Application Support/oauth-cli-kit/auth/codex.json";
  }

  function readFileContent(filePath) {
    // Method 1: bridge (macOS)
    if (window.bridge && window.bridge.callSync) {
      try {
        var content = window.bridge.callSync("path.readText", filePath);
        if (content) return content;
      } catch (e) {
        console.warn("[AI Edit] bridge.readText failed:", e);
      }
    }
    // Method 2: reqnode (Windows/Linux)
    if (window.reqnode) {
      try {
        return window.reqnode("fs").readFileSync(filePath, "utf-8");
      } catch (e) {
        console.warn("[AI Edit] reqnode.fs failed:", e);
      }
    }
    // Method 3: Node.js require
    try {
      if (typeof require === "function") {
        return require("fs").readFileSync(filePath, "utf-8");
      }
    } catch (_) {}
    return null;
  }

  // ===================== Image helpers =====================

  function readFileAsBase64(filePath) {
    if (window.reqnode) {
      try {
        return window.reqnode("fs").readFileSync(filePath).toString("base64");
      } catch (_) {}
    }
    try {
      if (typeof require === "function") {
        return require("fs").readFileSync(filePath).toString("base64");
      }
    } catch (_) {}
    return null;
  }

  function getMimeFromPath(p) {
    var ext = p.split(".").pop().toLowerCase().replace(/\?.*$/, "");
    var map = {
      png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
      gif: "image/gif", webp: "image/webp", svg: "image/svg+xml", bmp: "image/bmp",
    };
    return map[ext] || "image/png";
  }

  async function getImageDataUrl(imgEl) {
    var src = imgEl.getAttribute("src") || imgEl.src || "";

    if (src.startsWith("data:image/")) return src;

    if (src.startsWith("http://") || src.startsWith("https://")) {
      try {
        var canvas = document.createElement("canvas");
        var w = imgEl.naturalWidth || imgEl.width;
        var h = imgEl.naturalHeight || imgEl.height;
        if (w > 0 && h > 0) {
          canvas.width = w;
          canvas.height = h;
          canvas.getContext("2d").drawImage(imgEl, 0, 0);
          var dataUrl = canvas.toDataURL("image/png");
          if (dataUrl && dataUrl.length > 100) return dataUrl;
        }
      } catch (e) {
        console.warn("[AI Edit] Canvas export failed, trying Node.js download:", e);
      }
      try {
        return await fetchImageAsDataUrl(src);
      } catch (e) {
        console.warn("[AI Edit] Node.js download failed:", e);
      }
      return null;
    }

    var filePath = src;
    if (src.startsWith("file://")) {
      filePath = decodeURIComponent(src.replace(/^file:\/\//, ""));
    }

    var b64 = readFileAsBase64(filePath);
    if (b64) return "data:" + getMimeFromPath(filePath) + ";base64," + b64;

    try {
      var canvas = document.createElement("canvas");
      canvas.width = imgEl.naturalWidth;
      canvas.height = imgEl.naturalHeight;
      canvas.getContext("2d").drawImage(imgEl, 0, 0);
      return canvas.toDataURL("image/png");
    } catch (_) {}

    return null;
  }

  var IMG_MAX_SIZE = 2048;
  var IMG_QUALITY = 0.8;

  function compressImageDataUrl(dataUrl) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () {
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        var maxDim = Math.max(w, h);
        if (maxDim > IMG_MAX_SIZE) {
          var scale = IMG_MAX_SIZE / maxDim;
          w = Math.round(w * scale);
          h = Math.round(h * scale);
        }
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        var result = canvas.toDataURL("image/jpeg", IMG_QUALITY);
        var origKB = Math.round(dataUrl.length * 3 / 4 / 1024);
        var compKB = Math.round(result.length * 3 / 4 / 1024);
        console.log("[AI Edit] Image compressed: " + img.naturalWidth + "x" + img.naturalHeight +
          " -> " + w + "x" + h + ", " + origKB + "KB -> " + compKB + "KB");
        resolve(result);
      };
      img.onerror = function () {
        resolve(dataUrl);
      };
      img.src = dataUrl;
    });
  }

  function fetchImageAsDataUrl(url) {
    return new Promise(function (resolve, reject) {
      var mod = url.startsWith("https") ? "https" : "http";
      var httpMod;
      try {
        httpMod = window.reqnode ? window.reqnode(mod) : require(mod);
      } catch (e) {
        reject(e);
        return;
      }

      var opts = {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        },
      };

      httpMod.get(url, opts, function (res) {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchImageAsDataUrl(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error("HTTP " + res.statusCode));
          return;
        }
        var chunks = [];
        res.on("data", function (chunk) { chunks.push(chunk); });
        res.on("end", function () {
          var buffer = Buffer.concat(chunks);
          var mime = res.headers["content-type"] || getMimeFromPath(url);
          resolve("data:" + mime + ";base64," + buffer.toString("base64"));
        });
        res.on("error", reject);
      }).on("error", reject);
    });
  }

  function readToken() {
    try {
      var p = getTokenPath();
      console.log("[AI Edit] Token path:", p);
      var raw = readFileContent(p);
      if (!raw) throw new Error("Cannot read token file: " + p);
      var token = JSON.parse(raw);
      if (token.expires && Date.now() > token.expires) {
        throw new Error("Token expired, please run oauth-cli-kit to log in again");
      }
      return token;
    } catch (e) {
      console.error("[AI Edit] readToken:", e);
      showToast(L.tokenFailed + e.message, "error", 5000);
      return null;
    }
  }

  // ===================== Codex API =====================

  var currentAbort = null;

  async function callCodexAPI(systemPrompt, userPrompt, config, imageDataUrl) {
    var token = readToken();
    if (!token) throw new Error(L.oauthUnavailable);

    currentAbort = new AbortController();

    var headers = {
      Authorization: "Bearer " + token.access,
      "chatgpt-account-id": token.account_id,
      "OpenAI-Beta": "responses=experimental",
      originator: "typora-ai-edit",
      "User-Agent": "typora-ai-edit/1.0",
      accept: "text/event-stream",
      "content-type": "application/json",
    };

    var inputContent = [{ type: "input_text", text: userPrompt }];
    if (imageDataUrl) {
      inputContent.push({ type: "input_image", image_url: imageDataUrl });
    }

    var body = {
      model: config.model,
      store: false,
      stream: true,
      instructions: systemPrompt,
      input: [
        {
          role: "user",
          content: inputContent,
        },
      ],
      include: ["reasoning.encrypted_content"],
    };

    if (config.web_search) {
      body.tools = [{ type: "web_search" }];
      body.tool_choice = "auto";
    }

    var resp = await fetch(CODEX_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      signal: currentAbort.signal,
    });

    if (!resp.ok) {
      var errText = await resp.text().catch(function () { return ""; });
      throw new Error("API " + resp.status + ": " + errText.slice(0, 200));
    }

    return await parseSSE(resp);
  }

  function abortCurrentRequest() {
    if (currentAbort) {
      currentAbort.abort();
      currentAbort = null;
    }
  }

  async function parseSSE(resp) {
    var reader = resp.body.getReader();
    var decoder = new TextDecoder();
    var buf = "";
    var result = "";

    try {
      for (;;) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buf += decoder.decode(chunk.value, { stream: true });

        var parts = buf.split("\n\n");
        buf = parts.pop();

        for (var i = 0; i < parts.length; i++) {
          var data = "";
          var lines = parts[i].split("\n");
          for (var j = 0; j < lines.length; j++) {
            if (lines[j].startsWith("data: ")) data += lines[j].slice(6);
            else if (lines[j].startsWith("data:")) data += lines[j].slice(5);
          }
          data = data.trim();
          if (!data || data === "[DONE]") continue;

          try {
            var ev = JSON.parse(data);
            if (ev.type === "response.output_text.delta" && ev.delta) {
              result += ev.delta;
            } else if (
              ev.type === "error" ||
              ev.type === "response.failed"
            ) {
              throw new Error(
                "API error: " + (ev.message || JSON.stringify(ev)).slice(0, 200)
              );
            }
          } catch (e) {
            if (e.message && e.message.startsWith("API error")) throw e;
          }
        }
      }
    } catch (e) {
      if (e.name === "AbortError") {
        throw e;
      }
      throw e;
    }
    return result;
  }

  // ===================== Editor helpers =====================

  let savedSelection = null;
  let savedImage = null;

  function getSelectedText() {
    const sel = window.getSelection();
    return sel ? sel.toString() : "";
  }

  function getDocumentText() {
    try {
      if (window.File && window.File.editor) {
        return window.File.editor.getMarkdown();
      }
    } catch (_) {}
    return "";
  }

  function saveCurrentSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      savedSelection = {
        range: sel.getRangeAt(0).cloneRange(),
        text: sel.toString(),
      };
    }
  }

  function restoreSelection() {
    if (!savedSelection) return;
    try {
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelection.range);
    } catch (e) {
      console.warn("[AI Edit] restoreSelection:", e);
    }
  }

  function restoreAndReplace(newText) {
    if (!savedSelection) return false;
    try {
      restoreSelection();
      document.execCommand("insertText", false, newText);
      savedSelection = null;
      return true;
    } catch (e) {
      console.error("[AI Edit] replaceSelection:", e);
      return false;
    }
  }

  // ===================== Toast =====================

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

    if (duration > 0) {
      setTimeout(function () {
        el.classList.remove("show");
        setTimeout(function () {
          el.remove();
        }, 300);
      }, duration);
    }
    return el;
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

  // ===================== Context Menu =====================

  let menuEl = null;

  function buildMenuHTML(cfg, hasSel, hasImage) {
    var html = "";

    if (hasImage) {
      html +=
        '<div class="ai-menu-item" data-action="describe_image">' +
        '<span class="ai-menu-icon">🖼</span>' + escHTML(L.describeImage) + '</div>';
      html += '<div class="ai-menu-sep"></div>';

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

    // Standard edit operations
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

    // AI settings section
    html += '<div class="ai-menu-item ai-menu-sub" data-action="model-parent">';
    html += '<span class="ai-menu-icon">⚙</span>' + escHTML(L.aiModel);
    html += '<span class="ai-menu-arrow">▸</span>';
    html += '<div class="ai-menu-submenu">';
    for (var i = 0; i < cfg.models.length; i++) {
      var m = cfg.models[i];
      var ck = m === cfg.model ? "✓ " : "\u2003";
      html +=
        '<div class="ai-menu-item" data-action="set-model" data-model="' +
        m +
        '">' +
        ck +
        m +
        "</div>";
    }
    html += "</div></div>";

    var wc = cfg.web_search ? "✓ " : "\u2003";
    html +=
      '<div class="ai-menu-item" data-action="toggle-web">' +
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
    if (item.dataset.action === "model-parent" || item.dataset.action === "size-parent") return;

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

  // ===================== Prompt Dialog =====================

  function showPromptDialog(cfg, withContext) {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    var title = withContext ? L.optimizeCtxTitle : L.optimizeTitle;

    overlay.innerHTML =
      '<div class="ai-prompt-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(title) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-prompt-body">' +
      "<label>" + escHTML(L.extraLabel) + "</label>" +
      '<textarea id="ai-prompt-input" rows="4" placeholder="' + escHTML(L.extraPlaceholder) + '"></textarea>' +
      '<div class="ai-prompt-options">' +
      '<label class="ai-prompt-checkbox"><input type="checkbox" id="ai-prompt-web" ' +
      (cfg.web_search ? "checked" : "") +
      "> " + escHTML(L.webSearch) + "</label>" +
      "</div>" +
      "</div>" +
      '<div class="ai-edit-panel-footer">' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn primary" data-action="go">' + escHTML(L.start) + '</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    var inputEl = document.getElementById("ai-prompt-input");
    setTimeout(function () { inputEl.focus(); }, 50);

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        doGo();
      }
    });

    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target === overlay) overlay.remove();
        return;
      }
      if (btn.dataset.action === "close") {
        overlay.remove();
      } else if (btn.dataset.action === "go") {
        doGo();
      }
    });

    function doGo() {
      var extraPrompt = document.getElementById("ai-prompt-input").value.trim();
      var useWeb = document.getElementById("ai-prompt-web").checked;
      overlay.remove();

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      doOptimize(runCfg, withContext, extraPrompt);
    }
  }

  // ===================== Image Prompt Dialog =====================

  function showImagePromptDialog(cfg) {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    overlay.innerHTML =
      '<div class="ai-prompt-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(L.imgTitle) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-prompt-body">' +
      "<label>" + escHTML(L.imgLabel) + "</label>" +
      '<textarea id="ai-prompt-input" rows="4" placeholder="' + escHTML(L.imgPlaceholder) + '"></textarea>' +
      '<div class="ai-prompt-options">' +
      '<label class="ai-prompt-checkbox"><input type="checkbox" id="ai-prompt-web" ' +
      (cfg.web_search ? "checked" : "") +
      "> " + escHTML(L.webSearch) + "</label>" +
      "</div>" +
      "</div>" +
      '<div class="ai-edit-panel-footer">' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn primary" data-action="go">' + escHTML(L.start) + '</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    var inputEl = document.getElementById("ai-prompt-input");
    setTimeout(function () { inputEl.focus(); }, 50);

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        doGo();
      }
    });

    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target === overlay) overlay.remove();
        return;
      }
      if (btn.dataset.action === "close") {
        overlay.remove();
      } else if (btn.dataset.action === "go") {
        doGo();
      }
    });

    function doGo() {
      var extraPrompt = document.getElementById("ai-prompt-input").value.trim();
      var useWeb = document.getElementById("ai-prompt-web").checked;
      overlay.remove();

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      doDescribeImage(runCfg, extraPrompt);
    }
  }

  // ===================== Describe Image =====================

  async function doDescribeImage(cfg, extraPrompt) {
    if (!savedImage) {
      showToast(L.noImage, "error");
      return;
    }

    var imageUrl = await getImageDataUrl(savedImage);
    if (!imageUrl) {
      showToast(L.imgReadFail, "error");
      return;
    }

    imageUrl = await compressImageDataUrl(imageUrl);

    var prompts = cfg.prompts.describe_image || DEFAULT_CONFIG.prompts.describe_image;
    var systemPrompt, userPrompt;
    if (extraPrompt) {
      systemPrompt = isChinese
        ? "你是一位智能助手，请根据用户的指示分析图片并回答。"
        : "You are a helpful assistant. Analyze the image and respond according to the user's instructions.";
      userPrompt = extraPrompt;
    } else {
      systemPrompt = prompts.system;
      userPrompt = prompts.user;
    }

    var toast = showProgressToast(L.analyzing);

    try {
      var result = await callCodexAPI(systemPrompt, userPrompt, cfg, imageUrl);
      toast.remove();
      if (result && result.trim()) {
        showImageResultDialog(result.trim());
      } else {
        showToast(L.emptyResult, "error");
      }
    } catch (e) {
      toast.remove();
      if (e.name === "AbortError") {
        showToast(L.anaStopped, "info");
      } else {
        showToast(L.anaFailed + e.message, "error");
        console.error("[AI Edit]", e);
      }
    } finally {
      currentAbort = null;
    }
  }

  // ===================== Image Result Dialog =====================

  function showImageResultDialog(text) {
    var existing = document.getElementById("ai-edit-result-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-result-dialog";
    overlay.className = "ai-edit-overlay";

    overlay.innerHTML =
      '<div class="ai-prompt-panel ai-result-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(L.imgResultTitle) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-prompt-body">' +
      '<textarea id="ai-result-text" rows="12">' + escHTML(text) + "</textarea>" +
      "</div>" +
      '<div class="ai-edit-panel-footer">' +
      '<button class="ai-btn secondary" data-action="copy">' + escHTML(L.copyBtn) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.closeBtn) + '</button>' +
      '<button class="ai-btn primary" data-action="insert">' + escHTML(L.insertBtn) + '</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target === overlay) overlay.remove();
        return;
      }
      var act = btn.dataset.action;
      if (act === "close") {
        overlay.remove();
      } else if (act === "copy") {
        var resultText = document.getElementById("ai-result-text").value;
        writeToClipboard(resultText);
        showToast(L.copied, "success");
      } else if (act === "insert") {
        var resultText = document.getElementById("ai-result-text").value;
        insertAfterImage(resultText);
        overlay.remove();
      }
    });
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

  // ===================== Optimize =====================

  async function doOptimize(cfg, withContext, extraPrompt) {
    var key = withContext ? "optimize_with_context" : "optimize";
    var prompts = cfg.prompts[key];
    if (!prompts) {
      showToast(L.promptMissing, "error");
      return;
    }
    if (!savedSelection || !savedSelection.text) {
      showToast(L.selectFirst, "error");
      return;
    }

    var selText = savedSelection.text;
    var docText = withContext ? getDocumentText() : "";
    var userPrompt = prompts.user
      .replace(/\{selection\}/g, selText)
      .replace(/\{document\}/g, docText);

    if (extraPrompt) {
      userPrompt = L.extraReq + extraPrompt + "\n\n" + userPrompt;
    }

    var toast = showProgressToast(L.optimizing);

    try {
      var result = await callCodexAPI(prompts.system, userPrompt, cfg);
      if (result && result.trim()) {
        var ok = restoreAndReplace(result.trim());
        toast.remove();
        showToast(ok ? L.optDone : L.optReplaceFail, ok ? "success" : "error");
      } else {
        toast.remove();
        showToast(L.emptyResult, "error");
      }
    } catch (e) {
      toast.remove();
      if (e.name === "AbortError") {
        showToast(L.optStopped, "info");
      } else {
        showToast(L.optFailed + e.message, "error");
        console.error("[AI Edit]", e);
      }
    } finally {
      currentAbort = null;
    }
  }

  // ===================== Settings Panel =====================

  function showSettingsPanel() {
    const existing = document.getElementById("ai-edit-settings");
    if (existing) existing.remove();

    const cfg = loadConfig();
    const overlay = document.createElement("div");
    overlay.id = "ai-edit-settings";
    overlay.className = "ai-edit-overlay";

    overlay.innerHTML =
      '<div class="ai-edit-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(L.settingsTitle) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-edit-panel-body">' +
      "<h4>" + escHTML(L.feat1) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-opt-sys" rows="3">' +
      escHTML(cfg.prompts.optimize.system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-opt-usr" rows="5">' +
      escHTML(cfg.prompts.optimize.user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelection) + '</p>' +
      "<h4>" + escHTML(L.feat2) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-sys" rows="3">' +
      escHTML(cfg.prompts.optimize_with_context.system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-usr" rows="5">' +
      escHTML(cfg.prompts.optimize_with_context.user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelDoc) + '</p>' +
      "<h4>" + escHTML(L.feat3) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-img-sys" rows="3">' +
      escHTML(cfg.prompts.describe_image.system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-img-usr" rows="3">' +
      escHTML(cfg.prompts.describe_image.user) +
      "</textarea>" +
      "</div>" +
      '<div class="ai-edit-panel-footer">' +
      '<button class="ai-btn secondary" data-action="reset">' + escHTML(L.resetDefaults) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<button class="ai-btn primary" data-action="save">' + escHTML(L.save) + '</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target === overlay) overlay.remove();
        return;
      }
      const act = btn.dataset.action;
      if (act === "close") {
        overlay.remove();
      } else if (act === "save") {
        cfg.prompts.optimize.system =
          document.getElementById("ai-s-opt-sys").value;
        cfg.prompts.optimize.user =
          document.getElementById("ai-s-opt-usr").value;
        cfg.prompts.optimize_with_context.system =
          document.getElementById("ai-s-ctx-sys").value;
        cfg.prompts.optimize_with_context.user =
          document.getElementById("ai-s-ctx-usr").value;
        cfg.prompts.describe_image.system =
          document.getElementById("ai-s-img-sys").value;
        cfg.prompts.describe_image.user =
          document.getElementById("ai-s-img-usr").value;
        saveConfig(cfg);
        overlay.remove();
        showToast(L.saved, "success");
      } else if (act === "reset") {
        document.getElementById("ai-s-opt-sys").value =
          DEFAULT_CONFIG.prompts.optimize.system;
        document.getElementById("ai-s-opt-usr").value =
          DEFAULT_CONFIG.prompts.optimize.user;
        document.getElementById("ai-s-ctx-sys").value =
          DEFAULT_CONFIG.prompts.optimize_with_context.system;
        document.getElementById("ai-s-ctx-usr").value =
          DEFAULT_CONFIG.prompts.optimize_with_context.user;
        document.getElementById("ai-s-img-sys").value =
          DEFAULT_CONFIG.prompts.describe_image.system;
        document.getElementById("ai-s-img-usr").value =
          DEFAULT_CONFIG.prompts.describe_image.user;
        showToast(L.restored, "info");
      }
    });
  }

  function escHTML(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ===================== Styles =====================

  function injectStyles() {
    const css = document.createElement("style");
    css.textContent = [
      /* Toast */
      ".ai-edit-toast{position:fixed;top:20px;left:50%;transform:translateX(-50%) translateY(-20px);",
      "padding:10px 24px;border-radius:8px;font-size:14px;z-index:999999;opacity:0;transition:all .3s;",
      "pointer-events:none;font-family:-apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.15)}",
      ".ai-edit-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}",
      ".ai-edit-toast-info{background:#1a73e8;color:#fff}",
      ".ai-edit-toast-success{background:#0d904f;color:#fff}",
      ".ai-edit-toast-error{background:#d93025;color:#fff}",
      ".ai-edit-toast-progress{background:#1a73e8;color:#fff;pointer-events:auto;cursor:default;",
      "display:flex;align-items:center;gap:10px}",
      ".ai-toast-spinner{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);",
      "border-top-color:#fff;border-radius:50%;animation:ai-spin 0.8s linear infinite;flex-shrink:0}",
      "@keyframes ai-spin{to{transform:rotate(360deg)}}",
      ".ai-toast-stop{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);",
      "color:#fff;padding:2px 12px;border-radius:4px;font-size:12px;cursor:pointer;",
      "margin-left:6px;transition:background .15s}",
      ".ai-toast-stop:hover{background:rgba(255,255,255,.35)}",

      /* Context menu */
      ".ai-edit-menu{position:fixed;z-index:999998;min-width:240px;padding:4px 0;",
      "background:rgba(255,255,255,.96);backdrop-filter:blur(20px);",
      "border:1px solid rgba(0,0,0,.12);border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.18);",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;color:#222;",
      "user-select:none;animation:ai-menu-in .12s ease-out}",
      "@keyframes ai-menu-in{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}",
      ".ai-menu-item{padding:6px 16px;cursor:pointer;display:flex;align-items:center;position:relative;white-space:nowrap}",
      ".ai-menu-item:hover{background:rgba(26,115,232,.1)}",
      ".ai-menu-icon{width:20px;text-align:center;margin-right:6px;font-size:12px}",
      ".ai-menu-arrow{margin-left:auto;font-size:10px;opacity:.5}",
      ".ai-menu-shortcut{margin-left:auto;font-size:11px;opacity:.4;padding-left:24px}",
      ".ai-menu-sep{height:1px;margin:4px 8px;background:rgba(0,0,0,.08)}",
      ".ai-menu-sub>.ai-menu-submenu{display:none;position:absolute;left:100%;top:-4px;",
      "min-width:200px;padding:4px 0;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);",
      "border:1px solid rgba(0,0,0,.12);border-radius:8px;box-shadow:0 8px 30px rgba(0,0,0,.18)}",
      ".ai-menu-sub:hover>.ai-menu-submenu{display:block}",

      /* Dark theme */
      "@media(prefers-color-scheme:dark){",
      ".ai-edit-menu{background:rgba(40,40,40,.96);border-color:rgba(255,255,255,.12);color:#ddd}",
      ".ai-menu-item:hover{background:rgba(255,255,255,.1)}",
      ".ai-menu-sep{background:rgba(255,255,255,.1)}",
      ".ai-menu-sub>.ai-menu-submenu{background:rgba(40,40,40,.96);border-color:rgba(255,255,255,.12)}",
      "}",

      /* Settings overlay */
      ".ai-edit-overlay{position:fixed;top:0;left:0;width:100%;height:100%;",
      "background:rgba(0,0,0,.4);z-index:999997;display:flex;align-items:center;justify-content:center;",
      "animation:ai-fade-in .2s}",
      "@keyframes ai-fade-in{from{opacity:0}to{opacity:1}}",
      ".ai-edit-panel{background:#fff;border-radius:12px;width:560px;max-height:80vh;",
      "box-shadow:0 16px 48px rgba(0,0,0,.2);display:flex;flex-direction:column;",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden}",
      ".ai-edit-panel-header{display:flex;align-items:center;padding:16px 20px;border-bottom:1px solid #eee}",
      ".ai-edit-panel-header h3{margin:0;font-size:16px;font-weight:600}",
      ".ai-edit-close{margin-left:auto;background:none;border:none;font-size:22px;cursor:pointer;color:#999;padding:0 4px}",
      ".ai-edit-close:hover{color:#333}",
      ".ai-edit-panel-body{padding:20px;overflow-y:auto;flex:1}",
      ".ai-edit-panel-body h4{margin:16px 0 8px;font-size:14px;font-weight:600;color:#333}",
      ".ai-edit-panel-body h4:first-child{margin-top:0}",
      ".ai-edit-panel-body label{display:block;margin:8px 0 4px;font-size:12px;color:#666;font-weight:500}",
      ".ai-edit-panel-body textarea{width:100%;box-sizing:border-box;padding:8px 10px;",
      "border:1px solid #ddd;border-radius:6px;font-size:13px;font-family:SFMono-Regular,Menlo,monospace;",
      "resize:vertical;line-height:1.5;transition:border-color .2s}",
      ".ai-edit-panel-body textarea:focus{outline:none;border-color:#1a73e8}",
      ".ai-edit-hint{font-size:11px;color:#999;margin:4px 0 12px}",
      ".ai-edit-panel-footer{display:flex;align-items:center;padding:12px 20px;border-top:1px solid #eee;gap:8px}",
      ".ai-edit-spacer{flex:1}",
      ".ai-btn{padding:6px 16px;border-radius:6px;font-size:13px;cursor:pointer;border:none;font-weight:500;transition:background .15s}",
      ".ai-btn.primary{background:#1a73e8;color:#fff}.ai-btn.primary:hover{background:#1557b0}",
      ".ai-btn.secondary{background:#f1f3f4;color:#333}.ai-btn.secondary:hover{background:#e0e2e3}",

      /* Prompt dialog */
      ".ai-prompt-panel{background:#fff;border-radius:12px;width:480px;",
      "box-shadow:0 16px 48px rgba(0,0,0,.2);display:flex;flex-direction:column;",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;overflow:hidden}",
      ".ai-prompt-body{padding:16px 20px}",
      ".ai-prompt-body label{display:block;font-size:13px;color:#555;margin-bottom:8px;font-weight:500}",
      ".ai-prompt-body textarea{width:100%;box-sizing:border-box;padding:10px 12px;",
      "border:1px solid #ddd;border-radius:8px;font-size:14px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;",
      "resize:vertical;line-height:1.5;transition:border-color .2s}",
      ".ai-prompt-body textarea:focus{outline:none;border-color:#1a73e8}",
      ".ai-prompt-options{margin-top:10px;display:flex;align-items:center}",
      ".ai-prompt-checkbox{display:flex;align-items:center;font-size:13px;color:#555;cursor:pointer;gap:6px}",
      ".ai-prompt-checkbox input{margin:0;cursor:pointer}",

      /* Result dialog */
      ".ai-result-panel{width:560px}",
      ".ai-result-panel textarea{min-height:200px}",

      /* Dark settings */
      "@media(prefers-color-scheme:dark){",
      ".ai-edit-panel{background:#2a2a2a;color:#ddd}",
      ".ai-edit-panel-header{border-color:#444}.ai-edit-panel-footer{border-color:#444}",
      ".ai-edit-panel-body h4{color:#ccc}",
      ".ai-edit-panel-body label{color:#999}",
      ".ai-edit-panel-body textarea{background:#333;border-color:#555;color:#ddd}",
      ".ai-edit-panel-body textarea:focus{border-color:#4a9eff}",
      ".ai-edit-close:hover{color:#eee}",
      ".ai-btn.secondary{background:#444;color:#ddd}.ai-btn.secondary:hover{background:#555}",
      ".ai-prompt-panel{background:#2a2a2a;color:#ddd}",
      ".ai-prompt-body label{color:#aaa}",
      ".ai-prompt-body textarea{background:#333;border-color:#555;color:#ddd}",
      ".ai-prompt-body textarea:focus{border-color:#4a9eff}",
      ".ai-prompt-checkbox{color:#aaa}",
      "}",
    ].join("\n");
    document.head.appendChild(css);
  }

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
          saveCurrentSelection();
        } else {
          savedSelection = null;
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

    console.log("[AI Edit] " + L.loaded);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 500);
  } else {
    window.addEventListener("DOMContentLoaded", function () {
      setTimeout(init, 500);
    });
  }
})();
