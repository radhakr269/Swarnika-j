import React from 'react';
import { Star, Heart, ArrowRight } from 'lucide-react';
import { BEST_SELLERS, ALL_PRODUCTS, Product } from '../data/jewelryData';
import { SafeImage } from './SafeImage';
import { useShop } from '../context/ShopContext';

export const BestSellersSection: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    selectedCategory,
    setSelectedCategory,
  } = useShop();

  const displayedProducts: Product[] =
    selectedCategory === 'all'
      ? BEST_SELLERS
      : ALL_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="best-sellers" className="py-8 sm:py-12 md:py-16 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Screenshot) */}
        <div className="flex items-end justify-between mb-5 sm:mb-7 pb-3 border-b border-[#EBE1D3] gap-2">
          <div>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#987853] font-semibold block mb-0.5">
              BEST SELLERS
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#2A231D] font-normal tracking-tight">
              Our Most Loved Pieces
            </h2>
            <p className="text-[11px] sm:text-xs text-[#735F4C] mt-0.5 font-light">
              Timeless essentials you're looking for.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-[10px] sm:text-xs uppercase tracking-wider text-[#987853] hover:underline"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setSelectedCategory('all')}
              className="group inline-flex items-center gap-1 text-[10px] sm:text-xs uppercase tracking-[0.14em] font-medium text-[#2A231D] hover:text-[#987853] transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* 4 Product Cards in a compact, refined grid (2-cols on mobile, 4-cols on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {displayedProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white border border-[#E9DFD2] rounded-none overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-300"
              >
                {/* Product Photo - compact square */}
                <div
                  onClick={() => setQuickViewProduct(product)}
                  className="relative aspect-square w-full bg-[#FBF8F4] overflow-hidden cursor-pointer"
                >
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    fallbackCategory={product.category}
                    fallbackTitle={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Wishlist Heart Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-[#7A6451] hover:text-[#2A231D] transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isWish ? 'fill-[#A37E54] stroke-[#A37E54]' : 'stroke-[#7A6451] stroke-[1.7]'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Body - compact, delicate luxury sizing */}
                <div className="p-2.5 sm:p-3.5 md:p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3
                      onClick={() => setQuickViewProduct(product)}
                      className="font-serif-luxury text-xs sm:text-sm md:text-base text-[#2A231D] hover:text-[#987853] cursor-pointer transition-colors leading-snug line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mt-0.5">
                      <div className="flex items-center text-[#E4B848]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#E4B848] text-[#E4B848]" />
                        ))}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-[#8C7662]">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xs sm:text-sm md:text-base font-semibold text-[#2A231D] tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-xs text-[#9B8877] line-through tabular-nums">
                          ${product.originalPrice.toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Add To Cart Button - compact, matching screenshot */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-1 bg-[#A37E54] hover:bg-[#8D6B42] text-white text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-semibold py-1.5 sm:py-2 md:py-2.5 rounded-none transition-colors shadow-xs active:scale-[0.99]"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
