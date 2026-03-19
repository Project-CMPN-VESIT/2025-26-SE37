import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const location = useLocation();

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
    { name: "Missing People", path: "/missing" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Contact", path: "/contact" },
    { name: "Admin Login", path: "/admin" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm fixed w-full z-50 top-0 left-0 transition-colors duration-300 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 bg-ngo-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="font-heading font-bold text-xl text-ngo-dark dark:text-white tracking-wide">
                Maa Astha
              </span>
            </Link>
          </div>

          {/* ✅ Desktop Menu (UPDATED SNIPPET APPLIED) */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`transition-all duration-300 font-medium py-1 border-b-2 ${
                    isActive
                      ? "text-ngo-green dark:text-ngo-green border-ngo-green"
                      : "border-transparent text-gray-600 dark:text-gray-300 hover:text-ngo-green dark:hover:text-ngo-green hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <button
              onClick={toggleTheme}
              className="text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-gray-200 dark:border-gray-700">
              <Link
                to="/rescue"
                className="text-ngo-red border border-ngo-red hover:bg-ngo-red hover:text-white px-4 py-2 rounded-md font-bold transition duration-300"
              >
                Emergency
              </Link>
              <Link
                to="/donate"
                className="bg-ngo-green hover:bg-ngo-dark text-white px-5 py-2 rounded-md font-bold transition duration-300 shadow-md"
              >
                Donate
              </Link>
            </div>
          </div>

          {/* Mobile Top Bar */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="text-xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-ngo-dark dark:text-white hover:text-ngo-green"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu (UPDATED SNIPPET APPLIED) */}
      <div
        className={`md:hidden absolute w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={index}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-r-md text-base font-medium transition-all duration-300 border-l-4 ${
                  isActive
                    ? "bg-green-50 dark:bg-gray-800 text-ngo-green dark:text-ngo-green border-ngo-green"
                    : "border-transparent text-gray-700 dark:text-gray-300 hover:text-ngo-green dark:hover:text-ngo-green hover:bg-green-50 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col space-y-3 px-3">
            <Link
              to="/rescue"
              onClick={closeMenu}
              className="w-full text-center text-ngo-red border border-ngo-red hover:bg-ngo-red hover:text-white px-4 py-3 rounded-md font-bold transition"
            >
              Rescue Emergency
            </Link>
            <Link
              to="/donate"
              onClick={closeMenu}
              className="w-full text-center bg-ngo-green hover:bg-ngo-dark text-white px-4 py-3 rounded-md font-bold transition shadow-md"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
