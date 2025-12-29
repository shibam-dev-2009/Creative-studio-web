import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Home from "./Pages/Home/Home";
import Work from "./Pages/Work/Work";
import Learn from "./Pages/Learn/Learn";
import Legal from "./Pages/Legal/Legal";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";


import './App.css'
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/Scrolltotop/Scrolltotop";
function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate an initial check (e.g., checking if admin is logged in or loading assets)
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1500); // 1.5 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  // Display the buffer if appLoading is true
  if (appLoading) {
    return (
      <div className="app-loader-container">
        <div className="main-spinner"></div>
        <h2 className="loading-logo">Creative Studio</h2>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/:page" element={<Legal />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
