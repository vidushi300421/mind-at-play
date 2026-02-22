import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ARTICLES = [
  { tag: "Performance", title: "Why Elite Athletes Choke — And How to Stop It", excerpt: "Anxiety is information, not weakness.", date: "Jan 2025" },
  { tag: "Ritual", title: "The Pre-Game Ritual That Actually Works", excerpt: "Science-backed mental warm-ups.", date: "Feb 2025" },
  { tag: "Wellbeing", title: "Burnout Is Not a Badge of Honor", excerpt: "Recognize the signs before it's too late.", date: "Feb 2025" },
  { tag: "Flow State", title: "Flow State: How to Get There On Demand", excerpt: "The psychology behind peak performance.", date: "Mar 2025" },
  { tag: "Mindset", title: "What Your Inner Critic Is Really Saying", excerpt: "Turning self-doubt into self-awareness.", date: "Mar 2025" },
  { tag: "Teams", title: "Team Chemistry Isn't Magic — It's Mindset", excerpt: "Building trust through psychological safety.", date: "Apr 2025" },
];

export default function BlogSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(cardsRef.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0 0 0 0)",
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%"
        }
      }
    );
  }, []);

  const handleMouseEnter = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { backgroundColor: '#3F0D12', duration: 0.4, ease: "power2.out" });
    gsap.to(card.querySelectorAll(".card-text"), { color: '#F1F0CC', duration: 0.3 });
    gsap.to(card.querySelector(".category-tag"), { color: '#D5BF86', duration: 0.3 });
    gsap.to(card.querySelector(".top-line"), { scaleX: 1, duration: 0.4, ease: "power3.out" });
    gsap.to(card.querySelector(".arrow"), { x: 8, duration: 0.3 });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, { backgroundColor: '#FFFFFF', duration: 0.4 });
    gsap.to(card.querySelectorAll(".card-text"), { color: '#0D0D0D', duration: 0.3 });
    gsap.to(card.querySelector(".category-tag"), { color: '#A71D31', duration: 0.3 });
    gsap.to(card.querySelector(".top-line"), { scaleX: 0, duration: 0.3 });
    gsap.to(card.querySelector(".arrow"), { x: 0, duration: 0.3 });
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen py-24 px-12">
      <div className="font-sans text-[11px] uppercase tracking-widest text-accent-gold border-b border-[#0d0d0d1a] pb-3 mb-8">
        Writing
      </div>

      <div className="grid grid-cols-2 gap-6">
        {ARTICLES.map((article, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="relative bg-white border border-[#0d0d0d14] p-8 cursor-pointer flex flex-col justify-between min-h-[280px]"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <div className="top-line absolute top-0 left-0 w-full h-[2px] bg-accent-gold origin-left scale-x-0" />
            
            <div>
              <div className="category-tag font-sans text-[10px] uppercase tracking-widest text-accent-red mb-4">
                {article.tag}
              </div>
              <h3 className="card-text font-serif text-[24px] text-foreground leading-[1.2] mb-3">
                {article.title}
              </h3>
              <p className="card-text font-sans text-[13px] text-foreground opacity-65 line-clamp-2">
                {article.excerpt}
              </p>
            </div>

            <div className="flex justify-between items-end mt-8">
              <span className="card-text font-sans text-[12px] opacity-50">{article.date}</span>
              <span className="card-text font-sans text-[12px] flex items-center gap-1 font-medium">
                Read <span className="arrow inline-block">→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}