import React, { useState } from 'react';
import { BirthdayData } from '../types';
import { soundManager } from '../utils/audio';
import bubunPortraitImg from '../assets/images/bubun_letter_portrait_1791124028283.jpg';

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

  // Photo source: preserves any custom photo if already in storage, otherwise uses the portrait
  const [photoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('my_yelloow_duck_photo') || bubunPortraitImg;
    }
    return bubunPortraitImg;
  });

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
          Sepucuk surat yang kutulis khusus di hari bahagiamu, tersimpan rapi di dalam amplop tersegel.
        </p>
      </div>

      {/* Interactive Envelope or Letter Paper */}
      <div className="flex justify-center">
        {!isOpen ? (
          /* Sealed Envelope Presentation */
          <div
            onClick={toggleEnvelope}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleEnvelope()}
            className="w-full max-w-lg bg-linear-to-b from-amber-100 to-amber-200/90 rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-amber-300 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 group text-center relative overflow-hidden"
          >
            {/* Stamp in upper corner */}
            <div className="absolute top-4 right-4 border-2 border-dashed border-amber-400/80 rounded-lg p-2 bg-amber-50/70 rotate-3">
              <span className="text-xl">🌷</span>
              <p className="text-[9px] font-mono font-bold text-amber-900 mt-0.5">05 OKT 2026</p>
            </div>

            {/* Vintage postmark aesthetic lines */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-0.5 bg-amber-300 mb-1" />
              <div className="w-16 h-0.5 bg-amber-300 mb-4" />

              <span className="font-handwriting text-2xl sm:text-3xl text-amber-950 font-bold">
                Spesial untuk {data.recipientName}
              </span>
              <p className="text-xs text-amber-800 font-mono mt-1">
                Dari: {data.senderName} 🐥
              </p>

              {/* Wax Seal */}
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
                <span className="text-xs font-mono tracking-wider text-amber-800 uppercase font-semibold">
                  Surat Pribadi · 05 Oktober 2026
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

            {/* Letter Content Layout with Clean Polaroid Photo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Polaroid Photo of My Yelloow duck */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative bg-white p-2.5 pb-4 rounded-2xl shadow-xl border-2 border-amber-200/90 w-48 md:w-full rotate-[-1.5deg] hover:rotate-0 transition-transform duration-300">
                  {/* Photo Container */}
                  <div className="relative rounded-xl overflow-hidden aspect-3/4 bg-amber-50 flex items-center justify-center">
                    <img
                      src={photoSrc}
                      alt="Foto My Yelloow duck"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/image.png';
                      }}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Caption */}
                  <div className="mt-2.5 text-center">
                    <p className="font-handwriting text-lg font-bold text-amber-950">
                      My Yelloow duck 🐥💛
                    </p>
                    <p className="text-[11px] text-amber-800 font-mono mt-0.5 font-semibold">
                      05 Oktober 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* Letter Prose Text */}
              <div className="md:col-span-7 flex flex-col text-stone-800">
                {/* Greeting */}
                <h3 className="font-handwriting text-2xl sm:text-3xl text-amber-950 font-bold mb-3">
                  {data.letterGreeting}
                </h3>

                {/* Body Paragraphs */}
                <div className="text-sm sm:text-base leading-relaxed space-y-3 font-serif-title text-stone-800">
                  {data.letterBody.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                {/* Closing & Sender Signature */}
                <div className="mt-6 pt-4 border-t border-amber-200/60 flex flex-col items-end text-right">
                  <p className="text-xs sm:text-sm text-stone-600 font-serif-title italic">
                    {data.letterClosing}
                  </p>
                  <p className="font-handwriting text-2xl sm:text-3xl text-amber-900 font-bold mt-1">
                    {data.senderName}
                  </p>
                </div>
              </div>
            </div>

            {/* Secret Gift Inside: Proposal Prompt */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-300/80 bg-amber-100/60 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/80 flex items-center justify-center text-2xl shadow-xs">
                  🎁
                </div>
                <div>
                  <h4 className="font-serif-title font-bold text-sm text-stone-900">
                    Satu Kejutan Rahasia Tersisa...
                  </h4>
                  <p className="text-xs text-stone-600">
                    Ada satu pertanyaan penting yang ingin kutanyakan langsung padamu.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenConfession}
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>Buka Kejutan Rahasia</span>
                <span>✨</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
