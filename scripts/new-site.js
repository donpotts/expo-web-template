#!/usr/bin/env node
// Scaffold a new site from this template: fills in site.config.ts, package.json,
// app.json, and public/CNAME based on interactive answers. Node-only (no npm
// deps) so it can be run before `npm install`, and works the same from
// Git Bash or PowerShell.
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline/promises');
const { stdin, stdout } = require('process');

const ROOT = path.resolve(__dirname, '..');
const SITE_CONFIG_PATH = path.join(ROOT, 'site.config.ts');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
const APP_JSON_PATH = path.join(ROOT, 'app.json');
const PUBLIC_DIR = path.join(ROOT, 'public');
const CNAME_PATH = path.join(PUBLIC_DIR, 'CNAME');

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my-website';
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read ${filePath}: ${err.message}`);
  }
}

function writeFile(filePath, contents) {
  try {
    fs.writeFileSync(filePath, contents, 'utf8');
  } catch (err) {
    throw new Error(`Failed to write ${filePath}: ${err.message}`);
  }
}

// Replace the value of a single-line `key: 'value'` or `key: "value"` field
// inside a top-level or nested object literal in site.config.ts. Works on the
// known placeholder shape shipped with this template (not a general TS parser).
function replaceStringField(source, key, value) {
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const pattern = new RegExp(`(${key}:\\s*)'[^']*'`);
  if (!pattern.test(source)) {
    throw new Error(`Could not find field "${key}" in site.config.ts`);
  }
  return source.replace(pattern, `$1'${escaped}'`);
}

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });
  const ask = async (question, defaultValue) => {
    const answer = (await rl.question(`${question} (${defaultValue}): `)).trim();
    return answer || defaultValue;
  };
  const askYesNo = async (question, defaultYes) => {
    const suffix = defaultYes ? 'Y/n' : 'y/N';
    const answer = (await rl.question(`${question} (${suffix}): `)).trim().toLowerCase();
    if (!answer) return defaultYes;
    return answer === 'y' || answer === 'yes';
  };

  console.log('--- New site setup ---');
  console.log('Press Enter to accept the default shown in parentheses.\n');

  const siteName = await ask('Site name', 'My Website');
  const suggestedSlug = slugify(siteName);
  const slug = slugify(await ask('Slug (url-safe)', suggestedSlug));
  const tagline = await ask('Tagline', 'A short tagline describing what this site is about.');
  const domain = await ask('Custom domain for GitHub Pages (blank to skip)', '');
  const repoName = domain
    ? slug
    : slugify(await ask('GitHub repo name (for the /repo-name/ Pages subpath, since no domain was given)', slug));
  const heroTitle = await ask('Hero title', `Welcome to ${siteName}`);
  const heroSubtitle = await ask('Hero subtitle', 'A short, punchy line about what you do and who it helps.');
  const aboutBody = await ask(
    'About paragraph',
    'Replace this paragraph with a short description of your business, project, or organization.'
  );
  const contactPhone = await ask('Contact phone', '+1 (555) 555-5555');
  const contactEmail = await ask('Contact email', 'hello@example.com');
  const runInstall = await askYesNo('Run npm install now?', true);

  rl.close();

  const year = new Date().getFullYear();

  // --- site.config.ts ---
  let siteConfigSource = readFile(SITE_CONFIG_PATH);
  siteConfigSource = replaceStringField(siteConfigSource, 'siteName', siteName);
  siteConfigSource = replaceStringField(siteConfigSource, 'slug', slug);
  siteConfigSource = replaceStringField(siteConfigSource, 'tagline', tagline);
  siteConfigSource = replaceStringField(siteConfigSource, 'domain', domain);
  siteConfigSource = replaceStringField(siteConfigSource, 'title', heroTitle);
  siteConfigSource = replaceStringField(siteConfigSource, 'subtitle', heroSubtitle);
  siteConfigSource = replaceStringField(siteConfigSource, 'body', aboutBody);
  siteConfigSource = replaceStringField(siteConfigSource, 'phone', contactPhone);
  siteConfigSource = replaceStringField(siteConfigSource, 'email', contactEmail);
  siteConfigSource = siteConfigSource.replace(
    /(footer:\s*{\s*text:\s*)`[^`]*`/,
    (_match, prefix) => `${prefix}\`© ${year} ${siteName}. All Rights Reserved.\``
  );
  writeFile(SITE_CONFIG_PATH, siteConfigSource);

  // --- package.json ---
  const pkg = JSON.parse(readFile(PACKAGE_JSON_PATH));
  pkg.name = slug;
  writeFile(PACKAGE_JSON_PATH, JSON.stringify(pkg, null, 2) + '\n');

  // --- app.json ---
  const appJson = JSON.parse(readFile(APP_JSON_PATH));
  appJson.expo.name = siteName;
  appJson.expo.slug = slug;
  appJson.expo.scheme = slug;
  appJson.expo.experiments = appJson.expo.experiments || {};
  appJson.expo.experiments.baseUrl = domain ? '' : `/${repoName}`;
  writeFile(APP_JSON_PATH, JSON.stringify(appJson, null, 2) + '\n');

  // --- public/CNAME ---
  if (domain) {
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    writeFile(CNAME_PATH, `${domain}\n`);
  } else if (fs.existsSync(CNAME_PATH)) {
    fs.unlinkSync(CNAME_PATH);
  }

  console.log('\nDone! Updated site.config.ts, package.json, app.json' + (domain ? ', public/CNAME' : '') + '.');
  console.log(domain ? 'Base path: "" (custom domain, served from root).' : `Base path: "/${repoName}" (GitHub Pages project subpath).`);

  if (runInstall) {
    const { execSync } = require('child_process');
    console.log('\nRunning npm install...');
    execSync('npm install', { stdio: 'inherit', cwd: ROOT });
  }

  console.log('\nNext steps:');
  console.log('  npm run web      # preview the site locally');
  if (!runInstall) console.log('  npm install       # install dependencies first');
  console.log('  npm run deploy    # build and publish to the gh-pages branch');
  if (domain) {
    console.log(`\nRemember to point your DNS for ${domain} at GitHub Pages and enable the`);
    console.log('custom domain in your repo\'s GitHub Pages settings.');
  } else {
    console.log(`\nMake sure your GitHub repo is actually named "${repoName}" — the base path`);
    console.log('baked into app.json must match the repo name for asset URLs to resolve.');
  }
  console.log('\nNote: this script is safe to re-run, but only before you start hand-editing');
  console.log('site.config.ts further — after that, edit the file directly.');
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
