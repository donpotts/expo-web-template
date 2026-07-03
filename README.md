# Expo Web Template

A reusable Expo (React Native Web) single-page site template, deployed to GitHub Pages via a custom domain. No navigation library, no CI — just a static site export and a manual `npm run deploy`.

## Quick start

```bash
# 1. Get a copy of this template (clone it, or use degit for a lighter copy)
git clone <this-repo-url> my-new-site
cd my-new-site

# 2. Fill in your site's basics interactively
node scripts/new-site.js

# 3. Install dependencies (if you didn't let the script do it)
npm install

# 4. Preview
npm run web
```

## Customizing content — `site.config.ts`

Everything site-specific lives in one file, `site.config.ts`, at the project root:

| Field | Controls |
|---|---|
| `siteName` | Header brand text, `app.json` name, used in `new-site.js` prompts |
| `slug` | `app.json` slug, `package.json` name |
| `tagline` | Reserved for future meta tags (not rendered yet) |
| `domain` | Custom GitHub Pages domain (drives `public/CNAME`) |
| `colors.*` | All colors used across `App.tsx` and `src/Home.tsx` |
| `hero.title` / `hero.subtitle` | Hero heading text |
| `about.heading` / `about.body` | About section |
| `promo.*` | Optional promo bar above the services section (`enabled: false` by default) |
| `services.heading` / `services.items[]` | Services grid — any number of `{ title, description }` items |
| `contact.*` | Contact section heading/phone/email |
| `footer.text` | Footer copyright line |
| `social` | Optional list of `{ label, url }`, reserved for future use, not rendered yet |

Edit the file directly at any time — the scaffold script (`scripts/new-site.js`) is only needed once, to get the placeholders out of the way quickly.

### Hero images — the one exception

Metro (and webpack) require `require()` image paths to be static string literals, so hero images can't be driven from `site.config.ts` the way text and colors are. Instead, `src/Home.tsx` has a fixed array:

```ts
const heroImages = [
  require('./images/hero-1.jpg'),
  require('./images/hero-2.jpg'),
  ...
];
```

To change images, replace the files in `src/images/` (keep the same filenames), or edit that array directly if you want a different number of images.

## Running the scaffold script

`node scripts/new-site.js` prompts for the site name, slug, tagline, custom domain, hero title/subtitle, about paragraph, contact phone/email, and whether to run `npm install`. It edits `site.config.ts`, `package.json` (`name`), `app.json` (`name`/`slug`), and writes or removes `public/CNAME` based on whether you gave a domain.

It's safe to re-run before you start hand-editing `site.config.ts` further (e.g. if you change your mind about the site name). Once you've customized the file beyond what the script touches, just edit it directly — re-running the script afterward would only touch the same handful of fields it knows about.

## Development

```bash
npm run web       # start the Expo web dev server
npm start         # start Expo (choose web/iOS/Android from the Expo CLI menu)
```

## Deploying

```bash
npm run deploy
```

This runs `predeploy` first (`expo export -p web`, then copies `dist/index.html` to `dist/404.html` — the standard SPA-on-GitHub-Pages trick so client-side navigation doesn't 404 on refresh), then publishes the `dist/` folder to the `gh-pages` branch via the `gh-pages` package.

**Custom domain**: if `public/CNAME` exists (written by `new-site.js` when you give it a domain), Expo's web export copies the `public/` folder into `dist/` verbatim, so the CNAME file ends up published and GitHub Pages picks up the custom domain automatically. You're still responsible for pointing your domain's DNS at GitHub Pages — that's outside this repo's scope.

There is no CI/CD here by design — deploying is always a manual, local `npm run deploy`.

## Icons, splash, and favicon

Placeholder assets live in `assets/`:

- `icon.png` and `adaptive-icon.png` — 1024×1024 recommended
- `splash-icon.png` — 1200×1200 recommended (contain-fit against a white background)
- `favicon.png` — 196×196 or larger

Replace these files (same filenames) with your own branding.

## Why some Expo packages are missing

This template intentionally excludes `expo-router` (no file-based routing — it's a single page), and native-feature packages like `expo-camera`, `expo-blur`, `expo-haptics`, `expo-linear-gradient`, `expo-symbols`, `expo-web-browser`, `expo-font`, and `react-native-webview`/`react-native-screens`/`react-native-safe-area-context`, since none of them are used by the page itself. Add them back in via `npm install` if you extend the site with features that need them — see the [Expo docs](https://docs.expo.dev/) for setup.
