import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_BG = "#20231A";
const TEXT = "rgba(255,255,255,0.92)";
const TEXT_SOFT = "rgba(255,255,255,0.60)";
const HAIRLINE = "rgba(255,255,255,0.14)";
const CARD_BG = "rgba(255,255,255,0.06)";
const CARD_BG_HOVER = "rgba(255,255,255,0.09)";
const CARD_BD = "rgba(255,255,255,0.14)";
const ACCENT = "#F34103";

const BLOGS = [
  { id: 1, category: "Mental Conditioning", date: "Jan 2025", title: "Why the Best Athletes Lose on Purpose" },
  { id: 2, category: "Pre-Competition", date: "Dec 2024", title: "The 20-Minute Ritual That Changes Everything" },
  { id: 3, category: "Recovery", date: "Nov 2024", title: "Burnout Isn’t Tiredness. Here’s the Difference." },
  { id: 4, category: "Flow States", date: "Oct 2024", title: "Getting Out of Your Own Way" },
];

function CornerPluses() {
  // little "+" marks at the 4 corners of a card like the reference
  const plusStyle: React.CSSProperties = {
    position: "absolute",
    width: 10,
    height: 10,
    color: "rgba(255,255,255,0.65)",
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
    fontSize: 12,
    lineHeight: "10px",
    display: "grid",
    placeItems: "center",
    pointerEvents: "none",
  };

  return (
    <>
      <span style={{ ...plusStyle, top: -6, left: -6 }}>+</span>
      <span style={{ ...plusStyle, top: -6, right: -6 }}>+</span>
      <span style={{ ...plusStyle, bottom: -6, left: -6 }}>+</span>
      <span style={{ ...plusStyle, bottom: -6, right: -6 }}>+</span>
    </>
  );
}

function BlogCard({ blog }: { blog: typeof BLOGS[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const enter = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { y: -10, duration: 0.35, ease: "power3.out" });
    el.style.background = CARD_BG_HOVER;
    el.style.borderColor = "rgba(255,255,255,0.22)";
    el.style.boxShadow = "0 26px 60px rgba(0,0,0,0.38)";
  };

  const leave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { y: 0, duration: 0.4, ease: "power3.inOut" });
    el.style.background = CARD_BG;
    el.style.borderColor = CARD_BD;
    el.style.boxShadow = "0 14px 40px rgba(0,0,0,0.26)";
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        position: "relative",
        background: CARD_BG,
        border: `1px solid ${CARD_BD}`,
        borderRadius: 18,
        padding: "22px 22px",
        height: "100%",
        minHeight: 190,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 14px 40px rgba(0,0,0,0.26)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
      }}
    >
      <CornerPluses />

      {/* Meta */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.78)",
              marginBottom: 6,
            }}
          >
            {blog.category}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: TEXT_SOFT,
            }}
          >
            {blog.date}
          </div>
        </div>

        {/* Orange arrow circle like the reference */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            background: ACCENT,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 14,
            flexShrink: 0,
            boxShadow: "0 18px 40px rgba(243,65,3,0.26)",
          }}
          aria-hidden
        >
          ↗
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(16px, 1.35vw, 20px)",
          lineHeight: 1.25,
          color: TEXT,
          letterSpacing: "-0.01em",
          maxWidth: "22ch",
        }}
      >
        {blog.title}
      </div>
    </div>
  );
}

export default function BlogSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const placedRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
          }
        );
      }

      placedRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      style={{
        background: SECTION_BG,
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "72px var(--gutter) 56px",
      }}
    >
      {/* Header (pricing-like editorial heading) */}
      <div
        ref={headerRef}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 18,
          marginBottom: 28,
        }}
      >
        <div style={{ maxWidth: 980 }}>
          <h2
            style={{
              margin: 0,
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(44px, 6.2vw, 92px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: TEXT,
            }}
          >
            Field <span style={{ fontStyle: "italic", fontWeight: 400 }}>notes</span>
            <br />
            for the <span style={{ fontStyle: "italic", fontWeight: 400 }}>athlete</span>.
          </h2>

          <div
            style={{
              marginTop: 16,
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              lineHeight: 1.8,
              color: TEXT_SOFT,
              maxWidth: 560,
            }}
          >
            Short reads on pressure, confidence, recovery, and performance routines.
          </div>
        </div>

        {/* CTA (optional, like screenshot button) */}
        <button
          type="button"
          style={{
            marginTop: 10,
            background: ACCENT,
            border: "none",
            color: "#fff",
            padding: "16px 22px",
            minWidth: 220,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            boxShadow: "0 22px 60px rgba(243,65,3,0.28)",
            flexShrink: 0,
            height: 52,
          }}
        >
          <span>Read more</span>
          <span style={{ fontSize: 16 }}>→</span>
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: HAIRLINE, marginBottom: 26, flexShrink: 0 }} />

      {/* Placed layout area (matches the screenshot’s “floating” composition) */}
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gridTemplateRows: "repeat(6, minmax(0, 1fr))",
          gap: 26, // ✅ breathing space between cards
          alignItems: "stretch",
        }}
      >
        {/* Card 1 (upper-left) */}
        <div
          ref={(el) => {
            placedRefs.current[0] = el;
          }}
          style={{
            gridColumn: "1 / span 4",
            gridRow: "1 / span 3",
            alignSelf: "end",
          }}
        >
          <BlogCard blog={BLOGS[0]} />
        </div>

        {/* Card 2 (upper-mid/right) */}
        <div
          ref={(el) => {
            placedRefs.current[1] = el;
          }}
          style={{
            gridColumn: "7 / span 4",
            gridRow: "1 / span 3",
            alignSelf: "end",
          }}
        >
          <BlogCard blog={BLOGS[1]} />
        </div>

        {/* Card 3 (lower-middle, slightly left like screenshot) */}
        <div
          ref={(el) => {
            placedRefs.current[2] = el;
          }}
          style={{
            gridColumn: "4 / span 4",
            gridRow: "4 / span 3",
            alignSelf: "start",
          }}
        >
          <BlogCard blog={BLOGS[2]} />
        </div>

        {/* Card 4 (lower-right) */}
        <div
          ref={(el) => {
            placedRefs.current[3] = el;
          }}
          style={{
            gridColumn: "10 / span 3",
            gridRow: "4 / span 3",
            alignSelf: "start",
          }}
        >
          <BlogCard blog={BLOGS[3]} />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 1100px) {
          section {
            height: auto !important;
            overflow: visible !important;
          }
          section > div[style*="grid-template-columns: repeat(12"]{
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            grid-template-rows: auto !important;
          }
          /* reset placements */
          section > div[style*="grid-template-columns: repeat(2"] > div {
            grid-column: auto !important;
            grid-row: auto !important;
            align-self: stretch !important;
          }
        }
        @media (max-width: 640px) {
          section > div[style*="grid-template-columns: repeat(2"]{
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}