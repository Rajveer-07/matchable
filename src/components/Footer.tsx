
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">© 2024 Matchabel. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
              Terms and Conditions
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
