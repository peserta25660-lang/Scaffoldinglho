import React, { useState } from 'react';
import { OBSERVATION_QUESTIONS } from '../data/questions';
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  FileText,
  Sparkles,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Step2TulisKalimatProps {
  answers: string[];
  sentences: string[];
  onUpdateSentence: (index: number, value: string) => void;
  onOpenHint: (questionId?: number) => void;
  onNextStage: () => void;
  onPrevStage: () => void;
}

export const Step2TulisKalimat: React.FC<Step2TulisKalimatProps> = ({
  answers,
  sentences,
  onUpdateSentence,
  onOpenHint,
  onNextStage,
  onPrevStage,
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showExampleDetails, setShowExampleDetails] = useState(true);

  const currentQ = OBSERVATION_QUESTIONS[currentSentenceIndex];
  const currentRawAnswer = answers[currentSentenceIndex] || '(Belum diisi di Tahap 1)';
  const currentSentence = sentences[currentSentenceIndex] || '';
  const guide = currentQ.sentenceGuide;

  const handleNext = () => {
    if (currentSentenceIndex < OBSERVATION_QUESTIONS.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    } else {
      onNextStage();
    }
  };

  const handlePrev = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    } else {
      onPrevStage();
    }
  };

  const handleInsertKeyword = (keyword: string) => {
    const trimmed = currentSentence.trim();
    const newText = trimmed.length === 0 ? keyword : `${trimmed} ${keyword}`;
    onUpdateSentence(currentSentenceIndex, newText);
  };

  const filledCount = sentences.filter((s) => s && s.trim().length > 0).length;

  return (
    <div className="max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col min-h-[calc(100vh-120px)] justify-between">
      {/* Top 10-dot indicator */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            Soal {currentSentenceIndex + 1} dari 10: {currentQ.shortLabel}
          </span>
          <span className="text-[11px] text-slate-500">
            {filledCount}/10 Kalimat Disusun
          </span>
        </div>

        <div className="grid grid-cols-10 gap-1">
          {OBSERVATION_QUESTIONS.map((q, idx) => {
            const isFilled = sentences[idx] && sentences[idx].trim().length > 0;
            const isCurrent = idx === currentSentenceIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentSentenceIndex(idx)}
                aria-label={`Beralih ke kalimat ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 ring-2 ring-indigo-200'
                    : isFilled
                    ? 'bg-emerald-500'
                    : 'bg-slate-200'
                }`}
                title={`Kalimat ${idx + 1}: ${q.shortLabel}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Single Card for Sentence Formulation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 my-auto">
        {/* Header Question Label & General Hint Trigger */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
            Fokus #{currentSentenceIndex + 1}: {currentQ.shortLabel}
          </span>
          <button
            type="button"
            onClick={() => onOpenHint(currentSentenceIndex + 1)}
            className="flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 px-2 py-0.5 rounded-md transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Pola Umum</span>
          </button>
        </div>

        {/* 1. Reference Raw Note From Stage 1 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-600">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              Catatan Mentahmu dari Tahap 1:
            </span>
            <span className="text-slate-400">Soal #{currentSentenceIndex + 1}</span>
          </div>
          <p className="text-xs font-semibold text-slate-900 bg-white p-2 rounded-lg border border-slate-200/60">
            "{currentRawAnswer}"
          </p>
        </div>

        {/* 2. SPECIFIC SENTENCE SCAFFOLDING PER SOAL */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Petunjuk Menyusun Kalimat #{currentSentenceIndex + 1}
            </span>
            <button
              type="button"
              onClick={() => setShowExampleDetails(!showExampleDetails)}
              className="text-[10px] text-amber-800 hover:text-amber-950 flex items-center gap-0.5 font-medium"
            >
              <span>{showExampleDetails ? 'Ringkas' : 'Detail'}</span>
              {showExampleDetails ? (
                <ChevronUp className="w-3 h-3" />
              ) : (
                <ChevronDown className="w-3 h-3" />
              )}
            </button>
          </div>

          {/* Pola Rumus Kalimat Soal Ini */}
          <div className="bg-white/90 border border-amber-200/60 rounded-lg p-2 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Rumus Kalimat Soal Ini:
            </span>
            <p className="text-xs font-mono font-medium text-slate-900 leading-snug">
              {guide.formula}
            </p>
          </div>

          {/* Interactive Starter Keywords (Tap to insert) */}
          <div className="space-y-1 pt-0.5">
            <span className="text-[10px] font-semibold text-slate-600 block">
              Pilihan Kata Sambung / Awalan (Ketuk untuk menyisipkan):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {guide.starterKeywords.map((kw, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInsertKeyword(kw)}
                  className="px-2 py-1 text-[11px] font-medium text-slate-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-md transition-all active:scale-95 shadow-2xs"
                  title={`Sisipkan "${kw}" ke kolom ketik`}
                >
                  + {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Extended Details: Concrete Neutral Model & Spelling Warnings */}
          {showExampleDetails && (
            <div className="space-y-2 pt-1 border-t border-amber-200/60 text-[11px]">
              {/* Contoh Kalimat Model Jadi */}
              <div className="space-y-0.5">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-indigo-600" />
                  Contoh Kalimat Jadi (Model Perpustakaan):
                </span>
                <p className="italic text-slate-800 bg-white/70 p-1.5 rounded-md border border-slate-200/50 leading-relaxed">
                  "{guide.exampleSentence}"
                </p>
              </div>

              {/* Catatan Ejaan Spesifik Soal Ini */}
              <div className="flex items-start gap-1.5 text-amber-900 bg-amber-100/60 p-2 rounded-md">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-tight text-[10px] sm:text-[11px]">
                  <strong>Perhatian:</strong> {guide.spellingNote}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 3. Input Textarea for Full Sentence */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-slate-700 flex items-center justify-between">
            <span>Kolom Ketik Kalimat Baku Siswa:</span>
            {currentSentence.trim().length > 0 && (
              <span className="text-emerald-600 flex items-center gap-1 text-[10px]">
                <CheckCircle className="w-3 h-3" /> Siap
              </span>
            )}
          </label>
          <textarea
            rows={3}
            value={currentSentence}
            onChange={(e) => onUpdateSentence(currentSentenceIndex, e.target.value)}
            placeholder={`Tulis kalimat baku lengkap untuk soal ${currentQ.shortLabel.toLowerCase()}...`}
            className="w-full p-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 resize-none leading-relaxed"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 h-11 px-3 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentSentenceIndex === 0 ? 'Tahap 1' : 'Sebelumnya'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex-1 h-11 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>
            {currentSentenceIndex === OBSERVATION_QUESTIONS.length - 1
              ? 'Lanjut ke Tahap 3'
              : 'Selanjutnya'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
