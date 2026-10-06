import React from 'react';
import { X, GraduationCap, User, BookOpen, School, Award, CheckCircle2 } from 'lucide-react';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="developer-modal-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2 text-slate-800">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 id="developer-modal-title" className="font-semibold text-sm tracking-tight text-slate-900">
              Identitas Pengembang & Media
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup informasi pengembang"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-700">
          <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-xl p-3.5 space-y-2.5">
            <div className="flex items-start gap-2.5">
              <User className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Nama Pengembang</p>
                <p className="font-semibold text-slate-900 text-sm">Wisnu Tri Cahyo</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Nomor Induk Mahasiswa (NIM)</p>
                <p className="font-medium text-slate-800 font-mono">25248610027</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Program Studi</p>
                <p className="font-medium text-slate-800">PPG Bahasa Indonesia</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <School className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-medium text-slate-500">Lembaga Pendidikan Tenaga Kependidikan (LPTK)</p>
                <p className="font-semibold text-slate-900">Universitas PGRI Yogyakarta (UPY)</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-slate-800 text-[13px] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Tujuan & Prinsip Scaffolding 5T
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Media digital interaktif ini dirancang sebagai panduan kognitif mikro (<em>scaffolding</em>) bagi siswa Kelas X SMA/SMK dalam menyusun Teks Laporan Hasil Observasi (LHO) berdasarkan pengamatan autentik di lingkungan sekolah.
            </p>
            <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-slate-600 space-y-1">
              <p><strong>Alur 5T:</strong></p>
              <p>1. <strong>Temukan Data</strong> (10 Fakta Lapangan)</p>
              <p>2. <strong>Tulis Kalimat</strong> (Pola Kalimat Baku)</p>
              <p>3. <strong>Tata Struktur</strong> (Analisis 3 Struktur LHO)</p>
              <p>4. <strong>Tulis Teks</strong> (Rangkai 3 Paragraf Padu)</p>
              <p>5. <strong>Tinjau</strong> (Evaluasi Ejaan & PUEBI)</p>
            </div>
            <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200/60 rounded-lg p-2 leading-normal">
              <strong>Integritas PTK:</strong> Seluruh draf dikonstruksi secara mandiri oleh siswa dan wajib disalin kembali dengan tulisan tangan ke Buku Tulis Bahasa Indonesia.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 active:scale-98 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
