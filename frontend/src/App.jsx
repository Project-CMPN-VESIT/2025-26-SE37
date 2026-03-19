import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import MissingPeople from "./pages/MissingPeople";
import RescueRequest from "./pages/RescueRequest";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import Login from "./pages/Login";
import Volunteer from "./pages/Volunteer";
import AdminDashboard from "./pages/AdminDashboard";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin-dashboard";

  return (
    <>
      {!isAdminRoute && <Navbar />}

      {/* 🔥 Yahan bg-gray-50 aur dark:bg-gray-900 add kiya poore app ke liye */}
      <div
        className={`${!isAdminRoute ? "pt-20" : ""} min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/missing" element={<MissingPeople />} />
            <Route path="/rescue" element={<RescueRequest />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
