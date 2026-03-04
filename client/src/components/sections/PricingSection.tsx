import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    name: "The Single Session",
    price: "₹4,500",
    per: "one time",
    tag: "START HERE",
    description: "A focused 60-minute deep dive into one area of your mental game. Ideal for athletes wanting to explore sports psychology for the first time.",
    includes: ["60-min 1:1 session", "Pre-session intake form", "Post-session notes & exercises", "Email follow-up within 48hrs"],
    dark: false,
    featured: false,
  },
  {
    name: "The Performance Pack",
    price: "₹18,000",
    per: "6 sessions",
    tag: "MOST POPULAR",
    description: "A structured 6-week journey to rewire your mental approach to competition, pressure and recovery. This is where real change happens.",
    includes: ["6 × 60-min 1:1 sessions", "Personalised mental skills plan", "Between-session support via WhatsApp", "Progress tracking & reflection tools", "Competition prep protocols"],
    dark: true,
    featured: true,
  },
  {
    name: "The Inner Circle",
    price: "₹38,000",
    per: "3 months",
    tag: "FULL SUPPORT",
    description: "Comprehensive ongoing support for serious athletes. Weekly sessions, full access, and a customised long-term mental performance strategy.",
    includes: ["12 × 60-min 1:1 sessions", "Unlimited WhatsApp access", "Team session (1 included)", "Video session reviews", "Custom mental performance playbook", "Priority booking"],
    dark: false,
    featured: false,
  },
];

export default function PricingSection() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          }
        }
      );
    }

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(row,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <div style={{
      background: "#F0EBE1",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Label */}
      <div style={{
        borderBottom: "1px solid rgba(46,52,38,0.15)",
        padding: "14px 40px",
        fontFamily: "Visuelt, 'DM Sans', sans-serif",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "rgba(46,52,38,0.55)",
      }}>
        Investment:
      </div>

      {/* Heading */}
      <div ref={headingRef} style={{ padding: "48px 40px 32px", borderBottom: "1px solid rgba(46,52,38,0.08)" }}>
        <h2 style={{
          fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 0.95,
          color: "#2E3426",
          letterSpacing: "-0.02em",
          marginBottom: "16px",
        }}>
          Choose your<br />path forward.
        </h2>
        <p style={{
          fontFamily: "Visuelt, 'DM Sans', sans-serif",
          fontSize: "13px",
          color: "rgba(46,52,38,0.55)",
          lineHeight: 1.8,
          maxWidth: "340px",
        }}>
          Every athlete is different. Every plan is built around real commitment to your mental game.
        </p>
      </div>

      {/* Rows */}
      <div style={{ flex: 1 }}>
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => { rowRefs.current[i] = el; }}
            style={{
              background: plan.dark ? "#350D12" : "#F0EBE1",
              borderBottom: `1px solid ${plan.dark ? "rgba(240,235,225,0.08)" : "rgba(46,52,38,0.08)"}`,
              padding: "40px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              alignItems: "start",
              position: "relative",
              transition: "padding-left 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = "52px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.paddingLeft = "40px";
            }}
          >
            {plan.featured && (
              <div style={{
                position: "absolute",
                top: "16px", right: "40px",
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "#F0EBE1",
                background: "#F34103",
                padding: "4px 12px",
              }}>
                {plan.tag}
              </div>
            )}

            {/* Left col */}
            <div>
              {!plan.featured && (
                <div style={{
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase" as const,
                  color: "#D5BF86",
                  marginBottom: "12px",
                }}>
                  {plan.tag}
                </div>
              )}
              <h3 style={{
                fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1,
                color: plan.dark ? "#F0EBE1" : "#2E3426",
                marginBottom: "20px",
                marginTop: plan.featured ? "24px" : "0",
              }}>
                {plan.name}
              </h3>

              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "20px" }}>
                <span style={{
                  fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 300,
                  color: plan.dark ? "#F0EBE1" : "#2E3426",
                  lineHeight: 1,
                }}>
                  {plan.price}
                </span>
                <span style={{
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.12em",
                  color: plan.dark ? "rgba(240,235,225,0.4)" : "rgba(46,52,38,0.4)",
                }}>
                  / {plan.per}
                </span>
              </div>

              <p style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "12px",
                lineHeight: 1.8,
                color: plan.dark ? "rgba(240,235,225,0.6)" : "rgba(46,52,38,0.6)",
                maxWidth: "280px",
              }}>
                {plan.description}
              </p>
            </div>

            {/* Right col */}
            <div style={{ display: "flex", flexDirection: "column" as const, justifyContent: "space-between", gap: "24px" }}>
              <div>
                <div style={{
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "9px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.2em",
                  color: plan.dark ? "rgba(240,235,225,0.3)" : "rgba(46,52,38,0.3)",
                  marginBottom: "14px",
                }}>
                  What's included
                </div>
                {plan.includes.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                    <div style={{
                      width: "4px", height: "4px", borderRadius: "50%",
                      background: "#D5BF86", marginTop: "6px", flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: "Visuelt, 'DM Sans', sans-serif",
                      fontSize: "12px",
                      lineHeight: 1.6,
                      color: plan.dark ? "rgba(240,235,225,0.7)" : "rgba(46,52,38,0.7)",
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.14em",
                  color: plan.dark ? "#F0EBE1" : "#2E3426",
                  borderBottom: `1px solid ${plan.dark ? "rgba(240,235,225,0.3)" : "rgba(46,52,38,0.3)"}`,
                  paddingBottom: "4px",
                  cursor: "pointer",
                  width: "fit-content",
                  transition: "gap 0.3s, color 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.gap = "18px";
                  el.style.color = "#F34103";
                  el.style.borderBottomColor = "#F34103";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.gap = "10px";
                  el.style.color = plan.dark ? "#F0EBE1" : "#2E3426";
                  el.style.borderBottomColor = plan.dark ? "rgba(240,235,225,0.3)" : "rgba(46,52,38,0.3)";
                }}
              >
                Get started →
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: "24px 40px",
        borderTop: "1px solid rgba(46,52,38,0.08)",
        fontFamily: "Visuelt, 'DM Sans', sans-serif",
        fontSize: "11px",
        color: "rgba(46,52,38,0.4)",
        fontStyle: "italic",
      }}>
        All sessions conducted online via Zoom. Custom team packages available on request.
      </div>
    </div>
  );
}