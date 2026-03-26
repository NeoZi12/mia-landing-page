"use client";

/**
 * SectionReveal
 *
 * Wraps a section (or any block-level container) and fades it in when it
 * enters the viewport. Use this as the outermost motion wrapper for each
 * page section.
 *
 * The component renders a `<div>` by default. Pass `as` to change the element.
 * All extra props (className, style, id, …) are forwarded to the element.
 *
 * Automatically respects `prefers-reduced-motion`.
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  sectionVariants,
  reducedMotionVariants,
  VIEWPORT,
} from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

interface SectionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  /** Extra Tailwind / CSS classes forwarded to the wrapper element. */
  className?: string;
}

export default function SectionReveal({
  children,
  className,
  ...rest
}: SectionRevealProps) {
  const prefersReduced = useReducedMotion();
  const variants = prefersReduced ? reducedMotionVariants : sectionVariants;

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
