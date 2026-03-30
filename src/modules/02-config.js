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
