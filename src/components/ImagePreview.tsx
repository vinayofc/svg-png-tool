import React from 'react';

interface ImagePreviewProps {
  title: string;
  icon: React.ReactNode;
  imageSrc: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ title, icon, imageSrc }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
      <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-inner">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default ImagePreview;