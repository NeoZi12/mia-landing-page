"use client";

/**
 * StaggerContainer
 *
 * Orchestrates a staggered cascade of child animations.
 * Pair with <FadeUpItem> children — this component has no visual style
 * of its own; it only controls timing.
 *
 * When this container enters the viewport, it fires `visible` on itself
 * and propagates the variant change to all direct children in sequence.
 *
 * Use `delayChildren` to push the entire cascade forward in time — useful
 * in full-viewport sections where heading and subtitle animate first.
 *
 * Automatically respects `prefers-reduced-motion`.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  STAGGER_CHILDREN,
  reducedMotionContainerVariants,
  VIEWPORT,
} from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  /**
   * Delay before the first child begins animating (seconds).
   * Defaults to a small base value. Increase to let heading/subtitle
   * finish their sequence before the cascade starts.
   */
  delayChildren?: number;
  /**
   * Override the delay between each staggered child.
   * Defaults to the global STAGGER_CHILDREN value.
   */
  staggerChildren?: number;
}

export default function StaggerContainer({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = STAGGER_CHILDREN,
  ...rest
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();

  // Build the variant inline so delayChildren/staggerChildren are per-instance.
  const variants = prefersReduced
    ? reducedMotionContainerVariants
    : {
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
