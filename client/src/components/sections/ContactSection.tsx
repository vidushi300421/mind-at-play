import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_BG = "#0F172A";
const TEXT = "rgba(255,255,255,0.92)";
const TEXT_SOFT = "rgba(255,255,255,0.55)";
const BORDER = "rgba(255,255,255,0.14)";
const ACCENT = "#F34103";
const GOLD = "#D5BF86";

/* Replace with your Google Calendar booking page */
const BOOKING_LINK = "https://calendar.google.com/calendar/appointments/schedules/YOUR_LINK_HERE";

export default function ContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", sport: "", message: "" });

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );
    }

    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: lineRef.current, start: "top 85%" },
        }
      );
    }

    if (formRef.current) {
      const fields = formRef.current.querySelectorAll(".contact-field");
      gsap.fromTo(
        fields,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 75%" },
        }
      );
    }
  }, []);

  const handleSubmit = async () => {
    if (!values.name || !values.email) return;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {}

    gsap.to(formRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setSubmitted(true),
    });
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${
      focused === field ? ACCENT : "rgba(255,255,255,0.22)"
    }`,
    padding: "12px 0",
    fontFamily: "Visuelt, 'DM Sans', sans-serif",
    fontSize: "14px",
    color: TEXT,
    outline: "none",
    transition: "border-color 0.3s",
  });

  return (
    <section
      style={{
        background: CONTACT_BG,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Label */}
      <div
        style={{
          borderBottom: `1px solid ${BORDER}`,
          padding: "14px 6vw",
          fontFamily: "Visuelt, 'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: TEXT_SOFT,
        }}
      >
        Contact
      </div>

      {/* Heading */}
      <div ref={headingRef} style={{ padding: "48px 6vw 0" }}>
        <div
          style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: ACCENT,
            marginBottom: "20px",
            opacity: 0.85,
          }}
        >
          Let's talk
        </div>

        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(44px,6vw,72px)",
            fontWeight: 400,
            lineHeight: 0.95,
            color: TEXT,
            letterSpacing: "-0.02em",
          }}
        >
          Ready to train
        </h2>

        <h2
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(44px,6vw,72px)",
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 0.95,
            color: TEXT,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          your mind?
        </h2>

        <div
          ref={lineRef}
          style={{
            height: "1px",
            background: GOLD,
            marginBottom: "40px",
          }}
        />
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: "0 6vw 60px" }}>
        {submitted ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(32px,4vw,48px)",
                fontStyle: "italic",
                color: TEXT,
              }}
            >
              Thank you, {values.name.split(" ")[0]}.
            </div>

            <div
              style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "14px",
                color: TEXT_SOFT,
                lineHeight: 1.8,
                maxWidth: 320,
              }}
            >
              I'll be in touch within 48 hours to schedule your first session.
            </div>

            <div
              style={{
                width: "40px",
                height: "1px",
                background: GOLD,
                marginTop: "8px",
              }}
            />
          </div>
        ) : (
          <div ref={formRef} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Name + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
              <div className="contact-field">
                <div
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: focused === "name" ? ACCENT : TEXT_SOFT,
                    marginBottom: "8px",
                  }}
                >
                  Your Name
                </div>

                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={values.name}
                  onChange={(e) => setValues({ ...values, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("name")}
                />
              </div>

              <div className="contact-field">
                <div
                  style={{
                    fontSize: "9px",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: focused === "email" ? ACCENT : TEXT_SOFT,
                    marginBottom: "8px",
                  }}
                >
                  Email Address
                </div>

                <input
                  type="email"
                  placeholder="you@email.com"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  style={inputStyle("email")}
                />
              </div>
            </div>

            {/* Sport */}
            <div className="contact-field">
              <div
                style={{
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: focused === "sport" ? ACCENT : TEXT_SOFT,
                  marginBottom: "8px",
                }}
              >
                Your Sport
              </div>

              <input
                type="text"
                placeholder="Cricket, Tennis, Swimming..."
                value={values.sport}
                onChange={(e) => setValues({ ...values, sport: e.target.value })}
                onFocus={() => setFocused("sport")}
                onBlur={() => setFocused(null)}
                style={inputStyle("sport")}
              />
            </div>

            {/* Message */}
            <div className="contact-field">
              <div
                style={{
                  fontSize: "9px",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: focused === "message" ? ACCENT : TEXT_SOFT,
                  marginBottom: "8px",
                }}
              >
                What brings you here?
              </div>

              <textarea
                rows={4}
                placeholder="Tell me a little about your situation..."
                value={values.message}
                onChange={(e) => setValues({ ...values, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                style={{
                  ...inputStyle("message"),
                  resize: "none",
                  lineHeight: 1.8,
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: ACCENT,
                  color: "#fff",
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  padding: "16px 32px",
                  textDecoration: "none",
                }}
              >
                Book a session →
              </a>

              <div
                onClick={handleSubmit}
                style={{
                  cursor: "pointer",
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: TEXT_SOFT,
                }}
              >
                Send message
              </div>
            </div>

            <div
              style={{
                fontSize: "11px",
                color: TEXT_SOFT,
                fontStyle: "italic",
              }}
            >
              I respond within 48 hours
            </div>
          </div>
        )}
      </div>
    </section>
  );
}