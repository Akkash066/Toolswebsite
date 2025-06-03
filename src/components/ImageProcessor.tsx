import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Download, RefreshCw, X } from 'lucide-react';
import ImageUploader from './ImageUploader';
import LoadingSpinner from './LoadingSpinner';
import imageCompression from 'browser-image-compression';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';

interface ProcessedImage {
  url: string;
  file: File;
  size: number;
  width: number;
  height: number;
  quality?: number;
}

const compressionLevels = [
  {
    name: 'Light',
    quality: 0.8,
    description: 'High quality (25-40% reduction)',
    targetRatio: 0.7,
    options: {
      maxSizeMB: 10,
      initialQuality: 0.8,
      useWebWorker: true,
      alwaysKeepResolution: true,
      maxIteration: 2,
    }
  },
  {
    name: 'Medium',
    quality: 0.5,
    description: 'Balanced (40-60% reduction)',
    targetRatio: 0.5,
    options: {
      maxSizeMB: 5,
      initialQuality: 0.5,
      useWebWorker: true,
      alwaysKeepResolution: true,
      maxIteration: 4,
    }
  },
  {
    name: 'High',
    quality: 0.3,
    description: 'Maximum compression (60-80% reduction)',
    targetRatio: 0.3,
    options: {
      maxSizeMB: 2,
      initialQuality: 0.3,
      useWebWorker: true,
      alwaysKeepResolution: true,
      maxIteration: 6,
    }
  }
];

export default function ImageProcessor() {
  const [originalImage, setOriginalImage] = useState<ProcessedImage | null>(null);
  const [compressedImage, setCompressedImage] = useState<ProcessedImage | null>(null);
  const [compressionLevel, setCompressionLevel] = useState(compressionLevels[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const clearImages = () => {
    if (originalImage?.url) URL.revokeObjectURL(originalImage.url);
    if (compressedImage?.url) URL.revokeObjectURL(compressedImage.url);
    setOriginalImage(null);
    setCompressedImage(null);
  };

  const handleImageUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) return;

    clearImages();

    try {
      const file = files[0];
      const url = URL.createObjectURL(file);
      
      // Get image dimensions
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });

      setOriginalImage({
        url,
        file,
        size: file.size,
        width: img.width,
        height: img.height,
        quality: 100
      });

      // Automatically start compression
      compressImage(file, compressionLevel);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  }, [compressionLevel]);

  const compressImage = async (file: File, level: typeof compressionLevels[0]) => {
    try {
      setIsProcessing(true);
      setProgress(0);

      const options = {
        ...level.options,
        onProgress: (p: number) => setProgress(Math.round(p * 100))
      };

      let compressedFile = await imageCompression(file, options);
      let attempts = 0;
      const maxAttempts = 3;

      // Adjust compression to meet target ratio
      while (attempts < maxAttempts) {
        const ratio = compressedFile.size / file.size;
        
        if (Math.abs(ratio - level.targetRatio) <= 0.1) break;

        const adjustedQuality = options.initialQuality * (level.targetRatio / ratio);
        options.initialQuality = Math.max(0.1, Math.min(1, adjustedQuality));
        
        compressedFile = await imageCompression(file, options);
        attempts++;
      }

      const compressedUrl = URL.createObjectURL(compressedFile);
      const compressedImg = new Image();
      await new Promise((resolve, reject) => {
        compressedImg.onload = resolve;
        compressedImg.onerror = reject;
        compressedImg.src = compressedUrl;
      });

      setCompressedImage({
        url: compressedUrl,
        file: compressedFile,
        size: compressedFile.size,
        width: compressedImg.width,
        height: compressedImg.height,
        quality: Math.round(level.quality * 100)
      });

      toast.success('Image compressed successfully!');
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error('Failed to compress image');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (originalImage && !isProcessing) {
      compressImage(originalImage.file, compressionLevel);
    }
  }, [compressionLevel]);

  const handleDownload = async () => {
    if (!compressedImage) return;
    try {
      saveAs(compressedImage.url, `compressed-${compressedImage.file.name}`);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Error downloading image');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const calculateReduction = () => {
    if (!originalImage || !compressedImage) return 0;
    return ((originalImage.size - compressedImage.size) / originalImage.size * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Image Compression
        </h2>

        {!originalImage ? (
          <ImageUploader
            onUpload={handleImageUpload}
            accept={['image/jpeg', 'image/png', 'image/webp']}
            maxFiles={1}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Original Image
                </h3>
                <div className="relative border rounded-lg overflow-hidden">
                  <img
                    src={originalImage.url}
                    alt="Original"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div>Size: {formatFileSize(originalImage.size)}</div>
                      <div>Quality: 100%</div>
                      <div>Width: {originalImage.width}px</div>
                      <div>Height: {originalImage.height}px</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Compressed Image
                </h3>
                <div className="relative border rounded-lg overflow-hidden">
                  {isProcessing ? (
                    <div className="aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                      <div className="text-center">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-gray-600 dark:text-gray-300">
                          Compressing... {progress}%
                        </p>
                      </div>
                    </div>
                  ) : compressedImage ? (
                    <>
                      <img
                        src={compressedImage.url}
                        alt="Compressed"
                        className="w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>Size: {formatFileSize(compressedImage.size)}</div>
                          <div>Quality: {compressedImage.quality}%</div>
                          <div>Width: {compressedImage.width}px</div>
                          <div>Height: {compressedImage.height}px</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                      <p className="text-gray-500">Processing image...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Compression Level
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {compressionLevels.map((level) => (
                    <button
                      key={level.name}
                      onClick={() => setCompressionLevel(level)}
                      disabled={isProcessing}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        compressionLevel === level
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                      }`}
                    >
                      <h4 className="font-medium mb-1">{level.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {level.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {compressedImage && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                  <p className="text-indigo-600 dark:text-indigo-400">
                    Size reduced by {calculateReduction()}%
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  disabled={!compressedImage || isProcessing}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Download className="h-5 w-5 inline mr-2" />
                  Download Compressed Image
                </button>
                
                <button
                  onClick={clearImages}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}