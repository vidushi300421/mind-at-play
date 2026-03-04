import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Services",    id: "hero-services" },
  { label: "Inner World", id: "innerworld"    },
  { label: "Pricing",     id: "section-3"     },
  { label: "Blog",        id: "section-5"     },
  { label: "Contact",     id: "section-4"     },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      height: "56px",
      zIndex: 45,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 40px",
      background: scrolled ? "rgba(18,16,12,0.95)" : "rgba(18,16,12,0.75)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(213,191,134,0.12)",
      transition: "background 0.3s ease",
    }}>
      {/* Brand */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          fontFamily: "SangBleuKing, 'Cormorant Garamond', serif",
          fontSize: "17px",
          fontStyle: "italic",
          fontWeight: 300,
          color: "#F0EBE1",
          letterSpacing: "0.02em",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        Adishri Dubey
      </button>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {NAV_LINKS.map(link => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            style={{
              fontFamily: "Visuelt, 'DM Sans', sans-serif",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "rgba(240,235,225,0.6)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
              padding: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#F0EBE1")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,235,225,0.6)")}
          >
            {link.label}
          </button>
        ))}

        {/* CTA */}
        <button
          onClick={() => scrollTo("section-4")}
          style={{
            fontFamily: "Visuelt, 'DM Sans', sans-serif",
            fontSize: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#F0EBE1",
            background: "#F34103",
            border: "none",
            padding: "9px 20px",
            cursor: "pointer",
            transition: "background 0.25s",
            marginLeft: "4px",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#350D12")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F34103")}
        >
          Book a Session →
        </button>
      </div>
    </nav>
  );
}
