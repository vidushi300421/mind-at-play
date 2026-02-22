import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  "Hero", "Services", "Writing", "The Inner World", "Pricing", "Book a Call"
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (isOpen) {
      gsap.to(overlayRef.current, {
        x: "0%",
        duration: 0.6,
        ease: "power4.out"
      });
    } else {
      gsap.to(overlayRef.current, {
        x: "-100%",
        duration: 0.6,
        ease: "power4.inOut"
      });
    }
  }, [isOpen]);

  const handleMouseEnter = (index: number) => {
    const link = linksRef.current[index];
    if (!link) return;
    gsap.to(link.querySelector(".link-text"), { color: "#D5BF86", duration: 0.3 });
    gsap.to(link.querySelector(".link-num"), { opacity: 1, x: 0, duration: 0.3 });
    gsap.to(link.querySelector(".link-line"), { scaleX: 1, duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = (index: number) => {
    const link = linksRef.current[index];
    if (!link) return;
    gsap.to(link.querySelector(".link-text"), { color: "#F1F0CC", duration: 0.3 });
    gsap.to(link.querySelector(".link-num"), { opacity: 0, x: -10, duration: 0.3 });
    gsap.to(link.querySelector(".link-line"), { scaleX: 0, duration: 0.3, ease: "power3.in" });
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-[#3F0D12] translate-x-[-100%] flex"
    >
      <button 
        onClick={onClose}
        className="absolute top-12 right-12 text-white font-sans text-[18px] cursor-pointer"
      >
        ✕
      </button>

      {/* Left side links */}
      <div className="flex-1 h-full pl-[8vw] py-[10vh] flex flex-col justify-center">
        {LINKS.map((link, i) => (
          <a
            key={i}
            ref={el => { linksRef.current[i] = el; }}
            href={`#section-${i+1}`}
            onClick={(e) => {
              e.preventDefault();
              onClose();
              document.getElementById(`section-${i+1}`)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative block w-fit"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div className="flex items-center">
              <span className="link-num font-sans text-[#D5BF86] text-[14px] absolute -left-8 opacity-0 -translate-x-2">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <span className="link-text font-serif text-[clamp(40px,5vw,72px)] text-[#F1F0CC] leading-[1.1]">
                {link}
              </span>
            </div>
            <div className="link-line h-[1px] bg-[#D5BF86] w-full absolute bottom-0 left-0 origin-left scale-x-0" />
          </a>
        ))}
      </div>

      {/* Right side decoration */}
      <div className="flex-1 relative flex flex-col justify-between items-end pr-12 pb-12 overflow-hidden pointer-events-none">
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 rotate-90 origin-center font-serif text-[28vw] text-[#F1F0CC] opacity-[0.08] leading-none select-none">
          ADISHRI
        </div>
        <div className="mt-auto flex flex-col items-end gap-1">
          <div className="font-sans text-[13px] text-[#F1F0CC] opacity-60">hello@adishridubey.com</div>
          <div className="font-sans text-[13px] text-[#F1F0CC] opacity-60">@adishridubey</div>
        </div>
      </div>
    </div>
  );
}