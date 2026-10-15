# Product

<!-- impeccable:product-schema 1 -->

Sources: `README.md`, `CLAUDE.md`, the home page copy, and Gabriel's brief and answers of 2026-10-13.

## Platform

web

## Users

Three audiences read this site.

- **Reviewers at Google and Microsoft.** They read the home page and the privacy policy and compare them with the CRM before they approve its access to Gmail and Outlook mailboxes. They look for what the app does, how it uses a connected mailbox, the privacy policy on this same domain, and the name they see on the consent screen.
- **People who already use the CRM.** Agents, administrators and owners of a dealership who come here to sign in. Their dealership created their account.
- **Dealerships evaluating the CRM.** Someone at a car dealership who has heard of Every1Connects and wants to understand what it does and whether it is a serious product. They cannot sign up here.

## Product Purpose

Every1Connects is a CRM for car dealerships: website leads, contacts, the sales pipeline, text messages, calls and email in one place. The CRM runs at `https://app.e1dconnect.cloud` and lives in another repository (`../00-mkt-app`).

This repository is its public site at `https://e1dconnect.cloud`: a home page, a privacy policy and terms of service. The site exists because Google and Microsoft require a public home page and a privacy policy on the same domain before they verify the CRM's access to mailboxes.

The site succeeds when the reviewers approve that access, and when a dealership that lands here understands what the product does and takes it seriously.

## Positioning

The whole journey of a lead in one tool: from the form on the dealership's website to the sale, with the lead, the text messages, the calls, the email and the pipeline in the same place.

## Operating Context

- A dealership creates the accounts of its own staff. There is no public sign-up. The only action on this site is "Log in", which goes to the CRM.
- The reviewers compare three things: this site, the consent screen of the provider, and the app itself. The name on all three is `Every1Connects`.
- The email feature (a connected Gmail or Outlook mailbox) is on in staging (`staging.e1dconnect.cloud`) and not yet in production.
- The CRM is available in English, French and Spanish.

## Capabilities and Constraints

What the site may say the CRM does. Each line is already on the home page and was checked against the CRM's code.

- Forms filled in on a dealership's website arrive as leads, matched to the right person; a list of leads can be imported from a file.
- One record per person, a sales pipeline with the dealership's own stages, and saved lists.
- One inbox for text messages, calls and email, where a conversation can be put aside or marked as done.
- A phone in the browser: make and take calls, record, transfer, and work through a list with the dialer.
- Chloe, the AI assistant, answers new leads by text message and hands the conversation to a person when the customer asks.
- Tasks with reminders, and reports of what each person did.
- Each person can connect their own Gmail or Outlook mailbox to send from their address and file replies on the contact.
- Each dealership's data is kept apart, access is by role, connections and mailbox keys are encrypted, and the database is backed up daily.

Constraints:

- No capability is added to the copy without checking it in `../00-mkt-app` or asking Gabriel.
- The name reads `Every1Connects` everywhere.
- The home page is public and says what the app does and how it uses a connected mailbox. The block "How we use the data of your Google account" stays word for word.
- The privacy policy is on this domain and linked from every page.
- The text of every page arrives in the server-rendered HTML, so a reviewer or a crawler reads it without running JavaScript. Client-side script is allowed for interaction (decided 2026-10-13), never for content.
- The text of `/privacy` and `/terms` is waiting for legal review. Only the frame around it may change.
- Section 3 of the privacy policy describes what the CRM really does with Gmail and Outlook data, and changes with it.
- The site has no sign-up, no pricing, no free trial and no sales form.
- The site is in English now. French comes later, so a layout must hold text that runs longer. Spanish is not planned for the site.

Terms: "Chloe" is the name of the AI assistant. In every public picture the sample dealership is called "Dealership"; "Every1Drives" (legal name Every1drives Inc.) is the company that develops Every1Connects, not a customer: it appears only as the operator on the legal pages and never in a picture of the CRM, whose name is Every1Connects (Gabriel, 2026-10-14).

Not decided yet:

- Whether the site grows beyond its three pages, for example one page per function.
- Whether the four email screens added to the canvas (see Evidence on Hand) match the CRM closely enough to go public; Gabriel reviews them.

## Brand Commitments

- The name `Every1Connects` and the tagline "The CRM for car dealerships", both in `src/config/site.ts`.
- The logo: four PNG files in `public/brand/`.
- The visual system in `DESIGN.md` is binding. Inter is the typeface. The references Gabriel named are Close and monday.com.
- Copy says what the product does in plain words. Every statement is one that can be checked against the CRM.

## Evidence on Hand

- 160 screens of the CRM, copied from its design canvas, in `.claude/crm-screens/` with an index in its `README.md`. The product pictures are rebuilt from these. Their sample data is fictional (`example.com` addresses, 555 phone numbers).
- The CRM's real email screens live in its code: `../00-mkt-app/front/src/components/inbox/EmailInboxPane.tsx`, `EmailThreadPanel.tsx`, `components/crm/EmailPane.tsx`, `EmailComposer.tsx` and `components/settings/SettingsEmailTab.tsx`. On 2026-10-14 they were rebuilt as canvas screens from that code (Gabriel's choice): `Contact-Detail-Email`, `Email-Composer`, `Settings-Email` and `Mobile-Settings-Email` in `.claude/crm-screens/`, with the CRM's own English strings and invented messages.
- The home page copy and both policies, already reviewed for accuracy.

What does not exist, and must not be made up: testimonials, customer names or logos, usage figures or results, prices, awards or press, and integrations beyond the ones in the copy. The numbers inside a CRM screen are sample data, not results.

## Product Principles

1. Say only what the CRM does. When in doubt, check the CRM or ask.
2. Answer the reviewer in plain sight: what the app does, what it does with mailbox data, where the privacy policy is, and the same name as on the consent screen.
3. Show the real product. A picture comes from the CRM's own screens, never from an invented interface.
4. Tell it as one journey: a lead from the website form to the sale, in one place.
5. One way in. The site offers "Log in" and never implies a sign-up, a trial or a price.
