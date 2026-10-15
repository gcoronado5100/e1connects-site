import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { GOOGLE_USER_DATA_POLICY_URL, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, stores and shares information, including the data of connected Google and Microsoft mailboxes.`,
  alternates: { canonical: "/privacy" },
};

/**
 * The privacy policy. Google and Microsoft read it when they review the app:
 * the section on connected mailboxes must always describe what the CRM
 * really does with that data, so a change to the email integration that
 * touches what is read, kept or shown changes this page too.
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function PrivacyPage() {
  const { operator, address, contactEmail, effective } = site.legal;

  return (
    <LegalPage title="Privacy Policy" effective={effective}>
      <p>
        {site.name} is a customer relationship management service (a CRM) for car dealerships, operated by {operator}{" "}
        (“we”, “us”). This policy explains what information we collect, what we do with it, who can see it and the
        choices you have. It covers this website ({site.url}) and the {site.name} application ({site.appUrl}).
      </p>

      <h2>1. Who this policy is about</h2>
      <p>Two groups of people have information in {site.name}:</p>
      <ul>
        <li>
          <strong>Users</strong>: the people of a dealership who sign in to {site.name} with an account their
          dealership gave them.
        </li>
        <li>
          <strong>Customers of a dealership</strong>: the people a dealership is in contact with (its leads and
          contacts), whose information the dealership keeps in {site.name}.
        </li>
      </ul>
      <p>
        For the information about its own customers, the dealership decides what is collected and why, and we handle
        it on the dealership’s behalf and on its instructions. If you are a customer of a dealership and have a
        question about your information, the dealership is the right place to ask first; you may also write to us and
        we will pass your request on.
      </p>

      <h2>2. Information we collect</h2>
      <h3>About users</h3>
      <ul>
        <li>Account details: name, work email address, password (stored as a one-way hash), role and language.</li>
        <li>Preferences: notification choices and how the screens of the application are set up.</li>
        <li>
          Sign-in and security records: the devices and browsers an account is signed in from, the IP address with the
          approximate place it points to, and when.
        </li>
        <li>
          A record of the work done in the application (for example messages sent, calls made and stages changed),
          which the dealership sees in its activity reports.
        </li>
      </ul>
      <h3>About customers of a dealership</h3>
      <ul>
        <li>
          Contact details and what the person told the dealership: name, phone number, email address, the vehicle they
          are interested in and the answers they gave on the dealership’s forms.
        </li>
        <li>Text messages exchanged with the dealership, with their pictures and files.</li>
        <li>Calls: when they happened, their recordings, voicemail messages and the notes written from them.</li>
        <li>Emails exchanged with the dealership through a connected mailbox (see section 3).</li>
        <li>Notes, files and tasks the dealership’s team adds.</li>
      </ul>
      <h3>About visitors to this website</h3>
      <p>
        This website does not use advertising or tracking cookies and does not run analytics that identify you. Our
        hosting provider keeps standard server logs (such as IP address and the pages requested) for security and
        troubleshooting.
      </p>

      <h2>3. Connected mailboxes: Google and Microsoft account data</h2>
      <p>
        A user can connect their own Google (Gmail) or Microsoft (Outlook) mailbox to {site.name} to email their
        dealership’s leads and contacts from the application. Connecting is optional and is done by the user, on the
        provider’s own sign-in screen. This section describes exactly what we do with that access.
      </p>
      <h3>What we access</h3>
      <ul>
        <li>
          <strong>Your basic profile</strong> (name and email address), to know which mailbox was connected and to
          show it in your settings.
        </li>
        <li>
          <strong>Permission to send email</strong> on your behalf, used only to send the emails you write and send
          from {site.name}.
        </li>
        <li>
          <strong>Permission to read your mailbox</strong>, used only to find the emails that belong to a conversation
          with your dealership’s leads and contacts.
        </li>
      </ul>
      <h3>How we use it</h3>
      <p>
        We use this data only to provide the email features you see in {site.name}: sending the emails you write,
        showing a lead’s or contact’s emails on their record and in the inbox of the application, and telling you
        when one of them has written. We do not use it for any other purpose.
      </p>
      <h3>What we store</h3>
      <ul>
        <li>
          The access keys (tokens) the provider issues when you connect. They are stored encrypted and are used only
          by the application to act on your mailbox as described here.
        </li>
        <li>
          The emails that are part of a conversation with a lead or contact of your dealership: sender, recipients,
          subject, date and content. Mail that is not part of such a conversation is not stored.
        </li>
      </ul>
      <h3>Who can see it</h3>
      <ul>
        <li>You.</li>
        <li>
          The people of your own dealership whose role lets them see the team’s conversations (administrators and the
          account owner), because the emails are part of the dealership’s record of that customer.
        </li>
      </ul>
      <p>
        Our own staff do not read the content of your emails unless you ask us to look at specific messages (for
        example, when you request support), it is necessary for security purposes such as investigating abuse or a
        fault, or the law requires it.
      </p>
      <h3>What we never do with it</h3>
      <ul>
        <li>We do not sell it.</li>
        <li>We do not use it for advertising, including personalized or retargeted advertising.</li>
        <li>We do not use it to develop, improve or train artificial intelligence or machine learning models.</li>
        <li>We do not send the content of your emails to artificial intelligence providers.</li>
        <li>
          We do not transfer it to anyone else, except to the service providers that host {site.name} for us (section
          6), when it is necessary for security, or when the law requires it.
        </li>
      </ul>
      <h3>Google API Services: Limited Use</h3>
      <p>
        {site.name}’s use and transfer to any other app of information received from Google APIs will adhere to the{" "}
        <a href={GOOGLE_USER_DATA_POLICY_URL}>Google API Services User Data Policy</a>, including the Limited Use
        requirements.
      </p>
      <h3>Disconnecting and deleting</h3>
      <ul>
        <li>
          You can disconnect your mailbox at any time in the application, under Settings → Email. Disconnecting
          withdraws the access with the provider and deletes the access keys we stored.
        </li>
        <li>
          You can also withdraw the access from your provider’s own account settings (for Google:{" "}
          <a href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</a>).
        </li>
        <li>
          Emails already filed on a lead or contact stay in the dealership’s records after you disconnect. To have
          them deleted, write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>; we delete them within 30 days
          unless the law requires us to keep them.
        </li>
      </ul>

      <h2>4. How we use information</h2>
      <ul>
        <li>To provide the service: show, send and organize the conversations and records of a dealership.</li>
        <li>To keep accounts and data secure, and to investigate faults and abuse.</li>
        <li>To send the notifications a user asked for, and messages about their account (such as sign-in codes).</li>
        <li>To answer requests for support.</li>
      </ul>
      <p>We do not sell personal information, and we do not use it for advertising.</p>

      <h2>5. Artificial intelligence features</h2>
      <p>
        {site.name} includes an assistant that answers a dealership’s leads by text message, and notes written
        automatically from calls. To produce them, the text messages of the conversation and the transcript of the
        call are processed by an artificial intelligence provider acting on our instructions. The emails of connected
        mailboxes are not part of this (section 3).
      </p>

      <h2>6. Service providers</h2>
      <p>
        We rely on other companies to run {site.name}. They process information only to provide their service to us,
        under contract:
      </p>
      <ul>
        <li>Twilio: text messages and calls.</li>
        <li>OpenAI: the assistant’s replies and the notes written from calls.</li>
        <li>Amazon Web Services: backups, stored in Canada.</li>
        <li>Pusher: live updates of the screens of the application.</li>
        <li>DeepL: translation of messages.</li>
        <li>Google and Microsoft: the mailbox a user chooses to connect.</li>
        <li>Our hosting provider: the servers the application runs on.</li>
      </ul>
      <p>
        These providers may process information in Canada, the United States and other countries. We also disclose
        information when the law requires it.
      </p>

      <h2>7. How we protect information</h2>
      <ul>
        <li>The application is reached over an encrypted connection.</li>
        <li>The access keys of connected mailboxes are stored encrypted.</li>
        <li>The data of one dealership is kept apart from every other dealership’s.</li>
        <li>Access depends on a person’s role, and each user can review and close their own sessions.</li>
        <li>The database is backed up daily and a copy is kept away from the main server.</li>
      </ul>
      <p>No system is perfectly secure. If a breach affects your information, we will tell you as the law requires.</p>

      <h2>8. How long we keep information</h2>
      <p>
        We keep information for as long as the dealership’s account is active. When a dealership stops using{" "}
        {site.name}, or asks us to, we delete its information, except what the law requires us to keep and what
        remains in backups until they expire.
      </p>

      <h2>9. Your choices and rights</h2>
      <p>
        Depending on where you live, you may have the right to see the information held about you, to have it
        corrected or deleted, and to withdraw a consent you gave. Users can change their own details in the
        application and can write to us for anything else. Customers of a dealership should ask the dealership, or
        write to us and we will pass the request on.
      </p>

      <h2>10. Children</h2>
      <p>{site.name} is a tool for businesses. It is not directed to children and we do not knowingly collect their information.</p>

      <h2>11. Changes to this policy</h2>
      <p>
        When we change this policy we publish the new text here with its date. If a change affects how we use the data
        of connected mailboxes, we will tell the users concerned and ask for their consent where it is required before
        the change applies to them.
      </p>

      <h2>12. Contact</h2>
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
