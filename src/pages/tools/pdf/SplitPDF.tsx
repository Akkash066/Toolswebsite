import React, { useState } from 'react';
import PDFDropzone from '../../../components/PDFDropzone';
import { validatePDF, splitPDF, type PDFValidationResult } from '../../../utils/pdf';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';
import PDFPreview from '../../../components/PDFPreview';
import { AlertCircle, FileText } from 'lucide-react';

const SplitPDF = () => {
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] = useState<PDFValidationResult | null>(null);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const validateAndProcessFile = async (file: File) => {
    try {
      setIsProcessing(true);
      setPreviewError(null);

      // Basic file type check
      if (!file.type.includes('pdf')) {
        throw new Error('Please upload a valid PDF file');
      }

      // Check file size (max 100MB)
      const maxSize = 100 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size exceeds maximum limit of 100MB');
      }

      // Validate PDF structure and check for encryption
      const arrayBuffer = await file.arrayBuffer();
      const validation = await validatePDF(file);

      if (!validation.isValid) {
        throw new Error(validation.error || 'Invalid PDF file');
      }

      if (validation.details?.isEncrypted) {
        throw new Error('Password-protected PDFs are not supported');
      }

      setFile(file);
      setValidation(validation);
      setSelectedPages([]);
      toast.success('PDF file loaded successfully');
    } catch (error) {
      setPreviewError(error.message);
      toast.error(error.message);
      setFile(null);
      setValidation(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;
    await validateAndProcessFile(files[0]);
  };

  const handleSplit = async () => {
    if (!file || selectedPages.length === 0) {
      toast.error('Please select pages to split');
      return;
    }

    try {
      setIsProcessing(true);
      const splitPdfs = await splitPDF(file, selectedPages);
      
      // Download each split PDF
      splitPdfs.forEach((pdf, index) => {
        saveAs(pdf, `split-page-${selectedPages[index]}.pdf`);
      });
      
      toast.success('PDF split successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const togglePage = (pageNum: number) => {
    setSelectedPages(prev => 
      prev.includes(pageNum)
        ? prev.filter(p => p !== pageNum)
        : [...prev, pageNum].sort((a, b) => a - b)
    );
  };

  const retryUpload = () => {
    setFile(null);
    setValidation(null);
    setPreviewError(null);
    setSelectedPages([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Split PDF File</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {!file ? (
          <div className="space-y-4">
            <PDFDropzone 
              onUpload={handleFileUpload}
              maxFiles={1}
              maxSize={100 * 1024 * 1024} // 100MB
            />
            {previewError && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="font-medium text-red-500">Error Loading PDF</h3>
                </div>
                <p className="text-red-600 dark:text-red-400">{previewError}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Troubleshooting steps:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Verify the file is a valid PDF document</li>
                    <li>Ensure the file is not password-protected</li>
                    <li>Check if the file size is under 100MB</li>
                    <li>Try clearing your browser cache</li>
                    <li>Use a different browser if the issue persists</li>
                  </ul>
                </div>
                <button
                  onClick={retryUpload}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Try uploading again
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                <span className="font-medium">{file.name}</span>
              </div>
              <button
                onClick={retryUpload}
                className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                Remove
              </button>
            </div>

            {validation?.details && (
              <>
                <div>
                  <h2 className="text-lg font-semibold mb-4">Select Pages to Split</h2>
                  <div className="grid grid-cols-6 gap-2 mb-4">
                    {Array.from({ length: validation.details.pageCount }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        onClick={() => togglePage(pageNum)}
                        className={`p-2 rounded ${
                          selectedPages.includes(pageNum)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <PDFPreview 
                    file={file} 
                    pageNumber={1} 
                    className="max-h-[600px] w-full object-contain"
                    onError={(error) => {
                      setPreviewError(error.message);
                      toast.error('Error displaying PDF preview');
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedPages.length} pages selected
                  </div>
                  <button
                    onClick={handleSplit}
                    disabled={isProcessing || selectedPages.length === 0}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isProcessing ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Split Selected Pages'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitPDF;