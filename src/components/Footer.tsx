import React from 'react';
import { Instagram, Facebook, Youtube, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsStoryOpen } = useShop();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const target = document.getElementById('bestsellers-section') || document.getElementById('categories-section');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#EAE0D3] pt-14 pb-10 text-[#4A3E35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 border-b border-[#EAE0D3]">
          
          {/* Brand Info (Matching Screenshot) */}
          <div className="lg:col-span-2 space-y-3.5">
            <a href="#" className="inline-flex items-center gap-3 group">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center text-[#4A1622]">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                  <polygon points="50,4 64,36 96,50 64,64 50,96 36,64 4,50 36,36" stroke="#4A1622" strokeWidth="3" fill="#4A1622" fillOpacity="0.08" />
                  <polygon points="50,18 60,40 82,50 60,60 50,82 40,60 18,50 40,40" stroke="#A48257" strokeWidth="2.5" fill="none" />
                  <circle cx="50" cy="50" r="10" stroke="#4A1622" strokeWidth="2.5" fill="#FAF7F2" />
                  <circle cx="50" cy="50" r="4.5" fill="#A48257" />
                </svg>
              </div>
              <div>
                <span className="block font-serif-luxury text-2xl sm:text-3xl tracking-[0.24em] font-normal text-[#2A231D] uppercase">
                  SWARNIKA
                </span>
                <span className="block text-[8px] uppercase tracking-[0.38em] text-[#8A735E] font-sans -mt-0.5 font-medium">
                  TIMELESS JEWELLERY
                </span>
              </div>
            </a>

            <p className="text-xs text-[#735F4C] max-w-xs font-light leading-relaxed">
              Exquisite gold-plated and fashion jewellery for women and men, designed for modern moments and lasting impressions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-2.5 pt-1 text-[#735F4C]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-[#D5C2AD] flex items-center justify-center hover:bg-[#A37E54] hover:text-white hover:border-[#A37E54] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3 h-3" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-[#D5C2AD] flex items-center justify-center hover:bg-[#A37E54] hover:text-white hover:border-[#A37E54] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3 h-3" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-[#D5C2AD] flex items-center justify-center hover:bg-[#A37E54] hover:text-white hover:border-[#A37E54] transition-colors"
                aria-label="Pinterest"
              >
                <Share2 className="w-3 h-3" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-[#D5C2AD] flex items-center justify-center hover:bg-[#A37E54] hover:text-white hover:border-[#A37E54] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Shop
            </h4>
            <ul className="space-y-1.5 text-xs text-[#6E5A47]">
              <li>
                <button onClick={() => handleCategoryClick('all')} className="hover:text-[#987853] transition-colors">
                  All Jewelry
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('rings')} className="hover:text-[#987853] transition-colors">
                  Rings
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('necklaces')} className="hover:text-[#987853] transition-colors">
                  Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('earrings')} className="hover:text-[#987853] transition-colors">
                  Earrings
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('bracelets')} className="hover:text-[#987853] transition-colors">
                  Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('wedding')} className="hover:text-[#987853] transition-colors">
                  Wedding
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('gifts')} className="hover:text-[#987853] transition-colors">
                  Gifts
                </button>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              About
            </h4>
            <ul className="space-y-1.5 text-xs text-[#6E5A47]">
              <li>
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#987853] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#987853] transition-colors">
                  Craftsmanship
                </button>
              </li>
              <li>
                <a href="#story-section" className="hover:text-[#987853] transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#story-section" className="hover:text-[#987853] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#story-section" className="hover:text-[#987853] transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Customer Care
            </h4>
            <ul className="space-y-1.5 text-xs text-[#6E5A47]">
              <li>
                <a href="#" className="hover:text-[#987853] transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#987853] transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#987853] transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#987853] transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#987853] transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#987853] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8A7663]">
          <p>© 2026 Swarnika. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="font-serif-luxury text-xs text-[#A37E54] italic">
              Crafted to Be Seen
            </span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
