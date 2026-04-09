import type { Variants } from "framer-motion";

/** easeOutExpo — snappy start, buttery settle */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Base transition duration */
export const DUR = 0.75;

/** Trigger when element is 100px into the viewport, only once */
export const viewport = { once: true, margin: "-100px 0px" } as const;

/** Fade up — default for most content elements */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: DUR, ease: EASE } },
};

/** Fade from left — left-column content in split layouts */
export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0,  transition: { duration: DUR, ease: EASE } },
};

/** Fade from right — right-column content in split layouts */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show:   { opacity: 1, x: 0,  transition: { duration: DUR, ease: EASE } },
};

/** Standard stagger — for sections with 3–6 children */
export const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

/** Fast stagger — for many small items (badges, links, icons) */
export const staggerFast: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

/** Builds a transition with optional delay — for explicit sequential ordering */
export function fadeUpTransition(opts?: { delay?: number; duration?: number }) {
  return {
    duration: opts?.duration ?? DUR,
    ease: EASE,
    ...(opts?.delay !== undefined && { delay: opts.delay }),
  };
}
