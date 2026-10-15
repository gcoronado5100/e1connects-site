import { ClosingBand } from "@/components/closing-band";
import { EmailSection } from "@/components/email-section";
import { HomeHero } from "@/components/home-hero";
import { HomeMotion } from "@/components/home-motion";
import { ProductJourney } from "@/components/product-journey";
import { SecuritySection } from "@/components/security-section";

/**
 * The home page: what Every1Connects is and does, how it works with a
 * connected Gmail or Outlook mailbox and how the data is looked after.
 *
 * @author Gabriel Coronado
 * @since main
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />

      <ProductJourney />

      <EmailSection />

      <SecuritySection />

      <ClosingBand />

      <HomeMotion />
    </>
  );
}
