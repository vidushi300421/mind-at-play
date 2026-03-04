interface NavBarProps {
  onMenuClick: () => void;
}

export default function NavBar({ onMenuClick }: NavBarProps) {
  return (
    <button
      onClick={onMenuClick}
      style={{
        position: "fixed",
        top: "28px",
        right: "36px",
        zIndex: 45,
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "5px",
        padding: "8px",
        mixBlendMode: "normal",
      }}
      aria-label="Open menu"
    >
      <span style={{ display: "block", width: "28px", height: "1.5px", background: "#F0EBE1", transition: "width 0.3s" }} />
      <span style={{ display: "block", width: "20px", height: "1.5px", background: "#F0EBE1", transition: "width 0.3s" }} />
      <span style={{ display: "block", width: "24px", height: "1.5px", background: "#F0EBE1", transition: "width 0.3s" }} />
    </button>
  );
}
