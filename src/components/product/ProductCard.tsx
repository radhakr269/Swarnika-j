import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../../data/jewelryData';
import { SafeImage } from '../SafeImage';
import { getProductUrl } from '../../lib/productRoutes';

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
  showDualViewToggle = false,
  className = '',
}) => {
  const [activeView, setActiveView] = useState<'product' | 'model'>('product');
  const [isHovered, setIsHovered] = useState(false);

  const isShowingModel = (isHovered && activeView === 'product') || activeView === 'model';
  const displayedImage = isShowingModel ? product.modelImage : product.image;
  const displayedFallback = isShowingModel ? product.fallbackModelImage : product.fallbackImage;
  const isOutOfStock = product.inStock === false;
  const productUrl = getProductUrl(product);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-white border border-[#E8DFD3] rounded-none overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 relative ${className}`}
    >
      {/* Photo Container linking to Product Details */}
      <Link
        to={productUrl}
        className="block relative aspect-square w-full bg-[#F5ECE1] overflow-hidden select-none cursor-pointer"
        aria-label={`View details for ${product.name}`}
      >
        <SafeImage
          src={displayedImage}
          fallbackSrc={displayedFallback}
          alt={`${product.name} ${isShowingModel ? 'worn by model' : 'product photography'}`}
          fallbackCategory={product.category}
          fallbackTitle={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
        />

        {/* Minimal Badges matching Reference Image 1 & 6 (Bestseller / New / Trending) */}
        {showBadges && product.tag && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="inline-block bg-[#FAF7F2]/95 backdrop-blur-xs text-[#201815] border border-[#D5C8B8] px-2 py-0.5 text-[8.5px] xs:text-[9.5px] font-medium tracking-wide shadow-2xs">
              {product.tag}
            </span>
          </div>
        )}

        {/* Minimalist Heart Wishlist Trigger */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(product.id, e);
            }}
            className="absolute top-2 right-2 w-7 h-7 sm:w-7.5 sm:h-7.5 flex items-center justify-center text-[#201815] hover:text-[#4A101C] transition-colors z-20 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]"
            aria-label={isInWishlist ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-125 ${
                isInWishlist ? 'fill-[#4A101C] text-[#4A101C]' : 'stroke-[#201815] stroke-[1.5]'
              }`}
            />
          </button>
        )}

        {/* Quick View Button on Hover */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-2 right-2 z-20 bg-white/95 hover:bg-white text-[#201815] hover:text-[#4A101C] px-2 py-1 text-[9px] uppercase tracking-wider font-semibold flex items-center gap-1 shadow-xs border border-[#D5C8B8] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer focus:opacity-100"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>
        )}
      </Link>

      {/* Clean Luxury Details Section */}
      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between space-y-2.5 bg-white">
        <div>
          {/* Product Title linking to Product Details */}
          <Link
            to={productUrl}
            className="text-xs sm:text-[13px] font-medium text-[#201815] hover:text-[#4A101C] transition-colors leading-snug line-clamp-1 block"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Pricing in INR */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xs sm:text-[13.5px] font-semibold text-[#201815] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] sm:text-[11px] text-[#8C7662] line-through tabular-nums font-light">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Clean Luxury Add to Bag Action */}
        {onAddToCart && (
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={(e) => onAddToCart(product, e)}
            className={`w-full py-2 text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 rounded-none mt-1 cursor-pointer ${
              isOutOfStock
                ? 'bg-[#EAE0D3] text-[#8C7662] cursor-not-allowed border border-[#D5C6B5]'
                : isJustAdded
                ? 'bg-[#2E6B3E] text-white border border-[#2E6B3E]'
                : 'bg-[#FAF7F2] hover:bg-[#4A101C] text-[#201815] hover:text-white border border-[#D5C6B5] hover:border-[#4A101C]'
            }`}
            aria-label={
              isOutOfStock
                ? `${product.name} is currently sold out`
                : isJustAdded
                ? `${product.name} added to bag`
                : `Add ${product.name} to shopping bag`
            }
          >
            {isOutOfStock ? (
              <span>Sold Out</span>
            ) : isJustAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
