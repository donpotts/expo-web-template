# Expo Web Template

This is a **template project**, not a live site — it's cloned/copied each time a new static site is started. Treat it as scaffolding, not as an app with real business content.

## What this is

An Expo (React Native Web) single-page site, deployed to GitHub Pages via `npm run deploy` (the `gh-pages` npm package). No navigation library — `App.tsx` renders one screen, `src/Home.tsx`. No CI/CD; deploy is always a manual local command, by design.

## Where content lives

All site content and colors are centralized in `site.config.ts` at the project root — `App.tsx` and `src/Home.tsx` read from it rather than hardcoding strings/hex colors. When asked to change site copy, contact info, services, or colors, edit `site.config.ts`, not the component files.

**Exception**: hero images (`src/images/hero-1.jpg` … `hero-5.jpg`) are referenced via a fixed `require()` array in `src/Home.tsx`, because Metro/webpack require image paths to be static string literals — they can't be driven from `site.config.ts`. Swapping images means replacing files in `src/images/` (same filenames) or editing that array.

## Scaffold script

`scripts/new-site.js` (plain Node, no npm deps) interactively fills in `site.config.ts`, `package.json` (`name`), `app.json` (`name`/`slug`), and `public/CNAME` when setting up a new site from this template. It does targeted string/JSON replacement on the known placeholder shape — it is not a general TypeScript codemod, so if `site.config.ts`'s structure changes significantly, the script's regexes in `replaceStringField()` and the footer-text replacement need to stay in sync with field order (it replaces the *first* occurrence of a given key, relying on `hero.title`/`hero.subtitle`/`about.body`/`contact.phone`/`contact.email` each appearing earlier in the file than any same-named field in `services.items`).

## Deploy mechanism

`npm run deploy` → `predeploy` (`expo export -p web` + copy `index.html` to `404.html` for SPA routing on GitHub Pages) → `gh-pages --nojekyll -d dist -t`. The custom domain is handled via `public/CNAME` (Expo's web export copies `public/` into `dist/` verbatim) rather than a hardcoded `--cname` flag, so the deploy script stays domain-agnostic across different sites built from this template.

## Dependency list is intentionally trimmed

This template dropped several packages that existed in the site it was generalized from but were never actually used: `expo-router`, `expo-camera`, `expo-blur`, `expo-haptics`, `expo-linear-gradient`, `expo-symbols`, `expo-web-browser`, `expo-linking`, `expo-font`, `react-native-webview`, `react-native-screens`, `react-native-safe-area-context`. Don't re-add these "for completeness" — only add a package back when a specific feature actually needs it.

## Placeholder assets

`assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash-icon.png`, `assets/favicon.png` are programmatically generated flat-color placeholders (not real branding) — expected to be replaced per-site.
