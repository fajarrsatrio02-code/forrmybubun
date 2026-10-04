import React, { useState } from 'react';
import { InteractiveTulip } from './InteractiveTulip';
import { CuteYellowDuck, DuckPose } from './CuteYellowDuck';
import { soundManager } from '../utils/audio';

interface TulipWithDuck {
  id: number;
  name: string;
  flowerColor: string;
  meaning: string;
  bloomed: boolean;
  duckPose: DuckPose;
  duckName: string;
  duckMessage: string;
}

export const TulipGarden: React.FC = () => {
  const initialTulips: TulipWithDuck[] = [
    {
      id: 1,
      name: 'Tulip Kehangatan',
      flowerColor: 'Kuning Cerah Sang Surya',
      meaning: 'Untuk caramu yang selalu menghangatkan hati dan membuat hariku terasa tenang.',
      bloomed: true,
      duckPose: 'holding-tulip',
      duckName: 'Bebek Peluk Tulip',
      duckMessage: 'Kwek! Senyummu hangat banget! 🐥💛',
    },
    {
      id: 2,
      name: 'Tulip Keceriaan',
      flowerColor: 'Kuning Emas Berkilau',
      meaning: 'Untuk senyum manismu yang mampu mencairkan hari paling melelahkan sekalipun.',
      bloomed: true,
      duckPose: 'tulip-hat',
      duckName: 'Bebek Topi Tulip',
      duckMessage: 'Kwek kwek! Lihat topiku lucu kan? 👑🐥',
    },
    {
      id: 3,
      name: 'Tulip Ketulusan',
      flowerColor: 'Kuning Mentari Pagi',
      meaning: 'Untuk kebaikan hatimu yang selalu tulus dan caramu memperlakukan orang lain.',
      bloomed: false,
      duckPose: 'winking',
      duckName: 'Bebek Kedip Manis',
      duckMessage: 'Kedip sayang buat My Yelloow duck! 💖✨',
    },
    {
      id: 4,
      name: 'Tulip Harapan',
      flowerColor: 'Kuning Lemon Ceria',
      meaning: 'Untuk segala cita-cita dan mimpi indahmu agar segera mekar di usiamu yang baru.',
      bloomed: false,
      duckPose: 'swimming',
      duckName: 'Bebek Renang Ceria',
      duckMessage: 'Berenang menuju impian indahmu! 🌊🐥',
    },
    {
      id: 5,
      name: 'Tulip Kasih Sayang',
      flowerColor: 'Kuning Madu Hangat',
      meaning: 'Untuk rasa sayang yang terus tumbuh bersemi di hatiku setiap kali melihatmu.',
      bloomed: false,
      duckPose: 'sleeping',
      duckName: 'Bebek Rehat Nyaman',
      duckMessage: 'Selalu nyaman di dekatmu... Zzz 💛🐥',
    },
  ];

  const [tulips, setTulips] = useState<TulipWithDuck[]>(initialTulips);
  const [showLore, setShowLore] = useState<boolean>(false);
  const [duckCheer, setDuckCheer] = useState<boolean>(false);

  const bloomedCount = tulips.filter((t) => t.bloomed).length;

  const handleBloomChange = (id: number, bloomed: boolean) => {
    setTulips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, bloomed } : t))
    );
  };

  const handleToggleAll = () => {
    const allBloomed = bloomedCount === tulips.length;
    const nextState = !allBloomed;
    setTulips((prev) => prev.map((t) => ({ ...t, bloomed: nextState })));
    soundManager.playBloomSound();
  };

  const handleCheerDucks = () => {
    setDuckCheer(true);
    soundManager.playDuckQuack();
    setTimeout(() => {
      soundManager.playBloomSound();
    }, 200);
    setTimeout(() => setDuckCheer(false), 2500);
  };

  return (
    <section id="taman-tulip" className="py-12 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            <span>TAMAN BUNGA TULIP KUNING & BEBEK KECIL</span>
            <span aria-hidden="true">·</span>
            <span>EDISI SPESIAL MY YELLOOW DUCK</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-stone-900 flex items-center gap-2">
            <span>Taman Bunga Tulip Kuning & Bebek Kecil</span>
            <span className="text-2xl animate-bounce">🐥🌷</span>
          </h2>
          <p className="mt-1 text-sm text-stone-600 max-w-xl">
            Semua bunga di taman ini berwarna <strong>kuning cerah sehangat sinar mentari</strong>, ditemani para <strong>bebek kuning kecil yang lucu</strong>. Sentuh bunganya agar mekar dan klik bebeknya untuk mendengar suara kwek kwek lucunya!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleCheerDucks}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 transition-all cursor-pointer shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <span>🐥</span>
            <span>Sapa Semua Bebek!</span>
          </button>

          <button
            type="button"
            onClick={handleToggleAll}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 border border-amber-300/80 transition-all cursor-pointer shadow-xs whitespace-nowrap"
          >
            {bloomedCount === tulips.length ? '🌱 Kuncupkan Semua' : '✨ Mekarkan Semua Tulip'}
          </button>

          <button
            type="button"
            onClick={() => setShowLore(!showLore)}
            className="px-3 py-2 text-xs font-medium rounded-xl bg-white hover:bg-amber-50 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
          >
            {showLore ? 'Tutup Makna' : 'Arti Warna Kuning'}
          </button>
        </div>
      </div>

      {/* Duck Cheer Notification Banner */}
      {duckCheer && (
        <div className="mb-6 p-4 bg-linear-to-r from-amber-300 via-yellow-200 to-amber-300 rounded-2xl border-2 border-amber-400 text-center animate-bounce shadow-md">
          <p className="text-sm font-extrabold text-amber-950">
            🐥 "Kwek kwek kwek! Selamat ulang tahun My Yelloow duck! Semoga bahagia dan mekar selalu!" 🌷💛
          </p>
        </div>
      )}

      {/* Counter bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-100/60 rounded-xl border border-amber-200/80 mb-6 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <span className="text-amber-700 text-base">🌷</span>
          <span className="font-medium">
            Tulip Kuning Mekar: <strong className="text-amber-950">{bloomedCount} dari {tulips.length}</strong> bunga
          </span>
          <span className="hidden sm:inline text-amber-500">· Ditemani 5 Bebek Kecil 🐥</span>
        </div>
        <div className="w-28 sm:w-44 bg-amber-200/80 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${(bloomedCount / tulips.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Lore Card (Collapsible) */}
      {showLore && (
        <div className="mb-8 p-6 bg-linear-to-r from-amber-50 via-yellow-50 to-amber-50 rounded-2xl border border-amber-200 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <span className="text-3xl mt-0.5">☀️</span>
            <div>
              <h3 className="font-serif-title text-lg font-bold text-amber-950 mb-1">
                Filosofi Bunga Tulip Kuning & Sahabat Bebek Kecil
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                <strong>Bunga tulip warna kuning</strong> melambangkan keceriaan murni, pancaran sinar mentari yang menghangatkan hati, serta rasa kagum dan cinta yang tulus. Dipadukan dengan <strong>bebek kuning kecil (My Yelloow duck)</strong> yang menggemaskan, taman ini menjadi simbol kebahagiaan tanpa syarat, kepolosan cinta, dan doa agar hidupmu selalu dipenuhi warna-warna cerah yang menyenangkan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tulips & Cute Yellow Ducks Grid Presentation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 bg-white/80 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border-2 border-amber-200/90 shadow-md">
        {tulips.map((tulip, index) => (
          <div
            key={tulip.id}
            className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
              index % 2 === 0 ? 'animate-sway-slow' : 'animate-sway-moderate'
            } hover:bg-amber-50/90 border border-amber-100/70 hover:border-amber-300 shadow-xs hover:shadow-md relative`}
          >
            {/* Color Tag Indicator */}
            <div className="mb-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-semibold border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>{tulip.flowerColor}</span>
            </div>

            {/* Interactive Blooming Yellow Tulip */}
            <InteractiveTulip
              name={tulip.name}
              meaning={tulip.meaning}
              initialBloomed={tulip.bloomed}
              onBloomChange={(bloomed) => handleBloomChange(tulip.id, bloomed)}
              scale={0.92}
            />

            {/* Tulip Info */}
            <div className="mt-2 text-center w-full">
              <h4 className="font-serif-title font-bold text-sm text-amber-950">
                {tulip.name}
              </h4>
              <p className="text-[11px] text-stone-600 mt-1 leading-snug line-clamp-3">
                {tulip.meaning}
              </p>
            </div>

            {/* Divider */}
            <div className="w-12 h-px bg-amber-200 my-3" />

            {/* Cute Little Yellow Duck Companion */}
            <div className="flex flex-col items-center">
              <CuteYellowDuck
                pose={tulip.duckPose}
                size={54}
                name={tulip.duckName}
                message={tulip.duckMessage}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Duck Pond Footer Banner */}
      <div className="mt-6 p-4 bg-linear-to-r from-amber-100/70 via-sky-100/60 to-amber-100/70 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
        <div className="flex items-center gap-2">
          <span className="text-xl">🦆🌊</span>
          <span>
            <strong>Tips:</strong> Klik bebek kuning kecil di bawah tiap tulip untuk mendengarkan suara kwek kweknya!
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-amber-900 bg-white/80 px-3 py-1 rounded-full border border-amber-200">
          <span>🐥 My Yelloow duck Garden</span>
        </div>
      </div>
    </section>
  );
};
