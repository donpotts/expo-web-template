#!/usr/bin/env node
// `expo export -p web` (classic, non-router entry) always emits root-absolute
// asset paths ("/favicon.ico", "/_expo/...", "/assets/..."), which only work
// when the site is hosted at the domain root. GitHub Pages project sites
// without a custom domain serve from a subpath (https://user.github.io/repo/),
// which breaks those absolute paths. This rewrites them to be relative, which
// resolves correctly against the page's own URL in both cases (root custom
// domain or project-page subpath).
'use strict';

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '..', 'dist');

function rewrite(filePath) {
  let contents = fs.readFileSync(filePath, 'utf8');
  const before = contents;
  contents = contents
    .replace(/(["'(])\/_expo\//g, '$1_expo/')
    .replace(/(["'(])\/assets\//g, '$1assets/')
    .replace(/(["'])\/favicon\.ico(["'])/g, '$1favicon.ico$2');
  if (contents !== before) {
    fs.writeFileSync(filePath, contents, 'utf8');
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (/\.(html|js)$/.test(entry.name)) {
      rewrite(full);
    }
  }
}

if (!fs.existsSync(DIST_DIR)) {
  console.error(`No dist/ directory found at ${DIST_DIR} — run "expo export -p web" first.`);
  process.exit(1);
}

walk(DIST_DIR);
console.log('Rewrote absolute asset paths to relative in dist/.');
