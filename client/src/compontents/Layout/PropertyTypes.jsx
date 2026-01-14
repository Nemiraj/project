import React from "react";

const PROPERTY_TYPES = [
  {
    id: 1,
    name: "Apartments",
    projects: "5000+ Projects",
    img: "https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=",
    layout: "large",
  },
  {
    id: 2,
    name: "Villas",
    projects: "1000+ Projects",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    layout: "wide",
  },
  {
    id: 3,
    name: "Plots",
    projects: "1500+ Projects",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    layout: "small",
  },
  {
    id: 4,
    name: "Commercial",
    projects: "50+ Projects",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    layout: "small",
  },
];

const PropertyTypes = () => {
  return (
    <section className="py-16 bg-white" aria-labelledby="property-types-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <header className="text-center mb-12">
          <h2
            id="property-types-heading"
            className="text-3xl md:text-4xl font-bold text-[#0052A1] uppercase tracking-tight mb-2"
          >
            Explore by Property Type
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Power your search with our Roofandfloor real estate platform, for timely listings and a seamless experience.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[600px]">

          {/* Left – Apartments */}
          <PropertyCard
            data={PROPERTY_TYPES[0]}
            className="h-[400px] lg:h-full"
          />

          {/* Right */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <PropertyCard
              data={PROPERTY_TYPES[1]}
              className="col-span-2 h-[250px]"
            />
            <PropertyCard
              data={PROPERTY_TYPES[2]}
              className="h-[200px]"
            />
            <PropertyCard
              data={PROPERTY_TYPES[3]}
              className="h-[200px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

/* Card Component */
const PropertyCard = ({ data, className = "" }) => {
  return (
    <article
      tabIndex={0}
      role="button"
      aria-label={`Browse ${data.name}`}
      className={`relative group overflow-hidden rounded-xl cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 ${className}`}
    >
      <img
        src={data.img}
        alt={`${data.name} properties`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-white text-xl md:text-2xl font-bold">
          {data.name}
        </h3>
        <p className="text-blue-300 text-sm font-medium">
          {data.projects}
        </p>
      </div>
    </article>
  );
};

export default PropertyTypes;
