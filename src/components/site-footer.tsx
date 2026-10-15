import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";

/**
 * The foot of every page: the logo, what the CRM is, and the links. The link to the privacy
 * policy lives here so that every page, the home page first, carries it.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex w-full max-w-page flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Image src="/brand/full-logo-light.png" alt={site.name} width={182} height={32} className="h-8 w-auto" />
          <p className="mt-4 text-body-sm text-ink-soft">{site.description}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3 text-body-sm text-ink-soft">
          <Link href="/privacy" className="transition-colors duration-150 hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors duration-150 hover:text-ink">
            Terms of Service
          </Link>
          <a href={site.appUrl} className="transition-colors duration-150 hover:text-ink">
            Log in
          </a>
          <a href={`mailto:${site.legal.contactEmail}`} className="transition-colors duration-150 hover:text-ink">
            {site.legal.contactEmail}
          </a>
        </nav>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-page px-6 py-6 text-caption text-ink-muted">© {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
