"use client";

/**
 * FadeUpItem
 *
 * The primary motion building block. Renders a single element that fades in
 * with a subtle upward translation.
 *
 * Two usage modes:
 *
 * 1. Inside <StaggerContainer> — inherit timing from the parent:
 *    <StaggerContainer>
 *      <FadeUpItem><p>First</p></FadeUpItem>
 *      <FadeUpItem><p>Second</p></FadeUpItem>
 *    </StaggerContainer>
 *
 * 2. Standalone — self-triggers on scroll with an optional delay:
 *    <FadeUpItem standalone delay={0.12}>
 *      <h2>Heading</h2>
 *    </FadeUpItem>
 *
 *    Use `delay` to create explicit choreography sequences in full-viewport
 *    sections where all elements enter the viewport simultaneously.
 *
 * Automatically respects `prefers-reduced-motion`.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  fadeUpVariants,
  fadeUpTransition,
  reducedMotionVariants,
  VIEWPORT,
} from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

interface FadeUpItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, the item self-triggers on scroll instead of inheriting
   * timing from a parent StaggerContainer.
   */
  standalone?: boolean;
  /**
   * Optional delay in seconds. Use to sequence elements explicitly
   * when they all enter the viewport at the same time (full-viewport sections).
   * Preserves easing and duration — never lost when delay is set.
   */
  delay?: number;
  /**
   * Optional duration override in seconds.
   * Useful when a group of items (e.g. cards) should reveal more slowly
   * than the default without changing the global base duration.
   */
  duration?: number;
}

export default function FadeUpItem({
  children,
  className,
  standalone = false,
  delay,
  duration,
  ...rest
}: FadeUpItemProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedMotionVariants : fadeUpVariants;

  // Build the resolved transition: reduced-motion wins, then any overrides, then variant default.
  const hasOverride = delay !== undefined || duration !== undefined;
  const resolvedTransition = prefersReduced
    ? { duration: 0 }
    : hasOverride
    ? fadeUpTransition({ delay, duration })
    : undefined; // undefined → Framer Motion falls back to the variant's own transition

  const viewportProps = standalone
    ? { initial: "hidden", whileInView: "visible", viewport: VIEWPORT }
    : {};

  return (
    <motion.div
      className={className}
      variants={variants}
      transition={resolvedTransition}
      {...viewportProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
