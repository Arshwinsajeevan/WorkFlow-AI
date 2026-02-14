import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  const navStyle = {
    padding: "24px 24px",
    background: "#111",
    borderBottom: "1px solid #222",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  };

  const linkContainer = {
    display: "flex",
    gap: 20
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#4CAF50" : "#ccc",
    textDecoration: "none",
    fontWeight: 500,
  });

  return (
    <div style={navStyle}>
      <div style={{ fontWeight: 700 }}>
        Workflow Builder Lite
      </div>

      <div style={linkContainer}>
        <Link style={linkStyle("/")} to="/">Home</Link>
        <Link style={linkStyle("/builder")} to="/builder">Builder</Link>
        <Link style={linkStyle("/run")} to="/run">Run</Link>
        <Link style={linkStyle("/history")} to="/history">History</Link>
        <Link style={linkStyle("/status")} to="/status">Status</Link>
      </div>
    </div>
  );
}
