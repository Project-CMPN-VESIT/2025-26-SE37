import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    // 🔥 Background ab App.jsx handle kar raha hai, toh yahan se background color hata diya hai taaki global theme sync ho
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <div className="bg-ngo-dark text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            About Maa Astha
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-sans">
            Humara maqsad beghar, besahara aur gumm hue logon ko unki manzil aur
            parivaar tak pohochana hai. Maa Astha sirf ek NGO nahi, ek aasha ki
            kiran hai.
          </p>
        </div>
      </div>

      {/* 2. MISSION & VISION SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          {/* 🔥 dark:bg-gray-800 aur dark:border-gray-700 add kiya */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-ngo-green transition-colors duration-300">
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="text-2xl font-heading font-bold text-ngo-dark dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
              Sadak par rehne wale besahara logon ko turant aashray (shelter)
              aur medical help provide karna. Sath hi, jo log apne parivaar se
              bichhad gaye hain, unhe wapas milane ke liye din-raat ek karna.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-ngo-light transition-colors duration-300">
            <div className="text-4xl mb-4">👁️</div>
            <h2 className="text-2xl font-heading font-bold text-ngo-dark dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
              Ek aisa samaj banana jahan koi bhi insaan akelepan, bhookh ya
              bimari ki wajah se sadak par dam na tode. Har bhatke hue insaan ko
              ek surakshit chhat aur parivaar ka pyaar mile.
            </p>
          </div>
        </div>
      </div>

      {/* 3. WHAT WE DO SECTION */}
      {/* 🔥 dark:bg-gray-900 set kiya */}
      <div className="bg-white dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-ngo-dark dark:text-white mb-12">
            What We Do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              {/* 🔥 dark:bg-gray-800 add kiya icon container ke liye */}
              <div className="w-20 h-20 mx-auto bg-green-50 dark:bg-gray-800 text-ngo-green rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors duration-300">
                🤝
              </div>
              <h3 className="text-xl font-bold text-ngo-dark dark:text-white mb-3 font-heading">
                Rescue Operations
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-sans">
                Information milte hi humari team sadak par rehne wale bimar ya
                mentally challenged logon ko rescue karti hai.
              </p>
            </div>

            <div className="p-6">
              <div className="w-20 h-20 mx-auto bg-green-50 dark:bg-gray-800 text-ngo-green rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors duration-300">
                🏠
              </div>
              <h3 className="text-xl font-bold text-ngo-dark dark:text-white mb-3 font-heading">
                Safe Shelter
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-sans">
                Rescue kiye gaye logon ko humare aashray me rakha jata hai,
                jahan unhe khana, kapde aur medical care milti hai.
              </p>
            </div>

            <div className="p-6">
              <div className="w-20 h-20 mx-auto bg-green-50 dark:bg-gray-800 text-ngo-green rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm transition-colors duration-300">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-xl font-bold text-ngo-dark dark:text-white mb-3 font-heading">
                Family Reunion
              </h3>
              <p className="text-gray-600 dark:text-gray-300 font-sans">
                Police aur social media ki madad se hum in logon ke parivaar ko
                dhund kar unhe wapas milate hain.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CALL TO ACTION */}
      <div className="bg-ngo-light py-16 px-4 text-center">
        <h2 className="text-3xl font-heading font-bold text-white mb-6">
          Be a Part of Our Journey
        </h2>
        <p className="text-green-50 mb-8 max-w-2xl mx-auto font-sans">
          Aapka thoda sa samay ya chhota sa yogdaan kisi ki zindagi badal sakta
          hai. Aaj hi humare sath judein.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/volunteer"
            className="bg-white text-ngo-dark hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition shadow-lg"
          >
            Join as Volunteer
          </Link>
          <Link
            to="/donate"
            className="bg-ngo-dark text-white hover:bg-gray-800 border border-white font-bold py-3 px-8 rounded-full transition shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
