import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BellIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import SignIn from "../pages/login/SignIn";
import SignUp from "../pages/signup/SignUp";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState({ name: "John Doe" }); // Sample user data
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowSignIn(false);
  };

  const handleSignUpSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Disclosure as="nav" className="relative z-10">
        {({ open }) => (
          <>
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center rounded-lg border border-gray-700 shadow-lg bg-gray-900/80 backdrop-blur-sm px-4 py-3">
                <div className="flex items-center gap-4">
                  <Link to="/" className="text-white font-bold text-xl">
                    HectoClash
                  </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-12 items-center">
                  <Link
                    to="/"
                    className="text-white hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/compete"
                    className="text-white hover:text-primary transition-colors"
                  >
                    Compete
                  </Link>
                  <Link
                    to="/leaderboard"
                    className="text-white hover:text-primary transition-colors"
                  >
                    Leaderboard
                  </Link>
                  <Link
                    to="/spectate"
                    className="text-white hover:text-primary transition-colors"
                  >
                    Spectator Mode
                  </Link>
                  <Link
                    to="/profile"
                    className="text-white hover:text-primary transition-colors"
                  >
                    Profile
                  </Link>
                </div>

                <div className="flex items-center gap-4">
                  {isLoggedIn ? (
                    <div className="flex items-center gap-4">
                      <button
                        className="text-white hover:text-primary transition-colors"
                        onClick={() => navigate("/notifications")}
                      >
                        <BellIcon className="h-6 w-6" />
                      </button>

                      <Link to="/profile">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 cursor-pointer shadow-md"
                          whileHover={{
                            scale: 1.2,
                            rotate: 10,
                            boxShadow: "0px 0px 15px rgba(59, 130, 246, 0.5)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 10,
                          }}
                        >
                          <motion.span
                            className="text-xl font-bold text-primary"
                            whileHover={{
                              textShadow:
                                "0px 0px 10px rgba(59, 130, 246, 0.8)",
                            }}
                          >
                            {user?.name?.charAt(0).toUpperCase() || "H"}
                          </motion.span>
                        </motion.div>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        className="hidden md:block text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                        onClick={() => setShowSignIn(true)}
                      >
                        Sign in
                      </button>
                    </div>
                  )}

                  {/* Mobile menu button */}
                  <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-primary transition-colors">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <Disclosure.Panel className="md:hidden">
              <div className="px-4 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-b-lg shadow-lg mx-4">
                <Link
                  to="/"
                  className="block text-white hover:text-primary py-2 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/compete"
                  className="block text-white hover:text-primary py-2 transition-colors"
                >
                  Compete
                </Link>
                <Link
                  to="/leaderboard"
                  className="block text-white hover:text-primary py-2 transition-colors"
                >
                  Leaderboard
                </Link>
                <Link
                  to="/spectate"
                  className="block text-white hover:text-primary py-2 transition-colors"
                >
                  Spectator Mode
                </Link>
                <Link
                  to="/profile"
                  className="block text-white hover:text-primary py-2 transition-colors"
                >
                  Profile
                </Link>
                {isLoggedIn ? (
                  <div className="flex items-center gap-4 py-2">
                    <button
                      className="text-white hover:text-primary transition-colors"
                      onClick={() => navigate("/notifications")}
                    >
                      <BellIcon className="h-6 w-6" />
                    </button>
                    <button
                      className="w-full text-white bg-red-600/20 px-4 py-2 rounded-lg hover:bg-red-600/30 transition-colors shadow-md border border-red-600/30"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      className="w-full text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
                      onClick={() => setShowSignIn(true)}
                    >
                      Sign in
                    </button>
                    <button
                      className="w-full text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                      onClick={() => setShowSignUp(true)}
                    >
                      Sign up
                    </button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {showSignIn && (
        <SignIn
          onClose={() => setShowSignIn(false)}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUp
          onClose={() => setShowSignUp(false)}
          onSignUpSuccess={handleSignUpSuccess}
          onSwitchToSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
        />
      )}
    </>
  );
};

export default Nav;
