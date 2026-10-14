import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS } from '../data/jewelryData';
import { SafeImage } from './SafeImage';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    isWishlistOpen,
    setIsWishlistOpen,
    setIsCartOpen,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E6D9CB] shadow-2xl flex flex-col justify-between">
          
          <div className="p-4 sm:p-6 border-b border-[#EDE2D4] flex items-center justify-between">
            <div>
              <h2 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#2D241E]">
                Saved Favorites ({wishlist.length})
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#8C7662]">
                Your personal curated heirloom wishlist
              </p>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#F4EDE4] flex items-center justify-center text-[#4A1622]">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#2D241E]">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#7A6451] max-w-xs leading-relaxed">
                  Click the heart icon on any jewelry piece to save it to your personal wishlist.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 sm:gap-4 p-3 bg-white border border-[#EDE2D4] rounded-none shadow-xs"
                >
                  <div className="w-18 h-18 sm:w-20 sm:h-20 bg-[#F7F2EB] rounded-none overflow-hidden shrink-0 border border-[#EBE0D3]">
                    <SafeImage
                      src={product.image}
                      fallbackSrc={product.fallbackImage}
                      alt={product.name}
                      fallbackCategory={product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#2D241E]">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-[#9E8B79] hover:text-[#B43838] transition-colors p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#4A1622] tabular-nums mt-1">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                        setIsCartOpen(true);
                      }}
                      className="mt-2 text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#4A1622] hover:text-[#310E17] flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
