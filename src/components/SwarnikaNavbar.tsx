import React, { useState } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, X, PhoneCall, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SwarnikaNavbar: React.FC = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setSelectedCategory,
    setIsStoryOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (cat: string) => {
    setSelectedCategory(cat);
    setMobileMenuOpen(false);
    const target = document.getElementById('bestsellers-section') || document.getElementById('categories-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE4D8] w-full">
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Wordmark with Luxury Logo on the Left */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group">
              {/* Luxury Geometric Gold & Maroon Emblem */}
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 shrink-0 flex items-center justify-center text-[#4A1622] transition-transform duration-300 group-hover:rotate-45">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  {/* Outer Diamond */}
                  <polygon
                    points="50,4 64,36 96,50 64,64 50,96 36,64 4,50 36,36"
                    stroke="#4A1622"
                    strokeWidth="3.5"
                    fill="#4A1622"
                    fillOpacity="0.08"
                  />
                  {/* Inner Geometric Star */}
                  <polygon
                    points="50,18 60,40 82,50 60,60 50,82 40,60 18,50 40,40"
                    stroke="#A48257"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Center Radiant Core */}
                  <circle cx="50" cy="50" r="10" stroke="#4A1622" strokeWidth="2.5" fill="#FAF7F2" />
                  <circle cx="50" cy="50" r="4.5" fill="#A48257" />
                </svg>
              </div>

              {/* Brand Wordmark: SWARNIKA */}
              <span className="font-serif-luxury text-lg xs:text-xl sm:text-2xl lg:text-[28px] tracking-[0.22em] sm:tracking-[0.24em] font-normal text-[#201815] uppercase leading-none">
                SWARNIKA
              </span>
            </a>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs lg:text-[13px] font-medium text-[#42362E]">
            <a
              href="#"
              className="text-[#201815] py-1 border-b-[1.5px] border-[#201815] font-semibold"
            >
              Home
            </a>
            <button
              onClick={() => handleNav('all')}
              className="hover:text-[#4A1622] transition-colors py-1 cursor-pointer"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNav('women')}
              className="hover:text-[#4A1622] transition-colors py-1 cursor-pointer"
            >
              Women
            </button>
            <button
              onClick={() => handleNav('men')}
              className="hover:text-[#4A1622] transition-colors py-1 cursor-pointer"
            >
              Men
            </button>
            <button
              onClick={() => handleNav('necklaces')}
              className="hover:text-[#4A1622] transition-colors py-1 cursor-pointer"
            >
              Necklaces
            </button>
            <button
              onClick={() => handleNav('rings')}
              className="hover:text-[#4A1622] transition-colors py-1 cursor-pointer"
            >
              Rings
            </button>
            <button
              onClick={() => setIsStoryOpen(true)}
              className="hover:text-[#4A1622] transition-colors py-1 cursor-pointer"
            >
              Our Story
            </button>
          </nav>

          {/* Right Action Icons (Search, Heart, User, Bag with badge) */}
          <div className="flex items-center space-x-2.5 xs:space-x-3 sm:space-x-4 md:space-x-5 text-[#2A201B]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-[#4A1622] transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1 hover:text-[#4A1622] transition-colors relative cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#4A1622] text-white text-[8.5px] rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:text-[#4A1622] transition-colors relative cursor-pointer"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#4A1622] text-white text-[8.5px] rounded-full flex items-center justify-center font-semibold">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 md:hidden text-[#2A201B] cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EDE4D8] px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E8DECE]">
            <button
              onClick={() => handleNav('women')}
              className="p-2.5 bg-white border border-[#E4D5C5] text-left text-xs font-semibold text-[#201815] uppercase tracking-wider flex items-center justify-between"
            >
              <span>Shop Women</span>
              <span className="text-[10px] text-[#4A1622]">→</span>
            </button>
            <button
              onClick={() => handleNav('men')}
              className="p-2.5 bg-white border border-[#E4D5C5] text-left text-xs font-semibold text-[#201815] uppercase tracking-wider flex items-center justify-between"
            >
              <span>Shop Men</span>
              <span className="text-[10px] text-[#4A1622]">→</span>
            </button>
          </div>

          <div className="py-2 space-y-2 text-xs font-medium text-[#201815]">
            <button onClick={() => handleNav('all')} className="block text-left w-full py-1 hover:text-[#4A1622]">
              All Collections
            </button>
            <button onClick={() => handleNav('necklaces')} className="block text-left w-full py-1 hover:text-[#4A1622]">
              Necklaces & Pendants
            </button>
            <button onClick={() => handleNav('earrings')} className="block text-left w-full py-1 hover:text-[#4A1622]">
              Earrings & Hoops
            </button>
            <button onClick={() => handleNav('rings')} className="block text-left w-full py-1 hover:text-[#4A1622]">
              Rings & Bands
            </button>
            <button onClick={() => handleNav('bracelets')} className="block text-left w-full py-1 hover:text-[#4A1622]">
              Bracelets & Cuffs
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsStoryOpen(true);
              }}
              className="block text-left w-full py-1 hover:text-[#4A1622]"
            >
              Our Heritage & Craft
            </button>
          </div>

          <div className="pt-3 border-t border-[#E8DECE] flex items-center justify-between text-[11px] text-[#6D5844]">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#4A1622]" />
              <span>Concierge: +91 98765 43210</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#4A1622]">Mon-Sat</span>
          </div>
        </div>
      )}
    </header>
  );
};
