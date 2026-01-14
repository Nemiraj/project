// Responsive Navbar – cleaned & mobile-optimized
// Changes:
// 1. Better breakpoints
// 2. Prevent overflow issues
// 3. Improved mobile spacing
// 4. Safer pathname check

import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";

import { Link, NavLink, useSearchParams, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Plus,
  Eye,
  EyeOff,
  User,
  LogOut,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/treksbe_logo.png";

const Navbar = () => {
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const activeStatus = searchParams.get("status");

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    document.body.style.overflow =
      showLogin || showSignup || isOpen || showComingSoon ? "hidden" : "unset";
  }, [showLogin, showSignup, isOpen, showComingSoon]);

  useEffect(() => {
    if (isAuthenticated) {
      setShowLogin(false);
      setShowSignup(false);
      setError("");
    }
  }, [isAuthenticated]);

  const navLinks = [
    { name: "New Launch", path: "/new-launches" },
    { name: "Buy", status: "sale" },
    { name: "Rent", status: "rent" },
    { name: "Commercial Sale", status: "commercial-sale" },
    { name: "Commercial Lease", status: "commercial-lease" },
  ];

  const handleLinkClick = (e, link) => {
    if (link.status?.includes("commercial")) {
      e.preventDefault();
      setIsOpen(false);
      setShowComingSoon(true);
    } else {
      setIsOpen(false);
    }
  };

  const getLink = (link) =>
    link.status ? `/properties?status=${link.status}` : link.path;

  const isActive = (link) =>
    link.status
      ? activeStatus === link.status
      : location.pathname === link.path;

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b h-16 sm:h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Treksbe" className="h-8 sm:h-10 md:h-12" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={getLink(link)}
                onClick={(e) => handleLinkClick(e, link)}
                className={({ isActive: navActive }) =>
                  `text-sm font-semibold pb-1 border-b-2 transition ${
                    isActive(link)
                      ? "text-blue-600 border-blue-600"
                      : "border-transparent text-gray-700 hover:text-blue-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <button onClick={() => setShowLogin(true)} className="font-semibold text-blue-600">
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="px-4 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{user?.username}</span>
                <button onClick={logout} className="text-red-600">
                  <LogOut size={18} />
                </button>
              </div>
            )}

            <Link
              to="/post-property"
              className="hidden lg:flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full"
            >
              <Plus size={16} /> Post Property
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={getLink(link)}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/post-property"
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white py-3 text-center rounded-lg font-bold"
              >
                Post Property (FREE)
              </Link>

              {!isAuthenticated ? (
                <>
                  <button onClick={() => setShowLogin(true)} className="font-bold text-blue-600">
                    Login
                  </button>
                  <button onClick={() => setShowSignup(true)} className="font-bold text-blue-600">
                    Sign Up
                  </button>
                </>
              ) : (
                <button onClick={logout} className="font-bold text-red-600">
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
            <div className="bg-white p-6 rounded-xl text-center max-w-sm">
              <AlertCircle size={40} className="mx-auto text-blue-600 mb-3" />
              <h2 className="text-xl font-bold">Coming Soon</h2>
              <p className="text-gray-600 mt-2">This feature will be available soon.</p>
              <button
                onClick={() => setShowComingSoon(false)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                OK
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
