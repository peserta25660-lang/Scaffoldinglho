import React, { useState, useEffect } from 'react';
import {
  ScaffoldingAppState,
  StudentIdentity,
  TextStructure,
  ParagraphDrafts,
  SelfEvaluationChecklist,
} from './types';
import { Header } from './components/Header';
import { SingleProgressStepper } from './components/SingleProgressStepper';
import { Step0Identitas } from './components/Step0Identitas';
import { Step1TemukanData } from './components/Step1TemukanData';
import { Step2TulisKalimat } from './components/Step2TulisKalimat';
import { Step3TataStruktur } from './components/Step3TataStruktur';
import { Step4TulisTeks } from './components/Step4TulisTeks';
import { Step5Tinjau } from './components/Step5Tinjau';
import { FinalDraftView } from './components/FinalDraftView';
import { HintModal } from './components/HintModal';
import { DeveloperModal } from './components/DeveloperModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';

const STORAGE_KEY = 'scaffolding_lho_5t_data_v1';

const getInitialState = (): ScaffoldingAppState => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.currentStage === 'number') {
        return parsed;
      }
    }
  } catch {
    // ignore parse error and use default
  }

  // Current formatted date/time for default
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    currentStage: 0,
    identity: {
      fullName: '',
      className: '',
      attendanceNumber: '',
      observationLocation: '',
      observationTime: dateStr,
    },
    rawAnswers: Array(10).fill(''),
    sentences: Array(10).fill(''),
    structures: Array(10).fill(''),
    paragraphs: {
      pernyataanUmum: '',
      deskripsiBagian: '',
      deskripsiManfaat: '',
    },
    checklist: {
      check1_definisi: false,
      check2_rincianFisik: false,
      check3_fungsiManfaat: false,
      check4_kapitalTitikKoma: false,
      check5_penulisanDiTempat: false,
    },
  };
};

export default function App() {
  const [appState, setAppState] = useState<ScaffoldingAppState>(getInitialState);
  const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [hintActiveQuestionId, setHintActiveQuestionId] = useState<number | undefined>(undefined);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch {
      // storage error fallback
    }
  }, [appState]);

  // Stage setters
  const goToStage = (stage: number) => {
    setAppState((prev) => ({ ...prev, currentStage: stage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Updaters
  const handleUpdateIdentity = (updated: Partial<StudentIdentity>) => {
    setAppState((prev) => ({
      ...prev,
      identity: { ...prev.identity, ...updated },
    }));
  };

  const handleUpdateRawAnswer = (index: number, value: string) => {
    setAppState((prev) => {
      const newAnswers = [...prev.rawAnswers];
      newAnswers[index] = value;
      return { ...prev, rawAnswers: newAnswers };
    });
  };

  const handleUpdateSentence = (index: number, value: string) => {
    setAppState((prev) => {
      const newSentences = [...prev.sentences];
      newSentences[index] = value;
      return { ...prev, sentences: newSentences };
    });
  };

  const handleUpdateStructure = (index: number, value: TextStructure) => {
    setAppState((prev) => {
      const newStructures = [...prev.structures];
      newStructures[index] = value;
      return { ...prev, structures: newStructures };
    });
  };

  const handleUpdateParagraphs = (updated: Partial<ParagraphDrafts>) => {
    setAppState((prev) => ({
      ...prev,
      paragraphs: { ...prev.paragraphs, ...updated },
    }));
  };

  const handleUpdateChecklist = (updated: Partial<SelfEvaluationChecklist>) => {
    setAppState((prev) => ({
      ...prev,
      checklist: { ...prev.checklist, ...updated },
    }));
  };

  const handleResetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    setAppState({
      currentStage: 0,
      identity: {
        fullName: '',
        className: '',
        attendanceNumber: '',
        observationLocation: '',
        observationTime: dateStr,
      },
      rawAnswers: Array(10).fill(''),
      sentences: Array(10).fill(''),
      structures: Array(10).fill(''),
      paragraphs: {
        pernyataanUmum: '',
        deskripsiBagian: '',
        deskripsiManfaat: '',
      },
      checklist: {
        check1_definisi: false,
        check2_rincianFisik: false,
        check3_fungsiManfaat: false,
        check4_kapitalTitikKoma: false,
        check5_penulisanDiTempat: false,
      },
    });
  };

  const openHintForStage = (questionId?: number) => {
    setHintActiveQuestionId(questionId);
    setIsHintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Header */}
      <Header
        onOpenDeveloperInfo={() => setIsDeveloperModalOpen(true)}
        onResetData={() => setIsResetModalOpen(true)}
      />

      {/* Single Stepper / Progress Bar - NO clutter cards */}
      <SingleProgressStepper
        currentStage={appState.currentStage}
        onOpenHint={() => openHintForStage()}
        showHintButton={appState.currentStage >= 1 && appState.currentStage <= 5}
      />

      {/* Main Dynamic View Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col">
        {appState.currentStage === 0 && (
          <Step0Identitas
            identity={appState.identity}
            onUpdateIdentity={handleUpdateIdentity}
            onNext={() => goToStage(1)}
          />
        )}

        {appState.currentStage === 1 && (
          <Step1TemukanData
            answers={appState.rawAnswers}
            onUpdateAnswer={handleUpdateRawAnswer}
            onOpenHint={(qId) => openHintForStage(qId)}
            onNextStage={() => goToStage(2)}
            onPrevStage={() => goToStage(0)}
          />
        )}

        {appState.currentStage === 2 && (
          <Step2TulisKalimat
            answers={appState.rawAnswers}
            sentences={appState.sentences}
            onUpdateSentence={handleUpdateSentence}
            onOpenHint={(qId) => openHintForStage(qId)}
            onNextStage={() => goToStage(3)}
            onPrevStage={() => goToStage(1)}
          />
        )}

        {appState.currentStage === 3 && (
          <Step3TataStruktur
            sentences={appState.sentences}
            structures={appState.structures}
            onUpdateStructure={handleUpdateStructure}
            onOpenHint={() => openHintForStage()}
            onNextStage={() => goToStage(4)}
            onPrevStage={() => goToStage(2)}
          />
        )}

        {appState.currentStage === 4 && (
          <Step4TulisTeks
            sentences={appState.sentences}
            structures={appState.structures}
            paragraphs={appState.paragraphs}
            onUpdateParagraphs={handleUpdateParagraphs}
            onOpenHint={() => openHintForStage()}
            onNextStage={() => goToStage(5)}
            onPrevStage={() => goToStage(3)}
          />
        )}

        {appState.currentStage === 5 && (
          <Step5Tinjau
            checklist={appState.checklist}
            paragraphs={appState.paragraphs}
            onUpdateChecklist={handleUpdateChecklist}
            onOpenHint={() => openHintForStage()}
            onNextStage={() => goToStage(6)}
            onPrevStage={() => goToStage(4)}
          />
        )}

        {appState.currentStage === 6 && (
          <FinalDraftView
            identity={appState.identity}
            paragraphs={appState.paragraphs}
            onEditStage={(stg) => goToStage(stg)}
          />
        )}
      </main>

      {/* Compact Clean Footer */}
      <footer className="mt-auto py-3 px-4 border-t border-slate-200 text-center text-[11px] text-slate-500 print:hidden bg-white/50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <span>Wisnu Tri Cahyo · PPG BI UPY</span>
          <button
            onClick={() => setIsDeveloperModalOpen(true)}
            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline"
          >
            Info Pengembang
          </button>
        </div>
      </footer>

      {/* Global Modals */}
      <DeveloperModal
        isOpen={isDeveloperModalOpen}
        onClose={() => setIsDeveloperModalOpen(false)}
      />

      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetData}
      />

      <HintModal
        isOpen={isHintModalOpen}
        stage={appState.currentStage}
        activeQuestionId={hintActiveQuestionId}
        onClose={() => setIsHintModalOpen(false)}
      />
    </div>
  );
}
