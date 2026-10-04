import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface KeepsakeProps {
  recipientName: string;
}

export const TulipBouquetKeepsake: React.FC<KeepsakeProps> = ({ recipientName }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const reasons = [
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
    {
      title: 'Kamu yang Selalu Apa Adanya',
      description:
        'Bersamamu, aku merasa bisa menjadi diriku yang seutuhnya. Tidak ada kepura-puraan, hanya kenyamanan dan rasa syukur setiap detik waktu kita lewati bersama.',
      icon: '🌿',
    },
  ];

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    soundManager.playTone(520 + idx * 80, 'sine', 0.3, 0.08);
  };

  return (
    <section id="alasan-kagum" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-6">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-md">
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            <span>CATATAN KECIL DARI HATI</span>
          </div>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
            Hal-hal yang Paling Kukagumi Darimu
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Ada ribuan alasan untuk bersyukur mengenalmu, dan tiga di antaranya adalah...
          </p>
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
              <span>Alasan 0{idx + 1}</span>
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

        <div className="mt-6 text-center">
          <p className="text-xs text-stone-400 italic">
            "Semoga di usia yang baru ini, {recipientName} selalu dipeluk kebahagiaan yang melimpah."
          </p>
        </div>
      </div>
    </section>
  );
};
