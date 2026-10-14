import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
  Calendar,
  Check,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { ROUTES } from '../config/navigation';

type CollectionTab = 'all' | 'bridal' | 'everyday' | 'mens' | 'solitaires';

interface CollectionSuite {
  id: CollectionTab;
  title: string;
  eyebrow: string;
  narrative: string;
  image: string;
  productIds: string[];
  ctaLabel: string;
  ctaLink: string;
}

export const CollectionsLandingPage: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [activeTab, setActiveTab] = useState<CollectionTab>('all');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [conciergeSubmitted, setConciergeSubmitted] = useState(false);
  const [conciergeForm, setConciergeForm] = useState({
    name: '',
    phone: '',
    occasion: 'Bridal & Wedding',
    date: '',
  });

  // Four signature curated suites
  const suites: CollectionSuite[] = [
    {
      id: 'bridal',
      title: 'The Royal Bridal & Festive Suite',
      eyebrow: 'CHAPTER 01 · VIVAH & HIGH CELEBRATION',
      narrative:
        'A regal assembly of uncut polki chandbalis, handcrafted chokers, temple bangles, and sacred mangalsutras created to honor life’s most auspicious ceremonies with imperial grandeur.',
      image: '/assist/image/banners/promo_bridal.jpg',
      productIds: ['P17', 'P06', 'P18', 'P07', 'P16'],
      ctaLabel: 'Shop All Bridal Heirlooms',
      ctaLink: '/shop?category=necklaces',
    },
    {
      id: 'everyday',
      title: 'Modern Everyday Luxe Edit',
      eyebrow: 'CHAPTER 02 · EFFORTLESS DAILY RADIANCE',
      narrative:
        'Featherlight micro-pavé hoops, diamond studs, and architectural tennis bracelets designed to layer seamlessly from morning boardroom presentations to candlelit evenings.',
      image: '/assist/image/banners/promo_everyday.jpg',
      productIds: ['P10', 'P09', 'P14', 'P12', 'P15'],
      ctaLabel: 'Shop Everyday Essentials',
      ctaLink: '/shop?category=earrings',
    },
    {
      id: 'mens',
      title: 'The Men’s Armoury',
      eyebrow: 'CHAPTER 03 · INDUSTRIAL PRECISION & POWER',
      narrative:
        'Heavy-gauge 7mm Cuban chains, mirror-polished maritime link bracelets, solar crest signet rings, and Grade 5 titanium open cuffs engineered with commanding weight and zero-tarnish durability.',
      image: '/assist/image/models/P19_Veer_Classic_Chain_Model.jpg',
      productIds: ['P19', 'P21', 'P22', 'P24', 'P20'],
      ctaLabel: 'Shop The Complete Men’s Armoury',
      ctaLink: '/men',
    },
    {
      id: 'solitaires',
      title: 'Sacred Vows & Eternal Rings',
      eyebrow: 'CHAPTER 04 · PROMISES SET IN GOLD',
      narrative:
        'Brilliant halo solitaires, floral cluster cocktail rings, ergonomic chamfered comfort bands, and modern mangalsutras crafted as permanent physical tokens of unwavering love.',
      image: '/assist/image/categories/engagement.jpg',
      productIds: ['P11', 'P25', 'P12', 'P16', 'P13'],
      ctaLabel: 'Shop Rings & Solitaires',
      ctaLink: '/category/rings',
    },
  ];

  const filteredSuites = useMemo(() => {
    if (activeTab === 'all') return suites;
    return suites.filter((s) => s.id === activeTab);
  }, [activeTab]);

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

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeForm.name || !conciergeForm.phone) return;
    setConciergeSubmitted(true);
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
            Each collection explores a distinct thematic chapter in precious metal craft—from high-ceremonial
            Jaipur bridal sets to contemporary architectural chains and daily solitaires.
          </p>
        </div>

        {/* Suite Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-[#E8DFD3] inline-flex shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            All 4 Suites
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('bridal')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'bridal'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            The Royal Bridal Suite
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('everyday')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'everyday'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            Modern Everyday Luxe
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mens')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'mens'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            The Men’s Armoury
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('solitaires')}
            className={`px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'solitaires'
                ? 'bg-[#4A101C] text-white shadow-2xs'
                : 'text-[#5E4A3B] hover:text-[#4A101C]'
            }`}
          >
            Sacred Vows & Rings
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. SUITE-BY-SUITE EDITORIAL SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-16 sm:space-y-24 py-8">
        {filteredSuites.map((suite, idx) => {
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
                        CURATED ATELIER
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
                      {suite.narrative}
                    </p>

                    <div className="pt-2 flex items-center gap-4">
                      <Link
                        to={suite.ctaLink}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs"
                      >
                        <span>{suite.ctaLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <span className="text-xs text-[#7A6655]">
                        {suiteProducts.length} Featured Heirlooms
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Suite Product Grid: 4 or 5 responsive columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
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
          4. BESPOKE BRIDAL & ATELIER CONCIERGE SERVICE
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="bg-[#1F1916] text-[#FAF7F2] border border-[#3E322C] p-6 sm:p-10 lg:p-14 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story text */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
                <Gem className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>PRIVATE CLIENT SERVICES</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] font-normal leading-tight">
                Bespoke Bridal Trousseau & High-Jewellery Concierge
              </h2>

              <p className="text-[#C8BDB6] text-sm font-light leading-relaxed">
                Planning your wedding, an anniversary gift, or an imperial family heirloom? Our Jaipur master
                stylists provide complimentary 1-on-1 virtual or in-person consultation to coordinate gemstone
                carats, neck drops, and custom hallmark certifications.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#C8BDB6]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Certified BIS Hallmarks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-[#C5A059]" />
                  <span>Jaipur Master Karigars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C5A059]" />
                  <span>White-Glove Delivery</span>
                </div>
              </div>
            </div>

            {/* Interactive Appointment Form */}
            <div className="lg:col-span-6 bg-[#2B231F] border border-[#483B34] p-6 sm:p-8">
              {conciergeSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#2E6B3E] text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-xl text-[#FAF7F2]">
                    Concierge Appointment Reserved
                  </h3>
                  <p className="text-xs text-[#C8BDB6] max-w-sm mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{conciergeForm.name}</span>. Our senior
                    jewellery advisor will contact you at{' '}
                    <span className="font-semibold text-white">{conciergeForm.phone}</span> within 2 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setConciergeSubmitted(false);
                      setConciergeForm({ name: '', phone: '', occasion: 'Bridal & Wedding', date: '' });
                    }}
                    className="text-xs text-[#C5A059] underline hover:text-white cursor-pointer mt-2"
                  >
                    Submit another consultation request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleConciergeSubmit} className="space-y-4">
                  <h3 className="font-serif-luxury text-lg text-[#FAF7F2] font-normal">
                    Reserve Private Consultation
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C8BDB6] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={conciergeForm.name}
                        onChange={(e) => setConciergeForm({ ...conciergeForm, name: e.target.value })}
                        placeholder="e.g. Maharani Gayatri Devi"
                        className="w-full bg-[#1C1715] border border-[#483B34] text-[#FAF7F2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#C5A059]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C8BDB6] mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={conciergeForm.phone}
                        onChange={(e) => setConciergeForm({ ...conciergeForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-[#1C1715] border border-[#483B34] text-[#FAF7F2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#C5A059]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C8BDB6] mb-1">
                        Occasion
                      </label>
                      <select
                        value={conciergeForm.occasion}
                        onChange={(e) => setConciergeForm({ ...conciergeForm, occasion: e.target.value })}
                        className="w-full bg-[#1C1715] border border-[#483B34] text-[#FAF7F2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#C5A059] cursor-pointer"
                      >
                        <option value="Bridal & Wedding">Bridal & Wedding Trousseau</option>
                        <option value="Anniversary Gift">Anniversary & Milestone Gift</option>
                        <option value="Men's Bespoke">Men's Bespoke Chains & Cuffs</option>
                        <option value="Custom Solitaire">Custom Solitaire & Rings</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#C8BDB6] mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={conciergeForm.date}
                        onChange={(e) => setConciergeForm({ ...conciergeForm, date: e.target.value })}
                        className="w-full bg-[#1C1715] border border-[#483B34] text-[#FAF7F2] px-3 py-2 text-xs focus:outline-hidden focus:border-[#C5A059] cursor-pointer"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#C5A059] hover:bg-[#B38F48] text-[#1C1715] text-xs uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer"
                  >
                    Request Bespoke Appointment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. LUXURY TRUST COMMITMENTS
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-[#E8DFD3] py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Hallmark Certified
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Every precious stone and 18K gold layer is independently verified and hallmarked.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Truck className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Discreet Insured Transit
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Shipped in unmarked, tamper-evident security cartons with GPS tracking.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Gem className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Handmade Keepsake Box
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Handmade velvet chests designed to protect your jewels for generations.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <RotateCcw className="w-6 h-6 text-[#A77B3D]" />
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#201815]">
              Doorstep Exchanges
            </h4>
            <p className="text-[11px] text-[#7A6655] font-light max-w-xs">
              Effortless exchanges and sizing services across over 19,000 pincodes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
