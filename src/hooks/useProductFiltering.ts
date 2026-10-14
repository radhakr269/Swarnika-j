import { useState, useMemo, useEffect } from 'react';
import { Product } from '../data/jewelryData';

/**
 * Supported, verified public sorting options:
 * - 'featured': preserves exact original catalogue order
 * - 'low-high': price ascending
 * - 'high-low': price descending
 */
export type SortOption = 'featured' | 'low-high' | 'high-low';

export interface UseProductFilteringOptions {
  initialCategory?: string;
  externalCategory?: string;
  onCategoryChange?: (category: string) => void;
  initialSort?: SortOption;
}

/**
 * Single shared source of product filtering and sorting logic.
 * Used directly by catalogue grids, SwarnikaBestsellers, and dedicated category pages.
 */
export function useProductFiltering(
  allProducts: Product[],
  options?: UseProductFilteringOptions
) {
  const [internalCategory, setInternalCategory] = useState<string>(
    options?.externalCategory ?? options?.initialCategory ?? 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>(options?.initialSort ?? 'featured');

  // Synchronize when external category prop changes (from ShopContext or URL) without loops
  useEffect(() => {
    if (options?.externalCategory !== undefined) {
      setInternalCategory(options.externalCategory);
    }
  }, [options?.externalCategory]);

  const activeCategory = options?.externalCategory !== undefined ? options.externalCategory : internalCategory;

  const setCategory = (cat: string) => {
    setInternalCategory(cat);
    options?.onCategoryChange?.(cat);
  };

  const filteredProducts = useMemo(() => {
    // 1. Filter items without mutating original allProducts array
    const matched = allProducts.filter((product) => {
      if (!activeCategory || activeCategory === 'all') return true;
      if (activeCategory === 'women') {
        return product.gender === 'women' || product.gender === 'unisex';
      }
      if (activeCategory === 'men') {
        return product.gender === 'men' || product.gender === 'unisex';
      }
      return product.category === activeCategory;
    });

    // 2. Sort items
    if (sortBy === 'low-high') {
      return [...matched].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'high-low') {
      return [...matched].sort((a, b) => b.price - a.price);
    }

    // 'featured': strictly preserve the exact catalogue order of allProducts
    return matched;
  }, [allProducts, activeCategory, sortBy]);

  const resetFilters = () => {
    setCategory('all');
    setSortBy('featured');
  };

  const isFiltered = activeCategory !== 'all' || sortBy !== 'featured';

  return {
    category: activeCategory,
    setCategory,
    sortBy,
    setSortBy,
    filteredProducts,
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length,
    isFiltered,
    resetFilters,
  };
}
