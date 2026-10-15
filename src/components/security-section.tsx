import type { ReactNode } from "react";
import { CrmShot } from "@/components/crm-shot";
import {
  membersCard,
  mobileSettingsEmail,
  organizationsCard,
  sessionsCard,
  settingsEmail,
} from "@/components/crm-shots/screens.generated";
import { SecuritySwiper, type SwiperCard } from "@/components/security-swiper";
import "@/components/security-section.css";

/** A lucide icon (the CRM's icon library), drawn as the CRM draws it. */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-12 fill-none stroke-current stroke-[1.5] max-md:size-[38px]" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const icons = {
  building: (
    <Icon>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </Icon>
  ),
  backup: (
    <Icon>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 12a9 3 0 0 0 5 2.69" />
      <path d="M21 9.3V5" />
      <path d="M3 5v14a9 3 0 0 0 6.47 2.88" />
      <path d="M12 12v4h4" />
      <path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />
    </Icon>
  ),
};

interface Point {
  title: string;
  text: string;
  tint: string;
  /** The sample of the CRM from md up (one or two pictures), or null where the CRM has no screen for it. */
  desktop: ReactNode[] | null;
  /** The sample below md, or null for the icon. */
  phone: ReactNode | null;
  icon: ReactNode | null;
  /** What the sample shows, for assistive technology; the pictures themselves are hidden from it. */
  caption: string | null;
}

/** The four points, each with a sample of the CRM where it has a screen for it. */
const points: Point[] = [
  {
    title: "Each dealership apart",
    text: "The data of one dealership is kept apart from every other dealership’s and is never shown outside it.",
    tint: "var(--color-tint-blue)",
    desktop: [<CrmShot key="orgs" screen={organizationsCard} crop={[0, 0, 880, 276]} />],
    phone: null,
    icon: icons.building,
    caption: "The organizations of an account in the CRM, each with its own data, members and settings.",
  },
  {
    title: "Access by role",
    text: "Agents, administrators and owners see what their role allows. Everyone can review and close the sessions open under their name.",
    tint: "var(--color-tint-sky)",
    desktop: [
      <CrmShot key="members" screen={membersCard} crop={[0, 0, 428, 433]} />,
      <CrmShot key="sessions" screen={sessionsCard} crop={[0, 0, 326, 396]} />,
    ],
    phone: <CrmShot screen={sessionsCard} crop={[0, 0, 326, 396]} />,
    icon: null,
    caption: "The members of a dealership in the CRM with their roles, and the devices signed in to an account, each of which can be signed out.",
  },
  {
    title: "Encrypted connections and keys",
    text: "The CRM is reached over an encrypted connection, and the access keys of connected mailboxes are stored encrypted.",
    tint: "var(--color-tint-violet)",
    desktop: [<CrmShot key="mailbox" screen={settingsEmail} crop={[520, 104, 880, 220]} />],
    phone: <CrmShot screen={mobileSettingsEmail} crop={[28, 145, 334, 292]} />,
    icon: null,
    caption: "A mailbox connected to the CRM, whose access keys are the ones stored encrypted.",
  },
  {
    title: "Backups every day",
    text: "The database is backed up daily and a copy is kept away from the main server.",
    tint: "var(--color-tint-sky)",
    desktop: null,
    phone: null,
    icon: icons.backup,
    caption: null,
  },
];

/**
 * The face of a card: the sample of the CRM on top (or the icon, where the CRM has no screen for
 * the point, and on a phone where the desktop sample would be unreadable), the title and text under it.
 *
 * @author Gabriel Coronado
 * @since main
 */
function Card({ point }: { point: Point }) {
  const iconCircle = (className: string) => <span className={`sec-icon ${className}`}>{point.icon}</span>;
  return (
    <>
      <figure className="sec-sample">
        {point.desktop ? (
          <div className={`sec-frame hidden md:flex ${point.desktop.length > 1 ? "sec-pair" : ""}`}>{point.desktop}</div>
        ) : (
          iconCircle("hidden md:inline-flex")
        )}
        {point.phone ? <div className="sec-frame flex md:hidden">{point.phone}</div> : iconCircle("inline-flex md:hidden")}
        {point.caption ? <figcaption className="sr-only">{point.caption}</figcaption> : null}
      </figure>
      <div className="sec-copy">
        <h3 className="text-heading-sm text-ink max-md:text-title">{point.title}</h3>
        <p className="mt-3 text-body text-ink-soft">{point.text}</p>
      </div>
    </>
  );
}

/**
 * The security section of the home page: how a dealership's data is looked after, as a row of
 * cards that plays by itself and never ends (SecuritySwiper), each card with a sample of the CRM.
 * The four points are in the server-rendered HTML; without JavaScript the row scrolls natively.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function SecuritySection() {
  const cards: SwiperCard[] = points.map((point) => ({ title: point.title, tint: point.tint, content: <Card point={point} /> }));

  return (
    <section id="security" className="security-section overflow-hidden pt-16 md:pt-24">
      <div className="mx-auto w-full max-w-page px-6">
        <SecuritySwiper
          heading={
            <h2 className="max-w-2xl text-heading-md text-balance text-ink md:text-heading-lg lg:text-heading-xl">
              How your data is looked after
            </h2>
          }
          label="How your data is looked after"
          cards={cards}
        />
      </div>
    </section>
  );
}
