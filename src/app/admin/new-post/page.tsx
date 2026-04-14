"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Phase = "auth" | "auth-loading" | "compose" | "loading" | "error";

export default function NewPostPage() {
  const router = useRouter();

  const [phase, setPhase]       = useState<Phase>("auth");
  const [password, setPassword] = useState("");
  const [content, setContent]   = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [dots, setDots]         = useState(".");
  const [migrating, setMigrating] = useState(false);
  const [migrateMsg, setMigrateMsg] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Restore saved password from sessionStorage and re-verify with the server.
  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (!saved) return;
    setPassword(saved);
    setPhase("auth-loading");
    fetch("/api/admin/auth", { method: "POST", headers: { "x-admin-password": saved } })
      .then((r) => {
        if (r.ok) {
          setPhase("compose");
        } else {
          sessionStorage.removeItem("admin_pw");
          setPassword("");
          setPhase("auth");
        }
      })
      .catch(() => setPhase("auth"));
  }, []);

  // Animate loading dots
  useEffect(() => {
    if (phase !== "loading") return;
    const id = setInterval(() => setDots((d) => (d.length >= 3 ? "." : d + ".")), 600);
    return () => clearInterval(id);
  }, [phase]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setPhase("auth-loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "x-admin-password": password },
      });
      if (!res.ok) {
        setErrorMsg("סיסמה שגויה. אנא נסי שוב.");
        setPhase("auth");
        return;
      }
      sessionStorage.setItem("admin_pw", password);
      setPhase("compose");
      setTimeout(() => textareaRef.current?.focus(), 50);
    } catch {
      setErrorMsg("שגיאת רשת. נסי שוב.");
      setPhase("auth");
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length < 20) {
      setErrorMsg("אנא הכנסי תוכן ארוך יותר (לפחות 20 תווים).");
      return;
    }
    setPhase("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          sessionStorage.removeItem("admin_pw");
          setPhase("auth");
          setErrorMsg("סיסמה שגויה. אנא נסי שוב.");
          return;
        }
        throw new Error(data.error ?? "שגיאה לא ידועה");
      }

      router.push(`/blog/${data.slug}`);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "שגיאה בלתי צפויה. נסי שוב.");
      setPhase("error");
    }
  }, [content, password, router]);

  const logout = () => {
    sessionStorage.removeItem("admin_pw");
    setPassword("");
    setPhase("auth");
  };

  const migrateLegacy = async () => {
    if (migrating) return;
    if (!confirm("להעביר מאמרים ישנים לתבנית החדשה? הפעולה תבקש מהבינה המלאכותית לסווג מחדש מאמרים קיימים.")) return;
    setMigrating(true);
    setMigrateMsg("");
    try {
      const res = await fetch("/api/admin/migrate-posts", {
        method: "POST",
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "שגיאה");
      setMigrateMsg(`הועברו ${data.migrated}/${data.total ?? data.migrated} מאמרים.`);
    } catch (err) {
      setMigrateMsg(err instanceof Error ? err.message : "שגיאה בלתי צפויה.");
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "#EEF2F7", fontFamily: "var(--font-heebo), sans-serif" }}
    >
      {/* Logo */}
      <a href="/" className="mb-10 flex items-center gap-3 group">
        <Image
          src="/images/maya logo 2.png"
          alt="מיה - ייעוץ מס"
          width={40}
          height={40}
          className="object-contain"
        />
        <span style={{ fontWeight: 700, fontSize: 18, color: "#002069" }}>
          פאנל ניהול
        </span>
      </a>

      {/* Auth form */}
      {(phase === "auth" || phase === "auth-loading") && (
        <form
          onSubmit={handleAuth}
          className="w-full max-w-sm rounded-2xl border border-[rgba(0,51,153,0.12)] bg-white shadow-[0_4px_32px_rgba(0,51,153,0.06)] p-8 flex flex-col gap-5"
        >
          <h1 style={{ fontWeight: 700, fontSize: 22, color: "#002069" }}>
            כניסה לאזור ניהול
          </h1>
          <p style={{ fontSize: 14, color: "#475569" }}>
            הכניסי את הסיסמה על מנת להמשיך.
          </p>
          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            className="w-full rounded-xl border border-[rgba(0,51,153,0.18)] px-4 py-3 outline-none focus:border-[#003399] transition-colors"
            style={{ fontSize: 16, fontFamily: "var(--font-heebo), sans-serif", direction: "ltr" }}
          />
          {errorMsg && (
            <p style={{ fontSize: 14, color: "#dc2626" }}>{errorMsg}</p>
          )}
          <button
            type="submit"
            disabled={phase === "auth-loading"}
            className="w-full rounded-xl py-3 transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: "#003399", color: "#fff", fontWeight: 700, fontSize: 16 }}
            onMouseEnter={(e) => { if (!(e.currentTarget as HTMLButtonElement).disabled) (e.currentTarget as HTMLButtonElement).style.background = "#002069"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#003399"; }}
          >
            {phase === "auth-loading" ? "בודקת סיסמה..." : "כניסה"}
          </button>
        </form>
      )}

      {/* Compose form */}
      {(phase === "compose" || phase === "error") && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-2xl border border-[rgba(0,51,153,0.12)] bg-white shadow-[0_4px_32px_rgba(0,51,153,0.06)] p-8 flex flex-col gap-6"
        >
          <div className="flex items-center justify-between">
            <h1 style={{ fontWeight: 700, fontSize: 22, color: "#002069" }}>
              פרסום מאמר חדש
            </h1>
            <button
              type="button"
              onClick={logout}
              style={{ fontSize: 13, color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}
            >
              התנתקות
            </button>
          </div>

          <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
            כתבי את המאמר כפי שתרצי שיוצג — <strong>הטקסט יישאר בדיוק כפי שכתבת</strong>.
            הבינה המלאכותית רק תסווג אותו לכותרת, מבוא ו-5 נקודות עיקריות.
            למבנה הכי נקי, כתבי טקסט חופשי שמכיל: כותרת, 2-3 משפטי מבוא,
            ו-5 נקודות עיקריות (משפט אחד לכל נקודה).
          </p>

          <div className="flex flex-col gap-2">
            <label style={{ fontWeight: 600, fontSize: 14, color: "#002069" }}>
              תוכן לפיתוח
            </label>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`לדוגמה:

כותרת: החזרי מס לשכירים – כך מקבלים בחזרה את הכסף

מבוא: כל שנה מעל מיליון שכירים משלמים מס יתר. תהליך ההחזר פשוט ומהיר, וניתן לבקש עד 6 שנים אחורה.

5 נקודות עיקריות:
1. ניתן לבקש החזר מס עד 6 שנים אחורה
2. שינוי במקום עבודה במהלך השנה הוא עילה נפוצה להחזר
3. הוצאות רפואיות מזכות בזיכוי מס
4. תרומות למלכ"רים מוכרות מזכות גם הן
5. תהליך ההגשה דרך רשות המסים פשוט ודיגיטלי`}
              rows={10}
              className="w-full rounded-xl border border-[rgba(0,51,153,0.18)] px-4 py-3 outline-none focus:border-[#003399] transition-colors resize-y"
              style={{ fontSize: 15, fontFamily: "var(--font-heebo), sans-serif", lineHeight: 1.7, minHeight: 200 }}
            />
            <p style={{ fontSize: 12, color: "#94a3b8" }}>
              {content.length} תווים
            </p>
          </div>

          {errorMsg && (
            <div
              className="rounded-xl px-4 py-3 border"
              style={{ background: "#fef2f2", borderColor: "#fca5a5", color: "#dc2626", fontSize: 14 }}
            >
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={content.trim().length < 20}
            className="w-full rounded-xl py-3.5 transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "#003399", color: "#fff", fontWeight: 700, fontSize: 16 }}
            onMouseEnter={(e) => {
              if (!(e.currentTarget as HTMLButtonElement).disabled)
                (e.currentTarget as HTMLButtonElement).style.background = "#002069";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#003399";
            }}
          >
            יצירת מאמר ←
          </button>

          {/* Legacy migration — one-shot button, hidden behind auth */}
          <div className="pt-4 border-t border-[rgba(0,51,153,0.08)] flex flex-col gap-2">
            <button
              type="button"
              onClick={migrateLegacy}
              disabled={migrating}
              className="self-start transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontSize: 13,
                color: "#475569",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: 3,
                padding: 0,
              }}
            >
              {migrating ? "מעבירה..." : "להעביר מאמרים ישנים לתבנית החדשה"}
            </button>
            {migrateMsg && (
              <p style={{ fontSize: 12, color: "#475569" }}>{migrateMsg}</p>
            )}
          </div>
        </form>
      )}

      {/* Loading state */}
      {phase === "loading" && (
        <div className="w-full max-w-2xl rounded-2xl border border-[rgba(0,51,153,0.12)] bg-white shadow-[0_4px_32px_rgba(0,51,153,0.06)] p-12 flex flex-col items-center gap-6">
          {/* Animated spinner */}
          <div
            className="w-14 h-14 rounded-full border-4 border-[rgba(0,51,153,0.15)] border-t-[#003399]"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <div className="text-center flex flex-col gap-2">
            <p style={{ fontWeight: 700, fontSize: 20, color: "#002069" }}>
              יוצרת מאמר{dots}
            </p>
            <p style={{ fontSize: 14, color: "#475569" }}>
              הבינה המלאכותית כותבת את המאמר ומייצרת תמונה מותאמת.
              <br />
              התהליך לוקח כ-30–60 שניות.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
