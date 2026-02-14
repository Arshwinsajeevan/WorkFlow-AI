import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Run from "./pages/Run";
import History from "./pages/History";
import Status from "./pages/Status";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/run" element={<Run />} />
          <Route path="/history" element={<History />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
