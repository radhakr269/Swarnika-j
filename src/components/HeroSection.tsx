import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSection: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleShopClick = () => {
    setSelectedCategory('all');
    const el = document.getElementById('best-sellers') || document.getElementById('categories-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#EFE6DC] border-b border-[#E1D4C3] overflow-hidden">
      {/* Edge-to-Edge full width container matching reference picture exactly */}
      <div className="w-full flex flex-row items-stretch justify-between min-h-[300px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[540px] xl:min-h-[580px]">
        
        {/* Left Side: Typography & Button (Edge-to-edge padding matching screenshot) */}
        <div className="w-1/2 md:w-5/12 lg:w-5/12 z-20 flex flex-col justify-center pl-4 sm:pl-8 md:pl-12 lg:pl-16 xl:pl-20 pr-2 py-4 sm:py-8 md:py-12 space-y-2 sm:space-y-3.5 md:space-y-4 lg:space-y-5">
          <p className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[#987853] font-semibold">
            ELEGANCE LIVED FOREVER
          </p>

          <h1 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl lg:text-[62px] xl:text-[68px] font-normal tracking-tight text-[#2A231D] leading-[1.06]">
            Jewelry <br />
            That Tells <br />
            <span className="italic font-light">Your Story</span>
          </h1>

          <p className="text-[#6B5746] text-[10px] sm:text-xs md:text-sm lg:text-base max-w-[260px] sm:max-w-sm md:max-w-md font-light leading-relaxed">
            Timeless designs for your most cherished moments.
          </p>

          <div className="pt-1 sm:pt-2">
            <button
              onClick={handleShopClick}
              className="group inline-flex items-center gap-1.5 sm:gap-2.5 bg-[#A37E54] hover:bg-[#8D6B42] text-white text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold px-3 py-1.5 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 rounded-none transition-all duration-300 shadow-none shrink-0"
            >
              <span>SHOP COLLECTION</span>
              <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Side: Seamless Model & Cursive Script (Edge-to-Edge across all devices) */}
        <div className="w-1/2 md:w-7/12 lg:w-7/12 relative flex items-center justify-end overflow-hidden">
          {/* Edge-to-edge model image with smooth fade to #EFE6DC */}
          <img
            src="/public/assist/image/banners/hero_model_portrait.jpg"
            alt="Aurelia fine jewelry model wearing diamond earrings and rings"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center absolute inset-0"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 16%, black 86%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 16%, black 86%, transparent 100%)',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#EFE6DC] via-transparent to-[#EFE6DC]/25 pointer-events-none" />

          {/* Script Calligraphy on the right side: "More Than Jewelry A Feeling ♡" */}
          <div className="relative z-30 pointer-events-none select-none text-right pr-2 sm:pr-4 md:pr-8 lg:pr-12">
            <div className="font-script-luxury text-base sm:text-2xl md:text-3xl lg:text-4xl text-[#9A7851] leading-[1.15] drop-shadow-xs">
              <span>More</span> <br />
              <span>Than</span> <br />
              <span>Jewelry</span> <br />
              <span className="text-[#84633E]">A Feeling ♡</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
