import { SearchHistory } from '../types/car';

const SEARCH_HISTORY_KEY = 'carscope_search_history';
const MAX_HISTORY_ITEMS = 10;

export const saveSearchToHistory = (make: string, model: string, year?: number): void => {
  const newSearch: SearchHistory = {
    id: `${make}-${model}-${year || 'any'}-${Date.now()}`,
    make,
    model,
    year,
    timestamp: Date.now()
  };
  
  const existingHistory = getSearchHistory();
  
  // Filter out duplicates (same make, model, year)
  const filteredHistory = existingHistory.filter(item => 
    !(item.make === make && item.model === model && item.year === year)
  );
  
  // Add new search at the beginning and limit the size
  const updatedHistory = [newSearch, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
  
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
};

export const getSearchHistory = (): SearchHistory[] => {
  try {
    const historyJson = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!historyJson) return [];
    
    const history = JSON.parse(historyJson);
    if (!Array.isArray(history)) return [];
    
    return history;
  } catch (error) {
    console.error('Error getting search history:', error);
    return [];
  }
};

export const clearSearchHistory = (): void => {
  localStorage.removeItem(SEARCH_HISTORY_KEY);
};

export const removeSearchItem = (id: string): void => {
  const history = getSearchHistory();
  const updatedHistory = history.filter(item => item.id !== id);
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
};