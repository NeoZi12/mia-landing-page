import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto" style={{ background: "#F7F9FB" }}>
      <Navbar alwaysVisible standalone />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
