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

| File                   | What it holds                                                       |
| ---------------------- | ------------------------------------------------------------------- |
| `src/content/site.ts`  | Name, URL, title, description, email, booking link, location, nav   |
| `src/content/home.ts`  | Hero, technologies, services, work, process steps, founder, contact |
| `src/content/types.ts` | The shape of all of the above                                       |

Wrap words in `*asterisks*` in the hero headline or lede to highlight them.

## Design

The brand comes from the name: cobalt is element 27, symbol Co, so the logo is
a periodic-table tile and every project gets its own tile. Colours, fonts and
the type scale live in `src/app/styles/tokens.css`. Each part of the page has
its own stylesheet in `src/app/styles/`, imported in order by
`src/app/globals.css`.

The hero's 3D shape is a three.js mesh with a noise shader
(`src/lib/cobalt-shaders.ts`), set up in `src/lib/cobalt-scene.ts`. It loads
after the page, pauses when off screen, renders a single still frame under
`prefers-reduced-motion`, and leaves the hero's glow in place when a device
has no WebGL.

The share image is `public/og.png` (1200 × 630). The favicon and the home-screen
icon are `src/app/icon.svg` and `src/app/apple-icon.png`.

## Deploying

`npm run build` writes a static site to `./out`, which any static host can
serve. Pull requests and pushes to `main` run `npm run check` and a build in
`.github/workflows/ci.yml`.
