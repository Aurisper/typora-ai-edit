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
        tavilySearch: "Tavily 搜索",
        tavilySearchOn: "Tavily 搜索已开启",
        tavilySearchOff: "Tavily 搜索已关闭",
        tavilyNoKey: "请先在设置中配置 Tavily API Key",
        tavilySection: "Tavily 联网搜索",
        tavilyApiKey: "Tavily API Key",
        tavilySearching: "Tavily 搜索中…",
        tavilySearchDone: "搜索完成",
        tavilyHint: "从 tavily.com 获取 API Key，联网搜索增强 AI 回答",
        visionNotSupported: "当前模型不支持图片解析",
        stop: "停止",
        confirmInsert: "插入",
        confirmReplace: "替换",
        confirmOk: "确认",
        streamWaiting: "等待 AI 响应\u2026",
        replaceBlock: "替换代码块",
        codeBlockHint: "（已检测到代码块，AI 将直接修改代码）",
        feishuArchive: "保存为飞书在线文档",
        feishuArchiving: "正在归档到飞书…",
        feishuStepTitle: "AI 生成标题",
        feishuStepConvert: "转换 DOCX",
        feishuStepAuth: "飞书鉴权",
        feishuStepUpload: "上传文件",
        feishuStepImport: "导入文档",
        feishuStepDelete: "清理旧版本",
        feishuStepPoll: "等待导入完成",
        feishuDone: "归档成功！",
        feishuOpenDoc: "打开飞书文档 →",
        feishuCopyLink: "复制链接",
        feishuStop: "停止",
        feishuStopped: "已停止归档",
        feishuFailed: "飞书归档失败: ",
        feishuNoContent: "文档为空，无法归档",
        feishuNoCreds: "未找到飞书凭证文件 feishu-credentials.json",
        feishuNoPandoc: "未检测到 Pandoc，请先安装: brew install pandoc",
        feishuPandocFail: "Pandoc 转换失败: ",
        feishuFileTooLarge: "文件超过 20MB 限制",
        feishuTimeout: "飞书导入超时，请稍后重试",
        feishuSection: "飞书在线文档",
        feishuAppId: "App ID",
        feishuAppSecret: "App Secret",
        feishuTargetFolder: "目标文件夹 Token（可选）",
        feishuFolderHint: "在飞书云盘中创建文件夹，从 URL 获取 folder token",
        feishuDefaultEditor: "默认可编辑用户（飞书 user_id，可选）",
        feishuDefaultEditorHint:
          "保存到飞书成功后，自动将该用户加为协作者（可编辑）。user_id 在管理后台通讯录用户详情可见。需开通「添加云文档协作者」等权限；失败时请「添加文档应用」或手动分享。",
        feishuGrantEditFail: "自动添加可编辑协作者失败，请手动「分享」文档或查看控制台日志",
        feishuDocManager: "飞书文档管理",
        feishuDocEmpty: "暂无已归档文档",
        feishuDocNoMatch: "无匹配文档",
        feishuDocEdit: "编辑",
        feishuDocEditing: "加载中…",
        feishuDocEditLoaded: "文档已加载到编辑器",
        feishuDocEditFail: "加载失败: ",
        feishuDocEditNoContent: "该文档无缓存内容，无法编辑",
        feishuDocEditPartial: "注意：该文档为旧版归档，仅加载了前 5000 字符，内容可能不完整",
        feishuDocSaveBack: "保存到飞书",
        feishuDocSaveBackTip: "正在编辑飞书文档：{title}",
        feishuDocSaved: "已覆盖更新到飞书",
        feishuDocDelete: "删除",
        feishuDocDeleting: "删除中…",
        feishuDocDeleted: "文档已删除",
        feishuDocDeleteFail: "删除失败: ",
        feishuDocTime: "归档于 ",
        feishuDocLocal: "本地文件: ",
        feishuDocConfirmDelete: "确认删除飞书文档「{title}」？此操作不可恢复。",
        feishuDocSearch: "搜索标题或内容…",
        feishuDocMatchTitle: "标题匹配",
        feishuDocMatchContent: "内容匹配",
        feishuDocPrev: "上一页",
        feishuDocNext: "下一页",
        feishuDocPageInfo: "第 {page} / {total} 页",
        feishuDocCount: "共 {count} 篇文档",
        feishuDocRefresh: "刷新标题",
        feishuDocRefreshing: "同步中…",
        feishuDocRefreshDone: "已从飞书同步 {n} 篇文档标题",
        feishuDocRefreshFail: "同步标题失败: ",
        feishuDocRefreshNothing: "没有带飞书文档 token 的记录，无法同步",
        logTitle: "操作日志",
        logMenu: "查看日志",
        logEmpty: "暂无日志",
        logCopy: "复制全部",
        logClear: "清除日志",
        logCopied: "日志已复制到剪贴板",
        logCleared: "日志已清除",
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
        tavilySearch: "Tavily Search",
        tavilySearchOn: "Tavily search enabled",
        tavilySearchOff: "Tavily search disabled",
        tavilyNoKey: "Please configure Tavily API Key in settings",
        tavilySection: "Tavily Web Search",
        tavilyApiKey: "Tavily API Key",
        tavilySearching: "Searching via Tavily…",
        tavilySearchDone: "Search complete",
        tavilyHint: "Get an API key from tavily.com for web search-enhanced AI responses",
        visionNotSupported: "Current model does not support image analysis",
        stop: "Stop",
        confirmInsert: "Insert",
        confirmReplace: "Replace",
        confirmOk: "OK",
        streamWaiting: "Waiting for AI response\u2026",
        replaceBlock: "Replace Code Block",
        codeBlockHint: "(Code block detected \u2014 AI will modify code directly)",
        feishuArchive: "Save as Feishu Doc",
        feishuArchiving: "Archiving to Feishu…",
        feishuStepTitle: "Generate title",
        feishuStepConvert: "Convert DOCX",
        feishuStepAuth: "Authenticate",
        feishuStepUpload: "Upload file",
        feishuStepImport: "Import document",
        feishuStepDelete: "Clean old version",
        feishuStepPoll: "Waiting for import",
        feishuDone: "Archive successful!",
        feishuOpenDoc: "Open Feishu doc →",
        feishuCopyLink: "Copy link",
        feishuStop: "Stop",
        feishuStopped: "Archive stopped",
        feishuFailed: "Feishu archive failed: ",
        feishuNoContent: "Document is empty, cannot archive",
        feishuNoCreds: "Feishu credentials file not found (feishu-credentials.json)",
        feishuNoPandoc: "Pandoc not found. Install: brew install pandoc",
        feishuPandocFail: "Pandoc conversion failed: ",
        feishuFileTooLarge: "File exceeds 20MB limit",
        feishuTimeout: "Feishu import timed out, please retry",
        feishuSection: "Feishu Integration",
        feishuAppId: "App ID",
        feishuAppSecret: "App Secret",
        feishuTargetFolder: "Target Folder Token (optional)",
        feishuFolderHint: "Create a folder in Feishu Drive, copy folder token from URL",
        feishuDefaultEditor: "Default editor (Feishu user_id, optional)",
        feishuDefaultEditorHint:
          "After save to Feishu, add this user as collaborator (edit). Find user_id in Admin → Contacts. Enable docs:permission.member:create; if it fails, use \"Add doc app\" on the doc or share manually.",
        feishuGrantEditFail: "Could not auto-add editor — share the doc manually or check DevTools logs",
        feishuDocManager: "Feishu Documents",
        feishuDocEmpty: "No archived documents yet",
        feishuDocNoMatch: "No matching documents",
        feishuDocEdit: "Edit",
        feishuDocEditing: "Loading…",
        feishuDocEditLoaded: "Document loaded into editor",
        feishuDocEditFail: "Load failed: ",
        feishuDocEditNoContent: "No cached content for this document",
        feishuDocEditPartial: "Note: This is an older archive. Only the first 5000 characters were loaded — content may be incomplete",
        feishuDocSaveBack: "Save to Feishu",
        feishuDocSaveBackTip: "Editing Feishu doc: {title}",
        feishuDocSaved: "Updated to Feishu",
        feishuDocDelete: "Delete",
        feishuDocDeleting: "Deleting…",
        feishuDocDeleted: "Document deleted",
        feishuDocDeleteFail: "Delete failed: ",
        feishuDocTime: "Archived at ",
        feishuDocLocal: "Local file: ",
        feishuDocConfirmDelete: "Delete Feishu document \"{title}\"? This cannot be undone.",
        feishuDocSearch: "Search title or content…",
        feishuDocMatchTitle: "title match",
        feishuDocMatchContent: "content match",
        feishuDocPrev: "Prev",
        feishuDocNext: "Next",
        feishuDocPageInfo: "Page {page} / {total}",
        feishuDocCount: "{count} document(s)",
        feishuDocRefresh: "Refresh titles",
        feishuDocRefreshing: "Syncing…",
        feishuDocRefreshDone: "Synced titles for {n} document(s) from Feishu",
        feishuDocRefreshFail: "Failed to sync titles: ",
        feishuDocRefreshNothing: "No entries with a Feishu doc token to sync",
        logTitle: "Operation Log",
        logMenu: "View Log",
        logEmpty: "No logs yet",
        logCopy: "Copy All",
        logClear: "Clear Log",
        logCopied: "Log copied to clipboard",
        logCleared: "Log cleared",
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
            system: "你是一位知识渊博的 AI 助手，擅长回答各类问题。请用纯文本格式回答，不要使用任何 Markdown 标记（如标题 #、加粗 **、列表 - 等）。直接以自然段落形式回答。",
            user: "{question}",
          },
          qa_with_context: {
            system: "你是一位知识渊博的 AI 助手。以下是用户正在编辑的完整文档，请结合文档上下文来回答用户的问题。请用纯文本格式回答，不要使用任何 Markdown 标记（如标题 #、加粗 **、列表 - 等）。直接以自然段落形式回答。",
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
            system: "You are a knowledgeable AI assistant skilled at answering all kinds of questions. Please respond in plain text without any Markdown formatting (no headings #, bold **, lists -, etc.). Answer in natural paragraphs.",
            user: "{question}",
          },
          qa_with_context: {
            system: "You are a knowledgeable AI assistant. Below is the full document the user is editing. Please answer the user's question with the document as context. Please respond in plain text without any Markdown formatting (no headings #, bold **, lists -, etc.). Answer in natural paragraphs.",
            user: "Full document:\n\n<document>\n{document}\n</document>\n\nUser question:\n{question}",
          },
        },
    shortcuts: {
      qa: { key: "e", metaKey: true, shiftKey: false, ctrlKey: false, altKey: false },
    },
    tavily: {
      api_key: "",
      enabled: false,
    },
    feishu: {
      app_id: "",
      app_secret: "",
      target_folder: "",
      default_editor_userid: "",
    },
  };

  function mergeConfigLayer(base, patch) {
    if (!patch || typeof patch !== "object") return base;
    return {
      ...base,
      ...patch,
      prompts: { ...base.prompts, ...(patch.prompts || {}) },
      shortcuts: { ...base.shortcuts, ...(patch.shortcuts || {}) },
      openai_compat: { ...base.openai_compat, ...(patch.openai_compat || {}) },
      tavily: { ...base.tavily, ...(patch.tavily || {}) },
      feishu: { ...base.feishu, ...(patch.feishu || {}) },
    };
  }

  function loadConfig() {
    var cfg = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    try {
      var saved = localStorage.getItem(CONFIG_KEY);
      if (saved) {
        cfg = mergeConfigLayer(cfg, JSON.parse(saved));
      }
    } catch (e) {
      console.error("[AI Edit] loadConfig localStorage:", e);
    }
    try {
      var privPath = typeof getPrivateConfigPath === "function" ? getPrivateConfigPath() : null;
      if (privPath && typeof readFileContent === "function") {
        var raw = readFileContent(privPath);
        if (raw && raw.trim()) {
          cfg = mergeConfigLayer(cfg, JSON.parse(raw));
        }
      }
    } catch (e2) {
      console.warn("[AI Edit] loadConfig private file:", e2);
    }
    return cfg;
  }

  function saveConfig(cfg) {
    var json = JSON.stringify(cfg);
    localStorage.setItem(CONFIG_KEY, json);
    try {
      var privPath = typeof getPrivateConfigPath === "function" ? getPrivateConfigPath() : null;
      if (privPath && typeof writeFileContent === "function") {
        if (!writeFileContent(privPath, JSON.stringify(cfg, null, 2))) {
          console.warn("[AI Edit] Private config not written (no file backend):", privPath);
        }
      }
    } catch (e) {
      console.warn("[AI Edit] saveConfig private file:", e);
    }
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

  /** Write UTF-8 text; returns true on success. */
  function writeFileContent(filePath, content) {
    if (window.bridge && window.bridge.callSync) {
      try {
        window.bridge.callSync("path.writeText", filePath, content);
        return true;
      } catch (e) {
        console.warn("[AI Edit] bridge.writeText failed:", e);
      }
    }
    if (window.reqnode) {
      try {
        var fs = window.reqnode("fs");
        if (fs && fs.writeFileSync) {
          fs.writeFileSync(filePath, content, "utf8");
          return true;
        }
      } catch (e) {
        console.warn("[AI Edit] reqnode write failed:", e);
      }
    }
    try {
      if (typeof require === "function") {
        require("fs").writeFileSync(filePath, content, "utf8");
        return true;
      }
    } catch (_) {}
    return false;
  }

  /** Full settings JSON outside the repo (never commit). */
  function getPrivateConfigPath() {
    var home = getHomePath();
    return home ? home + "/.typora-ai-edit.local.json" : null;
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
      var errMsg = "API " + resp.status + ": " + errText.slice(0, 200);
      pluginLog("error", "Codex API: " + errMsg);
      throw new Error(errMsg);
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
      var errMsg = "API " + resp.status + ": " + errText.slice(0, 200);
      pluginLog("error", "OpenAI API: " + errMsg);
      throw new Error(errMsg);
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

  // ===================== Tavily Search =====================

  async function callTavilySearch(query, apiKey) {
    var resp = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: query.slice(0, 400),
        search_depth: "basic",
        include_answer: true,
        max_results: 5,
      }),
    });
    if (!resp.ok) {
      var errText = await resp.text().catch(function () { return ""; });
      throw new Error("Tavily " + resp.status + ": " + errText.slice(0, 200));
    }
    var data = await resp.json();
    var parts = [];
    if (data.answer) {
      parts.push((isChinese ? "【搜索摘要】\n" : "[Search Summary]\n") + data.answer);
    }
    if (data.results && data.results.length > 0) {
      parts.push(isChinese ? "【搜索结果】" : "[Search Results]");
      for (var i = 0; i < data.results.length; i++) {
        var r = data.results[i];
        parts.push((i + 1) + ". " + (r.title || "") + "\n   " + (r.url || "") + "\n   " + (r.content || "").slice(0, 500));
      }
    }
    return parts.length > 0 ? parts.join("\n\n") : "";
  }

  // ===================== Unified API entry =====================

  async function callAPI(systemPrompt, userPrompt, config, imageDataUrl) {
    if (config._tavily_search && config.tavily && config.tavily.api_key) {
      try {
        var tq = config._tavily_query || userPrompt.slice(0, 400);
        pluginLog("info", "Tavily search: " + tq.slice(0, 80));
        var tavilyContext = await callTavilySearch(tq, config.tavily.api_key);
        if (tavilyContext) {
          var prefix = isChinese
            ? "以下是通过联网搜索获取的参考资料，请结合这些信息回答：\n\n"
            : "Below is reference material from a web search. Please use it to inform your response:\n\n";
          userPrompt = prefix + tavilyContext + "\n\n---\n\n" + userPrompt;
          pluginLog("info", "Tavily search results injected (" + tavilyContext.length + " chars)");
        }
      } catch (e) {
        pluginLog("warn", "Tavily search failed: " + e.message);
      }
    }
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

    var tavilyDisabled = !(cfg.tavily && cfg.tavily.api_key);
    var tc = cfg.tavily && cfg.tavily.enabled && !tavilyDisabled ? "\u2713 " : "\u2003";
    html +=
      '<div class="ai-menu-item' + (tavilyDisabled ? " disabled" : "") + '" data-action="toggle-tavily">' +
      '<span class="ai-menu-icon">🔍</span>' +
      tc +
      escHTML(L.tavilySearch) + "</div>";
    html += '<div class="ai-menu-sep"></div>';
    html +=
      '<div class="ai-menu-item" data-action="settings">' +
      '<span class="ai-menu-icon">⚙</span>' + escHTML(L.aiEditSettings) + '</div>';

    html += '<div class="ai-menu-sep"></div>';
    html +=
      '<div class="ai-menu-item" data-action="feishu_archive">' +
      '<span class="ai-menu-icon">📤</span>' + escHTML(L.feishuArchive) + '</div>';
    html +=
      '<div class="ai-menu-item" data-action="feishu_docs">' +
      '<span class="ai-menu-icon">📂</span>' + escHTML(L.feishuDocManager) + '</div>';
    html +=
      '<div class="ai-menu-item" data-action="view_log">' +
      '<span class="ai-menu-icon">📋</span>' + escHTML(L.logMenu) + '</div>';

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
      pluginLog("info", "Model switched: " + cfg.model);
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
    } else if (action === "toggle-tavily") {
      if (!cfg.tavily || !cfg.tavily.api_key) {
        showToast(L.tavilyNoKey, "info");
        return;
      }
      cfg.tavily.enabled = !cfg.tavily.enabled;
      saveConfig(cfg);
      showToast(cfg.tavily.enabled ? L.tavilySearchOn : L.tavilySearchOff, "success");
    } else if (action === "settings") {
      showSettingsPanel();
    } else if (action === "feishu_archive") {
      archiveToFeishu();
    } else if (action === "feishu_docs") {
      showFeishuDocManager();
    } else if (action === "view_log") {
      showLogPanel();
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
    var tavilyDisabled = !(cfg.tavily && cfg.tavily.api_key);
    var tavilyChecked = cfg.tavily && cfg.tavily.enabled && !tavilyDisabled;

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
      '<label class="ai-prompt-checkbox" style="margin-left:16px;' + (tavilyDisabled ? "opacity:.4" : "") + '"><input type="checkbox" id="ai-prompt-tavily" ' +
      (tavilyChecked ? "checked" : "") +
      (tavilyDisabled ? " disabled" : "") +
      "> " + escHTML(L.tavilySearch) + "</label>" +
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
            await sleep(150);
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
      var useTavily = document.getElementById("ai-prompt-tavily") && document.getElementById("ai-prompt-tavily").checked;

      if (!savedSelection || !savedSelection.text) { showToast(L.selectFirst, "error"); return; }
      running = true;
      stream = transformToStreaming(overlay, "ai-prompt-input");
      if (useTavily) stream.outputEl.value = L.tavilySearching;

      var key = withContext ? "optimize_with_context" : "optimize";
      var prompts = cfg.prompts[key];
      if (!prompts) { stream.showError(L.promptMissing); running = false; return; }

      var selText = savedSelection.text;
      var docText = withContext ? getDocumentText() : "";
      var userPrompt = prompts.user.replace(/\{selection\}/g, selText).replace(/\{document\}/g, docText);
      if (extraPrompt) userPrompt = L.extraReq + extraPrompt + "\n\n" + userPrompt;

      var runCfg = JSON.parse(JSON.stringify(cfg));
      runCfg.web_search = useWeb;
      runCfg._tavily_search = useTavily;
      runCfg._tavily_query = extraPrompt || selText.slice(0, 300);
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
          pluginLog("error", "Optimize failed: " + e.message);
          stream.showError(e.message);
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
      var useTavily = document.getElementById("ai-prompt-tavily") && document.getElementById("ai-prompt-tavily").checked;

      if (!savedImage) { showToast(L.noImage, "error"); return; }
      running = true;
      stream = transformToStreaming(overlay, "ai-prompt-input");
      if (useTavily) stream.outputEl.value = L.tavilySearching;

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
      runCfg._tavily_search = useTavily;
      if (useTavily && extraPrompt) runCfg._tavily_query = extraPrompt;
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
          pluginLog("error", "Image analysis failed: " + e.message);
          stream.showError(e.message);
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
            await sleep(150);
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
      var useTavily = document.getElementById("ai-prompt-tavily") && document.getElementById("ai-prompt-tavily").checked;
      var withContext = document.getElementById("ai-qa-ctx").checked;

      running = true;
      stream = transformToStreaming(overlay, "ai-qa-input");
      if (useTavily) stream.outputEl.value = L.tavilySearching;

      var systemPrompt, userPrompt;

      if (codeCtx) {
        systemPrompt = isChinese
          ? "你是一位编程助手。用户正在编辑一个代码块。如果用户要求修改代码，请直接返回完整的修改后代码，不要添加任何解释、markdown 标记或代码围栏（```）。如果用户询问关于代码的问题，请用纯文本格式回答，不要使用任何 Markdown 标记。"
          : "You are a coding assistant. The user is editing a code block. If the user asks to modify the code, return ONLY the complete modified code without any explanation, markdown formatting, or code fences (```). If the user asks a question about the code, respond in plain text without any Markdown formatting.";
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
      runCfg._tavily_search = useTavily;
      runCfg._tavily_query = question;
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
          pluginLog("error", "QA failed: " + e.message);
          stream.showError(e.message);
        }
      });
    }
  }

  function insertQAResponse(text, targetEl) {
    var quoted = "\n\n" + text + "\n\n";

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
      pluginLog("error", "QA insert failed: " + e.message);
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
      '<textarea id="ai-s-opt-sys" rows="3">' + escHTML(cfg.prompts.optimize.system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-opt-usr" rows="5">' + escHTML(cfg.prompts.optimize.user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelection) + '</p>' +
      "<h4>" + escHTML(L.feat2) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-sys" rows="3">' + escHTML(cfg.prompts.optimize_with_context.system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-ctx-usr" rows="5">' + escHTML(cfg.prompts.optimize_with_context.user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(L.varsSelDoc) + '</p>' +
      "<h4>" + escHTML(L.feat3) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-img-sys" rows="3">' + escHTML(cfg.prompts.describe_image.system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-img-usr" rows="3">' + escHTML(cfg.prompts.describe_image.user) + "</textarea>" +
      "<h4>" + escHTML(L.feat4) + "</h4>" +
      "<label>" + escHTML(L.sysPrompt) + "</label>" +
      '<textarea id="ai-s-qa-sys" rows="3">' + escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qa-usr" rows="3">' + escHTML((cfg.prompts.qa || DEFAULT_CONFIG.prompts.qa).user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}" : "Available variables: {question}") + '</p>' +
      "<label>" + escHTML(L.sysPrompt) + " (" + escHTML(L.qaIncludeDoc) + ")</label>" +
      '<textarea id="ai-s-qac-sys" rows="3">' + escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).system) + "</textarea>" +
      "<label>" + escHTML(L.usrPrompt) + "</label>" +
      '<textarea id="ai-s-qac-usr" rows="5">' + escHTML((cfg.prompts.qa_with_context || DEFAULT_CONFIG.prompts.qa_with_context).user) + "</textarea>" +
      '<p class="ai-edit-hint">' + escHTML(isChinese ? "可用变量: {question}, {document}" : "Available variables: {question}, {document}") + '</p>' +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.shortcutLabel) + "</h4>" +
      '<p class="ai-edit-hint">' + escHTML(L.shortcutHint) + '</p>' +
      '<div class="ai-shortcut-row">' +
      "<label>" + escHTML(L.shortcutQA) + "</label>" +
      '<input type="text" id="ai-s-sc-qa" class="ai-shortcut-input" readonly value="' +
      shortcutDisplay(cfg.shortcuts.qa) + '" />' +
      "</div>" +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.tavilySection) + "</h4>" +
      "<label>" + escHTML(L.tavilyApiKey) + "</label>" +
      '<input type="password" id="ai-s-tavily-key" class="ai-text-input" placeholder="tvly-xxxxxxxxxxxxxxxx" value="' +
      escHTML((cfg.tavily && cfg.tavily.api_key) || "") + '" />' +
      '<p class="ai-edit-hint">' + escHTML(L.tavilyHint) + '</p>' +

      '<div class="ai-menu-sep" style="margin:16px 0"></div>' +
      "<h4>" + escHTML(L.feishuSection) + "</h4>" +
      "<label>" + escHTML(L.feishuAppId) + "</label>" +
      '<input type="text" id="ai-s-feishu-appid" class="ai-text-input" placeholder="cli_xxxxxxxxxxxxx" value="' +
      escHTML(cfg.feishu.app_id || "") + '" />' +
      "<label>" + escHTML(L.feishuAppSecret) + "</label>" +
      '<input type="password" id="ai-s-feishu-secret" class="ai-text-input" value="' +
      escHTML(cfg.feishu.app_secret || "") + '" />' +
      "<label>" + escHTML(L.feishuTargetFolder) + "</label>" +
      '<input type="text" id="ai-s-feishu-folder" class="ai-text-input" value="' +
      escHTML(cfg.feishu.target_folder || "") + '" />' +
      '<p class="ai-edit-hint">' + escHTML(L.feishuFolderHint) + '</p>' +
      "<label>" + escHTML(L.feishuDefaultEditor) + "</label>" +
      '<input type="text" id="ai-s-feishu-editor-userid" class="ai-text-input" placeholder="9ddf747a" value="' +
      escHTML((cfg.feishu && cfg.feishu.default_editor_userid) || "") + '" />' +
      '<p class="ai-edit-hint">' + escHTML(L.feishuDefaultEditorHint) + '</p>' +

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
        settingsHandleTestModels(cfg, btn, overlay);
      } else if (act === "save") {
        settingsHandleSave(cfg, overlay);
      } else if (act === "reset") {
        settingsHandleReset();
      }
    });

    initShortcutRecorder("ai-s-sc-qa", cfg.shortcuts.qa);
  }

  // ===================== Settings: Save / Reset / Test =====================

  function settingsHandleSave(cfg, overlay) {
    cfg.provider = document.getElementById("ai-s-provider").value;
    if (cfg.provider === "openai_compat") {
      cfg.openai_compat.base_url = document.getElementById("ai-s-oc-url").value.trim();
      cfg.openai_compat.api_key = document.getElementById("ai-s-oc-key").value.trim();
      cfg.openai_compat.models_input = document.getElementById("ai-s-oc-models").value.trim();
    }
    cfg.prompts.optimize.system = document.getElementById("ai-s-opt-sys").value;
    cfg.prompts.optimize.user = document.getElementById("ai-s-opt-usr").value;
    cfg.prompts.optimize_with_context.system = document.getElementById("ai-s-ctx-sys").value;
    cfg.prompts.optimize_with_context.user = document.getElementById("ai-s-ctx-usr").value;
    cfg.prompts.describe_image.system = document.getElementById("ai-s-img-sys").value;
    cfg.prompts.describe_image.user = document.getElementById("ai-s-img-usr").value;
    if (!cfg.prompts.qa) cfg.prompts.qa = {};
    cfg.prompts.qa.system = document.getElementById("ai-s-qa-sys").value;
    cfg.prompts.qa.user = document.getElementById("ai-s-qa-usr").value;
    if (!cfg.prompts.qa_with_context) cfg.prompts.qa_with_context = {};
    cfg.prompts.qa_with_context.system = document.getElementById("ai-s-qac-sys").value;
    cfg.prompts.qa_with_context.user = document.getElementById("ai-s-qac-usr").value;
    var scQa = document.getElementById("ai-s-sc-qa")._shortcut;
    if (scQa) cfg.shortcuts.qa = scQa;
    cfg.tavily = cfg.tavily || {};
    cfg.tavily.api_key = document.getElementById("ai-s-tavily-key").value.trim();
    cfg.feishu = cfg.feishu || {};
    cfg.feishu.app_id = document.getElementById("ai-s-feishu-appid").value.trim();
    cfg.feishu.app_secret = document.getElementById("ai-s-feishu-secret").value.trim();
    cfg.feishu.target_folder = document.getElementById("ai-s-feishu-folder").value.trim();
    cfg.feishu.default_editor_userid = document.getElementById("ai-s-feishu-editor-userid").value.trim();
    saveConfig(cfg);
    pluginLog("info", "Settings saved");
    overlay.remove();
    showToast(L.saved, "success");
  }

  function settingsHandleReset() {
    document.getElementById("ai-s-opt-sys").value = DEFAULT_CONFIG.prompts.optimize.system;
    document.getElementById("ai-s-opt-usr").value = DEFAULT_CONFIG.prompts.optimize.user;
    document.getElementById("ai-s-ctx-sys").value = DEFAULT_CONFIG.prompts.optimize_with_context.system;
    document.getElementById("ai-s-ctx-usr").value = DEFAULT_CONFIG.prompts.optimize_with_context.user;
    document.getElementById("ai-s-img-sys").value = DEFAULT_CONFIG.prompts.describe_image.system;
    document.getElementById("ai-s-img-usr").value = DEFAULT_CONFIG.prompts.describe_image.user;
    document.getElementById("ai-s-qa-sys").value = DEFAULT_CONFIG.prompts.qa.system;
    document.getElementById("ai-s-qa-usr").value = DEFAULT_CONFIG.prompts.qa.user;
    document.getElementById("ai-s-qac-sys").value = DEFAULT_CONFIG.prompts.qa_with_context.system;
    document.getElementById("ai-s-qac-usr").value = DEFAULT_CONFIG.prompts.qa_with_context.user;
    var defQa = DEFAULT_CONFIG.shortcuts.qa;
    document.getElementById("ai-s-sc-qa").value = shortcutDisplay(defQa);
    document.getElementById("ai-s-sc-qa")._shortcut = defQa;
    document.getElementById("ai-s-tavily-key").value = "";
    document.getElementById("ai-s-feishu-appid").value = "";
    document.getElementById("ai-s-feishu-secret").value = "";
    document.getElementById("ai-s-feishu-folder").value = "";
    document.getElementById("ai-s-feishu-editor-userid").value = "";
    showToast(L.restored, "info");
  }

  function settingsHandleTestModels(cfg, btn, overlay) {
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

      /* Feishu progress overlay */
      ".ai-feishu-progress{position:fixed;top:0;left:0;width:100%;height:100%;",
      "background:rgba(0,0,0,.4);z-index:999997;display:flex;align-items:center;justify-content:center;",
      "opacity:0;transition:opacity .3s}",
      ".ai-feishu-progress.show{opacity:1}",
      ".ai-feishu-progress-inner{background:#fff;border-radius:16px;padding:32px 40px;",
      "min-width:360px;box-shadow:0 16px 48px rgba(0,0,0,.2);",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;text-align:center}",
      ".ai-feishu-title{font-size:16px;font-weight:600;margin-bottom:24px;color:#333}",
      ".ai-feishu-steps{display:flex;flex-direction:column;gap:12px;text-align:left;margin-bottom:20px}",
      ".ai-feishu-step{display:flex;align-items:center;gap:10px;font-size:13px;color:#999;transition:color .3s}",
      ".ai-feishu-step.active{color:#1a73e8;font-weight:500}",
      ".ai-feishu-step.done{color:#0d904f}",
      ".ai-feishu-step-dot{width:18px;height:18px;border-radius:50%;border:2px solid #ddd;",
      "display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .3s;font-size:10px}",
      ".ai-feishu-step.active .ai-feishu-step-dot{border-color:#1a73e8;",
      "animation:ai-spin 0.8s linear infinite;border-top-color:transparent}",
      ".ai-feishu-step.done .ai-feishu-step-dot{border-color:#0d904f;background:#0d904f;color:#fff}",
      ".ai-feishu-step.done .ai-feishu-step-dot::after{content:'✓'}",
      ".ai-feishu-status{font-size:12px;color:#888;margin-top:4px}",
      ".ai-feishu-stop{margin-top:16px;padding:6px 24px;border-radius:8px;font-size:13px;",
      "cursor:pointer;border:1px solid #e0e0e0;background:#fff;color:#d93025;font-weight:500;",
      "transition:all .15s;font-family:-apple-system,BlinkMacSystemFont,sans-serif}",
      ".ai-feishu-stop:hover{background:#fce8e6;border-color:#f5c6c2}",

      /* Feishu success overlay */
      ".ai-feishu-success{position:fixed;top:0;left:0;width:100%;height:100%;",
      "background:rgba(0,0,0,.4);z-index:999997;display:flex;align-items:center;justify-content:center;",
      "opacity:0;transition:opacity .3s}",
      ".ai-feishu-success.show{opacity:1}",
      ".ai-feishu-success-inner{background:#fff;border-radius:16px;padding:32px 40px;",
      "min-width:360px;box-shadow:0 16px 48px rgba(0,0,0,.2);",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;text-align:center}",
      ".ai-feishu-success-icon{width:48px;height:48px;border-radius:50%;background:#0d904f;",
      "color:#fff;font-size:24px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}",
      ".ai-feishu-success-title{font-size:18px;font-weight:600;color:#333;margin-bottom:8px}",
      ".ai-feishu-success-doc{font-size:14px;color:#666;margin-bottom:16px}",
      ".ai-feishu-success-link{display:inline-block;color:#1a73e8;font-size:14px;font-weight:500;",
      "text-decoration:none;margin-bottom:20px}",
      ".ai-feishu-success-link:hover{text-decoration:underline}",
      ".ai-feishu-success-actions{display:flex;gap:8px;justify-content:center}",
      ".ai-feishu-btn-copy{padding:8px 20px;border-radius:8px;font-size:13px;cursor:pointer;",
      "border:1px solid #ddd;background:#f8f8f8;color:#333;font-weight:500;transition:background .15s}",
      ".ai-feishu-btn-copy:hover{background:#eee}",
      ".ai-feishu-btn-close{padding:8px 20px;border-radius:8px;font-size:13px;cursor:pointer;",
      "border:none;background:#1a73e8;color:#fff;font-weight:500;transition:background .15s}",
      ".ai-feishu-btn-close:hover{background:#1557b0}",

      /* Log panel */
      ".ai-log-panel{width:620px;max-height:85vh}",
      ".ai-log-body{padding:0 !important}",
      ".ai-log-list{font-family:SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;",
      "line-height:1.6;max-height:60vh;overflow-y:auto;padding:12px 16px}",
      ".ai-log-entry{display:flex;align-items:flex-start;gap:8px;padding:3px 0;border-bottom:1px solid rgba(0,0,0,.04)}",
      ".ai-log-time{color:#999;flex-shrink:0;font-size:11px;min-width:56px}",
      ".ai-log-level{flex-shrink:0;font-size:10px;font-weight:600;min-width:42px;text-align:center;",
      "padding:1px 4px;border-radius:3px}",
      ".ai-log-info .ai-log-level{color:#1a73e8;background:rgba(26,115,232,.08)}",
      ".ai-log-warn .ai-log-level{color:#e37400;background:rgba(227,116,0,.08)}",
      ".ai-log-error .ai-log-level{color:#d93025;background:rgba(217,48,37,.08)}",
      ".ai-log-msg{flex:1;word-break:break-all;color:#333}",
      ".ai-log-empty{text-align:center;color:#999;padding:40px 20px;font-size:14px;",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif}",

      /* Feishu Doc Manager */
      ".ai-docmgr-panel{width:600px;max-height:80vh}",
      ".ai-docmgr-body{padding:0 !important}",
      ".ai-docmgr-empty{text-align:center;color:#999;padding:48px 20px;font-size:14px;",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif}",
      ".ai-docmgr-list{max-height:60vh;overflow-y:auto}",
      ".ai-docmgr-item{display:flex;align-items:center;padding:12px 20px;gap:12px;",
      "border-bottom:1px solid rgba(0,0,0,.06);transition:background .15s}",
      ".ai-docmgr-item:hover{background:rgba(0,0,0,.02)}",
      ".ai-docmgr-item:last-child{border-bottom:none}",
      ".ai-docmgr-item-main{flex:1;min-width:0}",
      ".ai-docmgr-item-title{font-size:14px;font-weight:500;margin-bottom:4px;",
      "white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".ai-docmgr-link{color:#1a73e8;text-decoration:none;transition:color .15s}",
      ".ai-docmgr-link:hover{color:#1557b0;text-decoration:underline}",
      ".ai-docmgr-item-meta{display:flex;gap:12px;font-size:11px;color:#999}",
      ".ai-docmgr-time{flex-shrink:0}",
      ".ai-docmgr-local{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;",
      "max-width:240px;color:#bbb}",
      ".ai-docmgr-actions{display:flex;gap:6px;flex-shrink:0}",
      ".ai-docmgr-edit{padding:4px 12px;border-radius:6px;font-size:12px;",
      "cursor:pointer;border:1px solid #d2e3fc;background:#fff;color:#1a73e8;font-weight:500;",
      "transition:all .15s;white-space:nowrap}",
      ".ai-docmgr-edit:hover{background:#e8f0fe;border-color:#aecbfa}",
      ".ai-docmgr-edit:disabled{opacity:.5;cursor:default;pointer-events:none}",
      ".ai-docmgr-del{padding:4px 12px;border-radius:6px;font-size:12px;",
      "cursor:pointer;border:1px solid #e0e0e0;background:#fff;color:#d93025;font-weight:500;",
      "transition:all .15s;white-space:nowrap}",
      ".ai-docmgr-del:hover{background:#fce8e6;border-color:#f5c6c2}",
      ".ai-docmgr-del:disabled{opacity:.5;cursor:default;pointer-events:none}",
      ".ai-feishu-edit-bar{position:fixed;top:8px;right:12px;z-index:100000;",
      "display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:10px;",
      "background:linear-gradient(135deg,#1a73e8,#4a9eff);color:#fff;font-size:12px;",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;box-shadow:0 4px 16px rgba(0,0,0,.18);",
      "opacity:0;transform:translateY(-8px);transition:all .3s ease;max-width:calc(100vw - 280px)}",
      ".ai-feishu-edit-bar.show{opacity:1;transform:translateY(0)}",
      ".ai-feishu-edit-bar-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:220px}",
      ".ai-feishu-edit-bar-actions{display:flex;gap:6px;flex-shrink:0}",
      ".ai-feishu-edit-bar-save{padding:3px 12px;border-radius:6px;font-size:11px;",
      "cursor:pointer;border:1px solid rgba(255,255,255,.4);background:rgba(255,255,255,.18);",
      "color:#fff;font-weight:600;transition:all .15s;white-space:nowrap}",
      ".ai-feishu-edit-bar-save:hover{background:rgba(255,255,255,.35)}",
      ".ai-feishu-edit-bar-close{width:22px;height:22px;border-radius:50%;font-size:13px;",
      "cursor:pointer;border:none;background:rgba(255,255,255,.18);color:#fff;line-height:1;",
      "display:flex;align-items:center;justify-content:center;transition:background .15s}",
      ".ai-feishu-edit-bar-close:hover{background:rgba(255,255,255,.35)}",
      ".ai-docmgr-search{padding:12px 20px 0;border-bottom:1px solid rgba(0,0,0,.06)}",
      ".ai-docmgr-search-input{width:100%;box-sizing:border-box;padding:8px 12px;",
      "border:1px solid #ddd;border-radius:8px;font-size:13px;outline:none;",
      "font-family:-apple-system,BlinkMacSystemFont,sans-serif;transition:border-color .2s;margin-bottom:12px}",
      ".ai-docmgr-search-input:focus{border-color:#1a73e8}",
      ".ai-docmgr-status{padding:8px 20px 4px;font-size:11px;color:#999}",
      ".ai-docmgr-status-row{display:flex;align-items:center;justify-content:space-between;gap:12px}",
      ".ai-docmgr-count{flex:1;min-width:0}",
      ".ai-docmgr-refresh{padding:4px 12px;border-radius:6px;font-size:12px;cursor:pointer;",
      "border:1px solid #d2e3fc;background:#fff;color:#1a73e8;font-weight:500;",
      "transition:all .15s;white-space:nowrap;flex-shrink:0;font-family:-apple-system,BlinkMacSystemFont,sans-serif}",
      ".ai-docmgr-refresh:hover:not(:disabled){background:#e8f0fe;border-color:#aecbfa}",
      ".ai-docmgr-refresh:disabled{opacity:.6;cursor:default}",
      ".ai-docmgr-badge{font-size:10px;padding:1px 6px;border-radius:4px;margin-left:8px;",
      "font-weight:500;vertical-align:middle}",
      ".ai-docmgr-badge-title{color:#1a73e8;background:rgba(26,115,232,.08)}",
      ".ai-docmgr-badge-content{color:#e37400;background:rgba(227,116,0,.08)}",
      ".ai-docmgr-pager{display:flex;align-items:center;justify-content:center;gap:12px;",
      "padding:12px 20px;border-top:1px solid rgba(0,0,0,.06)}",
      ".ai-docmgr-pager-btn{padding:5px 14px;border-radius:6px;font-size:12px;cursor:pointer;",
      "border:1px solid #ddd;background:#fff;color:#333;font-weight:500;transition:all .15s}",
      ".ai-docmgr-pager-btn:hover:not(:disabled){background:#f1f3f4}",
      ".ai-docmgr-pager-btn:disabled{opacity:.4;cursor:default}",
      ".ai-docmgr-pager-info{font-size:12px;color:#999}",

      /* Dark Feishu */
      "@media(prefers-color-scheme:dark){",
      ".ai-feishu-progress-inner{background:#2a2a2a;color:#ddd}",
      ".ai-feishu-title{color:#eee}",
      ".ai-feishu-step-dot{border-color:#555}",
      ".ai-feishu-status{color:#888}",
      ".ai-feishu-stop{background:#3a3a3a;border-color:#555;color:#f28b82}",
      ".ai-feishu-stop:hover{background:#4a2a2a;border-color:#f28b82}",
      ".ai-feishu-success-inner{background:#2a2a2a;color:#ddd}",
      ".ai-feishu-success-title{color:#eee}",
      ".ai-feishu-success-doc{color:#aaa}",
      ".ai-feishu-success-link{color:#4a9eff}",
      ".ai-feishu-btn-copy{background:#444;border-color:#555;color:#ddd}",
      ".ai-feishu-btn-copy:hover{background:#555}",
      ".ai-log-entry{border-color:rgba(255,255,255,.06)}",
      ".ai-log-msg{color:#ccc}",
      ".ai-log-empty{color:#777}",
      ".ai-docmgr-item{border-color:rgba(255,255,255,.08)}",
      ".ai-docmgr-item:hover{background:rgba(255,255,255,.04)}",
      ".ai-docmgr-link{color:#4a9eff}",
      ".ai-docmgr-link:hover{color:#7ab8ff}",
      ".ai-docmgr-local{color:#666}",
      ".ai-docmgr-empty{color:#777}",
      ".ai-docmgr-edit{background:#3a3a3a;border-color:#555;color:#8ab4f8}",
      ".ai-docmgr-edit:hover{background:#444;border-color:#666}",
      ".ai-docmgr-del{background:#3a3a3a;border-color:#555;color:#f28b82}",
      ".ai-docmgr-del:hover{background:#4a2a2a;border-color:#f28b82}",
      ".ai-docmgr-refresh{background:#3a3a3a;border-color:#555;color:#8ab4f8}",
      ".ai-docmgr-refresh:hover:not(:disabled){background:#444;border-color:#666}",
      ".ai-docmgr-search{border-color:rgba(255,255,255,.08)}",
      ".ai-docmgr-search-input{background:#333;border-color:#555;color:#ddd}",
      ".ai-docmgr-search-input:focus{border-color:#4a9eff}",
      ".ai-docmgr-pager{border-color:rgba(255,255,255,.08)}",
      ".ai-docmgr-pager-btn{background:#3a3a3a;border-color:#555;color:#ddd}",
      ".ai-docmgr-pager-btn:hover:not(:disabled){background:#444}",
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

    pluginLog("info", L.loaded);
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 500);
  } else {
    window.addEventListener("DOMContentLoaded", function () {
      setTimeout(init, 500);
    });
  }

  // ===================== Feishu: Core & API =====================

  const FEISHU_API = "https://open.feishu.cn/open-apis";
  const FEISHU_SESSION_KEY = "typora-ai-edit-feishu-sessions";

  var feishuTokenCache = { token: null, expiresAt: 0 };

  // ===================== Credentials =====================

  function loadFeishuCredentials() {
    var cfg = loadConfig();
    if (cfg.feishu && cfg.feishu.app_id && cfg.feishu.app_secret) {
      return { app_id: cfg.feishu.app_id, app_secret: cfg.feishu.app_secret };
    }

    var candidates = [];
    var filePath = (window.File && window.File.filePath) || "";
    if (filePath) {
      var idx = filePath.lastIndexOf("/");
      candidates.push((idx > 0 ? filePath.slice(0, idx) : ".") + "/feishu-credentials.json");
    }
    var home = getHomePath();
    if (home) {
      candidates.push(home + "/.feishu-credentials.json");
    }

    for (var i = 0; i < candidates.length; i++) {
      try {
        var raw = readFileContent(candidates[i]);
        if (raw) {
          var creds = JSON.parse(raw);
          if (creds.app_id && creds.app_secret) {
            pluginLog("info", "Feishu credentials loaded from: " + candidates[i]);
            return creds;
          }
        }
      } catch (_) {}
    }
    return null;
  }

  // ===================== Auth =====================

  async function getFeishuTenantToken(signal) {
    if (feishuTokenCache.token && Date.now() < feishuTokenCache.expiresAt) {
      return feishuTokenCache.token;
    }

    var creds = loadFeishuCredentials();
    if (!creds) throw new Error(L.feishuNoCreds);

    var opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app_id: creds.app_id, app_secret: creds.app_secret }),
    };
    if (signal) opts.signal = signal;

    var resp = await fetch(FEISHU_API + "/auth/v3/tenant_access_token/internal", opts);

    var data = await resp.json();
    if (data.code !== 0) throw new Error("Feishu auth failed: " + data.msg);

    feishuTokenCache.token = data.tenant_access_token;
    feishuTokenCache.expiresAt = Date.now() + (data.expire - 300) * 1000;
    return data.tenant_access_token;
  }

  // ===================== Session management =====================

  function loadFeishuSessions() {
    try {
      var raw = localStorage.getItem(FEISHU_SESSION_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (_) { return {}; }
  }

  function saveFeishuSessions(sessions) {
    localStorage.setItem(FEISHU_SESSION_KEY, JSON.stringify(sessions));
  }

  function getFeishuSession(fp) {
    return loadFeishuSessions()[fp] || null;
  }

  function setFeishuSession(fp, session) {
    var sessions = loadFeishuSessions();
    sessions[fp] = session;
    saveFeishuSessions(sessions);
  }

  // ===================== DOCX conversion (in-memory) =====================

  async function convertToDocxBlob(mdContent) {
    return await markdownToDocxBlob(mdContent);
  }

  // ===================== Feishu API calls =====================

  async function feishuUploadBlob(token, blob, fileName, signal) {
    var fileSize = blob.size;
    if (fileSize > 20 * 1024 * 1024) throw new Error(L.feishuFileTooLarge);

    var formData = new FormData();
    formData.append("file_name", fileName);
    formData.append("parent_type", "ccm_import_open");
    formData.append("size", String(fileSize));
    formData.append("extra", JSON.stringify({ obj_type: "docx", file_extension: "docx" }));
    formData.append("file", blob, fileName);

    var opts = {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    };
    if (signal) opts.signal = signal;

    var resp = await fetch(FEISHU_API + "/drive/v1/medias/upload_all", opts);

    var data = await resp.json();
    if (data.code !== 0) throw new Error("Upload failed (" + data.code + "): " + data.msg);
    return data.data.file_token;
  }

  async function feishuCreateImportTask(token, fileToken, title, folderToken, signal) {
    var body = {
      file_extension: "docx",
      file_token: fileToken,
      type: "docx",
      file_name: title,
      point: { mount_type: 1, mount_key: folderToken || "" },
    };

    var opts = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    if (signal) opts.signal = signal;

    var resp = await fetch(FEISHU_API + "/drive/v1/import_tasks", opts);

    var data = await resp.json();
    if (data.code !== 0) throw new Error("Import task failed (" + data.code + "): " + data.msg);
    return data.data.ticket;
  }

  async function feishuPollImportResult(token, ticket, signal) {
    var maxAttempts = 30;
    for (var i = 0; i < maxAttempts; i++) {
      if (signal && signal.aborted) throw new DOMException("Aborted", "AbortError");
      await sleep(2000);
      if (signal && signal.aborted) throw new DOMException("Aborted", "AbortError");

      var opts = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      if (signal) opts.signal = signal;

      var resp = await fetch(FEISHU_API + "/drive/v1/import_tasks/" + ticket, opts);

      var data = await resp.json();
      if (data.code !== 0) throw new Error("Poll failed (" + data.code + "): " + data.msg);

      var result = data.data && data.data.result;
      if (result && result.job_status === 0) {
        return { token: result.token, url: result.url, type: result.type };
      }
      if (result && result.job_status === 2) {
        throw new Error("Import failed: " + (result.job_error_msg || "unknown error"));
      }
    }
    throw new Error(L.feishuTimeout);
  }

  async function feishuDeleteDoc(token, docToken) {
    try {
      var resp = await fetch(FEISHU_API + "/drive/v1/files/" + docToken + "?type=docx", {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token },
      });
      var data = await resp.json();
      if (data.code === 0) pluginLog("info", "Feishu old doc deleted: " + docToken);
      else pluginLog("warn", "Feishu delete failed: " + data.code + " " + data.msg);
    } catch (e) {
      pluginLog("warn", "Feishu delete error: " + e.message);
    }
  }

  /**
   * Batch query cloud doc metadata (title, url). Requires drive:drive or drive:drive.metadata:readonly.
   * @param {Array<{doc_token:string,doc_type?:string}>} requestDocs doc_type defaults to docx
   */
  async function feishuBatchQueryMetas(tenantToken, requestDocs, signal) {
    if (!requestDocs || !requestDocs.length) return { metas: [], failed_list: [] };
    var body = {
      request_docs: requestDocs.map(function (d) {
        return { doc_token: d.doc_token, doc_type: d.doc_type || "docx" };
      }),
      with_url: true,
    };
    var opts = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tenantToken,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    };
    if (signal) opts.signal = signal;
    var resp = await fetch(FEISHU_API + "/drive/v1/metas/batch_query", opts);
    var data = await resp.json().catch(function () { return {}; });
    if (data.code !== 0) {
      throw new Error(data.msg || "metas/batch_query failed");
    }
    var d = data.data || {};
    return {
      metas: d.metas || [],
      failed_list: d.failed_list || [],
    };
  }

  /** Grant edit permission by Feishu user_id (userid). Requires docs:permission.member:create (or docs:doc / drive:drive). Document may need 「添加文档应用」 for tenant token. */
  async function feishuGrantEditByUserId(tenantToken, docToken, userId, signal) {
    if (!userId || !String(userId).trim()) return true;
    userId = String(userId).trim();
    var url =
      FEISHU_API +
      "/drive/v1/permissions/" +
      encodeURIComponent(docToken) +
      "/members?type=docx";
    var opts = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + tenantToken,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        member_type: "userid",
        member_id: userId,
        perm: "edit",
        type: "user",
      }),
    };
    if (signal) opts.signal = signal;
    var resp = await fetch(url, opts);
    var data = await resp.json().catch(function () { return {}; });
    if (data.code !== 0) {
      pluginLog(
        "warn",
        "Feishu grant edit failed (" + (data.code || "?") + "): " + (data.msg || resp.status)
      );
      return false;
    }
    pluginLog("info", "Feishu granted edit to userid: " + userId);
    return true;
  }

  // ===================== Feishu: Title & Utility =====================

  async function generateTitle(docContent, cfg) {
    var sysPrompt = isChinese
      ? "你是一位标题生成助手。请根据文档内容生成一个简洁、准确的标题。只返回标题本身，不要任何解释、引号或标点。最长20个字。"
      : "You are a title generator. Generate a concise, accurate title for the document. Return only the title itself, no quotes, explanations, or punctuation. Max 15 words.";
    var userPrompt = docContent.slice(0, 3000);

    var title = await callAPI(sysPrompt, userPrompt, { ...cfg, _onChunk: null, web_search: false });
    title = title.replace(/^["'"""'']+|["'"""'']+$/g, "").trim();
    if (!title) title = isChinese ? "未命名文档" : "Untitled Document";
    if (title.length > 60) title = title.slice(0, 60);
    return title;
  }

  function simpleHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }

  // ===================== Feishu: Archive Flow & UI =====================

  async function archiveToFeishu() {
    var docContent = getDocumentText();
    if (!docContent || !docContent.trim()) {
      showToast(L.feishuNoContent, "error");
      return;
    }

    var creds = loadFeishuCredentials();
    if (!creds) {
      showToast(L.feishuNoCreds, "error", 5000);
      return;
    }

    var cfg = loadConfig();
    var filePath = (window.File && window.File.filePath) || null;
    var sessionKey = filePath || ("unsaved-" + simpleHash(docContent.slice(0, 200)));
    var progress = showFeishuProgress();
    var progressEl = progress.el;
    var signal = progress.signal;

    try {
      updateFeishuProgress(progressEl, L.feishuStepTitle, 1);
      var title = await generateTitle(docContent, cfg);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      pluginLog("info", "Feishu: title generated: " + title);

      updateFeishuProgress(progressEl, L.feishuStepConvert, 2);
      var docxBlob = await convertToDocxBlob(docContent);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      pluginLog("info", "Feishu: DOCX blob created: " + docxBlob.size + " bytes");

      updateFeishuProgress(progressEl, L.feishuStepAuth, 3);
      var token = await getFeishuTenantToken(signal);

      var session = getFeishuSession(sessionKey);
      if (session && session.feishu_doc_token) {
        updateFeishuProgress(progressEl, L.feishuStepDelete, 3);
        await feishuDeleteDoc(token, session.feishu_doc_token);
      }

      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      updateFeishuProgress(progressEl, L.feishuStepUpload, 4);
      var fileToken = await feishuUploadBlob(token, docxBlob, title + ".docx", signal);
      pluginLog("info", "Feishu: uploaded, file_token: " + fileToken);

      var folderToken = (cfg.feishu && cfg.feishu.target_folder) || "";
      updateFeishuProgress(progressEl, L.feishuStepImport, 5);
      var ticket = await feishuCreateImportTask(token, fileToken, title, folderToken, signal);
      pluginLog("info", "Feishu: import task created, ticket: " + ticket);

      updateFeishuProgress(progressEl, L.feishuStepPoll, 5);
      var result = await feishuPollImportResult(token, ticket, signal);
      pluginLog("info", "Feishu: import done, url: " + result.url);

      setFeishuSession(sessionKey, {
        title: title,
        feishu_doc_token: result.token,
        feishu_doc_url: result.url,
        last_archived_at: new Date().toISOString(),
        content_cache: docContent.slice(0, 5000),
        full_content: docContent,
      });

      var editorUid = (cfg.feishu && cfg.feishu.default_editor_userid || "").trim();
      if (editorUid) {
        try {
          var granted = await feishuGrantEditByUserId(token, result.token, editorUid, signal);
          if (!granted) showToast(L.feishuGrantEditFail, "warn", 7000);
        } catch (ge) {
          pluginLog("warn", "Feishu grant edit: " + ge.message);
          showToast(L.feishuGrantEditFail, "warn", 7000);
        }
      }

      _feishuEditState = {
        sessionKey: sessionKey,
        title: title,
        feishu_doc_token: result.token,
        feishu_doc_url: result.url,
      };

      removeFeishuProgress(progressEl);
      showFeishuSuccess(title, result.url);
      showFeishuEditBar();

    } catch (e) {
      removeFeishuProgress(progressEl);
      if (e.name === "AbortError") {
        pluginLog("info", "Feishu archive stopped by user");
        showToast(L.feishuStopped, "info");
      } else {
        pluginLog("error", "Feishu archive failed: " + e.message);
        showToast(L.feishuFailed + e.message, "error", 5000);
      }
    }
  }

  // ===================== Feishu progress UI =====================

  function showFeishuProgress() {
    var old = document.getElementById("ai-feishu-progress");
    if (old) old.remove();

    var ac = new AbortController();

    var el = document.createElement("div");
    el.id = "ai-feishu-progress";
    el.className = "ai-feishu-progress";
    el.innerHTML =
      '<div class="ai-feishu-progress-inner">' +
        '<div class="ai-feishu-title">' + escHTML(L.feishuArchiving) + '</div>' +
        '<div class="ai-feishu-steps">' +
          buildStepHTML(1) + buildStepHTML(2) + buildStepHTML(3) +
          buildStepHTML(4) + buildStepHTML(5) +
        '</div>' +
        '<div class="ai-feishu-status"></div>' +
        '<button class="ai-feishu-stop">' + escHTML(L.feishuStop) + '</button>' +
      '</div>';

    el.querySelector(".ai-feishu-stop").addEventListener("click", function () {
      ac.abort();
    });

    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
    return { el: el, signal: ac.signal };
  }

  function buildStepHTML(n) {
    var labels = [L.feishuStepTitle, L.feishuStepConvert, L.feishuStepAuth,
                  L.feishuStepUpload, L.feishuStepImport];
    return '<div class="ai-feishu-step" data-step="' + n + '">' +
      '<span class="ai-feishu-step-dot"></span>' +
      '<span class="ai-feishu-step-label">' + escHTML(labels[n - 1]) + '</span></div>';
  }

  function updateFeishuProgress(el, msg, activeStep) {
    if (!el) return;
    var status = el.querySelector(".ai-feishu-status");
    if (status) status.textContent = msg;

    var steps = el.querySelectorAll(".ai-feishu-step");
    for (var i = 0; i < steps.length; i++) {
      var stepNum = parseInt(steps[i].getAttribute("data-step"));
      steps[i].classList.toggle("done", stepNum < activeStep);
      steps[i].classList.toggle("active", stepNum === activeStep);
    }
  }

  function removeFeishuProgress(el) {
    if (el) {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    }
  }

  function showFeishuSuccess(title, url) {
    var old = document.getElementById("ai-feishu-success");
    if (old) old.remove();

    var el = document.createElement("div");
    el.id = "ai-feishu-success";
    el.className = "ai-feishu-success";
    el.innerHTML =
      '<div class="ai-feishu-success-inner">' +
        '<div class="ai-feishu-success-icon">✓</div>' +
        '<div class="ai-feishu-success-title">' + escHTML(L.feishuDone) + '</div>' +
        '<div class="ai-feishu-success-doc">' + escHTML(title) + '</div>' +
        '<a class="ai-feishu-success-link" href="' + escHTML(url) + '" target="_blank">' +
          escHTML(L.feishuOpenDoc) + '</a>' +
        '<div class="ai-feishu-success-actions">' +
          '<button class="ai-feishu-btn-copy">' + escHTML(L.feishuCopyLink) + '</button>' +
          '<button class="ai-feishu-btn-close">' + escHTML(L.closeBtn) + '</button>' +
        '</div>' +
      '</div>';

    el.querySelector(".ai-feishu-btn-copy").addEventListener("click", function () {
      writeToClipboard(url);
      showToast(L.copied, "success");
    });
    el.querySelector(".ai-feishu-btn-close").addEventListener("click", function () {
      el.classList.remove("show");
      setTimeout(function () { el.remove(); }, 300);
    });

    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("show"); });
  }

  // ===================== Feishu Document Manager =====================

  var _docMgrState = { query: "", page: 1 };
  var DOC_PAGE_SIZE = 10;
  var FEISHU_META_BATCH = 100;

  function docMgrToolbarHtml(displayCount) {
    return (
      '<div class="ai-docmgr-status ai-docmgr-status-row">' +
      '<span class="ai-docmgr-count">' +
      escHTML(L.feishuDocCount.replace("{count}", String(displayCount))) +
      "</span>" +
      '<button type="button" class="ai-docmgr-refresh">' +
      escHTML(L.feishuDocRefresh) +
      "</button>" +
      "</div>"
    );
  }

  function attachDocMgrRefresh(container) {
    var btn = container.querySelector(".ai-docmgr-refresh");
    if (!btn) return;
    btn.addEventListener("click", function () {
      refreshFeishuDocTitles(container, btn);
    });
  }

  async function refreshFeishuDocTitles(container, btn) {
    if (btn.disabled) return;
    var sessions = loadFeishuSessions();
    var keys = Object.keys(sessions);
    var pairs = [];
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var s = sessions[k];
      if (s && s.feishu_doc_token) {
        pairs.push({ sessionKey: k, doc_token: s.feishu_doc_token });
      }
    }
    if (pairs.length === 0) {
      showToast(L.feishuDocRefreshNothing, "info", 4000);
      return;
    }
    btn.disabled = true;
    var origText = btn.textContent;
    btn.textContent = L.feishuDocRefreshing;
    try {
      var token = await getFeishuTenantToken();
      var synced = 0;
      for (var j = 0; j < pairs.length; j += FEISHU_META_BATCH) {
        var slice = pairs.slice(j, j + FEISHU_META_BATCH);
        var req = slice.map(function (p) {
          return { doc_token: p.doc_token, doc_type: "docx" };
        });
        var batch = await feishuBatchQueryMetas(token, req, null);
        var byToken = {};
        for (var m = 0; m < batch.metas.length; m++) {
          var meta = batch.metas[m];
          if (meta && meta.doc_token) byToken[meta.doc_token] = meta;
        }
        for (var p = 0; p < slice.length; p++) {
          var pair = slice[p];
          var meta = byToken[pair.doc_token];
          if (!meta) continue;
          var sess = sessions[pair.sessionKey];
          if (!sess) continue;
          synced++;
          var rawTitle = meta.title != null ? meta.title : meta.name;
          if (rawTitle != null && String(rawTitle).trim()) {
            sess.title = String(rawTitle).trim();
          }
          var nu = meta.url || meta.doc_url || meta.link;
          if (nu) sess.feishu_doc_url = nu;
        }
        if (batch.failed_list && batch.failed_list.length) {
          pluginLog("warn", "Feishu batch_query failed_list: " + JSON.stringify(batch.failed_list));
        }
      }
      saveFeishuSessions(sessions);
      if (_feishuEditState && _feishuEditState.sessionKey) {
        var upd = sessions[_feishuEditState.sessionKey];
        if (upd) {
          _feishuEditState.title = upd.title || _feishuEditState.title;
          if (upd.feishu_doc_url) _feishuEditState.feishu_doc_url = upd.feishu_doc_url;
          showFeishuEditBar();
        }
      }
      showToast(L.feishuDocRefreshDone.replace("{n}", String(synced)), "success", 3500);
      renderDocList(container);
    } catch (e) {
      pluginLog("warn", "Feishu refresh titles: " + e.message);
      showToast(L.feishuDocRefreshFail + e.message, "error", 5000);
      btn.disabled = false;
      btn.textContent = origText;
    }
  }

  function showFeishuDocManager() {
    var old = document.querySelector(".ai-edit-overlay.ai-docmgr-overlay");
    if (old) old.remove();

    _docMgrState = { query: "", page: 1 };

    var overlay = document.createElement("div");
    overlay.className = "ai-edit-overlay ai-docmgr-overlay";

    var panel = document.createElement("div");
    panel.className = "ai-edit-panel ai-docmgr-panel";

    var header = document.createElement("div");
    header.className = "ai-edit-panel-header";
    header.innerHTML =
      '<h3>' + escHTML(L.feishuDocManager) + '</h3>' +
      '<button class="ai-edit-close">&times;</button>';

    var searchBar = document.createElement("div");
    searchBar.className = "ai-docmgr-search";
    searchBar.innerHTML =
      '<input type="text" class="ai-docmgr-search-input" placeholder="' + escHTML(L.feishuDocSearch) + '">';

    var body = document.createElement("div");
    body.className = "ai-edit-panel-body ai-docmgr-body";

    panel.appendChild(header);
    panel.appendChild(searchBar);
    panel.appendChild(body);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    var searchInput = searchBar.querySelector(".ai-docmgr-search-input");
    var debounceTimer = null;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        _docMgrState.query = searchInput.value.trim();
        _docMgrState.page = 1;
        renderDocList(body);
      }, 200);
    });

    renderDocList(body);

    header.querySelector(".ai-edit-close").addEventListener("click", function () {
      overlay.remove();
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  function filterDocs(sessions, keys, query) {
    if (!query) {
      return keys.map(function (k) { return { key: k, matchType: null }; });
    }
    var q = query.toLowerCase();
    var results = [];
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var s = sessions[k];
      var title = (s.title || k).toLowerCase();
      if (title.indexOf(q) >= 0) {
        results.push({ key: k, matchType: "title" });
      } else if (s.content_cache && s.content_cache.toLowerCase().indexOf(q) >= 0) {
        results.push({ key: k, matchType: "content" });
      }
    }
    return results;
  }

  function renderDocList(container) {
    var sessions = loadFeishuSessions();
    var keys = Object.keys(sessions);

    keys.sort(function (a, b) {
      var ta = sessions[a].last_archived_at || "";
      var tb = sessions[b].last_archived_at || "";
      return tb.localeCompare(ta);
    });

    var filtered = filterDocs(sessions, keys, _docMgrState.query);
    var totalCount = filtered.length;
    var totalPages = Math.max(1, Math.ceil(totalCount / DOC_PAGE_SIZE));
    if (_docMgrState.page > totalPages) _docMgrState.page = totalPages;
    var start = (_docMgrState.page - 1) * DOC_PAGE_SIZE;
    var pageItems = filtered.slice(start, start + DOC_PAGE_SIZE);

    if (keys.length === 0) {
      container.innerHTML = '<div class="ai-docmgr-empty">' + escHTML(L.feishuDocEmpty) + '</div>';
      return;
    }

    var toolbarCount = totalCount === 0 ? keys.length : totalCount;

    if (totalCount === 0) {
      container.innerHTML =
        docMgrToolbarHtml(toolbarCount) +
        '<div class="ai-docmgr-empty">' + escHTML(L.feishuDocNoMatch) + "</div>";
      attachDocMgrRefresh(container);
      return;
    }

    var html = docMgrToolbarHtml(toolbarCount);
    html += '<div class="ai-docmgr-list">';

    for (var i = 0; i < pageItems.length; i++) {
      var item = pageItems[i];
      var key = item.key;
      var s = sessions[key];
      var title = s.title || key;
      var url = s.feishu_doc_url || "";
      var time = s.last_archived_at ? formatDocTime(s.last_archived_at) : "";
      var localName = key.indexOf("/") >= 0 ? key.slice(key.lastIndexOf("/") + 1) : key;

      html += '<div class="ai-docmgr-item" data-key="' + escHTML(key) + '">';
      html += '<div class="ai-docmgr-item-main">';
      html += '<div class="ai-docmgr-item-title">';
      if (url) {
        html += '<a href="' + escHTML(url) + '" target="_blank" class="ai-docmgr-link">' + escHTML(title) + '</a>';
      } else {
        html += '<span>' + escHTML(title) + '</span>';
      }
      if (item.matchType) {
        var badge = item.matchType === "title" ? L.feishuDocMatchTitle : L.feishuDocMatchContent;
        html += '<span class="ai-docmgr-badge ai-docmgr-badge-' + item.matchType + '">' + escHTML(badge) + '</span>';
      }
      html += '</div>';
      html += '<div class="ai-docmgr-item-meta">';
      if (time) html += '<span class="ai-docmgr-time">' + escHTML(L.feishuDocTime + time) + '</span>';
      html += '<span class="ai-docmgr-local">' + escHTML(localName) + '</span>';
      html += '</div>';
      html += '</div>';
      html += '<div class="ai-docmgr-actions">';
      html += '<button class="ai-docmgr-edit" data-key="' + escHTML(key) + '">' +
              escHTML(L.feishuDocEdit) + '</button>';
      html += '<button class="ai-docmgr-del" data-key="' + escHTML(key) + '" title="' + escHTML(L.feishuDocDelete) + '">' +
              escHTML(L.feishuDocDelete) + '</button>';
      html += '</div>';
      html += '</div>';
    }
    html += '</div>';

    if (totalPages > 1) {
      var pageInfo = L.feishuDocPageInfo
        .replace("{page}", _docMgrState.page)
        .replace("{total}", totalPages);
      html += '<div class="ai-docmgr-pager">';
      html += '<button class="ai-docmgr-pager-btn ai-docmgr-prev"' +
        (_docMgrState.page <= 1 ? ' disabled' : '') + '>' + escHTML(L.feishuDocPrev) + '</button>';
      html += '<span class="ai-docmgr-pager-info">' + escHTML(pageInfo) + '</span>';
      html += '<button class="ai-docmgr-pager-btn ai-docmgr-next"' +
        (_docMgrState.page >= totalPages ? ' disabled' : '') + '>' + escHTML(L.feishuDocNext) + '</button>';
      html += '</div>';
    }

    container.innerHTML = html;

    attachDocMgrRefresh(container);

    var prevBtn = container.querySelector(".ai-docmgr-prev");
    var nextBtn = container.querySelector(".ai-docmgr-next");
    if (prevBtn) prevBtn.addEventListener("click", function () {
      if (_docMgrState.page > 1) { _docMgrState.page--; renderDocList(container); }
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      if (_docMgrState.page < totalPages) { _docMgrState.page++; renderDocList(container); }
    });

    container.querySelectorAll(".ai-docmgr-edit").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-key");
        handleDocEdit(btn, k);
      });
    });

    container.querySelectorAll(".ai-docmgr-del").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-key");
        var sess = loadFeishuSessions()[k];
        if (!sess) return;
        var msg = L.feishuDocConfirmDelete.replace("{title}", sess.title || k);
        if (!confirm(msg)) return;
        handleDocDelete(btn, k, container);
      });
    });
  }

  async function handleDocDelete(btn, sessionKey, container) {
    btn.textContent = L.feishuDocDeleting;
    btn.disabled = true;

    try {
      var sessions = loadFeishuSessions();
      var session = sessions[sessionKey];

      if (session && session.feishu_doc_token) {
        var token = await getFeishuTenantToken();
        await feishuDeleteDoc(token, session.feishu_doc_token);
      }

      delete sessions[sessionKey];
      saveFeishuSessions(sessions);
      pluginLog("info", "Feishu doc removed: " + (session && session.title || sessionKey));
      showToast(L.feishuDocDeleted, "success");
      renderDocList(container);
    } catch (e) {
      pluginLog("error", "Feishu doc delete failed: " + e.message);
      showToast(L.feishuDocDeleteFail + e.message, "error", 4000);
      btn.textContent = L.feishuDocDelete;
      btn.disabled = false;
    }
  }

  function formatDocTime(iso) {
    try {
      var d = new Date(iso);
      var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
      return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) +
        " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
    } catch (_) { return iso; }
  }

  // ===================== Feishu: Edit & Save-back =====================

  var _feishuEditState = null;

  function handleDocEdit(btn, sessionKey) {
    var sessions = loadFeishuSessions();
    var session = sessions[sessionKey];
    if (!session) return;

    var content = session.full_content || "";
    var isPartial = false;
    if (!content && session.content_cache) {
      content = session.content_cache;
      isPartial = true;
    }
    if (!content) {
      showToast(L.feishuDocEditNoContent, "error", 3000);
      return;
    }

    btn.textContent = L.feishuDocEditing;
    btn.disabled = true;

    try {
      var filePath = null;
      try { filePath = window.File && window.File.filePath; } catch (_) {}
      if (!filePath) try { filePath = window.File && window.File.bundle && window.File.bundle.filePath; } catch (_) {}

      _feishuEditState = {
        sessionKey: sessionKey,
        title: session.title,
        feishu_doc_token: session.feishu_doc_token,
        feishu_doc_url: session.feishu_doc_url,
      };

      var overlay = document.querySelector(".ai-edit-overlay.ai-docmgr-overlay");
      if (overlay) overlay.remove();

      if (filePath) {
        var _writeFile = null;
        if (window.bridge && window.bridge.callSync) {
          _writeFile = function (p, c) { window.bridge.callSync("path.writeText", p, c); };
        }
        if (!_writeFile && window.reqnode) {
          try {
            var _fs = window.reqnode("fs");
            if (_fs && _fs.writeFileSync) _writeFile = function (p, c) { _fs.writeFileSync(p, c, "utf8"); };
          } catch (_) {}
        }
        if (!_writeFile && typeof require === "function") {
          try {
            var _fs2 = require("fs");
            if (_fs2 && _fs2.writeFileSync) _writeFile = function (p, c) { _fs2.writeFileSync(p, c, "utf8"); };
          } catch (_) {}
        }
        if (!_writeFile) {
          pluginLog("error", "Feishu edit: no file write method available");
          showToast(L.feishuDocEditFail + "file write unavailable", "error", 4000);
          btn.textContent = L.feishuDocEdit;
          btn.disabled = false;
          return;
        }
        _writeFile(filePath, content);
        setTimeout(function () {
          try {
            if (window.File && typeof window.File.reloadContent === "function") {
              window.File.reloadContent(true, function () {});
            } else if (window.File && window.File.editor && typeof window.File.editor.reload === "function") {
              window.File.editor.reload();
            }
          } catch (_) {}
          showFeishuEditBar();
        }, 200);
      } else {
        setTimeout(function () {
          try {
            var writeEl = document.getElementById("write");
            if (writeEl) {
              writeEl.focus();
              document.execCommand("selectAll");
              document.execCommand("insertText", false, content);
            }
          } catch (ex) {
            pluginLog("warn", "execCommand insert failed: " + ex.message);
          }
          showFeishuEditBar();
        }, 100);
      }

      pluginLog("info", "Feishu doc loaded for editing: " + session.title +
        (isPartial ? " (partial content)" : ""));

      if (isPartial) {
        showToast(L.feishuDocEditPartial, "info", 4000);
      } else {
        showToast(L.feishuDocEditLoaded, "success");
      }
    } catch (e) {
      pluginLog("error", "Feishu doc edit load failed: " + e.message);
      showToast(L.feishuDocEditFail + e.message, "error", 4000);
      btn.textContent = L.feishuDocEdit;
      btn.disabled = false;
    }
  }

  function showFeishuEditBar() {
    removeFeishuEditBar();
    if (!_feishuEditState) return;

    var bar = document.createElement("div");
    bar.id = "ai-feishu-edit-bar";
    bar.className = "ai-feishu-edit-bar";
    bar.innerHTML =
      '<span class="ai-feishu-edit-bar-text">' +
        escHTML(L.feishuDocSaveBackTip.replace("{title}", _feishuEditState.title)) +
      '</span>' +
      '<div class="ai-feishu-edit-bar-actions">' +
        '<button class="ai-feishu-edit-bar-save">' + escHTML(L.feishuDocSaveBack) + '</button>' +
        '<button class="ai-feishu-edit-bar-close">&times;</button>' +
      '</div>';

    bar.querySelector(".ai-feishu-edit-bar-save").addEventListener("click", function () {
      saveBackToFeishu();
    });
    bar.querySelector(".ai-feishu-edit-bar-close").addEventListener("click", function () {
      _feishuEditState = null;
      removeFeishuEditBar();
    });

    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add("show"); });
  }

  function removeFeishuEditBar() {
    var bar = document.getElementById("ai-feishu-edit-bar");
    if (bar) bar.remove();
  }

  async function saveBackToFeishu() {
    if (!_feishuEditState) return;

    var docContent = getDocumentText();
    if (!docContent || !docContent.trim()) {
      showToast(L.feishuNoContent, "error");
      return;
    }

    var creds = loadFeishuCredentials();
    if (!creds) {
      showToast(L.feishuNoCreds, "error", 5000);
      return;
    }

    var cfg = loadConfig();
    var editState = _feishuEditState;
    var progress = showFeishuProgress();
    var progressEl = progress.el;
    var signal = progress.signal;

    try {
      updateFeishuProgress(progressEl, L.feishuStepConvert, 2);
      var docxBlob = await convertToDocxBlob(docContent);
      if (signal.aborted) throw new DOMException("Aborted", "AbortError");

      updateFeishuProgress(progressEl, L.feishuStepAuth, 3);
      var token = await getFeishuTenantToken(signal);

      if (editState.feishu_doc_token) {
        updateFeishuProgress(progressEl, L.feishuStepDelete, 3);
        await feishuDeleteDoc(token, editState.feishu_doc_token);
      }

      if (signal.aborted) throw new DOMException("Aborted", "AbortError");
      updateFeishuProgress(progressEl, L.feishuStepUpload, 4);
      var fileToken = await feishuUploadBlob(token, docxBlob, editState.title + ".docx", signal);

      var folderToken = (cfg.feishu && cfg.feishu.target_folder) || "";
      updateFeishuProgress(progressEl, L.feishuStepImport, 5);
      var ticket = await feishuCreateImportTask(token, fileToken, editState.title, folderToken, signal);

      updateFeishuProgress(progressEl, L.feishuStepPoll, 5);
      var result = await feishuPollImportResult(token, ticket, signal);

      setFeishuSession(editState.sessionKey, {
        title: editState.title,
        feishu_doc_token: result.token,
        feishu_doc_url: result.url,
        last_archived_at: new Date().toISOString(),
        content_cache: docContent.slice(0, 5000),
        full_content: docContent,
      });

      _feishuEditState.feishu_doc_token = result.token;
      _feishuEditState.feishu_doc_url = result.url;

      var editorUid2 = (cfg.feishu && cfg.feishu.default_editor_userid || "").trim();
      if (editorUid2) {
        try {
          var granted2 = await feishuGrantEditByUserId(token, result.token, editorUid2, signal);
          if (!granted2) showToast(L.feishuGrantEditFail, "warn", 7000);
        } catch (ge2) {
          pluginLog("warn", "Feishu grant edit: " + ge2.message);
          showToast(L.feishuGrantEditFail, "warn", 7000);
        }
      }

      removeFeishuProgress(progressEl);
      showToast(L.feishuDocSaved, "success");
      pluginLog("info", "Feishu doc updated: " + editState.title + " → " + result.url);

    } catch (e) {
      removeFeishuProgress(progressEl);
      if (e.name === "AbortError") {
        pluginLog("info", "Feishu save-back stopped by user");
        showToast(L.feishuStopped, "info");
      } else {
        pluginLog("error", "Feishu save-back failed: " + e.message);
        showToast(L.feishuFailed + e.message, "error", 5000);
      }
    }
  }

  // ===================== In-memory Markdown → DOCX =====================

  // --- CRC32 ---
  var _crcT = (function () {
    var t = new Uint32Array(256);
    for (var i = 0; i < 256; i++) {
      var c = i;
      for (var j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c;
    }
    return t;
  })();
  function _crc32(d) {
    var c = 0xFFFFFFFF;
    for (var i = 0; i < d.length; i++) c = _crcT[(c ^ d[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  // --- Minimal ZIP (STORE, no compression) ---
  function _zipBlob(entries) {
    var parts = [], cd = [], off = 0;
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i], nm = new TextEncoder().encode(e.name), crc = _crc32(e.data), sz = e.data.length;
      var lh = new ArrayBuffer(30 + nm.length), lv = new DataView(lh);
      lv.setUint32(0, 0x04034b50, true); lv.setUint16(4, 20, true);
      lv.setUint16(8, 0, true); lv.setUint32(14, crc, true);
      lv.setUint32(18, sz, true); lv.setUint32(22, sz, true);
      lv.setUint16(26, nm.length, true);
      new Uint8Array(lh, 30).set(nm);
      parts.push(new Uint8Array(lh)); parts.push(e.data);

      var ch = new ArrayBuffer(46 + nm.length), cv = new DataView(ch);
      cv.setUint32(0, 0x02014b50, true); cv.setUint16(4, 20, true); cv.setUint16(6, 20, true);
      cv.setUint16(10, 0, true); cv.setUint32(16, crc, true);
      cv.setUint32(20, sz, true); cv.setUint32(24, sz, true);
      cv.setUint16(28, nm.length, true); cv.setUint32(42, off, true);
      new Uint8Array(ch, 46).set(nm);
      cd.push(new Uint8Array(ch));
      off += 30 + nm.length + sz;
    }
    var cdOff = off, cdSz = 0;
    for (var i = 0; i < cd.length; i++) { parts.push(cd[i]); cdSz += cd[i].length; }
    var eocd = new ArrayBuffer(22), ev = new DataView(eocd);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(8, entries.length, true); ev.setUint16(10, entries.length, true);
    ev.setUint32(12, cdSz, true); ev.setUint32(16, cdOff, true);
    parts.push(new Uint8Array(eocd));
    return new Blob(parts, { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  }

  // --- OOXML helpers ---
  var _W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  var _R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
  var _WP_NS = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing";
  var _A_NS = "http://schemas.openxmlformats.org/drawingml/2006/main";
  var _PIC_NS = "http://schemas.openxmlformats.org/drawingml/2006/picture";
  var _R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";

  function _ex(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function _wr(t, rp) { return "<w:r>" + (rp ? "<w:rPr>" + rp + "</w:rPr>" : "") + '<w:t xml:space="preserve">' + _ex(t) + "</w:t></w:r>"; }
  function _wp(runs, pp) { return "<w:p>" + (pp ? "<w:pPr>" + pp + "</w:pPr>" : "") + runs + "</w:p>"; }

  // --- Image OOXML: generates a <w:drawing> for an embedded image ---
  var _EMU_PER_PX = 9525;
  var _MAX_IMG_W = 5800000;

  function _imgDrawingXml(rId, imgIdx, wEmu, hEmu) {
    if (wEmu > _MAX_IMG_W) {
      var scale = _MAX_IMG_W / wEmu;
      wEmu = _MAX_IMG_W;
      hEmu = Math.round(hEmu * scale);
    }
    return '<w:r><w:drawing>' +
      '<wp:inline distT="0" distB="0" distL="0" distR="0">' +
      '<wp:extent cx="' + wEmu + '" cy="' + hEmu + '"/>' +
      '<wp:effectExtent l="0" t="0" r="0" b="0"/>' +
      '<wp:docPr id="' + imgIdx + '" name="Picture ' + imgIdx + '"/>' +
      '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>' +
      '<a:graphic>' +
      '<a:graphicData uri="' + _PIC_NS + '">' +
      '<pic:pic>' +
      '<pic:nvPicPr><pic:cNvPr id="' + imgIdx + '" name="image' + imgIdx + '"/><pic:cNvPicPr/></pic:nvPicPr>' +
      '<pic:blipFill>' +
      '<a:blip r:embed="' + rId + '"/>' +
      '<a:stretch><a:fillRect/></a:stretch>' +
      '</pic:blipFill>' +
      '<pic:spPr bwMode="auto">' +
      '<a:xfrm><a:off x="0" y="0"/><a:ext cx="' + wEmu + '" cy="' + hEmu + '"/></a:xfrm>' +
      '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>' +
      '</pic:spPr>' +
      '</pic:pic>' +
      '</a:graphicData></a:graphic>' +
      '</wp:inline></w:drawing></w:r>';
  }

  // --- Extract all image references from markdown (supports ![alt](url) and <img> tags) ---
  function _extractImages(md) {
    var images = [], seen = {};
    var re1 = /!\[([^\]]*)\]\(([^)]+)\)/g;
    var m;
    while ((m = re1.exec(md)) !== null) {
      var url = m[2].trim();
      if (!seen[url]) { seen[url] = true; images.push({ alt: m[1], url: url }); }
    }
    var re2 = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi;
    while ((m = re2.exec(md)) !== null) {
      var url = m[1].trim();
      if (!seen[url]) { seen[url] = true; images.push({ alt: "", url: url }); }
    }
    return images;
  }

  function _fnFromUrl(s) {
    try { return decodeURIComponent(s.split(/[\/\\?#]/).pop()); } catch (_) { return s.split(/[\/\\?#]/).pop(); }
  }

  // --- Load image binary: canvas from DOM > getImageDataUrl > resolved file > fs fallback ---
  async function _loadImageData(url, baseDir) {
    try {
      if (url.startsWith("data:image/")) return _dataUrlToBytes(url);

      var urlFn = _fnFromUrl(url);
      var domImgs = document.querySelectorAll("#write img");
      pluginLog("info", "[img] Loading: " + url + " | DOM imgs: " + domImgs.length + " | urlFn: " + urlFn);

      for (var di = 0; di < domImgs.length; di++) {
        var el = domImgs[di];
        var attrSrc = el.getAttribute("src") || el.getAttribute("data-src") || "";
        var propSrc = el.src || "";
        var attrFn = _fnFromUrl(attrSrc);
        var propFn = _fnFromUrl(propSrc);

        var matched = (attrSrc === url) || (propSrc === url);
        if (!matched && urlFn.length > 4) {
          matched = (attrFn === urlFn) || (propFn === urlFn);
        }
        if (!matched) {
          try { matched = (decodeURIComponent(attrSrc) === url) || (attrSrc === decodeURIComponent(url)); } catch (_) {}
        }
        if (!matched && propSrc.startsWith("file://")) {
          try {
            var decodedProp = decodeURIComponent(propSrc.replace(/^file:\/\//, "").replace(/\?.*$/, ""));
            matched = (decodedProp === url);
          } catch (_) {}
        }

        if (!matched) continue;

        pluginLog("info", "[img] DOM match #" + di + ": attr=" + attrSrc.substring(0, 80) + " prop=" + propSrc.substring(0, 80) + " w=" + el.naturalWidth + " h=" + el.naturalHeight + " complete=" + el.complete);

        if (el.complete && el.naturalWidth > 0 && el.naturalHeight > 0) {
          try {
            var cvs = document.createElement("canvas");
            cvs.width = el.naturalWidth;
            cvs.height = el.naturalHeight;
            cvs.getContext("2d").drawImage(el, 0, 0);
            var d = cvs.toDataURL("image/jpeg", 0.92);
            if (d && d.length > 200) {
              var result = _dataUrlToBytes(d);
              if (result) { pluginLog("info", "[img] OK via canvas: " + urlFn); return result; }
            }
          } catch (ce) {
            pluginLog("warn", "[img] Canvas err: " + ce.message);
          }
        }

        if (propSrc.startsWith("file://") || propSrc.startsWith("/")) {
          var fp = propSrc.startsWith("file://") ? decodeURIComponent(propSrc.replace(/^file:\/\//, "")) : propSrc;
          var b64 = readFileAsBase64(fp);
          if (b64) {
            var result = _dataUrlToBytes("data:" + getMimeFromPath(fp) + ";base64," + b64);
            if (result) { pluginLog("info", "[img] OK via propSrc fs: " + fp); return result; }
          }
        }

        try {
          var gdUrl = await getImageDataUrl(el);
          if (gdUrl && gdUrl.startsWith("data:image/") && gdUrl.length > 200) {
            var result = _dataUrlToBytes(gdUrl);
            if (result) { pluginLog("info", "[img] OK via getImageDataUrl"); return result; }
          }
        } catch (ge) {
          pluginLog("warn", "[img] getImageDataUrl err: " + ge.message);
        }
      }

      pluginLog("info", "[img] No DOM match for: " + url);

      for (var di = 0; di < domImgs.length; di++) {
        var el = domImgs[di];
        pluginLog("info", "[img] Brute-force DOM #" + di + ": src=" + (el.getAttribute("src") || "").substring(0, 100) + " | w=" + el.naturalWidth + " complete=" + el.complete);
        if (el.complete && el.naturalWidth > 0 && el.naturalHeight > 0) {
          try {
            var cvs = document.createElement("canvas");
            cvs.width = el.naturalWidth;
            cvs.height = el.naturalHeight;
            cvs.getContext("2d").drawImage(el, 0, 0);
            var d = cvs.toDataURL("image/jpeg", 0.92);
            if (d && d.length > 200) {
              var result = _dataUrlToBytes(d);
              if (result) { pluginLog("info", "[img] OK via brute-force canvas #" + di); return result; }
            }
          } catch (ce) {
            pluginLog("warn", "[img] Brute canvas err: " + ce.message);
          }
        }
        try {
          var gdUrl = await getImageDataUrl(el);
          if (gdUrl && gdUrl.startsWith("data:image/") && gdUrl.length > 200) {
            var result = _dataUrlToBytes(gdUrl);
            if (result) { pluginLog("info", "[img] OK via brute-force getImageDataUrl #" + di); return result; }
          }
        } catch (_) {}
      }

      if (url.startsWith("http://") || url.startsWith("https://")) {
        try {
          var netUrl = await fetchImageAsDataUrl(url);
          if (netUrl) {
            var result = _dataUrlToBytes(netUrl);
            if (result) { pluginLog("info", "[img] OK via network fetch"); return result; }
          }
        } catch (_) {}
      }

      var pathsToTry = [];
      if (url.startsWith("file://")) {
        pathsToTry.push(decodeURIComponent(url.replace(/^file:\/\//, "")));
      }
      if (baseDir && !url.startsWith("/") && !url.startsWith("file://")) {
        pathsToTry.push(baseDir + "/" + url);
        try { pathsToTry.push(baseDir + "/" + decodeURIComponent(url)); } catch (_) {}
      }
      if (url.startsWith("/")) pathsToTry.push(url);

      for (var pi = 0; pi < pathsToTry.length; pi++) {
        var b64 = readFileAsBase64(pathsToTry[pi]);
        if (b64) {
          var result = _dataUrlToBytes("data:" + getMimeFromPath(pathsToTry[pi]) + ";base64," + b64);
          if (result) { pluginLog("info", "[img] OK via fs: " + pathsToTry[pi]); return result; }
        }
      }

      pluginLog("warn", "[img] ALL methods failed for: " + url);
    } catch (e) {
      pluginLog("warn", "[img] Exception: " + url + " — " + e.message);
    }
    return null;
  }

  function _dataUrlToBytes(dataUrl) {
    var m = dataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
    if (!m) return null;
    var mime = m[1];
    var raw = atob(m[2]);
    var bytes = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    var ext = mime === "image/jpeg" ? "jpeg" : mime === "image/gif" ? "gif" : mime === "image/webp" ? "webp" : "png";
    return { data: bytes, mime: mime, ext: ext };
  }

  function _getImageDimensions(dataUrl) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve({ w: img.naturalWidth || 400, h: img.naturalHeight || 300 }); };
      img.onerror = function () { resolve({ w: 400, h: 300 }); };
      img.src = dataUrl;
    });
  }

  // --- Inline formatting: **bold**, *italic*, `code`, ![img](url), <img>, [link](url) ---
  function _inlineXml(text, imgMap) {
    var xml = "";
    var re = /(\*\*|__)(.*?)\1|(\*|_)((?:(?!\3).)+?)\3|`([^`]+)`|!\[([^\]]*)\]\(([^)]+)\)|<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>|\[([^\]]*)\]\([^)]*\)/g;
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) xml += _wr(text.slice(last, m.index));
      if (m[1]) xml += _wr(m[2], "<w:b/>");
      else if (m[3]) xml += _wr(m[4], "<w:i/>");
      else if (m[5] !== undefined) xml += _wr(m[5], '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/><w:shd w:val="clear" w:fill="F0F0F0"/>');
      else if (m[6] !== undefined) {
        var imgUrl = m[7].trim();
        var imgInfo = imgMap && imgMap[imgUrl];
        if (imgInfo) {
          xml += _imgDrawingXml(imgInfo.rId, imgInfo.idx, imgInfo.wEmu, imgInfo.hEmu);
        } else {
          xml += _wr("[" + (m[6] || "image") + "]", '<w:color w:val="888888"/><w:i/>');
        }
      }
      else if (m[8] !== undefined) {
        var imgUrl = m[8].trim();
        var imgInfo = imgMap && imgMap[imgUrl];
        if (imgInfo) {
          xml += _imgDrawingXml(imgInfo.rId, imgInfo.idx, imgInfo.wEmu, imgInfo.hEmu);
        } else {
          xml += _wr("[image]", '<w:color w:val="888888"/><w:i/>');
        }
      }
      else if (m[9] !== undefined) xml += _wr(m[9], '<w:color w:val="1155CC"/><w:u w:val="single"/>');
      last = m.index + m[0].length;
    }
    if (last < text.length) xml += _wr(text.slice(last));
    return xml || _wr("");
  }

  // --- Markdown pipe table → OOXML w:tbl (header + separator row + body) ---
  function _splitTableRow(line) {
    var t = line.trim();
    if (!/^\|/.test(t)) return null;
    var parts = t.split("|");
    if (parts.length < 2) return null;
    var cells = [];
    for (var k = 1; k < parts.length; k++) cells.push(parts[k].trim());
    return cells;
  }

  function _isTableSeparatorRow(line) {
    var t = line.trim();
    if (!/^\|/.test(t)) return false;
    if (t.indexOf("-") < 0 && t.indexOf(":") < 0) return false;
    return /^[\|\s\-:]+$/.test(t);
  }

  function _looksLikeTableRow(line) {
    return /^\s*\|[^\n]+\|/.test(line) || /^\s*\|[^\n]+\|\s*$/.test(line.trim());
  }

  function _buildTableXml(headerCells, bodyRows, imgMap) {
    if (!headerCells || headerCells.length === 0) return "";
    var nCol = headerCells.length;
    function normRow(row) {
      var r = row ? row.slice() : [];
      while (r.length < nCol) r.push("");
      while (r.length > nCol) r.pop();
      return r;
    }
    headerCells = normRow(headerCells);
    for (var bi = 0; bi < bodyRows.length; bi++) bodyRows[bi] = normRow(bodyRows[bi]);

    var colW = Math.max(1200, Math.floor(8640 / nCol));
    var grid = "";
    for (var g = 0; g < nCol; g++) grid += '<w:gridCol w:w="' + colW + '"/>';
    var tblB =
      '<w:tblBorders>' +
      '<w:top w:val="single" w:sz="4" w:space="0" w:color="BBBBBB"/>' +
      '<w:left w:val="single" w:sz="4" w:space="0" w:color="BBBBBB"/>' +
      '<w:bottom w:val="single" w:sz="4" w:space="0" w:color="BBBBBB"/>' +
      '<w:right w:val="single" w:sz="4" w:space="0" w:color="BBBBBB"/>' +
      '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="DDDDDD"/>' +
      '<w:insideV w:val="single" w:sz="4" w:space="0" w:color="DDDDDD"/>' +
      "</w:tblBorders>";

    function tc(cellText, isHeader) {
      var pPr = isHeader ? '<w:pStyle w:val="TableHeader"/>' : "";
      return "<w:tc><w:tcPr><w:tcW w:w=\"" + colW + '" w:type="dxa"/></w:tcPr>' +
        _wp(_inlineXml(cellText, imgMap), pPr) + "</w:tc>";
    }

    function tr(rowCells, isHeader) {
      var inner = "";
      for (var c = 0; c < rowCells.length; c++) inner += tc(rowCells[c], isHeader);
      var trPr = isHeader ? "<w:trPr><w:tblHeader/></w:trPr>" : "";
      return "<w:tr>" + trPr + inner + "</w:tr>";
    }

    var out =
      '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblCellMar>' +
      '<w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/>' +
      '<w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar>' +
      tblB + "</w:tblPr><w:tblGrid>" + grid + "</w:tblGrid>" +
      tr(headerCells, true);
    for (var r = 0; r < bodyRows.length; r++) out += tr(bodyRows[r], false);
    out += "</w:tbl>";
    return out;
  }

  // --- Block-level Markdown → OOXML body ---
  function _mdToBodyXml(md, imgMap) {
    var lines = md.split("\n"), xml = "", i = 0;
    while (i < lines.length) {
      var L = lines[i];
      if (!L.trim()) { i++; continue; }

      var hm = L.match(/^(#{1,6})\s+(.*)/);
      if (hm) { xml += _wp(_inlineXml(hm[2], imgMap), '<w:pStyle w:val="Heading' + hm[1].length + '"/>'); i++; continue; }

      // Fenced code / mermaid / html: preserve opening ```lang and closing ``` so Feishu import can recover markdown blocks
      if (L.match(/^```/) || L.match(/^~~~+/)) {
        var openFence = L.replace(/\s+$/, "");
        var code = ""; i++;
        var closeRe = openFence.charAt(0) === "~" ? /^~~~+/ : /^```/;
        while (i < lines.length && !lines[i].match(closeRe)) { code += (code ? "\n" : "") + lines[i]; i++; }
        var closeFence = (i < lines.length) ? lines[i].replace(/\s+$/, "") : (openFence.charAt(0) === "~" ? "~~~" : "```");
        var rpCode = '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/>';
        xml += _wp(_wr(openFence, rpCode), '<w:pStyle w:val="CodeBlock"/>');
        var cl = code.split("\n");
        for (var c = 0; c < cl.length; c++)
          xml += _wp(_wr(cl[c], rpCode), '<w:pStyle w:val="CodeBlock"/>');
        xml += _wp(_wr(closeFence, rpCode), '<w:pStyle w:val="CodeBlock"/>');
        i++;
        continue;
      }

      var imgLineMatch = L.match(/^\s*!\[([^\]]*)\]\(([^)]+)\)\s*$/) || L.match(/^\s*<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>\s*$/i);
      if (imgLineMatch) {
        var imgUrl = (imgLineMatch[2] || imgLineMatch[1] || "").trim();
        var imgInfo = imgMap && imgMap[imgUrl];
        if (imgInfo) {
          xml += _wp(_imgDrawingXml(imgInfo.rId, imgInfo.idx, imgInfo.wEmu, imgInfo.hEmu));
        } else {
          xml += _wp(_wr("[image]", '<w:color w:val="888888"/><w:i/>'));
        }
        i++; continue;
      }

      if (L.match(/^>\s*/)) {
        xml += _wp(_inlineXml(L.replace(/^>\s*/, ""), imgMap), '<w:pStyle w:val="Quote"/>');
        i++; continue;
      }

      var ulm = L.match(/^[\s]*[\*\-\+]\s+(.*)/);
      if (ulm) {
        var indent = L.match(/^(\s*)/)[1].length;
        var lvl = Math.min(Math.floor(indent / 2), 3);
        xml += _wp(_inlineXml(ulm[1], imgMap), '<w:numPr><w:ilvl w:val="' + lvl + '"/><w:numId w:val="1"/></w:numPr>');
        i++; continue;
      }

      var olm = L.match(/^[\s]*\d+\.\s+(.*)/);
      if (olm) {
        var indent = L.match(/^(\s*)/)[1].length;
        var lvl = Math.min(Math.floor(indent / 2), 3);
        xml += _wp(_inlineXml(olm[1], imgMap), '<w:numPr><w:ilvl w:val="' + lvl + '"/><w:numId w:val="2"/></w:numPr>');
        i++; continue;
      }

      if (L.match(/^[-*_]{3,}\s*$/)) {
        xml += '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="CCCCCC"/></w:pBdr></w:pPr></w:p>';
        i++; continue;
      }

      if (_looksLikeTableRow(L)) {
        var hdr = _splitTableRow(L);
        if (!hdr || hdr.length === 0) {
          xml += _wp(_inlineXml(L, imgMap));
          i++; continue;
        }
        var j = i + 1;
        if (j < lines.length && _isTableSeparatorRow(lines[j])) {
          var bodyA = [];
          j++;
          while (j < lines.length) {
            var LB = lines[j];
            if (!LB.trim()) break;
            if (_isTableSeparatorRow(LB)) { j++; continue; }
            if (!_looksLikeTableRow(LB)) break;
            var ca = _splitTableRow(LB);
            if (!ca) break;
            bodyA.push(ca);
            j++;
          }
          xml += _buildTableXml(hdr, bodyA, imgMap);
          i = j;
          continue;
        }
        // No |---| separator: consecutive pipe rows → first row header (Typora 仍渲染的常见写法)
        var bodyB = [];
        j = i + 1;
        while (j < lines.length) {
          var LB2 = lines[j];
          if (!LB2.trim()) break;
          if (_isTableSeparatorRow(LB2)) break;
          if (!_looksLikeTableRow(LB2)) break;
          var cb = _splitTableRow(LB2);
          if (!cb) break;
          bodyB.push(cb);
          j++;
        }
        if (bodyB.length > 0) {
          xml += _buildTableXml(hdr, bodyB, imgMap);
          i = j;
          continue;
        }
        xml += _wp(_inlineXml(L, imgMap));
        i++; continue;
      }

      xml += _wp(_inlineXml(L, imgMap));
      i++;
    }
    return xml;
  }

  // --- Static DOCX parts ---
  var _RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>';

  var _STY = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:styles xmlns:w="' + _W + '">' +
    '<w:style w:type="paragraph" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:sz w:val="24"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:spacing w:before="360" w:after="120"/></w:pPr><w:rPr><w:b/><w:sz w:val="48"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:pPr><w:spacing w:before="280" w:after="100"/></w:pPr><w:rPr><w:b/><w:sz w:val="36"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:pPr><w:spacing w:before="240" w:after="80"/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading4"><w:name w:val="heading 4"/><w:pPr><w:spacing w:before="200" w:after="60"/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading5"><w:name w:val="heading 5"/><w:pPr><w:spacing w:before="160" w:after="40"/></w:pPr><w:rPr><w:b/><w:sz w:val="22"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Heading6"><w:name w:val="heading 6"/><w:pPr><w:spacing w:before="120" w:after="40"/></w:pPr><w:rPr><w:b/><w:i/><w:sz w:val="22"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="Quote"><w:name w:val="Quote"/><w:pPr><w:ind w:left="720"/>' +
    '<w:pBdr><w:left w:val="single" w:sz="12" w:space="8" w:color="CCCCCC"/></w:pBdr></w:pPr>' +
    '<w:rPr><w:i/><w:color w:val="666666"/><w:sz w:val="24"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="CodeBlock"><w:name w:val="Code Block"/>' +
    '<w:pPr><w:shd w:val="clear" w:fill="F5F5F5"/><w:spacing w:line="280" w:lineRule="exact"/></w:pPr>' +
    '<w:rPr><w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/><w:sz w:val="20"/></w:rPr></w:style>' +
    '<w:style w:type="paragraph" w:styleId="TableHeader"><w:name w:val="Table Header"/>' +
    '<w:pPr><w:shd w:val="clear" w:fill="EEEEEE"/></w:pPr>' +
    '<w:rPr><w:b/><w:sz w:val="22"/></w:rPr></w:style>' +
    '</w:styles>';

  var _NUM = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:numbering xmlns:w="' + _W + '">' +
    '<w:abstractNum w:abstractNumId="0">' +
    '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="\u2022"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl>' +
    '<w:lvl w:ilvl="1"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="\u25E6"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="1440" w:hanging="360"/></w:pPr></w:lvl>' +
    '<w:lvl w:ilvl="2"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="\u25AA"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="2160" w:hanging="360"/></w:pPr></w:lvl>' +
    '</w:abstractNum>' +
    '<w:abstractNum w:abstractNumId="1">' +
    '<w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl>' +
    '<w:lvl w:ilvl="1"><w:start w:val="1"/><w:numFmt w:val="lowerLetter"/><w:lvlText w:val="%2."/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="1440" w:hanging="360"/></w:pPr></w:lvl>' +
    '<w:lvl w:ilvl="2"><w:start w:val="1"/><w:numFmt w:val="lowerRoman"/><w:lvlText w:val="%3."/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="2160" w:hanging="360"/></w:pPr></w:lvl>' +
    '</w:abstractNum>' +
    '<w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>' +
    '<w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>' +
    '</w:numbering>';

  // --- Main: Markdown string → DOCX Blob (async for image loading) ---
  async function markdownToDocxBlob(md) {
    var docPath = (window.File && (window.File.filePath || (window.File.bundle && window.File.bundle.filePath))) || null;
    var baseDir = null;
    if (docPath) {
      var sepIdx = Math.max(docPath.lastIndexOf("/"), docPath.lastIndexOf("\\"));
      if (sepIdx > 0) baseDir = docPath.substring(0, sepIdx);
    }

    var imageRefs = _extractImages(md);
    var domImgCount = document.querySelectorAll("#write img").length;
    pluginLog("info", "[docx] baseDir=" + baseDir + " | mdImages=" + imageRefs.length + " | domImgs=" + domImgCount);

    var imgMap = {};
    var mediaEntries = [];
    var imgRels = "";
    var imgExtensions = {};
    var rIdBase = 10;
    var loadedCount = 0;

    for (var n = 0; n < imageRefs.length; n++) {
      var ref = imageRefs[n];
      var loaded = await _loadImageData(ref.url, baseDir);
      if (!loaded) continue;

      loadedCount++;
      var idx = loadedCount;
      var rId = "rId" + (rIdBase + n);
      var fileName = "image" + idx + "." + loaded.ext;

      var rawB64 = "";
      var chunk = 8192;
      for (var ci = 0; ci < loaded.data.length; ci += chunk) {
        rawB64 += String.fromCharCode.apply(null, Array.from(loaded.data.subarray(ci, ci + chunk)));
      }
      var dim = await _getImageDimensions("data:" + loaded.mime + ";base64," + btoa(rawB64));

      var wEmu = dim.w * _EMU_PER_PX;
      var hEmu = dim.h * _EMU_PER_PX;

      imgMap[ref.url] = { rId: rId, idx: idx, wEmu: wEmu, hEmu: hEmu };
      mediaEntries.push({ name: "word/media/" + fileName, data: loaded.data });
      imgRels += '<Relationship Id="' + rId + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/' + fileName + '"/>';
      imgExtensions[loaded.ext] = loaded.mime;
    }

    if (imageRefs.length > 0) {
      if (loadedCount < imageRefs.length) {
        var failUrl = "";
        for (var fi = 0; fi < imageRefs.length; fi++) {
          if (!imgMap[imageRefs[fi].url]) { failUrl = imageRefs[fi].url; break; }
        }
        var domSrcs = [];
        var domEls = document.querySelectorAll("#write img");
        for (var si = 0; si < Math.min(domEls.length, 3); si++) {
          domSrcs.push((domEls[si].getAttribute("src") || "(no src)").substring(0, 50));
        }
        var msg = loadedCount + "/" + imageRefs.length + " imgs (DOM:" + domImgCount + ")"
          + "\nMD: " + failUrl.substring(0, 50)
          + "\nDOM: " + domSrcs.join(" | ");
        showToast(msg, "warn", 15000);
        pluginLog("warn", "[docx] " + msg);
      } else {
        pluginLog("info", "[docx] All " + loadedCount + " images loaded OK");
      }
    }

    var body = _mdToBodyXml(md, imgMap);

    var ctXml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>';
    for (var ext in imgExtensions) {
      ctXml += '<Default Extension="' + ext + '" ContentType="' + imgExtensions[ext] + '"/>';
    }
    ctXml += '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>' +
      '</Types>';

    var dRels = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
      '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>' +
      imgRels +
      '</Relationships>';

    var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="' + _W + '" xmlns:r="' + _R + '"' +
      ' xmlns:wp="' + _WP_NS + '" xmlns:a="' + _A_NS + '" xmlns:pic="' + _PIC_NS + '"' +
      '><w:body>' + body + '</w:body></w:document>';

    var te = new TextEncoder();
    var entries = [
      { name: "[Content_Types].xml", data: te.encode(ctXml) },
      { name: "_rels/.rels", data: te.encode(_RELS) },
      { name: "word/_rels/document.xml.rels", data: te.encode(dRels) },
      { name: "word/document.xml", data: te.encode(doc) },
      { name: "word/styles.xml", data: te.encode(_STY) },
      { name: "word/numbering.xml", data: te.encode(_NUM) },
    ];
    for (var mi = 0; mi < mediaEntries.length; mi++) {
      entries.push(mediaEntries[mi]);
    }

    return _zipBlob(entries);
  }

  // ===================== Logger =====================

  var _pluginLogs = [];
  var _LOG_MAX = 500;

  function pluginLog(level, msg) {
    var entry = {
      time: new Date(),
      level: level || "info",
      msg: typeof msg === "string" ? msg : String(msg),
    };
    _pluginLogs.push(entry);
    if (_pluginLogs.length > _LOG_MAX) _pluginLogs.splice(0, _pluginLogs.length - _LOG_MAX);
    var prefix = "[AI Edit][" + entry.level.toUpperCase() + "]";
    if (level === "error") console.error(prefix, entry.msg);
    else if (level === "warn") console.warn(prefix, entry.msg);
    else console.log(prefix, entry.msg);
  }

  function getPluginLogs() {
    return _pluginLogs.slice();
  }

  function clearPluginLogs() {
    _pluginLogs = [];
  }

  function formatLogTime(d) {
    var h = String(d.getHours()).padStart(2, "0");
    var m = String(d.getMinutes()).padStart(2, "0");
    var s = String(d.getSeconds()).padStart(2, "0");
    return h + ":" + m + ":" + s;
  }

  function formatLogsAsText() {
    return _pluginLogs.map(function (e) {
      var t = e.time.getFullYear() + "-" +
        String(e.time.getMonth() + 1).padStart(2, "0") + "-" +
        String(e.time.getDate()).padStart(2, "0") + " " + formatLogTime(e.time);
      return "[" + t + "] [" + e.level.toUpperCase() + "] " + e.msg;
    }).join("\n");
  }

  // Capture unhandled errors
  window.addEventListener("error", function (ev) {
    var msg = (ev.message || "Unknown error") + (ev.filename ? " (" + ev.filename + ":" + ev.lineno + ")" : "");
    if (msg.indexOf("AI Edit") >= 0 || msg.indexOf("ai-edit") >= 0 || msg.indexOf("feishu") >= 0) {
      pluginLog("error", msg);
    }
  });

  window.addEventListener("unhandledrejection", function (ev) {
    var msg = ev.reason ? (ev.reason.message || String(ev.reason)) : "Unhandled promise rejection";
    if (msg.indexOf("AI Edit") >= 0 || msg.indexOf("ai-edit") >= 0 || msg.indexOf("feishu") >= 0 || msg.indexOf("Feishu") >= 0) {
      pluginLog("error", msg);
    }
  });

  // ===================== Log Panel UI =====================

  function showLogPanel() {
    var existing = document.querySelector(".ai-log-overlay");
    if (existing) existing.remove();

    var overlay = document.createElement("div");
    overlay.className = "ai-edit-overlay ai-log-overlay";

    var panel = document.createElement("div");
    panel.className = "ai-edit-panel ai-log-panel";

    var header = document.createElement("div");
    header.className = "ai-edit-panel-header";
    header.innerHTML = '<h3>' + escHTML(L.logTitle) + '</h3>' +
      '<button class="ai-edit-close" data-log-action="close">&times;</button>';

    var body = document.createElement("div");
    body.className = "ai-edit-panel-body ai-log-body";

    var logList = document.createElement("div");
    logList.className = "ai-log-list";
    logList.id = "ai-log-list";
    renderLogEntries(logList);
    body.appendChild(logList);

    var footer = document.createElement("div");
    footer.className = "ai-edit-panel-footer";
    footer.innerHTML =
      '<button class="ai-btn secondary" data-log-action="clear">' + escHTML(L.logClear) + '</button>' +
      '<span class="ai-edit-spacer"></span>' +
      '<button class="ai-btn secondary" data-log-action="copy">' + escHTML(L.logCopy) + '</button>' +
      '<button class="ai-btn primary" data-log-action="close">' + escHTML(L.closeBtn) + '</button>';

    panel.appendChild(header);
    panel.appendChild(body);
    panel.appendChild(footer);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      var action = e.target.dataset.logAction;
      if (!action && e.target === overlay) action = "close";
      if (!action) return;

      if (action === "close") {
        overlay.remove();
      } else if (action === "copy") {
        var text = formatLogsAsText();
        writeToClipboard(text || L.logEmpty);
        showToast(L.logCopied, "success");
      } else if (action === "clear") {
        clearPluginLogs();
        renderLogEntries(logList);
        showToast(L.logCleared, "success");
      }
    });
  }

  function renderLogEntries(container) {
    var logs = getPluginLogs();
    if (logs.length === 0) {
      container.innerHTML = '<div class="ai-log-empty">' + escHTML(L.logEmpty) + '</div>';
      return;
    }
    var html = "";
    for (var i = logs.length - 1; i >= 0; i--) {
      var e = logs[i];
      var levelClass = "ai-log-" + e.level;
      html += '<div class="ai-log-entry ' + levelClass + '">' +
        '<span class="ai-log-time">' + formatLogTime(e.time) + '</span>' +
        '<span class="ai-log-level">' + e.level.toUpperCase() + '</span>' +
        '<span class="ai-log-msg">' + escHTML(e.msg) + '</span>' +
        '</div>';
    }
    container.innerHTML = html;
  }

})();
