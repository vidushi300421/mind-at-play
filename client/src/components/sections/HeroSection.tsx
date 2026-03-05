import { useEffect, useRef, useState } from "react";

/* ───────────────── Types ───────────────── */
type HeroCard = {
  id: string;
  title: string;
  quote: string;
  label: string;
  dark: boolean;
};

type ServiceItem = {
  id: string;
  name: string;
  sub: string;
};

/* ───────────────── Data ───────────────── */
const CARDS: HeroCard[] = [
  { id: "mind",     title: "Mind Play",  quote: "The game begins before the whistle.",          label: "COGNITION",   dark: false },
  { id: "focus",    title: "Focus",      quote: "Distraction is the enemy of greatness.",       label: "ATTENTION",   dark: false },
  { id: "recovery", title: "Recovery",   quote: "Rest is not weakness. It is strategy.",        label: "RESILIENCE",  dark: false },
  { id: "pressure", title: "Pressure",   quote: "Pressure is a privilege. Learn to use it.",   label: "COMPOSURE",   dark: true  },
  { id: "flow",     title: "Flow",       quote: "When mind and body speak the same language.", label: "PERFORMANCE", dark: false },
];

const SERVICES: ServiceItem[] = [
  { id: "s1", name: "Performance Psychology", sub: "Elite mental conditioning" },
  { id: "s2", name: "Pre-Competition Prep",  sub: "Rituals that activate focus" },
  { id: "s3", name: "Recovery & Resilience", sub: "Bounce back stronger" },
  { id: "s4", name: "Team Dynamics",         sub: "Collective flow states" },
  { id: "s5", name: "1:1 Coaching",          sub: "Deep individual work" },
  { id: "s6", name: "Workshops",             sub: "For clubs & academies" },
];

/* ───────────────── Helpers ───────────────── */
function clamp01(n: number) {
  return Math.max(0, Math.min(n, 1));
}

function getScrollProgress(section: HTMLDivElement | null) {
  if (!section) return 0;
  const rect = section.getBoundingClientRect();
  const scrolled = -rect.top;
  const total = rect.height - window.innerHeight;
  if (total <= 0) return 0;
  return clamp01(scrolled / total);
}

/* ───────────────── Styles (local) ───────────────── */
const FONT_SANS  = "var(--font-sans)";
const FONT_SERIF = "var(--font-serif)";

const HERO_BG = "#350D12";
const SERVICES_BG = "#1D2117";

const TEXT = "#F0EBE1";
const TEXT_MID = "rgba(240,235,225,0.55)";
const TEXT_FAINT = "rgba(240,235,225,0.35)";
const BORDER = "rgba(240,235,225,0.12)";
const CIRCLE_BORDER = "rgba(240,235,225,0.20)";

export default function HeroSection() {
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);

  const [viewportW, setViewportW] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [p1Progress, setP1Progress] = useState(0);
  const [p2Progress, setP2Progress] = useState(0);

  useEffect(() => {
    const onResize = () => setViewportW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setP1Progress(getScrollProgress(phase1Ref.current));
      setP2Progress(getScrollProgress(phase2Ref.current));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ───────────────── Circle sizing ───────────────── */
  // Circle sizing (match your original)
const CIRCLE_SIZE = 340;
const CIRCLE_GAP = 48;
const LEFT_PAD = 80;

  /* PHASE 1: circles from CARDS, move OPPOSITE direction */
  const p1TotalWidth = CARDS.length * (CIRCLE_SIZE + CIRCLE_GAP);
  const p1MaxShift = Math.max(0, p1TotalWidth - viewportW + LEFT_PAD);

  // Opposite direction trick:
  // - normal left-moving strip uses: translateX(-progress * maxShift)
  // - reverse direction uses: start at -maxShift and move toward 0
  //   => translateX(progress*maxShift - maxShift)
  const p1Translate = p1Progress * p1MaxShift - p1MaxShift;

  /* PHASE 2: circles from SERVICES, normal direction (left) */
  const p2TotalWidth = SERVICES.length * (CIRCLE_SIZE + CIRCLE_GAP);
  const p2MaxShift = Math.max(0, p2TotalWidth - viewportW + LEFT_PAD);
  const p2Translate = -p2Progress * p2MaxShift;

  return (
    <>
      {/* ══════════════════════════════════════════
          PHASE 1 — HERO CIRCLES (reverse direction)
      ══════════════════════════════════════════ */}
      <div
        id="hero-intro"
        ref={phase1Ref}
        style={{
          height: `${CARDS.length * 100}vh`,
          background: HERO_BG,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: HERO_BG,
          }}
        >
          {/* Label row (like your screenshot: “Services:”) */}
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              padding: "14px var(--gutter)",
              fontFamily: FONT_SANS,
              fontSize: "12px",
              letterSpacing: "0.18em",
              color: TEXT_MID,
              flexShrink: 0,
            }}
          >
            Intro:
          </div>

          {/* Horizontal strip */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: `${CIRCLE_GAP}px`,
                paddingLeft: `${LEFT_PAD}px`,
                transform: `translateX(${p1Translate}px)`,
                transition: "transform 0.05s linear",
                willChange: "transform",
                flexShrink: 0,
              }}
            >
              {CARDS.map((c) => (
                <div
                  key={c.id}
                  style={{
                    width: `${CIRCLE_SIZE}px`,
                    height: `${CIRCLE_SIZE}px`,
                    borderRadius: "50%",
                    border: `1.5px solid ${CIRCLE_BORDER}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: "default",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      color: TEXT,
                      textAlign: "center",
                      maxWidth: "340px",
                      lineHeight: 1.5,
                      marginBottom: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.title}
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: "18px",
                      fontStyle: "italic",
                      color: TEXT_MID,
                      textAlign: "center",
                      maxWidth: "360px",
                      lineHeight: 1.5,
                    }}
                  >
                    {c.quote}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div
              style={{
                position: "absolute",
                bottom: "36px",
                left: "var(--gutter)",
                fontFamily: FONT_SANS,
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: TEXT_FAINT,
              }}
            >
              Scroll to explore →
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PHASE 2 — SERVICES CIRCLES (normal direction)
      ══════════════════════════════════════════ */}
      <div
        id="hero-services"
        ref={phase2Ref}
        style={{
          height: `${SERVICES.length * 100}vh`,
          background: SERVICES_BG,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: SERVICES_BG,
          }}
        >
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              padding: "14px var(--gutter)",
              fontFamily: FONT_SANS,
              fontSize: "12px",
              letterSpacing: "0.18em",
              color: TEXT_MID,
              flexShrink: 0,
            }}
          >
            Services:
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: `${CIRCLE_GAP}px`,
                paddingLeft: `${LEFT_PAD}px`,
                transform: `translateX(${p2Translate}px)`,
                transition: "transform 0.05s linear",
                willChange: "transform",
                flexShrink: 0,
              }}
            >
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  style={{
                    width: `${CIRCLE_SIZE}px`,
                    height: `${CIRCLE_SIZE}px`,
                    borderRadius: "50%",
                    border: `1.5px solid ${CIRCLE_BORDER}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    cursor: "default",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      color: TEXT,
                      textAlign: "center",
                      maxWidth: "340px",
                      lineHeight: 1.5,
                      whiteSpace: "nowrap",
                      marginBottom: "14px",
                    }}
                  >
                    {s.name}
                  </div>

                  <div
                    style={{
                      fontFamily: FONT_SERIF,
                      fontSize: "18px",
                      fontStyle: "italic",
                      color: TEXT_MID,
                      textAlign: "center",
                      maxWidth: "360px",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "36px",
                left: "var(--gutter)",
                fontFamily: FONT_SANS,
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: TEXT_FAINT,
              }}
            >
              Scroll to explore →
            </div>
          </div>
        </div>
      </div>
    </>
  );
}