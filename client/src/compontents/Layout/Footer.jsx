import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Phone,
} from "lucide-react";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const cityLinks = [
    "Property in Bengaluru",
   
  ];

  const categories = [
    {
      title: "Flats for sale",
      items: [
        "Flats for sale in Bengaluru",
       
      ],
    },
    {
      title: "Villas for sale",
      items: [
        "Villas for sale in Bengaluru",
        
      ],
    },
    {
      title: "Plots for sale",
      items: [
        "Plots for sale in Bengaluru",
       
      ],
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Blog", path: "/blog" },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, url: "#" },
    { icon: <Twitter size={20} />, url: "#" },
    { icon: <Linkedin size={20} />, url: "#" },
    { icon: <Instagram size={20} />, url: "#" },
    { icon: <Youtube size={20} />, url: "#" },
  ];

  return (
    <footer className="bg-black text-white">
      {/* SOCIAL BAR */}
      <div className="border-b border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex space-x-6">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              className="text-gray-300 hover:text-white transition"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* TOP CITIES */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">
              Top Cities
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {cityLinks.map((city) => (
                <li key={city}>
                  <a href="#" className="hover:text-white">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {categories.map((cat, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-4 uppercase text-sm tracking-wider">
                {cat.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {cat.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-12 border-t border-gray-700">
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">New Projects</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>New Projects in Bengaluru</li>
             
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">
              Retirement Homes
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Retirement Homes in Chennai</li>
              
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Get In Touch</h4>
            <p className="text-sm text-gray-300 mb-4">
              Get in touch with us, we would be happy to help
            </p>
            <div className="flex items-center gap-2 font-bold">
              <Phone size={18} />
              <span>+91 9071188838</span>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-12 bg-gray-900 p-6 rounded-lg border border-gray-700">
          <p
            className={`text-xs text-gray-300 leading-relaxed ${
              !isExpanded ? "line-clamp-3" : ""
            }`}
          >
            <span className="font-bold block mb-2 text-white">
              Disclaimer:
            </span>
            This project related information has been provided directly by the
            builder or collected from public sources and has not been verified
            independently...
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-white text-xs font-bold mt-2 hover:underline"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © 2025 | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
