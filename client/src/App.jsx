import Footer from "./components/layouts/Footer.jsx";
import Header from "./components/layouts/Header.jsx";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import Gallery from "./pages/Gallery.jsx";
import Home from "./pages/Home.jsx";
import Booking from "./pages/Booking.jsx";
import Signup from "./pages/SignUp.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import Services from "./pages/Service.jsx";
import FAQ from "./pages/Faq.jsx";

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
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/booking" element={<Booking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

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