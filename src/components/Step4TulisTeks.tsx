import React, { useState } from 'react';
import { ParagraphDrafts, TextStructure } from '../types';
import { OBSERVATION_QUESTIONS } from '../data/questions';
import { ArrowLeft, ArrowRight, Lightbulb, Copy, Plus, CheckCircle2, Layers } from 'lucide-react';

interface Step4TulisTeksProps {
  sentences: string[];
  structures: (TextStructure | '')[];
  paragraphs: ParagraphDrafts;
  onUpdateParagraphs: (updated: Partial<ParagraphDrafts>) => void;
  onOpenHint: () => void;
  onNextStage: () => void;
  onPrevStage: () => void;
}

export const Step4TulisTeks: React.FC<Step4TulisTeksProps> = ({
  sentences,
  structures,
  paragraphs,
  onUpdateParagraphs,
  onOpenHint,
  onNextStage,
  onPrevStage,
}) => {
  // Tab index: 0 = Pernyataan Umum, 1 = Deskripsi Bagian, 2 = Deskripsi Manfaat
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [warningText, setWarningText] = useState<string>('');

  // Group sentences by student's designated structure
  const umumSentences: { index: number; text: string; label: string }[] = [];
  const bagianSentences: { index: number; text: string; label: string }[] = [];
  const manfaatSentences: { index: number; text: string; label: string }[] = [];

  sentences.forEach((sentenceText, idx) => {
    const struct = structures[idx];
    const qLabel = OBSERVATION_QUESTIONS[idx]?.shortLabel || `Data #${idx + 1}`;
    const cleanText = sentenceText.trim();
    if (!cleanText) return;

    if (struct === 'Pernyataan Umum') {
      umumSentences.push({ index: idx, text: cleanText, label: qLabel });
    } else if (struct === 'Deskripsi Bagian') {
      bagianSentences.push({ index: idx, text: cleanText, label: qLabel });
    } else if (struct === 'Deskripsi Manfaat') {
      manfaatSentences.push({ index: idx, text: cleanText, label: qLabel });
    }
  });

  const tabConfigs = [
    {
      id: 0,
      structureName: 'Pernyataan Umum' as TextStructure,
      tabTitle: 'Paragraf 1',
      fullTitle: 'Paragraf 1: Pernyataan Umum',
      color: 'blue',
      sentences: umumSentences,
      value: paragraphs.pernyataanUmum,
      key: 'pernyataanUmum' as keyof ParagraphDrafts,
      placeholder: 'Rangkai kalimat pembuka, nama objek, lokasi, dan definisi umum menjadi satu paragraf pembuka yang padu...',
      conjunctionSuggestions: ['merupakan', 'adalah', 'Objek ini terletak di', 'termasuk dalam fasilitas'],
    },
    {
      id: 1,
      structureName: 'Deskripsi Bagian' as TextStructure,
      tabTitle: 'Paragraf 2',
      fullTitle: 'Paragraf 2: Deskripsi Bagian',
      color: 'emerald',
      sentences: bagianSentences,
      value: paragraphs.deskripsiBagian,
      key: 'deskripsiBagian' as keyof ParagraphDrafts,
      placeholder: 'Gabungkan rincian fisik, ukuran, bahan, kebersihan, dan pengguna menjadi paragraf deskripsi yang mendetail...',
      conjunctionSuggestions: ['Selain itu,', 'Di samping itu,', 'Selanjutnya,', 'Dari segi fisik,', 'Kondisi ruangan'],
    },
    {
      id: 2,
      structureName: 'Deskripsi Manfaat' as TextStructure,
      tabTitle: 'Paragraf 3',
      fullTitle: 'Paragraf 3: Deskripsi Manfaat',
      color: 'amber',
      sentences: manfaatSentences,
      value: paragraphs.deskripsiManfaat,
      key: 'deskripsiManfaat' as keyof ParagraphDrafts,
      placeholder: 'Gabungkan fungsi utama dan dampak positif objek bagi warga sekolah menjadi paragraf penutup...',
      conjunctionSuggestions: ['Oleh karena itu,', 'Dengan demikian,', 'Keberadaan fasilitas ini', 'berfungsi untuk', 'bermanfaat bagi'],
    },
  ];

  const currentConfig = tabConfigs[activeTab];

  // Helper: insert a sentence or conjunction into current paragraph
  const handleInsertText = (textToInsert: string) => {
    const currentText = currentConfig.value || '';
    const newText = currentText.length === 0 
      ? textToInsert 
      : `${currentText.trim()} ${textToInsert}`;
    onUpdateParagraphs({ [currentConfig.key]: newText });

    setCopyFeedback(`Disisipkan: "${textToInsert.slice(0, 25)}..."`);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const handleNextTabOrStage = () => {
    if (activeTab < 2) {
      setActiveTab((prev) => (prev + 1) as 1 | 2);
      setWarningText('');
    } else {
      const emptyParagraphs: string[] = [];
      if (!paragraphs.pernyataanUmum.trim()) emptyParagraphs.push('Paragraf 1 (Pernyataan Umum)');
      if (!paragraphs.deskripsiBagian.trim()) emptyParagraphs.push('Paragraf 2 (Deskripsi Bagian)');
      if (!paragraphs.deskripsiManfaat.trim()) emptyParagraphs.push('Paragraf 3 (Deskripsi Manfaat)');

      if (emptyParagraphs.length > 0) {
        setWarningText(`${emptyParagraphs.join(' dan ')} masih belum ditulis. Pastikan kamu menyusun ketiga paragraf.`);
        return;
      }
      setWarningText('');
      onNextStage();
    }
  };

  const handlePrevTabOrStage = () => {
    setWarningText('');
    if (activeTab > 0) {
      setActiveTab((prev) => (prev - 1) as 0 | 1);
    } else {
      onPrevStage();
    }
  };

  // Completion statuses
  const p1Filled = paragraphs.pernyataanUmum.trim().length > 15;
  const p2Filled = paragraphs.deskripsiBagian.trim().length > 15;
  const p3Filled = paragraphs.deskripsiManfaat.trim().length > 15;

  return (
    <div className="max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col min-h-[calc(100vh-120px)] justify-between">
      {/* Top Segmented Selector for 3 Paragraphs */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            {currentConfig.fullTitle}
          </span>
          <button
            type="button"
            onClick={onOpenHint}
            className="flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 px-2 py-0.5 rounded-md transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Kata Hubung</span>
          </button>
        </div>

        {/* Clean 3-tab segmented control */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab(0)}
            className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 0
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Paragraf 1</span>
            {p1Filled && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(1)}
            className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 1
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Paragraf 2</span>
            {p2Filled && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab(2)}
            className={`py-2 px-1 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1 ${
              activeTab === 2
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Paragraf 3</span>
            {p3Filled && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Main Composition Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 my-auto">
        {/* Sentences in this Bucket */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Kalimat Hasil Pilihanmu ({currentConfig.sentences.length}):
            </span>
            <span className="text-slate-400 font-normal">Ketuk (+) untuk menyisipkan</span>
          </div>

          {currentConfig.sentences.length === 0 ? (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px]">
              Belum ada kalimat yang kamu kategorikan ke struktur ini di Tahap 3. Kamu bisa kembali ke Tahap 3 jika ingin memindahkan kategori kalimat.
            </div>
          ) : (
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-0.5">
              {currentConfig.sentences.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-2 text-[11px]"
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-slate-500 text-[10px] block">
                      #{item.index + 1} ({item.label})
                    </span>
                    <p className="text-slate-800 leading-snug">"{item.text}"</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInsertText(item.text)}
                    className="shrink-0 p-1 rounded-md text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition-colors"
                    title="Sisipkan kalimat ini ke kolom paragraf"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conjunction Assistant (Interactive Chips) */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-600">
            Pilihan Kata Hubung (Konjungsi):
          </label>
          <div className="flex flex-wrap gap-1.5">
            {currentConfig.conjunctionSuggestions.map((conj, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleInsertText(conj)}
                className="px-2 py-0.5 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 rounded-md transition-all active:scale-95"
              >
                + {conj}
              </button>
            ))}
          </div>
        </div>

        {/* Textarea for the Final Unified Paragraph */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-800">
            <span>Kolom Ketik Paragraf Utuh:</span>
            {currentConfig.value.trim().length > 0 && (
              <span className="text-[10px] text-slate-400 font-normal">
                {currentConfig.value.trim().split(/\s+/).filter(Boolean).length} kata
              </span>
            )}
          </div>

          <textarea
            rows={5}
            value={currentConfig.value}
            onChange={(e) => onUpdateParagraphs({ [currentConfig.key]: e.target.value })}
            placeholder={currentConfig.placeholder}
            className="w-full p-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900 resize-none leading-relaxed"
          />

          {copyFeedback && (
            <p className="text-[11px] text-emerald-600 font-medium">
              ✓ {copyFeedback}
            </p>
          )}

          {warningText && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              ⚠️ {warningText}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handlePrevTabOrStage}
          className="flex-1 h-11 px-3 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{activeTab === 0 ? 'Tahap 3' : 'Paragraf Sebelumnya'}</span>
        </button>

        <button
          type="button"
          onClick={handleNextTabOrStage}
          className="flex-1 h-11 px-3 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>
            {activeTab === 2 ? 'Lanjut ke Tahap 5: Tinjau' : 'Paragraf Selanjutnya'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
