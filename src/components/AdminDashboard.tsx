import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Users,
  AlertOctagon,
  Activity,
  Lock,
  Search,
  RefreshCw,
  MapPin,
  Calendar,
  LogOut,
  Bell,
  Database,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Language } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";
import { SupabaseModal } from "./SupabaseModal";

interface AdminDashboardProps {
  language: Language;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  isAdminLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [showSupabaseModal, setShowSupabaseModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [farmerToDelete, setFarmerToDelete] = useState<{ id: string; name: string; phoneOrEmail: string } | null>(null);
  const [scanToDelete, setScanToDelete] = useState<any | null>(null);
  const [showClearScansModal, setShowClearScansModal] = useState(false);
  const [deletingScanId, setDeletingScanId] = useState<string | null>(null);
  const [isClearingScans, setIsClearingScans] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string>("");
  const [actionErrorMsg, setActionErrorMsg] = useState<string>("");

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      setLoading(false);

      if (json.success) {
        setIsAdminLoggedIn(true);
        setPassError("");
        fetchAdminData(json.token);
      } else {
        setPassError(json.error || "Invalid credentials! Check username and password.");
      }
    } catch (err: any) {
      setLoading(false);
      // Fallback check
      const cleanU = username.trim().toLowerCase();
      const cleanP = password.trim();
      if ((cleanU === "rakesh b m" || cleanU === "rakesh" || cleanU === "admin") && 
          (cleanP === "Rakesh@7019" || cleanP === "rakesh@7019" || cleanP === "rakesh@2006" || cleanP === "Rakesh@2006" || cleanP === "admin")) {
        setIsAdminLoggedIn(true);
        setPassError("");
        fetchAdminData("rakesh_admin_token_2006");
      } else {
        setPassError("Invalid admin credentials!");
      }
    }
  };

  const fetchAdminData = async (token = "rakesh_admin_token_2006") => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.users || json.stats) {
        setDashboardData(json);
      }
    } catch (err) {
      console.warn("Could not fetch admin data from server");
    } finally {
      setLoading(false);
    }
  };

  const executeDeleteFarmer = async (farmer: { id: string; name: string; phoneOrEmail: string }) => {
    setDeletingId(farmer.id || farmer.phoneOrEmail);
    setActionSuccessMsg("");
    setActionErrorMsg("");
    try {
      const token = "rakesh_admin_token_2006";
      const targetId = encodeURIComponent(farmer.id || farmer.phoneOrEmail);
      const queryParams = new URLSearchParams();
      if (farmer.phoneOrEmail) queryParams.set("phoneOrEmail", farmer.phoneOrEmail);
      if (farmer.name) queryParams.set("name", farmer.name);
      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";

      const res = await fetch(`/api/admin/farmers/${targetId}${queryString}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: farmer.id,
          name: farmer.name,
          phoneOrEmail: farmer.phoneOrEmail,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Farmer "${farmer.name || farmer.phoneOrEmail}" and all their leaf outbreak scans deleted successfully.`);
        setFarmerToDelete(null);
        await fetchAdminData();
      } else {
        setActionErrorMsg(data.error || "Failed to delete farmer from database.");
      }
    } catch (err: any) {
      console.error("Delete farmer error:", err);
      setActionErrorMsg("Network error while deleting farmer: " + (err?.message || "Please retry."));
    } finally {
      setDeletingId(null);
    }
  };

  const executeDeleteScan = async (scan: any) => {
    if (!scan?.id) return;
    setDeletingScanId(scan.id);
    setActionSuccessMsg("");
    setActionErrorMsg("");
    try {
      const token = "rakesh_admin_token_2006";
      const targetId = encodeURIComponent(scan.id);
      const res = await fetch(`/api/admin/scans/${targetId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg(`Scan for "${scan.crop} - ${scan.diseaseName}" deleted successfully.`);
        setScanToDelete(null);
        await fetchAdminData();
      } else {
        setActionErrorMsg(data.error || "Failed to delete scan log.");
      }
    } catch (err: any) {
      console.error("Delete scan error:", err);
      setActionErrorMsg("Network error while deleting scan: " + (err?.message || "Please retry."));
    } finally {
      setDeletingScanId(null);
    }
  };

  const executeClearAllScans = async () => {
    setIsClearingScans(true);
    setActionSuccessMsg("");
    setActionErrorMsg("");
    try {
      const token = "rakesh_admin_token_2006";
      const res = await fetch("/api/admin/scans", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setActionSuccessMsg("All real-time leaf outbreak scan logs cleared successfully.");
        setShowClearScansModal(false);
        await fetchAdminData();
      } else {
        setActionErrorMsg(data.error || "Failed to clear scan logs.");
      }
    } catch (err: any) {
      console.error("Clear scans error:", err);
      setActionErrorMsg("Network error while clearing scan logs: " + (err?.message || "Please retry."));
    } finally {
      setIsClearingScans(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      fetchAdminData();
      // Auto-sync with Supabase every 15 seconds to reflect external deletions or registrations
      const timer = setInterval(() => {
        fetchAdminData();
      }, 15000);
      return () => clearInterval(timer);
    }
  }, [isAdminLoggedIn]);

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-stone-900 dark:text-emerald-300 tracking-tight">
            {t.adminPortal}
          </h2>
          <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1">
            Private Access Portal for Agricultural Administrator
          </p>
        </div>

        <form onSubmit={handleAdminAuth} className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-zinc-300 mb-1">
              Admin Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-600 dark:text-zinc-300 mb-1">
              Private Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-emerald-600"
            />
          </div>

          {passError && (
            <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{passError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>Authenticate Private Admin</span>
          </button>
        </form>

        <p className="text-[11px] text-stone-400 dark:text-zinc-500 text-center">
          Restricted access. Protected by private admin credentials.
        </p>
      </div>
    );
  }

  const usersList: any[] = dashboardData?.users || [];
  const scansList: any[] = dashboardData?.scans || [];

  const filteredUsers = usersList.filter(
    (u: any) =>
      (u.name && u.name.toLowerCase().includes(searchUser.toLowerCase())) ||
      (u.phoneOrEmail && u.phoneOrEmail.toLowerCase().includes(searchUser.toLowerCase())) ||
      (u.location && u.location.toLowerCase().includes(searchUser.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-stone-900 dark:text-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-stone-900 dark:text-emerald-200 tracking-tight">
                Agricultural Admin Portal
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-zinc-400 mt-0.5">
              Real Farmer Registrations & Live Disease Scan Audit Logs
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdminLoggedIn(false)}
          className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock Admin Portal</span>
        </button>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-1">
            <Users className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500">Registered Farmers</span>
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-emerald-200">
            {dashboardData?.stats?.totalFarmers ?? 0}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">Verified & Synced</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-1">
            <Activity className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500">Leaf Scans</span>
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-emerald-200">
            {dashboardData?.stats?.totalScans ?? 0}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">AI Analyses Recorded</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100">
          <div className="flex items-center justify-between text-rose-600 dark:text-rose-400 mb-1">
            <AlertOctagon className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500">Outbreaks</span>
          </div>
          <div className="text-2xl font-black text-rose-700 dark:text-rose-300">
            {dashboardData?.stats?.activeOutbreaks ?? 0}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 mt-1">High Severity Flags</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-1">
            <Database className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-zinc-500">Database</span>
          </div>
          <div className="text-lg font-black text-emerald-700 dark:text-emerald-300 mt-1">
            Supabase Cloud
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">PostgreSQL Live Sync</div>
        </div>
      </div>

      {/* Farmers Login Audit Trail Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs space-y-4 text-stone-900 dark:text-zinc-100">
        {/* Feedback Notifications */}
        {actionSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccessMsg}</span>
            </div>
            <button onClick={() => setActionSuccessMsg("")} className="text-emerald-600 hover:text-emerald-800 text-xs">✕</button>
          </div>
        )}
        {actionErrorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{actionErrorMsg}</span>
            </div>
            <button onClick={() => setActionErrorMsg("")} className="text-rose-600 hover:text-rose-800 text-xs">✕</button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Registered Farmers Audit Trail</span>
          </h3>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-stone-400 dark:text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search farmer or phone..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs text-stone-900 dark:text-white focus:outline-none"
              />
            </div>
            <button
              onClick={() => fetchAdminData()}
              disabled={loading}
              title="Sync & Refresh Farmer Registrations"
              className="p-1.5 rounded-xl border border-stone-200 dark:border-zinc-700 hover:bg-stone-100 dark:hover:bg-zinc-800 text-stone-600 dark:text-zinc-300 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-emerald-600" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-stone-50 dark:bg-zinc-800/40 border border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400 space-y-2">
            <p className="text-sm font-semibold">No registered farmers found yet.</p>
            <p className="text-xs text-stone-400 dark:text-zinc-500">
              When a farmer registers via Phone OTP or Google Login in the app, their details will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-zinc-950 text-stone-500 dark:text-zinc-400 border-b border-stone-200 dark:border-zinc-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Farmer Name</th>
                  <th className="py-3 px-4">Phone / Auth Contact</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Registration Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-zinc-800">
                {filteredUsers.map((u: any, idx: number) => {
                  const isDeleting = deletingId === u.id || deletingId === u.phoneOrEmail;
                  return (
                    <tr key={u.id || idx} className="hover:bg-stone-50 dark:hover:bg-zinc-800/50">
                      <td className="py-3 px-4 font-bold text-stone-900 dark:text-emerald-200">{u.name}</td>
                      <td className="py-3 px-4 font-mono text-stone-600 dark:text-zinc-300">{u.phoneOrEmail}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300">
                          {u.loginType === "phone" ? "📱 Phone OTP" : "🌐 Google"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-700 dark:text-zinc-300">{u.location}</td>
                      <td className="py-3 px-4 text-stone-500 dark:text-zinc-400">{u.timestamp}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setFarmerToDelete(u)}
                          disabled={isDeleting}
                          title="Delete Farmer from Registry & Database"
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 transition-colors disabled:opacity-50"
                        >
                          {isDeleting ? (
                            <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Outbreak Scans Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs space-y-4 text-stone-900 dark:text-zinc-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-base font-bold text-rose-800 dark:text-rose-300">
              Real-Time Leaf Outbreak Scans Log
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              {scansList.length} scans
            </span>
          </div>

          {scansList.length > 0 && (
            <button
              onClick={() => setShowClearScansModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Scans Log</span>
            </button>
          )}
        </div>

        {scansList.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-stone-50 dark:bg-zinc-800/40 border border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400 space-y-2">
            <p className="text-sm font-semibold">No leaf scan history yet.</p>
            <p className="text-xs text-stone-400 dark:text-zinc-500">
              When farmers perform AI leaf scans, real-time disease reports and outbreak locations will record here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-zinc-950 text-stone-500 dark:text-zinc-400 border-b border-stone-200 dark:border-zinc-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Crop</th>
                  <th className="py-3 px-4">Diagnosed Infection</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Farmer / Contributor</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-zinc-800">
                {scansList.map((s: any, idx: number) => {
                  const isDeletingThisScan = deletingScanId === s.id;
                  const formattedTime = s.timestamp ? (
                    (() => {
                      try {
                        return new Date(s.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                      } catch {
                        return s.timestamp;
                      }
                    })()
                  ) : "Recent";

                  return (
                    <tr key={s.id || idx} className="hover:bg-stone-50 dark:hover:bg-zinc-800/50">
                      <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-300">{s.crop}</td>
                      <td className="py-3 px-4 text-stone-800 dark:text-zinc-200">{s.diseaseName}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            s.severity === "High"
                              ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:border-rose-600 dark:text-rose-300"
                              : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:border-amber-600 dark:text-amber-300"
                          }`}
                        >
                          {s.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-700 dark:text-zinc-300 font-medium">
                        {s.userName || (s.farmerId ? "Registered Farmer" : "Field Worker")}
                      </td>
                      <td className="py-3 px-4 text-stone-700 dark:text-zinc-300">{s.location}</td>
                      <td className="py-3 px-4 text-stone-500 dark:text-zinc-400">{formattedTime}</td>
                      <td className="py-3 px-4 font-mono text-emerald-700 dark:text-emerald-400">{s.confidence}%</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setScanToDelete(s)}
                          disabled={isDeletingThisScan}
                          title="Delete this scan log"
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-600 transition-colors disabled:opacity-50"
                        >
                          {isDeletingThisScan ? (
                            <RefreshCw className="w-4 h-4 animate-spin text-rose-500" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Supabase Free Tier Modal */}
      <SupabaseModal
        isOpen={showSupabaseModal}
        onClose={() => {
          setShowSupabaseModal(false);
          const authHeader = "Bearer rakesh_admin_token_2006";
          fetch("/api/admin/dashboard", { headers: { Authorization: authHeader } })
            .then((res) => res.json())
            .then((data) => setDashboardData(data))
            .catch(() => {});
        }}
      />

      {/* Delete Farmer Confirmation Modal Dialog */}
      {farmerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-stone-200 dark:border-zinc-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-zinc-100">
                  Delete Farmer & Outbreak Scans?
                </h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400">
                  Complete account & scan history removal
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-zinc-300">
              Are you sure you want to permanently delete <span className="font-bold text-stone-900 dark:text-white">{farmerToDelete.name || "this farmer"}</span> (<span className="font-mono text-xs">{farmerToDelete.phoneOrEmail}</span>)?
            </p>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <p className="font-bold">⚠️ Automatic Cascading Deletion:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Removes the farmer from the active registry audit trail</li>
                <li>Deletes all associated Real-Time Leaf Outbreak scan logs</li>
                <li>Cleans up database records and Supabase authentication</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setFarmerToDelete(null)}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => executeDeleteFarmer(farmerToDelete)}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {deletingId ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting Farmer & Scans...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete Farmer & Logs</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Single Scan Modal Dialog */}
      {scanToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-stone-200 dark:border-zinc-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-zinc-100">
                  Delete Leaf Scan Log?
                </h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400">
                  Remove record from outbreak logs
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-zinc-300">
              Are you sure you want to delete scan record for <span className="font-bold text-stone-900 dark:text-white">{scanToDelete.crop}</span> ({scanToDelete.diseaseName})?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setScanToDelete(null)}
                disabled={Boolean(deletingScanId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => executeDeleteScan(scanToDelete)}
                disabled={Boolean(deletingScanId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {deletingScanId ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting Scan...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete Scan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Scans Modal Dialog */}
      {showClearScansModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-stone-200 dark:border-zinc-800 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 border border-rose-200 dark:border-rose-800 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-zinc-100">
                  Clear All Real-Time Leaf Scans?
                </h3>
                <p className="text-xs text-stone-500 dark:text-zinc-400">
                  Reset entire outbreak scans log
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 dark:text-zinc-300">
              Are you sure you want to clear all {scansList.length} outbreak scans from both in-memory activity and the Supabase database?
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowClearScansModal(false)}
                disabled={isClearingScans}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={executeClearAllScans}
                disabled={isClearingScans}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isClearingScans ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Clearing All Scans...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Clear All Scans</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
