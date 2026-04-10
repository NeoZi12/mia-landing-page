"use client";

import Link from "next/link";
import Image from "next/image";
import { SERVICES, type ServiceData } from "@/lib/servicesData";
import { DotPattern } from "@/components/ui/dot-pattern";

/* ─── Icon SVGs ─────────────────────────────────────────────── */

function IconSmallBusiness({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 10V20H21V10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 6H23L21 10H3L1 6Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 6L3 2H21L23 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="9" y="13" width="6" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="15.5" y="12" width="4" height="4" rx="0.75" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}

function IconCorporateTax({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="8" width="23" height="13" rx="1.5" stroke={color} strokeWidth="1.5" />
      <path d="M7 8V5C7 2.79 9.686 1 13 1C16.314 1 19 2.79 19 5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 13H16M9 16H13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTaxRefunds({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="11" cy="13" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M11 8V13L14 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 4L2 1M6 4L3 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBookkeeping({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="25" height="18" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M9 1V19" stroke={color} strokeWidth="1.5" />
      <path d="M13 6H23M13 10H23M13 14H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 6H6M4 10H6M4 14H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTaxRepresentation({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12.5 1V19" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 19H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 4L1 9.5C1 11.433 2.343 13 4 13C5.657 13 7 11.433 7 9.5L4 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M21 4L18 9.5C18 11.433 19.343 13 21 13C22.657 13 24 11.433 24 9.5L21 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconTaxRefundEmployees({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="14" cy="13" r="8" stroke={color} strokeWidth="1.5" />
      <path d="M11 10H17M17 10L15 8M17 10L15 12" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 15V17" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="5" cy="4" r="2.5" stroke={color} strokeWidth="1.3" />
      <path d="M1 11C1 8.239 2.791 7 5 7C7.209 7 9 8.239 9 11" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconTaxCoordination({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="1" width="14" height="18" rx="1.5" stroke={color} strokeWidth="1.5" />
      <path d="M7 6H13M7 10H13M7 14H10" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="18" cy="16" r="5" fill="white" stroke={color} strokeWidth="1.5" />
      <path d="M15.5 16L17 17.5L20.5 14" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRetirementPlanning({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 11C2 6.029 6.477 2 12 2C17.523 2 22 6.029 22 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11V18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18C12 19.657 10.657 21 9 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 11V2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 11C4 8 7.5 6.5 12 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22 11C20 8 16.5 6.5 12 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function IconAuthorizedDealer({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="16" height="12" rx="1.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 13V16M13 13V16M4 16H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 5H10M4 8H8" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="19" cy="17" r="4" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M17 17L18.5 18.5L21 15.5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCustomConsultation({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10.5" cy="6" r="5" stroke={color} strokeWidth="1.5" />
      <path d="M1 24C1 19.029 5.253 15 10.5 15C15.747 15 20 19.029 20 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 3L17.5 1M17.5 1L19 3M17.5 1V5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getServiceIcon(slug: string, color: string) {
  switch (slug) {
    case "small-business":      return <IconSmallBusiness color={color} />;
    case "authorized-dealer":     return <IconAuthorizedDealer color={color} />;
    case "retirement-planning":   return <IconRetirementPlanning color={color} />;
    case "tax-coordination":        return <IconTaxCoordination color={color} />;
    case "tax-refund-employees":   return <IconTaxRefundEmployees color={color} />;
    case "corporate-tax":       return <IconCorporateTax color={color} />;
    case "tax-refunds":         return <IconTaxRefunds color={color} />;
    case "bookkeeping":         return <IconBookkeeping color={color} />;
    case "tax-representation":  return <IconTaxRepresentation color={color} />;
    default:                    return <IconCustomConsultation color={color} />;
  }
}

/* ─── WhatsApp Icon ─────────────────────────────────────────── */

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─── Check Icon ────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="9" stroke="#3B6FD8" strokeWidth="1.5" />
      <path d="M6 10L9 13L14 7" stroke="#3B6FD8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Mini Service Card (for "שירותים נוספים") ──────────────── */

function MiniServiceCard({ service }: { service: ServiceData }) {
  const preview =
    service.primaryText.length > 80
      ? service.primaryText.slice(0, 80) + "…"
      : service.primaryText;

  return (
    <Link href={`/services/${service.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div
        className="flex flex-col items-start h-full rounded-lg bg-white"
        style={{
          border: "1px solid rgba(196, 197, 213, 0.18)",
          boxShadow: "0px 2px 8px rgba(0, 32, 105, 0.06)",
          padding: "clamp(14px, 1.6vw, 24px)",
          gap: "clamp(8px, 0.8vh, 14px)",
          transition: "box-shadow 0.2s ease",
        }}
      >
        {/* Icon badge */}
        <div
          className="flex items-center justify-center rounded-lg flex-shrink-0"
          style={{ width: 44, height: 44, background: "rgba(196, 207, 255, 0.22)" }}
        >
          {getServiceIcon(service.slug, "#002069")}
        </div>

        {/* Title + arrow — justify-start = physical right in RTL */}
        <div className="flex items-center justify-start w-full gap-1">
          <h3
            className="text-right"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(15px, 1.2vw, 18px)",
              lineHeight: "28px",
              color: "#002069",
            }}
          >
            {service.title}
          </h3>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="#002069" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Body */}
        <p
          className="text-right"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(12px, 0.9vw, 14px)",
            lineHeight: "22px",
            color: "#496177",
          }}
        >
          {preview}
        </p>

        {/* Learn more */}
        <div className="flex items-center gap-2 mt-auto w-full">
          <span
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 600,
              fontSize: 15,
              lineHeight: "24px",
              color: "#002069",
            }}
          >
            למידע נוסף
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="#002069" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */

interface Props {
  service: ServiceData;
}

export default function ServiceExplanationSection({ service }: Props) {
  const { slug, title, videoTitle, primaryText, importantNote, bullets, steps } = service;

  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <section dir="rtl" className="w-full bg-[#F7F9FB]">

      {/* ══ 1. Hero Header ══════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ background: "#002069", paddingBottom: 64 }}>
        {/* Office background image */}
        <Image
          src="/images/office-pic2.jpg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover pointer-events-none select-none"
          style={{ mixBlendMode: "overlay", opacity: 0.2 }}
          aria-hidden="true"
        />
        <div
          className="relative z-[1] w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[60px] xl:px-[130px]"
          style={{ paddingTop: 104 }}
        >
          {/* Back link */}
          <Link
            href="/#services"
            className="inline-flex flex-row items-center"
            style={{ gap: 8, textDecoration: "none", marginBottom: 40 }}
          >
            <svg width="16" height="12" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M1 7H17M11 1L17 7L11 13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              חזרה לכל השירותים
            </span>
          </Link>

          {/* Title row: icon (right) + title (left) in RTL — icon first in DOM = right side */}
          <div className="flex flex-row items-start" style={{ gap: 20 }}>
            {/* Icon box — first in DOM → renders on RIGHT in RTL */}
            <div
              className="flex items-center justify-center rounded-xl flex-shrink-0"
              style={{
                width: 56,
                height: 56,
                background: "rgba(59, 111, 216, 0.2)",
                marginTop: 4,
              }}
            >
              {getServiceIcon(slug, "#FFFFFF")}
            </div>

            {/* Title + subtitle */}
            <div className="flex flex-col flex-1" style={{ gap: 12 }}>
              <h1
                className="text-right"
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 54px)",
                  lineHeight: 1.1,
                  color: "#FFFFFF",
                }}
              >
                {title}
              </h1>
              <p
                className="text-right"
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(14px, 1.2vw, 18px)",
                  lineHeight: "28px",
                  color: "rgba(219, 234, 254, 0.75)",
                }}
              >
                {videoTitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ══ 2. Main Two-Column Content + Related Services ══════════ */}
      <div className="dotted-bg relative isolate">
        <DotPattern
          width={26}
          height={26}
          cx={1}
          cy={1}
          cr={1.3}
          glow={true}
          className="absolute inset-0 h-full w-full -z-10 pointer-events-none"
        />

      {/* ── Main Two-Column Content ─────────────────────────────── */}
      <div
        className="w-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-[60px] xl:px-[130px]"
        style={{
          paddingTop: "clamp(48px, 7vh, 80px)",
          paddingBottom: "clamp(48px, 7vh, 80px)",
        }}
      >
        <div
          className="flex flex-col lg:flex-row items-start w-full"
          style={{ gap: "clamp(40px, 5vw, 80px)" }}
        >

          {/* ── RIGHT column: description + steps ── */}
          <div className="flex flex-col w-full lg:flex-1" style={{ gap: 40 }}>

            {/* על השירות */}
            <div>
              <h2
                className="text-right"
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 1.8vw, 22px)",
                  color: "#002069",
                  marginBottom: 16,
                }}
              >
                על השירות
              </h2>
              <p
                className="text-right"
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  lineHeight: "28px",
                  color: "#496177",
                }}
              >
                {primaryText}
              </p>
            </div>

            {/* חשוב לדעת — Highlight box (only when importantNote is set) */}
            {importantNote && (
              <div
                style={{
                  background: "linear-gradient(135deg, #E8EEFA 0%, #EDF1F8 100%)",
                  border: "1px solid rgba(37, 99, 235, 0.15)",
                  borderRadius: 16,
                  boxShadow: "0px 2px 12px rgba(0, 32, 105, 0.07)",
                  padding: "clamp(20px, 2vw, 28px)",
                }}
              >
                <h3
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(17px, 1.6vw, 20px)",
                    color: "#002069",
                    marginBottom: 16,
                  }}
                >
                  חשוב לדעת
                </h3>
                <p
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(14px, 1.2vw, 17px)",
                    lineHeight: "28px",
                    color: "#496177",
                  }}
                >
                  {importantNote}
                </p>
              </div>
            )}

            {/* איך התהליך עובד? */}
            <div>
              <h3
                className="text-right"
                style={{
                  fontFamily: "var(--font-heebo), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(17px, 1.6vw, 20px)",
                  color: "#002069",
                  marginBottom: 20,
                }}
              >
                איך התהליך עובד?
              </h3>
              <div className="flex flex-col" style={{ gap: 16 }}>
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex flex-row items-center"
                    style={{ gap: 16 }}
                  >
                    {/* Number circle — on the right in RTL */}
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#002069",
                        color: "#FFFFFF",
                        fontFamily: "var(--font-heebo), sans-serif",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span
                      className="flex-1 text-right"
                      style={{
                        fontFamily: "var(--font-heebo), sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(14px, 1.2vw, 17px)",
                        color: "#496177",
                      }}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── LEFT column: bullets card + CTA card ── */}
          <div
            className="flex flex-col w-full lg:w-[380px] lg:flex-shrink-0"
            style={{ gap: 16 }}
          >
            <div className="flex flex-col w-full" style={{ gap: 16 }}>

              {/* White card: מה כולל השירות */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 16,
                  boxShadow: "0px 2px 12px rgba(0, 32, 105, 0.08)",
                  padding: "clamp(20px, 2vw, 28px)",
                }}
              >
                <h3
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.4vw, 18px)",
                    color: "#002069",
                    marginBottom: 20,
                  }}
                >
                  מה כולל השירות
                </h3>
                <div className="flex flex-col" style={{ gap: 14 }}>
                  {bullets.map((bullet, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center"
                      style={{ gap: 12 }}
                    >
                      {/* CheckIcon first in DOM → RIGHT side in RTL, text follows to the left */}
                      <CheckIcon />
                      <span
                        className="flex-1 text-right"
                        style={{
                          fontFamily: "var(--font-heebo), sans-serif",
                          fontWeight: 400,
                          fontSize: "clamp(14px, 1.1vw, 16px)",
                          color: "#496177",
                        }}
                      >
                        {bullet.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dark CTA card */}
              <div
                className="cta-card relative overflow-hidden"
                style={{
                  background: "#002069",
                  borderRadius: 16,
                  padding: "clamp(20px, 2vw, 28px)",
                }}
              >
                <Image
                  src="/images/office-pic3.jpg"
                  alt=""
                  fill
                  sizes="380px"
                  className="object-cover pointer-events-none select-none"
                  style={{ mixBlendMode: "overlay", opacity: 0.2 }}
                  aria-hidden="true"
                />
                <div className="relative z-[1]">
                <h3
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(18px, 1.6vw, 20px)",
                    color: "#FFFFFF",
                    marginBottom: 8,
                  }}
                >
                  מעוניינים לשמוע עוד?
                </h3>
                <p
                  className="text-right"
                  style={{
                    fontFamily: "var(--font-heebo), sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(13px, 1vw, 15px)",
                    color: "rgba(219, 234, 254, 0.8)",
                    marginBottom: 24,
                  }}
                >
                  פגישת ייעוץ ראשונית ללא התחייבות
                </p>

                <div className="flex flex-col" style={{ gap: 12 }}>
                  {/* Primary CTA — accent blue */}
                  <a
                    href="/#contact"
                    className="flex items-center justify-center w-full"
                    style={{
                      background: "#3B6FD8",
                      borderRadius: 12,
                      padding: "14px 0",
                      fontFamily: "var(--font-heebo), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#2E5CB8"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#3B6FD8"; }}
                  >
                    בואו נתחיל
                  </a>

                  {/* WhatsApp — green */}
                  <a
                    href="https://wa.me/972584087061"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full"
                    style={{
                      background: "#22C55E",
                      borderRadius: 12,
                      padding: "14px 0",
                      fontFamily: "var(--font-heebo), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(14px, 1.2vw, 16px)",
                      color: "#FFFFFF",
                      textDecoration: "none",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#16A34A"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#22C55E"; }}
                  >
                    <WhatsAppIcon />
                    וואטסאפ
                  </a>
                </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ══ 3. Additional Services ══════════════════════════════════ */}
      <div
        className="w-full"
        style={{ paddingBottom: "clamp(48px, 8vh, 80px)" }}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[40px] xl:px-[60px]">
          <h2
            className="text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.5vw, 32px)",
              color: "#002069",
              marginBottom: "clamp(28px, 4vh, 48px)",
            }}
          >
            שירותים נוספים
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "clamp(12px, 1.5vw, 20px)" }}
          >
            {relatedServices.map((s) => (
              <MiniServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </div>

      </div>{/* end dotted-bg */}

    </section>
  );
}
