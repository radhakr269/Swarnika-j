import React from 'react';
import { Home, Grid, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsStoryOpen,
    setSelectedCategory,
  } = useShop();

  const scrollToCategories = () => {
    setSelectedCategory('all');
    const el = document.getElementById('categories-section') || document.getElementById('bestsellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#EDE4D8] px-2 py-1.5 flex items-center justify-around shadow-lg">
      {/* Home */}
      <button
        onClick={scrollToTop}
        className="flex flex-col items-center justify-center p-1 text-[#42362E] hover:text-[#4A1622] transition-colors cursor-pointer"
      >
        <Home className="w-4 h-4 stroke-[1.6]" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Home</span>
      </button>

      {/* Categories */}
      <button
        onClick={scrollToCategories}
        className="flex flex-col items-center justify-center p-1 text-[#42362E] hover:text-[#4A1622] transition-colors cursor-pointer"
      >
        <Grid className="w-4 h-4 stroke-[1.6]" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Shop</span>
      </button>

      {/* Story */}
      <button
        onClick={() => setIsStoryOpen(true)}
        className="flex flex-col items-center justify-center p-1 text-[#42362E] hover:text-[#4A1622] transition-colors cursor-pointer"
      >
        <Sparkles className="w-4 h-4 stroke-[1.6]" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Heritage</span>
      </button>

      {/* Wishlist */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="flex flex-col items-center justify-center p-1 text-[#42362E] hover:text-[#4A1622] transition-colors relative cursor-pointer"
      >
        <div className="relative">
          <Heart className="w-4 h-4 stroke-[1.6]" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#4A1622] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Wishlist</span>
      </button>

      {/* Cart */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center justify-center p-1 text-[#4A1622] transition-colors relative cursor-pointer"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
          <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-[#4A1622] text-white text-[8px] rounded-full flex items-center justify-center font-bold">
            {cartItemCount}
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Bag</span>
      </button>
    </nav>
  );
};
