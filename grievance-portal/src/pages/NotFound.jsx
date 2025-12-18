import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0ff] to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <AlertCircle className="mx-auto h-24 w-24 text-[#2563eb] opacity-50" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1e40af] transition-colors shadow-md">
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;