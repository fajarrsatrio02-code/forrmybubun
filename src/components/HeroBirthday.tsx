import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { BirthdayData } from '../types';
import heroTulipImg from '../assets/images/yellow_tulips_sunlight_1791121150643.jpg';

interface HeroBirthdayProps {
  data: BirthdayData;
  onOpenLetter: () => void;
  onOpenConfession: () => void;
  onOpenCustomize?: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const HeroBirthday: React.FC<HeroBirthdayProps> = ({
  data,
  onOpenLetter,
  onOpenConfession,
  isBgmPlaying,
  onToggleBgm,
}) => {
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const handleBlowCandle = () => {
    if (!candlesLit) {
      // Re-light candle
      setCandlesLit(true);
      setWishMade(false);
      soundManager.playBloomSound();
      return;
    }

    setCandlesLit(false);
    setWishMade(true);
    soundManager.playBlowCandle();

    // Trigger sweet festive confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FBBF24', '#F59E0B', '#FEF08A', '#F43F5E', '#FFFFFF'],
    });
  };

  return (
    <header className="relative w-full pt-6 pb-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Top Bar Navigation Contract: Clean 3-zone */}
      <div className="flex items-center justify-between py-3 px-4 sm:px-6 mb-8 bg-amber-100/60 backdrop-blur-md rounded-2xl border border-amber-200/70 shadow-xs">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🌷</span>
          <span className="font-serif-title text-lg sm:text-xl font-bold tracking-tight text-amber-950">
            Kisah Tulip Kuning
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#taman-tulip" className="hover:text-amber-800 transition-colors">Taman Tulip</a>
          <a href="#alasan-kagum" className="hover:text-amber-800 transition-colors">Catatan Manis</a>
          <a href="#surat-pribadi" className="hover:text-amber-800 transition-colors">Surat Pribadi</a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleBgm}
            title={isBgmPlaying ? 'Matikan Melodi' : 'Putar Melodi Romantis'}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isBgmPlaying
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-white/90 text-stone-700 hover:bg-amber-50 border border-amber-200'
            }`}
          >
            <span>{isBgmPlaying ? '🎵' : '🔇'}</span>
            <span>{isBgmPlaying ? 'Melodi Aktif' : 'Putar Melodi'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Card with High-Res Tulip Photography */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200/80 mb-10 group">
        <div className="relative aspect-21/9 sm:aspect-16/7 w-full overflow-hidden bg-amber-100">
          <img
            src={heroTulipImg}
            alt="Buket Bunga Tulip Kuning Segar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-1000 ease-out"
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-950/10" />

          {/* Floating celebratory text inside banner */}
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 mb-1 tracking-wide">
              <span className="bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-amber-200">
                05 OKTOBER 2026
              </span>
              <span aria-hidden="true">·</span>
              <span>HARI SPESIAL PENUH CINTA</span>
              <span aria-hidden="true">·</span>
              <span>UNTUK SESEORANG YANG PALING BERHARGA</span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
              Selamat Ulang Tahun, <br className="hidden sm:inline" />
              <span className="text-amber-300 italic font-normal underline decoration-amber-400/60 decoration-wavy decoration-2">
                {data.recipientName}
              </span>! 💛
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-stone-200 max-w-xl line-clamp-2 sm:line-clamp-none">
              Semoga hari ini dan lembaran barumu senantiasa bermekaran dengan kebahagiaan, kesehatan, serta harapan seindah tulip kuning yang mekar di pagi hari.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Birthday Cake & Candle Feature */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Cake Illustration & Interactive Candle */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-amber-50/70 rounded-2xl border border-amber-200/50">
            <div className="relative my-2">
              {/* Virtual Birthday Cake SVG */}
              <svg viewBox="0 0 160 140" className="w-36 h-32 sm:w-44 sm:h-38 drop-shadow-md">
                {/* Plate */}
                <ellipse cx="80" cy="125" rx="65" ry="12" fill="#e7e5e4" />
                <ellipse cx="80" cy="122" rx="58" ry="9" fill="#f5f5f4" />

                {/* Cake Bottom Layer */}
                <path d="M35 85 C35 85, 35 110, 80 110 C125 110, 125 85, 125 85 L125 70 C125 70, 125 90, 80 90 C35 90, 35 70, 35 70 Z" fill="#fde68a" />
                <ellipse cx="80" cy="70" rx="45" ry="12" fill="#fed7aa" />

                {/* Cake Cream & Frosting */}
                <path d="M40 70 Q 50 82, 60 70 Q 70 82, 80 70 Q 90 82, 100 70 Q 110 82, 120 70" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />

                {/* Cake Top Layer */}
                <path d="M45 55 C45 55, 45 70, 80 70 C115 70, 115 55, 115 55 L115 45 C115 45, 115 60, 80 60 C45 60, 45 45, 45 45 Z" fill="#fef08a" />
                <ellipse cx="80" cy="45" rx="35" ry="10" fill="#fef9c3" />

                {/* Strawberries / Tulip buds on top */}
                <circle cx="60" cy="42" r="4" fill="#f59e0b" />
                <circle cx="80" cy="47" r="4" fill="#f59e0b" />
                <circle cx="100" cy="42" r="4" fill="#f59e0b" />

                {/* Birthday Candle Stem */}
                <rect x="77" y="20" width="6" height="22" rx="2" fill="#d97706" />
                <line x1="77" y1="24" x2="83" y2="28" stroke="#fef08a" strokeWidth="1.5" />
                <line x1="77" y1="32" x2="83" y2="36" stroke="#fef08a" strokeWidth="1.5" />
                <rect x="79.5" y="15" width="1" height="5" fill="#78350f" />

                {/* Candle Flame (Conditional) */}
                {candlesLit ? (
                  <g className="animate-pulse origin-bottom" style={{ transformOrigin: '80px 15px' }}>
                    {/* Flame outer glow */}
                    <circle cx="80" cy="11" r="8" fill="#fbbf24" opacity="0.4" />
                    {/* Outer flame */}
                    <path
                      d="M80 3 C 83 7, 85 10, 80 16 C 75 10, 77 7, 80 3 Z"
                      fill="#f59e0b"
                    />
                    {/* Inner flame core */}
                    <path
                      d="M80 6 C 81.5 8.5, 83 11, 80 15 C 77 11, 78.5 8.5, 80 6 Z"
                      fill="#fef08a"
                    />
                  </g>
                ) : (
                  /* Little wafting smoke after blowing candle */
                  <g className="opacity-75 transition-opacity">
                    <path
                      d="M80 14 Q 76 9, 82 5 Q 78 1, 80 -4"
                      fill="none"
                      stroke="#a8a29e"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* Candle action button */}
            <button
              type="button"
              onClick={handleBlowCandle}
              className={`mt-2 px-4 py-2 text-xs font-semibold rounded-full cursor-pointer transition-all duration-300 shadow-sm flex items-center gap-1.5 ${
                candlesLit
                  ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 hover:shadow-md'
                  : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
              }`}
            >
              <span>{candlesLit ? '💨' : '✨'}</span>
              <span>{candlesLit ? 'Tiup Lilin & Ucapkan Harapan' : 'Nyalakan Kembali Lilin'}</span>
            </button>
          </div>

          {/* Right: Sweet greeting description & CTA */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
              <span>05 OKTOBER 2026 · DOA & HARAPAN</span>
              {data.age && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Usia {data.age} Tahun</span>
                </>
              )}
            </div>

            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {wishMade
                ? 'Harapanmu telah terkirim ke langit semesta! ✨'
                : `Semoga setiap impianmu bersemi indah, ${data.recipientName}.`}
            </h2>

            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              {wishMade ? (
                <span className="text-amber-900 font-medium">
                  "Semoga segala doa yang terselip saat kamu meniup lilin barusan didengar oleh semesta. Aku juga punya satu surat rahasia dan sebuah kejutan dari lubuk hatiku yang paling dalam untukmu..."
                </span>
              ) : (
                'Klik tombol tiup lilin di samping untuk membuat permohonan ulang tahun, lalu scroll ke bawah untuk melihat taman bunga tulip dan membuka surat pribadi spesial untukmu.'
              )}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenLetter}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>💌</span>
                <span>Buka Surat Pribadi</span>
              </button>

              <a
                href="#taman-tulip"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-300 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>🌷</span>
                <span>Jelajahi Taman Tulip</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
