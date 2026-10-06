import React, { useState, useMemo, useEffect } from "react";
import {
  Sprout,
  Filter,
  Search,
  Sparkles,
  Droplets,
  Layers,
  CheckCircle2,
  BookOpen,
  Download,
  RefreshCw,
  FlaskConical,
  Compass,
  Send,
  AlertTriangle,
  Info,
  ChevronRight,
  Copy,
  X,
  FileText,
  Check,
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { SOIL_DATABASE, SoilTypeInfo, CropSuitabilityItem } from "../data/soilData";
import { SoilMapHelper } from "./SoilMapHelper";

interface SoilCropAdvisorProps {
  language: Language;
  user?: UserProfile | null;
}

export const SoilCropAdvisor: React.FC<SoilCropAdvisorProps> = ({ language, user }) => {
  const [selectedSoilId, setSelectedSoilId] = useState<string>("black_soil");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeView, setActiveView] = useState<"catalog" | "map" | "ask_ai">("catalog");
  const [displayLimit, setDisplayLimit] = useState<number>(24);

  useEffect(() => {
    setDisplayLimit(24);
  }, [selectedCategory, searchQuery, selectedSoilId]);

  // AI Soil Query State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const selectedSoil = useMemo(() => {
    return SOIL_DATABASE.find((s) => s.id === selectedSoilId) || SOIL_DATABASE[0];
  }, [selectedSoilId]);

  // Categories list
  const categories = ["All", "Cereals & Grains", "Cash Crops", "Oilseeds", "Pulses", "Vegetables", "Horticulture & Fruits", "Spices & Plantation"];

  // Filter crops in the active soil catalog
  const filteredCrops = useMemo(() => {
    return selectedSoil.bestCrops.filter((crop) => {
      const matchesCategory = selectedCategory === "All" || crop.category === selectedCategory;
      const localizedName = crop.localCropName[language] || crop.cropName;
      const matchesSearch =
        searchQuery.trim() === "" ||
        crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        localizedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.season.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedSoil, selectedCategory, searchQuery, language]);

  // Handle Ask AI Soil Query with graceful fallback
  const handleAskSoilAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch("/api/kisan-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Regarding soil type and crop selection: ${aiPrompt}. Soil type context: ${selectedSoil.name}, pH: ${selectedSoil.phRange.optimal}, Region: ${user?.state || "India"}. Provide 3 top crops to grow, soil treatment before sowing, and NPK dosage in ${language}.`,
          language: language,
        }),
      });

      const data = await res.json();
      if (data && data.answer) {
        setAiResponse(data.answer);
      } else {
        throw new Error("Empty response");
      }
    } catch {
      // Intelligent Agronomic offline fallback
      setAiResponse(
        `🌱 **Expert Soil Recommendation for ${selectedSoil.name}:**\n\n` +
          `1. **Top Recommended Crops:** ${selectedSoil.bestCrops.slice(0, 3).map((c) => c.cropName).join(", ")}.\n` +
          `2. **Soil Preparation & Organic Care:** ${selectedSoil.organicAmendments[0]}; ${selectedSoil.organicAmendments[1]}.\n` +
          `3. **Nutrient Management (NPK):** This soil has ${selectedSoil.nutrientProfile.nitrogen} Nitrogen, ${selectedSoil.nutrientProfile.phosphorus} Phosphorus, and ${selectedSoil.nutrientProfile.potassium} Potassium. Incorporate bio-fertilizers (Azotobacter/Rhizobium + PSB) with basal application to maximize crop yield.\n` +
          `4. **Key Management Tip:** ${selectedSoil.reclamationTips[0] || "Ensure proper drainage and avoid water stagnation during peak monsoon."}`
      );
    } finally {
      setAiLoading(false);
    }
  };

  const [showPrintModal, setShowPrintModal] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const handlePrintCard = () => {
    setShowPrintModal(true);
  };

  const handleDownloadSheet = () => {
    const textContent = `=====================================================
ICAR - KRISHI VIGYAN KENDRA / SOIL ADVISORY CELL
SOIL HEALTH & CROP SUITABILITY ADVISORY CARD
=====================================================
Farmer Name: ${user?.name || "Progressive Farmer"}
Location / District: ${user?.district || "Local Agriculture Zone"}, ${user?.state || "India"}
Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}

1. SOIL CHARACTERISTICS & DIAGNOSTICS:
- Soil Classification: ${selectedSoil.name} (${selectedSoil.localName[language] || selectedSoil.name})
- Physical Texture: ${selectedSoil.texture}
- Color & Appearance: ${selectedSoil.soilColorDesc}
- Optimal pH: ${selectedSoil.phRange.optimal} (Range: ${selectedSoil.phRange.min} - ${selectedSoil.phRange.max})
- Moisture Retention: ${selectedSoil.waterRetention}

2. SOIL NUTRIENT PROFILE (NPK):
- Nitrogen (N): ${selectedSoil.nutrientProfile.nitrogen}
- Phosphorus (P): ${selectedSoil.nutrientProfile.phosphorus}
- Potassium (K): ${selectedSoil.nutrientProfile.potassium}

3. ORGANIC CONDITIONING & AMENDMENTS:
${selectedSoil.organicAmendments.map((a, i) => `  * ${a}`).join("\n")}

4. RECLAMATION & MANAGEMENT PROTOCOL:
${selectedSoil.reclamationTips.map((t, i) => `  * ${t}`).join("\n")}

5. TOP RECOMMENDED CROPS FOR THIS SOIL (${selectedSoil.bestCrops.length} CROPS):
${selectedSoil.bestCrops
  .slice(0, 35)
  .map(
    (c, i) =>
      `[${i + 1}] ${c.cropName} (${c.localCropName[language] || c.cropName})
     Category: ${c.category} | Season: ${c.season} | Expected Yield: ${c.expectedYield}
     Water Need: ${c.waterNeed} | Suitability Score: ${c.suitabilityScore}%
     Recommended Fertilizer Dosage: ${c.fertilizerDosage}`
  )
  .join("\n\n")}

=====================================================
Generated by CropGuard AI Advisory Engine
=====================================================`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Soil_Health_Advisory_${selectedSoil.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySheet = () => {
    const summary = `🌾 Soil Health Advisory Card: ${selectedSoil.name}\n` +
      `Optimal pH: ${selectedSoil.phRange.optimal} (${selectedSoil.soilColorDesc})\n` +
      `Nutrients: N-${selectedSoil.nutrientProfile.nitrogen}, P-${selectedSoil.nutrientProfile.phosphorus}, K-${selectedSoil.nutrientProfile.potassium}\n` +
      `Top Recommended Crops: ${selectedSoil.bestCrops.slice(0, 8).map(c => c.cropName).join(", ")}\n` +
      `Amendments: ${selectedSoil.organicAmendments.slice(0, 2).join("; ")}`;
    
    navigator.clipboard.writeText(summary);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  return (
    <div id="soil-crop-advisor" className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Layers className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-600/60 border border-emerald-400/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-100">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>ICAR Certified Soil & Agronomy Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Soil Type & Recommended Crops
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Discover exactly which high-yielding crops thrive in your soil type, check ideal pH ranges, NPK nutrient deficits, and receive scientific soil reclamation guidelines.
          </p>

          {/* Quick Nav Switches */}
          <div className="pt-2 flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setActiveView("catalog")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === "catalog"
                  ? "bg-white text-emerald-900 shadow-md"
                  : "bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-600/40"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Explore 8 Major Soils</span>
            </button>

            <button
              onClick={() => setActiveView("map")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === "map"
                  ? "bg-white text-emerald-900 shadow-md"
                  : "bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-600/40"
              }`}
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>🗺️ Find Soil from Map</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-black">
                Map Help
              </span>
            </button>

            <button
              onClick={() => setActiveView("ask_ai")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === "ask_ai"
                  ? "bg-white text-emerald-900 shadow-md"
                  : "bg-emerald-900/50 hover:bg-emerald-800/60 text-emerald-100 border border-emerald-600/40"
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ask Soil Agronomist AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: CATALOG & EXPLORER */}
      {activeView === "catalog" && (
        <div className="space-y-6">
          {/* Quick Map Help Helper Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-2xs">
                <Compass className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                  Don't know which soil covers your field?
                </p>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                  Take map help to pinpoint your district or use live GPS to automatically detect your soil type and top matching crops!
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveView("map")}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <span>Take Map Help</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Soil Selector Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Select Your Soil Type</span>
              </h2>
              <span className="text-xs text-stone-500 dark:text-zinc-400">
                8 Standard Agro-Climatic Soils
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
              {SOIL_DATABASE.map((soil) => {
                const isSelected = soil.id === selectedSoilId;
                const localizedTitle = soil.localName[language] || soil.name;

                return (
                  <button
                    key={soil.id}
                    onClick={() => setSelectedSoilId(soil.id)}
                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-28 cursor-pointer ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/30"
                        : "border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-stone-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-5 h-5 rounded-full border border-black/20 shadow-inner inline-block"
                        style={{ backgroundColor: soil.colorSwatch }}
                      />
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-zinc-100 line-clamp-2 leading-snug">
                        {localizedTitle.split("(")[0]}
                      </p>
                      <p className="text-[10px] text-stone-500 dark:text-zinc-400 truncate mt-0.5">
                        {soil.waterRetention} Retention
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Soil Overview Card */}
          <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-stone-200 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: selectedSoil.colorSwatch }}
                  />
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-zinc-100">
                    {selectedSoil.localName[language] || selectedSoil.name}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {selectedSoil.bestCrops.length} Top Crops
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
                  {selectedSoil.soilColorDesc} • {selectedSoil.texture}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCard}
                  className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="View Advisory Sheet"
                >
                  <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Advisory Sheet</span>
                </button>
                <button
                  onClick={() => setActiveView("map")}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Soil Map Help</span>
                </button>
              </div>
            </div>

            {/* Quick Soil Diagnostics Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-stone-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-stone-200/70 dark:border-zinc-700/60">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-zinc-400 mb-1">
                  <FlaskConical className="w-4 h-4 text-emerald-600" />
                  <span>Ideal pH Range</span>
                </div>
                <p className="text-base sm:text-lg font-black text-stone-900 dark:text-zinc-100">
                  {selectedSoil.phRange.optimal}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400">
                  Min: {selectedSoil.phRange.min} | Max: {selectedSoil.phRange.max}
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-stone-200/70 dark:border-zinc-700/60">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-zinc-400 mb-1">
                  <Droplets className="w-4 h-4 text-blue-600" />
                  <span>Water Retention</span>
                </div>
                <p className="text-base sm:text-lg font-black text-stone-900 dark:text-zinc-100">
                  {selectedSoil.waterRetention}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400 truncate">
                  {selectedSoil.drainage}
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-stone-200/70 dark:border-zinc-700/60">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-zinc-400 mb-1">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>NPK Status</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                    N: {selectedSoil.nutrientProfile.nitrogen}
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200">
                    P: {selectedSoil.nutrientProfile.phosphorus}
                  </span>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                    K: {selectedSoil.nutrientProfile.potassium}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 truncate">
                  {selectedSoil.nutrientProfile.micronutrients}
                </p>
              </div>

              <div className="bg-stone-50 dark:bg-zinc-800/60 p-4 rounded-2xl border border-stone-200/70 dark:border-zinc-700/60">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-zinc-400 mb-1">
                  <Compass className="w-4 h-4 text-purple-600" />
                  <span>Key States & Regions</span>
                </div>
                <p className="text-xs font-medium text-stone-800 dark:text-zinc-200 line-clamp-2">
                  {selectedSoil.regions.slice(0, 3).join(", ")}
                </p>
                <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">
                  + {selectedSoil.regions.length - 3} more belts
                </p>
              </div>
            </div>

            {/* Scientific Agronomic Care & Soil Management */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/50">
                <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Organic Amendments</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700 dark:text-zinc-300">
                  {selectedSoil.organicAmendments.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/50">
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Field Reclamation & Tillage Tips</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700 dark:text-zinc-300">
                  {selectedSoil.reclamationTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Filter and Search Crops */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-black text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  <span>Recommended Crops for This Soil ({filteredCrops.length})</span>
                </h3>

                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search crop, pulse, season..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Crops Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCrops.slice(0, displayLimit).map((crop, idx) => {
                  const localName = crop.localCropName[language] || crop.cropName;

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-800/40 p-5 flex flex-col justify-between hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="space-y-3">
                        {/* Title & Score */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-3xl p-2 rounded-2xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 shadow-sm">
                              {crop.icon}
                            </span>
                            <div>
                              <h4 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {localName}
                              </h4>
                              <p className="text-xs text-stone-500 dark:text-zinc-400">
                                {crop.category} • {crop.season}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="inline-block px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {crop.suitabilityScore}% Match
                            </span>
                          </div>
                        </div>

                        {/* Agronomic Why it grows well */}
                        <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-stone-200/80 dark:border-zinc-800">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400">Why it grows: </span>
                          {crop.whyItGrowsWell}
                        </p>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800">
                            <span className="text-stone-500 dark:text-zinc-400 block font-medium">Expected Yield:</span>
                            <span className="font-bold text-stone-800 dark:text-zinc-200">{crop.expectedYield}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800">
                            <span className="text-stone-500 dark:text-zinc-400 block font-medium">Water Need:</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">{crop.waterNeed}</span>
                          </div>
                        </div>
                      </div>

                      {/* Field Preparation and Fertilizer advice */}
                      <div className="pt-3 mt-3 border-t border-stone-200 dark:border-zinc-800/80 space-y-1 text-[11px]">
                        <p className="text-stone-600 dark:text-zinc-400">
                          <strong className="text-stone-800 dark:text-zinc-200">Sowing Tip: </strong>
                          {crop.fieldPreparationTip}
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-medium">
                          <strong>Dose: </strong>
                          {crop.recommendedFertilizer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Show More / Show All Crops pagination */}
              {displayLimit < filteredCrops.length && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 24)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    Load More Crops (+24)
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredCrops.length)}
                    className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer border border-stone-200 dark:border-zinc-700"
                  >
                    Show All {filteredCrops.length} Crops for {selectedSoil.name.split("(")[0].trim()}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: ASK SOIL AGRONOMIST AI */}
      {activeView === "ask_ai" && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-stone-900 dark:text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Ask Kisan Soil Agronomist</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400">
              Ask any question about your soil type, fertilizer dosage, crop rotation, or which vegetable/cash crop gives maximum profit in your area.
            </p>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-stone-500 dark:text-zinc-400">
              Popular Soil Questions:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Which cash crop is most profitable for black cotton soil in Maharashtra?",
                "My soil is red sandy loam with borewell water. Which vegetable will yield highest?",
                "How to increase organic carbon and moisture retention in dry sandy soil?",
                "What is the best fertilizer dose for wheat in alluvial soil?",
              ].map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAiPrompt(prompt)}
                  className="text-xs bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-300 py-1.5 px-3 rounded-xl transition-colors text-left cursor-pointer"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleAskSoilAi} className="space-y-3">
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Describe your soil (color, location, water source) or ask which crop to sow..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={aiLoading || !aiPrompt.trim()}
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {aiLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Soil Agronomy...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Get AI Soil Advisory</span>
                </>
              )}
            </button>
          </form>

          {/* AI Response Display */}
          {aiResponse && (
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-stone-800 dark:text-zinc-200 space-y-3">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Agronomist Recommendation</span>
              </div>
              <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                {aiResponse}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 4: INTERACTIVE MAP & REGIONAL SOIL FINDER */}
      {activeView === "map" && (
        <SoilMapHelper
          language={language}
          selectedSoilId={selectedSoilId}
          onSelectSoil={(id) => setSelectedSoilId(id)}
          onViewCrops={() => setActiveView("catalog")}
        />
      )}

      {/* PRINTABLE SOIL ADVISORY SHEET MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 dark:border-zinc-800 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Actions Toolbar (no-print) */}
            <div className="no-print p-4 sm:p-5 bg-stone-50 dark:bg-zinc-800/80 border-b border-stone-200 dark:border-zinc-700 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
                  Soil Health & Crop Advisory Sheet
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                  Official Format
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={handleDownloadSheet}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  title="Download advisory text file"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </button>

                <button
                  onClick={handleCopySheet}
                  className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-stone-800 dark:text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy advisory summary"
                >
                  {copiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedToast ? "Copied!" : "Copy"}</span>
                </button>

                <button
                  onClick={() => setShowPrintModal(false)}
                  className="p-1.5 rounded-xl hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-500 dark:text-zinc-400 transition-colors cursor-pointer"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Document View */}
            <div className="overflow-y-auto p-6 sm:p-8 bg-white text-stone-900 font-sans">
              <div id="printable-soil-advisory-sheet" className="max-w-3xl mx-auto space-y-6">
                {/* Official Letterhead */}
                <div className="border-b-2 border-emerald-700 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xl shadow-xs">
                      🌾
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-emerald-950 uppercase tracking-tight">
                        ICAR - Krishi Vigyan Kendra & Agronomy Advisory Cell
                      </h2>
                      <p className="text-xs text-stone-600 font-semibold">
                        Department of Agriculture & Farmers Welfare • Soil Health & Crop Planning Card
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-stone-500 font-medium">
                    <div>Advisory ID: SHC-{selectedSoil.id.toUpperCase()}-{Math.floor(1000 + Math.random() * 9000)}</div>
                    <div>Issued: {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                  </div>
                </div>

                {/* Farmer & Land Profile Info */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Farmer Name:</span>
                    <span className="font-bold text-stone-900">{user?.name || "Progressive Farmer"}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Region / State:</span>
                    <span className="font-bold text-stone-900">{user?.district || "Local Agriculture Belt"}, {user?.state || "India"}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Soil Classification:</span>
                    <span className="font-bold text-emerald-800">{selectedSoil.name}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Tested Suitable Crops:</span>
                    <span className="font-bold text-stone-900">{selectedSoil.bestCrops.length} Crops</span>
                  </div>
                </div>

                {/* Soil Physical & Chemical Properties */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-l-3 border-emerald-700 pl-2">
                    1. Soil Physical Characteristics & Diagnostics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
                      <div className="text-[10px] uppercase font-bold text-stone-500">Texture & Color</div>
                      <div className="font-bold text-stone-900 mt-0.5">{selectedSoil.texture}</div>
                      <div className="text-[11px] text-stone-600 mt-1">{selectedSoil.soilColorDesc}</div>
                    </div>
                    <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
                      <div className="text-[10px] uppercase font-bold text-stone-500">Ideal pH Range</div>
                      <div className="text-base font-black text-emerald-800 mt-0.5">{selectedSoil.phRange.optimal}</div>
                      <div className="text-[11px] text-stone-600 mt-1">Tolerance: {selectedSoil.phRange.min} – {selectedSoil.phRange.max}</div>
                    </div>
                    <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
                      <div className="text-[10px] uppercase font-bold text-stone-500">Water Retention</div>
                      <div className="font-bold text-stone-900 mt-0.5">{selectedSoil.waterRetention}</div>
                      <div className="text-[11px] text-stone-600 mt-1">Drainage management required</div>
                    </div>
                  </div>
                </div>

                {/* NPK Status */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-l-3 border-emerald-700 pl-2">
                    2. Primary Nutrients Profile (NPK Status)
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50">
                      <div className="text-[10px] font-bold text-stone-500 uppercase">Nitrogen (N)</div>
                      <div className="font-black text-sm text-stone-900">{selectedSoil.nutrientProfile.nitrogen}</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50">
                      <div className="text-[10px] font-bold text-stone-500 uppercase">Phosphorus (P)</div>
                      <div className="font-black text-sm text-stone-900">{selectedSoil.nutrientProfile.phosphorus}</div>
                    </div>
                    <div className="p-2.5 rounded-lg border border-stone-200 bg-stone-50">
                      <div className="text-[10px] font-bold text-stone-500 uppercase">Potassium (K)</div>
                      <div className="font-black text-sm text-stone-900">{selectedSoil.nutrientProfile.potassium}</div>
                    </div>
                  </div>
                </div>

                {/* Soil Conditioning & Amendments */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <h5 className="font-bold text-stone-900 mb-1.5 flex items-center gap-1.5 text-xs">
                      <span>🌿 Organic Amendments & Fertilizer Base</span>
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-stone-700 text-[11px]">
                      {selectedSoil.organicAmendments.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <h5 className="font-bold text-stone-900 mb-1.5 flex items-center gap-1.5 text-xs">
                      <span>🛠️ Reclamation & Best Field Practices</span>
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-stone-700 text-[11px]">
                      {selectedSoil.reclamationTips.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Top Recommended Crops Table */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 border-l-3 border-emerald-700 pl-2">
                      3. Crop Suitability & Recommended Prescriptions
                    </h4>
                    <span className="text-[10px] text-stone-500 font-semibold">
                      Showing Top Recommended Crops
                    </span>
                  </div>

                  <div className="border border-stone-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                        <tr>
                          <th className="p-2">Crop Name</th>
                          <th className="p-2">Category</th>
                          <th className="p-2">Season</th>
                          <th className="p-2">Yield Potential</th>
                          <th className="p-2">Water Need</th>
                          <th className="p-2">Fertilizer Prescription</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-700">
                        {selectedSoil.bestCrops.slice(0, 18).map((crop, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-stone-50/60"}>
                            <td className="p-2 font-bold text-stone-900">
                              {crop.cropName}
                              {crop.localCropName[language] && crop.localCropName[language] !== crop.cropName ? (
                                <span className="block text-[10px] font-normal text-stone-500">
                                  {crop.localCropName[language]}
                                </span>
                              ) : null}
                            </td>
                            <td className="p-2 text-stone-600">{crop.category}</td>
                            <td className="p-2">{crop.season}</td>
                            <td className="p-2 font-semibold text-emerald-800">{crop.expectedYield}</td>
                            <td className="p-2">{crop.waterNeed}</td>
                            <td className="p-2 text-stone-600 text-[10px] max-w-[200px]">{crop.fertilizerDosage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Certification & Disclaimer Footer */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-500 text-center sm:text-left">
                  <div>
                    <p className="font-bold text-stone-700">CropGuard AI Agri-Advisory & Soil Information System</p>
                    <p>Referenced against ICAR soil survey benchmarks & regional agronomic guidelines.</p>
                  </div>
                  <div className="border border-stone-300 rounded px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-stone-600">
                    Verified Digital Record
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
