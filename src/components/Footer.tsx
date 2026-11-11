import React from 'react';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import { VICE_CITY_CONFIG } from '../config/viceCityConfig';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  return (
    <footer className="mt-7 pb-10">
      {/* Visit our store section */}
      <div className="px-4">
        <h2 className="text-[19px] font-bold text-[#141414] tracking-tight mb-3">
          Visit our store
        </h2>

        <div className="rounded-3xl bg-white border border-[#E6E4DD] p-4 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="pt-1 pl-1 shrink-0">
              <MapPin className="w-5 h-5 text-[#9A7426] stroke-[1.8]" />
            </div>

            <div className="h-11 w-[1px] bg-[#E5E2DC] shrink-0 mt-0.5" />

            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-medium text-[#181818] leading-snug">
                Shop No. 30, Rajpur Road, Indira Market, Dehradun, Uttarakhand 248001
              </p>

              <div className="flex flex-wrap items-center gap-2.5 mt-2.5">
                <a
                  href={`tel:${VICE_CITY_CONFIG.phoneRaw}`}
                  className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#9A7426] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9A7426]" />
                  <span>{VICE_CITY_CONFIG.phoneDisplay}</span>
                </a>

                <span className="text-[#DCD8D0]">|</span>

                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#181818]">
                  <Clock className="w-3.5 h-3.5 text-[#9A7426]" />
                  <span className="px-2.5 py-0.5 rounded-full bg-[#EFECE6] text-[#181818] font-semibold">
                    10 AM – 9 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            <a
              href={VICE_CITY_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-full font-semibold text-[12.5px] text-white flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-[0.98]"
              style={{
                background: 'linear-gradient(90deg, #B5892E 0%, #C69B3C 50%, #9E731F 100%)',
              }}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Get directions</span>
            </a>

            <a
              href={`tel:${VICE_CITY_CONFIG.phoneRaw}`}
              className="py-2.5 px-4 rounded-full bg-white hover:bg-[#FAF9F5] border border-[#D5D1C8] text-[#181818] font-semibold text-[12.5px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
            >
              <Phone className="w-3.5 h-3.5 text-[#9A7426]" />
              <span>Call store</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Brand Sign-off */}
      <div className="mt-8 pt-6 border-t border-[#ECE9E2] text-center px-4">
        <div
          className="w-9 h-9 rounded-xl mx-auto flex items-center justify-center shadow-xs border border-[#C69F4B]/50"
          style={{
            background: 'linear-gradient(135deg, #E8CF8C 0%, #C59B38 55%, #9B721E 100%)',
          }}
        >
          <span className="font-serif font-bold text-[#141414] text-xs tracking-tight">
            VC
          </span>
        </div>

        <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8C6518] mt-2.5">
          VICE CITY • DEHRADUN
        </p>
        <p className="text-[11px] text-[#686662] mt-0.5">
          Export Surplus • Boys &amp; Girls Wear
        </p>

        <button
          type="button"
          onClick={onReplayIntro}
          className="mt-3 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-[#181818] hover:text-[#8C6518] transition-colors"
        >
          <span role="img" aria-label="zipper" className="text-sm">
            🧷
          </span>
          <span className="underline underline-offset-2">
            Replay jacket opening
          </span>
        </button>

        <p className="text-[10.5px] text-[#8E8B85] mt-3">
          © {new Date().getFullYear()} Vice City. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
