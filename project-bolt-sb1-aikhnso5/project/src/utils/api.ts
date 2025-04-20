const NHTSA_BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';
const CAR_IMAGERY_URL = 'https://www.carimagery.com/api.asmx/GetImageUrl';
const API_NINJAS_URL = 'https://api.api-ninjas.com/v1/cars';

// Replace with your actual API key
const API_NINJAS_KEY = ''; // You would need to get this from API Ninjas

export const fetchMakesData = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${NHTSA_BASE_URL}/GetAllMakes?format=json`);
    if (!response.ok) throw new Error('Failed to fetch car makes');
    
    const data = await response.json();
    return data.Results.map((make: { Make_Name: string }) => make.Make_Name);
  } catch (error) {
    console.error('Error fetching car makes:', error);
    return [];
  }
};

export const fetchModelsForMake = async (make: string): Promise<string[]> => {
  try {
    const response = await fetch(`${NHTSA_BASE_URL}/GetModelsForMake/${make}?format=json`);
    if (!response.ok) throw new Error(`Failed to fetch models for ${make}`);
    
    const data = await response.json();
    return data.Results.map((model: { Model_Name: string }) => model.Model_Name);
  } catch (error) {
    console.error(`Error fetching models for ${make}:`, error);
    return [];
  }
};

export const fetchCarImage = async (make: string, model: string): Promise<string | null> => {
  try {
    const searchTerm = `${make}+${model}`;
    const response = await fetch(`${CAR_IMAGERY_URL}?searchTerm=${searchTerm}`);
    if (!response.ok) throw new Error('Failed to fetch car image');
    
    const xmlText = await response.text();
    // Extract URL from XML response
    const urlMatch = xmlText.match(/<string xmlns="[^"]*">([^<]+)<\/string>/);
    return urlMatch ? urlMatch[1] : null;
  } catch (error) {
    console.error('Error fetching car image:', error);
    return null;
  }
};

export const fetchCarSpecs = async (make: string, model: string, year?: number) => {
  if (!API_NINJAS_KEY) {
    console.warn('API Ninjas key not set. Using mock data instead.');
    return mockCarSpecs(make, model, year);
  }
  
  try {
    const params = new URLSearchParams({ make, model });
    if (year) params.append('year', year.toString());
    
    const response = await fetch(`${API_NINJAS_URL}?${params.toString()}`, {
      headers: { 'X-Api-Key': API_NINJAS_KEY }
    });
    
    if (!response.ok) throw new Error('Failed to fetch car specifications');
    
    const data = await response.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching car specs:', error);
    return null;
  }
};

export const fetchSafetyRatings = async (make: string, model: string, year?: number) => {
  try {
    // This is a placeholder - the NHTSA API endpoint for safety ratings is more complex
    // and would need proper VIN decoding or additional parameters
    return mockSafetyRatings();
  } catch (error) {
    console.error('Error fetching safety ratings:', error);
    return null;
  }
};

// Mock data for testing when API key is not available
const mockCarSpecs = (make: string, model: string, year?: number) => {
  // Return mock data based on make/model
  const mockData = {
    make,
    model,
    year: year || 2023,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    engine: 'V6',
    horsepower: 300,
    torque: '270 lb-ft',
    drivetrain: 'AWD',
    cylinders: 6,
    displacement: 3.5,
    bodyStyle: 'SUV',
    mpgCity: 21,
    mpgHighway: 28,
    doors: 4
  };
  
  return mockData;
};

const mockSafetyRatings = () => {
  return [
    { category: 'Overall Rating', score: 4, maxScore: 5 },
    { category: 'Frontal Crash', score: 4, maxScore: 5 },
    { category: 'Side Crash', score: 5, maxScore: 5 },
    { category: 'Rollover', score: 4, maxScore: 5 },
  ];
};