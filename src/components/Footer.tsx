import React from 'react';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center">
              <Code className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">ToolifyX</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Your ultimate toolbox for everyday digital needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Tools</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/tools/image" className="text-gray-600 hover:text-indigo-600">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/text" className="text-gray-600 hover:text-indigo-600">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/pdf" className="text-gray-600 hover:text-indigo-600">
                  PDF Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/developer" className="text-gray-600 hover:text-indigo-600">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/finance" className="text-gray-600 hover:text-indigo-600">
                  Finance Tools
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-indigo-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} ToolifyX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;