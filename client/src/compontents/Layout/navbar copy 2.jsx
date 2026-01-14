import React, { useState, useEffect } from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/treksbe_logo.png";

const Navbar = () => {
  const { user, login, signup, logout, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");

  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ username: "", email: "", password: "" });

  useEffect(() => {
    document.body.style.overflow = showLogin || showSignup || isOpen ? "hidden" : "unset";
  }, [showLogin, showSignup, isOpen]);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(loginForm.email, loginForm.password);
    if (!result.success) setError(result.error);
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const result = await signup(signupForm.username, signupForm.email, signupForm.password);
    if (!result.success) setError(result.error);
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm sticky top-0 z-[100] h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Treksbe" className="h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = status === link.status;
              const to = link.status ? `/properties?status=${link.status}` : link.path;
              return (
                <NavLink
                  key={link.name}
                  to={to}
                  className={`pb-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="font-semibold">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-semibold"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-[#0052A1]"
                  aria-label="Login"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="border px-4 py-2 rounded-full"
                  aria-label="Sign Up"
                >
                  Sign Up
                </button>
              </>
            )}
            <Link
              to="/post-property"
              className="bg-[#0052A1] text-white px-5 py-2 rounded-full flex items-center gap-1"
            >
              Post Property
              <span className="bg-yellow-400 text-black px-2 rounded-full text-xs">FREE</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t shadow-sm overflow-hidden"
            >
              <div className="flex flex-col px-4 py-4 space-y-2">
                {navLinks.map((link) => {
                  const to = link.status ? `/properties?status=${link.status}` : link.path;
                  return (
                    <NavLink
                      key={link.name}
                      to={to}
                      onClick={() => setIsOpen(false)}
                      className={`py-2 text-sm font-medium transition-colors ${
                        status === link.status
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {link.name}
                    </NavLink>
                  );
                })}
                <div className="mt-2 border-t pt-2 flex flex-col gap-2">
                  {isAuthenticated ? (
                    <>
                      <span className="font-semibold">{user?.username}</span>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 font-semibold text-left"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setIsOpen(false);
                        }}
                        className="text-[#0052A1] text-left"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setShowSignup(true);
                          setIsOpen(false);
                        }}
                        className="border px-4 py-2 rounded-full text-left"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                  <Link
                    to="/post-property"
                    className="bg-[#0052A1] text-white px-5 py-2 rounded-full inline-block text-center"
                  >
                    Post Property <span className="ml-1 bg-yellow-400 text-black px-2 rounded-full text-xs">FREE</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
