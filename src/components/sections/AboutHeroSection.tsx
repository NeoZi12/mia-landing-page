import type { HomePageData } from "@/lib/queries";

const PHOTO_PATH = "/images/miaprofile.jpg";

interface AboutHeroSectionProps {
  /** Content from Sanity. Falls back to hardcoded strings when null/undefined. */
  data?: HomePageData | null;
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps = {}) {
  const heading     = data?.aboutHeading     ?? "קצת עלינו";
  const body        = data?.aboutBody        ?? "משרד ייעוץ מס דיגיטלי עם ניסיון של למעלה מ־30 שנה, המתמחה בניהול והתנהלות מול כל הרשויות — ללא ניירת, ללא כאב ראש. אנחנו משלבים ניסיון מקצועי עשיר עם פתרונות מתקדמים, כדי לחסוך לכם זמן, לייעל תהליכים, ולדאוג שהכל מתנהל בצורה מדויקת, שקופה ונוחה.";
  const orgsLabel   = data?.aboutOrgsLabel   ?? "עובדים מול הגופים המובילים בישראל";
  const orgs        = data?.aboutOrgs        ?? "רשות המסים · ביטוח לאומי · משרד האוצר";
  const scrollLabel = data?.aboutScrollLabel ?? "הכירו אותנו בסרטון קצר";
  return (
    <section
      className="relative w-full bg-[#F7F9FB] overflow-hidden flex flex-col justify-center items-center isolate"
      style={{ height: "100dvh", padding: "104px 0 clamp(110px, 16vh, 140px)" }}
    >
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

      {/* ── Main content container ── */}
      <div className="relative z-[3] w-full max-w-[1280px] px-6 md:px-10 lg:px-6">
        {/*
          RTL row: first child → RIGHT side, second child → LEFT side.
          On mobile: stacks vertically (col-reverse so text is on top).
        */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full gap-8 md:gap-10">

          {/* ══ CONTENT — right side in RTL ══ */}
          <div className="flex flex-col items-end justify-center w-full md:max-w-[540px]">

            {/* Heading + description */}
            <div className="flex flex-col items-end gap-5 md:gap-8 w-full">
              <h1
                className="font-bold text-[#1E3A5F] text-right w-full"
                style={{
                  fontSize: "clamp(32px, min(5vw, 8vh), 64px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                {heading}
              </h1>
              <p
                className="font-normal text-[#496177] text-right w-full"
                style={{
                  fontSize: "clamp(14px, 1.8vw, 20px)",
                  lineHeight: 1.6,
                }}
              >
                {body}
              </p>
            </div>

            {/* Organizations */}
            <div className="flex flex-col items-end pt-5 md:pt-8 w-full">
              <p
                className="text-right text-[rgba(30,58,95,0.9)] w-full"
                style={{
                  fontWeight: 800,
                  letterSpacing: "-0.6px",
                  fontSize: "clamp(14px, 1.8vw, 20px)",
                  lineHeight: 1.6,
                }}
              >
                {orgsLabel}
              </p>
              <p
                className="text-right text-[rgba(30,58,95,0.8)] w-full"
                style={{
                  fontWeight: 600,
                  letterSpacing: "-0.6px",
                  fontSize: "clamp(14px, 1.8vw, 20px)",
                  lineHeight: 1.6,
                }}
              >
                {orgs}
              </p>
            </div>
          </div>

          {/* ══ IMAGE — mobile: simple rounded card, md+: full tilted card ══ */}

          {/* Mobile only — simple card, no tilt */}
          <div
            className="relative flex-shrink-0 block md:hidden rounded-[32px] overflow-hidden shadow-xl border border-[rgba(255,255,255,0.4)]"
            style={{ width: "min(200px, 55vw)", height: "min(250px, 68.75vw)" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${PHOTO_PATH}')`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 51, 153, 0.2) 0%, rgba(0, 51, 153, 0) 100%)",
              }}
            />
          </div>

          {/* Tablet/Desktop — full tilted card */}
          <div
            className="relative flex-shrink-0 hidden md:block"
            style={{
              width: "clamp(220px, 24vw, 320px)",
              height: "clamp(275px, 30vw, 400px)",
              marginLeft: "clamp(24px, 5vw, 80px)",
            }}
          >
            {/* Layer 1: Elegant background shape — slight clockwise skew */}
            <div
              aria-hidden="true"
              className="absolute bg-[#F0F4F8] rounded-[48px] border border-[rgba(196,197,213,0.1)] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)]"
              style={{
                top: "-11.34px",
                bottom: "10.56px",
                left: "-14.35px",
                right: "13.99px",
                transform: "matrix(1, -0.05, 0.05, 1, 0, 0)",
              }}
            />

            {/* Layer 2: Portrait card — slight counter-clockwise skew, clips the photo */}
            <div
              className="absolute overflow-hidden bg-white rounded-[48px] border border-[rgba(255,255,255,0.4)] shadow-2xl"
              style={{
                top: "-7.65px",
                bottom: "6.96px",
                left: "-9.64px",
                right: "9.39px",
                transform: "matrix(1, 0.03, -0.03, 1, 0, 0)",
              }}
            >
              {/* Photo — fills the card */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${PHOTO_PATH}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              />

              {/* Overlay gradient — dark blue tint at bottom */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(0, 51, 153, 0.2) 0%, rgba(0, 51, 153, 0) 100%)",
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator — dark colors, bottom center ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center"
        style={{ bottom: 48, gap: 8 }}
      >
        <span
          className="text-center whitespace-nowrap"
          style={{
            fontSize: "clamp(14px, 1.8vw, 20px)",
            lineHeight: 1.4,
            letterSpacing: "-0.1px",
            color: "#1E3A5F",
          }}
        >
          {scrollLabel}
        </span>
        <a
          href="#intro-video"
          className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#1E3A5F]"
          style={{ animation: "bounce-arrow 2s ease-in-out infinite" }}
          aria-label="גלול למטה"
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
              stroke="#1E3A5F"
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
