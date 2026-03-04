import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LoadingScreen from "@/components/LoadingScreen";
import LeftPanel from "@/components/LeftPanel";
import NavBar from "@/components/NavBar";
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

      // Panel visibility: ONLY show in hero-intro and hero-services.
      // Everything from InnerWorld downward keeps it hidden.
      const heroIntro = document.getElementById("hero-intro");
      if (heroIntro) {
        ScrollTrigger.create({
          trigger: heroIntro,
          start: "top 80%",
          onEnter:     () => { setHidePanel(false); setActiveSection(1); },
          onEnterBack: () => { setHidePanel(false); setActiveSection(1); },
        });
      }

      const heroServices = document.getElementById("hero-services");
      if (heroServices) {
        ScrollTrigger.create({
          trigger: heroServices,
          start: "top 60%",
          onEnter:     () => { setHidePanel(false); setActiveSection(2); },
          onEnterBack: () => { setHidePanel(false); setActiveSection(2); },
          onLeave:     () =>   setHidePanel(true),   // entering InnerWorld
          onLeaveBack: () => { setHidePanel(false); setActiveSection(1); },
        });
      }

      // InnerWorld — hide panel, keep it hidden going down
      const iw = innerWorldRef.current;
      if (iw) {
        ScrollTrigger.create({
          trigger: iw,
          start: "top 60%",
          onEnter:     () => setHidePanel(true),
          onLeave:     () => setHidePanel(true),
          onEnterBack: () => setHidePanel(true),
          // no onLeaveBack here — hero-services handles showing panel on scroll-up
        });
      }

      // Footer
      const ft = footerRef.current;
      if (ft) {
        ScrollTrigger.create({
          trigger: ft,
          start: "top 80%",
          onEnter:     () => setHidePanel(true),
          onEnterBack: () => setHidePanel(true),
        });
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loading]);

  return (
    <div className="w-full relative bg-background">
      {/* Floating menu button — always on top */}
      <NavBar onMenuClick={() => setMenuOpen(true)} />

      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <div
            className="split-divider"
            style={{
              opacity: hidePanel ? 0 : 1,
              transition: "opacity 0.4s ease",
            }}
          />

          <div style={{
            opacity: hidePanel ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: hidePanel ? "none" : "auto",
          }}>
            <LeftPanel activeSection={activeSection} />
          </div>

          {/* Hero — right panel */}
          <div style={{ marginLeft: "45vw", width: "55vw" }}>
            <HeroSection />
          </div>

          {/* InnerWorld — full screen */}
          <div id="innerworld" ref={innerWorldRef} style={{ width: "100vw", marginLeft: 0 }}>
            <InnerWorldSection />
          </div>

          {/* Pricing + Contact + Blog — full width, no left panel */}
          <div style={{ width: "100vw" }}>
            <div id="section-3"><PricingSection /></div>
            <div id="section-4"><ContactSection /></div>
            <div id="section-5"><BlogSection /></div>
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
