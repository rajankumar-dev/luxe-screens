import Footer from "./components/layouts/Footer.jsx";
import Header from "./components/layouts/Header.jsx";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import Gallery from "./pages/Gallery.jsx";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Signup from "./pages/SignUp.jsx";

function AppContent() {
  const location = useLocation();

  const authPages = [
    "/signup",
    "/login",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
  ];

  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-black text-white">

      {!isAuthPage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;