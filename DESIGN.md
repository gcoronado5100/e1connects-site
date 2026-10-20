---
name: Every1Connects
description: Public site of the Every1Connects CRM for car dealerships. One blue for every action, near-black Inter on a cool gray canvas, white cards, pale tints and deep navy bands.
colors:
  primary: "#1463ff"
  primary-hover: "#1257df"
  primary-pressed: "#0d4ac2"
  primary-bright: "#4d8bff"
  link: "#1257df"
  ink: "#0f0d16"
  ink-soft: "#535768"
  ink-muted: "#676b7b"
  canvas: "#f5f6f8"
  surface: "#ffffff"
  line: "#d0d4e4"
  line-strong: "#808080"
  navy: "#061029"
  on-navy-soft: "#c5cbe9"
  tint-blue: "#e7ecff"
  tint-sky: "#d1faff"
  tint-violet: "#eddff7"
  success: "#4ec375"
  warning: "#ffbc00"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  heading-xl:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  heading-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  heading-md:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  heading-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  body-long:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  body-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0"
  body-sm-strong:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0"
  caption-strong:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0"
  eyebrow:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.06em"
  button:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
  button-sm:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
rounded:
  md: "6px"
  xl: "12px"
  3xl: "24px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"
  gutter: "24px"
  card: "24px"
  card-lg: "32px"
  heading-to-lead: "16px"
  intro-to-content: "48px"
  text-columns: "40px"
  section-sm: "64px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-pressed}"
  button-primary-compact:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button-sm}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.tint-blue}"
  button-on-navy:
    backgroundColor: "transparent"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "48px"
  button-on-navy-hover:
    backgroundColor: "rgb(255 255 255 / 0.1)"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.3xl}"
    padding: "24px"
  card-tinted:
    backgroundColor: "{colors.tint-blue}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.3xl}"
    padding: "24px"
  card-elevated:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.3xl}"
    padding: "24px"
  callout:
    backgroundColor: "{colors.tint-blue}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.3xl}"
    padding: "32px"
  badge:
    backgroundColor: "{colors.tint-blue}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
  dark-band:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.surface}"
  header:
    backgroundColor: "rgb(255 255 255 / 0.85)"
    height: "64px"
  nav-link:
    textColor: "{colors.ink-soft}"
    typography: "{typography.body-sm-strong}"
  nav-link-hover:
    textColor: "{colors.ink}"
  link:
    textColor: "{colors.link}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    height: "48px"
---

# Design System: Every1Connects

The frontmatter above holds the values; the sections below say how to use them. The appendix at the end gives the same values as Tailwind CSS 4 tokens for `src/app/globals.css`. Product facts and what the site may claim live in `PRODUCT.md`.

## Overview

**Creative North Star: "The Clean Showroom"**

A dealership showroom at opening time: a bright, uncluttered floor, even light, and the product placed where it can be seen whole. The site works the same way. A cool gray canvas and white cards keep the floor calm, near-black Inter does the talking, and one saturated blue marks every action. Deep navy bands frame the two moments that carry the page, the hero and the closing call to sign in, and the CRM's real screens stand on the floor like the cars: the thing visitors came to see.

Calm and exact in type and color, soft in shape. The system mixes the two references Gabriel named. From Close: one saturated blue as the only action color, Inter with tight tracking at large sizes, near-black ink and deep navy bands, few shadows, and green and gold kept for status. From monday.com: the cool gray canvas with white cards on it, pill buttons and 24px cards, pale tinted surfaces, the wide soft card shadow, and an 8px rhythm with generous section spacing.

Left out on purpose: Close's square corners and blue-on-blue surfaces, monday's Poppins and its light 300 headlines, violet as an action color, the rainbow prism, gradient text, and the bright tints (mint, apricot, pink). There is one theme; the navy bands are part of it, not a dark mode.

**Key Characteristics:**

- One blue for every action; nothing else competes with it.
- Inter only, in three weights.
- Pill buttons, 24px cards, nothing square.
- A surface change before a shadow.
- The CRM's own screens as the only imagery.
- The text of every page readable without JavaScript.

## Colors

Near-black on cool gray and white, one saturated blue for action, three pale tints for surfaces, and deep navy for the bands.

### Primary

- **Action Blue** (`#1463ff`, `primary`, from Close): filled buttons, the focus ring, brand panels.
- **Action Blue Hover** (`#1257df`, `primary-hover`, from Close): hover fill of a primary button.
- **Action Blue Pressed** (`#0d4ac2`, `primary-pressed`, from Close): pressed fill of a primary button.
- **Bright Blue** (`#4d8bff`, `primary-bright`, from Close): blue text and the focus ring on navy.
- **Link Blue** (`#1257df`, `link`, from Close): text links on any light surface.

### Neutral

- **Ink** (`#0f0d16`, `ink`, from Close): headings, strong text, button labels on light surfaces.
- **Soft Ink** (`#535768`, `ink-soft`, from monday.com): paragraphs, navigation links, footer text.
- **Muted Ink** (`#676b7b`, `ink-muted`, derived): captions and dates, on white and canvas only. It is the one value from neither reference: both use a mid gray near `#808080` for small text, which reaches only 3.6:1 on the canvas, and this is that gray darkened until it passes.
- **Canvas** (`#f5f6f8`, `canvas`, from monday.com): the page background.
- **Surface** (`#ffffff`, `surface`): cards, header, footer, white bands.
- **Line** (`#d0d4e4`, `line`, from monday.com): card borders and dividers.
- **Strong Line** (`#808080`, `line-strong`, from monday.com): borders of form controls.
- **Navy** (`#061029`, `navy`, from Close): the dark bands, hero and closing band.
- **Soft Ink on Navy** (`#c5cbe9`, `on-navy-soft`, from Close): paragraph text on navy; headings there are white.

### Tints

Pale surfaces from monday.com, used only as backgrounds.

- **Blue Tint** (`#e7ecff`, `tint-blue`): callouts, tinted cards, badges, the secondary-button hover.
- **Sky Tint** (`#d1faff`, `tint-sky`): tinted cards.
- **Violet Tint** (`#eddff7`, `tint-violet`): tinted cards.

### Status

- **Success** (`#4ec375`, `success`, from Close): status dots, icons and fills.
- **Warning** (`#ffbc00`, `warning`, from Close): status dots, icons and fills.

Not decided yet: an error color. Neither reference has one and the site has no form. Choose it with the first form, and check it at 4.5:1 on white and canvas.

### Named Rules

**The One Blue Rule.** Blue is the only action color. Another chromatic color never marks something clickable.

**The Readable Blue Rule.** Ratios are WCAG 2 contrast; normal text needs 4.5:1.

- White on `primary` is 4.93:1, so button labels pass at any size.
- `ink-soft` passes on every light surface, tints included (lowest: 5.63:1 on `tint-violet`).
- `ink-muted` is 5.30:1 on white and 4.90:1 on canvas, and falls to 4.16:1 on `tint-violet`. On a tint use `ink-soft`.
- `link` passes on every light surface (lowest: 4.78:1 on `tint-violet`). `primary` does not (4.19:1 on `tint-blue`), which is why link text has its own token.
- On navy, `primary` as text is 3.82:1. Use `primary-bright` (5.79:1), `on-navy-soft` (11.75:1) or white.
- `success` and `warning` never color text on a light surface (2.24:1 and 1.69:1 on white). `ink` on top of either is fine.
- `line` is decoration (1.48:1 on white). A form control needs `line-strong` (3.95:1 on white) so its edge can be seen.

## Typography

**Display Font:** Inter (with `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Inter (with the same fallbacks)

**Character:** One family from the hero to the fine print. Tight, confident headlines at 600 over plain, untracked text at 400.

Inter is loaded with `next/font/google` in `src/app/layout.tsx`, which downloads the Google Fonts files at build time and serves them from this site, so a visitor's browser never contacts Google for the font. Do not add a `<link>` to `fonts.googleapis.com`. Inter is a variable font, so no weight list is needed. Three weights only: 400 for text, 500 for navigation and labels, 600 for headings, buttons and `strong`.

### Hierarchy

- **Display** (600, 64px, 1.1, -0.025em): the hero headline from `lg`.
- **Heading XL** (600, 48px, 1.15, -0.025em): page titles; section headings from `lg`; the hero headline at `md`.
- **Heading LG** (600, 36px, 1.2, -0.025em): section headings; the hero headline on phones.
- **Heading MD** (600, 30px, 1.2, -0.025em): section headings on phones, the closing band's among them.
- **Heading SM** (600, 24px, 1.3, -0.015em): headings inside long-form text; the titles of the security cards from `md`, which are 760px wide.
- **Title** (600, 20px, 1.4, -0.01em): card titles and sub-headings.
- **Body LG** (400, 18px, 1.75): the lead paragraph under a heading, at most 672px wide.
- **Body** (400, 16px, 1.5): default text. Long-form text (`body-long`) uses line height 1.75, at most 768px wide.
- **Body SM** (400, 14px, 1.5): footer and dates. Navigation uses it at 500 (`body-sm-strong`).
- **Caption** (400, 12px, 1.45): fine print. Badges use it at 500 (`caption-strong`).
- **Eyebrow** (600, 14px, 1.5, +0.06em, uppercase): one short line above a headline.
- **Button label** (600, 16px, line height 1; 14px in the compact size).

Headings step down one size per breakpoint:

| Element | Phones | From `md` (768px) | From `lg` (1024px) |
|---|---|---|---|
| Hero headline | `heading-lg` | `heading-xl` | `display` |
| Page title | `heading-lg` | `heading-xl` | `heading-xl` |
| Section heading | `heading-md` | `heading-lg` | `heading-xl` |

### Named Rules

**The Tight Top Rule.** Tracking tightens only from 20px up. Text of 18px and below has none, apart from the eyebrow.

**The Two Weights Rule.** Headings never go below 600 and text never goes above 400. Emphasis inside text is `strong` at 600 in `ink`.

**The Balanced Headline Rule.** Headlines are set with `text-wrap: balance` so a short last line does not hang.

## Layout

The step is 4px, and most gaps are multiples of 8: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96. These are Tailwind's default spacing steps (`1` to `24`), so no custom spacing token is needed.

| Where | Value |
|---|---|
| Page gutter | 24px |
| Card padding | 24px |
| Gap between cards | 24px |
| Gap between text columns | 40px |
| Heading to its lead paragraph | 16px |
| Section intro to its content | 48px |
| Section padding, top and bottom | 64px on phones, 96px from `md` |

- Content is centered in a 1200px column (`max-w-page`). Bands run the full width; only their content is held to the column.
- Long-form text sits in a 768px column (`max-w-3xl`). Text never runs the full width of the page.
- Breakpoints are Tailwind's defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280.
- Card grids go from one column on phones to two at `sm` and three at `lg`.
- Bands alternate canvas and white. Navy is for the hero and the closing band, and two navy bands never touch.
- French is planned after English (see `PRODUCT.md`), so a layout must hold text that runs longer without breaking.

## Elevation & Depth

Depth comes from the surface first: white on canvas, a tint, or navy. Shadows are the exception, and there are only two.

### Shadow Vocabulary

- **Card** (`box-shadow: 0 2px 48px 0 rgb(205 208 223 / 0.4)`, `shadow-card`): a card that should lift off the canvas, such as a product screenshot.
- **Raised** (`box-shadow: 0 2px 6px 0 rgb(6 16 41 / 0.08), 0 14px 28px 0 rgb(6 16 41 / 0.16)`, `shadow-raised`): anything floating over content, such as a menu.

### Named Rules

**The Border-or-Shadow Rule.** A card has a border or a shadow, never both. The sticky header has neither: it uses a bottom line and a blurred, slightly see-through white.

## Shapes

Soft, round and few. Four radii, and nothing between them:

- **6px** (`rounded-md`): badges and tags.
- **12px** (`rounded-xl`): form controls, images and screenshots, icon tiles.
- **24px** (`rounded-3xl`): cards, callouts, panels.
- **Full** (`rounded-full`): buttons and avatars.

Nothing is square.

## Components

### Buttons

Every button is a pill with a one-line label in Inter 600.

- **Shape:** fully round (`rounded-full`).
- **Primary:** `primary` fill and a white label, for the one main action of a view. Hover `primary-hover`; `primary-pressed` while pressed.
- **Secondary:** no fill, a 1px `ink-soft` border and an `ink` label, for a second action on a light surface. Hover fills it with `tint-blue`.
- **On navy:** no fill, a 1px border of white at 20% and a white label, for a second action on a navy band. Hover fills it with white at 10%.
- **Sizes:** default 48px high with 24px side padding and a 16px label; compact, for the header, 44px high with 20px side padding and a 14px label.
- **Icon button:** the secondary style as a 48px circle around a 20px icon, for controls such as the security cards' pause, previous and next. Pressed, it settles to 96%.
- **Disabled:** 45% opacity and no hover change.

### Cards / Containers

All four have a 24px radius and 24px padding; a callout grows to 32px padding from `md`. The title is `title` in `ink`, the text is `body` in `ink-soft`.

- **Card:** `surface` with a 1px `line` border. The default container on canvas.
- **Tinted card:** one of the three tints, no edge. Feature grids. A grid uses one tint throughout or cycles the three in order.
- **Elevated card:** `surface` with `shadow-card`, no border. A card that must lift off the canvas. (Product screenshots use the framed treatment under Imagery.)
- **Callout:** `tint-blue`, no edge. A statement that must stand out, such as how Google account data is used.

### Dark Band

`navy` across the full width. Headings are white, paragraphs are `on-navy-soft`, the eyebrow is `primary-bright`. The primary button keeps its `primary` fill; a second action uses the on-navy button.

The hero and the closing band each carry one glow: `radial-gradient(60% 70% at 50% 0%, rgb(20 99 255 / 0.3), transparent 70%)`. In the hero it sits behind the text; in the closing band it is centered over the sign-in card (`at 79% 0%` from `md`, centered on phones), so the light comes from where the card meets the band. It is the only gradient in the system.

The closing band answers the hero: there the record rises out of the band into the page; here the CRM's sign-in card, in the white frame, rises out of the page into the band, over columns 9 to 12 and crossing the band's top edge by 140px. On phones the card comes first, centered and at most 320px wide, crossing by 112px, and the copy follows. The section above leaves 200px under its content for it (160px on phones).

### Logo

The files in `public/brand/`, served at `/brand/...`, as given by Gabriel (the light full logo and the light symbol redrawn on 2026-10-19). Each logo is a PNG and, where Gabriel sent it, an SVG drawn the same; the site uses the SVG where there is one.

| File | Size | Use |
|---|---|---|
| `full-logo-light.svg` / `.png` | 2204 × 387 | The logo on a light surface: header and footer (the SVG) |
| `full-logo-dark.svg` / `.png` | 2204 × 387 | The logo on a dark surface. Not used on this site yet |
| `logo-light.svg` / `.png` | 387 × 387 | The symbol alone, on a light surface, for square spots such as an app icon; the site's icons |
| `logo-dark.svg` / `.png` | 387 × 387 | The symbol alone, on a dark surface |

"Light" and "dark" name the surface the file is for, not the color of the drawing. In the light files the "1" is light gray (`#eeeeee`) with a dark blue outline (`#064c81`) and "Connects" is dark gray (`#2c2c2c`); in the dark files the "1" and "Connects" are white, "Connects" with a blue outline.

- The full logo is 32px high in the header and footer (182px wide), and 28px high below `md`. It is never shown under 24px high.
- Its `alt` is `site.name`, so the name stays in the HTML as text.
- Keep at least half its height clear on every side.
- The symbol alone never replaces the full logo where the name has to be read (header, footer).
- Do not put the logo on a navy band. In the dark files "Every" keeps its blue (`#1a5a8a`), which is only 2.6:1 on `navy`, so the first half of the name fades into the band. Header and footer sit on `surface`, where the light file is used.
- The logo's two blues (`#1a5a8a` and about `#2878b8`) belong to the logo. They are not tokens: nothing else on the site uses them, and the logo is never recolored to `primary`.

The site's icons, in `src/app/`, all use the light symbol and only it (Gabriel, 2026-10-19), whatever the browser's theme:

- `icon.svg`: a copy of `logo-light.svg`. Browsers that read SVG favicons use it.
- `favicon.ico`: `logo-light.png` at 16, 32 and 48px, for browsers that do not.
- `apple-icon.png`: `logo-light.png` at 80% of a 180px white square, for a phone's home screen, which fills transparency with black. The phone rounds the corners itself.

The outlined "1" reads on a dark tab and at 32px; on a light tab at 16px mostly the blue loop shows.

### Navigation

- **Header:** sticky, 64px high, above the content (`z-40`). `surface` at 85% with a backdrop blur and a 1px `line` underneath. The logo on the left, section links in `body-sm` 500 `ink-soft` turning `ink` on hover, and a compact primary button on the right.
- **Phones:** below `md` the section links are hidden and the header keeps the logo and the button; the footer carries the policy links on every page.
- **Footer:** `surface` with a 1px `line` on top. The logo, then the one-sentence description under it. Text and links in `body-sm` `ink-soft`; links turn `ink` on hover. The copyright line is `caption` in `ink-muted`.

### Long-form Text

Used by the privacy policy and the terms, inside the 768px column.

- Page title in `heading-xl` (`heading-lg` on phones), then the effective date in `body-sm` `ink-muted`.
- `h2` in `heading-sm` with 48px above it; `h3` in `title` with 32px above it.
- Paragraphs and lists in `body-long` (16px, line height 1.75), `ink-soft`, 16px apart. List items 8px apart, with disc markers.
- `strong` at 600 in `ink`.

### Links

- A link inside a paragraph is `link`, weight 500, and always underlined (1px, 4px offset). `link` and `ink-soft` are almost equally dark (1.18:1 apart), so color alone would not mark it as a link.
- A link that stands alone, in the header or footer, has no underline and changes color on hover.

### Chips

- **Badge:** 6px radius, `tint-blue` fill, `caption` at 500 in `ink`, 2px by 8px padding.
- **Status badge:** the same, with an 8px dot in `success` or `warning` before the label.

### Inputs / Fields

The site has none yet. When one is needed: `surface` fill, a 1px `line-strong` border, 12px radius, 48px high, 16px text in `ink`, placeholder in `ink-muted`, and a label above it in `body-sm` 500 `ink`.

### Focus and Motion

- **Focus:** every interactive element shows a 2px `primary` outline with a 2px offset when reached by keyboard (`:focus-visible`). On navy the outline is `primary-bright`.
- **Motion:** color, background and border changes take 150ms; a pressed button settles to 98% for 100ms (an icon button to 96%). Every element that moves enters and exits, and its exit is seen: it enters as it comes into view (about 1s, easing out with `cubic-bezier(0.16, 1, 0.3, 1)`) and starts leaving while still on screen (0.6s), upward once a third of it is under the header (a tall one when its bottom edge reaches the top third of the screen). The hero's notices enter in the order of their times and its record after them; the product section's window changes to the screen of the step being read, and on narrower screens each step's panel enters and exits on its own; in the email section each picture's panel opens from a smaller rounded mask, the window rises in (the New email window grows from 95%, as the CRM opens its dialogs) and then what is inside appears in order. The security cards are dealt in from the right one after another, each icon rising last, and lift away on exit; the closing band's sign-in card rises and grows from 95%, then its parts appear in reading order ("Welcome back", email, password, "Remember this device", Login), and on exit the parts go first, last to first, and the card after them. On the 404 page the CRM's search opens as it does in the CRM, a little from above and growing from 96%, and then "No results found." appears. Text never moves, except inside the security cards, which carry theirs. With reduced motion, things fade without moving. Without JavaScript, nothing is hidden.
- **Autoplay:** the security cards play by themselves, one every 5s, and never end. They stop while the pointer is on them, while anything in them has keyboard focus, while they are off screen and when the pause button is pressed, and under reduced motion they start paused (WCAG 2.2.2).

### Imagery

Screenshots of the product, in a white frame: 24px radius, 12px padding, a 1px `line` border and a 12px radius on the image. A shadow would not read where the frame crosses a navy band, so the frame takes the border. No stock photography and no decorative illustration.

The screens to build them from are in `.claude/crm-screens/` (see its `README.md`). Inside the picture the CRM keeps its own blue, font and radii; this system styles only the frame around it.

In the product and email sections the frame sits on a tinted panel (24px radius, the three tints in order) that ends at the content column. On a phone the panel itself is the frame: 12px padding and the image's 12px radius, with no white frame inside, so the picture keeps its width. The security cards do the same on phones: their samples are cards of the CRM and stand on the tint without a frame.

### Carousel

The security section's row of tinted cards, the tints in order (blue, sky, violet, sky). A card is 760px wide (600px below `lg`, the screen less 104px on phones) with 24px padding (16px on phones), 24px apart (16px on phones); the row scrolls sideways, snaps to each card and ends at the content column, with no scrollbar. On top of each card a 420px stage (340px below `lg`, 320px on phones) holds the sample of the CRM in the white frame of Imagery, or, where the CRM has no screen for the point, its icon in a 112px white circle (88px on phones); the title and text follow. On phones a sample that would be unreadable gives way to the icon.

Once the page has run, a copy of the cards sits before and after the real ones, hidden from assistive technology, so the row never ends. Beside the heading: pause, previous and next as icon buttons (only pause on phones). Under the row, one segment per card: a 4px `line` track that fills with `primary` while its card shows, the ones before it full; each is a button to its card. Without JavaScript the row simply scrolls and the controls are not there.

### Icons

lucide, the CRM's own set: outline, round caps and joins, colored `ink` or `primary`. Stroke 1.5 for large icons (48px in the security cards, 38px on phones) and 2 for controls (20px); the pause and play glyphs are filled.

## Do's and Don'ts

These hold on every page. The ones about script and the name come from the rules in `CLAUDE.md`.

### Do:

- **Do** give a view one primary button; other actions are secondary buttons or links.
- **Do** put `ink` and `ink-soft` text on tints, and `link` for links there.
- **Do** underline links inside paragraphs.
- **Do** make anything clickable at least 44px high.
- **Do** reach for a surface change before a shadow.
- **Do** keep every page's text in the server-rendered HTML. Client-side script may add interaction, never hold the content.
- **Do** keep the link to the privacy policy in the footer of every page.
- **Do** keep the name reading `Every1Connects` everywhere. Where the logo image stands in for the written name, its `alt` is `site.name`.

### Don't:

- **Don't** use `primary` as a text color on a tint or on navy.
- **Don't** color text with a tint, `success` or `warning`.
- **Don't** add a second typeface, or a weight other than 400, 500 and 600.
- **Don't** add gradients beyond the glow of the hero and the closing band, and never on text.
- **Don't** introduce another action color. Blue is the only one.
- **Don't** pick a radius, a gap or a font size that is not in this file.
- **Don't** put content behind script. Text that appears only after JavaScript runs is invisible to a reviewer or a crawler.

## Appendix: Tailwind CSS 4 tokens

The same values in the form `src/app/globals.css` takes. Radius and spacing use Tailwind's defaults, so they need no token. Each `--text-*` token carries its line height, tracking and weight, so `text-heading-lg` alone sets all four.

```css
@theme {
  /* Action */
  --color-primary: #1463ff;
  --color-primary-hover: #1257df;
  --color-primary-pressed: #0d4ac2;
  --color-primary-bright: #4d8bff;
  --color-link: #1257df;

  /* Text */
  --color-ink: #0f0d16;
  --color-ink-soft: #535768;
  --color-ink-muted: #676b7b;

  /* Surfaces and lines */
  --color-canvas: #f5f6f8;
  --color-surface: #ffffff;
  --color-line: #d0d4e4;
  --color-line-strong: #808080;
  --color-navy: #061029;
  --color-on-navy-soft: #c5cbe9;

  /* Tints */
  --color-tint-blue: #e7ecff;
  --color-tint-sky: #d1faff;
  --color-tint-violet: #eddff7;

  /* Status */
  --color-success: #4ec375;
  --color-warning: #ffbc00;

  /* Layout */
  --container-page: 75rem;

  /* Shadows */
  --shadow-card: 0 2px 48px 0 rgb(205 208 223 / 0.4);
  --shadow-raised: 0 2px 6px 0 rgb(6 16 41 / 0.08), 0 14px 28px 0 rgb(6 16 41 / 0.16);

  /* Type */
  --text-display: 4rem;
  --text-display--line-height: 1.1;
  --text-display--letter-spacing: -0.025em;
  --text-display--font-weight: 600;

  --text-heading-xl: 3rem;
  --text-heading-xl--line-height: 1.15;
  --text-heading-xl--letter-spacing: -0.025em;
  --text-heading-xl--font-weight: 600;

  --text-heading-lg: 2.25rem;
  --text-heading-lg--line-height: 1.2;
  --text-heading-lg--letter-spacing: -0.025em;
  --text-heading-lg--font-weight: 600;

  --text-heading-md: 1.875rem;
  --text-heading-md--line-height: 1.2;
  --text-heading-md--letter-spacing: -0.025em;
  --text-heading-md--font-weight: 600;

  --text-heading-sm: 1.5rem;
  --text-heading-sm--line-height: 1.3;
  --text-heading-sm--letter-spacing: -0.015em;
  --text-heading-sm--font-weight: 600;

  --text-title: 1.25rem;
  --text-title--line-height: 1.4;
  --text-title--letter-spacing: -0.01em;
  --text-title--font-weight: 600;

  --text-body-lg: 1.125rem;
  --text-body-lg--line-height: 1.75;

  --text-body: 1rem;
  --text-body--line-height: 1.5;

  --text-body-sm: 0.875rem;
  --text-body-sm--line-height: 1.5;

  --text-caption: 0.75rem;
  --text-caption--line-height: 1.45;
}

/* next/font sets --font-inter on <html>; this makes it the sans family. */
@theme inline {
  --font-sans: var(--font-inter);
}
```
