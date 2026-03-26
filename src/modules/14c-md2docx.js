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

  // --- Block-level Markdown → OOXML body ---
  function _mdToBodyXml(md, imgMap) {
    var lines = md.split("\n"), xml = "", i = 0;
    while (i < lines.length) {
      var L = lines[i];
      if (!L.trim()) { i++; continue; }

      var hm = L.match(/^(#{1,6})\s+(.*)/);
      if (hm) { xml += _wp(_inlineXml(hm[2], imgMap), '<w:pStyle w:val="Heading' + hm[1].length + '"/>'); i++; continue; }

      if (L.match(/^```/)) {
        var code = ""; i++;
        while (i < lines.length && !lines[i].match(/^```/)) { code += (code ? "\n" : "") + lines[i]; i++; }
        var cl = code.split("\n");
        for (var c = 0; c < cl.length; c++)
          xml += _wp(_wr(cl[c], '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/>'), '<w:pStyle w:val="CodeBlock"/>');
        i++; continue;
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

      if (L.match(/^\|.*\|/)) {
        if (i + 1 < lines.length && lines[i + 1].match(/^\|[\s\-:]+\|/)) i++;
        else { xml += _wp(_inlineXml(L, imgMap)); }
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
