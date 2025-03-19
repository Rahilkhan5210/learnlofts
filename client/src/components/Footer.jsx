import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0da2e5] text-white" style={{ background: 'linear-gradient(to right, #0da2e5 0%, #0da2e5 100%)' }}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="space-y-4 md:space-y-6">
            <Link to="/" className="inline-block">
              <img src="/logo.png" alt="Logo" className="h-12 md:h-14 w-auto filter brightness-0 invert" />
            </Link>
            <p className="text-gray-100 text-sm md:text-base leading-relaxed">
              Empowering minds through innovative education. Join us on a journey of learning and growth.
            </p>
            
            {/* Contact Info */}
            <div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-100 hover:text-white transition-colors duration-300 group">
                  <svg className="w-5 h-5 mr-3 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm md:text-base">123 Education Street, City, Country</span>
                </li>
                <li className="flex items-center text-gray-100 hover:text-white transition-colors duration-300 group">
                  <svg className="w-5 h-5 mr-3 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm md:text-base">info@learnlofts.com</span>
                </li>
                <li className="flex items-center text-gray-100 hover:text-white transition-colors duration-300 group">
                  <svg className="w-5 h-5 mr-3 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm md:text-base">+1 234 567 890</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white"></span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/certifications" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Certifications
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Our Blogs
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white relative inline-block">
              Important Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white"></span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/refund-policy" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white relative inline-block">
              Certifications
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white"></span>
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link to="/certifications/project-management" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Project Management
                </Link>
              </li>
              <li>
                <Link to="/certifications/information-security" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Information Security
                </Link>
              </li>
              <li>
                <Link to="/certifications/quality-management" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Quality Management
                </Link>
              </li>
              <li>
                <Link to="/certifications/networking" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Networking
                </Link>
              </li>
              <li>
                <Link to="/certifications/other" className="text-gray-100 hover:text-white transition-colors duration-300 text-sm md:text-base flex items-center group">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 group-hover:bg-gray-100 transition-colors duration-300"></span>
                  Other Certifications
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 md:mt-16 pt-8 text-center">
          <p className="text-gray-100 text-sm md:text-base">&copy; 2024 LearnLofts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 