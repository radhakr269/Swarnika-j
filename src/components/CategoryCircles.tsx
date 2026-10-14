import React from 'react';
import { CATEGORIES } from '../data/jewelryData';
import { SafeImage } from './SafeImage';
import { useShop } from '../context/ShopContext';

export const CategoryCircles: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? 'all' : categoryId);
    const target = document.getElementById('best-sellers');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-8 sm:py-12 md:py-16 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <div className="space-y-1 sm:space-y-1.5 mb-6 sm:mb-8 md:mb-10">
          <p className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#987853] font-semibold">
            EXPLORE CATEGORIES
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#2A231D] font-normal tracking-tight">
            Find Your Perfect Piece
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#735F4C] max-w-md mx-auto font-light">
            Explore our curated collections for every occasion.
          </p>
        </div>

        {/* 7 Circular Category Items - compact & delicate, matching screenshot */}
        <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-5 md:gap-7 lg:gap-8 overflow-x-auto pb-2 pt-1 px-1 no-scrollbar">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => handleSelect(category.id)}
                className="group flex flex-col items-center shrink-0 focus:outline-none"
              >
                <div
                  className={`relative w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full p-0.5 sm:p-1 transition-all duration-300 ${
                    isSelected
                      ? 'ring-1 sm:ring-2 ring-[#987853] ring-offset-1 ring-offset-[#FAF6F0] scale-105'
                      : 'border border-[#E4D7C8] group-hover:border-[#987853] group-hover:scale-105'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#F2EAE0]">
                    <SafeImage
                      src={category.image}
                      alt={category.name}
                      fallbackCategory={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <span
                  className={`mt-1.5 sm:mt-2 text-[10px] sm:text-xs md:text-sm font-medium tracking-tight transition-colors ${
                    isSelected ? 'text-[#987853] font-semibold' : 'text-[#3B3026] group-hover:text-[#987853]'
                  }`}
                >
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
