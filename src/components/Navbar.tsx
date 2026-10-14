import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setSelectedCategory,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setShopOpen(false);
    setCollectionsOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('categories-section') || document.getElementById('best-sellers');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE1D4] w-full">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Icon to the Left (Matching User Requirement & Reference Picture) */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
              {/* Luxury Jewelry Brand Logo Emblem to the left */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#C5A882] bg-[#F7EFE4] flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#9A7851] transition-colors">
                <svg
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#9A7851]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Faceted Fine Jewelry Diamond Crest */}
                  <polygon
                    points="6,3 18,3 22,9 12,21 2,9"
                    stroke="#9A7851"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="#F2E5D5"
                  />
                  <line x1="2" y1="9" x2="22" y2="9" stroke="#9A7851" strokeWidth="1.2" />
                  <polyline points="6,3 12,9 18,3" stroke="#9A7851" strokeWidth="1.2" />
                  <polyline points="12,9 12,21" stroke="#9A7851" strokeWidth="1.2" />
                  <polyline points="6,9 12,21 18,9" stroke="#9A7851" strokeWidth="1.2" />
                </svg>
              </div>

              {/* Brand Name Text: AURELIA + FINE JEWELRY */}
              <div className="flex flex-col text-left">
                <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.24em] font-normal text-[#2A231D] group-hover:text-[#9B7853] transition-colors uppercase leading-none">
                  AURELIA
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.38em] text-[#8A735E] font-sans font-medium mt-1">
                  FINE JEWELRY
                </span>
              </div>
            </a>
          </div>

          {/* Center Navigation Links (Matching Screenshot: Home, Shop v, Collections v, About, Blog, Contact) */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-xs lg:text-sm font-medium text-[#4A3F35]">
            <a
              href="#"
              className="text-[#2A231D] hover:text-[#9B7853] transition-colors py-1 relative"
            >
              Home
            </a>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                onClick={() => handleCategoryClick('all')}
                className="flex items-center gap-1 hover:text-[#9B7853] transition-colors py-1"
              >
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {shopOpen && (
                <div className="absolute top-full -left-4 w-48 pt-2 z-50">
                  <div className="bg-[#FAF7F2] border border-[#E4D9CC] shadow-md py-2 text-xs">
                    {[
                      { name: 'All Jewelry', key: 'all' },
                      { name: 'Rings', key: 'rings' },
                      { name: 'Necklaces', key: 'necklaces' },
                      { name: 'Earrings', key: 'earrings' },
                      { name: 'Bracelets', key: 'bracelets' },
                      { name: 'Wedding', key: 'wedding' },
                      { name: 'Gifts', key: 'gifts' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => handleCategoryClick(item.key)}
                        className="w-full text-left px-4 py-2 hover:bg-[#F2E7D9] text-[#4A3F35] transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                onClick={() => handleCategoryClick('all')}
                className="flex items-center gap-1 hover:text-[#9B7853] transition-colors py-1"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {collectionsOpen && (
                <div className="absolute top-full -left-4 w-52 pt-2 z-50">
                  <div className="bg-[#FAF7F2] border border-[#E4D9CC] shadow-md py-2 text-xs">
                    {['Solitaire Elegance', 'Bridal & Forever', 'Everyday Luxury', 'Vintage Revival'].map((col) => (
                      <button
                        key={col}
                        onClick={() => handleCategoryClick('all')}
                        className="w-full text-left px-4 py-2 hover:bg-[#F2E7D9] text-[#4A3F35] transition-colors"
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href="#story-section" className="hover:text-[#9B7853] transition-colors py-1">
              About
            </a>
            <a href="#story-section" className="hover:text-[#9B7853] transition-colors py-1">
              Blog
            </a>
            <a href="#newsletter-section" className="hover:text-[#9B7853] transition-colors py-1">
              Contact
            </a>
          </nav>

          {/* Right Action Icons (Matching Screenshot: Search, Heart, Bag) */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#3A3026]">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-[#9B7853] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-1 hover:text-[#9B7853] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#9B7853] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:text-[#9B7853] transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#2A231D] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 md:hidden text-[#3A3026]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#EAE1D4] px-6 py-4 space-y-3">
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-[#2A231D]">
            Home
          </a>
          <button onClick={() => handleCategoryClick('all')} className="block text-left w-full py-1 text-sm font-medium text-[#2A231D]">
            Shop All
          </button>
          <a href="#story-section" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-[#2A231D]">
            About
          </a>
          <a href="#story-section" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-[#2A231D]">
            Blog
          </a>
          <a href="#newsletter-section" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-[#2A231D]">
            Contact
          </a>
        </div>
      )}
    </header>
  );
};
