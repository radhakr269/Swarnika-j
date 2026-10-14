import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { ProductCard } from './product/ProductCard';
import { ProductFilters } from './product/ProductFilters';
import { useProductFiltering } from '../hooks/useProductFiltering';
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

  // Task 4: useProductFiltering is the SINGLE shared source of filtering and sorting
  const {
    category,
    setCategory,
    sortBy,
    setSortBy,
    filteredProducts,
    resetFilters,
  } = useProductFiltering(ALL_PRODUCTS, {
    externalCategory: selectedCategory,
    onCategoryChange: setSelectedCategory,
    initialSort: 'featured',
  });

  const [addedId, setAddedId] = useState<string | null>(null);

  // Dynamic filter tabs with exact item counts from ALL_PRODUCTS
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
    <section id="bestsellers-section" className="py-8 sm:py-12 md:py-16 bg-[#FAF7F2] border-b border-[#EAE1D4]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        {/* Header row: BESTSELLING PIECES — and View All Bestsellers → */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-7 pb-3 border-b border-[#E8DECE]">
          <div className="flex items-center gap-2 sm:gap-3">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-[#221B17]">
              BESTSELLING PIECES
            </h2>
            <span className="w-8 sm:w-12 h-[1px] bg-[#4A1622]/40" />
            <span className="text-[10px] sm:text-xs text-[#827163] font-light">
              ({filteredProducts.length} curated designs)
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
          activeCategory={category}
          onSelectCategory={setCategory}
          activeSort={sortBy}
          onSelectSort={setSortBy}
          itemCount={filteredProducts.length}
          className="mb-6 sm:mb-8"
        />

        {/* Product Cards Grid: 4-Column Desktop, 2-Column Mobile */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#EDE2D4] my-6 space-y-3">
            <Sparkles className="w-8 h-8 text-[#9A7B56] mx-auto" />
            <h3 className="font-serif-luxury text-xl text-[#201815]">No jewellery pieces found</h3>
            <p className="text-xs text-[#7A6451] max-w-sm mx-auto">
              We currently don't have pieces matching this filter criteria. Explore all our signature collections.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A1622] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#381019] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
            {filteredProducts.map((prod) => (
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
