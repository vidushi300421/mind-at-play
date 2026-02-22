import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Enter animation
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
    gsap.to(row.querySelector(".service-name"), { color: "#A71D31", duration: 0.3 });
    gsap.to(row.querySelector(".arrow"), { x: 8, duration: 0.3 });
    gsap.to(row.querySelector(".border-line"), { scaleX: 1, duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = (index: number) => {
    const row = rowsRef.current[index];
    if (!row) return;
    gsap.to(row.querySelector(".hover-bg"), { scaleX: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(row.querySelector(".service-name"), { color: "#0D0D0D", duration: 0.3 });
    gsap.to(row.querySelector(".arrow"), { x: 0, duration: 0.3 });
    gsap.to(row.querySelector(".border-line"), { scaleX: 0, duration: 0.3, ease: "power3.in" });
  };

  const isOdd = activeCircle % 2 !== 0;

  return (
    <div className="w-full min-h-screen py-24 px-12 relative flex">
      {/* List */}
      <div className="w-[55%] pr-12">
        <div className="font-sans text-[11px] uppercase tracking-widest text-accent-gold border-b border-[#0d0d0d1a] pb-3 mb-8">
          Services
        </div>

        <div className="flex flex-col">
          {SERVICES.map((srv, i) => (
            <div
              key={i}
              ref={el => { rowsRef.current[i] = el; }}
              className="relative py-[28px] border-b border-[#0d0d0d1a] flex items-center justify-between cursor-pointer overflow-hidden group opacity-0"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className="hover-bg absolute inset-0 bg-[#A71D310A] origin-left scale-x-0 pointer-events-none" />
              
              <div className="flex items-center gap-12 relative z-10">
                <span className="font-sans text-[12px] text-accent-red">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="service-name font-serif text-[36px] text-foreground transition-colors">{srv}</span>
              </div>
              
              <div className="arrow relative z-10 font-sans text-[16px] text-accent-gold">→</div >
              
              {/* Bottom active line */}
              <div className="border-line absolute bottom-0 left-0 w-full h-[1px] bg-accent-red origin-left scale-x-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Circle Indicator */}
      <div className="w-[45%] flex items-center justify-center sticky top-0 h-screen mt-[-96px]">
        <div 
          className="relative w-[260px] h-[260px] rounded-full flex items-center justify-center transition-colors duration-500"
          style={{
            backgroundColor: isOdd ? '#A71D31' : 'transparent',
            border: isOdd ? 'none' : '2px solid #D5BF86'
          }}
        >
          {/* Spinning dashed ring */}
          <div className="absolute inset-0 w-full h-full rounded-full border border-dashed border-[#D5BF86] opacity-50 animate-slowspin" style={{ transform: 'scale(1.08)' }} />
          
          <span 
            className="font-serif text-[80px] transition-colors duration-500"
            style={{ color: isOdd ? '#F1F0CC' : '#D5BF86' }}
          >
            {activeCircle.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}