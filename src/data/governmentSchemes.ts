import { GovtScheme } from "../types";

export const GOVERNMENT_SCHEMES: GovtScheme[] = [
  // 1. DIRECT BENEFIT TRANSFER & INCOME SUPPORT
  {
    id: "sch_01",
    title: "PM-Kisan Samman Nidhi (PM-KISAN)",
    titleLocal: {
      en: "PM-Kisan Samman Nidhi",
      hi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ",
      mr: "पीएम-किसान सन्मान निधी",
      te: "పిఎం-కిసాన్ సమ్మాన్ నిధి",
      ta: "பிரதமர் கிசான் சம்மான் நிதி",
      bn: "পিএম-কিষাণ সম্মান নিধি",
      gu: "પીએમ-કિસાન સન્માન નિધિ",
      kn: "ಪಿಎಂ-ಕಿಸಾನ್ ಸಮ್ಮಾನ್ ನಿಧಿ",
    },
    category: "Direct Benefit Transfer",
    objective: "Guaranteed income support of ₹6,000 per year directly transferred into the bank accounts of all landholding farmer families in 3 equal four-monthly installments of ₹2,000 each.",
    benefits: "Direct bank transfer (DBT) of ₹6,000 annually (₹2,000 every 4 months) to meet farm input costs, seeds, fertilizers, and household farming expenses.",
    eligibility: [
      "All landholding farmer families with cultivable land registered in state revenue records.",
      "Aadhaar linked, DBT-enabled active savings bank account.",
      "e-KYC verification completed via OTP or biometric face authentication.",
      "Excludes institutional landholders, income tax payers, serving/retired government employees, and doctors/engineers/CAs."
    ],
    documents: [
      "Aadhaar Card (Linked with active mobile number)",
      "Land Record Documents (Khatauni / Khasra / RoR / 7-12 extract)",
      "Bank Account Passbook (Aadhaar Seeded)",
      "e-KYC Biometric / OTP Confirmation"
    ],
    applyLink: "https://pmkisan.gov.in/",
    state: "All India",
    helplinePhone: "155261 / 011-24300606",
    subsidyPercentage: "100% Direct Cash Transfer (₹6,000/year)",
    targetBeneficiaries: "All Landholding Farmer Families in India"
  },

  // 2. CROP INSURANCE
  {
    id: "sch_02",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    titleLocal: {
      en: "PM Fasal Bima Yojana (Crop Insurance)",
      hi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫਸਲ ਬੀਮਾ ਯੋਜਨਾ",
      mr: "पंतप्रधान पीक विमा योजना",
      te: "ప్రధాన మంత్రి ఫసల్ బీమా యోజన",
      ta: "பிரதமர் பயிர் காப்பீட்டுத் திட்டம்",
      bn: "প্রধানমন্ত্রী ফসল বীমা যোজনা",
      gu: "પ્રધાનમંત્રી ફસલ બીમા યોજના",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ",
    },
    category: "Insurance",
    objective: "Comprehensive crop loss protection against non-preventable natural risks (drought, dry spells, flood, pest & disease attacks, hailstorm, cyclone, unseasonal rain).",
    benefits: "Extremely low farmer premium: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for annual commercial/horticultural crops. The entire remaining premium is subsidized by Central and State Governments. Full claim compensation paid directly to farmer accounts.",
    eligibility: [
      "All farmers growing notified crops in notified insurance unit areas (loanee and non-loanee farmers).",
      "Sharecroppers and tenant farmers with valid land tenancy/possession certificates.",
      "Must enroll prior to seasonal cut-off date (July 31 for Kharif, Dec 31 for Rabi)."
    ],
    documents: [
      "Land Record Certificate (Khatauni / Khasra / Patta / Rent agreement)",
      "Crop Sowing Certificate issued by Patwari / Village Agriculture Extension Worker",
      "Bank Passbook with clear IFSC code",
      "Aadhaar Card"
    ],
    applyLink: "https://pmfby.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551 / 14447",
    subsidyPercentage: "Up to 90% Government Premium Subsidy",
    targetBeneficiaries: "All Food Grain, Oilseed & Commercial Crop Growers"
  },

  // 3. CREDIT & LOW-INTEREST LOAN
  {
    id: "sch_03",
    title: "Kisan Credit Card (KCC) Scheme",
    titleLocal: {
      en: "Kisan Credit Card (KCC)",
      hi: "किसान क्रेडिट कार्ड योजना (KCC 4% ब्याज दर)",
      pa: "ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ ਯੋਜਨਾ",
      mr: "किसान क्रेडिट कार्ड योजना",
      te: "కిసాన్ క్రెడిಟ್ కార్డ్ పథకం",
      ta: "கிசான் கிரெடிட் கார்டு திட்டம்",
      bn: "কিষাণ ক্রেডিট কার্ড স্কিম",
      gu: "કિસાન ક્રેડિટ કાર્ડ યોજના",
      kn: "ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್ ಯೋಜನೆ",
    },
    category: "Credit & Loan",
    objective: "Timely and hassle-free institutional bank credit for cultivation expenses, post-harvest needs, consumption requirements, and maintenance of farm assets at subsidized interest rates.",
    benefits: "Loans up to ₹3 Lakh at an effective subsidized interest rate of just 4% p.a. (Normal 7% with 3% prompt repayment incentive). Collateral-free limit increased to ₹1.60 Lakh. Extended to Animal Husbandry, Dairy, and Fisheries farmers up to ₹2 Lakh.",
    eligibility: [
      "All owner cultivators, tenant farmers, oral lessees, and sharecroppers.",
      "Self Help Groups (SHGs) and Joint Liability Groups (JLGs) of farmers.",
      "Dairy farmers and fish farmers (inland & marine).",
      "Age: 18 to 75 years."
    ],
    documents: [
      "One-page simplified KCC Application Form",
      "Aadhaar Card and PAN Card (or Form 60)",
      "Land Record / Cultivation Proof from Revenue Officer",
      "Declaration of existing crop loans and no-dues certificate (waived up to ₹1.6L)"
    ],
    applyLink: "https://www.pmkisan.gov.in/KCC.aspx",
    state: "All India",
    helplinePhone: "1800-115-526 / 1800-180-1111",
    subsidyPercentage: "3% Interest Subvention (Effective 4% Interest)",
    targetBeneficiaries: "All Cultivators, Dairy, Poultry & Fishery Farmers"
  },

  // 4. SOIL TESTING & NUTRIENT MANAGEMENT
  {
    id: "sch_04",
    title: "Soil Health Card Scheme (SHC)",
    titleLocal: {
      en: "Soil Health Card Scheme",
      hi: "मृदा स्वास्थ्य कार्ड योजना (SHC)",
      pa: "ਮਿੱਟੀ ਸਿਹਤ ਕਾਰਡ ਸਕੀਮ",
      mr: "मृदा आरोग्य पत्र योजना",
      te: "నేల ఆరోగ్య కార్డ్ పథకం",
      ta: "மண் வள அட்டைத் திட்டம்",
      bn: "মাটি স্বাস্থ্য কার্ড প্রকল্প",
      gu: "જમીન સ્વાસ્થ્ય કાર્ડ યોજના",
      kn: "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ",
    },
    category: "Soil & Fertilizer",
    objective: "Issue customized soil nutrient cards every 2 years indicating the status of 12 critical nutrients (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) and crop-wise fertilizer dosage recommendations.",
    benefits: "Reduces fertilizer wastage by 20% to 30%, prevents soil degradation, and increases crop yields by 10% to 15% through precision fertilizer application.",
    eligibility: [
      "All farmers holding agricultural land across India.",
      "Free soil sampling and lab testing conducted by State Agriculture Departments."
    ],
    documents: [
      "Khasra / Survey Number of the field",
      "Aadhaar / Farmer ID",
      "Active Mobile Number"
    ],
    applyLink: "https://soilhealth.dac.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "100% Free Soil Testing & Diagnostic Report",
    targetBeneficiaries: "All Landholding Farmers across India"
  },

  // 5. SOLAR PUMP SUBSIDY (PM-KUSUM)
  {
    id: "sch_05",
    title: "PM-KUSUM (Solar Agriculture Pump Subsidy Scheme)",
    titleLocal: {
      en: "PM-KUSUM (Solar Agricultural Pumps)",
      hi: "पीएम कुसुम योजना (सोलर कृषि पंप 90% तक सब्सिडी)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕੁਸੁਮ ਯੋਜਨਾ (ਸੋਲਰ ਪੰਪ)",
      mr: "पीएम कुसुम योजना (सौर कृषी पंप)",
      te: "పిఎం కుసుమ్ సోలార్ పంప్ పథకం",
      ta: "பிரதமர் குசும் சூரிய ஒளி பம்பு திட்டம்",
      bn: "পিএম কুসুম সৌর কৃষি পাম্প প্রকল্প",
      gu: "પીએમ કુસુમ સોલાર પંપ યોજના",
      kn: "ಪಿಎಂ ಕುಸುಮ್ ಸೌರ ಪಂಪ್ ಯೋಜನೆ",
    },
    category: "Solar & Irrigation",
    objective: "Provide solar powered irrigation pumps to replace costly diesel engines and solarize existing grid-connected agriculture pumps, allowing farmers to sell surplus solar energy to DISCOMs.",
    benefits: "Up to 90% total subsidy: Central Government gives 30-50%, State Government provides 30%, and bank loans finance 30%. The farmer pays only 10% upfront. Eliminates diesel expenses and provides secondary revenue from selling excess green power.",
    eligibility: [
      "Individual farmers, water user associations, cooperatives, and FPOs.",
      "Farmers in off-grid or diesel-dependent agricultural zones.",
      "Land adequate for solar panel installation near borewell/well."
    ],
    documents: [
      "Aadhaar Card and Land ownership documents (7-12 / Khasra)",
      "Bank Account details",
      "Borewell / Open Well / Water Source NOC and depth certificate",
      "Electricity Bill (if applying for grid solarization Component-C)"
    ],
    applyLink: "https://pmkusum.mnre.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-3333",
    subsidyPercentage: "60% to 90% Government Subsidy",
    targetBeneficiaries: "Off-Grid & Grid-Connected Agricultural Pump Owners"
  },

  // 6. MICRO IRRIGATION (PMKSY)
  {
    id: "sch_06",
    title: "PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)",
    titleLocal: {
      en: "PM Krishi Sinchayee Yojana (Drip & Sprinkler)",
      hi: "प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप और स्प्रिंकलर 55-80% सब्सिडी)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕ੍ਰਿਸ਼ੀ ਸਿੰਚਾਈ ਯੋਜਨਾ",
      mr: "पंतप्रधान कृषी सिंचन योजना",
      te: "పిఎం కృష్ణా సిインチాయీ యోజన",
      ta: "பிரதமர் வேளாண் பாசனத் திட்டம்",
      bn: "প্রধানমন্ত্রী কৃষি সেচ যোজনা",
      gu: "પ્રધાનમંત્રી કૃષિ સિંચાઈ યોજના",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚಾಯಿ ಯೋಜನೆ",
    },
    category: "Solar & Irrigation",
    objective: "Promote micro-irrigation systems (Drip and Sprinkler irrigation) to improve water use efficiency, save underground water, and enhance crop yield through fertigation.",
    benefits: "55% subsidy for Small & Marginal farmers (up to 70-80% in specific states), and 45% subsidy for other farmers. Saves 40% to 60% water, reduces fertilizer cost by 30%, and increases yield up to 45%.",
    eligibility: [
      "All farmers possessing cultivable land and guaranteed water source (borewell, tube-well, farm pond).",
      "Priority to water-stressed, drought-prone, and rainfed areas."
    ],
    documents: [
      "Land Record Certificate (Khatauni / Khasra)",
      "Proof of Water Source and Electricity Connection",
      "Bank Account Details with Aadhaar Link",
      "Passport Photographs"
    ],
    applyLink: "https://pmksy.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "55% to 80% Subsidy on Irrigation Equipment",
    targetBeneficiaries: "All Farmers with Irrigation Facilities"
  },

  // 7. FARM MECHANIZATION & TRACTORS (SMAM)
  {
    id: "sch_07",
    title: "Sub-Mission on Agricultural Mechanization (SMAM)",
    titleLocal: {
      en: "Agricultural Mechanization (SMAM - Farm Equipment)",
      hi: "कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर, रोटावेटर व मशीनरी 50-80% सब्सिडी)",
      pa: "ਖੇਤੀ ਮਸ਼ੀਨਰੀ ਸਬਸਿਡੀ ਯੋਜਨਾ",
      mr: "कृषी यांत्रिकीकरण उप-अभियान",
      te: "వ్యవసాయ యాంత్రీకరణ సబ్-మిషన్",
      ta: "வேளாண் இயந்திரமயமாக்கல் திட்டம்",
      bn: "কৃষি যান্ত্রিকীকরণ সাব-মিশন",
      gu: "કૃષિ યાંત્રીકીકરણ સબ-મિશન",
      kn: "ಕೃಷಿ ಯಾಂತ್ರೀಕರಣ ಉಪ-ಮಿಷನ್",
    },
    category: "Machinery & Subsidies",
    objective: "Subsidize modern farm equipment such as tractors, laser land levelers, rotavators, power tillers, happy seeders, drone sprayers, and establish Custom Hiring Centers (CHCs) for small farmers.",
    benefits: "40% to 50% subsidy on purchase of individual agricultural machines, 50% to 80% for Women and SC/ST farmers. Up to 80% financial assistance (max ₹10-15 Lakh) for establishing Custom Hiring Centers.",
    eligibility: [
      "Small, marginal, SC/ST, and women farmers given top priority.",
      "Farmers with valid land records who have not availed machinery subsidy in previous 3-5 years.",
      "Rural youth and FPOs eligible for CHC grants."
    ],
    documents: [
      "Aadhaar Card and Caste Certificate (if SC/ST)",
      "Land Records (7-12 / Khatauni / Khasra)",
      "Bank Passbook copy and Quotation from authorized machinery dealer",
      "Tractor Registration Certificate (RC) for tractor-driven implements"
    ],
    applyLink: "https://agrimachinery.nic.in/",
    state: "All India",
    helplinePhone: "1800-180-1551 / 011-23381012",
    subsidyPercentage: "40% to 80% Subsidy on Machinery & Drones",
    targetBeneficiaries: "Small, Marginal, Women Farmers & Rural Youth"
  },

  // 8. FARMER PENSION SCHEME (PM-KMY)
  {
    id: "sch_08",
    title: "Pradhan Mantri Kisan Maan-Dhan Yojana (PM-KMY)",
    titleLocal: {
      en: "PM Kisan Maan-Dhan Yojana (Farmer Pension)",
      hi: "प्रधानमंत्री किसान मान-धन योजना (₹3,000 मासिक पेंशन)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਮਾਨ-ਧਨ ਯੋਜਨਾ (ਪੈਨਸ਼ਨ)",
      mr: "पंतप्रधान किसान मान-धन योजना (पेन्शन)",
      te: "ప్రధాన మంత్రి కిసాన్ మాన్-ధన్ పెన్షన్",
      ta: "பிரதமர் கிசான் மான்-தன் ஓய்வூதியம்",
      bn: "প্রধানমন্ত্রী কিষাণ মান-ধন পেনশন",
      gu: "પીએમ કિસાન માન-ધન યોજના (પેન્શન)",
      kn: "ಪಿಎಂ ಕಿಸಾನ್ ಮಾನ್-ಧನ್ ಪಿಂಚಣಿ ಯೋಜನೆ",
    },
    category: "Social Security & Pension",
    objective: "Old age social security and pension scheme for small and marginal farmers to ensure a dignified livelihood after 60 years of age.",
    benefits: "Assured monthly pension of ₹3,000 per month upon attaining 60 years. 50% contribution paid by the farmer (₹55 to ₹200/month based on entry age) and equal 50% matched contribution paid by Central Government. Can be auto-debited directly from PM-KISAN payouts.",
    eligibility: [
      "Small and marginal farmers owning cultivable land up to 2 hectares.",
      "Entry age between 18 and 40 years.",
      "Not covered under EPFO, NPS, ESIC, or other statutory social security schemes."
    ],
    documents: [
      "Aadhaar Card",
      "Savings Bank Account Passbook (IFSC & Account Number)",
      "Land Ownership Document (Khasra / Khatauni)"
    ],
    applyLink: "https://maandhan.in/",
    state: "All India",
    helplinePhone: "1800-267-6888",
    subsidyPercentage: "50% Matching Contribution by Central Govt",
    targetBeneficiaries: "Small & Marginal Farmers Aged 18 to 40"
  },

  // 9. ORGANIC FARMING (PKVY)
  {
    id: "sch_09",
    title: "Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)",
    titleLocal: {
      en: "Paramparagat Krishi Vikas Yojana (PKVY)",
      hi: "परम्परागत कृषि विकास योजना (जैविक खेती ₹50,000/हेक्टेयर अनुदान)",
      pa: "ਪਰੰਪਰਾਗਤ ਕ੍ਰਿਸ਼ੀ ਵਿਕਾਸ ਯੋਜਨਾ",
      mr: "परंपरागत कृषी विकास योजना (सेंद्रिय शेती)",
      te: "పరంపరాగత్ కృషి వికాస్ యోజన",
      ta: "பாரம்பரிய வேளாண் வளர்ச்சித் திட்டம்",
      bn: "পরম্পরাগত কৃষি বিকাশ যোজনা",
      gu: "પરંપરાગત કૃષિ વિકાસ યોજના (ઓર્ગેનિક)",
      kn: "ಪರಂಪರಾಗತ ಕೃಷಿ ವಿಕಾಸ ಯೋಜನೆ",
    },
    category: "Organic & Natural Farming",
    objective: "Promote organic farming through cluster approach and Participatory Guarantee System (PGS) certification, eliminating chemical synthetic fertilizers and pesticides.",
    benefits: "Financial assistance of ₹50,000 per hectare for 3 years: ₹31,000/ha provided directly to farmers via DBT for organic seeds, bio-fertilizers, vermicompost, and biopesticides; remainder covers PGS organic certification and market branding.",
    eligibility: [
      "Farmers willing to form clusters of 20 or more farmers covering a minimum of 20 hectares (or 50 acres).",
      "Individual farmers adopting certified organic farming standards."
    ],
    documents: [
      "Aadhaar Card",
      "Land Record Revenue Certificate",
      "Bank Account details",
      "Cluster Membership Undertaking"
    ],
    applyLink: "https://pgsindia-ncof.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "₹50,000 per Hectare for 3-Year Transition",
    targetBeneficiaries: "Farmers Adopting Chemical-Free Organic Farming"
  },

  // 10. NATURAL FARMING (BPKP)
  {
    id: "sch_10",
    title: "Bharatiya Prakritik Krishi Paddhati (BPKP - Zero Budget Natural Farming)",
    titleLocal: {
      en: "Natural Farming Mission (BPKP)",
      hi: "भारतीय प्राकृतिक कृषि पद्धति (गाय आधारित प्राकृतिक खेती)",
      pa: "ਕੁਦਰਤੀ ਖੇਤੀ ਮਿਸ਼ਨ",
      mr: "भारतीय नैसर्गिक कृषी पद्धती",
      te: "భారతీయ సహజ వ్యవసాయ పద్ధతి",
      ta: "பாரம்பரிய இயற்கை விவசாய திட்டம்",
      bn: "ভারতীয় প্রাকৃতিক কৃষি পদ্ধতি",
      gu: "ભારતીય પ્રાકૃતિક કૃષિ પદ્ધતિ",
      kn: "ಭಾರತೀಯ ಪ್ರಾಕೃತಿಕ ಕೃಷಿ ಪದ್ಧತಿ",
    },
    category: "Organic & Natural Farming",
    objective: "Promote traditional indigenous natural farming based on on-farm biomass recycling, indigenous cow dung-urine formulations (Jeevamrit, Beejamrit, Ghanjeevamrit), and continuous soil cover.",
    benefits: "Financial grant of ₹12,200 per hectare for 3 years for cluster formation, farmer field schools, indigenous formulation preparation units, residue testing, and certification.",
    eligibility: [
      "All farmers practicing or transitioning to zero-budget natural farming.",
      "Ownership of indigenous cattle (desi cow) encouraged."
    ],
    documents: [
      "Farmer ID / Aadhaar Card",
      "Land Revenue Records",
      "Bank Account Passbook"
    ],
    applyLink: "https://naturalfarming.dac.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "₹12,200/Hectare Assistance & Training",
    targetBeneficiaries: "Natural & Indigenous Farming Practitioners"
  },

  // 11. AGRICULTURE INFRASTRUCTURE FUND (AIF)
  {
    id: "sch_11",
    title: "Agriculture Infrastructure Fund (AIF)",
    titleLocal: {
      en: "Agriculture Infrastructure Fund (AIF)",
      hi: "कृषि अवसंरचना कोष (AIF - गोदाम, कोल्ड स्टोरेज 3% ब्याज छूट)",
      pa: "ਖੇਤੀਬਾੜੀ ਬੁਨਿਆਦੀ ਢਾਂਚਾ ਫੰਡ",
      mr: "कृषी पायाभूत सुविधा निधी",
      te: "వ్యవసాయ మౌలిక సదుపాయాల నిధి",
      ta: "வேளாண் உள்கட்டமைப்பு நிதி",
      bn: "কৃষি পরিকাঠামো তহবিল",
      gu: "કૃષિ ઈન્ફ્રાસ્ટ્રક્ચર ફંડ",
      kn: "ಕೃಷಿ ಮೂಲಸೌಕರ್ಯ ನಿಧಿ",
    },
    category: "Infrastructure",
    objective: "Medium to long term debt financing facility of ₹1 Lakh Crore for creating post-harvest management infrastructure and community farming assets to prevent distress selling.",
    benefits: "Interest subvention of 3% per annum for loans up to ₹2 Crore for a maximum duration of 7 years. Credit guarantee coverage under CGTMSE scheme for loans up to ₹2 Crore without extra fee.",
    eligibility: [
      "Farmers, Primary Agricultural Credit Societies (PACS), FPOs, Agri-entrepreneurs, and Startups.",
      "Projects for setting up warehouses, cold storages, silos, pack-houses, sorting & grading units, e-trading platforms."
    ],
    documents: [
      "Detailed Project Report (DPR)",
      "Land Ownership / Long-term Lease Agreement",
      "KYC (Aadhaar, PAN, Bank Statements)",
      "Statutory permissions & building layout plans"
    ],
    applyLink: "https://agriinfra.dac.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551 / 011-23381012",
    subsidyPercentage: "3% Interest Subvention + Full Credit Guarantee",
    targetBeneficiaries: "FPOs, PACS, Agri-Entrepreneurs, Warehouse Builders"
  },

  // 12. ELECTRONIC NATIONAL AGRI MARKET (e-NAM)
  {
    id: "sch_12",
    title: "National Agriculture Market (e-NAM Portal)",
    titleLocal: {
      en: "National Agriculture Market (e-NAM)",
      hi: "राष्ट्रीय कृषि बाजार (e-NAM - ऑनलाइन पारदर्शी मंडी)",
      pa: "ਰਾਸ਼ਟਰੀ ਖੇਤੀਬਾੜੀ ਮਾਰਕੀਟ (ਈ-ਨੈਮ)",
      mr: "राष्ट्रीय कृषी बाजार (e-NAM)",
      te: "జాతీయ వ్యవసాయ మార్కెట్ (ఈ-నామ్)",
      ta: "தேசிய வேளாண் சந்தை (e-NAM)",
      bn: "জাতীয় কৃষি বাজার (e-NAM)",
      gu: "રાષ્ટ્રીય કૃષિ બજાર (ઈ-નામ)",
      kn: "ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ ಮಾರುಕಟ್ಟೆ (ಇ-ನ್ಯಾಮ್)",
    },
    category: "Infrastructure",
    objective: "Pan-India electronic trading portal networking 1,400+ APMC mandis across 23 States/UTs to create a unified national market for agricultural commodities.",
    benefits: "Direct access to buyers and traders nationwide, eliminating middlemen deductions. Real-time online bidding, transparent electronic weight and assaying, and direct online payment into farmer bank accounts.",
    eligibility: [
      "All farmers bringing agricultural commodities to integrated e-NAM APMC mandis.",
      "No registration fees for farmers."
    ],
    documents: [
      "Aadhaar Card",
      "Bank Account Details (Passbook or cancelled cheque)",
      "APMC Gate Entry Pass"
    ],
    applyLink: "https://www.enam.gov.in/",
    state: "All India",
    helplinePhone: "1800-270-0224",
    subsidyPercentage: "Free Pan-India Trading & Assaying Support",
    targetBeneficiaries: "All Farmers Selling Crops in Mandis"
  },

  // 13. HORTICULTURE & GREENHOUSE (MIDH)
  {
    id: "sch_13",
    title: "Mission for Integrated Development of Horticulture (MIDH)",
    titleLocal: {
      en: "Mission for Horticulture Development (MIDH)",
      hi: "एकीकृत बागवानी विकास मिशन (पॉलीहाउस व बागवानी 50% सब्सिडी)",
      pa: "ਬਾਗਬਾਨੀ ਵਿਕਾਸ ਮਿਸ਼ਨ",
      mr: "एकात्मिक फलोत्पादन विकास अभियान",
      te: "సమగ్ర ఉద్యానవన అభివృద్ధి మిషన్",
      ta: "ஒருங்கிணைந்த தோட்டக்கலை மேம்பாட்டு இயக்கம்",
      bn: "সমন্বিত উদ্যানপালন উন্নয়ন মিশন",
      gu: "બાગાયત વિકાસ મિશન (પોલીહાઉસ)",
      kn: "ಸಮಗ್ರ ತೋಟಗಾರಿಕೆ ಅಭಿವೃದ್ಧಿ ಮಿಷನ್",
    },
    category: "Horticulture & Cold Storage",
    objective: "Holistic growth of the horticulture sector covering fruits, vegetables, root & tuber crops, mushrooms, spices, flowers, aromatic plants, coconut, cashew, and cocoa.",
    benefits: "Capital subsidy of 40% to 50% for establishment of Polyhouses, Shade Net Houses, Commercial Nurseries, Tissue Culture Labs, Drip in orchards, Cold Storage Units, and Reefer Vans.",
    eligibility: [
      "Individual farmers, SHGs, Cooperatives, and Corporate Farming Groups.",
      "Ownership of suitable agricultural land with perennial irrigation source."
    ],
    documents: [
      "Land Ownership Documents (7-12 / Khatauni)",
      "Bank Account Details and Soil/Water Test Report",
      "Quotations / Project Estimate from certified fabricator"
    ],
    applyLink: "https://midh.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "40% to 50% Subsidy on Polyhouses & Orchards",
    targetBeneficiaries: "Fruit, Vegetable, Flower & Polyhouse Growers"
  },

  // 14. FISHERIES & AQUACULTURE (PMMSY)
  {
    id: "sch_14",
    title: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    titleLocal: {
      en: "PM Matsya Sampada Yojana (Fisheries)",
      hi: "प्रधानमंत्री मत्स्य संपदा योजना (मछली पालन 40-60% सब्सिडी)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਮਤਸਿਆ ਸੰਪਦਾ ਯੋਜਨਾ",
      mr: "पंतप्रधान मत्स्य संपदा योजना",
      te: "ప్రధాన మంత్రి మత్స్య సంపద యోజన",
      ta: "பிரதமர் மச்சிய சம்பதா திட்டம்",
      bn: "প্রধানমন্ত্রী মৎস্য সম্পদ যোজনা",
      gu: "પીએમ મત્સ્ય સંપદા યોજના (ફિશરીઝ)",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಮತ್ಸ್ಯ ಸಂಪದ ಯೋಜನೆ",
    },
    category: "Livestock & Fisheries",
    objective: "Harness the potential of fisheries sector, modernize aquaculture, improve post-harvest infrastructure, and double fishers' and fish farmers' incomes.",
    benefits: "Financial assistance: 40% subsidy of project cost for General category, and 60% subsidy for SC, ST, and Women beneficiaries. Covers construction of new ponds, Biofloc systems, RAS units, fish feed plants, boats, and ice boxes.",
    eligibility: [
      "Fishers, Fish Farmers, Fish Workers, SHGs, and Fisher Cooperatives.",
      "Must have ownership or minimum 10-year lease of land/water bodies."
    ],
    documents: [
      "Aadhaar Card and Caste Certificate (if SC/ST)",
      "Land Record / Waterbody Lease Agreement",
      "Detailed Project Cost Estimate / DPR",
      "Bank Account Details"
    ],
    applyLink: "https://pmmsy.dof.gov.in/",
    state: "All India",
    helplinePhone: "1800-425-1660",
    subsidyPercentage: "40% to 60% Government Subsidy",
    targetBeneficiaries: "Fish Farmers, Aquaculture Entrepreneurs, SHGs"
  },

  // 15. LIVESTOCK, DAIRY & POULTRY (NLM)
  {
    id: "sch_15",
    title: "National Livestock Mission (NLM - Poultry, Goat, Sheep & Dairy)",
    titleLocal: {
      en: "National Livestock Mission (NLM)",
      hi: "राष्ट्रीय पशुधन मिशन (बकरी, भेड़ व मुर्गी पालन 50% सब्सिडी)",
      pa: "ਰਾਸ਼ਟਰੀ ਪਸ਼ੂਧਨ ਮਿਸ਼ਨ",
      mr: "राष्ट्रीय पशुधन अभियान",
      te: "జాతీయ పశువుల మిషన్",
      ta: "தேசிய கால்நடை இயக்கம்",
      bn: "জাতীয় পশুসম্পদ মিশন",
      gu: "રાષ્ટ્રીય પશુધન મિશન (ડેરી, બકરી પાલન)",
      kn: "ರಾಷ್ಟ್ರೀಯ ಪಶುಸಂಗೋಪನಾ ಮಿಷನ್",
    },
    category: "Livestock & Fisheries",
    objective: "Promote entrepreneurship in poultry, sheep, goat farming, piggery, and fodder production through capital subsidies and low-cost credit.",
    benefits: "50% capital subsidy directly provided up to ₹50 Lakh for poultry hatcheries, up to ₹50 Lakh for goat/sheep breeding farms, and up to ₹50 Lakh for fodder seed processing infrastructure.",
    eligibility: [
      "Individuals, Farmers, FPOs, Section 8 companies, Cooperatives, and SHGs.",
      "Must have land holding and relevant experience in animal husbandry."
    ],
    documents: [
      "Detailed Project Report (DPR) with Bank Loan sanction letter",
      "Land Ownership / Registered Lease Deed",
      "Aadhaar Card, PAN Card, and Bank statements",
      "Training certificate in animal husbandry"
    ],
    applyLink: "https://nlm.udyamimitra.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "50% Capital Subsidy (Up to ₹50 Lakh)",
    targetBeneficiaries: "Dairy, Poultry, Goat & Sheep Farming Entrepreneurs"
  },

  // 16. INDIGENOUS CATTLE & DAIRY (RGM)
  {
    id: "sch_16",
    title: "Rashtriya Gokul Mission (RGM - Indigenous Cattle)",
    titleLocal: {
      en: "Rashtriya Gokul Mission (RGM)",
      hi: "राष्ट्रीय गोकुल मिशन (देसी गाय नस्ल सुधार व गोकुल ग्राम)",
      pa: "ਰਾਸ਼ਟਰੀ ਗੋਕੁਲ ਮਿਸ਼ਨ",
      mr: "राष्ट्रीय गोकुळ अभियान (देशी गाई)",
      te: "రాష్ట్రీయ గోకుల్ మిషన్",
      ta: "ராஷ்ட்ரிய கோகுல் இயக்கம்",
      bn: "রাষ্ট্রীয় গোকুল মিশন",
      gu: "રાષ્ટ્રીય ગોકુલ મિશન (ગીર/કાંકરેજ ગાય)",
      kn: "ರಾಷ್ಟ್ರೀಯ ಗೋಕುಲ ಮಿಷನ್",
    },
    category: "Livestock & Fisheries",
    objective: "Development and conservation of indigenous bovine breeds (Gir, Sahiwal, Red Sindhi, Kankrej, Ongole) and enhance milk production through sex-sorted semen and IVF technology.",
    benefits: "Subsidies for establishing breed multiplication farms (up to ₹2 Crore or 50% capital subsidy), free artificial insemination at farmer doorsteps, and incentives for high-yielding indigenous cows.",
    eligibility: [
      "Dairy farmers, cattle breeders, dairy cooperatives, and Gaushalas with indigenous cows.",
      "Must maintain minimum 200 indigenous cattle for breed multiplication centers."
    ],
    documents: [
      "Land Ownership Documents",
      "Animal Insemination Records / Registration",
      "Aadhaar Card and Bank Account details"
    ],
    applyLink: "https://dahd.nic.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "50% Subsidy up to ₹2 Crore for Breed Farms",
    targetBeneficiaries: "Dairy Farmers & Indigenous Cattle Breeders"
  },

  // 17. FOOD PROCESSING (PMFME)
  {
    id: "sch_17",
    title: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    titleLocal: {
      en: "Micro Food Processing Scheme (PMFME)",
      hi: "पीएम सूक्ष्म खाद्य प्रसंस्करण उद्यम योजना (35% सब्सिडी)",
      pa: "ਪੀਐੱਮ ਖੁਰਾਕ ਪ੍ਰੋਸੈਸਿੰਗ ਯੋਜਨਾ",
      mr: "पीएम सूक्ष्म अन्न प्रक्रिया उद्योग योजना",
      te: "పిఎం మైక్రో ఫుడ్ ప్రాసెసింగ్ పథకం",
      ta: "பிரதமர் சிறு உணவு பதப்படுத்தும் திட்டம்",
      bn: "প্রধানমন্ত্রী ক্ষুদ্র খাদ্য প্রক্রিয়াকরণ যোজনা",
      gu: "પીએમ સૂક્ષ્મ ખાદ્ય પ્રક્રિયા ઉદ્યોગ યોજના",
      kn: "ಪಿಎಂ ಸೂಕ್ಷ್ಮ ಆಹಾರ ಸಂಸ್ಕರಣಾ ಯೋಜನೆ",
    },
    category: "Infrastructure",
    objective: "Support unorganized micro food processing units (flour mills, spice grinding, mustard oil expellers, mango pulp, pickles, bakery) under 'One District One Product' (ODOP).",
    benefits: "35% credit-linked capital subsidy with a maximum ceiling of ₹10 Lakh per unit. Seed capital assistance of ₹40,000 per SHG member for working capital and small tool purchases.",
    eligibility: [
      "Existing individual micro food processing units and new micro units.",
      "Farmer Producer Organizations (FPOs), SHGs, and Producer Cooperatives."
    ],
    documents: [
      "Aadhaar Card and PAN Card",
      "Bank Account Statements of last 6 months",
      "Electricity Bill of unit premises / Rent agreement",
      "FSSAI Registration Certificate (or application)"
    ],
    applyLink: "https://pmfme.mofpi.gov.in/",
    state: "All India",
    helplinePhone: "1800-111-555 / 011-26492216",
    subsidyPercentage: "35% Capital Subsidy (Up to ₹10 Lakh)",
    targetBeneficiaries: "Agri-Processing Units, Flour Mills, Oil Expellers"
  },

  // 18. FARMER PRODUCER ORGANIZATIONS (FPO)
  {
    id: "sch_18",
    title: "Formation and Promotion of 10,000 FPOs Scheme",
    titleLocal: {
      en: "Farmer Producer Organizations (10,000 FPOs)",
      hi: "10,000 किसान उत्पादक संगठन (FPO) गठन योजना",
      pa: "ਕਿਸਾਨ ਉਤਪਾਦਕ ਸੰਗਠਨ (ਐੱਫਪੀਓ) ਸਕੀਮ",
      mr: "शेतकरी उत्पादक कंपनी योजना (FPO)",
      te: "రైతు ఉత్పత్తిదారుల సంస్థల పథకం (FPO)",
      ta: "விவசாய உற்பத்தியாளர் அமைப்புகள் திட்டம்",
      bn: "কৃষক প্রযোজক সংস্থা (FPO) স্কিম",
      gu: "ખેડૂત ઉત્પાદક સંગઠન (FPO) યોજના",
      kn: "ರೈತ ಉತ್ಪಾದಕ ಸಂಸ್ಥೆಗಳು (ಎಫ್‌ಪಿಒ) ಯೋಜನೆ",
    },
    category: "Infrastructure",
    objective: "Promote cluster-based Farmer Producer Organizations (FPOs) to leverage economies of scale in seed-fertilizer bulk purchases, mechanized harvesting, and direct corporate marketing.",
    benefits: "Matching equity grant of up to ₹2,000 per farmer member (maximum ₹15 Lakh per FPO) and credit guarantee cover up to ₹2 Crore per FPO from NABARD/NCDC. Up to ₹18 Lakh management grant for 3 years.",
    eligibility: [
      "Minimum 300 farmer members in plains and 100 in North East/Hilly areas.",
      "Registered under Companies Act or State Cooperative Societies Act."
    ],
    documents: [
      "FPO Registration Certificate (ROC / Cooperative)",
      "List of Shareholder Farmers with Aadhaar & Landholdings",
      "FPO Bank Account details and PAN"
    ],
    applyLink: "https://www.enam.gov.in/web/fpo",
    state: "All India",
    helplinePhone: "011-26862367",
    subsidyPercentage: "Matching Equity Grant up to ₹15 Lakh",
    targetBeneficiaries: "Farmer Groups & Producer Companies"
  },

  // 19. PRICE ASSURANCE (PM-AASHA)
  {
    id: "sch_19",
    title: "Pradhan Mantri Annadata Aay Sanraksan Abhiyan (PM-AASHA)",
    titleLocal: {
      en: "PM-AASHA (MSP Price Assurance)",
      hi: "पीएम आशा योजना (दाल व तिलहन पर एमएसपी खरीद गारंटी)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਅੰਨਦਾਤਾ ਆਮਦਨ ਸੁਰੱਖਿਆ ਯੋਜਨਾ",
      mr: "पंतप्रधान अन्नदाता उत्पन्न संरक्षण अभियान",
      te: "ప్రధాన మంత్రి అన్నదాత ఆదాయ సంరక్షణ అభియాన్",
      ta: "பிரதமர் அன்னதாதா வருமான பாதுகாப்பு திட்டம்",
      bn: "প্রধানমন্ত্রী অন্নদাতা আয় সংরক্ষণ অভিযান",
      gu: "પીએમ આશા યોજના (ટેકાના ભાવે ખરીદી)",
      kn: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಅನ್ನದಾತ ಆದಾಯ ಸಂರಕ್ಷಣಾ ಅಭಿಯಾನ",
    },
    category: "Direct Benefit Transfer",
    objective: "Ensure remunerative Minimum Support Prices (MSP) for farmers producing pulses, oilseeds, and copra through government procurement and price difference payments.",
    benefits: "Direct physical procurement at MSP through NAFED/FCI under Price Support Scheme (PSS). Direct bank transfer of price deficit difference under Price Deficiency Payment Scheme (PDPS) if market prices fall below MSP.",
    eligibility: [
      "All farmers growing notified pulses (Arhar, Moong, Urad, Gram) and oilseeds (Mustard, Groundnut, Soybean).",
      "Mandatory pre-registration on state procurement portal before harvest."
    ],
    documents: [
      "Farmer Registration Form on State Agri E-Uparjan Portal",
      "Land Record Revenue Paper (Khasra showing crop sown)",
      "Aadhaar Card and Bank Account Details"
    ],
    applyLink: "https://agricoop.nic.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "100% MSP Price Guarantee Support",
    targetBeneficiaries: "Pulses, Oilseeds & Copra Growers"
  },

  // 20. OIL PALM & EDIBLE OILS (NMEO-OP)
  {
    id: "sch_20",
    title: "National Mission on Edible Oils - Oil Palm (NMEO-OP)",
    titleLocal: {
      en: "National Mission on Edible Oils (Oil Palm)",
      hi: "राष्ट्रीय खाद्य तेल मिशन - पाम ऑयल (पौधारोपण सब्सिडी)",
      pa: "ਤੇਲ ਪਾਮ ਮਿਸ਼ਨ",
      mr: "राष्ट्रीय खाद्यतेल अभियान - ऑईल पाम",
      te: "జాతీయ వంట నూనెల మిషన్ - ఆయిల్ పామ్",
      ta: "தேசிய சமையல் எண்ணெய் இயக்கம்",
      bn: "জাতীয় ভোজ্য তেল মিশন",
      gu: "રાષ્ટ્રીય ખાદ્ય તેલ મિશન - ઓઇલ પામ",
      kn: "ರಾಷ್ಟ್ರೀಯ ಖಾದ್ಯ ತೈಲ ಮಿಷನ್",
    },
    category: "Horticulture & Cold Storage",
    objective: "Dramatically expand oil palm cultivation area to reduce foreign imports and ensure self-sufficiency in edible oils.",
    benefits: "Substantial increase in planting material assistance from ₹12,000/ha to ₹29,000/ha. Maintenance and intercropping assistance of ₹5,200/ha per year for 4 years. Viability price mechanism guaranteeing farmers against global market price fluctuations.",
    eligibility: [
      "Farmers in recognized oil palm zones (Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, NE States).",
      "Requires perennial irrigation facility."
    ],
    documents: [
      "Land Revenue Records",
      "Irrigation Source Verification",
      "Aadhaar Card and Bank Passbook"
    ],
    applyLink: "https://nmeo.dac.gov.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "₹29,000/ha Planting + Intercropping Subsidy",
    targetBeneficiaries: "Farmers Adopting Oil Palm Plantations"
  },

  // 21. WOMEN FARMERS (MKSP)
  {
    id: "sch_21",
    title: "Mahila Kisan Sashaktikaran Pariyojana (MKSP)",
    titleLocal: {
      en: "Mahila Kisan Sashaktikaran Pariyojana (MKSP)",
      hi: "महिला किसान सशक्तिकरण परियोजना (महिला किसान संवर्धन)",
      pa: "ਮਹਿਲਾ ਕਿਸਾਨ ਸਸ਼ਕਤੀਕਰਨ ਪ੍ਰੋਜੈਕਟ",
      mr: "महिला शेतकरी सक्षमीकरण योजना",
      te: "మహిళా కిసాన్ సశక్తికరణ్ పరియోజన",
      ta: "மகளிர் விவசாயிகள் அதிகாரமளித்தல் திட்டம்",
      bn: "মহিলা কিষাণ ক্ষমতায়ন প্রকল্প",
      gu: "મહિલા કિસાન સશક્તિકરણ પરિયોજના",
      kn: "ಮಹಿಳಾ ಕಿಸಾನ್ ಸಶಕ್ತೀಕರಣ ಪರಿಯೋಜನೆ",
    },
    category: "Direct Benefit Transfer",
    objective: "Empower women farmers by strengthening their managerial capacity, improving their access to land inputs, extension services, and sustainable agriculture techniques.",
    benefits: "Up to 75% funding by Central Government for women self-help groups, community resource persons (Krishi Sakhis), micro-enterprises, and non-timber forest produce value addition.",
    eligibility: [
      "Small and marginal women cultivators, agricultural laborers, and tribal women.",
      "Members of NRLM Self Help Groups (SHGs)."
    ],
    documents: [
      "Aadhaar Card",
      "SHG Membership Passbook",
      "Bank Account Details"
    ],
    applyLink: "https://aajeevika.gov.in/",
    state: "All India",
    helplinePhone: "011-23386173",
    subsidyPercentage: "Up to 75% Project Grant for Women SHGs",
    targetBeneficiaries: "Rural Women Farmers & SHG Members"
  },

  // 22. BIOGAS & BIO-MANURE (GOBARDHAN)
  {
    id: "sch_22",
    title: "GOBARdhan Scheme (Galvanizing Organic Bio-Agro Resources Dhan)",
    titleLocal: {
      en: "GOBARdhan Scheme (Biogas & Organic Manure)",
      hi: "गोबरधन योजना (बायोगैस व जैविक खाद संयंत्र ₹50 लाख तक अनुदान)",
      pa: "ਗੋਬਰਧਨ ਸਕੀਮ (ਬਾਇਓਗੈਸ)",
      mr: "गोबरधन योजना (बायोगॅस प्रकल्प)",
      te: "గోబర్ధన్ బయోగ్యాస్ పథకం",
      ta: "கோபர்தன் பயோ-காஸ் திட்டம்",
      bn: "গোবর্ধন স্কিম (বায়োগ্যাস)",
      gu: "ગોબરધન યોજના (બાયોગેસ પ્લાન્ટ)",
      kn: "ಗೋಬರ್ಧನ್ ಬಯೋ-ಗ್ಯಾಸ್ ಯೋಜನೆ",
    },
    category: "Organic & Natural Farming",
    objective: "Convert cattle dung, agricultural crop residue, and organic waste into clean cooking biogas, compressed biogas (CBG), and high-grade organic bio-slurry fertilizer.",
    benefits: "Financial assistance up to ₹50 Lakh per district for community biogas plants. Provides free cooking gas, high-value organic bio-manure to replace synthetic urea, and additional rural income.",
    eligibility: [
      "Gram Panchayats, Farmer Cooperatives, FPOs, Dairy Unions, and Private Entrepreneurs.",
      "Areas with high cattle population density."
    ],
    documents: [
      "Gram Panchayat Resolution / Land Allotment",
      "Cattle Population Survey Certificate",
      "DPR & Bank Account Details"
    ],
    applyLink: "https://gobardhan.co.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "Up to ₹50 Lakh Grant per Community Unit",
    targetBeneficiaries: "Gram Panchayats, FPOs & Dairy Farmers"
  },

  // 23. HIGH-YIELD RAINFED DISTRICTS (PM DHAN DHAANYA)
  {
    id: "sch_23",
    title: "PM Dhan Dhaanya Krishi Yojana (High-Yield Rainfed Districts)",
    titleLocal: {
      en: "PM Dhan Dhaanya Krishi Yojana",
      hi: "पीएम धनधान्य कृषि योजना (कम उत्पादकता वाले जिलों में विकास)",
      pa: "ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਧਨ ਧਾਨਿਆ ਖੇਤੀ ਸਕੀਮ",
      mr: "पीएम धन धान्य कृषी योजना",
      te: "పిఎం ధన ధాన్య వ్యవసాయ పథకం",
      ta: "பிரதமர் தன் தான்ய வேளாண் திட்டம்",
      bn: "প্রধানমন্ত্রী ধন ধান্য কৃষি যোজনা",
      gu: "પીએમ ધન ધાન્ય કૃષિ યોજના",
      kn: "ಪಿಎಂ ಧನ ಧಾನ್ಯ ಕೃಷಿ ಯೋಜನೆ",
    },
    category: "State Schemes",
    objective: "₹24,000 Crore special initiative targeting low-productivity, rainfed agricultural districts to boost irrigation, credit access, and seed adoption.",
    benefits: "Special grants for pond deepening, check dams, custom hiring centers, certified seed distribution, and soil enrichment to bridge productivity gaps.",
    eligibility: [
      "Farmers residing in identified 100+ low-yield rainfed districts across India."
    ],
    documents: [
      "Aadhaar Card",
      "District Resident Certificate",
      "Land Record Details"
    ],
    applyLink: "https://agricoop.nic.in/",
    state: "All India (Special Focus Districts)",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "100% Funded Central Sector Infrastructure",
    targetBeneficiaries: "Farmers in Rainfed & Aspirational Districts"
  },

  // 24. PULSES & SEED MINIKITS MISSION
  {
    id: "sch_24",
    title: "Mission for Aatmanirbharta in Pulses & Certified Seed Minikits",
    titleLocal: {
      en: "Mission for Aatmanirbharta in Pulses",
      hi: "दलहन आत्मनिर्भरता मिशन व मुफ्त बीज मिनीकिट वितरण",
      pa: "ਦਾਲਾਂ ਦੀ ਸਵੈ-ਨਿਰਭਰਤਾ ਮਿਸ਼ਨ",
      mr: "डाळी आत्मनिर्भरता अभियान व मोफत बियाणे",
      te: "పప్పుధాన్యాల స్వయం సమృద్ధి మిషన్",
      ta: "பருப்பு வகைகள் தற்சார்பு திட்டம்",
      bn: "ডাল স্বনির্ভরতা মিশন",
      gu: "કઠોળ આત્મનિર્ભરતા મિશન (મફત બિયારણ)",
      kn: "ಬೇಳೆಕಾಳುಗಳ ಸ್ವಾವಲಂಬನೆ ಮಿಷನ್",
    },
    category: "Soil & Fertilizer",
    objective: "Attain total national self-sufficiency in pulses (Tur, Urad, Moong, Masur) through high-yielding seed minikits, cluster demonstrations, and 100% procurement assurance.",
    benefits: "100% free certified seed minikits of climate-resilient pulses delivered directly to farmers before Kharif/Rabi sowing seasons. Guaranteed procurement of 100% output at MSP.",
    eligibility: [
      "All farmers with cultivable land allocating area for pulse production."
    ],
    documents: [
      "Aadhaar Card",
      "Khasra / Land Record",
      "Application at local Krishi Vigyan Kendra (KVK) or Block Agriculture Office"
    ],
    applyLink: "https://agricoop.nic.in/",
    state: "All India",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "100% Free Seed Minikits & Guaranteed Procurement",
    targetBeneficiaries: "All Pulses & Oilseed Cultivators"
  },

  // 25. STATE: MADHYA PRADESH - MUKHYAMANTRI KISAN KALYAN
  {
    id: "sch_25",
    title: "Mukhyamantri Kisan Kalyan Yojana (Madhya Pradesh)",
    titleLocal: {
      en: "Mukhyamantri Kisan Kalyan Yojana (MP)",
      hi: "मुख्यमंत्री किसान कल्याण योजना (मध्य प्रदेश - अतिरिक्त ₹6,000/वर्ष)",
      pa: "ਮੁੱਖ ਮੰਤਰੀ ਕਿਸਾਨ ਕਲਿਆਣ ਯੋਜਨਾ (ਐੱਮ.ਪੀ.)",
      mr: "मुख्यमंत्री किसान कल्याण योजना (मध्य प्रदेश)",
      te: "ముఖ్యమంత్రి కిసాన్ కళ్యాణ్ పథకం (ఎంపీ)",
      ta: "முதலமைச்சர் கிசான் கல்யாண் திட்டம்",
      bn: "মুখ্যমন্ত্রী কিষাণ কল্যাণ যোজনা",
      gu: "મુખ્યમંત્રી કિસાન કલ્યાણ યોજના (એમપી)",
      kn: "ಮುಖ್ಯಮಂತ್ರಿ ಕಿಸಾನ್ ಕಲ್ಯಾಣ ಯೋಜನೆ",
    },
    category: "State Schemes",
    objective: "Supplementary state cash assistance of ₹6,000 per year given to all PM-KISAN eligible farmers in Madhya Pradesh (Total ₹12,000 per year received by MP farmers).",
    benefits: "Direct bank transfer of ₹6,000 annually in equal installments alongside Central PM-KISAN, making total annual farmer financial assistance ₹12,000.",
    eligibility: [
      "Registered beneficiaries of Central PM-KISAN residing and holding land in Madhya Pradesh.",
      "Aadhaar linked active bank account."
    ],
    documents: [
      "PM-KISAN Registration Number",
      "Samagra ID (Madhya Pradesh)",
      "Aadhaar Card and Land Record (Khasra)"
    ],
    applyLink: "https://saara.mp.gov.in/",
    state: "Madhya Pradesh",
    helplinePhone: "181 (MP CM Helpline)",
    subsidyPercentage: "₹6,000/year State Cash Top-Up",
    targetBeneficiaries: "All PM-KISAN Beneficiary Farmers in MP"
  },

  // 26. STATE: ANDHRA PRADESH & TELANGANA - RYTHU BHAROSA / RYTHU BANDHU
  {
    id: "sch_26",
    title: "Rythu Bharosa / Rythu Bandhu Investment Support (AP & Telangana)",
    titleLocal: {
      en: "Rythu Bharosa / Rythu Bandhu Scheme",
      hi: "रायथू भरोसा / रायथू बंधु (आंध्र प्रदेश व तेलंगाना - ₹13,500-₹15,000/वर्ष)",
      pa: "ਰਯਤੂ ਬੰਧੂ ਸਕੀਮ",
      mr: "रयत बंधू / रयत भरोसा योजना",
      te: "రైతు భరోసా / రైతు బంధు పథకం",
      ta: "ரைத்து பந்து / ரைத்து பரோசா",
      bn: "রায়থু বন্ধু স্কিম",
      gu: "રયતુ બંધુ યોજના",
      kn: "ರೈತು ಬಂಧು / ರೈತು ಭರೋಸಾ ಯೋಜನೆ",
    },
    category: "State Schemes",
    objective: "Direct investment support scheme to farmers for purchasing seeds, fertilizers, pesticides, labor, and field preparation before every agricultural season.",
    benefits: "Direct financial assistance of ₹13,500 to ₹15,000 per year per farmer/acre transferred before Kharif and Rabi seasons, including tenant farmers (SC/ST/BC/Minorities).",
    eligibility: [
      "Landholding farmers in Andhra Pradesh / Telangana.",
      "Tenant farmers possessing crop cultivation rights cards (CCRC)."
    ],
    documents: [
      "Pattadar Passbook / 1-B Record",
      "Aadhaar Card",
      "Active Bank Account Passbook"
    ],
    applyLink: "https://rythubharosa.ap.gov.in/",
    state: "Andhra Pradesh / Telangana",
    helplinePhone: "1902 / 040-2338-3520",
    subsidyPercentage: "₹13,500 to ₹15,000 per Year Input Support",
    targetBeneficiaries: "Landowners & Registered Tenant Cultivators"
  },

  // 27. STATE: ODISHA - KALIA SCHEME
  {
    id: "sch_27",
    title: "Krushak Assistance for Livelihood and Income Augmentation (KALIA - Odisha)",
    titleLocal: {
      en: "KALIA Scheme (Odisha)",
      hi: "कालिया योजना (ओडिशा - छोटे किसानों व भूमिहीन मजदूरों को सहायता)",
      pa: "ਕਾਲੀਆ ਸਕੀਮ (ਓਡੀਸ਼ਾ)",
      mr: "कालिया योजना (ओडिशा)",
      te: "కాలియా పథకం (ఒడిశా)",
      ta: "காலியா திட்டம் (ஒடிசா)",
      bn: "কালিয়া প্রকল্প (ওড়িশা)",
      gu: "કાલિયા યોજના (ઓડિશા)",
      kn: "ಕಾಲಿಯಾ ಯೋಜನೆ (ಒಡಿಶಾ)",
    },
    category: "State Schemes",
    objective: "Comprehensive welfare package for small, marginal farmers and landless agricultural laborers across Odisha for cultivation, livestock rearing, and interest-free loans.",
    benefits: "₹10,000 per family for cultivation assistance (₹5,000 per Kharif and Rabi season). Landless agricultural households get ₹12,500 for goat rearing, duckery, fishery units. Interest-free crop loans up to ₹50,000.",
    eligibility: [
      "Small and marginal farmers, landless agricultural workers, and vulnerable agricultural households in Odisha.",
      "Non-taxpayers not in government service."
    ],
    documents: [
      "Aadhaar Card",
      "Ration Card (NFSA / SFSS)",
      "Bank Passbook with Aadhaar link"
    ],
    applyLink: "https://kalia.odisha.gov.in/",
    state: "Odisha",
    helplinePhone: "1800-572-1122",
    subsidyPercentage: "₹10,000 to ₹12,500 Direct Cash Aid",
    targetBeneficiaries: "Small Farmers & Landless Agricultural Workers in Odisha"
  },

  // 28. STATE: FARM MACHINERY ANUDAN (UP, MP, BIHAR, RAJASTHAN)
  {
    id: "sch_28",
    title: "Krishi Yantra Anudan Yojana (State Farm Machinery Subsidy)",
    titleLocal: {
      en: "Krishi Yantra Anudan Yojana",
      hi: "कृषि यंत्र अनुदान योजना (यूपी, एमपी, बिहार, राजस्थान - 50% यंत्र सब्सिडी)",
      pa: "ਖੇਤੀ ਸੰਦ ਸਬਸਿਡੀ ਯੋਜਨਾ",
      mr: "कृषी यंत्र अनुदान योजना",
      te: "వ్యవసాయ పరికరాల రాయితీ పథకం",
      ta: "வேளாண் கருவிகள் மானியத் திட்டம்",
      bn: "কৃষি যন্ত্রপাতি অনুদান প্রকল্প",
      gu: "કૃષિ યાંત્રિકીકરણ યોજના (૫૦% સબસિડી)",
      kn: "ಕೃಷಿ ಯಂತ್ರೋಪಕರಣ ಅನುದಾನ ಯೋಜನೆ",
    },
    category: "Machinery & Subsidies",
    objective: "State government direct subsidy portal for purchasing seed cum fertilizer drills, power weeders, threshers, rotavators, straw reapers, and sprayers via online lottery.",
    benefits: "40% to 50% direct subsidy on DBT basis for over 40 types of agricultural implements, saving ₹20,000 to ₹2,50,000 per machine.",
    eligibility: [
      "Farmers registered on state agriculture DBT portals (UP Krishi, MP E-Krishi Yantra, Bihar DBT Agriculture).",
      "First come first served or e-lottery selection."
    ],
    documents: [
      "Farmer Registration Number",
      "Khasra / Land Record Copy",
      "Dealer Quotation and Bank Account Proof",
      "Electricity Bill (for electric pump sets / threshers)"
    ],
    applyLink: "https://dbtagriculture.bihar.gov.in/",
    state: "UP, MP, Bihar, Rajasthan, Gujarat",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "40% to 50% Direct DBT Subsidy",
    targetBeneficiaries: "All State Registered Agricultural Cultivators"
  },

  // 29. STATE: SOLAR FENCING CROP PROTECTION (HP, UK, GUJARAT)
  {
    id: "sch_29",
    title: "Mukhya Mantri Khet Sanrakshan Yojana (Solar Fencing Protection Subsidy)",
    titleLocal: {
      en: "Khet Sanrakshan Yojana (Solar Fencing)",
      hi: "मुख्यमंत्री खेत संरक्षण योजना (सौर बाड़बंदी 80-85% सब्सिडी)",
      pa: "ਸੋਲਰ ਵਾੜ ਸਬਸਿਡੀ ਸਕੀਮ",
      mr: "सोलर कुंपण योजना (पीक संरक्षण)",
      te: "సౌర కంచె రాయితీ పథకం",
      ta: "சூரிய மின்வேலி மானியத் திட்டம்",
      bn: "সৌর বেড়া সুরক্ষা প্রকল্প",
      gu: "સોલાર ફેન્સિંગ સહાય યોજના (૮૫% સબસિડી)",
      kn: "ಸೌರ ಬೇಲಿ ಬೆಳೆ ಸಂರಕ್ಷಣೆ ಯೋಜನೆ",
    },
    category: "State Schemes",
    objective: "Erect solar-powered non-lethal energized fences around farm boundaries to permanently protect standing crops from wild boars, blue bulls (nilgai), monkeys, and stray cattle.",
    benefits: "80% subsidy for individual farmers and 85% subsidy for farmer groups to install solar-powered electric fencing. 100% humane and safe, giving pulsating shock that deters wild animals without causing fatal injury.",
    eligibility: [
      "Farmers facing persistent wild animal crop depredation.",
      "Groups of 3 or more farmers sharing common agricultural boundary."
    ],
    documents: [
      "Land Record Certificate (7-12 / Khasra / Jamabandi)",
      "Group Undertaking (if applying jointly)",
      "Aadhaar Card and Bank Details"
    ],
    applyLink: "https://himachal.nic.in/",
    state: "Himachal Pradesh, Uttarakhand, Gujarat, Karnataka",
    helplinePhone: "0177-2830149",
    subsidyPercentage: "80% to 85% Government Subsidy",
    targetBeneficiaries: "Farmers Facing Wild Animal & Stray Cattle Threats"
  },

  // 30. STATE: MAHARASHTRA - CROP LOAN WAIVER & INCENTIVE
  {
    id: "sch_30",
    title: "Mahatma Jyotirao Phule Shetkari Karjmukti Yojana (Maharashtra)",
    titleLocal: {
      en: "Mahatma Jyotirao Phule Shetkari Karjmukti",
      hi: "महात्मा ज्योतिराव फुले शेतकरी कर्जमुक्ति योजना (महाराष्ट्र - ₹2 लाख कर्जमाफी)",
      pa: "ਮਹਾਰਾਸ਼ਟਰ ਕਿਸਾਨ ਕਰਜ਼ ਮੁਕਤੀ ਯੋਜਨਾ",
      mr: "महात्मा ज्योतिराव फुले शेतकरी कर्जमुक्ती योजना",
      te: "మహాత్మా జ్యోతిరావు ఫూలే రుణమాఫీ",
      ta: "மகாத்மா ஜோதிராவ் பூலே கடன் தள்ளுபடி",
      bn: "মহাত্মা জ্যোতিরাও ফুলে কৃষক ঋণমুক্তি",
      gu: "મહાત્મા જ્યોતિરાવ ફૂલે ખેડૂત દેવા માફી",
      kn: "ಮಹಾತ್ಮ ಜ್ಯೋತಿರಾವ್ ಫುಲೆ ಸಾಲ ಮನ್ನಾ",
    },
    category: "State Schemes",
    objective: "Comprehensive crop debt relief for farmers in distress and special incentive bonus of ₹50,000 for honest farmers who regularly repay crop loans on time.",
    benefits: "Complete waiver of overdue short-term crop loans up to ₹2 Lakh directly credited to farmer loan accounts. Direct cash incentive of ₹50,000 deposited for regular repaying farmers.",
    eligibility: [
      "Farmers in Maharashtra with overdue crop loans taken from nationalized, district cooperative, or rural regional banks.",
      "Regular loan repayers who did not default."
    ],
    documents: [
      "Aadhaar Card with Biometric Authentication",
      "Loan Account Passbook / Statement from Bank",
      "7-12 Land Extract"
    ],
    applyLink: "https://mjpsky.maharashtra.gov.in/",
    state: "Maharashtra",
    helplinePhone: "1800-102-5311",
    subsidyPercentage: "Up to ₹2 Lakh Loan Relief + ₹50,000 Incentive",
    targetBeneficiaries: "Overdue & Prompt Repayer Farmers in Maharashtra"
  },

  // 31. RAINWATER HARVESTING & FARM PONDS (KHET TALAB)
  {
    id: "sch_31",
    title: "Khet Talab Yojana (Farm Pond Construction Subsidy)",
    titleLocal: {
      en: "Khet Talab Yojana (Farm Pond Subsidy)",
      hi: "खेत तालाब योजना (वर्षा जल संचयन - 50% से 70% सब्सिडी)",
      pa: "ਖੇਤ ਤਲਾਬ ਯੋਜਨਾ",
      mr: "शेततळे योजना (५०% ते ७५% अनुदान)",
      te: "రైతు చెరువు నిర్మాణం రాయితీ",
      ta: "பண்ணைக் குட்டை மானியத் திட்டம்",
      bn: "ক্ষেত পুকুর নির্মাণ প্রকল্প",
      gu: "ખેત તલાવડી યોજના (૫૦% સબસિડી)",
      kn: "ಕೃಷಿ ಹೊಂಡ ನಿರ್ಮಾಣ ಯೋಜನೆ",
    },
    category: "Solar & Irrigation",
    objective: "Construct lined farm ponds to collect and store rainwater runoff, guaranteeing life-saving irrigation for crops during crucial flowering and grain-filling stages.",
    benefits: "50% to 70% subsidy (up to ₹1,05,000 directly deposited via DBT) for earth digging, shaping, and HDPE plastic lining film to prevent water seepage.",
    eligibility: [
      "Farmers owning at least 0.5 to 1 hectare of cultivable agricultural land.",
      "Prepared to maintain pond on own field."
    ],
    documents: [
      "Aadhaar Card",
      "Land Revenue Records (Khasra / Khatoni)",
      "Bank Account Passbook",
      "GPS Tagged Site Photo of Farm"
    ],
    applyLink: "https://upagriculture.com/",
    state: "UP, MP, Maharashtra, Rajasthan, Karnataka",
    helplinePhone: "1800-180-1551",
    subsidyPercentage: "50% to 70% Subsidy (Up to ₹1.05 Lakh)",
    targetBeneficiaries: "Farmers in Rainfed & Drought Prone Regions"
  },

  // 32. NORTH EAST ORGANIC MISSION (MOVCDNER)
  {
    id: "sch_32",
    title: "Mission Organic Value Chain Development for North Eastern Region (MOVCDNER)",
    titleLocal: {
      en: "North East Organic Mission (MOVCDNER)",
      hi: "पूर्वोत्तर क्षेत्र जैविक मूल्य श्रृंखला मिशन (MOVCDNER)",
      pa: "ਉੱਤਰ ਪੂਰਬੀ ਜੈਵਿਕ ਮਿਸ਼ਨ",
      mr: "ईशान्य भारत सेंद्रिय मूल्य साखळी अभियान",
      te: "ఈశాన్య ఆర్గానిక్ మిషన్",
      ta: "வடகிழக்கு இயற்கை வேளாண் திட்டம்",
      bn: "উত্তর পূর্ব জৈব মিশন",
      gu: "નોર્થ ઈસ્ટ ઓર્ગેનિક મિશન",
      kn: "ಈಶಾನ್ಯ ಸಾವಯವ ಮಿಷನ್",
    },
    category: "Organic & Natural Farming",
    objective: "Develop certified organic production clusters with end-to-end value chain from seeds, organic cultivation, post-harvest processing, cold chains, to national and global export marketing.",
    benefits: "Financial support up to ₹25,000/ha for organic inputs over 3 years, ₹2 Crore grant for integrated processing and packaging units, and 100% brand building and organic certification coverage.",
    eligibility: [
      "Farmers and FPOs located in Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura."
    ],
    documents: [
      "Land Records",
      "FPO / Farmer Group Registration",
      "Aadhaar Card and Bank details"
    ],
    applyLink: "https://movcd.dac.gov.in/",
    state: "North Eastern States (Assam, Sikkim, etc.)",
    helplinePhone: "011-23381012",
    subsidyPercentage: "₹25,000/ha + Processing Infrastructure Grants",
    targetBeneficiaries: "Organic Cultivators in 8 North Eastern States"
  }
];
