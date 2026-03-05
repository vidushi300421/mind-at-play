import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PILLS = [
  { word: "ANXIETY",    category: "The Battles", x: 8,   y: 72  },
  { word: "FEAR",       category: "The Battles", x: 18,  y: 58  },
  { word: "DRIVE",      category: "The Fuel",    x: 30,  y: 38  },
  { word: "HUNGER",     category: "The Fuel",    x: 42,  y: 22  },
  { word: "FOCUS",      category: "The Peak",    x: 54,  y: 14  },
  { word: "PRESSURE",   category: "The Edge",    x: 66,  y: 22  },
  { word: "RESILIENCE", category: "The Edge",    x: 76,  y: 38  },
  { word: "BURNOUT",    category: "The Cost",    x: 86,  y: 58  },
  { word: "SACRIFICE",  category: "The Cost",    x: 94,  y: 72  },
];

// x and y are percentages of the container
const CURVE_POINTS = PILLS.map((p) => ({ x: p.x, y: p.y }));

const BIG_WORDS = [
  "ANXIETY", "FEAR", "DRIVE", "HUNGER",
  "FOCUS", "PRESSURE", "RESILIENCE", "BURNOUT", "SACRIFICE"
];

export default function InnerWorldSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndex = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [textOffset, setTextOffset] = useState(0);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const handleScroll = () => {
      const rect = outer.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(scrolled / total, 1));

      setTextOffset(progress);

      const index = Math.min(
        Math.floor(progress * PILLS.length),
        PILLS.length - 1
      );

      if (index !== prevIndex.current && index >= 0) {
        prevIndex.current = index;
        setActiveIndex(index);

        const el = pillRefs.current[index];
        if (el) {
          gsap.fromTo(
            el,
            { y: -140, opacity: 0, scale: 0.72, rotate: -10 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.75,
              ease: "bounce.out",
            }
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // How far the text strip shifts — moves left as you scroll
  const TEXT_TRAVEL = 68; // vw (a bit more dramatic)
  const shift = textOffset * TEXT_TRAVEL;

  // Colors (section-scoped)
  const BG = "#B83A16";              // deeper burnt orange
  const INK = "#1C1F16";             // deep ink for pills text
  const CREAM = "#F0EBE1";
  const GOLD = "#D5BF86";

  return (
    <div
      ref={outerRef}
      style={{
        height: `${PILLS.length * 100 + 100}vh`,
        background: BG,
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
        }}
      >
        {/* Editorial Title Bar */}
        <div
          style={{
            padding: "22px 48px",
            borderBottom: "1px solid rgba(240,235,225,0.14)",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "24px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: "Playfair Display, SangBleuKing, serif",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: CREAM,
            }}
          >
            The Inner World
          </div>

          <div
            style={{
              fontFamily: "Cabinet Grotesk, Visuelt, 'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(240,235,225,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            Scroll → build the curve
          </div>
        </div>

        {/* Big moving words strip */}
        <div
          style={{
            flexShrink: 0,
            overflow: "hidden",
            padding: "34px 0 26px",
            borderBottom: "1px solid rgba(240,235,225,0.10)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "72px",
              transform: `translateX(-${shift}vw)`,
              transition: "transform 0.08s linear",
              willChange: "transform",
              paddingLeft: "48px",
              whiteSpace: "nowrap",
            }}
          >
            {[...BIG_WORDS, ...BIG_WORDS].map((word, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "Playfair Display, SangBleuKing, serif",
                  fontSize: "clamp(64px, 9vw, 132px)",
                  fontWeight: i % 2 === 0 ? 700 : 500,
                  fontStyle: i % 3 === 0 ? "italic" : "normal",
                  color:
                    i % 3 === 0
                      ? CREAM
                      : i % 3 === 1
                        ? GOLD
                        : "rgba(240,235,225,0.22)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  userSelect: "none",
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Pills area — curve */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Curve line — thicker + layered for visibility */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: 1,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* soft glow under */}
            <path
              d={`M ${CURVE_POINTS.map((p) => `${p.x},${p.y}`).join(" L ")}`}
              fill="none"
              stroke="rgba(240,235,225,0.12)"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* dashed gold line on top */}
            <path
              d={`M ${CURVE_POINTS.map((p) => `${p.x},${p.y}`).join(" L ")}`}
              fill="none"
              stroke={GOLD}
              strokeWidth="0.9"
              strokeDasharray="3 3"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.7}
            />
          </svg>

          {/* Axis labels (bigger + cleaner) */}
          <div
            style={{
              position: "absolute",
              bottom: "22px",
              left: "48px",
              right: "48px",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Cabinet Grotesk, Visuelt, 'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(240,235,225,0.42)",
            }}
          >
            <span>Low Arousal</span>
            <span>Performance</span>
            <span>High Arousal</span>
          </div>

          {/* Y axis label */}
          <div
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              fontFamily: "Cabinet Grotesk, Visuelt, 'DM Sans', sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "rgba(240,235,225,0.42)",
              whiteSpace: "nowrap",
            }}
          >
            Performance
          </div>

          {/* Pills */}
          {PILLS.map((pill, i) => {
            const isPeak = i === 4;

            return (
              <div
                key={pill.word}
                ref={(el) => { pillRefs.current[i] = el; }}
                style={{
                  position: "absolute",
                  left: `${pill.x}%`,
                  top: `${pill.y}%`,
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    fontFamily: "Cabinet Grotesk, Visuelt, 'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    color: INK,
                    background: isPeak ? GOLD : CREAM,
                    padding: "12px 22px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                    border: isPeak ? "2px solid rgba(28,31,22,0.10)" : "2px solid rgba(28,31,22,0.08)",
                    boxShadow: isPeak
                      ? "0 18px 54px rgba(0,0,0,0.38)"
                      : "0 14px 44px rgba(0,0,0,0.34)",
                    transform: isPeak ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  {pill.word}
                </div>

                <div
                  style={{
                    fontFamily: "Cabinet Grotesk, Visuelt, 'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    color: "rgba(240,235,225,0.5)",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {pill.category}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}