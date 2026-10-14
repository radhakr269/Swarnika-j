import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SwarnikaHero: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleNav = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('bestsellers-section') || document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#F5EFE6] border-b border-[#E8DED1] overflow-hidden">
      {/* Edge-to-Edge full width container matching reference image */}
      <div className="w-full flex flex-row items-stretch justify-between min-h-[290px] xs:min-h-[320px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[590px] xl:min-h-[640px]">
        
        {/* Left Side (CSS Selector 1): Typography & 3 CTA Buttons */}
        <div className="w-[56%] xs:w-[54%] sm:w-1/2 md:w-5/12 z-20 flex flex-col justify-center pl-3 xs:pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-1.5 xs:pr-2.5 py-3 sm:py-6 md:py-10 space-y-1.5 xs:space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-5">
          {/* Kicker: MODERN HEIRLOOMS — */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-xs uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#6E5746] font-medium">
            <span>MODERN HEIRLOOMS</span>
            <span className="w-3 xs:w-4 sm:w-7 h-[1px] bg-[#6E5746]" />
          </div>

          {/* Heading: Timeless Jewellery, Crafted to Be Seen. */}
          <h1 className="font-serif-luxury text-[17px] xs:text-[21px] sm:text-3xl md:text-5xl lg:text-[56px] xl:text-[64px] font-normal tracking-tight text-[#4A1622] leading-[1.1]">
            Timeless Jewellery, <br />
            Crafted to Be Seen.
          </h1>

          {/* Paragraph */}
          <p className="text-[#635043] text-[7.5px] xs:text-[9px] sm:text-xs md:text-sm lg:text-[15px] max-w-[210px] sm:max-w-sm md:max-w-md font-light leading-relaxed">
            Exquisite gold-plated and fashion jewellery for women and men, designed for modern moments and lasting impressions.
          </p>

          {/* 3 Buttons: Shop Women, Shop Men, Explore Collections */}
          <div className="pt-1 sm:pt-2 flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2.5">
            <button
              onClick={() => handleNav('women')}
              className="group inline-flex items-center gap-1 sm:gap-1.5 bg-[#4A1622] hover:bg-[#381019] text-white text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-none transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => handleNav('men')}
              className="group inline-flex items-center gap-1 sm:gap-1.5 border border-[#BCADA0] hover:bg-[#EDE3D6] text-[#3A2E26] text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-none transition-colors shrink-0 cursor-pointer"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => handleNav('all')}
              className="group inline-flex items-center gap-1 sm:gap-1.5 border border-[#BCADA0] hover:bg-[#EDE3D6] text-[#3A2E26] text-[7px] xs:text-[8px] sm:text-[9.5px] md:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] font-medium px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-none transition-colors shrink-0 cursor-pointer"
            >
              <span>Explore Collections</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Model Image (CSS Selector 2) & Circular Badge */}
        <div className="w-[44%] xs:w-[46%] sm:w-1/2 md:w-7/12 relative flex items-center justify-end overflow-hidden">
          {/* Model Image (CSS Selector 2: div:nth-of-type(2) > img:nth-of-type(1)) */}
          <img
            src="/assist/image/banners/hero_banner.jpg"
            alt="Swarnika jewellery model wearing gold earrings and necklace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 90%, transparent 100%)',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6] via-transparent to-[#F5EFE6]/15 pointer-events-none" />

          {/* Circular Badge on the right: "JEWELLERY FOR BRIGHTER TOMORROWS" */}
          <div className="relative z-30 pointer-events-none select-none text-center pr-2 xs:pr-3 sm:pr-6 md:pr-10 lg:pr-14">
            <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-22 sm:h-22 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border border-[#BFAFA0] bg-[#FAF6F0]/90 backdrop-blur-xs flex flex-col items-center justify-center p-1 sm:p-2 text-[#4A1622] shadow-xs">
              <span className="text-[5px] xs:text-[6px] sm:text-[7.5px] md:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium leading-tight">
                JEWELLERY FOR
              </span>
              <span className="text-[6px] xs:text-[7.5px] sm:text-[9px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.22em] font-serif font-bold text-[#4A1622] leading-tight my-0.5">
                BRIGHTER
              </span>
              <span className="text-[5px] xs:text-[6px] sm:text-[7.5px] md:text-[9px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium leading-tight">
                TOMORROWS
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
