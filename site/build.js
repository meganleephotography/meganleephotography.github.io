const fs = require('fs');
const path = require('path');

const dir = __dirname;
const tpl = fs.readFileSync(path.join(dir, 'site.template.html'), 'utf8');
const uri = f => 'data:image/png;base64,' + fs.readFileSync(path.join(dir, f)).toString('base64');

const body = tpl
  .replace('__SIDEBYSIDE__', uri('sidebysidelogo-trim.png'))
  .replace('__STACKED__', uri('stackedLogo-trim.png'));
if (body.includes('__SIDEBYSIDE__') || body.includes('__STACKED__')) throw new Error('token left behind');

// Artifact build: body-only, the publisher adds the document skeleton
fs.writeFileSync(path.join(dir, 'site.html'), body);

// Local build: full standalone document for any static webhost
const standalone = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Candid, light-chasing photography for families, maternity, fashion, and events — Megan Lee Photography.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪻</text></svg>">
</head>
<body>
${body}
</body>
</html>
`;
fs.writeFileSync(path.join(dir, 'index.html'), standalone);
// GitHub Pages serves the repo root, so keep a copy there in step with this one
fs.writeFileSync(path.join(dir, '..', 'index.html'), standalone);

// syntax-check the page script
const m = body.match(/<script>([\s\S]*)<\/script>/);
fs.writeFileSync(path.join(dir, 'pagescript.js'), m[1]);
console.log('built site.html (' + (body.length / 1024).toFixed(0) + 'KB) and index.html (' + (standalone.length / 1024).toFixed(0) + 'KB)');
