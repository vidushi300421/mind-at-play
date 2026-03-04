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
    description: "A focused 60-minute deep dive into one area of your mental game. Ideal for athletes exploring sports psychology for the first time.",
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
    includes: ["6 × 60-min 1:1 sessions", "Personalised mental skills plan", "Between-session WhatsApp support", "Progress tracking & reflection tools", "Competition prep protocols"],
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
  const introRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (introRef.current) {
      gsap.fromTo(introRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 80%" } }
      );
    }
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.75, delay: i * 0.15, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" } }
      );
    });
  }, []);

  return (
    <div style={{ background: "#F0EBE1", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Section label */}
      <div style={{
        borderBottom: "1px solid rgba(46,52,38,0.15)",
        padding: "14px 6vw",
        fontFamily: "Visuelt, 'DM Sans', sans-serif",
        fontSize: "11px",
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        color: "rgba(46,52,38,0.55)",
      }}>
        Investment:
      </div>

      {/* Psychologist introduction */}
      <div ref={introRef} style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        borderBottom: "1px solid rgba(46,52,38,0.1)",
      }}>
        {/* Left: large heading */}
        <div style={{
          padding: "64px 6vw 56px",
          borderRight: "1px solid rgba(46,52,38,0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "Visuelt, 'DM Sans', sans-serif",
              fontSize: "11px",
              textTransform: "uppercase" as const,
              letterSpacing: "0.2em",
              color: "#F34103",
              marginBottom: "24px",
              opacity: 0.85,
            }}>
              Meet your psychologist
            </div>
            <h2 style={{
              fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 4.5vw, 68px)",
              fontWeight: 300,
              lineHeight: 0.92,
              color: "#2E3426",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}>
              Adishri
            </h2>
            <h2 style={{
              fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 4.5vw, 68px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.92,
              color: "#2E3426",
              letterSpacing: "-0.02em",
            }}>
              Dubey
            </h2>
          </div>
          <div style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "11px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.16em",
            color: "rgba(46,52,38,0.35)",
            marginTop: "32px",
          }}>
            Sports Psychologist · Mumbai
          </div>
        </div>

        {/* Right: bio */}
        <div style={{
          padding: "64px 6vw 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "24px",
        }}>
          <p style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "15px",
            lineHeight: 1.85,
            color: "rgba(46,52,38,0.75)",
            maxWidth: "480px",
          }}>
            Adishri works at the intersection of sport, mind, and identity. With a background in psychology and years of experience working with competitive athletes across disciplines, she helps performers unlock what no coach can teach — the mental game.
          </p>
          <p style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "15px",
            lineHeight: 1.85,
            color: "rgba(46,52,38,0.75)",
            maxWidth: "480px",
          }}>
            Her approach is direct, science-backed, and built around the athlete's real life — not a textbook version of it.
          </p>
          <div style={{
            display: "flex",
            gap: "40px",
            marginTop: "8px",
          }}>
            {[["100+", "Athletes coached"], ["6+", "Years experience"], ["10+", "Sports"], ].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 2.5vw, 38px)",
                  fontWeight: 300,
                  color: "#2E3426",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}>
                  {num}
                </div>
                <div style={{
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "10px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.14em",
                  color: "rgba(46,52,38,0.4)",
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing heading */}
      <div style={{ padding: "48px 6vw 32px", borderBottom: "1px solid rgba(46,52,38,0.08)" }}>
        <h3 style={{
          fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
          fontSize: "clamp(28px, 3vw, 44px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 1,
          color: "#2E3426",
          letterSpacing: "-0.015em",
        }}>
          Choose your path forward.
        </h3>
      </div>

      {/* 3-column horizontal pricing cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        flex: 1,
      }}>
        {PLANS.map((plan, i) => (
          <div
            key={plan.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              background: plan.dark ? "#350D12" : "#F0EBE1",
              borderRight: i < 2 ? `1px solid ${plan.dark ? "rgba(240,235,225,0.08)" : "rgba(46,52,38,0.08)"}` : "none",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            {/* Tag */}
            <div style={{
              fontFamily: "Visuelt, 'DM Sans', sans-serif",
              fontSize: "9px",
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: plan.featured ? "#F0EBE1" : "#D5BF86",
              background: plan.featured ? "#F34103" : "transparent",
              padding: plan.featured ? "4px 10px" : "0",
              marginBottom: "20px",
              width: "fit-content",
            }}>
              {plan.tag}
            </div>

            <h3 style={{
              fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 2vw, 28px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
              color: plan.dark ? "#F0EBE1" : "#2E3426",
              marginBottom: "24px",
            }}>
              {plan.name}
            </h3>

            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "20px" }}>
              <span style={{
                fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 3vw, 48px)",
                fontWeight: 300,
                color: plan.dark ? "#F0EBE1" : "#2E3426",
                lineHeight: 1,
              }}>
                {plan.price}
              </span>
              <span style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "10px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.1em",
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
              marginBottom: "28px",
            }}>
              {plan.description}
            </p>

            {/* Divider */}
            <div style={{
              height: "1px",
              background: plan.dark ? "rgba(240,235,225,0.1)" : "rgba(46,52,38,0.1)",
              marginBottom: "24px",
            }} />

            {/* Includes */}
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
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
              {plan.includes.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
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

            {/* CTA */}
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
                marginTop: "auto",
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
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        padding: "20px 6vw",
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
