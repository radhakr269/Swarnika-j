import React from 'react';
import { ChevronDown } from 'lucide-react';

export const SwarnikaTopBar: React.FC = () => {
  return (
    <div className="bg-[#4A1521] text-[#F7EDE8] text-[10px] sm:text-[11px] md:text-xs py-2 px-4 sm:px-8 tracking-wide">
      <div className="w-full flex items-center justify-between">
        {/* Empty left spacer for optical centering */}
        <div className="hidden md:block w-32" />

        {/* Center message (Exact match to Swarnika reference image) */}
        <div className="flex-1 text-center font-normal">
          <span>Complimentary Shipping on All Orders</span>
          <span className="mx-2 sm:mx-3 text-[#9E6D77]">|</span>
          <span>A More Radiant You, Always</span>
        </div>

        {/* Right currency selector (India INR) */}
        <div className="flex items-center justify-end w-auto sm:w-32">
          <button className="flex items-center gap-1 text-[10px] sm:text-[11px] hover:text-white transition-colors">
            <span>India (INR ₹)</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
