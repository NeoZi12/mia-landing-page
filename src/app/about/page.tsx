import type { Metadata } from "next";
import AboutHeroSection from "@/components/sections/AboutHeroSection";

export const metadata: Metadata = {
  title: "קצת עלינו",
  description:
    "משרד ייעוץ מס דיגיטלי עם ניסיון של למעלה מ־30 שנה, המתמחה בניהול והתנהלות מול כל הרשויות.",
};

export default function AboutPage() {
  return <AboutHeroSection />;
}
