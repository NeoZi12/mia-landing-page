"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeRight, fadeLeft, viewport } from "@/lib/motion";
import type { HomePageData } from "@/lib/queries";

const PHOTO_PATH = "/images/miaprofile.jpg";

interface AboutHeroSectionProps {
  /** Content from Sanity. Falls back to hardcoded strings when null/undefined. */
  data?: HomePageData | null;
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps = {}) {
  const heading     = data?.aboutHeading     ?? null;
  const body        = data?.aboutBody        ?? "משרד ייעוץ מס דיגיטלי עם ניסיון של למעלה מ־30 שנה, המתמחה בניהול והתנהלות מול כל הרשויות — ללא ניירת, ללא כאב ראש. אנחנו משלבים ניסיון מקצועי עשיר עם פתרונות מתקדמים, כדי לחסוך לכם זמן, לייעל תהליכים, ולדאוג שהכל מתנהל בצורה מדויקת, שקופה ונוחה.";
  const orgsLabel   = data?.aboutOrgsLabel   ?? "עובדים מול הגופים המובילים בישראל";
  const orgs        = data?.aboutOrgs        ?? "רשות המסים · ביטוח לאומי · משרד האוצר";
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col justify-center items-center isolate h-auto lg:h-[100dvh]"
      style={{ padding: "104px 0 clamp(48px, 8vh, 140px)" }}
    >
      {/* ── Main content container ── */}
      <div className="relative z-[3] w-full max-w-[1280px] px-6 sm:px-10 lg:px-[60px] xl:px-[130px]">
        {/*
          RTL row: first child → RIGHT side, second child → LEFT side.
          On mobile: stacks vertically (col-reverse so text is on top).
        */}
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full gap-8 lg:gap-10">

          {/* ══ CONTENT — right side in RTL ══ */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col items-end justify-center w-full lg:max-w-[540px]"
          >

            {/* Heading + description */}
            <div className="flex flex-col items-end gap-5 lg:gap-8 w-full">
              <h1
                className="font-bold text-[#1E3A5F] text-right w-full"
                style={{
                  fontSize: "clamp(26px, 3.2vw, 42px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                }}
              >
                הניסיון שלנו,{" "}
                <span style={{ color: "#3B6FD8" }}>השקט שלכם</span>
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
            <div className="flex flex-col items-end pt-5 lg:pt-8 w-full">
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
          </motion.div>

          {/* ══ IMAGE — mobile: simple rounded card, md+: full tilted card ══ */}

          {/* Mobile only — simple card, no tilt */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative flex-shrink-0 block lg:hidden rounded-[32px] overflow-hidden shadow-xl border border-[rgba(255,255,255,0.4)]"
            style={{ width: "min(200px, 55vw)", height: "min(250px, 68.75vw)" }}
          >
            <Image
              src={PHOTO_PATH}
              alt="מיה זינו"
              fill
              sizes="(max-width: 1024px) 55vw, 0px"
              className="object-cover object-top"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0, 51, 153, 0.2) 0%, rgba(0, 51, 153, 0) 100%)",
              }}
            />
          </motion.div>

          {/* Tablet/Desktop — full tilted card */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="relative flex-shrink-0 hidden lg:block"
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
              <Image
                src={PHOTO_PATH}
                alt="מיה זינו"
                fill
                sizes="(max-width: 1024px) 0px, 24vw"
                className="object-cover object-top"
                priority
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
          </motion.div>

        </div>
      </div>

    </section>
  );
}
