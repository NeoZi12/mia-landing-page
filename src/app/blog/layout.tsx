import SiteFooter from "@/components/SiteFooter";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dotted-bg relative isolate flex flex-col min-h-screen overflow-y-auto" style={{ background: "#EEF2F7" }}>
      <DotPattern
        width={26}
        height={26}
        cx={1}
        cy={1}
        cr={1.3}
        glow={true}
        className="absolute inset-0 h-full w-full -z-10 pointer-events-none"
      />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
