import React, { useState } from "react";
import {
  Landmark,
  CheckCircle2,
  FileText,
  ExternalLink,
  PhoneCall,
  Search,
  Sparkles,
  HelpCircle,
  ShieldAlert,
  Globe,
  RefreshCw,
  Award,
  Zap,
  Filter,
  MapPin,
  ChevronRight,
  TrendingUp,
  Tag,
  Building2,
  Info,
  Check
} from "lucide-react";
import { GovtScheme, Language } from "../types";
import { GOVERNMENT_SCHEMES } from "../data/governmentSchemes";
import { UI_TRANSLATIONS } from "../data/translations";

interface GovtSchemesProps {
  language: Language;
}

export const GovtSchemes: React.FC<GovtSchemesProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [activeSchemeModal, setActiveSchemeModal] = useState<GovtScheme | null>(null);

  // Interactive Quiz State for Eligibility
  const [quizType, setQuizType] = useState<"pmkisan" | "kcc" | "kusum">("pmkisan");
  const [landHectares, setLandHectares] = useState("1.5");
  const [isTaxPayer, setIsTaxPayer] = useState("No");
  const [hasAadhaarBank, setHasAadhaarBank] = useState("Yes");
  const [hasWaterSource, setHasWaterSource] = useState("Yes");
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  // Live Google Grounded AI Search State
  const [isLiveSearching, setIsLiveSearching] = useState(false);
  const [liveSearchResult, setLiveSearchResult] = useState<{
    text: string;
    citations: { title: string; uri: string }[];
    modelUsed: string;
    suggestedSchemes?: any[];
  } | null>(null);

  const categories = [
    "All",
    "Direct Benefit Transfer",
    "Insurance",
    "Credit & Loan",
    "Machinery & Subsidies",
    "Solar & Irrigation",
    "Soil & Fertilizer",
    "Organic & Natural Farming",
    "Livestock & Fisheries",
    "Horticulture & Cold Storage",
    "Infrastructure",
    "Social Security & Pension",
    "State Schemes",
  ];

  const states = [
    "All",
    "All India",
    "Madhya Pradesh",
    "Maharashtra",
    "Andhra Pradesh / Telangana",
    "Odisha",
    "UP, MP, Bihar, Rajasthan, Gujarat",
    "Himachal Pradesh, Uttarakhand, Gujarat, Karnataka",
    "North Eastern States (Assam, Sikkim, etc.)",
  ];

  const quickGooglePrompts = [
    "PM-Kisan 19th installment date & e-KYC status",
    "How to get 80% subsidy on Solar Agriculture Pump (PM-KUSUM)",
    "Tractor and Rotavator 50% subsidy online registration",
    "Kisan Credit Card (KCC) 4% interest rate eligibility",
    "Fasal Bima crop damage claim within 72 hours",
  ];

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      scheme.title.toLowerCase().includes(term) ||
      scheme.objective.toLowerCase().includes(term) ||
      scheme.benefits.toLowerCase().includes(term) ||
      (scheme.subsidyPercentage && scheme.subsidyPercentage.toLowerCase().includes(term)) ||
      (scheme.targetBeneficiaries && scheme.targetBeneficiaries.toLowerCase().includes(term)) ||
      (scheme.state && scheme.state.toLowerCase().includes(term)) ||
      Object.values(scheme.titleLocal).some((val) => val.toLowerCase().includes(term));

    const matchesCategory =
      selectedCategory === "All" || scheme.category === selectedCategory;

    const matchesState =
      selectedState === "All" ||
      scheme.state.toLowerCase().includes(selectedState.toLowerCase()) ||
      scheme.state === "All India";

    return matchesSearch && matchesCategory && matchesState;
  });

  const checkEligibility = () => {
    const hect = parseFloat(landHectares) || 0;

    if (quizType === "pmkisan") {
      if (isTaxPayer === "Yes") {
        setEligibilityResult(
          "❌ Ineligible for PM-Kisan: Income tax payers, retired pensioners (>₹10,000/mo), and institutional landholders are excluded under government guidelines."
        );
      } else if (hasAadhaarBank === "No") {
        setEligibilityResult(
          "⚠️ Action Required: You qualify, but MUST complete e-KYC and link your Aadhaar with your bank account to receive the ₹6,000/year installments directly via DBT."
        );
      } else if (hect > 0) {
        setEligibilityResult(
          "✅ 100% Eligible! You qualify for full PM-Kisan benefits (₹6,000 direct bank transfer per year in 3 installments of ₹2,000)."
        );
      } else {
        setEligibilityResult("⚠️ Please enter a valid cultivable landholding size.");
      }
    } else if (quizType === "kcc") {
      if (hect > 0) {
        setEligibilityResult(
          `✅ Eligible for Kisan Credit Card (KCC)! You qualify for up to ₹1.60 Lakh collateral-free loan (and up to ₹3 Lakh at 4% effective interest rate with prompt repayment).`
        );
      } else {
        setEligibilityResult(
          "✅ Eligible for Animal Husbandry & Dairy KCC! Even without agricultural land, dairy and fishery farmers qualify for loans up to ₹2 Lakh at 4% interest."
        );
      }
    } else if (quizType === "kusum") {
      if (hasWaterSource === "Yes") {
        setEligibilityResult(
          "✅ 100% Eligible for PM-KUSUM Solar Pump! You qualify for up to 90% total subsidy (Central 30-50% + State 30% + Bank Loan 30%). You only pay 10% upfront!"
        );
      } else {
        setEligibilityResult(
          "⚠️ Borewell or Water Source Required: PM-KUSUM requires a functional borewell, open well, or farm pond on the field."
        );
      }
    }
  };

  const handleLiveSearch = async (customQuery?: string) => {
    const query = (customQuery || searchTerm).trim() || "Government agricultural schemes, subsidies, and PM Kisan updates";
    setIsLiveSearching(true);
    setLiveSearchResult(null);

    try {
      const res = await fetch("/api/schemes/live-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, state: selectedState !== "All" ? selectedState : "India", language }),
      });
      const data = await res.json();
      if (data.success) {
        setLiveSearchResult({
          text: data.text || "Latest official government schemes fetched from verified portals.",
          citations: data.citations || [],
          modelUsed: data.modelUsed || "gemini-3.7-flash",
          suggestedSchemes: data.schemes || [],
        });
      }
    } catch (err) {
      console.warn("Live schemes search error:", err);
    } finally {
      setIsLiveSearching(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Direct Benefit Transfer":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
      case "Insurance":
        return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800";
      case "Credit & Loan":
        return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
      case "Machinery & Subsidies":
        return "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800";
      case "Solar & Irrigation":
        return "bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800";
      case "Organic & Natural Farming":
        return "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800";
      case "Livestock & Fisheries":
        return "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800";
      case "Horticulture & Cold Storage":
        return "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800";
      case "State Schemes":
        return "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800";
      default:
        return "bg-stone-50 text-stone-800 border-stone-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-stone-900 dark:text-zinc-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <Landmark className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-emerald-100 tracking-tight">
              {t.govtSchemesTitle || "All Government Schemes & Subsidies for Farmers"}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">
              {GOVERNMENT_SCHEMES.length} Active Schemes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Comprehensive directory of Central & State Government agricultural programs: PM-Kisan DBT, PM-KUSUM Solar Pumps (90% subsidy), KCC loans @ 4%, Tractor machinery grants, Crop Insurance (PMFBY), and organic farming aids.
          </p>
        </div>

      </div>

      {/* Google Live Search Prompt Suggestions */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-stone-50 to-emerald-50/70 dark:from-zinc-900 dark:via-zinc-850 dark:to-zinc-900 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 dark:text-emerald-300">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Search Any Government Scheme:</span>
          </div>
          <span className="text-[10px] text-stone-500 dark:text-zinc-400">
            Grounded with official portals
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickGooglePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchTerm(prompt);
                handleLiveSearch(prompt);
              }}
              disabled={isLiveSearching}
              className="text-left px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-[11px] font-medium text-stone-700 dark:text-zinc-200 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live AI Search Result with Google Grounding Citations */}
      {liveSearchResult && (
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-emerald-500/80 dark:border-emerald-600 shadow-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Verified Government Information (Google Grounded Intelligence)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-zinc-800 text-emerald-800 dark:text-emerald-300 font-bold">
              {liveSearchResult.modelUsed}
            </span>
          </div>

          <div className="text-xs text-stone-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed bg-stone-50/60 dark:bg-zinc-800/60 p-3.5 rounded-xl border border-stone-200/60 dark:border-zinc-700/60">
            {liveSearchResult.text}
          </div>

          {liveSearchResult.citations.length > 0 && (
            <div className="pt-2 border-t border-stone-200 dark:border-zinc-800 space-y-1.5">
              <div className="text-[11px] font-bold text-stone-600 dark:text-zinc-400">
                Official Sources & Direct Application Portals:
              </div>
              <div className="flex flex-wrap gap-2">
                {liveSearchResult.citations.map((c, i) => (
                  <a
                    key={i}
                    href={c.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-zinc-800 border border-emerald-200 dark:border-zinc-700 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 hover:underline hover:bg-emerald-100 dark:hover:bg-zinc-750 transition-colors"
                  >
                    <span>{c.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Eligibility Calculator */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs space-y-4 text-stone-900 dark:text-zinc-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-sm sm:text-base font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Instant Scheme Eligibility Checker</span>
          </h3>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => {
                setQuizType("pmkisan");
                setEligibilityResult(null);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                quizType === "pmkisan"
                  ? "bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900"
              }`}
            >
              PM-Kisan (₹6,000)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuizType("kcc");
                setEligibilityResult(null);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                quizType === "kcc"
                  ? "bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900"
              }`}
            >
              KCC Loan (4%)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuizType("kusum");
                setEligibilityResult(null);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                quizType === "kusum"
                  ? "bg-white dark:bg-zinc-700 text-emerald-700 dark:text-emerald-300 shadow-2xs"
                  : "text-stone-600 dark:text-zinc-400 hover:text-stone-900"
              }`}
            >
              Solar Pump (90% Subsidy)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-stone-700 dark:text-zinc-300 mb-1 font-semibold">
              Cultivable Landholding (Hectares)
            </label>
            <input
              type="number"
              step="0.1"
              value={landHectares}
              onChange={(e) => setLandHectares(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600 text-xs font-semibold"
            />
            <span className="text-[10px] text-stone-400 mt-1 block">1 Hectare ≈ 2.47 Acres</span>
          </div>

          {quizType === "pmkisan" && (
            <div>
              <label className="block text-stone-700 dark:text-zinc-300 mb-1 font-semibold">
                Do you pay Income Tax?
              </label>
              <select
                value={isTaxPayer}
                onChange={(e) => setIsTaxPayer(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600 text-xs font-semibold"
              >
                <option value="No">No (Eligible Farmer)</option>
                <option value="Yes">Yes (Taxpayer)</option>
              </select>
            </div>
          )}

          {quizType === "kusum" && (
            <div>
              <label className="block text-stone-700 dark:text-zinc-300 mb-1 font-semibold">
                Do you have a functional Well / Borewell?
              </label>
              <select
                value={hasWaterSource}
                onChange={(e) => setHasWaterSource(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600 text-xs font-semibold"
              >
                <option value="Yes">Yes (Ready for Solar Pump)</option>
                <option value="No">No (Dry Land)</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-stone-700 dark:text-zinc-300 mb-1 font-semibold">
              Is Bank Account Linked with Aadhaar (DBT Enabled)?
            </label>
            <select
              value={hasAadhaarBank}
              onChange={(e) => setHasAadhaarBank(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600 text-xs font-semibold"
            >
              <option value="Yes">Yes (Aadhaar Seeded)</option>
              <option value="No">No (Not Linked)</option>
            </select>
          </div>
        </div>

        <button
          onClick={checkEligibility}
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Check My Eligibility</span>
        </button>

        {eligibilityResult && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-zinc-800 border border-emerald-200 dark:border-emerald-700 text-xs text-stone-800 dark:text-zinc-100 font-medium animate-fadeIn">
            {eligibilityResult}
          </div>
        )}
      </div>

      {/* Search & Filters */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 dark:text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search across 32 schemes: PM-Kisan, KCC, Solar Pump, Tractor 80% subsidy, Fasal Bima..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLiveSearch()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs sm:text-sm text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-600 font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-semibold text-stone-800 dark:text-zinc-200 focus:outline-none focus:border-emerald-600"
            >
              <option value="All">All States (Pan-India)</option>
              {states.filter((s) => s !== "All").map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleLiveSearch()}
              disabled={isLiveSearching}
              className="px-3.5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-stone-800 dark:text-zinc-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              title="Search official websites"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((c) => {
            const count =
              c === "All"
                ? GOVERNMENT_SCHEMES.length
                : GOVERNMENT_SCHEMES.filter((s) => s.category === c).length;

            return (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === c
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-stone-700 dark:text-zinc-300"
                }`}
              >
                <span>{c}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    selectedCategory === c
                      ? "bg-white/20 text-white"
                      : "bg-stone-200 dark:bg-zinc-700 text-stone-600 dark:text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active search filter count */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-zinc-400 pt-1 border-t border-stone-100 dark:border-zinc-800">
          <span>
            Showing <strong>{filteredSchemes.length}</strong> of {GOVERNMENT_SCHEMES.length} government schemes
          </span>
          {(searchTerm || selectedCategory !== "All" || selectedState !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedState("All");
              }}
              className="text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSchemes.map((scheme) => {
          const titleLocal = scheme.titleLocal[language] || scheme.title;

          return (
            <div
              key={scheme.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 hover:border-emerald-500/80 shadow-xs space-y-4 text-stone-900 dark:text-zinc-100 flex flex-col justify-between transition-all hover:shadow-sm"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                      scheme.category
                    )}`}
                  >
                    {scheme.category}
                  </span>

                  <span className="text-[11px] font-medium text-stone-500 dark:text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{scheme.state}</span>
                  </span>
                </div>

                {/* Scheme Title */}
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                  {titleLocal}
                </h3>

                {/* Subsidy Highlight Badge if exists */}
                {scheme.subsidyPercentage && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                    <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>{scheme.subsidyPercentage}</span>
                  </div>
                )}

                {/* Objective */}
                <p className="text-xs text-stone-600 dark:text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                  {scheme.objective}
                </p>

                {/* Key Benefits Box */}
                <div className="mt-3 p-3 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800 space-y-1 text-xs">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Key Farmer Benefit:</span>
                  </div>
                  <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">{scheme.benefits}</p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between gap-2 text-xs">
                <a
                  href={`tel:${scheme.helplinePhone.split("/")[0].trim()}`}
                  className="flex items-center gap-1.5 text-stone-700 dark:text-zinc-300 hover:text-emerald-600 font-semibold"
                  title="Call official helpline"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate max-w-[140px] sm:max-w-[180px]">{scheme.helplinePhone}</span>
                </a>

                <button
                  onClick={() => setActiveSchemeModal(scheme)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                >
                  <span>Eligibility & Apply</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3">
          <Info className="w-8 h-8 text-stone-400 mx-auto" />
          <h4 className="text-base font-bold text-stone-900 dark:text-white">
            No matching schemes found for "{searchTerm}"
          </h4>
          <p className="text-xs text-stone-500 dark:text-zinc-400 max-w-md mx-auto">
            Try searching with general terms like "PM-Kisan", "Solar Pump", "Tractor", "Loan", or click below to search live with Google.
          </p>
          <button
            onClick={() => handleLiveSearch()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
          >
            <Globe className="w-4 h-4" />
            <span>Search with Google Gemini</span>
          </button>
        </div>
      )}

      {/* Scheme Detail Modal */}
      {activeSchemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 dark:bg-zinc-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-2xl p-6 text-stone-900 dark:text-zinc-100 max-h-[90vh] overflow-y-auto space-y-4">
            <button
              onClick={() => setActiveSchemeModal(null)}
              className="absolute top-4 right-4 text-xs font-bold text-stone-400 hover:text-stone-900 dark:hover:text-white p-1 rounded-lg"
            >
              ✕ Close
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                    activeSchemeModal.category
                  )}`}
                >
                  {activeSchemeModal.category}
                </span>
                <span className="text-[11px] text-stone-400">Coverage: {activeSchemeModal.state}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white leading-snug">
                {activeSchemeModal.title}
              </h3>
            </div>

            {/* Subsidy Highlight */}
            {activeSchemeModal.subsidyPercentage && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Subsidy / Financial Aid: {activeSchemeModal.subsidyPercentage}</span>
              </div>
            )}

            {/* Objective & Benefits */}
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-stone-900 dark:text-white block">
                  Official Scheme Objective:
                </span>
                <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">
                  {activeSchemeModal.objective}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 block">
                  Key Benefits & Payouts:
                </span>
                <p className="text-stone-700 dark:text-zinc-300 leading-relaxed">
                  {activeSchemeModal.benefits}
                </p>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800 text-xs space-y-2">
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eligibility Criteria:</span>
              </span>
              <ul className="space-y-1.5 pl-1">
                {activeSchemeModal.eligibility.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-700 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Checklist */}
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800 text-xs space-y-2">
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Required Documents Checklist:</span>
              </span>
              <ul className="space-y-1.5 pl-1">
                {activeSchemeModal.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-stone-700 dark:text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Beneficiaries */}
            {activeSchemeModal.targetBeneficiaries && (
              <div className="text-xs text-stone-600 dark:text-zinc-400">
                <strong>Target Beneficiaries:</strong> {activeSchemeModal.targetBeneficiaries}
              </div>
            )}

            {/* Helpline & Official Link */}
            <div className="pt-2 border-t border-stone-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`tel:${activeSchemeModal.helplinePhone.split("/")[0].trim()}`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-stone-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Toll Free: {activeSchemeModal.helplinePhone}</span>
              </a>

              <a
                href={activeSchemeModal.applyLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply on Official Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
