# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The public website of the Every1Connects CRM, served at `https://e1dconnect.cloud`. The CRM itself runs at `https://app.e1dconnect.cloud` and lives in another repository; this repo only links to it.

Google and Microsoft review this site before they approve the CRM's OAuth access to Gmail and Outlook mailboxes. That review is the reason the site exists, and it sets the rules in "Invariants" below.

## Commands

```bash
npm run dev              # http://localhost:3000
npm run lint             # eslint over the whole project
npx eslint src/app/page.tsx   # lint one file
npx tsc --noEmit         # type check (there is no script for it)
node scripts/render-crm-screens.mjs   # regenerate the CRM pictures from .claude/crm-screens
npm run build
npm run start            # serves the build
```

Node 20.9 or later. There is no test suite.

Deployment: Coolify builds the `Dockerfile` (Build Pack: Dockerfile, port 3000) from the GitHub repo. `next.config.ts` sets `output: "standalone"`, so the image runs only `.next/standalone/server.js` plus `public` and `.next/static`, which the Dockerfile copies in; Coolify's proxy handles HTTPS. `.dockerignore` keeps the agent tooling, mockups and CRM screens out of the image. To try the same server locally after `npm run build`: copy `public` and `.next/static` into `.next/standalone` (as the Dockerfile does) and run `PORT=3100 node .next/standalone/server.js`; it starts a `next-server` child process, so stop that one too.

The parent `../CLAUDE.md` applies here too, with two exceptions for this project only: `npm run dev` may be run to see pages in the browser (allowed by Gabriel on 2026-10-13), and `npm run build` may be run to check the production build and measure the pages (allowed by Gabriel on 2026-10-14). Installing dependencies still needs his approval, and code changes are proposed before they are applied. Port 3000 on this machine is taken by another app ("Local"). Next refuses to start a second dev server for the same project, so if one is already running (Gabriel often has one on 3001), use it.

## Next.js 16 is not the Next.js you know

`AGENTS.md` says it and it holds: APIs, conventions and file structure differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before changing how pages are built or rendered.

- `next.config.ts` turns on `cacheComponents` and `partialPrefetching`. A page must not read the current time or any per-request value without handling it as the guides describe. Start with `01-app/01-getting-started/08-caching.md`, `01-app/02-guides/keeping-pages-static.md` and `01-app/02-guides/adopting-partial-prefetching.md`.
- The existing code already avoids those values on purpose: the footer prints no year, `sitemap.ts` dates entries with `site.legal.effective` and not the build day, and `writtenDate()` in `legal-page.tsx` formats from the date's parts in UTC.
- The block in `AGENTS.md` is written and restored by `next dev`. Do not delete it; it comes back as an uncommitted change.
- Tailwind CSS 4 is wired through the `@tailwindcss/turbopack` loader in `next.config.ts`. There is no PostCSS config and no `tailwind.config.*`; theme tokens (`ink`, `canvas`, `primary`, `primary-hover`, the Inter font) are declared in `src/app/globals.css` under `@theme inline`.

## Architecture

Three routes (`/`, `/privacy`, `/terms`) plus `sitemap.ts` and `robots.ts`, all under `src/app`. `not-found.tsx` is the page for any other address (404, `noindex`): the CRM's search finding nothing, then links to the home page and to the CRM, whose addresses people may type here by mistake. Imports use the `@/*` alias for `src/*`.

- `src/config/site.ts` is the single source for the name, tagline, description, both URLs and the company details the legal pages quote (`site.legal`). Pages, metadata, header, footer, sitemap and robots all read from it. Do not hard-code any of these values in a page.
- `src/app/layout.tsx` wraps every page in `SiteHeader` and `SiteFooter` and builds the default metadata from `site`. It also loads Umami, the visit counter Gabriel runs on his Coolify server at `stats.e1dconnect.cloud` (`site.analytics`): no cookies, counting only on the site's own domain and never when the browser sends Do Not Track. What it records must match the "About visitors to this website" paragraph of the privacy policy. Each page exports its own `metadata` with a `title` (fed into the `%s | Every1Connects` template) and a canonical path.
- `src/components/legal-page.tsx` is the frame for both policies: title, the "Effective" date, then the text. The text inside is plain `h2` / `h3` / `p` / `ul` with no classes; `.legal-text` in `globals.css` styles them.
- The header's nav links point at section ids on the home page (`#product`, `#email`, `#security`). Renaming a section id in `src/app/page.tsx` means changing `sections` in `site-header.tsx` too.
- A new route needs an entry in `src/app/sitemap.ts`; the list there is written by hand.
- Pictures of the CRM are its real canvas screens, with invented data only. `scripts/render-crm-screens.mjs` renders the screens listed in its `SHOTS` to static markup and scoped CSS in `src/components/crm-shots/screens.generated.*` (never edit those by hand); it swaps real names, domains and places for invented ones (`SAMPLE_DATA_SWAPS`) and refuses a picture where one survives. A shot can also be one card or one dialog of a screen (`card` / `dialog`: the smallest `.card` or `role="dialog"` holding a given text), so its crop starts at 0,0. `CrmShot` shows a window of a screen, given as `crop` (and `phoneCrop` below `md`) in the screen's own pixels, scaled to its frame, `inert` and `aria-hidden`. To use another screen, add it to `SHOTS`, rerun the script, and measure the crop on element boundaries.
- `PillLink` is the pill button of `DESIGN.md` (primary, on-navy, secondary; default or compact). `HomeHero` is the opening of the home page, `ProductJourney` its product section (six steps, each with its picture) `EmailSection` its email section (three cards, three pictures of the CRM's email screens and the required Google block), `SecuritySection` its security section and `ClosingBand` the navy band with the CRM's sign-in card, all server-rendered. `SecuritySection` hands its four cards to `SecuritySwiper`, the one client component that holds content: the server renders the cards once, and after hydration it adds copies before and after (hidden from assistive technology) to make the row endless, plus the pause, previous and next buttons and the segments, and plays a card every 5s. No Google or Microsoft logo or product icon appears on the site: both companies restrict them and both review it; their product names appear in text only.
- Motion (`DESIGN.md` › Focus and Motion): the script in the root layout's `<head>` sets `data-motion` on `<html>` before the first paint, and `HomeMotion` (a client component that renders nothing) adds the state classes: the hero's entrance and exit (`home-hero.css`), the product section's two layouts, story from `lg` and reveal below (`product-journey.css`), the email section's cards and pictures (`email-section.css`), the row of security cards (`security-section.css`) and the closing band's sign-in card (`closing-band.css`); the hidden states of the last three wait for `data-motion-ready`. Without JavaScript none of it runs and nothing is hidden; if the page script never runs, a CSS fallback shows the hero after 3s.
- Logo files live in `public/brand/` and are served at `/brand/...`: the full logo and the symbol alone, each for a light and a dark surface (`DESIGN.md` says which goes where). The favicon and app icons are not there: they are the metadata files `icon.svg` (a copy of `logo-light.svg`), `favicon.ico` and `apple-icon.png` in `src/app`, all made from the light symbol (`DESIGN.md` › Logo says how).

## Design

`DESIGN.md`, at the project root, is the design system: colors, the Inter type scale, radius, spacing, components and the matching Tailwind 4 tokens. Read it before adding or restyling any UI, and take values from its tables instead of picking new ones.

`PRODUCT.md`, beside it, is the product record: who reads the site, what the CRM does, what the site may and may not claim, and what is still undecided. The Impeccable skill (`.claude/skills/impeccable`) reads both files.

`.claude/crm-screens/` holds 160 screens of the CRM, copied from its design canvas, to build the product pictures of the landing page from. Start with its `README.md`: it indexes the screens by area, says how one is turned into a picture for the site, and lists what to check before a screen goes public. The folder is 3 MB, so open only the screens a task needs.

## Invariants

These come from the provider reviews. Breaking one can fail the CRM's verification.

- The name reads `Every1Connects` everywhere, exactly as on the Google and Microsoft consent screens. Render it from `site.name`.
- The home page is public and says what the app does, including how it uses a connected mailbox. The "How we use the data of your Google account" block on the home page, with its Limited Use sentence and the link to `GOOGLE_USER_DATA_POLICY_URL`, is required text, not marketing copy.
- The privacy policy is on this domain and linked from every page. That link lives in `SiteFooter`.
- The text of every page arrives in the server-rendered HTML, so a reviewer or crawler reads all of it without running JavaScript. Client components and client-side script are allowed (Gabriel lifted the earlier no-script rule on 2026-10-13), but they may only add interaction; no content may depend on them to appear.
- Section 3 of the privacy policy ("Connected mailboxes") describes what the CRM really does with Gmail and Outlook data. A change to the CRM's email integration that touches what is read, stored or shown must change that section in the same release.
- `site.legal.effective` is the date both policies show and the `lastModified` of every sitemap entry. It is the day the current policy text took effect.
- `site.legal` holds the operator's details as Gabriel gave them on 2026-10-14: Every1drives Inc. (the legal name, spelled so), the company that develops Every1Connects. They are never invented or reworded; a change comes from Gabriel. The footer also renders `contactEmail` as a `mailto:` link.
