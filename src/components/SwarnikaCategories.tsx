import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';
import { ROUTES } from '../config/navigation';

export interface EditorialCategory {
  id: 'necklaces' | 'earrings' | 'rings' | 'bracelets';
  name: string;
  subtitle: string;
  tagline: string;
  count: number;
  image: string;
  fallbackImage: string;
}

/**
 * Approved Phase 3 Category Section:
 * EXACTLY FOUR editorial category cards in strict luxury hierarchy:
 * 1. Necklaces (Statements That Last)
 * 2. Earrings (Details That Shine)
 * 3. Rings (Eternal Commitments)
 * 4. Bracelets (Subtle Sophistication)
 */
export const HOMEPAGE_EDITORIAL_CATEGORIES: EditorialCategory[] = [
  {
    id: 'necklaces',
    name: 'Necklaces',
    subtitle: 'STATEMENTS THAT LAST',
    tagline: 'Timeless Pendants & Heirloom Chokers',
    count: 36,
    image: '/assist/image/categories/necklaces.jpg',
    fallbackImage: '/assist/image/products/P16_Kavya_Polki_Choker_Main_Preview.jpg',
  },
  {
    id: 'earrings',
    name: 'Earrings',
    subtitle: 'DETAILS THAT SHINE',
    tagline: 'Heritage Chandbalis & Jhumkas',
    count: 32,
    image: '/assist/image/categories/earrings.jpg',
    fallbackImage: '/assist/image/products/P06_Aafreen_Chandbali_Main_Preview.jpg',
  },
  {
    id: 'rings',
    name: 'Rings',
    subtitle: 'ETERNAL COMMITMENTS',
    tagline: 'Signature Bands & Solitaires',
    count: 40,
    image: '/assist/image/categories/rings.jpg',
    fallbackImage: '/assist/image/products/P11_Meera_Kundan_Ring_Main_Preview.jpg',
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    subtitle: 'SUBTLE SOPHISTICATION',
    tagline: 'Handcrafted Cuffs & Bangles',
    count: 20,
    image: '/assist/image/categories/bracelets.jpg',
    fallbackImage: '/assist/image/products/P14_Ananya_Ruby_Bangle_Main_Preview.jpg',
  },
];

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

        {/* EXACTLY FOUR Editorial Category Cards in 4-Column Desktop Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
          {HOMEPAGE_EDITORIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(cat.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(cat.id);
                }
              }}
              className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-none overflow-hidden cursor-pointer shadow-xs bg-[#EAE0D3] border border-[#E4D9CC] transition-all duration-500 hover:shadow-xl hover:border-[#4A1622]/40 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A1622]"
              aria-label={`Explore ${cat.name} Collection`}
            >
              {/* Background Photo with smooth luxury zoom */}
              <SafeImage
                src={cat.image}
                fallbackSrc={cat.fallbackImage}
                alt={`${cat.name} fine jewellery collection`}
                fallbackCategory={cat.name}
                fallbackTitle={cat.subtitle}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Multi-stage Luxury Gradient Vignette Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-all duration-500" />

              {/* Text Overlay & Interactive Elements */}
              <div className="absolute inset-0 p-3.5 sm:p-5 flex flex-col justify-between text-white z-10">
                {/* Top Header with Design Count */}
                <div className="flex items-center justify-between">
                  <span className="text-[8.5px] xs:text-[9.5px] uppercase tracking-[0.18em] text-[#F3E7D8] font-medium bg-black/40 px-2 py-0.5 backdrop-blur-xs border border-white/10">
                    {cat.count} Designs
                  </span>
                  <span className="text-[8px] uppercase tracking-widest text-white/60 font-mono hidden sm:inline">
                    0{HOMEPAGE_EDITORIAL_CATEGORIES.indexOf(cat) + 1}
                  </span>
                </div>

                {/* Bottom Title & Explorer */}
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl md:text-[26px] font-normal leading-tight text-white drop-shadow-sm group-hover:text-[#F7E7CE] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E0D2C1] font-light mt-1 line-clamp-1">
                    {cat.subtitle}
                  </p>
                  <p className="text-[10px] text-white/80 font-light mt-0.5 hidden sm:line-clamp-1">
                    {cat.tagline}
                  </p>

                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-white/20">
                    <span className="text-[8.5px] uppercase tracking-wider text-white/85 group-hover:text-white font-medium flex items-center gap-1.5 transition-colors">
                      <Sparkles className="w-2.5 h-2.5 text-[#E7D6C5]" />
                      Explore Collection
                    </span>
                    <div className="w-7 h-7 rounded-full border border-white/50 flex items-center justify-center bg-black/20 group-hover:bg-white group-hover:text-[#201815] transition-all duration-300">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
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
