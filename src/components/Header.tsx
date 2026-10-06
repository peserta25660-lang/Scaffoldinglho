import React from 'react';
import { Info, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenDeveloperInfo: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDeveloperInfo,
  onResetData,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-2xl mx-auto px-4 h-13 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900">
            Scaffolding LHO 5T
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-500 border-l border-slate-200 pl-2">
            Bahasa Indonesia Kelas X
          </span>
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenDeveloperInfo}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
            title="Informasi Pengembang & LPTK UPY"
          >
            <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Info Media</span>
          </button>

          <button
            onClick={onResetData}
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors whitespace-nowrap min-h-[36px]"
            title="Mulai Ulang Observasi Baru"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
