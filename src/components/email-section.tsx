import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { CrmShot } from "@/components/crm-shot";
import {
  contactEmail,
  emailComposer,
  mobileSettingsEmail,
  settingsEmail,
} from "@/components/crm-shots/screens.generated";
import { GOOGLE_USER_DATA_POLICY_URL, site } from "@/config/site";
import "@/components/email-section.css";

/**
 * Three cards above the heading, in the form of the hero's notices: two teammates' mailboxes and an
 * e-mail filed on a contact. Illustration, not screens of the CRM. Product names appear as text only:
 * Google and Microsoft restrict the use of their logos and icons, and both review this page.
 */
const cards: { meta: string; status: string; title: string; body: string; envelope?: boolean }[] = [
  { meta: "Gmail", status: "Connected", title: "jordan.blake@example.com", body: "Jordan Blake" },
  { meta: "Microsoft Outlook", status: "Connected", title: "alex.rivera@example.com", body: "Alex Rivera" },
  { meta: "Email", status: "10:12 AM", title: "Re: Your 2021 Civic Sport", body: "Filed on Marcus Ellery’s record", envelope: true },
];

interface Point {
  key: "send" | "filed" | "control";
  title: string;
  text: string;
  /** DESIGN.md's tint behind the picture. */
  tint: string;
  picture: ReactNode;
  /** What the picture shows, for assistive technology; the picture itself is hidden from it. */
  caption: string;
}

const points: Point[] = [
  {
    key: "send",
    title: "Send from your own address",
    text: "Emails you write to a lead or a contact in the CRM go out through the mailbox you connect, so the customer sees your address and answers you directly.",
    tint: "var(--color-tint-blue)",
    picture: <CrmShot screen={emailComposer} crop={[44, 59, 672, 602]} phoneCrop={[44, 59, 460, 282]} />,
    caption: "The New email window of the CRM, which sends from the salesperson's own mailbox.",
  },
  {
    key: "filed",
    title: "Replies are filed on the contact",
    text: "Every1Connects reads your inbox to find the messages that come from your leads and contacts and adds them to that person’s history. Mail that is not part of a conversation with one of them is not stored.",
    tint: "var(--color-tint-sky)",
    picture: <CrmShot screen={contactEmail} crop={[592, 129, 832, 562]} phoneCrop={[592, 129, 456, 380]} />,
    caption: "The Email tab of a contact in the CRM, with his reply on top of the e-mails exchanged with him.",
  },
  {
    key: "control",
    title: "You stay in control",
    text: "You can disconnect your mailbox at any time from the settings of the CRM. Disconnecting withdraws the access you gave and deletes the access keys we held.",
    tint: "var(--color-tint-violet)",
    picture: (
      <>
        <CrmShot screen={settingsEmail} crop={[520, 104, 880, 220]} className="hidden md:block" />
        <CrmShot screen={mobileSettingsEmail} crop={[28, 145, 334, 292]} className="md:hidden" />
      </>
    ),
    caption: "The Email settings of the CRM, with a connected Google mailbox, the button to disconnect it and the buttons to connect another.",
  },
];

/**
 * The email section of the home page: how a connected Gmail or Outlook mailbox is used, each point
 * with a picture of the CRM's own email screens, and the "How we use the data of your Google
 * account" block that the Google review requires word for word. HomeMotion makes the cards and
 * pictures enter and leave; every word is in the server-rendered HTML without it.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function EmailSection() {
  return (
    <section id="email" className="email-section border-y border-line bg-surface py-16 md:py-24">
      <div className="mx-auto w-full max-w-page px-6">
        <div className="email-cards" aria-hidden>
          {cards.map((card, index) => (
            <div key={card.title} className="email-card" style={{ "--i": index } as CSSProperties}>
              <div className="mb-1 flex justify-between gap-3 text-caption text-ink-soft">
                <span className="inline-flex items-center gap-1.5">
                  {card.envelope ? (
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                    </svg>
                  ) : null}
                  {card.meta}
                </span>
                <span>{card.status}</span>
              </div>
              <p className="font-semibold">{card.title}</p>
              <p>{card.body}</p>
            </div>
          ))}
        </div>

        <h2 className="max-w-2xl text-heading-md text-balance text-ink md:text-heading-lg lg:text-heading-xl">
          Works with your Gmail or Outlook mailbox
        </h2>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-soft">
          Each person on the team can connect their own Google or Microsoft mailbox, and email with customers from the
          same place as their text messages and calls.
        </p>

        <div className="email-bento">
          {points.map((point) => (
            <div key={point.key} className={`email-cell email-cell-${point.key}`}>
              <figure className="email-panel" style={{ "--tint": point.tint } as CSSProperties}>
                <div className="email-frame">{point.picture}</div>
                <figcaption className="sr-only">{point.caption}</figcaption>
              </figure>
              <div>
                <h3 className="text-title text-ink">{point.title}</h3>
                <p className="mt-2 max-w-[34em] text-body text-ink-soft">{point.text}</p>
              </div>
            </div>
          ))}

          <div className="email-callout">
            <h3 className="text-title text-ink">How we use the data of your Google account</h3>
            <p className="mt-3 text-body text-ink-soft">
              {site.name} uses the access you give to your Gmail mailbox for two things only: to send the emails you write
              in the CRM, and to show you the emails your leads and contacts send you. We do not use this data for
              advertising, we do not sell it and we do not use it to train artificial intelligence models.
            </p>
            <p className="mt-3 text-body text-ink-soft">
              {site.name}’s use and transfer to any other app of information received from Google APIs will adhere to
              the{" "}
              <a href={GOOGLE_USER_DATA_POLICY_URL} className="font-medium text-link underline-offset-4 hover:underline">
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. The details are in our{" "}
              <Link href="/privacy" className="font-medium text-link underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
