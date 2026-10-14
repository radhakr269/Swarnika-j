import React, { useEffect } from 'react';
import { X, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const StoryModal: React.FC = () => {
  const { isStoryOpen, setIsStoryOpen } = useShop();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isStoryOpen) {
        setIsStoryOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStoryOpen, setIsStoryOpen]);

  if (!isStoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Our Story & Heritage">
      <div
        onClick={() => setIsStoryOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-none max-w-3xl w-full border border-[#E4D5C4] shadow-2xl overflow-hidden z-10 p-6 sm:p-10 space-y-6">
        <button
          onClick={() => setIsStoryOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#201815] rounded-full hover:bg-[#F2E8DC] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.28em] text-[#6E5746] font-semibold block">
            ARTISANAL ATELIER
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#201815] font-normal tracking-tight">
            The Swarnika Heritage
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6451] font-light">
            Dedicated craft in hand-setting stones and shaping timeless silhouettes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-2">
          <div className="rounded-none overflow-hidden aspect-[4/3] bg-[#EFE5D9] shadow-md border border-[#E5D7C7]">
            <SafeImage
              src="/assist/image/banners/story_craftsmanship.jpg"
              alt="Artisan jeweler at workbench"
              fallbackCategory="Heritage Workshop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#5C4938] leading-relaxed">
            <p>
              Born from a revered goldsmith tradition, Swarnika is founded on the conviction that jewellery should never be transient. Every stone is meticulously selected and set to accompany life's most meaningful moments.
            </p>
            <p>
              We unite modern elegance with classic royal designs, crafting jewellery with rich finishes and thoughtful velvet presentation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#EDE1D3] text-center text-xs">
          <div className="space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#4A1622] mx-auto" />
            <div className="font-semibold text-[#201815]">Artisanal Quality</div>
            <p className="text-[10px] text-[#7A6451]">Meticulous Inspection</p>
          </div>
          <div className="space-y-1">
            <Sparkles className="w-5 h-5 text-[#4A1622] mx-auto" />
            <div className="font-semibold text-[#201815]">Refined Finishes</div>
            <p className="text-[10px] text-[#7A6451]">Master Craftsmanship</p>
          </div>
          <div className="space-y-1">
            <Award className="w-5 h-5 text-[#4A1622] mx-auto" />
            <div className="font-semibold text-[#201815]">Signature Polish</div>
            <p className="text-[10px] text-[#7A6451]">Protective Layering</p>
          </div>
        </div>
      </div>
    </div>
  );
};
