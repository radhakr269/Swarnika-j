import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/jewelryData';
import { SafeImage } from './SafeImage';
import { ROUTES } from '../config/navigation';

export const SwarnikaCategories: React.FC = () => {
  const { setSelectedCategory } = useShop();

  const handleSelect = (catId: string) => {
    setSelectedCategory(catId);
    const target = document.getElementById('bestsellers-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories-section" className="py-10 sm:py-14 md:py-18 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header row: SHOP BY CATEGORY — and View All Categories → */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 pb-3 border-b border-[#E8DECE]">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#221B17]">
              SHOP BY CATEGORY
            </h2>
            <span className="w-8 sm:w-12 h-[1px] bg-[#4A1622]/40" />
            <span className="text-[10px] sm:text-xs text-[#827163] font-light hidden sm:inline">
              Curated Fine Jewellery Silhouettes
            </span>
          </div>

          <Link
            to={ROUTES.SHOP}
            onClick={() => setSelectedCategory('all')}
            className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#221B17] hover:text-[#4A1622] transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#4A1622]" />
          </Link>
        </div>

        {/* 6 Luxury Category Cards (Responsive: 2 cols on mobile, 3 on tablet, 6 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-4.5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative aspect-[3/4] rounded-none overflow-hidden cursor-pointer shadow-xs bg-[#EAE0D3] border border-[#E4D9CC] transition-all duration-500 hover:shadow-lg hover:border-[#4A1622]/30"
            >
              {/* Background Photo */}
              <SafeImage
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Multi-stage Luxury Gradient Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/85 transition-opacity" />

              {/* Text Overlay & Circular Arrow Button */}
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] xs:text-[9px] uppercase tracking-[0.16em] text-[#E7D6C5] font-medium bg-black/35 px-1.5 py-0.5 backdrop-blur-xs">
                    {cat.count} Designs
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-base sm:text-lg md:text-xl font-normal leading-tight text-white drop-shadow-xs group-hover:text-[#F7E7CE] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[7.5px] sm:text-[8.5px] uppercase tracking-[0.18em] text-[#E0D2C1] font-light mt-0.5 line-clamp-1">
                    {cat.subtitle}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="text-[8px] uppercase tracking-wider text-white/80 group-hover:text-white font-medium flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#E7D6C5]" />
                      Explore
                    </span>
                    <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center group-hover:bg-white group-hover:text-[#201815] transition-all">
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
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
