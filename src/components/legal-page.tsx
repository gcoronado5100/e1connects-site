import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  /** The day the text took effect (YYYY-MM-DD). */
  effective: string;
  children: ReactNode;
}

/**
 * The day a policy took effect, written out ("October 13, 2026"). Built from
 * the parts of the date so the reader's time zone never moves it a day.
 *
 * @author Gabriel Coronado
 * @since main
 */
function writtenDate(effective: string): string {
  const [year, month, day] = effective.split("-").map(Number);

  return new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(
    Date.UTC(year, month - 1, day),
  );
}

/**
 * A page of legal text (privacy policy, terms): a title, the day it took
 * effect and the text, set for reading. Headings and lists inside it are
 * plain `h2` / `h3` / `p` / `ul`, styled by `.legal-text` in `globals.css`.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function LegalPage({ title, effective, children }: LegalPageProps) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-zinc-500">
        Effective <time dateTime={effective}>{writtenDate(effective)}</time>
      </p>

      <div className="legal-text mt-10 text-base leading-7 text-zinc-700">{children}</div>
    </article>
  );
}
