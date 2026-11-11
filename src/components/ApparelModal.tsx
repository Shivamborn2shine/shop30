import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft, X, ArrowRight } from 'lucide-react';
import { ApparelCategory, ShoppingIntent } from '../types';
import { APPAREL_CATALOG } from '../data/apparelCatalog';

interface ApparelModalProps {
  isOpen: boolean;
  intent: ShoppingIntent;
  confirmedServices: string[];
  onConfirm: (selected: string[]) => void;
  onBack: () => void;
  onClose: () => void;
}

export const ApparelModal: React.FC<ApparelModalProps> = ({
  isOpen,
  intent,
  confirmedServices,
  onConfirm,
  onBack,
  onClose
}) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<ApparelCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const placeholderExamples = [
    "Leather Biker Jacket",
    "Monogram Puffer",
    "Corduroy Overshirt",
    "Export Surplus Tee",
    "Baggy Cargos",
    "Pink Graphic Sweatshirt"
  ];

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedList([...confirmedServices]);
    }
  }, [isOpen, confirmedServices]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderExamples.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [isOpen, placeholderExamples.length]);

  if (!isOpen) return null;

  const toggleItem = (name: string) => {
    setSelectedList((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleAddCustomSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed && !selectedList.includes(trimmed)) {
      setSelectedList((prev) => [...prev, trimmed]);
      setSearchQuery('');
    }
  };

  const filteredItems = APPAREL_CATALOG.filter((item) => {
    const matchesCat = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getHeadingText = () => {
    if (intent === 'BOUGHT') return 'What did you pick up? 🛍️';
    if (intent === 'TRIED_ON') return 'What did you try on? 🪞';
    return 'What caught your eye? 👀';
  };

  const getContinueButtonText = () => {
    if (selectedList.length === 0) return 'Continue to Store ➔';
    if (selectedList.length === 1) return `Continue with ${selectedList[0]} ➔`;
    return `Continue with ${selectedList.length} Garments ➔`;
  };

  return (
    <div className="fixed inset-0 z-[9000] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 animate-in fade-in">
      <div className="w-full max-w-md max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-[#12131A] border border-[#252736] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 pb-3 border-b border-[#252736] flex items-center justify-between bg-[#191B24]/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-[#12131A] hover:bg-white/10 border border-[#252736] flex items-center justify-center text-xs text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-base font-extrabold text-white">{getHeadingText()}</h3>
              <p className="text-[11px] text-[#94A3B8]">Tap all that apply — multi-select enabled</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#12131A] hover:bg-white/10 border border-[#252736] flex items-center justify-center text-xs text-[#94A3B8] hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 pb-2 flex-shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 text-[#94A3B8] w-4 h-4" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSearch()}
              placeholder={`Search garment (e.g. ${placeholderExamples[placeholderIndex]}...)`}
              className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#191B24] border border-[#252736] text-white text-xs placeholder:text-[#94A3B8] focus:outline-none focus:border-[#D4AF37] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleAddCustomSearch}
                className="absolute right-2.5 w-6 h-6 rounded-lg bg-[#D4AF37] hover:bg-amber-500 text-black text-xs font-black flex items-center justify-center transition-all cursor-pointer shadow"
              >
                ➔
              </button>
            )}
          </div>
        </div>

        {/* Active Selected Tray */}
        {selectedList.length > 0 && (
          <div className="px-4 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0 border-b border-[#252736]/50">
            <span className="text-[10px] font-bold text-[#94A3B8] uppercase whitespace-nowrap">Selected:</span>
            <div className="flex items-center gap-1.5">
              {selectedList.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 whitespace-nowrap"
                >
                  <span>✓ {name}</span>
                  <button
                    type="button"
                    onClick={() => toggleItem(name)}
                    className="hover:text-white cursor-pointer ml-0.5"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelectedList([])}
              className="text-[10px] text-red-400 hover:text-red-300 font-bold underline ml-1 whitespace-nowrap cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {/* Category Tabs */}
        <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
          {(
            [
              { id: 'ALL', label: 'All' },
              { id: 'OUTERWEAR', label: '🧥 Outerwear & Jackets' },
              { id: 'TOPS', label: '👕 Tops & Sweatshirts' },
              { id: 'BOTTOMS', label: '👖 Denims & Cargos' },
              { id: 'GIRLS', label: '✨ Girls Wear' },
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-black border border-[#D4AF37]'
                  : 'bg-[#191B24] text-[#94A3B8] hover:text-white border border-[#252736]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrollable Apparel Chips Grid */}
        <div className="p-4 pt-1 overflow-y-auto flex-1 max-h-[46vh] space-y-2">
          {filteredItems.map((item) => {
            const isSelected = selectedList.includes(item.name);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.name)}
                className={`w-full p-3 rounded-2xl bg-[#191B24] hover:bg-[#202230] border border-[#252736] text-left flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#D4AF37]/15 to-[#A855F7]/10 border-[#D4AF37] text-white shadow-[0_0_16px_-4px_rgba(212,175,55,0.4)]'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-xs font-bold text-white">{item.name}</span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-white ${
                    isSelected ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-black' : ''
                  }`}
                >
                  {isSelected ? '✓' : '+'}
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Footer with Dynamic Continue Button */}
        <div className="p-4 border-t border-[#252736] bg-[#191B24]/70 flex items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-[#94A3B8] hover:text-white underline cursor-pointer"
          >
            Skip review
          </button>
          <button
            type="button"
            onClick={() => onConfirm(selectedList)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 active:scale-95 text-black text-xs font-black shadow-[0_0_25px_-4px_rgba(212,175,55,0.35)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>{getContinueButtonText()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

