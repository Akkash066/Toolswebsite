import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Welcome to our platform! We're dedicated to providing powerful and user-friendly tools
            that help streamline your workflow and boost productivity.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Our mission is to make professional-grade tools accessible to everyone. We believe in
            creating solutions that are both powerful and easy to use, helping you accomplish more
            in less time.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Image Tools</h3>
              <p className="text-gray-600">
                Professional image editing and conversion tools to help you create and modify images efficiently.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Text Tools</h3>
              <p className="text-gray-600">
                Advanced text manipulation and formatting tools for content creators and developers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">PDF Tools</h3>
              <p className="text-gray-600">
                Comprehensive PDF management solutions for all your document handling needs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Developer Tools</h3>
              <p className="text-gray-600">
                Essential utilities and resources designed specifically for developers.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Commitment</h2>
          <p className="text-gray-600 mb-6">
            We're committed to continuous improvement and innovation. Our team regularly updates
            and enhances our tools based on user feedback and emerging technologies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;