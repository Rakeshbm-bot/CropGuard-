import { Language } from "../types";
import { CropSuitabilityItem } from "./soilData";

interface MasterCropDefinition {
  cropName: string;
  hindiName: string;
  category: "Cereals & Grains" | "Cash Crops" | "Oilseeds" | "Pulses" | "Vegetables" | "Horticulture & Fruits" | "Spices & Plantation";
  icon: string;
  season: "Kharif (Monsoon)" | "Rabi (Winter)" | "Zaid (Summer)" | "Annual / Perennial";
  baseYield: string;
  duration: string;
  defaultWaterNeed: "Low" | "Medium" | "High";
  optimalSoils: string[];
  marginalSoils: string[];
}

export const MASTER_CROPS: MasterCropDefinition[] = [
  // 1. Cereals & Grains (15)
  { cropName: "Wheat", hindiName: "गेहूं", category: "Cereals & Grains", icon: "🌾", season: "Rabi (Winter)", baseYield: "18-24 Quintals/Acre", duration: "115-135 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "black_soil", "clay_soil"], marginalSoils: ["desert_soil", "saline_soil"] },
  { cropName: "Paddy / Rice", hindiName: "धान / चावल", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "22-30 Quintals/Acre", duration: "120-145 Days", defaultWaterNeed: "High", optimalSoils: ["clay_soil", "alluvial_soil"], marginalSoils: ["desert_soil", "laterite_soil"] },
  { cropName: "Maize (Corn)", hindiName: "मक्का", category: "Cereals & Grains", icon: "🌽", season: "Kharif (Monsoon)", baseYield: "25-32 Quintals/Acre", duration: "90-110 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil", "black_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Pearl Millet (Bajra)", hindiName: "बाजरा", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "12-16 Quintals/Acre", duration: "75-90 Days", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "red_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Sorghum (Jowar)", hindiName: "ज्वार", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "14-18 Quintals/Acre", duration: "100-115 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Barley (Jau)", hindiName: "जौ", category: "Cereals & Grains", icon: "🌾", season: "Rabi (Winter)", baseYield: "15-20 Quintals/Acre", duration: "110-125 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "saline_soil", "desert_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Finger Millet (Ragi)", hindiName: "रागी / मडुआ", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "10-14 Quintals/Acre", duration: "105-120 Days", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "laterite_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Foxtail Millet (Kangni)", hindiName: "कंगनी", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "8-12 Quintals/Acre", duration: "70-85 Days", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Kodo Millet", hindiName: "कोदो", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "7-10 Quintals/Acre", duration: "80-95 Days", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "laterite_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Little Millet (Kutki)", hindiName: "कुटकी", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "6-9 Quintals/Acre", duration: "65-80 Days", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "mountain_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Barnyard Millet (Sanwa)", hindiName: "सांवा", category: "Cereals & Grains", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "8-11 Quintals/Acre", duration: "70-80 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "red_soil", "mountain_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Proso Millet (Cheena)", hindiName: "चीना", category: "Cereals & Grains", icon: "🌾", season: "Zaid (Summer)", baseYield: "7-10 Quintals/Acre", duration: "60-70 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Oats (Jaye)", hindiName: "जई", category: "Cereals & Grains", icon: "🌾", season: "Rabi (Winter)", baseYield: "14-18 Quintals/Acre", duration: "110-120 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "mountain_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Buckwheat (Kuttu)", hindiName: "कुट्टू", category: "Cereals & Grains", icon: "🌾", season: "Rabi (Winter)", baseYield: "6-9 Quintals/Acre", duration: "65-75 Days", defaultWaterNeed: "Low", optimalSoils: ["mountain_soil", "red_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Sweet Corn", hindiName: "स्वीट कॉर्न", category: "Cereals & Grains", icon: "🌽", season: "Zaid (Summer)", baseYield: "40-50 Quintals/Acre", duration: "75-85 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["saline_soil"] },

  // 2. Pulses (15)
  { cropName: "Chickpea / Bengal Gram (Chana)", hindiName: "चना", category: "Pulses", icon: "🫘", season: "Rabi (Winter)", baseYield: "8-12 Quintals/Acre", duration: "95-115 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Pigeon Pea (Arhar / Tur)", hindiName: "अरहर / तुअर", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "7-11 Quintals/Acre", duration: "150-180 Days", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "red_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Green Gram (Moong)", hindiName: "मूंग", category: "Pulses", icon: "🫘", season: "Zaid (Summer)", baseYield: "4-7 Quintals/Acre", duration: "60-70 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "red_soil", "black_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Black Gram (Urad)", hindiName: "उड़द", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "5-8 Quintals/Acre", duration: "70-85 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Lentil (Masoor)", hindiName: "मसूर", category: "Pulses", icon: "🫘", season: "Rabi (Winter)", baseYield: "6-9 Quintals/Acre", duration: "110-125 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Field Pea (Matar)", hindiName: "मटर", category: "Pulses", icon: "🫛", season: "Rabi (Winter)", baseYield: "9-13 Quintals/Acre", duration: "85-100 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "clay_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Cowpea (Lobia)", hindiName: "लोबिया", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "6-9 Quintals/Acre", duration: "70-85 Days", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Horse Gram (Kulthi)", hindiName: "कुलथी", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "4-6 Quintals/Acre", duration: "90-100 Days", defaultWaterNeed: "Low", optimalSoils: ["laterite_soil", "red_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Moth Bean", hindiName: "मोठ", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "3-5 Quintals/Acre", duration: "65-75 Days", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "red_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Rajma (Kidney Beans)", hindiName: "राजमा", category: "Pulses", icon: "🫘", season: "Rabi (Winter)", baseYield: "8-12 Quintals/Acre", duration: "100-115 Days", defaultWaterNeed: "Medium", optimalSoils: ["mountain_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Soybean", hindiName: "सोयाबीन", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "10-14 Quintals/Acre", duration: "90-105 Days", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Broad Bean (Bakla)", hindiName: "बाकला", category: "Pulses", icon: "🫛", season: "Rabi (Winter)", baseYield: "7-10 Quintals/Acre", duration: "110-120 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Cluster Bean (Guar)", hindiName: "ग्वार", category: "Pulses", icon: "🫘", season: "Kharif (Monsoon)", baseYield: "6-9 Quintals/Acre", duration: "85-100 Days", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "alluvial_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Grass Pea (Khesari)", hindiName: "खेसारी", category: "Pulses", icon: "🫘", season: "Rabi (Winter)", baseYield: "5-8 Quintals/Acre", duration: "100-110 Days", defaultWaterNeed: "Low", optimalSoils: ["clay_soil", "black_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Green Chickpea (Hara Chana)", hindiName: "हरा चना", category: "Pulses", icon: "🫘", season: "Rabi (Winter)", baseYield: "15-20 Quintals/Acre", duration: "80-90 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },

  // 3. Oilseeds (12)
  { cropName: "Mustard (Sarson / Rai)", hindiName: "सरसों / राई", category: "Oilseeds", icon: "🌻", season: "Rabi (Winter)", baseYield: "8-12 Quintals/Acre", duration: "105-125 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "saline_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Groundnut (Peanut)", hindiName: "मूंगफली", category: "Oilseeds", icon: "🥜", season: "Kharif (Monsoon)", baseYield: "12-16 Quintals/Acre", duration: "110-125 Days", defaultWaterNeed: "Medium", optimalSoils: ["red_soil", "alluvial_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Sunflower", hindiName: "सूरजमुखी", category: "Oilseeds", icon: "🌻", season: "Rabi (Winter)", baseYield: "8-11 Quintals/Acre", duration: "90-100 Days", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Sesame (Til)", hindiName: "तिल", category: "Oilseeds", icon: "🌱", season: "Kharif (Monsoon)", baseYield: "3-5 Quintals/Acre", duration: "75-85 Days", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "alluvial_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Castor (Arandi)", hindiName: "अरंडी", category: "Oilseeds", icon: "🌱", season: "Kharif (Monsoon)", baseYield: "10-14 Quintals/Acre", duration: "150-180 Days", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "red_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Linseed (Alsi / Flax)", hindiName: "अलसी", category: "Oilseeds", icon: "🌱", season: "Rabi (Winter)", baseYield: "5-7 Quintals/Acre", duration: "115-130 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Safflower (Kusum)", hindiName: "कुसुम", category: "Oilseeds", icon: "🌼", season: "Rabi (Winter)", baseYield: "6-9 Quintals/Acre", duration: "120-135 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Niger Seed (Ramtil)", hindiName: "रामतिल", category: "Oilseeds", icon: "🌱", season: "Kharif (Monsoon)", baseYield: "2-4 Quintals/Acre", duration: "95-105 Days", defaultWaterNeed: "Low", optimalSoils: ["laterite_soil", "red_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Toria", hindiName: "तोरिया", category: "Oilseeds", icon: "🌼", season: "Rabi (Winter)", baseYield: "5-8 Quintals/Acre", duration: "70-85 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Tarameera", hindiName: "तारामीरा", category: "Oilseeds", icon: "🌱", season: "Rabi (Winter)", baseYield: "4-6 Quintals/Acre", duration: "90-100 Days", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "saline_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Canola", hindiName: "कनोला", category: "Oilseeds", icon: "🌼", season: "Rabi (Winter)", baseYield: "9-13 Quintals/Acre", duration: "115-130 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "mountain_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Karanj (Pongamia)", hindiName: "करंज", category: "Oilseeds", icon: "🌳", season: "Annual / Perennial", baseYield: "20-30 kg Seed/Tree", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["saline_soil", "laterite_soil"], marginalSoils: [] },

  // 4. Cash Crops (12)
  { cropName: "Cotton (Kapas)", hindiName: "कपास", category: "Cash Crops", icon: "☁️", season: "Kharif (Monsoon)", baseYield: "12-16 Quintals/Acre", duration: "150-180 Days", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["laterite_soil", "saline_soil"] },
  { cropName: "Sugarcane (Ganna)", hindiName: "गन्ना", category: "Cash Crops", icon: "🎋", season: "Annual / Perennial", baseYield: "350-450 Quintals/Acre", duration: "330-365 Days", defaultWaterNeed: "High", optimalSoils: ["alluvial_soil", "black_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Jute (Pat)", hindiName: "जूट / पटसन", category: "Cash Crops", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "12-15 Quintals/Acre", duration: "110-130 Days", defaultWaterNeed: "High", optimalSoils: ["clay_soil", "alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Tobacco (Tambaku)", hindiName: "तंबाकू", category: "Cash Crops", icon: "🍃", season: "Rabi (Winter)", baseYield: "8-12 Quintals/Acre", duration: "110-130 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Tea (Chai)", hindiName: "चाय", category: "Cash Crops", icon: "🍵", season: "Annual / Perennial", baseYield: "1200-1800 kg/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil", "mountain_soil"], marginalSoils: ["saline_soil", "desert_soil", "black_soil"] },
  { cropName: "Coffee (Arabica / Robusta)", hindiName: "कॉफी", category: "Cash Crops", icon: "☕", season: "Annual / Perennial", baseYield: "600-900 kg/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["laterite_soil", "mountain_soil"], marginalSoils: ["saline_soil", "black_soil"] },
  { cropName: "Rubber", hindiName: "रबर", category: "Cash Crops", icon: "🪵", season: "Annual / Perennial", baseYield: "700-1000 kg Latex/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil"], marginalSoils: ["desert_soil", "saline_soil"] },
  { cropName: "Areca Nut (Supari)", hindiName: "सुपारी", category: "Cash Crops", icon: "🌴", season: "Annual / Perennial", baseYield: "8-12 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil", "alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Betel Leaf (Paan)", hindiName: "पान", category: "Cash Crops", icon: "🍃", season: "Annual / Perennial", baseYield: "50-70 Lakh Leaves/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["clay_soil", "alluvial_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Mesta (Kenaf)", hindiName: "मेस्टा", category: "Cash Crops", icon: "🌾", season: "Kharif (Monsoon)", baseYield: "8-11 Quintals/Acre", duration: "120-140 Days", defaultWaterNeed: "Medium", optimalSoils: ["red_soil", "laterite_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Stevia (Meethi Tulsi)", hindiName: "स्टीविया", category: "Cash Crops", icon: "🌿", season: "Annual / Perennial", baseYield: "10-15 Quintals Dry Leaves/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["red_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Indigo (Neel)", hindiName: "नील", category: "Cash Crops", icon: "🌱", season: "Kharif (Monsoon)", baseYield: "8-12 Quintals/Acre", duration: "110-120 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["clay_soil"] },

  // 5. Vegetables (25)
  { cropName: "Tomato (Tamatar)", hindiName: "टमाटर", category: "Vegetables", icon: "🍅", season: "Rabi (Winter)", baseYield: "180-240 Quintals/Acre", duration: "110-130 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil", "black_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Potato (Aloo)", hindiName: "आलू", category: "Vegetables", icon: "🥔", season: "Rabi (Winter)", baseYield: "100-140 Quintals/Acre", duration: "80-100 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil"], marginalSoils: ["clay_soil", "saline_soil"] },
  { cropName: "Onion (Pyaaz)", hindiName: "प्याज", category: "Vegetables", icon: "🧅", season: "Rabi (Winter)", baseYield: "90-130 Quintals/Acre", duration: "120-140 Days", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Garlic (Lahsun)", hindiName: "लहसुन", category: "Vegetables", icon: "🧄", season: "Rabi (Winter)", baseYield: "35-50 Quintals/Acre", duration: "130-150 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Chilli (Mirchi)", hindiName: "हरी मिर्च", category: "Vegetables", icon: "🌶️", season: "Kharif (Monsoon)", baseYield: "40-60 Quintals Fresh/Acre", duration: "140-160 Days", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "red_soil", "alluvial_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Brinjal / Eggplant (Baingan)", hindiName: "बैंगन", category: "Vegetables", icon: "🍆", season: "Kharif (Monsoon)", baseYield: "120-160 Quintals/Acre", duration: "120-140 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "black_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Okra / Ladyfinger (Bhindi)", hindiName: "भिंडी", category: "Vegetables", icon: "🌱", season: "Zaid (Summer)", baseYield: "45-65 Quintals/Acre", duration: "60-80 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Cauliflower (Phool Gobhi)", hindiName: "फूलगोभी", category: "Vegetables", icon: "🥦", season: "Rabi (Winter)", baseYield: "80-120 Quintals/Acre", duration: "80-100 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Cabbage (Patta Gobhi)", hindiName: "पत्तागोभी", category: "Vegetables", icon: "🥬", season: "Rabi (Winter)", baseYield: "90-130 Quintals/Acre", duration: "75-95 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Carrot (Gajar)", hindiName: "गाजर", category: "Vegetables", icon: "🥕", season: "Rabi (Winter)", baseYield: "90-120 Quintals/Acre", duration: "85-100 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Radish (Mooli)", hindiName: "मूली", category: "Vegetables", icon: "🌱", season: "Rabi (Winter)", baseYield: "80-110 Quintals/Acre", duration: "40-55 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Beetroot (Chukandar)", hindiName: "चुकंदर", category: "Vegetables", icon: "🪴", season: "Rabi (Winter)", baseYield: "80-110 Quintals/Acre", duration: "75-90 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "saline_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Spinach (Palak)", hindiName: "पालक", category: "Vegetables", icon: "🥬", season: "Rabi (Winter)", baseYield: "50-70 Quintals/Acre", duration: "35-50 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "saline_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Fenugreek Leaves (Methi)", hindiName: "मेथी", category: "Vegetables", icon: "🌿", season: "Rabi (Winter)", baseYield: "35-50 Quintals/Acre", duration: "40-55 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Bottle Gourd (Lauki)", hindiName: "लौकी", category: "Vegetables", icon: "🥒", season: "Zaid (Summer)", baseYield: "120-160 Quintals/Acre", duration: "60-75 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "clay_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Bitter Gourd (Karela)", hindiName: "करेला", category: "Vegetables", icon: "🥒", season: "Zaid (Summer)", baseYield: "50-70 Quintals/Acre", duration: "70-85 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Ridge Gourd (Turai)", hindiName: "तुरई", category: "Vegetables", icon: "🥒", season: "Kharif (Monsoon)", baseYield: "45-65 Quintals/Acre", duration: "65-80 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Sponge Gourd (Ghilki)", hindiName: "गिलकी", category: "Vegetables", icon: "🥒", season: "Kharif (Monsoon)", baseYield: "50-70 Quintals/Acre", duration: "60-75 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Cucumber (Kheera)", hindiName: "खीरा", category: "Vegetables", icon: "🥒", season: "Zaid (Summer)", baseYield: "70-100 Quintals/Acre", duration: "50-65 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "desert_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Pumpkin (Kaddu)", hindiName: "कद्दू / सीताफल", category: "Vegetables", icon: "🎃", season: "Kharif (Monsoon)", baseYield: "110-150 Quintals/Acre", duration: "90-110 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil", "black_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Watermelon (Tarbooz)", hindiName: "तरबूज", category: "Vegetables", icon: "🍉", season: "Zaid (Summer)", baseYield: "150-200 Quintals/Acre", duration: "80-95 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Muskmelon (Kharbooza)", hindiName: "खरबूजा", category: "Vegetables", icon: "🍈", season: "Zaid (Summer)", baseYield: "90-120 Quintals/Acre", duration: "75-90 Days", defaultWaterNeed: "Medium", optimalSoils: ["desert_soil", "alluvial_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Capsicum (Shimla Mirch)", hindiName: "शिमला मिर्च", category: "Vegetables", icon: "🫑", season: "Rabi (Winter)", baseYield: "80-110 Quintals/Acre", duration: "90-110 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "mountain_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Green Peas (Matar Phalli)", hindiName: "हरी मटर", category: "Vegetables", icon: "🫛", season: "Rabi (Winter)", baseYield: "30-45 Quintals/Acre", duration: "65-80 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "mountain_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Drumstick (Moringa)", hindiName: "सहजन", category: "Vegetables", icon: "🌳", season: "Annual / Perennial", baseYield: "80-120 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "desert_soil", "alluvial_soil"], marginalSoils: ["clay_soil"] },

  // 6. Horticulture & Fruits (16)
  { cropName: "Mango (Aam)", hindiName: "आम", category: "Horticulture & Fruits", icon: "🥭", season: "Annual / Perennial", baseYield: "50-80 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Banana (Kela)", hindiName: "केला", category: "Horticulture & Fruits", icon: "🍌", season: "Annual / Perennial", baseYield: "250-350 Quintals/Acre", duration: "330-365 Days", defaultWaterNeed: "High", optimalSoils: ["alluvial_soil", "black_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
  { cropName: "Guava (Amrood)", hindiName: "अमरूद", category: "Horticulture & Fruits", icon: "🍈", season: "Annual / Perennial", baseYield: "60-90 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "red_soil", "saline_soil"], marginalSoils: [] },
  { cropName: "Pomegranate (Anar)", hindiName: "अनार", category: "Horticulture & Fruits", icon: "🍎", season: "Annual / Perennial", baseYield: "40-60 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "red_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Citrus / Sweet Orange (Mosambi)", hindiName: "मौसमी", category: "Horticulture & Fruits", icon: "🍊", season: "Annual / Perennial", baseYield: "50-70 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Kinnow / Mandarin", hindiName: "किन्नू", category: "Horticulture & Fruits", icon: "🍊", season: "Annual / Perennial", baseYield: "70-100 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Papaya (Papita)", hindiName: "पपीता", category: "Horticulture & Fruits", icon: "🍈", season: "Annual / Perennial", baseYield: "200-300 Quintals/Acre", duration: "10-12 Months", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil"], marginalSoils: ["clay_soil", "saline_soil"] },
  { cropName: "Grapes (Angoor)", hindiName: "अंगूर", category: "Horticulture & Fruits", icon: "🍇", season: "Annual / Perennial", baseYield: "80-120 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["black_soil", "red_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Apple (Seb)", hindiName: "सेब", category: "Horticulture & Fruits", icon: "🍎", season: "Annual / Perennial", baseYield: "60-90 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["mountain_soil"], marginalSoils: ["desert_soil", "saline_soil", "black_soil"] },
  { cropName: "Ber / Indian Jujube", hindiName: "बेर", category: "Horticulture & Fruits", icon: "🫒", season: "Annual / Perennial", baseYield: "40-60 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "saline_soil"], marginalSoils: [] },
  { cropName: "Aonla / Indian Gooseberry", hindiName: "आंवला", category: "Horticulture & Fruits", icon: "🟢", season: "Annual / Perennial", baseYield: "50-75 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["saline_soil", "alluvial_soil", "red_soil"], marginalSoils: [] },
  { cropName: "Sapota / Chiku", hindiName: "चीकू", category: "Horticulture & Fruits", icon: "🥔", season: "Annual / Perennial", baseYield: "70-100 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil", "saline_soil"], marginalSoils: [] },
  { cropName: "Litchi", hindiName: "लीची", category: "Horticulture & Fruits", icon: "🍒", season: "Annual / Perennial", baseYield: "40-60 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["alluvial_soil"], marginalSoils: ["desert_soil", "saline_soil"] },
  { cropName: "Cashew (Kaju)", hindiName: "काजू", category: "Horticulture & Fruits", icon: "🥜", season: "Annual / Perennial", baseYield: "8-12 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["laterite_soil", "red_soil"], marginalSoils: ["clay_soil", "black_soil"] },
  { cropName: "Coconut (Nariyal)", hindiName: "नारियल", category: "Horticulture & Fruits", icon: "🥥", season: "Annual / Perennial", baseYield: "60-80 Nuts/Tree/Year", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "laterite_soil", "saline_soil"], marginalSoils: ["mountain_soil"] },
  { cropName: "Custard Apple (Sitaphal)", hindiName: "सीताफल / शरीफा", category: "Horticulture & Fruits", icon: "🍈", season: "Annual / Perennial", baseYield: "30-50 Quintals/Acre", duration: "Perennial", defaultWaterNeed: "Low", optimalSoils: ["red_soil", "black_soil"], marginalSoils: [] },

  // 7. Spices & Plantation (15)
  { cropName: "Ginger (Adrak)", hindiName: "अदरक", category: "Spices & Plantation", icon: "🫚", season: "Kharif (Monsoon)", baseYield: "70-100 Quintals/Acre", duration: "210-240 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "laterite_soil", "red_soil"], marginalSoils: ["clay_soil", "saline_soil"] },
  { cropName: "Turmeric (Haldi)", hindiName: "हल्दी", category: "Spices & Plantation", icon: "🟡", season: "Kharif (Monsoon)", baseYield: "80-120 Quintals/Acre", duration: "240-270 Days", defaultWaterNeed: "Medium", optimalSoils: ["alluvial_soil", "red_soil", "black_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Coriander (Dhaniya)", hindiName: "धनिया", category: "Spices & Plantation", icon: "🌿", season: "Rabi (Winter)", baseYield: "6-9 Quintals/Acre", duration: "80-100 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Cumin (Jeera)", hindiName: "जीरा", category: "Spices & Plantation", icon: "🌾", season: "Rabi (Winter)", baseYield: "3-5 Quintals/Acre", duration: "90-110 Days", defaultWaterNeed: "Low", optimalSoils: ["desert_soil", "alluvial_soil"], marginalSoils: ["clay_soil", "laterite_soil"] },
  { cropName: "Fennel (Saunf)", hindiName: "सौंफ", category: "Spices & Plantation", icon: "🌿", season: "Rabi (Winter)", baseYield: "6-9 Quintals/Acre", duration: "130-150 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "desert_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Fenugreek Seed (Methi Dana)", hindiName: "मेथी दाना", category: "Spices & Plantation", icon: "🫘", season: "Rabi (Winter)", baseYield: "6-8 Quintals/Acre", duration: "100-115 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Black Pepper (Kali Mirch)", hindiName: "काली मिर्च", category: "Spices & Plantation", icon: "🫒", season: "Annual / Perennial", baseYield: "400-600 kg/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil", "mountain_soil"], marginalSoils: ["desert_soil", "saline_soil", "black_soil"] },
  { cropName: "Cardamom (Elaichi)", hindiName: "इलायची", category: "Spices & Plantation", icon: "🟢", season: "Annual / Perennial", baseYield: "150-250 kg/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["mountain_soil", "laterite_soil"], marginalSoils: ["desert_soil", "saline_soil", "black_soil"] },
  { cropName: "Clove (Laung)", hindiName: "लौंग", category: "Spices & Plantation", icon: "🌱", season: "Annual / Perennial", baseYield: "100-180 kg/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil", "mountain_soil"], marginalSoils: ["desert_soil", "saline_soil"] },
  { cropName: "Nutmeg (Jaiphal)", hindiName: "जायफल", category: "Spices & Plantation", icon: "🌰", season: "Annual / Perennial", baseYield: "200-300 kg/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil", "clay_soil"], marginalSoils: ["desert_soil", "saline_soil"] },
  { cropName: "Cinnamon (Dalchini)", hindiName: "दालचीनी", category: "Spices & Plantation", icon: "🪵", season: "Annual / Perennial", baseYield: "100-150 kg Bark/Acre", duration: "Perennial", defaultWaterNeed: "High", optimalSoils: ["laterite_soil", "mountain_soil"], marginalSoils: ["saline_soil"] },
  { cropName: "Ajwain / Carom Seeds", hindiName: "अजवाइन", category: "Spices & Plantation", icon: "🌾", season: "Rabi (Winter)", baseYield: "4-6 Quintals/Acre", duration: "120-135 Days", defaultWaterNeed: "Low", optimalSoils: ["black_soil", "alluvial_soil"], marginalSoils: ["clay_soil"] },
  { cropName: "Dill Seed (Sowa)", hindiName: "सोवा", category: "Spices & Plantation", icon: "🌿", season: "Rabi (Winter)", baseYield: "4-6 Quintals/Acre", duration: "100-115 Days", defaultWaterNeed: "Low", optimalSoils: ["alluvial_soil", "black_soil"], marginalSoils: ["laterite_soil"] },
  { cropName: "Saffron (Kesar)", hindiName: "केसर", category: "Spices & Plantation", icon: "🌸", season: "Rabi (Winter)", baseYield: "2-3 kg/Acre", duration: "Perennial", defaultWaterNeed: "Medium", optimalSoils: ["mountain_soil"], marginalSoils: ["desert_soil", "saline_soil", "black_soil"] },
  { cropName: "Mint / Mentha (Pudina)", hindiName: "मेंथा / पुदीना", category: "Spices & Plantation", icon: "🌿", season: "Zaid (Summer)", baseYield: "40-60 kg Oil/Acre", duration: "90-105 Days", defaultWaterNeed: "High", optimalSoils: ["alluvial_soil", "clay_soil"], marginalSoils: ["desert_soil"] },
];

/**
 * Agronomic adapter that maps crops to any soil with tailored score and recommendations.
 * Preserves custom high-priority crops and fills with extended master catalog to ensure
 * EVERY soil has 100+ fully-annotated crops.
 */
export function getExtendedCropsForSoil(soilId: string, initialCrops: CropSuitabilityItem[] = []): CropSuitabilityItem[] {
  const initialNames = new Set(
    initialCrops.map((c) => c.cropName.toLowerCase().split("(")[0].trim())
  );

  const generated = MASTER_CROPS
    .filter((c) => !initialNames.has(c.cropName.toLowerCase().split("(")[0].trim()))
    .map((c, index) => {
    const isOptimal = c.optimalSoils.includes(soilId);
    const isMarginal = c.marginalSoils.includes(soilId);

    // Calculate score (optimal 88-98, moderate 70-87, marginal 52-68)
    let score = isOptimal
      ? 90 + ((index * 7) % 9)
      : isMarginal
      ? 52 + ((index * 5) % 17)
      : 72 + ((index * 9) % 16);

    // Soil-specific nuances
    if (soilId === "desert_soil" && c.defaultWaterNeed === "Low") {
      score += 4;
    }
    if (soilId === "clay_soil" && c.defaultWaterNeed === "High") {
      score += 3;
    }
    if (soilId === "saline_soil") {
      if (!isOptimal) score = Math.max(50, score - 8);
    }

    score = Math.min(99, Math.max(50, score));

    let level: CropSuitabilityItem["suitabilityLevel"] = "Moderate (Needs Care)";
    if (score >= 90) level = "Optimal (Top Pick)";
    else if (score >= 78) level = "Highly Suitable";
    else if (score < 65) level = "Marginal";

    const localNames: Partial<Record<Language, string>> = {
      en: c.cropName,
      hi: `${c.hindiName} (${c.cropName})`,
      pa: c.hindiName,
      mr: c.hindiName,
      te: c.cropName,
      ta: c.cropName,
      bn: c.hindiName,
      gu: c.hindiName,
      kn: c.cropName,
    };

    return {
      cropName: c.cropName,
      localCropName: localNames,
      icon: c.icon,
      category: c.category,
      suitabilityScore: score,
      suitabilityLevel: level,
      season: c.season,
      waterNeed: c.defaultWaterNeed,
      expectedYield: c.baseYield,
      durationDays: c.duration,
      whyItGrowsWell: isOptimal
        ? `Soil texture, mineral profile, and pH strongly support root aeration and high yields for ${c.cropName}.`
        : isMarginal
        ? `Can be grown with targeted organic amendments, ridge-bed planting, and managed fertigation.`
        : `Well-adapted to local climatic conditions with balanced standard fertilization.`,
      fieldPreparationTip: isOptimal
        ? `Plough twice to a fine tilth; mix 3-4 tonnes FYM compost per acre before final harrowing.`
        : `Apply bio-fertilizers and organic mulch to buffer root zone against moisture or mineral stress.`,
      recommendedFertilizer:
        c.category === "Pulses"
          ? "NPK 20:40:20 + Rhizobium seed inoculation @ 250g/acre"
          : c.category === "Oilseeds"
          ? "NPK 40:20:20 + Sulphur 10 kg/acre for higher oil content"
          : c.category === "Vegetables"
          ? "NPK 50:50:50 basal + micronutrient spray at 30 & 50 DAT"
          : "NPK 60:30:30 with split nitrogen application during peak vegetative stage",
    };
  });

  return [...initialCrops, ...generated];
}
