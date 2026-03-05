interface NavBarProps {
  onMenuClick: () => void;
}

export default function NavBar({ onMenuClick }: NavBarProps) {
  return (
    <button
      onClick={onMenuClick}
      style={{
        position: "fixed",
        top: "var(--gutter)",
        left: "var(--gutter)",
        zIndex: 45,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px 12px",
        mixBlendMode: "normal",

        // “prominent” editorial text styling
        fontFamily: `"Playfair Display", "Cormorant Garamond", serif`,
        fontSize: "18px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "#111111", // black text (works with your planned white left panel)
      }}
      aria-label="Open menu"
    >
      MENU
    </button>
  );
}