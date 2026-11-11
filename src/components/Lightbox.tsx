import React from 'react';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  caption: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ isOpen, imageSrc, caption, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9998] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/80 hover:text-white p-2 z-10 cursor-pointer transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageSrc}
          alt={caption}
          className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-[#D4AF37]/30"
        />
        {caption && (
          <p className="text-center text-xs text-slate-300 mt-3 font-medium px-2">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};

