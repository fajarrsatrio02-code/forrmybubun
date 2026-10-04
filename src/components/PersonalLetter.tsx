import React, { useState } from 'react';
import { BirthdayData } from '../types';
import { soundManager } from '../utils/audio';
import vintageTulipImg from '../assets/images/vintage_tulip_art_1791121166193.jpg';

interface PersonalLetterProps {
  data: BirthdayData;
  onOpenConfession: () => void;
}

export const PersonalLetter: React.FC<PersonalLetterProps> = ({
  data,
  onOpenConfession,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const toggleEnvelope = () => {
    if (!isOpen) {
      soundManager.playEnvelopeOpen();
    }
    setIsOpen(!isOpen);
  };

  const handleCopyLetter = () => {
    const fullText = `${data.letterGreeting}\n\n${data.letterBody}\n\n${data.letterClosing}\n- ${data.senderName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="surat-pribadi" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto scroll-mt-6">
      {/* Section Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
          <span>SURAT TERTULIS DARI LUBUK HATI</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-stone-900">
          Pesan Pribadi Buatmu
        </h2>
        <p className="mt-1 text-sm text-stone-600 max-w-md mx-auto">
          Ada sepucuk surat tersimpan di dalam amplop segel lilin ini. Tekan segel lilin emas untuk membukanya.
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <div
            onClick={toggleEnvelope}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleEnvelope()}
            className="w-full max-w-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-3xl"
          >
            <div className="relative bg-linear-to-b from-amber-100 to-amber-200/90 rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-300/70 text-center overflow-hidden">
              {/* Envelope flap aesthetic geometry */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-linear-to-b from-amber-200 to-amber-100/40 clip-path-triangle opacity-60 pointer-events-none" />

              {/* Decorative vintage postage stamp */}
              <div className="absolute top-5 right-6 w-14 h-16 border-2 border-dashed border-amber-400/80 bg-amber-50 p-1 flex flex-col items-center justify-center rotate-3 shadow-xs">
                <span className="text-lg">🌷</span>
                <span className="text-[9px] font-mono text-amber-800 tracking-tighter">HBD 2026</span>
              </div>

              {/* Envelope Recipient Address */}
              <div className="pt-8 pb-4">
                <p className="text-xs uppercase font-mono tracking-widest text-amber-800/80">KIRIMAN SPESIAL KEPADA:</p>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-950 mt-1">
                  Untuk {data.recipientName} Tersayang
                </h3>
                <p className="text-xs text-stone-500 mt-1 italic">
                  Dari {data.senderName} · Jangan dibuka orang lain!
                </p>
              </div>

              {/* Wax Seal Stamp */}
              <div className="my-6 inline-flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-700 via-amber-600 to-yellow-500 shadow-lg border-2 border-amber-300 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 group-hover:shadow-amber-400/50">
                  <span className="text-2xl drop-shadow-sm">💛</span>
                </div>
                <span className="mt-3 text-xs font-semibold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300/70">
                  Sentuh Segel untuk Membuka Surat
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Opened Letter Paper Presentation */
          <div className="w-full max-w-2xl bg-amber-50/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-300/80 relative animate-in fade-in zoom-in-95 duration-500">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between border-b border-amber-200/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">💌</span>
                <span className="text-xs font-mono tracking-wider text-amber-800 uppercase">
                  Surat Pribadi Ulang Tahun
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLetter}
                  className="px-2.5 py-1 text-xs font-medium text-stone-700 hover:text-amber-900 bg-white/80 hover:bg-white rounded-lg border border-amber-200 transition-colors cursor-pointer"
                >
                  {copied ? '✅ Tersalin' : '📋 Salin Pesan'}
                </button>
                <button
                  type="button"
                  onClick={toggleEnvelope}
                  className="px-2.5 py-1 text-xs font-medium text-amber-900 bg-amber-200/70 hover:bg-amber-200 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                >
                  Tutup Amplop ✉️
                </button>
              </div>
            </div>

            {/* Letter Content Layout with Vintage Tulip Art */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Botanical Portrait Art */}
              <div className="md:col-span-4 flex flex-col items-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md w-40 md:w-full aspect-3/4">
                  <img
                    src={vintageTulipImg}
                    alt="Lukisan Botani Tulip Kuning"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-stone-950/60 p-1.5 text-center">
                    <p className="text-[10px] text-amber-200 font-serif-title italic">
                      "Cinta sehangat mentari"
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-center hidden md:block">
                  <span className="text-[11px] text-stone-500 font-mono">
                    {new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}
                  </span>
                </div>
              </div>

              {/* Letter Prose Text */}
              <div className="md:col-span-8 flex flex-col text-stone-800">
                {/* Greeting */}
                <h3 className="font-handwriting text-2xl sm:text-3xl text-amber-950 font-bold mb-3">
                  {data.letterGreeting}
                </h3>

                {/* Body Paragraphs */}
                <div className="text-sm sm:text-base leading-relaxed space-y-3 font-serif-title text-stone-800">
                  {data.letterBody.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="whitespace-pre-line leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Closing & Signature */}
                <div className="mt-6 pt-4 border-t border-amber-200/70">
                  <p className="text-xs text-stone-500 italic font-serif-title">
                    {data.letterClosing}
                  </p>
                  <p className="font-handwriting text-2xl sm:text-3xl text-amber-900 font-bold mt-1">
                    {data.senderName}
                  </p>
                </div>
              </div>
            </div>

            {/* Secret Gift Box / Misteri Tersembunyi */}
            <div className="mt-8 pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-linear-to-r from-amber-100/70 to-yellow-100/70 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <span className="text-3xl animate-bounce">🎁</span>
                <div>
                  <p className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    Psst... Ada Kejutan Tersembunyi! 🔐
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">
                    Terselip sebuah kado rahasia kecil khusus untuk <strong>{data.recipientName}</strong> di balik amplop ini...
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenConfession}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-linear-to-r from-amber-800 to-amber-900 hover:from-amber-900 hover:to-stone-900 rounded-2xl transition-all shadow-md hover:shadow-xl hover:scale-103 cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                <span>Buka Kado Rahasia</span>
                <span>✨</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
