import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiLight, CiDark } from "react-icons/ci";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Missing", path: "/missing" },
    { name: "Events", path: "/events" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-500 font-sans 
      ${
        scrolled
          ? "py-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg border-b border-gray-100/30 dark:border-gray-800/30"
          : "py-5 bg-white dark:bg-gray-900"
      }`}
    >
      {/* Container with max-width */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* LOGO & BRAND */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="Maa Astha Logo"
                className="h-12 w-auto object-contain rounded-full shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="font-heading font-black text-2xl tracking-tighter text-ngo-dark dark:text-white group-hover:text-ngo-green transition-colors">
                Maa Astha
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            <div className="flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  // Active Link Animation below text
                  <div key={index} className="relative group px-3 py-2">
                    <Link
                      to={link.path}
                      className={`transition-all duration-300 font-bold text-sm uppercase tracking-wider whitespace-nowrap 
                        ${
                          isActive
                            ? "text-ngo-green dark:text-ngo-green"
                            : "text-slate-700 dark:text-slate-300 hover:text-ngo-green dark:hover:text-ngo-green"
                        }`}
                    >
                      {link.name}
                    </Link>
                    {/* The animated moving line */}
                    <span
                      className={`absolute bottom-0 left-3 h-0.5 bg-ngo-green rounded-full transition-all duration-300 
                      ${isActive ? "w-4/5" : "w-0 group-hover:w-4/5"}`}
                    ></span>
                  </div>
                );
              })}
            </div>

            {/* Premium CTA Buttons Container */}
            <div className="flex items-center space-x-4 border-l pl-4 xl:pl-6 border-slate-200 dark:border-slate-700">
              {/* Premium Theme Toggle Desktop (with premium icons from previous version) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-ngo-green/20 dark:ring-slate-700 transition-all flex-shrink-0"
                title="Toggle Theme"
              >
                {theme === "light" ? (
                  <CiDark size={22} />
                ) : (
                  <CiLight size={22} className="text-yellow-400" />
                )}
              </button>

              <Link
                to="/rescue"
                className="text-white bg-ngo-red hover:bg-red-700 px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-md shadow-ngo-red/20 whitespace-nowrap"
              >
                Emergency
              </Link>
              <Link
                to="/donate"
                className="bg-ngo-green hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-ngo-green/30 whitespace-nowrap"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Premium Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-ngo-green/20 dark:ring-slate-700 transition-all"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <CiDark size={22} />
              ) : (
                <CiLight size={22} className="text-yellow-400" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white text-3xl focus:outline-none p-1 rounded-lg"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAV MENU (Glassmorphism as well) */}
      <div
        className={`lg:hidden absolute w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl border-t border-gray-100/30 dark:border-gray-800/30 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-4 pb-10 space-y-2 flex flex-col">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={index}
                to={link.path}
                onClick={closeMenu}
                className={`block px-5 py-4 rounded-xl text-base font-bold uppercase tracking-wider transition-all border-l-4 ${
                  isActive
                    ? "bg-ngo-light/30 dark:bg-emerald-950/40 text-ngo-green border-ngo-green"
                    : "border-transparent text-slate-700 dark:text-slate-300 hover:text-ngo-green dark:hover:text-ngo-green hover:bg-ngo-light/20 dark:hover:bg-gray-800/50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-4 px-3">
            <Link
              to="/rescue"
              onClick={closeMenu}
              className="w-full text-center text-white bg-ngo-red hover:bg-red-700 px-5 py-4 rounded-xl font-bold uppercase tracking-wider transition shadow-md shadow-ngo-red/20"
            >
              Emergency
            </Link>
            <Link
              to="/donate"
              onClick={closeMenu}
              className="w-full text-center bg-ngo-green hover:bg-emerald-700 text-white px-5 py-4 rounded-xl font-bold uppercase tracking-wider transition shadow-lg shadow-ngo-green/30"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
