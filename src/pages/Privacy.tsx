import React from 'react';

function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600">
              We process your files locally in your browser. We do not store or transmit your files
              to any servers. Any data processing happens entirely on your device.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600">
              We use anonymous usage statistics to improve our services. This includes:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>Pages visited</li>
              <li>Tools used</li>
              <li>Device type and browser information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Cookies</h2>
            <p className="text-gray-600">
              We use essential cookies to ensure the basic functionality of our website. You can
              disable cookies in your browser settings at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-600">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              <li>Google Analytics for website analytics</li>
              <li>CloudFlare for content delivery and security</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our Privacy Policy, please contact us at privacy@toolifyx.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Privacy;