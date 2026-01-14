import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Bed, Bath, Square, MapPin, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import HomePlaceholder from '../assets/home-placeholder.png';

const BACKEND_URL = 'http://localhost:5000';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    type: '', status: '', city: '', minPrice: '', maxPrice: '', bedrooms: '', search: ''
  });

  useEffect(() => {
    document.body.style.overflow = showComingSoon ? "hidden" : "unset";
  }, [showComingSoon]);

  useEffect(() => {
    setFilters({
      type: searchParams.get('type') || '',
      status: searchParams.get('status') || '',
      city: searchParams.get('city') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      search: searchParams.get('search') || ''
    });
  }, [searchParams]);

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await api.getAllProperties(filters);
      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateURL = (updatedFilters) => {
    const params = {};
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    setSearchParams(params);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status' && (value === 'commercial-sale' || value === 'commercial-lease')) {
      setShowComingSoon(true);
      return;
    }
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    updateURL(updated);
  };

  /* ============================================================
     👇 FIXED IMAGE LOGIC HERE
  ============================================================ */
  
  // 1. Parse the JSON string from DB into an Array
  const formatImages = (images) => {
    if (!images) return [];
    if (Array.isArray(images)) return images; // Already an array
    if (typeof images === 'string') {
      try {
        return JSON.parse(images);
      } catch (e) {
        console.error("Image Parse Error:", e);
        return [];
      }
    }
    return [];
  };

  // 2. Generate the correct URL
  const getImageUrl = (imageName) => {
   if (!imageName) return HomePlaceholder;

    
    // Check if it's already a full URL (external link)
    if (imageName.startsWith('http')) return imageName;
    
    // Check if it's a raw Base64 string (starts with data:image...)
    if (imageName.startsWith('data:')) return imageName;

    // Otherwise, point to the static uploads folder
    // Matches: app.use("/uploads", express.static("uploads"));
    return `${BACKEND_URL}/uploads/${imageName}`;
  };

  const formatPrice = (price) => {
    if (!price) return '₹0';
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* FILTERS SECTION (Unchanged) */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <input type="text" name="search" placeholder="Search..." value={filters.search} onChange={handleFilterChange} className="px-4 py-3 border rounded-lg" />
            <select name="type" value={filters.type} onChange={handleFilterChange} className="px-4 py-3 border rounded-lg">
              <option value="">All Types</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange} className="px-4 py-3 border rounded-lg">
              <option value="">All Status</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
              <option value="commercial-sale">Commercial Sale</option>
              <option value="commercial-lease">Commercial Lease</option>
            </select>
            <input type="text" name="city" placeholder="City" value={filters.city} onChange={handleFilterChange} className="px-4 py-3 border rounded-lg" />
            <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange} className="px-4 py-3 border rounded-lg">
              <option value="">Bedrooms</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        {/* PROPERTIES GRID */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <h3 className="text-xl text-gray-600">No properties found matching your criteria.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => {
              // 1. Get Array of images
              const imagesList = formatImages(property.images);
              // 2. Get first image or null
              const firstImage = imagesList.length > 0 ? imagesList[0] : null;

              return (
                <Link
                  key={property.id}
                  to={`/properties/${property.id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="h-64 bg-gray-200 relative overflow-hidden">
                    {/* 👇 DISPLAY IMAGE HERE */}
                    <img
                      src={getImageUrl(firstImage)}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { e.target.src = HomePlaceholder; }}
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        property.status === 'sale' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {property.status === 'sale' ? 'For Sale' : 'For Rent'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">{property.title}</h3>

                    <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-4 h-4 text-blue-500" /> {property.city}
                    </p>

                    <p className="text-2xl font-bold text-blue-600 mb-4">
                      {formatPrice(property.price)}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" /> 
                        <span className="font-semibold">{property.bedrooms || 0}</span> Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" /> 
                        <span className="font-semibold">{property.bathrooms || 0}</span> Baths
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="w-4 h-4" /> 
                        <span className="font-semibold">{property.area_sqft || 0}</span> sqft
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* POPUP MODAL (Unchanged) */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-sm p-6 relative shadow-2xl flex flex-col items-center text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowComingSoon(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <AlertCircle size={40} className="text-[#0052A1]" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Coming Soon</h2>
              <p className="text-gray-600 mb-6">This feature is not updated yet. Please check back later!</p>
              <button onClick={() => setShowComingSoon(false)} className="bg-[#0052A1] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#004080] transition">
                Okay, Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertiesList;