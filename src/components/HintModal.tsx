import React from 'react';
import { X, Lightbulb, BookMarked, Sparkles } from 'lucide-react';
import { STAGE_HINTS } from '../data/hints';

interface HintModalProps {
  isOpen: boolean;
  stage: number;
  onClose: () => void;
  activeQuestionId?: number; // Optional question id to highlight
}

export const HintModal: React.FC<HintModalProps> = ({ isOpen, stage, onClose, activeQuestionId }) => {
  if (!isOpen) return null;

  const hint = STAGE_HINTS[stage] || STAGE_HINTS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[88vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hint-modal-title"
      >
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-amber-100 flex items-center justify-between bg-amber-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h2 id="hint-modal-title" className="font-semibold text-xs sm:text-sm text-slate-900">
                {hint.title}
              </h2>
              <p className="text-[11px] text-slate-600 line-clamp-1">{hint.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup bantuan"
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Neutral Comparison Object Highlight */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 flex items-center gap-1">
                <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
                {hint.neutralExampleLabel} (Objek Model)
              </span>
              <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                {hint.neutralExampleTitle}
              </span>
            </div>

            <div className="space-y-1.5 pt-1 border-t border-slate-200/60">
              {hint.neutralExampleItems.map((item, idx) => {
                const isCurrentHighlighted = activeQuestionId && item.questionLabel.includes(`Q${activeQuestionId}`);
                return (
                  <div 
                    key={idx} 
                    className={`p-2 rounded-lg text-[11px] transition-colors ${
                      isCurrentHighlighted 
                        ? 'bg-amber-100/70 border border-amber-300 text-slate-900' 
                        : 'bg-white border border-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="font-semibold text-slate-900 block mb-0.5">{item.questionLabel}:</span>
                    <p className="italic text-slate-700">"{item.sampleText}"</p>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-500 italic">
              *Catatan: Objek di atas adalah model pembanding. Tulislah hasil pengamatan sesuai objek nyata di sekolahmu sendiri.
            </p>
          </div>

          {/* Scaffolding Points */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Panduan Pengerjaan Tahap Ini
            </h3>

            {hint.points.map((pt, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3 space-y-1">
                <p className="font-semibold text-slate-900 text-xs">{pt.title}</p>
                <p className="text-slate-600 text-[11px] leading-relaxed">{pt.description}</p>
                {pt.examples && pt.examples.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-100 space-y-1 bg-slate-50/60 p-2 rounded-md">
                    {pt.examples.map((ex, exIdx) => (
                      <p key={exIdx} className="text-[11px] font-mono text-slate-700 leading-normal">
                        {ex}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">Pahami konsepnya, lalu tuangkan idemu!</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Mengerti & Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};
