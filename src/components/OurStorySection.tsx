import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useShop } from '../context/ShopContext';

export const OurStorySection: React.FC = () => {
  const { setIsStoryOpen } = useShop();

  return (
    <section id="about-section" className="py-10 sm:py-16 md:py-20 bg-[#FAF6F0] overflow-hidden border-t border-[#EAE0D3]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="md:col-span-6 space-y-3 sm:space-y-4 md:space-y-5 md:pr-6">
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.26em] text-[#987853] font-semibold block">
              OUR STORY
            </span>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#201815] font-normal leading-[1.1] tracking-tight">
              A Legacy of Grace <br />
              and Craftsmanship
            </h2>

            <p className="text-[#685544] text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed font-light">
              At Swarnika, we believe jewellery is more than an adornment — it is a symbol of strength,
              grace, and life's most cherished milestones. Every handcrafted design reflects deep heritage
              technique married with contemporary silhouettes.
            </p>

            <div className="pt-1 sm:pt-2">
              <button
                onClick={() => setIsStoryOpen(true)}
                className="group inline-flex items-center gap-2 bg-[#4A1622] hover:bg-[#381019] text-white text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-none transition-all cursor-pointer"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Visual Column: Arched Window, Circular Seal & Handwritten Script */}
          <div className="md:col-span-6 flex items-center justify-center md:justify-end relative pt-4 md:pt-0">
            <div className="relative">
              {/* Arched Window Image */}
              <div className="w-48 sm:w-64 md:w-72 lg:w-80 h-60 sm:h-76 md:h-88 lg:h-[380px] rounded-t-full rounded-b-none overflow-hidden shadow-md border-2 sm:border-4 border-white bg-[#EFE6DC]">
                <SafeImage
                  src="/assist/image/banners/story_craftsmanship.jpg"
                  alt="Master artisan jeweler hands crafting gold ring at bench"
                  fallbackCategory="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Swarnika Circular Seal Badge */}
              <div className="absolute top-2 sm:top-6 -right-3 sm:-right-8 bg-white/95 p-2 sm:p-3 rounded-full border border-[#D5C2AD] shadow-md flex flex-col items-center justify-center w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 text-center select-none">
                <div className="w-full h-full rounded-full border border-dashed border-[#B89873] flex flex-col items-center justify-center p-0.5">
                  <span className="text-[5px] sm:text-[6px] md:text-[7px] uppercase tracking-[0.18em] text-[#987853] font-semibold">
                    FINE JEWELLERY
                  </span>
                  <span className="font-serif-luxury text-[10px] sm:text-xs md:text-sm font-semibold tracking-wider text-[#4A1622]">
                    SWARNIKA
                  </span>
                  <span className="text-[6px] sm:text-[7px] uppercase tracking-[0.16em] text-[#735F4C]">
                    FINE ATELIER
                  </span>
                </div>
              </div>

              {/* Handwritten signature cursive below seal */}
              <div className="absolute -bottom-6 -right-2 sm:-right-4 pointer-events-none select-none">
                <span className="font-script-luxury text-xl sm:text-2xl md:text-3xl text-[#9A7851]">
                  Handcrafted With Love ♡
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
