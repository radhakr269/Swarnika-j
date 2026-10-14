import { useState, useMemo, useEffect } from 'react';
import { Product } from '../data/jewelryData';

/**
 * Supported public sorting options:
 * - 'featured': preserves exact original catalogue order
 * - 'low-high': price ascending
 * - 'high-low': price descending
 * - 'rating': customer rating descending
 * - 'name-asc': alphabetical A to Z
 */
export type SortOption = 'featured' | 'low-high' | 'high-low' | 'rating' | 'name-asc';

export interface PriceRangePreset {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGE_PRESETS: PriceRangePreset[] = [
  { id: 'all', label: 'All Prices', min: 0, max: 50000 },
  { id: 'under-3k', label: 'Under ₹3,000', min: 0, max: 3000 },
  { id: '3k-5k', label: '₹3,000 – ₹5,000', min: 3000, max: 5000 },
  { id: '5k-8k', label: '₹5,000 – ₹8,000', min: 5000, max: 8000 },
  { id: 'above-8k', label: 'Above ₹8,000', min: 8000, max: 50000 },
];

export const METAL_OPTIONS = [
  { id: 'gold', label: '18K Gold / Antique Gold', match: ['18K Gold Plated', 'Antique Gold Polish', '18K Yellow Gold', 'Yellow Gold', '18K Yellow Gold Plated', 'Antique Matte Gold Plated', '18K Brushed Gold', '18K Gold Inlay', '22K Gold Foil Polish'] },
  { id: 'rose-gold', label: 'Rose Gold', match: ['Rose Gold Plated', 'Rose Gold'] },
  { id: 'white-gold', label: 'White Gold / Platinum', match: ['Platinum Dip', '18K White Gold', '18K White Gold Plated', 'White Gold Dip', 'White Gold Inner Comfort Core'] },
  { id: 'heritage', label: 'Polki / Kundan / Pearl', match: ['Heritage Kundan', 'Natural Pearls', 'Ruby Accents', 'Black Spinel Beads'] },
  { id: 'contemporary', label: 'Titanium / Steel / Modern', match: ['Stainless Steel Core', 'Surgical Grade Steel', 'Titanium Grade 5', 'Gunmetal Accents', 'Onyx Black Enamel'] },
];

export interface UseProductFilteringOptions {
  initialCategory?: string;
  externalCategory?: string;
  onCategoryChange?: (category: string) => void;
  initialSort?: SortOption;
  initialGender?: 'all' | 'women' | 'men';
  initialPriceMin?: number;
  initialPriceMax?: number;
  initialInStockOnly?: boolean;
  initialBestsellerOnly?: boolean;
}

/**
 * Single shared source of product filtering and sorting logic for SWARNIKA.
 * Supports Category, Gender, Metals, Price Range, In-Stock, Best Sellers, and Sort.
 */
export function useProductFiltering(
  allProducts: Product[],
  options?: UseProductFilteringOptions
) {
  const [internalCategory, setInternalCategory] = useState<string>(
    options?.externalCategory ?? options?.initialCategory ?? 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>(options?.initialSort ?? 'featured');
  const [selectedGender, setSelectedGender] = useState<'all' | 'women' | 'men'>(
    options?.initialGender ?? 'all'
  );
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState<number>(options?.initialPriceMin ?? 0);
  const [priceMax, setPriceMax] = useState<number>(options?.initialPriceMax ?? 20000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(options?.initialInStockOnly ?? false);
  const [bestsellerOnly, setBestsellerOnly] = useState<boolean>(options?.initialBestsellerOnly ?? false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronize external category prop changes (from ShopContext or URL)
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

  const toggleMetal = (metalId: string) => {
    setSelectedMetals((prev) =>
      prev.includes(metalId) ? prev.filter((m) => m !== metalId) : [...prev, metalId]
    );
  };

  const setPriceRange = (min: number, max: number) => {
    setPriceMin(min);
    setPriceMax(max);
  };

  const filteredProducts = useMemo(() => {
    // 1. Filter items without mutating original allProducts array
    const matched = allProducts.filter((product) => {
      // Category filter
      if (activeCategory && activeCategory !== 'all') {
        if (activeCategory === 'women') {
          if (product.gender !== 'women' && product.gender !== 'unisex') return false;
        } else if (activeCategory === 'men') {
          if (product.gender !== 'men' && product.gender !== 'unisex') return false;
        } else if (product.category !== activeCategory) {
          return false;
        }
      }

      // Gender filter (when not governed by category)
      if (selectedGender !== 'all') {
        if (product.gender !== selectedGender && product.gender !== 'unisex') {
          return false;
        }
      }

      // Price range filter
      if (product.price < priceMin || product.price > priceMax) {
        return false;
      }

      // In-stock filter
      if (inStockOnly && product.inStock === false) {
        return false;
      }

      // Bestseller filter
      if (bestsellerOnly && !product.isBestSeller && product.tag !== 'Bestseller') {
        return false;
      }

      // Metals filter
      if (selectedMetals.length > 0) {
        const matchesAnyMetal = selectedMetals.some((mId) => {
          const group = METAL_OPTIONS.find((g) => g.id === mId);
          if (!group) return false;
          return product.metals?.some((metal) =>
            group.match.some((target) => metal.toLowerCase().includes(target.toLowerCase()))
          );
        });
        if (!matchesAnyMetal) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });

    // 2. Sort items
    if (sortBy === 'low-high') {
      return [...matched].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'high-low') {
      return [...matched].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...matched].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    if (sortBy === 'name-asc') {
      return [...matched].sort((a, b) => a.name.localeCompare(b.name));
    }

    // 'featured': strictly preserve the exact catalogue order of allProducts
    return matched;
  }, [
    allProducts,
    activeCategory,
    selectedGender,
    priceMin,
    priceMax,
    inStockOnly,
    bestsellerOnly,
    selectedMetals,
    searchQuery,
    sortBy,
  ]);

  const resetFilters = () => {
    setCategory('all');
    setSelectedGender('all');
    setSelectedMetals([]);
    setPriceMin(0);
    setPriceMax(20000);
    setInStockOnly(false);
    setBestsellerOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (selectedGender !== 'all') count++;
    if (selectedMetals.length > 0) count += selectedMetals.length;
    if (priceMin > 0 || priceMax < 20000) count++;
    if (inStockOnly) count++;
    if (bestsellerOnly) count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [activeCategory, selectedGender, selectedMetals, priceMin, priceMax, inStockOnly, bestsellerOnly, searchQuery]);

  const isFiltered = activeFilterCount > 0 || sortBy !== 'featured';

  return {
    category: activeCategory,
    setCategory,
    sortBy,
    setSortBy,
    selectedGender,
    setSelectedGender,
    selectedMetals,
    setSelectedMetals,
    toggleMetal,
    priceMin,
    priceMax,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
    bestsellerOnly,
    setBestsellerOnly,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length,
    activeFilterCount,
    isFiltered,
    resetFilters,
  };
}
