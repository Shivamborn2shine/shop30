import React from 'react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialsMarquee: React.FC = () => {
  return (
    <div className="mt-8 overflow-hidden">
      <div className="px-4 mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-serif">What Shoppers Say</h3>
          <p className="text-[11px] text-[#94A3B8]">Verified reviews from Indira Market shoppers</p>
        </div>
        <span className="text-xs text-[#D4AF37] font-bold">★ 4.9 / 5.0</span>
      </div>

      <div className="relative w-full overflow-hidden py-1">
        <div className="animate-marquee flex gap-3">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={idx}
              className="w-64 p-3.5 rounded-2xl bg-[#12131A] border border-[#252736] flex flex-col justify-between flex-shrink-0"
            >
              <p className="text-xs text-slate-300 leading-relaxed font-medium mb-2">"{t.text}"</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#252736]/60">
                <span className="text-[11px] font-bold text-white">{t.name}</span>
                <span className="text-[10px] text-[#D4AF37]">★★★★★</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

