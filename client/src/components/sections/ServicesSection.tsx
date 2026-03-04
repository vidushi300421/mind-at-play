import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BG = "#350D12";
const TEXT = "#F0EBE1";
const ACCENT = "#F34103";
const GOLD = "#D5BF86";
const BORDER = "rgba(240,235,225,0.1)";

const SERVICES = [
  "Performance Coaching",
  "Pre-Match Mental Prep",
  "Burnout Recovery",
  "1-on-1 Therapy",
  "Team Sessions",
  "Visualization & Flow"
];

export default function ServicesSection() {
  const [activeCircle, setActiveCircle] = useState(1);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(row,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            onEnter: () => setActiveCircle(i + 1),
            onEnterBack: () => setActiveCircle(i + 1),
          }
        }
      );
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;
    gsap.to(row.querySelector(".hover-bg"), { scaleX: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(row.querySelector(".service-name"), { color: ACCENT, duration: 0.3 });
    gsap.to(row.querySelector(".arrow"), { x: 8, color: ACCENT, duration: 0.3 });
    gsap.to(row.querySelector(".border-line"), { scaleX: 1, duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;
    gsap.to(row.querySelector(".hover-bg"), { scaleX: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(row.querySelector(".service-name"), { color: TEXT, duration: 0.3 });
    gsap.to(row.querySelector(".arrow"), { x: 0, color: GOLD, duration: 0.3 });
    gsap.to(row.querySelector(".border-line"), { scaleX: 0, duration: 0.3, ease: "power3.in" });
  };

  const isOdd = activeCircle % 2 !== 0;

  return (
    <div style={{ background: BG }} className="w-full min-h-screen py-24 px-12 relative flex">
      {/* List */}
      <div className="w-[55%] pr-12">
        <div style={{
          fontFamily: "Visuelt, 'DM Sans', sans-serif",
          fontSize: "11px",
          textTransform: "uppercase" as const,
          letterSpacing: "0.18em",
          color: GOLD,
          borderBottom: `1px solid ${BORDER}`,
          paddingBottom: "12px",
          marginBottom: "32px",
        }}>
          Services
        </div>

        <div className="flex flex-col">
          {SERVICES.map((srv, i) => (
            <div
              key={i}
              ref={el => { rowsRef.current[i] = el; }}
              style={{ borderBottom: `1px solid ${BORDER}`, position: "relative" }}
              className="py-[28px] flex items-center justify-between cursor-pointer overflow-hidden opacity-0"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div
                className="hover-bg absolute inset-0 origin-left scale-x-0 pointer-events-none"
                style={{ background: "rgba(243,65,3,0.06)" }}
              />

              <div className="flex items-center gap-12 relative z-10">
                <span style={{
                  fontFamily: "Visuelt, 'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: ACCENT,
                }}>
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span className="service-name" style={{
                  fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  color: TEXT,
                  transition: "color 0.3s",
                }}>
                  {srv}
                </span>
              </div>

              <div className="arrow relative z-10" style={{
                fontFamily: "Visuelt, 'DM Sans', sans-serif",
                fontSize: "16px",
                color: GOLD,
              }}>→</div>

              <div
                className="border-line absolute bottom-0 left-0 w-full origin-left scale-x-0"
                style={{ height: "1px", background: ACCENT }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Circle Indicator */}
      <div className="w-[45%] flex items-center justify-center sticky top-0 h-screen mt-[-96px]">
        <div
          className="relative w-[260px] h-[260px] rounded-full flex items-center justify-center transition-colors duration-500"
          style={{
            backgroundColor: isOdd ? ACCENT : "transparent",
            border: isOdd ? "none" : `2px solid ${GOLD}`,
          }}
        >
          <div
            className="absolute inset-0 w-full h-full rounded-full border border-dashed opacity-50 animate-slowspin"
            style={{ borderColor: GOLD, transform: "scale(1.08)" }}
          />
          <span
            className="transition-colors duration-500"
            style={{
              fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
              fontSize: "80px",
              color: isOdd ? TEXT : GOLD,
            }}
          >
            {activeCircle.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
