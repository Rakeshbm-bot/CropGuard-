export type Language =
  | "en"
  | "hi"
  | "pa"
  | "mr"
  | "te"
  | "ta"
  | "bn"
  | "gu"
  | "kn"
  | "ml"
  | "or";

export interface UserProfile {
  id: string;
  name: string;
  phoneOrEmail: string;
  loginType: "phone" | "google" | "email";
  isLoggedIn: boolean;
  location: string;
  language: Language;
  avatar?: string;
  termsAccepted?: boolean;
  primaryCrop?: string;
  landSize?: string;
  state?: string;
  district?: string;
  taluk?: string;
}

export interface DiseaseAnalysisResult {
  id?: string;
  userId?: string;
  isValidCrop?: boolean;
  crop: string;
  diseaseName: string;
  isHealthy: boolean;
  confidence: number;
  severity: "Healthy" | "Low" | "Medium" | "High";
  symptoms: string;
  organicTreatment: string[];
  chemicalTreatment: string[];
  fertilizerAdvice: string;
  preventiveMeasures: string[];
  recommendedProducts: string[];
  urgencyNote: string;
  scannedAt?: string;
  location?: string;
  timestamp?: string;
  imageUrl?: string;
}

export interface MandiPriceItem {
  id: string;
  crop: string;
  cropLocalName: Record<string, string>;
  category: "Vegetables" | "Grains" | "Spices" | "Commercial" | "Fruits";
  market: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number; // avg price in ₹/quintal
  unit: string;
  changePercent: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
  historicalPrices: { day: string; price: number }[];
}

export interface GovtScheme {
  id: string;
  title: string;
  titleLocal: Record<string, string>;
  category:
    | "Direct Benefit Transfer"
    | "Insurance"
    | "Soil & Fertilizer"
    | "Credit & Loan"
    | "Infrastructure"
    | "Machinery & Subsidies"
    | "Solar & Irrigation"
    | "Organic & Natural Farming"
    | "Livestock & Fisheries"
    | "Horticulture & Cold Storage"
    | "Social Security & Pension"
    | "State Schemes"
    | string;
  objective: string;
  benefits: string;
  eligibility: string[];
  documents: string[];
  applyLink: string;
  state: string; // 'All India' or specific state
  helplinePhone: string;
  subsidyPercentage?: string;
  targetBeneficiaries?: string;
}

export interface FertilizerShop {
  id: string;
  name: string;
  ownerName: string;
  phone: string;
  address: string;
  area?: string;
  taluk?: string;
  district: string;
  state: string;
  pincode: string;
  distanceKm: number;
  rating: number;
  totalReviews?: number;
  verified: boolean;
  mapQuery: string;
  mapsUri?: string;
  reviewSnippet?: string;
  openingHours?: string;
  inventory: string[];
  servicesOffered?: string[];
  lat?: number;
  lng?: number;
}

export interface OfflineDiseaseItem {
  id: string;
  crop: string;
  cropNames?: Record<string, string>;
  category?: "Cash & Spices" | "Vegetables" | "Cereals & Grains" | "Fruits & Plantation" | "Pulses & Oilseeds" | string;
  symptoms: string[];
  symptomsLocal?: Record<string, string[]>;
  diseaseName: string;
  diseaseNameLocal?: Record<string, string>;
  scientificName?: string;
  severity: "Low" | "Medium" | "High";
  organicCure: string;
  organicCureLocal?: Record<string, string>;
  chemicalCure: string;
  chemicalCureLocal?: Record<string, string>;
  fertilizer: string;
  fertilizerLocal?: Record<string, string>;
  preventionTips?: string[];
  preventionTipsLocal?: Record<string, string[]>;
}

export interface WeatherHourlyItem {
  time: string;
  temp: number;
  rainProb: number;
  condition: string;
  windSpeed?: number;
}

export interface WeatherForecastItem {
  day: string;
  date?: string;
  temp: number;
  tempMax?: number;
  tempMin?: number;
  condition: string;
  rainProb: number;
  humidity?: number;
  windSpeed?: number;
  farmingAdvice?: string;
}

export interface WeatherInfo {
  locationName?: string;
  temp: number;
  tempC?: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windKm?: number;
  rainProbability: number;
  precipChance?: number;
  uvIndex?: number;
  pressureHpa?: number;
  airQuality?: string;
  sprayCondition?: "Optimal" | "Caution" | "Avoid";
  sprayAdvice?: string;
  sprayAdvisory: {
    safeToSpray: boolean;
    reason: string;
    bestTimeWindow: string;
  };
  forecast: WeatherForecastItem[];
  hourly?: WeatherHourlyItem[];
  farmingAdvisory?: {
    irrigationNeeded: boolean;
    irrigationAdvice: string;
    pestRiskLevel: "Low" | "Moderate" | "High";
    pestRiskAdvice: string;
    harvestSuitability: string;
  };
}

