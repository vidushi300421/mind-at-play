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

// The arousal curve — inverted U shape
// x and y are percentages of the container
const CURVE_POINTS = PILLS.map(p => ({ x: p.x, y: p.y }));

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

      // How far the big text strip moves
      setTextOffset(progress);

      // Which pill to drop next
      const index = Math.min(
        Math.floor(progress * PILLS.length),
        PILLS.length - 1
      );

      if (index !== prevIndex.current && index >= 0) {
        prevIndex.current = index;
        setActiveIndex(index);

        // Animate pill dropping in
        const el = pillRefs.current[index];
        if (el) {
          gsap.fromTo(el,
            { y: -120, opacity: 0, scale: 0.7, rotate: -8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.7,
              ease: "bounce.out",
            }
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // How far the text strip shifts — moves left as you scroll
  const TEXT_TRAVEL = 60; // vw
  const shift = textOffset * TEXT_TRAVEL;

  return (
    // Outer — tall for scroll room
    <div
      ref={outerRef}
      style={{
        height: `${PILLS.length * 100 + 100}vh`,
        background: "#2E3426",
        position: "relative",
      }}
    >
      {/* Sticky inner */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>

        {/* Top label */}
        <div style={{
          padding: "20px 48px",
          borderBottom: "1px solid rgba(240,235,225,0.1)",
          fontFamily: "Visuelt, 'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(240,235,225,0.4)",
          flexShrink: 0,
        }}>
          Inner World:
        </div>

        {/* Horizontally moving big text */}
        <div style={{
          flexShrink: 0,
          overflow: "hidden",
          padding: "32px 0 24px",
          borderBottom: "1px solid rgba(240,235,225,0.08)",
        }}>
          <div style={{
            display: "flex",
            gap: "60px",
            transform: `translateX(-${shift}vw)`,
            transition: "transform 0.08s linear",
            willChange: "transform",
            paddingLeft: "48px",
            whiteSpace: "nowrap",
          }}>
            {/* Repeat words twice for seamless feel */}
            {[...BIG_WORDS, ...BIG_WORDS].map((word, i) => (
              <span key={i} style={{
                fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                fontSize: "clamp(56px, 8vw, 110px)",
                fontWeight: 300,
                fontStyle: i % 2 === 0 ? "normal" : "italic",
                color: i % 3 === 0 ? "#F0EBE1" : i % 3 === 1 ? "#D5BF86" : "rgba(240,235,225,0.25)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                userSelect: "none",
              }}>
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Pills area — arousal curve */}
        <div style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Curve line — inverted U SVG */}
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              opacity: 0.15,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d={`M ${CURVE_POINTS.map(p => `${p.x},${p.y}`).join(" L ")}`}
              fill="none"
              stroke="#D5BF86"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Axis labels */}
          <div style={{
            position: "absolute",
            bottom: "24px",
            left: "48px",
            right: "48px",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(240,235,225,0.3)",
          }}>
            <span>Low Arousal</span>
            <span>← Performance →</span>
            <span>High Arousal</span>
          </div>

          {/* Y axis label */}
          <div style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(240,235,225,0.3)",
            whiteSpace: "nowrap",
          }}>
            Performance
          </div>

          {/* Pills positioned along the curve */}
          {PILLS.map((pill, i) => (
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
              <div style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "#2E3426",
                background: i === 4 ? "#D5BF86" : "#F0EBE1", // peak is gold
                padding: "8px 16px",
                borderRadius: "100px",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}>
                {pill.word}
              </div>
              {/* Category label below pill */}
              <div style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "9px",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "rgba(240,235,225,0.35)",
                textAlign: "center",
                marginTop: "6px",
              }}>
                {pill.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}