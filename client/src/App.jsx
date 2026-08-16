import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-black text-white">

        {/* Navbar */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>

        {/* <main id="home">
          <Hero />
          <Services />
          <GalleryPreview />
          <FAQ />
          <Contact />
        </main> */}

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;