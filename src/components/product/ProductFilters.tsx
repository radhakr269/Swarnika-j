import React from 'react';
import { SortOption } from '../../hooks/useProductFiltering';

export interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

export interface ProductFiltersProps {
  tabs?: FilterTab[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  activeSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  itemCount: number;
  className?: string;
}

const DEFAULT_TABS: FilterTab[] = [
  { id: 'all', label: 'All Pieces' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'necklaces', label: 'Necklaces' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'rings', label: 'Rings' },
  { id: 'bracelets', label: 'Bracelets' },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  tabs = DEFAULT_TABS,
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
  itemCount,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Category Pills & Sort Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Horizontal scrollable pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3 py-1.5 text-[10.5px] sm:text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all rounded-none cursor-pointer ${
                  isActive
                    ? 'bg-[#4A1622] text-white shadow-xs'
                    : 'bg-[#F2EAE0] text-[#554336] hover:bg-[#E8DCCF]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`ml-1 text-[9px] ${isActive ? 'text-white/80' : 'text-[#8C7662]'}`}>
                    ({tab.count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sort selector & Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-[11px] text-[#8C7662] hidden lg:inline-block">
            Showing <strong className="text-[#201815]">{itemCount}</strong> designs
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="product-sort" className="text-[10px] uppercase tracking-wider text-[#7A6451] font-medium hidden sm:inline">
              Sort:
            </label>
            <select
              id="product-sort"
              value={activeSort}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="text-[11px] sm:text-xs bg-[#FAF7F2] border border-[#D5C6B5] text-[#221B17] px-2.5 py-1 rounded-none focus:outline-none focus:border-[#4A1622] cursor-pointer"
            >
              <option value="featured">Featured Curation</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
