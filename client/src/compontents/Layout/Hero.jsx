import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Search, AlertCircle, X, ChevronDown, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=2000",
];

const HeroSearch = () => {
  const [keywords, setKeywords] = useState("");
  const [activeTab, setActiveTab] = useState("Sale");
  const [propertyType, setPropertyType] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showComingSoon ? "hidden" : "unset";
  }, [showComingSoon]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("status", activeTab.toLowerCase());
    if (keywords) params.append("search", keywords);
    if (propertyType) params.append("type", propertyType);
    navigate(`/properties?${params.toString()}`);
  };

  const handleTabClick = (tab) => {
    if (tab === "New Projects" || tab === "Commercial") {
      setShowComingSoon(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <section
      className="
        relative
        min-h-[520px] sm:min-h-[600px] md:min-h-[700px]
        flex items-center justify-center
        text-white px-4 py-16 sm:py-24
        overflow-hidden
      "
    >
      {/* Background Slider */}
      <AnimatePresence>
        <motion.div
          key={currentImage}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-blue-900/50 to-black/80" />

      <div className="relative z-10 w-full max-w-5xl text-center">
        {/* Heading */}
        <h1
          className="
            text-3xl sm:text-4xl md:text-6xl lg:text-7xl
            font-extrabold leading-tight
          "
        >
          Find Your Dream
          <span className="block mt-2 sm:mt-3 text-[#F6E71D]">
            <Typewriter
              options={{
                strings: ["Plot", "Home", "Villa", "Apartment"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          We are offering the best real estate properties tailored for every need.
        </p>

        {/* Tabs */}
        <div className="flex justify-center mt-6 sm:mt-10 px-2">
          <div className="flex flex-wrap justify-center bg-white/95 rounded-2xl sm:rounded-full p-1 shadow-xl">
            {["Rent", "Sale", "New Projects", "Commercial"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition
                  ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 sm:mt-8 max-w-4xl mx-auto">
          <div
            className="
              flex flex-col sm:flex-row
              bg-white shadow-2xl
              rounded-2xl sm:rounded-full
              overflow-hidden
            "
          >
            {/* Property Type */}
            <div className="relative flex items-center px-5 h-14 md:h-16 border-b sm:border-b-0 sm:border-r">
              <Home size={20} className="text-gray-400 mr-2" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent text-gray-700 font-semibold outline-none appearance-none pr-6 w-full"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">House</option>
                <option value="plot">Plot</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 text-gray-400" />
            </div>

            {/* Input */}
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Search city, area, project..."
              className="w-full sm:flex-1 h-14 md:h-16 px-6 text-gray-800 outline-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="
                w-full sm:w-auto
                h-14 md:h-16
                px-10
                bg-[#F6E71D] hover:bg-yellow-500
                text-black font-bold
                flex items-center justify-center
                rounded-b-2xl sm:rounded-r-full sm:rounded-b-none
              "
            >
              <Search size={22} strokeWidth={3} />
            </button>
          </div>
        </form>
      </div>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400"
                onClick={() => setShowComingSoon(false)}
              >
                <X />
              </button>
              <AlertCircle className="mx-auto text-blue-600 mb-4" size={40} />
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                This feature is not updated yet.
              </p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Okay, Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSearch;
