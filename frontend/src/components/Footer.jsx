import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 pt-16 pb-8 border-t-[6px] border-ngo-green transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Section 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading tracking-tight mb-2">
              Maa <span className="text-ngo-green">Astha</span>
            </h3>
            <p className="text-ngo-green font-bold text-sm italic">
              मा आस्ता फाउंडेशन
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              An NGO dedicated to the rescue, rehabilitation, and reintegration
              of homeless and missing individuals.
              <br />
              <span className="italic text-xs text-slate-500 mt-1 block">
                (बेघरांना प्रतिष्ठा आणि आशा मिळवून देण्यासाठी समर्पित.)
              </span>
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-ngo-green hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-ngo-green hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-ngo-green hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-ngo-green hover:text-white transition-all text-slate-600 dark:text-slate-400"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 inline-block">
              Quick Links / दुवे
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/about"
                  className="hover:text-ngo-green transition-colors flex items-center gap-2"
                >
                  <span className="text-ngo-green">▸</span> About Us /
                  आमच्याबद्दल
                </Link>
              </li>
              <li>
                <Link
                  to="/missing"
                  className="hover:text-ngo-green transition-colors flex items-center gap-2"
                >
                  <span className="text-ngo-green">▸</span> Missing / हरवलेले
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="hover:text-ngo-green transition-colors flex items-center gap-2"
                >
                  <span className="text-ngo-green">▸</span> NGO Events /
                  कार्यक्रम
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="hover:text-ngo-green transition-colors flex items-center gap-2"
                >
                  <span className="text-ngo-green">▸</span> Volunteer /
                  स्वयंसेवक
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Contact */}
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 inline-block">
              Contact Us / संपर्क
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-ngo-green shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400">
                  NMMC Shelter, Ghansoli, Navi Mumbai
                  <br />
                  <span className="text-xs italic mt-1 block">
                    (एनएमएमसी निवारा, घणसोली, नवी मुंबई)
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-ngo-green shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">
                  +91 98765 43210
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-ngo-green shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">
                  contact@maaastha.org
                </span>
              </li>
            </ul>
          </div>

          {/* Section 4: Actions */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white font-heading mb-6 border-b border-slate-200 dark:border-slate-800 pb-2 inline-block">
              Take Action / कृती करा
            </h4>
            <Link
              to="/rescue"
              className="w-full flex justify-center items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-rose-900/20"
            >
              🚨 Request a Rescue
            </Link>
            <Link
              to="/donate"
              className="w-full flex justify-center items-center gap-2 bg-ngo-green hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-emerald-900/20"
            >
              <Heart size={16} /> Donate Now
            </Link>
          </div>
        </div>

        {/* Copyright Section*/}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-center items-center gap-4 text-xs text-slate-500 text-center">
          <p>
            © {new Date().getFullYear()} Maa Astha Foundation. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
