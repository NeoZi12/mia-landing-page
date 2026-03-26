"use client";

import Image from "next/image";
import Link from "next/link";
import type { ServiceData } from "@/lib/servicesData";

/* ─── Play button icon ───────────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 2L20 14L2 26V2Z" fill="#002069" stroke="#002069" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}


/* ─── "Learn more" arrow icon ───────────────────────────────── */
function ArrowLeftIcon() {
  return (
    <svg width="27" height="16" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M26 8H1M1 8L8 1M1 8L8 15" stroke="#002069" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Bullet icons ───────────────────────────────────────────── */
function BulletCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="#002069" strokeWidth="1.5" />
      <path d="M6 10L9 13L14 7" stroke="#002069" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */

interface Props {
  service: ServiceData;
}

export default function ServiceExplanationSection({ service }: Props) {
  const { title, videoTitle, primaryText, secondaryText, bullets } = service;

  return (
    <section
      dir="rtl"
      className="w-full min-h-screen"
      style={{ background: "#F7F9FB" }}
    >
      {/* ── Decorative background gradient ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(115.14% 128.27% at 10% 80%, rgba(220, 225, 255, 0.4) 0%, #F7F9FB 90%)",
        }}
      />

      <div
        className="relative z-[1] flex flex-col w-full max-w-[1280px] mx-auto"
        style={{
          padding: "128px 48px 96px",
          gap: 50,
        }}
      >
        {/* ══ Main two-column content ══════════════════════════════════ */}
        <div
          className="flex flex-col lg:flex-row-reverse items-start lg:items-center w-full"
          style={{ gap: "clamp(40px, 6vw, 96px)" }}
        >
          {/* ── Left column (video + bullets) ── */}
          <div className="flex flex-col w-full lg:w-[53%] flex-shrink-0" style={{ gap: 0 }}>

            {/* Video player container */}
            <div
              className="relative w-full overflow-hidden isolate"
              style={{
                background: "#E0E3E5",
                borderRadius: 40,
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0px 32px 64px -16px rgba(0, 32, 105, 0.15)",
                aspectRatio: "16 / 10",
              }}
            >
              {/* Dark overlay */}
              <div
                className="absolute inset-0 z-0"
                style={{ background: "#000000", opacity: 0.7 }}
              />

              {/* Play button — centered */}
              <div className="absolute inset-0 z-[1] flex items-center justify-center">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 96,
                    height: 96,
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: 12,
                    boxShadow: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <PlayIcon />
                </div>
              </div>

              {/* Bottom gradient overlay */}
              <div
                className="absolute z-[2] pointer-events-none"
                style={{
                  left: 1,
                  right: 1,
                  top: "50%",
                  bottom: 0,
                  background:
                    "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
                }}
              />

              {/* Video title — bottom right */}
              <div
                className="absolute z-[3] flex items-center"
                style={{ right: 32, bottom: 32, left: 32 }}
              >
                <span
                  className="text-white text-right w-full"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.6vw, 24px)",
                    lineHeight: "32px",
                    letterSpacing: "0.6px",
                  }}
                >
                  {videoTitle}
                </span>
              </div>
            </div>

            {/* Bullets bar */}
            <div style={{ paddingTop: 40 }}>
              <div
                className="relative w-full flex flex-col items-center justify-center"
                style={{
                  background: "rgba(255, 255, 255, 0.5)",
                  border: "1px solid rgba(196, 197, 213, 0.2)",
                  backdropFilter: "blur(2px)",
                  WebkitBackdropFilter: "blur(2px)",
                  borderRadius: 16,
                  height: 138,
                  gap: 12,
                }}
              >
                {/* Row 1: first two bullets */}
                <div className="flex flex-row items-center justify-center" style={{ gap: 0 }}>
                  {/* Bullet 1 */}
                  <div className="flex flex-row items-center" style={{ gap: 10, padding: "0 20px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heebo), sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: "20px",
                        letterSpacing: "0.35px",
                        color: "#191C1E",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {bullets[0].label}
                    </span>
                    <BulletCheckIcon />
                  </div>

                  {/* Vertical divider */}
                  <div style={{ width: 1, height: 24, background: "rgba(196, 197, 213, 0.3)", flexShrink: 0 }} />

                  {/* Bullet 2 */}
                  <div className="flex flex-row items-center" style={{ gap: 10, padding: "0 20px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-heebo), sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        lineHeight: "20px",
                        letterSpacing: "0.35px",
                        color: "#191C1E",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {bullets[1].label}
                    </span>
                    <BulletCheckIcon />
                  </div>
                </div>

                {/* Row 2: third bullet centered */}
                <div className="flex flex-row items-center justify-center" style={{ gap: 10 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-heebo), sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      lineHeight: "20px",
                      letterSpacing: "0.35px",
                      color: "#191C1E",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {bullets[2].label}
                  </span>
                  <BulletCheckIcon />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column (content) ── */}
          <div
            className="flex flex-col items-end w-full lg:w-[47%]"
            style={{ gap: 40 }}
          >
            {/* Badge + title block */}
            <div className="flex flex-col items-end w-full" style={{ gap: 16 }}>
              {/* Back to services link */}
              <Link
                href="/#services"
                className="flex flex-row items-center"
                style={{ gap: 8, textDecoration: "none", marginBottom: 8, alignSelf: "flex-start" }}
              >
                {/* Right-pointing arrow */}
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M1 7H17M11 1L17 7L11 13" stroke="#496177" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: "20px",
                    color: "#496177",
                    letterSpacing: "0.1px",
                  }}
                >
                  חזרה לשירותים
                </span>
              </Link>

              {/* Large title */}
              <div className="flex flex-col items-end w-full" style={{ gap: 10 }}>
                <h1
                  className="text-right w-full"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(36px, 4.5vw, 60px)",
                    lineHeight: 1,
                    color: "#002069",
                  }}
                >
                  {title}
                </h1>

                {/* Blue accent bar */}
                <div
                  style={{
                    width: 80,
                    height: 6,
                    background: "#00339A",
                    borderRadius: 12,
                    alignSelf: "flex-start",
                  }}
                />
              </div>
            </div>

            {/* Description block */}
            <div className="flex flex-col items-end w-full" style={{ gap: 32 }}>
              {/* Primary text with right border */}
              <div
                style={{
                  borderRight: "4px solid rgba(0, 51, 154, 0.3)",
                  paddingRight: 24,
                  opacity: 0.9,
                  alignSelf: "stretch",
                }}
              >
                <p
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(16px, 1.4vw, 20px)",
                    lineHeight: "28px",
                    color: "#191C1E",
                  }}
                >
                  {primaryText}
                </p>
              </div>

              {/* Secondary text */}
              <div style={{ opacity: 0.8, alignSelf: "stretch", paddingRight: 4 }}>
                <p
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.2vw, 18px)",
                    lineHeight: "28px",
                    color: "#191C1E",
                  }}
                >
                  {secondaryText}
                </p>
              </div>

              {/* "Learn more" link → WhatsApp */}
              <div className="flex justify-start w-full">
                <a
                  href="https://wa.me/972584087061"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center"
                  style={{ gap: 12, textDecoration: "none" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heebo), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(15px, 1.2vw, 18px)",
                      lineHeight: "28px",
                      color: "#002069",
                    }}
                  >
                    גלו עוד על התהליך שלנו
                  </span>
                  <ArrowLeftIcon />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CTA Card ════════════════════════════════════════════════ */}
        <div
          className="relative w-full overflow-hidden isolate"
          style={{
            background: "#002069",
            borderRadius: 16,
            boxShadow:
              "0px 0px 0px 1px rgba(255, 255, 255, 0.1), 0px 25px 50px -12px rgba(0, 32, 105, 0.2)",
            minHeight: 284,
          }}
        >
          {/* Office photo overlay */}
          <Image
            src="/images/mia-office-pic.jpeg"
            alt=""
            fill
            sizes="1184px"
            className="object-cover pointer-events-none select-none"
            style={{ mixBlendMode: "overlay", opacity: 0.3 }}
            aria-hidden="true"
          />

          {/* Content */}
          <div
            className="relative z-[1] flex flex-col justify-center items-center w-full h-full"
            style={{ padding: "40px", minHeight: 284 }}
          >
            {/* Heading */}
            <div className="flex flex-col items-center w-full" style={{ gap: 8, marginBottom: 8 }}>
              <h2
                className="text-center"
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  lineHeight: "38px",
                  color: "#FFFFFF",
                }}
              >
                מוכנים להתחיל?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(14px, 1.2vw, 18px)",
                  lineHeight: "28px",
                  color: "rgba(219, 234, 254, 0.8)",
                  textAlign: "center",
                }}
              >
                פגישת ייעוץ ראשונית ללא התחייבות
              </p>
            </div>

            {/* CTA button */}
            <div style={{ paddingTop: 24 }} className="flex justify-center">
              <a
                href="https://wa.me/972584087061"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
                style={{
                  background: "#003399",
                  borderRadius: 12,
                  padding: "10px 24px",
                  height: 44,
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: "20px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#002080"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#003399"; }}
              >
                התחלה
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
