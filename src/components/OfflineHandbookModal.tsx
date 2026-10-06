import React, { useState, useMemo, useEffect } from "react";
import {
  BookOpen,
  Search,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Wifi,
  Volume2,
  VolumeX,
  Languages,
  Leaf,
  ShieldCheck,
  FlaskConical,
  Sprout,
  CheckCircle2,
} from "lucide-react";
import { Language, OfflineDiseaseItem } from "../types";
import { OFFLINE_DISEASE_HANDBOOK, OFFLINE_CATEGORIES } from "../data/offlineDiseaseHandbook";
import { LANGUAGE_NAMES } from "../data/translations";

interface OfflineHandbookModalProps {
  language: Language;
}

// Multi-lingual labels for whole explanation of the crop
const EXPLANATION_LABELS: Record<
  Language,
  {
    handbookTitle: string;
    handbookSubtitle: string;
    databaseBadge: string;
    languageLabel: string;
    searchPlaceholder: string;
    searchBtn: string;
    symptomsHeader: string;
    organicHeader: string;
    chemicalHeader: string;
    fertilizerHeader: string;
    scientificName: string;
    severityHigh: string;
    severityMedium: string;
    severityLow: string;
    noResultsTitle: string;
    noResultsDesc: string;
    resetBtn: string;
    aiLoadedText: string;
  }
> = {
  en: {
    handbookTitle: "Offline Disease & Crop Manual",
    handbookSubtitle:
      "Global Agronomy Registry & Field Manual — Instant scientific pathology, organic bio-cures, chemical spray dosages, and ICAR fertilizer guidance for 100,000+ crop varieties in your chosen language.",
    databaseBadge: "100,000+ Crop & Disease Database • Offline & Global Registry",
    languageLabel: "Explanation Language",
    searchPlaceholder:
      "Search any of 100,000+ crops, diseases, symptoms, or varieties (e.g., Ginger, Wheat, Tomato, Coffee, Vanilla, Dragon Fruit)...",
    searchBtn: "Search",
    symptomsHeader: "Visible Diagnostic Symptoms",
    organicHeader: "Organic Bio-Cure",
    chemicalHeader: "Chemical Spray Dosage",
    fertilizerHeader: "Fertilizer & NPK Guidance",
    scientificName: "Scientific",
    severityHigh: "High Severity",
    severityMedium: "Moderate",
    severityLow: "Low",
    noResultsTitle: "No matching crop diseases found in immediate view",
    noResultsDesc: "Click 'Search' to query our 100,000+ global crop registry and generate full localized agronomy protocols.",
    resetBtn: "Reset Filter",
    aiLoadedText: "Deep diagnostic protocol loaded from 100,000+ Global Agricultural Registry. Saved for offline field use.",
  },
  hi: {
    handbookTitle: "ऑफलाइन फसल एवं रोग मार्गदर्शिका",
    handbookSubtitle:
      "वैश्विक कृषि रजिस्ट्री एवं फील्ड मैनुअल — 1,00,000+ फसलों के लिए वैज्ञानिक लक्षण, जैविक उपचार, रासायनिक कीटनाशक छिड़काव और उर्वरक प्रबंधन संपूर्ण हिंदी व्याख्या सहित।",
    databaseBadge: "1,00,000+ फसल एवं रोग डेटाबेस • वैश्विक रजिस्ट्री",
    languageLabel: "व्याख्या भाषा (Language)",
    searchPlaceholder:
      "1,00,000+ फसलों, रोगों या लक्षणों में खोजें (जैसे अदरक, गेहूं, टमाटर, कॉफी, सोयाबीन, ड्रैगन फ्रूट)...",
    searchBtn: "खोजें (Search)",
    symptomsHeader: "रोग के प्रत्यक्ष लक्षण (Symptoms)",
    organicHeader: "जैविक उपचार (Organic Bio-Cure)",
    chemicalHeader: "रासायनिक छिड़काव व दवा (Chemical Spray)",
    fertilizerHeader: "उर्वरक एवं पोषण सलाह (Fertilizer & NPK)",
    scientificName: "वैज्ञानिक नाम",
    severityHigh: "गंभीर (High)",
    severityMedium: "मध्यम",
    severityLow: "कम",
    noResultsTitle: "कोई फसल रोग नहीं मिला",
    noResultsDesc: "1,00,000+ फसलों की वैश्विक रजिस्ट्री से संपूर्ण जानकारी प्राप्त करने हेतु 'खोजें' पर क्लिक करें।",
    resetBtn: "फ़िल्टर रीसेट करें",
    aiLoadedText: "1,00,000+ फसल रजिस्ट्री से विस्तृत निदान प्राप्त हुआ। ऑफलाइन उपयोग के लिए सुरक्षित।",
  },
  kn: {
    handbookTitle: "ಆಫ್‌ಲೈನ್ ಬೆಳೆ ರೋಗ ಕೈಪಿಡಿ",
    handbookSubtitle:
      "ಜಾಗತಿಕ ಕೃಷಿ ಸಂಶೋಧನಾ ಮಾಹಿತಿ — 1,00,000+ ಬೆಳೆ ತಳಿಗಳ ರೋಗ ಲಕ್ಷಣಗಳು, ಸಾವಯವ ಚಿಕಿತ್ಸೆ, ರಾಸಾಯನಿಕ ಸಿಂಪರಣೆ ಮತ್ತು ರಸಗೊಬ್ಬರ ಪ್ರಮಾಣಗಳ ಸಂಪೂರ್ಣ ಕನ್ನಡ ವಿವರಣೆ.",
    databaseBadge: "1,00,000+ ಬೆಳೆ ಮತ್ತು ರೋಗ ಡೇಟಾಬೇಸ್ • ಜಾಗತಿಕ ಮಾಹಿತಿ",
    languageLabel: "ವಿವರಣೆ ಭಾಷೆ (Language)",
    searchPlaceholder:
      "1,00,000+ ಬೆಳೆಗಳು, ರೋಗಗಳು ಅಥವಾ ಲಕ್ಷಣಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ: ಶುಂಠಿ, ಗೋಧಿ, ಟೊಮೇಟೊ, ಕಾಫಿ, ಅಡಿಕೆ)...",
    searchBtn: "ಹುಡುಕಿ (Search)",
    symptomsHeader: "ಗೋಚರಿಸುವ ರೋಗದ ಲಕ್ಷಣಗಳು (Symptoms)",
    organicHeader: "ಸಾವಯವ ಜೈವಿಕ ನಿಯಂತ್ರಣ (Organic Bio-Cure)",
    chemicalHeader: "ರಾಸಾಯನಿಕ ಸಿಂಪರಣೆ ಮತ್ತು ಪ್ರಮಾಣ (Chemical Spray)",
    fertilizerHeader: "ಗೊಬ್ಬರ ಮತ್ತು NPK ಪೋಷಕಾಂಶ ಮಾರ್ಗದರ್ಶನ (Fertilizer)",
    scientificName: "ವೈಜ್ಞಾನಿಕ ಹೆಸರು",
    severityHigh: "ತೀವ್ರ (High)",
    severityMedium: "ಮಧ್ಯಮ",
    severityLow: "ಕಡಿಮೆ",
    noResultsTitle: "ಯಾವುದೇ ಬೆಳೆ ರೋಗ ಕಂಡುಬಂದಿಲ್ಲ",
    noResultsDesc: "1,00,000+ ಜಾಗತಿಕ ಬೆಳೆಗಳ ಮಾಹಿತಿಯನ್ನು ಹುಡುಕಲು 'ಹುಡುಕಿ' ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    resetBtn: "ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ",
    aiLoadedText: "1,00,000+ ಕೃಷಿ ಡೇಟಾಬೇಸ್‌ನಿಂದ ರೋಗ ನಿಯಂತ್ರಣ ಮಾಹಿತಿ ಲೋಡ್ ಆಗಿದೆ. ಆಫ್‌ಲೈನ್‌ಗಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.",
  },
  te: {
    handbookTitle: "ఆఫ్‌లైన్ పంట & వ్యాధి మాన్యువల్",
    handbookSubtitle:
      "గ్లోబల్ అగ్రానమీ రిజిస్ట్రీ — 1,00,000+ పంట రకాలకు శాస్త్రీయ రోగనిర్ధారణ, సేంద్రీయ నివారణ, రసాయన మందులు మరియు ఎరువుల సమగ్ర తెలుగు వివరణ.",
    databaseBadge: "1,00,000+ పంట & వ్యాధి డేటాబేస్ • గ్లోబల్ రిజిస్ట్రీ",
    languageLabel: "వివరణ భాష (Language)",
    searchPlaceholder:
      "1,00,000+ పంటలు, వ్యాధులు లేదా లక్షణాలను శోధించండి (ఉదా: అల్లం, గోధుమ, టమాటో, మిరప)...",
    searchBtn: "శోధించండి (Search)",
    symptomsHeader: "కనిపించే వ్యాధి లక్షణాలు (Symptoms)",
    organicHeader: "సేంద్రీయ జీవ నియంత్రణ (Organic Bio-Cure)",
    chemicalHeader: "రసాయన పిచికారీ మరియు మోతాదు (Chemical Spray)",
    fertilizerHeader: "ఎరువులు మరియు NPK పోషణ సలహా (Fertilizer)",
    scientificName: "శాస్త్రీయ నామం",
    severityHigh: "తీవ్రమైనది (High)",
    severityMedium: "మధ్యస్థం",
    severityLow: "తక్కువ",
    noResultsTitle: "సరిపోలే పంట వ్యాధులు కనుగొనబడలేదు",
    noResultsDesc: "1,00,000+ పంట డేటాబేస్ నుండి వెతకడానికి 'శోధించండి' క్లిక్ చేయండి.",
    resetBtn: "రీసెట్ చేయండి",
    aiLoadedText: "1,00,000+ పంట డేటాబేస్ నుండి సమగ్ర సమాచారం పొందబడింది.",
  },
  ta: {
    handbookTitle: "ஆஃப்லைன் பயிர் & நோய் கையேடு",
    handbookSubtitle:
      "உலகளாவிய வேளாண் பதிவேடு — 1,00,000+ பயிர்களுக்கான நோய் அறிகுறிகள், இயற்கை தீர்வுகள், பூச்சிக்கொல்லி மருந்துகள் மற்றும் உர வழிகாட்டல் முழுமையான தமிழ் விளக்கம்.",
    databaseBadge: "1,00,000+ பயிர் & நோய் தரவுத்தளம் • ஆஃப்லைன்",
    languageLabel: "விளக்க மொழி (Language)",
    searchPlaceholder:
      "1,00,000+ பயிர்கள், நோய்கள் அல்லது அறிகுறிகளைத் தேடுங்கள் (எ.கா: இஞ்சி, கோதுமை, தக்காளி)...",
    searchBtn: "தேடுக (Search)",
    symptomsHeader: "தென்படும் நோய் அறிகுறிகள் (Symptoms)",
    organicHeader: "இயற்கை உயிரியல் தீர்வு (Organic Bio-Cure)",
    chemicalHeader: "இரசாயன தெளிப்பு மற்றும் அளவு (Chemical Spray)",
    fertilizerHeader: "உர மேலாண்மை மற்றும் NPK வழிகாட்டுதல் (Fertilizer)",
    scientificName: "அறிவியல் பெயர்",
    severityHigh: "தீவிரமானது (High)",
    severityMedium: "நடுத்தரம்",
    severityLow: "குறைவு",
    noResultsTitle: "பொருந்தும் பயிர் நோய்கள் காணப்படவில்லை",
    noResultsDesc: "1,00,000+ பயிர் தரவுத்தளத்தில் தேட 'தேடுக' பொத்தானைக் கிளிக் செய்யவும்.",
    resetBtn: "மீட்டமை",
    aiLoadedText: "1,00,000+ பயிர் பதிவேட்டிலிருந்து நோய் மேலாண்மை விவரங்கள் பெறப்பட்டன.",
  },
  mr: {
    handbookTitle: "ऑफलाईन पीक व रोग पुस्तिका",
    handbookSubtitle:
      "जागतिक कृषी नोंदणी — 1,00,000+ पिकांचे रोग निदान, सेंद्रिय उपाय, रासायनिक फवारणी व खत व्यवस्थापन संपूर्ण मराठी स्पष्टीकरणासह.",
    databaseBadge: "1,00,000+ पीक आणि रोग डेटाबेस • जागतिक नोंदणी",
    languageLabel: "स्पष्टीकरण भाषा (Language)",
    searchPlaceholder:
      "1,00,000+ पिके, रोग किंवा लक्षणांमध्ये शोधा (उदा. आले, गहू, टोमॅटो, कापूस, सोयाबीन)...",
    searchBtn: "शोधा (Search)",
    symptomsHeader: "दिसणारी रोग लक्षणे (Symptoms)",
    organicHeader: "सेंद्रिय जैविक उपाय (Organic Bio-Cure)",
    chemicalHeader: "रासायनिक फवारणी व औषध प्रमाण (Chemical Spray)",
    fertilizerHeader: "खते आणि NPK पोषण मार्गदर्शन (Fertilizer)",
    scientificName: "शास्त्रीय नाव",
    severityHigh: "तीव्र (High)",
    severityMedium: "मध्यम",
    severityLow: "कमी",
    noResultsTitle: "कोणतेही रोग आढळले नाहीत",
    noResultsDesc: "1,00,000+ पिकांच्या डेटाबेसमधून शोधण्यासाठी 'शोधा' वर क्लिक करा.",
    resetBtn: "रीसेट करा",
    aiLoadedText: "1,00,000+ पिकांच्या डेटाबेसमधून सविस्तर माहिती उपलब्ध झाली आहे.",
  },
  pa: {
    handbookTitle: "ਆਫਲਾਈਨ ਫਸਲ ਅਤੇ ਬਿਮਾਰੀ ਗਾਈਡ",
    handbookSubtitle:
      "ਗਲੋਬਲ ਖੇਤੀਬਾੜੀ ਰਜਿਸਟਰੀ — 1,00,000+ ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਦੇ ਲੱਛਣ, ਜੈਵਿਕ ਇਲਾਜ, ਕੀਟਨਾਸ਼ਕ ਸਪਰੇਅ ਅਤੇ ਖਾਦ ਪ੍ਰਬੰਧਨ ਦੀ ਪੂਰੀ ਪੰਜਾਬੀ ਵਿਆਖਿਆ।",
    databaseBadge: "1,00,000+ ਫਸਲ ਅਤੇ ਬਿਮਾਰੀ ਡਾਟਾਬੇਸ • ਗਲੋਬਲ ਰਜਿਸਟਰੀ",
    languageLabel: "ਵਿਆਖਿਆ ਦੀ ਭਾਸ਼ਾ (Language)",
    searchPlaceholder:
      "1,00,000+ ਫਸਲਾਂ, ਬਿਮਾਰੀਆਂ ਜਾਂ ਲੱਛਣਾਂ ਵਿੱਚ ਖੋਜੋ (ਜਿਵੇਂ ਅਦਰਕ, ਕਣਕ, ਟਮਾਟਰ, ਝੋਨਾ)...",
    searchBtn: "ਖੋਜੋ (Search)",
    symptomsHeader: "ਦਿਸਣ ਵਾਲੇ ਰੋਗ ਦੇ ਲੱਛਣ (Symptoms)",
    organicHeader: "ਜੈਵਿਕ ਇਲਾਜ (Organic Bio-Cure)",
    chemicalHeader: "ਰਸਾਇਣਕ ਛਿੜਕਾਅ ਅਤੇ ਮਾਤਰਾ (Chemical Spray)",
    fertilizerHeader: "ਖਾਦ ਅਤੇ NPK ਪੋਸ਼ਣ ਸੰਬੰਧੀ ਸਲਾਹ (Fertilizer)",
    scientificName: "ਵਿਗਿਆਨਕ ਨਾਮ",
    severityHigh: "ਗੰਭੀਰ (High)",
    severityMedium: "ਦਰਮਿਆਨਾ",
    severityLow: "ਘੱਟ",
    noResultsTitle: "ਕੋਈ ਫਸਲ ਰੋਗ ਨਹੀਂ ਮਿਲਿਆ",
    noResultsDesc: "1,00,000+ ਫਸਲ ਡਾਟਾਬੇਸ ਵਿੱਚ ਖੋਜਣ ਲਈ 'ਖੋਜੋ' ਤੇ ਕਲਿੱਕ ਕਰੋ।",
    resetBtn: "ਰੀਸੈੱਟ ਕਰੋ",
    aiLoadedText: "1,00,000+ ਖੇਤੀਬਾੜੀ ਡਾਟਾਬੇਸ ਤੋਂ ਜਾਣਕਾਰੀ ਸਫਲਤਾਪੂਰਵਕ ਲੋਡ ਕੀਤੀ ਗਈ ਹੈ।",
  },
  bn: {
    handbookTitle: "অফলাইন ফসল ও রোগ নির্দেশিকা",
    handbookSubtitle:
      "বিশ্বব্যাপী কৃষি রেজিস্ট্রি — ১,০০,০০০+ ফসলের রোগের লক্ষণ, জৈব প্রতিকার, রাসায়নিক স্প্রে এবং সার ব্যবস্থাপনার সম্পূর্ণ বাংলা ব্যাখ্যা।",
    databaseBadge: "১,০০,০০০+ ফসল ও রোগ ডাটাবেস • অফলাইন রেজিস্ট্রি",
    languageLabel: "ব্যাখ্যার ভাষা (Language)",
    searchPlaceholder:
      "১,০০,০০০+ ফসল, রোগ বা লক্ষণ অনুসন্ধান করুন (যেমন আদা, গম, টমেটো, ধান)...",
    searchBtn: "অনুসন্ধান (Search)",
    symptomsHeader: "দৃশ্যমান রোগের লক্ষণ (Symptoms)",
    organicHeader: "জৈব প্রতিষেধক ও প্রতিকার (Organic Bio-Cure)",
    chemicalHeader: "রাসায়নিক স্প্রে এবং মাত্রা (Chemical Spray)",
    fertilizerHeader: "সার এবং NPK পুষ্টি নির্দেশিকা (Fertilizer)",
    scientificName: "বৈজ্ঞানিক নাম",
    severityHigh: "মারাত্মক (High)",
    severityMedium: "মাঝারি",
    severityLow: "কম",
    noResultsTitle: "কোনো ফসলের রোগ পাওয়া যায়নি",
    noResultsDesc: "১,০০,০০০+ ফসলের ডাটাবেস থেকে অনুসন্ধান করতে 'অনুসন্ধান' বাটনে ক্লিক করুন।",
    resetBtn: "রিসেট করুন",
    aiLoadedText: "১,০০,০০০+ ফসলের বৈশ্বিক রেজিস্ট্রি থেকে পূর্ণাঙ্গ তথ্য লোড করা হয়েছে।",
  },
  gu: {
    handbookTitle: "ઓફલાઇન પાક અને રોગ માર્ગદર્શિકા",
    handbookSubtitle:
      "વૈશ્વિક કૃષિ રજિસ્ટ્રી — 1,00,000+ પાકોના રોગના લક્ષણો, જૈવિક ઉપચાર, રાસાયણિક છંટકાવ અને ખાતર વ્યવસ્થાપનની સંપૂર્ણ ગુજરાતી સમજૂતી.",
    databaseBadge: "1,00,000+ પાક અને રોગ ડેટાબેઝ • વૈશ્વિક રજિસ્ટ્રી",
    languageLabel: "સમજૂતી ભાષા (Language)",
    searchPlaceholder:
      "1,00,000+ પાકો, રોગો અથવા લક્ષણો શોધો (જેમ કે આદુ, ઘઉં, ટામેટા, કપાસ)...",
    searchBtn: "શોધો (Search)",
    symptomsHeader: "દેખાતા રોગના લક્ષણો (Symptoms)",
    organicHeader: "જૈવિક ઉપચાર (Organic Bio-Cure)",
    chemicalHeader: "રાસાયણિક છંટકાવ અને માત્રા (Chemical Spray)",
    fertilizerHeader: "ખાતર અને NPK પોષણ માર્ગદર્શન (Fertilizer)",
    scientificName: "વૈજ્ઞાનિક નામ",
    severityHigh: "ગંભીર (High)",
    severityMedium: "મધ્યમ",
    severityLow: "ઓછું",
    noResultsTitle: "કોઈ પાક રોગ મળ્યો નથી",
    noResultsDesc: "1,00,000+ પાક ડેટાબેઝમાંથી શોધવા માટે 'શોધો' પર ક્લિક કરો.",
    resetBtn: "ફિલ્ટર રીસેટ કરો",
    aiLoadedText: "1,00,000+ વૈશ્વિક કૃષિ રજિસ્ટ્રીમાંથી માહિતી લોડ થઈ ગઈ છે.",
  },
  ml: {
    handbookTitle: "ഓഫ്‌ലൈൻ വിള & രോഗ സഹായി",
    handbookSubtitle:
      "ആഗോള കാർഷിക രജിസ്ട്രി — 1,00,000+ വിളകളുടെ രോഗലക്ഷണങ്ങൾ, ജൈവ നിയന്ത്രണം, രാസകീടനാശിനി തളിക്കൽ, വളപ്രയോഗം എന്നിവയുടെ സമഗ്ര മലയാള വിശദീകരണം.",
    databaseBadge: "1,00,000+ വിള & രോഗ ഡാറ്റാബേസ് • ആഗോള രജിസ്ട്രി",
    languageLabel: "വിശദീകരണ ഭാഷ (Language)",
    searchPlaceholder:
      "1,00,000+ വിളകൾ, രോഗങ്ങൾ അല്ലെങ്കിൽ ലക്ഷണങ്ങൾ തിരയുക (ഉദാ: ഇഞ്ചി, തക്കാളി, നെല്ല്)...",
    searchBtn: "തിരയുക (Search)",
    symptomsHeader: "പ്രത്യക്ഷ രോഗലക്ഷണങ്ങൾ (Symptoms)",
    organicHeader: "ജൈവ നിയന്ത്രണ രീതികൾ (Organic Bio-Cure)",
    chemicalHeader: "രാസകീടനാശിനി തളിക്കൽ തോത് (Chemical Spray)",
    fertilizerHeader: "വളപ്രയോഗവും NPK മാർഗ്ഗനിർദ്ദേശങ്ങളും (Fertilizer)",
    scientificName: "ശാസ്ത്രീയ നാമം",
    severityHigh: "ഗുരുതരം (High)",
    severityMedium: "ഇടത്തരം",
    severityLow: "കുറഞ്ഞത്",
    noResultsTitle: "വിള രോഗങ്ങൾ ഒന്നും കണ്ടെത്താനായില്ല",
    noResultsDesc: "1,00,000+ വിള ഡാറ്റാബേസിൽ തിരയാൻ 'തിരയുക' ക്ലിക്ക് ചെയ്യുക.",
    resetBtn: "പുനഃസജ്ജമാക്കുക",
    aiLoadedText: "1,00,000+ ആഗോള കാർഷിക രജിസ്ട്രിയിൽ നിന്ന് വിവരങ്ങൾ ലഭ്യമാക്കി.",
  },
  or: {
    handbookTitle: "ଅଫଲାଇନ୍ ଫସଲ ଏବଂ ରୋଗ ପୁସ୍ତିକା",
    handbookSubtitle:
      "ବିଶ୍ୱ କୃଷି ରେଜିଷ୍ଟ୍ରି — ୧,୦୦,୦୦୦+ ଫସଲର ରୋଗ ଲକ୍ଷଣ, ଜୈବିକ ଉପଚାର, ରାସାୟନିକ ସ୍ପ୍ରେ ଏବଂ ସାର ପରିଚାଳନାର ସମ୍ପୂର୍ଣ୍ଣ ଓଡ଼ିଆ ବ୍ୟାଖ୍ୟା।",
    databaseBadge: "୧,୦୦,୦୦୦+ ଫସଲ ଏବଂ ରୋଗ ଡାଟାବେସ୍ • ବିଶ୍ୱ ରେଜିଷ୍ଟ୍ରି",
    languageLabel: "ବ୍ୟାଖ୍ୟା ଭାଷା (Language)",
    searchPlaceholder:
      "୧,୦୦,୦୦୦+ ଫସଲ, ରୋଗ କିମ୍ବା ଲକ୍ଷଣ ଖୋଜନ୍ତୁ (ଯଥା ଅଦା, ଗହମ, ବିଲାତି ବାଇଗଣ)...",
    searchBtn: "ଖୋଜନ୍ତୁ (Search)",
    symptomsHeader: "ଦୃଶ୍ୟମାନ ରୋଗ ଲକ୍ଷଣ (Symptoms)",
    organicHeader: "ଜୈବିକ ପ୍ରତିକାର (Organic Bio-Cure)",
    chemicalHeader: "ରାସାୟନିକ ସ୍ପ୍ରେ ଏବଂ ମାତ୍ରା (Chemical Spray)",
    fertilizerHeader: "ସାର ଏବଂ NPK ପୋଷଣ ପରାମର୍ଶ (Fertilizer)",
    scientificName: "ବୈଜ୍ଞାନିକ ନାମ",
    severityHigh: "ଗମ୍ଭୀର (High)",
    severityMedium: "ମଧ୍ୟମ",
    severityLow: "କମ୍",
    noResultsTitle: "କୌଣସି ଫସଲ ରୋଗ ମିଳିଲା ନାହିଁ",
    noResultsDesc: "୧,୦୦,୦୦୦+ ଫସଲ ଡାଟାବେସରୁ ଖୋଜିବା ପାଇଁ 'ଖୋଜନ୍ତୁ' ରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
    resetBtn: "ପୁନଃସେଟ୍ କରନ୍ତୁ",
    aiLoadedText: "୧,୦୦,୦୦୦+ ବିଶ୍ୱ କୃଷି ରେଜିଷ୍ଟ୍ରିରୁ ସମ୍ପୂର୍ଣ୍ଣ ତଥ୍ୟ ଲୋଡ୍ ହୋଇଛି।",
  },
};

export const OfflineHandbookModal: React.FC<OfflineHandbookModalProps> = ({
  language,
}) => {
  // Dedicated Language Option for the whole explanation of the crop
  const [activeHandbookLang, setActiveHandbookLang] = useState<Language>(language);

  // Sync if outer app language changes
  useEffect(() => {
    setActiveHandbookLang(language);
  }, [language]);

  const uiLabels = EXPLANATION_LABELS[language] || EXPLANATION_LABELS.en;
  const labels = EXPLANATION_LABELS[activeHandbookLang] || EXPLANATION_LABELS.en;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<OfflineDiseaseItem[]>(() => {
    try {
      const stored = localStorage.getItem("cropguard_handbook_custom_crops");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const staticIds = new Set(OFFLINE_DISEASE_HANDBOOK.map((x) => x.id));
          const uniqueStored = parsed.filter((x) => !staticIds.has(x.id));
          return [...uniqueStored, ...OFFLINE_DISEASE_HANDBOOK];
        }
      }
    } catch {}
    return OFFLINE_DISEASE_HANDBOOK;
  });

  const [isSearching, setIsSearching] = useState(false);
  const [isAiLoaded, setIsAiLoaded] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const attemptedTranslations = React.useRef(new Set<string>());

  // Auto-translate offline items that lack the selected language
  useEffect(() => {
    if (activeHandbookLang === "en") return;

    const itemsToTranslate = items.filter(
      (item) =>
        (!item.organicCureLocal || !item.organicCureLocal[activeHandbookLang]) &&
        !attemptedTranslations.current.has(`${item.id}-${activeHandbookLang}`)
    );

    if (itemsToTranslate.length === 0) return;

    let isMounted = true;

    const translateItems = async () => {
      setIsTranslating(true);
      itemsToTranslate.forEach((item) =>
        attemptedTranslations.current.add(`${item.id}-${activeHandbookLang}`)
      );

      try {
        const response = await fetch("/api/handbook/translate-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: itemsToTranslate.map((i) => ({
              id: i.id,
              cropName: i.crop,
              diseaseName: i.diseaseName,
              symptoms: i.symptoms,
              organicCure: i.organicCure,
              chemicalCure: i.chemicalCure,
              fertilizer: i.fertilizer,
            })),
            language: activeHandbookLang,
          }),
        });
        const json = await response.json();

        if (json.success && isMounted) {
          setItems((prevItems) =>
            prevItems.map((item) => {
              const translatedMatch = json.results.find((r: any) => r.id === item.id);
              if (translatedMatch) {
                return {
                  ...item,
                  cropNames: { ...item.cropNames, [activeHandbookLang]: translatedMatch.cropName },
                  diseaseNameLocal: {
                    ...item.diseaseNameLocal,
                    [activeHandbookLang]: translatedMatch.diseaseName,
                  },
                  symptomsLocal: {
                    ...item.symptomsLocal,
                    [activeHandbookLang]: translatedMatch.symptoms,
                  },
                  organicCureLocal: {
                    ...item.organicCureLocal,
                    [activeHandbookLang]: translatedMatch.organicCure,
                  },
                  chemicalCureLocal: {
                    ...item.chemicalCureLocal,
                    [activeHandbookLang]: translatedMatch.chemicalCure,
                  },
                  fertilizerLocal: {
                    ...item.fertilizerLocal,
                    [activeHandbookLang]: translatedMatch.fertilizer,
                  },
                };
              }
              return item;
            })
          );
        }
      } catch (err) {
        console.error("Batch translate error:", err);
      } finally {
        if (isMounted) setIsTranslating(false);
      }
    };

    translateItems();

    return () => {
      isMounted = false;
    };
  }, [activeHandbookLang, items]);

  const handleSpeak = (item: OfflineDiseaseItem) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === item.id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Get localized text for explanation in activeHandbookLang
    const cropName = item.cropNames?.[activeHandbookLang] || item.crop;
    const disease = item.diseaseNameLocal?.[activeHandbookLang] || item.diseaseName;
    const organic = item.organicCureLocal?.[activeHandbookLang] || item.organicCure;
    const chem = item.chemicalCureLocal?.[activeHandbookLang] || item.chemicalCure;
    const fert = item.fertilizerLocal?.[activeHandbookLang] || item.fertilizer;

    const speechText = `${cropName}. ${disease}. ${labels.organicHeader}: ${organic}. ${labels.chemicalHeader}: ${chem}. ${labels.fertilizerHeader}: ${fert}`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    const langMap: Record<Language, string> = {
      en: "en-IN",
      hi: "hi-IN",
      kn: "kn-IN",
      te: "te-IN",
      ta: "ta-IN",
      mr: "mr-IN",
      pa: "pa-IN",
      bn: "bn-IN",
      gu: "gu-IN",
      ml: "ml-IN",
      or: "or-IN",
    };
    utterance.lang = langMap[activeHandbookLang] || "en-IN";
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(item.id);
    window.speechSynthesis.speak(utterance);
  };

  // Search across 100,000+ crop varieties with complete localized explanation
  const handleSearchHandbook = async (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) {
      setItems(OFFLINE_DISEASE_HANDBOOK);
      setIsAiLoaded(false);
      return;
    }

    setIsSearching(true);

    try {
      const response = await fetch("/api/handbook/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cropQuery: cleanTerm, language: activeHandbookLang }),
      });
      const json = await response.json();
      setIsSearching(false);

      if (json.success && Array.isArray(json.results) && json.results.length > 0) {
        // Find if this exact query already has offline results (if user repeatedly searches)
        const generatedItemsForThisQuery = json.results;
        
        // Add new items to front, keep existing items
        const existingIds = new Set(items.map((x) => x.id));
        const newItems = generatedItemsForThisQuery.filter((x: OfflineDiseaseItem) => !existingIds.has(x.id));
        const updated = [...newItems, ...items];
        setItems(updated);
        setIsAiLoaded(true);

        try {
          const customCrops = updated.filter((x) => !OFFLINE_DISEASE_HANDBOOK.some((s) => s.id === x.id));
          localStorage.setItem("cropguard_handbook_custom_crops", JSON.stringify(customCrops.slice(0, 500)));
        } catch {}
      } else {
        setIsAiLoaded(false);
      }
    } catch {
      setIsSearching(false);
      setIsAiLoaded(false);
    }
  };

  const filteredHandbook = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchCrop = item.crop.toLowerCase().includes(q);
      const matchDisease = item.diseaseName.toLowerCase().includes(q);
      const matchScientific = item.scientificName?.toLowerCase().includes(q);
      const matchSymptoms = item.symptoms.some((s) => s.toLowerCase().includes(q));

      // Local language matches
      const matchLocalCrop = Object.values(item.cropNames || {}).some(
        (v) => typeof v === "string" && v.toLowerCase().includes(q)
      );
      const matchLocalDisease = Object.values(item.diseaseNameLocal || {}).some(
        (v) => typeof v === "string" && v.toLowerCase().includes(q)
      );

      return (
        matchCrop ||
        matchDisease ||
        matchScientific ||
        matchSymptoms ||
        matchLocalCrop ||
        matchLocalDisease
      );
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <div id="offline-handbook-view" className="max-w-6xl mx-auto space-y-6">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-stone-900 dark:text-zinc-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-emerald-200 tracking-tight">
              {uiLabels.handbookTitle}
            </h2>
          </div>
        </div>

        {/* Dedicated Language Option dropdown applying to the whole explanation */}
        <div className="flex items-center gap-2 shrink-0 bg-stone-50 dark:bg-zinc-800 px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-zinc-700 shadow-2xs">
          <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div className="flex flex-col">
            <label htmlFor="handbook-language-select" className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-zinc-400">
              {uiLabels.languageLabel}
            </label>
            <select
              id="handbook-language-select"
              value={activeHandbookLang}
              onChange={(e) => setActiveHandbookLang(e.target.value as Language)}
              className="bg-transparent text-xs font-bold text-emerald-800 dark:text-emerald-300 focus:outline-none cursor-pointer pr-1"
            >
              {Object.entries(LANGUAGE_NAMES).map(([code, meta]) => (
                <option key={code} value={code} className="bg-white dark:bg-zinc-900 text-stone-900 dark:text-zinc-100">
                  {meta.native} ({meta.name})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {OFFLINE_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const labelText =
            (cat.label as Record<string, string>)[activeHandbookLang] ||
            (cat.label as Record<string, string>).en;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                isSelected
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                  : "bg-white dark:bg-zinc-900 text-stone-700 dark:text-zinc-300 border-stone-200 dark:border-zinc-800 hover:border-emerald-500"
              }`}
            >
              {labelText}
            </button>
          );
        })}
      </div>

      {/* Search Bar with Search Button (100,000+ Crop Varieties) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 dark:text-zinc-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={uiLabels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchHandbook(searchQuery);
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-50 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs sm:text-sm text-stone-900 dark:text-zinc-100 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <button
            type="button"
            onClick={() => handleSearchHandbook(searchQuery)}
            disabled={isSearching}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-2xs transition-colors shrink-0 disabled:opacity-70"
          >
            {isSearching ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{uiLabels.searchBtn}</span>
          </button>
        </div>
      </div>

      {isAiLoaded && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            {uiLabels.aiLoadedText} (<strong>"{searchQuery}"</strong>)
          </span>
        </div>
      )}

      {isTranslating && activeHandbookLang !== "en" && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
          <RefreshCw className="w-4 h-4 animate-spin text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Translating manual into selected language...</span>
        </div>
      )}

      {/* Handbook Disease Cards Grid */}
      {filteredHandbook.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 space-y-3">
          <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-stone-900 dark:text-zinc-100">
            {uiLabels.noResultsTitle}
          </h3>
          <p className="text-xs text-stone-500 dark:text-zinc-400 max-w-md mx-auto">
            {uiLabels.noResultsDesc}
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleSearchHandbook(searchQuery)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
            >
              {uiLabels.searchBtn} "{searchQuery}"
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setItems(OFFLINE_DISEASE_HANDBOOK);
              }}
              className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-zinc-800 text-xs font-bold text-stone-800 dark:text-zinc-200 hover:bg-stone-200"
            >
              {uiLabels.resetBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHandbook.map((item) => {
            const isSpeaking = speakingId === item.id;
            // Whole explanation dynamically adapts to activeHandbookLang
            const localizedCropName = item.cropNames?.[activeHandbookLang] || item.crop;
            const localizedDiseaseName = item.diseaseNameLocal?.[activeHandbookLang] || item.diseaseName;
            const localizedSymptoms = item.symptomsLocal?.[activeHandbookLang] || item.symptoms;
            const localizedOrganic = item.organicCureLocal?.[activeHandbookLang] || item.organicCure;
            const localizedChem = item.chemicalCureLocal?.[activeHandbookLang] || item.chemicalCure;
            const localizedFert = item.fertilizerLocal?.[activeHandbookLang] || item.fertilizer;

            const severityBadgeText =
              item.severity === "High"
                ? labels.severityHigh
                : item.severity === "Medium"
                ? labels.severityMedium
                : labels.severityLow;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 hover:border-emerald-500/80 shadow-xs space-y-4 text-stone-900 dark:text-zinc-100 transition-all hover:shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar with Category, Crop, Severity & Speech */}
                  <div className="flex items-start justify-between gap-2 border-b border-stone-100 dark:border-zinc-800 pb-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-300">
                          {localizedCropName}
                        </span>
                        {item.category && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400">
                            {item.category}
                          </span>
                        )}
                        {item.scientificName && (
                          <span className="text-[10px] italic text-stone-400 dark:text-zinc-500">
                            ({item.scientificName})
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-stone-900 dark:text-white leading-snug">
                        {localizedDiseaseName}
                      </h3>
                      {item.diseaseNameLocal?.[activeHandbookLang] && item.diseaseName !== localizedDiseaseName && (
                        <p className="text-[11px] text-stone-400 dark:text-zinc-500">
                          {item.diseaseName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleSpeak(item)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isSpeaking
                            ? "bg-emerald-500 text-white border-emerald-600 animate-pulse"
                            : "bg-stone-50 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 border-stone-200 dark:border-zinc-700 hover:bg-stone-100"
                        }`}
                        title="Listen to full explanation (Audio)"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          item.severity === "High"
                            ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-300"
                            : "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300"
                        }`}
                      >
                        {severityBadgeText}
                      </span>
                    </div>
                  </div>

                  {/* Symptoms Section (Whole Explanation in selected language) */}
                  <div>
                    <span className="text-[11px] font-bold text-stone-700 dark:text-zinc-300 flex items-center gap-1 mb-1">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{labels.symptomsHeader}:</span>
                    </span>
                    <ul className="text-xs text-stone-700 dark:text-zinc-300 space-y-1 list-disc pl-4 leading-relaxed">
                      {localizedSymptoms.map((s, idx) => (
                        <li key={idx}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Organic & Chemical Treatments (Whole Explanation in selected language) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{labels.organicHeader}:</span>
                      </span>
                      <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed text-[11px]">
                        {localizedOrganic}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60">
                      <span className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-1 mb-1">
                        <FlaskConical className="w-3.5 h-3.5" />
                        <span>{labels.chemicalHeader}:</span>
                      </span>
                      <p className="text-indigo-950 dark:text-indigo-200 leading-relaxed text-[11px]">
                        {localizedChem}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fertilizer and Recovery Guidance (Whole Explanation in selected language) */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-xs mt-3">
                  <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5 flex items-center gap-1 text-[11px]">
                    <Sprout className="w-3.5 h-3.5" />
                    <span>{labels.fertilizerHeader}:</span>
                  </span>
                  <p className="text-amber-950 dark:text-amber-200 text-[11px] leading-relaxed">
                    {localizedFert}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
