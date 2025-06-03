```typescript
import React, { useState } from 'react';
import { ArrowLeft, Upload, Image as ImageIcon, Crop, Palette, Download, Layers } from 'lucide-react';
import ImageProcessor from '../../components/ImageProcessor';

const tools = [
  { id: 'processor', name: 'Image Processor', icon: ImageIcon, description: 'Compress, resize, and optimize images' },
  { id: 'bulk', name: 'Bulk Processing', icon: Layers, description: 'Process multiple images at once' },
];

const ImageTools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Image Tools</h1>
        </div>

        {!selectedTool ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <tool.icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{tool.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tool.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <button
              onClick={() => setSelectedTool(null)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Tools
            </button>

            {selectedTool === 'processor' && <ImageProcessor />}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageTools;
```