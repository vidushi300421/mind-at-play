import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import LeftPanel from "@/components/LeftPanel";
import MenuOverlay from "@/components/MenuOverlay";
import HeroSection from "@/components/sections/HeroSection";
import InnerWorldSection from "@/components/sections/InnerWorldSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import BlogSection from "@/components/sections/BlogSection";
import FooterSection from "@/components/sections/FooterSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidePanel, setHidePanel] = useState(false);
  const innerWorldRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();

      // Hide panel for InnerWorld
      const el = innerWorldRef.current;
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => setHidePanel(true),
          onLeave: () => setHidePanel(false),
          onEnterBack: () => setHidePanel(true),
          onLeaveBack: () => setHidePanel(false),
        });
      }

      // Hide panel for Footer
      const ft = footerRef.current;
      if (ft) {
        ScrollTrigger.create({
          trigger: ft,
          start: "top 80%",
          end: "bottom 0%",
          onEnter: () => setHidePanel(true),
          onLeave: () => setHidePanel(false),
          onEnterBack: () => setHidePanel(true),
          onLeaveBack: () => setHidePanel(false),
        });
      }

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
    <div className="w-full relative bg-background">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <div
            className="split-divider"
            style={{
              opacity: hidePanel ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          />

          <div style={{
            opacity: hidePanel ? 0 : 1,
            transition: "opacity 0.5s ease",
            pointerEvents: hidePanel ? "none" : "auto",
          }}>
            <LeftPanel activeSection={activeSection} onMenuClick={() => setMenuOpen(true)} />
          </div>

          {/* Hero — right panel */}
          <div style={{ marginLeft: "45vw", width: "55vw" }}>
            <div id="section-1">
              <HeroSection />
            </div>
          </div>

          {/* InnerWorld — full screen */}
          <div ref={innerWorldRef} style={{ width: "100vw", marginLeft: 0 }}>
            <InnerWorldSection />
          </div>

          {/* Pricing + Contact + Blog — right panel */}
          <div style={{ marginLeft: "45vw", width: "55vw" }}>
            <div className="section-panel" id="section-3">
              <PricingSection />
            </div>
            <div className="section-panel" id="section-4">
              <ContactSection />
            </div>
            <div className="section-panel" id="section-5">
              <BlogSection />
            </div>
          </div>

          {/* Footer — full screen */}
          <div ref={footerRef} style={{ width: "100vw", marginLeft: 0 }}>
            <FooterSection />
          </div>

          <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
      )}
    </div>
  );
}