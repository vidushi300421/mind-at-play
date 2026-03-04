import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_BG = "#0A1A2F";   // deep navy
const TEXT      = "#F0EBE1";
const BORDER    = "rgba(255,255,255,0.07)";

// Per-card accent colors — vibrant blues, teal, indigo; all calming
const CARD_ACCENTS = [
  { bg: "#133A5E", accent: "#5AB4D6" },  // steel blue
  { bg: "#0D3B3B", accent: "#4EC9B0" },  // deep teal
  { bg: "#1A2B6E", accent: "#8A9FE8" },  // indigo
  { bg: "#1A4A72", accent: "#61B8DE" },  // ocean blue
];

const BLOGS = [
  { id: 1, category: "Mental Conditioning", date: "Jan 2025", title: "Why the Best Athletes Lose on Purpose" },
  { id: 2, category: "Pre-Competition",      date: "Dec 2024", title: "The 20-Minute Ritual That Changes Everything" },
  { id: 3, category: "Recovery",             date: "Nov 2024", title: "Burnout Isn't Tiredness. Here's the Difference." },
  { id: 4, category: "Flow States",          date: "Oct 2024", title: "Getting Out of Your Own Way" },
];

function BlogCard({ blog, cardIndex }: { blog: typeof BLOGS[0]; cardIndex: number }) {
  const { bg, accent } = CARD_ACCENTS[cardIndex];
  return (
    <div style={{
      background: bg,
      padding: "40px",
      minHeight: "260px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      cursor: "pointer",
      transition: "filter 0.3s",
    }}
    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.filter = "brightness(1.12)"}
    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.filter = "brightness(1)"}
    >
      {/* Top: meta + circle arrow */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "9px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.2em",
            color: accent,
            opacity: 0.85,
            marginBottom: "5px",
          }}>
            {blog.category}
          </div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.1em",
            color: "rgba(240,235,225,0.3)",
          }}>
            {blog.date}
          </div>
        </div>

        {/* Circle arrow in card accent color */}
        <div
          style={{
            width: "40px", height: "40px",
            borderRadius: "50%",
            border: `1.5px solid ${accent}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px",
            color: accent,
            flexShrink: 0,
            cursor: "pointer",
            transition: "background 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = accent;
            (e.currentTarget as HTMLDivElement).style.color = bg;
            (e.currentTarget as HTMLDivElement).style.transform = "rotate(15deg)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = "transparent";
            (e.currentTarget as HTMLDivElement).style.color = accent;
            (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg)";
          }}
        >
          ↗
        </div>
      </div>

      {/* Bottom: title */}
      <h3 style={{
        fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
        fontSize: "clamp(18px, 1.6vw, 26px)",
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
    <div style={{ background: SECTION_BG, minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Top label */}
      <div style={{
        padding: "14px 6vw",
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
        padding: "48px 6vw 40px",
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
            fontSize: "clamp(40px, 5vw, 76px)",
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
            fontSize: "clamp(40px, 5vw, 76px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 0.9,
            color: TEXT,
            letterSpacing: "-0.025em",
          }}>
            behind the work
          </div>
        </div>

        {/* CTA — gold */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "11px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.16em",
            color: "#D5BF86",
            border: "1px solid #D5BF86",
            padding: "14px 24px",
            cursor: "pointer",
            transition: "gap 0.3s, background 0.3s, color 0.3s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "#D5BF86";
            el.style.color = "#0A1A2F";
            el.style.gap = "20px";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "transparent";
            el.style.color = "#D5BF86";
            el.style.gap = "14px";
          }}
        >
          Read more blogs →
        </div>
      </div>

      {/* Staggered 2-column card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flex: 1 }}>

        {/* Left column */}
        <div ref={leftColRef} style={{ borderRight: `1px solid ${BORDER}` }}>
          <BlogCard blog={BLOGS[0]} cardIndex={0} />
          <div style={{ height: "1px", background: BORDER }} />
          <BlogCard blog={BLOGS[2]} cardIndex={2} />
        </div>

        {/* Right column — staggered down */}
        <div ref={rightColRef} style={{ paddingTop: "120px" }}>
          <BlogCard blog={BLOGS[1]} cardIndex={1} />
          <div style={{ height: "1px", background: BORDER }} />
          <BlogCard blog={BLOGS[3]} cardIndex={3} />
        </div>
      </div>
    </div>
  );
}
