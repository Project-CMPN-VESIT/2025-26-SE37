import React from "react";

const EventCard = ({ title, date, description, imageUrl }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Event Image */}
      <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
        <img
          src={
            imageUrl || "https://via.placeholder.com/400x300?text=Event+Image"
          }
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Content */}
      <div className="p-6 md:w-2/3 flex flex-col justify-center">
        <div className="text-sm text-ngo-green font-bold mb-1 tracking-wider uppercase">
          {date}
        </div>
        <h3 className="text-2xl font-bold font-heading text-ngo-dark mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div>
          <button className="text-ngo-green font-semibold border-b-2 border-ngo-green hover:text-ngo-dark hover:border-ngo-dark transition-colors pb-1">
            Read More &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
