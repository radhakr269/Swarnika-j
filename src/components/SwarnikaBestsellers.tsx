import React, { useState } from 'react';
import { Heart, ArrowRight, Star, ShoppingBag, Eye, Check, User, Sparkles, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  prod: Product;
  onAddToCart: (prod: Product, e: React.MouseEvent) => void;
  isJustAdded: boolean;
  isInWish: boolean;
  onToggleWish: (id: string, e: React.MouseEvent) => void;
  onQuickView: (prod: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  prod,
  onAddToCart,
  isJustAdded,
  isInWish,
  onToggleWish,
  onQuickView,
}) => {
  // Card-level state: toggles between 'product' and 'model' view
  const [activeView, setActiveView] = useState<'product' | 'model'>('product');
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = prod.originalPrice
    ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)
    : null;

  // On desktop hover, show the model view if currently on product view
  const currentView = isHovered && activeView === 'product' ? 'model' : activeView;
  const isShowingModel = currentView === 'model';

  const displayedImage = isShowingModel ? prod.modelImage : prod.image;
  const displayedFallback = isShowingModel ? prod.fallbackModelImage : prod.fallbackImage;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-white border border-[#E9DFD3] rounded-none overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 relative"
    >
      {/* Photo Container with Dual-View Switcher, Tags, Discount & Heart Icon */}
      <div
        onClick={() => onQuickView(prod)}
        className="relative aspect-square w-full bg-[#F5ECE1] overflow-hidden cursor-pointer select-none"
      >
        <SafeImage
          src={displayedImage}
          fallbackSrc={displayedFallback}
          alt={`${prod.name} - ${isShowingModel ? 'Worn by Model' : 'Product View'}`}
          fallbackCategory={isShowingModel ? 'Model Lifestyle' : prod.category}
          fallbackTitle={prod.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient bottom scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Top Left Tags: Bestseller / New / Discount */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {prod.tag && (
            <span
              className={`px-1.5 xs:px-2 py-0.5 text-[7.5px] xs:text-[8.5px] uppercase tracking-wider font-semibold ${
                prod.tag === 'New'
                  ? 'bg-[#1E1714] text-white'
                  : prod.tag === 'Trending'
                  ? 'bg-[#EBDDCF] text-[#4A1622]'
                  : 'bg-[#4A1622] text-white'
              }`}
            >
              {prod.tag}
            </span>
          )}
          {discountPercent && (
            <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#4A1622] border border-[#E4D5C5] px-1.5 py-0.5 text-[7.5px] xs:text-[8px] font-bold uppercase tracking-tight">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Heart Wishlist Icon on Top Right */}
        <button
          onClick={(e) => onToggleWish(prod.id, e)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/85 hover:bg-white backdrop-blur-xs flex items-center justify-center text-[#5C4A3A] hover:text-[#4A1622] transition-colors shadow-xs z-20 cursor-pointer"
          aria-label="Save to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isInWish ? 'fill-[#4A1622] text-[#4A1622]' : 'stroke-[1.6]'}`} />
        </button>

        {/* Floating Dual Image Switcher: Product & Model placed together */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2 inset-x-2 z-20 flex items-center justify-between"
        >
          {/* Segmented switcher pill */}
          <div className="inline-flex bg-black/60 backdrop-blur-md p-0.5 border border-white/20 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveView('product')}
              className={`px-2 py-0.5 text-[8px] xs:text-[8.5px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                !isShowingModel
                  ? 'bg-white text-[#201815] font-bold shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Product
            </button>
            <button
              type="button"
              onClick={() => setActiveView('model')}
              className={`px-2 py-0.5 text-[8px] xs:text-[8.5px] uppercase tracking-wider font-medium transition-all flex items-center gap-0.5 cursor-pointer ${
                isShowingModel
                  ? 'bg-[#4A1622] text-white font-bold shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <User className="w-2.5 h-2.5 inline-block" />
              <span>On Model</span>
            </button>
          </div>

          {/* Quick View Button on Desktop */}
          <button
            type="button"
            onClick={() => onQuickView(prod)}
            className="hidden sm:inline-flex bg-white/90 hover:bg-white text-[#201815] px-2 py-0.5 text-[8px] uppercase tracking-wider font-semibold items-center gap-1 shadow-xs transition-colors cursor-pointer"
          >
            <Eye className="w-2.5 h-2.5" />
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Luxury Metal & Craft Subtitle */}
      <div className="bg-[#F4ECE2] px-2.5 py-1 border-t border-b border-[#E7DDCE] flex items-center justify-between text-[8px] xs:text-[8.5px] text-[#695646]">
        <div className="flex items-center gap-1 truncate max-w-[85%]">
          <Sparkles className="w-2.5 h-2.5 text-[#9A7B56] shrink-0" />
          <span className="uppercase tracking-wider font-medium truncate">
            {prod.metals[0] || '18K Gold Plated'} • Hallmarked
          </span>
        </div>
        <span className="text-[7.5px] font-semibold uppercase tracking-wider text-[#917B68] shrink-0">
          {prod.id}
        </span>
      </div>

      {/* Details Section */}
      <div className="p-2 xs:p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-1.5">
        <div>
          <div className="flex items-center justify-between text-[9px] text-[#8C7662]">
            <span className="capitalize">{prod.category}</span>
            <div className="flex items-center gap-0.5 text-[#C99834] shrink-0">
              <Star className="w-2.5 h-2.5 fill-[#C99834]" />
              <span className="text-[8.5px] font-semibold text-[#5A4535]">5.0</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(prod)}
            className="text-[11px] xs:text-xs sm:text-[13px] font-medium text-[#201815] hover:text-[#4A1622] cursor-pointer transition-colors leading-snug line-clamp-1 mt-0.5"
            title={prod.name}
          >
            {prod.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-xs xs:text-[13px] sm:text-sm font-semibold text-[#201815] tabular-nums">
              ₹{prod.price.toLocaleString()}
            </span>
            {prod.originalPrice && (
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs text-[#9B897B] line-through tabular-nums">
                ₹{prod.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => onAddToCart(prod, e)}
          className={`w-full py-1.5 sm:py-2 text-[8.5px] xs:text-[9.5px] uppercase font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-1 rounded-none cursor-pointer mt-1 ${
            isJustAdded
              ? 'bg-[#2E6B3E] text-white border border-[#2E6B3E]'
              : 'bg-[#FAF7F2] hover:bg-[#4A1622] text-[#201815] hover:text-white border border-[#D5C6B5] hover:border-[#4A1622]'
          }`}
        >
          {isJustAdded ? (
            <>
              <Check className="w-3 h-3" />
              <span>Added to Bag</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const SwarnikaBestsellers: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    selectedCategory,
    setSelectedCategory,
  } = useShop();

  const [activeSort, setActiveSort] = useState<'featured' | 'low-high' | 'high-low' | 'rating'>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Filter tabs
  const filterTabs = [
    { id: 'all', label: 'All Pieces' },
    { id: 'women', label: 'Women' },
    { id: 'men', label: 'Men' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'rings', label: 'Rings' },
    { id: 'bracelets', label: 'Bracelets' },
  ];

  // Filtering products
  let displayProducts = ALL_PRODUCTS.filter((prod) => {
    if (!selectedCategory || selectedCategory === 'all') return true;
    if (selectedCategory === 'women') return prod.gender === 'women' || prod.gender === 'unisex';
    if (selectedCategory === 'men') return prod.gender === 'men' || prod.gender === 'unisex';
    return prod.category === selectedCategory;
  });

  // Sorting products
  if (activeSort === 'low-high') {
    displayProducts = [...displayProducts].sort((a, b) => a.price - b.price);
  } else if (activeSort === 'high-low') {
    displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
  } else if (activeSort === 'rating') {
    displayProducts = [...displayProducts].sort((a, b) => b.rating - a.rating);
  }

  const handleAddToCart = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prod);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleToggleWish = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <section id="bestsellers-section" className="py-8 sm:py-12 md:py-16 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        
        {/* Header row: BESTSELLING PIECES — and View All Bestsellers → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-3 border-b border-[#E8DECE]">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#221B17]">
              BESTSELLING PIECES
            </h2>
            <span className="w-6 sm:w-10 h-[1px] bg-[#221B17]" />
            <span className="text-[10px] sm:text-xs text-[#827163] font-light">
              ({displayProducts.length} curated designs • Still-Life & On-Model Dual View)
            </span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            {/* Sort Dropdown */}
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as any)}
              className="text-[11px] sm:text-xs bg-[#FAF7F2] border border-[#D5C6B5] text-[#221B17] px-2.5 py-1 rounded-none focus:outline-none focus:border-[#4A1622] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <button
              onClick={() => setSelectedCategory('all')}
              className="group inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-[#221B17] hover:text-[#4A1622] transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Filter Tabs Bar (Horizontal scrolling on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 mb-4 sm:mb-6 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 text-[10.5px] sm:text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all rounded-none cursor-pointer ${
                  isActive
                    ? 'bg-[#4A1622] text-white shadow-xs'
                    : 'bg-[#F2EAE0] text-[#554336] hover:bg-[#E8DCCF]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {displayProducts.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#EDE2D4] my-6 space-y-3">
            <Sparkles className="w-8 h-8 text-[#9A7B56] mx-auto" />
            <h3 className="font-serif-luxury text-xl text-[#201815]">No jewellery pieces found</h3>
            <p className="text-xs text-[#7A6451] max-w-sm mx-auto">
              We currently don't have pieces matching this filter criteria. Explore all our signature collections.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A1622] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#381019] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 xs:gap-3 sm:gap-4">
            {displayProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                prod={prod}
                onAddToCart={handleAddToCart}
                isJustAdded={addedId === prod.id}
                isInWish={isInWishlist(prod.id)}
                onToggleWish={handleToggleWish}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
