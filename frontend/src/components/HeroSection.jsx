import React from "react";
import { Link } from "react-router-dom";
import buildingImage from "../assets/landing-hero.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative w-full min-h-[100svh] md:min-h-[85vh] flex items-center justify-center bg-cover bg-center bg-no-repeat pt-24 pb-32 transition-colors"
      style={{ backgroundImage: `url(${buildingImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center mt-8">
        <div className="inline-block bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md text-emerald-400 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-widest mb-6 shadow-lg">
          NMMC URBAN HOMELESS SHELTER
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 drop-shadow-2xl leading-tight tracking-tight">
          MAA ASTHA SAMAJIK <br className="hidden md:block" /> VIKAS SEWA
          SANSTHA
        </h1>

        <p className="text-emerald-400 font-bold text-lg sm:text-2xl mb-6 sm:mb-8 leading-snug drop-shadow-md">
          मा आस्था सामाजिक विकास सेवा संस्था
        </p>

        <div className="w-16 sm:w-24 h-1.5 bg-emerald-500 mx-auto mb-6 sm:mb-8 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.6)]"></div>

        <div className="mb-10 sm:mb-12 space-y-2">
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-medium italic drop-shadow-md">
            "Compassion in Action, Dignity in Life"
          </p>
          <p className="text-base sm:text-lg text-emerald-200/80 font-medium">
            "कृतीतून करुणा, जीवनात प्रतिष्ठा"
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full max-w-2xl mx-auto">
          <Link
            to="/rescue"
            className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 sm:py-4 rounded-2xl font-bold transition-all shadow-xl shadow-rose-900/40 flex flex-col items-center justify-center border border-rose-500 group"
          >
            <span className="text-base sm:text-lg flex items-center gap-2">
              🚨 Emergency Rescue
            </span>
            <span className="text-rose-200 text-xs sm:text-sm mt-0.5 group-hover:text-white transition-colors">
              आपत्कालीन बचाव
            </span>
          </Link>

          <Link
            to="/donate"
            className="w-full sm:w-auto bg-ngo-green/80 hover:bg-slate-800 backdrop-blur-xl border border-slate-700 text-white px-6 py-3.5 sm:py-4 rounded-2xl font-bold transition-all shadow-xl flex flex-col items-center justify-center group"
          >
            <span className="text-base sm:text-lg">Support Our Cause</span>
            <span className="text-white-400 text-xs sm:text-sm mt-0.5 group-hover:text-white-200 transition-colors">
              आम्हाला सहकार्य करा
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
