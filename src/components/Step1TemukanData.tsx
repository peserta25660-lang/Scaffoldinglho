import React, { useState } from 'react';
import { OBSERVATION_QUESTIONS } from '../data/questions';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle, HelpCircle } from 'lucide-react';

interface Step1TemukanDataProps {
  answers: string[];
  onUpdateAnswer: (index: number, value: string) => void;
  onOpenHint: (questionId: number) => void;
  onNextStage: () => void;
  onPrevStage: () => void;
}

export const Step1TemukanData: React.FC<Step1TemukanDataProps> = ({
  answers,
  onUpdateAnswer,
  onOpenHint,
  onNextStage,
  onPrevStage,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQ = OBSERVATION_QUESTIONS[currentQIndex];

  const currentAnswer = answers[currentQIndex] || '';

  const handleNext = () => {
    if (currentQIndex < OBSERVATION_QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      onNextStage();
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    } else {
      onPrevStage();
    }
  };

  // Count filled answers
  const filledCount = answers.filter((a) => a && a.trim().length > 0).length;

  return (
    <div className="max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col min-h-[calc(100vh-120px)] justify-between">
      {/* Top mini question indicator bar */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            Pertanyaan {currentQIndex + 1} dari 10
          </span>
          <span className="text-[11px] text-slate-500">
            {filledCount}/10 Terisi
          </span>
        </div>

        {/* 10 clean tap indicators */}
        <div className="grid grid-cols-10 gap-1">
          {OBSERVATION_QUESTIONS.map((q, idx) => {
            const isFilled = answers[idx] && answers[idx].trim().length > 0;
            const isCurrent = idx === currentQIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQIndex(idx)}
                aria-label={`Beralih ke pertanyaan ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 ring-2 ring-indigo-200'
                    : isFilled
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                }`}
                title={`Pertanyaan ${idx + 1}: ${q.shortLabel}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Single Card: Focused on input without unnecessary scroll */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 my-auto">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
            Fokus: {currentQ.shortLabel}
          </span>
          <button
            type="button"
            onClick={() => onOpenHint(currentQ.id)}
            className="flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 px-2 py-1 rounded-md transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Contoh Jawaban</span>
          </button>
        </div>

        {/* Question Text */}
        <div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {currentQ.focusHint}
          </p>
        </div>

        {/* Input Textarea */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-700 flex items-center justify-between">
            <span>Catatan Fakta Mentahmu:</span>
            {currentAnswer.trim().length > 0 && (
              <span className="text-emerald-600 flex items-center gap-1 text-[10px]">
                <CheckCircle className="w-3 h-3" /> Tercatat
              </span>
            )}
          </label>
          <textarea
            rows={3}
            value={currentAnswer}
            onChange={(e) => onUpdateAnswer(currentQIndex, e.target.value)}
            placeholder={currentQ.placeholder}
            className="w-full p-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 resize-none"
          />
        </div>

        {/* Inline Neutral Example Preview Card */}
        <div className="bg-slate-50/90 border border-slate-200/80 rounded-xl p-2.5 text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
            <span>Contoh Objek Model (Perpustakaan):</span>
          </div>
          <p className="italic text-slate-600 pl-5">
            "{currentQ.neutralExample}"
          </p>
        </div>
      </div>

      {/* Bottom Ergonomic Navigation Bar */}
      <div className="pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 h-11 px-3 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentQIndex === 0 ? 'Identitas' : 'Sebelumnya'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex-1 h-11 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>
            {currentQIndex === OBSERVATION_QUESTIONS.length - 1
              ? 'Lanjut ke Tahap 2'
              : 'Selanjutnya'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
