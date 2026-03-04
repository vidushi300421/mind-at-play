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

      // ── Hide panel for InnerWorld (full-width) ──
      const el = innerWorldRef.current;
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => setHidePanel(true),
          onLeave: () => setHidePanel(true),   // keep hidden — Pricing/Contact/Blog are full-width
          onEnterBack: () => setHidePanel(true),
          onLeaveBack: () => setHidePanel(false),
        });
      }

      // ── Hide panel for Footer ──
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

      // ── Left panel text state per section ──
      // State indices in LeftPanel:
      // 0 → "THE MIND BEHIND THE ATHLETE"  (Hero intro)
      // 1 → "BUILDING / MENTAL / ARMOUR"   (Services)
      // 2 → "MIND / MEETS / SPORT"          (Blog)
      // 3 → "WHAT / LIVES / INSIDE"         (unused / Inner world)
      // 4 → "YOUR / NEXT / LEVEL"           (Pricing)
      // 5 → "READY / TO / PERFORM?"         (Contact)

      const heroIntro = document.getElementById("hero-intro");
      if (heroIntro) {
        ScrollTrigger.create({
          trigger: heroIntro,
          start: "top 60%",
          onEnter: () => setActiveSection(1),
          onEnterBack: () => setActiveSection(1),
        });
      }

      const heroServices = document.getElementById("hero-services");
      if (heroServices) {
        ScrollTrigger.create({
          trigger: heroServices,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveSection(2),
          onEnterBack: () => setActiveSection(2),
          onLeaveBack: () => setActiveSection(1),
        });
      }

      const pricing = document.getElementById("section-3");
      if (pricing) {
        ScrollTrigger.create({
          trigger: pricing,
          start: "top 40%",
          onEnter: () => setActiveSection(5),
          onEnterBack: () => setActiveSection(5),
        });
      }

      const contact = document.getElementById("section-4");
      if (contact) {
        ScrollTrigger.create({
          trigger: contact,
          start: "top 40%",
          onEnter: () => setActiveSection(6),
          onEnterBack: () => setActiveSection(6),
        });
      }

      const blog = document.getElementById("section-5");
      if (blog) {
        ScrollTrigger.create({
          trigger: blog,
          start: "top 40%",
          onEnter: () => setActiveSection(3),
          onEnterBack: () => setActiveSection(3),
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
      {/* NavBar — always on top */}
      <NavBar />

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
            <HeroSection />
          </div>

          {/* InnerWorld — full screen */}
          <div id="innerworld" ref={innerWorldRef} style={{ width: "100vw", marginLeft: 0 }}>
            <InnerWorldSection />
          </div>

          {/* Pricing + Contact + Blog — full width, no left panel */}
          <div style={{ width: "100vw" }}>
            <div id="section-3">
              <PricingSection />
            </div>
            <div id="section-4">
              <ContactSection />
            </div>
            <div id="section-5">
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
