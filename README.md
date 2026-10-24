# Cobaltic Labs

The website of Cobaltic Labs, a software studio in Lahore building websites,
mobile apps and AI automations.

## Tech

Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, TypeScript and
three.js for the hero's 3D shape. Prettier for formatting, Vitest for tests.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
npm run check    # lint, types, formatting and tests
npm run format   # apply Prettier
```

## Where the content lives

Every word on the site comes from `src/content/`, so a copy change never means
touching a component.

| File                   | What it holds                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `src/content/site.ts`  | Name, URL, title, description, email, booking link, location, nav                              |
| `src/content/home.ts`  | Hero, services, the periodic table, process, ways to work, testimonials, FAQ, founder, contact |
| `src/content/work.ts`  | Projects and their case studies at `/work/<slug>/`                                             |
| `src/content/demos.ts` | The AI demo's tasks, steps and sample output                                                   |
| `src/content/posts.ts` | Blog posts at `/blog/<slug>/`                                                                  |
| `src/content/types.ts` | The shape of all of the above                                                                  |

Wrap words in `*asterisks*` in the hero headline or lede to highlight them.
The testimonials section stays hidden while `testimonials` is empty, so only
add quotes you have permission to publish.

The contact form needs a free [Web3Forms](https://web3forms.com) access key in
`contactForm.web3formsKey` (`src/content/site.ts`) to send messages to your
inbox. Until one is set, it opens the visitor's email app with the message
filled in.

## Design

The brand comes from the name: cobalt is element 27, symbol Co, so the logo is
a periodic-table tile and every project gets its own tile. Colours, fonts and
the type scale live in `src/app/styles/tokens.css`. Each part of the page has
its own stylesheet in `src/app/styles/`, imported in order by
`src/app/globals.css`.

The 3D shape is a three.js mesh with a noise shader
(`src/lib/cobalt-shaders.ts`), drawn on a fixed canvas by
`src/lib/cobalt-scene.ts`. On wide screens it follows the page from the hero to
the services and morphs into the shape of the service in view (a browser, a
phone or a network); where it sits is worked out by `stagePose` in
`src/lib/stage.ts`. It loads after the page, stops drawing while hidden, holds
still under `prefers-reduced-motion`, and leaves the hero's glow in place when
a device has no WebGL.

Other motion: a one-time intro (`Intro`), heading reveals and card tilt
(`Motion`), a custom cursor on mouse devices (`Cursor`) and a background that
warms towards cobalt as the page scrolls (a CSS scroll-driven animation). All
of it stands down under `prefers-reduced-motion`.

The share image is `public/og.png` (1200 × 630). The favicon and the home-screen
icon are `src/app/icon.svg` and `src/app/apple-icon.png`.

## Deploying

The site is hosted on GitHub Pages from the `cobalticlabs` organization. Every
push to `main` runs `.github/workflows/deploy.yml`, which checks, builds and
publishes `./out`. Pull requests run the same checks in
`.github/workflows/ci.yml`.

The deploy reads the site's address from GitHub Pages, so canonical links, the
sitemap and share images follow it: `https://cobalticlabs.github.io` today, and
the custom domain once one is set under **Settings → Pages → Custom domain**.
`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` override it for local builds.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub
Actions**.
