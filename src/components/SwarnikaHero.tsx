import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ROUTES } from '../config/navigation';

export const SwarnikaHero: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FAF7F2] border-b border-[#E8DED1] overflow-hidden">
      {/* ─────────────────────────────────────────────────────────────
          DESKTOP & TABLET VIEWPORT (md and above: min-h-[620px] - 720px)
          Matches Desktop Reference (Image 15)
          ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1536px] mx-auto hidden md:flex md:flex-row items-stretch justify-between min-h-[600px] lg:min-h-[660px] xl:min-h-[720px] relative">
        
        {/* Left Content Zone (approx 44% width) */}
        <div className="w-[48%] lg:w-[44%] xl:w-[42%] z-20 flex flex-col justify-center pl-6 lg:pl-14 xl:pl-20 pr-4 py-12 lg:py-16 space-y-5 lg:space-y-6">
          
          {/* Eyebrow / Kicker */}
          <div className="flex items-center gap-2.5 text-xs lg:text-[13px] uppercase tracking-[0.24em] text-[#6C5849] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
            <span>MODERN HEIRLOOMS</span>
            <span className="w-10 h-[1px] bg-[#BFAFA0]" aria-hidden="true" />
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-luxury text-4xl lg:text-5xl xl:text-[58px] font-normal tracking-tight text-[#4A101C] leading-[1.08] text-balance">
            Timeless Jewellery, <br />
            Crafted to Be Seen.
          </h1>

          {/* Description */}
          <p className="text-[#574435] text-sm lg:text-[15px] xl:text-[16px] max-w-md font-light leading-relaxed">
            Exquisite gold-plated and fashion jewellery for women and men, designed for modern moments and lasting impressions.
          </p>

          {/* 3 Refined CTA Buttons (Shop Women -> /women, Shop Men -> /men, Explore Collections -> /collections) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to={ROUTES.WOMEN}
              className="group inline-flex items-center justify-center gap-2 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium px-5 py-3.5 transition-all shadow-xs hover:shadow-md cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/50"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to={ROUTES.MEN}
              className="group inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#EDE0D1] border border-[#BFAFA0] text-[#201914] text-xs uppercase tracking-[0.18em] font-medium px-4.5 py-3.5 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/50"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to={ROUTES.COLLECTIONS}
              className="group inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#EDE0D1] border border-[#BFAFA0] text-[#201914] text-xs uppercase tracking-[0.18em] font-medium px-4 py-3.5 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/50"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>

        {/* Right Image Zone (approx 56% width with seamless gradient edge) */}
        <div className="w-[52%] lg:w-[56%] xl:w-[58%] relative flex items-center justify-end overflow-hidden">
          <img
            src="/assist/image/banners/hero_banner.jpg"
            alt="Swarnika jewellery campaign featuring master-crafted gold necklace and earrings"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_28%] absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%, black 95%, transparent 100%)',
            }}
          />

          {/* Ambient warm gradient scrim for soft lighting transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-transparent to-[#FAF7F2]/10 pointer-events-none" />

          {/* Circular Badge: JEWELLERY FOR BRIGHTER TOMORROWS (Desktop, matching Reference Image 15) */}
          <div className="absolute top-12 lg:top-16 right-8 lg:right-16 z-20 pointer-events-none select-none">
            <div className="w-26 h-26 lg:w-30 lg:h-30 xl:w-32 xl:h-32 rounded-full border border-[#BFAFA0]/80 bg-[#FAF7F2]/88 backdrop-blur-xs flex flex-col items-center justify-center p-2 text-center shadow-xs">
              <span className="w-6 h-[0.75px] bg-[#A77B3D] mb-1.5" />
              <span className="text-[7.5px] lg:text-[8px] uppercase tracking-[0.22em] text-[#6C5849] font-medium leading-tight">
                JEWELLERY
              </span>
              <span className="text-[8.5px] lg:text-[9.5px] uppercase tracking-[0.2em] font-serif-luxury text-[#4A101C] font-semibold leading-tight my-0.5">
                FOR BRIGHTER
              </span>
              <span className="text-[7.5px] lg:text-[8px] uppercase tracking-[0.22em] text-[#6C5849] font-medium leading-tight">
                TOMORROWS
              </span>
              <span className="w-6 h-[0.75px] bg-[#A77B3D] mt-1.5" />
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MOBILE VIEWPORT (< md: 320px - 767px)
          Matches Mobile Reference (Image 8)
          Features prominent jewellery imagery with circular badge,
          followed by high-legibility editorial text zone and 44px+ CTAs.
          ───────────────────────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col w-full bg-[#FAF7F2]">
        
        {/* Mobile Visual Header with Image & Circular Badge */}
        <div className="relative w-full aspect-[4/3] xs:aspect-[16/11] bg-[#EFE5D8] overflow-hidden">
          <img
            src="/assist/image/banners/hero_banner.jpg"
            alt="Swarnika jewellery campaign featuring master-crafted gold necklace and earrings"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-[center_25%]"
          />

          {/* Circular Floating Badge (Mobile Top-Right, matching Reference Image 8) */}
          <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none select-none">
            <div className="w-20 h-20 rounded-full border border-[#BFAFA0]/90 bg-[#FAF7F2]/90 backdrop-blur-xs flex flex-col items-center justify-center p-1.5 text-center shadow-xs">
              <span className="w-4 h-[0.75px] bg-[#A77B3D] mb-1" />
              <span className="text-[6.5px] uppercase tracking-[0.2em] text-[#6C5849] font-medium leading-tight">
                JEWELLERY
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.18em] font-serif-luxury text-[#4A101C] font-semibold leading-tight my-0.5">
                FOR BRIGHTER
              </span>
              <span className="text-[6.5px] uppercase tracking-[0.2em] text-[#6C5849] font-medium leading-tight">
                TOMORROWS
              </span>
              <span className="w-4 h-[0.75px] bg-[#A77B3D] mt-1" />
            </div>
          </div>

          {/* Bottom subtle edge blend to ivory text zone */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none" />
        </div>

        {/* Mobile Editorial Text Zone */}
        <div className="px-4 xs:px-5 py-5 xs:py-6 flex flex-col space-y-3.5 bg-[#FAF7F2]">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#6C5849] font-medium">
            <Sparkles className="w-3 h-3 text-[#A77B3D]" />
            <span>MODERN HEIRLOOMS</span>
            <span className="w-8 h-[1px] bg-[#BFAFA0]" aria-hidden="true" />
          </div>

          {/* Heading (32px to 38px, bold, prominent) */}
          <h1 className="font-serif-luxury text-[32px] xs:text-[36px] font-normal tracking-tight text-[#4A101C] leading-[1.1] text-balance">
            Timeless Jewellery, <br />
            Crafted to Be Seen.
          </h1>

          {/* Description (14px, readable) */}
          <p className="text-[#574435] text-[13.5px] xs:text-[14.5px] font-light leading-relaxed">
            Exquisite gold-plated and fashion jewellery for women and men, designed for modern moments and lasting impressions.
          </p>

          {/* Mobile CTA Stack with 44px+ touch targets */}
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to={ROUTES.WOMEN}
              className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium px-5 py-3 transition-colors shadow-xs"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to={ROUTES.MEN}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-[#FAF7F2] border border-[#BFAFA0] text-[#201914] text-[11px] uppercase tracking-[0.16em] font-medium px-3 py-2.5 transition-colors"
              >
                <span>Shop Men</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <Link
                to={ROUTES.COLLECTIONS}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 bg-[#FAF7F2] border border-[#BFAFA0] text-[#201914] text-[11px] uppercase tracking-[0.16em] font-medium px-3 py-2.5 transition-colors"
              >
                <span>Collections</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
