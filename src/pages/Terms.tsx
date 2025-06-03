import React from 'react';

function Terms() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Terms</h2>
            <p className="text-gray-600">
              By accessing this website, you agree to be bound by these Terms of Service and agree
              that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use License</h2>
            <p className="text-gray-600">
              Permission is granted to temporarily download one copy of the materials (information
              or software) on ToolifyX's website for personal, non-commercial transitory viewing only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600">
              The materials on ToolifyX's website are provided on an 'as is' basis. ToolifyX makes
              no warranties, expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Limitations</h2>
            <p className="text-gray-600">
              In no event shall ToolifyX or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on
              ToolifyX's website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Revisions</h2>
            <p className="text-gray-600">
              The materials appearing on ToolifyX's website could include technical,
              typographical, or photographic errors. ToolifyX does not warrant that any of the
              materials on its website are accurate, complete or current.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Terms;