"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(165deg, rgba(0,10,48,1) 0%, rgba(0,18,65,0.98) 45%, rgba(0,12,55,1) 100%)",
        fontFamily: "var(--font-heebo), sans-serif",
      }}
    >
      {/* ── Ambient glow orb ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 68%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Secondary accent orb — upper right ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 30vw, 400px)",
          top: "-10%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "clamp(14px, 2.5vh, 24px)",
          padding: "clamp(24px, 5vw, 48px)",
          maxWidth: 620,
          width: "100%",
        }}
      >
        {/* ── 404 number ── */}
        <div
          aria-hidden="true"
          style={{
            fontSize: "clamp(100px, 22vw, 210px)",
            fontWeight: 800,
            lineHeight: 1,
            background:
              "linear-gradient(90deg, rgba(96,165,250,0.28) 0%, rgba(37,99,235,0.22) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 48px rgba(59,130,246,0.28))",
            letterSpacing: "-0.05em",
            userSelect: "none",
            marginBottom: "clamp(-16px, -2vh, -8px)",
          }}
        >
          404
        </div>

        {/* ── H1 ── */}
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(28px, 4.5vw, 52px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#f1f5f9",
            textShadow: "0 2px 24px rgba(0,0,0,0.45)",
            margin: 0,
          }}
        >
          העמוד לא נמצא
        </h1>

        {/* ── Subtitle ── */}
        <p
          style={{
            fontWeight: 300,
            fontSize: "clamp(14px, 1.8vw, 19px)",
            lineHeight: 1.65,
            color: "rgba(226,232,240,0.72)",
            textShadow: "0 1px 12px rgba(0,0,0,0.3)",
            margin: 0,
            maxWidth: 480,
          }}
        >
          נראה שניווטתם למקום הלא נכון. אל דאגה, במשרד דיגיטלי קל מאוד לחזור
          למסלול.
        </p>

        {/* ── CTA button — mirrors HeroSection primary CTA exactly ── */}
        <Link
          href="/"
          style={{
            marginTop: "clamp(8px, 1.5vh, 16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(180px, 20vw, 220px)",
            height: "clamp(50px, 6vh, 64px)",
            padding: "clamp(14px, 2vh, 20px) clamp(28px, 3vw, 40px)",
            background: "linear-gradient(135deg, #002069 0%, #00339a 100%)",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: "clamp(15px, 1.5vw, 18px)",
            lineHeight: 1.5,
            color: "#ffffff",
            textDecoration: "none",
            whiteSpace: "nowrap",
            boxShadow: "0px 20px 40px -10px rgba(0,32,105,0.35)",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "linear-gradient(135deg, #001850 0%, #002d87 100%)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "linear-gradient(135deg, #002069 0%, #00339a 100%)";
          }}
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
