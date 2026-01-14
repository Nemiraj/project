import React from "react";
import { Link } from "react-router-dom";

const Destinations = () => {
  const city = {
    name: "Bengaluru",
    projects: "1500+ Projects",
    img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=1400&q=80",
    path: "/properties?city=Bangalore",
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Discover Your City
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            The heart of India’s fastest growing real estate market
          </p>
        </div>

        {/* City Card */}
        <Link
          to={city.path}
          className="group relative block max-w-5xl mx-auto overflow-hidden rounded-3xl shadow-2xl"
        >
          {/* Image */}
          <img
            src={city.img}
            alt={city.name}
            className="h-[480px] w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          {/* Glass Content */}
          <div className="absolute inset-0 flex items-end">
            <div className="m-8 md:m-12 max-w-lg rounded-2xl bg-white/15 backdrop-blur-xl p-8 border border-white/30">

              {/* Badge */}
              <span className="inline-block mb-3 rounded-full bg-[#0052A1] px-4 py-1 text-xs font-bold text-white tracking-wider">
                TOP DESTINATION
              </span>

              {/* Text */}
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">
                {city.name}
              </h3>
              <p className="mt-2 text-blue-200 font-semibold text-lg">
                {city.projects}
              </p>

              {/* CTA */}
              <div className="mt-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#F6E71D] px-6 py-3 text-sm font-bold text-black transition group-hover:scale-105">
                  Explore Properties →
                </span>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default Destinations;
