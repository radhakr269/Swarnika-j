import React, { useState, useMemo, useCallback } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
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
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { useShop } from '../context/ShopContext';
import {
  useProductFiltering,
  SortOption,
  VALID_SORT_OPTIONS,
  METAL_OPTIONS,
  EFFECTIVE_MAX_PRICE,
} from '../hooks/useProductFiltering';
import { ProductCard } from '../components/product/ProductCard';
import { CatalogueFacetSidebar } from '../components/catalogue/CatalogueFacetSidebar';
import { MobileFilterDrawer } from '../components/catalogue/MobileFilterDrawer';
import { CatalogueActiveChips } from '../components/catalogue/CatalogueActiveChips';
import { ROUTES } from '../config/navigation';

export const VALID_CATEGORIES = ['necklaces', 'earrings', 'rings', 'bracelets'] as const;

interface ShopCataloguePageProps {
  mode?: 'shop' | 'women' | 'men' | 'category';
}

export const ShopCataloguePage: React.FC<ShopCataloguePageProps> = ({ mode = 'shop' }) => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  // Validate category slug when on a category route
  const normalizedSlug = slug ? slug.toLowerCase() : '';
  const isUnknownCategorySlug =
    mode === 'category' &&
    (!normalizedSlug || !VALID_CATEGORIES.includes(normalizedSlug as (typeof VALID_CATEGORIES)[number]));

  // Route Authorities
  const isCategoryLocked = mode === 'category' || mode === 'women' || mode === 'men';
  const isGenderLocked = mode === 'women' || mode === 'men';

  // 1. Resolve Category from Route or URL
  const resolvedCategory = useMemo(() => {
    if (mode === 'category') return normalizedSlug;
    if (mode === 'women') return 'women';
    if (mode === 'men') return 'men';

    // On /shop, query param can set category
    const catParam = searchParams.get('category')?.toLowerCase();
    if (
      catParam &&
      (catParam === 'all' ||
        catParam === 'women' ||
        catParam === 'men' ||
        VALID_CATEGORIES.includes(catParam as (typeof VALID_CATEGORIES)[number]))
    ) {
      return catParam;
    }
    return 'all';
  }, [mode, normalizedSlug, searchParams]);

  // 2. Resolve Gender from Route or URL
  const resolvedGender = useMemo((): 'all' | 'women' | 'men' => {
    if (mode === 'women') return 'women'; // Strictly authoritative
    if (mode === 'men') return 'men'; // Strictly authoritative

    // On /shop or /category/:slug, query param can filter audience
    const gParam = searchParams.get('gender')?.toLowerCase();
    if (gParam === 'women' || gParam === 'men') {
      return gParam;
    }
    return 'all';
  }, [mode, searchParams]);

  // 3. Resolve Sort Option from URL
  const resolvedSort = useMemo((): SortOption => {
    const sParam = searchParams.get('sort')?.toLowerCase();
    if (sParam && VALID_SORT_OPTIONS.includes(sParam as SortOption)) {
      return sParam as SortOption;
    }
    return 'featured';
  }, [searchParams]);

  // 4. Resolve Price Bounds from URL
  const resolvedPriceMin = useMemo(() => {
    const minParam = searchParams.get('minPrice');
    if (minParam !== null) {
      const parsed = parseInt(minParam, 10);
      if (!isNaN(parsed) && parsed >= 0) {
        return Math.min(parsed, EFFECTIVE_MAX_PRICE);
      }
    }
    return 0;
  }, [searchParams]);

  const resolvedPriceMax = useMemo(() => {
    const maxParam = searchParams.get('maxPrice');
    if (maxParam !== null) {
      const parsed = parseInt(maxParam, 10);
      if (!isNaN(parsed) && parsed >= resolvedPriceMin) {
        return Math.max(parsed, resolvedPriceMin);
      }
    }
    return EFFECTIVE_MAX_PRICE;
  }, [searchParams, resolvedPriceMin]);

  // 5. Resolve In-Stock, Bestseller, Metals, and Search
  const resolvedInStock = useMemo(() => searchParams.get('inStock') === 'true', [searchParams]);
  const resolvedBestseller = useMemo(() => searchParams.get('bestseller') === 'true', [searchParams]);

  const resolvedMetals = useMemo(() => {
    const metalsParam = searchParams.getAll('metal');
    if (metalsParam.length > 0) {
      return metalsParam.filter((m) => METAL_OPTIONS.some((opt) => opt.id === m));
    }
    const singleParam = searchParams.get('metal');
    if (singleParam) {
      return singleParam.split(',').filter((m) => METAL_OPTIONS.some((opt) => opt.id === m));
    }
    return [];
  }, [searchParams]);

  const resolvedSearchQuery = useMemo(() => searchParams.get('q') || '', [searchParams]);

  // URL State Updater Helper
  const updateURLParams = useCallback(
    (updater: (params: URLSearchParams) => void, replace = true) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          updater(next);
          return next;
        },
        { replace }
      );
    },
    [setSearchParams]
  );

  // Setters that update URL search params directly
  const handleCategoryChange = useCallback(
    (newCat: string) => {
      if (isCategoryLocked) return;
      updateURLParams((params) => {
        if (!newCat || newCat === 'all') {
          params.delete('category');
        } else {
          params.set('category', newCat);
        }
      });
    },
    [isCategoryLocked, updateURLParams]
  );

  const handleGenderChange = useCallback(
    (newGender: 'all' | 'women' | 'men') => {
      if (isGenderLocked) return;
      updateURLParams((params) => {
        if (!newGender || newGender === 'all') {
          params.delete('gender');
        } else {
          params.set('gender', newGender);
        }
      });
    },
    [isGenderLocked, updateURLParams]
  );

  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      updateURLParams((params) => {
        if (newSort === 'featured') {
          params.delete('sort');
        } else {
          params.set('sort', newSort);
        }
      });
    },
    [updateURLParams]
  );

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      updateURLParams((params) => {
        if (min <= 0) {
          params.delete('minPrice');
        } else {
          params.set('minPrice', min.toString());
        }
        if (max >= EFFECTIVE_MAX_PRICE) {
          params.delete('maxPrice');
        } else {
          params.set('maxPrice', max.toString());
        }
      });
    },
    [updateURLParams]
  );

  const handleToggleMetal = useCallback(
    (metalId: string) => {
      updateURLParams((params) => {
        const current = params.getAll('metal');
        const next = current.includes(metalId)
          ? current.filter((m) => m !== metalId)
          : [...current, metalId];
        params.delete('metal');
        next.forEach((m) => params.append('metal', m));
      });
    },
    [updateURLParams]
  );

  const handleRemoveMetal = useCallback(
    (metalId: string) => {
      updateURLParams((params) => {
        const current = params.getAll('metal').filter((m) => m !== metalId);
        params.delete('metal');
        current.forEach((m) => params.append('metal', m));
      });
    },
    [updateURLParams]
  );

  const handleToggleInStock = useCallback(
    (val: boolean) => {
      updateURLParams((params) => {
        if (val) {
          params.set('inStock', 'true');
        } else {
          params.delete('inStock');
        }
      });
    },
    [updateURLParams]
  );

  const handleToggleBestseller = useCallback(
    (val: boolean) => {
      updateURLParams((params) => {
        if (val) {
          params.set('bestseller', 'true');
        } else {
          params.delete('bestseller');
        }
      });
    },
    [updateURLParams]
  );

  const handleClearSearch = useCallback(() => {
    updateURLParams((params) => {
      params.delete('q');
    });
  }, [updateURLParams]);

  const handleResetAll = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Hook receives controlled values derived from URL
  const { filteredProducts, totalCount, filteredCount, activeFilterCount, isFiltered } =
    useProductFiltering(ALL_PRODUCTS, {
      category: resolvedCategory,
      gender: resolvedGender,
      sortBy: resolvedSort,
      priceMin: resolvedPriceMin,
      priceMax: resolvedPriceMax,
      selectedMetals: resolvedMetals,
      inStockOnly: resolvedInStock,
      bestsellerOnly: resolvedBestseller,
      searchQuery: resolvedSearchQuery,
    });

  // UI state
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [gridColumns, setGridColumns] = useState<3 | 4>(4);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Add to Bag handler
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.metals?.[0] || '18K Gold Plated');
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 2200);
  };

  // 6. Editorial Copy & Breadcrumbs (Refined, accurate language without unverified claims)
  let pageTitle = 'Shop All Curations';
  let pageSubtitle =
    'Thoughtfully designed jewellery, crafted for everyday moments and special celebrations.';
  let breadcrumbLabel = 'Shop All';

  if (mode === 'women' || resolvedCategory === 'women') {
    pageTitle = "Women's Collection";
    pageSubtitle =
      'Curated necklaces, earrings, and signature pieces designed for women.';
    breadcrumbLabel = 'Women';
  } else if (mode === 'men' || resolvedCategory === 'men') {
    pageTitle = "Men's Modern Strength";
    pageSubtitle =
      'Refined chains, signet rings, and bracelets curated for modern men.';
    breadcrumbLabel = 'Men';
  } else if (resolvedCategory === 'necklaces') {
    pageTitle = 'Necklaces & Pendants';
    pageSubtitle =
      'Curated necklaces, pendants, and chains designed for layered elegance.';
    breadcrumbLabel = 'Necklaces';
  } else if (resolvedCategory === 'earrings') {
    pageTitle = 'Earrings & Hoops';
    pageSubtitle =
      'Jhumkas, chandbalis, and stud earrings designed for everyday and occasion wear.';
    breadcrumbLabel = 'Earrings';
  } else if (resolvedCategory === 'rings') {
    pageTitle = 'Rings & Bands';
    pageSubtitle =
      'Refined bands, solitaire-inspired designs, and signet rings.';
    breadcrumbLabel = 'Rings';
  } else if (resolvedCategory === 'bracelets') {
    pageTitle = 'Bracelets & Cuffs';
    pageSubtitle =
      'Cuffs, link bracelets, and kadas tailored for refined wristwear.';
    breadcrumbLabel = 'Bracelets';
  }

  // Handle Unsupported Category Slug
  if (isUnknownCategorySlug) {
    return (
      <div className="min-h-[65vh] py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 bg-[#F5ECE1] border border-[#E0D2C2] text-[#4A101C] flex items-center justify-center rounded-full mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#201815] font-normal mb-2">
          Category Not Found
        </h1>
        <p className="text-sm text-[#6C5849] font-light leading-relaxed mb-6">
          We could not find an active category named &ldquo;<span className="font-semibold text-[#201815]">{slug}</span>&rdquo;.
          Explore our available jewellery collections below:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mb-8">
          {VALID_CATEGORIES.map((catSlug) => (
            <Link
              key={catSlug}
              to={ROUTES.CATEGORY(catSlug)}
              className="px-3 py-2 bg-white border border-[#D5C6B5] hover:border-[#4A101C] hover:bg-[#F2E8DC] text-xs uppercase tracking-wider font-medium text-[#201815] transition-colors text-center"
            >
              {catSlug}
            </Link>
          ))}
        </div>

        <Link
          to={ROUTES.SHOP}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs"
        >
          <span>View All 20 Pieces</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#201815]">
      {/* 1. Header Banner */}
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
                <span>The Swarnika Collection</span>
              </div>
              <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl font-normal text-[#201815] tracking-tight leading-tight">
                {pageTitle}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#6C5849] font-light leading-relaxed">
                {pageSubtitle}
              </p>
            </div>

            {/* Live calculated item count badge */}
            <div className="shrink-0 text-left md:text-right">
              <span className="inline-block bg-white border border-[#D5C6B5] px-3 py-1.5 text-xs text-[#554336] shadow-2xs font-medium">
                <strong className="text-[#4A101C] font-semibold">{filteredCount}</strong> of{' '}
                <strong className="text-[#201815]">{totalCount}</strong> Pieces
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

            {/* Quick Category Tabs on /shop route */}
            {!isCategoryLocked && (
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
                  const isActive = resolvedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleCategoryChange(tab.id)}
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
            )}
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

            {/* Verified Public Sort Select */}
            <div className="flex items-center gap-1.5">
              <label
                htmlFor="catalogue-sort"
                className="hidden md:inline text-[11px] uppercase tracking-wider text-[#7A6553] font-medium"
              >
                Sort:
              </label>
              <select
                id="catalogue-sort"
                value={resolvedSort}
                onChange={(e) => handleSortChange(e.target.value as SortOption)}
                className="text-xs bg-white border border-[#D5C6B5] text-[#201815] px-2.5 py-1.5 focus:outline-none focus:border-[#4A101C] cursor-pointer"
              >
                <option value="featured">Featured Curation</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
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
          category={resolvedCategory}
          onClearCategory={() => handleCategoryChange('all')}
          isCategoryLocked={isCategoryLocked}
          gender={resolvedGender}
          onClearGender={() => handleGenderChange('all')}
          isGenderLocked={isGenderLocked}
          selectedMetals={resolvedMetals}
          onRemoveMetal={handleRemoveMetal}
          priceMin={resolvedPriceMin}
          priceMax={resolvedPriceMax}
          onClearPrice={() => handlePriceChange(0, EFFECTIVE_MAX_PRICE)}
          inStockOnly={resolvedInStock}
          onToggleInStock={() => handleToggleInStock(!resolvedInStock)}
          bestsellerOnly={resolvedBestseller}
          onToggleBestseller={() => handleToggleBestseller(!resolvedBestseller)}
          searchQuery={resolvedSearchQuery}
          onClearSearch={handleClearSearch}
          onResetAll={handleResetAll}
          filteredCount={filteredCount}
          totalCount={totalCount}
          className="mb-6"
        />

        <div className="flex gap-8 items-start">
          {/* Left Desktop Facet Sidebar */}
          {isSidebarVisible && (
            <div className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-36">
              <CatalogueFacetSidebar
                category={resolvedCategory}
                onSelectCategory={handleCategoryChange}
                isCategoryLocked={isCategoryLocked}
                gender={resolvedGender}
                onSelectGender={handleGenderChange}
                isGenderLocked={isGenderLocked}
                selectedMetals={resolvedMetals}
                onToggleMetal={handleToggleMetal}
                priceMin={resolvedPriceMin}
                priceMax={resolvedPriceMax}
                onSetPriceRange={handlePriceChange}
                inStockOnly={resolvedInStock}
                onToggleInStock={handleToggleInStock}
                bestsellerOnly={resolvedBestseller}
                onToggleBestseller={handleToggleBestseller}
                onResetAll={handleResetAll}
                isFiltered={isFiltered}
              />
            </div>
          )}

          {/* Right Product Grid Area */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              /* High Luxury Empty State with One-Click Reset */
              <div className="bg-white border border-[#E8DED1] p-8 sm:p-14 text-center max-w-xl mx-auto my-8 shadow-xs">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#FAF7F2] border border-[#E0D2C2] flex items-center justify-center text-[#A77B3D]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#201815] font-normal mb-2">
                  No Pieces Match Your Selection
                </h3>
                <p className="text-xs sm:text-sm text-[#6C5849] font-light leading-relaxed mb-6">
                  We could not find any jewellery matching your specific combination of filters.
                  Try clearing some criteria or reset to explore the complete curation.
                </p>
                <button
                  type="button"
                  onClick={handleResetAll}
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

      {/* 4. Atelier Trust Banner (Refined, accurate, restrained commercial copy) */}
      <section className="bg-white border-t border-[#E8DED1] mt-12 py-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Thoughtfully Designed
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Handcrafted detailing with premium gold plating and finishes
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Complimentary Delivery
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Free shipping across India on orders over ₹2,999
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Elegant Presentation
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Signature keepsake gift packaging included with every order
            </p>
          </div>

          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#A77B3D] mb-2" />
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#201815]">
              Dedicated Care
            </h4>
            <p className="text-[11px] text-[#7A6553] mt-1 font-light">
              Detailed heirloom care guidelines to maintain lasting brilliance
            </p>
          </div>
        </div>
      </section>

      {/* 5. Mobile Filter Drawer Component */}
      <MobileFilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        category={resolvedCategory}
        onSelectCategory={handleCategoryChange}
        isCategoryLocked={isCategoryLocked}
        gender={resolvedGender}
        onSelectGender={handleGenderChange}
        isGenderLocked={isGenderLocked}
        selectedMetals={resolvedMetals}
        onToggleMetal={handleToggleMetal}
        priceMin={resolvedPriceMin}
        priceMax={resolvedPriceMax}
        onSetPriceRange={handlePriceChange}
        inStockOnly={resolvedInStock}
        onToggleInStock={handleToggleInStock}
        bestsellerOnly={resolvedBestseller}
        onToggleBestseller={handleToggleBestseller}
        onResetAll={handleResetAll}
        filteredCount={filteredCount}
        isFiltered={isFiltered}
      />
    </div>
  );
};
