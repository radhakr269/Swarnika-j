import React from 'react';
import { ChevronDown } from 'lucide-react';

export const TopAnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#EDE4D8] border-b border-[#E1D6C7] text-[#7A6451] text-[11px] md:text-xs py-2 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left / Center Promo Text */}
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span>Free Shipping on Orders Over $150</span>
          <span className="text-[#BFAFA0]">•</span>
          <span className="text-[#8C6D47] font-semibold">Up to 30% Off New Arrivals</span>
        </div>

        {/* Right Info */}
        <div className="flex items-center gap-3 text-[#7A6451]">
          <a
            href="tel:8005550199"
            className="hover:text-[#2D2621] transition-colors hidden sm:inline"
          >
            Call Us: (800) 555-0199
          </a>
          <span className="text-[#C8B8A7] hidden sm:inline">|</span>
          <button className="flex items-center gap-1 hover:text-[#2D2621] transition-colors">
            <span>USD $</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
