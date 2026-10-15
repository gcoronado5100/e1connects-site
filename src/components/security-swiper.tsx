"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";

/** One card of the row: its title (for the segment's label), its tint and what it shows. */
export interface SwiperCard {
  title: string;
  tint: string;
  content: ReactNode;
}

interface SecuritySwiperProps {
  heading: ReactNode;
  /** The accessible name of the row. */
  label: string;
  cards: SwiperCard[];
}

/** How long each card shows before the next one comes, in ms (the segments' fill lasts as long). */
const INTERVAL = 5000;

type PauseReason = "hover" | "focus" | "offscreen";

const STILL_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeToNothing = () => () => {};

function subscribeToStill(onChange: () => void) {
  const query = window.matchMedia(STILL_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A row of cards that plays by itself and never ends. The server renders the heading and the cards
 * once, and without JavaScript the row simply scrolls. Once mounted, it adds a copy of the cards
 * before and after (hidden from assistive technology) and keeps the row in the middle set, jumping
 * unseen whenever it settles in a copy; the controls (pause, previous, next) and four segments that
 * fill while their card shows appear only then. A card comes every 5s; the row stops while the
 * pointer is on it, while anything in it has keyboard focus, while it is off screen, when the pause
 * button is pressed (WCAG 2.2.2), and from the start for anyone who asked for reduced motion.
 *
 * @author Gabriel Coronado
 * @since main
 */
export function SecuritySwiper({ heading, label, cards }: SecuritySwiperProps) {
  const n = cards.length;
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  // False in the server's HTML and while hydrating, true from the render after.
  const ready = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  const still = useSyncExternalStore(subscribeToStill, () => window.matchMedia(STILL_QUERY).matches, () => false);
  // The visitor's choice on the pause button, once made; until then the row plays unless they asked for reduced motion.
  const [choice, setChoice] = useState<"play" | "pause" | null>(null);
  const [current, setCurrent] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reasons, setReasons] = useState<Set<PauseReason>>(() => new Set());
  const currentRef = useRef(0);

  const setReason = useCallback((reason: PauseReason, on: boolean) => {
    setReasons((previous) => {
      if (previous.has(reason) === on) return previous;
      const next = new Set(previous);
      if (on) next.add(reason);
      else next.delete(reason);
      return next;
    });
  }, []);

  const step = useCallback(() => {
    const items = track.current?.children;
    return items && items.length > 1 ? (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft : 0;
  }, []);

  const index = useCallback(() => {
    const width = step();
    return width && track.current ? Math.round(track.current.scrollLeft / width) : 0;
  }, [step]);

  /** Moves without animation, so the jump between a copy and the middle set is never seen. */
  const jumpTo = useCallback((left: number) => {
    const element = track.current;
    if (!element) return;
    element.classList.add("is-jumping");
    element.scrollLeft = left;
    requestAnimationFrame(() => element.classList.remove("is-jumping"));
  }, []);

  const go = useCallback((k: number) => {
    const instant = window.matchMedia(STILL_QUERY).matches;
    track.current?.scrollTo({ left: k * step(), behavior: instant ? "instant" : "smooth" });
  }, [step]);

  const show = useCallback((k: number) => {
    const next = ((k % n) + n) % n;
    currentRef.current = next;
    setCurrent(next);
    setCycle((value) => value + 1);
  }, [n]);

  // With the copies in place, start in the middle set, before the first paint.
  useLayoutEffect(() => {
    if (ready) jumpTo((n + currentRef.current) * step());
  }, [ready, n, jumpTo, step]);

  useEffect(() => {
    const element = track.current;
    const wrapper = root.current;
    if (!ready || !element || !wrapper) return;

    let settleTimer = 0;
    const settle = () => {
      const k = index();
      if (k < n) jumpTo((k + n) * step());
      else if (k >= 2 * n) jumpTo((k - n) * step());
      if (((k % n) + n) % n !== currentRef.current) show(k);
    };
    const onScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 140);
    };
    const onResize = () => jumpTo((n + currentRef.current) * step());

    // With a mouse, the row can also be dragged; it lands on the nearest card.
    let drag: { x: number; left: number } | null = null;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      drag = { x: event.clientX, left: element.scrollLeft };
      element.classList.add("is-dragging");
    };
    const onPointerMove = (event: PointerEvent) => {
      if (drag) element.scrollLeft = drag.left - (event.clientX - drag.x);
    };
    const onPointerUp = () => {
      if (!drag) return;
      drag = null;
      element.classList.remove("is-dragging");
      go(index());
    };
    const onEnter = () => setReason("hover", true);
    const onLeave = () => setReason("hover", false);
    // Keyboard focus stops the row; a click on an arrow does not keep it stopped.
    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      setReason("focus", target.matches(":focus-visible") && !target.closest("[data-pause]"));
    };
    const onFocusOut = () => setReason("focus", false);
    const observer = new IntersectionObserver(([entry]) => setReason("offscreen", !entry.isIntersecting), { threshold: 0.5 });

    element.addEventListener("scroll", onScroll, { passive: true });
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);
    wrapper.addEventListener("focusin", onFocusIn);
    wrapper.addEventListener("focusout", onFocusOut);
    observer.observe(element);

    return () => {
      window.clearTimeout(settleTimer);
      element.removeEventListener("scroll", onScroll);
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      wrapper.removeEventListener("focusin", onFocusIn);
      wrapper.removeEventListener("focusout", onFocusOut);
      observer.disconnect();
    };
  }, [ready, n, index, jumpTo, show, step, go, setReason]);

  const userPaused = choice ? choice === "pause" : still;
  // The real cards keep the keys they had in the server's HTML, so hydration keeps their DOM; the copies go around them.
  const item = (card: SwiperCard, position: number, set: "before" | "card" | "after") => (
    <li
      key={`${set}-${position}`}
      className="sec-card"
      style={{ "--tint": card.tint, "--i": position } as CSSProperties}
      aria-hidden={set !== "card" || undefined}
      inert={set !== "card" || undefined}
    >
      {card.content}
    </li>
  );

  return (
    <div ref={root} className="sec-swiper" data-paused={userPaused || reasons.size > 0 || undefined}>
      <div className="sec-head">
        {heading}
        {ready ? (
          <div className="sec-nav">
            <button type="button" className="sec-btn" data-pause aria-label={userPaused ? "Play the cards" : "Pause the cards"} onClick={() => setChoice(userPaused ? "play" : "pause")}>
              {userPaused ? (
                <svg viewBox="0 0 24 24" aria-hidden className="sec-btn-fill">
                  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden className="sec-btn-fill">
                  <rect x="14" y="3" width="5" height="18" rx="1" />
                  <rect x="5" y="3" width="5" height="18" rx="1" />
                </svg>
              )}
            </button>
            <button type="button" className="sec-btn sec-btn-step" aria-label="Previous card" onClick={() => go(index() - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" className="sec-btn sec-btn-step" aria-label="Next card" onClick={() => go(index() + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
        ) : null}
      </div>

      <ul ref={track} className="sec-track" tabIndex={0} aria-label={label}>
        {ready ? cards.map((card, position) => item(card, position, "before")) : null}
        {cards.map((card, position) => item(card, position, "card"))}
        {ready ? cards.map((card, position) => item(card, position, "after")) : null}
      </ul>

      {ready ? (
        <div className="sec-segs">
          {cards.map((card, position) => (
            <button
              key={position === current ? `on-${cycle}` : `seg-${position}`}
              type="button"
              className={`sec-seg ${position === current ? "is-on" : ""} ${position < current ? "is-done" : ""}`}
              aria-label={`Show card ${position + 1} of ${n}: ${card.title}`}
              onClick={() => go(n + position)}
              onAnimationEnd={() => go(index() + 1)}
              style={{ "--interval": `${INTERVAL}ms` } as CSSProperties}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
