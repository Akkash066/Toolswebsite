import React from 'react';
import PDFDropzone from '../../../components/PDFDropzone';

const PDFToImage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Convert PDF to Image</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <PDFDropzone />
        <div className="mt-6">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Convert to Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFToImage;