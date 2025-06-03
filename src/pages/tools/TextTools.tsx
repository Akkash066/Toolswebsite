import React, { useState } from 'react';

function TextTools() {
  const [text, setText] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Text Tools</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Analysis</h2>
            <textarea
              className="w-full h-40 p-4 border rounded-lg mb-4"
              placeholder="Enter or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Characters</h3>
                <p className="text-2xl font-bold text-gray-900">{text.length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Words</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {text.trim() ? text.trim().split(/\s+/).length : 0}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Lines</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {text.trim() ? text.trim().split('\n').length : 0}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Paragraphs</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {text.trim() ? text.trim().split(/\n\s*\n/).length : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Transformation</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                onClick={() => setText(text.toUpperCase())}
              >
                UPPERCASE
              </button>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                onClick={() => setText(text.toLowerCase())}
              >
                lowercase
              </button>
              <button
                className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                onClick={() => setText(text.split('').reverse().join(''))}
              >
                Reverse
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Remove Duplicates</h2>
            <p className="text-gray-600 mb-4">
              Enter text with duplicate lines to remove them. One line per entry.
            </p>
            <textarea
              className="w-full h-40 p-4 border rounded-lg mb-4"
              placeholder="Enter text with duplicate lines..."
            ></textarea>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
              Remove Duplicates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextTools;