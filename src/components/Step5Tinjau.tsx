import React, { useState } from 'react';
import { SelfEvaluationChecklist, ParagraphDrafts } from '../types';
import { ArrowLeft, ArrowRight, CheckSquare, Square, Eye, Lightbulb, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface Step5TinjauProps {
  checklist: SelfEvaluationChecklist;
  paragraphs: ParagraphDrafts;
  onUpdateChecklist: (updated: Partial<SelfEvaluationChecklist>) => void;
  onOpenHint: () => void;
  onNextStage: () => void;
  onPrevStage: () => void;
}

export const Step5Tinjau: React.FC<Step5TinjauProps> = ({
  checklist,
  paragraphs,
  onUpdateChecklist,
  onOpenHint,
  onNextStage,
  onPrevStage,
}) => {
  const [showDraftPreview, setShowDraftPreview] = useState(false);

  const checklistItems: {
    key: keyof SelfEvaluationChecklist;
    label: string;
    subNote: string;
    example: string;
  }[] = [
    {
      key: 'check1_definisi',
      label: 'Apakah kalimat di paragraf pertama sudah memuat definisi atau pengenalan objek?',
      subNote: 'Menggunakan kata penghubung definisi (adalah, merupakan, yaitu) dan menyebutkan lokasi serta kelompok objek.',
      example: 'Contoh: "Objek ... merupakan sarana ... yang berlokasi di ..."',
    },
    {
      key: 'check2_rincianFisik',
      label: 'Apakah paragraf kedua berisi rincian fisik/kondisi objek secara jelas?',
      subNote: 'Memuat deskripsi bagian, warna, ukuran, komponen penyusun, bahan, dan kebersihan yang diamati langsung.',
      example: 'Contoh: Rincian bahan kayu jati, warna cat, dan kerapian buku/benda.',
    },
    {
      key: 'check3_fungsiManfaat',
      label: 'Apakah paragraf ketiga berisi fungsi/manfaat objek?',
      subNote: 'Menjelaskan kegunaan operasional bagi warga sekolah dan dampak positifnya jika dirawat.',
      example: 'Contoh: "Keberadaan objek ini berfungsi untuk ... dan bermanfaat bagi ..."',
    },
    {
      key: 'check4_kapitalTitikKoma',
      label: 'Apakah penggunaan huruf kapital dan tanda titik/koma sudah tepat?',
      subNote: 'Huruf besar di awal kalimat dan nama diri/lokasi. Tanda titik (.) di akhir tiap kalimat.',
      example: 'Contoh: "Pada hari Senin ...", "Selain itu, ..."',
    },
    {
      key: 'check5_penulisanDiTempat',
      label: 'Apakah penulisan kata depan \'di\' (yang menunjukkan tempat) sudah dipisah?',
      subNote: 'Kata depan tempat dipisah spasi (di sekolah, di ruangan). Awalan pasif digabung (dibersihkan, dirawat).',
      example: '✅ Benar: di perpustakaan, di lantai 2. ❌ Salah: diperpustakaan.',
    },
  ];

  // Count checked items
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isAllChecked = checkedCount === 5;

  return (
    <div className="max-w-md mx-auto px-4 py-3 sm:py-4 flex flex-col min-h-[calc(100vh-120px)] justify-between">
      {/* Top Status */}
      <div className="space-y-2 mb-2">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            Checklist Evaluasi Mandiri (PUEBI & Struktur)
          </span>
          <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
            {checkedCount}/5 Terpenuhi
          </span>
        </div>

        {/* Visual progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(checkedCount / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Checklist Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3.5 my-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Lembar Periksa Kualitas Teks
          </h2>
          <button
            type="button"
            onClick={onOpenHint}
            className="flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/70 px-2 py-1 rounded-md transition-colors"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            <span>Pedoman Ejaan</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          Bacalah kembali draf teksmu dan centang setiap pernyataan jika kamu sudah memenuhinya dengan teliti:
        </p>

        {/* 5 Checklist Items */}
        <div className="space-y-2">
          {checklistItems.map((item) => {
            const isChecked = Boolean(checklist[item.key]);
            return (
              <label
                key={item.key}
                className={`p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer select-none active:scale-99 ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50/50 text-slate-900'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) =>
                    onUpdateChecklist({ [item.key]: e.target.checked })
                  }
                  className="sr-only"
                />
                <div className="mt-0.5 shrink-0 text-emerald-600">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-xs font-semibold leading-snug">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {item.subNote}
                  </p>
                  <p className="text-[10px] text-indigo-700 font-mono bg-indigo-50/70 p-1 rounded inline-block">
                    {item.example}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Collapsible Quick Draft Preview */}
        <div className="border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setShowDraftPreview(!showDraftPreview)}
            className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              {showDraftPreview ? 'Sembunyikan Draf Paragraf' : 'Lihat Draf Paragraf Saat Ini'}
            </span>
            {showDraftPreview ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showDraftPreview && (
            <div className="mt-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 max-h-48 overflow-y-auto">
              <div>
                <span className="text-[10px] font-bold uppercase text-blue-700 block mb-0.5">
                  Paragraf 1 (Pernyataan Umum)
                </span>
                <p className="text-slate-800 italic leading-relaxed">
                  {paragraphs.pernyataanUmum || '(Belum diisi)'}
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-2">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-0.5">
                  Paragraf 2 (Deskripsi Bagian)
                </span>
                <p className="text-slate-800 italic leading-relaxed">
                  {paragraphs.deskripsiBagian || '(Belum diisi)'}
                </p>
              </div>
              <div className="border-t border-slate-200/60 pt-2">
                <span className="text-[10px] font-bold uppercase text-amber-700 block mb-0.5">
                  Paragraf 3 (Deskripsi Manfaat)
                </span>
                <p className="text-slate-800 italic leading-relaxed">
                  {paragraphs.deskripsiManfaat || '(Belum diisi)'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-3 pb-1 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrevStage}
          className="flex-1 h-11 px-3 bg-slate-100 hover:bg-slate-200 active:scale-98 text-slate-700 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tahap 4</span>
        </button>

        <button
          type="button"
          onClick={onNextStage}
          className={`flex-1 h-11 px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs ${
            isAllChecked
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-98'
          }`}
        >
          <span>Lihat Draf Akhir LHO</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
