import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface JacketIntroProps {
  onComplete: () => void;
}

export const JacketIntro: React.FC<JacketIntroProps> = ({ onComplete }) => {
  const [isUnzipped, setIsUnzipped] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasSeenIntro = sessionStorage.getItem('vicecity_intro_seen');

    if (prefersReducedMotion || hasSeenIntro) {
      setIsHidden(true);
      onComplete();
      return;
    }

    // Snappy 650ms auto-unzip so customers get straight to the review studio
    autoTimerRef.current = setTimeout(() => {
      triggerUnzip();
    }, 650);

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [onComplete]);

  const triggerUnzip = () => {
    if (isUnzipped) return;
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

    setIsUnzipped(true);

    setTimeout(() => {
      setIsFading(true);
      sessionStorage.setItem('vicecity_intro_seen', 'true');
      setTimeout(() => {
        setIsHidden(true);
        onComplete();
      }, 280);
    }, 680);
  };

  const skipIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    sessionStorage.setItem('vicecity_intro_seen', 'true');
    setIsHidden(true);
    onComplete();
  };

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#060709] flex items-center justify-center overflow-hidden transition-opacity duration-300 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute top-5 right-5 z-50">
        <button
          onClick={skipIntro}
          className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 text-xs font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer"
        >
          Skip ✕
        </button>
      </div>

      <div
        className="relative w-full max-w-[480px] h-full flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={triggerUnzip}
      >
        {/* Underneath Gold Glow */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300 ${
            isUnzipped ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 via-amber-600/20 to-transparent blur-3xl" />
          <div className="absolute text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-[#D4AF37] font-serif uppercase drop-shadow-lg">
              VICE CITY
            </h2>
            <p className="text-[11px] font-bold text-slate-300 tracking-wider mt-1 uppercase">
              Export Surplus • Indira Market
            </p>
          </div>
        </div>

        {/* Left Leather Flap */}
        <div
          className={`jacket-flap-left absolute top-0 bottom-0 left-0 w-1/2 leather-texture leather-stitch-left z-20 flex flex-col justify-between overflow-hidden shadow-2xl ${
            isUnzipped ? 'jacket-unzipped-left' : ''
          }`}
        >
          <div className="p-4 pt-10 flex flex-col items-end">
            <div className="w-14 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-3xl bg-black/40 rotate-12 flex items-center justify-center shadow-inner">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 border border-black shadow" />
            </div>
          </div>
          <div className="p-4 pb-8 flex items-center justify-between border-t border-white/10 bg-black/30">
            <div className="w-8 h-2 bg-white/20 rounded" />
            <div className="text-[10px] tracking-widest font-black text-[#D4AF37]/50 font-serif">VICE</div>
          </div>
        </div>

        {/* Right Leather Flap */}
        <div
          className={`jacket-flap-right absolute top-0 bottom-0 right-0 w-1/2 leather-texture leather-stitch-right z-20 flex flex-col justify-between overflow-hidden shadow-2xl ${
            isUnzipped ? 'jacket-unzipped-right' : ''
          }`}
        >
          <div className="p-4 pt-10 flex flex-col items-start">
            <div className="w-14 h-16 border-b-2 border-r-2 border-white/20 rounded-br-3xl bg-black/40 -rotate-12 flex items-center justify-center shadow-inner">
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#D4AF37] to-amber-200 border border-black shadow" />
            </div>
          </div>
          <div className="p-4 pb-8 flex items-center justify-between border-t border-white/10 bg-black/30">
            <div className="text-[10px] tracking-widest font-black text-[#D4AF37]/50 font-serif">CITY</div>
            <div className="w-8 h-2 bg-white/20 rounded" />
          </div>
        </div>

        {/* Zipper Track */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 z-30 flex flex-col items-center pointer-events-none opacity-80">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 16 1000">
            <defs>
              <pattern id="zipperPattern" width="16" height="12" patternUnits="userSpaceOnUse">
                <rect x="2" y="1" width="5" height="4" rx="1" fill="#D4AF37" stroke="#856404" strokeWidth="0.8" />
                <rect x="9" y="7" width="5" height="4" rx="1" fill="#FFF" stroke="#856404" strokeWidth="0.8" />
                <line x1="8" y1="0" x2="8" y2="12" stroke="#101014" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="16" height="1000" fill="url(#zipperPattern)" />
          </svg>
        </div>

        {/* Zipper Pull Tab */}
        <div
          className={`absolute top-12 left-1/2 -translate-x-1/2 z-40 cursor-pointer flex flex-col items-center ${
            isUnzipped ? 'zipper-pull-down' : ''
          }`}
        >
          <div className="w-6 h-6 rounded-t-md bg-gradient-to-b from-amber-100 via-[#D4AF37] to-amber-700 border border-amber-300 shadow-xl flex items-center justify-center">
            <div className="w-2.5 h-1 bg-black rounded-sm" />
          </div>
          <div className="w-5 h-12 -mt-1 rounded-b-lg bg-gradient-to-b from-amber-200 via-[#D4AF37] to-amber-800 border border-amber-300 shadow-2xl flex flex-col items-center justify-between py-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-900/60 shadow-inner" />
            <span className="text-[7px] font-black text-black tracking-tighter uppercase font-serif rotate-90 my-auto">VC</span>
            <div className="w-3 h-0.5 bg-amber-900 rounded" />
          </div>
        </div>

        {!isUnzipped && (
          <div className="absolute bottom-12 z-50 px-4 py-2 rounded-full bg-black/85 border border-[#D4AF37]/30 text-white/90 text-xs font-semibold flex items-center gap-2 pointer-events-none">
            <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
            <span>Tap to open</span>
          </div>
        )}
      </div>
    </div>
  );
};
