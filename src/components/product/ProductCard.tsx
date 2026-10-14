import React, { useState } from 'react';
import { Heart, Star, ShoppingBag, Eye, Check, User, Sparkles } from 'lucide-react';
import { Product } from '../../data/jewelryData';
import { SafeImage } from '../SafeImage';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist?: (productId: string, e: React.MouseEvent) => void;
  onQuickView?: (product: Product) => void;
  isInWishlist?: boolean;
  isJustAdded?: boolean;
  variant?: 'standard' | 'compact' | 'editorial';
  showBadges?: boolean;
  showDualViewToggle?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  isInWishlist = false,
  isJustAdded = false,
  variant = 'standard',
  showBadges = true,
  showDualViewToggle = true,
  className = '',
}) => {
  // State for toggling between 'product' still-life and 'model' wearing view
  const [activeView, setActiveView] = useState<'product' | 'model'>('product');
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // On desktop hover, show the model view if currently on product view
  const currentView = isHovered && activeView === 'product' ? 'model' : activeView;
  const isShowingModel = currentView === 'model';

  const displayedImage = isShowingModel ? product.modelImage : product.image;
  const displayedFallback = isShowingModel ? product.fallbackModelImage : product.fallbackImage;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-white border border-[#E9DFD3] rounded-none overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 relative ${className}`}
    >
      {/* Photo Container with Dual-View Switcher, Badges & Wishlist Trigger */}
      <div
        onClick={() => onQuickView?.(product)}
        className="relative aspect-square w-full bg-[#F5ECE1] overflow-hidden cursor-pointer select-none"
      >
        <SafeImage
          src={displayedImage}
          fallbackSrc={displayedFallback}
          alt={`${product.name} - ${isShowingModel ? 'Worn by Model' : 'Product View'}`}
          fallbackCategory={isShowingModel ? 'Model Lifestyle' : product.category}
          fallbackTitle={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient bottom scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Badges: Bestseller / New / Trending / Discount */}
        {showBadges && (
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            {product.tag && (
              <span
                className={`px-1.5 xs:px-2 py-0.5 text-[7.5px] xs:text-[8.5px] uppercase tracking-wider font-semibold ${
                  product.tag === 'New'
                    ? 'bg-[#1E1714] text-white'
                    : product.tag === 'Trending'
                    ? 'bg-[#EBDDCF] text-[#4A1622]'
                    : product.tag === 'Limited'
                    ? 'bg-[#6C5849] text-white'
                    : 'bg-[#4A1622] text-white'
                }`}
              >
                {product.tag}
              </span>
            )}
            {discountPercent && (
              <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#4A101C] border border-[#E4D5C5] px-1.5 py-0.5 text-[7.5px] xs:text-[8px] font-bold uppercase tracking-tight shadow-2xs">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        )}

        {/* Heart Wishlist Icon on Top Right */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id, e);
            }}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-white backdrop-blur-xs flex items-center justify-center text-[#5C4A3A] hover:text-[#4A1622] transition-colors shadow-xs z-20 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A1622]"
            aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                isInWishlist ? 'fill-[#4A101C] text-[#4A101C]' : 'stroke-[1.6]'
              }`}
            />
          </button>
        )}

        {/* Floating Dual Image Switcher: Product & Model */}
        {showDualViewToggle && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-2 inset-x-2 z-20 flex items-center justify-between"
          >
            {/* Segmented switcher pill */}
            <div className="inline-flex bg-black/65 backdrop-blur-md p-0.5 border border-white/20 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveView('product')}
                className={`px-2 py-0.5 text-[8px] xs:text-[8.5px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                  !isShowingModel
                    ? 'bg-white text-[#201815] font-bold shadow-2xs'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-label="View Still-Life Product Shot"
              >
                Product
              </button>
              <button
                type="button"
                onClick={() => setActiveView('model')}
                className={`px-2 py-0.5 text-[8px] xs:text-[8.5px] uppercase tracking-wider font-medium transition-all flex items-center gap-0.5 cursor-pointer ${
                  isShowingModel
                    ? 'bg-[#4A101C] text-white font-bold shadow-2xs'
                    : 'text-white/80 hover:text-white'
                }`}
                aria-label="View Lifestyle Model Worn Shot"
              >
                <User className="w-2.5 h-2.5 inline-block" />
                <span>On Model</span>
              </button>
            </div>

            {/* Quick View Button on Desktop */}
            {onQuickView && (
              <button
                type="button"
                onClick={() => onQuickView(product)}
                className="hidden sm:inline-flex bg-white/90 hover:bg-white text-[#201815] px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold items-center gap-1 shadow-xs transition-colors cursor-pointer"
                aria-label={`Quick view details for ${product.name}`}
              >
                <Eye className="w-2.5 h-2.5" />
                <span>Details</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Luxury Metal & Craft Subtitle */}
      <div className="bg-[#F4ECE2] px-2.5 py-1 border-t border-b border-[#E7DDCE] flex items-center justify-between text-[8px] xs:text-[8.5px] text-[#695646]">
        <div className="flex items-center gap-1 truncate max-w-[85%]">
          <Sparkles className="w-2.5 h-2.5 text-[#A77B3D] shrink-0" />
          <span className="uppercase tracking-wider font-medium truncate">
            {product.metals[0] || '18K Gold Plated'} • Hallmarked
          </span>
        </div>
        <span className="text-[7.5px] font-semibold uppercase tracking-wider text-[#917B68] shrink-0 font-mono">
          {product.id}
        </span>
      </div>

      {/* Details Section */}
      <div className="p-2.5 xs:p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <div className="flex items-center justify-between text-[9px] text-[#8C7662]">
            <span className="capitalize font-medium">{product.category}</span>
            <div className="flex items-center gap-0.5 text-[#C99834] shrink-0" aria-label={`Rating ${product.rating.toFixed(1)} out of 5 stars`}>
              <Star className="w-2.5 h-2.5 fill-[#C99834]" />
              <span className="text-[8.5px] font-semibold text-[#5A4535]">{product.rating.toFixed(1)}</span>
              <span className="text-[7.5px] text-[#9E8B7A]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView?.(product)}
            className="text-[11.5px] xs:text-xs sm:text-[13px] font-medium text-[#201815] hover:text-[#4A101C] cursor-pointer transition-colors leading-snug line-clamp-1 mt-1"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pricing in INR */}
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-xs xs:text-[13px] sm:text-sm font-semibold text-[#201815] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs text-[#9B897B] line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            type="button"
            onClick={(e) => onAddToCart(product, e)}
            className={`w-full py-1.5 sm:py-2 text-[8.5px] xs:text-[9.5px] uppercase font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 rounded-none cursor-pointer mt-1 ${
              isJustAdded
                ? 'bg-[#2E6B3E] text-white border border-[#2E6B3E]'
                : 'bg-[#FAF7F2] hover:bg-[#4A101C] text-[#201815] hover:text-white border border-[#D5C6B5] hover:border-[#4A101C]'
            }`}
            aria-label={isJustAdded ? `${product.name} added to bag` : `Add ${product.name} to shopping bag`}
          >
            {isJustAdded ? (
              <>
                <Check className="w-3 h-3 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
