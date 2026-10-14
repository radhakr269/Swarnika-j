import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ROUTES } from '../config/navigation';

export const MobileBottomNav: React.FC = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsStoryOpen,
  } = useShop();

  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    if (location.pathname !== ROUTES.HOME) {
      navigate(ROUTES.HOME);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShopClick = () => {
    if (location.pathname !== ROUTES.SHOP) {
      navigate(ROUTES.SHOP);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHomeActive = location.pathname === ROUTES.HOME;
  const isShopActive = location.pathname === ROUTES.SHOP || location.pathname.startsWith('/category');

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FAF7F2]/98 backdrop-blur-md border-t border-[#E8DED1] px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] flex items-center justify-around shadow-md"
    >
      {/* Home */}
      <button
        onClick={handleHomeClick}
        className={`flex flex-col items-center justify-center p-1.5 min-w-[56px] transition-colors cursor-pointer focus:outline-hidden ${
          isHomeActive ? 'text-[#4A101C]' : 'text-[#6C5849] hover:text-[#4A101C]'
        }`}
        aria-label="Navigate to Home"
      >
        <Home className={`w-4 h-4 ${isHomeActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
        <span className={`text-[9px] uppercase tracking-wider mt-0.5 ${isHomeActive ? 'font-bold' : 'font-medium'}`}>
          Home
        </span>
      </button>

      {/* Shop All */}
      <button
        onClick={handleShopClick}
        className={`flex flex-col items-center justify-center p-1.5 min-w-[56px] transition-colors cursor-pointer focus:outline-hidden ${
          isShopActive ? 'text-[#4A101C]' : 'text-[#6C5849] hover:text-[#4A101C]'
        }`}
        aria-label="Navigate to Shop All Jewellery"
      >
        <Grid className={`w-4 h-4 ${isShopActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
        <span className={`text-[9px] uppercase tracking-wider mt-0.5 ${isShopActive ? 'font-bold' : 'font-medium'}`}>
          Shop
        </span>
      </button>

      {/* Story / Heritage Modal */}
      <button
        onClick={() => setIsStoryOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 min-w-[56px] text-[#6C5849] hover:text-[#4A101C] transition-colors cursor-pointer focus:outline-hidden"
        aria-label="Our Heritage & Story"
      >
        <Sparkles className="w-4 h-4 stroke-[1.6]" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Heritage</span>
      </button>

      {/* Wishlist Drawer */}
      <button
        onClick={() => setIsWishlistOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 min-w-[56px] text-[#6C5849] hover:text-[#4A101C] transition-colors relative cursor-pointer focus:outline-hidden"
        aria-label={`Wishlist (${wishlist.length} saved)`}
      >
        <div className="relative">
          <Heart className="w-4 h-4 stroke-[1.6]" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 bg-[#4A101C] text-white text-[8px] rounded-full flex items-center justify-center font-bold shadow-xs">
              {wishlist.length}
            </span>
          )}
        </div>
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Wishlist</span>
      </button>

      {/* Shopping Bag Drawer */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 min-w-[56px] text-[#4A101C] transition-colors relative cursor-pointer focus:outline-hidden"
        aria-label={`Shopping Bag (${cartItemCount} items)`}
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
          <span className="absolute -top-1.5 -right-2 min-w-[14px] h-3.5 px-0.5 bg-[#4A101C] text-white text-[8px] rounded-full flex items-center justify-center font-bold shadow-xs">
            {cartItemCount}
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Bag</span>
      </button>
    </nav>
  );
};
