import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { ROUTES } from '../config/navigation';

export interface HomepageCategoryCard {
  id: string;
  name: string;
  subtitle: string;
  href: string;
  image: string;
  fallbackImage: string;
}

/**
 * Approved Swarnika Homepage Categories:
 * EXACTLY FOUR cards matching target reference (Desktop & Mobile):
 * 1. Women — /women — /assist/image/categories/women.jpg
 * 2. Men — /men — /assist/image/categories/men.jpg
 * 3. Necklaces — /category/necklaces — /assist/image/categories/necklaces.jpg
 * 4. Earrings — /category/earrings — /assist/image/categories/earrings.jpg
 */
export const HOMEPAGE_CATEGORIES: HomepageCategoryCard[] = [
  {
    id: 'women',
    name: 'Women',
    subtitle: 'ELEGANCE EVERYDAY',
    href: ROUTES.WOMEN,
    image: '/assist/image/categories/women.jpg',
    fallbackImage: '/assist/image/products/P06_Aafreen_Chandbali_Lifestyle_PREVIEW.jpg',
  },
  {
    id: 'men',
    name: 'Men',
    subtitle: 'MODERN STRENGTH',
    href: ROUTES.MEN,
    image: '/assist/image/categories/men.jpg',
    fallbackImage: '/assist/image/products/P18_Kuber_Kada_Lifestyle_PREVIEW.jpg',
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    subtitle: 'STATEMENTS THAT LAST',
    href: ROUTES.CATEGORY('necklaces'),
    image: '/assist/image/categories/necklaces.jpg',
    fallbackImage: '/assist/image/products/P16_Kavya_Polki_Choker_Main_Preview.jpg',
  },
  {
    id: 'earrings',
    name: 'Earrings',
    subtitle: 'DETAILS THAT SHINE',
    href: ROUTES.CATEGORY('earrings'),
    image: '/assist/image/categories/earrings.jpg',
    fallbackImage: '/assist/image/products/P06_Aafreen_Chandbali_Main_Preview.jpg',
  },
];

export const SwarnikaCategories: React.FC = () => {
  return (
    <section id="categories-section" className="py-8 sm:py-12 md:py-16 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header row: SHOP BY CATEGORY — and View All Categories → */}
        <div className="flex items-center justify-between mb-5 sm:mb-7 pb-3 border-b border-[#E8DECE]">
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
            className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#221B17] hover:text-[#4A1622] transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#4A1622]" />
          </Link>
        </div>

        {/* 
          EXACTLY FOUR Editorial Category Cards:
          - Desktop: 4 columns (horizontal split matching reference Image 6)
          - Mobile / Tablet: 2 columns (matching reference Image 1)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {HOMEPAGE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.href}
              className="group flex flex-col md:flex-row md:items-stretch bg-[#EFE6DB] border border-[#E2D5C5] overflow-hidden transition-all duration-300 hover:border-[#4A1622]/40 hover:shadow-md cursor-pointer"
              aria-label={`Shop ${cat.name} — ${cat.subtitle}`}
            >
              {/* Text Information Panel */}
              <div className="order-2 md:order-1 p-3.5 sm:p-4 lg:p-4.5 flex flex-col justify-between md:w-[48%] shrink-0 min-h-[96px] md:min-h-0 bg-[#EFE6DB]">
                <div>
                  <h3 className="font-serif-luxury text-base sm:text-lg lg:text-xl font-normal text-[#201815] group-hover:text-[#4A101C] transition-colors leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-[7.5px] sm:text-[8px] lg:text-[8.5px] uppercase tracking-[0.18em] text-[#6C5849] font-medium mt-1">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Circular Arrow Action Button */}
                <div className="mt-3 md:mt-4">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#7A6451]/60 flex items-center justify-center text-[#201815] group-hover:bg-[#4A101C] group-hover:border-[#4A101C] group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Photo Panel */}
              <div className="order-1 md:order-2 aspect-square md:aspect-auto md:w-[52%] overflow-hidden relative bg-[#E5D8C8]">
                <SafeImage
                  src={cat.image}
                  fallbackSrc={cat.fallbackImage}
                  alt={`${cat.name} fine jewellery collection`}
                  fallbackCategory={cat.name}
                  fallbackTitle={cat.subtitle}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
