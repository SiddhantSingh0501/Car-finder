import React from 'react';

interface CarImageProps {
  imageUrl: string | null;
  make: string;
  model: string;
  isLoading: boolean;
}

const CarImage: React.FC<CarImageProps> = ({ imageUrl, make, model, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-full h-64 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading image...</div>
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg w-full h-64 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">No image available for {make} {model}</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
      <img 
        src={imageUrl} 
        alt={`${make} ${model}`}
        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
        }}
      />
    </div>
  );
};

export default CarImage;