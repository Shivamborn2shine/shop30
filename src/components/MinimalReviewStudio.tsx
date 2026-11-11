import React, { useState, useEffect, useRef } from 'react';
import { Check, Pencil, RefreshCw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_CONFIG } from '../config/store.config';

interface MinimalReviewStudioProps {
  onShowToast: (msg: string, icon?: string) => void;
}

const VISUAL_CATEGORIES = [
  {
    id: 'jackets',
    title: 'Jackets &\nPuffers',
    shortName: 'jacket',
    pluralName: 'jackets & puffers',
    image: 'assets/images/ViceCity/03_Black_Zip_Jacket_Mannequin.jpg',
    icon: (
      <svg className="w-5 h-5 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3l5 3v13a2 2 0 01-2 2h-3V3z" />
        <path d="M9 3L4 6v13a2 2 0 002 2h3V3z" />
        <path d="M9 3h6v18H9z" />
        <path d="M12 3v18" />
      </svg>
    )
  },
  {
    id: 'tees',
    title: 'Tees &\nSweatshirts',
    shortName: 'sweatshirt and tee',
    pluralName: 'tees & sweatshirts',
    image: 'assets/images/ViceCity/05_White_Corduroy_Overshirt_Pink_Tee.jpg',
    icon: (
      <svg className="w-5 h-5 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
      </svg>
    )
  },
  {
    id: 'denim',
    title: 'Denim &\nCargos',
    shortName: 'denim and cargos',
    pluralName: 'denims & cargos',
    image: 'assets/images/ViceCity/09_Store_Outerwear_Wall.jpg',
    icon: (
      <svg className="w-5 h-5 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h12l1 20h-5.5L12 10l-1.5 12H5L6 2z" />
        <path d="M6 6h12" />
      </svg>
    )
  },
  {
    id: 'girls',
    title: 'Girls Wear',
    shortName: 'girls wear collection',
    pluralName: 'girls wear pieces',
    image: 'assets/images/ViceCity/04_Pink_Graphic_Sweatshirt.jpg',
    icon: (
      <svg className="w-5 h-5 text-zinc-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3h8l-1.5 6L19 21H5l4.5-12L8 3z" />
        <path d="M9.5 9h5" />
      </svg>
    )
  }
];

const STANDOUT_PILLS = [
  'Fabric quality',
  'Great prices',
  'Perfect fit',
  'Latest styles',
  'Helpful staff',
  'Value for money'
];

export const MinimalReviewStudio: React.FC<MinimalReviewStudioProps> = ({ onShowToast }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['jackets']);
  const [selectedVibes, setSelectedVibes] = useState<string[]>(['Fabric quality', 'Great prices']);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [reviewText, setReviewText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [variationIdx, setVariationIdx] = useState<number>(0);

  const typewriterTimer = useRef<NodeJS.Timeout | null>(null);

  const buildReview = (
    catIds: string[],
    vibes: string[],
    language: 'EN' | 'HI',
    seed: number
  ): string => {
    const pickedObjs = VISUAL_CATEGORIES.filter((c) => catIds.includes(c.id));
    const itemPhrase =
      pickedObjs.length === 1
        ? `a great ${pickedObjs[0].shortName}`
        : pickedObjs.length > 1
        ? `${pickedObjs.map((p) => p.pluralName).join(' and ')}`
        : 'great outfits';

    const v1 = vibes[0]?.toLowerCase() || 'fabric quality';
    const v2 = vibes[1]?.toLowerCase() || 'the range of styles available';

    if (language === 'HI') {
      const hiTemplates = [
        `Vice City (Indira Market) se ${pickedObjs.map((p) => p.pluralName).join(' & ') || 'clothes'} liya. Inka ${v1} aur ${v2} sach me best hai. Dehradun me genuine surplus shopping ke liye must-visit!`,
        `Best clothing shop in Indira Market! ${pickedObjs.map((p) => p.pluralName).join(' and ') || 'Collection'} bohot fresh hai, khaaskar ${v1} & ${v2}. Highly recommended!`,
        `Visited Vice City for ${pickedObjs.map((p) => p.pluralName).join(' & ') || 'streetwear'}. Loved the ${v1} and ${v2}. Indira Market me sabse sahi store!`
      ];
      return hiTemplates[seed % hiTemplates.length];
    }

    const enTemplates = [
      `Found ${itemPhrase} at Vice City. Loved the ${v1} and ${v2}.`,
      `Picked up ${itemPhrase} at Vice City in Indira Market. Impressed by the ${v1} and ${v2}!`,
      `Great experience shopping at Vice City. Found ${itemPhrase} — the ${v1} and ${v2} really stood out.`
    ];
    return enTemplates[seed % enTemplates.length];
  };

  const animateText = (target: string) => {
    if (typewriterTimer.current) clearTimeout(typewriterTimer.current);
    setIsTyping(true);
    let idx = 0;

    const step = () => {
      if (idx <= target.length) {
        setReviewText(target.slice(0, idx));
        idx += 2;
        typewriterTimer.current = setTimeout(step, 12);
      } else {
        setReviewText(target);
        setIsTyping(false);
      }
    };
    step();
  };

  useEffect(() => {
    const nextText = buildReview(selectedCategories, selectedVibes, lang, variationIdx);
    animateText(nextText);
    return () => {
      if (typewriterTimer.current) clearTimeout(typewriterTimer.current);
    };
  }, [selectedCategories, selectedVibes, lang, variationIdx]);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((item) => item !== id)
          : prev
        : [...prev, id]
    );
  };

  const toggleVibe = (label: string) => {
    setSelectedVibes((prev) =>
      prev.includes(label)
        ? prev.length > 1
          ? prev.filter((item) => item !== label)
          : prev
        : [...prev, label]
    );
  };

  const handleCopyAndPost = async () => {
    if (typewriterTimer.current) {
      clearTimeout(typewriterTimer.current);
      typewriterTimer.current = null;
    }

    const fullGenerated = buildReview(selectedCategories, selectedVibes, lang, variationIdx);
    const finalReview = (isTyping ? fullGenerated : reviewText.trim()) || fullGenerated;
    if (isTyping) {
      setReviewText(finalReview);
      setIsTyping(false);
    }

    const targetUrl = STORE_CONFIG.reviews.writeReviewUrl;

    // 1. Synchronous DOM copy FIRST (while document is focused & inside user gesture)
    const syncExecCopy = (text: string): boolean => {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '0';
        ta.style.left = '0';
        ta.style.width = '2em';
        ta.style.height = '2em';
        ta.style.padding = '0';
        ta.style.border = 'none';
        ta.style.outline = 'none';
        ta.style.boxShadow = 'none';
        ta.style.background = 'transparent';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus({ preventScroll: true });
        ta.select();
        ta.setSelectionRange(0, text.length);
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
      } catch {
        return false;
      }
    };

    syncExecCopy(finalReview);

    // 2. Also await modern Async Clipboard API (with 150ms cap) before navigating
    // so Chrome/iOS/Android commits the clipboard buffer before focus leaves the page
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(finalReview),
          new Promise((resolve) => setTimeout(resolve, 150)),
        ]);
      } catch {
        syncExecCopy(finalReview);
      }
    }

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#C89B3C', '#E3B448', '#18181B']
    });

    onShowToast('Review copied! Redirecting to Google Reviews...', '✨');

    // 3. Redirect after clipboard is committed
    setTimeout(() => {
      const newWin = window.open(targetUrl, '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = targetUrl;
      }
    }, 250);
  };

  return (
    <section className="px-4 mt-4">
      {/* 3-Step Progress Indicator */}
      <div className="flex items-center justify-between px-1 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-[#C69635] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
            01
          </span>
          <span className="text-xs font-extrabold text-zinc-900">Your finds</span>
        </div>

        <div className="flex-1 h-[1px] bg-zinc-300 mx-2.5" />

        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-white border border-zinc-300 text-zinc-700 text-xs font-bold flex items-center justify-center">
            02
          </span>
          <span className="text-xs font-medium text-zinc-600">What you loved</span>
        </div>

        <div className="flex-1 h-[1px] bg-zinc-300 mx-2.5" />

        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-white border border-zinc-300 text-zinc-700 text-xs font-bold flex items-center justify-center">
            03
          </span>
          <span className="text-xs font-medium text-zinc-600">Your review</span>
        </div>
      </div>

      {/* STEP 1: What caught your eye? */}
      <div>
        <h3 className="text-[21px] font-extrabold text-zinc-900 tracking-tight leading-tight">
          What caught your eye?
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5 mb-3.5">
          Choose what you explored today.
        </p>

        {/* 2x2 Visual Category Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {VISUAL_CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`relative h-24 sm:h-28 rounded-2xl overflow-hidden bg-white text-left flex items-center transition-all cursor-pointer active:scale-[0.98] ${
                  active
                    ? 'border-2 border-[#C89B3C] shadow-[0_6px_18px_-4px_rgba(200,155,60,0.35)]'
                    : 'border border-zinc-200/90 shadow-2xs hover:border-zinc-300'
                }`}
              >
                {/* Right-side Garment Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute right-0 top-0 bottom-0 w-[68%] h-full object-cover object-center"
                />

                {/* Smooth Left-to-Right Cream/White Fade Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-45% to-transparent" />

                {/* Selected Checkmark Circle */}
                {active && (
                  <div className="absolute top-2 right-2 z-20 w-5 h-5 rounded-full bg-[#D1A23E] border border-white text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Left Icon & Label */}
                <div className="relative z-10 pl-3.5 pr-2 py-2.5 flex flex-col justify-center max-w-[60%]">
                  <div className="mb-1.5">{cat.icon}</div>
                  <span className="text-[13px] font-extrabold text-zinc-900 leading-tight whitespace-pre-line">
                    {cat.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: What stood out? */}
      <div className="mt-6">
        <h3 className="text-[20px] font-extrabold text-zinc-900 tracking-tight leading-tight">
          What stood out?
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5 mb-3">
          Pick what you loved the most.
        </p>

        <div className="flex flex-wrap gap-2">
          {STANDOUT_PILLS.map((pill) => {
            const active = selectedVibes.includes(pill);
            return (
              <button
                key={pill}
                type="button"
                onClick={() => toggleVibe(pill)}
                className={`px-3.5 py-2 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  active
                    ? 'bg-[#FAF3E0] border border-[#CE9F3E] text-zinc-900 font-bold shadow-2xs'
                    : 'bg-white border border-zinc-300 text-zinc-800 font-semibold hover:border-zinc-400'
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-[#B88628] stroke-[2.5]" />}
                <span>{pill}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: YOUR REVIEW Box */}
      <div className="mt-4 p-4 rounded-2xl bg-white border border-[#E6E2D8] shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Pencil className="w-3.5 h-3.5 text-[#B88628]" />
            <span className="text-xs font-extrabold tracking-widest text-[#B88628] uppercase">
              YOUR REVIEW
            </span>
          </div>
          <div className="text-[#D4A338] text-sm tracking-wider">★★★★★</div>
        </div>

        {/* Editable Inner Box */}
        <div className="p-3.5 rounded-xl border border-[#E5E2DC] bg-[#FCFBF9] relative">
          <textarea
            rows={2}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full bg-transparent text-[13.5px] text-zinc-800 font-medium leading-relaxed focus:outline-none resize-none"
          />
          {isTyping && (
            <span className="inline-block w-0.5 h-4 bg-[#C89B3C] animate-pulse align-middle" />
          )}
        </div>

        {/* Bottom Controls: Try Another Version & Language Switch */}
        <div className="mt-2.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setVariationIdx((prev) => prev + 1)}
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
            <span>Try another version</span>
          </button>

          <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200 text-[10.5px] font-bold">
            <button
              type="button"
              onClick={() => setLang('EN')}
              className={`px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                lang === 'EN' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('HI')}
              className={`px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                lang === 'HI' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Hinglish
            </button>
          </div>
        </div>
      </div>

      {/* PRIMARY GOLD CTA BUTTON */}
      <button
        type="button"
        onClick={handleCopyAndPost}
        className="mt-3.5 w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-[#C2902E] via-[#D8A946] to-[#B98627] hover:brightness-105 active:scale-[0.99] text-white font-bold text-[15px] shadow-[0_8px_22px_-4px_rgba(194,144,46,0.55)] transition-all flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs flex-shrink-0">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <div className="h-5 w-[1px] bg-white/35 mx-3" />
          <span className="tracking-tight font-bold">Copy & open Google Reviews</span>
        </div>
        <ArrowRight className="w-5 h-5 text-white stroke-[2.2]" />
      </button>
    </section>
  );
};
