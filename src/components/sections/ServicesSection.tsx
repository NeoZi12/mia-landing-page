"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { FadeUpItem, StaggerContainer } from "@/components/motion";

/* ─── Icon SVGs ─────────────────────────────────────────────── */

function IconSmallBusiness({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* storefront base */}
      <path d="M3 10V20H21V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* awning */}
      <path d="M1 6H23L21 10H3L1 6Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* roofline */}
      <path d="M1 6L3 2H21L23 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* door */}
      <rect x="9" y="13" width="6" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      {/* window */}
      <rect x="15.5" y="12" width="4" height="4" rx="0.75" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

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

function IconTaxRefundEmployees({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Coin / return circle */}
      <circle cx="14" cy="13" r="8" stroke={color} strokeWidth="1.5" />
      {/* Return arrow inside circle */}
      <path d="M11 10H17M17 10L15 8M17 10L15 12" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shekel-like vertical line */}
      <path d="M14 15V17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      {/* Person silhouette (employee) */}
      <circle cx="5" cy="4" r="2.5" stroke={color} strokeWidth="1.3" />
      <path d="M1 11C1 8.239 2.791 7 5 7C7.209 7 9 8.239 9 11" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconTaxCoordination({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Document */}
      <rect x="3" y="1" width="14" height="18" rx="1.5" stroke={color} strokeWidth="1.5" />
      {/* Lines */}
      <path d="M7 6H13M7 10H13M7 14H10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      {/* Checkmark badge */}
      <circle cx="18" cy="16" r="5" fill="white" stroke={color} strokeWidth="1.5" />
      <path d="M15.5 16L17 17.5L20.5 14" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRetirementPlanning({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Umbrella canopy */}
      <path d="M2 11C2 6.029 6.477 2 12 2C17.523 2 22 6.029 22 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Umbrella shaft */}
      <path d="M12 11V18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Handle curve */}
      <path d="M12 18C12 19.657 10.657 21 9 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Center rib line */}
      <path d="M12 11V2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Left rib */}
      <path d="M2 11C4 8 7.5 6.5 12 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      {/* Right rib */}
      <path d="M22 11C20 8 16.5 6.5 12 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconAuthorizedDealer({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Device screen */}
      <rect x="1" y="1" width="16" height="12" rx="1.5" stroke={color} strokeWidth="1.5" />
      {/* Stand */}
      <path d="M5 13V16M13 13V16M4 16H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Data lines inside screen */}
      <path d="M4 5H10M4 8H8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      {/* AI spark / checkmark badge */}
      <circle cx="19" cy="17" r="4" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M17 17L18.5 18.5L21 15.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
    <div className="flex items-center gap-2 mt-auto w-full">
      <span
        className="service-card-learn-more"
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 600,
          fontSize: 15,
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
        className="service-card-arrow"
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
  icon: (color: string) => ReactNode;
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
          border: "1px solid rgba(196, 197, 213, 0.18)",
          boxShadow: "0px 2px 8px rgba(0, 32, 105, 0.06)",
          padding: "clamp(14px, 1.6vw, 24px)",
          gap: "clamp(8px, 0.8vh, 14px)",
        }}
      >
        {/* Icon badge */}
        <div
          className="service-card-icon flex items-center justify-center rounded-lg flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: "rgba(196, 207, 255, 0.22)",
          }}
        >
          {icon("#002069")}
        </div>

        {/* Title */}
        <h3
          className="text-[#002069] w-full text-right"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: "28px",
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
            fontSize: "clamp(12px, 0.9vw, 14px)",
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
          padding: "clamp(14px, 1.6vw, 24px)",
          gap: "clamp(8px, 0.8vh, 14px)",
        }}
      >
        {/* Blur blob — bottom-left (hidden on mobile to avoid GPU jank) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute pointer-events-none rounded-xl"
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
        {/* Blur blob — top-right (hidden on mobile to avoid GPU jank) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute pointer-events-none rounded-xl"
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
          style={{ gap: "clamp(8px, 0.8vh, 14px)", zIndex: 2 }}
        >
          {/* Icon badge */}
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{
              width: 44,
              height: 44,
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
              fontWeight: 700,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: "28px",
            }}
          >
            ייעוץ מותאם אישית
          </h3>

          {/* Body */}
          <p
            className="w-full text-right"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(12px, 0.9vw, 14px)",
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
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden lg:h-screen isolate">
      <div
        className="relative z-[3] flex flex-col w-full max-w-[1280px] mx-auto px-6"
        style={{
          paddingTop: "clamp(96px, 14vh, 128px)",
          paddingBottom: "clamp(16px, 2.5vh, 40px)",
          gap: "clamp(16px, 3vh, 40px)",
        }}
      >
        {/* ── Header — choreographed: heading first, subtitle second ── */}
        <div className="flex flex-col items-center" style={{ gap: 12 }}>
          <FadeUpItem standalone delay={0} duration={0.55}>
            <h2
              className="text-[#1E3A5F] text-center"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.2vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
              }}
            >
              שירותי ייעוץ מס,{" "}
              <span style={{ color: "#3B6FD8" }}>החזרי מס</span>{" "}
              והנהלת חשבונות
            </h2>
          </FadeUpItem>

          <FadeUpItem standalone delay={0.1} duration={0.55}>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(12px, 1.5vw, 20px)" }}
          delayChildren={0.18}
          staggerChildren={0.08}
        >
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={(c) => <IconSmallBusiness color={c} />}
              title="עסק זעיר"
              body="ניהול עסק זעיר במקום אחד — חיסכון במס והתנהלות דיגיטלית נוחה."
              slug="small-business"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={(c) => <IconAuthorizedDealer color={c} />}
              title="עוסק מורשה"
              body="ליווי דיגיטלי מקיף לעוסק מורשה — דיווחים שוטפים, ייצוג מול רשויות המס וניהול חכם דרך אפליקציה."
              slug="authorized-dealer"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={(c) => <IconRetirementPlanning color={c} />}
              title="תכנון פרישה וקיבוע זכויות"
              body="ליווי אישי ומקצועי לתכנון פרישה חכם — ניתוח פנסיוני, קיבוע זכויות ומיצוי מלא של הטבות מס."
              slug="retirement-planning"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={(c) => <IconTaxCoordination color={c} />}
              title="תיאום מס"
              body="תיאום מס מדויק לשנה קדימה — מניעת ניכוי מס עודף, בדיקת נקודות זיכוי וחיסכון של מאות שקלים."
              slug="tax-coordination"
            />
          </FadeUpItem>
          <FadeUpItem duration={0.8}>
            <ServiceCard
              icon={(c) => <IconTaxRefundEmployees color={c} />}
              title="החזרי מס לשכירים"
              body="מיצוי מלא של החזרי מס לשכירים — טיפול מול הרשויות, משיכת טופסי 106 וסימולציה לפני הגשה."
              slug="tax-refund-employees"
            />
          </FadeUpItem>
        </StaggerContainer>
      </div>

    </section>
  );
}
