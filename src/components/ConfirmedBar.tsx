import React from 'react';
import { Edit2 } from 'lucide-react';
import { ShoppingIntent } from '../types';

interface ConfirmedBarProps {
  intent: ShoppingIntent;
  confirmedServices: string[];
  onEdit: () => void;
}

export const ConfirmedBar: React.FC<ConfirmedBarProps> = ({ intent, confirmedServices, onEdit }) => {
  const getIntentLabel = () => {
    if (intent === 'BOUGHT') return '🛍️ Bought';
    if (intent === 'TRIED_ON') return '🪞 Tried';
    return '👀 Browsed';
  };

  return (
    <div className="p-3 rounded-2xl bg-[#191B24] border border-[#252736] mb-4 flex items-center justify-between gap-2">
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#94A3B8] mb-1">
          Your Visit Details:
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-white/10 text-white mr-0.5">
            {getIntentLabel()}:
          </span>
          {confirmedServices.map((item) => (
            <span
              key={item}
              className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
            >
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="px-2.5 py-1 rounded-xl bg-[#12131A] hover:bg-white/10 text-xs font-bold text-white border border-[#252736] hover:border-white/30 transition-all flex items-center gap-1 flex-shrink-0 cursor-pointer"
      >
        <Edit2 className="w-3 h-3 text-[#D4AF37]" />
        <span>Edit</span>
      </button>
    </div>
  );
};

