import { CrmShot } from "@/components/crm-shot";
import { mobileLogin } from "@/components/crm-shots/screens.generated";
import { PillLink } from "@/components/pill-link";
import { site } from "@/config/site";
import "@/components/closing-band.css";

/**
 * The closing band of the home page, for someone whose dealership already uses the CRM. It answers
 * the hero: there the record rises out of the navy band into the page; here the CRM's own sign-in
 * card, where "Log in" leads, rises out of the page into the band, under the hero's light.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function ClosingBand() {
  return (
    <section className="closing-band bg-navy text-white">
      <div className="mx-auto grid w-full max-w-page grid-cols-1 gap-x-6 px-6 md:grid-cols-12">
        <div className="closing-copy">
          <h2 className="text-heading-md text-balance md:text-heading-lg lg:text-heading-xl">
            Your dealership already uses {site.name}?
          </h2>
          <p className="mt-4 mb-8 text-body-lg text-on-navy-soft">Sign in with the account your administrator gave you.</p>
          <PillLink href={site.appUrl} className="focus-visible:outline-primary-bright max-md:w-full">
            Log in
          </PillLink>
        </div>
        <figure className="closing-shot">
          <CrmShot screen={mobileLogin} crop={[25, 233, 340, 378]} />
          <figcaption className="sr-only">The sign-in of the CRM, with an email, a password and a Login button.</figcaption>
        </figure>
      </div>
    </section>
  );
}
