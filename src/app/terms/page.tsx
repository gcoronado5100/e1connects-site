import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to the use of ${site.name}.`,
  alternates: { canonical: "/terms" },
};

/**
 * The terms of service: who may use Every1Connects, what the dealership is
 * responsible for and what we are responsible for.
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function TermsPage() {
  const { operator, address, contactEmail, governingLaw, effective } = site.legal;

  return (
    <LegalPage title="Terms of Service" effective={effective}>
      <p>
        These terms apply to the use of {site.name}, a customer relationship management service for car dealerships
        operated by {operator} (“we”, “us”). By using {site.name} you accept them. If your dealership has a signed
        agreement with us, that agreement comes first where the two differ.
      </p>

      <h2>1. The service</h2>
      <p>
        {site.name} lets a dealership receive the leads of its website, keep its contacts and sales pipeline, and
        talk to its customers by text message, phone and email from one application. We may add, change or remove
        features over time.
      </p>

      <h2>2. Accounts</h2>
      <ul>
        <li>Accounts are created by a dealership for the people who work with it. There is no public sign-up.</li>
        <li>Each account is for one person. Keep your password to yourself and tell your administrator if you think someone else has used your account.</li>
        <li>The dealership decides who has an account and what each person may see and do, and is responsible for what is done under its accounts.</li>
      </ul>

      <h2>3. The dealership’s data</h2>
      <p>
        The information a dealership puts into {site.name} or receives through it, including the information about its
        customers, belongs to the dealership. We use it only to provide the service, as described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. The dealership is responsible for having the right to collect and
        use that information.
      </p>

      <h2>4. Messages and calls</h2>
      <p>
        The dealership is the sender of the text messages, calls and emails that leave {site.name} under its name, and
        is responsible for following the laws that apply to them, including:
      </p>
      <ul>
        <li>having the consent the law requires before contacting a person, and honouring a request to stop;</li>
        <li>identifying itself in its messages and calls;</li>
        <li>respecting the hours and the rules that apply to calls and to recorded calls where its customers live.</li>
      </ul>
      <p>
        {site.name} includes tools that help with this, such as stopping messages to a person who has asked not to be
        contacted. They do not replace the dealership’s own responsibility.
      </p>

      <h2>5. Connected mailboxes</h2>
      <p>
        A user may connect their own Google or Microsoft mailbox to send and receive email with the dealership’s leads
        and contacts. Connecting is optional and can be undone at any time. What we do with that access is described in
        section 3 of the <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>use {site.name} to send unlawful, deceptive or harassing messages, or messages to people who have not agreed to receive them where consent is required;</li>
        <li>try to reach the data of another dealership, or to get around the security of the service;</li>
        <li>copy, resell or reverse engineer the service;</li>
        <li>use the service in a way that harms it or the people who use it.</li>
      </ul>

      <h2>7. Services of other companies</h2>
      <p>
        {site.name} works with services run by other companies, such as telephone carriers and email providers. Their
        own terms apply to them, and we are not responsible for interruptions or changes on their side.
      </p>

      <h2>8. The assistant</h2>
      <p>
        The replies of the assistant and the notes written automatically from calls are produced by artificial
        intelligence and can contain mistakes. The dealership decides how they are used and should review anything
        that matters before acting on it.
      </p>

      <h2>9. Availability</h2>
      <p>
        We work to keep {site.name} available and to protect the data in it, but we do not promise that it will run
        without interruption or error. We may suspend the service for maintenance or to deal with a security risk.
      </p>

      <h2>10. Suspension and end of use</h2>
      <p>
        We may suspend an account that breaks these terms or puts the service or other people at risk. A dealership may
        stop using {site.name} at any time. When it does, we delete its data as described in the Privacy Policy.
      </p>

      <h2>11. Liability</h2>
      <p>
        To the extent the law allows, {site.name} is provided as it is, without warranties of any kind, and we are not
        liable for indirect or consequential losses, or for loss of profits, revenue or data arising from the use of
        the service.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        When we change these terms we publish the new text here with its date. Continuing to use {site.name} after a
        change means you accept the new terms.
      </p>

      <h2>13. Governing law</h2>
      <p>These terms are governed by the laws of {governingLaw}.</p>

      <h2>14. Contact</h2>
      <p>
        {operator}
        <br />
        {address}
        <br />
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>
    </LegalPage>
  );
}
