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
    description: "One session to unlock one key mental block.",
    includes: ["60-min 1:1 session", "Intake form", "Notes + drills", "48-hr follow-up"],
    featured: false,
  },
  {
    name: "The Performance Pack",
    price: "₹18,000",
    per: "6 sessions",
    tag: "MOST POPULAR",
    description: "A 6-week reset for pressure, focus, and consistency.",
    includes: ["6 × 60-min sessions", "Personal plan", "WhatsApp support", "Competition prep"],
    featured: true,
  },
  {
    name: "The Inner Circle",
    price: "₹38,000",
    per: "3 months",
    tag: "FULL SUPPORT",
    description: "Weekly support + a long-term mental performance system.",
    includes: ["12 × 60-min sessions", "Priority booking", "Team session (1)", "Unlimited WhatsApp"],
    featured: false,
  },
];

export default function PricingSection() {
  const wrapRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-heading",
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".pricing-heading", start: "top 80%" },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  // Fonts: make sure these are loaded globally (in layout/head)
  // Playfair Display + Cabinet Grotesk
  // <link rel="preconnect" href="https://fonts.googleapis.com" />
  // <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  // <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&display=swap" rel="stylesheet" />
  // Cabinet Grotesk is usually self-hosted (recommended). If you have a hosted CSS, include it in head.

  const BG = "#371115";
  const TEXT = "rgba(240,235,225,0.92)";
  const MUTED = "rgba(240,235,225,0.62)";
  const HAIRLINE = "rgba(240,235,225,0.12)";
  const CARD_BG = "rgba(12,12,12,0.34)"; // right-side “dark glass”
  const CARD_BD = "rgba(240,235,225,0.14)";
  const ACCENT = "#F34103";

  return (
    <section
      ref={wrapRef}
      style={{
        background: BG,
        padding: "84px var(--gutter) 72px",
      }}
    >
      {/* Heading (editorial like your image, no split panels) */}
      <div className="pricing-heading" style={{ maxWidth: "980px" }}>
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
          Choose your <span style={{ fontStyle: "italic", fontWeight: 400 }}>path</span>
          <br />
          forward<span style={{ opacity: 0.9 }}>.</span>
        </h2>

        <div
          style={{
            marginTop: "18px",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            lineHeight: 1.8,
            color: MUTED,
            maxWidth: "560px",
          }}
        >
          Online sessions designed for athletes — pressure, focus, confidence, recovery.
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: HAIRLINE, margin: "34px 0 28px" }} />

      {/* Pricing cards (reference-like structure, right-side vibe) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "18px",
          alignItems: "stretch",
        }}
      >
        {PLANS.map((plan, i) => {
          const isFeatured = plan.featured;

          return (
            <div
              key={plan.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              style={{
                background: CARD_BG,
                border: `1px solid ${isFeatured ? "rgba(243,65,3,0.35)" : CARD_BD}`,
                borderRadius: "20px",
                padding: "26px 22px",
                position: "relative",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: isFeatured ? "0 22px 60px rgba(0,0,0,0.34)" : "0 14px 44px rgba(0,0,0,0.26)",
                transform: isFeatured ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                display: "flex",
                flexDirection: "column",
                minHeight: 360,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = isFeatured ? "translateY(-10px)" : "translateY(-8px)";
                el.style.boxShadow = isFeatured
                  ? "0 28px 72px rgba(0,0,0,0.42)"
                  : "0 22px 60px rgba(0,0,0,0.34)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = isFeatured ? "translateY(-6px)" : "translateY(0)";
                el.style.boxShadow = isFeatured ? "0 22px 60px rgba(0,0,0,0.34)" : "0 14px 44px rgba(0,0,0,0.26)";
              }}
            >
              {/* Featured badge (small + clean like your pricing reference) */}
              {isFeatured && (
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(243,65,3,0.28)",
                    background: "rgba(243,65,3,0.12)",
                    color: "rgba(243,65,3,0.98)",
                    fontFamily:
                      "var(--font-sans)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most popular
                </div>
              )}

              {/* Tag */}
              <div
                style={{
                  fontFamily:
                    "var(--font-sans)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: isFeatured ? "rgba(240,235,225,0.92)" : "rgba(240,235,225,0.72)",
                  marginBottom: 14,
                }}
              >
                {plan.tag}
              </div>

              {/* Plan name */}
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  lineHeight: 1.15,
                  color: TEXT,
                  marginBottom: 14,
                }}
              >
                {plan.name}
              </div>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
                <div
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 44,
                    fontWeight: 400,
                    color: TEXT,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.price}
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-sans)",
                    fontSize: 12,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: MUTED,
                  }}
                >
                  / {plan.per}
                </div>
              </div>

              {/* Short description (less info) */}
              <div
                style={{
                  fontFamily:
                    "var(--font-sans)",
                  fontSize: 13,
                  lineHeight: 1.75,
                  color: MUTED,
                  marginBottom: 16,
                  maxWidth: 340,
                }}
              >
                {plan.description}
              </div>

              <div style={{ height: 1, background: HAIRLINE, marginBottom: 14 }} />

              {/* Includes (tight list) */}
              <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
                {plan.includes.slice(0, 4).map((item) => (
                  <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        border: "1px solid rgba(240,235,225,0.16)",
                        display: "grid",
                        placeItems: "center",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: isFeatured ? ACCENT : "rgba(240,235,225,0.55)",
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontFamily:
                          "var(--font-sans)",
                        fontSize: 13,
                        lineHeight: 1.55,
                        color: "rgba(240,235,225,0.78)",
                      }}
                    >
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                type="button"
                style={{
                  marginTop: "auto",
                  width: "100%",
                  border: `1px solid ${isFeatured ? "rgba(243,65,3,0.40)" : "rgba(240,235,225,0.18)"}`,
                  borderRadius: 999,
                  padding: "12px 14px",
                  cursor: "pointer",
                  background: isFeatured ? "rgba(243,65,3,0.14)" : "rgba(255,255,255,0.06)",
                  color: TEXT,
                  fontFamily:
                    "var(--font-sans)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(243,65,3,0.24)";
                  el.style.borderColor = "rgba(243,65,3,0.55)";
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = isFeatured ? "rgba(243,65,3,0.14)" : "rgba(255,255,255,0.06)";
                  el.style.borderColor = isFeatured
                    ? "rgba(243,65,3,0.40)"
                    : "rgba(240,235,225,0.18)";
                  el.style.transform = "translateY(0)";
                }}
              >
                Get started
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer microcopy (minimal) */}
      <div
        style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: `1px solid ${HAIRLINE}`,
          fontFamily: "var(--font-sans)",
          fontSize: 12,
          color: "rgba(240,235,225,0.58)",
        }}
      >
        All sessions are online via Zoom. Team packages on request.
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 980px) {
          section {
            padding: 72px 6vw 64px !important;
          }
          section > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}