import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = ({ isDark, toggleTheme }) => {
  const location = useLocation();

  const getNavLinkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
        : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
    }`;

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              CyberShield
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className={getNavLinkClass("/")}>
              Home
            </Link>
            <Link to="/dashboard" className={getNavLinkClass("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/about" className={getNavLinkClass("/about")}>
              About
            </Link>

            {/* Theme Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
