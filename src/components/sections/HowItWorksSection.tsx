"use client";

import { useState } from "react";
import { FadeUpItem, StaggerContainer } from "@/components/motion";

/* ─── Icons ─────────────────────────────────────────────────── */

function IconPhone() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.62 10.79C8.06 13.62 10.38 15.93 13.21 17.38L15.41 15.18C15.68 14.91 16.08 14.82 16.43 14.94C17.55 15.31 18.76 15.51 20 15.51C20.55 15.51 21 15.96 21 16.51V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconUpload() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6C5.47 2 4.96 2.21 4.59 2.59C4.21 2.96 4 3.47 4 4V20C4 20.53 4.21 21.04 4.59 21.41C4.96 21.79 5.47 22 6 22H18C18.53 22 19.04 21.79 19.41 21.41C19.79 21.04 20 20.53 20 20V8L14 2Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline points="14 2 14 8 20 8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="18" x2="12" y2="12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <polyline points="9 15 12 12 15 15" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 22C12 22 4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Step data ─────────────────────────────────────────────── */

const STEPS = [
  {
    label: "שלב 1",
    title: "יצירת קשר",
    description: "פנו אלינו בטלפון, וואטסאפ או דרך הטופס",
    icon: <IconPhone />,
  },
  {
    label: "שלב 2",
    title: "שיחת ייעוץ",
    description: "שיחה קצרה להבנת הצרכים שלכם",
    icon: <IconChat />,
  },
  {
    label: "שלב 3",
    title: "שליחת מסמכים",
    description: "שלחו מסמכים דיגיטלית — בקלות ובמהירות",
    icon: <IconUpload />,
  },
  {
    label: "שלב 4",
    title: "טיפול וליווי מלא",
    description: "אנחנו מטפלים בהכל מול הרשויות עבורכם, כולל ייפוי כוח",
    icon: <IconShield />,
  },
];

/* ─── Step Card ─────────────────────────────────────────────── */

function StepCard({
  label,
  title,
  description,
  icon,
  isLast,
}: (typeof STEPS)[0] & { isLast: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center text-center flex-1 px-3 sm:px-4">
      {/* Connector line — points LEFT toward next step in RTL layout */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-8 left-0 w-1/2 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(0,32,105,0.15))",
            transform: "translateX(-50%)",
          }}
        />
      )}

      {/* Icon circle */}
      <div
        className="relative z-[1] flex items-center justify-center rounded-full mb-5 shrink-0 cursor-pointer"
        style={{
          width: 64,
          height: 64,
          background: hovered ? "#3B6FD8" : "#002069",
          boxShadow: hovered
            ? "0px 8px 24px -4px rgba(59, 111, 216, 0.38)"
            : "0px 8px 24px -4px rgba(0, 32, 105, 0.28)",
          transition: "background 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {icon}
      </div>

      {/* Step label */}
      <span
        className="mb-2 block"
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.5px",
          color: "#3B6FD8",
        }}
      >
        {label}
      </span>

      {/* Step title */}
      <h3
        className="mb-2"
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(15px, 1.25vw, 18px)",
          lineHeight: 1.3,
          color: "#002069",
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(13px, 1vw, 15px)",
          lineHeight: 1.7,
          color: "#496177",
          maxWidth: 200,
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */

export default function HowItWorksSection() {
  return (
    <section
      dir="rtl"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden lg:h-screen isolate"
    >
      <div
        className="flex flex-col w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[60px] xl:px-[130px] items-center"
        style={{
          paddingTop: "clamp(96px, 14vh, 128px)",
          paddingBottom: "clamp(32px, 4vh, 64px)",
          gap: "clamp(40px, 5vh, 64px)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex flex-col items-center" style={{ gap: 12 }}>
          <FadeUpItem standalone delay={0}>
            <h2
              className="text-center"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.2vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                color: "#1E3A5F",
              }}
            >
              איך זה{" "}
              <span style={{ color: "#3B6FD8", fontWeight: 800 }}>עובד?</span>
            </h2>
          </FadeUpItem>

          <FadeUpItem standalone delay={0.12}>
            <p
              className="text-center"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.4vw, 20px)",
                lineHeight: "32px",
                color: "#496177",
              }}
            >
              תהליך פשוט, מהיר ודיגיטלי — כדי לחסוך לכם זמן
            </p>
          </FadeUpItem>
        </div>

        {/* ── Steps ── */}
        <StaggerContainer
          className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-center items-start w-full"
          style={{ gap: "clamp(32px, 4vw, 0px)" }}
          delayChildren={0.2}
          staggerChildren={0.14}
        >
          {STEPS.map((step, i) => (
            <FadeUpItem key={step.label} className="w-full sm:w-1/2 lg:w-auto lg:flex-1">
              <StepCard {...step} isLast={i === STEPS.length - 1} />
            </FadeUpItem>
          ))}
        </StaggerContainer>

        {/* ── Trust pill ── */}
        <FadeUpItem standalone delay={0.1}>
          <div
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(0,32,105,0.1)",
              boxShadow: "0px 2px 12px -2px rgba(0, 32, 105, 0.08)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M12 22C12 22 4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
                stroke="#3B6FD8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L11 14L15 10"
                stroke="#3B6FD8"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(13px, 1vw, 15px)",
                color: "#496177",
              }}
            >
              הכל בצורה דיגיטלית, מסודרת וברורה — בלי להסתבך
            </span>
          </div>
        </FadeUpItem>
      </div>
    </section>
  );
}
