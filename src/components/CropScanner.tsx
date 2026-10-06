import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Volume2,
  VolumeX,
  Phone,
  MapPin,
  Globe,
  Bookmark,
  Share2,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  Info,
  SwitchCamera,
  X,
  Check,
  Maximize2,
  BadgeCheck,
  Navigation,
  Star,
  Leaf,
} from "lucide-react";
import { DiseaseAnalysisResult, Language, UserProfile } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";
import { OFFLINE_DISEASE_HANDBOOK } from "../data/offlineDiseaseHandbook";
import { getTailoredShopsForLocation } from "../data/fertilizerShops";

interface CropScannerProps {
  language: Language;
  isOnline: boolean;
  onSaveScan: (result: DiseaseAnalysisResult) => void;
  onNavigateToShops: () => void;
  scanHistory?: DiseaseAnalysisResult[];
  user?: UserProfile | null;
}

const SUPPORTED_CROPS = [
  "Ginger (अदरक)",
  "Tomato (टमाटर)",
  "Paddy / Rice (धान)",
  "Wheat (गेहूं)",
  "Potato (आलू)",
  "Chilli (मिर्च)",
  "Cotton (कपास)",
  "Sugarcane (गन्ना)",
  "Turmeric (हल्दी)",
  "Garlic (लहसुन)",
  "Onion (प्याज)",
  "Maize / Corn (मक्का)",
  "Tea (चाय)",
  "Apple (सेब)",
  "Pepper (काली मिर्च)",
];

export const CropScanner: React.FC<CropScannerProps> = ({
  language,
  isOnline,
  onSaveScan,
  onNavigateToShops,
  scanHistory = [],
  user,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DiseaseAnalysisResult | null>(null);
  const [displayResult, setDisplayResult] = useState<DiseaseAnalysisResult | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraFallbackInputRef = useRef<HTMLInputElement>(null);

  // Live Camera States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState<"environment" | "user">("environment");
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [gpsLat, setGpsLat] = useState<number | undefined>();
  const [gpsLng, setGpsLng] = useState<number | undefined>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load SpeechSynthesis Voices
  useEffect(() => {
    if ("speechSynthesis" in window) {
      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Pre-fetch GPS location on mount to ensure accurate local shops 
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLat(pos.coords.latitude);
          setGpsLng(pos.coords.longitude);
        },
        (err) => {
          console.warn("CropScanner: GPS location access denied or failed.", err);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    }
  }, []);

  const startCamera = async (targetFacing?: "environment" | "user") => {
    const mode = targetFacing || cameraFacingMode;
    setCameraLoading(true);
    setCameraError(null);
    setIsCameraActive(true);

    // Stop existing stream if any
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API not supported on this browser/device.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setCameraFacingMode(mode);
    } catch (err: any) {
      console.warn("Camera access failed:", err);
      setCameraError(
        err?.message?.includes("Permission") || err?.name === "NotAllowedError"
          ? "Camera permission was denied. Please allow camera access in your browser or tap below to use system camera."
          : "Unable to access camera directly. Tap below to capture with your device camera app."
      );
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  const switchCameraFacing = () => {
    const nextMode = cameraFacingMode === "environment" ? "user" : "environment";
    startCamera(nextMode);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setImagePreview(dataUrl);
        setAnalysisResult(null);
        setDisplayResult(null);
        setErrorText("");
        stopCamera();
      }
    } catch (err) {
      console.error("Failed to capture snapshot:", err);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImagePreview(base64);
      setAnalysisResult(null);
      setDisplayResult(null);
      setErrorText("");
    };
    reader.readAsDataURL(file);
  };

  const runAnalysis = async () => {
    if (!imagePreview) {
      setErrorText("Please take or upload a leaf photo first.");
      return;
    }

    setIsAnalyzing(true);
    setErrorText("");
    
    let liveLocation = user?.location || "India";
    try {
      if ("geolocation" in navigator) {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 4000 });
        });
        setGpsLat(pos.coords.latitude);
        setGpsLng(pos.coords.longitude);
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${pos.coords.latitude}&longitude=${pos.coords.longitude}&format=json`);
        const geoData = await geoRes.json();
        if (geoData?.results?.[0]) {
          const item = geoData.results[0];
          liveLocation = [item.name, item.admin2 || item.admin1, item.country].filter(Boolean).join(", ");
        }
      }
    } catch (_) {
      // Fallback to user profile location if GPS fails
    }

    if (!isOnline) {
      // OFFLINE FALLBACK
      setTimeout(() => {
        setIsAnalyzing(false);
        const match = OFFLINE_DISEASE_HANDBOOK[0];

        const offlineResult: DiseaseAnalysisResult = {
          crop: match.crop,
          diseaseName: match.diseaseName,
          isHealthy: false,
          confidence: 88,
          severity: match.severity,
          symptoms: match.symptoms.join(". "),
          organicTreatment: [match.organicCure],
          chemicalTreatment: [match.chemicalCure],
          fertilizerAdvice: match.fertilizer,
          preventiveMeasures: [
            "Maintain clean drainage channel around field.",
            "Sterilize farm implements before prunings.",
            "Destroy and bury severely infected crop residue."
          ],
          recommendedProducts: ["Copper Oxychloride 50% WP", "Trichoderma Viride", "NPK 19:19:19"],
          urgencyNote: "Offline diagnosis generated from cached agricultural disease manual.",
          scannedAt: new Date().toLocaleTimeString(),
          imageUrl: imagePreview,
          location: liveLocation,
        };
        setAnalysisResult(offlineResult);
        setDisplayResult(offlineResult);
        onSaveScan(offlineResult);
      }, 1200);
      return;
    }

    try {
      const response = await fetch("/api/analyze-crop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: imagePreview,
          cropHint: "Auto Detect",
          language: language,
          userLocation: liveLocation,
          farmerId: user?.id,
          userName: user?.name,
          phoneOrEmail: user?.phoneOrEmail,
        }),
      });

      const json = await response.json();
      setIsAnalyzing(false);

      if (json.success && json.data) {
        const cropLower = (json.data.crop || "").toLowerCase();
        const diseaseLower = (json.data.diseaseName || "").toLowerCase();
        const symptomsLower = (json.data.symptoms || "").toLowerCase();

        const isInvalid =
          json.data.isValidCrop === false ||
          !json.data.crop ||
          cropLower.includes("invalid") ||
          cropLower.includes("non-agricultural") ||
          cropLower.includes("not a plant") ||
          cropLower.includes("not a crop") ||
          cropLower.includes("human") ||
          cropLower.includes("person") ||
          cropLower.includes("animal") ||
          cropLower.includes("vehicle") ||
          cropLower.includes("furniture") ||
          cropLower.includes("indoor") ||
          cropLower.includes("room") ||
          diseaseLower.includes("no crop") ||
          diseaseLower.includes("no plant") ||
          diseaseLower.includes("non-agricultural") ||
          diseaseLower.includes("not detected") ||
          diseaseLower.includes("invalid") ||
          symptomsLower.includes("not appear to show a farm crop") ||
          symptomsLower.includes("not appear to show an agricultural") ||
          symptomsLower.includes("non-plant");

        const fullResult: DiseaseAnalysisResult = {
          ...json.data,
          isValidCrop: !isInvalid,
          crop: isInvalid ? "Invalid Photo" : json.data.crop,
          diseaseName: isInvalid ? "No Crop or Plant Detected" : json.data.diseaseName,
          organicTreatment: isInvalid ? [] : json.data.organicTreatment || [],
          chemicalTreatment: isInvalid ? [] : json.data.chemicalTreatment || [],
          fertilizerAdvice: isInvalid ? "" : json.data.fertilizerAdvice || "",
          recommendedProducts: isInvalid ? [] : json.data.recommendedProducts || [],
          scannedAt: new Date().toLocaleTimeString(),
          imageUrl: imagePreview,
        };
        setAnalysisResult(fullResult);
        setDisplayResult(fullResult);
        if (!isInvalid) {
          onSaveScan(fullResult);
        }
      } else {
        setErrorText(json.error || "Could not complete image analysis. Please upload a clear photo of an agricultural crop leaf.");
        setAnalysisResult(null);
        setDisplayResult(null);
      }
    } catch (err: any) {
      setIsAnalyzing(false);
      setErrorText("Unable to connect to AI scanner. Please ensure your internet connection is active and try uploading the photo again.");
      setAnalysisResult(null);
      setDisplayResult(null);
    }
  };

  const [resultLang, setResultLang] = useState<Language>(language);
  const [nearbyShops, setNearbyShops] = useState<any[]>([]);
  const [loadingShops, setLoadingShops] = useState(false);

  // Language mapping names
  const langNameMap: Record<Language, string> = {
    en: "English",
    hi: "Hindi",
    pa: "Punjabi",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    gu: "Gujarati",
    mr: "Marathi",
    bn: "Bengali",
    ml: "Malayalam",
    or: "Odia",
  };

  // Handle language change on scan result card
  const handleTranslateResult = async (targetLang: Language) => {
    setResultLang(targetLang);
    if (!analysisResult) return;

    if (targetLang === "en") {
      setDisplayResult(analysisResult);
      return;
    }

    setIsTranslating(true);
    try {
      const res = await fetch("/api/crop/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis: analysisResult,
          targetLanguage: langNameMap[targetLang] || "Hindi",
        }),
      });
      const json = await res.json();
      setIsTranslating(false);
      if (json.success && json.data) {
        setDisplayResult({
          ...json.data,
          scannedAt: analysisResult.scannedAt,
          imageUrl: analysisResult.imageUrl,
        });
      }
    } catch (e) {
      setIsTranslating(false);
    }
  };

  // Sync translation ONLY when app language prop changes after scan is displayed
  useEffect(() => {
    if (analysisResult && analysisResult.isValidCrop !== false && !analysisResult.crop?.toLowerCase().includes("invalid")) {
      if (language !== resultLang && language !== "en") {
        handleTranslateResult(language);
      } else if (language === "en") {
        setDisplayResult(analysisResult);
        setResultLang("en");
      }
    }
  }, [language]);

  // Fetch nearest fertilizer shops whenever analysis completes for valid crops only
  useEffect(() => {
    if (analysisResult && analysisResult.isValidCrop !== false && !analysisResult.crop?.toLowerCase().includes("invalid")) {
      setLoadingShops(true);
      const productNeeded = analysisResult.recommendedProducts?.[0] || analysisResult.crop;
      const userDistrict = user?.district || "";
      const userState = user?.state || "";
      const userTaluk = user?.taluk || "";
      const userArea = user?.location || "";

      fetch("/api/shops/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: analysisResult.crop,
          productNeeded,
          area: userArea,
          taluk: userTaluk,
          district: userDistrict,
          state: userState,
          query: "",
          lat: gpsLat,
          lng: gpsLng,
          language: language,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setLoadingShops(false);
          if (json.results && Array.isArray(json.results) && json.results.length > 0) {
            setNearbyShops(json.results.slice(0, 4));
          } else {
            setNearbyShops(getTailoredShopsForLocation(productNeeded, userDistrict, userState, userTaluk).slice(0, 4));
          }
        })
        .catch(() => {
          setLoadingShops(false);
          setNearbyShops(getTailoredShopsForLocation(productNeeded, userDistrict, userState, userTaluk).slice(0, 4));
        });
    } else {
      setNearbyShops([]);
      setLoadingShops(false);
    }
  }, [analysisResult, user]);

  const getLangBcp47Code = (lang: Language): string => {
    switch (lang) {
      case "hi": return "hi-IN";
      case "pa": return "pa-IN";
      case "ta": return "ta-IN";
      case "te": return "te-IN";
      case "kn": return "kn-IN";
      case "gu": return "gu-IN";
      case "mr": return "mr-IN";
      case "bn": return "bn-IN";
      default: return "en-IN";
    }
  };

  const speakTreatment = () => {
    const activeData = displayResult || analysisResult;
    if (!activeData) return;

    if ("speechSynthesis" in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const langCode = getLangBcp47Code(resultLang);
      let textToRead = "";

      if (resultLang === "kn") {
        textToRead = `ಬೆಳೆ: ${activeData.crop}. ರೋಗ: ${activeData.diseaseName}. ಗಂಭೀರತೆ: ${activeData.severity}. ಸಾವಯವ ಚಿಕಿತ್ಸೆ: ${activeData.organicTreatment.join(". ")}. ರಾಸಾಯನಿಕ ಚಿಕಿತ್ಸೆ: ${activeData.chemicalTreatment.join(". ")}. ಗೊಬ್ಬರ ಸಲಹೆ: ${activeData.fertilizerAdvice}`;
      } else if (resultLang === "hi") {
        textToRead = `फसल: ${activeData.crop}. बीमारी: ${activeData.diseaseName}. गंभीर स्तर: ${activeData.severity}. जैविक उपचार: ${activeData.organicTreatment.join(". ")}. रासायनिक छिड़काव: ${activeData.chemicalTreatment.join(". ")}. खाद सलाह: ${activeData.fertilizerAdvice}`;
      } else if (resultLang === "pa") {
        textToRead = `ਫਸਲ: ${activeData.crop}. ਬੀਮਾਰੀ: ${activeData.diseaseName}. ਜੈਵਿਕ ਇਲਾਜ: ${activeData.organicTreatment.join(". ")}. ਰਸਾਇਣਕ ਇਲਾਜ: ${activeData.chemicalTreatment.join(". ")}. ਖਾਦ ਸਲਾਹ: ${activeData.fertilizerAdvice}`;
      } else if (resultLang === "ta") {
        textToRead = `பயிர்: ${activeData.crop}. நோய்: ${activeData.diseaseName}. இயற்கை சிகிச்சை: ${activeData.organicTreatment.join(". ")}. இரசாயன சிகிச்சை: ${activeData.chemicalTreatment.join(". ")}`;
      } else if (resultLang === "te") {
        textToRead = `పంట: ${activeData.crop}. తెగులు: ${activeData.diseaseName}. సేంద్రీయ చికిత్స: ${activeData.organicTreatment.join(". ")}. రసాయన చికిత్స: ${activeData.chemicalTreatment.join(". ")}`;
      } else if (resultLang === "mr") {
        textToRead = `पीक: ${activeData.crop}. रोग: ${activeData.diseaseName}. तीव्रतेचे प्रमाण: ${activeData.severity}. जैविक उपचार: ${activeData.organicTreatment.join(". ")}. रासायनिक उपचार: ${activeData.chemicalTreatment.join(". ")}. खत सल्ला: ${activeData.fertilizerAdvice}`;
      } else if (resultLang === "gu") {
        textToRead = `પાક: ${activeData.crop}. રોગ: ${activeData.diseaseName}. જૈવિક સારવાર: ${activeData.organicTreatment.join(". ")}. રાસાયણિક સારવાર: ${activeData.chemicalTreatment.join(". ")}. ખાતર સલાહ: ${activeData.fertilizerAdvice}`;
      } else if (resultLang === "bn") {
        textToRead = `ফসল: ${activeData.crop}. রোগ: ${activeData.diseaseName}. জৈব প্রতিকার: ${activeData.organicTreatment.join(". ")}. রাসায়নিক প্রতিকার: ${activeData.chemicalTreatment.join(". ")}. সার পরামর্শ: ${activeData.fertilizerAdvice}`;
      } else {
        textToRead = `${activeData.crop}. ${activeData.diseaseName}. ${
          activeData.isHealthy ? "Crop leaf is healthy." : "Disease detected with severity " + activeData.severity
        }. Organic Solution: ${activeData.organicTreatment.join(". ")}. Chemical Spray Treatment: ${activeData.chemicalTreatment.join(". ")}. Fertilizer Advice: ${
          activeData.fertilizerAdvice
        }`;
      }

      window.speechSynthesis.cancel(); // Reset active speech
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = langCode;
      utterance.rate = 0.85;

      // Try matching best voice for language
      const availVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      const matchedVoice = availVoices.find((v) => v.lang.toLowerCase().includes(langCode.toLowerCase()));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-stone-900 dark:text-zinc-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-emerald-100 tracking-tight">
                {t.scanTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-zinc-400">
              {t.scanSubtitle} • AI automatically detects the crop type & leaf pathology directly from your camera
            </p>
          </div>
        </div>
      </div>

      {/* Upload / Camera Area */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-col items-center justify-center text-center relative overflow-hidden group">
        {/* Hidden standard file picker */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />

        {/* Hidden mobile native camera fallback */}
        <input
          type="file"
          ref={cameraFallbackInputRef}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
              stopCamera();
            }
          }}
        />

        {/* 1. LIVE CAMERA VIEWFINDER ACTIVE */}
        {isCameraActive ? (
          <div className="w-full max-w-xl mx-auto space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-video rounded-2xl overflow-hidden bg-black border-2 border-emerald-500 shadow-lg flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Viewfinder Target Reticle Overlay */}
              <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-white/70 rounded-2xl pointer-events-none flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-2xs text-white text-[11px] font-semibold px-3 py-1 rounded-full border border-white/20">
                  Align crop leaf / infected area in frame
                </div>
              </div>

              {/* Top Controls: Close Camera & Flip Lens */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Live Camera</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={switchCameraFacing}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer shadow-xs"
                    title="Switch Front/Back Camera"
                  >
                    <SwitchCamera className="w-4 h-4" />
                  </button>
                  <button
                    onClick={stopCamera}
                    className="p-2 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white transition-all cursor-pointer shadow-xs"
                    title="Cancel Camera"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Loading Indicator */}
              {cameraLoading && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white space-y-2">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
                  <p className="text-xs font-bold">Starting Camera Feed...</p>
                </div>
              )}
            </div>

            {/* Shutter / Capture Button Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <button
                onClick={capturePhoto}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all transform active:scale-95 cursor-pointer"
                id="camera-shutter-btn"
              >
                <div className="w-4 h-4 rounded-full border-2 border-white bg-emerald-300" />
                <span>Capture Crop Photo</span>
              </button>

              <button
                onClick={() => cameraFallbackInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-700 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                title="Launch device system camera"
              >
                <Camera className="w-4 h-4" />
                <span>Use Device Camera App</span>
              </button>

              <button
                onClick={stopCamera}
                className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {cameraError && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 space-y-2">
                <p>{cameraError}</p>
                <button
                  onClick={() => cameraFallbackInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors"
                >
                  Open System Camera App Instead
                </button>
              </div>
            )}
          </div>
        ) : imagePreview ? (
          /* 2. IMAGE PREVIEW */
          <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md mx-auto">
            <img
              src={imagePreview}
              alt="Crop scan preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={() => startCamera()}
                className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 text-white text-xs font-bold backdrop-blur-2xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Retake Photo</span>
              </button>
              <button
                onClick={() => setImagePreview(null)}
                className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-stone-200 dark:border-zinc-700 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-50 transition-colors shadow-2xs cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          /* 3. IDLE STATE: PROMINENT CAMERA & UPLOAD OPTIONS */
          <div className="py-8 max-w-md space-y-4 mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto shadow-2xs">
              <Camera className="w-10 h-10" />
            </div>
            <div>
              <p className="text-lg font-bold text-stone-900 dark:text-zinc-100">
                Scan Crop Leaf or Plant
              </p>
              <p className="text-xs text-stone-500 dark:text-zinc-400 mt-1.5">
                Take a real-time photo with your camera or select an existing image for instant AI diagnosis
              </p>
            </div>

            {/* DUAL BUTTONS: Camera and Upload */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => startCamera()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-sm transition-all transform active:scale-98 cursor-pointer"
                id="scan-crop-take-photo-btn"
              >
                <Camera className="w-5 h-5" />
                <span>Take Photo with Camera</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-bold text-sm flex items-center justify-center gap-2 border border-stone-200 dark:border-zinc-700 transition-all cursor-pointer"
                id="scan-crop-upload-file-btn"
              >
                <Upload className="w-5 h-5" />
                <span>Upload from Files</span>
              </button>
            </div>
          </div>
        )}

        {imagePreview && (
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="mt-6 w-full max-w-xl py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-98 mx-auto cursor-pointer"
            id="scan-crop-analyze-btn"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>{t.analyzingLeaf}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Analyze Crop Health Now</span>
              </>
            )}
          </button>
        )}

        {errorText && (
          <div className="mt-4 text-xs text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 p-3 rounded-xl border border-rose-200 dark:border-rose-800 flex items-center gap-2 max-w-xl mx-auto">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        <div className="mt-6 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-center gap-2 max-w-xl mx-auto">
          <Info className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Scanning Tip:</strong> Hold the camera steady and focus on the affected leaf spots under daylight for best diagnosis.
          </span>
        </div>
      </div>

      {/* ANALYSIS RESULT CARD */}
      {analysisResult && (() => {
        const activeData = displayResult || analysisResult;
        
        // Comprehensive validation check for non-agricultural images
        const isInvalidImage =
          activeData.isValidCrop === false ||
          !activeData.crop ||
          activeData.crop.toLowerCase().includes("invalid") ||
          activeData.crop.toLowerCase().includes("non-agricultural") ||
          activeData.crop.toLowerCase().includes("not a plant") ||
          activeData.crop.toLowerCase().includes("not a crop") ||
          activeData.diseaseName.toLowerCase().includes("no crop") ||
          activeData.diseaseName.toLowerCase().includes("no plant") ||
          activeData.diseaseName.toLowerCase().includes("non-agricultural") ||
          activeData.diseaseName.toLowerCase().includes("not detected");

        if (isInvalidImage) {
          return (
             <div className="mt-6 p-8 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-dashed border-rose-300 dark:border-rose-900 shadow-md space-y-5 text-center animate-fadeIn relative max-w-2xl mx-auto">
               <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center mx-auto text-rose-600 dark:text-rose-400">
                 <AlertTriangle className="w-7 h-7" />
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl font-black text-stone-900 dark:text-zinc-100">
                   Invalid / Non-Crop Photo Detected
                 </h3>
                 <p className="text-sm text-stone-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
                   {activeData.symptoms || "This photo appears to show a person, object, pet, or non-agricultural item. The Crop Scanner requires a clear photo of an actual crop leaf, plant stem, fruit, or farm field."}
                 </p>
               </div>

               <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-left text-xs text-amber-950 dark:text-amber-200 space-y-1.5">
                 <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                   <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                   <span>How to take an accurate crop photo:</span>
                 </div>
                 <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-zinc-300 pl-1">
                   <li>Focus closely on the diseased or affected leaf area under daylight.</li>
                   <li>Avoid shadows, motion blur, or photographing from too far away.</li>
                   <li>Ensure the image only shows the crop/plant (avoid people, pets, or indoor items).</li>
                 </ul>
               </div>

               <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                 <button
                   onClick={() => {
                     setAnalysisResult(null);
                     setDisplayResult(null);
                     setImagePreview(null);
                     setErrorText("");
                     setIsCameraActive(true);
                   }}
                   className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
                 >
                   <Camera className="w-4 h-4" />
                   Take New Photo
                 </button>
                 <button
                   onClick={() => {
                     setAnalysisResult(null);
                     setDisplayResult(null);
                     setImagePreview(null);
                     setErrorText("");
                     fileInputRef.current?.click();
                   }}
                   className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-zinc-200 font-bold text-sm border border-stone-200 dark:border-zinc-700 transition-colors flex items-center gap-2"
                 >
                   <Upload className="w-4 h-4" />
                   Upload from Gallery
                 </button>
               </div>
             </div>
          );
        }

        return (
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-md space-y-6 text-stone-900 dark:text-zinc-100 animate-fadeIn relative">
            {isTranslating && (
              <div className="absolute inset-0 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xs z-20 flex flex-col items-center justify-center rounded-2xl space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-600" />
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Translating Solution to {langNameMap[resultLang]}...
                </span>
              </div>
            )}

            {/* Language Option & Voice Agent Control Bar */}
            <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Solution Language:</span>
                </span>
                {[
                  { id: "en", name: "English" },
                  { id: "hi", name: "हिंदी" },
                  { id: "pa", name: "ਪੰਜਾਬੀ" },
                  { id: "ta", name: "தமிழ்" },
                  { id: "te", name: "తెలుగు" },
                  { id: "kn", name: "ಕನ್ನಡ" },
                  { id: "gu", name: "ગુજરાતી" },
                  { id: "mr", name: "मराठी" },
                  { id: "bn", name: "বাংলা" },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleTranslateResult(l.id as Language)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-colors ${
                      resultLang === l.id
                        ? "bg-emerald-600 text-white shadow-2xs"
                        : "bg-white dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 hover:bg-emerald-100"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>

              {/* Voice Agent Button */}
              <button
                onClick={speakTreatment}
                className={`py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all shrink-0 ${
                  isSpeaking
                    ? "bg-rose-600 text-white animate-pulse"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Kisan Voice Agent</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Voice Agent (Read Solution)</span>
                  </>
                )}
              </button>
            </div>

            {/* Header & Status Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300">
                    {activeData.crop}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-zinc-400">
                    Confidence: {activeData.confidence}%
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-white mt-1">
                  {activeData.diseaseName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border ${
                    activeData.severity === "Healthy" || activeData.isHealthy
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300"
                      : activeData.severity === "High"
                      ? "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-300 animate-pulse"
                      : "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300"
                  }`}
                >
                  {activeData.isHealthy ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  <span>Severity: {activeData.severity}</span>
                </div>
              </div>
            </div>

            {/* Urgency Summary Note */}
            {activeData.urgencyNote && (
              <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
                <strong>Farmer Summary:</strong> {activeData.urgencyNote}
              </div>
            )}

            {/* 3 Column Cure Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Organic Treatment */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/80 space-y-2">
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <span>🌱</span> {t.organicSolution}
                </h4>
                <ul className="text-xs text-stone-700 dark:text-zinc-300 space-y-1.5 list-disc pl-4">
                  {activeData.organicTreatment.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/80 space-y-2">
                <h4 className="text-sm font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                  <span>🧪</span> {t.chemicalSolution}
                </h4>
                <ul className="text-xs text-stone-700 dark:text-zinc-300 space-y-1.5 list-disc pl-4">
                  {activeData.chemicalTreatment.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Fertilizer & NPK */}
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700/80 space-y-2">
                <h4 className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                  <span>🌾</span> {t.fertilizerRecommend}
                </h4>
                <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed">
                  {activeData.fertilizerAdvice}
                </p>
              </div>
            </div>

            {/* Preventive Actions */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-700 space-y-2">
              <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <span>🛡️</span> {t.preventionAdvice}
              </h4>
              <ul className="text-xs text-stone-700 dark:text-zinc-300 space-y-1 list-disc pl-4">
                {activeData.preventiveMeasures.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

          {/* Direct Google Connected Fertilizer & Pesticide Shop Finder */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-stone-50 dark:from-zinc-800/90 dark:to-zinc-900 border border-emerald-200/80 dark:border-emerald-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/60 dark:border-emerald-800/60 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-600 text-white">
                    <ShoppingBag className="w-4 h-4" />
                  </span>
                  <h4 className="text-base font-extrabold text-stone-900 dark:text-white">
                    Local Fertilizer & Spray Shops for {analysisResult.crop} Treatment
                  </h4>
                </div>
                <p className="text-xs text-stone-600 dark:text-zinc-300 mt-1">
                  Exact Local Stores with Google Maps Navigation • In-stock treatments for {analysisResult.recommendedProducts?.join(", ") || "Recommended Sprays"}
                </p>
              </div>

              <button
                onClick={onNavigateToShops}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors shrink-0 cursor-pointer"
              >
                <span>View All 20+ Local Shops</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {loadingShops ? (
              <div className="py-6 text-center text-xs text-stone-500 dark:text-zinc-400 space-y-2">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-emerald-600" />
                <span>Finding verified pesticide and fertilizer dealers near your location...</span>
              </div>
            ) : nearbyShops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {nearbyShops.map((shop) => (
                  <div
                    key={shop.id}
                    className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200/90 dark:border-zinc-800 space-y-3 text-xs flex flex-col justify-between shadow-2xs hover:border-emerald-500 transition-all"
                  >
                    <div className="space-y-2">
                      {/* Shop Name & Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h5 className="font-black text-stone-900 dark:text-white text-sm leading-snug">
                              {shop.name}
                            </h5>
                            {shop.verified && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                                <BadgeCheck className="w-3 h-3 text-emerald-600" />
                                <span>Licensed Dealer</span>
                              </span>
                            )}
                          </div>
                          {shop.ownerName && (
                            <p className="text-[11px] text-stone-500 dark:text-zinc-400 mt-0.5">
                              Dealer: {shop.ownerName}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px] font-black shrink-0">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{shop.rating || 4.8}</span>
                        </div>
                      </div>

                      {/* Exact Area, Taluk, District Badges */}
                      <div className="flex flex-wrap items-center gap-1 pt-0.5">
                        {shop.area && (
                          <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-zinc-200 text-[10px] font-bold border border-stone-200 dark:border-zinc-700">
                            📍 Area: {shop.area}
                          </span>
                        )}
                        {shop.taluk && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                            🏛️ Taluk: {shop.taluk}
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 text-sky-800 dark:text-sky-300 text-[10px] font-bold border border-sky-200 dark:border-sky-800">
                          🏢 District: {shop.district}
                        </span>
                      </div>

                      {/* Full Street Address & Distance */}
                      <div className="text-[11px] text-stone-600 dark:text-zinc-300 space-y-1">
                        <p className="flex items-start gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{shop.address}, {shop.area ? `${shop.area}, ` : ""}{shop.taluk ? `${shop.taluk}, ` : ""}{shop.district}, {shop.state} - {shop.pincode}</span>
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-bold pl-4">
                          Approx. {shop.distanceKm} km away from your farm
                        </p>
                      </div>

                      {/* Recommended Stock in Store */}
                      {shop.inventory && shop.inventory.length > 0 && (
                        <div className="bg-stone-50 dark:bg-zinc-800/80 p-2.5 rounded-xl border border-stone-200 dark:border-zinc-700 space-y-1 text-[11px]">
                          <span className="font-bold text-stone-800 dark:text-zinc-200">Available Treatment Products:</span>
                          <div className="flex flex-wrap gap-1">
                            {shop.inventory.slice(0, 4).map((prod, pIdx) => (
                              <span key={pIdx} className="px-2 py-0.5 rounded bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 font-semibold text-stone-700 dark:text-zinc-300 text-[10px]">
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons: Phone Call & Direct Google Maps Navigation */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-200 dark:border-zinc-800">
                      <a
                        href={`tel:${shop.phone}`}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call ({shop.phone})</span>
                      </a>

                      <a
                        href={shop.mapsUri || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.mapQuery || `${shop.name} ${shop.area || ""} ${shop.district} ${shop.state}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-800 dark:text-emerald-300 border border-stone-200 dark:border-zinc-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Google Map</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 text-center space-y-2">
                <p className="text-xs text-stone-600 dark:text-zinc-300 font-semibold">
                  Recommended Fungicide Spray: Copper Oxychloride 50% WP or Trichoderma Viride
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`fertilizer pesticide shop near me ${analysisResult.crop}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 underline"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Search Nearest Pesticide Shops Directly on Google Maps</span>
                </a>
              </div>
            )}
          </div>
        </div>
        );
      })()}
    </div>
  );
};
