"use client";

import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "ראשי",    href: "/"          },
  { label: "עלינו",   href: "/#about"    },
  { label: "שירותים", href: "/#services" },
  { label: "צור קשר", href: "/#contact"  },
];

export default function SiteFooter() {
  return (
    <footer
      dir="rtl"
      className="relative w-full flex-shrink-0"
      style={{
        background: "#002069",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-[1280px] mx-auto px-6 py-4 md:py-0 md:h-[80px] gap-2 md:gap-0"
      >
        {/* Logo — right (RTL start) */}
        <Link
          href="/#about"
          className="flex items-center gap-3 flex-shrink-0"
          style={{ textDecoration: "none" }}
          aria-label="עבור לעמוד עלינו"
        >
          <Image
            src="/images/maya logo 2.png"
            alt="לוגו מיה"
            width={36}
            height={36}
            className="object-contain brightness-0 invert"
          />
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "-0.3px",
            }}
          >
            מיה - ייעוץ מס והנהלת חשבונות
          </span>
        </Link>

        {/* Nav links — absolutely centered */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-row items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-heebo), sans-serif",
                fontWeight: 500,
                fontSize: 13,
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                letterSpacing: "-0.2px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.9)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.55)"; }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright — left (RTL end) */}
        <p
          style={{
            fontFamily: "var(--font-heebo), sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          © {new Date().getFullYear()} מיה. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
