"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewport, fadeUpTransition } from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

interface FadeUpItemProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  standalone?: boolean;
  delay?: number;
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
  const reducedVariants = { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0, transition: { duration: 0 } } };
  const variants = prefersReduced ? reducedVariants : fadeUp;

  const hasOverride = delay !== undefined || duration !== undefined;
  const resolvedTransition = prefersReduced
    ? { duration: 0 }
    : hasOverride
    ? fadeUpTransition({ delay, duration })
    : undefined;

  const viewportProps = standalone
    ? { initial: "hidden", whileInView: "show", viewport }
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
