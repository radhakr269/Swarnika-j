import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Droplets,
  Ruler,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { ROUTES } from '../config/navigation';

type MenCategoryTab = 'all' | 'chains' | 'bracelets' | 'rings';
type MenSortOption = 'featured' | 'low-high' | 'high-low' | 'name-asc';

export const MenLandingPage: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [selectedSubcategory, setSelectedSubcategory] = useState<MenCategoryTab>('all');
  const [sortBy, setSortBy] = useState<MenSortOption>('featured');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // All Men's products in catalogue (7 items)
  const menProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.gender === 'men');
  }, []);

  // Filtered & Sorted Men's products
  const displayedProducts = useMemo(() => {
    let list = [...menProducts];

    if (selectedSubcategory === 'chains') {
      list = list.filter((p) => p.category === 'necklaces');
    } else if (selectedSubcategory === 'bracelets') {
      list = list.filter((p) => p.category === 'bracelets');
    } else if (selectedSubcategory === 'rings') {
      list = list.filter((p) => p.category === 'rings');
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
  }, [menProducts, selectedSubcategory, sortBy]);

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
            Men
          </li>
        </ol>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. EDITORIAL HERO BANNER: ARCHITECTURAL & MASCULINE
          ───────────────────────────────────────────────────────────── */}
      <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="bg-[#1C1715] text-[#FAF7F2] border border-[#382E2A] shadow-xs overflow-hidden flex flex-col lg:flex-row items-stretch">
          {/* Left Text / Editorial Content */}
          <div className="lg:w-[50%] p-6 sm:p-10 lg:p-14 flex flex-col justify-center space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C5A059] font-medium">
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>THE MEN'S EDIT</span>
              <span className="w-8 h-[1px] bg-[#5A4A42]" aria-hidden="true" />
              <span>MODERN STRENGTH</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-normal leading-[1.12] text-balance">
              Architectural Precision, Forged in Precious Metals
            </h1>

            <p className="text-[#C8BDB6] text-sm sm:text-base font-light leading-relaxed max-w-xl">
              Engineered with substantial weight and clean geometric profiles. Explore heavy-gauge Cuban chains,
              diamond-cut French ropes, solar crest signet rings, and Grade 5 titanium cuffs.
            </p>

            {/* Quick Filter Navigation */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedSubcategory('chains')}
                className="px-3.5 py-2 bg-[#2B231F] hover:bg-[#3D322C] border border-[#4D3F37] text-[#FAF7F2] transition-colors font-medium cursor-pointer"
              >
                Chains & Pendants
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubcategory('bracelets')}
                className="px-3.5 py-2 bg-[#2B231F] hover:bg-[#3D322C] border border-[#4D3F37] text-[#FAF7F2] transition-colors font-medium cursor-pointer"
              >
                Cuffs & Link Bracelets
              </button>
              <button
                type="button"
                onClick={() => setSelectedSubcategory('rings')}
                className="px-3.5 py-2 bg-[#2B231F] hover:bg-[#3D322C] border border-[#4D3F37] text-[#FAF7F2] transition-colors font-medium cursor-pointer"
              >
                Signet Rings & Bands
              </button>
            </div>
          </div>

          {/* Right Campaign Imagery */}
          <div className="lg:w-[50%] min-h-[300px] sm:min-h-[420px] relative overflow-hidden bg-[#241E1B]">
            <img
              src="/assist/image/models/P19_Veer_Classic_Chain_Model.jpg"
              alt="Model wearing Veer Classic Cuban chain in 18k yellow gold polish with bespoke tailoring"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white z-10">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-light block text-[#C5A059]">
                SIGNATURE MASTERPIECE
              </span>
              <p className="font-serif-luxury text-lg sm:text-xl font-normal">
                Veer 7mm Diamond-Cut Cuban Curb Chain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ATELIER HIGHLIGHT: ENGINEERED FOR RESILIENCE
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
        <div className="bg-white border border-[#E8DFD3] p-6 sm:p-10 lg:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Box */}
            <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden bg-[#EAE0D3] shadow-xs">
              <img
                src="/assist/image/products/P21_Kabir_Link_Bracelet_Product.jpg"
                alt="Kabir Bold Mariner link bracelet detailing mirror-polished push clasp and solid surgical steel core"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1C1715] text-[#C5A059] text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-semibold border border-[#C5A059]/40">
                INDUSTRIAL PRECISION
              </div>
            </div>

            {/* Editorial Story */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A77B3D]" />
                <span>METALLURGY & INDUSTRIAL INTEGRITY</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#4A101C] font-normal leading-tight">
                Solid Hypoallergenic Core with 18K Heavy Electroplate
              </h2>

              <p className="text-[#5E4A3B] text-sm sm:text-[15px] font-light leading-relaxed">
                Men's jewellery must withstand daily life. Every chain and cuff begins with a core of solid 316L
                surgical stainless steel or aerospace Grade 5 titanium, machined to micron tolerances. We then apply
                an ultra-dense 18K yellow gold vacuum deposit followed by our invisible hydrophobic seal. The result:
                sweat-proof, shower-safe, anti-tarnish luxury that never stains your skin.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD3]">
                  <Droplets className="w-5 h-5 text-[#A77B3D] mx-auto mb-1" />
                  <span className="font-serif-luxury text-sm sm:text-base text-[#201815] block font-normal">
                    Sweat & Shower Proof
                  </span>
                  <span className="text-[10px] text-[#7A6655] uppercase tracking-wider block mt-0.5">
                    Zero Tarnish Coating
                  </span>
                </div>
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD3]">
                  <ShieldCheck className="w-5 h-5 text-[#A77B3D] mx-auto mb-1" />
                  <span className="font-serif-luxury text-sm sm:text-base text-[#201815] block font-normal">
                    Solid Steel & Titanium
                  </span>
                  <span className="text-[10px] text-[#7A6655] uppercase tracking-wider block mt-0.5">
                    Substantial Weight
                  </span>
                </div>
                <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD3]">
                  <CheckCircle2 className="w-5 h-5 text-[#A77B3D] mx-auto mb-1" />
                  <span className="font-serif-luxury text-sm sm:text-base text-[#201815] block font-normal">
                    Precision Clasps
                  </span>
                  <span className="text-[10px] text-[#7A6655] uppercase tracking-wider block mt-0.5">
                    Double-Safety Push Lock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE CURATED MEN'S PRODUCT SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-12 border-t border-[#E8DFD3]">
        {/* Section Header & Subcategory Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium mb-1">
              <span>THE COMPLETE MEN'S ARMOURY</span>
              <span className="w-6 h-[1px] bg-[#BFAFA0]" aria-hidden="true" />
              <span>{displayedProducts.length} DESIGNS</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A101C] font-normal">
              Heirlooms of Power & Distinction
            </h2>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white border border-[#E8DFD3] shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedSubcategory('all')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'all'
                  ? 'bg-[#1C1715] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#1C1715]'
              }`}
            >
              All Pieces ({menProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('chains')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'chains'
                  ? 'bg-[#1C1715] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#1C1715]'
              }`}
            >
              Chains & Pendants (3)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('bracelets')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'bracelets'
                  ? 'bg-[#1C1715] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#1C1715]'
              }`}
            >
              Bracelets & Cuffs (2)
            </button>
            <button
              type="button"
              onClick={() => setSelectedSubcategory('rings')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedSubcategory === 'rings'
                  ? 'bg-[#1C1715] text-white shadow-2xs'
                  : 'text-[#5E4A3B] hover:text-[#1C1715]'
              }`}
            >
              Rings & Bands (2)
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
            <label htmlFor="men-sort" className="font-medium text-[#5E4A3B]">
              Sort by:
            </label>
            <select
              id="men-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as MenSortOption)}
              className="bg-white border border-[#D5C2AD] text-[#201815] text-xs py-1.5 px-3 focus:outline-hidden focus:ring-1 focus:ring-[#1C1715] cursor-pointer"
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
            to="/shop?gender=men"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1C1715] hover:bg-[#2C2320] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-xs"
          >
            <span>Open in Full Shop Catalogue with Advanced Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. MEN'S PROPORTION & CHAIN SIZING GUIDE
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 border-t border-[#E8DFD3]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium mb-1">
            <Ruler className="w-3.5 h-3.5 text-[#A77B3D]" />
            <span>FIT & PROPORTION PROTOCOL</span>
          </div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A101C] font-normal">
            The Men’s Chain Length & Sizing Guide
          </h2>
          <p className="text-[#5E4A3B] text-xs sm:text-sm font-light mt-2 leading-relaxed">
            Choose the exact drop length tailored to your neck size, daily wardrobe, and layering style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 20 Inch */}
          <div className="bg-white border border-[#E8DFD3] p-6 shadow-2xs">
            <span className="font-serif-luxury text-2xl text-[#1C1715] block mb-1">
              20 Inch (50 cm)
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#A77B3D] font-semibold block mb-3">
              COLLAR DROP
            </span>
            <p className="text-xs text-[#5E4A3B] font-light leading-relaxed mb-4">
              Rests cleanly at the base of the collarbone. Visible with an unbuttoned shirt collar or worn over
              fitted crewnecks. Best suited for smaller to medium neck circumferences.
            </p>
            <div className="text-xs font-medium text-[#201815] bg-[#FAF7F2] p-2.5 border border-[#E8DFD3]">
              Featured on: <span className="font-semibold text-[#4A101C]">Veer Cuban Curb Chain</span>
            </div>
          </div>

          {/* 22 Inch */}
          <div className="bg-white border border-[#E8DFD3] p-6 shadow-2xs">
            <span className="font-serif-luxury text-2xl text-[#1C1715] block mb-1">
              22 Inch (55 cm)
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#A77B3D] font-semibold block mb-3">
              MID-CHEST (MOST POPULAR)
            </span>
            <p className="text-xs text-[#5E4A3B] font-light leading-relaxed mb-4">
              Falls midway down the chest. The universally flattering length for standalone rope chains,
              architectural amulets, and layered combinations.
            </p>
            <div className="text-xs font-medium text-[#201815] bg-[#FAF7F2] p-2.5 border border-[#E8DFD3]">
              Featured on: <span className="font-semibold text-[#4A101C]">Arjun Rope & Samar Pendant</span>
            </div>
          </div>

          {/* 24 Inch */}
          <div className="bg-white border border-[#E8DFD3] p-6 shadow-2xs">
            <span className="font-serif-luxury text-2xl text-[#1C1715] block mb-1">
              24 Inch (60 cm)
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#A77B3D] font-semibold block mb-3">
              STATEMENT DROP
            </span>
            <p className="text-xs text-[#5E4A3B] font-light leading-relaxed mb-4">
              Reaches the sternum. Imparts a relaxed, confident weight that sits comfortably over hoodies,
              heavy knitwear, and open tailoring.
            </p>
            <div className="text-xs font-medium text-[#201815] bg-[#FAF7F2] p-2.5 border border-[#E8DFD3]">
              Featured on: <span className="font-semibold text-[#4A101C]">Layered Chains & Heavy Amulets</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. LUXURY TRUST & SERVICE COMMITMENTS
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#E8DFD3] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Droplets className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Waterproof & Sweat-Proof
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Nano-sealed to resist sweat, chlorine, and salt without tarnishing or turning green.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Hypoallergenic Core
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Surgical 316L steel and Grade 5 titanium. 100% skin-safe for sensitive skin.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Truck className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Insured Transit
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Full value door-to-door transit insurance with tamper-evident packaging.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <RotateCcw className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Lifetime Replating Warranty
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Complimentary replating service guarantees your heirloom retains its brilliant shine forever.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
