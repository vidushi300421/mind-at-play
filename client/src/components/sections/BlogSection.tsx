import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG = "#2E3426";
const TEXT = "#F0EBE1";
const ACCENT = "#F34103";
const BORDER = "rgba(240,235,225,0.1)";

const BLOGS = [
  { id: 1, category: "Mental Conditioning", date: "Jan 2025", title: "Why the Best Athletes Lose on Purpose" },
  { id: 2, category: "Pre-Competition",      date: "Dec 2024", title: "The 20-Minute Ritual That Changes Everything" },
  { id: 3, category: "Recovery",             date: "Nov 2024", title: "Burnout Isn't Tiredness. Here's the Difference." },
  { id: 4, category: "Flow States",          date: "Oct 2024", title: "Getting Out of Your Own Way" },
];

function BlogCard({ blog }: { blog: typeof BLOGS[0] }) {
  return (
    <div style={{
      padding: "40px",
      minHeight: "260px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      cursor: "pointer",
    }}>
      {/* Top: meta + orange arrow */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "9px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.2em",
            color: "rgba(240,235,225,0.4)",
            marginBottom: "5px",
          }}>
            {blog.category}
          </div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "rgba(240,235,225,0.25)",
          }}>
            {blog.date}
          </div>
        </div>

        {/* Orange circle arrow */}
        <div
          style={{
            width: "44px", height: "44px",
            borderRadius: "50%",
            background: ACCENT,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
            color: TEXT,
            flexShrink: 0,
            cursor: "pointer",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1) rotate(15deg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = "scale(1) rotate(0deg)";
          }}
        >
          ↗
        </div>
      </div>

      {/* Bottom: title */}
      <h3 style={{
        fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
        fontSize: "clamp(20px, 2.2vw, 28px)",
        fontWeight: 300,
        fontStyle: "italic",
        lineHeight: 1.2,
        color: TEXT,
      }}>
        {blog.title}
      </h3>
    </div>
  );
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );
    }
    if (leftColRef.current) {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: leftColRef.current, start: "top 85%" } }
      );
    }
    if (rightColRef.current) {
      gsap.fromTo(rightColRef.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.25,
          scrollTrigger: { trigger: rightColRef.current, start: "top 85%" } }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} style={{ background: BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Top label */}
      <div style={{
        padding: "14px 40px",
        borderBottom: `1px solid ${BORDER}`,
        fontFamily: "Visuelt, 'DM Sans', sans-serif",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "rgba(240,235,225,0.3)",
      }}>
        Field Notes:
      </div>

      {/* Heading row */}
      <div ref={headingRef} style={{
        padding: "48px 40px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: `1px solid ${BORDER}`,
        gap: "24px",
        flexWrap: "wrap" as const,
      }}>
        <div>
          <div style={{
            fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 700,
            lineHeight: 0.9,
            color: TEXT,
            letterSpacing: "-0.025em",
            textTransform: "uppercase" as const,
          }}>
            Stories
          </div>
          <div style={{
            fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 0.9,
            color: TEXT,
            letterSpacing: "-0.025em",
          }}>
            behind the work
          </div>
        </div>

        {/* Read more button */}
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
            el.style.color = TEXT;
            el.style.gap = "20px";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "transparent";
            el.style.color = ACCENT;
            el.style.gap = "14px";
          }}
        >
          Read more blogs →
        </div>
      </div>

      {/* Staggered 2-column card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1, position: "relative" }}>

        {/* Left column — cards 1 & 3 at normal position */}
        <div ref={leftColRef} style={{ borderRight: `1px solid ${BORDER}` }}>
          <BlogCard blog={BLOGS[0]} />
          {/* Inter-card divider with + marks */}
          <div style={{ height: "1px", background: BORDER, position: "relative" }}>
            <span style={{ position: "absolute", right: "-5px", top: "-7px", color: "rgba(240,235,225,0.3)", fontSize: "11px", lineHeight: 1 }}>+</span>
            <span style={{ position: "absolute", left: "0px", top: "-7px", color: "rgba(240,235,225,0.3)", fontSize: "11px", lineHeight: 1 }}>+</span>
          </div>
          <BlogCard blog={BLOGS[2]} />
        </div>

        {/* Right column — cards 2 & 4, staggered down 130px */}
        <div ref={rightColRef} style={{ paddingTop: "130px" }}>
          <BlogCard blog={BLOGS[1]} />
          <div style={{ height: "1px", background: BORDER, position: "relative" }}>
            <span style={{ position: "absolute", right: "0px", top: "-7px", color: "rgba(240,235,225,0.3)", fontSize: "11px", lineHeight: 1 }}>+</span>
            <span style={{ position: "absolute", left: "-5px", top: "-7px", color: "rgba(240,235,225,0.3)", fontSize: "11px", lineHeight: 1 }}>+</span>
          </div>
          <BlogCard blog={BLOGS[3]} />
        </div>

        {/* + mark at top of column divider */}
        <div style={{ position: "absolute", left: "50%", top: "0", transform: "translateX(-50%)", color: "rgba(240,235,225,0.3)", fontSize: "11px", lineHeight: 1, pointerEvents: "none" }}>+</div>
        {/* + mark at bottom of column divider */}
        <div style={{ position: "absolute", left: "50%", bottom: "0", transform: "translateX(-50%)", color: "rgba(240,235,225,0.3)", fontSize: "11px", lineHeight: 1, pointerEvents: "none" }}>+</div>
      </div>
    </div>
  );
}
