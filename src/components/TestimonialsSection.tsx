/**
 * SWARNIKA — Styling Reflections & Editorial Perspectives
 * Explicitly identified as editorial concepts and styling notes,
 * avoiding unsupported claims of verified buyer ratings or fake reviews.
 */

import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { TESTIMONIALS } from '../data/jewelryData';
import { SafeImage } from './SafeImage';

export const TestimonialsSection: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1 >= TESTIMONIALS.length ? 0 : prev + 1));
  };

  return (
    <section className="py-8 sm:py-14 md:py-16 bg-[#FAF7F2] border-t border-[#EAE1D4]">
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        {/* Header with Title and Nav Arrows */}
        <div className="flex items-end justify-between mb-5 sm:mb-8 pb-3 border-b border-[#E8DECE]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8.5px] xs:text-[9.5px] sm:text-xs uppercase tracking-[0.22em] text-[#6E5746] font-medium block">
                EDITORIAL PERSPECTIVES
              </span>
              <span className="w-5 sm:w-8 h-[1px] bg-[#6E5746]" />
            </div>
            <h2 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#201815] font-normal tracking-tight">
              Styling Notes & Reflections
            </h2>
            <p className="text-[11px] sm:text-xs text-[#7A6451] font-light mt-1 max-w-lg">
              Curated aesthetic notes exploring how our polki and heritage designs transition across festive celebrations and daily wear.
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handlePrev}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D5C2AD] flex items-center justify-center text-[#5C4837] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
              aria-label="Previous styling note"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D5C2AD] flex items-center justify-center text-[#5C4837] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
              aria-label="Next styling note"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notes Grid: 1 on mobile carousel, 3 on md/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {TESTIMONIALS.map((t, index) => {
            const isVisibleOnMobile = index === startIndex;
            return (
              <div
                key={t.id}
                className={`bg-white border border-[#E9DFD3] p-4 sm:p-6 flex flex-col justify-between shadow-xs transition-opacity duration-300 ${
                  isVisibleOnMobile ? 'block' : 'hidden md:flex'
                } ${index >= 3 ? 'md:hidden lg:flex' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[10px] uppercase tracking-wider text-[#A77B3D] font-semibold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#A77B3D]" />
                      <span>Styling Impression</span>
                    </span>
                    <span className="text-[#8C7662] font-normal font-sans">
                      {t.city} Region
                    </span>
                  </div>

                  <p className="text-[11.5px] xs:text-xs sm:text-[13px] text-[#42362E] font-light leading-relaxed italic mb-4">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#F0E6D8]">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-[#EFE5D8] shrink-0 border border-[#DFCEBD]">
                    <SafeImage
                      src={t.avatar}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-semibold text-[#201815]">
                      {t.name}
                    </h4>
                    <p className="text-[9.5px] sm:text-[10px] text-[#786455]">
                      Featured piece: {t.productName}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile dots indicator */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                startIndex === i ? 'w-5 bg-[#4A1622]' : 'w-1.5 bg-[#D5C6B5]'
              }`}
              aria-label={`Go to reflection ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
