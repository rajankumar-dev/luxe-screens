import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Contact from "./components/sections/Contact";
import FAQ from "./components/sections/FAQ";
import GalleryPreview from "./components/sections/GalleryPreview";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import "./index.css";

function App() {
  return (

    <div className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <Header />

      <main id="home">
        {/* Hero */}
        <Hero />
        {/* Services */}
        <Services />
        {/* Gallery Preview */}
        <GalleryPreview />
        {/* FAQ */}
        <FAQ />
        {/* Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;