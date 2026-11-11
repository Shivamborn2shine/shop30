import React from 'react';
import { FEATURED_DROPS } from '../config/viceCityConfig';

interface FeaturedDropsProps {
  onSelectCategory?: (category: string) => void;
}

export const FeaturedDrops: React.FC<FeaturedDropsProps> = ({ onSelectCategory }) => {
  return (
    <section className="px-4 mt-7">
      <div className="flex items-start justify-between gap-2 mb-3.5">
        <div>
          <h2 className="text-[19px] font-bold text-[#141414] tracking-tight leading-tight">
            Featured in-store drops
          </h2>
          <p className="text-[12px] text-[#686662] mt-0.5">
            Real garment pieces available at Indira Market
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F3E5C2] text-[#7D5B19] border border-[#E5D09F] shrink-0 mt-0.5">
          Export Surplus
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {FEATURED_DROPS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCategory?.(item.category)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#E6E4DD] hover:border-[#C59B38] transition-all shadow-xs flex flex-col"
          >
            <div className="relative h-32 w-full overflow-hidden bg-[#F4F2ED] p-1.5 pb-0">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#F7EBC8]/95 text-[#3B2B0A] shadow-xs">
                  {item.tag}
                </span>
              </div>
            </div>
            <div className="p-2.5 pt-2">
              <h3 className="text-[12.5px] font-bold text-[#141414] leading-snug truncate">
                {item.title}
              </h3>
              <p className="text-[11px] text-[#686662] mt-0.5 line-clamp-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
