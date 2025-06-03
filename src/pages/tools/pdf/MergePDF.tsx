import React, { useState } from 'react';
import PDFDropzone from '../../../components/PDFDropzone';
import { useTranslation } from 'react-i18next';
import { mergePDFs, validatePDF, type PDFValidationResult } from '../../../utils/pdf';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/LoadingSpinner';

const MergePDF = () => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);
  const [validations, setValidations] = useState<Record<string, PDFValidationResult>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (uploadedFiles: File[]) => {
    const newValidations: Record<string, PDFValidationResult> = {};
    
    for (const file of uploadedFiles) {
      const validation = await validatePDF(file);
      newValidations[file.name] = validation;
      
      if (!validation.isValid) {
        toast.error(`${file.name}: ${validation.error}`);
      }
    }

    setValidations(prev => ({ ...prev, ...newValidations }));
    setFiles(prev => [...prev, ...uploadedFiles.filter(file => newValidations[file.name].isValid)]);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error(t('pdf.merge.minFiles', 'Please select at least 2 files to merge'));
      return;
    }

    try {
      setIsProcessing(true);
      const mergedPdf = await mergePDFs(files);
      saveAs(mergedPdf, 'merged.pdf');
      toast.success(t('pdf.merge.success', 'PDFs merged successfully!'));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('pdf.merge.title', 'Merge PDF Files')}</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <PDFDropzone 
          onUpload={handleFileUpload}
          maxFiles={10}
        />
        {files.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">{t('pdf.common.selectedFiles', 'Selected Files')}:</h2>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="flex items-center justify-between text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span>{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-6">
          <button 
            onClick={handleMerge}
            disabled={files.length < 2 || isProcessing}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isProcessing ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {t('pdf.common.processing', 'Processing...')}
              </>
            ) : (
              t('pdf.merge.button', 'Merge PDFs')
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MergePDF;