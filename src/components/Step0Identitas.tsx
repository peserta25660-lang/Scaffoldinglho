import React, { useState } from 'react';
import { StudentIdentity } from '../types';
import { User, School, Hash, MapPin, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface Step0IdentitasProps {
  identity: StudentIdentity;
  onUpdateIdentity: (updated: Partial<StudentIdentity>) => void;
  onNext: () => void;
}

export const Step0Identitas: React.FC<Step0IdentitasProps> = ({
  identity,
  onUpdateIdentity,
  onNext,
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.fullName.trim()) {
      setErrorMsg('Mohon isi Nama Lengkap siswa terlebih dahulu.');
      return;
    }
    if (!identity.className.trim()) {
      setErrorMsg('Mohon isi Kelas kamu (misal: X-1 atau X TKJ 2).');
      return;
    }
    if (!identity.observationLocation.trim()) {
      setErrorMsg('Mohon tentukan Lokasi Spesifik Pengamatan di sekolah.');
      return;
    }
    setErrorMsg('');
    onNext();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 sm:py-6">
      {/* Intro Hero Box */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 mb-5 text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white mb-2 shadow-xs">
          <BookOpen className="w-5 h-5" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Web Scaffolding LHO 5T
        </h2>
        <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto leading-relaxed">
          Panduan interaktif menyusun Teks Laporan Hasil Observasi dari pengamatan langsung di sekolah melalui 5 langkah terstruktur.
        </p>
        <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-indigo-700 bg-white/80 px-2.5 py-1 rounded-full border border-indigo-200/50">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Bahasa Indonesia Kelas X SMA/SMK</span>
        </div>
      </div>

      {/* Main Identity Form */}
      <form onSubmit={handleStart} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3.5">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Form Identitas Pengamat
          </h3>
          <p className="text-[11px] text-slate-500">
            Lengkapi data diri dan lokasi sebelum memulai pengamatan lapangan.
          </p>
        </div>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Nama Lengkap */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-600" />
            Nama Lengkap Siswa <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={identity.fullName}
            onChange={(e) => onUpdateIdentity({ fullName: e.target.value })}
            placeholder="Contoh: Muhammad Rayhan Pratama"
            className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
          />
        </div>

        {/* Kelas & No Presensi */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-indigo-600" />
              Kelas <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={identity.className}
              onChange={(e) => onUpdateIdentity({ className: e.target.value })}
              placeholder="Contoh: X MIPA 2 / X TKJ 1"
              className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-indigo-600" />
              No. Presensi
            </label>
            <input
              type="text"
              value={identity.attendanceNumber}
              onChange={(e) => onUpdateIdentity({ attendanceNumber: e.target.value })}
              placeholder="Contoh: 18"
              className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
            />
          </div>
        </div>

        {/* Lokasi Spesifik Pengamatan */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-600" />
            Lokasi Spesifik Pengamatan di Sekolah <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={identity.observationLocation}
            onChange={(e) => onUpdateIdentity({ observationLocation: e.target.value })}
            placeholder="Contoh: Pojok Baca Kelas X-A / Taman Depan UKS"
            className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
          />
          <p className="text-[10px] text-slate-500">
            Pastikan objek berada di lingkungan sekolah yang bisa kamu amati langsung hari ini.
          </p>
        </div>

        {/* Waktu Pengamatan */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            Waktu / Tanggal Pengamatan
          </label>
          <input
            type="text"
            value={identity.observationTime}
            onChange={(e) => onUpdateIdentity({ observationTime: e.target.value })}
            placeholder="Contoh: Senin, 06 Oktober 2026 - Pukul 09.30 WIB"
            className="w-full h-11 px-3 text-xs sm:text-sm bg-slate-50/70 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
          />
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span>Mulai Pengamatan (Tahap 1: Temukan Data)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Brief Flow Guide */}
      <div className="mt-4 px-1 text-center">
        <p className="text-[11px] text-slate-600">
          Alur 5T: <strong>Temukan Data</strong> → <strong>Tulis Kalimat</strong> → <strong>Tata Struktur</strong> → <strong>Tulis Teks</strong> → <strong>Tinjau</strong>
        </p>
      </div>
    </div>
  );
};
