# Every1Connects — public site

The public website of the Every1Connects CRM, served at `https://e1dconnect.cloud`. The CRM itself runs at `https://app.e1dconnect.cloud` and lives in another repository.

Google and Microsoft review this site before they approve the CRM's access to mailboxes, so three things must stay true:

- The home page is open to everyone and says what the app does.
- The privacy policy is on this same domain and is linked from the home page.
- The name reads `Every1Connects` everywhere, exactly as on the providers' consent screens.

## Pages

| Route | File | What it is |
|---|---|---|
| `/` | `src/app/page.tsx` | Home: what the CRM does, how it uses a connected mailbox, how data is protected |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy |
| `/terms` | `src/app/terms/page.tsx` | Terms of service |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` | For search engines |

The name, the addresses and the company details the legal pages quote are in `src/config/site.ts`. The company details (Every1drives Inc., which develops Every1Connects) were given by Gabriel on 2026-10-14.

The privacy policy describes what the CRM really does with Gmail and Outlook data. A change to the CRM's email integration that touches what is read, stored or shown must change section 3 of the policy in the same release.

## Working on it

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Node 20.9 or later.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
npm run start    # serves the build
```

This version of Next.js differs from older ones: read `AGENTS.md` and the guides in `node_modules/next/dist/docs/` before changing how pages are built. `cacheComponents` is on, so a page must not read the current time or other per-request values without handling them as those guides describe.

Every page is server-rendered, so a reviewer or a crawler reads the full text without running JavaScript. Client-side script may add interaction, but the text of the home page and the policies must always be in the server-rendered HTML.
