import type { Metadata } from "next";
import { CrmShot } from "@/components/crm-shot";
import { paletteNoResults } from "@/components/crm-shots/screens.generated";
import { HomeMotion } from "@/components/home-motion";
import { PillLink } from "@/components/pill-link";
import { site } from "@/config/site";
import "@/app/not-found.css";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * The page for any address the site does not have. Under the CRM's own search finding nothing, it
 * says the page does not exist and points to the home page and, for someone who typed an address
 * of the CRM here, to the CRM. Next.js answers it with a 404 status and keeps it out of search
 * results (`noindex`).
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function NotFound() {
  const appHost = new URL(site.appUrl).host;

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center md:py-24">
      <figure className="not-found-shot">
        <CrmShot screen={paletteNoResults} crop={[0, 0, 512, 118]} />
        <figcaption className="sr-only">The search of the CRM, finding nothing for what was typed.</figcaption>
      </figure>

      <p className="mt-10 text-body-sm font-semibold tracking-[0.06em] text-ink-muted uppercase md:mt-12">Error 404</p>
      <h1 className="mt-4 text-heading-lg text-balance text-ink md:text-heading-xl">This page does not exist</h1>
      <p className="mt-4 text-body-lg text-pretty text-ink-soft">
        The address may be mistyped, or the page may have moved. If you were looking for the CRM, it runs at{" "}
        <a href={site.appUrl} className="font-medium text-link underline decoration-1 underline-offset-4">
          {appHost}
        </a>
        .
      </p>

      <div className="mt-8 flex gap-3 max-md:w-full max-md:flex-col">
        <PillLink href="/">Go to the home page</PillLink>
        <PillLink href={site.appUrl} variant="secondary">
          Log in
        </PillLink>
      </div>

      <HomeMotion />
    </section>
  );
}
