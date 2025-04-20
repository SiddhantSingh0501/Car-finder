export interface CarSpec {
  make: string;
  model: string;
  year?: number;
  fuelType?: string;
  transmission?: string;
  engine?: string;
  horsepower?: number;
  torque?: string;
  drivetrain?: string;
  cylinders?: number;
  displacement?: number;
  bodyStyle?: string;
  mpgCity?: number;
  mpgHighway?: number;
  doors?: number;
}

export interface SafetyRating {
  category: string;
  score: number;
  maxScore: number;
}

export interface CarDetails {
  specs: CarSpec;
  imageUrl?: string;
  safetyRatings?: SafetyRating[];
}

export interface SearchHistory {
  id: string;
  make: string;
  model: string;
  year?: number;
  timestamp: number;
}