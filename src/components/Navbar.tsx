"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const NAV_LINKS = [
  { label: "ראשי",    id: "hero",     url: "/",         hash: "/"         },
  { label: "עלינו",   id: "about",    url: "/about-us", hash: "/#about"   },
  { label: "שירותים",   id: "services", url: "/services", hash: "/#services" },
  { label: "למה אנחנו", id: "why-us",  url: "/why-us",  hash: "/#why-us"   },
  { label: "צור קשר",   id: "contact",  url: "/contact",  hash: "/#contact"  },
];

const GLASS: React.CSSProperties = {
  background:           "rgba(255,255,255,0.7)",
  backdropFilter:       "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

export default function Navbar({ alwaysVisible = false, standalone = false }: { alwaysVisible?: boolean; standalone?: boolean }) {
  const [visible,       setVisible]       = useState(alwaysVisible);
  const [activeSection, setActiveSection] = useState(standalone ? "" : "hero");
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [indicator,     setIndicator]     = useState({ left: 0, width: 0, ready: false });

  const menuRef  = useRef<HTMLDivElement>(null);
  const navRef   = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  /* ── Measure & move the sliding indicator ──────────────────────────────── */
  const updateIndicator = useCallback(() => {
    const idx = NAV_LINKS.findIndex((l) => l.id === activeSection);
    const el  = linkRefs.current[idx];
    const nav = navRef.current;
    if (!el || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const elRect  = el.getBoundingClientRect();
    setIndicator({ left: elRect.left - navRect.left, width: elRect.width, ready: true });
  }, [activeSection]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator, visible]); // re-measure when navbar fades in

  useEffect(() => {
    window.addEventListener("resize", updateIndicator, { passive: true });
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  /* ── URL sync ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (standalone) return;
    window.history.replaceState(null, "", NAV_LINKS.find((l) => l.id === activeSection)?.url ?? "/");
  }, [activeSection, standalone]);

  /* ── On direct load to a path (e.g. /services), scroll to that section ─── */
  useEffect(() => {
    const pathToId: Record<string, string> = {
      "/about-us": "about",
      "/services":  "services",
      "/why-us":    "why-us",
      "/contact":   "contact",
    };
    const id = pathToId[window.location.pathname];
    if (!id) return;
    const go = () => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
    };
    // Small delay lets the page fully render before scrolling
    const t = setTimeout(go, 300);
    return () => clearTimeout(t);
  }, []);

  /* ── Show / hide navbar ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (alwaysVisible) return;
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
      if (window.scrollY <= window.innerHeight * 0.85) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysVisible]);

  /* ── Active section tracking ────────────────────────────────────────────── */
  useEffect(() => {
    if (standalone) return;
    const ids = ["hero", "about", "services", "why-us", "contact"];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [standalone]);

  /* ── Close menu on outside click ────────────────────────────────────────── */
  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [menuOpen]);

  /* ── Reliable scroll-to: always lands at the section's top ─────────────── */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      ref={menuRef}
      aria-hidden={!visible}
      className={[
        "fixed left-1/2 -translate-x-1/2 z-50",
        "transition-all duration-300 ease-in-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-none"
          : "opacity-0 -translate-y-4 pointer-events-none",
      ].join(" ")}
      style={{ top: 16, width: "calc(100% - 32px)", maxWidth: 1216 }}
    >
      {/* ══ Navbar bar ══════════════════════════════════════════════════════ */}
      <div
        className="pointer-events-auto w-full rounded-xl border border-[rgba(196,197,213,0.15)] shadow-[0px_8px_32px_rgba(25,28,30,0.06)]"
        style={{ ...GLASS, height: 72 }}
      >
        <div className="flex flex-row-reverse lg:flex-row justify-between items-center w-full h-full px-5 lg:px-8">

          {/* ── Logo ── */}
          {standalone ? (
            <a href="/#about" aria-label="עבור לעמוד עלינו" className="flex-shrink-0">
              <Image src="/images/maya logo 2.png" alt="לוגו מיה" width={48} height={48} className="object-contain" priority />
            </a>
          ) : (
            <button
              onClick={() => scrollToSection("about")}
              className="flex-shrink-0 cursor-pointer bg-transparent border-none p-0"
              aria-label="עבור לעמוד עלינו"
            >
              <Image src="/images/maya logo 2.png" alt="לוגו מיה" width={48} height={48} className="object-contain" priority />
            </button>
          )}

          {/* ── Nav links — desktop ── */}
          <nav
            ref={navRef}
            className="hidden lg:flex flex-row items-center gap-1 relative"
            dir="rtl"
          >
            {/* Sliding active indicator */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 h-[2px] rounded-full bg-[#003399] pointer-events-none"
              style={{
                left:       indicator.left,
                width:      indicator.width,
                opacity:    indicator.ready ? 1 : 0,
                transition: "left 0.4s cubic-bezier(0.22,1,0.36,1), width 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.2s",
              }}
            />

            {NAV_LINKS.map(({ label, id, hash }, i) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  ref={(el) => { linkRefs.current[i] = el; }}
                  href={standalone ? hash : `#${id}`}
                  onClick={standalone ? undefined : (e) => { e.preventDefault(); scrollToSection(id); }}
                  className="nav-link relative flex items-center rounded-lg cursor-pointer select-none"
                  style={{
                    padding:        "6px 12px",
                    paddingBottom:  "8px",
                    textDecoration: "none",
                  }}
                >
                  {/* Hover pill — shown via CSS .nav-link:hover */}
                  <span aria-hidden="true" className="nav-link-bg absolute inset-0 rounded-lg pointer-events-none" />
                  <span
                    className="relative z-10"
                    style={{
                      fontFamily:    "var(--font-heebo), sans-serif",
                      fontWeight:    600,
                      fontSize:      14,
                      lineHeight:    "20px",
                      letterSpacing: "-0.35px",
                      color:         isActive ? "#003399" : "#475569",
                      transition:    "color 0.25s ease",
                      whiteSpace:    "nowrap",
                    }}
                  >
                    {label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* ── Right side: CTA + Hamburger ── */}
          <div className="flex items-center gap-3">

            {/* WhatsApp CTA — desktop */}
            <a
              href="https://wa.me/972584087061"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex flex-shrink-0 items-center gap-2 rounded-xl transition-colors duration-150"
              style={{
                background:     "#3B6FD8",
                padding:        "10px 18px",
                height:         40,
                fontFamily:     "var(--font-heebo), sans-serif",
                fontWeight:     600,
                fontSize:       14,
                lineHeight:     "20px",
                color:          "#ffffff",
                whiteSpace:     "nowrap",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#2E5CB8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#3B6FD8"; }}
            >
              <WhatsAppIcon />
              שלחו לנו הודעה
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden flex flex-col justify-center items-center w-11 h-11 rounded-lg gap-[5px] transition-colors duration-150"
              style={{ background: menuOpen ? "rgba(0,51,153,0.06)" : "transparent" }}
              aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={menuOpen}
            >
              <span className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{ background: "#1E3A5F", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
              <span className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{ background: "#1E3A5F", opacity: menuOpen ? 0 : 1, transform: menuOpen ? "scaleX(0)" : "scaleX(1)" }} />
              <span className="block w-5 h-[2px] rounded-full transition-all duration-300 origin-center"
                style={{ background: "#1E3A5F", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
            </button>

          </div>
        </div>
      </div>

      {/* ══ Mobile dropdown ═════════════════════════════════════════════════ */}
      <div
        className={[
          "lg:hidden w-full mt-2 rounded-xl border border-[rgba(196,197,213,0.15)]",
          "shadow-[0px_8px_32px_rgba(25,28,30,0.08)] overflow-hidden",
          "transition-all duration-300 ease-in-out",
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none",
        ].join(" ")}
        style={GLASS}
      >
        <nav dir="rtl" className="flex flex-col px-5 py-3">
          {NAV_LINKS.map(({ label, id, hash }, i) => {
            const isActive = activeSection === id;
            const isLast   = i === NAV_LINKS.length - 1;
            return (
              <a
                key={id}
                href={standalone ? hash : `#${id}`}
                onClick={standalone ? closeMenu : (e) => { e.preventDefault(); scrollToSection(id); closeMenu(); }}
                className="flex items-center justify-between transition-colors duration-150"
                style={{
                  fontFamily:     "var(--font-heebo), sans-serif",
                  fontWeight:     600,
                  fontSize:       15,
                  lineHeight:     "20px",
                  letterSpacing:  "-0.35px",
                  color:          isActive ? "#003399" : "#475569",
                  padding:        "14px 0",
                  borderBottom:   isLast ? "none" : "1px solid rgba(196,197,213,0.25)",
                  textDecoration: "none",
                }}
              >
                {label}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#003399" }} />
                )}
              </a>
            );
          })}

          <div className="pt-3 pb-2">
            <a
              href="https://wa.me/972584087061"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full rounded-xl transition-colors duration-150"
              style={{
                background:     "#3B6FD8",
                padding:        "12px 24px",
                fontFamily:     "var(--font-heebo), sans-serif",
                fontWeight:     600,
                fontSize:       15,
                color:          "#ffffff",
                textDecoration: "none",
              }}
            >
              <WhatsAppIcon />
              שלחו לנו הודעה
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
