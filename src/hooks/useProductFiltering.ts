import { useState, useMemo } from 'react';
import { Product } from '../data/jewelryData';

export type SortOption = 'featured' | 'low-high' | 'high-low' | 'rating' | 'newest';

export interface FilterState {
  category: string;
  sortBy: SortOption;
  selectedTag?: string | null;
  minPrice?: number;
  maxPrice?: number;
}

export function useProductFiltering(allProducts: Product[], initialCategory = 'all') {
  const [category, setCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      // Category filter
      if (category && category !== 'all') {
        if (category === 'women') {
          if (product.gender !== 'women' && product.gender !== 'unisex') return false;
        } else if (category === 'men') {
          if (product.gender !== 'men' && product.gender !== 'unisex') return false;
        } else if (product.category !== category) {
          return false;
        }
      }

      // Tag filter
      if (selectedTag && selectedTag !== 'all') {
        if (product.tag !== selectedTag) return false;
      }

      return true;
    });

    // Sort order
    switch (sortBy) {
      case 'low-high':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0));
        break;
      case 'featured':
      default:
        // Keep catalog curation order with Bestsellers prioritized
        result = [...result].sort((a, b) => (b.tag === 'Bestseller' ? 1 : 0) - (a.tag === 'Bestseller' ? 1 : 0));
        break;
    }

    return result;
  }, [allProducts, category, sortBy, selectedTag]);

  const resetFilters = () => {
    setCategory('all');
    setSortBy('featured');
    setSelectedTag(null);
  };

  const isFiltered = category !== 'all' || selectedTag !== null || sortBy !== 'featured';

  return {
    category,
    setCategory,
    sortBy,
    setSortBy,
    selectedTag,
    setSelectedTag,
    filteredProducts,
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length,
    isFiltered,
    resetFilters,
  };
}
