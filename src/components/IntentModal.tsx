import React from 'react';
import { ShoppingBag, Eye, Shirt, ArrowRight, Star } from 'lucide-react';
import { ShoppingIntent } from '../types';

interface IntentModalProps {
  isOpen: boolean;
  onSelectIntent: (intent: ShoppingIntent) => void;
  onDirectGoogle: () => void;
  onExploreOnly: () => void;
}

export const IntentModal: React.FC<IntentModalProps> = ({
  isOpen,
  onSelectIntent,
  onDirectGoogle,
  onExploreOnly
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in">
      <div className="w-full max-w-sm rounded-3xl bg-[#12131A] border border-[#252736] p-6 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-[#D4AF37]/20 blur-2xl rounded-full pointer-events-none"></div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] mb-3">
          <span>📍</span> Indira Market • Dehradun
        </span>

        <h2 className="text-2xl font-black text-white tracking-tight font-serif mb-1">How Was Your Visit?</h2>
        <p className="text-xs text-[#94A3B8] mb-5">Tap what describes your time at Vice City today:</p>

        <div className="space-y-3">
          {/* 1. I Bought Clothes */}
          <button
            type="button"
            onClick={() => onSelectIntent('BOUGHT')}
            className="w-full p-4 rounded-2xl bg-[#191B24] hover:bg-[#202230] active:scale-[0.98] border border-[#252736] hover:border-[#D4AF37]/60 transition-all flex items-center gap-3.5 text-left group shadow-sm cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform text-[#D4AF37]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-white flex items-center justify-between">
                <span>I Bought Clothes</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Took home fresh export surplus garments</p>
            </div>
          </button>

          {/* 2. Tried On Clothes */}
          <button
            type="button"
            onClick={() => onSelectIntent('TRIED_ON')}
            className="w-full p-4 rounded-2xl bg-[#191B24] hover:bg-[#202230] active:scale-[0.98] border border-[#252736] hover:border-[#A855F7]/60 transition-all flex items-center gap-3.5 text-left group shadow-sm cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform text-[#A855F7]">
              <Shirt className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-white flex items-center justify-between">
                <span>Tried On Garments</span>
                <ArrowRight className="w-4 h-4 text-[#A855F7] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Tested fits, sizes & mirror styles</p>
            </div>
          </button>

          {/* 3. Just Browsed */}
          <button
            type="button"
            onClick={() => onSelectIntent('BROWSED')}
            className="w-full p-4 rounded-2xl bg-[#191B24] hover:bg-[#202230] active:scale-[0.98] border border-[#252736] hover:border-white/40 transition-all flex items-center gap-3.5 text-left group shadow-sm cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform text-white">
              <Eye className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-white flex items-center justify-between">
                <span>Just Browsing & Drops</span>
                <ArrowRight className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-0.5">Checked international brands & store vibe</p>
            </div>
          </button>
        </div>

        {/* Direct Skip Options */}
        <div className="mt-5 pt-4 border-t border-[#252736] flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onDirectGoogle}
            className="text-xs font-bold text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Already know what to write? Skip to Google</span>
            <Star className="w-3.5 h-3.5 fill-current" />
          </button>
          <button
            type="button"
            onClick={onExploreOnly}
            className="text-[11px] text-[#94A3B8] hover:text-white transition-colors cursor-pointer mt-1"
          >
            Just browse store page without review
          </button>
        </div>
      </div>
    </div>
  );
};

