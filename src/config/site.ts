/**
 * Everything the pages say about who we are and where things live, in one
 * place: the name, the public addresses and the details the legal pages quote.
 *
 * The name must read the same here, on the sign-in screens of Google and
 * Microsoft and inside the CRM: the providers compare them when they review
 * the app.
 */
export const site = {
  name: "Every1Connects",
  tagline: "The CRM for car dealerships",
  description:
    "Every1Connects is the CRM for car dealerships: website leads, contacts, the sales pipeline, text messages, calls and email in one place.",

  /** This site. */
  url: "https://e1dconnect.cloud",
  /** Where customers sign in. */
  appUrl: "https://app.e1dconnect.cloud",

  /**
   * Quoted by the privacy policy and the terms. The values in brackets are
   * not decided yet: the pages must not go live while one of them is left.
   */
  legal: {
    /** The company that runs the service and signs the policies. */
    operator: "[LEGAL NAME OF THE COMPANY]",
    /** Its mailing address. */
    address: "[MAILING ADDRESS]",
    /** Where privacy requests and questions are answered. */
    contactEmail: "[CONTACT E-MAIL]",
    /** The law the terms are read under. */
    governingLaw: "[PROVINCE / COUNTRY]",
    /** The day the current text of the policies took effect (YYYY-MM-DD). */
    effective: "2026-10-13",
  },
} as const;

/** Google's policy for apps that read Google user data, linked from the pages that mention it. */
export const GOOGLE_USER_DATA_POLICY_URL =
  "https://developers.google.com/terms/api-services-user-data-policy";
