"use client";

import { FadeUpItem, StaggerContainer } from "@/components/motion";

/* ─── Icons ─────────────────────────────────────────────────── */

function IconHeart() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 18.5C11 18.5 1.5 12.5 1.5 6C1.5 3.515 3.515 1.5 6 1.5C7.74 1.5 9.26 2.48 10.07 3.91C10.38 4.47 11.62 4.47 11.93 3.91C12.74 2.48 14.26 1.5 16 1.5C18.485 1.5 20.5 3.515 20.5 6C20.5 12.5 11 18.5 11 18.5Z"
        stroke="#3B6FD8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="9.5" stroke="#3B6FD8" strokeWidth="1.5" />
      <path
        d="M11 6V11L14.5 14"
        stroke="#3B6FD8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconPaperless() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="1.5" width="13" height="17" rx="2" stroke="#3B6FD8" strokeWidth="1.5" />
      <path d="M5 6H11M5 10H11M5 14H8" stroke="#3B6FD8" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16 7C17.5 7 20.5 7.5 20.5 12C20.5 16.5 17.5 17 16 17"
        stroke="#3B6FD8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 1C5.134 1 2 4.134 2 8C2 13.25 9 23 9 23C9 23 16 13.25 16 8C16 4.134 12.866 1 9 1Z"
        stroke="#3B6FD8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="8" r="2.5" stroke="#3B6FD8" strokeWidth="1.5" />
    </svg>
  );
}

function IconGovBuilding() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 20.5H20.5" stroke="#3B6FD8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.5 20.5V9.5L11 2.5L19.5 9.5V20.5" stroke="#3B6FD8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="14" width="6" height="6.5" rx="1" stroke="#3B6FD8" strokeWidth="1.5" />
      <rect x="5" y="11" width="3" height="3" rx="0.5" stroke="#3B6FD8" strokeWidth="1.5" />
      <rect x="14" y="11" width="3" height="3" rx="0.5" stroke="#3B6FD8" strokeWidth="1.5" />
    </svg>
  );
}

function IconHeadphones() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.5 11C1.5 5.753 5.753 1.5 11 1.5C16.247 1.5 20.5 5.753 20.5 11"
        stroke="#3B6FD8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="1.5" y="11" width="3.5" height="7" rx="1.5" stroke="#3B6FD8" strokeWidth="1.5" />
      <rect x="17" y="11" width="3.5" height="7" rx="1.5" stroke="#3B6FD8" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Feature Card ──────────────────────────────────────────── */

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  body: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <IconPaperless />,
    title: "משרד ללא נייר",
    body: "הכל דיגיטלי, ללא צורך בנייר או הגעה פיזית",
  },
  {
    icon: <IconClock />,
    title: "ניסיון של מעל 30 שנה",
    body: "עשרות שנים של מומחיות בתחום המיסוי",
  },
  {
    icon: <IconHeart />,
    title: "יחס אישי",
    body: "כל לקוח מקבל תשומת לב מלאה ומענה מותאם",
  },
  {
    icon: <IconHeadphones />,
    title: "זמינות גבוהה",
    body: "תמיד זמינים לשאלות, בקשות ועדכונים",
  },
  {
    icon: <IconPin />,
    title: "שירות מכל מקום בארץ",
    body: "לא משנה איפה אתם — אנחנו כאן בשבילכם",
  },
  {
    icon: <IconGovBuilding />,
    title: "עבודה מול רשויות המס בישראל",
    body: "טיפול שוטף מול רשות המסים, ביטוח לאומי וגופים רשמיים נוספים",
  },
];

function FeatureCard({ icon, title, body }: FeatureItem) {
  return (
    <div
      className="flex items-start gap-4 text-right"
      dir="rtl"
    >
      {/* Icon badge */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-xl"
        style={{
          width: 48,
          height: 48,
          background: "rgba(196, 207, 255, 0.22)",
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 flex-1">
        <h3
          className="text-[#002069]"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(15px, 1.1vw, 18px)",
            lineHeight: "26px",
          }}
        >
          {title}
        </h3>
        <p
          className="text-[#496177]"
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(13px, 0.9vw, 15px)",
            lineHeight: "22px",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/* ─── Section ───────────────────────────────────────────────── */

export default function WhyUsSection() {
  return (
    <section
      className="relative w-full flex flex-col items-center justify-center overflow-hidden lg:h-screen isolate"
    >
      <div
        className="relative z-[3] flex flex-col w-full max-w-[1280px] mx-auto px-6"
        style={{
          paddingTop: "clamp(96px, 14vh, 128px)",
          paddingBottom: "clamp(16px, 2.5vh, 40px)",
          gap: "clamp(32px, 5vh, 64px)",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center" style={{ gap: 12 }}>
          <FadeUpItem standalone delay={0}>
            <h2
              className="text-[#1E3A5F] text-center"
              dir="rtl"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 3.2vw, 42px)",
                lineHeight: 1,
                letterSpacing: "-1.5px",
                color: "#1E3A5F",
              }}
            >
              למה{" "}
              <span style={{ color: "#3B6FD8", fontWeight: 800 }}>
                לבחור דווקא
              </span>{" "}
              בנו
              ?
            </h2>
          </FadeUpItem>

          <FadeUpItem standalone delay={0.14}>
            <p
              className="text-[#496177] text-center max-w-[640px]"
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.4vw, 20px)",
                lineHeight: "32px",
              }}
            >
              כי אנחנו עושים את הדברים אחרת — יותר חכם, יותר מהר, יותר נוח
            </p>
          </FadeUpItem>
        </div>

        {/* Features grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(24px, 3vw, 48px) clamp(16px, 2vw, 40px)" }}
          delayChildren={0.28}
          staggerChildren={0.12}
        >
          {FEATURES.map((feature) => (
            <FadeUpItem key={feature.title} duration={0.8}>
              <FeatureCard {...feature} />
            </FadeUpItem>
          ))}
        </StaggerContainer>
      </div>

    </section>
  );
}
