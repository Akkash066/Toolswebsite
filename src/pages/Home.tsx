import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Type, FileText, Code, Calculator } from 'lucide-react';

const toolCategories = [
  {
    name: 'Image Tools',
    description: 'Compress, convert, and resize your images with ease',
    icon: Image,
    path: '/tools/image',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'Text Tools',
    description: 'Word counting, case conversion, and text manipulation tools',
    icon: Type,
    path: '/tools/text',
    bgColor: 'bg-green-500',
  },
  {
    name: 'PDF Tools',
    description: 'Merge, split, and compress PDF files effortlessly',
    icon: FileText,
    path: '/tools/pdf',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Developer Tools',
    description: 'Code formatting, minification, and development utilities',
    icon: Code,
    path: '/tools/developer',
    bgColor: 'bg-purple-500',
  },
  {
    name: 'Finance Tools',
    description: 'Financial calculators and currency converters',
    icon: Calculator,
    path: '/tools/finance',
    bgColor: 'bg-yellow-500',
  },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Your Ultimate Toolbox
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Free online utilities for all your digital needs. Simple, fast, and secure.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/tools/image"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-colors duration-200"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-500 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700"></div>
      </section>

      {/* Tool Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Tools</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Everything you need in one place
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolCategories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="transform hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                  <div className={`p-6 ${category.bgColor}`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose ToolifyX?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Free & Open Source</h3>
              <p className="text-gray-600 dark:text-gray-300">All tools are free to use and open source</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">Your data never leaves your browser</p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Easy to Use</h3>
              <p className="text-gray-600 dark:text-gray-300">Simple interface for all your needs</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;