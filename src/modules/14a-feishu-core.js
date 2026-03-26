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

  function convertToDocxBlob(mdContent) {
    return markdownToDocxBlob(mdContent);
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
