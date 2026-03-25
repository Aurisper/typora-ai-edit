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

  function _ex(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function _wr(t, rp) { return "<w:r>" + (rp ? "<w:rPr>" + rp + "</w:rPr>" : "") + '<w:t xml:space="preserve">' + _ex(t) + "</w:t></w:r>"; }
  function _wp(runs, pp) { return "<w:p>" + (pp ? "<w:pPr>" + pp + "</w:pPr>" : "") + runs + "</w:p>"; }

  // --- Inline formatting: **bold**, *italic*, `code`, [link](url) ---
  function _inlineXml(text) {
    var xml = "", re = /(\*\*|__)(.*?)\1|(\*|_)((?:(?!\3).)+?)\3|`([^`]+)`|\[([^\]]*)\]\([^)]*\)/g;
    var last = 0, m;
    while ((m = re.exec(text)) !== null) {
      if (m.index > last) xml += _wr(text.slice(last, m.index));
      if (m[1]) xml += _wr(m[2], "<w:b/>");
      else if (m[3]) xml += _wr(m[4], "<w:i/>");
      else if (m[5] !== undefined) xml += _wr(m[5], '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/><w:shd w:val="clear" w:fill="F0F0F0"/>');
      else if (m[6] !== undefined) xml += _wr(m[6], '<w:color w:val="1155CC"/><w:u w:val="single"/>');
      last = m.index + m[0].length;
    }
    if (last < text.length) xml += _wr(text.slice(last));
    return xml || _wr("");
  }

  // --- Block-level Markdown → OOXML body ---
  function _mdToBodyXml(md) {
    var lines = md.split("\n"), xml = "", i = 0;
    while (i < lines.length) {
      var L = lines[i];
      if (!L.trim()) { i++; continue; }

      var hm = L.match(/^(#{1,6})\s+(.*)/);
      if (hm) { xml += _wp(_inlineXml(hm[2]), '<w:pStyle w:val="Heading' + hm[1].length + '"/>'); i++; continue; }

      if (L.match(/^```/)) {
        var code = ""; i++;
        while (i < lines.length && !lines[i].match(/^```/)) { code += (code ? "\n" : "") + lines[i]; i++; }
        var cl = code.split("\n");
        for (var c = 0; c < cl.length; c++)
          xml += _wp(_wr(cl[c], '<w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/>'), '<w:pStyle w:val="CodeBlock"/>');
        i++; continue;
      }

      if (L.match(/^>\s*/)) {
        xml += _wp(_inlineXml(L.replace(/^>\s*/, "")), '<w:pStyle w:val="Quote"/>');
        i++; continue;
      }

      var ulm = L.match(/^[\s]*[\*\-\+]\s+(.*)/);
      if (ulm) {
        var indent = L.match(/^(\s*)/)[1].length;
        var lvl = Math.min(Math.floor(indent / 2), 3);
        xml += _wp(_inlineXml(ulm[1]), '<w:numPr><w:ilvl w:val="' + lvl + '"/><w:numId w:val="1"/></w:numPr>');
        i++; continue;
      }

      var olm = L.match(/^[\s]*\d+\.\s+(.*)/);
      if (olm) {
        var indent = L.match(/^(\s*)/)[1].length;
        var lvl = Math.min(Math.floor(indent / 2), 3);
        xml += _wp(_inlineXml(olm[1]), '<w:numPr><w:ilvl w:val="' + lvl + '"/><w:numId w:val="2"/></w:numPr>');
        i++; continue;
      }

      if (L.match(/^[-*_]{3,}\s*$/)) {
        xml += '<w:p><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="CCCCCC"/></w:pBdr></w:pPr></w:p>';
        i++; continue;
      }

      if (L.match(/^\|.*\|/)) {
        if (i + 1 < lines.length && lines[i + 1].match(/^\|[\s\-:]+\|/)) i++;
        else { xml += _wp(_inlineXml(L)); }
        i++; continue;
      }

      xml += _wp(_inlineXml(L));
      i++;
    }
    return xml;
  }

  // --- Static DOCX parts ---
  var _CT = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
    '<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>' +
    '</Types>';

  var _RELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    '</Relationships>';

  var _DRELS = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>' +
    '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>' +
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

  // --- Main: Markdown string → DOCX Blob ---
  function markdownToDocxBlob(md) {
    var body = _mdToBodyXml(md);
    var doc = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      '<w:document xmlns:w="' + _W + '" xmlns:r="' + _R + '"><w:body>' + body + '</w:body></w:document>';
    var te = new TextEncoder();
    return _zipBlob([
      { name: "[Content_Types].xml", data: te.encode(_CT) },
      { name: "_rels/.rels", data: te.encode(_RELS) },
      { name: "word/_rels/document.xml.rels", data: te.encode(_DRELS) },
      { name: "word/document.xml", data: te.encode(doc) },
      { name: "word/styles.xml", data: te.encode(_STY) },
      { name: "word/numbering.xml", data: te.encode(_NUM) },
    ]);
  }
