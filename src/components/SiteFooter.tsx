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
        background: "#0D2049",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-[1280px] mx-auto px-6 py-4 lg:py-0 lg:h-[80px] gap-2 lg:gap-0"
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
            alt="לוגו מיה זינו — ייעוץ מס והנהלת חשבונות"
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
            מיה זינו — ייעוץ מס והנהלת חשבונות
          </span>
        </Link>

        {/* Nav links — absolutely centered */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-row items-center gap-6">
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

        {/* Location + Copyright — left (RTL end) */}
        <div className="flex flex-col items-center lg:items-end gap-0.5">
          <p
            style={{
              fontFamily: "var(--font-heebo), sans-serif",
              fontWeight: 500,
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            משרד ייעוץ מס | קריית מוצקין | שירות לכלל הארץ
          </p>
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
      </div>
    </footer>
  );
}
