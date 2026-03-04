import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_BG = "#F2F6FA";   // very light blue-grey
const CARD_BG    = "#C8DAF0";   // unified soft blue fill
const TEXT_DARK  = "#1A2B3C";
const TEXT_MID   = "rgba(26,43,60,0.55)";
const BORDER     = "rgba(26,43,60,0.08)";
const ACCENT     = "#2E5FA3";   // deeper blue for accents

const BLOGS = [
  { id: 1, category: "Mental Conditioning", date: "Jan 2025", title: "Why the Best Athletes Lose on Purpose" },
  { id: 2, category: "Pre-Competition",      date: "Dec 2024", title: "The 20-Minute Ritual That Changes Everything" },
  { id: 3, category: "Recovery",             date: "Nov 2024", title: "Burnout Isn't Tiredness. Here's the Difference." },
  { id: 4, category: "Flow States",          date: "Oct 2024", title: "Getting Out of Your Own Way" },
];

function BlogCard({ blog }: { blog: typeof BLOGS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      y: -14,
      rotateX: -4,
      rotateZ: -0.5,
      boxShadow: "0 40px 80px rgba(26,43,60,0.22), 0 12px 24px rgba(26,43,60,0.12)",
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      y: 0,
      rotateX: 0,
      rotateZ: 0,
      boxShadow: "0 2px 8px rgba(26,43,60,0.06)",
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: CARD_BG,
        padding: "40px 36px",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(26,43,60,0.06)",
        transformStyle: "preserve-3d",
        transformOrigin: "bottom center",
        willChange: "transform",
      }}
    >
      {/* Top meta + arrow */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "9px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.2em",
            color: ACCENT,
            marginBottom: "4px",
          }}>
            {blog.category}
          </div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.08em",
            color: TEXT_MID,
          }}>
            {blog.date}
          </div>
        </div>

        {/* Arrow circle */}
        <div style={{
          width: "36px", height: "36px",
          borderRadius: "50%",
          border: `1.5px solid ${ACCENT}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px",
          color: ACCENT,
          flexShrink: 0,
          transition: "background 0.25s, color 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = ACCENT;
          (e.currentTarget as HTMLDivElement).style.color = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "transparent";
          (e.currentTarget as HTMLDivElement).style.color = ACCENT;
        }}
        >
          ↗
        </div>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
        fontSize: "clamp(20px, 1.8vw, 28px)",
        fontWeight: 300,
        lineHeight: 1.25,
        color: TEXT_DARK,
        letterSpacing: "-0.01em",
      }}>
        {blog.title}
      </h3>
    </div>
  );
}

export default function BlogSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );
    }
    if (leftColRef.current) {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: leftColRef.current, start: "top 85%" } }
      );
    }
    if (rightColRef.current) {
      gsap.fromTo(rightColRef.current,
        { opacity: 0, y: 72 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.22,
          scrollTrigger: { trigger: rightColRef.current, start: "top 85%" } }
      );
    }
  }, []);

  return (
    <div style={{
      background: SECTION_BG,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Top label */}
      <div style={{
        padding: "14px 6vw",
        borderBottom: `1px solid ${BORDER}`,
        fontFamily: "Visuelt, 'DM Sans', sans-serif",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: TEXT_MID,
      }}>
        Field Notes:
      </div>

      {/* Heading + CTA */}
      <div ref={headingRef} style={{
        padding: "48px 6vw 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: `1px solid ${BORDER}`,
        flexWrap: "wrap" as const,
        gap: "24px",
      }}>
        <div>
          <div style={{
            fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
            fontSize: "clamp(44px, 5.5vw, 80px)",
            fontWeight: 700,
            lineHeight: 0.88,
            color: TEXT_DARK,
            letterSpacing: "-0.03em",
            textTransform: "uppercase" as const,
          }}>
            Stories
          </div>
          <div style={{
            fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
            fontSize: "clamp(44px, 5.5vw, 80px)",
            fontWeight: 300,
            lineHeight: 0.88,
            color: TEXT_DARK,
            letterSpacing: "-0.03em",
          }}>
            behind the work
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "11px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.16em",
            color: ACCENT,
            border: `1px solid ${ACCENT}`,
            padding: "14px 24px",
            cursor: "pointer",
            transition: "gap 0.3s, background 0.3s, color 0.3s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = ACCENT;
            el.style.color = "#FFFFFF";
            el.style.gap = "20px";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "transparent";
            el.style.color = ACCENT;
            el.style.gap = "14px";
          }}
        >
          Read all →
        </div>
      </div>

      {/* Staggered 2-column card grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        flex: 1,
        perspective: "1200px",
      }}>
        {/* Left column */}
        <div ref={leftColRef} style={{ borderRight: `1px solid ${BORDER}`, display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ flex: 1, padding: "32px 6vw 32px 6vw" }}>
            <BlogCard blog={BLOGS[0]} />
          </div>
          <div style={{ height: "1px", background: BORDER }} />
          <div style={{ flex: 1, padding: "32px 6vw 32px 6vw" }}>
            <BlogCard blog={BLOGS[2]} />
          </div>
        </div>

        {/* Right column — staggered down */}
        <div ref={rightColRef} style={{ paddingTop: "100px", display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ flex: 1, padding: "32px 6vw 32px 6vw" }}>
            <BlogCard blog={BLOGS[1]} />
          </div>
          <div style={{ height: "1px", background: BORDER }} />
          <div style={{ flex: 1, padding: "32px 6vw 32px 6vw" }}>
            <BlogCard blog={BLOGS[3]} />
          </div>
        </div>
      </div>
    </div>
  );
}
