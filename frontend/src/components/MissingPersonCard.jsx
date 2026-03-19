import React from "react";

const MissingPersonCard = ({ name, age, missingSince, location, imageUrl }) => {
  return (
    // 🔥 dark:bg-gray-800 aur dark:border-gray-700 add kiya
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
        <img
          src={imageUrl || "https://via.placeholder.com/300x400?text=No+Image"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-ngo-red text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-md">
          MISSING
        </div>
      </div>

      <div className="p-5">
        {/* 🔥 text colors for dark mode */}
        <h3 className="text-xl font-bold font-heading text-ngo-dark dark:text-white mb-2">
          {name}
        </h3>
        <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mb-4">
          <p>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Age:
            </span>{" "}
            {age} years
          </p>
          <p>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Missing Since:
            </span>{" "}
            {missingSince}
          </p>
          <p>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Last Seen:
            </span>{" "}
            {location}
          </p>
        </div>

        <button className="w-full bg-ngo-green hover:bg-ngo-dark text-white font-semibold py-2 rounded transition-colors duration-300 shadow-sm">
          Report Info
        </button>
      </div>
    </div>
  );
};

export default MissingPersonCard;
