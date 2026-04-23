// One-shot Markdown → PDF renderer with Hebrew RTL support.
// Usage: node scripts/md-to-pdf.mjs <input.md> <output.pdf>
// Uses Playwright's bundled Chromium to render HTML and save as PDF.

import { readFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let chromium;
try {
  chromium = require("playwright").chromium;
} catch {
  chromium = require("C:/Users/neozi/AppData/Roaming/npm/node_modules/playwright").chromium;
}

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/md-to-pdf.mjs <input.md> <output.pdf>");
  process.exit(1);
}

const md = readFileSync(resolve(inputPath), "utf8");

// Minimal markdown → HTML converter. Good enough for our own docs.
function mdToHtml(src) {
  const lines = src.split(/\r?\n/);
  const out = [];
  let inCode = false;
  let inList = false;
  let paraBuf = [];

  const flushPara = () => {
    if (paraBuf.length) {
      out.push(`<p>${inline(paraBuf.join(" "))}</p>`);
      paraBuf = [];
    }
  };
  const closeList = () => {
    if (inList) { out.push("</ul>"); inList = false; }
  };

  for (const line of lines) {
    // Fenced code blocks
    if (line.startsWith("```")) {
      flushPara(); closeList();
      if (!inCode) { out.push('<pre><code>'); inCode = true; }
      else { out.push('</code></pre>'); inCode = false; }
      continue;
    }
    if (inCode) { out.push(escapeHtml(line)); continue; }

    // Headings
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara(); closeList();
      out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`);
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      flushPara(); closeList();
      out.push("<hr/>");
      continue;
    }

    // Unordered list
    const li = line.match(/^\s*[-*]\s+(.*)$/);
    if (li) {
      flushPara();
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(li[1])}</li>`);
      continue;
    }

    // Blockquote
    const bq = line.match(/^>\s?(.*)$/);
    if (bq) {
      flushPara(); closeList();
      out.push(`<blockquote>${inline(bq[1])}</blockquote>`);
      continue;
    }

    // Blank line
    if (/^\s*$/.test(line)) {
      flushPara(); closeList();
      continue;
    }

    // Paragraph accumulate
    closeList();
    paraBuf.push(line);
  }
  flushPara(); closeList();
  if (inCode) out.push('</code></pre>');
  return out.join("\n");
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s) {
  s = escapeHtml(s);
  // Bold **x**
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // Inline code `x`
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  // Links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return s;
}

const bodyHtml = mdToHtml(md);

const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8"/>
<title>Document</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  html, body { font-family: "Heebo", "Segoe UI", Arial, sans-serif; color: #1E3A5F; line-height: 1.55; font-size: 11pt; }
  body { direction: rtl; }
  h1 { font-size: 20pt; border-bottom: 2px solid #002069; padding-bottom: 6px; margin-top: 0; color: #002069; }
  h2 { font-size: 14pt; color: #002069; margin-top: 22px; }
  h3 { font-size: 12pt; color: #002069; margin-top: 16px; }
  h4 { font-size: 11pt; color: #002069; }
  p  { margin: 8px 0; }
  ul { padding-right: 24px; padding-left: 0; }
  li { margin: 4px 0; }
  hr { border: none; border-top: 1px solid #CBD5E1; margin: 18px 0; }
  blockquote {
    border-right: 4px solid #3B6FD8;
    background: #F8FAFC;
    margin: 12px 0;
    padding: 8px 14px;
    color: #496177;
    font-size: 10pt;
  }
  code {
    background: #F1F5F9;
    padding: 2px 5px;
    border-radius: 3px;
    font-family: "Consolas", "Menlo", monospace;
    font-size: 10pt;
    direction: ltr;
    unicode-bidi: embed;
  }
  pre {
    background: #F1F5F9;
    padding: 10px 14px;
    border-radius: 6px;
    overflow: hidden;
    direction: ltr;
    text-align: left;
    unicode-bidi: embed;
    font-size: 10pt;
    white-space: pre-wrap;
    word-break: break-word;
  }
  pre code { background: transparent; padding: 0; }
  a { color: #3B6FD8; text-decoration: underline; }
  strong { color: #002069; }
  table { border-collapse: collapse; width: 100%; margin: 12px 0; }
  th, td { border: 1px solid #CBD5E1; padding: 6px 10px; text-align: right; font-size: 10pt; }
  th { background: #F1F5F9; color: #002069; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

mkdirSync(dirname(resolve(outputPath)), { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "networkidle" });
await page.pdf({
  path: resolve(outputPath),
  format: "A4",
  printBackground: true,
  margin: { top: "18mm", right: "16mm", bottom: "18mm", left: "16mm" },
});
await browser.close();

console.log(`Wrote ${outputPath}`);
