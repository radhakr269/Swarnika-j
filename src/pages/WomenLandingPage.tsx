import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  Truck,
  RotateCcw,
  Gem,
  Crown,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { ROUTES } from '../config/navigation';

type WomenCategoryTab = 'all' | 'earrings' | 'necklaces' | 'rings' | 'bracelets';
type WomenSortOption = 'featured' | 'low-high' | 'high-low' | 'name-asc';

export const WomenLandingPage: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [selectedSubcategory, setSelectedSubcategory] = useState<WomenCategoryTab>('all');
  const [sortBy, setSortBy] = useState<WomenSortOption>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // All Women's products in catalogue (13 items dynamically calculated)
  const womenProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.gender === 'women');
  }, []);

  // Filtered & Sorted Women's products
  const displayedProducts = useMemo(() => {
    let list = [...womenProducts];

    if (selectedSubcategory !== 'all') {
      list = list.filter((p) => p.category === selectedSubcategory);
    }

    switch (sortBy) {
      case 'low-high':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Preserves original catalogue order
        break;
    }

    return list;
  }, [womenProducts, selectedSubcategory, sortBy]);

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
            Women
          </li>
        </ol>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. EDITORIAL HERO BANNER
          Split-column layout showcasing Jaipur polki artistry & royal gold
          ───────────────────────────────────────────────────────────── */}
      <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="bg-white border border-[#E8DFD3] shadow-xs overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left Text / Editorial Content */}
          <div className="lg:w-[50%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#7A6655] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
              <span>THE WOMEN'S EDIT</span>
              <span className="w-8 h-[1px] bg-[#BFAFA0]" aria-hidden="true" />
              <span>REFINED JEWELLERY SELECTION</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#4A101C] font-normal leading-[1.12] text-balance">
              Regal Splendor, Handcrafted for the Modern Woman
            </h1>

            <p className="text-[#5E4A3B] text-sm sm:text-base font-light leading-relaxed max-w-xl">
              From imperial uncut polki chandbalis to gossamer halo solitaires, explore thoughtfully designed
              pieces created for memorable ceremonies, evening celebrations, and everyday style.
            </p>

            {/* Editorial Quick Jump Links */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <Link
                to="/category/earrings?gender=women"
                className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F2E8DC] border border-[#D5C2AD] text-[#201815] transition-colors font-medium whitespace-nowrap"
              >
                Chandbalis & Jhumkas
              </Link>
              <Link
                to="/category/necklaces?gender=women"
                className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F2E8DC] border border-[#D5C2AD] text-[#201815] transition-colors font-medium whitespace-nowrap"
              >
                Chokers & Sets
              </Link>
              <Link
                to="/category/rings?gender=women"
                className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F2E8DC] border border-[#D5C2AD] text-[#201815] transition-colors font-medium whitespace-nowrap"
              >
                Solitaires & Rings
              </Link>
              <Link
                to="/category/bracelets?gender=women"
                className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#F2E8DC] border border-[#D5C2AD] text-[#201815] transition-colors font-medium whitespace-nowrap"
              >
                Temple Bangles
              </Link>
            </div>
          </div>

          {/* Right Campaign Imagery */}
          <div className="lg:w-[50%] min-h-[300px] sm:min-h-[420px] relative overflow-hidden bg-[#F2E8DC]">
            <img
              src="/assist/image/banners/hero_model_portrait.jpg"
              alt="Swarnika fine jewellery collection for women featuring gold earrings and bridal necklaces"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white z-10">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light block opacity-90">
                CAMPAIGN SPOTLIGHT
              </span>
              <p className="font-serif-luxury text-lg sm:text-xl font-normal">
                Aafreen Polki Chandbalis & Rajnandini Choker
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ATELIER HIGHLIGHT: HERITAGE CRAFTSMANSHIP
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="bg-[#FAF7F2] border border-[#E8DFD3] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Box */}
            <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden bg-[#EAE0D3] shadow-xs">
              <img
                src="/assist/image/banners/promo_bridal.jpg"
                alt="Jaipur master artisan setting uncut polki stones in antique 18k gold dip"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#4A101C] text-white text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold">
                HERITAGE ARCHIVE
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium">
                <Crown className="w-3.5 h-3.5 text-[#A77B3D]" />
                <span>CENTURIES OF UNCOMPROMISING DETAIL</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#4A101C] font-normal leading-tight">
                Traditional Polki Craftsmanship & Refined Finishes
              </h2>

              <p className="text-[#5E4A3B] text-sm sm:text-[15px] font-light leading-relaxed">
                Each Swarnika creation is shaped with inspiration from Rajasthan’s historic jewellery traditions.
                Our artisans set shimmering cubic zircons and uncut polki glass stones into detailed settings,
                framed with hand-strung seed pearls. Finished with distinctive gold-toned polishes, they capture
                the visual depth and presence of ancestral heirlooms.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 bg-white border border-[#E8DFD3]">
                  <span className="font-serif-luxury text-base sm:text-lg text-[#4A101C] block font-normal">
                    Intricate Detailing
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#7A6655] uppercase tracking-wider block mt-0.5">
                    Hand-Set Stones
                  </span>
                </div>
                <div className="p-3 bg-white border border-[#E8DFD3]">
                  <span className="font-serif-luxury text-base sm:text-lg text-[#4A101C] block font-normal">
                    Gold-Plated Tone
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#7A6655] uppercase tracking-wider block mt-0.5">
                    Lustrous Finish
                  </span>
                </div>
                <div className="p-3 bg-white border border-[#E8DFD3]">
                  <span className="font-serif-luxury text-base sm:text-lg text-[#4A101C] block font-normal">
                    Traditional Motif
                  </span>
                  <span className="text-[10px] sm:text-xs text-[#7A6655] uppercase tracking-wider block mt-0.5">
                    Jaipur Inspiration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE CURATED WOMEN'S PRODUCT SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 border-t border-[#E8DFD3]">
        {/* Section Header & Subcategory Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium mb-1">
              <span>EXPLORE ALL PIECES</span>
              <span className="w-6 h-[1px] bg-[#BFAFA0]" aria-hidden="true" />
              <span>{displayedProducts.length} DESIGNS</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A101C] font-normal">
              Curated Heirlooms for Her
            </h2>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E8DFD3] shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-[#4A101C] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#4A101C]'
              }`}
            >
              All Women ({womenProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('earrings')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'earrings'
                  ? 'bg-[#4A101C] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#4A101C]'
              }`}
            >
              Earrings (5)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('necklaces')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'necklaces'
                  ? 'bg-[#4A101C] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#4A101C]'
              }`}
            >
              Necklaces (2)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('rings')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'rings'
                  ? 'bg-[#4A101C] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#4A101C]'
              }`}
            >
              Rings (2)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('bracelets')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'bracelets'
                  ? 'bg-[#4A101C] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#4A101C]'
              }`}
            >
              Bracelets & Bangles (4)
            </button>
          </div>
        </div>

        {/* Toolbar: Counter & Sorting */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E8DFD3] text-xs text-[#7A6655]">
          <div>
            Showing <span className="font-semibold text-[#201815]">{displayedProducts.length}</span> pieces
            {selectedSubcategory !== 'all' && (
              <span>
                {' '}
                in <span className="capitalize text-[#4A101C] font-medium">{selectedSubcategory}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="women-sort" className="font-medium text-[#5E4A3B]">
              Sort by:
            </label>
            <select
              id="women-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as WomenSortOption)}
              className="bg-white border border-[#D5C2AD] text-[#201815] text-xs py-1.5 px-3 focus:outline-hidden focus:ring-1 focus:ring-[#4A101C] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="name-asc">Alphabetical: A to Z</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid: 3-column desktop, 2-column tablet, 2-column mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedProducts.map((product) => (
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

        {/* Full Catalogue Link */}
        <div className="mt-12 text-center">
          <Link
            to="/shop?gender=women"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-xs"
          >
            <span>Open in Full Shop Catalogue with Advanced Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. THREE CURATIONS FOR HER (EDITORIAL STYLING GUIDE)
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 border-t border-[#E8DFD3]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
            <span>EDITORIAL STYLING GUIDE</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A101C] font-normal">
            Three Signature Ways to Wear Swarnika
          </h2>
          <p className="text-[#5E4A3B] text-xs sm:text-sm font-light mt-2 leading-relaxed">
            Thoughtfully paired heirlooms styled for memorable ceremonies, everyday refinement, and starlit celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-[#E8DFD3] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#A77B3D] font-semibold block mb-1">
                CURATION 01 · BRIDAL EDIT
              </span>
              <h3 className="font-serif-luxury text-lg text-[#4A101C] font-normal mb-2">
                The Festive Celebration
              </h3>
              <p className="text-xs text-[#5E4A3B] font-light leading-relaxed mb-4">
                Pair the opulent Aafreen Crescent Chandbalis with the Kashi Temple floral bangles for timeless
                traditional gravitas that elevates festive attire and special celebrations.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
              <span className="text-[#7A6655] font-medium">₹4,499 + ₹5,499</span>
              <Link
                to="/collections?edit=bridal"
                className="text-[#4A101C] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Bridal Edit</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E8DFD3] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#A77B3D] font-semibold block mb-1">
                CURATION 02 · MINIMAL STATEMENTS
              </span>
              <h3 className="font-serif-luxury text-lg text-[#4A101C] font-normal mb-2">
                Everyday Modern Luminance
              </h3>
              <p className="text-xs text-[#5E4A3B] font-light leading-relaxed mb-4">
                The lightweight Gulnaar Micro-Pavé Hoops worn alongside the Celeste Halo Solitaire ring. Designed to
                transition gracefully from workdays to evening outings.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
              <span className="text-[#7A6655] font-medium">₹2,999 + ₹4,199</span>
              <Link
                to="/collections?edit=minimal"
                className="text-[#4A101C] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Minimal Edit</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E8DFD3] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#A77B3D] font-semibold block mb-1">
                CURATION 03 · FESTIVE GOLD
              </span>
              <h3 className="font-serif-luxury text-lg text-[#4A101C] font-normal mb-2">
                Festive Occasion Elegance
              </h3>
              <p className="text-xs text-[#5E4A3B] font-light leading-relaxed mb-4">
                The Noor Heritage Dome Jhumkas balanced by the architectural shine of the Ziva Tennis Bracelet.
                A study in light reflection, movement, and festive radiance.
              </p>
            </div>
            <div className="pt-4 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
              <span className="text-[#7A6655] font-medium">₹3,899 + ₹4,899</span>
              <Link
                to="/collections?edit=festive"
                className="text-[#4A101C] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Festive Gold</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. RESTRAINED TRUST & SERVICE COMMITMENTS
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#E8DFD3] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Crown className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Thoughtful Craftsmanship
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Handcrafted jewellery featuring intricate stone settings and gold-toned finishes.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Truck className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Complimentary Delivery
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Free courier delivery across India on orders exceeding ₹2,999.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Gem className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Keepsake Packaging
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Signature presentation box designed to store your pieces with care.
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
