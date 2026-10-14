import React from 'react';
import { Gem, Truck, Gift, ShieldCheck } from 'lucide-react';

export const SwarnikaValueProps: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF7F2] border-b border-[#EAE1D4] py-4 sm:py-6 md:py-7">
      {/* CSS Selector 6: section:nth-of-type(2) > div:nth-of-type(1) */}
      <div className="w-full px-3.5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          
          {/* Item 1 (CSS Selector 4): Premium Craftsmanship */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="text-[#3A2D25] shrink-0">
              <Gem className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-[13px] font-semibold text-[#201815] uppercase tracking-wider leading-tight">
                PREMIUM CRAFTSMANSHIP
              </h4>
              {/* Subtitle (CSS Selector 3): Thoughtfully Designed */}
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-[#705E52] font-light mt-0.5">
                Thoughtfully Designed
              </p>
            </div>
          </div>

          {/* Item 2: Complimentary Shipping */}
          <div className="flex items-center gap-2.5 sm:gap-3 lg:border-l lg:border-[#E8DECE] lg:pl-6">
            <div className="text-[#3A2D25] shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-[13px] font-semibold text-[#201815] uppercase tracking-wider leading-tight">
                COMPLIMENTARY SHIPPING
              </h4>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-[#705E52] font-light mt-0.5">
                On All Orders
              </p>
            </div>
          </div>

          {/* Item 3 (CSS Selector 5): Luxury Packaging */}
          <div className="flex items-center gap-2.5 sm:gap-3 lg:border-l lg:border-[#E8DECE] lg:pl-6">
            <div className="text-[#3A2D25] shrink-0">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-[13px] font-semibold text-[#201815] uppercase tracking-wider leading-tight">
                LUXURY PACKAGING
              </h4>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-[#705E52] font-light mt-0.5">
                For Every Occasion
              </p>
            </div>
          </div>

          {/* Item 4: A Brand You Can Trust */}
          <div className="flex items-center gap-2.5 sm:gap-3 lg:border-l lg:border-[#E8DECE] lg:pl-6">
            <div className="text-[#3A2D25] shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 stroke-[1.4]" />
            </div>
            <div>
              <h4 className="text-[9.5px] xs:text-[10.5px] sm:text-xs md:text-[13px] font-semibold text-[#201815] uppercase tracking-wider leading-tight">
                A BRAND YOU CAN TRUST
              </h4>
              <p className="text-[9px] xs:text-[10px] sm:text-[11px] md:text-xs text-[#705E52] font-light mt-0.5">
                Timeless Quality
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
