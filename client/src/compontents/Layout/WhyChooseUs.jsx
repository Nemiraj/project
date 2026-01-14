import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Buy A Home",
      description: "Explore exclusive property listings and turn your dream home into a reality.",
      icon: "https://cdn-icons-png.flaticon.com/512/619/619153.png", // Replace with your local images/Buy-A-Home.png
      alt: "Buy A Home"
    },
    {
      title: "Sell A Home",
      description: "List your property on the trusted platform and experience a transparent selling process.",
      icon: "https://cdn-icons-png.flaticon.com/512/1231/1231189.png", // Replace with your local images/Sell-A-Home.png
      alt: "Sell A Home"
    },
    {
      title: "Rent a Home",
      description: "Choose rental properties from verified owners and find your ideal home.",
      icon: "https://cdn-icons-png.flaticon.com/512/602/602175.png", // Replace with your local images/Rent-A-Home.png
      alt: "Rent a Home"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Why <span className="text-[#0052A1]">Treksbe properties</span>
          </h2>
          <p className="text-lg text-gray-500">
            We provide full service at every step.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center border border-gray-100"
            >
              {/* Icon Container */}
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-blue-50 rounded-full p-4">
                <img 
                  src={feature.icon} 
                  alt={feature.alt} 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-[#0052A1] mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;