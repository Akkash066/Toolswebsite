import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Document } from 'pdfjs-dist';
import LoadingSpinner from './LoadingSpinner';

interface PDFPreviewProps {
  file: File | string;
  pageNumber?: number;
  width?: number;
  className?: string;
  onError?: (error: Error) => void;
}

// Configure the worker source to use the local worker file
pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.js';

export default function PDFPreview({
  file,
  pageNumber = 1,
  width = 600,
  className = '',
  onError
}: PDFPreviewProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let pdfDoc: Document | null = null;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    let fileUrl: string;

    async function renderPage() {
      try {
        setLoading(true);
        setError(null);

        fileUrl = typeof file === 'string' ? file : URL.createObjectURL(file);
        
        pdfDoc = await pdfjsLib.getDocument(fileUrl).promise;
        const page = await pdfDoc.getPage(pageNumber);
        
        const viewport = page.getViewport({ scale: 1 });
        const scale = width / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        await page.render({
          canvasContext: ctx!,
          viewport: scaledViewport,
        }).promise;

        setPreview(canvas.toDataURL());
      } catch (err) {
        console.error('Error rendering PDF:', err);
        const error = new Error('Failed to load PDF preview. Please try a different file or check if the file is corrupted.');
        setError(error.message);
        if (onError) {
          onError(error);
        }
      } finally {
        setLoading(false);
        if (typeof file !== 'string' && fileUrl) {
          URL.revokeObjectURL(fileUrl);
        }
      }
    }

    renderPage();

    return () => {
      if (pdfDoc) {
        pdfDoc.destroy();
      }
    };
  }, [file, pageNumber, width, onError]);

  if (loading) {
    return (
      <div className={`flex justify-center items-center p-8 ${className}`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 text-red-500 ${className}`}>
        {error}
      </div>
    );
  }

  return preview ? (
    <img
      src={preview}
      alt="PDF preview"
      className={`max-w-full h-auto ${className}`}
    />
  ) : null;
}