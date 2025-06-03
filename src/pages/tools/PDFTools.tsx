import React from 'react';
import { Link } from 'react-router-dom';
import { FilePlus, FileInput, FileOutput, FileText, FileType, FileImage, List as ListNumbers, RotateCw, Trash, Copy } from 'lucide-react';

const tools = [
  {
    id: 'merge',
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into one',
    icon: FilePlus,
    path: '/tools/pdf/merge'
  },
  {
    id: 'split',
    name: 'Split PDF',
    description: 'Split PDF into multiple files',
    icon: FileInput,
    path: '/tools/pdf/split'
  },
  {
    id: 'compress',
    name: 'Compress PDF',
    description: 'Reduce PDF file size',
    icon: FileOutput,
    path: '/tools/pdf/compress'
  },
  {
    id: 'convert',
    name: 'Convert PDF',
    description: 'Convert PDF to other formats',
    icon: FileType,
    path: '/tools/pdf/convert'
  },
  {
    id: 'to-word',
    name: 'PDF to Word',
    description: 'Convert PDF to Word document',
    icon: FileText,
    path: '/tools/pdf/to-word'
  },
  {
    id: 'to-image',
    name: 'PDF to Image',
    description: 'Convert PDF pages to images',
    icon: FileImage,
    path: '/tools/pdf/to-image'
  },
  {
    id: 'add-page-numbers',
    name: 'Add Page Numbers',
    description: 'Add page numbers to PDF',
    icon: ListNumbers,
    path: '/tools/pdf/add-page-numbers'
  },
  {
    id: 'rotate',
    name: 'Rotate PDF',
    description: 'Rotate PDF pages',
    icon: RotateCw,
    path: '/tools/pdf/rotate'
  },
  {
    id: 'delete-pages',
    name: 'Delete Pages',
    description: 'Remove pages from PDF',
    icon: Trash,
    path: '/tools/pdf/delete-pages'
  },
  {
    id: 'extract-pages',
    name: 'Extract Pages',
    description: 'Extract specific pages from PDF',
    icon: Copy,
    path: '/tools/pdf/extract-pages'
  }
];

function PDFTools() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">PDF Tools</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Professional tools for all your PDF needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              to={tool.path}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <tool.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white ml-3">
                    {tool.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
                <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400">
                  <span className="text-sm font-medium">Get Started</span>
                  <svg
                    className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PDFTools;