import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onFileDrop: (file: File) => void;
  acceptType: string;
  fileType: string;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileDrop, acceptType, fileType }) => {
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileDrop(files[0]);
      }
    },
    [onFileDrop]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileDrop(files[0]);
      }
    },
    [onFileDrop]
  );

  return (
    <div
      onDragOver={handleDrag}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept={acceptType}
        onChange={handleChange}
      />
      <label htmlFor="fileInput" className="cursor-pointer">
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          Drag and drop your {fileType} file here, or click to select
        </p>
        <p className="text-sm text-gray-500">Supports {fileType} files only</p>
      </label>
    </div>
  );
};

export default FileDropzone;