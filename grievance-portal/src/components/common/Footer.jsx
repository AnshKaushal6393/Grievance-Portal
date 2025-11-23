import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FileText, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-gray-300 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-xl flex items-center justify-center shadow-xl">
                <FileText className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-wide">Grievance Portal</h3>
                <p className="text-xs text-gray-400">E-Governance System</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering citizens to voice their concerns and making governance more transparent.
            </p>
            <p className="text-xs text-gray-500 border-t border-gray-700 pt-4">
              © 2024 Grievance Portal. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 border-b border-gray-700 pb-3">Quick Links</h4>
            <ul className="space-y-3.5">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-[#2563eb] hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  {t('nav.home') || 'Home'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-[#2563eb] hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  {t('nav.about') || 'About'}
                </Link>
              </li>
              <li>
                <Link 
                  to="/track-complaint" 
                  className="text-gray-400 hover:text-[#2563eb] hover:translate-x-1 transition-all duration-200 flex items-center group"
                >
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  {t('nav.track') || 'Track Complaint'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 border-b border-gray-700 pb-3">Categories</h4>
            <ul className="space-y-3.5">
              <li>
                <button className="text-gray-400 hover:text-[#2563eb] hover:translate-x-1 transition-all duration-200 text-left flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  {t('categories.roads') || 'Roads & Transportation'}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-[#2563eb] hover:translate-x-1 transition-all duration-200 text-left flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  {t('categories.water') || 'Water Supply'}
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-[#2563eb] hover:translate-x-1 transition-all duration-200 text-left flex items-center group">
                  <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mr-2 group-hover:w-2 transition-all"></span>
                  {t('categories.electricity') || 'Electricity'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 border-b border-gray-700 pb-3">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="h-9 w-9 bg-[#1e40af]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb]/30 transition-colors">
                  <MapPin size={18} className="text-[#2563eb]" strokeWidth={2} />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed pt-1">123 Government Plaza, City Center</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-9 w-9 bg-[#1e40af]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb]/30 transition-colors">
                  <Phone size={18} className="text-[#2563eb]" strokeWidth={2} />
                </div>
                <span className="text-gray-400 text-sm">+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-9 w-9 bg-[#1e40af]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#2563eb]/30 transition-colors">
                  <Mail size={18} className="text-[#2563eb]" strokeWidth={2} />
                </div>
                <span className="text-gray-400 text-sm break-all">support@grievanceportal.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/privacy-policy" className="hover:text-[#2563eb] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-gray-600">•</span>
              <Link to="/terms" className="hover:text-[#2563eb] transition-colors">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="h-9 w-9 bg-gray-800 hover:bg-[#2563eb] rounded-lg flex items-center justify-center transition-colors">
                <svg className="h-4 w-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="h-9 w-9 bg-gray-800 hover:bg-[#2563eb] rounded-lg flex items-center justify-center transition-colors">
                <svg className="h-4 w-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="h-9 w-9 bg-gray-800 hover:bg-[#2563eb] rounded-lg flex items-center justify-center transition-colors">
                <svg className="h-4 w-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;