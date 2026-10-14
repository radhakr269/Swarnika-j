import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const SwarnikaCategories: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const categories = [
    {
      id: 'women',
      title: 'Women',
      subtitle: 'ELEGANCE EVERYDAY',
      image: '/public/assist/image/categories/women.jpg',
    },
    {
      id: 'men',
      title: 'Men',
      subtitle: 'MODERN STRENGTH',
      image: '/public/assist/image/categories/men.jpg',
    },
    {
      id: 'necklaces',
      title: 'Necklaces',
      subtitle: 'STATEMENTS THAT LAST',
      image: '/public/assist/image/categories/necklaces.jpg',
    },
    {
      id: 'earrings',
      title: 'Earrings',
      subtitle: 'DETAILS THAT SHINE',
      image: '/public/assist/image/categories/earrings.jpg',
    },
  ];

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    const target = document.getElementById('bestsellers-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-8 sm:py-12 md:py-16 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        
        {/* Header row: SHOP BY CATEGORY — and View All Categories → */}
        <div className="flex items-center justify-between mb-5 sm:mb-8 pb-3 border-b border-[#E8DECE]">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#221B17]">
              SHOP BY CATEGORY
            </h2>
            <span className="w-6 sm:w-10 h-[1px] bg-[#221B17]" />
          </div>

          <button
            onClick={() => handleSelect('all')}
            className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#221B17] hover:text-[#4A1622] transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Landscape Category Cards (Exact match to Swarnika Edge mockups) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-4 md:gap-5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative aspect-[4/3] rounded-none overflow-hidden cursor-pointer shadow-xs bg-[#EAE0D3] border border-[#E4D9CC]"
            >
              {/* Background Photo */}
              <SafeImage
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10 transition-opacity group-hover:from-black/75" />

              {/* Text Overlay & Circular Arrow Button */}
              <div className="absolute inset-0 p-3 sm:p-5 flex flex-col justify-between text-white z-10">
                <div>
                  <h3 className="font-serif-luxury text-base xs:text-lg sm:text-2xl md:text-[26px] font-normal leading-tight text-white drop-shadow-xs">
                    {cat.title}
                  </h3>
                  <p className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[#F3E7DC] font-light mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>

                <div className="flex justify-end">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-white/60 flex items-center justify-center group-hover:bg-white group-hover:text-[#201815] transition-all">
                    <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
