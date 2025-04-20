import React from 'react';
import { SafetyRating } from '../types/car';
import { Shield } from 'lucide-react';

interface SafetyRatingsProps {
  ratings: SafetyRating[] | undefined;
  isLoading: boolean;
}

const SafetyRatings: React.FC<SafetyRatingsProps> = ({ ratings, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!ratings || ratings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Shield size={20} className="text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Safety Ratings</h3>
        </div>
        <p className="text-gray-500 dark:text-gray-400">No safety ratings available for this vehicle.</p>
      </div>
    );
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield size={20} className="text-blue-500 dark:text-blue-400" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Safety Ratings</h3>
      </div>
      
      <div className="space-y-4">
        {ratings.map((rating, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating.category}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {rating.score} / {rating.maxScore}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getScoreColor(rating.score, rating.maxScore)}`} 
                style={{ width: `${(rating.score / rating.maxScore) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyRatings;