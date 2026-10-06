import React from "react";
import { History, Calendar, CheckCircle, AlertTriangle, Trash2, Download } from "lucide-react";
import { DiseaseAnalysisResult, Language } from "../types";
import { UI_TRANSLATIONS } from "../data/translations";

interface DiseaseHistoryModalProps {
  history: DiseaseAnalysisResult[];
  onClearHistory: () => void;
  language: Language;
}

export const DiseaseHistoryModal: React.FC<DiseaseHistoryModalProps> = ({
  history,
  onClearHistory,
  language,
}) => {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  const handleDownloadReport = () => {
    if (history.length === 0) return;

    const csvHeaders = ["Date", "Crop", "Disease", "Confidence", "Organic Treatment", "Chemical Treatment"];
    const csvRows = history.map(item => [
      `"${item.scannedAt}"`,
      `"${item.crop}"`,
      `"${item.diseaseName}"`,
      `"${item.confidence}%"`,
      `"${item.organicTreatment.join(". ").replace(/"/g, '""')}"`,
      `"${item.chemicalTreatment.join(". ").replace(/"/g, '""')}"`
    ]);

    const csvContent = [csvHeaders.join(","), ...csvRows.map(row => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `cropguard-scan-history-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs text-center space-y-3 text-stone-700 dark:text-zinc-300">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center text-2xl">
          📜
        </div>
        <h3 className="text-lg font-bold text-stone-900 dark:text-emerald-300 tracking-tight">No Previous Scans Saved</h3>
        <p className="text-xs text-stone-500 dark:text-zinc-400">
          When you analyze leaves, your disease scan history will be saved here automatically for offline access.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs flex items-center justify-between text-stone-900 dark:text-zinc-100 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-center shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-emerald-200 tracking-tight">
              Saved Scan History
            </h2>
            <p className="text-xs text-stone-500 dark:text-zinc-400">
              {history.length} Previous Leaf Disease Diagnoses Cached
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadReport}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Download CSV Report"
          >
            <Download className="w-4 h-4" />
            <span>Download Report</span>
          </button>
          
          <button
            onClick={onClearHistory}
            className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 dark:hover:bg-rose-900 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-800 shadow-xs space-y-3 text-stone-900 dark:text-zinc-100"
          >
            <div className="flex items-start justify-between gap-2 border-b border-stone-200 dark:border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400">
                  {item.crop}
                </span>
                <h3 className="text-base font-bold text-stone-900 dark:text-white mt-1">
                  {item.diseaseName}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-stone-400 dark:text-zinc-400 block">{item.scannedAt}</span>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {item.confidence}% Match
                </span>
              </div>
            </div>

            <div className="text-xs text-stone-700 dark:text-zinc-300 space-y-2">
              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800">
                <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">Organic Solution:</strong>
                <p>{item.organicTreatment.join(". ")}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-zinc-800/80 border border-stone-200 dark:border-zinc-800">
                <strong className="text-indigo-700 dark:text-indigo-400 block mb-0.5">Chemical Spray:</strong>
                <p>{item.chemicalTreatment.join(". ")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
