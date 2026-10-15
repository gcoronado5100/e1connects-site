"use client";

import { useLayoutEffect } from "react";

/** Height of the sticky site header (`h-16` in SiteHeader). */
const HEADER_HEIGHT = 64;

interface Box {
  top: number;
  bottom: number;
  height: number;
}

/**
 * Where an element sits in the viewport, read from its offset parent so that the element's own
 * entrance or exit movement does not count. Null when the element is not displayed.
 *
 * @author Gabriel Coronado
 * @since main
 */
function layoutBox(element: HTMLElement): Box | null {
  const parent = element.offsetParent;
  if (!parent) return null;
  const top = parent.getBoundingClientRect().top + element.offsetTop;
  return { top, bottom: top + element.offsetHeight, height: element.offsetHeight };
}

/**
 * Moves an element in or out of view, so that its exit is seen too. It enters once 45% of it (or a
 * third of the screen) is visible below the header, and leaves while it is still on screen: upward
 * once 30% of it is under the header (a tall one when its bottom edge reaches the top third), and
 * downward when its top edge reaches the bottom tenth. It comes back a little past those lines, so
 * it never flickers on one. While out, `is-out-up` records which side it is on, so it comes back
 * from there.
 *
 * @author Gabriel Coronado
 * @since main
 */
function judge(element: HTMLElement, delayFor: (element: HTMLElement) => number) {
  const box = layoutBox(element);
  if (!box) return;
  const band = window.innerHeight - HEADER_HEIGHT;
  const seen = Math.max(0, Math.min(box.bottom, window.innerHeight) - Math.max(box.top, HEADER_HEIGHT));
  const need = Math.min(box.height * 0.45, band * 0.35);
  const upLine = HEADER_HEIGHT + Math.min(band * 0.35, box.height * 0.7);
  const downLine = HEADER_HEIGHT + band * 0.9;
  const isIn = element.classList.contains("is-in");

  if (!isIn) {
    if (seen >= need && box.bottom > upLine + Math.min(40, box.height * 0.2) && box.top < downLine - 40) {
      element.style.setProperty("--delay", `${delayFor(element)}s`);
      element.classList.add("is-in");
      element.classList.remove("is-out-up");
    } else {
      element.classList.toggle("is-out-up", box.top + box.height / 2 < HEADER_HEIGHT + band / 2);
    }
  } else if (box.bottom < upLine || box.top > downLine) {
    element.classList.remove("is-in");
    element.classList.toggle("is-out-up", box.bottom < upLine);
  }
}

/**
 * The delays of the hero's entrance: the notices one after another in the order of their times,
 * 0.35s apart, then the record. On a return they come back quicker, 0.12s apart.
 *
 * @author Gabriel Coronado
 * @since main
 */
function heroDelays(notices: HTMLElement[], record: HTMLElement | null) {
  const entered = new WeakSet<HTMLElement>();
  return (element: HTMLElement) => {
    const shown = notices.filter((notice) => notice.offsetParent !== null);
    const first = !entered.has(element);
    entered.add(element);
    if (element === record) return first ? 0.3 + shown.length * 0.35 : 0;
    const position = shown.indexOf(element);
    if (position < 0) return 0;
    return first ? 0.3 + position * 0.35 : position * 0.12;
  };
}

/**
 * Drives the two layouts of the product section (product-journey.css). From `lg` up, story: the
 * step whose top has passed the pinned line is the current one; the window takes its screen, its
 * height and its tint, and the line beside the numbers reaches its number. Below `lg`, reveal: the
 * number of the last step whose picture has passed 80% of the screen is lit, and each picture
 * enters and leaves on its own.
 *
 * @author Gabriel Coronado
 * @since main
 */
function journeyController(journey: HTMLElement) {
  const list = journey.querySelector<HTMLElement>(".journey-steps");
  const frame = journey.querySelector<HTMLElement>(".journey-frame");
  const panel = journey.querySelector<HTMLElement>(".journey-panel");
  const steps = [...journey.querySelectorAll<HTMLElement>(".journey-step")];
  const pictures = [...journey.querySelectorAll<HTMLElement>(".journey-pic")];
  const wide = window.matchMedia("(min-width: 64rem)");
  let active = -1;
  let reached = -1;
  let pinTop = 0;

  // Story: make step i the current one.
  const show = (i: number) => {
    active = i;
    steps.forEach((step, k) => {
      step.classList.toggle("is-on", k === i);
      step.classList.toggle("is-done", k < i);
    });
    pictures.forEach((picture, k) => {
      picture.classList.toggle("is-on", k === i);
      picture.classList.toggle("is-before", k < i);
    });
    const frameHeight = pictures[i].offsetHeight + 26;
    if (frame) frame.style.height = `${frameHeight}px`;
    journey.style.setProperty("--panel-h", `${frameHeight + 64}px`);
    journey.style.setProperty("--stage-tint", pictures[i].style.getPropertyValue("--tint"));
  };

  const story = () => {
    if (!list || !journey.classList.contains("is-story")) return;
    // The line ends at the last number, wherever that number is pinned at the moment.
    const listTop = list.getBoundingClientRect().top;
    const lastPin = steps[steps.length - 1].querySelector<HTMLElement>(".journey-pin");
    const spine = lastPin ? lastPin.getBoundingClientRect().top - listTop : 0;
    journey.style.setProperty("--spine-length", `${spine}px`);
    journey.style.setProperty("--fill", `${Math.max(0, Math.min(spine, pinTop - listTop))}px`);
    let i = 0;
    steps.forEach((step, k) => {
      if (step.getBoundingClientRect().top < pinTop + window.innerHeight * 0.2) i = k;
    });
    if (i !== active) show(i);
  };

  const reveal = () => {
    if (!journey.classList.contains("is-reveal")) return;
    const line = window.innerHeight * 0.8;
    let r = -1;
    pictures.forEach((picture, k) => {
      if (picture.getBoundingClientRect().top < line) r = k;
    });
    if (r === reached) return;
    reached = r;
    steps.forEach((step, k) => {
      step.classList.toggle("is-on", k === r);
      step.classList.toggle("is-done", k < r);
    });
    if (r < 0) {
      journey.style.setProperty("--rail", "0px");
      return;
    }
    const top = journey.getBoundingClientRect().top;
    const center = (step: HTMLElement) => {
      const number = step.querySelector<HTMLElement>(".journey-num")?.getBoundingClientRect();
      return number ? number.top + number.height / 2 - top : 0;
    };
    journey.style.setProperty("--rail", `${center(steps[r]) - center(steps[0])}px`);
  };

  const measure = () => {
    pinTop = HEADER_HEIGHT + Math.round(window.innerHeight * 0.12);
    journey.style.setProperty("--pin-top", `${pinTop}px`);
    active = -1;
    story();
  };

  const setMode = () => {
    journey.classList.toggle("is-story", wide.matches);
    journey.classList.toggle("is-reveal", !wide.matches);
    active = -1;
    reached = -1;
    steps.forEach((step) => step.classList.remove("is-on", "is-done"));
    pictures.forEach((picture) => picture.classList.remove("is-on", "is-before", "is-in", "is-out-up"));
    panel?.classList.remove("is-in", "is-out-up");
    if (wide.matches) measure();
    else {
      if (frame) frame.style.height = "";
      reveal();
    }
  };

  return {
    wide,
    setMode,
    onScroll() {
      story();
      reveal();
    },
    onResize() {
      if (wide.matches) measure();
      else reveal();
    },
    /** The elements that enter and leave in the current layout. */
    moving(): HTMLElement[] {
      if (journey.classList.contains("is-story")) return panel ? [panel] : [];
      if (journey.classList.contains("is-reveal")) return pictures;
      return [];
    },
  };
}

/**
 * The motion of the home page: the hero's notices and record, the product section, the email
 * section's cards, pictures and Google block (email-section.css), the row of security cards
 * (security-section.css) and the sign-in card of the closing band (closing-band.css). The 404 page
 * renders it too, for its picture (not-found.css). It only
 * adds classes and custom properties to markup the server already rendered; every word is in the
 * HTML without it. Renders nothing.
 *
 * `data-motion` on `<html>` is set before the first paint by the script in the root layout; it is
 * set again here because React clears it when it remounts in development. `data-motion-ready`
 * stops the CSS fallback that shows everything if this script never runs.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function HomeMotion() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-motion", "");
    root.setAttribute("data-motion-ready", "");

    const notices = [...document.querySelectorAll<HTMLElement>(".hero-notice")].sort(
      (a, b) => Number(a.dataset.order) - Number(b.dataset.order),
    );
    const record = document.querySelector<HTMLElement>(".hero-record");
    const delayFor = heroDelays(notices, record);
    const journeyElement = document.querySelector<HTMLElement>("[data-journey]");
    const journey = journeyElement ? journeyController(journeyElement) : null;
    const emailParts = [...document.querySelectorAll<HTMLElement>(".email-card, .email-panel, .email-callout")];
    // The security cards and the closing band's sign-in card; on the 404 page, its picture.
    const closingParts = [...document.querySelectorAll<HTMLElement>(".sec-track, .closing-shot, .not-found-shot")];

    const judgeAll = () => {
      [...notices, ...(record ? [record] : []), ...(journey ? journey.moving() : []), ...emailParts, ...closingParts].forEach(
        (element) => judge(element, delayFor),
      );
    };

    let queued = false;
    const onScroll = () => {
      journey?.onScroll();
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        judgeAll();
      });
    };
    const onResize = () => {
      journey?.onResize();
      judgeAll();
    };
    const onModeChange = () => {
      journey?.setMode();
      judgeAll();
    };

    journey?.setMode();
    judgeAll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    journey?.wide.addEventListener("change", onModeChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      journey?.wide.removeEventListener("change", onModeChange);
      root.removeAttribute("data-motion-ready");
    };
  }, []);

  return null;
}
