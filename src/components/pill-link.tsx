import Link from "next/link";
import type { ReactNode } from "react";

type PillVariant = "primary" | "on-navy" | "secondary";
type PillSize = "default" | "compact";

const variants: Record<PillVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed",
  "on-navy": "border border-white/20 text-white hover:bg-white/10",
  secondary: "border border-ink-soft text-ink hover:bg-tint-blue",
};

const sizes: Record<PillSize, string> = {
  default: "h-12 px-6 text-base",
  compact: "h-11 px-5 text-sm",
};

interface PillLinkProps {
  href: string;
  variant?: PillVariant;
  size?: PillSize;
  className?: string;
  children: ReactNode;
}

/**
 * A link drawn as a pill button (DESIGN.md › Buttons): primary for the one main action,
 * on-navy for a second action on a navy band, secondary for a second action on a light surface.
 * Paths and anchors on this site go through `next/link`; anything else, such as the CRM's
 * sign-in, is a plain anchor. A pressed pill settles to 98% (DESIGN.md › Focus and Motion).
 *
 * @author Gabriel Coronado
 * @since main
 */
export function PillLink({ href, variant = "primary", size = "default", className = "", children }: PillLinkProps) {
  const classes = `inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold leading-none transition-[color,background-color,border-color,scale] duration-150 motion-safe:active:scale-98 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes}>
      {children}
    </a>
  );
}
