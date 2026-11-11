import React from 'react';
import { MapPin } from 'lucide-react';
import { STORE_CONFIG } from '../config/store.config';

export const Header: React.FC = () => {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    `Hi ${STORE_CONFIG.name}, I visited your Indira Market store and want to inquire about current garment stock!`
  )}`;

  return (
    <header className="sticky top-0 z-40 px-4 py-3 bg-[#FAF9F6]/95 backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Metallic Gold VC Badge */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E5C165] via-[#C99B38] to-[#9E721B] shadow-sm flex items-center justify-center text-[#18181B] font-serif font-extrabold text-[15px] tracking-tight">
          VC
        </div>

        {/* Vertical Divider */}
        <div className="h-7 w-[1.5px] bg-zinc-300 rounded-full" />

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-[16px] font-extrabold tracking-tight text-zinc-900 uppercase leading-none">
            {STORE_CONFIG.name}
          </h1>
          <span className="text-[11.5px] font-medium text-zinc-500 block mt-1">
            Indira Market · Dehradun
          </span>
        </div>
      </div>

      {/* Right Icon Buttons (Map Pin & WhatsApp) */}
      <div className="flex items-center gap-2">
        <a
          href={STORE_CONFIG.links.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl border border-zinc-700/80 bg-white hover:bg-zinc-100 active:scale-95 flex items-center justify-center text-zinc-900 transition-all"
          title="Location on Google Maps"
        >
          <MapPin className="w-4 h-4 stroke-[2]" />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl border border-zinc-700/80 bg-white hover:bg-zinc-100 active:scale-95 flex items-center justify-center text-zinc-900 transition-all"
          title="Chat on WhatsApp"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.11 19.76 7.85 19L7.55 18.82L4.43 19.64L5.26 16.6L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.32 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.56 14C16.31 13.87 15.09 13.27 14.87 13.19C14.64 13.11 14.48 13.07 14.31 13.31C14.15 13.56 13.67 14.12 13.53 14.28C13.38 14.45 13.24 14.47 12.99 14.35C12.74 14.22 11.94 13.96 11 13.12C10.26 12.46 9.77 11.65 9.62 11.4C9.48 11.15 9.6 11.02 9.73 10.9C9.84 10.79 9.98 10.61 10.1 10.47C10.22 10.33 10.26 10.22 10.35 10.06C10.43 9.89 10.39 9.75 10.33 9.63C10.26 9.5 9.77 8.29 9.56 7.79C9.36 7.31 9.16 7.38 9.01 7.37C8.86 7.36 8.7 7.36 8.53 7.36C8.37 7.36 8.1 7.42 7.87 7.67C7.65 7.92 7.01 8.52 7.01 9.73C7.01 10.95 7.9 12.12 8.02 12.29C8.15 12.45 9.77 14.95 12.25 16.02C12.84 16.28 13.3 16.43 13.66 16.55C14.25 16.74 14.79 16.71 15.22 16.65C15.7 16.58 16.69 16.05 16.89 15.47C17.1 14.89 17.1 14.4 17.04 14.29C16.97 14.18 16.81 14.12 16.56 14Z" />
          </svg>
        </a>
      </div>
    </header>
  );
};
