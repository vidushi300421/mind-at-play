import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const LINKS = [
  { label: "Introduction", id: "hero-intro"    },
  { label: "Services",     id: "hero-services" },
  { label: "Inner World",  id: "innerworld"    },
  { label: "Pricing",      id: "section-3"     },
  { label: "Contact",      id: "section-4"     },
  { label: "Writing",      id: "section-5"     },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef  = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      x: isOpen ? "0%" : "-100%",
      duration: 0.6,
      ease: isOpen ? "power4.out" : "power4.inOut",
    });
  }, [isOpen]);

  const onEnter = (i: number) => {
    const el = linksRef.current[i];
    if (!el) return;
    gsap.to(el.querySelector(".lk-text"), { color: "#6C8E7D", duration: 0.25 });
    gsap.to(el.querySelector(".lk-line"), { scaleX: 1, duration: 0.35, ease: "power3.out" });
    gsap.to(el.querySelector(".lk-num"),  { opacity: 1, x: 0, duration: 0.25 });
  };
  const onLeave = (i: number) => {
    const el = linksRef.current[i];
    if (!el) return;
    gsap.to(el.querySelector(".lk-text"), { color: "#F0EBE1", duration: 0.25 });
    gsap.to(el.querySelector(".lk-line"), { scaleX: 0, duration: 0.25, ease: "power3.in" });
    gsap.to(el.querySelector(".lk-num"),  { opacity: 0, x: -10, duration: 0.25 });
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] translate-x-[-100%] flex"
      style={{ background: "#350D12" }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: "clamp(24px,3vw,40px)", right: "clamp(24px,4vw,56px)",
          fontFamily: "'Cabinet Grotesk', 'DM Sans', sans-serif",
          fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(240,235,225,0.5)",
          background: "none", border: "none", cursor: "pointer",
        }}
      >
        Close ✕
      </button>

      {/* Links */}
      <div style={{
        flex: 1, height: "100%",
        paddingLeft: "clamp(40px, 8vw, 96px)",
        paddingTop: "10vh",
        display: "flex", flexDirection: "column", justifyContent: "center",
        gap: "4px",
      }}>
        {LINKS.map((link, i) => (
          <a
            key={i}
            ref={el => { linksRef.current[i] = el; }}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" }), 300);
            }}
            className="group relative block w-fit"
            style={{ textDecoration: "none" }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={() => onLeave(i)}
          >
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <span
                className="lk-num"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "11px", color: "#6C8E7D",
                  position: "absolute", left: "-32px",
                  opacity: 0, transform: "translateX(-10px)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="lk-text"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(36px, 5vw, 68px)",
                  fontWeight: 400,
                  color: "#F0EBE1",
                  lineHeight: 1.15,
                }}
              >
                {link.label}
              </span>
            </div>
            <div
              className="lk-line"
              style={{
                height: "1px", background: "#6C8E7D",
                width: "100%", position: "absolute",
                bottom: 0, left: 0,
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </a>
        ))}
      </div>

      {/* Right decoration */}
      <div style={{
        flexShrink: 0, width: "30%", display: "flex",
        flexDirection: "column", justifyContent: "flex-end",
        paddingBottom: "clamp(24px,4vw,56px)",
        paddingRight: "clamp(24px,4vw,56px)",
        alignItems: "flex-end",
        gap: "4px",
      }}>
        <div style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "11px", color: "rgba(240,235,225,0.35)",
          letterSpacing: "0.1em",
        }}>
          hello@adishridubey.com
        </div>
        <div style={{
          fontFamily: "'Cabinet Grotesk', sans-serif",
          fontSize: "11px", color: "rgba(240,235,225,0.35)",
          letterSpacing: "0.1em",
        }}>
          @mindatplay
        </div>
      </div>
    </div>
  );
}
