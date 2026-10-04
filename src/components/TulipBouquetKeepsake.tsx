import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface KeepsakeProps {
  recipientName: string;
  specialNote?: string;
}

export const TulipBouquetKeepsake: React.FC<KeepsakeProps> = ({
  recipientName,
  specialNote = 'aku suka dia yang periang',
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const reasons = [
    {
      title: 'Aku Suka Dia yang Periang',
      description:
        'Tawamu yang lepas, energimu yang selalu ceria, dan caramu membawa kehangatan di setiap suasana selalu berhasil membuatku jatuh hati. Sifat periangmu bagaikan mentari pagi yang selalu mewarnai hari.',
      icon: '🐥',
    },
    {
      title: 'Senyumanmu yang Selalu Menghangatkan',
      description:
        'Sama seperti warna kuning cerah pada kelopak bunga tulip, tawamu punya kekuatan magis untuk membuat hari yang paling berat sekalipun terasa jauh lebih ringan dan damai.',
      icon: '☀️',
    },
    {
      title: 'Ketulusan dan Empati Hatimu',
      description:
        'Caramu mendengarkan, caramu peduli pada hal-hal kecil, dan kebaikan tanpa pamrih yang selalu kamu bagikan adalah alasan mengapa kamu begitu istimewa di mataku.',
      icon: '💛',
    },
  ];

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    soundManager.playTone(520 + idx * 80, 'sine', 0.3, 0.08);
  };

  return (
    <section id="alasan-kagum" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            <span>CATATAN KECIL DARI HATI</span>
          </div>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
            Hal-hal yang Paling Kukagumi Darimu
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Ada ribuan alasan untuk bersyukur mengenalmu, dan catatan terbesarku adalah...
          </p>
        </div>

        {/* Highlighted Note Card */}
        <div className="mb-6 p-4 sm:p-5 bg-linear-to-r from-amber-100/90 via-yellow-100/80 to-amber-200/70 rounded-2xl border-2 border-amber-300 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-300/80 flex items-center justify-center text-2xl shrink-0 shadow-xs">
            📝
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-amber-800 uppercase">
              <span>Catatan Spesial</span>
              <span aria-hidden="true">·</span>
              <span>05 Oktober 2026</span>
            </div>
            <p className="text-base sm:text-lg font-serif-title font-bold text-amber-950 mt-0.5">
              "{specialNote}" 🐥💛
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {reasons.map((r, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTabClick(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === idx
                  ? 'bg-amber-800 text-white shadow-sm'
                  : 'bg-amber-100/60 hover:bg-amber-200/70 text-stone-700'
              }`}
            >
              <span>{r.icon}</span>
              <span>{r.title}</span>
            </button>
          ))}
        </div>

        {/* Active Reason Card Content */}
        <div className="p-6 sm:p-8 bg-amber-50/70 rounded-2xl border border-amber-200/60 transition-all duration-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-200/80 flex items-center justify-center text-2xl shrink-0 shadow-xs">
              {reasons[activeTab].icon}
            </div>
            <div>
              <h4 className="font-serif-title text-xl font-bold text-amber-950 mb-2">
                {reasons[activeTab].title}
              </h4>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-serif-title">
                {reasons[activeTab].description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center space-y-1">
          <p className="text-xs text-amber-900/80 font-medium font-serif-title italic">
            "Catatan: {specialNote} — tawa riangmu adalah kebahagiaanku."
          </p>
          <p className="text-[11px] text-stone-400">
            05 Oktober 2026 · Untuk {recipientName} tercinta 🐥🌷
          </p>
        </div>
      </div>
    </section>
  );
};
