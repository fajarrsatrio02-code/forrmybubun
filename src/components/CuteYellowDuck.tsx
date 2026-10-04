import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

export type DuckPose = 'holding-tulip' | 'tulip-hat' | 'swimming' | 'winking' | 'sleeping';

interface CuteYellowDuckProps {
  pose?: DuckPose;
  size?: number; // width in px
  message?: string;
  name?: string;
}

export const CuteYellowDuck: React.FC<CuteYellowDuckProps> = ({
  pose = 'holding-tulip',
  size = 64,
  message = 'Kwek kwek! 🐥💛',
  name = 'Bebek Kecil',
}) => {
  const [isBouncing, setIsBouncing] = useState<boolean>(false);
  const [showBubble, setShowBubble] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBouncing(true);
    setShowBubble(true);
    soundManager.playDuckQuack();

    setTimeout(() => setIsBouncing(false), 600);
    setTimeout(() => setShowBubble(false), 2000);
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none group">
      {/* Speech / Thought Bubble on Click */}
      {showBubble && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-amber-300 text-amber-950 font-bold text-[10px] rounded-full shadow-md border border-amber-400 whitespace-nowrap animate-bounce z-30">
          <span>{message}</span>
        </div>
      )}

      {/* Interactive Cute Duck SVG */}
      <button
        type="button"
        onClick={handleClick}
        title={`${name} - Klik untuk dengar suara bebek!`}
        className={`relative cursor-pointer transition-transform duration-300 hover:scale-115 active:scale-95 focus:outline-none rounded-full p-1 ${
          isBouncing ? 'animate-bounce' : 'group-hover:-translate-y-1'
        }`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm overflow-visible">
          <defs>
            <linearGradient id="duckBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            <linearGradient id="duckBeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            <linearGradient id="miniTulipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* Water Ripples if swimming */}
          {pose === 'swimming' && (
            <g opacity="0.6">
              <ellipse cx="50" cy="78" rx="42" ry="7" fill="none" stroke="#67e8f9" strokeWidth="2.5" />
              <ellipse cx="50" cy="83" rx="30" ry="5" fill="none" stroke="#a5f3fc" strokeWidth="1.8" />
            </g>
          )}

          {/* Little Tail */}
          <path
            d="M20 54 Q 10 46 16 38 Q 24 45 28 50 Z"
            fill="url(#duckBodyGrad)"
          />

          {/* Duck Body (Plump round oval) */}
          <ellipse cx="46" cy="58" rx="28" ry="22" fill="url(#duckBodyGrad)" />

          {/* Duck Head */}
          <circle cx="62" cy="36" r="19" fill="url(#duckBodyGrad)" />

          {/* Cute Tuft of feathers on head */}
          <path
            d="M62 17 Q 63 9 68 12 Q 65 17 62 19"
            fill="url(#duckBodyGrad)"
            stroke="#eab308"
            strokeWidth="0.8"
          />

          {/* Blushing Pink Cheek */}
          <ellipse cx="56" cy="42" rx="4.5" ry="3" fill="#fda4af" opacity="0.85" />

          {/* Cute Eyes based on pose */}
          {pose === 'sleeping' ? (
            /* Closed peaceful curved eye */
            <path
              d="M58 35 Q 64 40 70 35"
              fill="none"
              stroke="#44403c"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          ) : pose === 'winking' ? (
            <g>
              {/* Left winking line */}
              <path
                d="M57 36 Q 62 40 67 36"
                fill="none"
                stroke="#44403c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Little love heart floating */}
              <text x="68" y="24" fontSize="11" fill="#f43f5e">💖</text>
            </g>
          ) : (
            /* Big shiny anime eye */
            <g>
              <ellipse cx="64" cy="33" rx="4" ry="5.5" fill="#292524" />
              {/* Twin catchlights */}
              <circle cx="63" cy="31" r="1.8" fill="#ffffff" />
              <circle cx="66" cy="35" r="0.9" fill="#ffffff" />
            </g>
          )}

          {/* Duck Beak */}
          <path
            d="M74 37 Q 88 39 82 46 Q 74 46 72 43 Z"
            fill="url(#duckBeakGrad)"
          />

          {/* Fluffy Little Wing */}
          <path
            d="M34 54 Q 45 46 54 53 Q 48 64 36 61 Z"
            fill="#facc15"
            stroke="#ca8a04"
            strokeWidth="1"
          />

          {/* Little Yellow Tulip Accessories based on pose */}
          {pose === 'holding-tulip' && (
            <g transform="translate(18, -4)">
              {/* Tiny Green Stem */}
              <path d="M42 62 Q 52 50 56 36" stroke="#65a30d" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M48 50 Q 56 50 58 45" stroke="#84cc16" strokeWidth="1.5" fill="none" />
              {/* Mini Blooming Yellow Tulip Head */}
              <path
                d="M56 36 C 50 34, 48 24, 56 18 C 64 24, 62 34, 56 36 Z"
                fill="url(#miniTulipGrad)"
              />
              <path
                d="M53 35 C 47 30, 47 22, 53 19 C 55 24, 55 30, 53 35 Z"
                fill="#fde047"
                opacity="0.8"
              />
              <path
                d="M59 35 C 65 30, 65 22, 59 19 C 57 24, 57 30, 59 35 Z"
                fill="#fde047"
                opacity="0.8"
              />
            </g>
          )}

          {pose === 'tulip-hat' && (
            /* Wearing upside-down tulip petal hat */
            <g transform="translate(62, 19) rotate(15) scale(0.65)">
              <path
                d="M0 0 C -18 -8, -18 -32, 0 -36 C 18 -32, 18 -8, 0 0 Z"
                fill="url(#miniTulipGrad)"
                stroke="#ca8a04"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="-38" r="3" fill="#84cc16" />
            </g>
          )}

          {pose === 'sleeping' && (
            <text x="75" y="20" fontSize="12" fill="#d97706" fontWeight="bold">Zzz</text>
          )}

          {/* Tiny Orange Feet (if not swimming) */}
          {pose !== 'swimming' && (
            <g>
              <ellipse cx="36" cy="78" rx="6" ry="2.5" fill="#ea580c" />
              <ellipse cx="48" cy="78" rx="6" ry="2.5" fill="#ea580c" />
            </g>
          )}
        </svg>

        {/* Mini indicator badge */}
        <span className="sr-only">{name}</span>
      </button>

      {/* Caption under duck */}
      <span className="text-[10px] font-bold text-amber-900/90 bg-amber-200/70 px-2 py-0.5 rounded-full border border-amber-300/60 mt-0.5 whitespace-nowrap">
        {name} 🐥
      </span>
    </div>
  );
};
