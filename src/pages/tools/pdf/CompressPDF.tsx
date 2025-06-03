import React, { useState } from 'react';
import PDFDropzone from '../../../components/PDFDropzone';
import PDFPreview from '../../../components/PDFPreview';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { Download, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';

interface CompressionQuality {
  label: string;
  value: number;
  description: string;
  imageCompression: number;
}

const compressionQualities: CompressionQuality[] = [
  {
    label: 'High Quality',
    value: 0.9,
    description: 'Minimal compression, best quality',
    imageCompression: 0.9
  },
  {
    label: 'Balanced',
    value: 0.7,
    description: 'Good balance of size and quality',
    imageCompression: 0.7
  },
  {
    label: 'Maximum Compression',
    value: 0.4,
    description: 'Smallest file size, reduced quality',
    imageCompression: 0.5
  }
];

const CompressPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<CompressionQuality>(compressionQualities[1]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or image file (JPEG, PNG)');
      return false;
    }
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      setError('File size must be less than 100MB');
      return false;
    }
    return true;
  };

  const handleUpload = (files: File[]) => {
    setError(null);
    if (files.length > 0) {
      const uploadedFile = files[0];
      if (validateFile(uploadedFile)) {
        setFile(uploadedFile);
        setCompressedSize(null);
        toast.success('File uploaded successfully');
      } else {
        toast.error(error || 'Invalid file');
      }
    }
  };

  const compressImage = async (imageFile: File): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality.imageCompression
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(imageFile);
    });
  };

  const compressPDF = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);

      let compressedBlob: Blob;

      if (file.type.startsWith('image/')) {
        // Handle image compression
        compressedBlob = await compressImage(file);
      } else {
        // Handle PDF compression
        const fileBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileBuffer);
        
        // Apply compression settings
        const compressedPdfBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
          objectsPerTick: 50,
          updateFieldAppearances: true,
          compress: true,
          // Additional quality-specific settings
          preserveGraphics: quality.value > 0.7,
          preserveImages: quality.value > 0.5
        });

        compressedBlob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
      }

      setCompressedSize(compressedBlob.size);
      
      // Save the compressed file
      const extension = file.type.startsWith('image/') ? '.jpg' : '.pdf';
      saveAs(compressedBlob, `compressed-${file.name.replace(/\.[^/.]+$/, '')}${extension}`);
      toast.success('File compressed successfully!');
    } catch (error) {
      console.error('Error compressing file:', error);
      setError('Failed to compress file. Please try again.');
      toast.error('Compression failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateCompression = (): number => {
    if (!file || !compressedSize) return 0;
    return Math.round(((file.size - compressedSize) / file.size) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Compress PDF & Image Files</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Compression Quality</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {compressionQualities.map((q) => (
              <button
                key={q.value}
                onClick={() => setQuality(q)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  quality.value === q.value
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                }`}
              >
                <h3 className="font-medium mb-2">{q.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{q.description}</p>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {!file ? (
          <PDFDropzone 
            onUpload={handleUpload}
            accept={['application/pdf', 'image/jpeg', 'image/png']}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{file.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Original size: {formatFileSize(file.size)}
                    {compressedSize && (
                      <>
                        <span className="mx-2">→</span>
                        Compressed: {formatFileSize(compressedSize)}
                        <span className="ml-2 text-green-600 dark:text-green-400">
                          ({calculateCompression()}% smaller)
                        </span>
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setError(null);
                    setCompressedSize(null);
                  }}
                  className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                >
                  Remove
                </button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <PDFPreview file={file} className="max-h-[400px] w-full object-contain" />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={compressPDF}
                disabled={isProcessing}
                className="flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Compress File
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompressPDF;