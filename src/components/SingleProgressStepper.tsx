import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SingleProgressStepperProps {
  currentStage: number; // 0..6
  onOpenHint?: () => void;
  showHintButton?: boolean;
}

export const STAGE_TITLES: Record<number, { title: string; subtitle: string; percent: number }> = {
  0: { title: 'Tahap 0: Identitas Pengamatan', subtitle: 'Data Diri Siswa & Objek', percent: 0 },
  1: { title: 'Tahap 1 dari 5: Temukan Data', subtitle: '10 Catatan Faktual Mentah', percent: 20 },
  2: { title: 'Tahap 2 dari 5: Tulis Kalimat', subtitle: 'Mengubah Catatan Jadi Kalimat Baku', percent: 40 },
  3: { title: 'Tahap 3 dari 5: Tata Struktur', subtitle: 'Analisis Kategori Struktur LHO', percent: 60 },
  4: { title: 'Tahap 4 dari 5: Tulis Teks', subtitle: 'Menggabungkan 3 Paragraf Utuh', percent: 80 },
  5: { title: 'Tahap 5 dari 5: Tinjau & Evaluasi', subtitle: 'Checklist Mandiri Ejaan & PUEBI', percent: 95 },
  6: { title: 'Selesai: Lembar Draf Akhir LHO', subtitle: 'Draf Siap Disalin ke Buku Tulis', percent: 100 },
};

export const SingleProgressStepper: React.FC<SingleProgressStepperProps> = ({
  currentStage,
  onOpenHint,
  showHintButton = true,
}) => {
  const stageInfo = STAGE_TITLES[currentStage] || STAGE_TITLES[0];

  return (
    <div className="bg-white border-b border-slate-200/80 px-4 py-2.5">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="min-w-0 flex-1">
            <h1 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
              {stageInfo.title}
            </h1>
            <p className="text-[11px] text-slate-500 truncate">
              {stageInfo.subtitle}
            </p>
          </div>

          {showHintButton && onOpenHint && currentStage >= 1 && currentStage <= 5 && (
            <button
              onClick={onOpenHint}
              className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-amber-800 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/70 rounded-md transition-colors shrink-0"
              title="Lihat Bantuan dan Contoh Model"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>Bantuan</span>
            </button>
          )}
        </div>

        {/* Clean, single progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${stageInfo.percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
