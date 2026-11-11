import React from 'react';
import { ArrowRight } from 'lucide-react';
import { VICE_CITY_CONFIG } from '../config/viceCityConfig';

const WHATSAPP_ITEMS = [
  {
    id: 'winter-jackets',
    label: 'Winter Jackets',
    query: 'Hi Vice City! I want to check out your latest Winter Jackets & Puffers collection.',
    icon: (
      <svg className="w-4 h-4 text-[#347844]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H9l-2 3-5 2v12l4 1v-9l1-1v11h10V10l1 1v9l4-1V7l-5-2-2-3Z" />
        <path d="M12 5v15" />
      </svg>
    ),
  },
  {
    id: 'branded-tees',
    label: 'Branded Tees',
    query: 'Hi Vice City! Do you have new Branded Tees & Sweatshirts in stock?',
    icon: (
      <svg className="w-4 h-4 text-[#347844]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    id: 'denims-cargos',
    label: 'Denims & Cargos',
    query: 'Hi Vice City! Looking for export surplus Denims & Cargos. What sizes are available?',
    icon: (
      <svg className="w-4 h-4 text-[#347844]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h12l2 20h-5.5L12 10 9.5 22H4L6 2Z" />
        <path d="M6 6h12" />
      </svg>
    ),
  },
  {
    id: 'check-sizes',
    label: 'Check Sizes',
    query: 'Hi Vice City! Can you help me check size availability for an item I liked?',
    icon: (
      <svg className="w-4 h-4 text-[#347844]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z" />
      </svg>
    ),
  },
];

export const WhatsAppCatalogue: React.FC = () => {
  const openWhatsAppQuery = (query: string) => {
    const encoded = encodeURIComponent(query);
    const url = `https://wa.me/${VICE_CITY_CONFIG.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="px-4 mt-7">
      <div className="rounded-3xl bg-[#F3F6F2] border border-[#DCE5D8] p-4 shadow-xs">
        <div className="flex items-start gap-2.5">
          {/* WhatsApp Green Outline Icon */}
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[#2E7D32] shrink-0 mt-0.5">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#141414] tracking-tight">
                Shop on WhatsApp
              </h2>
              <span className="text-[#C5CFC0] font-light">|</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#DFEFE0] text-[#286634]">
                Catalogue coming soon
              </span>
            </div>

            <p className="text-[12px] text-[#4E564C] mt-1 leading-snug">
              Ask our team about availability, sizes, or reserve a piece.
            </p>
          </div>
        </div>

        {/* 2x2 Quick Inquiry Pills */}
        <div className="grid grid-cols-2 gap-2.5 mt-3.5">
          {WHATSAPP_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openWhatsAppQuery(item.query)}
              className="flex items-center justify-between px-3 py-2.5 rounded-full bg-white/90 hover:bg-white border border-[#CEDBC9] text-left transition-all active:scale-[0.98] shadow-2xs group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="shrink-0">{item.icon}</span>
                <span className="text-[12px] font-semibold text-[#181818] truncate">
                  {item.label}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#347844] shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
