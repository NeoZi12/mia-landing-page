"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, fadeLeft, fadeRight, stagger, viewport } from "@/lib/motion";

/* ─── EmailJS env vars ───────────────────────────────────────── */
const SVC_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const TPL_ID  = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUB_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

/* ─── Icon SVGs ─────────────────────────────────────────────── */

function PaperPlaneIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14.5 1L1 5.5L6.5 8M14.5 1L10 13L6.5 8M14.5 1L6.5 8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function PhoneIcon({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function WhatsAppIconWhite() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white"/>
    </svg>
  );
}

function EnvelopeIcon({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="18" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M1 4L10 9.5L19 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 1C6.13 1 3 4.13 3 8c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="8" r="2.5" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}

function InstagramIcon({ color = "#002069" }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="5" stroke={color} strokeWidth="1.5"/>
      <circle cx="11" cy="11" r="4" stroke={color} strokeWidth="1.5"/>
      <circle cx="16.5" cy="5.5" r="1" fill={color}/>
    </svg>
  );
}

/* ─── Info Stack (consolidated navy card) ───────────────────── */

const NAVY_ROW_STYLE: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "clamp(10px, 1.2vh, 16px) clamp(12px, 1.5vw, 18px)",
  gap: "clamp(12px, 1.5vw, 16px)",
  borderRadius: 12,
  textDecoration: "none",
  background: "rgba(13,32,73,0.55)",
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
  transition: "background 0.2s ease",
};

function InfoStack() {
  const rows = [
    { icon: <PhoneIcon color="white" />, label: "טלפון", sublabel: "058-408-7061", href: "tel:0584087061" },
    { icon: <EnvelopeIcon color="white" />, label: "אימייל", sublabel: "maya@ethikaltd.co.il", href: "mailto:maya@ethikaltd.co.il" },
    { icon: <InstagramIcon color="white" />, label: "אינסטגרם", sublabel: "_mayazino@", href: "https://www.instagram.com/mayazino_" },
  ];

  return (
    <div
      className="navy-info-card relative flex flex-col w-full h-full overflow-hidden isolate"
      style={{
        background: "#0D2049",
        borderRadius: 20,
        padding: "clamp(14px, 1.8vh, 22px) clamp(14px, 1.8vw, 20px)",
        gap: "clamp(7px, 0.9vh, 12px)",
        boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.12), 0px 2px 4px -2px rgba(0,0,0,0.08)",
      }}
    >
      {/* Office photo as full-card background */}
      <Image
        src="/images/office-pic1.webp"
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 476px"
        loading="lazy"
        quality={60}
        className="object-cover pointer-events-none select-none"
        style={{ mixBlendMode: "overlay", opacity: 0.25 }}
        aria-hidden="true"
      />

      {/* Heading block — flex-1 pushes rows+button to bottom */}
      <div className="relative z-[1] w-full flex-1" style={{ padding: "clamp(6px, 1vh, 14px) clamp(4px, 0.6vw, 8px) clamp(2px, 0.6vh, 6px)" }}>
        <h3
          className="w-full text-right text-white"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 800,
            fontSize: "clamp(20px, 2.3vw, 30px)",
            lineHeight: "1.27",
            marginBottom: 8,
          }}
        >
          המקצוענות שלנו, השקט שלך.
        </h3>
        <p
          className="w-full text-right"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(13px, 1.4vw, 18px)",
            lineHeight: "1.5",
            color: "rgba(219,234,254,0.85)",
          }}
        >
          פגישת ייעוץ ראשונית ללא התחייבות
        </p>
      </div>

      {rows.map(({ icon, label, sublabel, href }) => (
        <a
          key={href}
          href={href}
          dir="rtl"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          style={NAVY_ROW_STYLE}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,32,73,0.75)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(13,32,73,0.55)"; }}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-xl"
            style={{ width: 40, height: 40, background: "rgba(255,255,255,0.1)" }}
          >
            {icon}
          </div>
          <div className="flex flex-col items-start flex-1" dir="rtl" style={{ gap: 2 }}>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 700, fontSize: "clamp(14px, 1.3vw, 17px)", lineHeight: "24px", color: "#FFFFFF", direction: "rtl" }}>
              {label}
            </span>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 400, fontSize: "clamp(11px, 1vw, 13px)", lineHeight: "18px", color: "rgba(219,234,254,0.75)", direction: "rtl" }}>
              {sublabel}
            </span>
          </div>
        </a>
      ))}

      {/* Address block */}
      <div
        dir="rtl"
        className="relative z-[1] flex flex-row items-start w-full"
        style={{
          padding: "clamp(10px, 1.2vh, 16px) clamp(12px, 1.5vw, 18px)",
          gap: "clamp(12px, 1.5vw, 16px)",
          borderRadius: 12,
          background: "rgba(13,32,73,0.55)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      >
        <div
          className="flex items-center justify-center flex-shrink-0 rounded-xl"
          style={{ width: 40, height: 40, background: "rgba(255,255,255,0.1)", marginTop: 2 }}
        >
          <MapPinIcon />
        </div>
        <div className="flex flex-col items-start flex-1" style={{ gap: 6 }}>
          <div className="flex flex-col items-start" style={{ gap: 1 }}>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 700, fontSize: "clamp(13px, 1.2vw, 15px)", color: "#FFFFFF", direction: "rtl" }}>
              משרד ראשי
            </span>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 400, fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(219,234,254,0.75)", direction: "rtl" }}>
              לאה גולדברג 1, קריית מוצקין
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.1)",
            }}
          />
          <div className="flex flex-col items-start" style={{ gap: 1 }}>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 700, fontSize: "clamp(13px, 1.2vw, 15px)", color: "rgba(219,234,254,0.9)", direction: "rtl" }}>
              ימי רביעי — קבלת קהל
            </span>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 400, fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(219,234,254,0.75)", direction: "rtl" }}>
              חטיבת עציוני 60, כרמיאל
            </span>
            <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 400, fontSize: "clamp(11px, 1vw, 13px)", color: "rgba(219,234,254,0.6)", direction: "rtl" }}>
              (בתיאום מראש)
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp outline CTA */}
      <a
        href="https://wa.me/972584087061"
        target="_blank"
        rel="noopener noreferrer"
        dir="rtl"
        className="whatsapp-cta flex items-center justify-center w-full gap-3"
        style={{
          position: "relative",
          zIndex: 1,
          background: "transparent",
          border: "1.5px solid rgba(255,255,255,0.6)",
          borderRadius: 14,
          height: "clamp(50px, 6.2vh, 64px)",
          textDecoration: "none",
          flexShrink: 0,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.9)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.6)"; }}
      >
        <WhatsAppIconWhite />
        <span style={{ fontFamily: "var(--font-heebo), sans-serif", fontWeight: 800, fontSize: "clamp(14px, 1.3vw, 17px)", color: "#FFFFFF", whiteSpace: "nowrap" }}>
          פנייה בוואטסאפ
        </span>
      </a>
    </div>
  );
}

/* ─── Field Group ───────────────────────────────────────────── */

interface FieldGroupProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  grow?: boolean;
  error?: string;
  onBlur?: () => void;
  maxLength?: number;
}

function FieldGroup({ id, label, value, onChange, placeholder, type = "text", isTextarea, grow, error, onBlur, maxLength }: FieldGroupProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = focused ? "#002069" : error ? "#dc2626" : "#CBD5E1";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#F8FAFC",
    border: `1.5px solid ${borderColor}`,
    borderRadius: 10,
    outline: "none",
    textAlign: "right",
    direction: "rtl",
    fontFamily: "var(--font-heebo), sans-serif",
    fontWeight: 600,
    fontSize: "clamp(15px, 1.4vw, 18px)",
    lineHeight: "22px",
    color: "#1E3A5F",
    padding: "clamp(12px, 1.5vh, 19px) 12px",
    resize: "none" as const,
    transition: "border-color 0.2s ease",
    ...(grow ? { flex: 1, height: "100%" } : {}),
  };

  return (
    <div className={`flex flex-col w-full${grow ? " flex-1" : ""}`} style={{ gap: 4 }}>
      <label
        htmlFor={id}
        className="w-full text-right"
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 600,
          fontSize: 13,
          lineHeight: "16px",
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: "rgba(30,58,95,0.9)",
        }}
      >
        {label}
      </label>

      {isTextarea ? (
        <>
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={grow ? undefined : 2}
            maxLength={maxLength}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); onBlur?.(); }}
            style={inputStyle}
          />
          {maxLength !== undefined && (
            <span
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontSize: 12,
                color: value.length >= maxLength ? "#dc2626" : "#96a3b0",
                textAlign: "left",
                direction: "ltr",
                marginTop: 2,
              }}
            >
              {value.length}/{maxLength}
            </span>
          )}
        </>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          style={inputStyle}
        />
      )}

      {error && (
        <span
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontSize: 12,
            color: "#dc2626",
            textAlign: "right",
            direction: "rtl",
            marginTop: 2,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── Contact Form Card ─────────────────────────────────────── */

interface FormCardProps {
  form: { name: string; email: string; phone: string; message: string };
  setForm: (f: { name: string; email: string; phone: string; message: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  status: "idle" | "success" | "error" | "rate_limited";
  isFormValid: boolean;
  touched: Record<string, boolean>;
  onFieldBlur: (field: string) => void;
  errors: Record<string, string>;
}

function ContactFormCard({ form, setForm, onSubmit, isLoading, status, isFormValid, onFieldBlur, errors }: FormCardProps) {
  const isDisabled = isLoading || !isFormValid;
  return (
    <div
      className="relative w-full overflow-hidden isolate flex flex-col"
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        boxShadow: "0px 20px 25px -5px rgba(0,32,105,0.05), 0px 8px 10px -6px rgba(0,32,105,0.05)",
        padding: "clamp(24px, 4vh, 40px) clamp(24px, 3.5vw, 56px) clamp(24px, 3.5vh, 40px)",
        flex: 1,
      }}
    >
      {/* Corner decoration */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          width: 128,
          height: 128,
          top: -40,
          right: -40,
          background: "rgba(0,32,105,0.05)",
          borderRadius: "0 0 0 12px",
        }}
      />

      <form onSubmit={onSubmit} className="relative z-[1] flex flex-col w-full flex-1 justify-between" style={{ gap: "clamp(16px, 2.5vh, 24px)" }}>
        {/* Fields — grow to fill available space */}
        <div className="flex flex-col flex-1" style={{ gap: "clamp(16px, 2.5vh, 24px)" }}>
          <FieldGroup
            id="contact-name"
            label="שם מלא"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            placeholder="השם המלא שלך"
            error={errors.name}
            onBlur={() => onFieldBlur("name")}
          />
          {/* Email + Phone — side by side to avoid adding height */}
          <div className="flex flex-col sm:flex-row w-full" style={{ gap: "clamp(16px, 2.5vh, 24px)" }}>
            <FieldGroup
              id="contact-email"
              label="כתובת אימייל"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="your@email.co.il"
              error={errors.email}
              onBlur={() => onFieldBlur("email")}
            />
            <FieldGroup
              id="contact-phone"
              label="טלפון"
              type="tel"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
              placeholder="05X-XXX-XXXX"
              error={errors.phone}
              onBlur={() => onFieldBlur("phone")}
            />
          </div>
          <FieldGroup
            id="contact-message"
            label="הודעה"
            value={form.message}
            onChange={(v) => setForm({ ...form, message: v })}
            placeholder="ספרו לנו במה נוכל לעזור..."
            isTextarea
            grow
            maxLength={MESSAGE_MAX}
            error={errors.message}
            onBlur={() => onFieldBlur("message")}
          />
        </div>

        {/* Bottom row — feedback + button pinned to bottom right */}
        <div className="flex flex-col items-start gap-2">
          {status === "success" && (
            <p
              className="text-right"
              style={{ fontFamily: "var(--font-heebo), sans-serif", fontSize: 14, color: "#16a34a" }}
            >
              ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.
            </p>
          )}
          {status === "error" && (
            <p
              className="text-right"
              style={{ fontFamily: "var(--font-heebo), sans-serif", fontSize: 14, color: "#dc2626" }}
            >
              שגיאה בשליחה. אנא נסה שנית או צור קשר ישירות.
            </p>
          )}
          {status === "rate_limited" && (
            <p
              className="text-right"
              style={{ fontFamily: "var(--font-heebo), sans-serif", fontSize: 14, color: "#d97706" }}
            >
              נא להמתין מעט לפני שליחה נוספת.
            </p>
          )}
          <div className="flex justify-end">
          <button
            type="submit"
            disabled={isDisabled}
            className="relative flex items-center gap-3 isolate"
            style={{
              background: isDisabled ? "#3355a0" : "#002069",
              borderRadius: 12,
              padding: "clamp(14px, 1.8vh, 20px) clamp(28px, 3.5vw, 48px)",
              border: "none",
              cursor: isDisabled ? "not-allowed" : "pointer",
              boxShadow: "0px 20px 25px -5px rgba(0,32,105,0.3), 0px 8px 10px -6px rgba(0,32,105,0.3)",
              transition: "background 0.2s ease, opacity 0.2s ease",
              opacity: isDisabled ? 0.5 : 1,
            }}
            onMouseEnter={(e) => { if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.background = "#001550"; }}
            onMouseLeave={(e) => { if (!isDisabled) (e.currentTarget as HTMLButtonElement).style.background = "#002069"; }}
          >
            <span
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: "28px",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              {isLoading ? "שולח..." : "שלח הודעה"}
            </span>
            <PaperPlaneIcon />
          </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\-+\s()]{7,15}$/;
const MESSAGE_MAX = 200;
const RATE_LIMIT_MS = 30_000;

let lastSubmitAt = 0;

export default function ContactSection() {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus]   = useState<"idle" | "success" | "error" | "rate_limited">("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isFormValid =
    form.name.trim().length > 0 &&
    EMAIL_RE.test(form.email.trim()) &&
    PHONE_RE.test(form.phone.trim()) &&
    form.message.trim().length > 0 &&
    form.message.length <= MESSAGE_MAX;

  const errors: Record<string, string> = {
    ...(touched.name && form.name.trim() === ""                              ? { name: "שדה חובה" } : {}),
    ...(touched.email && !EMAIL_RE.test(form.email.trim())                   ? { email: "כתובת אימייל לא תקינה" } : {}),
    ...(touched.phone && !PHONE_RE.test(form.phone.trim())                   ? { phone: "מספר טלפון לא תקין" } : {}),
    ...(touched.message && form.message.trim() === ""                        ? { message: "שדה חובה" } : {}),
    ...(touched.message && form.message.length > MESSAGE_MAX                 ? { message: `מקסימום ${MESSAGE_MAX} תווים` } : {}),
  };

  const handleFieldBlur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });
    if (!isFormValid) return;
    if (Date.now() - lastSubmitAt < RATE_LIMIT_MS) { setStatus("rate_limited"); return; }
    if (!SVC_ID) { setStatus("error"); return; }

    setIsLoading(true);
    setStatus("idle");

    try {
      // Dynamic import keeps the ~10 KB EmailJS client out of the initial bundle;
      // it only loads the first time the user actually submits the form.
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        SVC_ID,
        TPL_ID,
        { from_name: form.name, reply_to: form.email, phone: form.phone, message: form.message },
        PUB_KEY
      );
      lastSubmitAt = Date.now();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      setTouched({});
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative w-full isolate overflow-hidden lg:min-h-[100dvh]"
    >
      {/* ── Content ── */}
      <div
        className="relative z-[3] flex flex-col w-full lg:h-full max-w-[1280px] mx-auto px-6"
        style={{
          paddingTop: "clamp(96px, 12vh, 104px)",
          paddingBottom: "clamp(24px, 3vh, 48px)",
          gap: "clamp(20px, 3.5vh, 40px)",
        }}
      >
        {/* ── Hero Text ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col items-center"
          style={{ gap: 10 }}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(26px, 3.2vw, 42px)",
              lineHeight: "1.2",
              letterSpacing: "-1.8px",
              color: "#1E3A5F",
            }}
          >
            צרו קשר{" "}
            <span style={{ color: "#3B6FD8", fontWeight: 800 }}>לשיחת ייעוץ</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.6vw, 20px)",
              lineHeight: "32px",
              color: "#496177",
              maxWidth: 672,
            }}
          >
            נשמח לשמוע ממך. השאירו פרטים ונחזור אליכם בהקדם עם מענה מקצועי ומותאם אישית לצרכים שלכם.
          </motion.p>
        </motion.div>

        {/* ── Two-column layout ── */}
        {/*
          RTL global dir: flex-row renders right-to-left.
          InfoStack first in DOM → appears on RIGHT.
          ContactFormCard second in DOM → appears on LEFT.
          flex-col-reverse on mobile puts the form on top.
        */}
        <div
          className="flex flex-col-reverse lg:flex-row items-stretch w-full"
          style={{ gap: "clamp(16px, 2vw, 32px)" }}
        >
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="w-full lg:w-[38%] flex-shrink-0"
          >
            <InfoStack />
          </motion.div>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="w-full lg:w-[58%] flex"
          >
          <ContactFormCard
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            status={status}
            isFormValid={isFormValid}
            touched={touched}
            onFieldBlur={handleFieldBlur}
            errors={errors}
          />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
