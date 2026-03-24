const PHOTO_PATH = "/images/miaprofile.jpg";

export default function AboutHeroSection() {
  return (
    <section
      className="relative w-full bg-[#F7F9FB] overflow-hidden flex flex-col justify-center items-center isolate"
      style={{ height: "100vh" }}
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
      <div className="relative z-[3] w-full max-w-[1280px] px-6">
        {/*
          RTL row: first child → RIGHT side, second child → LEFT side.
          Content (text) first → RIGHT ✓ | Image second → LEFT ✓
        */}
        <div className="flex flex-row justify-between items-center gap-24 w-full">

          {/* ══ CONTENT — right side in RTL ══ */}
          <div className="flex flex-col items-end pl-10 pr-0 w-[670px] h-[500px] justify-center flex-grow mr-[-40px]">

            {/* Heading + description */}
            <div className="flex flex-col items-end gap-8 max-w-[530px]">
              <h1
                className="text-[64px] leading-[72px] font-bold text-[#1E3A5F] text-right w-full"
                style={{ letterSpacing: "-1.8px" }}
              >
                קצת עלינו
              </h1>
              <p
                className="text-[20px] leading-8 font-normal text-[#496177] text-right w-full"
              >
                משרד ייעוץ מס דיגיטלי עם ניסיון של למעלה מ־30 שנה, המתמחה בניהול
                והתנהלות מול כל הרשויות — ללא ניירת, ללא כאב ראש. אנחנו משלבים
                ניסיון מקצועי עשיר עם פתרונות מתקדמים, כדי לחסוך לכם זמן, לייעל
                תהליכים, ולדאוג שהכל מתנהל בצורה מדויקת, שקופה ונוחה.
              </p>
            </div>

            {/* Organizations */}
            <div className="flex flex-col items-end pt-8 w-full max-w-[530px]">
              <p
                className="text-[20px] leading-8 text-right text-[rgba(30,58,95,0.9)] w-full"
                style={{ fontWeight: 800, letterSpacing: "-0.6px" }}
              >
                עובדים מול הגופים המובילים בישראל
              </p>
              <p
                className="text-[20px] leading-8 text-right text-[rgba(30,58,95,0.8)] w-full"
                style={{ fontWeight: 600, letterSpacing: "-0.6px" }}
              >
                רשות המסים · ביטוח לאומי · משרד האוצר
              </p>
            </div>
          </div>

          {/* ══ IMAGE CARD — left side in RTL ══ */}
          <div
            className="relative flex-shrink-0"
            style={{ width: 360, height: 500 }}
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
          className="text-[20px] leading-[26px] text-[#161C2D] text-center whitespace-nowrap"
          style={{ letterSpacing: "-0.1px" }}
        >
          הכירו אותנו בסרטון קצר
        </span>
        <a
          href="#about-me"
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
