import React, { useState } from 'react';

function DeveloperTools() {
  const [code, setCode] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Developer Tools</h1>
        
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Code Formatter</h2>
            <p className="text-gray-600 mb-4">
              Format and beautify your code (JSON, HTML, CSS, JavaScript).
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Input</h3>
                <textarea
                  className="w-full h-64 p-4 font-mono text-sm border rounded-lg"
                  placeholder="Paste your code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                ></textarea>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Output</h3>
                <pre className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border rounded-lg overflow-auto">
                  {code}
                </pre>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <select className="border rounded-lg px-4 py-2">
                <option value="json">JSON</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
              </select>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Format Code
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Minifier</h2>
            <p className="text-gray-600 mb-4">
              Minify your code to reduce file size.
            </p>
            <textarea
              className="w-full h-40 p-4 font-mono text-sm border rounded-lg mb-4"
              placeholder="Paste code to minify..."
            ></textarea>
            <div className="flex gap-4">
              <select className="border rounded-lg px-4 py-2">
                <option value="js">JavaScript</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
              </select>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Minify
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Base64 Encoder/Decoder</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Input</h3>
                <textarea
                  className="w-full h-40 p-4 font-mono text-sm border rounded-lg"
                  placeholder="Enter text to encode/decode..."
                ></textarea>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Output</h3>
                <textarea
                  className="w-full h-40 p-4 font-mono text-sm border rounded-lg bg-gray-50"
                  readOnly
                ></textarea>
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Encode
              </button>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                Decode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperTools;