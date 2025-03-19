import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 lg:space-x-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `relative text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 text-[14px] lg:text-[18px] font-medium transition-colors duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    <span className={`absolute left-0 bottom-[-9px] w-full h-[2px] bg-blue-600 transition-transform duration-300 
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}`}>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `relative text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 text-[14px] lg:text-[18px] font-medium transition-colors duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    About Us
                    <span className={`absolute left-0 bottom-[-9px] w-full h-[2px] bg-blue-600 transition-transform duration-300 
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}`}>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/certifications" 
                className={({ isActive }) => 
                  `relative text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 text-[14px] lg:text-[18px] font-medium transition-colors duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    Certifications
                    <span className={`absolute left-0 bottom-[-9px] w-full h-[2px] bg-blue-600 transition-transform duration-300 
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}`}>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/blogs" 
                className={({ isActive }) => 
                  `relative text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 text-[14px] lg:text-[18px] font-medium transition-colors duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    Our Blogs
                    <span className={`absolute left-0 bottom-[-9px] w-full h-[2px] bg-blue-600 transition-transform duration-300 
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}`}>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/faqs" 
                className={({ isActive }) => 
                  `relative text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 text-[14px] lg:text-[18px] font-medium transition-colors duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    FAQs
                    <span className={`absolute left-0 bottom-[-9px] w-full h-[2px] bg-blue-600 transition-transform duration-300 
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}`}>
                    </span>
                  </>
                )}
              </NavLink>

              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `relative text-gray-700 hover:text-blue-600 px-2 lg:px-3 py-2 text-[14px] lg:text-[18px] font-medium transition-colors duration-300`
                }
              >
                {({ isActive }) => (
                  <>
                    Contact Us
                    <span className={`absolute left-0 bottom-[-9px] w-full h-[2px] bg-blue-600 transition-transform duration-300 
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}`}>
                    </span>
                  </>
                )}
              </NavLink>
            </div>

            {/* Auth Button */}
            <div className="ml-4 lg:ml-8">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <span className="text-[14px] lg:text-[18px] text-gray-700">Welcome, {user?.name || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-md text-[14px] lg:text-[18px] font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-3 lg:px-4 py-1.5 lg:py-2 rounded-md text-[14px] lg:text-[18px] font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/certifications" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Certifications
            </NavLink>
            <NavLink 
              to="/blogs" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Our Blogs
            </NavLink>
            <NavLink 
              to="/faqs" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors duration-200
                ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </NavLink>

            {/* Mobile Auth Buttons */}
            <div className="mt-4 px-3">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <span className="block text-[14px] text-gray-700">Welcome, {user?.name || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-[14px] font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block w-full bg-blue-600 text-white px-4 py-2 rounded-md text-[14px] font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 