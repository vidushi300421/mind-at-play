import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

// ─── DATA ───────────────────────────────────────────────────────
const CARDS = [
  { id: "mind",     title: "Mind Play", quote: "The game begins before the whistle.",        label: "COGNITION",   dark: false },
  { id: "focus",    title: "Focus",     quote: "Distraction is the enemy of greatness.",     label: "ATTENTION",   dark: false },
  { id: "recovery", title: "Recovery",  quote: "Rest is not weakness. It is strategy.",      label: "RESILIENCE",  dark: false },
  { id: "pressure", title: "Pressure",  quote: "Pressure is a privilege. Learn to use it.", label: "COMPOSURE",   dark: true  },
  { id: "flow",     title: "Flow",      quote: "When mind and body speak the same language.",label: "PERFORMANCE", dark: false },
];

const SERVICES = [
  { id: "s1", name: "Performance Psychology",  sub: "Elite mental conditioning" },
  { id: "s2", name: "Pre-Competition Prep",     sub: "Rituals that activate focus" },
  { id: "s3", name: "Recovery & Resilience",    sub: "Bounce back stronger" },
  { id: "s4", name: "Team Dynamics",            sub: "Collective flow states" },
  { id: "s5", name: "1:1 Coaching",             sub: "Deep individual work" },
  { id: "s6", name: "Workshops",                sub: "For clubs & academies" },
];

const STACK_OFFSETS = [
  { x: 0,   y: 0,   rotate: 0  },
  { x: 10,  y: -12, rotate: 4  },
  { x: -11, y: -22, rotate: -4 },
  { x: 12,  y: -32, rotate: 6  },
  { x: -7,  y: -42, rotate: -2 },
];

// ─── SVGs ────────────────────────────────────────────────────────
const MindSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" style={{width:"100%",height:"100%"}}>
    <path d="M60 30 C40 30 25 45 25 60 C25 70 30 78 38 83 C38 90 43 95 50 95 C53 95 56 94 58 92 L60 95 L62 92 C64 94 67 95 70 95 C77 95 82 90 82 83 C90 78 95 70 95 60 C95 45 80 30 60 30Z" stroke="#2E3426" strokeWidth="1.2"/>
    <path d="M45 55 Q50 45 60 50 Q70 45 75 55" stroke="#2E3426" strokeWidth="1" strokeLinecap="round"/>
    <circle cx="60" cy="62" r="3" stroke="#F34103" strokeWidth="1" fill="none"/>
    <path d="M60 65 L60 75" stroke="#F34103" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);
const FocusSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" style={{width:"100%",height:"100%"}}>
    <circle cx="60" cy="60" r="40" stroke="#2E3426" strokeWidth="1.2"/>
    <circle cx="60" cy="60" r="28" stroke="#2E3426" strokeWidth="1"/>
    <circle cx="60" cy="60" r="16" stroke="#2E3426" strokeWidth="1"/>
    <circle cx="60" cy="60" r="5" stroke="#F34103" strokeWidth="1.5" fill="none"/>
    <line x1="60" y1="15" x2="60" y2="38" stroke="#2E3426" strokeWidth="0.8" strokeDasharray="3 3"/>
    <line x1="60" y1="82" x2="60" y2="105" stroke="#2E3426" strokeWidth="0.8" strokeDasharray="3 3"/>
    <line x1="15" y1="60" x2="38" y2="60" stroke="#2E3426" strokeWidth="0.8" strokeDasharray="3 3"/>
    <line x1="82" y1="60" x2="105" y2="60" stroke="#2E3426" strokeWidth="0.8" strokeDasharray="3 3"/>
  </svg>
);
const RecoverySVG = () => (
  <svg viewBox="0 0 120 120" fill="none" style={{width:"100%",height:"100%"}}>
    <path d="M60 95 L60 45" stroke="#2E3426" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M60 65 C60 65 40 60 35 40 C35 40 55 35 60 55" stroke="#2E3426" strokeWidth="1.2"/>
    <path d="M60 75 C60 75 80 70 85 50 C85 50 65 45 60 65" stroke="#2E3426" strokeWidth="1.2"/>
    <circle cx="60" cy="42" r="3" stroke="#F34103" strokeWidth="1" fill="none"/>
  </svg>
);
const PressureSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" style={{width:"100%",height:"100%"}}>
    <path d="M60 20 L90 50 L60 100 L30 50 Z" stroke="#2E3426" strokeWidth="1.2"/>
    <path d="M30 50 L90 50" stroke="#2E3426" strokeWidth="1"/>
    <path d="M60 50 L60 100" stroke="#F34103" strokeWidth="0.8" strokeDasharray="3 3"/>
  </svg>
);
const FlowSVG = () => (
  <svg viewBox="0 0 120 120" fill="none" style={{width:"100%",height:"100%"}}>
    <path d="M20 40 C35 30 45 50 60 40 C75 30 85 50 100 40" stroke="#2E3426" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M20 55 C35 45 45 65 60 55 C75 45 85 65 100 55" stroke="#2E3426" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M20 70 C35 60 45 80 60 70 C75 60 85 80 100 70" stroke="#2E3426" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="60" cy="55" r="4" stroke="#F34103" strokeWidth="1" fill="none"/>
  </svg>
);
const SVGS = [MindSVG, FocusSVG, RecoverySVG, PressureSVG, FlowSVG];

// ─── COMPONENT ───────────────────────────────────────────────────
export default function HeroSection() {
  const [visibleCards, setVisibleCards] = useState(1);
  const [serviceProgress, setServiceProgress] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const prevVisible = useRef(1);

  const flyCardIn = (index: number) => {
    const el = cardRefs.current[index];
    if (!el) return;
    gsap.fromTo(el,
      { y: 200, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out" }
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      // Phase 1: card stacking
      const p1 = phase1Ref.current;
      if (p1) {
        const rect = p1.getBoundingClientRect();
        const scrolled = -rect.top;
        const total = rect.height - window.innerHeight;
        const progress = Math.max(0, Math.min(scrolled / total, 1));
        const count = Math.min(Math.floor(progress * CARDS.length) + 1, CARDS.length);
        if (count !== prevVisible.current) {
          prevVisible.current = count;
          setVisibleCards(count);
          setTimeout(() => flyCardIn(count - 1), 10);
        }
      }

      // Phase 2: horizontal services
      const p2 = phase2Ref.current;
      if (p2) {
        const rect = p2.getBoundingClientRect();
        const scrolled = -rect.top;
        const total = rect.height - window.innerHeight;
        const progress = Math.max(0, Math.min(scrolled / total, 1));
        setServiceProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const CIRCLE_SIZE = 340;
  const CIRCLE_GAP = 48;
  const totalServicesWidth = SERVICES.length * (CIRCLE_SIZE + CIRCLE_GAP);
  const maxShift = totalServicesWidth - window.innerWidth;
  const serviceShift = serviceProgress * maxShift;

  return (
    <>
      {/* ══════════════════════════════════════════
          PHASE 1 — CARD STACKING  (#350D12 dark)
      ══════════════════════════════════════════ */}
      <div
        id="hero-intro"
        ref={phase1Ref}
        style={{
          height: `${CARDS.length * 100}vh`,
          background: "#350D12",
          position: "relative",
        }}
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "#350D12",
        }}>

          {/* Intro label */}
          <div style={{
            borderBottom: "1px solid rgba(240,235,225,0.15)",
            padding: "14px 40px",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(240,235,225,0.5)",
            flexShrink: 0,
          }}>
            Intro:
          </div>

          {/* Tab labels */}
          <div style={{
            display: "flex",
            borderBottom: "1px solid rgba(240,235,225,0.12)",
            padding: "0 40px",
            flexShrink: 0,
            position: "relative",
          }}>
            {CARDS.map((c, i) => (
              <div key={c.id} style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                padding: "16px 20px",
                color: "#F0EBE1",
                opacity: i < visibleCards ? 1 : 0.25,
                transition: "opacity 0.4s",
              }}>
                {c.title}
              </div>
            ))}
            {/* Sliding underline */}
            <div style={{
              position: "absolute",
              bottom: "-1px",
              left: `calc(40px + ${(visibleCards - 1) * 20}px + ${
                CARDS.slice(0, visibleCards - 1).reduce((acc, c) => acc + (c.title.length * 7.5 + 40), 0)
              }px)`,
              height: "2px",
              width: `${CARDS[visibleCards - 1].title.length * 7.5 + 40}px`,
              background: "#F34103",
              transition: "left 0.45s cubic-bezier(0.4,0,0.2,1), width 0.45s cubic-bezier(0.4,0,0.2,1)",
            }}/>
          </div>

          {/* Card area */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* The stack */}
            <div style={{ position: "relative", width: "340px", height: "430px" }}>
              {Array.from({ length: visibleCards }).map((_, stackPos) => {
                const cardIndex = visibleCards - 1 - stackPos;
                const card = CARDS[cardIndex];
                const Svg = SVGS[cardIndex];
                const offset = STACK_OFFSETS[stackPos];
                const isTop = stackPos === 0;

                return (
                  <div
                    key={card.id}
                    ref={(el) => { cardRefs.current[cardIndex] = el; }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#FFFFFF",
                      border: "1.5px solid rgba(240,235,225,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "36px 32px",
                      transform: `translate(${offset.x}px, ${offset.y}px) rotate(${offset.rotate}deg)`,
                      zIndex: CARDS.length - stackPos,
                      boxShadow: isTop
                        ? "0 20px 56px rgba(0,0,0,0.5)"
                        : "0 6px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    <div style={{
                      position: "absolute", top: 14, right: 14,
                      width: 16, height: 16,
                      borderTop: "1px solid rgba(46,52,38,0.15)",
                      borderRight: "1px solid rgba(46,52,38,0.15)",
                    }}/>

                    {isTop && (
                      <>
                        <div style={{ width: "72px", height: "72px", marginBottom: "18px" }}>
                          <Svg />
                        </div>
                        <h3 style={{
                          fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                          fontSize: "clamp(34px, 4vw, 52px)",
                          fontStyle: "normal",
                          fontWeight: 300,
                          lineHeight: 1,
                          marginBottom: "14px",
                          color: "#2E3426",
                          textAlign: "center",
                          letterSpacing: "-0.02em",
                        }}>
                          {card.title}
                        </h3>
                        <p style={{
                          fontFamily: "Visuelt, 'DM Sans', sans-serif",
                          fontSize: "12px",
                          opacity: 0.6,
                          maxWidth: "220px",
                          lineHeight: 1.8,
                          textAlign: "center",
                          color: "#2E3426",
                        }}>
                          {card.quote}
                        </p>
                        <div style={{
                          position: "absolute",
                          bottom: "14px", left: "16px",
                          fontFamily: "Visuelt, 'DM Sans', sans-serif",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          letterSpacing: "0.22em",
                          color: "#D5BF86",
                        }}>
                          {card.label}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Counter */}
            <div style={{
              position: "absolute",
              bottom: "36px", right: "36px",
              fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
              fontSize: "13px",
              color: "rgba(240,235,225,0.35)",
              letterSpacing: "0.1em",
            }}>
              {String(visibleCards).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PHASE 2 — SERVICES HORIZONTAL SCROLL  (#1D2117 dark olive)
      ══════════════════════════════════════════ */}
      <div
        id="hero-services"
        ref={phase2Ref}
        style={{
          height: `${SERVICES.length * 100}vh`,
          background: "#1D2117",
          position: "relative",
        }}
      >
        <div style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#1D2117",
        }}>

          {/* Section label */}
          <div style={{
            borderBottom: "1px solid rgba(240,235,225,0.12)",
            padding: "14px 40px",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(240,235,225,0.5)",
            flexShrink: 0,
          }}>
            Services:
          </div>

          {/* Horizontal strip */}
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: `${CIRCLE_GAP}px`,
              paddingLeft: "80px",
              transform: `translateX(-${serviceShift}px)`,
              transition: "transform 0.05s linear",
              willChange: "transform",
              flexShrink: 0,
            }}>
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  style={{
                    width: `${CIRCLE_SIZE}px`,
                    height: `${CIRCLE_SIZE}px`,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(240,235,225,0.2)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: "pointer",
                    transition: "border-color 0.3s, background 0.3s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#F34103";
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(243,65,3,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(240,235,225,0.2)";
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                  }}
                >
                  <div style={{
                    fontFamily: "Visuelt, 'DM Sans', sans-serif",
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "#F0EBE1",
                    textAlign: "center",
                    maxWidth: "180px",
                    lineHeight: 1.5,
                    marginBottom: "8px",
                  }}>
                    {s.name}
                  </div>
                  <div style={{
                    fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                    fontSize: "14px",
                    fontStyle: "italic",
                    color: "rgba(240,235,225,0.5)",
                    textAlign: "center",
                    maxWidth: "160px",
                  }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div style={{
            position: "absolute",
            bottom: "36px",
            left: "40px",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(240,235,225,0.35)",
          }}>
            Scroll to explore →
          </div>

          {/* Progress bar */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0,
            width: `${serviceProgress * 100}%`,
            height: "2px",
            background: "#F34103",
            transition: "width 0.05s linear",
          }}/>
        </div>
      </div>
    </>
  );
}
