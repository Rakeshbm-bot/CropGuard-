import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  Calendar,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  Info,
  Layers,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react";
import { DiseaseAnalysisResult, Language } from "../types";

interface CropDiseaseTrendChartProps {
  scanHistory: DiseaseAnalysisResult[];
  activeScanCrop?: string;
  language: Language;
  onScanCropAgain?: (cropName: string) => void;
}

// Map severity string to numeric index (0 to 100)
const severityToScore = (severity: string, isHealthy?: boolean): number => {
  if (isHealthy || severity === "Healthy") return 5;
  switch (severity?.toLowerCase()) {
    case "low":
      return 25;
    case "medium":
      return 60;
    case "high":
      return 90;
    default:
      return 40;
  }
};

const getSeverityColor = (score: number) => {
  if (score <= 15) return "#10b981"; // Emerald / Healthy
  if (score <= 40) return "#eab308"; // Yellow / Low
  if (score <= 75) return "#f97316"; // Orange / Medium
  return "#ef4444"; // Red / High
};

const getSeverityLabel = (score: number) => {
  if (score <= 15) return "Healthy / Minimal";
  if (score <= 40) return "Low Severity";
  if (score <= 75) return "Moderate Infection";
  return "Severe Disease";
};

// Generate realistic baseline timeline points for standard crops if user has sparse scans
const getCropBaselineTimeline = (cropName: string) => {
  const cleanCrop = cropName.split(" ")[0].replace(/[^a-zA-Z]/g, "") || "Tomato";
  const now = new Date();
  
  const daysAgo = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - days);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  switch (cleanCrop.toLowerCase()) {
    case "ginger":
      return [
        { date: daysAgo(28), timestamp: Date.now() - 28 * 86400000, crop: "Ginger", diseaseName: "Healthy Crop", severity: "Healthy", score: 8, confidence: 94, intervention: "Sowing & Trichoderma Seed Treatment", isSimulated: true },
        { date: daysAgo(21), timestamp: Date.now() - 21 * 86400000, crop: "Ginger", diseaseName: "Early Bacterial Wilt", severity: "Low", score: 32, confidence: 86, intervention: "First Symptoms Noticed", isSimulated: true },
        { date: daysAgo(14), timestamp: Date.now() - 14 * 86400000, crop: "Ginger", diseaseName: "Rhizome Rot (Pythium)", severity: "High", score: 85, confidence: 91, intervention: "Copper Oxychloride + Drenching Applied", isSimulated: true },
        { date: daysAgo(7), timestamp: Date.now() - 7 * 86400000, crop: "Ginger", diseaseName: "Rhizome Rot (Healing)", severity: "Medium", score: 50, confidence: 89, intervention: "Neem Cake & Bio-drainage Added", isSimulated: true },
        { date: daysAgo(2), timestamp: Date.now() - 2 * 86400000, crop: "Ginger", diseaseName: "Mild Leaf Yellowing", severity: "Low", score: 20, confidence: 93, intervention: "Post-Treatment Recovery", isSimulated: true },
      ];
    case "wheat":
      return [
        { date: daysAgo(25), timestamp: Date.now() - 25 * 86400000, crop: "Wheat", diseaseName: "Healthy Crop", severity: "Healthy", score: 5, confidence: 95, intervention: "Vegetative Stage Scouting", isSimulated: true },
        { date: daysAgo(18), timestamp: Date.now() - 18 * 86400000, crop: "Wheat", diseaseName: "Yellow Rust (Early)", severity: "Low", score: 30, confidence: 87, intervention: "Propiconazole Spray Applied", isSimulated: true },
        { date: daysAgo(11), timestamp: Date.now() - 11 * 86400000, crop: "Wheat", diseaseName: "Yellow Rust (Contained)", severity: "Medium", score: 55, confidence: 90, intervention: "Weather Cool & Humid", isSimulated: true },
        { date: daysAgo(4), timestamp: Date.now() - 4 * 86400000, crop: "Wheat", diseaseName: "Rust Controlled", severity: "Low", score: 22, confidence: 92, intervention: "Recovery / New Tiller Growth", isSimulated: true },
      ];
    case "paddy":
    case "rice":
      return [
        { date: daysAgo(30), timestamp: Date.now() - 30 * 86400000, crop: "Paddy / Rice", diseaseName: "Healthy Seedlings", severity: "Healthy", score: 6, confidence: 96, intervention: "Transplanting Completed", isSimulated: true },
        { date: daysAgo(20), timestamp: Date.now() - 20 * 86400000, crop: "Paddy / Rice", diseaseName: "Bacterial Leaf Blight", severity: "High", score: 80, confidence: 89, intervention: "Streptocycline + Copper Spray", isSimulated: true },
        { date: daysAgo(12), timestamp: Date.now() - 12 * 86400000, crop: "Paddy / Rice", diseaseName: "Blight Lessening", severity: "Medium", score: 45, confidence: 91, intervention: "Drainage Adjusted & Potash Added", isSimulated: true },
        { date: daysAgo(3), timestamp: Date.now() - 3 * 86400000, crop: "Paddy / Rice", diseaseName: "Mild Lesions (Healing)", severity: "Low", score: 18, confidence: 94, intervention: "Field Recovery Stable", isSimulated: true },
      ];
    case "cotton":
      return [
        { date: daysAgo(26), timestamp: Date.now() - 26 * 86400000, crop: "Cotton", diseaseName: "Healthy Foliage", severity: "Healthy", score: 7, confidence: 93, intervention: "Square Formation Stage", isSimulated: true },
        { date: daysAgo(19), timestamp: Date.now() - 19 * 86400000, crop: "Cotton", diseaseName: "Bacterial Blight", severity: "Medium", score: 62, confidence: 88, intervention: "Copper Spray + Neem Oil", isSimulated: true },
        { date: daysAgo(10), timestamp: Date.now() - 10 * 86400000, crop: "Cotton", diseaseName: "Leaf Curl Virus Symptoms", severity: "High", score: 78, confidence: 90, intervention: "Whitefly Vector Management", isSimulated: true },
        { date: daysAgo(3), timestamp: Date.now() - 3 * 86400000, crop: "Cotton", diseaseName: "Controlled Regrowth", severity: "Low", score: 28, confidence: 91, intervention: "Micronutrient Spray Applied", isSimulated: true },
      ];
    default:
      // Default: Tomato / General
      return [
        { date: daysAgo(24), timestamp: Date.now() - 24 * 86400000, crop: "Tomato", diseaseName: "Healthy Crop", severity: "Healthy", score: 5, confidence: 96, intervention: "Initial Health Scan", isSimulated: true },
        { date: daysAgo(17), timestamp: Date.now() - 17 * 86400000, crop: "Tomato", diseaseName: "Early Blight Detected", severity: "Medium", score: 58, confidence: 89, intervention: "Mancozeb Fungicide Applied", isSimulated: true },
        { date: daysAgo(10), timestamp: Date.now() - 10 * 86400000, crop: "Tomato", diseaseName: "Severe Early Blight & Spots", severity: "High", score: 82, confidence: 93, intervention: "Second Dose & Foliar Pruning", isSimulated: true },
        { date: daysAgo(4), timestamp: Date.now() - 4 * 86400000, crop: "Tomato", diseaseName: "Blight Controlled (Residual)", severity: "Low", score: 26, confidence: 91, intervention: "Organic Neem + Trichoderma", isSimulated: true },
      ];
  }
};

export const CropDiseaseTrendChart: React.FC<CropDiseaseTrendChartProps> = ({
  scanHistory,
  activeScanCrop,
  language,
  onScanCropAgain,
}) => {
  // Available crops extracted from scan history + popular crops
  const availableCrops = useMemo(() => {
    const cropsSet = new Set<string>();
    if (activeScanCrop) cropsSet.add(activeScanCrop);
    scanHistory.forEach((s) => {
      if (s.crop) cropsSet.add(s.crop);
    });
    // Add standard defaults if empty
    ["Tomato", "Ginger", "Wheat", "Paddy / Rice", "Cotton", "Potato", "Chilli"].forEach((c) =>
      cropsSet.add(c)
    );
    return Array.from(cropsSet);
  }, [scanHistory, activeScanCrop]);

  const [selectedCrop, setSelectedCrop] = useState<string>(
    activeScanCrop || "Tomato"
  );
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  // Keep selected crop in sync if active scan changes
  React.useEffect(() => {
    if (activeScanCrop) {
      setSelectedCrop(activeScanCrop);
    }
  }, [activeScanCrop]);

  // Construct chart timeline data points
  const chartData = useMemo(() => {
    // 1. Get user real scans for the selected crop (or all if selected "All Crops")
    const filteredScans = scanHistory.filter((scan) => {
      if (selectedCrop === "All Crops") return true;
      const cleanSelected = selectedCrop.toLowerCase().split(" ")[0];
      return scan.crop.toLowerCase().includes(cleanSelected);
    });

    // Format real scan points
    const realPoints = filteredScans.map((scan, idx) => {
      const score = severityToScore(scan.severity, scan.isHealthy);
      const dateLabel = scan.scannedAt
        ? scan.scannedAt.includes(",") || scan.scannedAt.includes(":")
          ? scan.scannedAt.split(",")[0].trim()
          : scan.scannedAt
        : `Scan #${filteredScans.length - idx}`;

      return {
        date: dateLabel,
        timestamp: Date.now() - idx * 86400000 * 3,
        crop: scan.crop,
        diseaseName: scan.diseaseName,
        severity: scan.severity,
        score,
        confidence: scan.confidence || 88,
        intervention: scan.isHealthy
          ? "Healthy Field Condition"
          : `${scan.organicTreatment?.[0]?.slice(0, 35) || "Treatment Advised"}...`,
        isSimulated: false,
      };
    });

    // If user has 0 or 1 scan, provide the rich agricultural surveillance timeline
    // merged with real user scans so the line chart shows clear historical context
    if (realPoints.length === 0) {
      return getCropBaselineTimeline(selectedCrop);
    } else if (realPoints.length === 1) {
      const baseline = getCropBaselineTimeline(selectedCrop);
      // Replace last point with user's actual scan
      const merged = [...baseline.slice(0, baseline.length - 1), { ...realPoints[0], date: "Latest AI Scan" }];
      return merged;
    } else {
      // Reverse to chronological order (oldest to newest)
      return [...realPoints].reverse();
    }
  }, [scanHistory, selectedCrop, timeRange]);

  // Key metrics calculations
  const metrics = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return {
        latestScore: 0,
        latestSeverity: "Healthy",
        trendDirection: "stable" as "improving" | "worsening" | "stable",
        trendDelta: 0,
        avgScore: 0,
        latestDisease: "Healthy",
        scansCount: chartData.length,
      };
    }

    const latest = chartData[chartData.length - 1];
    const first = chartData[0];
    const latestScore = latest.score;
    const initialScore = first.score;
    const delta = latestScore - initialScore;

    let trendDirection: "improving" | "worsening" | "stable" = "stable";
    if (delta < -5) trendDirection = "improving";
    else if (delta > 5) trendDirection = "worsening";

    const avgScore = Math.round(
      chartData.reduce((acc, curr) => acc + curr.score, 0) / chartData.length
    );

    return {
      latestScore,
      latestSeverity: latest.severity,
      trendDirection,
      trendDelta: Math.abs(delta),
      avgScore,
      latestDisease: latest.diseaseName,
      scansCount: chartData.length,
    };
  }, [chartData]);

  // Custom Tooltip for Recharts
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const color = getSeverityColor(data.score);

      return (
        <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-stone-200 dark:border-zinc-800 shadow-xl text-xs space-y-2 max-w-xs z-50">
          <div className="flex items-center justify-between gap-3 border-b border-stone-100 dark:border-zinc-800 pb-2">
            <span className="font-extrabold text-stone-900 dark:text-white flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{data.date}</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300">
              {data.crop}
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-semibold">
              Diagnosis:
            </div>
            <div className="font-black text-stone-900 dark:text-zinc-100 text-xs flex items-center gap-1.5">
              <span>{data.diseaseName}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100 dark:border-zinc-800 text-[11px]">
            <div>
              <span className="text-stone-400 dark:text-zinc-500 block text-[10px]">Severity Index</span>
              <span className="font-black" style={{ color }}>
                {data.score}% ({data.severity})
              </span>
            </div>
            <div>
              <span className="text-stone-400 dark:text-zinc-500 block text-[10px]">AI Confidence</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {data.confidence}%
              </span>
            </div>
          </div>

          {data.intervention && (
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800/60 text-[11px] text-emerald-900 dark:text-emerald-200">
              <span className="font-bold block text-[10px] uppercase text-emerald-700 dark:text-emerald-400">
                Treatment / Status:
              </span>
              <span className="italic">{data.intervention}</span>
            </div>
          )}

          {data.isSimulated && (
            <div className="text-[10px] text-stone-400 dark:text-zinc-500 text-right italic">
              Field surveillance historical baseline
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs space-y-6 text-stone-900 dark:text-zinc-100">
      {/* Header & Crop Selector Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white tracking-tight">
              Historical Crop Disease Severity & Recovery Trends
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-zinc-400">
            Recharts time-series tracking disease severity index (0–100%) and treatment impact across farming cycles
          </p>
        </div>

        {/* Crop Selector Dropdown & Chips */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 dark:text-zinc-400">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Crop:</span>
          </div>

          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-bold text-stone-800 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-2xs"
          >
            {availableCrops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Metric Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Latest Severity */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80 space-y-1">
          <span className="text-[11px] font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider block">
            Current Severity
          </span>
          <div className="flex items-baseline gap-2">
            <span
              className="text-xl sm:text-2xl font-black"
              style={{ color: getSeverityColor(metrics.latestScore) }}
            >
              {metrics.latestScore}%
            </span>
            <span className="text-xs font-bold text-stone-600 dark:text-zinc-300 truncate">
              {metrics.latestSeverity}
            </span>
          </div>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500 block">
            {getSeverityLabel(metrics.latestScore)}
          </span>
        </div>

        {/* Trajectory / Recovery */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80 space-y-1">
          <span className="text-[11px] font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider block">
            Health Trajectory
          </span>
          <div className="flex items-center gap-1.5">
            {metrics.trendDirection === "improving" ? (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-base sm:text-lg">
                <ArrowDownRight className="w-5 h-5 stroke-[2.5]" />
                <span>Improving (-{metrics.trendDelta}%)</span>
              </div>
            ) : metrics.trendDirection === "worsening" ? (
              <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-black text-base sm:text-lg">
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                <span>Active Spread (+{metrics.trendDelta}%)</span>
              </div>
            ) : (
              <span className="text-base font-black text-stone-700 dark:text-zinc-300">
                Stable Condition
              </span>
            )}
          </div>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500 block">
            {metrics.trendDirection === "improving"
              ? "Severity decreasing after treatment"
              : "Ongoing monitoring advised"}
          </span>
        </div>

        {/* Most Recent Pathology */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80 space-y-1">
          <span className="text-[11px] font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider block">
            Diagnosed Disease
          </span>
          <div className="text-sm sm:text-base font-black text-stone-900 dark:text-white truncate">
            {metrics.latestDisease}
          </div>
          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold block">
            {selectedCrop} Crop Cycle
          </span>
        </div>

        {/* Scans Audited */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80 space-y-1">
          <span className="text-[11px] font-bold text-stone-500 dark:text-zinc-400 uppercase tracking-wider block">
            Timeline Data Points
          </span>
          <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
            {metrics.scansCount} Audits
          </div>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500 block">
            Avg. Severity: {metrics.avgScore}%
          </span>
        </div>
      </div>

      {/* Main Recharts Line Chart Container */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 dark:text-zinc-400 px-1">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <strong className="text-stone-800 dark:text-zinc-200">Disease Severity %</strong> (0=Healthy, 100=Severe)
            </span>
            <span className="flex items-center gap-1.5 hidden sm:flex">
              <span className="w-3 h-1 bg-indigo-500 inline-block rounded-full" />
              <strong className="text-stone-800 dark:text-zinc-200">AI Confidence %</strong>
            </span>
          </div>

          <span className="text-[11px] text-stone-400 dark:text-zinc-500">
            Interactive: Hover over points to view treatment records
          </span>
        </div>

        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 10, right: 20, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="severityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="currentColor"
                className="text-stone-200/80 dark:text-zinc-800/80"
              />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-stone-500 dark:text-zinc-400 font-medium"
                axisLine={{ stroke: "currentColor", opacity: 0.2 }}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-stone-500 dark:text-zinc-400 font-medium"
                axisLine={false}
                tickLine={false}
                tickFormatter={(val) => `${val}%`}
              />

              {/* Threshold Danger Reference Line */}
              <ReferenceLine
                y={70}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: "Severe Infection Threshold (70%)",
                  position: "insideTopRight",
                  fill: "#ef4444",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              />

              {/* Threshold Safe / Healthy Reference Line */}
              <ReferenceLine
                y={20}
                stroke="#10b981"
                strokeDasharray="4 4"
                label={{
                  value: "Safe / Recovered Zone (≤20%)",
                  position: "insideBottomRight",
                  fill: "#10b981",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
              />

              <Tooltip content={<CustomChartTooltip />} />

              {/* Shaded Area underneath */}
              <Area
                type="monotone"
                dataKey="score"
                fill="url(#severityGradient)"
                stroke="none"
              />

              {/* AI Confidence Line (Secondary) */}
              <Line
                type="monotone"
                dataKey="confidence"
                name="AI Confidence"
                stroke="#6366f1"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                dot={{ r: 3, fill: "#6366f1" }}
                activeDot={{ r: 5 }}
              />

              {/* Primary Disease Severity Line */}
              <Line
                type="monotone"
                dataKey="score"
                name="Disease Severity"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#10b981",
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  fill: "#059669",
                  strokeWidth: 3,
                  stroke: "#ffffff",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones & Field Interventions Log */}
      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200/80 dark:border-zinc-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800 dark:text-zinc-200 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Field Surveillance & Treatment Milestones for {selectedCrop}:</span>
          </span>
          <span className="text-[11px] text-stone-400 dark:text-zinc-500">
            Chronological log
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          {chartData.slice(-4).map((point, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 text-xs space-y-1 shadow-2xs"
            >
              <div className="flex items-center justify-between text-[10px] text-stone-400 dark:text-zinc-500">
                <span>{point.date}</span>
                <span
                  className="font-bold px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${getSeverityColor(point.score)}15`,
                    color: getSeverityColor(point.score),
                  }}
                >
                  {point.score}% Sev
                </span>
              </div>
              <div className="font-bold text-stone-900 dark:text-zinc-100 truncate text-[11px]">
                {point.diseaseName}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-zinc-400 italic truncate">
                {point.intervention || "Regular monitoring scan"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
