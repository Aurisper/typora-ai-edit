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
