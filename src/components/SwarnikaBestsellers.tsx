import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { ProductCard } from './product/ProductCard';
import { ProductFilters } from './product/ProductFilters';
import { SortOption } from '../hooks/useProductFiltering';
import { ROUTES } from '../config/navigation';

export const SwarnikaBestsellers: React.FC = () => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    selectedCategory,
    setSelectedCategory,
  } = useShop();

  const [activeSort, setActiveSort] = useState<SortOption>('featured');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Category filter tabs with counts calculated from ALL_PRODUCTS
  const filterTabs = [
    { id: 'all', label: 'All Pieces', count: ALL_PRODUCTS.length },
    {
      id: 'women',
      label: 'Women',
      count: ALL_PRODUCTS.filter((p) => p.gender === 'women' || p.gender === 'unisex').length,
    },
    {
      id: 'men',
      label: 'Men',
      count: ALL_PRODUCTS.filter((p) => p.gender === 'men' || p.gender === 'unisex').length,
    },
    {
      id: 'necklaces',
      label: 'Necklaces',
      count: ALL_PRODUCTS.filter((p) => p.category === 'necklaces').length,
    },
    {
      id: 'earrings',
      label: 'Earrings',
      count: ALL_PRODUCTS.filter((p) => p.category === 'earrings').length,
    },
    {
      id: 'rings',
      label: 'Rings',
      count: ALL_PRODUCTS.filter((p) => p.category === 'rings').length,
    },
    {
      id: 'bracelets',
      label: 'Bracelets',
      count: ALL_PRODUCTS.filter((p) => p.category === 'bracelets').length,
    },
  ];

  // Filtering products based on context's selectedCategory
  let displayProducts = ALL_PRODUCTS.filter((prod) => {
    if (!selectedCategory || selectedCategory === 'all') return true;
    if (selectedCategory === 'women') return prod.gender === 'women' || prod.gender === 'unisex';
    if (selectedCategory === 'men') return prod.gender === 'men' || prod.gender === 'unisex';
    return prod.category === selectedCategory;
  });

  // Sorting products
  if (activeSort === 'low-high') {
    displayProducts = [...displayProducts].sort((a, b) => a.price - b.price);
  } else if (activeSort === 'high-low') {
    displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
  } else if (activeSort === 'rating') {
    displayProducts = [...displayProducts].sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
  } else if (activeSort === 'newest') {
    displayProducts = [...displayProducts].sort((a, b) => (b.tag === 'New' ? 1 : 0) - (a.tag === 'New' ? 1 : 0));
  } else {
    // Featured / Bestseller priority
    displayProducts = [...displayProducts].sort((a, b) => (b.tag === 'Bestseller' ? 1 : 0) - (a.tag === 'Bestseller' ? 1 : 0));
  }

  const handleAddToCart = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(prod);
    setAddedId(prod.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const handleToggleWish = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(id);
  };

  return (
    <section id="bestsellers-section" className="py-10 sm:py-14 md:py-18 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header row: BESTSELLING PIECES — and View All Bestsellers → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 pb-3 border-b border-[#E8DECE]">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#221B17]">
              BESTSELLING PIECES
            </h2>
            <span className="w-8 sm:w-12 h-[1px] bg-[#4A1622]/40" />
            <span className="text-[10px] sm:text-xs text-[#827163] font-light">
              ({displayProducts.length} curated designs • Still-Life & On-Model Dual View)
            </span>
          </div>

          <Link
            to={ROUTES.SHOP}
            onClick={() => setSelectedCategory('all')}
            className="group inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-[#221B17] hover:text-[#4A1622] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#4A1622]" />
          </Link>
        </div>

        {/* Reusable Product Filters Bar */}
        <ProductFilters
          tabs={filterTabs}
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          activeSort={activeSort}
          onSelectSort={setActiveSort}
          itemCount={displayProducts.length}
          className="mb-6 sm:mb-8"
        />

        {/* Product Cards Grid */}
        {displayProducts.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#EDE2D4] my-6 space-y-3">
            <Sparkles className="w-8 h-8 text-[#9A7B56] mx-auto" />
            <h3 className="font-serif-luxury text-xl text-[#201815]">No jewellery pieces found</h3>
            <p className="text-xs text-[#7A6451] max-w-sm mx-auto">
              We currently don't have pieces matching this filter criteria. Explore all our signature collections.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A1622] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#381019] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-4.5">
            {displayProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={handleAddToCart}
                isJustAdded={addedId === prod.id}
                isInWishlist={isInWishlist(prod.id)}
                onToggleWishlist={handleToggleWish}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
