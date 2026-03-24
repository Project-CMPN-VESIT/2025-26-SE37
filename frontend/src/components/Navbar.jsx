import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiLight, CiDark } from "react-icons/ci"; // <-- Premium Icons Import

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
    { name: "Missing", path: "/missing" },
    { name: "Events", path: "/events" },
    { name: "Volunteer", path: "/volunteer" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm fixed w-full z-50 top-0 left-0 transition-colors duration-300 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="font-heading font-bold text-xl tracking-wide text-gray-900 dark:text-white whitespace-nowrap">
                Maa Astha
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <div className="flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={index}
                    to={link.path}
                    className={`transition-all duration-300 font-medium py-1 border-b-2 whitespace-nowrap ${
                      isActive
                        ? "text-green-600 dark:text-green-500 border-green-600 dark:border-green-500"
                        : "border-transparent text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center space-x-4 border-l pl-4 xl:pl-6 border-gray-200 dark:border-gray-700">
              {/* Premium Theme Toggle Desktop */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 ring-green-200 dark:ring-gray-700 transition-all flex-shrink-0"
                title="Toggle Theme"
              >
                {theme === "light" ? <CiDark size={24} /> : <CiLight size={24} className="text-yellow-400" />}
              </button>

              <Link
                to="/rescue"
                className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-md font-bold transition duration-300 whitespace-nowrap"
              >
                Emergency
              </Link>
              <Link
                to="/donate"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-bold transition duration-300 shadow-md whitespace-nowrap"
              >
                Donate
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            {/* Premium Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:ring-2 ring-green-200 dark:ring-gray-700 transition-all"
              title="Toggle Theme"
            >
              {theme === "light" ? <CiDark size={24} /> : <CiLight size={24} className="text-yellow-400" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 dark:text-white text-2xl focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden absolute w-full bg-white dark:bg-gray-900 shadow-xl border-t border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
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
                    ? "bg-green-50 dark:bg-gray-800 text-green-600 dark:text-green-500 border-green-600"
                    : "border-transparent text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500 hover:bg-green-50 dark:hover:bg-gray-800"
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
              className="w-full text-center text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-4 py-3 rounded-md font-bold transition"
            >
              Emergency
            </Link>
            <Link
              to="/donate"
              onClick={closeMenu}
              className="w-full text-center bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md font-bold transition shadow-md"
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