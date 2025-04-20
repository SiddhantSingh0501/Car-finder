import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { fetchMakesData, fetchModelsForMake } from '../utils/api';

interface SearchBarProps {
  onSearch: (make: string, model: string, year?: number) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Fetch all makes when component mounts
  useEffect(() => {
    const loadMakes = async () => {
      const makesData = await fetchMakesData();
      setMakes(makesData);
    };
    
    loadMakes();
  }, []);

  // Fetch models when make changes
  useEffect(() => {
    if (!make) {
      setModels([]);
      return;
    }
    
    const loadModels = async () => {
      setIsLoading(true);
      const modelsData = await fetchModelsForMake(make);
      setModels(modelsData);
      setIsLoading(false);
    };
    
    loadModels();
  }, [make]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!make || !model) return;
    
    const yearValue = year ? parseInt(year, 10) : undefined;
    onSearch(make, model, yearValue);
    setIsExpanded(false);
  };

  const handleClear = () => {
    setMake('');
    setModel('');
    setYear('');
  };

  // Generate a list of years from current year back to 1990
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1989 }, (_, i) => currentYear - i);

  return (
    <div className={`relative w-full max-w-3xl mx-auto transition-all duration-300 ${isExpanded ? 'scale-105' : 'scale-100'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Find Your Vehicle</h2>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {isExpanded ? <X size={18} /> : <Search size={18} />}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Make
              </label>
              <select
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select Make</option>
                {makes.map((makeName) => (
                  <option key={makeName} value={makeName}>
                    {makeName}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Model
              </label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={!make || isLoading}
                required
              >
                <option value="">
                  {isLoading ? 'Loading...' : !make ? 'Select Make First' : 'Select Model'}
                </option>
                {models.map((modelName) => (
                  <option key={modelName} value={modelName}>
                    {modelName}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year (Optional)
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Any Year</option>
                {yearOptions.map((yearValue) => (
                  <option key={yearValue} value={yearValue.toString()}>
                    {yearValue}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={!make || !model}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;