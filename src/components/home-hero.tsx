import { CrmShot } from "@/components/crm-shot";
import { contactRecord, mobileChat } from "@/components/crm-shots/screens.generated";
import { PillLink } from "@/components/pill-link";
import { site } from "@/config/site";
import "@/components/home-hero.css";

/**
 * How one lead's day reaches a dealership without a CRM: the same events the record below
 * gathers, scattered over four channels. Illustration, not screens of the CRM. `order` is the
 * order of their times, the order in which they arrive on the page.
 */
const notices = [
  {
    channel: "Mail",
    order: 0,
    time: "9:36 AM",
    title: "New submission: Get Pre-Approved",
    body: "Form on Main site · Marcus Ellery",
    place: "left-0 top-2 w-[230px] -rotate-3 md:top-6 md:w-[220px] lg:w-[250px]",
  },
  {
    channel: "Phone",
    order: 2,
    time: "9:51 AM",
    title: "Missed call",
    body: "(902) 555-0142",
    place: "right-0 top-[118px] w-[200px] rotate-2 md:right-auto md:left-[36%] md:top-[84px] md:w-[220px] lg:left-[27%] lg:w-[250px]",
  },
  {
    channel: "Messages",
    order: 1,
    time: "9:42 AM",
    title: "(902) 555-0142",
    bubble: "Is the 2021 Civic still available?",
    place: "hidden -rotate-[1.5deg] md:right-0 md:top-4 md:block md:w-[220px] lg:right-auto lg:left-[53%] lg:w-[250px]",
  },
  {
    channel: "Note",
    order: 3,
    title: "Call Marcus back",
    body: "Trade-in? Wants financing.",
    place: "hidden rotate-3 bg-tint-sky lg:right-0 lg:top-[92px] lg:block lg:w-[250px]",
  },
];

/**
 * The opening of the home page: a lead's scattered day above the headline, and the same lead's
 * real record in the CRM rising out of the band into the section below. The record is the CRM's
 * contact screen on desktop and its phone chat screen on small screens. The notices and the record
 * enter and leave with the scroll (home-hero.css, driven by HomeMotion); the text never moves.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function HomeHero() {
  return (
    <>
      <section className="relative flow-root bg-navy bg-[radial-gradient(60%_70%_at_50%_0%,rgb(20_99_255/0.3),transparent_70%)] pt-6 text-white md:pt-10">
        <div className="mx-auto w-full max-w-page px-6">
          <div aria-hidden className="relative h-[212px] md:h-[190px]">
            {notices.map((notice) => (
              <div
                key={notice.channel}
                data-order={notice.order}
                className={`hero-notice absolute rounded-xl bg-surface px-4 py-3.5 text-body-sm text-ink ${notice.place}`}
              >
                <div className="mb-1 flex justify-between text-caption text-ink-soft">
                  <span>{notice.channel}</span>
                  {notice.time ? <span>{notice.time}</span> : null}
                </div>
                <p className="font-semibold">{notice.title}</p>
                {notice.body ? <p>{notice.body}</p> : null}
                {notice.bubble ? <p className="mt-1.5 inline-block rounded-xl bg-canvas px-3 py-2">{notice.bubble}</p> : null}
              </div>
            ))}
          </div>

          <h1 className="mt-8 max-w-[1100px] text-heading-lg text-balance md:mt-12 md:text-heading-xl lg:text-display">
            Every lead, from the form on your website to the sale.
          </h1>

          <div className="mt-6 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <p className="max-w-2xl text-body-lg text-on-navy-soft">
              {site.name} brings the leads of your website, your contacts and your sales pipeline together with text
              messages, calls and email, so your team works every deal from a single screen.
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
              <PillLink href={site.appUrl} className="focus-visible:outline-primary-bright">
                Log in
              </PillLink>
              <PillLink href="/#product" variant="on-navy" className="focus-visible:outline-primary-bright">
                See what it does
              </PillLink>
            </div>
          </div>

          <figure className="hero-record relative z-10 mt-12 -mb-40 rounded-3xl border border-line bg-surface p-3 md:mt-16 md:-mb-[200px]">
            <CrmShot screen={contactRecord} crop={[0, 0, 1184, 420]} className="hidden rounded-xl md:block" />
            <CrmShot screen={mobileChat} crop={[0, 72, 390, 612]} className="rounded-xl md:hidden" />
            <figcaption className="sr-only">
              A lead&apos;s record in {site.name}, where his text messages with Chloe, his calls, the changes of stage
              and the form he sent from the website sit in one place.
            </figcaption>
          </figure>
        </div>
      </section>
      <div aria-hidden className="h-40 md:h-[200px]" />
    </>
  );
}
