export type TextStructure = 'Pernyataan Umum' | 'Deskripsi Bagian' | 'Deskripsi Manfaat';

export interface StudentIdentity {
  fullName: string;
  className: string;
  attendanceNumber: string;
  observationLocation: string;
  observationTime: string;
}

export interface RawObservation {
  id: number;
  question: string;
  shortAnswer: string;
}

export interface SentenceItem {
  id: number;
  rawQuestion: string;
  rawAnswer: string;
  fullSentence: string;
  structure: TextStructure | '';
}

export interface ParagraphDrafts {
  pernyataanUmum: string;
  deskripsiBagian: string;
  deskripsiManfaat: string;
}

export interface SelfEvaluationChecklist {
  check1_definisi: boolean;
  check2_rincianFisik: boolean;
  check3_fungsiManfaat: boolean;
  check4_kapitalTitikKoma: boolean;
  check5_penulisanDiTempat: boolean;
}

export interface ScaffoldingAppState {
  currentStage: number; // 0 = Identitas, 1 = Temukan Data, 2 = Tulis Kalimat, 3 = Tata Struktur, 4 = Tulis Teks, 5 = Tinjau, 6 = Lembar Draf Akhir
  identity: StudentIdentity;
  rawAnswers: string[]; // 10 answers
  sentences: string[]; // 10 full sentences
  structures: (TextStructure | '')[]; // 10 structure tags
  paragraphs: ParagraphDrafts;
  checklist: SelfEvaluationChecklist;
}
