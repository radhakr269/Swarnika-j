import { useState, useMemo, useEffect } from 'react';
import { Product, ALL_PRODUCTS } from '../data/jewelryData';

/**
 * Supported, verified public sorting options:
 * - 'featured': strictly preserves exact original incoming catalogue order
 * - 'low-high': price ascending (numeric)
 * - 'high-low': price descending (numeric)
 * - 'name-asc': alphabetical A to Z (stable locale comparison)
 * Note: 'rating' and 'newest' have been removed as unverified public ranking claims.
 */
export type SortOption = 'featured' | 'low-high' | 'high-low' | 'name-asc';

export const VALID_SORT_OPTIONS: SortOption[] = ['featured', 'low-high', 'high-low', 'name-asc'];

// Derived catalogue pricing bounds from real product data
export const CATALOGUE_PRICES = ALL_PRODUCTS.map((p) => p.price);
export const CATALOGUE_MIN_PRICE = Math.min(...CATALOGUE_PRICES); // 2,199
export const CATALOGUE_MAX_PRICE = Math.max(...CATALOGUE_PRICES); // 12,999
export const EFFECTIVE_MAX_PRICE = 15000; // Upper limit for slider to comfortably cover max price (12,999)

export interface PriceRangePreset {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const PRICE_RANGE_PRESETS: PriceRangePreset[] = [
  { id: 'all', label: 'All Prices', min: 0, max: EFFECTIVE_MAX_PRICE },
  { id: 'under-3.5k', label: 'Under ₹3,500', min: 0, max: 3500 },
  { id: '3.5k-5k', label: '₹3,500 – ₹5,000', min: 3500, max: 5000 },
  { id: '5k-8k', label: '₹5,000 – ₹8,000', min: 5000, max: 8000 },
  { id: 'above-8k', label: 'Above ₹8,000', min: 8000, max: EFFECTIVE_MAX_PRICE },
];

export const METAL_OPTIONS = [
  {
    id: 'gold',
    label: '18K Gold Plated & Antique Finish',
    match: [
      '18K Gold Plated',
      'Antique Gold Polish',
      '18K Yellow Gold',
      'Yellow Gold',
      '18K Yellow Gold Plated',
      'Antique Matte Gold Plated',
      '18K Brushed Gold',
      '18K Gold Inlay',
      '22K Gold Foil Polish',
    ],
  },
  {
    id: 'rose-gold',
    label: 'Rose Gold Plated Finish',
    match: ['Rose Gold Plated', 'Rose Gold'],
  },
  {
    id: 'white-gold',
    label: 'White Gold & Platinum Plating',
    match: [
      'Platinum Dip',
      '18K White Gold',
      '18K White Gold Plated',
      'White Gold Dip',
      'White Gold Inner Comfort Core',
    ],
  },
  {
    id: 'heritage',
    label: 'Polki, Kundan & Pearl Accents',
    match: ['Heritage Kundan', 'Natural Pearls', 'Ruby Accents', 'Black Spinel Beads'],
  },
  {
    id: 'contemporary',
    label: 'Steel & Titanium Core Elements',
    match: [
      'Stainless Steel Core',
      'Surgical Grade Steel',
      'Titanium Grade 5',
      'Gunmetal Accents',
      'Onyx Black Enamel',
    ],
  },
];

export interface UseProductFilteringOptions {
  // Controlled or initial category
  category?: string;
  initialCategory?: string;
  externalCategory?: string;
  onCategoryChange?: (category: string) => void;

  // Controlled or initial sort
  sortBy?: SortOption;
  initialSort?: SortOption;
  onSortChange?: (sort: SortOption) => void;

  // Controlled or initial gender
  gender?: 'all' | 'women' | 'men';
  initialGender?: 'all' | 'women' | 'men';
  onGenderChange?: (gender: 'all' | 'women' | 'men') => void;

  // Controlled or initial price
  priceMin?: number;
  initialPriceMin?: number;
  priceMax?: number;
  initialPriceMax?: number;
  onPriceChange?: (min: number, max: number) => void;

  // Controlled or initial metals
  selectedMetals?: string[];
  initialSelectedMetals?: string[];
  onMetalsChange?: (metals: string[]) => void;

  // Controlled or initial availability
  inStockOnly?: boolean;
  initialInStockOnly?: boolean;
  onInStockChange?: (inStock: boolean) => void;

  // Controlled or initial bestseller curation tag
  bestsellerOnly?: boolean;
  initialBestsellerOnly?: boolean;
  onBestsellerChange?: (bestseller: boolean) => void;

  // Controlled or initial search query
  searchQuery?: string;
  initialSearchQuery?: string;
  onSearchChange?: (query: string) => void;
}

/**
 * Single shared source of product filtering and sorting logic for SWARNIKA.
 * Supports Category, Gender, Metals, Price Range, In-Stock, Best Sellers, and Sort.
 * Can be used controlled (URL parameters) or uncontrolled (local state).
 */
export function useProductFiltering(
  allProducts: Product[],
  options?: UseProductFilteringOptions
) {
  // Local state fallbacks if not controlled
  const [internalCategory, setInternalCategory] = useState<string>(
    options?.category ?? options?.externalCategory ?? options?.initialCategory ?? 'all'
  );
  const [internalSortBy, setInternalSortBy] = useState<SortOption>(
    options?.sortBy ?? options?.initialSort ?? 'featured'
  );
  const [internalGender, setInternalGender] = useState<'all' | 'women' | 'men'>(
    options?.gender ?? options?.initialGender ?? 'all'
  );
  const [internalMetals, setInternalMetals] = useState<string[]>(
    options?.selectedMetals ?? options?.initialSelectedMetals ?? []
  );
  const [internalPriceMin, setInternalPriceMin] = useState<number>(
    options?.priceMin ?? options?.initialPriceMin ?? 0
  );
  const [internalPriceMax, setInternalPriceMax] = useState<number>(
    options?.priceMax ?? options?.initialPriceMax ?? EFFECTIVE_MAX_PRICE
  );
  const [internalInStockOnly, setInternalInStockOnly] = useState<boolean>(
    options?.inStockOnly ?? options?.initialInStockOnly ?? false
  );
  const [internalBestsellerOnly, setInternalBestsellerOnly] = useState<boolean>(
    options?.bestsellerOnly ?? options?.initialBestsellerOnly ?? false
  );
  const [internalSearchQuery, setInternalSearchQuery] = useState<string>(
    options?.searchQuery ?? options?.initialSearchQuery ?? ''
  );

  // Synchronize when externalCategory changes
  useEffect(() => {
    if (options?.externalCategory !== undefined) {
      setInternalCategory(options.externalCategory);
    }
  }, [options?.externalCategory]);

  // Resolve active values (controlled prop takes priority, otherwise internal state)
  const activeCategory =
    options?.category !== undefined
      ? options.category
      : options?.externalCategory !== undefined
      ? options.externalCategory
      : internalCategory;

  const activeSort = options?.sortBy !== undefined ? options.sortBy : internalSortBy;
  const activeGender = options?.gender !== undefined ? options.gender : internalGender;
  const activeMetals = options?.selectedMetals !== undefined ? options.selectedMetals : internalMetals;
  const activePriceMin = options?.priceMin !== undefined ? options.priceMin : internalPriceMin;
  const activePriceMax = options?.priceMax !== undefined ? options.priceMax : internalPriceMax;
  const activeInStockOnly = options?.inStockOnly !== undefined ? options.inStockOnly : internalInStockOnly;
  const activeBestsellerOnly = options?.bestsellerOnly !== undefined ? options.bestsellerOnly : internalBestsellerOnly;
  const activeSearchQuery = options?.searchQuery !== undefined ? options.searchQuery : internalSearchQuery;

  // Setter functions
  const setCategory = (cat: string) => {
    setInternalCategory(cat);
    options?.onCategoryChange?.(cat);
  };

  const setSortBy = (sort: SortOption) => {
    setInternalSortBy(sort);
    options?.onSortChange?.(sort);
  };

  const setSelectedGender = (g: 'all' | 'women' | 'men') => {
    setInternalGender(g);
    options?.onGenderChange?.(g);
  };

  const setSelectedMetals = (metals: string[]) => {
    setInternalMetals(metals);
    options?.onMetalsChange?.(metals);
  };

  const toggleMetal = (metalId: string) => {
    const next = activeMetals.includes(metalId)
      ? activeMetals.filter((m) => m !== metalId)
      : [...activeMetals, metalId];
    setSelectedMetals(next);
  };

  const setPriceRange = (min: number, max: number) => {
    // Sanitize and validate price inputs
    const validMin = isNaN(min) ? 0 : Math.max(0, min);
    const validMax = isNaN(max) ? EFFECTIVE_MAX_PRICE : Math.max(validMin, max);
    setInternalPriceMin(validMin);
    setInternalPriceMax(validMax);
    options?.onPriceChange?.(validMin, validMax);
  };

  const setInStockOnly = (val: boolean) => {
    setInternalInStockOnly(val);
    options?.onInStockChange?.(val);
  };

  const setBestsellerOnly = (val: boolean) => {
    setInternalBestsellerOnly(val);
    options?.onBestsellerChange?.(val);
  };

  const setSearchQuery = (query: string) => {
    setInternalSearchQuery(query);
    options?.onSearchChange?.(query);
  };

  // Filter and Sort without mutating original allProducts
  const filteredProducts = useMemo(() => {
    const matched = allProducts.filter((product) => {
      // 1. Category filter
      if (activeCategory && activeCategory !== 'all') {
        if (activeCategory === 'women') {
          if (product.gender !== 'women' && product.gender !== 'unisex') return false;
        } else if (activeCategory === 'men') {
          if (product.gender !== 'men' && product.gender !== 'unisex') return false;
        } else if (product.category !== activeCategory) {
          return false;
        }
      }

      // 2. Gender filter
      if (activeGender !== 'all') {
        if (product.gender !== activeGender && product.gender !== 'unisex') {
          return false;
        }
      }

      // 3. Price range filter (inclusive numeric bounds)
      if (product.price < activePriceMin || product.price > activePriceMax) {
        return false;
      }

      // 4. In-stock filter
      if (activeInStockOnly && product.inStock === false) {
        return false;
      }

      // 5. Bestseller filter (catalogue curation label)
      if (activeBestsellerOnly && !product.isBestSeller && product.tag !== 'Bestseller') {
        return false;
      }

      // 6. Metals filter (OR logic within selected metals)
      if (activeMetals.length > 0) {
        const matchesAnyMetal = activeMetals.some((mId) => {
          const group = METAL_OPTIONS.find((g) => g.id === mId);
          if (!group) return false;
          return product.metals?.some((metal) =>
            group.match.some((target) => metal.toLowerCase().includes(target.toLowerCase()))
          );
        });
        if (!matchesAnyMetal) return false;
      }

      // 7. Search query filter
      if (activeSearchQuery.trim()) {
        const query = activeSearchQuery.trim().toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory) return false;
      }

      return true;
    });

    // 8. Sorting
    if (activeSort === 'low-high') {
      return [...matched].sort((a, b) => a.price - b.price);
    }
    if (activeSort === 'high-low') {
      return [...matched].sort((a, b) => b.price - a.price);
    }
    if (activeSort === 'name-asc') {
      return [...matched].sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
    }

    // 'featured': strictly preserve the exact catalogue order of allProducts
    return matched;
  }, [
    allProducts,
    activeCategory,
    activeGender,
    activePriceMin,
    activePriceMax,
    activeInStockOnly,
    activeBestsellerOnly,
    activeMetals,
    activeSearchQuery,
    activeSort,
  ]);

  const resetFilters = () => {
    setCategory('all');
    setSelectedGender('all');
    setSelectedMetals([]);
    setPriceRange(0, EFFECTIVE_MAX_PRICE);
    setInStockOnly(false);
    setBestsellerOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== 'all') count++;
    if (activeGender !== 'all') count++;
    if (activeMetals.length > 0) count += activeMetals.length;
    if (activePriceMin > 0 || activePriceMax < EFFECTIVE_MAX_PRICE) count++;
    if (activeInStockOnly) count++;
    if (activeBestsellerOnly) count++;
    if (activeSearchQuery.trim().length > 0) count++;
    return count;
  }, [
    activeCategory,
    activeGender,
    activeMetals,
    activePriceMin,
    activePriceMax,
    activeInStockOnly,
    activeBestsellerOnly,
    activeSearchQuery,
  ]);

  const isFiltered = activeFilterCount > 0 || activeSort !== 'featured';

  return {
    category: activeCategory,
    setCategory,
    sortBy: activeSort,
    setSortBy,
    selectedGender: activeGender,
    setSelectedGender,
    selectedMetals: activeMetals,
    setSelectedMetals,
    toggleMetal,
    priceMin: activePriceMin,
    priceMax: activePriceMax,
    setPriceRange,
    inStockOnly: activeInStockOnly,
    setInStockOnly,
    bestsellerOnly: activeBestsellerOnly,
    setBestsellerOnly,
    searchQuery: activeSearchQuery,
    setSearchQuery,
    filteredProducts,
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length,
    activeFilterCount,
    isFiltered,
    resetFilters,
  };
}
