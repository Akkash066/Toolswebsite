import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Image, Type, FileText, Code, Calculator } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toolCategories = [
    { name: 'Image Tools', icon: Image, path: '/tools/image' },
    { name: 'Text Tools', icon: Type, path: '/tools/text' },
    { name: 'PDF Tools', icon: FileText, path: '/tools/pdf' },
    { name: 'Developer Tools', icon: Code, path: '/tools/developer' },
    { name: 'Finance Tools', icon: Calculator, path: '/tools/finance' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">ToolifyX</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/about" 
              className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${
                isActivePath('/about') ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              About
            </Link>
            <div className="relative group">
              <button 
                className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center ${
                  location.pathname.includes('/tools') ? 'text-indigo-600 dark:text-indigo-400' : ''
                }`}
              >
                Tools
              </button>
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform">
                <div className="py-1">
                  {toolCategories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className={`flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-600 ${
                        isActivePath(category.path) ? 'bg-indigo-50 dark:bg-gray-600' : ''
                      }`}
                    >
                      <category.icon className="h-5 w-5 mr-3" />
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link 
              to="/contact" 
              className={`text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium ${
                isActivePath('/contact') ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/about')
                  ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {toolCategories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath(category.path)
                    ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <category.icon className="h-5 w-5 mr-3" />
                {category.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActivePath('/contact')
                  ? 'bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;