import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG     = "#121210";
const CREAM  = "#F0EBE1";
const SAGE   = "#6C8E7D";
const BORDER = "rgba(255,255,255,0.08)";

const NAV_LINKS    = ["Services", "Inner World", "Pricing", "Contact", "Blog"];
const SOCIAL_LINKS = ["Instagram", "LinkedIn", "Email"];

export default function FooterSection() {
  const outerRef   = useRef<HTMLDivElement>(null);
  const layer1Ref  = useRef<HTMLDivElement>(null);
  const layer2Ref  = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    if (bigTextRef.current) {
      gsap.fromTo(bigTextRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: outer, start: "top 90%" } }
      );
    }

    if (layer1Ref.current) {
      gsap.fromTo(layer1Ref.current,
        { y: 120 },
        { y: 0, ease: "none",
          scrollTrigger: { trigger: outer, start: "top bottom", end: "top top", scrub: 1 } }
      );
    }

    if (layer2Ref.current) {
      gsap.fromTo(layer2Ref.current,
        { y: 200 },
        { y: 0, ease: "none",
          scrollTrigger: { trigger: outer, start: "top bottom", end: "top top", scrub: 2 } }
      );
    }

    if (contentRef.current) {
      const els = contentRef.current.querySelectorAll(".footer-reveal");
      gsap.fromTo(els,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 85%" } }
      );
    }
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        position: "relative",
        background: BG,
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Parallax layer 1 — big ghosted wordmark */}
      <div
        ref={layer1Ref}
        style={{
          position: "absolute", top: 0, left: 0, right: 0,
          pointerEvents: "none", zIndex: 0,
          padding: "60px clamp(24px,4vw,56px) 0",
        }}
      >
        <div style={{
          fontFamily: "'Playfair Display', 'SangBleuKing', serif",
          fontSize: "clamp(100px, 18vw, 240px)",
          fontWeight: 700,
          lineHeight: 0.85,
          color: "rgba(240,235,225,0.03)",
          letterSpacing: "-0.04em",
          textTransform: "uppercase" as const,
          userSelect: "none",
        }}>
          MIND<br />AT<br />PLAY
        </div>
      </div>

      {/* Parallax layer 2 — subtle topo texture */}
      <div
        ref={layer2Ref}
        style={{
          position: "absolute", inset: 0,
          pointerEvents: "none", zIndex: 0, opacity: 0.06,
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <path d="M400,300 C450,220 560,210 575,300 C590,390 510,440 400,425 C290,410 205,360 220,300 C235,240 350,230 400,300Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
          <path d="M400,300 C470,190 600,175 620,300 C640,425 545,485 400,465 C255,445 130,375 150,300 C170,225 330,185 400,300Z" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8"/>
          <path d="M400,300 C490,160 640,140 665,300 C690,460 580,530 400,505 C220,480 55,390 80,300 C105,210 310,140 400,300Z" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.6"/>
          <path d="M400,300 C510,130 680,105 710,300 C740,495 615,575 400,545 C185,515 -20,405 10,300 C40,195 290,95 400,300Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
        </svg>
      </div>

      {/* Big name */}
      <div
        ref={bigTextRef}
        style={{
          position: "relative", zIndex: 1,
          padding: "80px clamp(24px,4vw,56px) 48px",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div style={{
          fontFamily: "'Cabinet Grotesk', 'Visuelt', sans-serif",
          fontSize: "10px",
          textTransform: "uppercase" as const,
          letterSpacing: "0.22em",
          color: "rgba(240,235,225,0.3)",
          marginBottom: "24px",
        }}>
          Sports Psychologist · Mumbai, India
        </div>
        <div style={{
          fontFamily: "'Playfair Display', 'SangBleuKing', serif",
          fontSize: "clamp(52px, 9vw, 130px)",
          fontWeight: 300,
          lineHeight: 0.88,
          color: CREAM,
          letterSpacing: "-0.03em",
        }}>
          Adishri<br />
          <span style={{ fontStyle: "italic" }}>Dubey.</span>
        </div>
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        style={{
          position: "relative", zIndex: 1,
          flex: 1,
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        {/* Col 1 — tagline + CTA */}
        <div className="footer-reveal" style={{
          padding: "48px clamp(24px,4vw,56px)",
          borderRight: `1px solid ${BORDER}`,
          display: "flex", flexDirection: "column" as const,
          justifyContent: "space-between", gap: "40px",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', 'SangBleuKing', serif",
            fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.4,
            color: "rgba(240,235,225,0.7)",
          }}>
            "The mind is the athlete's most powerful muscle — and the most neglected."
          </p>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              backgroundColor: "#F34103", color: CREAM,
              fontFamily: "'Cabinet Grotesk', 'Visuelt', sans-serif",
              fontSize: "11px", letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              padding: "14px 24px", cursor: "pointer",
              transition: "background-color 0.3s, gap 0.3s",
              width: "fit-content",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.backgroundColor = CREAM;
              el.style.color = "#121210";
              el.style.gap = "20px";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.backgroundColor = "#F34103";
              el.style.color = CREAM;
              el.style.gap = "12px";
            }}
          >
            Book a Session →
          </div>
        </div>

        {/* Col 2 — nav links */}
        <div className="footer-reveal" style={{
          padding: "48px clamp(24px,4vw,56px)",
          borderRight: `1px solid ${BORDER}`,
        }}>
          <div style={{
            fontFamily: "'Cabinet Grotesk', 'Visuelt', sans-serif",
            fontSize: "9px", textTransform: "uppercase" as const,
            letterSpacing: "0.22em", color: "rgba(240,235,225,0.25)",
            marginBottom: "24px",
          }}>
            Navigate
          </div>
          {NAV_LINKS.map((link) => (
            <div
              key={link}
              style={{
                fontFamily: "'Playfair Display', 'SangBleuKing', serif",
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 300,
                color: "rgba(240,235,225,0.55)",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 0.3s, padding-left 0.3s",
                paddingLeft: "0",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.color = SAGE;
                el.style.paddingLeft = "8px";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.color = "rgba(240,235,225,0.55)";
                el.style.paddingLeft = "0";
              }}
            >
              {link}
            </div>
          ))}
        </div>

        {/* Col 3 — social + contact */}
        <div className="footer-reveal" style={{ padding: "48px clamp(24px,4vw,56px)" }}>
          <div style={{
            fontFamily: "'Cabinet Grotesk', 'Visuelt', sans-serif",
            fontSize: "9px", textTransform: "uppercase" as const,
            letterSpacing: "0.22em", color: "rgba(240,235,225,0.25)",
            marginBottom: "24px",
          }}>
            Connect
          </div>
          {SOCIAL_LINKS.map((link) => (
            <div
              key={link}
              style={{
                fontFamily: "'Playfair Display', 'SangBleuKing', serif",
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 300,
                color: "rgba(240,235,225,0.55)",
                marginBottom: "10px",
                cursor: "pointer",
                transition: "color 0.3s, padding-left 0.3s",
                paddingLeft: "0",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.color = SAGE;
                el.style.paddingLeft = "8px";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.color = "rgba(240,235,225,0.55)";
                el.style.paddingLeft = "0";
              }}
            >
              {link}
            </div>
          ))}

          <div style={{
            width: "40px", height: "1px",
            background: `rgba(108,142,125,0.4)`,
            margin: "32px 0",
          }} />

          <div style={{
            fontFamily: "'Cabinet Grotesk', 'Visuelt', sans-serif",
            fontSize: "12px",
            color: "rgba(240,235,225,0.35)",
            lineHeight: 1.7,
          }}>
            adishri@mindatplay.in<br />
            Mumbai, India
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="footer-reveal"
        style={{
          position: "relative", zIndex: 1,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px clamp(24px,4vw,56px)",
          flexWrap: "wrap" as const, gap: "12px",
        }}
      >
        <div style={{
          fontFamily: "'Cabinet Grotesk', 'Visuelt', sans-serif",
          fontSize: "10px",
          color: "rgba(240,235,225,0.2)",
          letterSpacing: "0.08em",
        }}>
          © 2025 Adishri Dubey. All rights reserved.
        </div>
        <div style={{
          fontFamily: "'Playfair Display', 'SangBleuKing', serif",
          fontSize: "11px",
          fontStyle: "italic",
          color: "rgba(240,235,225,0.15)",
        }}>
          Mind at Play — Built with intention.
        </div>
      </div>
    </div>
  );
}
