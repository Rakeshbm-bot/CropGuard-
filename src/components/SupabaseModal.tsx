import React, { useState, useEffect } from "react";
import {
  Database,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  X,
  Sparkles,
  ArrowRight,
  Server,
  Layers,
  ShieldAlert,
  Radio,
  Zap,
  Key,
  Lock,
  Flame,
} from "lucide-react";
import {
  checkSupabaseStatus,
  syncRecordsToSupabase,
  SUPABASE_SQL_SETUP,
  SUPABASE_QUICK_FIX_SQL,
  SupabaseStatusResponse,
  getRealtimeEventLog,
  onRealtimeEvent,
  getRealtimeChannelStatus,
  triggerRealtimeTestEvent,
  saveCustomSupabaseConfig,
  resetCustomSupabaseConfig,
  supabaseUrl,
  supabaseAnonKey,
  getSupabaseAuthAuditInfo,
  SupabaseRealtimeEvent,
} from "../lib/supabase";

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<SupabaseStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedQuickFix, setCopiedQuickFix] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedRedirect, setCopiedRedirect] = useState(false);
  const [activeTab, setActiveTab] = useState<"realtime" | "status" | "auth" | "config" | "schema">("realtime");

  // Realtime state
  const [realtimeEvents, setRealtimeEvents] = useState<SupabaseRealtimeEvent[]>([]);
  const [testingRealtime, setTestingRealtime] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState({ status: "STANDBY", eventCount: 0, isConnected: false });

  // Custom Config state
  const [inputUrl, setInputUrl] = useState(supabaseUrl);
  const [inputKey, setInputKey] = useState(supabaseAnonKey);
  const [savingConfig, setSavingConfig] = useState(false);
  const [configMessage, setConfigMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const audit = getSupabaseAuthAuditInfo();

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await checkSupabaseStatus();
      setStatus(res);
      setRealtimeStatus(getRealtimeChannelStatus());
    } catch (err) {
      console.warn("Error checking Supabase status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStatus();
      setSyncResult(null);
      setRealtimeEvents(getRealtimeEventLog());

      // Subscribe to real-time events in the modal
      const unsubscribe = onRealtimeEvent((newEvent) => {
        setRealtimeEvents((prev) => [newEvent, ...prev.slice(0, 49)]);
        setRealtimeStatus(getRealtimeChannelStatus());
      });

      return () => {
        unsubscribe();
      };
    }
  }, [isOpen]);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SETUP);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleCopyQuickFix = () => {
    navigator.clipboard.writeText(SUPABASE_QUICK_FIX_SQL);
    setCopiedQuickFix(true);
    setTimeout(() => setCopiedQuickFix(false), 2500);
  };

  const handleCopyEnv = () => {
    const text = `SUPABASE_URL="${inputUrl || "https://your-project.supabase.co"}"\nSUPABASE_ANON_KEY="${inputKey || "your-anon-public-key"}"`;
    navigator.clipboard.writeText(text);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2500);
  };

  const handleCopyRedirect = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedRedirect(true);
    setTimeout(() => setCopiedRedirect(false), 2000);
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await syncRecordsToSupabase();
      setSyncResult(res.message);
      await loadStatus();
    } catch (err: any) {
      setSyncResult("Error syncing: " + (err.message || "Unknown"));
    } finally {
      setSyncing(false);
    }
  };

  const handleTriggerRealtime = async () => {
    setTestingRealtime(true);
    try {
      const res = await triggerRealtimeTestEvent();
      if (res.success) {
        setSyncResult(res.message);
      }
    } catch (err: any) {
      console.warn("Realtime test error:", err);
    } finally {
      setTestingRealtime(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim() || !inputKey.trim()) {
      setConfigMessage({ text: "Please enter both Project URL and Anon Key.", isError: true });
      return;
    }

    setSavingConfig(true);
    setConfigMessage(null);
    try {
      await saveCustomSupabaseConfig(inputUrl.trim(), inputKey.trim());
      setConfigMessage({ text: "Supabase credentials updated! Verifying connection...", isError: false });
      await loadStatus();
    } catch (err: any) {
      setConfigMessage({ text: err.message || "Failed to update configuration", isError: true });
    } finally {
      setSavingConfig(false);
    }
  };

  const handleResetConfig = () => {
    resetCustomSupabaseConfig();
    setInputUrl("");
    setInputKey("");
    setConfigMessage({ text: "Restored default configuration.", isError: false });
    loadStatus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-100 dark:border-zinc-800/80 bg-stone-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-stone-900 dark:text-zinc-100">
                  Supabase Authentication & Real-Time DB
                </h3>
                {status?.connected ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Realtime
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-3 h-3" /> Setup Needed
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                Real-time WebSocket replication, Supabase Auth (Email, Phone, Google OAuth) & PostgreSQL storage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 dark:border-zinc-800 px-6 bg-white dark:bg-zinc-900 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("realtime")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "realtime"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" /> Live Real-Time Stream
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "status"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Server className="w-4 h-4" /> Database & Tables
          </button>
          <button
            onClick={() => setActiveTab("auth")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "auth"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Lock className="w-4 h-4" /> Auth Providers
          </button>
          <button
            onClick={() => setActiveTab("config")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "config"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Key className="w-4 h-4" /> Credentials
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "schema"
                ? "border-emerald-600 text-emerald-700 dark:text-emerald-400"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Layers className="w-4 h-4" /> SQL Schema
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* TAB 1: REAL-TIME STREAM */}
          {activeTab === "realtime" && (
            <div className="space-y-5">
              {/* Realtime Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                      Supabase Realtime Channel: <span className="font-mono text-xs bg-emerald-200/60 dark:bg-emerald-900/60 px-2 py-0.5 rounded">cropguard_realtime_stream</span>
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">
                      Listening to changes on <code className="font-semibold">crop_scans</code>, <code className="font-semibold">farmers</code>, and <code className="font-semibold">kisan_chats</code>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleTriggerRealtime}
                  disabled={testingRealtime}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all self-stretch sm:self-auto justify-center"
                >
                  <Zap className={`w-3.5 h-3.5 ${testingRealtime ? "animate-spin" : ""}`} />
                  {testingRealtime ? "Broadcasting..." : "⚡ Test Real-Time Event"}
                </button>
              </div>

              {/* Real-time Subscribed Tables Overview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700 dark:text-zinc-300">crop_scans</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 block">
                    INSERT & UPDATE events
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700 dark:text-zinc-300">farmers</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 block">
                    Registrations & Logins
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-800/40">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-700 dark:text-zinc-300">kisan_chats</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1 block">
                    AI Consultation Logs
                  </span>
                </div>
              </div>

              {/* Real-time Event Stream Log */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-stone-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-emerald-500" /> Real-time Live Event Log ({realtimeEvents.length})
                  </h5>
                  <span className="text-[11px] text-stone-400">Updates instantly via WebSocket</span>
                </div>

                <div className="bg-stone-900 rounded-2xl p-3 border border-stone-800 max-h-[280px] overflow-y-auto font-mono text-xs text-stone-300 space-y-2">
                  {realtimeEvents.length === 0 ? (
                    <div className="py-8 text-center text-stone-500">
                      <Radio className="w-8 h-8 mx-auto mb-2 opacity-40 animate-pulse" />
                      <p>Waiting for database changes...</p>
                      <p className="text-[11px] mt-1 text-stone-600">
                        Click "⚡ Test Real-Time Event" or perform a crop scan to see live events stream here.
                      </p>
                    </div>
                  ) : (
                    realtimeEvents.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col gap-1 hover:border-emerald-800/80 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
                                evt.eventType === "INSERT"
                                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                  : evt.eventType === "UPDATE"
                                  ? "bg-blue-950 text-blue-400 border border-blue-800"
                                  : "bg-purple-950 text-purple-400 border border-purple-800"
                              }`}
                            >
                              {evt.eventType}
                            </span>
                            <span className="text-emerald-300 font-bold">{evt.table}</span>
                          </div>
                          <span className="text-stone-500">{new Date(evt.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <div className="text-[11px] text-stone-400 overflow-x-auto truncate">
                          {evt.record?.crop ? (
                            <span>
                              🌾 Crop: <strong className="text-stone-200">{evt.record.crop}</strong> (
                              {evt.record.disease_name || evt.record.diseaseName || "Healthy"})
                            </span>
                          ) : evt.record?.name ? (
                            <span>
                              👤 Farmer: <strong className="text-stone-200">{evt.record.name}</strong> ({evt.record.location})
                            </span>
                          ) : evt.record?.message ? (
                            <span>
                              💬 Message: <strong className="text-stone-200">{evt.record.message.slice(0, 60)}...</strong>
                            </span>
                          ) : (
                            JSON.stringify(evt.record).slice(0, 80)
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATABASE & STATUS */}
          {activeTab === "status" && (
            <div className="space-y-6">
              {/* Connection Status Card */}
              <div
                className={`p-5 rounded-2xl border ${
                  status?.connected
                    ? "bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/60"
                    : "bg-stone-50 border-stone-200 dark:bg-zinc-800/40 dark:border-zinc-800"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-stone-500 dark:text-zinc-400">
                      Supabase PostgreSQL Instance
                    </span>
                    <h4 className="text-base font-bold text-stone-900 dark:text-zinc-100 flex items-center gap-2">
                      {status?.connected ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          Connected & Synchronized
                        </>
                      ) : status?.configured ? (
                        <>
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                          Connected (Tables Pending in Supabase)
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="w-5 h-5 text-stone-400" />
                          Demo Standby (Ready to connect)
                        </>
                      )}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-zinc-300">
                      {status?.notice ||
                        (status?.connected
                          ? "Real-time bidirectional sync active. Crop disease diagnoses and farmer accounts are mirrored to PostgreSQL."
                          : "Connect your Supabase project in the 'Credentials' tab to enable permanent cloud storage.")}
                    </p>
                  </div>

                  <button
                    onClick={loadStatus}
                    disabled={loading}
                    className="p-2 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-stone-50 dark:hover:bg-zinc-700 transition-colors"
                    title="Test connection again"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                {status?.url && (
                  <div className="mt-4 pt-3 border-t border-stone-200/60 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="text-stone-500 dark:text-zinc-400">Project Endpoint:</span>
                    <code className="font-mono bg-white dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-zinc-700 text-emerald-700 dark:text-emerald-300 font-semibold">
                      {status.url}
                    </code>
                  </div>
                )}

                {status?.permissionsNeedGrant && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                    <div className="flex items-center justify-between font-bold">
                      <span className="flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        Table Grant Needed for Direct Queries
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (status.sqlGrantSnippet) {
                            navigator.clipboard.writeText(status.sqlGrantSnippet);
                            setCopiedQuickFix(true);
                            setTimeout(() => setCopiedQuickFix(false), 2000);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedQuickFix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedQuickFix ? "Copied SQL!" : "Copy Grant Script"}
                      </button>
                    </div>
                    <p className="text-[11px] opacity-90">
                      Supabase Auth is active and saving users. To enable direct table reads/writes from the browser, paste and run the 1-click script in <strong>Supabase Dashboard → SQL Editor</strong>.
                    </p>
                  </div>
                )}
              </div>

              {/* Stats & Actions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-800/20">
                  <span className="text-xs text-stone-500 dark:text-zinc-400 block font-medium">
                    Farmers in Supabase
                  </span>
                  <div className="text-2xl font-bold text-stone-900 dark:text-zinc-100 mt-1">
                    {status?.farmersCount !== undefined ? status.farmersCount : "—"}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-800/20">
                  <span className="text-xs text-stone-500 dark:text-zinc-400 block font-medium">
                    Crop Scans in Supabase
                  </span>
                  <div className="text-2xl font-bold text-stone-900 dark:text-zinc-100 mt-1">
                    {status?.scansCount !== undefined ? status.scansCount : "—"}
                  </div>
                </div>
              </div>

              {/* Sync Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                  {syncing ? "Synchronizing to Supabase PostgreSQL..." : "Sync All Local Records to Supabase"}
                </button>

                {syncResult && (
                  <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-zinc-800/80 text-xs text-stone-700 dark:text-zinc-300 border border-stone-200 dark:border-zinc-700">
                    {syncResult}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: AUTH PROVIDERS */}
          {activeTab === "auth" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/50 border border-stone-200 dark:border-zinc-700/80">
                <h4 className="font-bold text-sm text-stone-900 dark:text-zinc-100 flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-emerald-600" /> Supported Supabase Authentication Methods
                </h4>
                <p className="text-xs text-stone-600 dark:text-zinc-400">
                  CropGuard integrates Supabase Auth natively with automatic profile synchronization to the <code className="font-bold">farmers</code> table.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 flex items-center justify-center font-bold text-sm shrink-0">
                    G
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900 dark:text-zinc-100">Google OAuth (Supabase Auth)</h5>
                    <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                      1-click Google authentication via Supabase with automatic token refresh and sandbox fallback.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0">
                    ✉️
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900 dark:text-zinc-100">Email & Password Sign In / Sign Up</h5>
                    <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                      Direct sign up and login with email credentials managed in Supabase Auth users.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-stone-200 dark:border-zinc-800 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                    📱
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xs text-stone-900 dark:text-zinc-100">Phone / SMS OTP</h5>
                    <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
                      Kisan mobile number verification with 6-digit OTP and instant field worker onboarding.
                    </p>
                  </div>
                </div>
              </div>

              {/* Redirect URIs */}
              <div className="p-4 rounded-2xl bg-stone-900 text-stone-300 font-mono text-xs space-y-2 border border-stone-800">
                <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">
                  Supabase Auth Redirect URL (for Supabase Dashboard):
                </span>
                <div className="flex items-center justify-between gap-2 bg-stone-950 p-2 rounded-lg border border-stone-800">
                  <span className="truncate">{audit.currentOrigin}/**</span>
                  <button
                    onClick={() => handleCopyRedirect(`${audit.currentOrigin}/**`)}
                    className="p-1 rounded hover:bg-stone-800 text-emerald-400 shrink-0"
                    title="Copy URL"
                  >
                    {copiedRedirect ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CREDENTIALS CONFIG */}
          {activeTab === "config" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800/40 border border-stone-200 dark:border-zinc-700/80">
                <h4 className="font-bold text-sm text-stone-900 dark:text-zinc-100 mb-1">
                  Connect Custom Supabase Project
                </h4>
                <p className="text-xs text-stone-600 dark:text-zinc-400">
                  Enter your Supabase Project URL and public Anon Key from{" "}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-600 dark:text-emerald-400 font-semibold underline inline-flex items-center gap-0.5"
                  >
                    Supabase Dashboard <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  → Project Settings → API.
                </p>
              </div>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-zinc-300 mb-1">
                    Supabase Project URL (SUPABASE_URL)
                  </label>
                  <input
                    type="url"
                    placeholder="https://your-project.supabase.co"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-zinc-100 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-zinc-300 mb-1">
                    Supabase Public Anon Key (SUPABASE_ANON_KEY)
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-900 dark:text-zinc-100 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {configMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      configMessage.isError
                        ? "bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/50 dark:text-rose-300"
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300"
                    }`}
                  >
                    {configMessage.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    <span>{configMessage.text}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={savingConfig}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    {savingConfig ? "Validating Connection..." : "Save & Verify Connection"}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetConfig}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 text-xs font-semibold transition-colors"
                  >
                    Reset Defaults
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: SQL SCHEMA */}
          {activeTab === "schema" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900 dark:text-zinc-100">
                    PostgreSQL Tables & Realtime Setup
                  </h4>
                  <p className="text-xs text-stone-500 dark:text-zinc-400">
                    Run this in Supabase Dashboard → SQL Editor to create tables with Real-Time replication
                  </p>
                </div>

                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedSql ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copiedSql ? "Copied SQL!" : "Copy SQL Script"}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-stone-900 text-stone-300 font-mono text-xs overflow-x-auto max-h-[350px] border border-stone-800">
                  {SUPABASE_SQL_SETUP}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-stone-100 dark:border-zinc-800/80 bg-stone-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-zinc-400">
            <Radio className="w-3.5 h-3.5 text-emerald-500" />
            <span>Supabase Free Tier: 500MB DB, 50,000 MAU, Realtime Broadcasts</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
