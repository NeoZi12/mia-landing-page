"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { generatePapers, type PaperConfig } from "@/lib/papers";
import styles from "./HeroSection.module.css";
import type { HomePageData } from "@/lib/queries";

interface HeroSectionProps {
  /** Content from Sanity. Falls back to hardcoded strings when null/undefined. */
  data?: HomePageData | null;
}

export default function HeroSection({ data }: HeroSectionProps = {}) {
  const badge       = data?.heroBadge       ?? "משרד ללא נייר";
  const line1       = data?.heroLine1       ?? "ניהול מס חכם";
  const line2       = data?.heroLine2       ?? "בלי ניירת";
  const line3       = data?.heroLine3       ?? "בלי כאב ראש";
  const subtitle    = data?.heroSubtitle    ?? "משרד ייעוץ מס דיגיטלי שמטפל בכל ההתנהלות מול הרשויות ללא ניירת.\nאנחנו חוסכים לכם זמן ומתמודדים עם הבירוקרטיה בשבילכם.";
  const ctaLabel    = data?.heroCtaLabel    ?? "יצירת קשר";
  const ctaUrl      = data?.heroCtaUrl      ?? "/contact";
  const scrollLabel = data?.heroScrollLabel ?? "גלו עוד עלינו";

  const [papers, setPapers] = useState<PaperConfig[]>([]);

  // Defer paper generation to client-only to avoid SSR/hydration mismatch
  // (Math.random() produces different values on server vs client)
  useEffect(() => {
    setPapers(generatePapers());
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden isolate w-full"
      style={{ height: "100dvh", padding: "clamp(60px, 9vh, 100px) clamp(16px, 4vw, 24px) clamp(110px, 16vh, 140px)" }}
    >
      {/* ── Layer 0: Background image ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/papers%20start.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px) brightness(0.55) saturate(0.75)",
          transform: "scale(1.06)",
          zIndex: 0,
        }}
      />

      {/* ── Layer 1: Dark blue gradient overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(0,10,48,0.72) 0%, rgba(0,18,65,0.62) 45%, rgba(0,12,55,0.68) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Layer 2: Falling papers ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          perspective: "600px",
          perspectiveOrigin: "50% 25%",
        }}
      >
        {papers.map((p) => (
          <div
            key={p.id}
            className={styles.paper}
            style={
              {
                "--left": `${p.left.toFixed(1)}%`,
                "--dx": `${p.dx.toFixed(1)}px`,
                "--dz": `${p.dz.toFixed(1)}px`,
                "--rx": `${p.rx.toFixed(1)}deg`,
                "--ry": `${p.ry.toFixed(1)}deg`,
                "--rz": `${p.rz.toFixed(1)}deg`,
                "--dur": p.dur.toFixed(2),
                "--del": p.del.toFixed(2),
                "--blur": `${p.blur.toFixed(2)}px`,
                "--opacity": p.opacity.toFixed(3),
                "--bright": p.bright.toFixed(2),
                "--z": p.z,
                zIndex: p.z,
                width: `${p.width.toFixed(1)}px`,
                height: `${p.height.toFixed(1)}px`,
                backgroundColor: p.bgColor,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* ── Layer 3: Subtle glow ── */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(48, 86, 196, 0.07)",
          filter: "blur(60px)",
          borderRadius: 12,
          zIndex: 3,
        }}
      />

      {/* ── Layer 4: Hero content ── */}
      <div
        className="relative flex flex-col items-center"
        style={{ gap: "clamp(14px, 2.5vh, 28px)", width: 896, maxWidth: "100%", zIndex: 4 }}
      >
        {/* Eyebrow badge */}
        <div
          className="flex items-center justify-center"
          style={{
            padding: "6px 16px",
            height: 28,
            background: "#e6e8ea",
            borderRadius: 12,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 700,
              fontSize: 12,
              lineHeight: "16px",
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              color: "#002069",
              whiteSpace: "nowrap",
            }}
          >
            {badge}
          </span>
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center w-full">
          <h1
            className="flex flex-col items-center text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, min(7vw, 9vh), 80px)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {/* Line 1 — white */}
            <span
              style={{
                color: "#f1f5f9",
                textShadow:
                  "0 2px 24px rgba(0,0,0,0.45), 0 1px 6px rgba(0,0,0,0.3)",
              }}
            >
              {line1}
            </span>
            {/* Line 2 — blue gradient */}
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 16px rgba(59,130,246,0.35))",
              }}
            >
              {line2}
            </span>
            {/* Line 3 — blue gradient */}
            <span
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 16px rgba(59,130,246,0.35))",
              }}
            >
              {line3}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center" style={{ maxWidth: 672 }}>
          <p
            className="text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 300,
              fontSize: "clamp(14px, 2vw, 20px)",
              lineHeight: 1.5,
              color: "rgba(226,232,240,0.85)",
              textShadow: "0 1px 12px rgba(0,0,0,0.35)",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* CTA button */}
        <div
          className="flex items-center justify-center"
          style={{ paddingTop: "clamp(8px, 1.5vh, 16px)", width: "100%" }}
        >
          <Link
            href={ctaUrl}
            className="relative flex items-center justify-center"
            style={{
              width: "clamp(160px, 18vw, 213px)",
              height: "clamp(50px, 6vh, 68px)",
              padding: "clamp(14px, 2vh, 20px) clamp(28px, 3vw, 40px)",
              background: "linear-gradient(135deg, #002069 0%, #00339a 100%)",
              borderRadius: 12,
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(15px, 1.5vw, 18px)",
              lineHeight: 1.5,
              color: "#ffffff",
              whiteSpace: "nowrap",
              textDecoration: "none",
              boxShadow: "0px 20px 40px -10px rgba(0,32,105,0.3)",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "linear-gradient(135deg, #001850 0%, #002d87 100%)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "linear-gradient(135deg, #002069 0%, #00339a 100%)";
            }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* ── Layer 5: Scroll indicator ── */}
      <div
        className="absolute flex flex-col items-center"
        style={{
          bottom: 48,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 4,
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.8vw, 20px)",
            lineHeight: 1.4,
            letterSpacing: "-0.1px",
            color: "#ffffff",
            whiteSpace: "nowrap",
          }}
        >
          {scrollLabel}
        </span>
        <a
          href="#about"
          className="flex items-center justify-center"
          style={{
            width: 40,
            height: 40,
            border: "2px solid #ffffff",
            borderRadius: "50%",
            animation: "bounce-arrow 2s ease-in-out infinite",
          }}
          aria-label="גלול לקטע עלינו"
        >
          <svg
            width="12"
            height="7"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
