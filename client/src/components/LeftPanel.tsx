import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LeftPanelProps {
  activeSection: number;
}

const STATES = [
  {
    label: "Sports Psychologist",
    text: [
      { t: "THE", w: "font-light" },
      { t: "MIND", w: "font-bold" },
      { t: "BEHIND", w: "font-light italic" },
      { t: "THE", w: "font-light" },
      { t: "ATHLETE.", w: "font-bold" },
    ],
    bottom: "ADISHRI DUBEY"
  },
  {
    label: "What we work on",
    text: [{ t: "BUILDING / MENTAL / ARMOUR.", w: "font-light" }],
    bottom: "From the training ground to the podium.",
    bottomItalic: true
  },
  {
    label: "From the field",
    text: [{ t: "MIND / MEETS / SPORT.", w: "font-light" }],
    bottom: "Research, stories, and tools for athletes.",
    bottomItalic: true
  },
  {
    label: "The athlete's inner world",
    text: [{ t: "WHAT / LIVES / INSIDE.", w: "font-light" }],
    bottom: "Every champion has fought these battles.",
    bottomItalic: true
  },
  {
    label: "Invest in your mind",
    text: [{ t: "YOUR / NEXT / LEVEL.", w: "font-light" }],
    bottom: ""
  },
  {
    label: "Let's begin",
    text: [{ t: "READY / TO / PERFORM?", w: "font-light" }],
    bottom: ""
  }
];

export default function LeftPanel({ activeSection }: LeftPanelProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    const nextIndex = activeSection - 1;
    if (nextIndex === currentStateIndex || nextIndex < 0 || nextIndex >= STATES.length) return;

    gsap.to(contentRef.current, {
      y: -44,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentStateIndex(nextIndex);
        gsap.set(contentRef.current, { y: 44 });
        gsap.to(contentRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power3.out"
        });
      }
    });
  }, [activeSection]);

  const state = STATES[currentStateIndex];

  return (
    <div className="left-panel">
      <div ref={contentRef} className="h-full flex flex-col justify-between">
        {/* Top Label */}
        <div className="font-sans text-[11px] uppercase tracking-[0.2em] text-accent-red">
          {state.label}
        </div>

        {/* Center Text */}
        <div className="font-serif text-[clamp(44px,6vw,82px)] text-foreground leading-[0.95]">
          {state.text.map((part, i) => (
            <div key={i} className={part.w}>{part.t}</div>
          ))}
        </div>

        {/* Bottom text */}
        <div className={`font-sans ${state.bottomItalic ? 'text-[16px] italic opacity-70 font-serif' : 'text-[11px] uppercase tracking-[0.2em] text-accent-red'}`}>
          {state.bottom}
          {currentStateIndex === 0 && (
            <span className="inline-block ml-2 animate-bounce">↓</span>
          )}
        </div>
      </div>

    </div>
  );
}