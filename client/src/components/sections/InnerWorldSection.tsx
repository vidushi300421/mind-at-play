import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ITEMS = [
  { category: "The Battles", word: "ANXIETY" },
  { category: "The Battles", word: "FEAR" },
  { category: "The Fuel", word: "DRIVE" },
  { category: "The Fuel", word: "HUNGER" },
  { category: "The Edge", word: "PRESSURE" },
  { category: "The Edge", word: "RESILIENCE" },
  { category: "The Cost", word: "BURNOUT" },
  { category: "The Cost", word: "SACRIFICE" },
];

export default function InnerWorldSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Pinning and word drop logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=400%", // 400vh
        onUpdate: (self) => {
          // Calculate active index based on progress
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * ITEMS.length), ITEMS.length - 1);
          setActiveIndex(index);
        }
      }
    });

    // Create dropping words animation in right half
    const words = gsap.utils.toArray(".dropping-word") as HTMLElement[];
    words.forEach((word, i) => {
      // stagger the drops over the timeline
      tl.fromTo(word, 
        { y: -300, opacity: 0, scale: 0.8 },
        { 
          y: Math.sin(i / (ITEMS.length - 1) * Math.PI) * 100, // Arc shape 
          x: (i - ITEMS.length / 2) * 40,
          opacity: 1, 
          scale: 1,
          duration: 1,
          ease: "bounce.out"
        },
        i * (1 / ITEMS.length) // position in timeline
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  const activeItem = ITEMS[activeIndex] || ITEMS[0];

  return (
    <div ref={containerRef} className="w-full h-screen flex relative bg-panel-right overflow-hidden">
      {/* Left Half (Category & Large Word) */}
      <div className="w-[48%] h-full flex flex-col justify-center pl-12">
        <div className="font-sans text-[11px] uppercase tracking-widest text-accent-gold mb-4 transition-all duration-300">
          {activeItem.category}
        </div>
        <div className="font-serif text-[72px] text-foreground leading-[1] transition-all duration-300">
          {activeItem.word}
        </div>
      </div>

      {/* Right Half (Falling Words into a bowl) */}
      <div className="w-[52%] h-full relative flex items-end justify-center pb-32">
        {/* Bowl decoration */}
        <div className="absolute bottom-24 w-[80%] h-[200px] border-b border-[#0d0d0d1a] rounded-[100%] pointer-events-none" />
        
        <div className="relative w-full flex justify-center items-end h-[400px]">
          {ITEMS.map((item, i) => (
            <div 
              key={i}
              className="dropping-word absolute font-serif text-[24px] text-foreground italic px-4 py-2 border border-foreground rounded-full bg-white opacity-0"
              style={{
                zIndex: ITEMS.length - i
              }}
            >
              {item.word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}