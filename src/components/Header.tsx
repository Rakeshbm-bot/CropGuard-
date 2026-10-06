import React, { useState, useEffect } from "react";
import {
  Sprout,
  Sun,
  Moon,
  Globe,
  User,
  Wifi,
  WifiOff,
  LogOut,
  Activity,
  AlertTriangle,
  Zap,
  CheckCircle2,
  RefreshCw,
  Cpu,
} from "lucide-react";
import { Language, UserProfile } from "../types";
import { LANGUAGE_NAMES, UI_TRANSLATIONS } from "../data/translations";
import { SupabaseModal } from "./SupabaseModal";

interface CircuitStatus {
  state: "CLOSED" | "OPEN" | "HALF_OPEN";
  failureCount: number;
  cooldownRemainingMs: number;
  pendingTasks?: number;
  activeTasks?: number;
}

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isOnline: boolean;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenProfile?: () => void;
  onOpenAdminModal: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  isDarkMode,
  setIsDarkMode,
  isOnline,
  user,
  onOpenAuth,
  onLogout,
  onOpenProfile,
  onOpenAdminModal,
  isAdminLoggedIn,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Diagnostic Status State for API Quota & Circuit Breaker
  const [circuitStatus, setCircuitStatus] = useState<CircuitStatus | null>({
    state: "CLOSED",
    failureCount: 0,
    cooldownRemainingMs: 0,
    pendingTasks: 0,
    activeTasks: 0,
  });
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);

  // Supabase PostgreSQL Free Tier State & Modal
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  const checkSupabaseStatus = async () => {
    try {
      const res = await fetch("/api/supabase/status");
      if (res.ok) {
        const data = await res.json();
        setSupabaseConnected(Boolean(data.connected));
      }
    } catch (_) {}
  };

  useEffect(() => {
    checkSupabaseStatus();
  }, []);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/system/circuit-status");
        if (res.ok) {
          const data = await res.json();
          if (data.circuit) {
            setCircuitStatus({
              state: data.circuit.state,
              failureCount: data.circuit.failureCount,
              cooldownRemainingMs: data.circuit.cooldownRemainingMs,
              pendingTasks: data.queue?.pendingTasks ?? 0,
              activeTasks: data.queue?.activeTasks ?? 0,
            });
          }
        }
      } catch (_) {}
    };

    fetchStatus();
  }, []);

  const mainTabs = [
    { id: "scan", label: t.tabScan, icon: "🔬" },
    { id: "soil", label: t.tabSoil || "Soil & Crop Match", icon: "🌱" },
    { id: "weather", label: t.tabWeather || "Live Weather", icon: "🌤️" },
    { id: "mandi", label: t.tabMandi, icon: "📈" },
    { id: "schemes", label: t.tabSchemes, icon: "🏛️" },
    { id: "shops", label: t.tabShops, icon: "🏪" },
    { id: "ai_agent", label: t.tabAiAgent, icon: "🤖" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-zinc-900/95 border-b border-stone-200/80 dark:border-zinc-800 text-stone-900 dark:text-zinc-100 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentTab("scan")}>
            <img 
              src="/logo.jpg" 
              alt="CropGuard Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover shadow-sm border border-stone-200 dark:border-zinc-700 group-hover:scale-105 transition-transform" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg sm:text-xl text-stone-900 dark:text-emerald-100 tracking-tight">
                  {t.appName}
                </h1>
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400 hidden md:block">
                {t.subTitle}
              </p>
            </div>
          </div>

          {/* Controls: Online/Offline indicator, Language, Dark/Light, Auth, Admin */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Network Status Badge */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                isOnline
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300"
                  : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300 animate-pulse"
              }`}
              title={isOnline ? t.onlineNotice : t.offlineNotice}
            >
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden md:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Offline</span>
                </>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-stone-200 dark:border-zinc-700 text-stone-800 dark:text-zinc-200 text-xs sm:text-sm font-medium transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{LANGUAGE_NAMES[language].flag}</span>
                <span className="hidden sm:inline">{LANGUAGE_NAMES[language].native}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xl py-1 z-50 divide-y divide-stone-100 dark:divide-zinc-800 max-h-80 overflow-y-auto">
                  {(Object.keys(LANGUAGE_NAMES) as Language[]).map((langKey) => (
                    <button
                      key={langKey}
                      onClick={() => {
                        setLanguage(langKey);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 text-xs sm:text-sm flex items-center justify-between hover:bg-stone-50 dark:hover:bg-zinc-800 transition-colors ${
                        language === langKey ? "bg-emerald-50 dark:bg-emerald-950/80 font-bold text-emerald-800 dark:text-emerald-300" : "text-stone-800 dark:text-zinc-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{LANGUAGE_NAMES[langKey].flag}</span>
                        <span>{LANGUAGE_NAMES[langKey].native}</span>
                      </span>
                      <span className="text-[11px] text-stone-400 dark:text-zinc-400">{LANGUAGE_NAMES[langKey].name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-stone-200 dark:border-zinc-700 text-stone-700 dark:text-amber-300 transition-colors"
              title="Toggle Theme"
              aria-label="Toggle Dark Light Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            {/* Auth / Logged-in Profile Badge: Logo with Starting Letter Only */}
            {user?.isLoggedIn ? (
              <button
                onClick={onOpenProfile}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-sm sm:text-base flex items-center justify-center shadow-xs ring-2 ring-emerald-500/40 hover:ring-emerald-500 transition-all cursor-pointer shrink-0"
                title={`Farmer Profile: ${user.name || "Farmer"}`}
                aria-label="Farmer Profile"
                id="header-farmer-profile-btn"
              >
                {user.name ? user.name.trim().charAt(0).toUpperCase() : "K"}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                id="header-signin-btn"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Sign In / Register</span>
                <span className="xs:hidden">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Field Worker Nav Tabs */}
      {/* Navigation Tabs - Hidden if not logged in (unless Admin) */}
      {(user?.isLoggedIn || isAdminLoggedIn) && (
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth border-t border-stone-200/60 dark:border-zinc-800/60">
          {mainTabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                    : "text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 hover:text-stone-900 dark:hover:text-white"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => setCurrentTab("history")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              currentTab === "history"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                : "text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <span>📜</span>
            <span>{t.tabHistory}</span>
          </button>

          <button
            onClick={() => setCurrentTab("offline")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              currentTab === "offline"
                ? "bg-amber-50 text-amber-900 border border-amber-200/80 shadow-2xs dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                : "text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 hover:text-stone-900 dark:hover:text-white"
            }`}
          >
            <span>📖</span>
            <span>{t.tabOffline}</span>
          </button>
        </nav>
      )}
    </div>

      {/* Real-time System Diagnostic Modal */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                    System Diagnostic & AI Quota
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    Real-time connectivity & rate limit management
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDiagnosticModal(false)}
                className="p-2 rounded-xl text-stone-400 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              {/* Circuit Breaker Status */}
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-stone-500 dark:text-zinc-400 uppercase tracking-wider">
                    Gemini Circuit Status
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      circuitStatus?.state === "OPEN"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : circuitStatus?.state === "HALF_OPEN"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    }`}
                  >
                    {circuitStatus?.state === "CLOSED"
                      ? "Healthy (CLOSED)"
                      : circuitStatus?.state === "OPEN"
                      ? "Cooldown (OPEN)"
                      : "Testing (HALF_OPEN)"}
                  </span>
                </div>

                {circuitStatus?.state === "OPEN" ? (
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    API rate limit triggered. Circuit breaker is buffering requests. Cooldown remaining:{" "}
                    <strong>{Math.ceil((circuitStatus.cooldownRemainingMs || 0) / 1000)} seconds</strong>.
                  </p>
                ) : (
                  <p className="text-xs text-stone-600 dark:text-zinc-300">
                    AI models (gemini-3.7-flash, gemini-3.1-flash-lite, gemini-flash-latest) operational with active rate limit queues.
                  </p>
                )}
              </div>

              {/* Request Queue Status */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80 text-center">
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-zinc-400 block mb-1">
                    Queued Tasks
                  </span>
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {circuitStatus?.pendingTasks || 0}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200/80 dark:border-zinc-700/80 text-center">
                  <span className="text-[11px] font-semibold text-stone-500 dark:text-zinc-400 block mb-1">
                    In-Flight API
                  </span>
                  <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    {circuitStatus?.activeTasks || 0}
                  </span>
                </div>
              </div>

              {/* Automatic Fallback System Guarantee */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 dark:text-emerald-200">
                  <strong className="font-semibold block mb-0.5">Offline Pathology Guarantee</strong>
                  If API quotas are depleted, CropGuard seamlessly falls back to local disease handbooks & verified agronomy rules.
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowDiagnosticModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Close Diagnostic
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supabase PostgreSQL Free Tier Management & Setup Modal */}
      <SupabaseModal
        isOpen={showSupabaseModal}
        onClose={() => {
          setShowSupabaseModal(false);
          checkSupabaseStatus();
        }}
      />
    </header>
  );
};
