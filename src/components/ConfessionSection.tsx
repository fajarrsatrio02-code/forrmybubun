import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { BirthdayData } from '../types';
import { soundManager } from '../utils/audio';

interface ConfessionSectionProps {
  data: BirthdayData;
}

export const ConfessionSection: React.FC<ConfessionSectionProps> = ({ data }) => {
  const [accepted, setAccepted] = useState<boolean>(() => {
    return localStorage.getItem('proposal_accepted') === 'true';
  });
  const [dodgeCount, setDodgeCount] = useState<number>(0);
  const [dodgeMessage, setDodgeMessage] = useState<string>('');
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const teasingMessages = [
    'Eits! Gak kena dong 😝',
    'Tombol ini lagi libur hehe, pencet yang kiri aja! 😉',
    'Yakin nih mau nolak? Nanti kangen lho 🥺',
    'Ups! Tombol "Nggak" otomatis kabur kalau dideketin! 🏃‍♂️',
    'Hati kecilmu bilang tombol yang kiri tuh! 🥰',
    'Coba lagi kalau bisa kena haha 💛',
    'Tombol ini rusak khusus buat kamu 🙈',
  ];

  const handleDodge = () => {
    soundManager.playDodgeSound();
    const nextCount = dodgeCount + 1;
    setDodgeCount(nextCount);
    setDodgeMessage(teasingMessages[(nextCount - 1) % teasingMessages.length]);

    // Calculate a playful random shift that stays within comfortable view
    const maxOffset = Math.min(160, 80 + nextCount * 10);
    const randomX = (Math.random() - 0.5) * maxOffset * 2;
    const randomY = (Math.random() - 0.5) * maxOffset * 1.5;

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
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const interval: number = window.setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
        colors: ['#FBBF24', '#F59E0B', '#F43F5E', '#10B981', '#FEF08A'],
      });
    }, 250);
  };

  const handleReset = () => {
    setAccepted(false);
    localStorage.removeItem('proposal_accepted');
    setDodgeCount(0);
    setDodgeMessage('');
    setNoButtonPos({ x: 0, y: 0 });
  };

  // Generate WhatsApp message URL
  const waText = encodeURIComponent(
    `Hai ${data.senderName}! 💛\n\nMakasih banyak ya buat ucapan selamat ulang tahun dan kejutan web tulip kuningnya... Aku terharu banget 🥺✨\n\nDan jawabanku untuk ajakan jadianmu: IYA, AKU MAU JADI PACARMU! 🥰💖 Semoga kita bisa saling melengkapi dan bahagia selalu!`
  );

  const cleanPhone = (data.whatsappNumber || '').replace(/[^0-9]/g, '');
  const waUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${waText}`
    : `https://api.whatsapp.com/send?text=${waText}`;

  return (
    <section id="ajakan-jadian" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-6">
      <div
        ref={containerRef}
        className="relative bg-linear-to-b from-amber-100/90 via-amber-50 to-amber-100/70 rounded-3xl p-6 sm:p-12 shadow-xl border-2 border-amber-300/80 overflow-hidden"
      >
        {/* Decorative Golden Tulip Motif Watermark */}
        <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600 fill-current">
            <path d="M50 15 C 30 10, 15 35, 30 70 C 45 85, 55 85, 70 70 C 85 35, 70 10, 50 15 Z" />
          </svg>
        </div>

        {!accepted ? (
          /* Confession Proposal Card */
          <div className="relative text-center max-w-2xl mx-auto flex flex-col items-center">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-300 text-xs font-semibold mb-4">
              <span>💝</span>
              <span>UNGKAPAN DARI HATI YANG TERDALAM</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-amber-950 leading-tight">
              {data.confessionQuestion || `Maukah Kamu Menjadi Pacarku, ${data.recipientName}?`}
            </h2>

            <div className="my-6 p-6 sm:p-8 bg-white/80 backdrop-blur-xs rounded-2xl border border-amber-200 shadow-xs text-stone-700 font-serif-title text-base sm:text-lg leading-relaxed text-center italic">
              "{data.confessionMessage || `Di hari bertambahnya usiamu ini, aku menyadari bahwa kehadiranmu telah menjadi salah satu bagian terbaik dalam hidupku. Senyummu selalu memberi rasa hangat, seperti bunga tulip kuning di pagi hari. Aku ingin selalu ada untuk mendengarkan ceritamu, merayakan setiap tawamu, dan menggenggam tanganmu di setiap langkah ke depan. Maukah kita melangkah bersama sebagai sepasang kekasih?`}"
            </div>

            {/* Teasing Runaway Message if Dodged */}
            {dodgeMessage && (
              <div className="mb-4 px-4 py-2 bg-amber-200/90 text-amber-950 rounded-xl text-xs sm:text-sm font-medium animate-bounce border border-amber-300">
                {dodgeMessage}
              </div>
            )}

            {/* Proposal Decision Buttons */}
            <div className="relative w-full min-h-28 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-2">
              {/* Accept Button: "Iya, Aku Mau! 💖" */}
              <button
                type="button"
                onClick={handleAccept}
                className="px-8 py-3.5 text-base sm:text-lg font-bold text-white bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-2xl shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 z-10"
              >
                <span>Iya, Aku Mau! 🥰</span>
                <span className="text-xl">💖</span>
              </button>

              {/* Runaway Decline Button: "Nggak Dulu 🙈" */}
              <div
                style={{
                  transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                  transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
                className="z-20 inline-block"
              >
                <button
                  type="button"
                  onMouseEnter={handleDodge}
                  onTouchStart={handleDodge}
                  onClick={handleDodge}
                  className="px-6 py-3 text-sm sm:text-base font-medium text-stone-600 bg-white/90 hover:bg-stone-100 rounded-2xl border border-stone-300 shadow-sm cursor-pointer whitespace-nowrap active:scale-90"
                >
                  <span>Nggak Dulu 🙈</span>
                  {dodgeCount > 0 && <span className="text-xs text-amber-600 ml-1">({dodgeCount}x kabur)</span>}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 mt-6 italic">
              *Petunjuk: Tombol "Nggak Dulu" sengaja diprogram punya radar penolakan hehe 😉
            </p>
          </div>
        ) : (
          /* Celebratory Relationship Accepted View! */
          <div className="text-center max-w-xl mx-auto flex flex-col items-center animate-in zoom-in-95 duration-500">
            {/* Celebration Icon */}
            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-4xl shadow-lg mb-4 animate-bounce">
              💛
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold mb-2">
              <span>🎉</span>
              <span>RESMI JADIAN HARI INI</span>
            </div>

            <h3 className="font-serif-title text-3xl sm:text-4xl font-bold text-stone-900 leading-tight">
              Yaaay! Kita Resmi Jadian! 🥰✨
            </h3>

            <p className="mt-2 text-sm text-stone-600 font-serif-title text-base sm:text-lg">
              Terima kasih sudah memilih untuk membuka lembaran baru ini bersamaku. Aku berjanji akan menjaga senyummu agar selalu secerah bunga tulip kuning!
            </p>

            {/* Official Digital Certificate Card */}
            <div className="w-full my-6 p-6 bg-white/90 rounded-2xl border-2 border-dashed border-amber-300 text-left shadow-sm">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                  Sertifikat Janji Kasih
                </span>
                <span className="text-xs font-mono text-stone-500">
                  {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
                </span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-stone-700">
                <p>
                  <strong>Pasangan Berbahagia:</strong>{' '}
                  <span className="text-amber-900 font-semibold">{data.senderName}</span> &{' '}
                  <span className="text-amber-900 font-semibold">{data.recipientName}</span>
                </p>
                <p>
                  <strong>Simbol Cinta:</strong> Bunga Tulip Kuning (Ketulusan, Keceriaan, Kehangatan)
                </p>
                <div className="pt-2 border-t border-amber-100 mt-2">
                  <p className="text-xs text-stone-500 italic">
                    "Saling mendengarkan saat lelah, saling merayakan saat bahagia, dan selalu menjadi rumah bagi satu sama lain."
                  </p>
                </div>
              </div>
            </div>

            {/* Send confirmation to WhatsApp */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>💬</span>
                <span>Kirim Jawaban ke WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-3 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                🔄 Ulangi Momen Ini
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
