import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import LeftPanel from "@/components/LeftPanel";
import MenuOverlay from "@/components/MenuOverlay";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import BlogSection from "@/components/sections/BlogSection";
import InnerWorldSection from "@/components/sections/InnerWorldSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    // Wait a tick for DOM to update
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();

      const sections = gsap.utils.toArray(".section-panel") as HTMLElement[];
      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(index + 1),
          onEnterBack: () => setActiveSection(index + 1),
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loading]);

  return (
    <div className="w-full relative bg-background overflow-x-hidden">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <div className="split-divider"></div>
          
          <LeftPanel activeSection={activeSection} onMenuClick={() => setMenuOpen(true)} />
          
          <div className="right-panel" ref={rightPanelRef}>
            <div className="section-panel" id="section-1"><HeroSection /></div>
            <div className="section-panel" id="section-2"><ServicesSection /></div>
            <div className="section-panel" id="section-3"><BlogSection /></div>
            <div className="section-panel" id="section-4"><InnerWorldSection /></div>
            <div className="section-panel" id="section-5"><PricingSection /></div>
            <div className="section-panel" id="section-6"><ContactSection /></div>
          </div>

          <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
      )}
    </div>
  );
}