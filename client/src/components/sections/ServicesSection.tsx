import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* SECTION COLORS — local only */
const BG = "#350D12";
const TEXT = "#F0EBE1";
const GOLD = "#D5BF86";
const BORDER = "rgba(240,235,225,0.12)";

const HOVER_COLOR = "#6C8E7D";
const HOVER_BG = "rgba(60, 140, 110, 0.10)"; // cooler green so it won't read orange on wine

const SERVICES = [
  "Performance Coaching",
  "Pre-Match Mental Prep",
  "Burnout Recovery",
  "1-on-1 Therapy",
  "Team Sessions",
  "Visualization & Flow",
];

export default function ServicesSection() {
  const [activeCircle, setActiveCircle] = useState(1);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (!row) return;

      // Clear any previous GSAP inline styling (prevents old “orange” from sticking)
      gsap.set(row.querySelector(".svc-service-name"), { clearProps: "color" });
      gsap.set(row.querySelector(".svc-service-index"), { clearProps: "color" });
      gsap.set(row.querySelector(".svc-arrow"), { clearProps: "color,x" });

      gsap.fromTo(
        row,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            onEnter: () => setActiveCircle(i + 1),
            onEnterBack: () => setActiveCircle(i + 1),
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleMouseEnter = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;

    gsap.to(row.querySelector(".svc-hover-bg"), {
      scaleX: 1,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(row.querySelector(".svc-service-name"), {
      color: HOVER_COLOR,
      duration: 0.25,
    });

    gsap.to(row.querySelector(".svc-service-index"), {
      color: HOVER_COLOR,
      duration: 0.25,
    });

    gsap.to(row.querySelector(".svc-arrow"), {
      x: 8,
      color: HOVER_COLOR,
      duration: 0.25,
    });

    gsap.to(row.querySelector(".svc-border-line"), {
      scaleX: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;

    gsap.to(row.querySelector(".svc-hover-bg"), {
      scaleX: 0,
      duration: 0.3,
      ease: "power2.in",
    });

    gsap.to(row.querySelector(".svc-service-name"), {
      color: TEXT,
      duration: 0.25,
    });

    gsap.to(row.querySelector(".svc-service-index"), {
      color: GOLD,
      duration: 0.25,
    });

    gsap.to(row.querySelector(".svc-arrow"), {
      x: 0,
      color: GOLD,
      duration: 0.25,
    });

    gsap.to(row.querySelector(".svc-border-line"), {
      scaleX: 0,
      duration: 0.3,
      ease: "power3.in",
    });
  };

  const isOdd = activeCircle % 2 !== 0;

  return (
    <div style={{ background: BG }} className="w-full min-h-screen py-24 px-12 relative flex">
      {/* LEFT LIST */}
      <div className="w-[55%] pr-12">
        <div
          style={{
            fontFamily: "Cabinet Grotesk, sans-serif",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: GOLD,
            borderBottom: `1px solid ${BORDER}`,
            paddingBottom: "12px",
            marginBottom: "36px",
          }}
        >
          Services
        </div>

        <div className="flex flex-col">
          {SERVICES.map((srv, i) => (
            <div
              key={i}
              ref={(el) => {
                rowsRef.current[i] = el;
              }}
              style={{ borderBottom: `1px solid ${BORDER}`, position: "relative" }}
              className="py-[28px] flex items-center justify-between cursor-pointer overflow-hidden opacity-0"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              {/* Hover wash */}
              <div
                className="svc-hover-bg absolute inset-0 origin-left scale-x-0 pointer-events-none"
                style={{ background: HOVER_BG }}
              />

              <div className="flex items-center gap-12 relative z-10">
                <span
                  className="svc-service-index"
                  style={{
                    fontFamily: "Cabinet Grotesk, sans-serif",
                    fontSize: "12px",
                    color: GOLD,
                  }}
                >
                  {(i + 1).toString().padStart(2, "0")}
                </span>

                <span
                  className="svc-service-name"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(24px,3vw,36px)",
                    color: TEXT,
                  }}
                >
                  {srv}
                </span>
              </div>

              <div
                className="svc-arrow relative z-10"
                style={{
                  fontFamily: "Cabinet Grotesk, sans-serif",
                  fontSize: "16px",
                  color: GOLD,
                }}
              >
                →
              </div>

              <div
                className="svc-border-line absolute bottom-0 left-0 w-full origin-left scale-x-0"
                style={{ height: "1px", background: HOVER_COLOR }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CIRCLE */}
      <div className="w-[45%] flex items-center justify-center sticky top-0 h-screen mt-[-96px]">
        <div
          className="relative w-[260px] h-[260px] rounded-full flex items-center justify-center transition-colors duration-500"
          style={{
            backgroundColor: isOdd ? HOVER_COLOR : "transparent",
            border: `2px solid ${HOVER_COLOR}`, // always green outline
          }}
        >
          <div
            className="absolute inset-0 w-full h-full rounded-full border border-dashed opacity-50 animate-slowspin"
            style={{ borderColor: GOLD, transform: "scale(1.08)" }}
          />
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "80px",
              color: isOdd ? TEXT : GOLD,
            }}
          >
            {activeCircle.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}