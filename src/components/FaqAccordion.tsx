import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/faqs';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="px-4 mt-6">
      <h3 className="text-sm font-black text-white uppercase tracking-wider font-serif mb-3">Frequently Asked</h3>
      <div className="space-y-2">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="rounded-2xl bg-[#12131A] border border-[#252736] overflow-hidden">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-bold text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3.5 text-[11px] text-[#94A3B8] leading-relaxed animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

