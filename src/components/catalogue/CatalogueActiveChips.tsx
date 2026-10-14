import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { METAL_OPTIONS, PRICE_RANGE_PRESETS } from '../../hooks/useProductFiltering';

interface CatalogueActiveChipsProps {
  category: string;
  onClearCategory: () => void;
  gender: 'all' | 'women' | 'men';
  onClearGender: () => void;
  selectedMetals: string[];
  onRemoveMetal: (metalId: string) => void;
  priceMin: number;
  priceMax: number;
  onClearPrice: () => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  bestsellerOnly: boolean;
  onToggleBestseller: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  onResetAll: () => void;
  filteredCount: number;
  totalCount: number;
  className?: string;
}

export const CatalogueActiveChips: React.FC<CatalogueActiveChipsProps> = ({
  category,
  onClearCategory,
  gender,
  onClearGender,
  selectedMetals,
  onRemoveMetal,
  priceMin,
  priceMax,
  onClearPrice,
  inStockOnly,
  onToggleInStock,
  bestsellerOnly,
  onToggleBestseller,
  searchQuery,
  onClearSearch,
  onResetAll,
  filteredCount,
  totalCount,
  className = '',
}) => {
  const isPriceFiltered = priceMin > 0 || priceMax < 20000;
  const hasActiveFilters =
    category !== 'all' ||
    gender !== 'all' ||
    selectedMetals.length > 0 ||
    isPriceFiltered ||
    inStockOnly ||
    bestsellerOnly ||
    searchQuery.trim().length > 0;

  if (!hasActiveFilters) {
    return null;
  }

  const formatCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'women': return "Women's Collection";
      case 'men': return "Men's Collection";
      case 'necklaces': return 'Necklaces & Pendants';
      case 'earrings': return 'Earrings & Hoops';
      case 'rings': return 'Rings & Bands';
      case 'bracelets': return 'Bracelets & Cuffs';
      default: return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 py-2.5 px-3 sm:px-4 bg-[#F5EFE6]/70 border border-[#E8DED1] text-xs ${className}`}>
      <span className="text-[11px] uppercase tracking-wider text-[#7A6553] font-medium mr-1 shrink-0">
        Active Filters:
      </span>

      {/* Category Chip */}
      {category !== 'all' && (
        <button
          type="button"
          onClick={onClearCategory}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
        >
          <span>Category: {formatCategoryLabel(category)}</span>
          <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
        </button>
      )}

      {/* Gender Chip */}
      {gender !== 'all' && (
        <button
          type="button"
          onClick={onClearGender}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
        >
          <span>Audience: {gender === 'women' ? 'Women' : 'Men'}</span>
          <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
        </button>
      )}

      {/* Metal Chips */}
      {selectedMetals.map((mId) => {
        const option = METAL_OPTIONS.find((o) => o.id === mId);
        return (
          <button
            key={mId}
            type="button"
            onClick={() => onRemoveMetal(mId)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
          >
            <span>Finish: {option?.label || mId}</span>
            <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
          </button>
        );
      })}

      {/* Price Chip */}
      {isPriceFiltered && (
        <button
          type="button"
          onClick={onClearPrice}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
        >
          <span>
            Price: ₹{priceMin.toLocaleString('en-IN')} – ₹{priceMax >= 20000 ? '20,000+' : priceMax.toLocaleString('en-IN')}
          </span>
          <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
        </button>
      )}

      {/* In Stock Chip */}
      {inStockOnly && (
        <button
          type="button"
          onClick={onToggleInStock}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
        >
          <span>In Stock Only</span>
          <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
        </button>
      )}

      {/* Bestseller Chip */}
      {bestsellerOnly && (
        <button
          type="button"
          onClick={onToggleBestseller}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
        >
          <span>Bestsellers</span>
          <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
        </button>
      )}

      {/* Search Query Chip */}
      {searchQuery.trim().length > 0 && (
        <button
          type="button"
          onClick={onClearSearch}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5C6B5] text-[#201815] hover:border-[#4A101C] hover:text-[#4A101C] transition-colors cursor-pointer group text-[11px]"
        >
          <span>Search: &ldquo;{searchQuery}&rdquo;</span>
          <X className="w-3 h-3 text-[#7A6553] group-hover:text-[#4A101C]" />
        </button>
      )}

      {/* Clear All CTA */}
      <button
        type="button"
        onClick={onResetAll}
        className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#4A101C] hover:underline font-semibold ml-auto cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Clear All</span>
      </button>
    </div>
  );
};
