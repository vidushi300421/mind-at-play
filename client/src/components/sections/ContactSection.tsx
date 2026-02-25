import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", sport: "", message: "" });

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" }
        }
      );
    }

    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" }
        }
      );
    }

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".contact-field");
      gsap.fromTo(fields,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 75%" }
        }
      );
    }
  }, []);

  const handleSubmit = () => {
    if (!values.name || !values.email) return;
    gsap.to(formRef.current, {
      opacity: 0, y: -20, duration: 0.4, ease: "power2.in",
      onComplete: () => setSubmitted(true),
    });
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "#A71D31" : "rgba(63,13,18,0.2)"}`,
    padding: "12px 0",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "14px",
    color: "#3F0D12",
    outline: "none",
    transition: "border-color 0.3s",
  });

  return (
    <div
      ref={sectionRef}
      style={{
        background: "#F1F0CC",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        Contact:
      </div>

      {/* Heading */}
      <div ref={headingRef} style={{ padding: "48px 40px 0" }}>
        <div style={{
          fontFamily: "DM Sans, sans-serif",
          fontSize: "11px",
          textTransform: "uppercase" as const,
          letterSpacing: "0.18em",
          color: "#A71D31",
          marginBottom: "20px",
          opacity: 0.85,
        }}>
          Let's talk
        </div>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 300,
          lineHeight: 0.92,
          color: "#3F0D12",
          letterSpacing: "-0.02em",
          marginBottom: "8px",
        }}>
          Ready to train
        </h2>
        <h2 style={{
          fontFamily: "Cormorant Garamond, serif",
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 300,
          fontStyle: "italic",
          lineHeight: 0.92,
          color: "#3F0D12",
          letterSpacing: "-0.02em",
          marginBottom: "32px",
        }}>
          your mind?
        </h2>

        {/* Animated line */}
        <div
          ref={lineRef}
          style={{
            height: "1px",
            background: "#D5BF86",
            marginBottom: "40px",
            transformOrigin: "left center",
          }}
        />
      </div>

      {/* Form or success */}
      <div style={{ flex: 1, padding: "0 40px 48px" }}>
        {submitted ? (
          <div style={{
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%",
            gap: "16px",
          }}>
            <div style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#3F0D12",
              lineHeight: 1.1,
            }}>
              Thank you,<br />{values.name.split(" ")[0]}.
            </div>
            <div style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "13px",
              color: "rgba(63,13,18,0.55)",
              lineHeight: 1.8,
              maxWidth: "280px",
            }}>
              I'll be in touch within 48 hours to schedule your first session.
            </div>
            <div style={{
              width: "40px",
              height: "1px",
              background: "#D5BF86",
              marginTop: "8px",
            }} />
          </div>
        ) : (
          <div ref={formRef} style={{ display: "flex", flexDirection: "column" as const, gap: "32px" }}>

            {/* Name + Email row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div className="contact-field">
                <div style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "9px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.2em",
                  color: focused === "name" ? "#A71D31" : "rgba(63,13,18,0.4)",
                  marginBottom: "8px",
                  transition: "color 0.3s",
                }}>
                  Your Name
                </div>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("name") as React.CSSProperties}
                />
              </div>

              <div className="contact-field">
                <div style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "9px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.2em",
                  color: focused === "email" ? "#A71D31" : "rgba(63,13,18,0.4)",
                  marginBottom: "8px",
                  transition: "color 0.3s",
                }}>
                  Email Address
                </div>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("email") as React.CSSProperties}
                />
              </div>
            </div>

            {/* Sport */}
            <div className="contact-field">
              <div style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "9px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.2em",
                color: focused === "sport" ? "#A71D31" : "rgba(63,13,18,0.4)",
                marginBottom: "8px",
                transition: "color 0.3s",
              }}>
                Your Sport / Discipline
              </div>
              <input
                type="text"
                placeholder="e.g. Cricket, Swimming, Tennis..."
                value={values.sport}
                onChange={(e) => setValues({ ...values, sport: e.target.value })}
                onFocus={() => setFocused("sport")}
                onBlur={() => setFocused(null)}
                style={inputStyle("sport") as React.CSSProperties}
              />
            </div>

            {/* Message */}
            <div className="contact-field">
              <div style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "9px",
                textTransform: "uppercase" as const,
                letterSpacing: "0.2em",
                color: focused === "message" ? "#A71D31" : "rgba(63,13,18,0.4)",
                marginBottom: "8px",
                transition: "color 0.3s",
              }}>
                What brings you here?
              </div>
              <textarea
                placeholder="Tell me a little about where you are and what you're looking for..."
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                rows={4}
                style={{
                  ...inputStyle("message"),
                  resize: "none",
                  lineHeight: 1.8,
                } as React.CSSProperties}
              />
            </div>

            {/* Submit */}
            <div className="contact-field" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              <div
                onClick={handleSubmit}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "#A71D31",
                  color: "#F1F0CC",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.16em",
                  padding: "16px 32px",
                  cursor: "pointer",
                  transition: "background 0.3s, gap 0.3s",
                  position: "relative" as const,
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#3F0D12";
                  (e.currentTarget as HTMLDivElement).style.gap = "20px";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "#A71D31";
                  (e.currentTarget as HTMLDivElement).style.gap = "12px";
                }}
              >
                Send message →
              </div>

              <div style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "11px",
                color: "rgba(63,13,18,0.35)",
                fontStyle: "italic",
              }}>
                I respond within 48 hours
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}