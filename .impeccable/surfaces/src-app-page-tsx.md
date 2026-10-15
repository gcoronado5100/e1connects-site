---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Home page: hero

Scope: the first viewport of `/` and its handoff into the product section, at desktop and phone width. Visitor mode: Persuade.

Audience and job: Google and Microsoft reviewers learning what the app does; current users looking for "Log in"; dealerships evaluating the CRM, who must feel it understands their work.

Action: "Log in" to `site.appUrl` is the only action. "See what it does" scrolls to `#product`.

Proof and content:
- Headline (approved by Gabriel, 2026-10-13): "Every lead, from the form on your website to the sale."
- Lead paragraph: the current home copy, word for word.
- The CRM pictures are rendered from the real canvas markup by `scripts/render-crm-screens.mjs`, with the sample dealership renamed "Dealership". From `md` up: Marcus Ellery's contact record (`Contact-Detail-Activity`), full width and cut at the row boundary above "Address", so no address or date of birth shows; the top of the details panel stays visible. Below `md`: the CRM's own 390px phone chat screen (`Mobile-Contact-Chat`), from the contact row to above the message box. Both approved by Gabriel with the mockup on 2026-10-13.
- The four notices above the headline are illustration of the dealer's day outside the CRM, not CRM screens, and must not imitate CRM UI.

Constraints: all text in the server-rendered HTML; the CRM picture is `inert` and `aria-hidden`, and nearby text says what it shows; nothing invented; layout holds longer French text later.

Memorable moment: the same lead's events, scattered across four channels above, gathered in one real record below.

Settled at the mockup: the phone keeps the Mail and Missed call notices; the record's frame is a white 24px card with a 1px line border, because a shadow does not read on navy. Motion comes later (Gabriel, 2026-10-13); DESIGN.md's no-motion rule stands until then.

Hero motion (approved by Gabriel on 2026-10-14 with the mockup `.impeccable/mocks/home-product.html`; built in `home-hero.css` and `HomeMotion`): the notices arrive in the order of their times, Mail 9:36, Messages 9:42, Missed call 9:51, then the note (each drops 24px and grows from 94% while fading in, 1s for opacity and 1.2s for movement, 0.35s apart from 0.3s; on a phone, Mail then Missed call). Then the record rises 64px into place, after the last notice. The scattered day arrives, then the one place it is gathered. Headline, lead and buttons never move, so the first paint carries all the text.

Entrance and exit for every moving element (Gabriel, 2026-10-14: "muy rápidos", and every animated element needs both): an element enters when enough of it is in view below the header (90% of a small one; half of a tall one, or a third of the screen) and exits when that falls under 60% (or 30%, or a fifth). Exits are quicker (0.6s, ease-in) and go up when the element leaves through the top; an element out of view re-enters from the side it is on. The hero notices leave one by one as the page scrolls and come back, in order and quicker (0.12s apart), when it scrolls back. A script in `<head>` sets `data-motion` on `<html>` before the first paint; if the page script has not run within 3s, a CSS fallback shows the hero anyway; without JavaScript nothing is hidden. Reduced motion: everything fades in and out without moving. Pressed buttons settle to 98% for 0.1s.

## Direction contract

THESIS: The home page proves the whole journey of one lead in one place. It refuses the category default: a centred headline over a floating screenshot and a row of feature cards.

OWN-WORLD: DESIGN.md's Clean Showroom. Navy band with its single glow, Inter 600 headlines, Action Blue pill buttons, white 24px frames on the cool gray canvas. CRM pictures keep the CRM's own look because they are its real screens.

STORY: A dealer recognises their scattered day (form email, missed call, text, note), reads that Every1Connects gathers it, and sees that lead's real record. A reviewer reads what the app does; a user finds "Log in".

FIRST VIEWPORT: Navy band. Top tier: four small, slightly rotated notices spread across the width. Middle: the headline at display size, left-aligned across the column; below it the lead and the two pills on one row, "Log in" first. Bottom: the real record, full column width in a white 24px frame, rising from the band's lower edge into the next section. Phone: the Mail and Missed call notices, headline at 36px, pills stacked, then the CRM's phone chat screen.

FORM: "Scattered, then in one place", candidate 7 of 7 on the ordered list, dealt to the lead position; seed key 484c2358.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Product section (approved by Gabriel on 2026-10-14; built as `ProductJourney`)

Mockup: `.impeccable/mocks/home-product.html`. The six steps keep their order and their current copy; the numbers stay because the order is the journey of the lead.

Structure: from 1024px, the steps on the left and one window on the right, on a tinted panel (24px radius) that ends at the content column's right edge. (Gabriel, 2026-10-14: no color in the margin outside the column.) Below 1024px, or with JavaScript off, each step is followed by its own picture on a tinted panel inside the margins. Each CRM picture exists once in the HTML; script only switches the layout.

Pictures: desktop crops as in the earlier mockup; on a phone, step 2 uses `Mobile-Inbox` (Chloe chats) and step 6 uses the "Task details" panel of `Task-Drawer`, because the desktop screens are unreadable at 390px.

Motion thesis:
- Focal moment: on desktop, the step being read and the window are pinned at the same height (64px plus 12% of the viewport), the step's number level with the top of the panel; the next step scrolls up and takes its place, and the window shows its screen. "In one place", carried from the hero. (Gabriel, 2026-10-14: a window centred in the viewport while the text scrolled left an empty band beside each; pinning both fixed it.)
- Continuity: the outgoing screen leaves in the direction of travel (0.5s) and the next one rises in after it (0.8s opacity, 1.1s movement, from 0.3s); the window's height eases to the new picture (1s); the panel's tint changes in DESIGN.md's order (blue, sky, violet), over 1s. The panel itself rises in when the section begins and leaves upward when it ends.
- Feedback: the progress line follows the scroll and ends at the pinned number; the current number is filled with `primary`, earlier ones carry a `primary` ring on `tint-blue`, later ones stay plain; the text of other steps drops to `ink-muted`.
- Budget: transitions run only when the step changes; transform, opacity, height of one frame, and one background color. No blur or filter on the CRM markup. The CRM screens themselves do not animate (they have no keyframes of their own).
- Below 1024px (Gabriel, 2026-10-14: the phone read rough and had no motion): each step's panel enters as it comes into view (its tint fades in from the canvas color over 1s, its screen rises 40px into place, 1.2s) and exits upward once passed, coming back on the way up. The number of the step whose picture has passed 80% of the viewport height is filled with `primary`; on tablet the line beside the numbers fills to it.
- Phone layout: the number sits on the title's line; the tinted panel stays inside the margins with a 24px radius and is itself the frame (12px padding, picture radius 12px, no white frame inside), so the picture keeps its width.
- Reduced motion: no movement; screens swap with a crossfade, the height and the line change at once, and on narrow screens the screens fade in without rising.

Done with the build: DESIGN.md › Focus and Motion and Imagery, and the motion entries of `.impeccable/design.json`, describe this motion. In the code, `data-motion` is set on `<html>` by an inline script in the root layout's `<head>`, before the first paint. Every picture shows invented data (Gabriel, 2026-10-14): "Halifax Sales" became "Sales Line".

## Email section (approved by Gabriel on 2026-10-14; built as `EmailSection`)

Mockup: `.impeccable/mocks/home-email.html`. Copy unchanged: the heading, the intro, the three points and the Google block word for word.

Pictures: the email screens rebuilt from the CRM's code and added to the canvas on Gabriel's choice (2026-10-14), pending his review against the CRM: "Send from your own address" shows the New email dialog (`Email-Composer`, whose own description says the mail leaves from your mailbox); "Replies are filed on the contact" shows a contact's Email tab (`Contact-Detail-Email`); "You stay in control" shows Settings › Email with Disconnect (`Settings-Email`, and `Mobile-Settings-Email` on a phone).

Above the heading (Gabriel, 2026-10-14, asked for the Google and Microsoft logos and an envelope "as in the hero, closer together"): three cards in the hero's notice form, slightly rotated and overlapping only across their padding, on `surface` with `shadow-card`: "Gmail · Connected · jordan.blake@example.com", "Microsoft Outlook · Connected · alex.rivera@example.com" and an envelope card "Re: Your 2021 Civic Sport · Filed on Marcus Ellery's record". No logos: Microsoft licenses its logos and app icons only by express agreement, Google asks that its logos never imply affiliation and lists product icons as "ask first", and both companies review this page; product names appear as small text, less prominent than Every1Connects. They enter and leave like the hero's notices.

Structure: on the white band, a 12-column grid of two rows. Row one: the dialog (5 columns) and the contact's Email tab (7); row two: Settings › Email (7) and the Google block as a `tint-blue` callout (5). Each picture sits on a tinted panel over its text; subgrid keeps the pictures of a row the same height and their titles level. Below `lg` everything stacks; on a phone each picture has its own crop, readable at 390px, and the panel is the frame.

Motion (Gabriel, 2026-10-14: the first version was "medio simple"; every animated element needs a visible entrance and exit): entering, the panel opens from a smaller rounded mask (`clip-path`) while its tint comes in; the window rises into place (the New email dialog instead grows from 95% and fades in, as the CRM's own dialogs open); then what is inside appears in order: the contact's e-mails one by one, newest first, and in Settings the connected mailbox, then the ways to connect. Leaving starts while the picture is still on screen (its bottom edge in the top third, or its top edge near the bottom): the inside fades, the window lifts away, the panel closes; coming back reverses it. The second picture of a row follows the first by 0.15s. The Google callout is text and never moves; only its tint comes and goes. Reduced motion: fades only, no mask or movement.

## Security section and closing band (approved by Gabriel on 2026-10-14; built as `SecuritySection`, `SecuritySwiper` and `ClosingBand`)

Mockup: `.impeccable/mocks/home-security.html`. Copy unchanged: the heading, the four points and the closing band word for word.

Security, as a swiper of cards (Gabriel, 2026-10-14: "quiero que sea un swiper con cards"; it replaced a first proposal with the CRM's Members and Active sessions cards beside the points). The heading on the left and the pause button and two round arrow buttons on the right (DESIGN.md's icon button: 1px `ink-soft` border, `tint-blue` on hover; the row never ends, so they are never off). Below, the four points as four cards in a row that scrolls sideways and snaps to each card, ending at the content column. Each card (Gabriel, 2026-10-14: "algo intermedio, un swiper, pero que se incluya la informacion como la presentas en tu diseño ... con las muestras") is a DESIGN.md tinted card (24px radius) with a sample of the CRM on top, in a white frame, and its title and text under it: "Each dealership apart" shows the Organizations card of `Settings-Account` ("Each org has its own data, members, and settings"); "Access by role" the Members card of `Settings-Org` beside the Active sessions card of `Mobile-Settings`; "Encrypted connections and keys" the Connected accounts card of `Settings-Email`; "Backups every day" has no screen in the CRM and shows its lucide icon (database with a backup arrow) in a 112px white circle. 760px cards on desktop (the next one peeks in), 600px on tablet, the width of the screen less 104px on a phone, where the arrows hide, the tint is the frame, and the phone screens take over: Active sessions for roles, `Mobile-Settings-Email` for keys, and the icon (building) for the first card, whose desktop sample is unreadable at that width. Invented data: the slug every1drives becomes dealership. It plays by itself and never ends (Gabriel, 2026-10-14: "tiene que ser automatico el swiper, con la opcion que sea infinito"): one card every 5s; on the client the four cards are copied once before and once after (hidden from assistive technology, not in the server HTML) and the row is kept in the middle set, so after the fourth comes the first, both ways. Four segments under the row fill while their card shows (the ones before stay full) and also take you to their card. WCAG 2.2.2: a pause/play button beside the arrows, kept on a phone where the arrows hide; it also stops while the pointer is on the cards, while anything in the section has keyboard focus (a mouse click on an arrow does not keep it stopped), while the section is off screen, and from the start for anyone who asked for reduced motion. Swiping on a phone or a trackpad, the arrows, the keyboard and, with a mouse, dragging all move it, and the 5s start again; without JavaScript the row of four scrolls natively. Tints in the order blue, sky, violet, sky, so two of a color never meet at the loop.

Motion: the deck is dealt in from the right, one card after another (0.14s apart), each icon rising last; it leaves upward while still on screen, by the same rule as the rest of the page. A card is a moving element, so here text moves with it, as it does whenever the row is swiped.

Closing band (Gabriel, 2026-10-14: the first one was "muy simple"): it answers the hero. There the record rises out of the navy band into the page; here the CRM's own sign-in card (`Mobile-Login`, "Welcome back · Login to your account"), where Log in leads, crosses the band's top edge by 140px, in a white frame at its own size, on the right (4 columns); on the left the heading at 48px, the `on-navy-soft` line and the primary Log in pill. The hero's glow (Gabriel, 2026-10-14: "si puedes usar el mismo estilo de gradiente que se uso en el hero seria mejor el band"), centered over the card from `md` and over the band on a phone, so the light comes from where the card meets the band. The card's motion (Gabriel, 2026-10-14: "dame animacion para el login box"): it rises 64px and grows from 95%, as the CRM opens its dialogs, then its parts appear in reading order 0.09s apart ("Welcome back", email, password, "Remember this device", Login); on exit the parts go first, last to first, and the card drops away after them. The text of the band does not move. On a phone the card comes first, crossing the edge by 112px, then the text, and the pill takes the full width.
