import React, { useState, useRef } from 'react';
import { Download, Crop as CropIcon, Maximize, Lock, Unlock, HelpCircle } from 'lucide-react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import ImageResizerGuide from './ImageResizerGuide';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

interface ImageDimensions {
  width: number;
  height: number;
}

const aspectRatios = [
  { label: 'Free', value: undefined },
  { label: '1:1 (Square)', value: 1 },
  { label: '4:3', value: 4/3 },
  { label: '16:9', value: 16/9 },
  { label: '3:4 (Portrait)', value: 3/4 },
];

export default function ImageResizer() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [newDimensions, setNewDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<number | undefined>(undefined);
  const [quality, setQuality] = useState(0.92);
  const [showGuide, setShowGuide] = useState(false);
  
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    setOriginalImage(url);

    // Get image dimensions
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setNewDimensions({ width: img.width, height: img.height });
    };
    img.src = url;
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    if (maintainAspectRatio) {
      const aspectRatio = dimensions.width / dimensions.height;
      if (dimension === 'width') {
        setNewDimensions({
          width: value,
          height: Math.round(value / aspectRatio),
        });
      } else {
        setNewDimensions({
          width: Math.round(value * aspectRatio),
          height: value,
        });
      }
    } else {
      setNewDimensions({
        ...newDimensions,
        [dimension]: value,
      });
    }
  };

  const processImage = async () => {
    if (!imageRef.current || !originalImage) return;

    try {
      setIsProcessing(true);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // If there's a crop, apply it
      if (completedCrop) {
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;

        ctx.drawImage(
          imageRef.current,
          completedCrop.x,
          completedCrop.y,
          completedCrop.width,
          completedCrop.height,
          0,
          0,
          completedCrop.width,
          completedCrop.height
        );
      } else {
        // Otherwise, just resize
        canvas.width = newDimensions.width;
        canvas.height = newDimensions.height;
        
        ctx.drawImage(
          imageRef.current,
          0,
          0,
          newDimensions.width,
          newDimensions.height
        );
      }

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Failed to create blob');
          }
          saveAs(blob, 'resized-image.jpg');
          toast.success('Image processed successfully!');
          setIsProcessing(false);
        },
        'image/jpeg',
        quality
      );
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Error processing image');
      setIsProcessing(false);
    }
  };

  const handleAspectRatioChange = (ratio: number | undefined) => {
    setSelectedAspectRatio(ratio);
    if (ratio) {
      setCrop({
        unit: '%',
        width: 100,
        height: 100 / ratio,
        x: 0,
        y: 0,
      });
    } else {
      setCrop(undefined);
    }
  };

  if (showGuide) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowGuide(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            ← Back to Editor
          </button>
        </div>
        <ImageResizerGuide />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Resize & Crop
          </h2>
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <HelpCircle className="h-5 w-5 mr-1" />
            User Guide
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Resize or crop your images with precision. Supported formats: JPG, PNG, WebP
          </p>

          {!originalImage ? (
            <ImageUploader
              onUpload={handleImageUpload}
              accept={['image/jpeg', 'image/png', 'image/webp']}
              maxFiles={1}
              maxSize={20971520} // 20MB
            />
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Resize Options
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={newDimensions.width}
                          onChange={(e) => handleDimensionChange('width', parseInt(e.target.value))}
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={newDimensions.height}
                          onChange={(e) => handleDimensionChange('height', parseInt(e.target.value))}
                          className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <button
                        onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                        className="mt-6 p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        title={maintainAspectRatio ? "Unlock aspect ratio" : "Lock aspect ratio"}
                      >
                        {maintainAspectRatio ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quality
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Lower quality</span>
                        <span>Higher quality</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Crop Options
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Aspect Ratio
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {aspectRatios.map((ratio) => (
                          <button
                            key={ratio.label}
                            onClick={() => handleAspectRatioChange(ratio.value)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              selectedAspectRatio === ratio.value
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {ratio.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={selectedAspectRatio}
                >
                  <img
                    ref={imageRef}
                    src={originalImage}
                    alt="Original"
                    className="max-w-full h-auto"
                  />
                </ReactCrop>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={processImage}
                  disabled={isProcessing}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing...
                    </div>
                  ) : (
                    'Process & Download'
                  )}
                </button>
                
                <button
                  onClick={() => {
                    setOriginalImage(null);
                    setCrop(undefined);
                    setCompletedCrop(undefined);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}