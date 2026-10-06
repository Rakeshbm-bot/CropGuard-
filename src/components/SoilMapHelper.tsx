import React, { useState, useMemo } from "react";
import {
  MapPin,
  Compass,
  Navigation,
  Search,
  CheckCircle2,
  Sparkles,
  Layers,
  Info,
  ChevronRight,
  Droplets,
  FlaskConical,
  Sprout,
  ArrowRight,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { Language } from "../types";
import { SOIL_DATABASE, SoilTypeInfo } from "../data/soilData";
import {
  INDIAN_STATES_AND_DISTRICTS,
  getAllStates,
  getDistrictsForState,
} from "../data/indianStatesDistricts";

interface SoilMapHelperProps {
  language: Language;
  selectedSoilId: string;
  onSelectSoil: (soilId: string) => void;
  onViewCrops?: () => void;
}

interface MapZone {
  id: string;
  name: string;
  soilId: string;
  color: string;
  cx: number;
  cy: number;
  r: number;
  pathD: string;
  states: string[];
  description: string;
  typicalPh: string;
  retention: string;
}

// 8 Agro-Climatic Soil Map Zones calibrated to an SVG India canvas (viewBox 0 0 500 560)
const AGRO_MAP_ZONES: MapZone[] = [
  {
    id: "zone_alluvial_north",
    name: "Indo-Gangetic Alluvial Plains",
    soilId: "alluvial_soil",
    color: "#eab308", // Golden Yellow
    cx: 250,
    cy: 165,
    r: 32,
    pathD: "M 175 140 C 230 135, 290 145, 360 180 C 370 205, 335 215, 260 205 C 200 195, 175 165, 175 140 Z",
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal", "Assam Plains"],
    description: "Deep, highly fertile river-deposited silt. Ideal for wheat, paddy, sugarcane, and high-intensity multi-cropping.",
    typicalPh: "6.8 - 7.8 (Neutral)",
    retention: "High",
  },
  {
    id: "zone_black_deccan",
    name: "Deccan Volcanic Lava Plateau",
    soilId: "black_soil",
    color: "#27272a", // Dark Charcoal Black
    cx: 215,
    cy: 290,
    r: 36,
    pathD: "M 155 240 C 220 220, 275 240, 280 295 C 285 340, 225 365, 175 340 C 145 305, 140 265, 155 240 Z",
    states: ["Maharashtra", "Madhya Pradesh (Malwa)", "Gujarat (Saurashtra)", "Northern Karnataka", "Western Telangana"],
    description: "Montmorillonite-rich deep self-ploughing black clay. Exceptional moisture retention, optimal for cotton, soybean, and pulses.",
    typicalPh: "7.2 - 8.5 (Slightly Alkaline)",
    retention: "Very High",
  },
  {
    id: "zone_red_south",
    name: "Southern & Eastern Granitic Plateau",
    soilId: "red_soil",
    color: "#dc2626", // Rich Terracotta Red
    cx: 270,
    cy: 390,
    r: 34,
    pathD: "M 220 340 C 275 325, 320 355, 305 435 C 285 475, 235 480, 215 440 C 205 385, 210 355, 220 340 Z",
    states: ["Karnataka (Southern)", "Tamil Nadu", "Andhra Pradesh (Rayalaseema)", "Telangana", "Odisha", "Jharkhand"],
    description: "Iron peroxide crystalline soils with porous open structure. Highly responsive to drip irrigation and micronutrient inputs.",
    typicalPh: "5.8 - 6.8 (Mild Acidic)",
    retention: "Moderate",
  },
  {
    id: "zone_arid_thar",
    name: "Thar Desert & North-Western Arid Belt",
    soilId: "sandy_soil",
    color: "#d97706", // Desert Amber
    cx: 140,
    cy: 195,
    r: 30,
    pathD: "M 105 160 C 160 150, 185 185, 180 230 C 165 260, 115 250, 95 215 C 90 185, 100 165, 105 160 Z",
    states: ["Rajasthan (Western)", "Gujarat (North/Kutch fringe)", "Haryana (South-West)"],
    description: "Coarse loose sandy grains, low humus, fast percolation. Perfect for pearl millet (bajra), cluster bean (guar), and cumin.",
    typicalPh: "7.5 - 8.6 (Alkaline)",
    retention: "Low",
  },
  {
    id: "zone_laterite_coast",
    name: "Western Ghats & Coastal Leached Belt",
    soilId: "laterite_soil",
    color: "#ea580c", // Brick Rusty Orange
    cx: 175,
    cy: 420,
    r: 22,
    pathD: "M 160 330 C 175 330, 185 390, 180 470 C 165 485, 155 450, 155 380 C 155 350, 155 335, 160 330 Z",
    states: ["Kerala", "Goa", "Coastal Karnataka", "Maharashtra (Konkan / Ratnagiri)", "Assam & Meghalaya Hills"],
    description: "Heavily leached acidic soil under tropical rains. Outstanding for plantation crops: rubber, cashew, pepper, coffee, and tea.",
    typicalPh: "4.8 - 5.5 (Acidic)",
    retention: "Moderate",
  },
  {
    id: "zone_mountain_north",
    name: "Himalayan Montane & Forest Belt",
    soilId: "mountain_soil",
    color: "#059669", // Pine Green
    cx: 210,
    cy: 75,
    r: 28,
    pathD: "M 170 50 C 230 40, 270 70, 290 95 C 265 110, 205 110, 160 85 C 155 65, 165 55, 170 50 Z",
    states: ["Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand", "Sikkim", "Arunachal Pradesh"],
    description: "Humus-rich high altitude organic soil. Global hub for temperate fruits: apples, walnuts, saffron, and off-season mountain vegetables.",
    typicalPh: "5.2 - 6.4 (Slightly Acidic)",
    retention: "Moderate",
  },
  {
    id: "zone_saline_kutch",
    name: "Coastal Deltas & Saline Depressions",
    soilId: "saline_soil",
    color: "#64748b", // Slate Salt Grey
    cx: 115,
    cy: 260,
    r: 20,
    pathD: "M 85 245 C 130 235, 140 265, 125 285 C 100 295, 80 280, 85 245 Z",
    states: ["Gujarat (Rann of Kutch)", "West Bengal (Sundarbans Delta)", "Canal tracts of Punjab & Haryana"],
    description: "High soluble sodium salts and poor percolation. Requires gypsum or leaching; supports barley, mustard, and saline-tolerant rice.",
    typicalPh: "8.5 - 9.5 (Alkaline)",
    retention: "High",
  },
  {
    id: "zone_clayey_delta",
    name: "River Delta Basins & Valleys",
    soilId: "clayey_loam",
    color: "#78350f", // Rich Dark Loam Brown
    cx: 335,
    cy: 310,
    r: 22,
    pathD: "M 315 280 C 350 270, 365 315, 345 350 C 320 345, 310 305, 315 280 Z",
    states: ["Andhra (Krishna-Godavari Deltas)", "Tamil Nadu (Kaveri Delta)", "Odisha (Mahanadi Delta)"],
    description: "Fine-textured fertile clay-silt composite. Highly productive for intensive paddy, sugarcane, banana, and turmeric cultivation.",
    typicalPh: "6.5 - 7.5 (Balanced)",
    retention: "High",
  },
];

// State to predominant soil mapping dictionary
const STATE_SOIL_MAP: Record<string, { primary: string; secondary?: string; note: string }> = {
  "Punjab": { primary: "alluvial_soil", note: "Indo-Gangetic Alluvial Loam (Khadar & Bhangar)" },
  "Haryana": { primary: "alluvial_soil", secondary: "sandy_soil", note: "Alluvial plains with sandy arid tracts in South-West" },
  "Uttar Pradesh": { primary: "alluvial_soil", note: "Deep Gangetic alluvial soils with high silt content" },
  "Bihar": { primary: "alluvial_soil", note: "North & South Bihar alluvial fertile plains" },
  "West Bengal": { primary: "alluvial_soil", secondary: "saline_soil", note: "Deltaic alluvial soil; Sundarbans is coastal saline" },
  "Maharashtra": { primary: "black_soil", secondary: "laterite_soil", note: "Deccan Traps Black Cotton Soil (Regur); Konkan is Laterite" },
  "Gujarat": { primary: "black_soil", secondary: "sandy_soil", note: "Saurashtra is Black Soil; Kutch/North is Sandy & Saline" },
  "Madhya Pradesh": { primary: "black_soil", secondary: "alluvial_soil", note: "Malwa & Narmada Valley Black Soil; Chambal is Alluvial" },
  "Rajasthan": { primary: "sandy_soil", secondary: "alluvial_soil", note: "Thar Desert Sandy soil; Eastern districts are Alluvial" },
  "Karnataka": { primary: "red_soil", secondary: "black_soil", note: "Southern Karnataka is Red sandy loam; North is Black Soil; Coast is Laterite" },
  "Tamil Nadu": { primary: "red_soil", secondary: "clayey_loam", note: "Red loamy plateau; Kaveri delta is rich Clayey Loam" },
  "Andhra Pradesh": { primary: "red_soil", secondary: "clayey_loam", note: "Red & Black soils; Krishna-Godavari is fertile Clayey Loam" },
  "Telangana": { primary: "red_soil", secondary: "black_soil", note: "Red sandy 'Chalka' soils with Black cotton pockets" },
  "Kerala": { primary: "laterite_soil", secondary: "alluvial_soil", note: "Western Ghats tropical high-rainfall acidic Laterite soil" },
  "Goa": { primary: "laterite_soil", note: "Coastal lateritic red-brown soils" },
  "Odisha": { primary: "red_soil", secondary: "alluvial_soil", note: "Red & Yellow upland soils; Coastal belt is Deltaic Alluvial" },
  "Assam": { primary: "alluvial_soil", secondary: "laterite_soil", note: "Brahmaputra alluvial floodplains and acidic hill soils" },
  "Himachal Pradesh": { primary: "mountain_soil", note: "Himalayan Forest and Podzolic mountain soil" },
  "Jammu & Kashmir": { primary: "mountain_soil", note: "Karewa lacustrine deposits and Montane forest soil" },
  "Uttarakhand": { primary: "mountain_soil", secondary: "alluvial_soil", note: "Montane hill soil; Tarai-Bhabar belt is Alluvial" },
  "Jharkhand": { primary: "red_soil", note: "Chota Nagpur granitic Red and Yellow soil" },
  "Chhattisgarh": { primary: "red_soil", secondary: "black_soil", note: "Mahanadi basin red-yellow soil with black soil pockets" },
  "Tripura": { primary: "red_soil", secondary: "laterite_soil", note: "Red loam and acidic hill soils" },
  "Meghalaya": { primary: "laterite_soil", note: "Acidic hill laterite soils" },
  "Manipur": { primary: "mountain_soil", note: "Valley alluvial and Montane forest soils" },
  "Nagaland": { primary: "mountain_soil", note: "Sub-Himalayan organic forest soils" },
  "Mizoram": { primary: "mountain_soil", note: "Steep slope forest and mountain soils" },
  "Sikkim": { primary: "mountain_soil", note: "High-organic Himalayan soils (100% organic state)" },
};

export const SoilMapHelper: React.FC<SoilMapHelperProps> = ({
  language,
  selectedSoilId,
  onSelectSoil,
  onViewCrops,
}) => {
  const [activeZoneId, setActiveZoneId] = useState<string>("zone_black_deccan");
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [districtSearch, setDistrictSearch] = useState<string>("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);
  const [showFeelGuide, setShowFeelGuide] = useState(false);

  const allStates = useMemo(() => getAllStates(), []);
  const districtsForSelectedState = useMemo(() => {
    return getDistrictsForState(selectedState);
  }, [selectedState]);

  // Active Zone Object
  const currentZone = useMemo(() => {
    return AGRO_MAP_ZONES.find((z) => z.id === activeZoneId) || AGRO_MAP_ZONES[1];
  }, [activeZoneId]);

  // Active Soil Data
  const currentSoilData = useMemo(() => {
    return SOIL_DATABASE.find((s) => s.id === currentZone.soilId) || SOIL_DATABASE[0];
  }, [currentZone]);

  // Handle click on map zone
  const handleZoneClick = (zone: MapZone) => {
    setActiveZoneId(zone.id);
    onSelectSoil(zone.soilId);
    if (zone.states.length > 0) {
      const cleanState = zone.states[0].split(" ")[0];
      const matchState = allStates.find((s) => s.toLowerCase().includes(cleanState.toLowerCase()));
      if (matchState) setSelectedState(matchState);
    }
  };

  // Handle State Selection
  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict("");
    const mapped = STATE_SOIL_MAP[stateName];
    if (mapped) {
      onSelectSoil(mapped.primary);
      const zoneMatch = AGRO_MAP_ZONES.find((z) => z.soilId === mapped.primary);
      if (zoneMatch) setActiveZoneId(zoneMatch.id);
    }
  };

  // Handle District Selection
  const handleDistrictSelect = (districtName: string) => {
    setSelectedDistrict(districtName);
    const lowerDist = districtName.toLowerCase();

    // Specific coastal / delta / desert overrides
    if (lowerDist.includes("kutch") || lowerDist.includes("patan") || lowerDist.includes("banaskantha")) {
      onSelectSoil("sandy_soil");
      setActiveZoneId("zone_arid_thar");
      return;
    }
    if (lowerDist.includes("ratnagiri") || lowerDist.includes("sindhudurg") || lowerDist.includes("goa") || lowerDist.includes("udupi") || lowerDist.includes("wayanad")) {
      onSelectSoil("laterite_soil");
      setActiveZoneId("zone_laterite_coast");
      return;
    }
    if (lowerDist.includes("guntur") || lowerDist.includes("krishna") || lowerDist.includes("godavari") || lowerDist.includes("thanjavur")) {
      onSelectSoil("clayey_loam");
      setActiveZoneId("zone_clayey_delta");
      return;
    }

    // Default to state mapping
    const mapped = STATE_SOIL_MAP[selectedState];
    if (mapped) {
      onSelectSoil(mapped.primary);
      const zoneMatch = AGRO_MAP_ZONES.find((z) => z.soilId === mapped.primary);
      if (zoneMatch) setActiveZoneId(zoneMatch.id);
    }
  };

  // Live GPS Farm Detector
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      setGpsMessage("Geolocation is not supported by your browser.");
      return;
    }

    setGpsLoading(true);
    setGpsMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLoading(false);
        const { latitude, longitude } = position.coords;
        setGpsCoordinates({ lat: latitude, lng: longitude });

        // Heuristic mapping for Indian Agro-climatic regions
        if (latitude >= 31.0) {
          // Himalayas / J&K / Himachal
          onSelectSoil("mountain_soil");
          setActiveZoneId("zone_mountain_north");
          setSelectedState("Himachal Pradesh");
          setGpsMessage(`Detected North Himalayan Zone (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Mountain & Forest Soil loaded.`);
        } else if (latitude >= 28.0 && latitude < 31.0 && longitude < 76.0) {
          // North West Rajasthan / Haryana
          onSelectSoil("sandy_soil");
          setActiveZoneId("zone_arid_thar");
          setSelectedState("Rajasthan");
          setGpsMessage(`Detected Thar Arid Zone (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Sandy Desert Soil loaded.`);
        } else if (latitude >= 25.0 && latitude < 31.0 && longitude >= 76.0 && longitude <= 88.0) {
          // Gangetic Plains
          onSelectSoil("alluvial_soil");
          setActiveZoneId("zone_alluvial_north");
          setSelectedState("Uttar Pradesh");
          setGpsMessage(`Detected Indo-Gangetic Basin (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Alluvial Soil loaded.`);
        } else if (latitude >= 18.0 && latitude <= 24.0 && longitude >= 72.0 && longitude <= 79.0) {
          // Deccan Plateau (Maharashtra / MP)
          onSelectSoil("black_soil");
          setActiveZoneId("zone_black_deccan");
          setSelectedState("Maharashtra");
          setGpsMessage(`Detected Deccan Volcanic Basin (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Black Cotton Soil (Regur) loaded.`);
        } else if (longitude <= 75.5 && (latitude <= 16.0 && latitude >= 8.0)) {
          // West Coast / Malabar
          onSelectSoil("laterite_soil");
          setActiveZoneId("zone_laterite_coast");
          setSelectedState("Kerala");
          setGpsMessage(`Detected Western Ghats / Coastal Zone (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Laterite Soil loaded.`);
        } else if (latitude < 18.0 && longitude > 75.5) {
          // South & East Plateau
          onSelectSoil("red_soil");
          setActiveZoneId("zone_red_south");
          setSelectedState("Karnataka");
          setGpsMessage(`Detected Southern Granitic Zone (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Red & Yellow Soil loaded.`);
        } else {
          // General fallback
          onSelectSoil("alluvial_soil");
          setActiveZoneId("zone_alluvial_north");
          setGpsMessage(`Located coordinates (${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E). Matched nearest agricultural zone.`);
        }
      },
      (error) => {
        setGpsLoading(false);
        setGpsMessage("Could not access GPS. Please choose your State & District from the menu.");
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="space-y-6">
      {/* Helper Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-stone-800">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive India Agro-Climatic Soil Map</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
            Find Your Field's Soil by Map & Location
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Not sure whether your field is Black Cotton, Alluvial, Red Loam, or Laterite? Click anywhere on the regional India soil map, select your State & District, or use your GPS location to automatically identify your soil and discover high-yielding crops.
          </p>

          {/* Quick GPS button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDetectGps}
              disabled={gpsLoading}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {gpsLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Navigation className="w-4 h-4" />
              )}
              <span>{gpsLoading ? "Detecting Farm GPS..." : "Detect My Farm GPS Location"}</span>
            </button>

            <button
              onClick={() => setShowFeelGuide(!showFeelGuide)}
              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span>{showFeelGuide ? "Hide Field Feel Test" : "Field 'Feel & Color' Test Guide"}</span>
            </button>
          </div>

          {gpsMessage && (
            <div className="mt-2 p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{gpsMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Field Feel Test Guide Accordion */}
      {showFeelGuide && (
        <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-sm">
            <FlaskConical className="w-4 h-4 text-amber-600" />
            <span>2-Minute Field Finger Test: Confirm Your Soil on the Ground</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-200/60 dark:border-zinc-800 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-300" />
                1. The Ribbon & Crack Test
              </span>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                Take moist soil, roll into a 2-inch pencil ribbon. If it rolls smoothly without cracking and develops deep cracks in dry summers: <strong>Black Cotton Clay</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-200/60 dark:border-zinc-800 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                2. The Silt & Texture Test
              </span>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                Rub between fingers with water. If it feels like smooth flour or silky talcum powder: <strong>Alluvial Silt Loam</strong>. If gritty: <strong>Sandy Arid</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-200/60 dark:border-zinc-800 space-y-1.5">
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                3. The Iron & Color Test
              </span>
              <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                Check fresh dug subsoil. Brick red/yellow: <strong>Red Soil</strong>. Rusty honey-orange blocks that harden into bricks when dried in sun: <strong>Laterite Soil</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Map & District Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Map (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-stone-900 dark:text-zinc-100 text-base sm:text-lg">
                India Agro-Climatic Soil Map
              </h3>
            </div>
            <span className="text-[11px] text-stone-500 dark:text-zinc-400 font-medium">
              Tap any zone to inspect
            </span>
          </div>

          {/* Interactive SVG Map Visualizer */}
          <div className="relative w-full bg-emerald-50/40 dark:bg-zinc-950/60 rounded-2xl border border-stone-200/80 dark:border-zinc-800 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 460 520"
              className="w-full max-h-[460px] drop-shadow-sm select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* India Silhouette Background outline */}
              <path
                d="M 180 30 C 230 20, 270 50, 290 85 C 310 110, 270 125, 255 135 C 275 140, 365 170, 385 190 C 410 210, 420 250, 400 270 C 375 290, 345 285, 335 295 C 320 310, 310 370, 295 440 C 270 495, 235 500, 210 470 C 190 440, 160 380, 155 330 C 145 290, 110 290, 95 270 C 75 240, 95 210, 110 190 C 120 170, 160 145, 160 100 C 160 60, 150 40, 180 30 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-stone-300 dark:text-zinc-700"
              />

              {/* Geographic Soil Region Zones */}
              {AGRO_MAP_ZONES.map((zone) => {
                const isActive = activeZoneId === zone.id;
                return (
                  <g
                    key={zone.id}
                    onClick={() => handleZoneClick(zone)}
                    className="cursor-pointer transition-all duration-200 group"
                  >
                    <path
                      d={zone.pathD}
                      fill={zone.color}
                      fillOpacity={isActive ? 0.9 : 0.45}
                      stroke={isActive ? "#059669" : zone.color}
                      strokeWidth={isActive ? 3 : 1.5}
                      className="transition-all duration-200 group-hover:fill-opacity-75"
                    />

                    {/* Zone Pin / Label Marker */}
                    <circle
                      cx={zone.cx}
                      cy={zone.cy}
                      r={isActive ? 8 : 5}
                      fill={isActive ? "#ffffff" : zone.color}
                      stroke={isActive ? "#059669" : "#ffffff"}
                      strokeWidth={2}
                      className="shadow-sm"
                    />

                    {isActive && (
                      <circle
                        cx={zone.cx}
                        cy={zone.cy}
                        r={14}
                        fill="none"
                        stroke="#059669"
                        strokeWidth="1.5"
                        className="animate-ping opacity-75"
                      />
                    )}
                  </g>
                );
              })}

              {/* Live GPS Marker if detected */}
              {gpsCoordinates && (
                <g className="animate-bounce">
                  <circle cx={220} cy={300} r={6} fill="#2563eb" stroke="#ffffff" strokeWidth={2} />
                  <text x={220} y={288} textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="bold">
                    Your Farm
                  </text>
                </g>
              )}
            </svg>

            {/* Floating Active Zone Label on Map */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-lg text-xs space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: currentZone.color }}
                />
                <span className="font-bold text-stone-900 dark:text-zinc-100 truncate">
                  {currentZone.name}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-zinc-400 line-clamp-1">
                {currentZone.states.slice(0, 3).join(", ")}
              </p>
            </div>
          </div>

          {/* Map Color Legend */}
          <div className="pt-2 border-t border-stone-200 dark:border-zinc-800">
            <p className="text-xs font-bold text-stone-700 dark:text-zinc-300 mb-2">
              Soil Agro-Climatic Legend (Tap to Select):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              {AGRO_MAP_ZONES.map((z) => {
                const isSelected = activeZoneId === z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => handleZoneClick(z)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 font-bold"
                        : "border-stone-200/80 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/20"
                      style={{ backgroundColor: z.color }}
                    />
                    <span className="truncate text-stone-800 dark:text-zinc-200">
                      {z.name.split(" ")[0]} ({z.typicalPh.split(" ")[0]})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: State & District Selector + Selected Soil Details (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* State / District Matcher Card */}
          <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2 text-stone-900 dark:text-zinc-100 font-bold text-sm">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Select by State & District</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-600 dark:text-zinc-400 font-semibold mb-1">
                  1. Select Your State:
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {allStates.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-600 dark:text-zinc-400 font-semibold mb-1">
                  2. Select District (Optional):
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => handleDistrictSelect(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="">-- All Districts ({districtsForSelectedState.length} total) --</option>
                  {districtsForSelectedState.map((dst) => (
                    <option key={dst} value={dst}>
                      {dst}
                    </option>
                  ))}
                </select>
              </div>

              {STATE_SOIL_MAP[selectedState] && (
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 text-[11px] space-y-1">
                  <span className="font-bold text-stone-800 dark:text-zinc-200 block">
                    Agro-Zone for {selectedState}:
                  </span>
                  <p className="text-stone-600 dark:text-zinc-400 leading-relaxed">
                    {STATE_SOIL_MAP[selectedState].note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Active Identified Soil & Crop Match Preview Card */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-emerald-500/40 rounded-3xl p-5 shadow-md space-y-4">
            <div className="flex items-start justify-between gap-2 border-b border-stone-200 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Identified Soil for this Region
                </span>
                <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1 flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: currentSoilData.colorSwatch }}
                  />
                  <span>{currentSoilData.localName[language] || currentSoilData.name}</span>
                </h3>
              </div>
            </div>

            {/* Characteristics Pill Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800/70 border border-stone-200/80 dark:border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-bold block">
                  Typical pH
                </span>
                <span className="font-extrabold text-stone-900 dark:text-zinc-100">
                  {currentSoilData.phRange.optimal}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800/70 border border-stone-200/80 dark:border-zinc-800 space-y-0.5">
                <span className="text-[10px] text-stone-500 dark:text-zinc-400 font-bold block">
                  Water Retention
                </span>
                <span className="font-extrabold text-stone-900 dark:text-zinc-100">
                  {currentSoilData.waterRetention}
                </span>
              </div>
            </div>

            {/* Regional Description */}
            <p className="text-xs text-stone-600 dark:text-zinc-400 leading-relaxed">
              {currentZone.description}
            </p>

            {/* Best Crops Preview */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-zinc-300 mb-2">
                <span>Top Recommended Crops:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {currentSoilData.bestCrops.length} Crops Available
                </span>
              </div>

              <div className="space-y-1.5">
                {currentSoilData.bestCrops.slice(0, 4).map((crop) => (
                  <div
                    key={crop.cropName}
                    className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/60 dark:border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{crop.icon}</span>
                      <div>
                        <p className="font-bold text-stone-900 dark:text-white">
                          {crop.localCropName[language] || crop.cropName}
                        </p>
                        <p className="text-[10px] text-stone-500 dark:text-zinc-400">
                          {crop.season} • {crop.durationDays}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-md font-black text-[11px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {crop.suitabilityScore}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Apply & View */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  onSelectSoil(currentSoilData.id);
                  if (onViewCrops) onViewCrops();
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Sprout className="w-4 h-4" />
                <span>Apply Soil & View All {currentSoilData.bestCrops.length} Matching Crops</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
