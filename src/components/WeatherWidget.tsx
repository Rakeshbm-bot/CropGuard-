import React, { useState, useEffect } from "react";
import {
  Sun,
  CloudRain,
  Cloud,
  Wind,
  Droplets,
  MapPin,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Thermometer,
  Sparkles,
  Gauge,
  Compass,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  Search,
  LocateFixed,
} from "lucide-react";
import { Language, WeatherInfo } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface WeatherWidgetProps {
  language: Language;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ language }) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const [searchLocation, setSearchLocation] = useState("");
  const [currentLocationName, setCurrentLocationName] = useState<string>("");
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedForecastIndex, setSelectedForecastIndex] = useState<number>(0);
  const [gpsStatusMsg, setGpsStatusMsg] = useState<string | null>(null);
  const [isGpsActive, setIsGpsActive] = useState(false);

  const fetchWeather = async (locStr?: string, lat?: number, lon?: number) => {
    setLoading(true);
    try {
      const payload: { location?: string; lat?: number; lon?: number } = {};
      if (lat !== undefined && lon !== undefined) {
        payload.lat = lat;
        payload.lon = lon;
      } else if (locStr) {
        payload.location = locStr;
      } else if (currentLocationName) {
        payload.location = currentLocationName;
      }

      const response = await fetch("/api/weather", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();
      setLoading(false);
      if (json.success && json.data) {
        setWeather(json.data);
        if (json.data.locationName) {
          setCurrentLocationName(json.data.locationName);
        }
        setSelectedForecastIndex(0);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  // Live GPS Permission Request Handler
  const handleRequestGpsWeather = () => {
    if (!("geolocation" in navigator)) {
      setGpsStatusMsg("GPS Geolocation is not supported by your browser. Please search by village or district name.");
      fetchWeather();
      return;
    }

    setLoading(true);
    setGpsStatusMsg("Detecting live location to fetch real-time field weather...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setIsGpsActive(true);
        setGpsStatusMsg(`📍 Live Location Connected (${lat.toFixed(3)}°N, ${lon.toFixed(3)}°E). Showing real-time field weather.`);
        fetchWeather(undefined, lat, lon);
      },
      (err) => {
        setIsGpsActive(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsStatusMsg("GPS permission was denied. Showing weather or search any village, taluka, or district name below.");
        } else {
          setGpsStatusMsg("Unable to retrieve GPS coordinates automatically. Please search your location below.");
        }
        fetchWeather();
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Initial load: automatically request live device location
  useEffect(() => {
    handleRequestGpsWeather();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchLocation.trim()) {
      setIsGpsActive(false);
      setGpsStatusMsg(null);
      setCurrentLocationName(searchLocation.trim());
      fetchWeather(searchLocation.trim());
    }
  };

  const getWeatherIcon = (cond: string = "") => {
    const c = cond.toLowerCase();
    if (c.includes("rain") || c.includes("shower") || c.includes("drizzle")) {
      return <CloudRain className="w-8 h-8 text-sky-300" />;
    }
    if (c.includes("cloud") || c.includes("overcast")) {
      return <Cloud className="w-8 h-8 text-stone-200" />;
    }
    return <Sun className="w-8 h-8 text-amber-300 animate-pulse" />;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Search & Location Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs space-y-4 text-stone-900 dark:text-zinc-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                <Sun className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-amber-100 tracking-tight">
                {t.weatherTitle || "Live Agricultural Weather Forecast"}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-zinc-400">
              {t.weatherSubtitle || "Real-time forecast, 7-day outlook & pesticide spray window suitability"}
            </p>
          </div>

          {/* Action Buttons: Live GPS & Refresh */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRequestGpsWeather}
              disabled={loading}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all shrink-0 cursor-pointer ${
                isGpsActive
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <LocateFixed className={`w-4 h-4 ${loading && isGpsActive ? "animate-spin" : ""}`} />
              <span>{isGpsActive ? "Live Location Active" : "📍 Live Location"}</span>
            </button>

            <button
              onClick={() => fetchWeather(currentLocationName || undefined)}
              disabled={loading}
              className="px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shrink-0 border border-stone-200 dark:border-zinc-700 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading && !isGpsActive ? "animate-spin text-emerald-600" : ""}`} />
              <span>{t.fetchWeather || "Get Weather"}</span>
            </button>
          </div>
        </div>

        {/* GPS Feedback Notice */}
        {gpsStatusMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2 shadow-2xs">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{gpsStatusMsg}</span>
          </div>
        )}

        {/* Location Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t.searchWeatherPlaceholder || "Search village, taluka, district or city (e.g. Pune, Ludhiana, Guntur, Anand)..."}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 text-xs sm:text-sm text-stone-900 dark:text-zinc-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>{t.fetchWeather || "Get Weather"}</span>
          </button>
        </form>
      </div>

      {loading && !weather && (
        <div className="p-12 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 shadow-xs">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-stone-600 dark:text-zinc-300">
            Fetching latest agricultural weather forecast...
          </p>
        </div>
      )}

      {weather && (
        <div className="space-y-6">
          {/* Main Weather & Spray Advisory Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Weather Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-sky-900 text-white shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
              {/* Background ambient pattern */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-100 bg-white/10 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                    <span className="truncate max-w-[180px]">{weather.locationName || currentLocationName || "Live Field Location"}</span>
                  </div>
                  <span className="text-[11px] font-medium text-emerald-200 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Live
                  </span>
                </div>

                <div className="flex items-baseline justify-between mt-5">
                  <div>
                    <h3 className="text-5xl sm:text-6xl font-black tracking-tight">{weather.temp ?? weather.tempC}°C</h3>
                    <p className="text-xs text-emerald-100 font-medium mt-1">
                      Feels like {weather.feelsLike}°C • {weather.condition}
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
                    {getWeatherIcon(weather.condition)}
                  </div>
                </div>
              </div>

              {/* Weather Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/15 text-center text-xs">
                <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs">
                  <div className="flex items-center justify-center gap-1 text-emerald-200 text-[10px] mb-0.5">
                    <Droplets className="w-3 h-3" />
                    <span>{t.humidity || "Humidity"}</span>
                  </div>
                  <span className="text-sm font-black">{weather.humidity}%</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs">
                  <div className="flex items-center justify-center gap-1 text-emerald-200 text-[10px] mb-0.5">
                    <Wind className="w-3 h-3" />
                    <span>{t.windSpeed || "Wind"}</span>
                  </div>
                  <span className="text-sm font-black">{weather.windSpeed ?? weather.windKm} km/h</span>
                </div>

                <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs">
                  <div className="flex items-center justify-center gap-1 text-emerald-200 text-[10px] mb-0.5">
                    <CloudRain className="w-3 h-3" />
                    <span>{t.rainChance || "Rain"}</span>
                  </div>
                  <span className="text-sm font-black">{weather.rainProbability ?? weather.precipChance}%</span>
                </div>
              </div>
            </div>

            {/* Spray Suitability & Farm Advisory Card */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-4 text-stone-900 dark:text-zinc-100">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/80 dark:border-zinc-800">
                  <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span>{t.sprayAdvisory || "Pesticide Spray Suitability & Advisory"}</span>
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 ${
                      weather.sprayCondition === "Optimal"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:border-emerald-800 dark:text-emerald-300"
                        : weather.sprayCondition === "Caution"
                        ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-300"
                        : "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/80 dark:border-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {weather.sprayCondition === "Optimal" ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    <span>{weather.sprayCondition} Spray Window</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 mt-3 leading-relaxed p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-800">
                  {weather.sprayAdvice || weather.sprayAdvisory?.reason}
                </p>
              </div>

              {/* 3 Practical Agricultural Alert Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Best Spray Hours</span>
                  </div>
                  <p className="text-stone-600 dark:text-zinc-300 text-[11px] leading-snug">
                    {weather.sprayAdvisory?.bestTimeWindow || "06:00 AM – 08:30 AM"} (Minimal wind & calm leaf surface)
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Pest / Fungal Risk</span>
                  </div>
                  <p className="text-stone-600 dark:text-zinc-300 text-[11px] leading-snug">
                    {weather.farmingAdvisory?.pestRiskAdvice || "Inspect underside of leaves during morning hours."}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/70 dark:border-sky-800/60 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-sky-800 dark:text-sky-300">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Irrigation Advice</span>
                  </div>
                  <p className="text-stone-600 dark:text-zinc-300 text-[11px] leading-snug">
                    {weather.farmingAdvisory?.irrigationAdvice || "Evening drip irrigation advised to conserve soil moisture."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Farming Outlook Forecast */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                  {t.forecast7Day || "7-Day Farming Outlook Forecast"}
                </h3>
              </div>
              <span className="text-xs font-semibold text-stone-500 dark:text-zinc-400">
                Click any day for advice
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.forecast.map((fc, idx) => {
                const isSelected = selectedForecastIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedForecastIndex(idx)}
                    className={`p-3.5 rounded-2xl text-center space-y-2 transition-all border text-left cursor-pointer ${
                      isSelected
                        ? "bg-emerald-50/90 border-emerald-500 shadow-xs dark:bg-emerald-950/50 dark:border-emerald-500 ring-2 ring-emerald-500/20"
                        : "bg-stone-50/80 hover:bg-stone-100/90 dark:bg-zinc-800/70 dark:hover:bg-zinc-800 border-stone-200 dark:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-stone-800 dark:text-zinc-200">{fc.day}</span>
                      {fc.date && <span className="text-[10px] text-stone-500 dark:text-zinc-400">{fc.date}</span>}
                    </div>

                    <div className="text-2xl flex justify-center py-1">
                      {fc.condition?.includes("Rain") ? "🌧️" : fc.condition?.includes("Cloud") ? "⛅" : "☀️"}
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs font-black text-stone-900 dark:text-white">
                      <span>{fc.tempMax ?? fc.temp}°</span>
                      <span className="text-stone-400 dark:text-zinc-500 font-normal">/ {fc.tempMin ?? fc.temp - 6}°C</span>
                    </div>

                    {/* Rain probability bar */}
                    <div className="w-full bg-stone-200 dark:bg-zinc-700 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-sky-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.min(100, Math.max(5, fc.rainProb))}%` }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-sky-700 dark:text-sky-300">
                      💧 {fc.rainProb}% Rain
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Expanded Farming Advice */}
            {weather.forecast[selectedForecastIndex] && (
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 flex items-start gap-3">
                <span className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    Farming Tip for {weather.forecast[selectedForecastIndex].day} ({weather.forecast[selectedForecastIndex].date || "Upcoming"}):
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-zinc-300 mt-1">
                    {weather.forecast[selectedForecastIndex].farmingAdvice ||
                      "Conditions are favorable for routine fertilizer application and crop scouting."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 24-Hour Hourly Temperature & Rain Progression */}
          {weather.hourly && weather.hourly.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  {t.hourlyForecast || "24-Hour Temperature & Rain Probability Timeline"}
                </h3>
              </div>

              <div className="overflow-x-auto pb-2 pt-2 scrollbar-thin">
                <div className="flex gap-2.5 min-w-max">
                  {weather.hourly.slice(0, 16).map((hr, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/70 dark:border-zinc-700 text-center w-20 space-y-1.5 shrink-0"
                    >
                      <p className="text-[11px] font-bold text-stone-500 dark:text-zinc-400">{hr.time}</p>
                      <div className="text-lg">
                        {hr.condition.includes("Rain") ? "🌧️" : hr.condition.includes("Cloud") ? "⛅" : "☀️"}
                      </div>
                      <p className="text-xs font-black text-stone-900 dark:text-white">{hr.temp}°C</p>
                      <div className="text-[10px] font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 rounded-md py-0.5">
                        {hr.rainProb}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
