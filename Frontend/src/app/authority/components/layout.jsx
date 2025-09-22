"use client";
import React, { useState } from "react";

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 text-3xl">🏙️</span>
          <span className="text-xl font-bold">Authority Dashboard</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="/authority" className="text-white hover:text-blue-400 transition-colors duration-200">
            Home
          </a>
          <a href="/authority/complaints" className="text-white hover:text-blue-400 transition-colors duration-200">
            Complaints
          </a>
          <a href="/authority/resolved" className="text-white hover:text-blue-400 transition-colors duration-200">
            Resolved
          </a>
          <a href="/authority/emergency" className="text-white hover:text-blue-400 transition-colors duration-200">
            Emergency
          </a>
          <a href="/authority/about" className="text-white hover:text-blue-400 transition-colors duration-200">
            About
          </a>
          <a href="/authority/feedback" className="text-white hover:text-blue-400 transition-colors duration-200">
            Feedback
          </a>
        </nav>
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-2">
          <a href="/authority" className="block text-white hover:text-blue-400 p-2">Home</a>
          <a href="/authority/complaints" className="block text-white hover:text-blue-400 p-2">Complaints</a>
          <a href="/authority/resolved" className="block text-white hover:text-blue-400 p-2">Resolved</a>
          <a href="/authority/emergency" className="block text-white hover:text-blue-400 p-2">Emergency</a>
          <a href="/authority/about" className="block text-white hover:text-blue-400 p-2">About</a>
          <a href="/authority/feedback" className="block text-white hover:text-blue-400 p-2">Feedback</a>
        </div>
      )}
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-auto">
      <div className="container mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} CivicConnect Authority. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors duration-200">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};


const AuthorityLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-6 py-12 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthorityLayout;
