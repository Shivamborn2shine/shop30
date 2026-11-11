import { useState, useCallback } from 'react';
import { ReviewLength, ReviewLanguage } from '../types';
import { STORE_CONFIG } from '../config/store.config';

interface SynthesisContext {
  items: string[];
  itemsText: string;
  userNotes: string;
  allHighlights: string[];
  length: ReviewLength;
}

export function useReviewEngine(
  confirmedServices: string[],
  selectedHighlightsMap: Record<string, string[]>,
  customerNotes: string
) {
  const [length, setLength] = useState<ReviewLength>('SHORT');
  const [language, setLanguage] = useState<ReviewLanguage>('ENGLISH');
  const [draft, setDraft] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const synthesizeEnglish = useCallback(({ itemsText, userNotes, allHighlights, length }: SynthesisContext): string => {
    if (userNotes.trim().length > 0) {
      const clean = /[.!?]$/.test(userNotes) ? userNotes : userNotes + '.';
      if (length === 'SHORT') {
        return `${clean} Visited ${STORE_CONFIG.name} in Indira Market for ${itemsText}. Recommended shop!`;
      } else {
        const hlSnippet = allHighlights.length > 0 ? ` Appreciated the ${allHighlights[0].toLowerCase()}.` : '';
        return `${clean} Visited ${STORE_CONFIG.name} at Shop 30, Indira Market for ${itemsText}.${hlSnippet} Good experience.`;
      }
    }

    const topHl = allHighlights.length > 0 ? allHighlights[0] : null;
    const secondHl = allHighlights.length > 1 ? allHighlights[1] : null;

    if (length === 'SHORT') {
      if (topHl) {
        const shortOptions = [
          `Great experience at ${STORE_CONFIG.name} in Indira Market picking up ${itemsText}. Loved the ${topHl.toLowerCase()}!`,
          `Checked out ${STORE_CONFIG.name} for ${itemsText}. The ${topHl.toLowerCase()} stood out. Definitely worth visiting in Dehradun!`,
          `Solid export surplus collection at ${STORE_CONFIG.name}. Got ${itemsText} — ${topHl.toLowerCase()} was on point.`
        ];
        return shortOptions[Math.floor(Math.random() * shortOptions.length)];
      }
      return `Had a great visit at ${STORE_CONFIG.name} in Indira Market for ${itemsText}. Clean shop and helpful staff!`;
    }

    if (length === 'BALANCED') {
      let highlightSentence = '';
      if (topHl && secondHl) {
        highlightSentence = ` The ${topHl.toLowerCase()} and ${secondHl.toLowerCase()} were impressive.`;
      } else if (topHl) {
        highlightSentence = ` Especially liked the ${topHl.toLowerCase()}.`;
      }
      return `Visited ${STORE_CONFIG.name} at Indira Market, Rajpur Road for ${itemsText}.${highlightSentence} Genuine international brand garments at fair prices, and the staff is very polite. Will visit again!`;
    }

    // DETAILED
    const hlListText = allHighlights.length > 0 
      ? ` Particularly noticed the ${allHighlights.slice(0, 3).map(h => h.toLowerCase()).join(', ')}.`
      : '';
    return `Really glad I stopped by ${STORE_CONFIG.name} (Shop 30, Indira Market) for ${itemsText}. Their export surplus collection for boys and girls has genuine international brand quality that's hard to find in Dehradun.${hlListText} Great dealing, fair rates, and spotless garments. Highly recommend checking them out!`;
  }, []);

  const synthesizeHinglish = useCallback(({ itemsText, userNotes, allHighlights, length }: SynthesisContext): string => {
    if (userNotes.trim().length > 0) {
      const clean = /[.!?]$/.test(userNotes) ? userNotes : userNotes + '.';
      return `${clean} ${STORE_CONFIG.name} Indira Market se ${itemsText} liya, bohot accha experience raha!`;
    }

    const topHl = allHighlights.length > 0 ? allHighlights[0] : null;

    if (length === 'SHORT') {
      if (topHl) {
        return `${STORE_CONFIG.name} Indira Market se ${itemsText} liya, ${topHl.toLowerCase()} ek number hai! Must visit shop.`;
      }
      return `${STORE_CONFIG.name} ka collection bohot sahi hai, ${itemsText} ki quality aur fit perfect aayi!`;
    }

    if (length === 'BALANCED') {
      const hlNote = topHl ? ` Khaaskar inka ${topHl.toLowerCase()} bohot pasand aaya.` : '';
      return `Indira Market me ${STORE_CONFIG.name} visit kiya for ${itemsText}.${hlNote} International brand surplus kapde kaafi reasonable rates me mil gaye. Staff ka behaviour bhi bohot polite tha.`;
    }

    return `Dehradun me genuine export surplus garments ke liye ${STORE_CONFIG.name} (Shop 30, Indira Market) best spot hai. ${itemsText} purchase kiya aur fabric se lekar fitting sab top-notch hai. Boys aur girls dono ke liye fresh collection rehta hai. Highly recommended!`;
  }, []);

  const generateReview = useCallback((targetLang?: ReviewLanguage, targetLen?: ReviewLength): string => {
    const langToUse = targetLang || language;
    const lenToUse = targetLen || length;

    const items = confirmedServices.length > 0 ? confirmedServices : ["Export Surplus Brand"];
    const itemsText = items.join(' and ');

    const allHighlights: string[] = [];
    Object.values(selectedHighlightsMap).forEach(list => {
      if (Array.isArray(list)) allHighlights.push(...list);
    });

    const ctx: SynthesisContext = {
      items,
      itemsText,
      userNotes: customerNotes,
      allHighlights,
      length: lenToUse
    };

    return langToUse === 'HINGLISH' ? synthesizeHinglish(ctx) : synthesizeEnglish(ctx);
  }, [confirmedServices, selectedHighlightsMap, customerNotes, language, length, synthesizeEnglish, synthesizeHinglish]);

  return {
    length,
    setLength,
    language,
    setLanguage,
    draft,
    setDraft,
    isTyping,
    setIsTyping,
    generateReview
  };
}

