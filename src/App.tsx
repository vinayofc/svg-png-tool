import React, { useState, useCallback } from 'react';
import { Upload, Download, Image as ImageIcon, FileWarning } from 'lucide-react';
import { FileDropzone } from './components/FileDropzone';
import { ImagePreview } from './components/ImagePreview';
import { convertToPNG } from './utils/imageConverter';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [pngOutput, setPngOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileDrop = useCallback((file: File) => {
    if (!file.type.startsWith('image/svg+xml')) {
      setError('Please upload an SVG file');
      return;
    }
    setError(null);
    setSelectedFile(file);
    setPngOutput(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleConversion = async () => {
    if (!selectedFile) return;

    try {
      setIsConverting(true);
      setError(null);
      const png = await convertToPNG(selectedFile);
      setPngOutput(png);
    } catch (err) {
      setError('Error converting image. Please try again.');
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!pngOutput) return;

    const a = document.createElement('a');
    a.href = pngOutput;
    a.download = `${selectedFile?.name.replace('.svg', '')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">SVG to PNG Converter</h1>
          <p className="text-gray-600">Convert your SVG images to high-quality PNG format</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <FileDropzone onFileDrop={handleFileDrop} acceptType="image/svg+xml" fileType="SVG" />

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-center gap-2 text-red-700">
              <FileWarning className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {preview && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ImagePreview
                  title="Original SVG"
                  icon={<ImageIcon className="w-6 h-6" />}
                  imageSrc={preview}
                />
                {pngOutput && (
                  <ImagePreview
                    title="Converted PNG"
                    icon={<ImageIcon className="w-6 h-6" />}
                    imageSrc={pngOutput}
                  />
                )}
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-4 justify-center">
            {selectedFile && !pngOutput && (
              <button
                onClick={handleConversion}
                disabled={isConverting}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Upload className="w-5 h-5" />
                {isConverting ? 'Converting...' : 'Convert to PNG'}
              </button>
            )}

            {pngOutput && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PNG
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;