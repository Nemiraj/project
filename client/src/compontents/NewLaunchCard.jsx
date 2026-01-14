import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Replace with your backend URL if needed
const BACKEND_URL = "http://localhost:5000";

// Helper functions
const formatImages = (images) => {
  if (!images) return [];
  if (typeof images === "string") {
    try {
      return JSON.parse(images);
    } catch {
      return [];
    }
  }
  return images;
};

const getImageUrl = (image) => {
  if (!image) return "https://via.placeholder.com/800x600?text=No+Image";
  if (image.startsWith("http")) return image;
  return `${BACKEND_URL}/${image}`;
};

const formatPrice = (price) => {
  if (!price) return "Price on Request";
  if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
  if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} L`;
  return `₹ ${price.toLocaleString()}`;
};

export const NewLaunchCard = ({ launch, onClick }) => {
  const images = formatImages(launch.images);
  const imageUrl = getImageUrl(images[0]);

  // WhatsApp number (replace with actual or from API)
  const whatsappNumber = launch.whatsappNumber || "919999999999"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleClick = () => {
    if (onClick) onClick(launch);
    else window.open(launch.url, "_blank");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative" onClick={handleClick}>
        <img
          src={imageUrl}
          alt={launch.title}
          className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
          New
        </span>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col justify-between h-56">
        <div>
          <h3 className="font-bold text-lg text-gray-800 truncate">{launch.title}</h3>

          <p className="flex items-center gap-1 text-sm text-gray-500 mt-2">
            <MapPin size={14} />
            {launch.location}, {launch.city}
          </p>

          <p className="text-blue-600 font-bold text-xl mt-3">{formatPrice(launch.price)}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          {launch.configuration && (
            <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {launch.configuration}
            </span>
          )}
          {launch.builder && <span className="text-sm text-gray-500">{launch.builder}</span>}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleClick}
            className="flex-1 bg-[#0052A1] text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            View Details
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.52 3.48a11.97 11.97 0 00-17 17l-1.84 5.04 5.1-1.84a11.96 11.96 0 0013.74-20.2zM12 21c-1.23 0-2.44-.32-3.5-.93L5 21l1.93-3.57A9.96 9.96 0 0112 22c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12c0 1.67.41 3.24 1.14 4.62L2 22l5.38-1.13C8.76 21.59 10.33 22 12 22z"></path>
              <path d="M17.5 14.5c-.28-.14-1.66-.82-1.92-.92-.26-.1-.45-.14-.64.14s-.73.92-.9 1.11c-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.19-.28.28-.46.09-.17.05-.32-.02-.46-.07-.14-.64-1.54-.88-2.12-.23-.55-.47-.47-.64-.48-.17-.01-.36-.01-.55-.01s-.46.07-.7.32c-.24.24-.92.9-.92 2.2s.94 2.55 1.07 2.73c.13.18 1.86 2.84 4.5 3.85.63.27 1.12.43 1.5.55.63.19 1.21.16 1.66.1.51-.06 1.66-.68 1.9-1.33.23-.65.23-1.21.16-1.33-.07-.12-.26-.19-.54-.33z"></path>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default NewLaunchCard;
