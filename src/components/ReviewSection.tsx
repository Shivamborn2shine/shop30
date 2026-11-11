import React, { useState, useEffect, useRef } from 'react';
import { Star, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ShoppingIntent, ReviewLength, ReviewLanguage } from '../types';
import { STORE_CONFIG } from '../config/store.config';
import { APPAREL_HIGHLIGHT_LIBRARY, UNIVERSAL_STORE_HIGHLIGHTS } from '../data/apparelCatalog';
import { ConfirmedBar } from './ConfirmedBar';

interface ReviewSectionProps {
  intent: ShoppingIntent;
  confirmedServices: string[];
  selectedHighlightsMap: Record<string, string[]>;
  onToggleHighlight: (groupKey: string, highlight: string) => void;
  customerNotes: string;
  onCustomerNotesChange: (notes: string) => void;
  length: ReviewLength;
  onLengthChange: (len: ReviewLength) => void;
  language: ReviewLanguage;
  onLanguageChange: (lang: ReviewLanguage) => void;
  reviewDraft: string;
  onGenerateReview: (targetLang?: ReviewLanguage, targetLen?: ReviewLength) => string;
  onEditServices: () => void;
  onDirectGoogle: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  intent,
  confirmedServices,
  selectedHighlightsMap,
  onToggleHighlight,
  customerNotes,
  onCustomerNotesChange,
  length,
  onLengthChange,
  language,
  onLanguageChange,
  reviewDraft,
  onGenerateReview,
  onEditServices,
  onDirectGoogle,
  onShowToast
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const reviewCardRef = useRef<HTMLDivElement>(null);
  const typewriterTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typewriter effect
  const typeReviewText = (text: string) => {
    if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    setDisplayText('');
    setIsTyping(true);

    let i = 0;
    const speed = 16;

    const typeNext = () => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
        typewriterTimeoutRef.current = setTimeout(typeNext, speed);
      } else {
        setIsTyping(false);
      }
    };
    typeNext();
  };

  useEffect(() => {
    if (reviewDraft) {
      typeReviewText(reviewDraft);
    }
    return () => {
      if (typewriterTimeoutRef.current) clearTimeout(typewriterTimeoutRef.current);
    };
  }, [reviewDraft]);

  const handleGenerateAndScroll = () => {
    const newDraft = onGenerateReview();
    typeReviewText(newDraft);

    if (reviewCardRef.current) {
      reviewCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      reviewCardRef.current.classList.add('ring-2', 'ring-[#D4AF37]');
      setTimeout(() => {
        reviewCardRef.current?.classList.remove('ring-2', 'ring-[#D4AF37]');
      }, 1500);
    }
  };

  const handleRephrase = () => {
    const newDraft = onGenerateReview();
    typeReviewText(newDraft);
  };

  const copyAndRedirectReview = async () => {
    const textToCopy = displayText.trim() || reviewDraft;
    const targetUrl = STORE_CONFIG.reviews.writeReviewUrl;

    // 1. Copy FIRST while document has focus and active user gesture
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus({ preventScroll: true });
      textarea.select();
      textarea.setSelectionRange(0, textToCopy.length);
      try {
        document.execCommand('copy');
      } catch (e) {
        console.error(e);
      }
      document.body.removeChild(textarea);
    };

    fallbackCopy();

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(textToCopy),
          new Promise((resolve) => setTimeout(resolve, 150)),
        ]);
      } catch {
        fallbackCopy();
      }
    }

    // 2. Trigger celebratory confetti & toast
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#F7E7A9', '#A855F7', '#FFFFFF']
    });

    onShowToast('Review copied! Opening Google Review page...', '📋');

    // 3. Redirect after clipboard is committed
    setTimeout(() => {
      const reviewTab = window.open(targetUrl, '_blank');
      if (!reviewTab || reviewTab.closed || typeof reviewTab.closed === 'undefined') {
        window.location.href = targetUrl;
      }
    }, 250);
  };

  const wordCount = customerNotes.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div
      id="aiSection"
      className="mx-4 mt-5 p-4 sm:p-5 rounded-3xl bg-[#12131A] border border-[#252736] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)] scroll-mt-20"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-[#252736] mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] text-base shadow">
            ★
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">How Was Your Experience?</h3>
            <p className="text-[11px] text-[#94A3B8]">Tap highlights from your visit — zero typing needed</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onDirectGoogle}
          className="px-2.5 py-1 rounded-lg bg-[#191B24] hover:bg-white/10 text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 flex items-center gap-1 transition-all cursor-pointer"
        >
          <span>Direct ⭐</span>
        </button>
      </div>

      {/* Confirmed Items Bar */}
      <ConfirmedBar
        intent={intent}
        confirmedServices={confirmedServices}
        onEdit={onEditServices}
      />

      {/* Optional Customer Notes */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="reviewCustomerNotes" className="text-xs font-bold text-slate-300">
            ✍️ Your own thoughts <span className="text-[10px] text-[#94A3B8] font-normal">(optional)</span>
          </label>
          <span className="text-[10px] text-[#94A3B8] font-medium">{wordCount} words</span>
        </div>
        <textarea
          id="reviewCustomerNotes"
          rows={2}
          value={customerNotes}
          onChange={(e) => onCustomerNotesChange(e.target.value)}
          placeholder="e.g. Loved the jacket quality and friendly dealing, great prices..."
          className="w-full p-3 rounded-xl bg-[#191B24] border border-[#252736] text-white text-xs placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
        />
      </div>

      {/* Dynamic Grouped Highlights */}
      <div className="space-y-3.5 mb-4">
        {confirmedServices.map((serviceName) => {
          const entry = APPAREL_HIGHLIGHT_LIBRARY[serviceName];
          if (!entry) return null;
          const groupKey = serviceName.replace(/\s+/g, '_').toLowerCase();
          const currentPicked = selectedHighlightsMap[groupKey] || [];

          return (
            <div
              key={serviceName}
              className="p-3.5 rounded-2xl bg-[#191B24] border border-[#252736]"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{entry.icon}</span>
                  <span className="text-xs font-extrabold text-white">{entry.title}</span>
                </div>
                <span className="text-[10px] text-[#94A3B8]">Tap to add</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {entry.highlights.map((hl) => {
                  const isPicked = currentPicked.includes(hl);
                  return (
                    <button
                      key={hl}
                      type="button"
                      onClick={() => onToggleHighlight(groupKey, hl)}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                        isPicked
                          ? 'bg-[#1A1A28] border-[#D4AF37] text-white shadow-[0_0_12px_-2px_rgba(212,175,55,0.35)]'
                          : 'bg-[#12131A] hover:bg-white/10 border-[#252736] text-slate-200'
                      }`}
                    >
                      {isPicked ? '✓ ' : '+ '}
                      {hl}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Universal Indira Market Store Experience */}
        <div className="p-3.5 rounded-2xl bg-[#191B24] border border-[#252736]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🤝</span>
              <span className="text-xs font-extrabold text-white">Indira Market Store Experience</span>
            </div>
            <span className="text-[10px] text-[#94A3B8]">Universal</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {UNIVERSAL_STORE_HIGHLIGHTS.map((hl) => {
              const currentPicked = selectedHighlightsMap['store_visit'] || [];
              const isPicked = currentPicked.includes(hl);
              return (
                <button
                  key={hl}
                  type="button"
                  onClick={() => onToggleHighlight('store_visit', hl)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${
                    isPicked
                      ? 'bg-[#1A1A28] border-[#D4AF37] text-white shadow-[0_0_12px_-2px_rgba(212,175,55,0.35)]'
                      : 'bg-[#12131A] hover:bg-white/10 border-[#252736] text-slate-200'
                  }`}
                >
                  {isPicked ? '✓ ' : '+ '}
                  {hl}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Length & Language Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#191B24] border border-[#252736] mb-4">
        {/* Length */}
        <div className="flex items-center justify-between sm:justify-start gap-2">
          <span className="text-[11px] font-bold text-[#94A3B8]">Length:</span>
          <div className="flex items-center p-0.5 rounded-xl bg-[#12131A] border border-[#252736] text-[11px] font-bold">
            {(['SHORT', 'BALANCED', 'DETAILED'] as ReviewLength[]).map((lenOption) => (
              <button
                key={lenOption}
                type="button"
                onClick={() => {
                  onLengthChange(lenOption);
                  const updated = onGenerateReview(language, lenOption);
                  typeReviewText(updated);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  length === lenOption
                    ? 'bg-[#D4AF37] text-black font-extrabold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {lenOption.charAt(0) + lenOption.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <span className="text-[11px] font-bold text-[#94A3B8]">Language:</span>
          <div className="flex items-center p-0.5 rounded-xl bg-[#12131A] border border-[#252736] text-[11px] font-bold">
            {(['ENGLISH', 'HINGLISH'] as ReviewLanguage[]).map((langOption) => (
              <button
                key={langOption}
                type="button"
                onClick={() => {
                  onLanguageChange(langOption);
                  const updated = onGenerateReview(langOption, length);
                  typeReviewText(updated);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  language === langOption
                    ? 'bg-[#D4AF37] text-black font-extrabold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {langOption.charAt(0) + langOption.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Help Me Write Review Button */}
      <button
        type="button"
        onClick={handleGenerateAndScroll}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 active:scale-[0.99] text-black text-xs font-black tracking-wide uppercase shadow-[0_0_25px_-4px_rgba(212,175,55,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer mb-4"
      >
        <span>✨</span>
        <span>Help Me Write Review ➔</span>
      </button>

      {/* Review Draft Card */}
      <div
        ref={reviewCardRef}
        id="reviewOutputCard"
        className="p-4 rounded-2xl bg-gradient-to-b from-[#191B24] to-[#12131A] border border-[#D4AF37]/40 shadow-[0_0_25px_-4px_rgba(212,175,55,0.35)] transition-all duration-300 scroll-mt-24"
      >
        <div className="flex items-center justify-between pb-2.5 border-b border-[#252736] mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-sm">✦</span>
            <span className="text-xs font-extrabold text-white">Your Review Draft</span>
          </div>
          <button
            type="button"
            onClick={handleRephrase}
            className="px-2.5 py-1 rounded-lg bg-[#12131A] hover:bg-white/10 text-xs font-bold text-slate-200 border border-[#252736] flex items-center gap-1 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-[#D4AF37]" />
            <span>Rephrase</span>
          </button>
        </div>

        {/* Text Display with Animated Typewriter */}
        <div className="min-h-[60px] flex items-start mb-3.5">
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {displayText}
          </p>
          {isTyping && (
            <span className="inline-block w-1.5 h-4 bg-[#D4AF37] ml-0.5 animate-pulse" />
          )}
        </div>

        {/* Google Launch Button (Popup-Blocker Proof) */}
        <button
          type="button"
          onClick={copyAndRedirectReview}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-white via-slate-100 to-slate-200 hover:from-white hover:to-white active:scale-[0.98] text-slate-950 font-black text-xs shadow-lg transition-all flex items-center justify-between gap-2 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="text-left font-black tracking-tight">Copy & Open Google Review Page</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-900" />
        </button>
      </div>
    </div>
  );
};

