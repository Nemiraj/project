import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Plus } from "lucide-react";
import logo from "../assets/treksbe_logo.png"; // ✅ logo import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Buy", path: "/Buy" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/Blog" },
    { name: "Login", path: "/login" },
  
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO SECTION */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Treksbe Properties"
                className="h-12 w-auto object-contain"
              />
              <div className="leading-tight hidden sm:block">
                
                
              </div>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[#0052A1] hover:text-blue-500 font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* POST PROPERTY BUTTON */}
            <Link
              to="/post"
              className="flex items-center gap-2 bg-[#0052A1] text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-all"
            >
              <Plus size={18} strokeWidth={3} />
              <span className="font-semibold text-sm">Post Property</span>
              <span className="bg-[#F6E71D] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                FREE
              </span>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-[#0052A1]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white border-t transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 text-base font-medium text-[#0052A1] hover:bg-gray-50 rounded-md"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/post"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#0052A1] text-white p-3 rounded-lg font-bold"
          >
            Post Property
            <span className="bg-[#F6E71D] text-black text-xs px-2 py-0.5 rounded">
              FREE
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
