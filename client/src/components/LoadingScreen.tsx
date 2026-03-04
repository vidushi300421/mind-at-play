import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !firstNameRef.current || !lastNameRef.current) return;

    const tl = gsap.timeline();

    // 1. Line draws
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 0.9,
      ease: "power3.inOut"
    });

    // 2. Names reveal
    tl.to(firstNameRef.current, {
      y: 0,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.4");

    tl.to(lastNameRef.current, {
      y: 0,
      duration: 0.8,
      ease: "power4.out"
    }, "-=0.8");

    // 3. Line fades out
    tl.to(lineRef.current, {
      opacity: 0,
      duration: 0.5
    }, "-=0.2");

    // 4. Counter fast
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.8,
      ease: "none",
      onUpdate: function () {
        setCount(Math.floor(this.targets()[0].val));
      }
    }, 0); // starts at 0

    // 5. Name scales
    tl.to([firstNameRef.current, lastNameRef.current], {
      scale: 1.04,
      duration: 2.2,
      ease: "power1.inOut"
    }, 0);

    // 6. Exit
    tl.to(containerRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.7,
      ease: "power4.in",
      delay: 0.2, // wait a bit after 100
      onComplete: () => {
        onComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center pointer-events-none"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="absolute top-8 right-12 text-accent-red font-sans text-[12px] font-medium tracking-widest">
        {count.toString().padStart(2, '0')}
      </div>

      <div className="relative w-full flex flex-col items-center justify-center h-[200px]">
        {/* Line */}
        <div 
          ref={lineRef}
          className="absolute top-1/2 left-0 w-full h-[1px] bg-foreground origin-left"
          style={{ transform: "scaleX(0)" }}
        />
        
        {/* First Name - Reveal from bottom of its container (above the line) */}
        <div className="absolute bottom-[50%] left-0 w-full flex justify-center overflow-hidden pb-1">
          <div
            ref={firstNameRef}
            className="font-serif text-[11vw] text-foreground tracking-[-0.02em] font-light leading-none translate-y-[60px]"
          >
            MIND
          </div>
        </div>

        {/* Last Name - Reveal from top of its container (below the line) */}
        <div className="absolute top-[50%] left-0 w-full flex justify-center overflow-hidden pt-1">
          <div
            ref={lastNameRef}
            className="font-serif text-[11vw] text-foreground tracking-[-0.02em] font-light leading-none -translate-y-[60px]"
          >
            AT PLAY
          </div>
        </div>
      </div>
    </div>
  );
}