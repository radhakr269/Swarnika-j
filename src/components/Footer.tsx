import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SwarnikaLogo } from './brand/SwarnikaLogo';
import { ROUTES } from '../config/navigation';

export const Footer: React.FC = () => {
  const { setSelectedCategory, setIsStoryOpen } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (location.pathname !== ROUTES.HOME) {
      navigate(ROUTES.HOME);
      setTimeout(() => {
        const target = document.getElementById('bestsellers-section') || document.getElementById('categories-section');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const target = document.getElementById('bestsellers-section') || document.getElementById('categories-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#EAE0D3] pt-14 pb-10 text-[#4A3E35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 border-b border-[#EAE0D3]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link to={ROUTES.HOME} className="inline-flex items-center gap-3 group">
              <SwarnikaLogo size="md" showWordmark={true} wordmarkSize="md" animateHover={true} />
            </Link>

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
                <button onClick={() => handleCategoryClick('all')} className="hover:text-[#987853] transition-colors cursor-pointer">
                  All Jewelry
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('rings')} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Rings
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('necklaces')} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('earrings')} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Earrings
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('bracelets')} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('rings')} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Wedding
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('necklaces')} className="hover:text-[#987853] transition-colors cursor-pointer">
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
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Craftsmanship & Atelier
                </button>
              </li>
              <li>
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Hallmark & Quality
                </button>
              </li>
              <li>
                <button onClick={() => setIsStoryOpen(true)} className="hover:text-[#987853] transition-colors cursor-pointer">
                  Sustainability
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Care & Service
            </h4>
            <ul className="space-y-1.5 text-xs text-[#6E5A47]">
              <li>
                <Link to={ROUTES.ORDERS} className="hover:text-[#987853] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <span className="hover:text-[#987853] transition-colors cursor-pointer">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-[#987853] transition-colors cursor-pointer">
                  7-Day Returns
                </span>
              </li>
              <li>
                <span className="hover:text-[#987853] transition-colors cursor-pointer">
                  Ring Size Guide
                </span>
              </li>
              <li>
                <span className="hover:text-[#987853] transition-colors cursor-pointer">
                  Jewellery Care
                </span>
              </li>
            </ul>
          </div>

          {/* Concierge Contact Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Atelier Concierge
            </h4>
            <p className="text-xs text-[#6E5A47] leading-relaxed">
              Have questions regarding sizing, custom finishes, or bespoke gifting?
            </p>
            <div className="space-y-1 text-xs text-[#6E5A47] pt-1">
              <p>
                <strong className="text-[#201815]">Phone:</strong> +91 98765 43210
              </p>
              <p>
                <strong className="text-[#201815]">Email:</strong> concierge@swarnika.com
              </p>
              <p className="text-[10px] text-[#8C7662]">
                Mon - Sat • 10:00 AM - 7:00 PM IST
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7662] gap-3">
          <p>© {new Date().getFullYear()} SWARNIKA Fine Jewellery Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <span className="hover:text-[#201815] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#201815] transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#201815] transition-colors cursor-pointer">BIS Hallmark Info</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
