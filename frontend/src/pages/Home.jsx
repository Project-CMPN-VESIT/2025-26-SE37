import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-sans">
      {/* 1. HERO SECTION */}
      <div
        className="relative bg-cover bg-center h-[85vh] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 px-4 max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight mb-10 tracking-wide uppercase">
            Helping families <br /> reunite with their <br />
            <span className="text-ngo-red">missing</span> loved ones.
          </h1>

          <Link
            to="/missing"
            className="bg-ngo-red text-white font-bold rounded-full w-36 h-36 flex items-center justify-center hover:bg-red-700 transition duration-300 transform hover:scale-105 shadow-xl text-center leading-tight"
          >
            <span className="text-sm tracking-wider font-heading">
              FIND MISSING
              <br />
              PEOPLE
            </span>
          </Link>
        </div>
      </div>

      {/* 2. ABOUT US SNIPPET SECTION */}
      <div className="container mx-auto px-4 py-20 text-center max-w-3xl">
        <h2 className="text-sm font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase mb-4">
          KNOW ABOUT US
        </h2>
        {/* 🔥 dark:text-white add kiya */}
        <h3 className="text-3xl md:text-4xl font-heading font-bold text-ngo-dark dark:text-white mb-6 transition-colors duration-300">
          We provide a place for the homeless with special needs
        </h3>
        {/* 🔥 dark:text-gray-300 add kiya */}
        <p className="text-gray-500 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
          Humara maqsad beghar, besahara aur gumm hue logon ko unki manzil aur
          parivaar tak pohochana hai. Maa Astha sirf ek NGO nahi, ek aasha ki
          kiran hai.
        </p>
        <Link
          to="/about"
          className="inline-block bg-ngo-light text-white px-8 py-3 rounded-md font-medium hover:bg-ngo-green transition shadow-sm"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default Home;
