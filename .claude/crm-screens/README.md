# CRM screens

164 screens of the Every1Connects CRM, copied from the design canvas "Every1Connects Screens" so the landing page can show the product. This is reference material: nothing in this folder is served by the site.

- Source: https://claude.ai/artifact/VvAQ65UZLa9V7KTaarAVw8
- Copied on 2026-10-13 from canvas version `1791936888-9b8d`. On 2026-10-14 four email screens were added to the canvas and copied here (canvas version `1792007034-138d`, see below).
- The canvas is the original. If it changes, read `project/canvas.json` and the `project/*.dc.html` files from it again and overwrite this folder.

## What a file is

Each `.dc.html` is one screen of the canvas: plain HTML with inline styles inside `<x-dc>`, and a shared stylesheet in `<helmet><style>`. Three things keep it from being a finished page:

- `<dc-import name="Sidebar">` pulls in another file of this folder. 99 screens do this; the four imported files are `Sidebar`, `AppHeader`, `Settings-Nav` and `Contact-Info-Panel`.
- `{{name}}`, `<sc-if>` and `<sc-for>` are filled in by the `renderVals()` script at the end of the file.
- `<script src="./support.js">` is the canvas's own runtime, which is not in this folder.

So a file opened in a browser shows only part of its screen. To see a screen as designed, open the canvas. `canvas.json` is the canvas's index: the title, size and position of every screen.

## Using a screen on the landing page

A `.dc.html` needs the canvas's own runtime to draw itself, so it cannot be embedded as it is. There are two ways to use one:

1. Render it with `scripts/render-crm-screens.mjs`, which fills the holes, expands the loops, inlines the imported files, swaps in the invented data and scopes the screen's CSS, then show it with the `CrmShot` component, passing the window to show as `crop`. Add the screen to the script's `SHOTS` list first, and measure the crop on the site itself, where the page's base styles can move a screen by a few pixels.
2. Export the screen from the canvas as an image and put it in `public/`.

Either way:

- Never redraw a screen by hand, simplify it, or add anything to it. A picture is the screen's own markup and styles, rendered, then cropped and scaled. The only edits allowed are the swaps to invented data listed below and structural ones that change no pixel: landmark and heading tags become divs, links lose their target, and ids are dropped, so a picture adds no headings, landmarks or links to the page around it. A hand-drawn imitation drifts from the real CRM at once.
- Keep the CRM's own look inside the picture. The screens use the product's blue (`--primary: oklch(0.623 0.214 259.815)`), the system font and the product's radii; they are not restyled with the tokens of `DESIGN.md`. The frame around the picture does follow `DESIGN.md` (› Imagery): a white frame with a 1px `line` border, and a 12px radius on the image.
- A screen on the landing page is a picture, not a working form. Its buttons, links and inputs must not take keyboard focus or be announced as controls (`inert` and `aria-hidden`), and the text beside it says what it shows.

## Check before a screen goes public

- **The canvas calls its sample organization Every1Drives.** `Sidebar` shows that name at the top of the app, and 97 screens import `Sidebar`; 41 files also use it in their own text. Only 3 files say `Every1Connects`. Every1Drives (legal name Every1drives Inc.) is the company that develops Every1Connects, and the CRM's screens must not show it (Gabriel, 2026-10-14): the app is Every1Connects. **In every public picture the organization is named `Dealership`** (Gabriel's decision of 2026-10-13), and the round "E1" badge beside it becomes "D". Where the name stands for the app instead, as the 34px wordmark of `Image-Cropper-Dialog`, a picture must show `Every1Connects`; no picture uses that screen yet. The files in this folder keep the canvas's text; the change is made in the picture.
- Two files carry addresses that are not `example.com`: `e1d.ca/apply` in `Bulk-Dialogs` and `every1drives.store` in `Settings-Chloe-AI`. In a public picture both become `example.com` addresses.
- **Public pictures show invented data only** (Gabriel, 2026-10-14). The screens place the sample dealership in Halifax: the phone line "Halifax Sales" (33 files mention Halifax, among them `Softphone-States`, `State-Chat-Chloe-Active` and `Mobile-Contact-Chat`), street addresses, `Halifax, NS` locations and the `America/Halifax` time zone. In a public picture the line is "Sales Line" and the address in `Contact-Info-Panel` is "118 Harbour Rd, Springfield, NS, X0X 0X0". The script refuses a picture in which `Halifax` survives, so a new screen with another Halifax text needs its own swap in `SAMPLE_DATA_SWAPS`.
- Every e-mail address is `@example.com` and every phone number is a 555 number. The `(902)` area code stays as it is (Gabriel, 2026-10-14): numbers from 555-0100 to 555-0199 are reserved for fiction.
- **The email screens are reconstructions from the CRM's code**, added on 2026-10-14 at Gabriel's request because the canvas had none: `Contact-Detail-Email` (a contact's Email tab, from `EmailPane` and `EmailMessageItem`), `Email-Composer` (the New email dialog, from `EmailComposer`) `Settings-Email` (Settings › Email, from `SettingsEmailTab`; `Settings-Nav` shows Team Management and Email only when its `email` prop is on) and `Mobile-Settings-Email` (the same tab at 390px, where Disconnect shows its icon only). Their copy is the CRM's English strings word for word; the messages are invented. They show the email integration as it is on staging, not yet in production. Gabriel reviews them against the CRM before any goes public.

## Where to start for each part of the home page

Picked by title only; open the screen in the canvas to confirm it fits.

| Home page | Screens |
|---|---|
| Leads from your website | `Leads-List`, `Lead-Detail-Linked`, `Import-Upload` to `Import-Review`, `Settings-Site-Connections` |
| Contacts and sales pipeline | `Contacts-List`, `Contact-Detail-Activity`, `Pipeline-Board`, `Pipeline-List`, `Smart-View-Detail` |
| One inbox for every channel | `Main`, `Inbox-Needs-Agent`, `Calls-Inbox`, `Tasks-Inbox` |
| A phone inside the CRM | `Softphone-States`, `Phone-Panel-States`, `Call-Dialogs` |
| Works with your Gmail or Outlook mailbox | `Email-Composer`, `Contact-Detail-Email`, `Settings-Email`, `Mobile-Settings-Email` |
| Chloe, the AI assistant | `Main`, `State-Chat-Chloe-Active`, `Contact-Detail-Chat`, `Settings-Chloe-AI` |
| Tasks and activity reports | `Tasks-Inbox`, `Task-Drawer`, `Reports-Overview`, `Reports-Activity-Log`, `Dashboard` |
| Access by role, open sessions | `Settings-Users-Team`, `User-Detail`, `Auth-States` |
| On a phone or tablet | `Mobile-Inbox`, `Mobile-Contact-Chat`, `Tablet-Inbox` |

## All screens

The file is the name plus `.dc.html`. Sizes are in CSS pixels, width × height.

### Shared pieces (imported by the other screens)

| File | Screen | Size |
|---|---|---|
| `Sidebar` | Sidebar (shared component) | 256 × 960 |
| `AppHeader` | App header (shared component) | 1184 × 64 |
| `Settings-Nav` | Settings navigation (shared component) | 224 × 880 |
| `Contact-Info-Panel` | Contact details panel (shared component) | 320 × 1040 |

### Foundations and menus

| File | Screen | Size |
|---|---|---|
| `Foundations` | Foundations | 1440 × 2150 |
| `Menus-Reference` | Menus and popovers (open states) | 1440 × 1380 |
| `Header-Menus-2` | Header and sidebar menus (team presence, org switcher, phone button) | 1440 × 1040 |
| `Command-Palette` | Command palette (⌘K) · empty, searching, no results | 1700 × 520 |
| `Status-Banners` | Top banners · session expiry and connection lost | 1440 × 440 |

### Dashboard

| File | Screen | Size |
|---|---|---|
| `Dashboard` | Dashboard · Home | 1440 × 1464 |

### Inbox and chat

| File | Screen | Size |
|---|---|---|
| `Main` | Inbox · Chloe chats | 1440 × 960 |
| `Inbox-Needs-Agent` | Inbox · Needs Agent (3 selected) | 1440 × 960 |
| `Tasks-Inbox` | Inbox · Tasks tab | 1440 × 960 |
| `Calls-Inbox` | Inbox · Calls tab | 1440 × 960 |
| `Chat-Unlinked` | Chat · conversation without a contact | 1440 × 960 |
| `Unlinked-Create-Form` | Chat · create contact form (side panel) | 320 × 520 |
| `Bulk-Dialogs` | Bulk actions · template, Start Chloe and Chloe menu | 1700 × 900 |
| `Template-Dialog` | SMS template dialog with phone preview | 1000 × 900 |
| `Task-Drawer` | Task drawer (new and edit) | 976 × 960 |
| `Task-Blocking-Modals` | Task blocking modals (hard block and reminder) | 1360 × 680 |

### Leads

| File | Screen | Size |
|---|---|---|
| `Leads-List` | Leads · List | 1440 × 960 |
| `Leads-List-Bulk` | Leads · filters active + 3 selected | 1440 × 960 |
| `Lead-Detail-Linked` | Lead · detail with linked contact (Tasks tab) | 1440 × 960 |
| `Lead-Detail-Unlinked` | Lead · detail without linked contact | 1440 × 960 |
| `Filter-Drawer-Root` | Filter drawer · categories | 448 × 960 |
| `Filter-Drawer-Category` | Filter drawer · category with active filters | 448 × 960 |
| `List-Settings-Drawer` | List settings drawer (Leads, Contacts, Smart Views) | 448 × 960 |
| `Import-Upload` | Import leads · 1 upload | 1440 × 640 |
| `Import-Mapping` | Import leads · 2 map columns | 1440 × 1080 |
| `Import-Result` | Import leads · 3 result | 1440 × 1100 |
| `Import-Review` | Import leads · 4 review new leads | 1440 × 1060 |

### Contacts

| File | Screen | Size |
|---|---|---|
| `Contacts-List` | Contacts · List | 1440 × 960 |
| `Contact-Detail-Activity` | Contact · Activity tab | 1440 × 960 |
| `Contact-Detail-Chat` | Contact · Chat tab (agent control) | 1440 × 960 |
| `Contact-Detail-Email` | Contact · Email tab (email integration on) | 1440 × 960 |
| `Email-Composer` | New email dialog | 760 × 720 |
| `Client-Create` | Contacts · new client | 1440 × 980 |

### Pipeline and smart views

| File | Screen | Size |
|---|---|---|
| `Pipeline-Board` | Pipeline · board | 1440 × 960 |
| `Pipeline-List` | Pipeline · list view | 1440 × 960 |
| `Opportunity-Dialog` | Opportunity dialog (edit) | 640 × 840 |
| `Stage-Sheet` | Pipeline stage sheet (edit) | 448 × 1260 |
| `Smart-View-Detail` | Smart View · detail | 1440 × 960 |
| `Smart-View-Sheet` | Smart View sheet (edit) | 384 × 960 |

### Phone and calls

| File | Screen | Size |
|---|---|---|
| `Softphone-States` | Softphone and dialer states | 1440 × 1500 |
| `Phone-Panel-States` | Header · phone panel states | 1440 × 900 |
| `Call-Dialogs` | Call outcome and Start dialer dialogs | 1360 × 760 |
| `Caller-ID-Persona-Proposals` | Header · Caller ID with the line's persona · proposals | 1440 × 900 |
| `Caller-ID-Persona-Other-Pickers` | Header · Caller ID persona · the other two pickers and the source of the name | 1440 × 900 |
| `Voice-Dialer-Confirm` | Voice · dialer outside-hours confirmation | 640 × 640 |
| `Phone-Sheet` | Phone number sheet (edit) | 448 × 1560 |

### Reports

| File | Screen | Size |
|---|---|---|
| `Report-Save-Dialog` | Report · Save as dialog | 640 × 320 |
| `Reports-Activity-Log` | Reports · Activity Log | 1440 × 840 |
| `Reports-Calls` | Reports · Calls | 1440 × 1380 |
| `Reports-Comparison` | Reports · Activity Comparison | 1440 × 820 |
| `Reports-Explorer` | Reports · Explorer (timeline) | 1440 × 980 |
| `Reports-Explorer-Bars` | Reports · Explorer (stacked bars) | 1440 × 1010 |
| `Reports-Funnel` | Reports · Sales Funnel | 1440 × 1040 |
| `Reports-Overview` | Reports · Activity Overview (with comparison) | 1440 × 920 |
| `Reports-Popovers` | Reports · popovers and menus (open states) | 1440 × 1020 |
| `Reports-Status-Changes` | Reports · Status Changes (row expanded) | 1440 × 1100 |

### Follow-ups, health and inventory

| File | Screen | Size |
|---|---|---|
| `Followups-Filters-Sheet` | Follow-ups · filters sheet | 384 × 520 |
| `Followups-Monitor` | Follow-ups · monitor (3 selected) | 1440 × 960 |
| `Followups-Stats` | Follow-ups · stats | 1440 × 1960 |
| `Health-Log-Drawer` | Health · log detail drawer | 600 × 1080 |
| `Health-Messaging` | Health · Messaging tab | 1440 × 1424 |
| `Health-QA-Report-Detail` | Health · Chloe QA (report detail) | 1440 × 1024 |
| `Health-QA-Reports` | Health · Chloe QA (reports list) | 1440 × 1164 |
| `Inventory-Catalog` | Inventory · catalog | 1440 × 1040 |

### Search and notifications

| File | Screen | Size |
|---|---|---|
| `Search-Results` | Search · results | 1440 × 920 |
| `Search-Empty` | Search · no term | 1440 × 520 |
| `Notifications-Page` | Notifications · page | 1440 × 1340 |

### Settings

| File | Screen | Size |
|---|---|---|
| `Settings-Account` | Settings · Account | 1440 × 1960 |
| `Settings-Account-Overlays` | Settings · Account overlays (invite sheet, org dialog, confirmations) | 1440 × 900 |
| `Settings-Chloe-AI` | Settings · Chloe AI | 1440 × 1760 |
| `Settings-Follow-up-Hours` | Settings · Follow-up Hours | 1440 × 1240 |
| `Settings-Follow-up-Tiers` | Settings · Follow-up Tiers | 1440 × 1080 |
| `Settings-Follow-up-Tiers-States` | Follow-up Tiers · empty, add, validation, picker, delete | 1440 × 1480 |
| `Settings-General` | Settings · General | 1440 × 1600 |
| `Settings-Email` | Settings · Email (connected accounts) | 1440 × 900 |
| `Settings-Notifications` | Settings · Notifications | 1440 × 1760 |
| `Settings-Org` | Settings · Organization | 1440 × 3100 |
| `Settings-Org-Overlays` | Settings · Organization overlays (member sheets, remove) | 1380 × 620 |
| `Settings-Org-Overrides` | Organization · webhooks and tiers overrides | 1440 × 1000 |
| `Settings-Phone-Numbers` | Settings · Phone Numbers | 1440 × 960 |
| `Settings-Pipeline-Stages` | Settings · Pipeline Stages | 1440 × 960 |
| `Settings-SMS-Providers` | Settings · SMS Providers | 1440 × 600 |
| `Settings-SMS-Templates` | Settings · SMS Templates | 1440 × 960 |
| `Settings-Shortcuts` | Settings · Shortcuts | 1440 × 960 |
| `Settings-Site-Connections` | Settings · Connectors | 1440 × 1260 |
| `Settings-Smart-Views` | Settings · Smart Views | 1440 × 960 |
| `Settings-States` | Settings · Lead/Client States | 1440 × 960 |
| `Settings-Users-Accounts` | Settings · Platform users (accounts) | 1440 × 920 |
| `Settings-Users-Team` | Settings · Platform users (team) | 1440 × 920 |
| `Settings-Voice` | Settings · Voice & calls | 1440 × 920 |
| `SMS-Provider-Sheet` | SMS provider sheet (add) | 448 × 760 |
| `Site-Connection-Dialogs` | Connectors · dialogs and menus | 1440 × 1000 |
| `Site-Connection-Dialogs-2` | Connectors · edit and forms upload | 1440 × 940 |
| `Image-Cropper-Dialog` | Organization · logo cropper | 1180 × 700 |
| `Support-User-Sheet` | Platform users · create support user | 384 × 560 |

### Users, profile and sign-in

| File | Screen | Size |
|---|---|---|
| `Login` | Login | 1440 × 900 |
| `Auth-States` | Login · 2FA, forgot, reset and device-limit states | 1680 × 1300 |
| `Invite-Onboarding` | Invite · onboarding form | 1440 × 900 |
| `Invite-States` | Invite · result states | 1520 × 360 |
| `User-Detail` | Users · detail | 1440 × 1000 |
| `User-Edit` | Users · edit | 1440 × 1220 |
| `User-Invite` | Users · invite | 1440 × 660 |
| `Profile-Personal` | Profile · personal information | 1440 × 1764 |
| `Profile-Settings` | Profile · settings tab | 1440 × 1064 |

### About and changelog

| File | Screen | Size |
|---|---|---|
| `About` | About | 1440 × 560 |
| `Changelog` | Changelog (first 3 of 14 versions) | 1440 × 2343 |
| `Changelog-Modal` | Changelog · what's new modal (after login) | 640 × 960 |
| `Not-Ready` | Feature not ready (/unavailable and 404) | 1440 × 700 |

### Product tour

| File | Screen | Size |
|---|---|---|
| `Tour-Center` | Product tour · center dialog | 640 × 560 |
| `Tour-Copy-Reference` | Product tour · every step and its text | 1440 × 2910 |
| `Tour-Step-Chat-Chloe-Driving` | Product tour · Chat tour, Chloe is driving (centered) | 1440 × 960 |
| `Tour-Step-Chat-Composer` | Product tour · Chat tour, step on the message box | 1440 × 960 |
| `Tour-Step-Chat-TakeControl` | Product tour · Chat tour, step on the status menu | 1440 × 960 |
| `Tour-Step-Inbox-Tabs` | Product tour · Inbox tour, step on the tab bar | 1440 × 960 |
| `Tour-Step-Intro` | Product tour · opening step (centered) | 1440 × 960 |
| `Tour-Step-Nav-Contacts` | Product tour · step on Contacts | 1440 × 960 |
| `Tour-Step-Nav-Pipeline` | Product tour · step on Pipeline | 1440 × 960 |
| `Tour-Step-Search` | Product tour · step on the search box | 1440 × 960 |
| `Tour-Step-Sidebar` | Product tour · step on the sidebar | 1440 × 960 |
| `Tour-Step-Sidebar-Group` | Product tour · step on the whole sidebar | 1440 × 960 |
| `Tour-Steps-Header` | Product tour · the three header steps | 1440 × 1140 |

### Loading, empty and error states

| File | Screen | Size |
|---|---|---|
| `State-App-Shell-Loading` | App shell · checking the session (skeleton) | 1440 × 960 |
| `State-Calls-Empty` | Inbox · Calls tab empty | 1440 × 960 |
| `State-Chat-Chloe-Active` | Contact · Chat tab (Chloe active, no message box) | 1440 × 960 |
| `State-Chat-Empty` | Contact · Chat tab, no activity yet | 1440 × 960 |
| `State-Chat-Loading` | Contact · Chat tab loading | 1440 × 960 |
| `State-Chat-NoConversation` | Contact · Chat tab, no conversation | 1440 × 960 |
| `State-Contact-Loading` | Contact detail · loading (skeleton) | 1440 × 960 |
| `State-Contacts-Empty` | Contacts · empty | 1440 × 960 |
| `State-Contacts-Loading` | Contacts · loading | 1440 × 960 |
| `State-Inbox-Empty` | Inbox · empty tab | 1440 × 960 |
| `State-Inbox-Loading` | Inbox · loading (skeleton list) | 1440 × 960 |
| `State-Lead-Loading` | Lead detail · loading (skeleton) | 1440 × 960 |
| `State-Leads-Empty` | Leads · empty | 1440 × 960 |
| `State-Leads-Loading` | Leads · loading (skeleton table) | 1440 × 960 |
| `State-Pipeline-Loading` | Pipeline · loading (skeleton board) | 1440 × 960 |
| `State-Settings-Account-Loading` | Settings · Account loading | 1440 × 1160 |
| `State-Settings-FollowUp-Loading` | Settings · Follow-up Hours loading | 1440 × 1000 |
| `State-Settings-Org-Loading` | Settings · Organization loading | 1440 × 1180 |
| `State-Settings-Users-Loading` | Settings · Platform users loading | 1440 × 900 |
| `State-Tasks-Empty` | Inbox · Tasks tab empty | 1440 × 960 |
| `States-Empty` | States · empty states (all screens) | 1440 × 1100 |
| `States-Errors` | States · errors, notices and toasts | 1440 × 900 |
| `States-Reports-Loading` | States · Reports loading (all 7 reports) | 1440 × 5100 |
| `States-Settings-Loading` | States · Settings loading pieces | 1440 × 1100 |
| `States-Skeletons` | States · skeleton components | 1440 × 1160 |

### Phone and tablet layouts

| File | Screen | Size |
|---|---|---|
| `Mobile-Contact-Chat` | Phone · Contact, Chat tab (390 px) | 390 × 844 |
| `Mobile-Contact-Details` | Phone · Contact details panel open (390 px) | 390 × 844 |
| `Mobile-Dashboard` | Phone · Dashboard (390 px) | 390 × 844 |
| `Mobile-Inbox` | Phone · Inbox (390 px) | 390 × 844 |
| `Mobile-Login` | Phone · Login (390 px) | 390 × 844 |
| `Mobile-Menu-Open` | Phone · sidebar sheet open (390 px) | 390 × 844 |
| `Mobile-Settings` | Phone · Settings, General (390 px) | 390 × 844 |
| `Mobile-Settings-Nav` | Phone · Settings menu open (390 px) | 390 × 844 |
| `Mobile-Settings-Email` | Phone · Settings, Email (390 px) | 390 × 844 |
| `Tablet-Contact-Chat` | Tablet · Contact, Chat tab (768 px) | 768 × 1024 |
| `Tablet-Dashboard` | Tablet · Dashboard (768 px) | 768 × 1024 |
| `Tablet-Inbox` | Tablet · Inbox (768 px) | 768 × 1024 |

### Review notes (not product screens)

| File | Screen | Size |
|---|---|---|
| `Review-Index` | Índice de revisión (por módulo) | 1440 × 3640 |
| `Responsive-Audit` | Móvil y tablet · cómo se ve hoy | 1440 × 1400 |
