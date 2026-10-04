import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface InteractiveTulipProps {
  id?: number | string;
  name?: string;
  meaning?: string;
  scale?: number;
  initialBloomed?: boolean;
  onBloomChange?: (bloomed: boolean) => void;
  showCard?: boolean;
}

export const InteractiveTulip: React.FC<InteractiveTulipProps> = ({
  name = 'Tulip Kuning Sang Surya',
  meaning = 'Melambangkan kehangatan, keceriaan, dan cinta yang tulus.',
  scale = 1,
  initialBloomed = false,
  onBloomChange,
  showCard = false,
}) => {
  const [isBloomed, setIsBloomed] = useState<boolean>(initialBloomed);
  const [showSparkles, setShowSparkles] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  const handleTulipClick = () => {
    const nextState = !isBloomed;
    setIsBloomed(nextState);
    setClickCount((prev) => prev + 1);
    setShowSparkles(true);
    soundManager.playBloomSound();
    if (onBloomChange) {
      onBloomChange(nextState);
    }
    setTimeout(() => {
      setShowSparkles(false);
    }, 1200);
  };

  return (
    <div className="relative inline-flex flex-col items-center group select-none">
      {/* Sparkles on click/bloom */}
      {showSparkles && (
        <div className="absolute -top-10 pointer-events-none flex items-center justify-center gap-1 z-20">
          <span className="text-amber-400 animate-ping text-sm">✨</span>
          <span className="text-yellow-300 animate-bounce text-xs">💛</span>
          <span className="text-amber-500 animate-pulse text-sm">✨</span>
        </div>
      )}

      {/* SVG Tulip Illustration with Botanical Petals */}
      <button
        type="button"
        onClick={handleTulipClick}
        aria-label={`${name} - Klik untuk ${isBloomed ? 'kuncupkan' : 'mekarkan'}`}
        className="relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full p-1"
        style={{ transform: `scale(${scale})` }}
      >
        <svg
          viewBox="0 0 200 320"
          className="w-36 h-56 sm:w-44 sm:h-64 drop-shadow-md transition-all duration-700 overflow-visible"
        >
          <defs>
            {/* Gradients for golden yellow petals */}
            <linearGradient id={`stemGrad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4d7c0f" />
              <stop offset="50%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#3f6212" />
            </linearGradient>

            <linearGradient id={`leafGrad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="50%" stopColor="#65a30d" />
              <stop offset="100%" stopColor="#365314" />
            </linearGradient>

            <linearGradient id={`outerPetalGrad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <linearGradient id={`centerPetalGrad-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="40%" stopColor="#facc15" />
              <stop offset="85%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>

            <linearGradient id={`innerPetalGrad-${name}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <filter id={`softGlow-${name}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Stem & Leaves */}
          <g className="origin-bottom transition-all duration-500">
            {/* Long Graceful Left Leaf */}
            <path
              d="M100 240 C 60 210, 30 150, 45 95 C 45 145, 65 210, 98 270 Z"
              fill={`url(#leafGrad-${name})`}
              opacity="0.9"
            />
            {/* Right Graceful Leaf */}
            <path
              d="M102 230 C 145 190, 175 140, 160 80 C 160 135, 135 200, 102 265 Z"
              fill={`url(#leafGrad-${name})`}
              opacity="0.9"
            />
            {/* Central Curved Stem */}
            <path
              d="M100 130 Q 98 210 100 310"
              stroke={`url(#stemGrad-${name})`}
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Tulip Flower Head - Animated Blooming Stages */}
          <g
            className={`transition-all duration-700 ease-out origin-center ${
              isBloomed ? 'scale-105' : 'scale-95'
            }`}
            style={{ transformOrigin: '100px 120px' }}
          >
            {/* Golden Core & Stamens (visible when bloomed) */}
            <g
              className={`transition-all duration-700 ${
                isBloomed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ transformOrigin: '100px 115px' }}
            >
              {/* Little pistil and stamens */}
              <circle cx="100" cy="98" r="4.5" fill="#fef08a" />
              <path d="M100 115 L95 102" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 115 L105 102" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="94" cy="100" r="2" fill="#f59e0b" />
              <circle cx="106" cy="100" r="2" fill="#f59e0b" />
            </g>

            {/* Back Left Petal */}
            <path
              d="M100 130 C 70 120, 58 75, 78 45 C 92 65, 98 95, 100 130 Z"
              fill={`url(#innerPetalGrad-${name})`}
              opacity="0.92"
              className="transition-all duration-700"
              style={{
                transform: isBloomed ? 'translate(-8px, -4px) rotate(-14deg)' : 'rotate(0deg)',
                transformOrigin: '100px 130px',
              }}
            />

            {/* Back Right Petal */}
            <path
              d="M100 130 C 130 120, 142 75, 122 45 C 108 65, 102 95, 100 130 Z"
              fill={`url(#innerPetalGrad-${name})`}
              opacity="0.92"
              className="transition-all duration-700"
              style={{
                transform: isBloomed ? 'translate(8px, -4px) rotate(14deg)' : 'rotate(0deg)',
                transformOrigin: '100px 130px',
              }}
            />

            {/* Left Main Petal */}
            <path
              d="M100 135 C 65 125, 52 70, 80 40 C 95 65, 96 100, 100 135 Z"
              fill={`url(#outerPetalGrad-${name})`}
              className="transition-all duration-700"
              style={{
                transform: isBloomed ? 'translate(-12px, 0px) rotate(-18deg)' : 'rotate(0deg)',
                transformOrigin: '100px 135px',
              }}
            />

            {/* Right Main Petal */}
            <path
              d="M100 135 C 135 125, 148 70, 120 40 C 105 65, 104 100, 100 135 Z"
              fill={`url(#outerPetalGrad-${name})`}
              className="transition-all duration-700"
              style={{
                transform: isBloomed ? 'translate(12px, 0px) rotate(18deg)' : 'rotate(0deg)',
                transformOrigin: '100px 135px',
              }}
            />

            {/* Center Front Cup Petal */}
            <path
              d="M100 138 C 72 138, 72 75, 100 48 C 128 75, 128 138, 100 138 Z"
              fill={`url(#centerPetalGrad-${name})`}
              className="transition-all duration-700"
              style={{
                transform: isBloomed ? 'scaleY(0.96) translateY(3px)' : 'scale(1)',
                transformOrigin: '100px 138px',
              }}
            />

            {/* Delicate Petal Highlights and Veins */}
            <path
              d="M100 128 C 96 105, 96 85, 100 62"
              stroke="#fef9c3"
              strokeWidth="2.2"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M92 120 C 86 100, 86 85, 93 72"
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M108 120 C 114 100, 114 85, 107 72"
              stroke="#fef08a"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>
        </svg>

        {/* Status tooltip badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-100/90 text-amber-900 border border-amber-300/60 shadow-xs whitespace-nowrap transition-all duration-300 opacity-90 group-hover:opacity-100">
          {isBloomed ? '💛 Sedang Mekar' : '🌱 Sentuh untuk Mekar'}
        </div>
      </button>

      {/* Optional meaning card */}
      {showCard && (
        <div className="mt-3 text-center max-w-xs">
          <p className="text-xs font-semibold text-stone-800">{name}</p>
          <p className="text-[11px] text-stone-500 italic mt-0.5 leading-relaxed">{meaning}</p>
        </div>
      )}
    </div>
  );
};
