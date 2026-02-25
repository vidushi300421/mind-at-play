import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOGS = [
  {
    id: 1,
    category: "Mental Conditioning",
    date: "Jan 2025",
    title: "Why the Best Athletes Lose on Purpose",
    excerpt: "The counterintuitive training method elite performers use to build unshakeable composure under pressure.",
    dark: true,
  },
  {
    id: 2,
    category: "Pre-Competition",
    date: "Dec 2024",
    title: "The 20-Minute Ritual That Changes Everything",
    excerpt: "How a structured pre-match mental routine can be the difference between your best and worst performance.",
    dark: false,
  },
  {
    id: 3,
    category: "Recovery",
    date: "Nov 2024",
    title: "Burnout Isn't Tiredness. Here's the Difference.",
    excerpt: "Understanding the psychological signs of burnout before they derail your season — and what to do instead.",
    dark: false,
  },
  {
    id: 4,
    category: "Flow States",
    date: "Oct 2024",
    title: "Getting Out of Your Own Way",
    excerpt: "The science of flow and why thinking too hard is the enemy of peak athletic performance.",
    dark: true,
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" }
        }
      );
    }

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const isRight = i % 2 !== 0;
      gsap.fromTo(card,
        { opacity: 0, y: 60, rotate: isRight ? 1.5 : -1.5 },
        {
          opacity: 1, y: 0, rotate: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" }
        }
      );
    });
  }, []);

  return (
    <div ref={sectionRef} style={{
      background: "#F1F0CC",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Label */}
      <div style={{
        borderBottom: "1px solid rgba(63,13,18,0.15)",
        padding: "14px 40px",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "rgba(63,13,18,0.55)",
      }}>
        Field Notes:
      </div>

      {/* Heading row */}
      <div ref={headingRef} style={{
        padding: "48px 40px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: "1px solid rgba(63,13,18,0.08)",
        gap: "24px",
        flexWrap: "wrap" as const,
      }}>
        <div>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 700,
            lineHeight: 0.9,
            color: "#3F0D12",
            letterSpacing: "-0.03em",
            textTransform: "uppercase" as const,
          }}>
            Stories
          </h2>
          <h2 style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 0.9,
            color: "#3F0D12",
            letterSpacing: "-0.03em",
          }}>
            behind the work
          </h2>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "11px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.16em",
            color: "#3F0D12",
            border: "1px solid rgba(63,13,18,0.25)",
            padding: "14px 24px",
            cursor: "pointer",
            transition: "gap 0.3s, background 0.3s, color 0.3s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "#3F0D12";
            el.style.color = "#F1F0CC";
            el.style.gap = "20px";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.background = "transparent";
            el.style.color = "#3F0D12";
            el.style.gap = "14px";
          }}
        >
          Read all →
        </div>
      </div>

      {/* 2x2 Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        flex: 1,
      }}>
        {BLOGS.map((blog, i) => (
          <div
            key={blog.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              background: blog.dark ? "#3F0D12" : "#F1F0CC",
              borderRight: i % 2 === 0 ? "1px solid rgba(63,13,18,0.1)" : "none",
              borderBottom: i < 2 ? "1px solid rgba(63,13,18,0.1)" : "none",
              padding: "32px",
              display: "flex",
              flexDirection: "column" as const,
              justifyContent: "space-between",
              minHeight: "280px",
              position: "relative" as const,
              cursor: "pointer",
              transition: "padding 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingBottom = "40px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingBottom = "32px";
            }}
          >
            {/* Corner plus marks — like reference */}
            {[
              { top: -1, left: -1 },
              { top: -1, right: -1 },
              { bottom: -1, left: -1 },
              { bottom: -1, right: -1 },
            ].map((pos, j) => (
              <div key={j} style={{
                position: "absolute" as const,
                ...pos,
                width: "10px",
                height: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "12px",
                color: blog.dark ? "rgba(241,240,204,0.2)" : "rgba(63,13,18,0.2)",
                zIndex: 2,
              }}>
                +
              </div>
            ))}

            {/* Top meta */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "9px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.2em",
                  color: blog.dark ? "rgba(241,240,204,0.45)" : "rgba(63,13,18,0.45)",
                  marginBottom: "6px",
                }}>
                  {blog.category}
                </div>
                <div style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: blog.dark ? "rgba(241,240,204,0.3)" : "rgba(63,13,18,0.3)",
                }}>
                  {blog.date}
                </div>
              </div>

              {/* Arrow button */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: `1px solid ${blog.dark ? "rgba(241,240,204,0.2)" : "rgba(63,13,18,0.2)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "14px",
                color: blog.dark ? "rgba(241,240,204,0.6)" : "rgba(63,13,18,0.6)",
                transition: "background 0.3s, color 0.3s",
                cursor: "pointer",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "#A71D31";
                  el.style.color = "#F1F0CC";
                  el.style.borderColor = "#A71D31";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.background = "transparent";
                  el.style.color = blog.dark ? "rgba(241,240,204,0.6)" : "rgba(63,13,18,0.6)";
                  el.style.borderColor = blog.dark ? "rgba(241,240,204,0.2)" : "rgba(63,13,18,0.2)";
                }}
              >
                ↗
              </div>
            </div>

            {/* Bottom content */}
            <div>
              <h3 style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(18px, 2.5vw, 26px)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.2,
                color: blog.dark ? "#F1F0CC" : "#3F0D12",
                marginBottom: "10px",
              }}>
                {blog.title}
              </h3>
              <p style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                lineHeight: 1.7,
                color: blog.dark ? "rgba(241,240,204,0.5)" : "rgba(63,13,18,0.5)",
                maxWidth: "240px",
              }}>
                {blog.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}