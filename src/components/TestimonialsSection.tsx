import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
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
                WHAT OUR CLIENTS SAY
              </span>
              <span className="w-5 sm:w-8 h-[1px] bg-[#6E5746]" />
            </div>
            <h2 className="font-serif-luxury text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#201815] font-normal tracking-tight">
              Loved by Thousands
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D5C2AD] flex items-center justify-center text-[#5C4837] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#D5C2AD] flex items-center justify-center text-[#5C4837] hover:bg-[#F2E8DC] transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Testimonials Grid: 1 on mobile carousel, 3 on md/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {TESTIMONIALS.map((t, index) => {
            // On mobile, show only current active index; on md+ show first 3
            const isVisibleOnMobile = index === startIndex;
            return (
              <div
                key={t.id}
                className={`bg-white border border-[#E9DFD3] p-4 sm:p-6 flex flex-col justify-between shadow-xs transition-opacity duration-300 ${
                  isVisibleOnMobile ? 'block' : 'hidden md:flex'
                } ${index >= 3 ? 'md:hidden lg:flex' : ''}`}
              >
                <div>
                  {/* 5 Stars */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5 text-[#4A1622]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#4A1622] text-[#4A1622]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#8C7662] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#2E6B3E]" />
                      <span>{t.city}</span>
                    </span>
                  </div>

                  <p className="text-[11.5px] xs:text-xs sm:text-[13px] text-[#42362E] font-light leading-relaxed italic mb-4">
                    {t.content}
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
                      Acquired {t.productName}
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
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
