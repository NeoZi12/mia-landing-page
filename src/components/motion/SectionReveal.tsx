"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";
import type { HTMLMotionProps } from "framer-motion";

interface SectionRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function SectionReveal({ children, className, ...rest }: SectionRevealProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={prefersReduced ? { hidden: { opacity: 1 }, show: { opacity: 1 } } : fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
