import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LeftPanelProps {
  activeSection: number;
}

const STATES = [
  {
    headline: [
      { t: "The", w: "font-light" },
      { t: "mind", w: "font-semibold" },
      { t: "behind", w: "font-light italic" },
      { t: "the", w: "font-light" },
      { t: "athlete.", w: "font-semibold" },
    ],
    sub: "A sports psychology studio for athletes, coaches, and the ones who raise them.",
    note: "Scroll to begin ↓",
  },
  {
    headline: [
      { t: "Building", w: "font-semibold" },
      { t: "mental", w: "font-light italic" },
      { t: "armour", w: "font-semibold" },
      { t: "—", w: "" },
      { t: "quietly", w: "font-light italic" },
      { t: "relentless.", w: "font-semibold" },
    ],
    sub: "Confidence • focus • pressure • performance routines • competition nerves • comeback seasons.",
    note: "",
  },
];

export default function LeftPanel({ activeSection }: LeftPanelProps) {
  // Left panel exists ONLY for sections 1 and 2
  if (activeSection > 2) return null;

  const contentRef = useRef<HTMLDivElement>(null);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    const nextIndex = activeSection - 1;
    if (
      nextIndex === currentStateIndex ||
      nextIndex < 0 ||
      nextIndex >= STATES.length
    )
      return;

    gsap.to(contentRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentStateIndex(nextIndex);
        gsap.set(contentRef.current, { y: 40 });
        gsap.to(contentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out",
        });
      },
    });
  }, [activeSection, currentStateIndex]);

  const state = STATES[currentStateIndex];

  return (
    <div
      className="left-panel"
      style={{
        background: "#F5EFE6",
        color: "#111111",
        height: "100%",
      }}
    >
      {/* Center the content vertically */}
      <div
        ref={contentRef}
        className="h-full flex flex-col justify-center"
        style={{
          padding: "32px 48px",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          {/* Headline */}
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(52px, 6vw, 96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              textTransform: "none",
            }}
          >
            {state.headline.map((part, i) => (
              <div key={i} className={part.w} style={{ textTransform: "none" }}>
                {part.t}
              </div>
            ))}
          </div>

          {/* Sub text */}
          <div
            style={{
              marginTop: 52,
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.65,
              opacity: 0.75,
              maxWidth: 380,
              textTransform: "none",
            }}
          >
            {state.sub}
          </div>

          {/* Scroll hint */}
          {state.note ? (
            <div
              style={{
                marginTop: 16,
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                opacity: 0.65,
                textTransform: "none",
              }}
            >
              {state.note}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}