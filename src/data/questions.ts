export interface SentenceGuide {
  formula: string;
  formulaPieces: string[];
  starterKeywords: string[];
  exampleSentence: string;
  spellingNote: string;
}

export interface ObservationQuestion {
  id: number;
  question: string;
  shortLabel: string;
  placeholder: string;
  neutralExample: string;
  focusHint: string;
  sentenceGuide: SentenceGuide;
}

export const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    id: 1,
    shortLabel: 'Nama Objek',
    question: '1. Apa nama objek yang kamu amati hari ini?',
    placeholder: 'Contoh: Nama fasilitas, ruangan, tanaman, atau benda...',
    neutralExample: 'Perpustakaan Utama UPY',
    focusHint: 'Sebutkan nama jelas objek spesifik yang berada di lingkungan sekolahmu.',
    sentenceGuide: {
      formula: '[Objek yang diamati] + adalah/merupakan + [Nama Objek Lengkap].',
      formulaPieces: ['Objek yang diamati dalam kegiatan ini', 'adalah / merupakan', '[Nama Objek di Sekolahmu]'],
      starterKeywords: ['Objek yang diamati adalah', 'Fasilitas yang diobservasi merupakan', 'Fokus pengamatan kali ini yaitu'],
      exampleSentence: 'Objek yang diobservasi dalam kegiatan pengamatan ini adalah Perpustakaan Utama UPY.',
      spellingNote: 'Gunakan huruf kapital pada huruf pertama nama objek khusus/resmi (misal: Pojok Baca Kelas X-A, Laboratorium Biologi).',
    },
  },
  {
    id: 2,
    shortLabel: 'Lokasi Objek',
    question: '2. Di lokasi mana tepatnya objek tersebut berada?',
    placeholder: 'Contoh: Di lantai 2 sayap barat, di samping laboratorium...',
    neutralExample: 'Lantai 2 Gedung Pusat Pembelajaran UPY',
    focusHint: 'Jelaskan letak persis objek tersebut agar pembaca tahu posisinya.',
    sentenceGuide: {
      formula: '[Nama Objek] + terletak di / berada di + [Lokasi Spesifik di Sekolah].',
      formulaPieces: ['[Nama Objek]', 'terletak di / berada tepat di', '[Lokasi di Lingkungan Sekolah]'],
      starterKeywords: ['terletak di', 'berada tepat di', 'berlokasi di lantai', 'bersebelahan dengan gedung'],
      exampleSentence: 'Perpustakaan ini terletak di lantai 2 Gedung Pusat Pembelajaran UPY.',
      spellingNote: 'Kata depan "di" yang menunjukkan tempat WAJIB dipisah spasi (contoh: di lantai dua, di sebelah barat, BUKAN dilantai atau disebelah).',
    },
  },
  {
    id: 3,
    shortLabel: 'Kelompok/Jenis',
    question: '3. Objek tersebut masuk dalam kelompok/jenis fasilitas apa di sekolah?',
    placeholder: 'Contoh: Sarana olahraga, ruang belajar, fasilitas sanitasi...',
    neutralExample: 'Fasilitas sarana literasi dan sumber belajar mandiri',
    focusHint: 'Kategorisasikan objek ke dalam klasifikasi umum yang lebih luas.',
    sentenceGuide: {
      formula: '[Nama Objek] + merupakan salah satu jenis / termasuk ke dalam kelompok + [Kategori Fasilitas].',
      formulaPieces: ['[Nama Objek]', 'merupakan salah satu / termasuk jenis', '[Kelompok / Jenis Fasilitas Sekolah]'],
      starterKeywords: ['merupakan salah satu', 'termasuk ke dalam kategori', 'tergolong sebagai fasilitas'],
      exampleSentence: 'Perpustakaan tersebut merupakan salah satu sarana penunjang literasi dan sumber belajar mandiri bagi siswa.',
      spellingNote: 'Pilih salah satu kata penghubung definisi yang baku: "merupakan" atau "adalah". Jangan menggabungkan kata seperti "adalah merupakan" atau "yaitu adalah".',
    },
  },
  {
    id: 4,
    shortLabel: 'Komponen Utama',
    question: '4. Bagian-bagian atau komponen utama apa saja yang menyusun objek tersebut?',
    placeholder: 'Contoh: Terdiri atas tiang penyangga, atap seng, bangku panjang...',
    neutralExample: 'Rak buku bersaf, meja baca bersekat, komputer katalog digital, dan meja sirkulasi peminjaman',
    focusHint: 'Amati bagian-bagian pokok yang membentuk keutuhan objek tersebut.',
    sentenceGuide: {
      formula: 'Bagian utama yang menyusun [Objek] + terdiri atas / meliputi + [Komponen 1, Komponen 2, dan Komponen 3].',
      formulaPieces: ['Bagian utama objek ini', 'terdiri atas / meliputi', '[Daftar komponen-komponen penyusun]'],
      starterKeywords: ['terdiri atas', 'meliputi beberapa bagian seperti', 'dilengkapi dengan komponen', 'tersusun dari'],
      exampleSentence: 'Bagian utama perpustakaan ini terdiri atas jajaran rak buku, meja baca bersekat, komputer katalog, dan meja sirkulasi peminjaman.',
      spellingNote: 'Gunakan kata baku "terdiri atas" (bukan "terdiri dari"). Gunakan tanda koma (,) sebelum kata "dan" pada perincian lebih dari dua item.',
    },
  },
  {
    id: 5,
    shortLabel: 'Warna, Bentuk, Ukuran',
    question: '5. Bagaimana warna, bentuk, atau ukuran objek tersebut secara detail?',
    placeholder: 'Contoh: Berbentuk persegi panjang sekitar 8x6 meter, didominasi warna hijau...',
    neutralExample: 'Ruangan berbentuk persegi panjang seluas 12x10 meter, dinding bercat putih gading, dan rak kayu berwarna cokelat',
    focusHint: 'Fokus pada ciri tampak visual indrawi yang kamu lihat langsung.',
    sentenceGuide: {
      formula: '[Objek] + berbentuk + [Bentuk Fisik] + dengan ukuran + [Dimensi/Luas] + serta didominasi warna + [Warna].',
      formulaPieces: ['[Objek/Bagian]', 'memiliki bentuk ... dengan ukuran sekitar', 'serta didominasi warna ...'],
      starterKeywords: ['berbentuk', 'berukuran sekitar', 'memiliki luas sekitar', 'didominasi oleh warna', 'bercat'],
      exampleSentence: 'Ruangan perpustakaan ini berbentuk persegi panjang seluas 12x10 meter dengan dinding bercat putih gading serta rak kayu berwarna cokelat.',
      spellingNote: 'Tuliskan angka ukuran dengan satuan baku (misal: meter persegi). Hindari kata opini seperti "warna yang sangat cantik", gunakan nama warna objektif.',
    },
  },
  {
    id: 6,
    shortLabel: 'Bahan/Material',
    question: '6. Dari bahan atau material apa objek tersebut dibuat?',
    placeholder: 'Contoh: Terbuat dari semen cor, kayu jati, aluminium, kaca...',
    neutralExample: 'Bahan kayu jati perhutani, kaca jendela berbingkai aluminium, dan ubin granit abu-abu',
    focusHint: 'Perhatikan zat pembentuk atau material fisik penyusunnya.',
    sentenceGuide: {
      formula: 'Sebagian besar bagian [Objek] + terbuat dari bahan / dibuat menggunakan material + [Nama Material].',
      formulaPieces: ['Sebagian besar bagian objek', 'terbuat dari bahan / menggunakan material', '[Nama-nama material penyusun]'],
      starterKeywords: ['terbuat dari bahan', 'dibuat menggunakan material', 'memanfaatkan bahan kokoh seperti', 'dilapisi oleh'],
      exampleSentence: 'Meja dan rak buku di perpustakaan tersebut terbuat dari bahan kayu jati yang kokoh dengan jendela kaca berbingkai aluminium.',
      spellingNote: 'Kata kerja pasif seperti "terbuat", "dibuat", dan "dilapisi" ditulis serangkai/gabung (tidak dipisah spasi).',
    },
  },
  {
    id: 7,
    shortLabel: 'Kondisi & Kebersihan',
    question: '7. Bagaimana tingkat kebersihan, kerapian, atau kondisi fisik objek saat diamati?',
    placeholder: 'Contoh: Sangat bersih, tertata rapi, cat dinding terawat tanpa coretan...',
    neutralExample: 'Kondisi ruangan sangat bersih, lantai mengilap, dan buku tersusun rapi sesuai kode nomor klasifikasi',
    focusHint: 'Tuliskan fakta objektif mengenai kerapian atau perawatannya saat ini.',
    sentenceGuide: {
      formula: 'Berdasarkan pengamatan, kondisi fisik [Objek] + tampak sangat bersih / tertata dengan rapi + [Rincian Kondisi].',
      formulaPieces: ['Berdasarkan hasil pengamatan', 'kondisi fisik objek tampak sangat bersih dan terawat', '[Rincian kerapian saat diamati]'],
      starterKeywords: ['tampak sangat bersih', 'senantiasa terawat', 'tersusun dengan rapi', 'dalam kondisi baik dan tertata'],
      exampleSentence: 'Berdasarkan pengamatan, kondisi ruangan perpustakaan tampak sangat bersih, lantai mengilap, dan buku tersusun rapi sesuai kode nomor klasifikasi.',
      spellingNote: 'Sertakan fakta yang bisa diverifikasi indra, seperti "lantai bebas dari sampah", "tersusun rapi", atau "dinding bersih tanpa noda coretan".',
    },
  },
  {
    id: 8,
    shortLabel: 'Pengguna/Warga Sekolah',
    question: '8. Siapa saja warga sekolah yang menggunakan atau berada di sekitar objek tersebut?',
    placeholder: 'Contoh: Siswa kelas X-XII, guru mata pelajaran, penjaga kantin...',
    neutralExample: 'Siswa, mahasiswa praktikan, guru, dosen pembimbing, dan pustakawan sekolah',
    focusHint: 'Catat subjek warga sekolah yang beraktivitas dengan objek tersebut.',
    sentenceGuide: {
      formula: 'Fasilitas ini biasa digunakan atau dikunjungi oleh + [Warga Sekolah] + untuk + [Kegiatan/Keperluan].',
      formulaPieces: ['Fasilitas ini', 'biasa digunakan / sering dikunjungi oleh', '[Daftar warga sekolah yang memanfaatkan]'],
      starterKeywords: ['biasa dimanfaatkan oleh', 'sering dikunjungi oleh', 'digunakan oleh para siswa dan guru', 'terbuka untuk seluruh warga sekolah'],
      exampleSentence: 'Fasilitas ini sering dikunjungi oleh para siswa, mahasiswa praktikan, serta guru untuk mencari referensi buku pelajaran.',
      spellingNote: 'Gunakan sebutan baku: "siswa" (bukan anak-anak/murid), "guru", "tenaga kependidikan", dan "petugas perpustakaan/kebersihan".',
    },
  },
  {
    id: 9,
    shortLabel: 'Fungsi Utama',
    question: '9. Apa fungsi atau kegunaan utama objek tersebut dalam kegiatan sekolah?',
    placeholder: 'Contoh: Sebagai sarana mencuci tangan sebelum makan, tempat diskusi kelompok...',
    neutralExample: 'Tempat membaca, mencari referensi karya ilmiah, dan meminjam buku paket pelajaran',
    focusHint: 'Apa tujuan utama pengadaan atau pemanfaatan objek tersebut?',
    sentenceGuide: {
      formula: 'Fungsi utama dari [Objek] ini adalah sebagai + [Kegunaan Utama] + di lingkungan sekolah.',
      formulaPieces: ['Fungsi utama dari objek ini', 'adalah sebagai sarana / tempat untuk', '[Kegiatan operasional utama]'],
      starterKeywords: ['berfungsi sebagai tempat untuk', 'memiliki fungsi utama sebagai sarana', 'dimanfaatkan sebagai tempat'],
      exampleSentence: 'Fungsi utama dari perpustakaan ini adalah sebagai sarana membaca, mencari referensi karya ilmiah, dan meminjam buku paket pelajaran.',
      spellingNote: 'Gunakan frasa verba yang baku: "sebagai sarana membaca dan berdiskusi" (bukan "buat tempat baca-baca").',
    },
  },
  {
    id: 10,
    shortLabel: 'Manfaat Positif',
    question: '10. Apa manfaat positif atau dampaknya jika objek tersebut dirawat dengan baik?',
    placeholder: 'Contoh: Menjaga kesehatan siswa, mendukung kelancaran pembelajaran...',
    neutralExample: 'Meningkatkan budaya gemar membaca, memperluas wawasan keilmuan, dan menunjang prestasi akademik sekolah',
    focusHint: 'Dampak nyata atau faedah jangka panjang bagi lingkungan sekolah.',
    sentenceGuide: {
      formula: 'Keberadaan [Objek] yang terawat dengan baik + sangat bermanfaat untuk + [Dampak Positif Jangka Panjang].',
      formulaPieces: ['Keberadaan objek ini yang terawat', 'sangat bermanfaat untuk mendukung / meningkatkan', '[Dampak positif bagi sekolah]'],
      starterKeywords: ['sangat bermanfaat untuk', 'berdampak positif terhadap', 'mendukung terciptanya', 'memberikan faedah dalam'],
      exampleSentence: 'Keberadaan perpustakaan yang terawat dengan baik sangat bermanfaat untuk meningkatkan budaya literasi dan menunjang prestasi akademik seluruh siswa.',
      spellingNote: 'Pilihlah kata kerja formal berdampak positif seperti "meningkatkan", "menunjang", "menciptakan", dan "memperlancar".',
    },
  },
];

