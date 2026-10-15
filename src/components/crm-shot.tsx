import type { CSSProperties } from "react";
import type { CrmScreen } from "@/components/crm-shots/screens.generated";
import "@/components/crm-shots/screens.generated.css";

/** A window on a screen, in the screen's own pixels: x, y, width, height. */
export type CrmCrop = readonly [x: number, y: number, width: number, height: number];

interface CrmShotProps {
  screen: CrmScreen;
  /** The part of the screen to show. */
  crop: CrmCrop;
  /** A different part to show below the `md` breakpoint, where the first would be too small to read. */
  phoneCrop?: CrmCrop;
  className?: string;
}

/**
 * A picture of the CRM: one of its real screens, rendered from the design canvas by
 * `scripts/render-crm-screens.mjs`, cropped to a window and scaled to the width of its frame. It
 * is a picture, not a working interface, so it is hidden from assistive technology and cannot take
 * focus; the text around it says what it shows.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function CrmShot({ screen, crop, phoneCrop, className = "" }: CrmShotProps) {
  const [x, y, width, height] = crop;
  const style: Record<string, number> = { "--crm-w": screen.width, "--crop-x": x, "--crop-y": y, "--crop-w": width, "--crop-h": height };
  if (phoneCrop) {
    const [phoneX, phoneY, phoneWidth, phoneHeight] = phoneCrop;
    Object.assign(style, { "--phone-x": phoneX, "--phone-y": phoneY, "--phone-w": phoneWidth, "--phone-h": phoneHeight });
  }

  return (
    <div className={`crm-shot ${className}`} style={style as CSSProperties} data-phone-crop={phoneCrop ? "" : undefined} aria-hidden inert>
      <div className={screen.scope} dangerouslySetInnerHTML={{ __html: screen.html }} />
    </div>
  );
}
