import React, { useState } from 'react';
import { OBSERVATION_QUESTIONS } from '../data/questions';
import { TextStructure } from '../types';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle2, Bookmark, AlertCircle } from 'lucide-react';

interface Step3TataStrukturProps {
  sentences: string[];
  structures: (TextStructure | '')[];
  onUpdateStructure: (index: number, value: TextStructure) => void;
  onOpenHint: () => void;
  onNextStage: () => void;
  onPrevStage: () => void;
}

const STRUCTURE_OPTIONS: {
  value: TextStructure;
  label: string;
  badgeColor: string;
  desc: string;
}[] = [
  {
    value: 'Pernyataan Umum',
    label: '1. Pernyataan Umum',
    badgeColor: 'border-blue-500 bg-blue-50 text-blue-900',
    desc: 'Nama objek, lokasi, kelompok/kategori, atau definisi (adalah/merupakan)',
  },
  {
    value: 'Deskripsi Bagian',
    label: '2. Deskripsi Bagian',
    badgeColor: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    desc: 'Rincian fisik, komponen, warna, ukuran, bahan, atau kebersihan',
  },
  {
    value: 'Deskripsi Manfaat',
    label: '3. Deskripsi Manfaat',
    badgeColor: 'border-amber-500 bg-amber-50 text-amber-900',
    desc: 'Fungsi operasional, kegunaan utama, atau dampak positif warga sekolah',
  },
];

export const Step3TataStruktur: React.FC<Step3TataStrukturProps> = ({
  sentences,
  structures,
  onUpdateStructure,
  onOpenHint,
  onNextStage,
  onPrevStage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [warningMsg, setWarningMsg] = useState('');

  const currentQ = OBSERVATION_QUESTIONS[currentIndex];
  const currentSentence = sentences[currentIndex] || '(Kalimat belum ditulis di Tahap 2)';
  const currentStructure = structures[currentIndex] || '';

  // Calculate structure distributions
  const countUmum = structures.filter((s) => s === 'Pernyataan Umum').length;
  const countBagian = structures.filter((s) => s === 'Deskripsi Bagian').length;
  const countManfaat = structures.filter((s) => s === 'Deskripsi Manfaat').length;
  const totalAssigned = structures.filter((s) => Boolean(s)).length;

  const handleNext = () => {
    if (currentIndex < OBSERVATION_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setWarningMsg('');
    } else {
      // Validate before proceeding to Step 4
      if (totalAssigned < 10) {
        setWarningMsg(`Masih ada ${10 - totalAssigned} kalimat yang belum kamu tentukan strukturnya.`);
        return;
      }
      if (countUmum === 0 || countBagian === 0 || countManfaat === 0) {
        setWarningMsg('Sebaiknya ketiga struktur (Pernyataan Umum, Deskripsi Bagian, dan Deskripsi Manfaat) memiliki setidaknya 1 kalimat agar draf LHO lengkap.');
        return;
      }
      onNextStage();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setWarningMsg('');
    } else {
      onPrevStage();
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col min-h-[calc(100vh-120px)] justify-between">
      {/* Top Distribution Summary & 10 Indicators */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            Kalimat {currentIndex + 1} dari 10
          </span>
          <span className="text-[11px] text-slate-500">
            {totalAssigned}/10 Ditata
          </span>
        </div>

        {/* 10 tap indicators with structure color */}
        <div className="grid grid-cols-10 gap-1">
          {OBSERVATION_QUESTIONS.map((q, idx) => {
            const struct = structures[idx];
            const isCurrent = idx === currentIndex;
            let bgColor = 'bg-slate-200';
            if (struct === 'Pernyataan Umum') bgColor = 'bg-blue-500';
            if (struct === 'Deskripsi Bagian') bgColor = 'bg-emerald-500';
            if (struct === 'Deskripsi Manfaat') bgColor = 'bg-amber-500';

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setWarningMsg('');
                }}
                aria-label={`Beralih ke analisis kalimat ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${bgColor} ${
                  isCurrent ? 'ring-2 ring-indigo-400 scale-110' : ''
                }`}
                title={`Kalimat ${idx + 1}: ${struct || 'Belum dipilih'}`}
              />
            );
          })}
        </div>

        {/* Compact summary bar */}
        <div className="flex items-center justify-between text-[11px] px-2 py-1.5 bg-slate-50 rounded-xl border border-slate-200/70">
          <span className="text-blue-700 font-medium">Umum: {countUmum}</span>
          <span className="text-slate-300">·</span>
          <span className="text-emerald-700 font-medium">Bagian: {countBagian}</span>
          <span className="text-slate-300">·</span>
          <span className="text-amber-700 font-medium">Manfaat: {countManfaat}</span>
        </div>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5 my-auto">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
            <Bookmark className="w-3.5 h-3.5 text-indigo-600" />
            Topik: {currentQ.shortLabel}
          </span>
          <button
            type="button"
            onClick={onOpenHint}
            className="flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 px-2 py-1 rounded-md transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Petunjuk Struktur</span>
          </button>
        </div>

        {/* Display student's sentence */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-500">
            Kalimat yang Kamu Analisis:
          </label>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 leading-relaxed">
            "{currentSentence}"
          </div>
        </div>

        {/* Structure Selection (Cognitive decision by student) */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-semibold text-slate-800 block">
            Menurutmu, kalimat ini termasuk struktur yang mana?
          </label>

          <div className="space-y-2">
            {STRUCTURE_OPTIONS.map((opt) => {
              const isSelected = currentStructure === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onUpdateStructure(currentIndex, opt.value);
                    setWarningMsg('');
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-start gap-2.5 active:scale-99 ${
                    isSelected
                      ? `${opt.badgeColor} border-current shadow-xs ring-1 ring-current`
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold leading-none">{opt.label}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {warningMsg && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{warningMsg}</span>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrev}
          className="flex-1 h-11 px-3 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentIndex === 0 ? 'Tahap 2' : 'Sebelumnya'}</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="flex-1 h-11 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>
            {currentIndex === OBSERVATION_QUESTIONS.length - 1
              ? 'Lanjut ke Tahap 4'
              : 'Selanjutnya'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
