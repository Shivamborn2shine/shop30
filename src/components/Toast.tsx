import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-none animate-bounce">
      <div className="bg-[#181818] text-white px-4 py-3 rounded-2xl shadow-xl border border-[#C59B38]/50 flex items-center gap-2.5">
        <CheckCircle2 className="w-5 h-5 text-[#E5C168] shrink-0" />
        <span className="text-xs font-semibold tracking-wide">{message}</span>
      </div>
    </div>
  );
};
