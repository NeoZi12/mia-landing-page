"use client";

import { useId, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  glow?: boolean;
}

export function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1.5,
  className,
  glow = false,
  ...props
}: DotPatternProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!glow) return;

    const updateMousePosition = (e: MouseEvent) => {
      if (containerRef.current) {
        // Use requestAnimationFrame for smooth, highly performant tracking.
        // Coordinates are converted to the container's local space so the
        // mask gradient aligns with the cursor regardless of scroll position.
        window.requestAnimationFrame(() => {
          const el = containerRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--x", `${e.clientX - rect.left}px`);
          el.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [glow]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    >
      {/* Base Layer: Soft static dots for the entire page */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" {...props}>
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle cx={cx} cy={cy} r={cr} className="fill-[#0F172A]/10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      </svg>

      {/* Glow Layer: Darker, slightly larger dots revealed only near the mouse */}
      {glow && (
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          style={{
            WebkitMaskImage: "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), white, transparent)",
            maskImage: "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), white, transparent)",
          }}
          {...props}
        >
          <defs>
            <pattern
              id={`${id}-glow`}
              width={width}
              height={height}
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
              x={x}
              y={y}
            >
              {/* The dots inside the glow are slightly larger and darker for emphasis */}
              <circle cx={cx} cy={cy} r={cr + 0.3} className="fill-[#0F172A]/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id}-glow)`} />
        </svg>
      )}
    </div>
  );
}
