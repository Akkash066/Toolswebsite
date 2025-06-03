import React from 'react';
import { 
  Upload, 
  Maximize, 
  Lock, 
  Image, 
  Download, 
  Crop, 
  Settings, 
  AlertCircle,
  Keyboard
} from 'lucide-react';

export default function ImageResizerGuide() {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0">Welcome to the Image Resize & Crop Tool</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-0">
          Transform your images with precision using our professional-grade editing tools. Whether you need to resize for social media, crop for perfect composition, or process multiple images at once, we've got you covered.
        </p>
      </div>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Settings className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Technical Specifications
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-3">Supported Formats</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>JPEG/JPG</li>
              <li>PNG</li>
              <li>WebP</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-3">File Specifications</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Maximum file size: 20MB</li>
              <li>Maximum dimensions: 8192×8192 pixels</li>
              <li>Minimum dimensions: 1×1 pixels</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Upload className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Getting Started
        </h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
          <h4 className="font-semibold mb-4">Uploading Your Image</h4>
          <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-300">
            <li>
              <span className="font-medium">Drag and Drop:</span> Simply drag your image file from your computer and drop it into the upload area
            </li>
            <li>
              <span className="font-medium">Click to Upload:</span> Click the upload area to open your file browser and select an image
            </li>
            <li>
              <span className="font-medium">Verify Upload:</span> Your image will appear in the preview area when successfully uploaded
            </li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Maximize className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Resizing Your Image
        </h3>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-4">Manual Resizing</h4>
            <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-300">
              <li>Enter desired width in pixels in the "Width" field</li>
              <li>Enter desired height in pixels in the "Height" field</li>
              <li>Toggle aspect ratio lock to maintain or break image proportions</li>
              <li>Preview updates automatically as you adjust dimensions</li>
            </ol>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h4 className="font-semibold mb-4">Using Aspect Ratio Presets</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Square (1:1) - Perfect for profile pictures</li>
              <li>Landscape (4:3) - Standard photo ratio</li>
              <li>Widescreen (16:9) - Ideal for video thumbnails</li>
              <li>Portrait (3:4) - Vertical photo format</li>
              <li>Custom - Enter your own ratio</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Crop className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Cropping Tools
        </h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-4">How to Crop</h4>
          <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-300">
            <li>Select an aspect ratio or choose "Free" for custom cropping</li>
            <li>Click and drag on the image to create crop selection</li>
            <li>Adjust the crop area by dragging the corners or edges</li>
            <li>Move the entire selection by clicking and dragging inside it</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Image className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Quality Settings
        </h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-4">Adjusting Output Quality</h4>
          <ul className="list-disc list-inside space-y-4 text-gray-600 dark:text-gray-300">
            <li>
              <span className="font-medium">Quality Slider:</span>
              <ul className="list-disc list-inside ml-6 mt-2">
                <li>High (90-100%) - Best quality, larger file size</li>
                <li>Medium (70-89%) - Good balance of quality and size</li>
                <li>Low (50-69%) - Smaller files, visible compression</li>
              </ul>
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Download className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Saving Your Image
        </h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <ol className="list-decimal list-inside space-y-4 text-gray-600 dark:text-gray-300">
            <li>Click the "Process & Download" button</li>
            <li>Wait for processing to complete</li>
            <li>Image will automatically download in your chosen format</li>
            <li>Original image remains available for further editing</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <Keyboard className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Pro Tips
        </h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <ul className="list-disc list-inside space-y-4 text-gray-600 dark:text-gray-300">
            <li>Use the aspect ratio lock for consistent proportions</li>
            <li>Preview your changes before downloading</li>
            <li>Choose appropriate quality settings based on your needs</li>
            <li>Consider the final use case when selecting dimensions</li>
          </ul>
        </div>
      </section>

      <section>
        <h3 className="flex items-center text-xl font-semibold mb-4">
          <AlertCircle className="h-6 w-6 mr-2 text-indigo-600 dark:text-indigo-400" />
          Troubleshooting
        </h3>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold mb-4">Common Issues</h4>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <p className="font-medium">Image won't upload:</p>
              <ul className="list-disc list-inside ml-6">
                <li>Check if file size is under 20MB</li>
                <li>Verify file format is supported</li>
                <li>Try refreshing the page</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">Processing fails:</p>
              <ul className="list-disc list-inside ml-6">
                <li>Ensure stable internet connection</li>
                <li>Try a smaller image size</li>
                <li>Clear browser cache and reload</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}