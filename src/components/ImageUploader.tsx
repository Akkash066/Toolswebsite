import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  accept?: string[];
  maxFiles?: number;
  maxSize?: number;
}

export default function ImageUploader({
  onUpload,
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  maxFiles = 10,
  maxSize = 10485760, // 10MB
}: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': accept,
    },
    maxFiles,
    maxSize,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          switch (error.code) {
            case 'file-too-large':
              toast.error(`File is too large. Max size is ${maxSize / 1024 / 1024}MB`);
              break;
            case 'file-invalid-type':
              toast.error('Invalid file type. Please upload a valid image file.');
              break;
            case 'too-many-files':
              toast.error(`Too many files. Max is ${maxFiles}`);
              break;
            default:
              toast.error('Error uploading file');
          }
        });
      });
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
        isDragActive
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500 dark:hover:border-indigo-500'
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {isDragActive
          ? 'Drop the image here...'
          : 'Drag and drop an image here, or click to select'}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Supported formats: JPG, PNG, WebP
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Max file size: {maxSize / 1024 / 1024}MB
      </p>
    </div>
  );
}