import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api'; // Ensure this path is correct
import { Bed, Bath, Square, MapPin, Phone, Mail, Car, Calendar, ArrowLeft } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // To switch main image
  
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    loadProperty();
    window.scrollTo(0, 0); // Scroll to top on load
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const data = await api.getPropertyById(id);
      setProperty(data);
    } catch (error) {
      console.error('Error loading property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createEnquiry({
        property_id: parseInt(id),
        ...enquiryForm
      });
      setSubmitStatus('success');
      setEnquiryForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  /* ================= HELPERS ================= */

  const formatPrice = (price) => {
    if (!price) return '₹0';
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const formatList = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return 'https://via.placeholder.com/1200x600?text=No+Image';
    if (imageName.startsWith('http') || imageName.startsWith('data:')) return imageName;
    return `${BACKEND_URL}/uploads/${imageName}`;
  };

  /* ================= LOADING & ERROR STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0052A1] border-t-transparent"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Property not found</h2>
        <Link to="/properties" className="text-[#0052A1] hover:underline">
          Return to Properties
        </Link>
      </div>
    );
  }

  // Parse data
  const images = formatList(property.images);
  const features = formatList(property.features);
  
  // Determine which image to show as main (default to first one)
  const mainImage = selectedImage || (images.length > 0 ? images[0] : null);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/properties" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0052A1] mb-6 font-medium transition-colors">
          <ArrowLeft size={20} /> Back to Properties
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* ================= IMAGE GALLERY SECTION ================= */}
          <div className="relative">
            <div className="h-[400px] md:h-[600px] bg-gray-200">
              <img
                src={getImageUrl(mainImage)}
                alt={property.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x600?text=Image+Error'; }}
              />
            </div>

            {/* Badges */}
            <div className="absolute top-6 left-6 flex gap-2">
              <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white shadow-lg ${
                property.status === 'sale' ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {property.status === 'sale' ? 'For Sale' : 'For Rent'}
              </span>
              <span className="px-4 py-2 rounded-lg text-sm font-bold bg-white text-gray-800 shadow-lg capitalize">
                {property.type}
              </span>
            </div>

            {/* Thumbnail Grid (Only if more than 1 image) */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img ? 'border-[#0052A1] scale-105' : 'border-white opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={getImageUrl(img)} 
                      alt={`View ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            
            {/* ================= MAIN INFO ================= */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600 text-lg">
                  <MapPin className="w-5 h-5 mr-2 text-[#0052A1]" />
                  {property.address}, {property.city}
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <p className="text-sm font-semibold text-gray-500 uppercase mb-1">Price</p>
                <div className="text-4xl font-bold text-[#0052A1]">
                  {formatPrice(property.price)}
                  {property.status === 'rent' && <span className="text-xl text-gray-600 font-normal"> / month</span>}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                  <Bed className="w-6 h-6 mx-auto mb-2 text-[#0052A1]" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms || 0}</div>
                  <div className="text-xs text-gray-500 uppercase">Bedrooms</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                  <Bath className="w-6 h-6 mx-auto mb-2 text-[#0052A1]" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms || 0}</div>
                  <div className="text-xs text-gray-500 uppercase">Bathrooms</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                  <Square className="w-6 h-6 mx-auto mb-2 text-[#0052A1]" />
                  <div className="text-2xl font-bold text-gray-900">{property.area_sqft || 0}</div>
                  <div className="text-xs text-gray-500 uppercase">Sq Ft</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
                  <Car className="w-6 h-6 mx-auto mb-2 text-[#0052A1]" />
                  <div className="text-2xl font-bold text-gray-900">{property.parking_spaces || 0}</div>
                  <div className="text-xs text-gray-500 uppercase">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-[#0052A1] pl-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-l-4 border-[#0052A1] pl-3">Features & Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================= SIDEBAR (CONTACT) ================= */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border-2 border-gray-100 shadow-lg sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Agent</h3>

                {/* Agent Info Card */}
                {property.agent_name && (
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="font-bold text-lg text-gray-900 mb-2">{property.agent_name}</div>
                    
                    {property.agent_phone && (
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${property.agent_phone}`} className="hover:text-[#0052A1]">{property.agent_phone}</a>
                      </div>
                    )}
                    
                    {property.agent_email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${property.agent_email}`} className="hover:text-[#0052A1] truncate">{property.agent_email}</a>
                      </div>
                    )}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052A1] focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052A1] focus:border-transparent outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052A1] focus:border-transparent outline-none"
                  />
                  <textarea
                    placeholder="I am interested in this property..."
                    rows="4"
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0052A1] focus:border-transparent outline-none resize-none"
                  />
                  
                  <button
                    type="submit"
                    className="w-full bg-[#0052A1] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    Send Enquiry
                  </button>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-green-100 text-green-700 text-sm rounded-lg text-center">
                      Message sent successfully!
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-100 text-red-700 text-sm rounded-lg text-center">
                      Failed to send message.
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;