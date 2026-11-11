import React from 'react';

interface CuratingLoaderProps {
  isVisible: boolean;
  confirmedServices: string[];
}

export const CuratingLoader: React.FC<CuratingLoaderProps> = ({ isVisible, confirmedServices }) => {
  if (!isVisible) return null;

  const summary = confirmedServices.slice(0, 2).join(', ');

  return (
    <div className="fixed inset-0 z-[9500] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 transition-all duration-300 animate-in fade-in">
      <div className="w-full max-w-xs text-center flex flex-col items-center">
        <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37] animate-spin-slow"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#191B24] border border-[#D4AF37]/60 shadow-[0_0_25px_-4px_rgba(212,175,55,0.35)] flex items-center justify-center text-2xl">
            🧥
          </div>
        </div>

        <h3 className="text-lg font-black text-white tracking-wide font-serif mb-1">Styling Your Review</h3>
        <p className="text-xs text-[#D4AF37] font-medium animate-pulse">
          Curating highlights for {summary || 'your visit'}...
        </p>

        <div className="w-full mt-6 p-3.5 rounded-2xl bg-[#12131A] border border-[#252736] skeleton-breathing space-y-2">
          <div className="h-3 bg-white/10 rounded w-2/3 mx-auto"></div>
          <div className="h-2.5 bg-white/5 rounded w-5/6 mx-auto"></div>
          <div className="flex justify-center gap-1.5 pt-1">
            <div className="h-5 w-16 bg-[#D4AF37]/20 rounded-full"></div>
            <div className="h-5 w-20 bg-[#A855F7]/20 rounded-full"></div>
            <div className="h-5 w-14 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

