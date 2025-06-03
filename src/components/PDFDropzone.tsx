import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

interface PDFDropzoneProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
}

export default function PDFDropzone({
  onUpload,
  maxFiles = 1,
  maxSize = 52428800, // 50MB
  accept = ['application/pdf'],
}: PDFDropzoneProps) {
  const { t } = useTranslation();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': accept,
    },
    maxFiles,
    maxSize,
    onDropRejected: (fileRejections) => {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          switch (error.code) {
            case 'file-too-large':
              toast.error(`${t('pdf.common.error')}: ${t('pdf.common.maxSize')} ${maxSize / 1024 / 1024}${t('pdf.common.mb')}`);
              break;
            case 'file-invalid-type':
              toast.error(t('pdf.common.error'));
              break;
            case 'too-many-files':
              toast.error(`${t('pdf.common.error')}: ${t('pdf.common.maxFiles', { count: maxFiles })}`);
              break;
            default:
              toast.error(t('pdf.common.error'));
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
      <FileUp className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        {isDragActive ? t('pdf.common.dropActive') : t('pdf.common.dropzone')}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {t('pdf.common.maxSize')} {maxSize / 1024 / 1024} {t('pdf.common.mb')}
      </p>
    </div>
  );
}