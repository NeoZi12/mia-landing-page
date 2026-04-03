import type { ReactNode } from "react";

export default function VideoIntroSection() {
  return (
    <section
      className="relative w-full bg-[#F7F9FB] overflow-hidden flex flex-col items-center isolate h-auto md:h-[100dvh]"
      id="intro-video"
    >
      {/* ── Decorative background gradient (flipped: bottom to top) ── */}
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

      {/* ── Main content ── */}
      <div
        className="relative z-[3] flex flex-col w-full max-w-[1088px] px-6 lg:px-0 flex-1 min-h-0"
        style={{
          paddingTop: "clamp(104px, 11.5vh, 128px)",
          paddingBottom: "clamp(20px, 3vh, 40px)",
          gap: "clamp(12px, 2.2vh, 40px)",
        }}
      >
        {/* ── Header ── */}
        <div className="flex flex-col items-center" style={{ gap: 16 }}>
          {/* Heading */}
          <h2
            className="text-[#1E3A5F] text-center"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4.7vw, 60px)",
              lineHeight: 1,
              letterSpacing: "-1.5px",
            }}
          >
            הכירו את מיה ייעוץ מס
          </h2>

          {/* Subtitle */}
          <p
            className="text-[#496177] text-center max-w-[672px]"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(14px, 1.4vw, 18px)",
              lineHeight: "29px",
            }}
          >
            צפו בסרטון היכרות קצר עם שירותי ייעוץ המס שלנו.
          </p>
        </div>

        {/* ── Video card ── */}
        <div className="relative flex-1 min-h-0 isolate self-center w-full" style={{ minHeight: "clamp(180px, 35vh, 400px)", maxWidth: 860 }}>
          {/* Decorative blur — top-right of card */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-0"
            style={{
              width: 128,
              height: 128,
              right: -24,
              top: -24,
              background: "rgba(0, 51, 154, 0.1)",
              filter: "blur(32px)",
            }}
          />
          {/* Decorative blur — bottom-left of card */}
          <div
            aria-hidden="true"
            className="absolute pointer-events-none z-[1]"
            style={{
              width: 192,
              height: 192,
              left: -40,
              bottom: -40,
              background: "rgba(201, 226, 253, 0.1)",
              filter: "blur(32px)",
            }}
          />

          {/* Card — minHeight ensures visibility when parent flex-1 has no bounded height (mobile) */}
          <div
            className="relative w-full h-full rounded-xl overflow-hidden z-[2]"
            style={{
              minHeight: "clamp(180px, 35vh, 400px)",
              background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
              border: "1px solid rgba(196, 197, 213, 0.1)",
              boxShadow: "0px 40px 80px -20px rgba(0, 32, 105, 0.12)",
            }}
          >
            {/* Dark overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-[1px] z-[1]"
              style={{ background: "rgba(15, 23, 42, 0.1)" }}
            />

            {/* Play button */}
            <div
              className="absolute inset-0 z-[2] flex items-center justify-center"
            >
              {/* Shadow layer */}
              <div
                aria-hidden="true"
                className="absolute rounded-xl"
                style={{
                  width: 96,
                  height: 96,
                  background: "rgba(255,255,255,0.002)",
                  boxShadow: "0px 25px 50px -12px rgba(0,0,0,0.25)",
                }}
              />
              {/* Button */}
              <button
                className="relative flex items-center justify-center rounded-xl cursor-pointer"
                style={{
                  width: 96,
                  height: 96,
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(6px)",
                  paddingLeft: 28,
                  paddingRight: 20,
                }}
                aria-label="הפעל סרטון"
              >
                {/* Play triangle */}
                <svg
                  width="22"
                  height="28"
                  viewBox="0 0 22 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0L22 14L0 28V0Z"
                    fill="#002069"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Info grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 self-center w-full" style={{ gap: "clamp(16px, 2vw, 24px)", maxWidth: 860 }}>

          {/* Item — ניסיון של עשורים (left column in Figma) */}
          <InfoItem
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="8.5" stroke="#002069" strokeWidth="1.5" />
                <path d="M10 5.5V10.5L13.5 12.5" stroke="#002069" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            heading="ניסיון של עשורים"
            body="למעלה מ־30 שנות ניסיון בליווי עסקים ועצמאים, עם הבנה עמוקה של המערכת ופתרונות שעובדים בפועל."
          />

          {/* Item — אסטרטגיה מנצחת (center column) */}
          <InfoItem
            icon={
              <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16L7 9L11 13L16 6L21 1" stroke="#002069" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 1H21V5" stroke="#002069" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            heading="אסטרטגיה מנצחת"
            body="תכנון מס נכון וחשיבה קדימה שמאפשרים לכם להתנהל בצורה יעילה, לחסוך ולהימנע מהפתעות."
          />

          {/* Item — ליווי אישי ומקצועי (right column in Figma) */}
          <InfoItem
            icon={
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="5" r="4" stroke="#002069" strokeWidth="1.5" />
                <path d="M1 19C1 15.134 4.134 12 8 12C11.866 12 15 15.134 15 19" stroke="#002069" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            }
            heading="ליווי אישי ומקצועי"
            body="ליווי מקצועי המבוסס על ניסיון מעשי והיכרות עמוקה עם דרישות הרשויות והמערכת בישראל."
          />

        </div>
      </div>
    </section>
  );
}

interface InfoItemProps {
  icon: ReactNode;
  heading: string;
  body: string;
}

function InfoItem({ icon, heading, body }: InfoItemProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      {/* Icon badge */}
      <div
        className="flex items-center justify-center rounded-lg"
        style={{
          width: 44,
          height: 44,
          background: "#E6E8EA",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      {/* Heading */}
      <h3
        className="text-[#002069] text-right"
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 600,
          fontSize: "clamp(16px, 1.5vw, 20px)",
          lineHeight: "28px",
        }}
      >
        {heading}
      </h3>

      {/* Body */}
      <p
        className="text-[#444653] text-right"
        style={{
          fontFamily: "var(--font-heebo), sans-serif",
          fontWeight: 400,
          fontSize: "clamp(13px, 1.2vw, 16px)",
          lineHeight: "26px",
        }}
      >
        {body}
      </p>
    </div>
  );
}
