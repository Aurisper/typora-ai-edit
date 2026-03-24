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
