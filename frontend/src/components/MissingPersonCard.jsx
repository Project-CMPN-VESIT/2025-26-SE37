import React from "react";
import { MapPin, Calendar, User, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MissingPersonCard = ({ person }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 flex flex-col group">
      <div className="relative h-64 overflow-hidden">
        <img
          src={
            person.imageUrl?.startsWith("http")
              ? person.imageUrl
              : `http://localhost:5000${person.imageUrl}`
          }
          alt={person.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x400?text=Photo+Missing";
          }}
        />
        <div className="absolute top-4 right-4 bg-rose-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-widest animate-pulse">
          Missing
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 line-clamp-1">
          {person.name}
        </h3>

        <div className="space-y-3 flex-1 mb-6">
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <User size={18} className="text-rose-500" />
            <span className="font-semibold">
              {person.age} Years {person.gender && `• ${person.gender}`}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
            <Calendar size={18} className="text-indigo-500" />
            <span className="font-semibold">
              Since: {new Date(person.missingSince).toLocaleDateString("en-IN")}
            </span>
          </div>
          <div className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
            <MapPin size={18} className="text-emerald-500 mt-0.5" />
            <span className="font-semibold line-clamp-2">
              {person.location}
            </span>
          </div>

          {/* 🔥 DHYAAN SE DEKH: Ye hai description ka travel logic */}
          {person.description && (
            <div className="mt-4 p-3.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl flex gap-3">
              <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs font-medium italic text-slate-600 dark:text-slate-400 leading-relaxed">
                "{person.description}"
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/report-missing", { state: person })}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-xl hover:bg-ngo-green dark:hover:bg-ngo-green transition-all uppercase tracking-wide text-xs"
        >
          I Have Information
        </button>
      </div>
    </div>
  );
};

export default MissingPersonCard;
