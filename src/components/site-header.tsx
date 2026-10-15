import Image from "next/image";
import Link from "next/link";
import { PillLink } from "@/components/pill-link";
import { site } from "@/config/site";

const sections = [
  { href: "/#product", label: "Product" },
  { href: "/#email", label: "Email" },
  { href: "/#security", label: "Security" },
  { href: "/privacy", label: "Privacy" },
];

/**
 * The bar at the top of every page: the logo, the sections of the home page and the way into
 * the CRM. Below `md` it keeps only the logo and "Log in"; the footer carries the policy links.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-surface/85 backdrop-blur">
      <div className="mx-auto flex h-full w-full max-w-page items-center justify-between gap-8 px-6">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/full-logo-light.png"
            alt={site.name}
            width={182}
            height={32}
            preload
            className="h-7 w-auto md:h-8"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 text-body-sm font-medium text-ink-soft md:flex">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="transition-colors duration-150 hover:text-ink">
              {section.label}
            </Link>
          ))}
        </nav>

        <PillLink href={site.appUrl} size="compact">
          Log in
        </PillLink>
      </div>
    </header>
  );
}
