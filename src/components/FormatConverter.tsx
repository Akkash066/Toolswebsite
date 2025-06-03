import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

interface ProcessedImage {
  original: {
    url: string;
    size: number;
    format: string;
  };
  converted: {
    url: string;
    size: number;
    format: string;
  } | null;
}

const supportedFormats = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
const formatOptions = [
  { value: 'image/png', label: 'PNG' },
  { value: 'image/jpeg', label: 'JPG' },
  { value: 'image/webp', label: 'WebP' },
  { value: 'image/svg+xml', label: 'SVG' },
];

export default function FormatConverter() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [targetFormat, setTargetFormat] = useState('image/png');
  const [processedImage, setProcessedImage] = useState<ProcessedImage | null>(null);

  const handleImageUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const originalUrl = URL.createObjectURL(file);

    setProcessedImage({
      original: {
        url: originalUrl,
        size: file.size,
        format: file.type,
      },
      converted: null,
    });
  };

  const convertImage = async () => {
    if (!processedImage) return;

    try {
      setIsProcessing(true);

      const response = await fetch(processedImage.original.url);
      const blob = await response.blob();

      // Create a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = async () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        try {
          let convertedBlob: Blob;
          
          if (targetFormat === 'image/svg+xml' && processedImage.original.format !== 'image/svg+xml') {
            toast.error('Converting to SVG is not supported');
            setIsProcessing(false);
            return;
          }

          if (processedImage.original.format === 'image/svg+xml' && targetFormat !== 'image/svg+xml') {
            // Handle SVG to raster conversion
            const svgString = await blob.text();
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const svgImg = new Image();
            svgImg.src = svgUrl;
            await new Promise((resolve) => {
              svgImg.onload = resolve;
            });

            canvas.width = svgImg.width;
            canvas.height = svgImg.height;
            ctx?.drawImage(svgImg, 0, 0);
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                throw new Error('Failed to convert image');
              }

              const convertedUrl = URL.createObjectURL(blob);
              setProcessedImage((prev) => ({
                original: prev!.original,
                converted: {
                  url: convertedUrl,
                  size: blob.size,
                  format: targetFormat,
                },
              }));

              setIsProcessing(false);
              toast.success('Image converted successfully!');
            },
            targetFormat,
            targetFormat === 'image/jpeg' ? 0.92 : undefined
          );
        } catch (error) {
          console.error('Error converting image:', error);
          toast.error('Failed to convert image');
          setIsProcessing(false);
        }
      };

      img.src = processedImage.original.url;
    } catch (error) {
      console.error('Error converting image:', error);
      toast.error('Failed to convert image');
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage?.converted) return;

    try {
      const extension = targetFormat.split('/')[1];
      saveAs(processedImage.converted.url, `converted.${extension}`);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Error downloading image');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Format Conversion
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Convert your images between different formats. Supported conversions:
            PNG ↔ JPG ↔ WebP, SVG → PNG/JPG/WebP
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Format
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
            >
              {formatOptions.map((format) => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>

          <ImageUploader
            onUpload={handleImageUpload}
            accept={supportedFormats}
            maxFiles={1}
          />
        </div>

        {processedImage && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Original
                </h3>
                <img
                  src={processedImage.original.url}
                  alt="Original"
                  className="w-full rounded-lg"
                />
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Format: {formatOptions.find(f => f.value === processedImage.original.format)?.label}
                  <br />
                  Size: {formatFileSize(processedImage.original.size)}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Converted
                </h3>
                {processedImage.converted ? (
                  <>
                    <img
                      src={processedImage.converted.url}
                      alt="Converted"
                      className="w-full rounded-lg"
                    />
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Format: {formatOptions.find(f => f.value === processedImage.converted.format)?.label}
                      <br />
                      Size: {formatFileSize(processedImage.converted.size)}
                    </p>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">
                      Click convert to see the result
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={convertImage}
                disabled={isProcessing}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Converting...
                  </div>
                ) : (
                  'Convert'
                )}
              </button>
              
              {processedImage.converted && (
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}