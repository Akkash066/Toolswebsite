import { PDFDocument } from 'pdf-lib';
import PDFMerger from 'pdf-merger-js';
import toast from 'react-hot-toast';

export interface PDFValidationResult {
  isValid: boolean;
  error?: string;
  details?: {
    pageCount: number;
    fileSize: number;
    version: string;
    isEncrypted: boolean;
  };
}

export const validatePDF = async (file: File): Promise<PDFValidationResult> => {
  try {
    // Check file size (max 100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File size exceeds maximum limit of 100MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      };
    }

    // Check file type
    if (!file.type.includes('pdf')) {
      return {
        isValid: false,
        error: 'Invalid file type. Please upload a PDF file.'
      };
    }

    // Load and validate PDF structure
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, { 
      updateMetadata: false 
    }).catch(() => {
      throw new Error('The PDF file appears to be corrupted or invalid');
    });

    // Check if PDF is encrypted
    if (pdfDoc.isEncrypted) {
      return {
        isValid: false,
        error: 'Password-protected or encrypted PDFs are not supported'
      };
    }

    return {
      isValid: true,
      details: {
        pageCount: pdfDoc.getPageCount(),
        fileSize: file.size,
        version: pdfDoc.getProducer() || 'Unknown',
        isEncrypted: pdfDoc.isEncrypted
      }
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message || 'Invalid or corrupted PDF file'
    };
  }
};

export const mergePDFs = async (files: File[]): Promise<Blob> => {
  try {
    const merger = new PDFMerger();

    for (const file of files) {
      const validation = await validatePDF(file);
      if (!validation.isValid) {
        throw new Error(`Invalid PDF: ${file.name} - ${validation.error}`);
      }
      await merger.add(file);
    }

    return await merger.saveAsBlob();
  } catch (error) {
    throw new Error(`Failed to merge PDFs: ${error.message}`);
  }
};

export const splitPDF = async (file: File, pages: number[]): Promise<Blob[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const results: Blob[] = [];

    for (const pageNum of pages) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
      newPdf.addPage(copiedPage);
      const pdfBytes = await newPdf.save();
      results.push(new Blob([pdfBytes], { type: 'application/pdf' }));
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to split PDF: ${error.message}`);
  }
};