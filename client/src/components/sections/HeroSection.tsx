import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const TABS = [
  { id: "mind", title: "Mind Play", bg: "#F5F0E8", quote: "The game begins before the whistle.", label: "COGNITION", darkText: false },
  { id: "focus", title: "Focus", bg: "#FAFAF7", quote: "Distraction is the enemy of greatness.", label: "ATTENTION", darkText: false },
  { id: "recovery", title: "Recovery", bg: "#F5F0E8", quote: "Rest is not weakness. It is strategy.", label: "RESILIENCE", darkText: false },
  { id: "pressure", title: "Pressure", bg: "#0D0D0D", quote: "Pressure is a privilege. Learn to use it.", label: "COMPOSURE", darkText: true },
  { id: "flow", title: "Flow", bg: "#F5F0E8", quote: "When mind and body speak the same language.", label: "PERFORMANCE", darkText: false },
];

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // Underline animation
    const activeBtn = tabsRef.current[activeTab];
    if (activeBtn && underlineRef.current) {
      gsap.to(underlineRef.current, {
        x: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        duration: 0.4,
        ease: "power3.out"
      });
    }

    // Card transition
    const cards = gsap.utils.toArray(".concept-card") as HTMLElement[];
    cards.forEach((card, i) => {
      if (i === activeTab) {
        gsap.fromTo(card, 
          { clipPath: "inset(100% 0 0 0)", zIndex: 2 },
          { clipPath: "inset(0 0 0 0)", duration: 0.6, ease: "power3.out" }
        );
      } else if (card.style.zIndex === "2") {
        gsap.to(card, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.6,
          ease: "power3.out",
          zIndex: 1
        });
      } else {
        gsap.set(card, { zIndex: 0 });
      }
    });
  }, [activeTab]);

  return (
    <div className="w-full min-h-screen pt-12 pb-24 px-12 flex flex-col items-center">
      {/* Tabs */}
      <div className="relative flex border-b border-[#0d0d0d1a] pb-4 gap-6">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            ref={el => { tabsRef.current[i] = el; }}
            onClick={() => setActiveTab(i)}
            className="font-sans text-[11px] uppercase tracking-widest text-foreground px-2 pb-1 relative z-10 cursor-pointer"
          >
            {tab.title}
          </button>
        ))}
        {/* Moving Underline */}
        <div 
          ref={underlineRef}
          className="absolute bottom-0 h-[1px] bg-accent-red"
        />
      </div>

      {/* Card Container */}
      <div 
        ref={cardContainerRef}
        className="relative w-[380px] h-[380px] mt-10 border-2 border-foreground overflow-hidden"
      >
        {TABS.map((tab, i) => (
          <div
            key={tab.id}
            className="concept-card absolute inset-0 flex flex-col items-center justify-center p-8"
            style={{ 
              backgroundColor: tab.bg,
              color: tab.darkText ? '#FFFFFF' : '#0D0D0D',
              clipPath: i === 0 ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
              zIndex: i === 0 ? 2 : 0
            }}
          >
            {/* Spinning Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
              <svg className="w-[120%] h-[120%] animate-slowspin" viewBox="0 0 100 100" style={{ stroke: tab.darkText ? '#FFF' : '#000' }}>
                <circle cx="50" cy="50" r="48" fill="none" strokeWidth="0.5" strokeDasharray="4 4" />
                <circle cx="50" cy="50" r="38" fill="none" strokeWidth="0.2" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center w-full h-full justify-center">
              <h3 className="font-serif text-[52px] italic mb-4 leading-none">{tab.title}</h3>
              <p className="font-sans text-[13px] opacity-60 max-w-[260px]">{tab.quote}</p>
            </div>
            
            <div className="absolute bottom-6 left-6 font-sans text-[10px] uppercase tracking-widest text-accent-red z-10">
              {tab.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Numbers */}
      <div className="w-[380px] mt-16 flex justify-between">
        <div>
          <div className="font-sans text-[11px] text-accent-gold uppercase tracking-widest">Athletes Supported</div>
          <div className="font-serif text-[80px] text-foreground leading-none mt-2">500+</div>
        </div>
        <div className="text-right">
          <div className="font-sans text-[11px] text-accent-gold uppercase tracking-widest">Years Experience</div>
          <div className="font-serif text-[80px] text-foreground leading-none mt-2">12+</div>
        </div>
      </div>
    </div>
  );
}