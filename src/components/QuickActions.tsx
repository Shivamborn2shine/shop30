import React from 'react';
import { Phone, MapPin, MessageSquare, Star } from 'lucide-react';
import { STORE_CONFIG } from '../config/store.config';

interface QuickActionsProps {
  onDirectReview: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onDirectReview }) => {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Hi ${STORE_CONFIG.name}, I visited your Indira Market store and want to inquire about current garment stock!`
  )}`;

  return (
    <div className="px-4 mt-3 grid grid-cols-4 gap-2">
      {/* 1. WhatsApp Chat */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#12131A] hover:bg-[#191B24] border border-[#252736] hover:border-[#25D366]/50 transition-all group shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform text-[#25D366]">
          <MessageSquare className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-white leading-tight">WhatsApp</span>
      </a>

      {/* 2. Call Store */}
      <a
        href={`tel:${STORE_CONFIG.contact.phone}`}
        className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#12131A] hover:bg-[#191B24] border border-[#252736] hover:border-white/30 transition-all group shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform text-white">
          <Phone className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-white leading-tight">Call Shop</span>
      </a>

      {/* 3. Directions */}
      <a
        href={STORE_CONFIG.links.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#12131A] hover:bg-[#191B24] border border-[#252736] hover:border-[#D4AF37]/50 transition-all group shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform text-[#D4AF37]">
          <MapPin className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-white leading-tight">Directions</span>
      </a>

      {/* 4. Direct Review */}
      <button
        type="button"
        onClick={onDirectReview}
        className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#12131A] hover:bg-[#191B24] border border-[#252736] hover:border-[#D4AF37]/50 transition-all group cursor-pointer shadow-sm"
      >
        <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform text-[#D4AF37]">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <span className="text-[11px] font-bold text-[#D4AF37] leading-tight">Review</span>
      </button>
    </div>
  );
};

