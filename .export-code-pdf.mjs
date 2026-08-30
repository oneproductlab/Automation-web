// Generates a single HTML document containing every source file in the repo,
// each with its path as a header and code shown in a monospaced, indentation-
// preserving block. Output: .code-export.html (converted to PDF by Chrome).
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const ROOT = process.cwd();

// Directories never worth including.
const SKIP_DIRS = new Set([
  'node_modules', 'dist', '.git', '.astro', '.vercel', '.vscode', 'coverage',
]);

// Files to skip (generated, binary, or noise).
const SKIP_FILES = new Set([
  'package-lock.json', 'structure.txt', 'structure.pdf',
  '.code-export.html', 'code-export.pdf', '.DS_Store',
]);

// Only these extensions are treated as text/code we render.
const TEXT_EXT = new Set([
  '.astro', '.ts', '.tsx', '.js', '.mjs', '.cjs', '.jsx', '.json', '.md',
  '.mdx', '.css', '.html', '.txt', '.yml', '.yaml', '.svg', '.xml',
]);
// Files without an extension we still want (dotfiles/config).
const TEXT_NAMES = new Set([
  '.gitignore', '.env.example', 'robots.txt', 'llms.txt', 'tsconfig.json',
]);


function walk(dir, out = []) {
  for (const name of readdirSync(dir).sort()) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full, out);
    } else {
      if (SKIP_FILES.has(name)) continue;
      const ext = extname(name);
      if (TEXT_EXT.has(ext) || TEXT_NAMES.has(name)) out.push(full);
    }
  }
  return out;
}

const esc = (s) => s
  .replace(/&/g, '&')
  .replace(/</g, '<')
  .replace(/>/g, '>');

const files = walk(ROOT)
  .map((f) => relative(ROOT, f))
  .sort((a, b) => a.localeCompare(b));

const langOf = (p) => (extname(p).slice(1) || 'text');

const toc = files
  .map((f, i) => `<li><a href="#f${i}">${esc(f)}</a></li>`)
  .join('\n');

const sections = files.map((f, i) => {

  let code = '';
  try { code = readFileSync(join(ROOT, f), 'utf8'); }
  catch { code = '[unable to read file]'; }
  const lines = code.split('\n');
  const numbered = lines
    .map((ln, n) => `<span class="ln" data-n="${n + 1}">${esc(ln) || ' '}</span>`)
    .join('\n');
  return `
  <section class="file" id="f${i}">
    <div class="fname"><span class="lang">${langOf(f)}</span>${esc(f)}</div>
    <pre class="src"><code>${numbered}</code></pre>
  </section>`;
}).join('\n');

const now = new Date().toISOString().slice(0, 10);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>northbound — source export</title>
<style>
  :root {
    --bg: #ffffff; --fg: #1a1a1a; --muted: #6b7280;
    --line: #e5e7eb; --accent: #0f766e; --gutter: #9ca3af;
    --code-bg: #f8fafc; --header-bg: #0f172a; --header-fg: #f8fafc;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: var(--fg); background: var(--bg);
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 12px; line-height: 1.5;

  }
  .cover { padding: 48px 40px 32px; border-bottom: 2px solid var(--accent); }
  .cover h1 { margin: 0 0 4px; font-size: 28px; letter-spacing: -0.02em; }
  .cover .meta { color: var(--muted); font-size: 12px; }
  .toc { padding: 24px 40px 8px; }
  .toc h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--muted); margin: 0 0 10px; }
  .toc ol { margin: 0; padding-left: 20px; columns: 2; column-gap: 32px; }
  .toc li { font-family: ui-monospace, "SF Mono", Menlo, monospace;
    font-size: 11px; margin-bottom: 3px; break-inside: avoid; }
  .toc a { color: var(--accent); text-decoration: none; }
  .file { margin: 0 0 20px; padding: 0 40px; break-before: auto; }
  .file .fname {
    background: var(--header-bg); color: var(--header-fg);
    font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12px;
    font-weight: 600; padding: 8px 12px; border-radius: 6px 6px 0 0;
    display: flex; align-items: center; gap: 10px;
    break-after: avoid; page-break-after: avoid;
  }
  .file .lang {
    font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
    background: var(--accent); color: #fff; padding: 2px 6px; border-radius: 4px;
  }
  .code { display: flex; border: 1px solid var(--line); border-top: 0;
    border-radius: 0 0 6px 6px; background: var(--code-bg); }
  pre { margin: 0; font-family: ui-monospace, "SF Mono", Menlo, "Roboto Mono", monospace;
    font-size: 10.5px; line-height: 1.5; tab-size: 2; white-space: pre-wrap;
    word-break: break-word; }
  .src {
    border: 1px solid var(--line); border-top: 0; border-radius: 0 0 6px 6px;
    background: var(--code-bg); padding: 10px 14px 12px 0;
    counter-reset: none;

  }
  .src .ln { display: block; padding-left: 52px; position: relative; }
  .src .ln::before {
    content: attr(data-n); position: absolute; left: 0; width: 40px;
    text-align: right; color: var(--gutter); user-select: none;
  }
  @page { size: A4; margin: 14mm 0; }
</style>
</head>
<body>
  <div class="cover">
    <h1>northbound</h1>
    <div class="meta">Full source export · ${files.length} files · generated ${now}</div>
  </div>
  <div class="toc">
    <h2>Contents</h2>
    <ol>${toc}</ol>
  </div>
  ${sections}
</body>
</html>`;

writeFileSync(join(ROOT, '.code-export.html'), html);
console.log(`Wrote .code-export.html with ${files.length} files.`);