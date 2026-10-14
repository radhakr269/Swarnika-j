import React from 'react';
import { Gem, Truck, Gift, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export const SwarnikaValueProps: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF7F2] border-b border-[#E8DED1] py-5 sm:py-6 md:py-7">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0">
          
          {/* Item 1: Premium Craftsmanship */}
          <div className="flex items-center gap-3 lg:pr-6 lg:border-r lg:border-[#E8DED1]">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center text-[#4A101C] shrink-0 border border-[#E2D4C3]">
              <Gem className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-[11px] xs:text-xs sm:text-[12.5px] font-semibold text-[#201914] uppercase tracking-[0.1em] leading-tight">
                PREMIUM CRAFTSMANSHIP
              </h4>
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6C5849] font-light mt-0.5">
                Thoughtfully Designed
              </p>
            </div>
          </div>

          {/* Item 2: Complimentary Shipping (Commercially Corrected to Orders ₹2,999+) */}
          <div className="flex items-center gap-3 lg:px-6 lg:border-r lg:border-[#E8DED1]">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center text-[#4A101C] shrink-0 border border-[#E2D4C3]">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-[11px] xs:text-xs sm:text-[12.5px] font-semibold text-[#201914] uppercase tracking-[0.1em] leading-tight">
                COMPLIMENTARY SHIPPING
              </h4>
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6C5849] font-light mt-0.5">
                On Orders ₹{STORE_CONFIG.freeShippingThreshold.toLocaleString('en-IN')}+
              </p>
            </div>
          </div>

          {/* Item 3: Luxury Packaging */}
          <div className="flex items-center gap-3 lg:px-6 lg:border-r lg:border-[#E8DED1]">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center text-[#4A101C] shrink-0 border border-[#E2D4C3]">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-[11px] xs:text-xs sm:text-[12.5px] font-semibold text-[#201914] uppercase tracking-[0.1em] leading-tight">
                LUXURY PACKAGING
              </h4>
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6C5849] font-light mt-0.5">
                For Every Occasion
              </p>
            </div>
          </div>

          {/* Item 4: A Brand You Can Trust */}
          <div className="flex items-center gap-3 lg:pl-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F4EDE4] flex items-center justify-center text-[#4A101C] shrink-0 border border-[#E2D4C3]">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </div>
            <div>
              <h4 className="text-[11px] xs:text-xs sm:text-[12.5px] font-semibold text-[#201914] uppercase tracking-[0.1em] leading-tight">
                A BRAND YOU CAN TRUST
              </h4>
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-[#6C5849] font-light mt-0.5">
                Timeless Quality
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
