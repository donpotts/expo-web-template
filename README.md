# Expo Web Template

A reusable Expo (React Native Web) multi-page site template, deployed to GitHub Pages. Uses `expo-router` for file-based routing (Home, About, Services, Contact with working nav links) and a manual `npm run deploy` — no CI.

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

## Pages

| Route | File | Content |
|---|---|---|
| `/` | `app/index.tsx` | Landing page: hero image carousel, title/subtitle, optional promo bar |
| `/about` | `app/about.tsx` | About section |
| `/services` | `app/services.tsx` | Services grid |
| `/contact` | `app/contact.tsx` | Contact info |

`app/_layout.tsx` renders the shared header (site name + nav links) and footer around every page. Add a new page by creating another file under `app/` and a matching entry in the `NAV_LINKS` array in `app/_layout.tsx`.

## Customizing content — `site.config.ts`

Everything site-specific lives in one file, `site.config.ts`, at the project root:

| Field | Controls |
|---|---|
| `siteName` | Header brand text, `app.json` name, used in `new-site.js` prompts |
| `slug` | `app.json` slug, `package.json` name |
| `tagline` | Reserved for future meta tags (not rendered yet) |
| `domain` | Custom GitHub Pages domain (drives `public/CNAME` and `app.json`'s base path) |
| `colors.*` | All colors used across `app/_layout.tsx` and the page files |
| `hero.title` / `hero.subtitle` | Landing page hero heading text |
| `about.heading` / `about.body` | About page |
| `promo.*` | Optional promo bar on the landing page (`enabled: false` by default) |
| `services.heading` / `services.items[]` | Services grid — any number of `{ title, description }` items |
| `contact.*` | Contact page heading/phone/email |
| `footer.text` | Footer copyright line, shown on every page |
| `social` | Optional list of `{ label, url }`, reserved for future use, not rendered yet |

Edit the file directly at any time — the scaffold script (`scripts/new-site.js`) is only needed once, to get the placeholders out of the way quickly.

### Hero images — the one exception

Metro (and webpack) require `require()` image paths to be static string literals, so hero images can't be driven from `site.config.ts` the way text and colors are. Instead, `app/index.tsx` has a fixed array:

```ts
const heroImages = [
  require('../src/images/hero-1.jpg'),
  require('../src/images/hero-2.jpg'),
  ...
];
```

To change images, replace the files in `src/images/` (keep the same filenames), or edit that array directly if you want a different number of images.

## Running the scaffold script

`node scripts/new-site.js` prompts for the site name, slug, tagline, custom domain (or, if you skip that, the GitHub repo name), hero title/subtitle, about paragraph, contact phone/email, and whether to run `npm install`. It edits `site.config.ts`, `package.json` (`name`), `app.json` (`name`/`slug`/`scheme`/base path), and writes or removes `public/CNAME` based on whether you gave a domain.

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

This runs `predeploy` first (`expo export -p web`, then copies `dist/index.html` to `dist/404.html` — the standard SPA-on-GitHub-Pages trick so navigating directly to `/about` or refreshing on it doesn't 404, since GitHub Pages has no server-side rewrites and the router needs to load and take over client-side), then publishes the `dist/` folder to the `gh-pages` branch via the `gh-pages` package.

### Base path — root domain vs. GitHub Pages subpath

`app.json`'s `expo.experiments.baseUrl` tells the web export what path prefix all its asset/route URLs need. `new-site.js` sets this for you:

- **Custom domain** (you gave one): `baseUrl` is `""` — the site is served from the domain root.
- **No custom domain**: GitHub Pages serves project sites from `https://<user>.github.io/<repo-name>/`, so `baseUrl` is set to `/<repo-name>`. **The repo name must match exactly**, or asset/JS URLs will 404.

If `public/CNAME` exists (written by `new-site.js` when you give it a domain), Expo's web export copies the `public/` folder into `dist/` verbatim, so the CNAME file gets published and GitHub Pages picks up the custom domain automatically. You're still responsible for pointing your domain's DNS at GitHub Pages — that's outside this repo's scope.

There is no CI/CD here by design — deploying is always a manual, local `npm run deploy`.

## Icons, splash, and favicon

Placeholder assets live in `assets/`:

- `icon.png` and `adaptive-icon.png` — 1024×1024 recommended
- `splash-icon.png` — 1200×1200 recommended (contain-fit against a white background)
- `favicon.png` — 196×196 or larger

Replace these files (same filenames) with your own branding.

## Why some Expo packages are missing

This template excludes native-feature packages like `expo-camera`, `expo-blur`, `expo-haptics`, `expo-linear-gradient`, `expo-symbols`, `expo-web-browser`, `expo-font`, and `react-native-webview`, since none of them are used by the pages. `expo-router`, `react-native-screens`, and `react-native-safe-area-context` *are* included — they power the multi-page navigation. Add other packages back in via `npm install` if you extend the site with features that need them — see the [Expo docs](https://docs.expo.dev/) for setup.
