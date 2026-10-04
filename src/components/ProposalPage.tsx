import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayData } from '../types';
import { soundManager } from '../utils/audio';
import duckTulipImg from '../assets/images/yellow_duck_tulips_1791121651050.jpg';

interface ProposalPageProps {
  data: BirthdayData;
  onBackToBirthday: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const ProposalPage: React.FC<ProposalPageProps> = ({
  data,
  onBackToBirthday,
  isBgmPlaying,
  onToggleBgm,
}) => {
  const [accepted, setAccepted] = useState<boolean>(() => {
    return localStorage.getItem('proposal_accepted') === 'true';
  });
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [dodgeMessage, setDodgeMessage] = useState<string>('');
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const teasingMessages = [
    'Eits! My Yelloow duck gak boleh nolak dong 🐥😝',
    'Tombol ini kabur karena tahu kamu sebenernya mau! 😉',
    'Yakin nih mau nolak? Nanti bebeknya sedih lho 🥺🦆',
    'Ups! Tombol "No" otomatis kabur kalau dideketin! 🏃‍♂️💨',
    'Hati kecil My Yelloow duck bilang tombol yang hijau tuh! 🥰💛',
    'Coba lagi kalau bisa kena haha 🐥✨',
    'Tombol ini terkunci khusus buat My Yelloow duck 🙈',
  ];

  const handleDodge = () => {
    soundManager.playDodgeSound();
    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);
    setDodgeMessage(teasingMessages[(nextCount - 1) % teasingMessages.length]);

    // Calculate a playful random shift that stays within view
    const maxOffset = Math.min(170, 90 + nextCount * 12);
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset * 1.6;

    setNoButtonPos({
      x: randomX,
      y: randomY,
    });
  };

  const handleAccept = () => {
    setAccepted(true);
    localStorage.setItem('proposal_accepted', 'true');
    soundManager.playCelebrationSound();

    // Trigger multiple bursts of celebration confetti
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 65,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#FDE047', '#FBBF24', '#F59E0B', '#10B981', '#F43F5E', '#FFFFFF'],
      });
    }, 280);
  };

  const handleReset = () => {
    setAccepted(false);
    localStorage.removeItem('proposal_accepted');
    setDodgeCount(0);
    setDodgeMessage('');
    setNoButtonPos({ x: 0, y: 0 });
  };

  // WhatsApp reply link
  const waText = encodeURIComponent(
    `Hai ${data.senderName}! 🐥💛\n\nAku udah baca halaman spesialnya... Dan jawabanku: IYA, AKU MAU MENJADI YOUR GIRLFRIEND! 🥰💖\n\nMakasih banyak ya udah buatin web selamat ulang tahun yang manis banget bertema tulip kuning dan bebek kuning ini! Love you! ✨`
  );

  const cleanPhone = (data.whatsappNumber || '').replace(/[^0-9]/g, '');
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${waText}`
    : `https://api.whatsapp.com/send?text=${waText}`;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
      {/* Top Bar for Proposal Page */}
      <div className="w-full flex items-center justify-between py-3 px-4 sm:px-6 mb-8 bg-amber-100/70 backdrop-blur-md rounded-2xl border border-amber-200/80 shadow-xs">
        <button
          type="button"
          onClick={onBackToBirthday}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-white hover:bg-amber-50 text-amber-950 border border-amber-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
        >
          <span>👈</span>
          <span>Kembali ke Halaman Ulang Tahun</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xl">🐥</span>
          <span className="font-serif-title font-bold text-amber-950 text-base">
            Kisah Spesial {data.recipientName}
          </span>
          <span className="text-xl">🌷</span>
        </div>

        <button
          type="button"
          onClick={onToggleBgm}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
            isBgmPlaying
              ? 'bg-amber-500 text-white shadow-xs'
              : 'bg-white/80 text-stone-700 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <span>{isBgmPlaying ? '🎵' : '🔇'}</span>
          <span className="hidden sm:inline">{isBgmPlaying ? 'Melodi On' : 'Putar Musik'}</span>
        </button>
      </div>

      {/* Main Proposal Card Container */}
      <div
        ref={containerRef}
        className="w-full relative bg-linear-to-b from-amber-100/90 via-amber-50 to-yellow-100/80 rounded-3xl p-6 sm:p-12 shadow-2xl border-2 border-amber-300 overflow-hidden"
      >
        {/* Adorable Corner Duck & Tulip Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300 text-xs font-semibold text-amber-900 shadow-xs">
          <span>🐥</span>
          <span>My Yelloow duck Special Page</span>
          <span>🌷</span>
        </div>

        {!accepted ? (
          /* Confession Proposal View: Question + 2 Choices */
          <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
            {/* Cute Yellow Duck + Tulip Artwork */}
            <div className="relative my-4 group">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl mx-auto bg-amber-100 relative">
                <img
                  src={duckTulipImg}
                  alt="My Yelloow duck dengan bunga tulip kuning"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-amber-400 text-amber-950 font-bold rounded-full text-xs shadow-md border border-amber-200 whitespace-nowrap">
                🐥 {data.recipientName} 💛
              </div>
            </div>

            {/* Sub-kicker */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-950 text-xs font-bold uppercase tracking-wider">
              <span>🎁</span>
              <span>KADO RAHASIA TERBUKA · DARI LUBUK HATI TERDALAM</span>
              <span>✨</span>
            </div>

            {/* The Big Question: Maukah kau menjadi my girlfriend */}
            <h1 className="font-serif-title text-3xl sm:text-5xl font-extrabold text-amber-950 mt-2 leading-tight">
              Maukah kau menjadi my girlfriend? 🐥💛🌷
            </h1>

            {/* Heartfelt Letter Body */}
            <div className="my-6 p-6 sm:p-8 bg-white/90 backdrop-blur-xs rounded-2xl border border-amber-200 shadow-sm text-stone-800 font-serif-title text-base sm:text-lg leading-relaxed text-center italic">
              "Untuk <strong>{data.recipientName}</strong> yang paling berharga... Terima kasih sudah hadir dan membawa begitu banyak tawa dan kehangatan dalam hidupku. Senyummu selalu menjadi alasan terbaik untuk memulai hari, persis seperti indahnya bunga tulip kuning di pagi hari.<br /><br />
              Hari ini, di momen spesial ulang tahunmu, aku ingin melangkah lebih jauh bersamamu. Aku ingin ada di setiap harimu, merawat senyummu, dan menjagamu selalu.<br /><br />
              Jadi... maukah kamu menjadi my girlfriend?"
            </div>

            {/* Teasing Runaway Message if Dodged */}
            {dodgeMessage && (
              <div className="mb-4 px-4 py-2 bg-amber-300 text-amber-950 rounded-xl text-xs sm:text-sm font-semibold animate-bounce border border-amber-400 shadow-xs">
                {dodgeMessage}
              </div>
            )}

            {/* The 2 Choices Section */}
            <div className="text-xs font-semibold text-amber-900 uppercase tracking-widest mb-3">
              PILIH SALAH SATU DARI 2 PILIHAN INI:
            </div>

            <div className="relative w-full min-h-32 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-1">
              {/* Pilihan 1: "Iya, Aku Mau! / Yes, I do!" */}
              <button
                type="button"
                onClick={handleAccept}
                className="px-8 py-4 text-base sm:text-lg font-bold text-white bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 z-10"
              >
                <span>1. Iya, Aku Mau! (Yes!) 🥰</span>
                <span className="text-2xl">💖</span>
              </button>

              {/* Pilihan 2: "Nggak / No 🙈" (Runaway Button) */}
              <div
                style={{
                  transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                  transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="z-20 inline-block"
              >
                <button
                  type="button"
                  onMouseEnter={handleDodge}
                  onTouchStart={handleDodge}
                  onClick={handleDodge}
                  className="px-7 py-3.5 text-sm sm:text-base font-semibold text-stone-600 bg-white hover:bg-stone-50 rounded-2xl border-2 border-stone-300 shadow-md cursor-pointer whitespace-nowrap active:scale-90"
                >
                  <span>2. Nggak Dulu (No) 🙈</span>
                  {dodgeCount > 0 && (
                    <span className="text-xs text-amber-600 ml-1">({dodgeCount}x kabur)</span>
                  )}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 mt-6 italic">
              *Tersedia 2 pilihan: tombol hijau untuk menerima dengan bahagia, tombol abu-abu yang suka jalan-jalan sendiri kalau mau dipencet hehe 🐥
            </p>
          </div>
        ) : (
          /* Celebratory Accepted View */
          <div className="text-center max-w-xl mx-auto flex flex-col items-center animate-in zoom-in-95 duration-500">
            {/* Cute Couple Avatar */}
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-linear-to-tr from-amber-400 via-yellow-300 to-amber-200 flex items-center justify-center text-4xl shadow-xl animate-bounce border-3 border-amber-300">
                🐥💛🌷
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs sm:text-sm font-bold mb-3">
              <span>🎉</span>
              <span>RESMI JADIAN: SHE SAID YES!</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-5xl font-extrabold text-stone-900 leading-tight">
              Yaaay! {data.recipientName} is My Girlfriend! 🥰💖
            </h2>

            <p className="mt-3 text-stone-700 font-serif-title text-base sm:text-lg leading-relaxed">
              Terima kasih banyak sudah mau menjadi pacarku, <strong>{data.recipientName}</strong>! Hari ini adalah hari paling membahagiakan, dan aku berjanji akan selalu membuatmu tersenyum sehangat bunga tulip kuning.
            </p>

            {/* Official Digital Certificate */}
            <div className="w-full my-6 p-6 sm:p-8 bg-white/95 rounded-2xl border-2 border-dashed border-amber-300 text-left shadow-lg">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📜</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-900 font-bold">
                    Sertifikat Resmi Pasangan Bahagia
                  </span>
                </div>
                <span className="text-xs font-mono text-amber-900 font-bold bg-amber-100 px-2.5 py-1 rounded-md border border-amber-200">
                  Senin, 05 Oktober 2026
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-800 font-serif-title">
                <div className="flex justify-between items-center bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <span className="font-semibold text-amber-950">Boyfriend: {data.senderName}</span>
                  <span className="text-xl">💛</span>
                  <span className="font-semibold text-amber-950">Girlfriend: {data.recipientName}</span>
                </div>

                <div className="pt-2 text-stone-700 space-y-1.5 text-xs sm:text-sm leading-relaxed">
                  <p>✔ Janji selalu ada dan saling mendengarkan dalam suka maupun duka.</p>
                  <p>✔ Janji merayakan setiap keberhasilan kecil bersama-sama.</p>
                  <p>✔ Janji menjaga senyum manis My Yelloow duck agar selalu mekar seindah tulip kuning.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Kirim Jawaban ke WhatsApp {data.senderName}</span>
              </a>

              <button
                type="button"
                onClick={onBackToBirthday}
                className="w-full sm:w-auto px-5 py-3.5 text-xs sm:text-sm font-semibold text-amber-950 bg-amber-200 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer border border-amber-300"
              >
                <span>🌷 Lihat Kembali Halaman Ulang Tahun</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-3.5 py-3.5 text-xs font-medium text-stone-500 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                title="Reset pilihan untuk mengulang momen"
              >
                🔄 Ulangi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
