import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FEATURED_DROPS } from '../config/viceCityConfig';

interface FeaturedDropsProps {
  onSelectCategory?: (category: string) => void;
}

export const FeaturedDrops: React.FC<FeaturedDropsProps> = ({ onSelectCategory }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Mouse drag-to-scroll state for desktop swiping
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);

  const totalSlides = FEATURED_DROPS.length;

  const scrollToIndex = (index: number) => {
    const container = sliderRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>('[data-drop-card]');
    if (!cards.length) return;

    const clamped = ((index % totalSlides) + totalSlides) % totalSlides;
    const targetCard = cards[clamped];
    if (targetCard) {
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      });
      setActiveIndex(clamped);
    }
  };

  const handleNext = () => {
    scrollToIndex(activeIndex + 1);
  };

  const handlePrev = () => {
    scrollToIndex(activeIndex - 1);
  };

  // Auto-sliding motion (pauses on touch / hover / drag)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      const container = sliderRef.current;
      if (!container) return;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 12) {
        scrollToIndex(0);
      } else {
        scrollToIndex(activeIndex + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, isPaused]);

  // Update active dot on native touch/trackpad scroll
  const handleScroll = () => {
    const container = sliderRef.current;
    if (!container) return;
    const cardWidth = 192; // approx card width + gap
    const idx = Math.round(container.scrollLeft / cardWidth);
    if (idx >= 0 && idx < totalSlides && idx !== activeIndex) {
      setActiveIndex(idx);
    }
  };

  // Mouse drag handlers for smooth desktop left-to-right swiping
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = sliderRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    draggedDistanceRef.current = 0;
    setIsPaused(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.25;
    draggedDistanceRef.current = Math.abs(walk);
    sliderRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsPaused(false);
  };

  return (
    <section className="px-4 mt-7">
      <div className="flex items-start justify-between gap-2 mb-3.5">
        <div>
          <h2 className="text-[19px] font-bold text-[#141414] tracking-tight leading-tight">
            Featured in-store drops
          </h2>
          <p className="text-[12px] text-[#686662] mt-0.5">
            Swipe through real pieces at Indira Market
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-semibold bg-[#F3E5C2] text-[#7D5B19] border border-[#E5D09F]">
            Export Surplus
          </span>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous drop"
            className="w-7 h-7 rounded-full bg-white border border-[#DEDAD0] flex items-center justify-center text-[#181818] hover:border-[#C59B38] active:scale-95 transition-all shadow-2xs cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next drop"
            className="w-7 h-7 rounded-full bg-white border border-[#DEDAD0] flex items-center justify-center text-[#181818] hover:border-[#C59B38] active:scale-95 transition-all shadow-2xs cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Sliding & Swipeable Track */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1 select-none cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {FEATURED_DROPS.map((item) => (
          <div
            key={item.id}
            data-drop-card
            onClick={() => {
              if (draggedDistanceRef.current < 8) {
                onSelectCategory?.(item.category);
              }
            }}
            className="snap-start shrink-0 w-[184px] sm:w-[192px] group cursor-pointer rounded-2xl overflow-hidden bg-white border border-[#E6E4DD] hover:border-[#C59B38] transition-all duration-300 shadow-xs flex flex-col"
          >
            <div className="relative h-40 w-full overflow-hidden bg-[#F4F2ED] p-1.5 pb-0">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#E9E6DF]">
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
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

      {/* Swipe Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        {FEATURED_DROPS.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === idx
                ? 'w-5 bg-[#C59B38]'
                : 'w-1.5 bg-[#D8D3C8] hover:bg-[#B8B2A6]'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
