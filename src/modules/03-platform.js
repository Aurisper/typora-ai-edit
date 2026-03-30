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
