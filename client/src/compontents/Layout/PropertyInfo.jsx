import React, { useState } from 'react';

const InfoCard = ({ title, img, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      {/* Image & Title Section */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <img 
            src={img} 
            alt={title} 
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-[#0052A1] leading-tight min-h-[3rem]">
          {title}
        </h3>
      </div>

      {/* Description Section */}
      <div className="flex-grow">
        <p className={`text-sm text-gray-600 leading-relaxed text-center transition-all duration-300 ${!isExpanded ? 'line-clamp-6' : ''}`}>
          {content}
        </p>
        <div className="text-center mt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#0052A1] font-bold text-sm hover:underline focus:outline-none"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertyInfo = () => {
  const data = [
    {
      title: "Real estate in India",
      img: "https://cdn-icons-png.flaticon.com/512/1691/1691350.png", // Replace with images/real-estate-in-india.png
      content: `Real estate in India is experiencing exponential growth, driven by rapid urbanization, massive infrastructure development, the booming IT and service sectors, and a growing appetite for homeownership among the middle class. This dynamic transformation is reshaping both metropolitan cities and emerging Tier 2 and Tier 3 towns... [Rest of the long text from your HTML] ... The real estate sector contributes to about 7-8 % of the GDP in India and will soon be a trillion-dollar industry by 2030.`
    },
    {
      title: "The Destination of Real Estate in India",
      img: "https://cdn-icons-png.flaticon.com/512/1365/1365942.png", // Replace with images/the-destination-of-real-estate-in-india.png
      content: `India’s cities are evolving faster than ever, becoming vibrant hubs of opportunity, innovation, and modern living. With rapid urbanization, improved infrastructure, and a growing economy, urban real estate in India has emerged as a powerful engine of growth... [Rest of the long text] ... India, as ever, continues to hold the attention of foreign investors for real estate investments.`
    },
    {
      title: "Guide to buying property in India",
      img: "https://cdn-icons-png.flaticon.com/512/402/402127.png", // Replace with images/guide-to-buying-property-in-india.png
      content: `Buying a property in India proves to be one of the major milestones in one's life, and the right planning is necessary for making the right choice. There are several options one would have given, and factors that need to be taken into consideration are many before any decision is made... [Rest of the long text] ... Happy home hunting!`
    }
  ];

  return (
    <section id="buy-sell-blog" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <span className="text-[#0052A1]">Buy, Sell and Rent</span> Property in India
          </h2>
          <p className="text-gray-500 max-w-5xl mx-auto leading-relaxed">
            Roofandfloor is among the finest real estate portals operating in India, connecting buyers and sellers easily. 
            Whether you're looking to buy, rent, or sell commercial or residential properties, we have developed a 
            platform for you that will make matters convenient.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {data.map((item, index) => (
            <InfoCard 
              key={index}
              title={item.title}
              img={item.img}
              content={item.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyInfo;