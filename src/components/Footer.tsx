/**
 * SWARNIKA — Luxury Brand Footer (Phase 09 Refined)
 * Semantic routing, honest customer service details, zero unverified claims,
 * and functional modal view for Privacy & Terms.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SwarnikaLogo } from './brand/SwarnikaLogo';
import { ROUTES } from '../config/navigation';

export const Footer: React.FC = () => {
  const { setIsStoryOpen } = useShop();
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#FAF6F0] border-t border-[#EAE0D3] pt-14 pb-10 text-[#4A3E35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 pb-10 border-b border-[#EAE0D3]">
          
          {/* 1. Brand Info Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link to={ROUTES.HOME} className="inline-flex items-center gap-3 group">
              <SwarnikaLogo size="md" showWordmark={true} wordmarkSize="md" animateHover={true} />
            </Link>

            <p className="text-xs text-[#735F4C] max-w-xs font-light leading-relaxed">
              Handcrafted gold-plated and fashion jewellery designed for modern elegance, celebrating royal heritage silhouettes with timeless grace.
            </p>

            <div className="pt-2 text-[11px] text-[#8C7662] space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A77B3D]" />
                <span>Jaipur-Inspired Artisanal Design & Curation</span>
              </p>
              <p className="text-[10px] text-[#A69584]">
                Complimentary delivery on domestic orders ₹2,999+
              </p>
            </div>
          </div>

          {/* 2. Shop Categories Column (Semantic Links) */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#6E5A47]">
              <li>
                <Link to={ROUTES.SHOP} className="hover:text-[#4A1622] transition-colors">
                  Shop All Heirlooms
                </Link>
              </li>
              <li>
                <Link to={ROUTES.WOMEN} className="hover:text-[#4A1622] transition-colors">
                  Women's Royal Edit
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MEN} className="hover:text-[#4A1622] transition-colors">
                  Men's Modern Strength
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COLLECTIONS} className="hover:text-[#4A1622] transition-colors">
                  Curated Suites
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CATEGORY('necklaces')} className="hover:text-[#4A1622] transition-colors">
                  Necklaces & Chokers
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CATEGORY('earrings')} className="hover:text-[#4A1622] transition-colors">
                  Earrings & Jhumkas
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CATEGORY('rings')} className="hover:text-[#4A1622] transition-colors">
                  Rings & Signets
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. About & Atelier Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Atelier
            </h4>
            <ul className="space-y-2 text-xs text-[#6E5A47]">
              <li>
                <button
                  onClick={() => setIsStoryOpen(true)}
                  className="hover:text-[#4A1622] transition-colors cursor-pointer text-left"
                >
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsStoryOpen(true)}
                  className="hover:text-[#4A1622] transition-colors cursor-pointer text-left"
                >
                  Artisanal Craftsmanship
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsStoryOpen(true)}
                  className="hover:text-[#4A1622] transition-colors cursor-pointer text-left"
                >
                  Material & Finish Care
                </button>
              </li>
              <li>
                <Link to={ROUTES.WISHLIST} className="hover:text-[#4A1622] transition-colors">
                  Saved Heirlooms
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Care & Patron Account Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2A231D]">
              Care & Service
            </h4>
            <ul className="space-y-2 text-xs text-[#6E5A47]">
              <li>
                <Link to={ROUTES.ACCOUNT} className="hover:text-[#4A1622] transition-colors">
                  Patron Account & Sizing
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ORDERS} className="hover:text-[#4A1622] transition-colors">
                  Track Consignment
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.ACCOUNT}?tab=preferences`} className="hover:text-[#4A1622] transition-colors">
                  Ring & Bangle Sizing Guide
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.ACCOUNT}?tab=concierge`} className="hover:text-[#4A1622] transition-colors">
                  Concierge Privileges
                </Link>
              </li>
              <li className="pt-1">
                <span className="text-[11px] text-[#8C7662] block">
                  Atelier Inquiries: <span className="font-mono text-[#4A1622]">concierge@swarnika.com</span>
                </span>
                <span className="text-[10px] text-[#A69584]">
                  Mon – Sat, 10:00 – 19:00 IST
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Verified Terms */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C7662] gap-3">
          <p>© {new Date().getFullYear()} SWARNIKA Fine Jewellery. All rights reserved.</p>
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-[#201815] transition-colors cursor-pointer underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-[#201815] transition-colors cursor-pointer underline"
            >
              Terms of Service
            </button>
            <span className="text-[#A69584]">
              Artisanal Fashion & Gold-Plated Jewellery
            </span>
          </div>
        </div>
      </div>

      {/* Policy Details Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
          <div
            onClick={() => setActivePolicyModal(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative bg-[#FAF8F5] border border-[#E4D5C4] shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] cursor-pointer"
              aria-label="Close policy"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#4A1622] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#2E6B3E]" />
              <span>Consumer Transparency Notice</span>
            </div>

            <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E]">
              {activePolicyModal === 'privacy' ? 'Privacy & Data Stewardship' : 'Terms & Store Conditions'}
            </h3>

            <div className="text-xs text-[#6D5844] space-y-2.5 leading-relaxed max-h-64 overflow-y-auto pr-1">
              {activePolicyModal === 'privacy' ? (
                <>
                  <p>
                    SWARNIKA respects patron confidentiality. Customer bag heirlooms and wishlist selections are preserved respectfully. In compliance with strict consumer privacy standards, live patron authentication and order processing require verified server-side security activation.
                  </p>
                  <p>
                    We do not sell personal browsing behavior or transmit payment credentials to unauthorized third parties. Production commerce features utilize industry-standard 256-bit encryption.
                  </p>
                  <p>
                    For inquiries regarding data retention or profile updates, contact our atelier at concierge@swarnika.com.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All handcrafted items presented on SWARNIKA are crafted with gold-plated and antique polki metalwork. Descriptions and dimensions are provided to guide personal styling.
                  </p>
                  <p>
                    Pricing is listed in Indian Rupees (₹) and includes applicable domestic taxes. Promotions and privilege discounts apply to eligible catalogue selections according to promotional terms.
                  </p>
                  <p>
                    Acquisitions remain subject to atelier production availability and courier service coverage.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-[#E8DED1]">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-full bg-[#4A1622] text-white py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#350F18] cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
