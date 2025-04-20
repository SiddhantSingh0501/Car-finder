import React from 'react';
import { Clock, X } from 'lucide-react';
import { SearchHistory as SearchHistoryType } from '../types/car';
import { getSearchHistory, removeSearchItem } from '../utils/storage';

interface SearchHistoryProps {
  onSelectHistory: (make: string, model: string, year?: number) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelectHistory }) => {
  const [history, setHistory] = React.useState<SearchHistoryType[]>([]);
  
  React.useEffect(() => {
    setHistory(getSearchHistory());
  }, []);
  
  const handleRemoveItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeSearchItem(id);
    setHistory(getSearchHistory());
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Clock size={18} className="text-gray-500 dark:text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Searches</h3>
      </div>
      
      <div className="space-y-2">
        {history.map(item => (
          <div 
            key={item.id}
            onClick={() => onSelectHistory(item.make, item.model, item.year)}
            className="flex justify-between items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div>
              <span className="font-medium text-gray-900 dark:text-white">
                {item.make} {item.model} {item.year && `(${item.year})`}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
            <button 
              onClick={(e) => handleRemoveItem(e, item.id)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;