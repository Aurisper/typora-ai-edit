(function () {
  "use strict";

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
        qaAsk: "AI 问答",
        qaAsking: "AI 正在回答\u2026",
        qaDone: "AI 回答完成",
        qaFailed: "AI 回答失败: ",
        qaStopped: "已停止回答",
        qaTitle: "AI 问答",
        qaLabel: "输入你的问题",
        qaPlaceholder: "例如：请解释量子计算的基本原理 / 帮我写一段自我介绍\u2026",
        qaIncludeDoc: "包含全文上下文",
        feat4: "功能四：AI 问答",
        shortcutLabel: "快捷键设置",
        shortcutQA: "AI 问答",
        shortcutHint: "点击输入框后按下快捷键组合即可录入",
        providerLabel: "API 提供方",
        providerChatGPT: "ChatGPT OAuth 登录",
        providerOpenAI: "OpenAI 兼容登录",
        oauthConnected: "已连接",
        oauthDisconnected: "未连接 — 请通过 oauth-cli-kit 登录",
        apiUrl: "API 地址",
        apiKey: "API Key",
        modelsInput: "模型列表（逗号分隔）",
        saveAndTest: "保存并测试",
        testing: "正在测试模型\u2026",
        testDone: " 个模型可用",
        allUnavailable: "所有模型不可用，请检查 API 地址或 Key",
        modelUnavailable: "\u2717 ",
        testLogFetchModels: "正在获取模型列表\u2026",
        testLogFetchModelsDone: "模型列表获取成功，共 {count} 个模型",
        testLogFetchModelsFail: "模型列表获取失败，将逐个测试",
        testLogSkipNotFound: "\u2717 {model} — 不在可用列表中，跳过",
        testLogTestAvail: "正在测试 {model} 可用性\u2026",
        testLogAvailOk: "\u2713 {model} 可用",
        testLogAvailFail: "\u2717 {model} 不可用",
        testLogTestWeb: "  测试 {model} 联网能力\u2026",
        testLogWebOk: "  \u2713 {model} 支持联网",
        testLogWebFail: "  \u2717 {model} 不支持联网",
        testLogTestVision: "  测试 {model} 图片识别\u2026",
        testLogVisionOk: "  \u2713 {model} 支持图片",
        testLogVisionFail: "  \u2717 {model} 不支持图片",
        testLogComplete: "测试完成！{count} 个模型可用",
        testLogAutoFetch: "模型列表为空，自动从 API 获取\u2026",
        testLogAutoFetchOk: "自动获取到 {count} 个模型",
        testLogAutoFetchFail: "自动获取失败，请手动输入模型名称",
        testMissingFields: "请填写 API 地址和 API Key",
        webNotSupported: "当前模型不支持联网搜索",
        visionNotSupported: "当前模型不支持图片解析",
        stop: "停止",
        confirmInsert: "插入",
        confirmReplace: "替换",
        confirmOk: "确认",
        streamWaiting: "等待 AI 响应\u2026",
        replaceBlock: "替换代码块",
        codeBlockHint: "（已检测到代码块，AI 将直接修改代码）",
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
        qaAsk: "AI Q&A",
        qaAsking: "AI answering\u2026",
        qaDone: "AI answer complete",
        qaFailed: "AI answer failed: ",
        qaStopped: "Answer stopped",
        qaTitle: "AI Q&A",
        qaLabel: "Enter your question",
        qaPlaceholder: "e.g. Explain the basics of quantum computing / Write a self-introduction for me\u2026",
        qaIncludeDoc: "Include full document context",
        feat4: "Feature 4: AI Q&A",
        shortcutLabel: "Keyboard Shortcuts",
        shortcutQA: "AI Q&A",
        shortcutHint: "Click the input field, then press the shortcut key combination",
        providerLabel: "API Provider",
        providerChatGPT: "ChatGPT OAuth Login",
        providerOpenAI: "OpenAI Compatible",
        oauthConnected: "Connected",
        oauthDisconnected: "Not connected \u2014 please log in via oauth-cli-kit",
        apiUrl: "API URL",
        apiKey: "API Key",
        modelsInput: "Models (comma-separated)",
        saveAndTest: "Save & Test",
        testing: "Testing models\u2026",
        testDone: " model(s) available",
        allUnavailable: "All models unavailable \u2014 please check API URL or Key",
        modelUnavailable: "\u2717 ",
        testLogFetchModels: "Fetching model list\u2026",
        testLogFetchModelsDone: "Model list retrieved, {count} models found",
        testLogFetchModelsFail: "Failed to fetch model list, testing individually",
        testLogSkipNotFound: "\u2717 {model} \u2014 not in available list, skipped",
        testLogTestAvail: "Testing {model} availability\u2026",
        testLogAvailOk: "\u2713 {model} available",
        testLogAvailFail: "\u2717 {model} unavailable",
        testLogTestWeb: "  Testing {model} web search\u2026",
        testLogWebOk: "  \u2713 {model} supports web search",
        testLogWebFail: "  \u2717 {model} no web search",
        testLogTestVision: "  Testing {model} vision\u2026",
        testLogVisionOk: "  \u2713 {model} supports vision",
        testLogVisionFail: "  \u2717 {model} no vision",
        testLogComplete: "Testing complete! {count} model(s) available",
        testLogAutoFetch: "Model list empty, auto-fetching from API\u2026",
        testLogAutoFetchOk: "Auto-fetched {count} models",
        testLogAutoFetchFail: "Auto-fetch failed, please enter model names manually",
        testMissingFields: "Please fill in API URL and API Key",
        webNotSupported: "Current model does not support web search",
        visionNotSupported: "Current model does not support image analysis",
        stop: "Stop",
        confirmInsert: "Insert",
        confirmReplace: "Replace",
        confirmOk: "OK",
        streamWaiting: "Waiting for AI response\u2026",
        replaceBlock: "Replace Code Block",
        codeBlockHint: "(Code block detected \u2014 AI will modify code directly)",
        loaded: "Plugin loaded. Right-click on selected text to use AI editing features.",
      };

  // ===================== Config =====================

  const CODEX_URL = "https://chatgpt.com/backend-api/codex/responses";
  const CONFIG_KEY = "typora-ai-edit-config";

  const DEFAULT_CONFIG = {
    provider: "chatgpt",
    model: "gpt-5.4",
    web_search: false,
    openai_compat: {
      base_url: "",
      api_key: "",
      models_input: "",
      models: [],
    },
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
          qa: {
            system: "你是一位知识渊博的 AI 助手，擅长回答各类问题。请用 Markdown 格式回答。",
            user: "{question}",
          },
          qa_with_context: {
            system: "你是一位知识渊博的 AI 助手。以下是用户正在编辑的完整文档，请结合文档上下文来回答用户的问题。请用 Markdown 格式回答。",
            user: "完整文档：\n\n<document>\n{document}\n</document>\n\n用户问题：\n{question}",
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
          qa: {
            system: "You are a knowledgeable AI assistant skilled at answering all kinds of questions. Please respond in Markdown format.",
            user: "{question}",
          },
          qa_with_context: {
            system: "You are a knowledgeable AI assistant. Below is the full document the user is editing. Please answer the user's question with the document as context. Respond in Markdown format.",
            user: "Full document:\n\n<document>\n{document}\n</document>\n\nUser question:\n{question}",
          },
        },
    shortcuts: {
      qa: { key: "e", metaKey: true, shiftKey: false, ctrlKey: false, altKey: false },
    },
  };

  function loadConfig() {
    try {
      const saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          prompts: { ...DEFAULT_CONFIG.prompts, ...(parsed.prompts || {}) },
          shortcuts: { ...DEFAULT_CONFIG.shortcuts, ...(parsed.shortcuts || {}) },
          openai_compat: { ...DEFAULT_CONFIG.openai_compat, ...(parsed.openai_compat || {}) },
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

  // ===================== Platform: File I/O, Token, Image =====================

  function getHomePath() {
    try {
      if (typeof process !== "undefined" && process.env && process.env.HOME) {
        return process.env.HOME;
      }
    } catch (_) {}
    try {
      var adp = window._options && window._options.appDataPath;
      if (adp) {
        var m = adp.match(/^(\/Users\/[^/]+)/);
        if (m) return m[1];
      }
    } catch (_) {}
    try {
      if (window._options) {
        var up = window._options.userPath || window._options.homePath;
        if (up) return up;
      }
    } catch (_) {}
    try {
      if (window.bridge && window.bridge.callSync) {
        var whoami = window.bridge.callSync("controller.runCommandSync", "whoami");
        if (whoami && typeof whoami === "string") {
          return "/Users/" + whoami.trim();
        }
      }
    } catch (_) {}
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
    if (window.bridge && window.bridge.callSync) {
      try {
        var content = window.bridge.callSync("path.readText", filePath);
        if (content) return content;
      } catch (e) {
        console.warn("[AI Edit] bridge.readText failed:", e);
      }
    }
    if (window.reqnode) {
      try {
        return window.reqnode("fs").readFileSync(filePath, "utf-8");
      } catch (e) {
        console.warn("[AI Edit] reqnode.fs failed:", e);
      }
    }
    try {
      if (typeof require === "function") {
        return require("fs").readFileSync(filePath, "utf-8");
      }
    } catch (_) {}
    return null;
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

  // ===================== API =====================

  var currentAbort = null;

  function abortCurrentRequest() {
    if (currentAbort) {
      currentAbort.abort();
      currentAbort = null;
    }
  }

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

    return await parseSSE(resp, config._onChunk);
  }

  async function parseSSE(resp, onChunk) {
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
              if (onChunk) onChunk(ev.delta);
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

  // ===================== OpenAI Compatible API =====================

  async function callOpenAICompatAPI(systemPrompt, userPrompt, config, imageDataUrl) {
    var oc = config.openai_compat || {};
    if (!oc.base_url || !oc.api_key) throw new Error("OpenAI Compatible API not configured");

    currentAbort = new AbortController();

    var url = oc.base_url.replace(/\/+$/, "") + "/chat/completions";
    var headers = {
      Authorization: "Bearer " + oc.api_key,
      "Content-Type": "application/json",
      accept: "text/event-stream",
    };

    var userContent;
    if (imageDataUrl) {
      userContent = [
        { type: "text", text: userPrompt },
        { type: "image_url", image_url: { url: imageDataUrl } },
      ];
    } else {
      userContent = userPrompt;
    }

    var body = {
      model: config.model,
      stream: true,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    };

    if (config.web_search) {
      body.tools = [{ type: "function", function: { name: "web_search", description: "Search the web", parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] } } }];
      body.tool_choice = "auto";
    }

    var resp = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
      signal: currentAbort.signal,
    });

    if (!resp.ok) {
      var errText = await resp.text().catch(function () { return ""; });
      throw new Error("API " + resp.status + ": " + errText.slice(0, 200));
    }

    return await parseOpenAISSE(resp, config._onChunk);
  }

  async function parseOpenAISSE(resp, onChunk) {
    var reader = resp.body.getReader();
    var decoder = new TextDecoder();
    var buf = "";
    var result = "";

    try {
      for (;;) {
        var chunk = await reader.read();
        if (chunk.done) break;
        buf += decoder.decode(chunk.value, { stream: true });

        var parts = buf.split("\n");
        buf = parts.pop();

        for (var i = 0; i < parts.length; i++) {
          var line = parts[i].trim();
          if (!line.startsWith("data:")) continue;
          var data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;

          try {
            var ev = JSON.parse(data);
            if (ev.choices && ev.choices[0] && ev.choices[0].delta && ev.choices[0].delta.content) {
              var delta = ev.choices[0].delta.content;
              result += delta;
              if (onChunk) onChunk(delta);
            }
          } catch (_) {}
        }
      }
    } catch (e) {
      if (e.name === "AbortError") throw e;
      throw e;
    }
    return result;
  }

  // ===================== Unified API entry =====================

  function callAPI(systemPrompt, userPrompt, config, imageDataUrl) {
    if (config.provider === "openai_compat") {
      return callOpenAICompatAPI(systemPrompt, userPrompt, config, imageDataUrl);
    }
    return callCodexAPI(systemPrompt, userPrompt, config, imageDataUrl);
  }

  function getModelCapabilities(cfg) {
    if (cfg.provider !== "openai_compat") {
      return { available: true, web_search: true, vision: true };
    }
    var oc = cfg.openai_compat || {};
    var models = oc.models || [];
    for (var i = 0; i < models.length; i++) {
      if (models[i].name === cfg.model) return models[i];
    }
    return { available: false, web_search: false, vision: false };
  }

  // ===================== Model Testing =====================

  async function testOpenAIModels(baseUrl, apiKey, modelNames, onLog) {
    var log = onLog || function () {};
    var url = baseUrl.replace(/\/+$/, "");
    var headers = { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" };
    var results = [];

    log(L.testLogFetchModels);
    var availableSet = {};
    try {
      var resp = await fetch(url + "/models", { headers: { Authorization: "Bearer " + apiKey } });
      if (resp.ok) {
        var data = await resp.json();
        if (data.data) {
          for (var i = 0; i < data.data.length; i++) {
            availableSet[data.data[i].id] = true;
          }
        }
        log(L.testLogFetchModelsDone.replace("{count}", Object.keys(availableSet).length));
      } else {
        log(L.testLogFetchModelsFail);
      }
    } catch (_) {
      log(L.testLogFetchModelsFail);
    }

    var hasModelsEndpoint = Object.keys(availableSet).length > 0;

    for (var n = 0; n < modelNames.length; n++) {
      var name = modelNames[n].trim();
      if (!name) continue;
      var entry = { name: name, available: false, web_search: false, vision: false };

      if (hasModelsEndpoint && !availableSet[name]) {
        log(L.testLogSkipNotFound.replace("{model}", name));
        results.push(entry);
        continue;
      }

      log(L.testLogTestAvail.replace("{model}", name));
      try {
        var testResp = await fetch(url + "/chat/completions", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            model: name, stream: false, max_tokens: 1,
            messages: [{ role: "user", content: "hi" }],
          }),
        });
        if (testResp.ok) {
          entry.available = true;
          log(L.testLogAvailOk.replace("{model}", name));
        } else {
          log(L.testLogAvailFail.replace("{model}", name));
          results.push(entry);
          continue;
        }
      } catch (_) {
        log(L.testLogAvailFail.replace("{model}", name));
        results.push(entry);
        continue;
      }

      log(L.testLogTestWeb.replace("{model}", name));
      try {
        var toolResp = await fetch(url + "/chat/completions", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            model: name, stream: false, max_tokens: 1,
            messages: [{ role: "user", content: "hi" }],
            tools: [{ type: "function", function: { name: "test", description: "t", parameters: { type: "object", properties: {} } } }],
          }),
        });
        entry.web_search = toolResp.ok;
        log(toolResp.ok ? L.testLogWebOk.replace("{model}", name) : L.testLogWebFail.replace("{model}", name));
      } catch (_) {
        entry.web_search = false;
        log(L.testLogWebFail.replace("{model}", name));
      }

      log(L.testLogTestVision.replace("{model}", name));
      try {
        var imgResp = await fetch(url + "/chat/completions", {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            model: name, stream: false, max_tokens: 1,
            messages: [{ role: "user", content: [
              { type: "text", text: "describe" },
              { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" } },
            ] }],
          }),
        });
        entry.vision = imgResp.ok;
        log(imgResp.ok ? L.testLogVisionOk.replace("{model}", name) : L.testLogVisionFail.replace("{model}", name));
      } catch (_) {
        entry.vision = false;
        log(L.testLogVisionFail.replace("{model}", name));
      }

      results.push(entry);
    }

    return results;
  }

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

  function getCodeBlockContext() {
    var sel = window.getSelection();
    var node = sel && (sel.anchorNode || sel.focusNode);
    if (!node) return null;
    var blockEl = findSpecialBlock(node);
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

    if (node) {
      var blockEl = findSpecialBlock(node);
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
        var cm = savedSelection.blockCM;
        if (savedSelection.fullBlock) {
          cm.setValue(newText);
        } else {
          cm.setSelection(savedSelection.cmFrom, savedSelection.cmTo);
          cm.replaceSelection(newText);
        }
        savedSelection = null;
        return true;
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
      if (codeCtx.cm) {
        try {
          codeCtx.cm.setValue(newText);
          return true;
        } catch (e) {
          console.warn("[AI Edit] CM setValue failed:", e);
        }
      }
      return await replaceInMarkdown(codeCtx.originalSource || codeCtx.source, newText);
    } catch (e) {
      console.error("[AI Edit] replaceCodeBlock:", e);
      writeToClipboard(newText);
      return false;
    }
  }

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

  // ===================== Prompt Dialog Helpers =====================

  function buildPromptDialogHTML(title, label, placeholder, inputId, cfg, opts) {
    opts = opts || {};
    var extra = opts.extraCheckboxes || "";
    var caps = getModelCapabilities(cfg);
    var webDisabled = cfg.provider === "openai_compat" && !caps.web_search;

    return '<div class="ai-prompt-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(title) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-prompt-body">' +
      "<label id='ai-stream-label'>" + escHTML(label) + "</label>" +
      '<textarea id="' + inputId + '" rows="5" placeholder="' + escHTML(placeholder) + '"></textarea>' +
      '<div class="ai-prompt-options" id="ai-stream-options">' +
      '<label class="ai-prompt-checkbox" style="' + (webDisabled ? "opacity:.4" : "") + '"><input type="checkbox" id="ai-prompt-web" ' +
      (cfg.web_search && !webDisabled ? "checked" : "") +
      (webDisabled ? " disabled" : "") +
      "> " + escHTML(L.webSearch) + "</label>" +
      extra +
      "</div>" +
      "</div>" +
      '<div class="ai-edit-panel-footer" id="ai-stream-footer">' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn primary" data-action="go">' + escHTML(L.start) + '</button>' +
      "</div>" +
      "</div>";
  }

  function transformToStreaming(overlay, inputId) {
    var inputEl = document.getElementById(inputId);
    if (inputEl) {
      inputEl.readOnly = true;
      inputEl.value = L.streamWaiting;
      inputEl.style.fontFamily = "-apple-system,BlinkMacSystemFont,sans-serif";
      inputEl.style.fontSize = "13px";
      inputEl.style.lineHeight = "1.6";
      inputEl.rows = 12;
      inputEl.style.color = "inherit";
      inputEl.style.cursor = "default";
    }
    var optionsEl = document.getElementById("ai-stream-options");
    if (optionsEl) optionsEl.style.display = "none";
    var labelEl = document.getElementById("ai-stream-label");
    if (labelEl) labelEl.style.display = "none";

    var footer = document.getElementById("ai-stream-footer");
    if (footer) {
      footer.innerHTML =
        '<button class="ai-btn secondary" data-action="stop" style="background:#d93025;color:#fff">' + escHTML(L.stop) + '</button>' +
        '<div class="ai-edit-spacer"></div>';
    }

    return {
      outputEl: inputEl,
      started: false,
      append: function (delta) {
        if (!this.started) {
          this.started = true;
          if (this.outputEl) this.outputEl.value = "";
        }
        if (this.outputEl) {
          this.outputEl.value += delta;
          this.outputEl.scrollTop = this.outputEl.scrollHeight;
        }
      },
      showResult: function (confirmLabel, extraButtons) {
        if (footer) {
          var html = '<button class="ai-btn secondary" data-action="copy">' + escHTML(L.copyBtn) + '</button>' +
            '<div class="ai-edit-spacer"></div>' +
            '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>';
          if (extraButtons) html += extraButtons;
          html += '<button class="ai-btn primary" data-action="confirm">' + escHTML(confirmLabel) + '</button>';
          footer.innerHTML = html;
        }
        if (this.outputEl) {
          this.outputEl.readOnly = false;
          this.outputEl.style.cursor = "";
        }
      },
      showError: function (msg) {
        if (this.outputEl) {
          this.outputEl.value += "\n\n--- ERROR ---\n" + msg;
          this.outputEl.scrollTop = this.outputEl.scrollHeight;
          this.outputEl.style.color = "#d93025";
        }
        if (footer) {
          footer.innerHTML =
            '<div class="ai-edit-spacer"></div>' +
            '<button class="ai-btn primary" data-action="close">' + escHTML(L.confirmOk) + '</button>';
        }
      },
      getResult: function () {
        return this.outputEl ? this.outputEl.value : "";
      },
    };
  }

  // ===================== Optimize Prompt Dialog =====================

  function showPromptDialog(cfg, withContext) {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    var title = withContext ? L.optimizeCtxTitle : L.optimizeTitle;
    overlay.innerHTML = buildPromptDialogHTML(title, L.extraLabel, L.extraPlaceholder, "ai-prompt-input", cfg);
    document.body.appendChild(overlay);

    var inputEl = document.getElementById("ai-prompt-input");
    setTimeout(function () { inputEl.focus(); }, 50);

    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        doGo();
      }
    });

    var running = false;
    overlay.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) { if (e.target === overlay && !running) overlay.remove(); return; }
      var act = btn.dataset.action;
      if (act === "close") { overlay.remove(); }
      else if (act === "go") { doGo(); }
      else if (act === "stop") { abortCurrentRequest(); }
      else if (act === "copy") { writeToClipboard(stream.getResult()); showToast(L.copied, "success"); }
      else if (act === "confirm") {
        var result = stream.getResult().trim();
        overlay.remove();
        if (result) {
          (async function () {
            var ok = await restoreAndReplace(result);
            showToast(ok ? L.optDone : L.optReplaceFail, ok ? "success" : "error");
          })();
        }
      }
    });

    var stream;
    function doGo() {
      if (running) return;
      var extraPrompt = document.getElementById("ai-prompt-input").value.trim();
      var useWeb = document.getElementById("ai-prompt-web").checked;

      if (!savedSelection || !savedSelection.text) { showToast(L.selectFirst, "error"); return; }
      running = true;
      stream = transformToStreaming(overlay, "ai-prompt-input");

      var key = withContext ? "optimize_with_context" : "optimize";
      var prompts = cfg.prompts[key];
      if (!prompts) { stream.showError(L.promptMissing); running = false; return; }

      var selText = savedSelection.text;
      var docText = withContext ? getDocumentText() : "";
      var userPrompt = prompts.user.replace(/\{selection\}/g, selText).replace(/\{document\}/g, docText);
      if (extraPrompt) userPrompt = L.extraReq + extraPrompt + "\n\n" + userPrompt;

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      runCfg._onChunk = function (delta) { stream.append(delta); };

      callAPI(prompts.system, userPrompt, runCfg).then(function (result) {
        currentAbort = null;
        running = false;
        if (result && result.trim()) {
          stream.showResult(L.confirmReplace);
        } else {
          stream.showError(L.emptyResult);
        }
      }).catch(function (e) {
        currentAbort = null;
        running = false;
        if (e.name === "AbortError") {
          stream.showResult(L.confirmReplace);
        } else {
          stream.showError(e.message);
          console.error("[AI Edit]", e);
        }
      });
    }
  }

  // ===================== Image Prompt Dialog =====================

  function showImagePromptDialog(cfg) {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.id = "ai-edit-prompt-dialog";
    overlay.className = "ai-edit-overlay";

    overlay.innerHTML = buildPromptDialogHTML(L.imgTitle, L.imgLabel, L.imgPlaceholder, "ai-prompt-input", cfg);
    document.body.appendChild(overlay);

    var inputEl = document.getElementById("ai-prompt-input");
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
      else if (act === "insert-img") {
        var result = stream.getResult().trim();
        if (result) insertAfterImage(result);
        overlay.remove();
      }
      else if (act === "confirm") {
        var result = stream.getResult().trim();
        if (result) { writeToClipboard(result); showToast(L.copied, "success"); }
        overlay.remove();
      }
    });

    async function doGo() {
      if (running) return;
      var extraPrompt = document.getElementById("ai-prompt-input").value.trim();
      var useWeb = document.getElementById("ai-prompt-web").checked;

      if (!savedImage) { showToast(L.noImage, "error"); return; }
      running = true;
      stream = transformToStreaming(overlay, "ai-prompt-input");

      var imageUrl = await getImageDataUrl(savedImage);
      if (!imageUrl) { stream.showError(L.imgReadFail); running = false; return; }
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

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      runCfg._onChunk = function (delta) { stream.append(delta); };

      callAPI(systemPrompt, userPrompt, runCfg, imageUrl).then(function (result) {
        currentAbort = null;
        running = false;
        if (result && result.trim()) {
          var insertBtn = '<button class="ai-btn primary" data-action="insert-img" style="margin-right:8px">' + escHTML(L.insertBtn) + '</button>';
          stream.showResult(L.copyBtn, insertBtn);
        } else {
          stream.showError(L.emptyResult);
        }
      }).catch(function (e) {
        currentAbort = null;
        running = false;
        if (e.name === "AbortError") {
          var insertBtn = '<button class="ai-btn primary" data-action="insert-img" style="margin-right:8px">' + escHTML(L.insertBtn) + '</button>';
          stream.showResult(L.copyBtn, insertBtn);
        } else {
          stream.showError(e.message);
          console.error("[AI Edit]", e);
        }
      });
    }
  }

  // ===================== AI Q&A =====================

  function showQAPromptDialog() {
    var existing = document.getElementById("ai-edit-prompt-dialog");
    if (existing) existing.remove();

    var codeCtx = getCodeBlockContext();

    // Save cursor position before dialog steals focus
    var qaInsertTarget = null;
    try {
      var sel = window.getSelection();
      if (sel && (sel.focusNode || sel.anchorNode)) {
        var node = sel.focusNode || sel.anchorNode;
        var el = node.nodeType === 1 ? node : node.parentElement;
        if (el) {
          qaInsertTarget = el.closest("[cid]") || el.closest("p") || el.closest("li") || el.closest("h1,h2,h3,h4,h5,h6") || el;
        }
      }
    } catch (_) {}

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
        overlay.remove();
        if (result) {
          setTimeout(function () {
            insertQAResponse(result, qaInsertTarget);
            showToast(L.qaDone, "success");
          }, 100);
        }
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

  function insertQAResponse(text, targetEl) {
    var lines = text.split("\n");
    var quoted = lines.map(function (l) { return "> " + l; }).join("\n");
    quoted = "\n\n" + quoted + "\n\n";

    try {
      var writeEl = document.getElementById("write");
      if (writeEl) writeEl.focus();

      var sel = window.getSelection();
      var inserted = false;

      if (targetEl && targetEl.parentNode) {
        try {
          var range = document.createRange();
          range.setStartAfter(targetEl);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          inserted = document.execCommand("insertText", false, quoted);
        } catch (_) {}
      }

      if (!inserted) {
        if (writeEl) {
          var range = document.createRange();
          range.selectNodeContents(writeEl);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
        inserted = document.execCommand("insertText", false, quoted);
      }

      if (!inserted) {
        writeToClipboard(text);
        showToast(L.insertFail, "error");
      }
    } catch (e) {
      console.error("[AI Edit] insertQAResponse:", e);
      writeToClipboard(text);
      showToast(L.insertFail, "error");
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

    var oauthOk = false;
    try { oauthOk = !!readToken(); } catch (_) {}

    var ocModelsHtml = "";
    var ocModels = (cfg.openai_compat && cfg.openai_compat.models) || [];
    if (ocModels.length > 0) {
      ocModelsHtml = '<div class="ai-edit-hint" style="margin-top:8px">';
      for (var mi = 0; mi < ocModels.length; mi++) {
        var mm = ocModels[mi];
        var badge = mm.available ? "\u2713" : "\u2717";
        var ws = mm.web_search ? " \uD83C\uDF10" : "";
        var vs = mm.vision ? " \uD83D\uDDBC" : "";
        ocModelsHtml += '<div style="font-size:12px;margin:2px 0;color:' +
          (mm.available ? "#0d904f" : "#d93025") + '">' +
          badge + " " + escHTML(mm.name) + ws + vs + "</div>";
      }
      ocModelsHtml += "</div>";
    }

    overlay.innerHTML =
      '<div class="ai-edit-panel">' +
      '<div class="ai-edit-panel-header">' +
      "<h3>" + escHTML(L.settingsTitle) + "</h3>" +
      '<button class="ai-edit-close" data-action="close">&times;</button>' +
      "</div>" +
      '<div class="ai-edit-panel-body">' +

      "<h4>" + escHTML(L.providerLabel) + "</h4>" +
      '<select id="ai-s-provider" class="ai-select">' +
      '<option value="chatgpt"' + (cfg.provider !== "openai_compat" ? " selected" : "") + '>' + escHTML(L.providerChatGPT) + '</option>' +
      '<option value="openai_compat"' + (cfg.provider === "openai_compat" ? " selected" : "") + '>' + escHTML(L.providerOpenAI) + '</option>' +
      '</select>' +

      '<div id="ai-s-chatgpt-section"' + (cfg.provider === "openai_compat" ? ' style="display:none"' : '') + '>' +
      '<div class="ai-provider-status" style="margin:8px 0;font-size:13px;color:' +
      (oauthOk ? "#0d904f" : "#d93025") + '">' +
      (oauthOk ? "\u2713 " + escHTML(L.oauthConnected) : "\u2717 " + escHTML(L.oauthDisconnected)) +
      "</div>" +
      '</div>' +

      '<div id="ai-s-openai-section"' + (cfg.provider !== "openai_compat" ? ' style="display:none"' : '') + '>' +
      "<label>" + escHTML(L.apiUrl) + "</label>" +
      '<input type="text" id="ai-s-oc-url" class="ai-text-input" placeholder="https://api.example.com/v1" value="' +
      escHTML(cfg.openai_compat.base_url || "") + '" />' +
      "<label>" + escHTML(L.apiKey) + "</label>" +
      '<input type="password" id="ai-s-oc-key" class="ai-text-input" value="' +
      escHTML(cfg.openai_compat.api_key || "") + '" />' +
      "<label>" + escHTML(L.modelsInput) + "</label>" +
      '<input type="text" id="ai-s-oc-models" class="ai-text-input" placeholder="gpt-4o, deepseek-v3, claude-3" value="' +
      escHTML(cfg.openai_compat.models_input || "") + '" />' +
      '<div style="margin-top:10px">' +
      '<button class="ai-btn primary" data-action="test-models">' + escHTML(L.saveAndTest) + '</button>' +
      '</div>' +
      '<div id="ai-test-log" style="display:none;margin-top:10px;max-height:200px;overflow-y:auto;background:var(--ai-bg,#f6f6f6);border:1px solid var(--ai-border,#ddd);border-radius:6px;padding:8px;font-family:monospace;font-size:11px;line-height:1.6;white-space:pre-wrap;color:var(--ai-fg,#333)"></div>' +
      ocModelsHtml +
      '</div>' +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +

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
      "<h4>" + escHTML(L.feat4) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-qa-sys" rows="3">' +
      escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qa-usr" rows="3">' +
      escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}" : "Available variables: {question}") + '</p>' +
      "<label>" + escHTML(L.sysPrompt) + " (" + escHTML(L.qaIncludeDoc) + ")</label>" +
      '<textarea id="ai-s-qac-sys" rows="3">' +
      escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).system) +
      "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qac-usr" rows="5">' +
      escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).user) +
      "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}, {document}" : "Available variables: {question}, {document}") + '</p>' +
      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.shortcutLabel) + "</h4>" +
      '<p class="ai-edit-hint">' + escHTML(L.shortcutHint) + '</p>' +
      '<div class="ai-shortcut-row">' +
      "<label>" + escHTML(L.shortcutQA) + "</label>" +
      '<input type="text" id="ai-s-sc-qa" class="ai-shortcut-input" readonly value="' +
      shortcutDisplay(cfg.shortcuts.qa) + '" />' +
      "</div>" +
      "</div>" +
      '<div class="ai-edit-panel-footer">' +
      '<button class="ai-btn secondary" data-action="reset">' + escHTML(L.resetDefaults) + '</button>' +
      '<div class="ai-edit-spacer"></div>' +
      '<button class="ai-btn secondary" data-action="close">' + escHTML(L.cancel) + '</button>' +
      '<button class="ai-btn primary" data-action="save">' + escHTML(L.save) + '</button>' +
      "</div>" +
      "</div>";

    document.body.appendChild(overlay);

    var providerSel = document.getElementById("ai-s-provider");
    providerSel.addEventListener("change", function () {
      var isCG = providerSel.value !== "openai_compat";
      document.getElementById("ai-s-chatgpt-section").style.display = isCG ? "" : "none";
      document.getElementById("ai-s-openai-section").style.display = isCG ? "none" : "";
    });

    overlay.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) {
        if (e.target === overlay) overlay.remove();
        return;
      }
      const act = btn.dataset.action;
      if (act === "close") {
        overlay.remove();
      } else if (act === "test-models") {
        var testUrl = document.getElementById("ai-s-oc-url").value.trim();
        var testKey = document.getElementById("ai-s-oc-key").value.trim();
        var testInput = document.getElementById("ai-s-oc-models").value.trim();
        var modelsInputEl = document.getElementById("ai-s-oc-models");
        if (!testUrl || !testKey) {
          showToast(L.testMissingFields, "error", 3000);
          return;
        }
        btn.disabled = true;
        btn.style.opacity = ".5";
        var logEl = document.getElementById("ai-test-log");
        if (logEl) {
          logEl.style.display = "block";
          logEl.textContent = "";
        }
        function appendLog(msg) {
          if (!logEl) return;
          logEl.textContent += msg + "\n";
          logEl.scrollTop = logEl.scrollHeight;
        }
        (async function () {
          var names;
          if (testInput) {
            names = testInput.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
          } else {
            appendLog(L.testLogAutoFetch);
            try {
              var mResp = await fetch(testUrl.replace(/\/+$/, "") + "/models", {
                headers: { Authorization: "Bearer " + testKey },
              });
              if (mResp.ok) {
                var mData = await mResp.json();
                if (mData.data && mData.data.length > 0) {
                  names = mData.data.map(function (m) { return m.id; });
                  appendLog(L.testLogAutoFetchOk.replace("{count}", names.length));
                  var autoInput = names.join(", ");
                  modelsInputEl.value = autoInput;
                  testInput = autoInput;
                } else {
                  appendLog(L.testLogAutoFetchFail);
                  btn.disabled = false;
                  btn.style.opacity = "1";
                  return;
                }
              } else {
                appendLog(L.testLogAutoFetchFail + " (HTTP " + mResp.status + ")");
                btn.disabled = false;
                btn.style.opacity = "1";
                return;
              }
            } catch (fetchErr) {
              appendLog(L.testLogAutoFetchFail + " (" + fetchErr.message + ")");
              btn.disabled = false;
              btn.style.opacity = "1";
              return;
            }
          }
          try {
            var results = await testOpenAIModels(testUrl, testKey, names, appendLog);
            cfg.openai_compat.base_url = testUrl;
            cfg.openai_compat.api_key = testKey;
            cfg.openai_compat.models_input = testInput;
            cfg.openai_compat.models = results;
            var avail = results.filter(function (r) { return r.available; });
            if (avail.length > 0) {
              cfg.provider = "openai_compat";
              cfg.model = avail[0].name;
              appendLog("\n" + L.testLogComplete.replace("{count}", avail.length));
            } else {
              appendLog("\n" + L.allUnavailable);
            }
            saveConfig(cfg);
            btn.disabled = false;
            btn.style.opacity = "1";
            var oldOcModels = overlay.querySelector(".ai-edit-hint");
            if (oldOcModels) oldOcModels.remove();
            var newHtml = "";
            for (var ri = 0; ri < results.length; ri++) {
              var rm = results[ri];
              var rbadge = rm.available ? "\u2713" : "\u2717";
              var rws = rm.web_search ? " \uD83C\uDF10" : "";
              var rvs = rm.vision ? " \uD83D\uDDBC" : "";
              newHtml += '<div style="font-size:12px;margin:2px 0;color:' +
                (rm.available ? "#0d904f" : "#d93025") + '">' +
                rbadge + " " + escHTML(rm.name) + rws + rvs + "</div>";
            }
            if (newHtml) {
              var hintDiv = document.createElement("div");
              hintDiv.className = "ai-edit-hint";
              hintDiv.style.marginTop = "8px";
              hintDiv.innerHTML = newHtml;
              logEl.parentNode.insertBefore(hintDiv, logEl.nextSibling);
            }
          } catch (err) {
            appendLog("\n\u2717 " + L.allUnavailable + " (" + err.message + ")");
            btn.disabled = false;
            btn.style.opacity = "1";
          }
        })();
        return;
      } else if (act === "save") {
        cfg.provider = document.getElementById("ai-s-provider").value;
        if (cfg.provider === "openai_compat") {
          cfg.openai_compat.base_url = document.getElementById("ai-s-oc-url").value.trim();
          cfg.openai_compat.api_key = document.getElementById("ai-s-oc-key").value.trim();
          cfg.openai_compat.models_input = document.getElementById("ai-s-oc-models").value.trim();
        }
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
        if (!cfg.prompts.qa) cfg.prompts.qa = {};
        cfg.prompts.qa.system = document.getElementById("ai-s-qa-sys").value;
        cfg.prompts.qa.user = document.getElementById("ai-s-qa-usr").value;
        if (!cfg.prompts.qa_with_context) cfg.prompts.qa_with_context = {};
        cfg.prompts.qa_with_context.system = document.getElementById("ai-s-qac-sys").value;
        cfg.prompts.qa_with_context.user = document.getElementById("ai-s-qac-usr").value;
        var scQa = document.getElementById("ai-s-sc-qa")._shortcut;
        if (scQa) cfg.shortcuts.qa = scQa;
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
        document.getElementById("ai-s-qa-sys").value =
          DEFAULT_CONFIG.prompts.qa.system;
        document.getElementById("ai-s-qa-usr").value =
          DEFAULT_CONFIG.prompts.qa.user;
        document.getElementById("ai-s-qac-sys").value =
          DEFAULT_CONFIG.prompts.qa_with_context.system;
        document.getElementById("ai-s-qac-usr").value =
          DEFAULT_CONFIG.prompts.qa_with_context.user;
        var defQa = DEFAULT_CONFIG.shortcuts.qa;
        document.getElementById("ai-s-sc-qa").value = shortcutDisplay(defQa);
        document.getElementById("ai-s-sc-qa")._shortcut = defQa;
        showToast(L.restored, "info");
      }
    });

    initShortcutRecorder("ai-s-sc-qa", cfg.shortcuts.qa);
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

      /* Provider select & text input */
      ".ai-select{width:100%;box-sizing:border-box;padding:6px 10px;border:1px solid #ddd;border-radius:6px;",
      "font-size:13px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#fff;",
      "cursor:pointer;transition:border-color .2s;outline:none;margin:4px 0}",
      ".ai-select:focus{border-color:#1a73e8}",
      ".ai-text-input{width:100%;box-sizing:border-box;padding:6px 10px;border:1px solid #ddd;border-radius:6px;",
      "font-size:13px;font-family:SFMono-Regular,Menlo,monospace;transition:border-color .2s;outline:none;margin:2px 0}",
      ".ai-text-input:focus{border-color:#1a73e8}",
      ".ai-provider-status{padding:4px 0}",
      ".ai-menu-item.disabled{opacity:.4;cursor:default;pointer-events:none}",

      /* Shortcut config */
      ".ai-shortcut-row{display:flex;align-items:center;gap:12px;margin:8px 0}",
      ".ai-shortcut-row label{flex:0 0 160px;font-size:13px;color:#555;font-weight:500;margin:0}",
      ".ai-shortcut-input{flex:1;padding:6px 12px;border:1px solid #ddd;border-radius:6px;",
      "font-size:14px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;text-align:center;",
      "cursor:pointer;background:#f8f8f8;transition:border-color .2s,box-shadow .2s;outline:none}",
      ".ai-shortcut-input:focus{border-color:#1a73e8;box-shadow:0 0 0 2px rgba(26,115,232,.2);background:#fff}",

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
      ".ai-shortcut-row label{color:#aaa}",
      ".ai-shortcut-input{background:#333;border-color:#555;color:#ddd}",
      ".ai-shortcut-input:focus{border-color:#4a9eff;box-shadow:0 0 0 2px rgba(74,158,255,.2);background:#3a3a3a}",
      ".ai-select{background:#333;border-color:#555;color:#ddd}",
      ".ai-select:focus{border-color:#4a9eff}",
      ".ai-text-input{background:#333;border-color:#555;color:#ddd}",
      ".ai-text-input:focus{border-color:#4a9eff}",
      "#ai-test-log{background:#1e1e1e !important;border-color:#555 !important;color:#ccc !important}",
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

})();
