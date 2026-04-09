"use client";

import { motion, useReducedMotion } from "framer-motion";
import { viewport } from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

export default function StaggerContainer({
  children,
  className,
  delayChildren = 0.1,
  staggerChildren = 0.16,
  ...rest
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: { transition: { staggerChildren, delayChildren } },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
