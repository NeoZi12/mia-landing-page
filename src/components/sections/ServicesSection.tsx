"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FadeUpItem, StaggerContainer } from "@/components/motion";

/* ─── Icon SVGs ─────────────────────────────────────────────── */

function IconAnnualReports({ color = "#002069" }: { color?: string }) {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="16"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M5 6H13M5 10H13M5 14H9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M19 5L23 9V21H19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCorporateTax({ color = "#002069" }: { color?: string }) {
  return (
    <svg
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="8"
        width="23"
        height="13"
        rx="1.5"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M7 8V5C7 2.79 9.686 1 13 1C16.314 1 19 2.79 19 5V8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M9 13H16M9 16H13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconTaxRefunds({ color = "#002069" }: { color?: string }) {
  return (
    <svg
      width="22"
      height="25"
      viewBox="0 0 22 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="13" r="10" stroke={color} strokeWidth="1.5" />
      <path
        d="M11 8V13L14 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 4L2 1M6 4L3 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBookkeeping({ color = "#002069" }: { color?: string }) {
  return (
    <svg
      width="27"
      height="20"
      viewBox="0 0 27 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="25"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M9 1V19" stroke={color} strokeWidth="1.5" />
      <path
        d="M13 6H23M13 10H23M13 14H18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 6H6M4 10H6M4 14H6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconTaxRepresentation({ color = "#002069" }: { color?: string }) {
  return (
    <svg
      width="25"
      height="20"
      viewBox="0 0 25 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Scales of justice */}
      <path
        d="M12.5 1V19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 19H18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 4H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 4L1 9.5C1 11.433 2.343 13 4 13C5.657 13 7 11.433 7 9.5L4 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M21 4L18 9.5C18 11.433 19.343 13 21 13C22.657 13 24 11.433 24 9.5L21 4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconCustomConsultation({ color = "#FFFFFF" }: { color?: string }) {
  return (
    <svg
      width="21"
      height="25"
      viewBox="0 0 21 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10.5" cy="6" r="5" stroke={color} strokeWidth="1.5" />
      <path
        d="M1 24C1 19.029 5.253 15 10.5 15C15.747 15 20 19.029 20 24"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 3L17.5 1M17.5 1L19 3M17.5 1V5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Learn More Link ───────────────────────────────────────── */

function LearnMore({ color = "#002069" }: { color?: string }) {
  return (
    <div className="flex items-center gap-2 mt-auto">
      <span
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 600,
          fontSize: 16,
          lineHeight: "24px",
          color,
        }}
      >
        למידע נוסף
      </span>
      {/* Left-pointing arrow (RTL "forward") */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 12L6 8L10 4"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ─── Regular Service Card ──────────────────────────────────── */

interface CardProps {
  icon: ReactNode;
  title: string;
  body: string;
  slug: string;
}

function ServiceCard({ icon, title, body, slug }: CardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <div
        className="service-card flex flex-col items-start h-full rounded-lg bg-white cursor-pointer overflow-hidden"
        style={{
          border: "1px solid rgba(196, 197, 213, 0.12)",
          boxShadow: "0px 2px 8px rgba(0, 32, 105, 0.06)",
          padding: "clamp(12px, 1.8vw, 22px)",
          gap: "clamp(6px, 0.8vh, 12px)",
        }}
      >
        {/* Icon badge */}
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: "rgba(220, 225, 255, 0.2)",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3
          className="text-[#002069] w-full text-right"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 600,
            fontSize: "clamp(15px, 1.4vw, 20px)",
            lineHeight: "32px",
          }}
        >
          {title}
        </h3>

        {/* Body */}
        <p
          className="text-[#496177] w-full text-right"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(12px, 0.95vw, 14px)",
            lineHeight: "22px",
          }}
        >
          {body}
        </p>

        <LearnMore color="#002069" />
      </div>
    </Link>
  );
}

/* ─── Featured Card ─────────────────────────────────────────── */

function FeaturedCard() {
  return (
    <Link
      href="/services/custom-consultation"
      style={{ textDecoration: "none", display: "block", height: "100%" }}
    >
      <div
        className="service-card-featured relative flex flex-col items-start h-full rounded-lg overflow-hidden isolate cursor-pointer"
        style={{
          background: "#002069",
          boxShadow: "0px 10px 24px -4px rgba(0,20,80,0.25)",
          padding: "clamp(12px, 1.8vw, 22px)",
          gap: "clamp(6px, 0.8vh, 12px)",
        }}
      >
        {/* Blur blob — bottom-left */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-xl"
          style={{
            width: 160,
            height: 160,
            left: -40,
            bottom: -40,
            background: "rgba(0, 51, 154, 0.3)",
            filter: "blur(32px)",
            zIndex: 0,
          }}
        />
        {/* Blur blob — top-right */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-xl"
          style={{
            width: 160,
            height: 160,
            right: -40,
            top: -40,
            background: "rgba(138, 164, 255, 0.2)",
            filter: "blur(32px)",
            zIndex: 1,
          }}
        />

        {/* Content (above blobs) */}
        <div
          className="relative flex flex-col items-start w-full"
          style={{ gap: "clamp(6px, 0.8vh, 12px)", zIndex: 2 }}
        >
          {/* Icon badge */}
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{
              width: 56,
              height: 56,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <IconCustomConsultation color="#FFFFFF" />
          </div>

          {/* Title */}
          <h3
            className="w-full text-right text-white"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(15px, 1.4vw, 20px)",
              lineHeight: "32px",
            }}
          >
            ייעוץ מותאם אישית
          </h3>

          {/* Body */}
          <p
            className="w-full text-right flex-1"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(12px, 0.95vw, 14px)",
              lineHeight: "22px",
              color: "rgba(220, 225, 255, 0.8)",
            }}
          >
            זקוק לפתרון מורכב? נשמח לבחון את התיק הפיננסי שלך ולהציע את הדרכים
            היעילות ביותר לחיסכון במס המותאמות במדויק לפעילותך.
          </p>

          <LearnMore color="#FFFFFF" />
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */

export default function ServicesSection() {
  return (
    <section className="relative w-full bg-[#F7F9FB] flex flex-col items-center justify-center overflow-hidden md:h-screen isolate">
      {/* ── Decorative background gradient ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(115.14% 128.27% at 10% 20%, rgba(220, 225, 255, 0.4) 0%, #F7F9FB 90%)",
        }}
      />

      {/* ── Blur overlay 1 — top-right ── */}
      <div
        aria-hidden="true"
        className="absolute z-[1] rounded-xl pointer-events-none"
        style={{
          left: "50%",
          right: "-10%",
          top: "-20%",
          bottom: "60%",
          background: "rgba(0, 51, 153, 0.05)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Blur overlay 2 — bottom-left ── */}
      <div
        aria-hidden="true"
        className="absolute z-[2] rounded-xl pointer-events-none"
        style={{
          left: "-10%",
          right: "70%",
          top: "70%",
          bottom: "-10%",
          background: "rgba(0, 66, 93, 0.05)",
          filter: "blur(50px)",
        }}
      />

      <div
        className="relative z-[3] flex flex-col w-full max-w-[960px] px-6 lg:px-0"
        style={{
          paddingTop: "clamp(96px, 14vh, 128px)",
          paddingBottom: "clamp(16px, 2.5vh, 40px)",
          gap: "clamp(16px, 3vh, 40px)",
        }}
      >
        {/* ── Header — choreographed: heading first, subtitle second ── */}
        <div className="flex flex-col items-center" style={{ gap: 12 }}>
          <FadeUpItem standalone delay={0}>
            <h2
              className="text-[#1E3A5F] text-center"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 4.7vw, 60px)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
              }}
            >
              השירותים שלנו
            </h2>
          </FadeUpItem>

          <FadeUpItem standalone delay={0.14}>
            <p
              className="text-[#496177] text-center max-w-[768px]"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.4vw, 20px)",
                lineHeight: "32px",
              }}
            >
              פתרונות מס מתקדמים בהתאמה אישית, עם ניסיון רב וגישה טכנולוגית
              לביטחון פיננסי מקסימלי.
            </p>
          </FadeUpItem>
        </div>

        {/* ── Services Grid — cards cascade after the header settles ── */}
        {/*
          dir="rtl" is global, so grid flows right → left.
          JSX order: top-right, top-center, top-left, bottom-right, bottom-center, bottom-left(featured)
          delayChildren: cards begin after heading + subtitle have had time to register.
        */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ gap: "clamp(12px, 1.5vw, 20px)" }}
          delayChildren={0.32}
          staggerChildren={0.13}
        >
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={<IconAnnualReports />}
              title="דוחות שנתיים"
              body="הכנה והגשת דוחות שנתיים ליחידים ולחברות, תוך אופטימיזציה מלאה של הטבות המס המגיעות לך."
              slug="annual-reports"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={<IconCorporateTax />}
              title="מיסוי תאגידי"
              body="תכנון מס אסטרטגי לחברות, ליווי עסקאות מורכבות וניהול שוטף מול רשויות המס בארץ ובעולם."
              slug="corporate-tax"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={<IconTaxRefunds />}
              title="החזרי מס"
              body="בדיקת זכאות מקיפה להחזרי מס לשכירים ובעלי שליטה, כולל טיפול בתיקונים רטרואקטיביים."
              slug="tax-refunds"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={<IconBookkeeping />}
              title="הנהלת חשבונות"
              body="שירותי הנהלת חשבונות כפולה וחד-צידית לעסקים קטנים ובינוניים בדיוק מרבי ובטכנולוגיה עננית."
              slug="bookkeeping"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={<IconTaxRepresentation />}
              title="ייצוג ברשויות המס"
              body="ייצוג מקצועי מול אגף המכס, המע״מ ומס הכנסה, טיפול בדיווחים תקופתיים והשגות על קביעות מס."
              slug="tax-representation"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <FeaturedCard />
          </FadeUpItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
