import React, { useState } from 'react';
import { X, Star, Heart, Check, ShieldCheck, Truck, ShoppingBag, User, Sparkles, ZoomIn, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'product' | 'model' | 'closeup'>('product');
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('14');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const activeMetal = selectedMetal || quickViewProduct.metals[0] || '18K Gold Plated';
  const isWish = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, activeMetal, quickViewProduct.category === 'rings' ? selectedSize : undefined);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
      setIsCartOpen(true);
    }, 600);
  };

  const discountPercent = quickViewProduct.originalPrice
    ? Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)
    : null;

  // Active view image
  let activeImage = quickViewProduct.image;
  let activeFallback = quickViewProduct.fallbackImage;
  let activeLabel = 'Product Still-Life';

  if (activeTab === 'model') {
    activeImage = quickViewProduct.modelImage;
    activeFallback = quickViewProduct.fallbackModelImage;
    activeLabel = 'Worn on Model';
  } else if (activeTab === 'closeup' && quickViewProduct.closeupImage) {
    activeImage = quickViewProduct.closeupImage;
    activeFallback = quickViewProduct.fallbackImage;
    activeLabel = 'Macro Closeup';
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 xs:p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-none max-w-2xl sm:max-w-4xl w-full border border-[#E4D5C4] shadow-2xl overflow-hidden z-10">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#4A3D31] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Dual Gallery View: Model & Product placed together */}
          <div className="flex flex-col bg-[#F5ECE1]">
            {/* View Switcher Tabs at top of image */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#EFE4D6] border-b border-[#E1D1BF] text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-[#6D5846] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#4A1622]" />
                Atelier Gallery
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('product')}
                  className={`px-2 py-0.5 rounded-none text-[9.5px] transition-all cursor-pointer ${
                    activeTab === 'product'
                      ? 'bg-[#4A1622] text-white shadow-xs'
                      : 'bg-white/70 text-[#4A3D31] hover:bg-white'
                  }`}
                >
                  Still-Life
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('model')}
                  className={`px-2 py-0.5 rounded-none text-[9.5px] transition-all flex items-center gap-0.5 cursor-pointer ${
                    activeTab === 'model'
                      ? 'bg-[#4A1622] text-white shadow-xs'
                      : 'bg-white/70 text-[#4A3D31] hover:bg-white'
                  }`}
                >
                  <User className="w-2.5 h-2.5" />
                  <span>On Model</span>
                </button>
                {quickViewProduct.closeupImage && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('closeup')}
                    className={`px-2 py-0.5 rounded-none text-[9.5px] transition-all cursor-pointer ${
                      activeTab === 'closeup'
                        ? 'bg-[#4A1622] text-white shadow-xs'
                        : 'bg-white/70 text-[#4A3D31] hover:bg-white'
                    }`}
                  >
                    Macro Detail
                  </button>
                )}
              </div>
            </div>

            {/* Main Stage Image */}
            <div className="relative aspect-square w-full bg-[#F5ECE1] flex items-center justify-center p-3 sm:p-5">
              <SafeImage
                src={activeImage}
                fallbackSrc={activeFallback}
                alt={`${quickViewProduct.name} - ${activeLabel}`}
                fallbackCategory={activeLabel}
                fallbackTitle={quickViewProduct.name}
                className="w-full h-full object-cover shadow-xs"
              />

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`absolute top-3 left-3 sm:top-4 sm:left-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                  isWish ? 'bg-[#4A1622] text-white' : 'bg-white/90 text-[#4A3D31] hover:bg-white'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-white' : ''}`} />
              </button>

              {/* Discount Badge */}
              {discountPercent && (
                <span className="absolute bottom-3 left-3 bg-[#4A1622] text-white text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}

              {/* Zoom hint badge */}
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[8px] uppercase tracking-wider px-2 py-0.5 flex items-center gap-1 backdrop-blur-xs">
                <ZoomIn className="w-2.5 h-2.5" />
                {activeLabel}
              </span>
            </div>

            {/* Thumbnail Strip: Both Product & Model side-by-side */}
            <div className="p-2 sm:p-2.5 bg-[#FAF6F0] border-t border-[#E8DDD0] flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('product')}
                className={`relative w-14 h-14 border cursor-pointer overflow-hidden transition-all ${
                  activeTab === 'product' ? 'border-[#4A1622] ring-2 ring-[#4A1622]/30' : 'border-[#D9CABB] opacity-70 hover:opacity-100'
                }`}
              >
                <SafeImage
                  src={quickViewProduct.image}
                  fallbackSrc={quickViewProduct.fallbackImage}
                  alt="Product Thumbnail"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/65 text-white text-[6.5px] uppercase text-center py-0.5 font-medium">
                  Still-Life
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('model')}
                className={`relative w-14 h-14 border cursor-pointer overflow-hidden transition-all ${
                  activeTab === 'model' ? 'border-[#4A1622] ring-2 ring-[#4A1622]/30' : 'border-[#D9CABB] opacity-70 hover:opacity-100'
                }`}
              >
                <SafeImage
                  src={quickViewProduct.modelImage}
                  fallbackSrc={quickViewProduct.fallbackModelImage}
                  alt="Model Thumbnail"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#4A1622]/90 text-white text-[6.5px] uppercase text-center py-0.5 font-medium">
                  On Model
                </span>
              </button>

              {quickViewProduct.closeupImage && (
                <button
                  type="button"
                  onClick={() => setActiveTab('closeup')}
                  className={`relative w-14 h-14 border cursor-pointer overflow-hidden transition-all ${
                    activeTab === 'closeup' ? 'border-[#4A1622] ring-2 ring-[#4A1622]/30' : 'border-[#D9CABB] opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage
                    src={quickViewProduct.closeupImage}
                    fallbackSrc={quickViewProduct.fallbackImage}
                    alt="Closeup Thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/65 text-white text-[6.5px] uppercase text-center py-0.5 font-medium">
                    Macro
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Details & Customizer */}
          <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#8C7662] font-semibold">
                  SWARNIKA • {quickViewProduct.category.toUpperCase()}
                </span>
                <span className="text-[9px] bg-[#EFE3D5] text-[#554030] px-1.5 py-0.5 font-mono">
                  {quickViewProduct.id}
                </span>
              </div>

              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E] font-normal leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex text-[#C99834]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#C99834]" />
                  ))}
                </div>
                <span className="text-[11px] text-[#7A6451]">
                  5.0 ({quickViewProduct.reviewsCount || 124} verified acquisitions)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-2.5">
                <span className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E] font-semibold tabular-nums">
                  ₹{quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs sm:text-sm text-[#9B8877] line-through tabular-nums">
                    ₹{quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-[11.5px] sm:text-xs text-[#6F5B48] mt-2.5 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Product Finish & Detailing Info Box */}
              <div className="mt-3.5 p-3 bg-[#F4EDE3] border border-[#E3D4C4] space-y-1">
                <div className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-wider font-bold text-[#4A1622]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Artisanal Finish & Craftsmanship</span>
                </div>
                <p className="text-[10px] text-[#695442] leading-relaxed">
                  Crafted with premium gold-toned finishes and intricate stone settings, designed for lasting beauty.
                </p>
              </div>

              {/* Metal Selection */}
              <div className="mt-4 space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-semibold text-[#2D241E] flex items-center justify-between">
                  <span>Precious Metal Finish:</span>
                  <span className="text-[#4A1622] font-normal">{activeMetal}</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.metals.map((metal) => (
                    <button
                      key={metal}
                      type="button"
                      onClick={() => setSelectedMetal(metal)}
                      className={`px-2.5 py-1 text-[11px] rounded-none border transition-all cursor-pointer ${
                        activeMetal === metal
                          ? 'border-[#4A1622] bg-[#FAF3EC] text-[#4A1622] font-medium shadow-xs'
                          : 'border-[#E0D2C2] text-[#7A6451] hover:border-[#4A1622]'
                      }`}
                    >
                      {metal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ring Size Selection */}
              {quickViewProduct.category === 'rings' && (
                <div className="mt-3.5 space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#2D241E] flex items-center justify-between">
                    <span>Indian Ring Size:</span>
                    <span className="text-[#4A1622] font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {['10', '12', '14', '16', '18', '20'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-none text-xs font-medium border flex items-center justify-center transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'border-[#4A1622] bg-[#FAF3EC] text-[#4A1622]'
                            : 'border-[#E0D2C2] text-[#7A6451] hover:border-[#4A1622]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-3 border-t border-[#EDE1D3]">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#4A1622] hover:bg-[#381019] text-white py-2.5 sm:py-3 text-xs uppercase tracking-[0.18em] font-medium rounded-none shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG • ₹{quickViewProduct.price.toLocaleString()}</span>
                  </>
                )}
              </button>

              {/* Trust */}
              <div className="flex items-center justify-around text-[9.5px] text-[#7A6451] pt-0.5">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#4A1622]" /> Thoughtfully Handcrafted
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#4A1622]" /> Free Delivery over ₹2,999
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
