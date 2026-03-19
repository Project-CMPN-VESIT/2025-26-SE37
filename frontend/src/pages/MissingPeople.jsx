import React, { useState } from "react";
import MissingPersonCard from "../components/MissingPersonCard";

const MissingPeople = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const missingPersons = [
    {
      id: 1,
      name: "Ramesh Kumar",
      age: 45,
      missingSince: "12 March 2026",
      location: "Panvel Station, Navi Mumbai",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Sita Devi",
      age: 62,
      missingSince: "10 March 2026",
      location: "Kalyan West",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Rahul Verma",
      age: 28,
      missingSince: "15 March 2026",
      location: "Vashi Sector 17",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Arjun Singh",
      age: 12,
      missingSince: "16 March 2026",
      location: "Dombivli East",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Meera Bai",
      age: 55,
      missingSince: "05 March 2026",
      location: "Thane Station",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const filteredPersons = missingPersons.filter((person) => {
    const matchName = person.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchMinAge = minAge === "" || person.age >= parseInt(minAge);
    const matchMaxAge = maxAge === "" || person.age <= parseInt(maxAge);
    return matchName && matchMinAge && matchMaxAge;
  });

  return (
    <div className="pt-24 pb-12 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-ngo-dark dark:text-white mb-4">
            Help Us Find Them
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Agar aapne inme se kisi ko bhi dekha hai, toh turant NGO ko inform
            karein. Ek call kisi ki zindagi badal sakti hai.
          </p>
        </div>

        {/* 🔥 Filter Bar Dark Mode Styling */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-10 border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-center justify-between transition-colors duration-300">
          <div className="w-full md:w-1/2 relative">
            <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
            {/* 🔥 Input fields dark mode */}
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition-colors"
            />
          </div>

          <div className="w-full md:w-1/2 flex gap-4 items-center md:justify-end">
            <span className="text-gray-600 dark:text-gray-300 font-semibold hidden md:block">
              Age:
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minAge}
              onChange={(e) => setMinAge(e.target.value)}
              className="w-full md:w-24 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition-colors text-center"
            />
            <span className="text-gray-400 dark:text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxAge}
              onChange={(e) => setMaxAge(e.target.value)}
              className="w-full md:w-24 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-ngo-green outline-none transition-colors text-center"
            />
          </div>
        </div>

        {filteredPersons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPersons.map((person) => (
              <MissingPersonCard
                key={person.id}
                name={person.name}
                age={person.age}
                missingSince={person.missingSince}
                location={person.location}
                imageUrl={person.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="text-6xl mb-4">🤷‍♂️</div>
            <h3 className="text-2xl font-bold font-heading text-gray-800 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or age filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setMinAge("");
                setMaxAge("");
              }}
              className="mt-6 text-ngo-green font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MissingPeople;
