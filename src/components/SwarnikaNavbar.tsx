import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SwarnikaLogo } from './brand/SwarnikaLogo';
import { ROUTES } from '../config/navigation';
import { STORE_CONFIG } from '../config/store';

export const SwarnikaNavbar: React.FC = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsStoryOpen,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) {
      return location.pathname === ROUTES.HOME;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* 1. Top Announcement Bar (Rich Burgundy #4A101C matching Reference Image 8 & 15) */}
      <div className="bg-[#4A101C] text-[#FAF7F2] text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 border-b border-[#3B0C16] transition-colors">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-light tracking-wide text-[11px] sm:text-[12px]">
              Complimentary Shipping on Orders ₹{STORE_CONFIG.freeShippingThreshold.toLocaleString('en-IN')}+
            </span>
            <span className="text-[#A77B3D] hidden xs:inline" aria-hidden="true">•</span>
            <span className="hidden xs:inline font-light tracking-wide text-[11px] sm:text-[12px] text-[#ECE0D1]">
              A More Radiant You, Always
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 text-[#ECE0D1] hover:text-white cursor-pointer select-none text-[11px] sm:text-xs font-light tracking-wide">
            <span>India (INR ₹)</span>
            <ChevronDown className="w-3 h-3 text-[#A77B3D]" />
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Warm Ivory #FAF7F2, fine hairline border #E8DED1) */}
      <div className="bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#E8DED1] w-full">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            
            {/* Desktop Left: Brand Identity (Emblem + Wordmark) */}
            <div className="hidden lg:flex items-center shrink-0">
              <Link
                to={ROUTES.HOME}
                className="flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/40"
                aria-label="SWARNIKA Timeless Jewellery Home"
              >
                <SwarnikaLogo size="md" animateHover={true} />
                <div className="flex flex-col">
                  <span className="font-serif-luxury text-xl xl:text-2xl tracking-[0.22em] font-normal text-[#201914] uppercase leading-none">
                    SWARNIKA
                  </span>
                  <span className="text-[7.5px] uppercase tracking-[0.28em] text-[#6C5849] font-sans font-medium mt-1">
                    JEWELLERY FOR A BRIGHTER YOU
                  </span>
                </div>
              </Link>
            </div>

            {/* Mobile Left: Menu Toggle Button (Min 44x44px touch target) */}
            <div className="flex lg:hidden items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 flex items-center justify-center text-[#201914] hover:text-[#4A101C] hover:bg-[#F2E8DC]/60 transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/40"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.75]" /> : <Menu className="w-5 h-5 stroke-[1.75]" />}
              </button>
            </div>

            {/* Mobile Center: Brand Identity */}
            <div className="flex lg:hidden items-center justify-center flex-1 px-1">
              <Link
                to={ROUTES.HOME}
                className="flex flex-col items-center group focus:outline-hidden"
                aria-label="SWARNIKA Home"
              >
                <span className="font-serif-luxury text-lg sm:text-xl tracking-[0.22em] font-normal text-[#201914] uppercase leading-none">
                  SWARNIKA
                </span>
                <span className="text-[6.5px] sm:text-[7px] uppercase tracking-[0.26em] text-[#6C5849] font-sans font-medium mt-0.5">
                  JEWELLERY FOR A BRIGHTER YOU
                </span>
              </Link>
            </div>

            {/* Desktop Center: Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center space-x-5 xl:space-x-7 text-[12.5px] xl:text-[13.5px] font-medium tracking-[0.06em] text-[#42362E]"
            >
              <Link
                to={ROUTES.HOME}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  isActive(ROUTES.HOME)
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Home
              </Link>
              <Link
                to={ROUTES.SHOP}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  isActive(ROUTES.SHOP)
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Shop All
              </Link>
              <Link
                to={ROUTES.WOMEN}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  isActive(ROUTES.WOMEN)
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Women
              </Link>
              <Link
                to={ROUTES.MEN}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  isActive(ROUTES.MEN)
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Men
              </Link>
              <Link
                to={ROUTES.COLLECTIONS}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  isActive(ROUTES.COLLECTIONS)
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Collections
              </Link>
              <Link
                to={ROUTES.CATEGORY('necklaces')}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  location.pathname === ROUTES.CATEGORY('necklaces')
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Necklaces
              </Link>
              <Link
                to={ROUTES.CATEGORY('rings')}
                className={`py-1.5 transition-colors relative hover:text-[#4A101C] ${
                  location.pathname === ROUTES.CATEGORY('rings')
                    ? 'text-[#4A101C] font-semibold border-b-[1.5px] border-[#4A101C]'
                    : 'text-[#42362E]'
                }`}
              >
                Rings
              </Link>
              <button
                onClick={() => setIsStoryOpen(true)}
                className="py-1.5 text-[#42362E] hover:text-[#4A101C] transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </nav>

            {/* Right: Actions (Search, Wishlist, Account, Shopping Bag) */}
            <div className="flex items-center space-x-0.5 sm:space-x-1.5 md:space-x-2 text-[#201914] shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#201914] hover:text-[#4A101C] hover:bg-[#F2E8DC]/60 rounded-full transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/40"
                aria-label="Search Jewellery Collections"
              >
                <Search className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
              </button>

              {/* Wishlist Trigger */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#201914] hover:text-[#4A101C] hover:bg-[#F2E8DC]/60 rounded-full transition-colors relative cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/40"
                aria-label={`Saved Wishlist Items (${wishlist.length})`}
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 min-w-[15px] sm:min-w-[16px] h-3.5 sm:h-4 px-0.5 sm:px-1 bg-[#4A101C] text-white text-[8px] sm:text-[9px] rounded-full flex items-center justify-center font-medium shadow-xs leading-none">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Customer Account Link */}
              <Link
                to={ROUTES.ACCOUNT}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#201914] hover:text-[#4A101C] hover:bg-[#F2E8DC]/60 rounded-full transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/40"
                aria-label="Customer Account"
              >
                <User className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.6]" />
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#201914] hover:text-[#4A101C] hover:bg-[#F2E8DC]/60 rounded-full transition-colors relative cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]/40"
                aria-label={`Shopping Bag (${cartItemCount} items)`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[1.7]" />
                <span className="absolute top-1 sm:top-1.5 right-1 sm:right-1.5 min-w-[15px] sm:min-w-[17px] h-[15px] sm:h-[17px] px-0.5 sm:px-1 bg-[#4A101C] text-white text-[8px] sm:text-[9px] rounded-full flex items-center justify-center font-semibold shadow-xs leading-none">
                  {cartItemCount}
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer Menu (Verified, No Fake Phone/Hours) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DED1] px-4 py-5 shadow-2xl animate-in fade-in duration-200">
          {/* Quick Category Action Cards */}
          <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-[#E8DECE]">
            <Link
              to={ROUTES.WOMEN}
              className="min-h-[44px] p-2.5 bg-white border border-[#E8DED1] text-left text-xs font-semibold text-[#201914] uppercase tracking-wider flex items-center justify-between hover:border-[#4A101C] transition-colors"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#4A101C]" />
            </Link>
            <Link
              to={ROUTES.MEN}
              className="min-h-[44px] p-2.5 bg-white border border-[#E8DED1] text-left text-xs font-semibold text-[#201914] uppercase tracking-wider flex items-center justify-between hover:border-[#4A101C] transition-colors"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#4A101C]" />
            </Link>
          </div>

          {/* Primary Route Navigation List (44px+ touch targets) */}
          <div className="py-3 space-y-1 text-sm font-medium text-[#201914]">
            <Link
              to={ROUTES.HOME}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Home
            </Link>
            <Link
              to={ROUTES.SHOP}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Shop All Collections
            </Link>
            <Link
              to={ROUTES.WOMEN}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Women's Jewellery
            </Link>
            <Link
              to={ROUTES.MEN}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Men's Jewellery
            </Link>
            <Link
              to={ROUTES.COLLECTIONS}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Curated Collections & Bridal
            </Link>
            <Link
              to={ROUTES.CATEGORY('necklaces')}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Necklaces & Pendants
            </Link>
            <Link
              to={ROUTES.CATEGORY('earrings')}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Earrings & Jhumkas
            </Link>
            <Link
              to={ROUTES.CATEGORY('rings')}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Rings & Bands
            </Link>
            <Link
              to={ROUTES.CATEGORY('bracelets')}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Bracelets & Bangles
            </Link>
            <Link
              to={ROUTES.ACCOUNT}
              className="min-h-[44px] flex items-center px-3 hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors"
            >
              Customer Account
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsStoryOpen(true);
              }}
              className="min-h-[44px] flex items-center px-3 w-full text-left hover:bg-[#F2E8DC] hover:text-[#4A101C] transition-colors cursor-pointer"
            >
              Our Heritage & Story
            </button>
          </div>

          {/* Clean Verified Brand Trust Note (Zero fake phone numbers or hours) */}
          <div className="pt-3 border-t border-[#E8DECE] flex items-center justify-between text-[11px] text-[#6C5849]">
            <span className="flex items-center gap-1.5 font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
              <span>SWARNIKA Fine Jewellery • Est. 1994</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-[#4A101C] tracking-wider">
              100% Certified
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
