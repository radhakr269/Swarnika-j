import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useShop } from '../context/ShopContext';

export const DualPromoBanner: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleWeddingClick = () => {
    setSelectedCategory('rings');
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGiftsClick = () => {
    setSelectedCategory('necklaces');
    const el = document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-6 sm:py-8 md:py-10 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
          
          {/* Left Promo Card: Crafted for Life's Special Moments */}
          <div className="group relative min-h-[200px] xs:min-h-[220px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden flex flex-col justify-center p-4 xs:p-5 sm:p-7 md:p-8 shadow-xs border border-[#E8DECE]">
            <SafeImage
              src="/public/assist/image/banners/promo_bridal.jpg"
              alt="Stacked diamond rings on round stone pedestal with dried florals"
              fallbackCategory="Bridal & Wedding"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2 sm:space-y-3 max-w-xs text-left">
              <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#E8D9CD] font-medium block">
                THE BRIDAL SUITE
              </span>
              <h3 className="font-serif-luxury text-lg xs:text-xl sm:text-2xl md:text-3xl text-[#FAF7F2] font-normal leading-[1.12]">
                Crafted <br />
                for Life's <br />
                Sacred Moments
              </h3>

              <div className="pt-1">
                <button
                  onClick={handleWeddingClick}
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#4A1622] hover:bg-[#381019] text-white text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-none transition-colors shadow-xs cursor-pointer"
                >
                  <span>EXPLORE BRIDAL</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Promo Card: A Gift That Lasts Forever */}
          <div className="group relative min-h-[200px] xs:min-h-[220px] sm:min-h-[280px] md:min-h-[320px] overflow-hidden flex flex-col justify-center p-4 xs:p-5 sm:p-7 md:p-8 shadow-xs border border-[#E8DECE]">
            <SafeImage
              src="/public/assist/image/banners/promo_everyday.jpg"
              alt="Woman wearing teardrop diamond necklace next to luxury gift box"
              fallbackCategory="Fine Gifts"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-2 sm:space-y-3 max-w-xs text-left">
              <span className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#E8D9CD] font-medium block">
                CURATED EDITS
              </span>
              <h3 className="font-serif-luxury text-lg xs:text-xl sm:text-2xl md:text-3xl text-white font-normal leading-[1.12]">
                A Gift <br />
                That Lasts <br />
                Forever
              </h3>

              <div className="pt-1">
                <button
                  onClick={handleGiftsClick}
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-[#FAF7F2] text-[#201815] text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium px-3.5 py-1.5 xs:px-4 xs:py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-none transition-colors shadow-xs cursor-pointer"
                >
                  <span>SHOP GIFTS</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#4A1622]" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
