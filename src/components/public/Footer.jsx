import React from 'react';
import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-lg font-bold text-white">CRM</span>
              <span className="text-gray-400 text-sm">Lead Management</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Streamline your lead management process with our powerful CRM solution.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Quick Links</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors text-xs">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-xs">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Contact Us</h3>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center space-x-2 text-gray-400">
                <EnvelopeIcon className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-xs">info@crm.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <PhoneIcon className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-xs">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPinIcon className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-xs">123 Business Ave, Suite 100</span>
              </li>
            </ul>
          </div>

          {/* About / Built By */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 mb-3">About</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-2">
              A complete CRM solution built for modern businesses.
            </p>
            <div className="text-xs text-gray-500">
              Built for{' '}
              <a 
                href="https://digitalheroesco.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors hover:underline"
              >
                Digital Heroes
              </a>
              {' '}by{' '}
              <span className="text-blue-400">Pawan</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className="border-t border-gray-800 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            © {currentYear} CRM Lead Management. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0 text-xs text-gray-500">
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;