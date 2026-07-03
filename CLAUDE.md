# Expo Web Template

This is a **template project**, not a live site — it's cloned/copied each time a new static site is started. Treat it as scaffolding, not as an app with real business content.

## What this is

An Expo (React Native Web) multi-page site using `expo-router`'s file-based routing, deployed to GitHub Pages via `npm run deploy` (the `gh-pages` npm package). No CI/CD; deploy is always a manual local command, by design.

## Page structure

- `app/_layout.tsx` — shared header (site name + nav links) and footer, wraps every route via `<Stack screenOptions={{ headerShown: false }} />`.
- `app/index.tsx` — landing page (hero carousel + title/subtitle + optional promo bar).
- `app/about.tsx`, `app/services.tsx`, `app/contact.tsx` — one route per nav link.
- `src/styles.ts` — shared `StyleSheet` fragments (sections, cards, promo bar) reused across pages so each page file stays short.

Add a new page: create `app/<name>.tsx` and add `{ href: '/<name>', label: '...' }` to `NAV_LINKS` in `app/_layout.tsx`.

## Where content lives

All site content and colors are centralized in `site.config.ts` at the project root — page files and `_layout.tsx` read from it rather than hardcoding strings/hex colors. When asked to change site copy, contact info, services, or colors, edit `site.config.ts`, not the component files.

**Exception**: hero images (`src/images/hero-1.jpg` … `hero-5.jpg`) are referenced via a fixed `require()` array in `app/index.tsx`, because Metro/webpack require image paths to be static string literals — they can't be driven from `site.config.ts`. Swapping images means replacing files in `src/images/` (same filenames) or editing that array.

## Scaffold script

`scripts/new-site.js` (plain Node, no npm deps) interactively fills in `site.config.ts`, `package.json` (`name`), `app.json` (`name`/`slug`/`scheme`/`experiments.baseUrl`), and `public/CNAME` when setting up a new site from this template. It does targeted string/JSON replacement on the known placeholder shape — it is not a general TypeScript codemod, so if `site.config.ts`'s structure changes significantly, the script's regexes in `replaceStringField()` and the footer-text replacement need to stay in sync with field order (it replaces the *first* occurrence of a given key, relying on `hero.title`/`hero.subtitle`/`about.body`/`contact.phone`/`contact.email` each appearing earlier in the file than any same-named field in `services.items`).

## Deploy mechanism and base path

`npm run deploy` → `predeploy` (`expo export -p web` + copy `index.html` to `404.html` for SPA routing on GitHub Pages, since there are no server-side rewrites and the client-side router needs to load on any path) → `gh-pages --nojekyll -d dist -t`.

`app.json`'s `expo.experiments.baseUrl` must match the actual deploy target or asset/JS/route URLs will 404:
- Custom domain (root-served): `baseUrl: ""`.
- No custom domain, GitHub Pages project page: `baseUrl: "/<repo-name>"` — must exactly match the repo name, since GitHub Pages serves project sites at `https://<user>.github.io/<repo-name>/`.

`new-site.js` sets this automatically based on whether a domain was given. The custom domain itself is handled via `public/CNAME` (Expo's web export copies `public/` into `dist/` verbatim) rather than a hardcoded `gh-pages --cname` flag, so the deploy script stays domain-agnostic across different sites built from this template.

There used to be a `scripts/fix-web-paths.js` post-processing step that rewrote root-absolute asset paths to relative ones — it's gone now that `experiments.baseUrl` is configured correctly, which is the proper Expo-supported fix. Don't reintroduce it.

## Dependency list

Kept because the page structure actively uses them: `expo-router`, `react-native-screens`, `react-native-safe-area-context`, `expo-linking` (routing/navigation), `expo-status-bar`, `expo-constants`, `expo-splash-screen`, `expo-system-ui`.

Intentionally dropped (existed in the site this template was generalized from, but unused): `expo-camera`, `expo-blur`, `expo-haptics`, `expo-linear-gradient`, `expo-symbols`, `expo-web-browser`, `expo-font`, `react-native-webview`. Don't re-add these "for completeness" — only add a package back when a specific feature actually needs it.

## Placeholder assets

`assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash-icon.png`, `assets/favicon.png` are programmatically generated flat-color placeholders (not real branding) — expected to be replaced per-site. `src/images/hero-*.jpg` are generated placeholder photos, not licensed stock photography — also expected to be replaced.
