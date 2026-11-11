import React from 'react';

interface HeroBannerProps {
  onImageClick?: (src: string, caption: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onImageClick }) => {
  const heroSrc = "assets/images/ViceCity/00_Storefront_Entrance.jpg";
  const heroCaption = "Vice City Storefront — Shop no. 30, Indira Market, Dehradun";

  return (
    <div className="px-4 pt-1">
      <div
        className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden shadow-sm border border-zinc-200/80 cursor-pointer group"
        onClick={() => onImageClick?.(heroSrc, heroCaption)}
      >
        <img
          src={heroSrc}
          alt="Vice City Storefront Indira Market"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
        />

        {/* Soft bottom white gradient fade matching Target UI */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/90 to-transparent pointer-events-none" />

        <div className="absolute bottom-3 left-4 right-4">
          <span className="inline-block px-3 py-1 rounded-lg bg-[#E3B448] text-zinc-950 text-[10.5px] font-extrabold uppercase tracking-wider shadow-xs">
            EXPORT SURPLUS • BOYS &amp; GIRLS
          </span>
          <h2 className="text-[21px] sm:text-[23px] font-extrabold text-zinc-900 tracking-tight mt-1.5 leading-snug">
            Streetwear worth talking about.
          </h2>
        </div>
      </div>
    </div>
  );
};
