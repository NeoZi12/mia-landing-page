import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export default function AllArticlesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-y-auto" style={{ background: "#EEF2F7" }}>
      <Navbar alwaysVisible standalone />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
