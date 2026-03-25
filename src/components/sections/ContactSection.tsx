"use client";

import { useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

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

function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="18" height="14" rx="2" stroke="#002069" strokeWidth="1.5"/>
      <path d="M1 4L10 9.5L19 4" stroke="#002069" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="5" stroke="#002069" strokeWidth="1.5"/>
      <circle cx="11" cy="11" r="4" stroke="#002069" strokeWidth="1.5"/>
      <circle cx="16.5" cy="5.5" r="1" fill="#002069"/>
    </svg>
  );
}

/* ─── Professionalism Card ──────────────────────────────────── */

function ProfessionalismCard() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl isolate flex-shrink-0"
      style={{
        background: "#002069",
        boxShadow: "0px 0px 0px 1px rgba(255,255,255,0.1), 0px 25px 50px -12px rgba(0,32,105,0.2)",
        height: "clamp(180px, 22vh, 260px)",
      }}
    >
      {/* Office photo overlay */}
      <Image
        src="/images/mia-office-pic.jpeg"
        alt=""
        fill
        sizes="476px"
        className="object-cover pointer-events-none select-none"
        style={{ mixBlendMode: "overlay", opacity: 0.25 }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-[1] flex flex-col justify-center items-end w-full h-full"
        style={{ padding: "clamp(20px, 3vh, 40px)" }}
      >
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
            lineHeight: "28px",
            color: "rgba(219,234,254,0.8)",
          }}
        >
          פגישת ייעוץ ראשונית ללא התחייבות
        </p>
      </div>
    </div>
  );
}

/* ─── Glass Info Card ───────────────────────────────────────── */

interface InfoCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  sublabel: string;
  href: string;
}

const GLASS_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(255,255,255,0.3)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
  borderRadius: 16,
};

function ContactInfoCard({ icon, iconBg, label, sublabel, href }: InfoCardProps) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex flex-row items-center w-full contact-info-card"
      dir="rtl"
      style={{
        ...GLASS_STYLE,
        padding: "clamp(14px, 1.8vh, 24px) clamp(16px, 2vw, 24px)",
        textDecoration: "none",
        height: "clamp(72px, 9vh, 90px)",
        gap: "clamp(12px, 1.5vw, 16px)",
      }}
    >
      {/* Icon badge — first in RTL flow = visually RIGHT */}
      <div
        className="flex items-center justify-center flex-shrink-0 rounded-xl"
        style={{ width: 48, height: 48, background: iconBg }}
      >
        {icon}
      </div>

      {/* Text — second in RTL flow = visually LEFT */}
      <div className="flex flex-col items-start flex-1" dir="rtl" style={{ gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 1.4vw, 18px)",
            lineHeight: "28px",
            color: "#002069",
            textAlign: "right",
            direction: "rtl",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(11px, 1vw, 14px)",
            lineHeight: "20px",
            color: "#496177",
            textAlign: "right",
            direction: "rtl",
          }}
        >
          {sublabel}
        </span>
      </div>
    </a>
  );
}

/* ─── Info Stack ────────────────────────────────────────────── */

function InfoStack() {
  return (
    <div
      className="flex flex-col w-full lg:w-[38%]"
      style={{ gap: "clamp(8px, 1vh, 16px)" }}
    >
      <ProfessionalismCard />
      <ContactInfoCard
        icon={<WhatsAppIcon />}
        iconBg="rgba(37,211,102,0.1)"
        label="וואטסאפ"
        sublabel="שלחו הודעה ונחזור אליכם במהירות"
        href="https://wa.me/972584087061"
      />
      <ContactInfoCard
        icon={<EnvelopeIcon />}
        iconBg="rgba(0,32,105,0.05)"
        label="אימייל"
        sublabel="office@premium-tax.co.il"
        href="mailto:office@premium-tax.co.il"
      />
      <ContactInfoCard
        icon={<InstagramIcon />}
        iconBg="rgba(0,32,105,0.05)"
        label="אינסטגרם"
        sublabel="עקבו אחרינו באינסטגרם"
        href="#"
      />
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
}

function FieldGroup({ id, label, value, onChange, placeholder, type = "text", isTextarea }: FieldGroupProps) {
  const [focused, setFocused] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused ? "#002069" : "#E2E8F0"}`,
    outline: "none",
    textAlign: "right",
    direction: "rtl",
    fontFamily: "var(--font-heebo), sans-serif",
    fontWeight: 600,
    fontSize: "clamp(15px, 1.4vw, 18px)",
    lineHeight: "22px",
    color: "#1E3A5F",
    padding: "clamp(12px, 1.5vh, 19px) 0",
    resize: "none" as const,
    transition: "border-bottom-color 0.2s ease",
  };

  return (
    <div className="flex flex-col w-full" style={{ gap: 4 }}>
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
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            ...inputStyle,
            paddingBottom: "clamp(16px, 2vh, 28px)",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      )}
    </div>
  );
}

/* ─── Contact Form Card ─────────────────────────────────────── */

interface FormCardProps {
  form: { name: string; email: string; message: string };
  setForm: (f: { name: string; email: string; message: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  status: "idle" | "success" | "error";
}

function ContactFormCard({ form, setForm, onSubmit, isLoading, status }: FormCardProps) {
  return (
    <div
      className="relative w-full lg:w-[58%] overflow-hidden isolate"
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        boxShadow: "0px 20px 25px -5px rgba(0,32,105,0.05), 0px 8px 10px -6px rgba(0,32,105,0.05)",
        padding: "clamp(24px, 4vh, 40px) clamp(24px, 3.5vw, 56px) clamp(24px, 3.5vh, 40px)",
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

      <form onSubmit={onSubmit} className="relative z-[1] flex flex-col w-full" style={{ gap: "clamp(16px, 2.5vh, 32px)" }}>
        <FieldGroup
          id="contact-name"
          label="שם מלא"
          value={form.name}
          onChange={(v) => setForm({ ...form, name: v })}
          placeholder="ישראל ישראלי"
        />
        <FieldGroup
          id="contact-email"
          label="כתובת אימייל"
          type="email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
          placeholder="name@example.co.il"
        />
        <FieldGroup
          id="contact-message"
          label="הודעה"
          value={form.message}
          onChange={(v) => setForm({ ...form, message: v })}
          placeholder="כיצד נוכל לעזור לך היום?"
          isTextarea
        />

        {/* Feedback */}
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

        {/* Submit */}
        <div className="flex justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className="relative flex items-center gap-3 isolate"
            style={{
              background: isLoading ? "#3355a0" : "#002069",
              borderRadius: 12,
              padding: "clamp(14px, 1.8vh, 20px) clamp(28px, 3.5vw, 48px)",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0px 20px 25px -5px rgba(0,32,105,0.3), 0px 8px 10px -6px rgba(0,32,105,0.3)",
              transition: "background 0.2s ease, opacity 0.2s ease",
              opacity: isLoading ? 0.75 : 1,
            }}
            onMouseEnter={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = "#001550"; }}
            onMouseLeave={(e) => { if (!isLoading) (e.currentTarget as HTMLButtonElement).style.background = "#002069"; }}
          >
            <PaperPlaneIcon />
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
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────── */

export default function ContactSection() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus]   = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!SVC_ID) { setStatus("error"); return; }

    setIsLoading(true);
    setStatus("idle");

    try {
      await emailjs.send(
        SVC_ID,
        TPL_ID,
        { from_name: form.name, reply_to: form.email, message: form.message },
        PUB_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="relative w-full bg-[#F7F9FB] isolate overflow-hidden flex-1 min-h-0"
    >
      {/* ── Background gradient ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(115.14% 128.27% at 10% 80%, rgba(220, 225, 255, 0.4) 0%, #F7F9FB 90%)",
        }}
      />

      {/* ── Blur overlay 1 — bottom-right ── */}
      <div
        aria-hidden="true"
        className="absolute z-[1] rounded-xl pointer-events-none"
        style={{
          left: "50%",
          right: "-10%",
          top: "60%",
          bottom: "-20%",
          background: "rgba(0, 51, 153, 0.05)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Blur overlay 2 — top-left ── */}
      <div
        aria-hidden="true"
        className="absolute z-[2] rounded-xl pointer-events-none"
        style={{
          left: "-10%",
          right: "70%",
          top: "-10%",
          bottom: "70%",
          background: "rgba(0, 66, 93, 0.05)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Content ── */}
      <div
        className="relative z-[3] flex flex-col w-full h-full max-w-[1280px] mx-auto px-6"
        style={{
          paddingTop: "clamp(96px, 12vh, 104px)",
          paddingBottom: "clamp(24px, 3vh, 48px)",
          gap: "clamp(20px, 3.5vh, 40px)",
        }}
      >
        {/* ── Hero Text ── */}
        <div className="flex flex-col items-center" style={{ gap: 10 }}>
          <h2
            className="text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(40px, 4.7vw, 60px)",
              lineHeight: "1.2",
              letterSpacing: "-1.8px",
              color: "#1E3A5F",
            }}
          >
            צור קשר
          </h2>
          <p
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
          </p>
        </div>

        {/* ── Two-column layout ── */}
        {/*
          RTL global dir: flex-row renders right-to-left.
          InfoStack first in DOM → appears on RIGHT.
          ContactFormCard second in DOM → appears on LEFT.
          flex-col-reverse on mobile puts the form on top.
        */}
        <div
          className="flex flex-col-reverse lg:flex-row items-stretch w-full flex-1 min-h-0"
          style={{ gap: "clamp(16px, 2vw, 32px)" }}
        >
          <InfoStack />
          <ContactFormCard
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            status={status}
          />
        </div>
      </div>
    </section>
  );
}
