import React, { useEffect } from 'react';
import { X, RotateCcw, Filter, Check } from 'lucide-react';
import {
  METAL_OPTIONS,
  PRICE_RANGE_PRESETS,
  EFFECTIVE_MAX_PRICE,
} from '../../hooks/useProductFiltering';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  onSelectCategory: (cat: string) => void;
  isCategoryLocked?: boolean;
  gender: 'all' | 'women' | 'men';
  onSelectGender: (g: 'all' | 'women' | 'men') => void;
  isGenderLocked?: boolean;
  selectedMetals: string[];
  onToggleMetal: (metalId: string) => void;
  priceMin: number;
  priceMax: number;
  onSetPriceRange: (min: number, max: number) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
  bestsellerOnly: boolean;
  onToggleBestseller: (val: boolean) => void;
  onResetAll: () => void;
  filteredCount: number;
  isFiltered: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Heirlooms' },
  { id: 'women', label: "Women's Collection" },
  { id: 'men', label: "Men's Collection" },
  { id: 'necklaces', label: 'Necklaces & Pendants' },
  { id: 'earrings', label: 'Earrings & Hoops' },
  { id: 'rings', label: 'Rings & Bands' },
  { id: 'bracelets', label: 'Bracelets & Cuffs' },
];

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  category,
  onSelectCategory,
  isCategoryLocked = false,
  gender,
  onSelectGender,
  isGenderLocked = false,
  selectedMetals,
  onToggleMetal,
  priceMin,
  priceMax,
  onSetPriceRange,
  inStockOnly,
  onToggleInStock,
  bestsellerOnly,
  onToggleBestseller,
  onResetAll,
  filteredCount,
  isFiltered,
}) => {
  // Prevent body scrolling when drawer is open and restore on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Filter Catalogue"
      className="fixed inset-0 z-50 flex lg:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-[#FAF7F2] text-[#201815] shadow-2xl flex flex-col z-10">
        {/* Drawer Header */}
        <div className="px-4 py-3.5 border-b border-[#E8DED1] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#4A101C]" />
            <h2 className="font-serif-luxury text-base tracking-wide uppercase font-semibold text-[#201815]">
              Filter Catalogue
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {isFiltered && (
              <button
                type="button"
                onClick={onResetAll}
                className="text-[11px] uppercase tracking-wider text-[#4A101C] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#554336] hover:text-[#4A101C] cursor-pointer"
              aria-label="Close filters drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
          {/* 1. Category (only when not locked by dedicated route) */}
          {!isCategoryLocked && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2.5">
                Category & Silhouette
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onSelectCategory(cat.id)}
                      className={`flex items-center justify-between px-3 py-2 text-xs text-left border cursor-pointer ${
                        isSelected
                          ? 'border-[#4A101C] bg-[#4A101C] text-white font-medium'
                          : 'border-[#E8DFD3] bg-white text-[#42362E] hover:bg-[#F2E8DC]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Gender (only when not locked by dedicated women/men route) */}
          {!isGenderLocked && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2.5">
                Audience
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {(['all', 'women', 'men'] as const).map((g) => {
                  const isSelected = gender === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => onSelectGender(g)}
                      className={`py-2 text-center text-xs uppercase tracking-wider font-medium border cursor-pointer ${
                        isSelected
                          ? 'border-[#4A101C] bg-[#4A101C] text-white'
                          : 'border-[#E8DFD3] bg-white text-[#42362E] hover:bg-[#F2E8DC]'
                      }`}
                    >
                      {g === 'all' ? 'All' : g}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Price presets & slider */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2.5">
              Price Range (INR ₹)
            </h3>
            <div className="grid grid-cols-1 gap-1.5 mb-3">
              {PRICE_RANGE_PRESETS.map((preset) => {
                const isActive =
                  (preset.id === 'all' && priceMin === 0 && priceMax >= EFFECTIVE_MAX_PRICE) ||
                  (preset.id !== 'all' && priceMin === preset.min && priceMax === preset.max);

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSetPriceRange(preset.min, preset.max)}
                    className={`px-3 py-2 text-xs text-left border cursor-pointer ${
                      isActive
                        ? 'border-[#4A101C] bg-[#F7F2EB] text-[#4A101C] font-semibold'
                        : 'border-[#E8DFD3] bg-white text-[#554336]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            <div className="bg-white p-3 border border-[#E8DFD3]">
              <div className="flex justify-between items-center text-xs text-[#7A6553] mb-1.5">
                <span>Maximum Price:</span>
                <span className="font-semibold text-[#201815] tabular-nums">
                  ₹{priceMax >= EFFECTIVE_MAX_PRICE ? '15,000+' : priceMax.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max={EFFECTIVE_MAX_PRICE}
                step="500"
                value={priceMax}
                onChange={(e) => onSetPriceRange(priceMin, Number(e.target.value))}
                className="w-full accent-[#4A101C]"
                aria-label="Filter by maximum price"
              />
            </div>
          </div>

          {/* 4. Metals & Finishes */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2.5">
              Metal Plating & Finish
            </h3>
            <div className="space-y-1 bg-white p-3 border border-[#E8DFD3]">
              {METAL_OPTIONS.map((metal) => {
                const isChecked = selectedMetals.includes(metal.id);
                return (
                  <label
                    key={metal.id}
                    className="flex items-center gap-2.5 py-1.5 text-xs text-[#42362E] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleMetal(metal.id)}
                      className="w-3.5 h-3.5 accent-[#4A101C]"
                    />
                    <span className={isChecked ? 'font-semibold text-[#201815]' : ''}>
                      {metal.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 5. In-Stock & Bestsellers */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2.5">
              Preferences
            </h3>
            <div className="space-y-2 bg-white p-3 border border-[#E8DFD3]">
              <label className="flex items-center justify-between text-xs text-[#42362E] cursor-pointer">
                <span>Ready for Dispatch (In Stock)</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => onToggleInStock(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#4A101C]"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-[#42362E] cursor-pointer">
                <span>Curated Bestsellers</span>
                <input
                  type="checkbox"
                  checked={bestsellerOnly}
                  onChange={(e) => onToggleBestseller(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#4A101C]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Drawer Sticky Bottom Footer */}
        <div className="p-4 bg-white border-t border-[#E8DED1]">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View {filteredCount} Designs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
