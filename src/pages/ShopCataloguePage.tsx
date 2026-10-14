import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  Grid3X3,
  RotateCcw,
  ShieldCheck,
  Truck,
  Gift,
  Award,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { useShop } from '../context/ShopContext';
import { useProductFiltering, SortOption } from '../hooks/useProductFiltering';
import { ProductCard } from '../components/product/ProductCard';
import { CatalogueFacetSidebar } from '../components/catalogue/CatalogueFacetSidebar';
import { MobileFilterDrawer } from '../components/catalogue/MobileFilterDrawer';
import { CatalogueActiveChips } from '../components/catalogue/CatalogueActiveChips';
import { ROUTES } from '../config/navigation';

interface ShopCataloguePageProps {
  mode?: 'shop' | 'women' | 'men' | 'category';
}

export const ShopCataloguePage: React.FC<ShopCataloguePageProps> = ({ mode = 'shop' }) => {
  const { slug } = useParams<{ slug?: string }>();
  const location = useLocation();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  // Determine initial category and gender based on route mode
  const getInitialCategory = () => {
    if (mode === 'category' && slug) {
      return slug.toLowerCase();
    }
    if (mode === 'women') return 'women';
    if (mode === 'men') return 'men';
    return 'all';
  };

  const getInitialGender = (): 'all' | 'women' | 'men' => {
    if (mode === 'women') return 'women';
    if (mode === 'men') return 'men';
    return 'all';
  };

  // State for mobile drawer and desktop sidebar visibility
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Initialize product filtering
  const {
    category,
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
    totalCount,
    filteredCount,
    activeFilterCount,
    isFiltered,
    resetFilters,
  } = useProductFiltering(ALL_PRODUCTS, {
    initialCategory: getInitialCategory(),
    initialGender: getInitialGender(),
    initialSort: 'featured',
  });

  // Re-sync filter when route changes (e.g., navigating between /shop, /women, /men, /category/rings)
  useEffect(() => {
    const nextCat = getInitialCategory();
    const nextGender = getInitialGender();
    setCategory(nextCat);
    setSelectedGender(nextGender);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, slug, mode]);

  // Handle Add to Bag action with feedback state
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.metals?.[0] || '18K Gold Plated');
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 2200);
  };

  // Resolve Editorial Copy & Breadcrumbs
  let pageTitle = 'Shop All Curations';
  let pageSubtitle =
    'From radiant polki chokers to certified 18K gold bands, explore our heritage atelier’s complete collection of handcrafted jewellery.';
  let breadcrumbLabel = 'Shop All';

  if (mode === 'women' || category === 'women') {
    pageTitle = "Women's Royal Collection";
    pageSubtitle =
      'Opulent bridal jhumkas, emerald chokers, pearl-fringed chandbalis, and everyday heirlooms crafted for timeless grace.';
    breadcrumbLabel = 'Women';
  } else if (mode === 'men' || category === 'men') {
    pageTitle = "Men's Modern Strength";
    pageSubtitle =
      'Heavyweight Cuban link chains, architectural signet rings, and diamond-cut bracelets engineered in precious metals.';
    breadcrumbLabel = 'Men';
  } else if (category === 'necklaces') {
    pageTitle = 'Necklaces & Pendants';
    pageSubtitle =
      'Statement polki chokers, layered temple chains, and royal pendants handcrafted to grace every festive celebration.';
    breadcrumbLabel = 'Necklaces';
  } else if (category === 'earrings') {
    pageTitle = 'Earrings & Hoops';
    pageSubtitle =
      'Timeless heritage jhumkas, crescent chandbalis, and sparkling diamond hoops set in verified 18K gold polish.';
    breadcrumbLabel = 'Earrings';
  } else if (category === 'rings') {
    pageTitle = 'Rings & Bands';
    pageSubtitle =
      'Eternal engagement bands, signet rings, and solitaire statement pieces designed for lifelong distinction.';
    breadcrumbLabel = 'Rings';
  } else if (category === 'bracelets') {
    pageTitle = 'Bracelets & Cuffs';
    pageSubtitle =
      'Regal kadas, textured link bracelets, and diamond-cut cuffs tailored for everyday sophistication.';
    breadcrumbLabel = 'Bracelets';
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#201815]">
      {/* 1. Luxury Header Banner */}
      <section className="bg-[#F5EFE6] border-b border-[#E8DED1] pt-6 pb-8 sm:pt-10 sm:pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-1.5 sm:space-x-2 text-[11px] sm:text-xs text-[#7A6553]">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-[#4A101C] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-[#A77B3D]" />
              </li>
              {mode === 'category' && (
                <>
                  <li>
                    <Link to={ROUTES.SHOP} className="hover:text-[#4A101C] transition-colors">
                      Catalogue
                    </Link>
                  </li>
                  <li>
                    <ChevronRight className="w-3 h-3 text-[#A77B3D]" />
                  </li>
                </>
              )}
              <li className="font-semibold text-[#201815] truncate" aria-current="page">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>

          {/* Editorial Title & Accent */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#A77B3D] font-semibold mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Swarnika Atelier Curation</span>
              </div>
              <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-normal text-[#201815] tracking-tight leading-tight">
                {pageTitle}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#6C5849] font-light leading-relaxed">
                {pageSubtitle}
              </p>
            </div>

            {/* Quick item count badge */}
            <div className="shrink-0 text-left md:text-right">
              <span className="inline-block bg-white border border-[#D5C6B5] px-3 py-1.5 text-xs text-[#554336] shadow-2xs font-medium">
                <strong className="text-[#4A101C] font-semibold">{filteredCount}</strong> of{' '}
                <strong className="text-[#201815]">{totalCount}</strong> Heirlooms
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls & Filter Bar */}
      <section className="sticky top-16 sm:top-20 z-30 bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#E8DED1] px-4 sm:px-6 lg:px-10 py-3 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
          {/* Left Controls: Filter Toggles */}
          <div className="flex items-center gap-2">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4A101C] text-white text-xs uppercase tracking-wider font-medium shadow-2xs cursor-pointer"
              aria-label="Open filter drawer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-[#A77B3D] text-white text-[9px] font-bold rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              type="button"
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D5C6B5] bg-white text-[#201815] hover:bg-[#F2E8DC] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#4A101C]" />
              <span>{isSidebarVisible ? 'Hide Sidebar' : 'Show Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-[#4A101C] text-white text-[9px] font-bold rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Quick Category Tabs on Tablet/Desktop when space permits */}
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'All' },
                { id: 'women', label: 'Women' },
                { id: 'men', label: 'Men' },
                { id: 'necklaces', label: 'Necklaces' },
                { id: 'earrings', label: 'Earrings' },
                { id: 'rings', label: 'Rings' },
                { id: 'bracelets', label: 'Bracelets' },
              ].map((tab) => {
                const isActive = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tab.id)}
                    className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#4A101C] text-white font-semibold'
                        : 'text-[#6C5849] hover:bg-[#E8DFD3] hover:text-[#201815]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Controls: Sort & Grid Layout */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Grid Layout Switcher */}
            <div className="hidden xl:flex items-center border border-[#D5C6B5] bg-white">
              <button
                type="button"
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition-colors cursor-pointer ${
                  gridColumns === 3 ? 'bg-[#4A101C] text-white' : 'text-[#6C5849] hover:text-[#201815]'
                }`}
                title="3 Columns Grid"
                aria-label="Switch to 3 columns"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns(4)}
                className={`p-1.5 transition-colors cursor-pointer ${
                  gridColumns === 4 ? 'bg-[#4A101C] text-white' : 'text-[#6C5849] hover:text-[#201815]'
                }`}
                title="4 Columns Grid"
                aria-label="Switch to 4 columns"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="catalogue-sort" className="hidden md:inline text-[11px] uppercase tracking-wider text-[#7A6553] font-medium">
                Sort:
              </label>
              <select
                id="catalogue-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs bg-white border border-[#D5C6B5] text-[#201815] px-2.5 py-1.5 focus:outline-none focus:border-[#4A101C] cursor-pointer"
              >
                <option value="featured">Featured Curation</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name-asc">Alphabetical: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content: Active Chips + Sidebar + Product Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        {/* Active Filter Chips */}
        <CatalogueActiveChips
          category={category}
          onClearCategory={() => setCategory('all')}
          gender={selectedGender}
          onClearGender={() => setSelectedGender('all')}
          selectedMetals={selectedMetals}
          onRemoveMetal={toggleMetal}
          priceMin={priceMin}
          priceMax={priceMax}
          onClearPrice={() => setPriceRange(0, 20000)}
          inStockOnly={inStockOnly}
          onToggleInStock={() => setInStockOnly(!inStockOnly)}
          bestsellerOnly={bestsellerOnly}
          onToggleBestseller={() => setBestsellerOnly(!bestsellerOnly)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onResetAll={resetFilters}
          filteredCount={filteredCount}
          totalCount={totalCount}
          className="mb-6"
        />

        <div className="flex gap-8 items-start">
          {/* Left Desktop Facet Sidebar */}
          {isSidebarVisible && (
            <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-36">
              <CatalogueFacetSidebar
                category={category}
                onSelectCategory={setCategory}
                gender={selectedGender}
                onSelectGender={setSelectedGender}
                selectedMetals={selectedMetals}
                onToggleMetal={toggleMetal}
                priceMin={priceMin}
                priceMax={priceMax}
                onSetPriceRange={setPriceRange}
                inStockOnly={inStockOnly}
                onToggleInStock={setInStockOnly}
                bestsellerOnly={bestsellerOnly}
                onToggleBestseller={setBestsellerOnly}
                onResetAll={resetFilters}
                isFiltered={isFiltered}
              />
            </div>
          )}

          {/* Right Product Grid Area */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              /* High Luxury Empty State */
              <div className="bg-white border border-[#E8DED1] p-8 sm:p-14 text-center max-w-xl mx-auto my-8 shadow-xs">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FAF7F2] border border-[#E0D2C2] flex items-center justify-center text-[#A77B3D]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#201815] font-normal mb-2">
                  No Heirlooms Match Your Selection
                </h3>
                <p className="text-xs sm:text-sm text-[#6C5849] font-light leading-relaxed mb-6">
                  We could not find any jewellery matching your specific combination of filters.
                  Try clearing some criteria or explore our complete royal curation.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              /* Responsive Luxury Grid */
              <div
                className={`grid grid-cols-2 gap-3 sm:gap-5 ${
                  isSidebarVisible
                    ? gridColumns === 4
                      ? 'md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
                      : 'md:grid-cols-2 xl:grid-cols-3'
                    : gridColumns === 4
                    ? 'md:grid-cols-3 lg:grid-cols-4'
                    : 'md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={toggleWishlist}
                    onQuickView={setQuickViewProduct}
                    isInWishlist={isInWishlist(product.id)}
                    isJustAdded={justAddedId === product.id}
                    variant="standard"
                    showBadges={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Luxury Atelier Trust Banner */}
      <section className="bg-white border-t border-[#E8DED1] mt-12 py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              100% Certified Karatage
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Verified authenticity certificates with every order
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Insured Transit
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Tamper-proof, fully insured courier across India
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Velvet Gift Box
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Complimentary signature keepsake packaging
            </p>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Lifetime Polish
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Complimentary cleaning and heirloom care support
            </p>
          </div>
        </div>
      </section>

      {/* 5. Mobile Filter Drawer Component */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        category={category}
        onSelectCategory={setCategory}
        gender={selectedGender}
        onSelectGender={setSelectedGender}
        selectedMetals={selectedMetals}
        onToggleMetal={toggleMetal}
        priceMin={priceMin}
        priceMax={priceMax}
        onSetPriceRange={setPriceRange}
        inStockOnly={inStockOnly}
        onToggleInStock={setInStockOnly}
        bestsellerOnly={bestsellerOnly}
        onToggleBestseller={setBestsellerOnly}
        onResetAll={resetFilters}
        filteredCount={filteredCount}
        isFiltered={isFiltered}
      />
    </div>
  );
};
