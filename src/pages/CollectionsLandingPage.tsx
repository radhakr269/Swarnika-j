import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Gem,
  Crown,
  Heart,
  Mail,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import {
  EDITORIAL_COLLECTIONS,
  EditorialCollection,
  VALID_COLLECTION_IDS,
  CollectionId,
} from '../data/editorialCollections';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { ROUTES } from '../config/navigation';
import { STORE_CONFIG } from '../config/store';

export const CollectionsLandingPage: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [addedProductId, setAddedProductId] = React.useState<string | null>(null);

  // Read collection edit filter from URL query param
  const activeEditParam = searchParams.get('edit')?.toLowerCase() || 'all';

  const selectedEdit = useMemo((): CollectionId | 'all' => {
    if (VALID_COLLECTION_IDS.includes(activeEditParam as CollectionId)) {
      return activeEditParam as CollectionId;
    }
    return 'all';
  }, [activeEditParam]);

  // Handle tab switching with real URL query synchronization
  const handleTabSelect = (tab: CollectionId | 'all') => {
    if (tab === 'all') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('edit');
      setSearchParams(nextParams, { replace: false });
    } else {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('edit', tab);
      setSearchParams(nextParams, { replace: false });
    }
  };

  // Filtered suites
  const displayedSuites = useMemo(() => {
    if (selectedEdit === 'all') return EDITORIAL_COLLECTIONS;
    return EDITORIAL_COLLECTIONS.filter((s) => s.id === selectedEdit);
  }, [selectedEdit]);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1800);
  };

  const handleToggleWishlist = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#201815]">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS
          ───────────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-2">
        <ol className="flex items-center gap-1.5 text-xs text-[#7A6655] font-light">
          <li>
            <Link to={ROUTES.HOME} className="hover:text-[#4A101C] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3 h-3 text-[#BFAFA0]" />
          </li>
          <li className="font-medium text-[#4A101C]" aria-current="page">
            Collections
          </li>
          {selectedEdit !== 'all' && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="w-3 h-3 text-[#BFAFA0]" />
              </li>
              <li className="font-medium text-[#7A6655] capitalize" aria-current="page">
                {EDITORIAL_COLLECTIONS.find((c) => c.id === selectedEdit)?.title}
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. EDITORIAL HERO BANNER
          ───────────────────────────────────────────────────────────── */}
      <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#7A6655] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
            <span>THEMATIC ATELIERS & CURATED SUITES</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#4A101C] font-normal leading-[1.12]">
            Curated Collections of Rare Distinction
          </h1>

          <p className="text-[#5E4A3B] text-sm sm:text-base font-light leading-relaxed">
            Each collection explores a distinct thematic chapter in jewellery design—from ceremonial bridal suites
            and festive gold accents to understated daily statements and timeless gifts.
          </p>
        </div>

        {/* Four Approved Collection Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-[#E8DFD3] inline-flex shadow-2xs">
          <button
            type="button"
            onClick={() => handleTabSelect('all')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              selectedEdit === 'all'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            All Collections
          </button>
          <button
            type="button"
            onClick={() => handleTabSelect('bridal')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              selectedEdit === 'bridal'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            Bridal Edit
          </button>
          <button
            type="button"
            onClick={() => handleTabSelect('festive')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              selectedEdit === 'festive'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            Festive Gold
          </button>
          <button
            type="button"
            onClick={() => handleTabSelect('minimal')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              selectedEdit === 'minimal'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            Minimal Statements
          </button>
          <button
            type="button"
            onClick={() => handleTabSelect('gifting')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              selectedEdit === 'gifting'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            Gifted Elegance
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SUITE-BY-SUITE EDITORIAL SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-16 sm:space-y-24 py-8">
        {displayedSuites.map((suite, idx) => {
          // Resolve matching products in exact specified order
          const suiteProducts = suite.productIds
            .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
            .filter((p): p is Product => Boolean(p));

          const isEven = idx % 2 === 0;

          return (
            <section
              key={suite.id}
              id={suite.id}
              className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 scroll-mt-24"
            >
              {/* Suite Editorial Header Box */}
              <div className="bg-white border border-[#E8DFD3] shadow-xs overflow-hidden mb-8">
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-stretch`}
                >
                  {/* Visual Frame */}
                  <div className="lg:w-[48%] relative min-h-[280px] sm:min-h-[380px] bg-[#EAE0D3] overflow-hidden">
                    <img
                      src={suite.image}
                      alt={suite.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white z-10">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-light opacity-90 block">
                        CURATED CHAPTER
                      </span>
                      <p className="font-serif-luxury text-xl sm:text-2xl font-normal">
                        {suite.title}
                      </p>
                    </div>
                  </div>

                  {/* Prose Content */}
                  <div className="lg:w-[52%] p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A77B3D] font-semibold">
                      <Crown className="w-3.5 h-3.5" />
                      <span>{suite.eyebrow}</span>
                    </div>

                    <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#4A101C] font-normal leading-tight">
                      {suite.title}
                    </h2>

                    <p className="text-[#5E4A3B] text-sm sm:text-[15px] font-light leading-relaxed">
                      {suite.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        to={suite.ctaLink}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs"
                      >
                        <span>{suite.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <span className="text-xs text-[#7A6655]">
                        {suiteProducts.length} Curated Heirlooms
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suite Product Grid: Responsive multi-column layout */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {suiteProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isInWishlist={isInWishlist(product.id)}
                    isJustAdded={addedProductId === product.id}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. EDITORIAL CONCIERGE & STYLING ASSISTANCE (NO FAKE FORM)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="bg-[#1F1916] text-[#FAF7F2] border border-[#3E322C] p-6 sm:p-10 lg:p-14 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              <Gem className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>PERSONAL STYLING ASSISTANCE</span>
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] font-normal leading-tight">
              Explore Personal Styling Assistance
            </h2>

            <p className="text-[#C8BDB6] text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
              Whether coordinating a bridal trousseau, selecting an anniversary gift, or discovering versatile
              everyday combinations, our editorial curations help guide your choice. Browse our comprehensive
              catalogue or connect directly with our client concierge.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to={ROUTES.SHOP}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] hover:bg-[#B38F48] text-[#1C1715] text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <a
                href={`mailto:${STORE_CONFIG.concierge.email}?subject=Personal%20Jewellery%20Styling%20Inquiry`}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent border border-[#C5A059] hover:bg-[#C5A059]/10 text-[#C5A059] text-xs uppercase tracking-[0.18em] font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Client Concierge</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. RESTRAINED COMMERCIAL COMMITMENTS
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#E8DFD3] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Crown className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Thoughtful Design
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Artisanal jewellery crafted with premium gold-toned finishes and intricate stone detailing.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Truck className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Complimentary Delivery
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Free courier shipping across India on orders exceeding ₹2,999.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Gem className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Keepsake Packaging
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Every creation arrives in signature presentation packaging designed to preserve its beauty.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <RotateCcw className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              7-Day Return Policy
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Hassle-free return inspection with dedicated doorstep pickup assistance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
