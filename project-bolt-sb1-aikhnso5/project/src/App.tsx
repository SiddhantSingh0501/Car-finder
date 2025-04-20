import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CarImage from './components/CarImage';
import CarDetails from './components/CarDetails';
import SafetyRatings from './components/SafetyRatings';
import FunFactBox from './components/FunFactBox';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import { fetchCarImage, fetchCarSpecs, fetchSafetyRatings } from './utils/api';
import { saveSearchToHistory } from './utils/storage';
import { CarSpec, SafetyRating } from './types/car';

function App() {
  const [searchParams, setSearchParams] = useState<{ make: string; model: string; year?: number } | null>(null);
  const [carSpecs, setCarSpecs] = useState<CarSpec | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [safetyRatings, setSafetyRatings] = useState<SafetyRating[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (make: string, model: string, year?: number) => {
    setIsLoading(true);
    setError(null);
    setSearchParams({ make, model, year });

    try {
      // Save to history
      saveSearchToHistory(make, model, year);
      
      // Fetch data in parallel
      const [specsResult, imageResult, safetyResult] = await Promise.all([
        fetchCarSpecs(make, model, year),
        fetchCarImage(make, model),
        fetchSafetyRatings(make, model, year)
      ]);
      
      setCarSpecs(specsResult || { make, model, year });
      setImageUrl(imageResult);
      setSafetyRatings(safetyResult);
    } catch (err) {
      console.error('Error fetching car data:', err);
      setError('Failed to load car data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <ThemeToggle />
      
      <header className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Car<span className="text-blue-600 dark:text-blue-500">Scope</span>
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
            Explore detailed specifications, images, and safety ratings for any vehicle
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} />
        
        <SearchHistory onSelectHistory={handleSearch} />
        
        {error && (
          <div className="mt-8 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}
        
        {searchParams && !error && (
          <div className="mt-8 space-y-6 animate-slide-up">
            {/* Car Image Section */}
            <CarImage 
              imageUrl={imageUrl} 
              make={searchParams.make} 
              model={searchParams.model} 
              isLoading={isLoading} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Car Details Section */}
              <div className="lg:col-span-2">
                <CarDetails 
                  specs={carSpecs || { make: searchParams.make, model: searchParams.model, year: searchParams.year }} 
                  isLoading={isLoading} 
                />
              </div>
              
              {/* Safety Ratings Section */}
              <div>
                <SafetyRatings ratings={safetyRatings} isLoading={isLoading} />
                
                {!isLoading && searchParams.make && (
                  <div className="mt-6">
                    <FunFactBox make={searchParams.make} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {!searchParams && !error && (
          <div className="mt-16 text-center text-gray-500 dark:text-gray-400">
            <p>Search for a vehicle above to see detailed information</p>
          </div>
        )}
      </main>
      
      <footer className="mt-16 py-6 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>CarScope &copy; {new Date().getFullYear()} - All car data provided by public APIs</p>
        </div>
      </footer>
    </div>
  );
}

export default App;