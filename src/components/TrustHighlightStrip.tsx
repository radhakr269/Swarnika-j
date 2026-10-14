import React from 'react';
import { Sparkles, Clock, Leaf, Users } from 'lucide-react';

export const TrustHighlightStrip: React.FC = () => {
  const highlights = [
    {
      icon: Sparkles,
      title: 'Ethically Sourced',
      desc: 'Conflict-free diamonds',
    },
    {
      icon: Clock,
      title: 'Heirloom Quality',
      desc: 'Lasting for generations',
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      desc: 'Eco-friendly materials',
    },
    {
      icon: Users,
      title: 'Trusted by 50k+',
      desc: 'Happy customers',
    },
  ];

  return (
    <section className="py-5 sm:py-7 md:py-8 bg-[#FAF6F0] border-y border-[#EBE1D3]">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 md:gap-6 text-center">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center space-y-1">
                <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border border-[#D5C2AD] bg-[#F2E8DC] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C6D47] stroke-[1.6]" />
                </div>
                <h4 className="font-medium text-[9px] sm:text-xs md:text-sm text-[#2A231D] leading-tight">
                  {item.title}
                </h4>
                <p className="text-[7.5px] sm:text-[10px] md:text-[11px] text-[#735F4C] font-light leading-tight">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
