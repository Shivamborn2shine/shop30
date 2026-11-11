import React, { useState } from 'react';
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { STORE_GALLERY } from '../config/viceCityConfig';

export const StoreGallery: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Specifically ordered 6 store & garment photos matching the target UI grid
  const initialSix = [
    STORE_GALLERY[1], // Interior staircase
    STORE_GALLERY[2], // Outerwear display
    STORE_GALLERY[3], // Black zip jacket mannequin
    STORE_GALLERY[5], // White corduroy overshirt & pink tee
    STORE_GALLERY[7], // Store outerwear wall
    {
      src: 'assets/images/ViceCity/10_Brown_Toggle_Closure_Jacket.jpg',
      alt: 'Brown toggle closure leather jacket closeup',
      label: 'Export Leather',
    },
  ];

  const allPhotos = [
    ...initialSix,
    STORE_GALLERY[0],
    STORE_GALLERY[4],
    STORE_GALLERY[6],
    {
      src: 'assets/images/ViceCity/07_Grey_Distressed_Zip_Jacket.jpg',
      alt: 'Grey Distressed Zip Jacket',
      label: 'Distressed Zip',
    },
    {
      src: 'assets/images/ViceCity/08_Brown_Monogram_Puffer.jpg',
      alt: 'Brown Monogram Puffer Jacket',
      label: 'Monogram Puffer',
    },
  ];

  const visiblePhotos = showAll ? allPhotos : initialSix;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + allPhotos.length) % allPhotos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % allPhotos.length);
  };

  return (
    <section className="px-4 mt-7">
      <div className="mb-3">
        <h2 className="text-[19px] font-bold text-[#141414] tracking-tight leading-tight">
          Inside Vice City
        </h2>
        <p className="text-[12px] text-[#686662] mt-0.5">
          A closer look at the store.
        </p>
      </div>

      {/* 3x2 Rounded Photo Grid */}
      <div className="grid grid-cols-3 gap-2">
        {visiblePhotos.map((photo, index) => (
          <button
            key={`${photo.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative h-24 rounded-2xl overflow-hidden border border-[#E6E4DD] bg-white group focus:outline-none shadow-2xs"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Full-width Outlined View All Button */}
      <button
        type="button"
        onClick={() => setShowAll(!showAll)}
        className="w-full mt-3 py-2.5 px-4 rounded-full bg-[#FAF9F5] hover:bg-white border border-[#C9AE74] text-[#181818] flex items-center justify-between transition-all active:scale-[0.99] shadow-2xs"
      >
        <div className="w-4" />
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[#9A7426]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span className="text-[12.5px] font-bold text-[#181818]">
            {showAll ? 'Show fewer photos' : `View all 10+ photos`}
          </span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#9A7426]" />
      </button>

      {/* Lightbox Modal */}
      {activeIndex !== null && (
        <div
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-sm w-full rounded-2xl overflow-hidden bg-[#141414] border border-white/15 shadow-2xl"
          >
            <img
              src={allPhotos[activeIndex].src}
              alt={allPhotos[activeIndex].alt}
              className="w-full max-h-[70vh] object-contain bg-black"
            />
            <div className="p-3.5 flex items-center justify-between bg-[#141414]">
              <div>
                <p className="text-xs font-bold text-[#E6C56E]">
                  {allPhotos[activeIndex].label}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  {allPhotos[activeIndex].alt}
                </p>
              </div>
              <span className="text-[11px] text-zinc-400 font-mono">
                {activeIndex + 1} / {allPhotos.length}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
