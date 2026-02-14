import Navbar from "./Navbar";

export default function Layout({ children }) {

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0d0d",
      color: "#fff"
    }}>
      <Navbar />

      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        {children}
      </div>
    </div>
  );
}
