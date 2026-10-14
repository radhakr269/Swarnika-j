import React from 'react';
import { Gem, Truck, RotateCcw, ShieldCheck } from 'lucide-react';

export const ValuePropositionBar: React.FC = () => {
  const items = [
    {
      icon: Gem,
      title: 'Premium Quality',
      subtitle: 'Certified and tested',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On all orders over $150',
    },
    {
      icon: RotateCcw,
      title: '30-Day Return Policy',
      subtitle: 'Guarantee of joy',
    },
    {
      icon: ShieldCheck,
      title: '100% Authentic',
      subtitle: 'Genuine Fine',
    },
  ];

  return (
    <section className="w-full bg-[#EAE0D3] border-b border-[#D8C7B3] py-5 sm:py-6 md:py-7">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-center gap-2.5 sm:gap-3.5 ${
                  idx !== 0 ? 'md:border-l md:border-[#D5C2AD] md:pl-5 lg:pl-8' : ''
                }`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAF6F0]/80 border border-[#CEBAA3] flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C6D47] stroke-[1.6]" />
                </div>
                <div>
                  <h4 className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#2A231D] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-[9.5px] sm:text-[11px] text-[#6E5A47] font-light">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
