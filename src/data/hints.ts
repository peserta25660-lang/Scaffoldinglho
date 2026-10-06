export interface ScaffoldingHint {
  stage: number;
  title: string;
  subtitle: string;
  points: {
    title: string;
    description: string;
    examples?: string[];
  }[];
  neutralExampleLabel: string;
  neutralExampleTitle: string;
  neutralExampleItems: {
    questionLabel: string;
    sampleText: string;
  }[];
}

export const STAGE_HINTS: Record<number, ScaffoldingHint> = {
  1: {
    stage: 1,
    title: '💡 Bantuan: Menemukan & Menulis Data Mentah',
    subtitle: 'Catatlah fakta murni yang benar-benar kamu lihat dan temukan langsung di lapangan.',
    points: [
      {
        title: 'Fokus pada Fakta Nyata (Objektif)',
        description: 'Tuliskan apa yang kamu lihat, dengar, sentuh, atau hitung secara langsung. Hindari opini subjektif seperti "sangat indah sekali" atau "agak jelek".',
      },
      {
        title: 'Gunakan Kata Kunci & Catatan Ringkas',
        description: 'Di tahap ini, kamu belum perlu menulis kalimat panjang. Cukup tulis poin-poin data fakta yang akurat dan jelas.',
      },
      {
        title: 'Objek Pengamatan Nyata di Sekolah',
        description: 'Pilihlah satu objek nyata di sekolahmu (misal: Pojok Baca Kelas, Taman Depan UKS, Lapangan Basket, Laboratorium Komputer, Kantin Sehat, dll).',
      },
    ],
    neutralExampleLabel: 'Objek Pembanding Netral',
    neutralExampleTitle: 'Perpustakaan Utama Kampus / Sekolah',
    neutralExampleItems: [
      { questionLabel: 'Q1 (Nama Objek)', sampleText: 'Perpustakaan Utama UPY' },
      { questionLabel: 'Q2 (Lokasi Spesifik)', sampleText: 'Lantai 2 Gedung Pusat Pembelajaran UPY' },
      { questionLabel: 'Q3 (Kelompok/Klasifikasi)', sampleText: 'Fasilitas sarana literasi dan sumber belajar mandiri' },
      { questionLabel: 'Q4 (Komponen Utama)', sampleText: 'Rak buku bersaf, meja baca bersekat, komputer katalog, dan meja sirkulasi' },
      { questionLabel: 'Q5 (Warna, Bentuk, Ukuran)', sampleText: 'Berbentuk persegi panjang seluas 12x10 meter, dinding putih gading, rak cokelat' },
      { questionLabel: 'Q6 (Bahan/Material)', sampleText: 'Kayu jati perhutani, kaca jendela berbingkai aluminium, ubin granit' },
      { questionLabel: 'Q7 (Kondisi/Kebersihan)', sampleText: 'Sangat bersih, sirkulasi udara sejuk, buku tersusun rapi sesuai kode Dewey' },
      { questionLabel: 'Q8 (Pengguna)', sampleText: 'Siswa, mahasiswa praktikan, guru, dosen pembimbing, dan pustakawan' },
      { questionLabel: 'Q9 (Fungsi)', sampleText: 'Tempat membaca dan meminjam buku referensi pelajaran' },
      { questionLabel: 'Q10 (Manfaat/Dampak)', sampleText: 'Meningkatkan minat baca dan mendukung prestasi akademik' },
    ],
  },
  2: {
    stage: 2,
    title: '💡 Bantuan: Mengubah Catatan Menjadi Kalimat Utuh',
    subtitle: 'Gunakan pola kalimat baku Bahasa Indonesia yang efektif dengan Subjek, Predikat, dan Keterangan.',
    points: [
      {
        title: 'Pola Kalimat Definisi (Klasifikasi Umum)',
        description: 'Digunakan untuk mengenalkan objek dan kelompoknya menggunakan kata penghubung definisi (adalah, merupakan, yaitu, ialah).',
        examples: [
          'Pola: [Objek] + adalah / merupakan + [penjelasan kelompok / klasifikasi]',
          'Contoh: "Perpustakaan sekolah merupakan fasilitas sarana belajar bagi seluruh siswa."',
          'Contoh: "Laboratorium komputer adalah ruangan khusus yang digunakan untuk kegiatan praktikum teknologi informasi."',
        ],
      },
      {
        title: 'Pola Kalimat Deskripsi Ciri & Fisik',
        description: 'Digunakan untuk merinci ciri bentuk, warna, ukuran, komponen, dan bahan yang menyusun objek.',
        examples: [
          'Pola: [Objek/Bagian] + memiliki / berwarna / terbuat dari + [rincian fakta]',
          'Contoh: "Rak buku di perpustakaan terbuat dari kayu jati berwarna cokelat tua."',
          'Contoh: "Ruangan perpustakaan memiliki luas sekitar 120 meter persegi dan dilengkapi pendingin ruangan."',
        ],
      },
      {
        title: 'Pola Kalimat Fungsi & Manfaat',
        description: 'Digunakan untuk menjelaskan fungsi operasional dan manfaat jangka panjang objek.',
        examples: [
          'Pola: [Objek] + berfungsi sebagai / bermanfaat untuk + [kegiatan / dampak]',
          'Contoh: "Fasilitas ini berfungsi sebagai tempat membaca dan meminjam buku referensi bagi warga sekolah."',
          'Contoh: "Keberadaan perpustakaan bermanfaat untuk meningkatkan budaya literasi siswa."',
        ],
      },
    ],
    neutralExampleLabel: 'Pola Kalimat 10 Soal (Objek Pembanding Netral)',
    neutralExampleTitle: '10 Model Kalimat Perpustakaan Utama UPY',
    neutralExampleItems: [
      { questionLabel: 'Q1 (Nama Objek)', sampleText: 'Objek yang diobservasi dalam kegiatan pengamatan ini adalah Perpustakaan Utama UPY.' },
      { questionLabel: 'Q2 (Lokasi Spesifik)', sampleText: 'Perpustakaan ini terletak di lantai 2 Gedung Pusat Pembelajaran UPY.' },
      { questionLabel: 'Q3 (Kelompok Fasilitas)', sampleText: 'Perpustakaan tersebut merupakan salah satu sarana penunjang literasi dan sumber belajar mandiri bagi siswa.' },
      { questionLabel: 'Q4 (Komponen Penyusun)', sampleText: 'Bagian utama perpustakaan ini terdiri atas jajaran rak buku, meja baca bersekat, komputer katalog, dan meja sirkulasi peminjaman.' },
      { questionLabel: 'Q5 (Warna, Bentuk, Ukuran)', sampleText: 'Ruangan perpustakaan ini berbentuk persegi panjang seluas 12x10 meter dengan dinding bercat putih gading serta rak kayu cokelat.' },
      { questionLabel: 'Q6 (Bahan/Material)', sampleText: 'Meja dan rak buku di perpustakaan tersebut terbuat dari bahan kayu jati yang kokoh dengan jendela kaca berbingkai aluminium.' },
      { questionLabel: 'Q7 (Kondisi & Kebersihan)', sampleText: 'Berdasarkan pengamatan, kondisi ruangan perpustakaan tampak sangat bersih, lantai mengilap, dan buku tersusun rapi sesuai kode Dewey.' },
      { questionLabel: 'Q8 (Pengguna/Warga)', sampleText: 'Fasilitas ini sering dikunjungi oleh para siswa, mahasiswa praktikan, serta guru untuk mencari referensi buku pelajaran.' },
      { questionLabel: 'Q9 (Fungsi Utama)', sampleText: 'Fungsi utama dari perpustakaan ini adalah sebagai sarana membaca, mencari referensi karya ilmiah, dan meminjam buku paket pelajaran.' },
      { questionLabel: 'Q10 (Manfaat Positif)', sampleText: 'Keberadaan perpustakaan yang terawat dengan baik sangat bermanfaat untuk meningkatkan budaya literasi dan menunjang prestasi akademik.' },
    ],
  },
  3: {
    stage: 3,
    title: '💡 Bantuan: Menata Struktur Teks LHO',
    subtitle: 'Teks LHO memiliki 3 struktur baku. Tentukan kategori yang paling tepat untuk masing-masing kalimatmu.',
    points: [
      {
        title: '1. Pernyataan Umum (Klasifikasi / Definisi)',
        description: 'Kalimat pembuka yang mengenalkan objek pengamatan, lokasi keberadaannya, kelompok umum/kategori fasilitas, dan pengertian dasarnya (menggunakan kata adalah, merupakan, termasuk).',
        examples: [
          'Menyebutkan nama objek dan letak spesifiknya di sekolah.',
          'Mengelompokkan objek ke dalam jenis fasilitas atau sarana tertentu.',
          'Memberikan definisi umum mengenai objek yang diamati.',
        ],
      },
      {
        title: '2. Deskripsi Bagian (Ciri, Fisik, Material, Kondisi)',
        description: 'Kalimat yang memuat perincian mendalam mengenai bagian-bagian objek, warna, bentuk, ukuran, bahan material pembuat, kebersihan, serta warga yang menggunakannya.',
        examples: [
          'Menjelaskan komponen penyusun (misal: meja, kursi, atap, tiang).',
          'Menggambarkan ciri visual warna, bentuk fisik, dan dimensi ukuran.',
          'Menyebutkan bahan pembuat dan kondisi kerapian/kebersihan saat diamati.',
        ],
      },
      {
        title: '3. Deskripsi Manfaat (Fungsi, Kegunaan, Dampak Positif)',
        description: 'Kalimat yang memaparkan kegunaan praktis objek dalam kegiatan sekolah sehari-hari, fungsi spesifik, dan dampak positif jangka panjang bagi warga sekolah.',
        examples: [
          'Menjelaskan fungsi utama objek bagi kegiatan siswa atau guru.',
          'Menguraikan manfaat atau dampak positif jika dirawat secara optimal.',
        ],
      },
    ],
    neutralExampleLabel: 'Contoh Pemetaan Struktur',
    neutralExampleTitle: 'Pemetaan Kalimat Perpustakaan',
    neutralExampleItems: [
      { questionLabel: 'Pernyataan Umum', sampleText: '"Perpustakaan SMA 1 terletak di lantai dua dan merupakan pusat sarana literasi sekolah."' },
      { questionLabel: 'Deskripsi Bagian', sampleText: '"Rak buku terbuat dari kayu jati kokoh yang memuat ratusan buku dengan susunan rapi."' },
      { questionLabel: 'Deskripsi Manfaat', sampleText: '"Fasilitas ini sangat bermanfaat untuk meningkatkan wawasan dan prestasi belajar para siswa."' },
    ],
  },
  4: {
    stage: 4,
    title: '💡 Bantuan: Menggabungkan Kalimat Menjadi Paragraf',
    subtitle: 'Rangkai kalimat-kalimat yang sekelompok menjadi paragraf yang padu (kohesif dan koheren) menggunakan kata hubung / konjungsi.',
    points: [
      {
        title: 'Konjungsi Penambahan Informasi (Kelanjutan)',
        description: 'Gunakan kata hubung ini untuk menyambungkan rincian yang saling melengkapi.',
        examples: [
          'Selain itu, ...',
          'Di samping itu, ...',
          'Selanjutnya, ...',
          'Bukan hanya itu, melainkan juga...',
        ],
      },
      {
        title: 'Konjungsi Penjelasan Sebab, Akibat & Simpulan Manfaat',
        description: 'Gunakan kata hubung ini untuk menegaskan fungsi dan dampak positif objek.',
        examples: [
          'Oleh karena itu, ...',
          'Dengan demikian, ...',
          'Keberadaan objek ini berfungsi untuk...',
          'Sehingga kegiatan pembelajaran dapat berlangsung optimal.',
        ],
      },
      {
        title: 'Pertentangan / Kondisi Khusus',
        description: 'Gunakan jika membandingkan kondisi atau situasi tertentu.',
        examples: [
          'Meskipun demikian, ...',
          'Namun, seluruh pengunjung tetap mematuhi aturan...',
        ],
      },
    ],
    neutralExampleLabel: 'Contoh Rangkaian Paragraf',
    neutralExampleTitle: 'Model Penggabungan Paragraf Deskripsi Bagian',
    neutralExampleItems: [
      { questionLabel: 'Sebelum Digabung', sampleText: 'Kalimat 1: Ruang perpustakaan berukuran 120 meter persegi. Kalimat 2: Rak buku terbuat dari kayu jati. Kalimat 3: Lantai ruangan bersih.' },
      { questionLabel: 'Sesudah Dirangkai', sampleText: '"Ruang perpustakaan ini memiliki luas sekitar 120 meter persegi dengan dinding bercat putih. Selain itu, rak buku di dalamnya terbuat dari kayu jati yang kokoh. Di samping itu, kondisi lantainya senantiasa bersih dan terawat dengan rapi."' },
    ],
  },
  5: {
    stage: 5,
    title: '💡 Bantuan: Pedoman Pemeriksaan Mandiri (PUEBI/EYD)',
    subtitle: 'Periksa kembali ejaan, tanda baca, dan kelengkapan struktur teks LHO sebelum kamu menyalinnya ke buku tulis.',
    points: [
      {
        title: 'Aturan Penulisan Kata Depan "di" (Menunjukkan Tempat)',
        description: 'Kata depan "di" yang menunjukkan tempat HARUS ditulis terpisah dengan spasi. Berbeda dengan awalan "di-" pada kata kerja pasif yang digabung.',
        examples: [
          '✅ Benar (Tempat): di sekolah, di perpustakaan, di dalam kelas, di atas meja',
          '❌ Salah: disekolah, diperpustakaan, didalam kelas',
          '✅ Benar (Kata Kerja Pasif): dibersihkan, diletakkan, digunakan, dirawat',
        ],
      },
      {
        title: 'Huruf Kapital pada Awal Kalimat dan Nama Geografi/Lembaga',
        description: 'Huruf kapital dipakai pada awal kalimat, nama objek spesifik/resmi, dan nama lembaga atau kota.',
        examples: [
          'Contoh: Perpustakaan SMA Negeri 1 Yogyakarta, Laboratorium Biologi Gedung B.',
        ],
      },
      {
        title: 'Tanda Titik (.) dan Tanda Koma (,)',
        description: 'Akhiri setiap kalimat dengan tanda titik (.). Gunakan tanda koma sebelum konjungsi antarkalimat seperti "Selain itu, ...", "Oleh karena itu, ...", dan dalam perincian (meja, kursi, dan komputer).',
      },
    ],
    neutralExampleLabel: 'Pengingat Guru',
    neutralExampleTitle: 'Kerapian dan Kejujuran Akademik',
    neutralExampleItems: [
      { questionLabel: 'Integritas Belajar', sampleText: 'Draf ini adalah buah pemikiranmu sendiri. Saat menyalin ke buku tulis Bahasa Indonesia, gunakan tulisan tangan yang rapi dan teratur.' },
    ],
  },
};
