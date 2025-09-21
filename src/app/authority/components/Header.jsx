"use client";
import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    // Placeholder for actual sign-out logic
    console.log("Sign Out clicked.");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-gray-800 shadow-md w-full sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="city-logo" className="text-3xl text-blue-600">
            🏙️
          </span>
          <span className="text-2xl font-bold tracking-tight">
            Authority Dashboard
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8 items-center font-medium">
          <a href="/authority" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">
            Home
          </a>
          <a href="/authority/complaints" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">
            Complaints
          </a>
          <a href="/authority/resolved" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">
            Resolved
          </a>
          <a href="/authority/emergency" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">
            Emergency
          </a>
          <a href="/authority/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">
            About
          </a>
          <a href="/authority/feedback" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2">
            Feedback
          </a>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300"
          >
            Sign Out
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-3xl text-gray-600 focus:outline-none" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white w-full shadow-lg">
          <nav className="flex flex-col items-center px-4 py-4 space-y-4">
            <a href="/authority" className="w-full text-center py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium" onClick={toggleMenu}>
              Home
            </a>
            <a href="/authority/complaints" className="w-full text-center py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium" onClick={toggleMenu}>
              Complaints
            </a>
            <a href="/authority/resolved" className="w-full text-center py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium" onClick={toggleMenu}>
              Resolved
            </a>
            <a href="/authority/emergency" className="w-full text-center py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium" onClick={toggleMenu}>
              Emergency
            </a>
            <a href="/authority/about" className="w-full text-center py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium" onClick={toggleMenu}>
              About
            </a>
            <a href="/authority/feedback" className="w-full text-center py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-lg font-medium" onClick={toggleMenu}>
              Feedback
            </a>
            <button
              onClick={() => { handleSignOut(); toggleMenu(); }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300"
            >
              Sign Out
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
