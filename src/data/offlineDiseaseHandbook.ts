import { OfflineDiseaseItem } from "../types";

export const OFFLINE_CATEGORIES = [
  { id: "All", label: { en: "All Crops", hi: "सभी फसलें", kn: "ಎಲ್ಲಾ ಬೆಳೆಗಳು", te: "అన్ని పంటలు", ta: "அனைத்து பயிர்கள்", mr: "सर्व पिके", pa: "ਸਾਰੀਆਂ ਫਸਲਾਂ", bn: "সকল ফসল", gu: "બધા પાક", ml: "എല്ലാ വിളകളും" } },
  { id: "Cash & Spices", label: { en: "Spices & Cash Crops", hi: "मसाले व नकदी फसलें", kn: "ಸಂಬಾರ ಮತ್ತು ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು", te: "సుగంధ ద్రవ్యాలు & వాణిజ్య పంటలు", ta: "மசாலா & பணப்பயிர்கள்", mr: "मसाले व नगदी पिके", pa: "ਮਸਾਲੇ ਅਤੇ ਨਕਦੀ ਫਸਲਾਂ", bn: "মসলা ও অর্থকরী ফসল", gu: "મસાલા અને રોકડિયા પાક", ml: "സുഗന്ധവ്യഞ്ജനങ്ങളും നാണ്യവിളകളും" } },
  { id: "Vegetables", label: { en: "Vegetables", hi: "सब्जियां", kn: "ತರಕಾರಿಗಳು", te: "కూరగాయలు", ta: "காய்கறிகள்", mr: "भाज्या", pa: "ਸਬਜ਼ੀਆਂ", bn: "শাকসবজি", gu: "શાકભાજી", ml: "പച്ചക്കറികൾ" } },
  { id: "Cereals & Grains", label: { en: "Cereals & Grains", hi: "अनाज व खाद्यान्न", kn: "ಧಾನ್ಯಗಳು", te: "ధాన్యాలు", ta: "தானியங்கள்", mr: "तृणधान्ये व अन्नधान्ये", pa: "ਅਨਾਜ", bn: "দানাশস্য", gu: "અનાજ અને ધાન્ય", ml: "ധാന്യങ്ങൾ" } },
  { id: "Fruits & Plantation", label: { en: "Fruits & Plantation", hi: "फल व बागवानी", kn: "ಹಣ್ಣುಗಳು ಮತ್ತು ತೋಟಗಾರಿಕೆ", te: "పండ్లు & తోటలు", ta: "பழங்கள் & தோட்டப்பயிர்கள்", mr: "फळे व फळबागा", pa: "ਫਲ ਅਤੇ ਬਾਗਬਾਨੀ", bn: "ফল ও বাগান", gu: "ફળો અને બાગાયત", ml: "പഴങ്ങളും തോട്ടവിളകളും" } },
  { id: "Pulses & Oilseeds", label: { en: "Pulses & Oilseeds", hi: "दालें व तिलहन", kn: "ದ್ವಿದಳ ಮತ್ತು ಎಣ್ಣೆಕಾಳುಗಳು", te: "పప్పుధాన్యాలు & నూనెగింజలు", ta: "பருப்பு & எண்ணெய் வித்துக்கள்", mr: "डाळी व गळित धान्ये", pa: "ਦਾਲਾਂ ਅਤੇ ਤੇਲ ਬੀਜ", bn: "ডাল ও তৈলবীজ", gu: "કઠોળ અને તેલીબિયાં", ml: "പയറുവർഗ്ഗങ്ങളും എണ്ണക്കുരുക്കളും" } },
];

export const OFFLINE_DISEASE_HANDBOOK: OfflineDiseaseItem[] = [
  // 1. GINGER
  {
    id: "off_01",
    crop: "Ginger (अदरक / ಶುಂಠಿ)",
    category: "Cash & Spices",
    scientificName: "Zingiber officinale",
    cropNames: {
      en: "Ginger",
      hi: "अदरक",
      kn: "ಶುಂಠಿ",
      te: "అల్లం",
      ta: "இஞ்சி",
      mr: "आले",
      pa: "ਅਦਰਕ",
      bn: "আদা",
      gu: "આદું",
      ml: "ഇഞ്ചി"
    },
    diseaseName: "Rhizome Rot / Soft Rot (Pythium / Erwinia)",
    diseaseNameLocal: {
      hi: "कंद सड़न रोग / मृदु विगलन",
      kn: "ಶುಂಠಿ ಗಡ್ಡೆ ಕೊಳೆ ರೋಗ",
      te: "అల్లం దుంప కుళ్లు తెగులు",
      ta: "இஞ்சி கிழங்கு அழுகல் நோய்",
      mr: "आले कंदकूज रोग",
      pa: "ਅਦਰਕ ਗੰਢ ਗਲਣ ਰੋਗ",
      bn: "আদার কন্দ পচা রোগ",
      gu: "આદુનો કંદ સડો",
      ml: "ഇഞ്ചി തടയഴുകൽ രോഗം"
    },
    severity: "High",
    symptoms: [
      "Water-soaked lesions on pseudostem base and collar region",
      "Rhizome turns soft, pulp-like, with foul-smelling bacterial exudate",
      "Yellowing and drooping of lower leaves first, spreading upwards rapidly"
    ],
    symptomsLocal: {
      kn: [
        "ಕಾಂಡದ ಬುಡದಲ್ಲಿ ನೀರು ತುಂಬಿದ ಕಂದು ಮಚ್ಚೆಗಳು",
        "ಶುಂಠಿ ಗಡ್ಡೆ ಮೆತ್ತಗಾಗಿ ಕೊಳೆತು ದುರ್ನಾತ ಬೀರುವುದು",
        "ಕೆಳಗಿನ ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಒಣಗಿ ಉದುರುವುದು"
      ],
      hi: [
        "तने के निचले हिस्से पर जलसिक्त भूरे धब्बे",
        "कंद मुलायम होकर सड़ने लगता है और दुर्गंध आती है",
        "निचली पत्तियां पीली पड़कर ऊपर की ओर सूखने लगती हैं"
      ]
    },
    organicCure: "Drench soil with Trichoderma viride bio-fungicide (50g in 10L water) and Neem cake (200kg/acre). Ensure raised bed planting and drainage.",
    organicCureLocal: {
      kn: "ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ (50 ಗ್ರಾಂ 10 ಲೀಟರ್ ನೀರಿಗೆ) ಮತ್ತು ಬೇವಿನ ಹಿಂಡಿ (200 ಕೆಜಿ/ಎಕರೆ) ಬೆರೆಸಿ ಬೇರಿಗೆ ಸುರಿಯಿರಿ.",
      hi: "ट्राइकोडर्मा विरिडी (50 ग्राम 10 लीटर पानी में) और नीम की खली (200 किग्रा/एकड़) का प्रयोग करें।"
    },
    chemicalCure: "Drench collar with Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/L or Copper Oxychloride 50% WP @ 3g/L water.",
    chemicalCureLocal: {
      kn: "ಮೆಟಲಾಕ್ಸಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ 2 ಗ್ರಾಂ/ಲೀಟರ್ ಅಥವಾ ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ 3 ಗ್ರಾಂ/ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಬುಡಕ್ಕೆ ಸುರಿಯಿರಿ.",
      hi: "कॉपर ऑक्सीक्लोराइड @ 3 ग्राम/लीटर या रेडोमिल एमजेड @ 2 ग्राम/लीटर का तने के पास छिड़काव करें।"
    },
    fertilizer: "Apply Potash (MOP) to improve stalk strength. Avoid excess nitrogen fertilization during monsoon rain.",
    fertilizerLocal: {
      kn: "ಕಾಂಡ ಗಟ್ಟಿಯಾಗಲು ಪೊಟ್ಯಾಶ್ (MOP) ಬಳಸಿ. ಮಳೆಗಾಲದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ಬಳಸಬೇಡಿ.",
      hi: "पोटाश (MOP) का उपयोग करें और वर्षा ऋतु में अधिक यूरिया न डालें।"
    }
  },
  {
    id: "off_02",
    crop: "Ginger (अदरक / ಶುಂಠಿ)",
    category: "Cash & Spices",
    scientificName: "Zingiber officinale",
    cropNames: { en: "Ginger", hi: "अदरक", kn: "ಶುಂಠಿ", te: "అల్లం", ta: "இஞ்சி", mr: "आले", pa: "ਅਦਰਕ", bn: "আদা", gu: "આદું", ml: "ഇഞ്ചി" },
    diseaseName: "Phyllosticta Leaf Spot (Phyllosticta zingiberi)",
    diseaseNameLocal: {
      hi: "पत्ती धब्बा रोग",
      kn: "ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
      te: "ఆకు మచ్చ తెగులు",
      ta: "இலைப்புள்ளி நோய்",
      mr: "पानावरील ठिपके",
      pa: "ਪੱਤਾ ਧੱਬਾ ਰੋਗ",
      bn: "পাতার দাগ রোগ",
      gu: "પાનના ટપકાંનો રોગ",
      ml: "ഇലപ്പുള്ളി രോഗം"
    },
    severity: "Medium",
    symptoms: [
      "Oval brown spots on leaf margins and tips with yellowish halos",
      "Leaves dry up and appear scorched/burnt from tip downwards",
      "Centres of spots turn greyish white with dark dots"
    ],
    organicCure: "Spray 5% Neem seed kernel extract (NSKE) or Panchagavya (30ml/L) every 10-12 days.",
    chemicalCure: "Spray Mancozeb 75% WP @ 2.5g/L water or Carbendazim 50% WP @ 1g/L water.",
    fertilizer: "Apply foliar micronutrient spray containing Zinc and Micronized Boron."
  },

  // 2. TOMATO
  {
    id: "off_03",
    crop: "Tomato (टमाटर / ಟೊಮೇಟೊ)",
    category: "Vegetables",
    scientificName: "Solanum lycopersicum",
    cropNames: { en: "Tomato", hi: "टमाटर", kn: "ಟೊಮೇಟೊ", te: "టమోటా", ta: "தக்காளி", mr: "टोमॅटो", pa: "ਟਮਾਟਰ", bn: "টমেটো", gu: "ટામેટા", ml: "തക്കാളി" },
    diseaseName: "Early Blight (Alternaria solani)",
    diseaseNameLocal: {
      hi: "अगेती झुलसा रोग",
      kn: "ಟೊಮೇಟೊ ಬೇಗನೆ ಬರುವ ಎಲೆ ಅಂಗಮಾರಿ",
      te: "ముందస్తు తెగులు",
      ta: "முன் பருவ கருகல் நோய்",
      mr: "लवकर येणारा करपा",
      pa: "ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ",
      bn: "আগাম ধ্বসা রোগ",
      gu: "અગેતી સુકારો",
      ml: "നേരത്തെയുള്ള കരിച്ചിൽ"
    },
    severity: "Medium",
    symptoms: [
      "Concentric ring 'target board' spots on older lower leaves",
      "Lower leaves turn yellow and drop prematurely (defoliation)",
      "Dark sunken lesions on stems and fruit calyx"
    ],
    organicCure: "Spray baking soda solution (5g/L) + Neem oil (5ml/L). Prune bottom 6 inches of infected leaves.",
    chemicalCure: "Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1ml/L or Mancozeb 75% WP @ 2.5g/L water.",
    fertilizer: "Apply balanced NPK 19:19:19 with Calcium Nitrate (2g/L) to prevent blossom end weakness."
  },
  {
    id: "off_04",
    crop: "Tomato (टमाटर / ಟೊಮೇಟೊ)",
    category: "Vegetables",
    scientificName: "Solanum lycopersicum",
    cropNames: { en: "Tomato", hi: "टमाटर", kn: "ಟೊಮೇಟೊ", te: "టమోటా", ta: "தக்காளி", mr: "टोमॅटो", pa: "ਟਮਾਟਰ", bn: "টমেটো", gu: "ટામેટા", ml: "തക്കാളി" },
    diseaseName: "Tomato Leaf Curl Virus (ToLCV)",
    diseaseNameLocal: {
      hi: "पर्ण कुंचन विषाणु / मरोड़िया",
      kn: "ಎಲೆ ಮುದುರು ರೋಗ (ವೈರಸ್)",
      te: "ఆకు ముడత వైరస్",
      ta: "இலை சுருள் நச்சுயிரி",
      mr: "पाने चुरगाळणे व्हायरस",
      pa: "ਪੱਤਾ ਮਰੋੜ ਰੋਗ",
      bn: "পাতা কোঁকড়ানো রোগ",
      gu: "પાન કોકડાઈ જવું",
      ml: "ഇലച്ചുരുൾ വൈറസ്"
    },
    severity: "High",
    symptoms: [
      "Downward curling, crinkling, thickening and stunting of shoot tips",
      "Leaves turn pale yellow, leathery and reduced in size",
      "Severe floral drop and bushy stunted appearance transmitted by Whiteflies"
    ],
    organicCure: "Install yellow sticky traps (15-20 per acre) to trap whitefly vectors. Spray Neem oil 10,000 PPM @ 3ml/L.",
    chemicalCure: "Control whitefly vector with Imidacloprid 17.8% SL @ 0.5ml/L water or Diafenthiuron 50% WP @ 1.2g/L.",
    fertilizer: "Apply Seaweed Extract bio-stimulant & Potassium Schoenite to build stress tolerance."
  },
  {
    id: "off_05",
    crop: "Tomato (टमाटर / ಟೊಮೇಟೊ)",
    category: "Vegetables",
    scientificName: "Solanum lycopersicum",
    cropNames: { en: "Tomato", hi: "टमाटर", kn: "ಟೊಮೇಟೊ", te: "టమోటా", ta: "தக்காளி", mr: "टोमॅटो", pa: "ਟਮਾਟਰ", bn: "টমেটো", gu: "ટામેટા", ml: "തക്കാളി" },
    diseaseName: "Late Blight (Phytophthora infestans)",
    diseaseNameLocal: {
      hi: "पछेती झुलसा रोग",
      kn: "ಹಿಂಗಾರು ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ",
      te: "ఆలస్యపు తెగులు",
      ta: "பிற்பருவ கருகல் நோய்",
      mr: "उशिरा येणारा करपा",
      pa: "ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ",
      bn: "নাবি ধ্বসা রোগ",
      gu: "પાછોતરો સુકારો",
      ml: "പിൽക്കാല കരിച്ചിൽ"
    },
    severity: "High",
    symptoms: [
      "Large, irregular water-soaked greasy brown lesions on leaves",
      "White fungal downy growth on underside of leaves in humid mornings",
      "Firm, dark brown decaying patches on green and ripe fruits"
    ],
    organicCure: "Preventive spray of Bordeaux mixture 1% or Copper Hydroxide @ 2g/L before cold foggy mornings.",
    chemicalCure: "Spray Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 2.5g/L or Dimethomorph 50% WP @ 1g/L water.",
    fertilizer: "Apply Sulfate of Potash (0-0-50) and reduce excessive irrigation during high relative humidity."
  },

  // 3. PADDY / RICE
  {
    id: "off_06",
    crop: "Paddy / Rice (धान / ಭತ್ತ)",
    category: "Cereals & Grains",
    scientificName: "Oryza sativa",
    cropNames: { en: "Paddy / Rice", hi: "धान / चावल", kn: "ಭತ್ತ / ಅಕ್ಕಿ", te: "వరి / ధాన్యం", ta: "நெல் / அரிசி", mr: "भात / तांदूळ", pa: "ਝੋਨਾ / ਚਾਵਲ", bn: "ধান / চাল", gu: "ડાંગર / ચોખા", ml: "നെല്ല് / അരി" },
    diseaseName: "Rice Blast (Magnaporthe oryzae)",
    diseaseNameLocal: {
      hi: "धान का ब्लास्ट / झोंका रोग",
      kn: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
      te: "వరి అగ్గితెగులు",
      ta: "நெல் குலை நோய்",
      mr: "भातावरील करपा (ब्लास्ट)",
      pa: "ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਰੋਗ",
      bn: "ধানের ব্লাস্ট রোগ",
      gu: "ડાંગરનો ગેરુ / બ્લાસ્ટ",
      ml: "നെല്ലിന്റെ കുമിൾ രോഗം (ബ്ലാസ്റ്റ്)"
    },
    severity: "High",
    symptoms: [
      "Eye-shaped or spindle-shaped lesions with grayish center and brown margin",
      "Lesions coalesce, causing leaf blades to dry and look burnt",
      "Neck blast causes panicle to break and grains to remain unfilled/chaffy"
    ],
    organicCure: "Spray Pseudomonas fluorescens bio-agent @ 10g/L water. Avoid excessive urea split doses during panicle stage.",
    chemicalCure: "Spray Tricyclazole 75% WP @ 0.6g/L water or Isoprothiolane 40% EC (Fuji-One) @ 1.5ml/L water.",
    fertilizer: "Apply Silicate solubilizing bio-fertilizer and Muriate of Potash (MOP) to harden leaf epidermis."
  },
  {
    id: "off_07",
    crop: "Paddy / Rice (धान / ಭತ್ತ)",
    category: "Cereals & Grains",
    scientificName: "Oryza sativa",
    cropNames: { en: "Paddy / Rice", hi: "धान / चावल", kn: "ಭತ್ತ", te: "వరి", ta: "நெல்", mr: "भात", pa: "ਝੋਨਾ", bn: "ধান", gu: "ડાંગર", ml: "നെല്ല്" },
    diseaseName: "Bacterial Leaf Blight (Xanthomonas oryzae)",
    diseaseNameLocal: {
      hi: "जीवाणु झुलसा रोग (BLB)",
      kn: "ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ",
      te: "బాక్టీరియా ఆకు ఎండు తెగులు",
      ta: "பாக்டீரியா இலைக்கருகல் நோய்",
      mr: "जिवाणूजन्य करपा",
      pa: "ਬੈਕਟੀਰੀਅਲ ਝੁਲਸ ਰੋਗ",
      bn: "ব্যাকটেরিয়াজনিত পাতা পোড়া",
      gu: "જીવાણુથી થતો સુકારો",
      ml: "ബാക്ടീരിയൽ ഇലക്കരിച്ചിൽ"
    },
    severity: "High",
    symptoms: [
      "Water-soaked translucent stripes starting from leaf tips moving downwards",
      "Leaves turn straw yellow and develop wavy margins with bacterial ooze beads",
      "Kresek (seedling wilt) stage causing complete plant death"
    ],
    organicCure: "Spray fresh cow dung filtrate extract (20g/L) or Copper Hydroxide @ 2g/L.",
    chemicalCure: "Spray Streptocycline @ 6g in 50L water + Copper Oxychloride @ 50g per acre.",
    fertilizer: "Immediately stop top-dressing Urea Nitrogen; apply extra Potash @ 15 kg/acre."
  },

  // 4. WHEAT
  {
    id: "off_08",
    crop: "Wheat (गेहूं / ಗೋಧಿ)",
    category: "Cereals & Grains",
    scientificName: "Triticum aestivum",
    cropNames: { en: "Wheat", hi: "गेहूं", kn: "ಗೋಧಿ", te: "గోధుమ", ta: "கோதுமை", mr: "गहू", pa: "ਕਣਕ", bn: "গম", gu: "ઘઉં", ml: "ഗോതമ്പ്" },
    diseaseName: "Yellow Rust / Stripe Rust (Puccinia striiformis)",
    diseaseNameLocal: {
      hi: "पीला रतुआ / धारीदार गेरुई",
      kn: "ಹಳದಿ ತುಕ್ಕು ರೋಗ",
      te: "పసుపు కుంకుమ తెగులు",
      ta: "மஞ்சள் துரு நோய்",
      mr: "पिवळा तांबेरा",
      pa: "ਪੀਲ਼ੀ ਕੁੰਗੀ",
      bn: "হলুদ মরিচা রোগ",
      gu: "પીળો ગેરુ",
      ml: "മഞ്ഞ തുരുമ്പ് രോഗം"
    },
    severity: "High",
    symptoms: [
      "Bright yellow, powdery pustules arranged in parallel linear stripes on leaves",
      "Pustules rub off readily as yellow dust on fingers or clothes",
      "Rapid premature leaf drying during cool, cloudy winter days"
    ],
    organicCure: "Spray sour buttermilk solution (30ml/L) with fermented copper wire extract as protective barrier.",
    chemicalCure: "Spray Propiconazole 25% EC (Tilt) @ 1ml/L water or Tebuconazole 25.9% EC @ 1ml/L at first appearance.",
    fertilizer: "Avoid late excessive Nitrogen application. Foliar spray of 0-0-50 Potassium Sulphate."
  },

  // 5. POTATO
  {
    id: "off_09",
    crop: "Potato (आलू / ಆಲೂಗಡ್ಡೆ)",
    category: "Vegetables",
    scientificName: "Solanum tuberosum",
    cropNames: { en: "Potato", hi: "आलू", kn: "ಆಲೂಗಡ್ಡೆ", te: "బంగాళాదుంప", ta: "உருளைக்கிழங்கு", mr: "बटाटा", pa: "ਆਲੂ", bn: "আলু", gu: "બટાકા", ml: "ഉരുളക്കിഴങ്ങ്" },
    diseaseName: "Late Blight of Potato (Phytophthora infestans)",
    diseaseNameLocal: {
      hi: "आलू का पछेती झुलसा",
      kn: "ಆಲೂಗಡ್ಡೆ ಹಿಂಗಾರು ಅಂಗಮಾರಿ",
      te: "బంగాళాదుంప లేట్ బ్లైట్",
      ta: "உருளைக்கிழங்கு பிற்பருவ கருகல்",
      mr: "बटाट्यावरील उशिरा येणारा करपा",
      pa: "ਆਲੂ ਦਾ ਪਛੇਤਾ ਝੁਲਸ",
      bn: "আলুর নাবি ধ্বসা",
      gu: "બટાકાનો પાછોતરો સુકારો",
      ml: "ഉരുളക്കിഴങ്ങ് കരിച്ചിൽ"
    },
    severity: "High",
    symptoms: [
      "Water-soaked dark lesions on leaf tips during cool humid fog (>90% humidity)",
      "White cottony fungal ring on underside of infected leaves in morning",
      "Tubers show dry brown granular rot beneath skin extending inward"
    ],
    organicCure: "Spray Copper Oxychloride 50% WP @ 2.5g/L + Trichoderma viride before heavy winter fog.",
    chemicalCure: "Spray Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L or Mandipropamid 23.4% SC @ 0.8ml/L water.",
    fertilizer: "Foliar application of Potassium Phosphite & Calcium Boron for tuber skin firmness."
  },

  // 6. CHILLI / PEPPER
  {
    id: "off_10",
    crop: "Chilli (मिर्च / ಮೆಣಸಿನಕಾಯಿ)",
    category: "Vegetables",
    scientificName: "Capsicum annuum",
    cropNames: { en: "Chilli", hi: "मिर्च", kn: "ಮೆಣಸಿನಕಾಯಿ", te: "మిరపకాయ", ta: "மிளகாய்", mr: "मिरची", pa: "ਮਿਰਚ", bn: "লঙ্কা", gu: "મરચાં", ml: "മുളക്" },
    diseaseName: "Chilli Murda Complex (Thrips, Mites & Virus)",
    diseaseNameLocal: {
      hi: "मिर्च का मुरड़ा रोग / चुरड़ा-मुरड़ा",
      kn: "ಮೆಣಸಿನಕಾಯಿ ಮುರುಡ ರೋಗ / ಎಲೆ ಸುರುಟು",
      te: "మిరప బొబ్బర తెగులు / ముడత",
      ta: "மிளகாய் இலை சுருட்டு நோய்",
      mr: "मिरचीवरील बोकड्या / चुरडा-मुरडा",
      pa: "ਮਿਰਚ ਦਾ ਮਰੋੜੀਆ ਰੋਗ",
      bn: "লঙ্কার পাতা কোঁকড়ানো",
      gu: "મરચીનો કોકડવા રોગ",
      ml: "മുളക് കുരുടിപ്പ് രോഗം"
    },
    severity: "High",
    symptoms: [
      "Leaves curl upwards like a boat/cup, brittle and elongated (Thrips attack)",
      "Leaves curl downwards like inverted saucer with thickened veins (Mites attack)",
      "Severe stunting, reduced flower set, and rosette-like terminal growth"
    ],
    organicCure: "Install blue sticky traps for thrips & yellow traps for whiteflies (20/acre). Spray Neem oil 10,000 PPM (3ml/L).",
    chemicalCure: "For Thrips: Fipronil 5% SC @ 2ml/L or Spinetoram 11.7% SC @ 0.9ml/L. For Mites: Spiromesifen 22.9% SC @ 1ml/L.",
    fertilizer: "Spray Micronutrient mixture (Zinc, Iron, Boron) @ 2g/L with Seaweed extract."
  },

  // 7. COTTON
  {
    id: "off_11",
    crop: "Cotton (कपास / ಹತ್ತಿ)",
    category: "Cash & Spices",
    scientificName: "Gossypium hirsutum",
    cropNames: { en: "Cotton", hi: "कपास", kn: "ಹತ್ತಿ", te: "పత్తి", ta: "பருத்தி", mr: "कापूस", pa: "ਕਪਾਹ", bn: "তুলা", gu: "કપાસ", ml: "പരുത്തി" },
    diseaseName: "Bacterial Blight / Angular Leaf Spot / Blackarm",
    diseaseNameLocal: {
      hi: "कपास का जीवाणु झुलसा / ब्लैक आर्म",
      kn: "ಹತ್ತಿ ಕಪ್ಪು ತೋಳು / ಕೋನೀಯ ಎಲೆ ಚುಕ್ಕೆ",
      te: "పత్తి బాక్టీరియల్ బ్లైట్ / నల్ల కొమ్మ తెగులు",
      ta: "பருத்தி கருங்கால் நோய்",
      mr: "कापसावरील काळा दांडा व करपा",
      pa: "ਕਪਾਹ ਦਾ ਕਾਲ਼ੀ ਡੰਡੀ ਰੋਗ",
      bn: "তুলার ব্লাকআর্ম রোগ",
      gu: "કપાસનો કાળી ડાંડી રોગ",
      ml: "പരുത്തി കരിച്ചിൽ"
    },
    severity: "High",
    symptoms: [
      "Small angular water-soaked spots bounded by leaf veins on underside",
      "Spots turn reddish-brown to black, forming 'Blackarm' lesions on stems",
      "Bolls develop water-soaked sunken black spots causing boll rotting"
    ],
    organicCure: "Seed delinting followed by Pseudomonas fluorescens bio-seed dressing.",
    chemicalCure: "Spray Streptocycline @ 1g/10L water + Copper Oxychloride @ 30g/10L water at first leaf symptom.",
    fertilizer: "Apply Potassium Magnesium Sulphate and avoid excess nitrogen."
  },

  // 8. ONION & GARLIC
  {
    id: "off_12",
    crop: "Onion & Garlic (प्याज व लहसुन / ಈರುಳ್ಳಿ ಮತ್ತು ಬೆಳ್ಳುಳ್ಳಿ)",
    category: "Vegetables",
    scientificName: "Allium cepa / sativum",
    cropNames: { en: "Onion & Garlic", hi: "प्याज और लहसुन", kn: "ಈರುಳ್ಳಿ ಮತ್ತು ಬೆಳ್ಳುಳ್ಳಿ", te: "ఉల్లిపాయ & వెల్లుల్లి", ta: "வெங்காயம் & பூண்டு", mr: "कांदा आणि लसूण", pa: "ਗੰਢਾ ਅਤੇ ਲਸਣ", bn: "পেঁয়াজ ও রসুন", gu: "ડુંગળી અને લસણ", ml: "ഉള്ളിയും വെളുത്തുള്ളിയും" },
    diseaseName: "Purple Blotch (Alternaria porri)",
    diseaseNameLocal: {
      hi: "बैंगनी धब्बा रोग",
      kn: "ನೇರಳೆ ಮಚ್ಚೆ ರೋಗ",
      te: "ఊదా మచ్చ తెగులు",
      ta: "ஊதா நிற இலைப்புள்ளி",
      mr: "जांभळा करपा",
      pa: "ਜਾਮਣੀ ਧੱਬਾ ਰੋਗ",
      bn: "বেগুনি দাগ রোগ",
      gu: "જાંબલી ધાબા રોગ",
      ml: "പർപ്പിൾ ബ്ലോട്ട്"
    },
    severity: "High",
    symptoms: [
      "Small sunken water-soaked spots with purple centres on leaves and flower stalks",
      "Lesions expand rapidly under warm humid conditions causing leaves to topple over",
      "Bulbs become small, soft, and neck rot occurs during storage"
    ],
    organicCure: "Spray Neem oil 5ml/L mixed with soap nut solution or Trichoderma viride @ 5g/L.",
    chemicalCure: "Spray Difenoconazole 25% EC (Score) @ 1ml/L or Mancozeb 75% WP @ 2.5g/L with a sticker agent.",
    fertilizer: "Apply Sulphur 80% WDG @ 3 kg/acre during bulb development to improve pungency and skin firmness."
  },

  // 9. SUGARCANE
  {
    id: "off_13",
    crop: "Sugarcane (गन्ना / ಕಬ್ಬು)",
    category: "Cash & Spices",
    scientificName: "Saccharum officinarum",
    cropNames: { en: "Sugarcane", hi: "गन्ना", kn: "ಕಬ್ಬು", te: "చెరకు", ta: "கரும்பு", mr: "ऊस", pa: "ਗੰਨਾ", bn: "আখ", gu: "શેરડી", ml: "കരിമ്പ്" },
    diseaseName: "Red Rot of Sugarcane (Colletotrichum falcatum)",
    diseaseNameLocal: {
      hi: "गन्ने का लाल सड़न रोग (रेड रॉट)",
      kn: "ಕಬ್ಬಿನ ಕೆಂಪು ಕೊಳೆ ರೋಗ",
      te: "చెరకు ఎర్ర కుళ్లు తెగులు",
      ta: "கரும்பு செவ்வழுகல் நோய்",
      mr: "ऊसावरील तांबडे कूज (रेड रॉट)",
      pa: "ਗੰਨੇ ਦਾ ਲਾਲ ਗਲਣ ਰੋਗ",
      bn: "আখের লাল পচা রোগ",
      gu: "શેરડીનો રાતો સડો",
      ml: "കരിമ്പ് ചുവപ്പ് അഴുകൽ"
    },
    severity: "High",
    symptoms: [
      "Third or fourth leaf from top shows yellowing and withering at tip",
      "Internal stalk tissues turn red with diagnostic white cross-bands/patches",
      "Fermented alcoholic/acidic sour odour when cane is split open"
    ],
    organicCure: "Set-treatment with hot water at 52°C for 30 minutes. Plant certified resistant setts.",
    chemicalCure: "Sett dipping in Carbendazim 50% WP @ 1g/L for 15 minutes before furrow planting.",
    fertilizer: "Avoid ratoon cropping in infected fields; ensure deep furrow drainage to prevent waterlogging."
  },

  // 10. SOYBEAN
  {
    id: "off_14",
    crop: "Soybean (सोयाबीन / ಸೋಯಾಬೀನ್)",
    category: "Pulses & Oilseeds",
    scientificName: "Glycine max",
    cropNames: { en: "Soybean", hi: "सोयाबीन", kn: "ಸೋಯಾಬೀನ್", te: "సోయాబీన్", ta: "சோயாபீன்", mr: "सोयाबीन", pa: "ਸੋਇਆਬੀਨ", bn: "সয়াবিন", gu: "સોયાબીન", ml: "സോയാബീൻ" },
    diseaseName: "Yellow Mosaic Virus (YMV)",
    diseaseNameLocal: {
      hi: "पीला मोज़ेक वायरस",
      kn: "ಹಳದಿ ಮೊಸಾಯಿಕ್ ವೈರಸ್ ರೋಗ",
      te: "పసుపు మొజాయిక్ వైరస్",
      ta: "மஞ்சள் தேமல் நச்சுயிரி",
      mr: "पिवळा मोझॅक व्हायरस",
      pa: "ਪੀਲ਼ਾ ਮੋਜ਼ੇਕ ਵਾਇਰਸ",
      bn: "হলুদ মোজাইক ভাইরাস",
      gu: "પીળો મોઝેક વાયરસ",
      ml: "മഞ്ഞ മൊസൈക് വൈറസ്"
    },
    severity: "High",
    symptoms: [
      "Bright golden-yellow mosaic patches intermixed with green areas on leaves",
      "Leaves become puckered, smaller, and pods are deformed with fewer seeds",
      "Transmitted rapidly by Whiteflies (Bemisia tabaci)"
    ],
    organicCure: "Install yellow sticky traps (15/acre). Rogue out early infected plants within first 25 days.",
    chemicalCure: "Control whitefly vector with Thiamethoxam 25% WG @ 0.3g/L or Acetamiprid 20% SP @ 0.5g/L water.",
    fertilizer: "Spray 19:19:19 + Chelated Zinc to revive secondary green foliage growth."
  },

  // 11. MUSTARD
  {
    id: "off_15",
    crop: "Mustard (सरसों / ಸಾಸಿವೆ)",
    category: "Pulses & Oilseeds",
    scientificName: "Brassica juncea",
    cropNames: { en: "Mustard", hi: "सरसों", kn: "ಸಾಸಿವೆ", te: "ఆవాలు", ta: "கடுகு", mr: "मोहरी", pa: "ਸਰ੍ਹੋਂ", bn: "সরিষা", gu: "રાઈ", ml: "കടുക്" },
    diseaseName: "White Rust & Staghead (Albugo candida)",
    diseaseNameLocal: {
      hi: "सफेद रतुआ व बारहसिंगा रोग",
      kn: "ಬಿಳಿ ತುಕ್ಕು ರೋಗ",
      te: "తెల్ల కుంకుమ తెగులు",
      ta: "வெண் துரு நோய்",
      mr: "पांढरा तांबेरा",
      pa: "ਚਿੱਟੀ ਕੁੰਗੀ",
      bn: "সাদা মরিচা রোগ",
      gu: "સફેદ ગેરુ",
      ml: "വെള്ള തുരുമ്പ്"
    },
    severity: "High",
    symptoms: [
      "Prominent white chalky pustules on the lower surface of leaves",
      "Floral axis swells, thickens, and distorts into a 'Staghead' monstrous structure",
      "No seed formation occurs on infected staghead floral branches"
    ],
    organicCure: "Spray garlic clove extract (5%) or Copper oxychloride @ 2.5g/L as preventive barrier.",
    chemicalCure: "Spray Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/L at early vegetative stage.",
    fertilizer: "Apply Sulphur @ 20 kg/acre (Bentonite Sulphur) to enhance oil content and disease resistance."
  },

  // 12. BANANA
  {
    id: "off_16",
    crop: "Banana (केला / ಬಾಳೆಹಣ್ಣು)",
    category: "Fruits & Plantation",
    scientificName: "Musa acuminata",
    cropNames: { en: "Banana", hi: "केला", kn: "ಬಾಳೆಹಣ್ಣು", te: "అరటి", ta: "வாழை", mr: "केळी", pa: "ਕੇਲਾ", bn: "কলা", gu: "કેળાં", ml: "വാഴ" },
    diseaseName: "Sigatoka Leaf Spot / Black Sigatoka",
    diseaseNameLocal: {
      hi: "सिगाटोका पत्ती धब्बा रोग",
      kn: "ಬಾಳೆ ಸಿಗಟೋಕ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
      te: "సిగటోకా ఆకు మచ్చ తెగులు",
      ta: "சிகடோகா இலைக்கருகல் நோய்",
      mr: "सिगाटोका करपा",
      pa: "ਸਿਗਾਟੋਕਾ ਪੱਤਾ ਧੱਬਾ",
      bn: "সিগাটোকা রোগ",
      gu: "સિગાટોકા પાનના ટપકાં",
      ml: "സിഗാറ്റോക്ക ഇലപ്പുള്ളി"
    },
    severity: "High",
    symptoms: [
      "Yellow lines along leaf veins developing into dark brown/black elongated streaks",
      "Center of streaks dries out and turns light grey surrounded by a black ring",
      "Leaves die prematurely, leading to small immature bunches"
    ],
    organicCure: "De-leafing of infected lower dried leaves and spraying mineral oil (10ml/L) + Neem oil.",
    chemicalCure: "Spray Propiconazole 25% EC @ 1ml/L or Azoxystrobin + Difenoconazole @ 1ml/L with mineral oil.",
    fertilizer: "Apply high Potash (MOP) @ 300g per plant in 4 split doses to strengthen pseudostem."
  },

  // 13. COFFEE
  {
    id: "off_17",
    crop: "Coffee (कॉफी / ಕಾಫಿ)",
    category: "Fruits & Plantation",
    scientificName: "Coffea arabica / canephora",
    cropNames: { en: "Coffee", hi: "कॉफी", kn: "ಕಾಫಿ", te: "కాఫీ", ta: "காபி", mr: "कॉफी", pa: "ਕੌਫੀ", bn: "কফি", gu: "કોફી", ml: "കാപ്പി" },
    diseaseName: "Coffee Leaf Rust (Hemileia vastatrix)",
    diseaseNameLocal: {
      hi: "कॉफी का पत्ती रतुआ रोग",
      kn: "ಕಾಫಿ ಎಲೆ ತುಕ್ಕು ರೋಗ (ರಸ್ಟ್)",
      te: "కాఫీ ఆకు కుంకుమ తెగులు",
      ta: "காபி இலை துரு நோய்",
      mr: "कॉफीवरील तांबेरा",
      pa: "ਕੌਫੀ ਪੱਤਾ ਕੁੰਗੀ",
      bn: "কফির মরিচা রোগ",
      gu: "કોફીનો ગેરુ",
      ml: "കാപ്പി തുരുമ്പ് രോഗം"
    },
    severity: "High",
    symptoms: [
      "Pale yellow spots on upper leaf surface with powdery orange-yellow spore dust on underside",
      "Severe premature defoliation leaving bare twigs with immature green berries",
      "Die-back of branches under heavy monsoon shade"
    ],
    organicCure: "Maintain overhead shade tree canopy (40-50% light). Spray 0.5% Bordeaux mixture before monsoon showers.",
    chemicalCure: "Spray Triadimefon 25% WP (Bayleton) @ 1g/L or Hexaconazole 5% EC @ 1ml/L in pre-monsoon and post-monsoon.",
    fertilizer: "Apply balanced NPK 17:17:17 with Magnesium Sulphate to support berry swelling."
  },

  // 14. TEA
  {
    id: "off_18",
    crop: "Tea (चाय / ಚಹಾ)",
    category: "Fruits & Plantation",
    scientificName: "Camellia sinensis",
    cropNames: { en: "Tea", hi: "चाय", kn: "ಚಹಾ", te: "టీ", ta: "தேநீர்", mr: "चहा", pa: "ਚਾਹ", bn: "চা", gu: "ચા", ml: "തേയില" },
    diseaseName: "Blister Blight (Exobasidium vexans)",
    diseaseNameLocal: {
      hi: "चाय का फफोला रोग (ब्लिस्टर ब्लाइट)",
      kn: "ಚಹಾ ಗುಳ್ಳೆ ರೋಗ (ಬ್ಲಿಸ್ಟರ್ ಬ್ಲೈಟ್)",
      te: "టీ బొబ్బ తెగులు",
      ta: "தேயிலை கொப்புள நோய்",
      mr: "चहावरील ब्लिस्टर ब्लाइट",
      pa: "ਚਾਹ ਦਾ ਛਾਲੇ ਵਾਲਾ ਰੋਗ",
      bn: "চায়ের ফোস্কা রোগ",
      gu: "ચાનો ફોલ્લા રોગ",
      ml: "തേയില കുമിള രോഗം"
    },
    severity: "High",
    symptoms: [
      "Translucent pale yellow circular spots on young succulent tender leaves",
      "Lower leaf surface forms a circular white blister-like depression",
      "Shoot tips turn black, dry out, destroying fresh harvest flush"
    ],
    organicCure: "Adjust pruning cycle before monsoon. Spray Copper Hydroxide @ 2g/L.",
    chemicalCure: "Spray Hexaconazole 5% EC @ 1ml/L + Copper Oxychloride @ 2g/L at 7-day plucking intervals.",
    fertilizer: "Apply Zinc Sulphate foliar spray (1%) to accelerate shoot bud breaking."
  },

  // 15. BLACK PEPPER
  {
    id: "off_19",
    crop: "Black Pepper (काली मिर्च / ಕಾಳುಮೆಣಸು)",
    category: "Cash & Spices",
    scientificName: "Piper nigrum",
    cropNames: { en: "Black Pepper", hi: "काली मिर्च", kn: "ಕಾಳುಮೆಣಸು", te: "నల్ల మిరియాలు", ta: "கருமிளகு", mr: "काळी मिरी", pa: "ਕਾਲੀ ਮਿਰਚ", bn: "গোলমরিচ", gu: "કાળી મરી", ml: "കുരുമുളക്" },
    diseaseName: "Quick Wilt / Foot Rot (Phytophthora capsici)",
    diseaseNameLocal: {
      hi: "द्रुत विगलन / पाद विगलन रोग",
      kn: "ಕಾಳುಮೆಣಸಿನ ಶೀಘ್ರ ಸೊರಗು ರೋಗ (ಕ್ವಿಕ್ ವಿಲ್ಟ್)",
      te: "త్వరిత ఎండు తెగులు",
      ta: "கருமிளகு விரைவு வாடல் நோய்",
      mr: "काळी मिरी द्रुत मर रोग",
      pa: "ਕਾਲੀ ਮਿਰਚ ਜੜ੍ਹ ਗਲਣ",
      bn: "গোলমরিচের দ্রুত শুকিয়ে যাওয়া রোগ",
      gu: "કાળી મરીનો ઝડપી સુકારો",
      ml: "ദ്രുതവാട്ടം (തടയഴുകൽ)"
    },
    severity: "High",
    symptoms: [
      "Dark water-soaked lesions with fimbriate feathery margins on leaves",
      "Sudden mass yellowing and shedding of entire vine leaves within 10-14 days",
      "Collar and root cortex rot and separate easily with foul rotting smell"
    ],
    organicCure: "Soil application of Trichoderma harzianum (50g per vine with neem cake) during May-June.",
    chemicalCure: "Drench vine root basin with 1% Bordeaux mixture or Potassium Phosphite (Akomin) @ 3ml/L water + Metalaxyl MZ @ 2g/L.",
    fertilizer: "Apply wood ash and balanced organic compost; ensure good drainage on standard support trees."
  },

  // 16. CARDAMOM
  {
    id: "off_20",
    crop: "Cardamom (इलायची / ಏಲಕ್ಕಿ)",
    category: "Cash & Spices",
    scientificName: "Elettaria cardamomum",
    cropNames: { en: "Cardamom", hi: "इलायची", kn: "ಏಲಕ್ಕಿ", te: "ఏలకులు", ta: "ஏலக்காய்", mr: "वेलची", pa: "ਇਲਾਇਚੀ", bn: "এলাচ", gu: "એલચી", ml: "ഏലം" },
    diseaseName: "Capsule Rot / Azhukal Disease (Phytophthora meadii)",
    diseaseNameLocal: {
      hi: "कैप्सूल सड़न / अझुकल रोग",
      kn: "ಏಲಕ್ಕಿ ಕೊಳೆ ರೋಗ / ಅಳುಕಲ್ ರೋಗ",
      te: "కాయ కుళ్లు తెగులు",
      ta: "ஏலக்காய் காய் அழுகல் நோய்",
      mr: "वेलची बोंड कूज",
      pa: "ਇਲਾਇਚੀ ਗਲਣ ਰੋਗ",
      bn: "এলাচ পচা রোগ",
      gu: "એલચીનો સડો",
      ml: "അഴുകൽ രോഗം (കായ് അഴുകൽ)"
    },
    severity: "High",
    symptoms: [
      "Water-soaked lesions on young capsules, panicles, and tiller base",
      "Infected capsules rot, turn dull brown, and drop off leaving empty panicles",
      "Foul rotting smell around clump base during southwest monsoon"
    ],
    organicCure: "Apply Trichoderma viride enriched organic compost (2 kg/clump) before pre-monsoon showers.",
    chemicalCure: "Spray 1% Bordeaux mixture on panicles and drench clump basin with Copper Oxychloride @ 3g/L or Akomin @ 3ml/L.",
    fertilizer: "Apply bone meal, wood ash, and ensure regulation of overhead forest shade."
  },

  // 17. TURMERIC
  {
    id: "off_21",
    crop: "Turmeric (हल्दी / ಅರಿಶಿನ)",
    category: "Cash & Spices",
    scientificName: "Curcuma longa",
    cropNames: { en: "Turmeric", hi: "हल्दी", kn: "ಅರಿಶಿನ", te: "పసుపు", ta: "மஞ்சள்", mr: "हळद", pa: "ਹਲਦੀ", bn: "হলুদ", gu: "હળદર", ml: "മഞ്ഞൾ" },
    diseaseName: "Rhizome Rot & Leaf Blotch (Pythium / Taphrina)",
    diseaseNameLocal: {
      hi: "हल्दी का कंद सड़न व पत्ती धब्बा",
      kn: "ಅರಿಶಿನ ಗಡ್ಡೆ ಕೊಳೆ ಮತ್ತು ಎಲೆ ಚುಕ್ಕೆ ರೋಗ",
      te: "పసుపు దుంప కుళ్లు & ఆకు మచ్చ",
      ta: "மஞ்சள் கிழங்கு அழுகல் & இலைப்புள்ளி",
      mr: "हळदीवरील कंदकूज व करपा",
      pa: "ਹਲਦੀ ਗੰਢ ਗਲਣ ਰੋਗ",
      bn: "হলুদের কন্দ পচা রোগ",
      gu: "હળદરનો કંદ સડો",
      ml: "മഞ്ഞൾ തടയഴുകലും ഇലപ്പുള്ളിയും"
    },
    severity: "High",
    symptoms: [
      "Small oval rectangular spots with yellow halos on leaf blades",
      "Pseudostem base turns soft, watery brown and collapses",
      "Underground mother and finger rhizomes rot with foul odour"
    ],
    organicCure: "Seed rhizome dip in Trichoderma viride (10g/L). Raised bed planting with thick organic mulch.",
    chemicalCure: "Drench soil with Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L or Copper Oxychloride 50% WP @ 3g/L.",
    fertilizer: "Apply Potash @ 40 kg/acre and Zinc Sulphate @ 10 kg/acre during earthing-up."
  },

  // 18. RUBBER
  {
    id: "off_22",
    crop: "Rubber (रबर / ರಬ್ಬರ್)",
    category: "Fruits & Plantation",
    scientificName: "Hevea brasiliensis",
    cropNames: { en: "Rubber", hi: "रबर", kn: "ರಬ್ಬರ್", te: "రబ్బరు", ta: "ரப்பர்", mr: "रबर", pa: "ਰਬੜ", bn: "রাবার", gu: "રબર", ml: "റബ്ബർ" },
    diseaseName: "Abnormal Leaf Fall & Pink Disease",
    diseaseNameLocal: {
      hi: "असामान्य पत्ती पतन व गुलाबी रोग",
      kn: "ರಬ್ಬರ್ ಅಸಹಜ ಎಲೆ ಉದುರುವಿಕೆ ಮತ್ತು ಗುಲಾಬಿ ರೋಗ",
      te: "అసాధారణ ఆకు రాలుట & పింక్ తెగులు",
      ta: "ரப்பர் இலை உதிர்தல் & இளஞ்சிவப்பு நோய்",
      mr: "रबरावरील पानगळ व गुलाबी रोग",
      pa: "ਰਬੜ ਪੱਤਾ ਝੜਨ ਰੋਗ",
      bn: "রাবারের পাতা ঝরা রোগ",
      gu: "રબરનો પાન ખરવાનો રોગ",
      ml: "റബ്ബർ തളിരില കൊഴിച്ചിലും പിങ്ക് രോഗവും"
    },
    severity: "High",
    symptoms: [
      "Water-soaked lesions on petiole showing white droplet of coagulated latex",
      "Mass premature leaf shedding during heavy monsoon downpours",
      "Forked branches develop white cobwebby fungal growth turning salmon pink"
    ],
    organicCure: "Apply Bordeaux paste (1:1:10) on branching forks and tapping panel wounds.",
    chemicalCure: "Aerial or high-pressure spray of 1% Bordeaux mixture or Copper Oxychloride in oil dispersion before June monsoon.",
    fertilizer: "Apply NPK 10:10:10 @ 400g per tree with Magnesium Sulphate."
  },

  // 19. COCONUT
  {
    id: "off_23",
    crop: "Coconut (नारियल / ತೆಂಗಿನಕಾಯಿ)",
    category: "Fruits & Plantation",
    scientificName: "Cocos nucifera",
    cropNames: { en: "Coconut", hi: "नारियल", kn: "ತೆಂಗಿನಕಾಯಿ", te: "కొబ్బరి", ta: "தேங்காய்", mr: "नारळ", pa: "ਨਾਰੀਅਲ", bn: "নারকেল", gu: "નાળિયેર", ml: "നാളികേരം / തെങ്ങ്" },
    diseaseName: "Bud Rot & Stem Bleeding (Phytophthora palmivora)",
    diseaseNameLocal: {
      hi: "नारियल का कली सड़न व तना स्राव",
      kn: "ತೆಂಗಿನ ಸುಳಿ ಕೊಳೆ ಮತ್ತು ಕಾಂಡದ ರಸ ಸೋರುವಿಕೆ",
      te: "కొబ్బరి మొవ్వు కుళ్లు తెగులు",
      ta: "தென்னை குருத்தழுகல் நோய்",
      mr: "नारळावरील शेंडाकूज व खोड स्राव",
      pa: "ਨਾਰੀਅਲ ਪੱਤਾ ਗਲਣ",
      bn: "নারকেলের কুঁড়ি পচা রোগ",
      gu: "નાળિયેરીનો કૂંપળ સડો",
      ml: "കൂമ്പ് ചീയൽ (കുരുത്തോല അഴുകൽ)"
    },
    severity: "High",
    symptoms: [
      "Young central spindle spear leaf turns yellow, withers, and rots at base",
      "Spindle leaf can be easily pulled out with foul-smelling soft rot",
      "Reddish-brown rust coloured liquid oozes from longitudinal stem cracks"
    ],
    organicCure: "Clean crown, remove decaying tissues, and apply Trichoderma viride talc paste + Neem oil.",
    chemicalCure: "Place perforated sachet of Copper Oxychloride (5g) + Mancozeb on top crown basin; apply Bordeaux paste to stem cracks.",
    fertilizer: "Apply Muriate of Potash (MOP) @ 1.5 kg, Urea @ 1 kg, and Magnesium Sulphate @ 500g per adult palm per year."
  },

  // 20. ARECANUT
  {
    id: "off_24",
    crop: "Arecanut / Betelnut (सुपारी / ಅಡಿಕೆ)",
    category: "Fruits & Plantation",
    scientificName: "Areca catechu",
    cropNames: { en: "Arecanut", hi: "सुपारी", kn: "ಅಡಿಕೆ", te: "పోకచెక్క", ta: "பாக்கு", mr: "सुपारी", pa: "ਸੁਪਾਰੀ", bn: "সুপারি", gu: "સોપારી", ml: "അടയ്ക്ക / കവുങ്ങ്" },
    diseaseName: "Fruit Rot / Koleroga / Mahali (Phytophthora meadii)",
    diseaseNameLocal: {
      hi: "सुपारी का कोलेरोगा / महाली फल सड़न",
      kn: "ಅಡಿಕೆ ಕೊಳೆ ರೋಗ / ಮಹಾಳಿ ರೋಗ",
      te: "పోక కుళ్లు తెగులు / కొలెరోగ",
      ta: "பாக்கு அழுகல் / கொலெரோகா நோய்",
      mr: "सुपारीवरील कोळेरोग / महाळी",
      pa: "ਸੁਪਾਰੀ ਗਲਣ ਰੋਗ",
      bn: "সুপারি পচা রোগ",
      gu: "સોપારીનો કોલેરોગા રોગ",
      ml: "മഹളി രോഗം (കൊളെരോഗ / കായ്പൊഴിച്ചിൽ)"
    },
    severity: "High",
    symptoms: [
      "Water-soaked dark green lesions on base of young tender green nuts (calyx)",
      "Massive premature dropping of green nuts covering garden floor ('Mahali')",
      "White felt-like fungal growth covers fallen rotting nuts"
    ],
    organicCure: "Cover fruit bunches with polythene covers (Aerated UV bags) before onset of monsoon rain.",
    chemicalCure: "Prophylactic spray of 1% Bordeaux mixture on bunches before monsoon; repeat after 40 days or spray Metalaxyl MZ @ 2g/L.",
    fertilizer: "Apply 100g Nitrogen, 40g Phosphorus, 140g Potassium per bearing palm in two split doses."
  },

  // 21. CASHEW
  {
    id: "off_25",
    crop: "Cashew (काजू / ಗೋಡಂಬಿ)",
    category: "Fruits & Plantation",
    scientificName: "Anacardium occidentale",
    cropNames: { en: "Cashew", hi: "काजू", kn: "ಗೋಡಂಬಿ", te: "జీడిమామిడి", ta: "முந்திரி", mr: "काजू", pa: "ਕਾਜੂ", bn: "কাজু", gu: "કાજુ", ml: "കശുമാവ് / കശുവണ്ടി" },
    diseaseName: "Tea Mosquito Bug & Anthracnose Die-back",
    diseaseNameLocal: {
      hi: "काजू का टी मॉस्किटो बग व डाई-बैक",
      kn: "ಗೋಡಂಬಿ ಟೀ ಸೊಳ್ಳೆ ಮತ್ತು ತುದಿ ಒಣಗು ರೋಗ",
      te: "జీడిమామిడి దోమ & కొమ్మ ఎండు తెగులు",
      ta: "முந்திரி கொசு & நுனிக்கருகல்",
      mr: "काजूवरील टी मॉस्किटो बग व मर रोग",
      pa: "ਕਾਜੂ ਕੀਟ ਰੋਗ",
      bn: "কাজুর ডাই-ব্যাক রোগ",
      gu: "કાજુનો ડાય-બેક રોગ",
      ml: "തേയില കൊതുക് ആക്രമണവും ഉണക്കുരോഗവും"
    },
    severity: "High",
    symptoms: [
      "Angular brownish-black necrotic resinous spots on young shoots and flower panicles",
      "Infested panicles dry up, looking scorched/burnt without fruit set",
      "Resinous gum oozes from feeding puncture wounds on tender cashew apples"
    ],
    organicCure: "Spray Neem oil 10,000 PPM (5ml/L) or Beauveria bassiana bio-insecticide.",
    chemicalCure: "Spray Lambda Cyhalothrin 5% EC @ 0.6ml/L or Acetamiprid 20% SP @ 0.5g/L during flushing and flowering stages.",
    fertilizer: "Apply NPK 500:250:250 g per tree along with Zinc Sulphate."
  },

  // 22. POMEGRANATE
  {
    id: "off_26",
    crop: "Pomegranate (अनार / ದಾಳಿಂಬೆ)",
    category: "Fruits & Plantation",
    scientificName: "Punica granatum",
    cropNames: { en: "Pomegranate", hi: "अनार", kn: "ದಾಳಿಂಬೆ", te: "దానిమ్మ", ta: "மாதுளை", mr: "डाळಿಂಬ", pa: "ਅਨਾਰ", bn: "বেদানা", gu: "દાડમ", ml: "മാതളനാരകം" },
    diseaseName: "Bacterial Blight / Telya / Oily Spot",
    diseaseNameLocal: {
      hi: "अनार का तेलीय धब्बा / तेल्या रोग",
      kn: "ದಾಳಿಂಬೆ ತೇಲ್ಯ ರೋಗ / ಎಣ್ಣೆ ಮಚ್ಚೆ ರೋಗ",
      te: "దానిమ్మ నూనె మచ్చ తెగులు (తేల్య)",
      ta: "மாதுளை பாக்டீரியா எண்ணெய் புள்ளி",
      mr: "डाळिंबावरील तेल्या रोग",
      pa: "ਅਨਾਰ ਦਾ ਤੇਲੀਆ ਰੋਗ",
      bn: "ডালিমের তেলিয়া রোগ",
      gu: "દાડમનો તેલીયો રોગ",
      ml: "മാതളം എണ്ണപ്പുള്ളി രോഗം"
    },
    severity: "High",
    symptoms: [
      "Small dark water-soaked oily spots with yellow halos on leaves",
      "L-shaped or Y-shaped deep cracks develop on fruits along oily lesions",
      "Severe defoliation and split rotting fruits reducing complete market value"
    ],
    organicCure: "Prune infected twigs 2 inches below lesion and apply Bordeaux paste. Spray Bio-bactericide (Pseudomonas).",
    chemicalCure: "Spray Streptocycline @ 0.5g/L + Copper Oxychloride 50% WP @ 2.5g/L or Bronopol (Bactronol) @ 0.5g/L.",
    fertilizer: "Apply balanced Calcium, Boron, and Potash; avoid water stress during fruit development."
  },

  // 23. GRAPES
  {
    id: "off_27",
    crop: "Grapes (अंगूर / ದ್ರಾಕ್ಷಿ)",
    category: "Fruits & Plantation",
    scientificName: "Vitis vinifera",
    cropNames: { en: "Grapes", hi: "अंगूर", kn: "ದ್ರಾಕ್ಷಿ", te: "ద్రాక్ష", ta: "திராட்சை", mr: "द्राक्षे", pa: "ਅੰਗੂਰ", bn: "আঙুর", gu: "દ્રાક્ષ", ml: "മുന്തിരി" },
    diseaseName: "Downy Mildew & Powdery Mildew",
    diseaseNameLocal: {
      hi: "अंगूर का मृदुरोमिल व चूर्णिल आसिता",
      kn: "ದ್ರಾಕ್ಷಿ ಬೂದಿ ರೋಗ ಮತ್ತು ಡೌನಿ ಮಿಲ್ಡ್ಯೂ",
      te: "ద్రాక్ష బూడిద తెగులు & డౌనీ మిల్డ్యూ",
      ta: "திராட்சை சாம்பல் நோய் & அடிச்சாம்பல் நோய்",
      mr: "द्राक्षांवरील भुरी व केवडा रोग",
      pa: "ਅੰਗੂਰਾਂ ਦਾ ਉੱਲੀ ਰੋਗ",
      bn: "আঙুরের ডাউনি ও পাউডারি মিলডিউ",
      gu: "દ્રાક્ષનો છારો અને તળછારો",
      ml: "മുന്തിരി പൂപ്പൽ രോഗം"
    },
    severity: "High",
    symptoms: [
      "Downy: Yellowish translucent 'oil spots' on upper leaf with white downy growth underneath",
      "Powdery: Greyish-white powdery fungal coating on leaves, shoots, and young grape berries",
      "Berries crack, harden, and shrivel into dry raisins"
    ],
    organicCure: "Spray Liquid Lime Sulphur (2ml/L) or Ampelomyces quisqualis bio-fungicide.",
    chemicalCure: "For Downy: Mandipropamid 23.4% SC @ 0.8ml/L or Dimethomorph @ 1g/L. For Powdery: Azoxystrobin @ 1ml/L or Penconazole @ 0.5ml/L.",
    fertilizer: "Apply foliar Potassium Silicate (2g/L) to strengthen cuticle against fungal penetration."
  },

  // 24. BRINJAL
  {
    id: "off_28",
    crop: "Brinjal / Eggplant (बैंगन / ಬದನೆಕಾಯಿ)",
    category: "Vegetables",
    scientificName: "Solanum melongena",
    cropNames: { en: "Brinjal", hi: "बैंगन", kn: "ಬದನೆಕಾಯಿ", te: "వంకాయ", ta: "கத்தரிக்காய்", mr: "वांगी", pa: "ਬੈਂਗਣ", bn: "বেগুন", gu: "રીંગણ", ml: "വഴുതനങ്ങ" },
    diseaseName: "Shoot & Fruit Borer & Little Leaf",
    diseaseNameLocal: {
      hi: "बैंगन का तना व फल छेदक और छोटी पत्ती",
      kn: "ಬದನೆಕಾಯಿ ಸುಳಿ ಮತ್ತು ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು",
      te: "వంకాయ కొమ్మ & కాయ తొలుచు పురుగు",
      ta: "கத்தரி தண்டு மற்றும் காய் துளைப்பான்",
      mr: "वांग्यावरील शेंडा व फळ पोखरणारी अळी",
      pa: "ਬੈਂਗਣ ਫਲ ਛੇਦਕ ਸੁੰਡੀ",
      bn: "বেগুনের ডগা ও ফল ছিদ্রকারী পোকা",
      gu: "રીંગણની ડૂંખ અને ફળ કોરી ખાનાર ઈયળ",
      ml: "വഴുതന തണ്ട് തുരപ്പൻ പുഴു"
    },
    severity: "High",
    symptoms: [
      "Terminal tender shoot wilts and droops down with circular entrance hole",
      "Fruit shows circular bore holes plugged with dark insect frass/excreta",
      "Little Leaf causes tiny pale green clustered leaves with bushy stunted growth"
    ],
    organicCure: "Install Pheromone traps (Lucinlure @ 12 traps/acre). Clip and destroy wilted shoots weekly.",
    chemicalCure: "Spray Emamectin Benzoate 5% SG @ 0.5g/L or Chlorantraniliprole 18.5% SC (Coragen) @ 0.4ml/L water.",
    fertilizer: "Apply Neem cake (250 kg/acre) + balanced NPK 19:19:19."
  },

  // 25. OKRA
  {
    id: "off_29",
    crop: "Okra / Ladyfinger (भिंडी / ಬೆಂಡೆಕಾಯಿ)",
    category: "Vegetables",
    scientificName: "Abelmoschus esculentus",
    cropNames: { en: "Okra", hi: "भिंडी", kn: "ಬೆಂಡೆಕಾಯಿ", te: "బెండకాయ", ta: "வெண்டைக்காய்", mr: "भेंडी", pa: "ਭਿੰਡੀ", bn: "ঢ্যাঁড়শ", gu: "ભીંડા", ml: "വെണ്ടയ്ക്ക" },
    diseaseName: "Yellow Vein Mosaic Virus (YVMV)",
    diseaseNameLocal: {
      hi: "भिंडी का पीला शिरा मोज़ेक रोग",
      kn: "ಬೆಂಡೆಕಾಯಿ ಹಳದಿ ನರ ಮೊಸಾಯಿಕ್ ರೋಗ",
      te: "బెండ పసుపు ఈనెల మొజాయిక్ తెగులు",
      ta: "வெண்டை மஞ்சள் நரம்பு தேமல் நோய்",
      mr: "भेंडीवरील पिवळा शिरा मोझॅक",
      pa: "ਭਿੰਡੀ ਪੀਲ਼ੀ ਨਾੜੀ ਰੋਗ",
      bn: "ঢ্যাঁড়শের হলুদ শিরা মোজাইক",
      gu: "ભીંડાનો પીળી નસનો મોઝેક રોગ",
      ml: "വെണ്ട മഞ്ഞ ഞരമ്പ് മൊസൈക്"
    },
    severity: "High",
    symptoms: [
      "Network of veins turns golden yellow while interveinal areas remain green",
      "Entire leaf blade turns completely chlorotic yellow in advanced stage",
      "Fruits turn pale yellow, small, fibrous, and unmarketable"
    ],
    organicCure: "Install yellow sticky traps (20/acre) to trap Whitefly vectors. Spray Neem oil 10,000 PPM (3ml/L).",
    chemicalCure: "Control whiteflies with Acetamiprid 20% SP @ 0.5g/L or Thiamethoxam 25% WG @ 0.3g/L.",
    fertilizer: "Apply foliar Micronutrient mixture (Iron, Zinc, Magnesium) @ 2g/L."
  },

  // 26. SAFFRON
  {
    id: "off_30",
    crop: "Saffron (केसर / ಕುಂಕುಮ ಕೇಸರಿ)",
    category: "Cash & Spices",
    scientificName: "Crocus sativus",
    cropNames: { en: "Saffron", hi: "केसर", kn: "ಕುಂಕುಮ ಕೇಸರಿ", te: "కుంకుమపువ్వు", ta: "குங்குமப்பூ", mr: "केशर", pa: "ਕੇਸਰ", bn: "জাফরান", gu: "કેસર", ml: "കുങ്കുമപ്പൂവ്" },
    diseaseName: "Corm Rot (Fusarium oxysporum / Rhizoctonia)",
    diseaseNameLocal: {
      hi: "केसर का कंद सड़न रोग",
      kn: "ಕೇಸರಿ ಗಡ್ಡೆ ಕೊಳೆ ರೋಗ",
      te: "కుంకుమపువ్వు దుంప కుళ్లు తెగులు",
      ta: "குங்குமப்பூ கிழங்கு அழுகல்",
      mr: "केशर कंदकूज",
      pa: "ਕੇਸਰ ਗੰਢ ਗਲਣ",
      bn: "জাফরানের কন্দ পচা",
      gu: "કેસરનો કંદ સડો",
      ml: "കുങ്കുമപ്പൂവ് കിഴങ്ങ് അഴുകൽ"
    },
    severity: "High",
    symptoms: [
      "Dark brown sunken necrotic lesions on subterranean saffron corms",
      "Yellowing and premature drying of narrow foliage leaves",
      "Corms turn spongy and rotten with violet-brown fungal sclerotia"
    ],
    organicCure: "Solarize raised beds and treat corms with Trichoderma viride (10g/kg).",
    chemicalCure: "Dip corms in Carbendazim 50% WP (1g/L) + Mancozeb (2g/L) for 30 minutes before planting.",
    fertilizer: "Incorporate well-decomposed sheep manure (10 tonnes/ha) with balanced Potash."
  },

  // 27. PAPAYA
  {
    id: "off_31",
    crop: "Papaya (पपीता / ಪರಂಗಿಹಣ್ಣು)",
    category: "Fruits & Plantation",
    scientificName: "Carica papaya",
    cropNames: { en: "Papaya", hi: "पपीता", kn: "ಪರಂಗಿಹಣ್ಣು / ಪಪ್ಪಾಯಿ", te: "బొప్పాయి", ta: "பப்பாளி", mr: "पपई", pa: "ਪਪੀਤਾ", bn: "পেঁপে", gu: "પપૈયાં", ml: "പപ്പായ" },
    diseaseName: "Papaya Ring Spot Virus (PRSV)",
    diseaseNameLocal: {
      hi: "पपीता रिंग स्पॉट वायरस",
      kn: "ಪಪ್ಪಾಯಿ ರಿಂಗ್ ಸ್ಪಾಟ್ ವೈರಸ್",
      te: "బొప్పాయి రింగ్ స్పాట్ వైరస్",
      ta: "பப்பாளி வளைய புள்ளி நச்சுயிரி",
      mr: "पपईवरील रिंग स्पॉट व्हायरस",
      pa: "ਪਪੀਤਾ ਰਿੰਗ ਸਪਾਟ",
      bn: "পেঁপের রিং স্পট রোগ",
      gu: "પપૈયાનો રીંગ સ્પોટ વાયરસ",
      ml: "പപ്പായ റിംഗ് സ്പോട്ട് വൈറസ്"
    },
    severity: "High",
    symptoms: [
      "Shoestring filiform narrow deformed leaves with mosaic chlorosis",
      "Water-soaked dark green greasy streaks on petiole and upper trunk",
      "Diagnostic concentric rings and circular spots on green fruits"
    ],
    organicCure: "Grow border rows of Maize/Sorghum as vector barrier. Spray Neem oil (5ml/L).",
    chemicalCure: "Control aphid vectors with Dimethoate 30% EC @ 1.5ml/L or Imidacloprid @ 0.5ml/L.",
    fertilizer: "Apply 250g Nitrogen, 250g Phosphorus, 500g Potassium per tree in 6 bimonthly splits."
  },

  // 28. GUAVA
  {
    id: "off_32",
    crop: "Guava (अमरूद / ಸೀಬೆಹಣ್ಣು)",
    category: "Fruits & Plantation",
    scientificName: "Psidium guajava",
    cropNames: { en: "Guava", hi: "अमरूद", kn: "ಸೀಬೆಹಣ್ಣು / ಪೇರಲ", te: "జామకాయ", ta: "கொய்யா", mr: "पेरू", pa: "ਅਮਰੂਦ", bn: "পেয়ারা", gu: "જામફળ", ml: "പേരയ്ക്ക" },
    diseaseName: "Guava Wilt (Fusarium oxysporum f. sp. psidii)",
    diseaseNameLocal: {
      hi: "अमरूद का उकठा / विल्ट रोग",
      kn: "ಸೀಬೆಹಣ್ಣು ಸೊರಗು ರೋಗ (ವಿಲ್ಟ್)",
      te: "జామ ఎండు తెగులు",
      ta: "கொய்யா வாடல் நோய்",
      mr: "पेरूवरील मर रोग",
      pa: "ਅਮਰੂਦ ਸੁੱਕਾ ਰੋਗ",
      bn: "পেয়ারার উইল্ট রোগ",
      gu: "જામફળનો સુકારો",
      ml: "പേര വാട്ടരോഗം"
    },
    severity: "High",
    symptoms: [
      "Light yellowing of leaves followed by sudden complete wilting of branches",
      "Leaves turn bronze/purplish before drying and remain hanging on tree",
      "Longitudinal splitting reveals dark browning of root vascular tissues"
    ],
    organicCure: "Drench root basin with Trichoderma viride enriched FYM (5 kg/tree).",
    chemicalCure: "Soil drench basin with Carbendazim 50% WP @ 2g/L water or Thiophanate Methyl @ 1.5g/L.",
    fertilizer: "Apply Gypsum @ 500g/tree and avoid water stagnation in root zone."
  },

  // 29. MILLETS / RAGI / BAJRA / JOWAR
  {
    id: "off_33",
    crop: "Millets & Ragi (बाजरा, ज्वार, रागी / ಸಿರಿಧಾನ್ಯಗಳು)",
    category: "Cereals & Grains",
    scientificName: "Eleusine coracana / Pennisetum glaucum",
    cropNames: { en: "Millets & Ragi", hi: "बाजरा, ज्वार, रागी", kn: "ಸಿರಿಧಾನ್ಯಗಳು / ರಾಗಿ / ಜೋಳ", te: "చిరుధాన్యాలు / రాగులు", ta: "சிறுதானியங்கள் / கேழ்வரகு", mr: "बाजरी, ज्वारी, नाचणी", pa: "ਬਾਜਰਾ, ਜਵਾਰ, ਕੋਧਰਾ", bn: "বাজরা ও জোয়ার", gu: "બાજરી અને જુવાર", ml: "ചാമ, റാഗി, തിന" },
    diseaseName: "Blast & Green Ear Disease / Downy Mildew",
    diseaseNameLocal: {
      hi: "रागी का ब्लास्ट व बाजरा का हरित बाली रोग",
      kn: "ರಾಗಿ ಬೆಂಕಿ ರೋಗ ಮತ್ತು ಸಜ್ಜೆ ಹಸಿರು ತೆನೆ ರೋಗ",
      te: "రాగి అగ్గితెగులు & సజ్జ పచ్చకంకి తెగులు",
      ta: "கேழ்வரகு குலை நோய் & கம்பு பசுங்கதிர் நோய்",
      mr: "नाचणीवरील करपा व बाजरीवरील गोसावी रोग",
      pa: "ਬਾਜਰੇ ਦਾ ਹਰਾ ਸਿੱਟਾ ਰੋਗ",
      bn: "বাজরার সবুজ শীষ রোগ",
      gu: "બાજરીનો લીલી કૂંડી રોગ",
      ml: "റാഗി കുമിൾ രോഗം"
    },
    severity: "High",
    symptoms: [
      "Finger / neck blast causes finger nodes to turn black and break",
      "Bajra earheads transform into a leafy green mass ('Green Ear')",
      "White downy chlorotic stripes appear on upper surface of foliage"
    ],
    organicCure: "Seed treatment with Pseudomonas fluorescens (10g/kg seed).",
    chemicalCure: "Spray Tricyclazole 75% WP @ 0.6g/L for Ragi blast or Metalaxyl MZ @ 2g/L for Bajra green ear.",
    fertilizer: "Apply balanced NPK 50:40:25 kg/ha with Zinc Sulphate @ 10 kg/ha."
  },

  // 30. GROUNDNUT
  {
    id: "off_34",
    crop: "Groundnut (मूंगफली / ಕಡಲೆಕಾಯಿ)",
    category: "Pulses & Oilseeds",
    scientificName: "Arachis hypogaea",
    cropNames: { en: "Groundnut", hi: "मूंगफली", kn: "ಕಡಲೆಕಾಯಿ / ನೆಲಗಡಲೆ", te: "వేరుశనగ", ta: "நிலக்கடலை", mr: "शेंगदाणा / भुईमूग", pa: "ਮੂੰਗਫਲੀ", bn: "চীনাবাদাম", gu: "મગફળી", ml: "നിലക്കടല" },
    diseaseName: "Tikka Leaf Spot (Cercospora)",
    diseaseNameLocal: {
      hi: "मूंगफली का टिक्का रोग",
      kn: "ಕಡಲೆಕಾಯಿ ಟಿಕ್ಕಾ ಎಲೆ ಮಚ್ಚೆ ರೋಗ",
      te: "వేరుశనగ తిక్కా ఆకు మచ్చ తెగులు",
      ta: "நிலக்கடலை டிக்கா இலைப்புள்ளி நோய்",
      mr: "भुईमुगावरील टिक्का रोग",
      pa: "ਮੂੰਗਫਲੀ ਦਾ ਟਿੱਕਾ ਰੋਗ",
      bn: "চীনাবাদামের টিক্কা রোগ",
      gu: "મગફળીનો ટીક્કો રોગ",
      ml: "നിലക്കടല ടിക്ക രോഗം"
    },
    severity: "High",
    symptoms: [
      "Circular reddish-brown spots with prominent bright yellow halos on upper leaf",
      "Severe premature defoliation leaving bare stems with stunted pods",
      "Dark brown lesions appear on stems and pegs weakening pod harvest"
    ],
    organicCure: "Spray 5% Neem seed kernel extract (NSKE) or sour buttermilk spray (30ml/L).",
    chemicalCure: "Spray Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2g/L or Tebuconazole 25.9% EC @ 1.25ml/L.",
    fertilizer: "Apply Gypsum @ 200 kg/acre at pegging stage (40-45 days after sowing) for pod filling."
  },

  // 31. MAIZE / CORN
  {
    id: "off_35",
    crop: "Maize / Corn (मक्का / ಮೆಕ್ಕೆಜೋಳ)",
    category: "Cereals & Grains",
    scientificName: "Zea mays",
    cropNames: { en: "Maize / Corn", hi: "मक्का", kn: "ಮೆಕ್ಕೆಜೋಳ", te: "మొక్కజొన్న", ta: "மக்காச்சோளம்", mr: "मका", pa: "ਮੱਕੀ", bn: "ভুট্টা", gu: "મકાઈ", ml: "ചോളം" },
    diseaseName: "Fall Armyworm & Turcicum Leaf Blight",
    diseaseNameLocal: {
      hi: "मक्के का फॉल आर्मीवर्म व तुर्सिकम झुलसा",
      kn: "ಮೆಕ್ಕೆಜೋಳದ ಸೈನಿಕ ಹುಳು (ಆರ್ಮಿವರ್ಮ್) ಮತ್ತು ಎಲೆ ಅಂಗಮಾರಿ",
      te: "మొక్కజొన్న కత్తెర పురుగు & తుర్సికం తెగులు",
      ta: "மக்காச்சோள படைப்புழு & இலைக்கருகல்",
      mr: "मक्यावरील लष्करी अळी व करपा",
      pa: "ਮੱਕੀ ਦਾ ਫਾਲ ਆਰਮੀਵਰਮ",
      bn: "ভুট্টার ফল আর্মিওয়ার্ম ও ব্লাইট",
      gu: "મકાઈની લશ્કરી ઈયળ",
      ml: "ചോളം പട്ടാളപ്പുഴു"
    },
    severity: "High",
    symptoms: [
      "Shot holes and ragged jagged leaf margins in whorls filled with granular saw-dust frass",
      "Large elongated spindle-shaped tan lesions on leaf blades",
      "Caterpillars bore directly into developing cobs destroying kernels"
    ],
    organicCure: "Apply dry sand + wood ash mixture (9:1) into whorls. Spray Bacillus thuringiensis (Bt) @ 2g/L or Metarhizium @ 5g/L.",
    chemicalCure: "Spray Chlorantraniliprole 18.5% SC (Coragen) @ 0.4ml/L or Spinetoram 11.7% SC @ 0.5ml/L aimed directly into central whorls.",
    fertilizer: "Apply Zinc Sulphate (10 kg/acre) along with split doses of Urea and Potash."
  },

  // 32. CITRUS / LEMON
  {
    id: "off_36",
    crop: "Citrus / Lemon (नींबू / ಲಿಂಬೆ)",
    category: "Fruits & Plantation",
    scientificName: "Citrus limon / aurantifolia",
    cropNames: { en: "Citrus / Lemon", hi: "नींबू / संतरा", kn: "ಲಿಂಬೆ / ಕಿತ್ತಳೆ", te: "నిమ్మ / బత్తాయి", ta: "எலுமிச்சை / நாரத்தை", mr: "लिंबू / संत्री", pa: "ਨਿੰਬੂ / ਸੰਤਰਾ", bn: "লেবু", gu: "લીંબુ / સંતરા", ml: "നാരകം" },
    diseaseName: "Citrus Canker & Greening (HLB)",
    diseaseNameLocal: {
      hi: "नींबू का कैंकर व सिट्रस ग्रीनिंग",
      kn: "ಲಿಂಬೆ ಕ್ಯಾಂಕರ್ ಮತ್ತು ಗ್ರೀನಿಂಗ್ ರೋಗ",
      te: "నిమ్మ గజ్జి తెగులు (క్యాంకర్) & గ్రీనింగ్",
      ta: "எலுமிச்சை திட்டு நோய் (கேங்கர்)",
      mr: "लिंबावरील खैऱ्या (कँकर) व ग्रिनिंग",
      pa: "ਨਿੰਬੂ ਦਾ ਕੈਂਕਰ ਰੋਗ",
      bn: "লেবুর ক্যাঙ্কার রোগ",
      gu: "લીંબુનો કેન્કર રોગ",
      ml: "നാരകം കായ്‌ക്കറുപ്പ് (കാൻകർ)"
    },
    severity: "High",
    symptoms: [
      "Raised corky crater-like scabby spots with oily yellow halo on leaves and twigs",
      "Fruits develop rough brownish raised lesions reducing fresh market grade",
      "Yellow shoot mottling and lopsided bitter fruits caused by psyllid vector"
    ],
    organicCure: "Prune infected twigs before monsoon and spray 1% Bordeaux mixture or Neem oil (5ml/L).",
    chemicalCure: "Spray Streptocycline @ 1g in 10L water + Copper Oxychloride 50% WP @ 30g in 10L water.",
    fertilizer: "Apply Zinc Sulphate (0.5%) + Ferrous Sulphate (0.2%) foliar spray to prevent chlorosis."
  },

  // 33. CUMIN & CORIANDER
  {
    id: "off_37",
    crop: "Cumin & Coriander (जीरा व धनिया / ಜೀರಿಗೆ ಮತ್ತು ಕೊತ್ತಂಬರಿ)",
    category: "Cash & Spices",
    scientificName: "Cuminum cyminum / Coriandrum sativum",
    cropNames: { en: "Cumin & Coriander", hi: "जीरा और धनिया", kn: "ಜೀರಿಗೆ ಮತ್ತು ಕೊತ್ತಂಬರಿ", te: "జీలకర్ర & ధనియాలు", ta: "சீரகம் & கொத்தமல்லி", mr: "जिरे आणि धने", pa: "ਜੀਰਾ ਅਤੇ ਧਨੀਆ", bn: "জিরা ও ধনে", gu: "જીરું અને ધાણા", ml: "ജീരകവും മല്ലിയും" },
    diseaseName: "Powdery Mildew & Fusarium Wilt",
    diseaseNameLocal: {
      hi: "जीरे का छाछिया (चूर्णिल आसिता) व उकठा",
      kn: "ಜೀರಿಗೆ ಬೂದಿ ರೋಗ ಮತ್ತು ಸೊರಗು ರೋಗ",
      te: "జీలకర్ర బూడిద తెగులు & ఎండు తెగులు",
      ta: "சீரகம் சாம்பல் நோய் & வாடல் நோய்",
      mr: "जिऱ्यावरील भुरी व मर रोग",
      pa: "ਜੀਰੇ ਦਾ ਚਿੱਟਾ ਉੱਲੀ ਰੋਗ",
      bn: "জিরার পাউডারি মিলডিউ",
      gu: "જીરુંનો છારો અને સુકારો",
      ml: "ജീരകം ചാരപ്പൂപ്പ്"
    },
    severity: "High",
    symptoms: [
      "White flour-like powdery coating rapidly covers foliage, stems, and flowering umbels",
      "Umbels dry up without setting seeds or producing light shrivelled black grains",
      "Drooping and yellowing of foliage from tip downwards due to vascular wilt"
    ],
    organicCure: "Dust Sulphur 300 mesh powder @ 10 kg/acre in early morning dew or spray Ampelomyces quisqualis.",
    chemicalCure: "Spray Wettable Sulphur 80% WP @ 2.5g/L or Hexaconazole 5% EC @ 1ml/L at flowering onset.",
    fertilizer: "Avoid excessive irrigation during seed development; apply balanced Potash."
  },

  // 34. WATERMELON & MUSKMELON
  {
    id: "off_38",
    crop: "Watermelon (तरबूज / ಕಲ್ಲಂಗಡಿ)",
    category: "Fruits & Plantation",
    scientificName: "Citrullus lanatus",
    cropNames: { en: "Watermelon", hi: "तरबूज व खरबूजा", kn: "ಕಲ್ಲಂಗಡಿ ಮತ್ತು ಕರಬೂಜ", te: "పుచ్చకాయ & దోసకాయ", ta: "தர்பூசணி", mr: "कलिंगड व खरबूज", pa: "ਤਰਬੂਜ਼", bn: "তরমুজ", gu: "તરબૂચ", ml: "തണ്ണിമത്തൻ" },
    diseaseName: "Gummy Stem Blight & Downy Mildew",
    diseaseNameLocal: {
      hi: "तने का गोंदिया रोग व डाउनी मिल्ड्यू",
      kn: "ಕಲ್ಲಂಗಡಿ ಗಮ್ಮಿ ಕಾಂಡ ಕೊಳೆ ಮತ್ತು ಡೌನಿ ಮಿಲ್ಡ್ಯೂ",
      te: "పుచ్చకాయ జిగురు తెగులు",
      ta: "தர்பூசணி தண்டு பிசின் நோய்",
      mr: "कलिंगडावरील डिंक्या रोग",
      pa: "ਤਰਬੂਜ਼ ਗੂੰਦ ਰੋਗ",
      bn: "তরমুজের আঠা ঝরা রোগ",
      gu: "તરબૂચનો ગુંદરિયો રોગ",
      ml: "തണ്ണിമത്തൻ തണ്ട് ചീയൽ"
    },
    severity: "High",
    symptoms: [
      "Brownish-black water-soaked lesions on stem nodes exuding amber gummy resin",
      "Angular yellow spots on leaves turning brown with greasy margins",
      "Vines collapse and fruits develop soft sunken rotting depressions"
    ],
    organicCure: "Spray Trichoderma viride @ 5g/L. Keep melon fruits on dry straw mulch away from wet soil.",
    chemicalCure: "Spray Difenoconazole 25% EC @ 1ml/L or Azoxystrobin 23% SC @ 1ml/L with a sticker agent.",
    fertilizer: "Apply 13-0-45 Potassium Nitrate (5g/L) + Boron (1g/L) for sweetness and rind thickness."
  }
];
