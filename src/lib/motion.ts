/**
 * Central motion configuration for the site.
 *
 * All animation values live here so the entire motion language stays
 * consistent and can be tuned in a single place.
 *
 * Design intent: premium, restrained, professional.
 * Soft fade-ups, short durations, gentle stagger — nothing dramatic.
 */

import type { Transition, Variants } from "framer-motion";

// ─── Easing ──────────────────────────────────────────────────────────────────

/** Smooth ease-out — natural deceleration, no bounce. */
export const EASE_OUT_SMOOTH = [0.22, 0.46, 0.42, 0.94] as const;

// ─── Durations (seconds) ─────────────────────────────────────────────────────

export const DURATION = {
  /** Micro-interactions, hover feedback */
  fast: 0.25,
  /** Default element reveal */
  base: 0.65,
  /** Full-section fade-in */
  section: 0.85,
} as const;

// ─── Stagger ─────────────────────────────────────────────────────────────────

/** Delay between staggered children — elegant, not mechanical. */
export const STAGGER_CHILDREN = 0.09;

/** Small initial delay before the first child begins. */
export const STAGGER_DELAY = 0.05;

// ─── Fade-up offset ──────────────────────────────────────────────────────────

/** Y translation for fade-up reveals — subtle, not dramatic (px). */
export const FADE_UP_OFFSET = 20;

// ─── Viewport settings ───────────────────────────────────────────────────────

/**
 * Shared viewport trigger config used in `whileInView`.
 * `once: true`  — each element animates exactly once.
 * `margin`      — fires before the element fully enters the viewport,
 *                 so the reveal feels responsive, not late.
 */
export const VIEWPORT = {
  once: true,
  margin: "-60px",
} as const;

// ─── Reusable variant sets ────────────────────────────────────────────────────

/**
 * Section-level fade-in.
 * Used by SectionReveal to bring in the whole section container.
 */
export const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: DURATION.section,
      ease: EASE_OUT_SMOOTH,
    } as Transition,
  },
};

/**
 * Stagger container — orchestrates the cascade of child animations.
 * Has no visual style of its own; it only controls timing.
 */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: STAGGER_DELAY,
    } as Transition,
  },
};

/**
 * Individual fade-up item — the primary building block.
 * Opacity + small upward translation, nothing more.
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: FADE_UP_OFFSET,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE_OUT_SMOOTH,
    } as Transition,
  },
};

/**
 * Instant (no-op) variants used when the user prefers reduced motion.
 * Preserves component structure while removing all movement and delay.
 */
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const reducedMotionContainerVariants: Variants = {
  hidden: {},
  visible: {},
};

// ─── Transition builder ───────────────────────────────────────────────────────

/**
 * Builds a complete fade-up transition with an optional delay.
 * Use this in FadeUpItem when you need explicit sequential ordering
 * (e.g. heading at delay 0, subtitle at delay 0.12, cards at delay 0.28).
 *
 * Always includes duration + easing so they are never lost when delay is set.
 */
export function fadeUpTransition(opts?: { delay?: number; duration?: number }): Transition {
  return {
    duration: opts?.duration ?? DURATION.base,
    ease: EASE_OUT_SMOOTH,
    ...(opts?.delay !== undefined && { delay: opts.delay }),
  };
}
