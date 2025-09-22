import React from "react";

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

export default Footer;
