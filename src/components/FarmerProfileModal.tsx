import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Sprout,
  ShieldCheck,
  Calendar,
  Layers,
  Edit3,
  Check,
  X,
  LogOut,
  Sparkles,
  Globe,
  Tag,
} from "lucide-react";
import { UserProfile, Language } from "../types";
import { saveUserProfileToSupabase } from "../lib/supabase";

interface FarmerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  scanCount?: number;
}

const POPULAR_CROPS = [
  "Cotton (कपास)",
  "Tomato (टमाटर)",
  "Wheat (गेहूं)",
  "Paddy / Rice (धान)",
  "Soybean (सोयाबीन)",
  "Sugarcane (गन्ना)",
  "Chilli (मिर्च)",
  "Potato (आलू)",
  "Onion (प्याज)",
  "Gram / Chana (चना)",
  "Mustard (सरसों)",
  "Ginger (अदरक)",
  "Turmeric (हल्दी)",
  "Maize (मक्का)",
];

const LAND_SIZES = [
  "Less than 1 Acre (Marginal Farmer)",
  "1 - 2 Acres (Small Farmer)",
  "2 - 5 Acres (Semi-Medium Farmer)",
  "5 - 10 Acres (Medium Farmer)",
  "More than 10 Acres (Large Farmer)",
];

export const FarmerProfileModal: React.FC<FarmerProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  onLogout,
  scanCount = 0,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name || "");
  const [editLocation, setEditLocation] = useState(user.location || "");
  const [editCrop, setEditCrop] = useState(user.primaryCrop || "Tomato");
  const [editLandSize, setEditLandSize] = useState(user.landSize || "2 - 5 Acres");
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    setSaveLoading(true);
    const updated: UserProfile = {
      ...user,
      name: editName.trim() || user.name,
      location: editLocation.trim() || user.location,
      primaryCrop: editCrop || user.primaryCrop,
      landSize: editLandSize || user.landSize,
    };

    try {
      localStorage.setItem("cropguard_user", JSON.stringify(updated));
      await saveUserProfileToSupabase(updated).catch(() => {});
      onUpdateUser(updated);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 600);
    } catch (e) {
      console.warn("Failed to save profile:", e);
    } finally {
      setSaveLoading(false);
    }
  };

  const formattedId = user.id?.startsWith("usr_")
    ? `KISAN-${user.id.slice(-6).toUpperCase()}`
    : `KISAN-${user.id?.slice(0, 8).toUpperCase() || "782914"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Farmer Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white text-emerald-800 flex items-center justify-center font-black text-2xl shadow-lg border-2 border-emerald-200">
              {user.name?.charAt(0)?.toUpperCase() || "K"}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">{user.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/50 text-[11px] font-bold flex items-center gap-1 text-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Verified Kisan</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                <span>Farmer Reg ID: {formattedId}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Status quick pills */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-600 text-white">
                <Sprout className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                  Primary Crop
                </p>
                <p className="text-xs font-black text-stone-900 dark:text-zinc-100 truncate">
                  {user.primaryCrop || "Tomato"}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 dark:bg-zinc-800/60 border border-stone-200 dark:border-zinc-700 flex items-center gap-3">
              <span className="p-2 rounded-xl bg-stone-700 text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <p className="text-[10px] text-stone-500 dark:text-zinc-400 font-bold uppercase">
                  Diagnoses Saved
                </p>
                <p className="text-xs font-black text-stone-900 dark:text-zinc-100">
                  {scanCount} Scans
                </p>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
                Registration & Farm Profile
              </h4>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-stone-500 hover:text-stone-700 font-medium cursor-pointer"
                >
                  Cancel
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="rounded-2xl border border-stone-200 dark:border-zinc-800 divide-y divide-stone-100 dark:divide-zinc-800 text-xs sm:text-sm">
                {/* Farmer Name */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-stone-500 dark:text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-600" />
                    <span>Farmer Name:</span>
                  </span>
                  <span className="font-bold text-stone-900 dark:text-zinc-100">{user.name}</span>
                </div>

                {/* Mobile / Phone */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-stone-500 dark:text-zinc-400 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Registered Phone / Contact:</span>
                  </span>
                  <span className="font-bold text-stone-900 dark:text-zinc-100 font-mono">
                    {user.phoneOrEmail}
                  </span>
                </div>

                {/* Farm Location */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-stone-500 dark:text-zinc-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Farm Location / District:</span>
                  </span>
                  <span className="font-bold text-stone-900 dark:text-zinc-100 text-right max-w-[200px] truncate">
                    {user.location || "India"}
                  </span>
                </div>

                {/* Primary Crop */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-stone-500 dark:text-zinc-400 flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>Major Crop Sown:</span>
                  </span>
                  <span className="font-bold text-stone-900 dark:text-zinc-100">
                    {user.primaryCrop || "Tomato"}
                  </span>
                </div>

                {/* Land Size */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-stone-500 dark:text-zinc-400 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <span>Farm Land Holding:</span>
                  </span>
                  <span className="font-bold text-stone-900 dark:text-zinc-100">
                    {user.landSize || "2 - 5 Acres"}
                  </span>
                </div>

                {/* Login Method */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-stone-500 dark:text-zinc-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Auth Verification:</span>
                  </span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 capitalize">
                    {user.loginType === "phone" ? "Mobile OTP Verified" : "Email Verified"}
                  </span>
                </div>
              </div>
            ) : (
              /* Editing Form */
              <div className="space-y-3 bg-stone-50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-stone-200 dark:border-zinc-700">
                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                    Farmer Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                    Farm Location / District / State
                  </label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. Nashik, Maharashtra"
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                    Primary Crop
                  </label>
                  <select
                    value={editCrop}
                    onChange={(e) => setEditCrop(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-stone-900 dark:text-white"
                  >
                    {POPULAR_CROPS.map((c) => (
                      <option key={c} value={c.split(" (")[0]}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-zinc-300">
                    Land Holding
                  </label>
                  <select
                    value={editLandSize}
                    onChange={(e) => setEditLandSize(e.target.value)}
                    className="w-full mt-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-semibold focus:outline-none focus:border-emerald-600 text-stone-900 dark:text-white"
                  >
                    {LAND_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saveLoading}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    {saveSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <span>{saveLoading ? "Saving..." : "Save Farm Details"}</span>
                    )}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl bg-stone-200 dark:bg-zinc-700 text-stone-700 dark:text-zinc-200 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 dark:bg-zinc-800/80 border-t border-stone-200 dark:border-zinc-800 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
