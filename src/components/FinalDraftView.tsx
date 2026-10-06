import React, { useState } from 'react';
import { StudentIdentity, ParagraphDrafts } from '../types';
import { Copy, Check, Printer, Edit3, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

interface FinalDraftViewProps {
  identity: StudentIdentity;
  paragraphs: ParagraphDrafts;
  onEditStage: (stage: number) => void;
}

export const FinalDraftView: React.FC<FinalDraftViewProps> = ({
  identity,
  paragraphs,
  onEditStage,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSizeLarge, setFontSizeLarge] = useState(false);

  // Generate plain text copy matching the exact required format
  const generateFormattedText = () => {
    return `==================================================
LEMBAR DRAF TEKS LAPORAN HASIL OBSERVASI

Identitas Penulis
Nama             : ${identity.fullName || '-'}
Kelas            : ${identity.className || '-'}
No. Presensi     : ${identity.attendanceNumber || '-'}
Lokasi Pengamatan: ${identity.observationLocation || '-'}
Waktu Pengamatan : ${identity.observationTime || '-'}
--------------------------------------------------
[Paragraf 1 - Pernyataan Umum]
${paragraphs.pernyataanUmum || '(Belum terisi)'}

[Paragraf 2 - Deskripsi Bagian]
${paragraphs.deskripsiBagian || '(Belum terisi)'}

[Paragraf 3 - Deskripsi Manfaat]
${paragraphs.deskripsiManfaat || '(Belum terisi)'}
==================================================`;
  };

  const handleCopy = async () => {
    const textToCopy = generateFormattedText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      }
    } catch {
      // Continue to fallback
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-4 sm:py-6 space-y-4">
      {/* 📌 Teacher Closing Instruction Banner */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5 print:hidden">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-amber-950 flex items-center gap-1.5">
              <span>📌 INSTRUKSI PENUTUP UNTUK SISWA</span>
            </h2>
            <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed font-medium">
              "Selamat! Draf Teks LHO milikmu sudah selesai dan terstruktur dengan baik.
            </p>
            <p className="text-xs sm:text-sm text-amber-950 mt-1.5 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-amber-200 font-semibold">
              Langkah Terakhir: <span className="underline decoration-amber-600 decoration-2">Buka Buku Tulis Bahasa Indonesia milikmu</span>, lalu <span className="underline decoration-amber-600 decoration-2">salin dan tuliskan kembali</span> draf Teks LHO di bawah secara manual dengan tulisan yang rapi!
            </p>
            <p className="text-[11px] text-amber-800 mt-1.5 italic">
              Pastikan kamu memperhatikan ejaan dan tanda baca dengan teliti saat menyalin.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs print:hidden">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Draf'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 transition-colors"
            title="Cetak atau Simpan PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden xs:inline">Cetak / PDF</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setFontSizeLarge(!fontSizeLarge)}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Perbesar huruf untuk memudahkan menyalin ke buku"
          >
            {fontSizeLarge ? 'Teks Sedang' : 'Perbesar Teks'}
          </button>

          <button
            type="button"
            onClick={() => onEditStage(4)}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center gap-1 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>
        </div>
      </div>

      {/* Main Document Paper for Student LHO Text */}
      <div 
        id="printable-lho-sheet"
        className="bg-white border-2 border-slate-300 rounded-2xl p-5 sm:p-7 shadow-xs font-sans print:border-none print:shadow-none print:p-0 space-y-5"
      >
        {/* Document Header */}
        <div className="text-center border-b-2 border-slate-900 pb-3 space-y-1">
          <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900">
            LEMBAR DRAF TEKS LAPORAN HASIL OBSERVASI
          </h1>
          <p className="text-[11px] text-slate-600 tracking-tight">
            Media Pembelajaran Bahasa Indonesia Kelas X SMA/SMK · Alur Scaffolding 5T
          </p>
        </div>

        {/* Identitas Penulis */}
        <div className="space-y-1 text-xs sm:text-sm font-mono border-b border-dashed border-slate-300 pb-4 text-slate-800">
          <p className="font-bold font-sans text-xs uppercase tracking-wider text-slate-500 mb-1">
            Identitas Penulis
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-xs">
            <div>
              <span className="text-slate-500 inline-block w-32 font-sans">Nama</span>
              <span className="font-semibold text-slate-900">: {identity.fullName || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 inline-block w-32 font-sans">Kelas</span>
              <span className="font-semibold text-slate-900">: {identity.className || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 inline-block w-32 font-sans">No. Presensi</span>
              <span className="font-semibold text-slate-900">: {identity.attendanceNumber || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 inline-block w-32 font-sans">Lokasi Pengamatan</span>
              <span className="font-semibold text-slate-900">: {identity.observationLocation || '-'}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500 inline-block w-32 font-sans">Waktu Pengamatan</span>
              <span className="font-semibold text-slate-900">: {identity.observationTime || '-'}</span>
            </div>
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className={`space-y-5 ${fontSizeLarge ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}`}>
          {/* Paragraf 1: Pernyataan Umum */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Paragraf 1 — Pernyataan Umum
              </span>
              <button
                type="button"
                onClick={() => onEditStage(4)}
                className="text-[10px] text-slate-400 hover:text-slate-600 print:hidden"
              >
                Ubah Paragraf
              </button>
            </div>
            <p className="text-slate-900 leading-relaxed text-justify indent-8 bg-slate-50/50 p-3 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
              {paragraphs.pernyataanUmum || '(Paragraf 1 belum ditulis)'}
            </p>
          </div>

          {/* Paragraf 2: Deskripsi Bagian */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Paragraf 2 — Deskripsi Bagian
              </span>
              <button
                type="button"
                onClick={() => onEditStage(4)}
                className="text-[10px] text-slate-400 hover:text-slate-600 print:hidden"
              >
                Ubah Paragraf
              </button>
            </div>
            <p className="text-slate-900 leading-relaxed text-justify indent-8 bg-slate-50/50 p-3 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
              {paragraphs.deskripsiBagian || '(Paragraf 2 belum ditulis)'}
            </p>
          </div>

          {/* Paragraf 3: Deskripsi Manfaat */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Paragraf 3 — Deskripsi Manfaat
              </span>
              <button
                type="button"
                onClick={() => onEditStage(4)}
                className="text-[10px] text-slate-400 hover:text-slate-600 print:hidden"
              >
                Ubah Paragraf
              </button>
            </div>
            <p className="text-slate-900 leading-relaxed text-justify indent-8 bg-slate-50/50 p-3 rounded-xl border border-slate-100 print:bg-white print:border-none print:p-0">
              {paragraphs.deskripsiManfaat || '(Paragraf 3 belum ditulis)'}
            </p>
          </div>
        </div>

        {/* Footer in printout */}
        <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Pengembang: Wisnu Tri Cahyo (PPG Bahasa Indonesia UPY)</span>
          <span>PTK Scaffolding LHO 5T</span>
        </div>
      </div>

      {/* Quick Edit Stage Selectors */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 print:hidden space-y-2">
        <p className="text-xs font-semibold text-slate-700">
          Ingin memperbaiki bagian tertentu?
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => onEditStage(1)}
            className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 text-slate-700 font-medium transition-colors"
          >
            Edit Tahap 1 (Data)
          </button>
          <button
            type="button"
            onClick={() => onEditStage(2)}
            className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 text-slate-700 font-medium transition-colors"
          >
            Edit Tahap 2 (Kalimat)
          </button>
          <button
            type="button"
            onClick={() => onEditStage(3)}
            className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 text-slate-700 font-medium transition-colors"
          >
            Edit Tahap 3 (Struktur)
          </button>
          <button
            type="button"
            onClick={() => onEditStage(4)}
            className="p-1.5 bg-white border border-slate-200 rounded-lg hover:border-indigo-400 text-slate-700 font-medium transition-colors"
          >
            Edit Tahap 4 (Paragraf)
          </button>
        </div>
      </div>
    </div>
  );
};
