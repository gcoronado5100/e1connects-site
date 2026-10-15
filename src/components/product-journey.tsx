import type { CSSProperties } from "react";
import { CrmShot, type CrmCrop } from "@/components/crm-shot";
import {
  activityLog,
  chloeChat,
  contactActivity,
  inbox,
  mobileInbox,
  pipeline,
  softphone,
  taskDrawer,
  type CrmScreen,
} from "@/components/crm-shots/screens.generated";
import { site } from "@/config/site";
import "@/components/product-journey.css";

interface Picture {
  screen: CrmScreen;
  crop: CrmCrop;
  phoneCrop?: CrmCrop;
  /** Shown only from `md` up, or only below it, when the two sizes need different screens. */
  only?: "desktop" | "phone";
}

interface Step {
  title: string;
  text: string;
  pictures: Picture[];
  /** What the pictures show, for assistive technology; the pictures themselves are hidden from it. */
  caption: string;
}

/**
 * The journey of a lead through the CRM, in order. Crops are in each screen's own pixels and end
 * on element boundaries; below `md` the desktop screens of steps 2 and 6 would be unreadable, so
 * the CRM's own phone inbox and its task panel take their place.
 */
const steps: Step[] = [
  {
    title: "Leads from your website",
    text: "Forms filled in on your dealership’s website arrive in the CRM as they are sent, already matched to the right person. A list of leads can also be imported from a file.",
    pictures: [{ screen: contactActivity, crop: [600, 679, 790, 247], phoneCrop: [648, 679, 452, 200] }],
    caption: "A lead's activity in the CRM: the form he sent from the website, with his answers, and the chat Chloe started with him.",
  },
  {
    title: "Chloe, the AI assistant",
    text: "Chloe answers new leads by text message, collects what the sales team needs to know and hands the conversation to a person when the customer asks for one.",
    pictures: [
      { screen: chloeChat, crop: [600, 176, 816, 428], only: "desktop" },
      { screen: mobileInbox, crop: [0, 64, 390, 560], only: "phone" },
    ],
    caption: "Chloe in the CRM: a text conversation where she answers a lead's questions about financing, and the list of chats she is handling.",
  },
  {
    title: "One inbox for every channel",
    text: "Text messages, calls and emails sit side by side. Anyone on the team can see where a conversation stands, put it aside for later or mark it as done.",
    pictures: [{ screen: inbox, crop: [264, 72, 1168, 590], phoneCrop: [272, 72, 520, 506] }],
    caption: "The inbox of the CRM, on the tab of conversations that need a person, with each one's stage and last message.",
  },
  {
    title: "A phone inside the CRM",
    text: "Make and take calls from the browser, record them, transfer them to a colleague and work through a list of people with the dialer.",
    pictures: [
      { screen: softphone, crop: [44, 164, 392, 134] },
      { screen: softphone, crop: [505, 332, 328, 318] },
    ],
    caption: "The phone of the CRM in the browser: an incoming call, and a call in progress with the colleagues it can be transferred to.",
  },
  {
    title: "Contacts and sales pipeline",
    text: "Each person has one record with everything that was said and done. Deals move through the stages your dealership works with, and the lists your team opens every day can be saved.",
    pictures: [{ screen: pipeline, crop: [280, 140, 912, 460], phoneCrop: [280, 140, 304, 470] }],
    caption: "The sales pipeline of the CRM, with deals in the New lead, Contacted and Credit app sent stages.",
  },
  {
    title: "Tasks and activity reports",
    text: "Reminders keep follow-ups from being missed, and reports show what each person on the team did during the day.",
    pictures: [
      { screen: activityLog, crop: [264, 72, 1168, 664], only: "desktop" },
      { screen: taskDrawer, crop: [528, 0, 448, 624], only: "phone" },
    ],
    caption: "The activity log of the CRM, with what each person and Chloe did during the day, and a follow-up task linked to a client and assigned to a salesperson.",
  },
];

/** DESIGN.md's three tints, in order, one per step. */
const tints = ["var(--color-tint-blue)", "var(--color-tint-sky)", "var(--color-tint-violet)"];

const onlyClasses = { desktop: "hidden md:block", phone: "md:hidden" } as const;

/**
 * The product section of the home page: what a team does in the CRM, as the journey of a lead in
 * six steps, each with a picture of the real screen. All of it is in the server-rendered HTML,
 * each step followed by its picture. With JavaScript, HomeMotion turns it into one pinned window
 * beside the steps from `lg` up, and makes each picture enter and leave on narrower screens.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function ProductJourney() {
  return (
    <section id="product" className="pb-24 pt-16 md:pt-24">
      <div className="mx-auto w-full max-w-page px-6">
        <h2 className="max-w-2xl text-heading-md text-balance text-ink md:text-heading-lg lg:text-heading-xl">
          What your team does in {site.name}
        </h2>
        <p className="mt-4 max-w-2xl text-body-lg text-ink-soft">
          A dealership’s sales work, from the first enquiry to the sale, without moving between tools.
        </p>

        <div className="journey" data-journey>
          <ol className="journey-steps">
            {steps.map((step, index) => (
              <li key={step.title} className="journey-step" style={{ "--i": index } as CSSProperties}>
                <div className="journey-pin">
                  <span className="journey-num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="journey-copy">
                    <h3 className="text-title text-ink">{step.title}</h3>
                    <p className="mt-2 text-body text-ink-soft">{step.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="journey-stage">
            <div className="journey-sticky">
              <div className="journey-panel">
                <div className="journey-frame">
                  {steps.map((step, index) => (
                    <figure
                      key={step.title}
                      className="journey-pic"
                      style={{ "--i": index, "--tint": tints[index % tints.length] } as CSSProperties}
                    >
                      <div className={`journey-pic-frame ${step.pictures.length > 1 && !step.pictures[0].only ? "journey-pair" : ""}`}>
                        {step.pictures.map((picture, position) => (
                          <CrmShot
                            key={position}
                            screen={picture.screen}
                            crop={picture.crop}
                            phoneCrop={picture.phoneCrop}
                            className={picture.only ? onlyClasses[picture.only] : ""}
                          />
                        ))}
                      </div>
                      <figcaption className="sr-only">{step.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="journey-langs text-body-sm text-ink-muted">Available in English, French and Spanish.</p>
      </div>
    </section>
  );
}
