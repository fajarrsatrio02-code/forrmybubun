import React, { useState } from 'react';
import { BirthdayData } from './types';
import { soundManager } from './utils/audio';
import { TulipPetalsCanvas } from './components/TulipPetalsCanvas';
import { HeroBirthday } from './components/HeroBirthday';
import { TulipGarden } from './components/TulipGarden';
import { TulipBouquetKeepsake } from './components/TulipBouquetKeepsake';
import { PersonalLetter } from './components/PersonalLetter';
import { ProposalPage } from './components/ProposalPage';
import { CustomizeModal } from './components/CustomizeModal';

const defaultBirthdayData: BirthdayData = {
  recipientName: 'My Yelloow duck',
  senderName: 'Fajar',
  age: 22,
  birthdayDate: 'Hari Ini',
  whatsappNumber: '',
  letterGreeting: 'Untuk My Yelloow duck Tersayang, 🐥💛',
  letterBody: `Selamat ulang tahun yang paling indah untukmu, My Yelloow duck! 🐥💛\n\nDi hari bertambahnya usiamu ini, aku hanya ingin mengucapkan terima kasih karena telah hadir dan mewarnai hari-hariku dengan begitu banyak kehangatan dan senyum manis. Kehadiranmu bagaikan perpaduan bunga tulip kuning yang cerah dan seekor anak bebek kuning yang selalu bikin gemas dan bahagia—selalu membawa keceriaan, harapan, dan ketenangan di setiap detik.\n\nSemoga di usia yang baru ini, setiap langkah My Yelloow duck selalu dipenuhi berkah, kesehatan yang melimpah, dan segala impian indahmu satu per satu bersemi dengan sempurna. Jangan pernah ragu pada kemampuanmu, karena kamu luar biasa lebih dari yang kamu bayangkan.`,
  letterClosing: 'Dengan seluruh ketulusan hati dan rasa sayang,',
  confessionQuestion: 'Maukah kau menjadi my girlfriend?',
  confessionMessage: `Untuk My Yelloow duck yang paling menggemaskan dan istimewa...\n\nSelama mengenalku, ada rasa yang perlahan bersemi dan tumbuh mekar di dalam hatiku. Seperti bunga tulip kuning yang selalu mencari hangatnya mentari pagi, aku pun selalu merasa paling bahagia dan tenang ketika ada kamu di sisiku.\n\nAku ingin menjadi orang yang merayakan setiap tawamu, mendengarkan ceritamu saat lelah, dan menggenggam tanganmu melangkah ke depan.\n\nMaukah kau menjadi my girlfriend? 🐥💛🌷`,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<'birthday' | 'proposal'>('birthday');

  const [data, setData] = useState<BirthdayData>(() => {
    // Read URL search params first
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to');
      const from = params.get('from');
      const age = params.get('age');
      const wa = params.get('wa');

      const saved = localStorage.getItem('birthday_custom_data');
      let base = defaultBirthdayData;
      if (saved) {
        try {
          base = { ...defaultBirthdayData, ...JSON.parse(saved) };
        } catch {
          // fallback
        }
      }

      return {
        ...base,
        recipientName: to || base.recipientName,
        senderName: from || base.senderName,
        age: age ? parseInt(age) : base.age,
        whatsappNumber: wa || base.whatsappNumber,
      };
    }
    return defaultBirthdayData;
  });

  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);

  // Sync background audio state
  const handleToggleBgm = () => {
    const active = soundManager.toggleBGM();
    setIsBgmPlaying(active);
  };

  const handleSaveData = (newData: BirthdayData) => {
    setData(newData);
    localStorage.setItem('birthday_custom_data', JSON.stringify(newData));
  };

  const goToProposalPage = () => {
    setCurrentPage('proposal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToBirthdayPage = () => {
    setCurrentPage('birthday');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-amber-50/60 via-amber-100/30 to-yellow-50/60 text-stone-800 selection:bg-amber-200">
      {/* Drifting Golden Tulip Petals Canvas */}
      <TulipPetalsCanvas />

      {/* Main Content Render based on current page */}
      {currentPage === 'birthday' ? (
        <main className="relative z-20 pb-20">
          {/* 1. Hero Birthday Header & Interactive Cake */}
          <HeroBirthday
            data={data}
            onOpenLetter={() => scrollToSection('surat-pribadi')}
            onOpenConfession={goToProposalPage}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            isBgmPlaying={isBgmPlaying}
            onToggleBgm={handleToggleBgm}
          />

          {/* 2. Interactive Yellow Tulip Garden */}
          <TulipGarden />

          {/* 3. Reasons I Admire My Yelloow duck */}
          <TulipBouquetKeepsake recipientName={data.recipientName} />

          {/* 4. Vintage Personal Letter (Surat Pribadi with Secret Gift inside) */}
          <PersonalLetter
            data={data}
            onOpenConfession={goToProposalPage}
          />

          {/* Footer */}
          <footer className="py-10 px-4 text-center border-t border-amber-200/60 bg-amber-100/40 text-xs text-stone-500">
            <p className="font-serif-title text-sm text-stone-700">
              Dibuat dengan sepenuh hati oleh <span className="font-semibold text-amber-900">{data.senderName}</span> untuk{' '}
              <span className="font-semibold text-amber-900">{data.recipientName}</span> 🐥💛
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span>🌷 Bunga Tulip Kuning</span>
              <span aria-hidden="true">·</span>
              <span>🐥 My Yelloow duck</span>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setIsCustomizeOpen(true)}
                className="text-amber-800 hover:underline cursor-pointer"
              >
                Kustomisasi Nama
              </button>
            </div>
          </footer>
        </main>
      ) : (
        /* Halaman Berikutnya (Kado Rahasia): Proposal Page with 2 Choices ("Maukah kau menjadi my girlfriend") */
        <main className="relative z-20 pb-20">
          <ProposalPage
            data={data}
            onBackToBirthday={goToBirthdayPage}
            isBgmPlaying={isBgmPlaying}
            onToggleBgm={handleToggleBgm}
          />
        </main>
      )}

      {/* Customize Modal */}
      <CustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        data={data}
        onSave={handleSaveData}
      />
    </div>
  );
}
