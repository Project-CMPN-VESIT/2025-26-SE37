import React from "react";

const Volunteer = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] pt-24 pb-12 font-sans px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold text-ngo-dark dark:text-white mb-2">
            Join Our Mission
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Register to volunteer at Maa Astha Shelter
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ngo-green transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-ngo-green transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              How can you help?
            </label>
            <textarea
              rows="3"
              placeholder="E.g., I can help teach kids, distribute food, etc."
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-ngo-green transition-colors resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-ngo-green text-white font-bold py-3 px-4 rounded-lg hover:bg-ngo-dark transition duration-300 shadow-md mt-4"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default Volunteer;
