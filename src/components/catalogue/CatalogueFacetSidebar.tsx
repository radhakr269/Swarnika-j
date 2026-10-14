import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw, Filter, Check } from 'lucide-react';
import { METAL_OPTIONS, PRICE_RANGE_PRESETS } from '../../hooks/useProductFiltering';
import { ALL_PRODUCTS } from '../../data/jewelryData';

interface CatalogueFacetSidebarProps {
  category: string;
  onSelectCategory: (cat: string) => void;
  gender: 'all' | 'women' | 'men';
  onSelectGender: (g: 'all' | 'women' | 'men') => void;
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
  isFiltered: boolean;
  className?: string;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Heirlooms' },
  { id: 'women', label: "Women's Collection" },
  { id: 'men', label: "Men's Modern Strength" },
  { id: 'necklaces', label: 'Necklaces & Pendants' },
  { id: 'earrings', label: 'Earrings & Hoops' },
  { id: 'rings', label: 'Rings & Bands' },
  { id: 'bracelets', label: 'Bracelets & Cuffs' },
];

export const CatalogueFacetSidebar: React.FC<CatalogueFacetSidebarProps> = ({
  category,
  onSelectCategory,
  gender,
  onSelectGender,
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
  isFiltered,
  className = '',
}) => {
  // Collapsible section states for rich editorial feel
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    price: true,
    metals: true,
    gender: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Calculate live counts per category for the sidebar
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return ALL_PRODUCTS.length;
    if (catId === 'women') return ALL_PRODUCTS.filter((p) => p.gender === 'women' || p.gender === 'unisex').length;
    if (catId === 'men') return ALL_PRODUCTS.filter((p) => p.gender === 'men' || p.gender === 'unisex').length;
    return ALL_PRODUCTS.filter((p) => p.category === catId).length;
  };

  return (
    <aside
      aria-label="Catalogue Facet Filters"
      className={`bg-white border border-[#E8DED1] p-5 shadow-2xs divide-y divide-[#F0E6D8] ${className}`}
    >
      {/* Sidebar Header */}
      <div className="pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#201815]">
          <Filter className="w-4 h-4 text-[#4A101C]" />
          <h2 className="font-serif-luxury text-lg tracking-wide uppercase font-semibold">
            Filter Heirlooms
          </h2>
        </div>
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
      </div>

      {/* 1. Category Facet */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2 cursor-pointer"
        >
          <span>Category & Silhouette</span>
          {openSections.category ? <ChevronUp className="w-4 h-4 text-[#8C7662]" /> : <ChevronDown className="w-4 h-4 text-[#8C7662]" />}
        </button>

        {openSections.category && (
          <div className="space-y-1 pt-1">
            {CATEGORY_TABS.map((cat) => {
              const isSelected = category === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs transition-colors rounded-none cursor-pointer text-left ${
                    isSelected
                      ? 'bg-[#4A101C] text-white font-medium'
                      : 'text-[#42362E] hover:bg-[#FAF7F2] hover:text-[#4A101C]'
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className={`text-[10px] tabular-nums shrink-0 ml-2 ${isSelected ? 'text-white/80' : 'text-[#8C7662]'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Price Range Facet */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2 cursor-pointer"
        >
          <span>Price (INR ₹)</span>
          {openSections.price ? <ChevronUp className="w-4 h-4 text-[#8C7662]" /> : <ChevronDown className="w-4 h-4 text-[#8C7662]" />}
        </button>

        {openSections.price && (
          <div className="space-y-3 pt-1">
            {/* Quick Price Preset Buttons */}
            <div className="grid grid-cols-1 gap-1.5">
              {PRICE_RANGE_PRESETS.map((preset) => {
                const isActive =
                  (preset.id === 'all' && priceMin === 0 && priceMax >= 20000) ||
                  (preset.id !== 'all' && priceMin === preset.min && priceMax === preset.max);

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onSetPriceRange(preset.min, preset.max)}
                    className={`px-2.5 py-1.5 text-xs text-left border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#4A101C] bg-[#F7F2EB] text-[#4A101C] font-semibold'
                        : 'border-[#E8DFD3] text-[#554336] hover:border-[#D5C6B5] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Slider / Range indicator */}
            <div className="pt-2 border-t border-[#F0E6D8]">
              <div className="flex justify-between items-center text-[11px] text-[#7A6553] mb-1.5">
                <span>Max Price:</span>
                <span className="font-semibold text-[#201815] tabular-nums">
                  ₹{priceMax >= 20000 ? '20,000+' : priceMax.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={priceMax}
                onChange={(e) => onSetPriceRange(priceMin, Number(e.target.value))}
                className="w-full accent-[#4A101C] cursor-pointer"
                aria-label="Filter by maximum price"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Metal & Finish Facet */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('metals')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2 cursor-pointer"
        >
          <span>Precious Metal & Craft</span>
          {openSections.metals ? <ChevronUp className="w-4 h-4 text-[#8C7662]" /> : <ChevronDown className="w-4 h-4 text-[#8C7662]" />}
        </button>

        {openSections.metals && (
          <div className="space-y-1.5 pt-1">
            {METAL_OPTIONS.map((metal) => {
              const isChecked = selectedMetals.includes(metal.id);
              return (
                <label
                  key={metal.id}
                  className="flex items-center gap-2.5 px-2 py-1 text-xs text-[#42362E] hover:bg-[#FAF7F2] cursor-pointer select-none group"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleMetal(metal.id)}
                    className="w-3.5 h-3.5 accent-[#4A101C] rounded-none cursor-pointer"
                  />
                  <span className={`group-hover:text-[#4A101C] ${isChecked ? 'font-medium text-[#201815]' : ''}`}>
                    {metal.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Gender / Target Audience */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('gender')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2 cursor-pointer"
        >
          <span>Audience & Wardrobe</span>
          {openSections.gender ? <ChevronUp className="w-4 h-4 text-[#8C7662]" /> : <ChevronDown className="w-4 h-4 text-[#8C7662]" />}
        </button>

        {openSections.gender && (
          <div className="grid grid-cols-3 gap-1 pt-1">
            {(['all', 'women', 'men'] as const).map((g) => {
              const isSelected = gender === g;
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => onSelectGender(g)}
                  className={`py-1.5 text-center text-xs uppercase tracking-wider font-medium border cursor-pointer ${
                    isSelected
                      ? 'border-[#4A101C] bg-[#4A101C] text-white'
                      : 'border-[#E8DFD3] text-[#554336] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {g === 'all' ? 'All' : g}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Availability & Curation Badges */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#201815] mb-2 cursor-pointer"
        >
          <span>Availability & Edition</span>
          {openSections.availability ? <ChevronUp className="w-4 h-4 text-[#8C7662]" /> : <ChevronDown className="w-4 h-4 text-[#8C7662]" />}
        </button>

        {openSections.availability && (
          <div className="space-y-2 pt-1">
            <label className="flex items-center justify-between px-2 py-1 text-xs text-[#42362E] hover:bg-[#FAF7F2] cursor-pointer">
              <span>Ready for Immediate Dispatch</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onToggleInStock(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#4A101C] rounded-none cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between px-2 py-1 text-xs text-[#42362E] hover:bg-[#FAF7F2] cursor-pointer">
              <span>Bestselling Pieces Only</span>
              <input
                type="checkbox"
                checked={bestsellerOnly}
                onChange={(e) => onToggleBestseller(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#4A101C] rounded-none cursor-pointer"
              />
            </label>
          </div>
        )}
      </div>
    </aside>
  );
};
