import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ArrowRight,
  AlertCircle,
  Shield,
  Ruler,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { getProductBySlug } from '../lib/productRoutes';
import { useShop } from '../context/ShopContext';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductCard } from '../components/product/ProductCard';
import { ROUTES } from '../config/navigation';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  // Resolve genuine product from canonical slug or ID
  const product = useMemo(() => getProductBySlug(slug, ALL_PRODUCTS), [slug]);

  // Selected variant state
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('14');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  // Related product click feedback
  const [relatedAddedId, setRelatedAddedId] = useState<string | null>(null);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedMetal(product.metals[0] || '18K Gold Plated');
      setQuantity(1);
      setAdded(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  // Dynamic SEO metadata & JSON-LD
  useEffect(() => {
    if (!product) {
      document.title = 'Product Not Found | SWARNIKA';
      return;
    }

    document.title = `${product.name} | SWARNIKA Fine Jewellery`;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute('content', product.description);
    }

    // Set Product JSON-LD structured data
    const scriptId = 'swarnika-product-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLdData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.name,
      image: [product.image, product.modelImage],
      description: product.description,
      sku: product.id,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: product.price,
        availability: product.inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
    };
    script.textContent = JSON.stringify(jsonLdData);

    return () => {
      document.title = 'SWARNIKA | Timeless Jewellery, Crafted to Be Seen';
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [product]);

  // Handle Add to Bag
  const handleAddToCart = () => {
    if (!product || !product.inStock) return;
    addToCart(
      product,
      quantity,
      selectedMetal,
      product.category === 'rings' ? selectedSize : undefined
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same category or gender, excluding current product, max 4)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCat = ALL_PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    if (sameCat.length >= 4) return sameCat.slice(0, 4);

    const sameGender = ALL_PRODUCTS.filter(
      (p) => p.id !== product.id && p.gender === product.gender && !sameCat.some((c) => c.id === p.id)
    );
    return [...sameCat, ...sameGender].slice(0, 4);
  }, [product]);

  // ─────────────────────────────────────────────────────────────────
  // 404 NOT FOUND STATE
  // ─────────────────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="min-h-[60vh] py-16 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#FAF0E6] border border-[#E8DFD3] flex items-center justify-center text-[#4A101C] mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#4A101C] mb-3">
          Piece Not Found
        </h1>
        <p className="text-sm text-[#6C5849] font-light max-w-md mb-8 leading-relaxed">
          The requested jewellery heirloom could not be located in our current catalogue. It may have been archived or moved to another curated collection.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to={ROUTES.SHOP}
            className="px-6 py-3 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs"
          >
            Explore Catalogue
          </Link>
          <Link
            to={ROUTES.HOME}
            className="px-6 py-3 bg-white border border-[#D5C2AD] text-[#201815] text-xs uppercase tracking-[0.18em] font-medium transition-colors hover:bg-[#FAF7F2]"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen text-[#201815]">
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS
          ───────────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 pb-2">
        <ol className="flex items-center gap-1.5 text-xs text-[#7A6655] font-light overflow-x-auto whitespace-nowrap">
          <li>
            <Link to={ROUTES.HOME} className="hover:text-[#4A101C] transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3 h-3 text-[#BFAFA0]" />
          </li>
          <li>
            <Link
              to={`/category/${product.category}`}
              className="hover:text-[#4A101C] transition-colors capitalize"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-3 h-3 text-[#BFAFA0]" />
          </li>
          <li className="font-medium text-[#4A101C] truncate max-w-[200px] sm:max-w-none" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. PRODUCT ATELIER: MAIN GALLERY & PURCHASE MODULE
          Desktop: 56% Gallery / 44% Info split
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Photographic Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Information & Purchase Module (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-24">
            {/* Header info */}
            <div className="space-y-2 border-b border-[#E8DFD3] pb-5">
              <div className="flex items-center justify-between text-xs text-[#7A6655] uppercase tracking-[0.2em]">
                <span className="font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#A77B3D]" />
                  SWARNIKA ATELIER
                </span>
                <span className="text-[11px] font-mono text-[#8C7662]">
                  PIECE ID: {product.id}
                </span>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#4A101C] font-normal leading-tight text-balance">
                {product.name}
              </h1>

              {/* Price block */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#201815] font-medium tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-[#8C7662] line-through tabular-nums font-light">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] font-medium text-[#2E6B3E] uppercase tracking-wider">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {/* Stock status indicator */}
              <div className="pt-1">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#2E6B3E] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#2E6B3E]" aria-hidden="true" />
                    Available in Atelier
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#9B2C2C] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#9B2C2C]" aria-hidden="true" />
                    Currently Sold Out
                  </span>
                )}
              </div>
            </div>

            {/* Genuine Description */}
            <p className="text-sm text-[#5E4A3B] font-light leading-relaxed">
              {product.description}
            </p>

            {/* Variant Selector: Metal Finish */}
            {product.metals && product.metals.length > 0 && (
              <div className="space-y-2 border-t border-[#E8DFD3] pt-4">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#201815] flex items-center justify-between">
                  <span>Precious Metal Finish:</span>
                  <span className="text-[#4A101C] font-normal">{selectedMetal}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.metals.map((metal) => {
                    const isSelected = selectedMetal === metal;
                    return (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-2 text-xs transition-colors cursor-pointer border ${
                          isSelected
                            ? 'bg-[#FAF7F2] border-[#4A101C] text-[#4A101C] font-semibold ring-1 ring-[#4A101C]'
                            : 'bg-white border-[#D5C2AD] text-[#5E4A3B] hover:border-[#4A101C]'
                        }`}
                      >
                        {metal}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizing Context if Category is Rings */}
            {product.category === 'rings' && (
              <div className="space-y-2 border-t border-[#E8DFD3] pt-4">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="ring-size-select" className="uppercase tracking-wider font-semibold text-[#201815]">
                    Standard Ring Size:
                  </label>
                  <span className="text-[11px] text-[#7A6655] font-light">
                    Size confirmation upon dispatch
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {['10', '12', '14', '16', '18', '20'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 text-xs transition-colors cursor-pointer border ${
                        selectedSize === size
                          ? 'bg-[#4A101C] text-white border-[#4A101C] font-semibold'
                          : 'bg-white border-[#D5C2AD] text-[#5E4A3B] hover:border-[#4A101C]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 border-t border-[#E8DFD3] pt-5">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-[#D5C2AD] bg-white">
                  <button
                    type="button"
                    disabled={quantity <= 1 || !product.inStock}
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-11 flex items-center justify-center text-sm font-medium hover:bg-[#FAF7F2] disabled:opacity-40 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-semibold tabular-nums text-[#201815]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={!product.inStock}
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-11 flex items-center justify-center text-sm font-medium hover:bg-[#FAF7F2] disabled:opacity-40 transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Bag Button */}
                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-6 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    !product.inStock
                      ? 'bg-[#EAE0D3] text-[#8C7662] cursor-not-allowed border border-[#D5C6B5]'
                      : added
                      ? 'bg-[#2E6B3E] text-white border border-[#2E6B3E]'
                      : 'bg-[#4A101C] hover:bg-[#350B14] text-white border border-[#4A101C]'
                  }`}
                  aria-label={
                    !product.inStock
                      ? `${product.name} is sold out`
                      : added
                      ? 'Added to shopping bag'
                      : `Add ${product.name} to shopping bag`
                  }
                >
                  {!product.inStock ? (
                    <span>Sold Out</span>
                  ) : added ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className={`w-11 h-11 flex items-center justify-center border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-[#FAF0E6] border-[#4A101C] text-[#4A101C]'
                      : 'bg-white border-[#D5C2AD] text-[#201815] hover:text-[#4A101C] hover:border-[#4A101C]'
                  }`}
                  aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform active:scale-125 ${
                      isSaved ? 'fill-[#4A101C] text-[#4A101C]' : 'stroke-[#201815] stroke-[1.5]'
                    }`}
                  />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-[#7A6655]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#A77B3D] shrink-0" />
                  <span>Complimentary Shipping &gt; ₹2,999</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#A77B3D] shrink-0" />
                  <span>7-Day Return Inspection</span>
                </div>
              </div>
            </div>

            {/* Restrained Accordions */}
            <div className="border-t border-[#E8DFD3] pt-2 divide-y divide-[#E8DFD3]">
              {/* Accordion 1: Craftsmanship & Materials */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'materials' ? null : 'materials')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#201815] text-left cursor-pointer"
                >
                  <span>Artisanal Details & Materials</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A6655] transition-transform ${
                      openAccordion === 'materials' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'materials' && (
                  <div className="pb-4 text-xs text-[#5E4A3B] font-light leading-relaxed space-y-1.5">
                    <p>
                      <strong className="font-semibold text-[#201815]">Category:</strong>{' '}
                      <span className="capitalize">{product.category}</span>
                    </p>
                    <p>
                      <strong className="font-semibold text-[#201815]">Metal Finishes:</strong>{' '}
                      {product.metals.join(', ')}
                    </p>
                    <p>
                      <strong className="font-semibold text-[#201815]">Design Notes:</strong>{' '}
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care Guidance */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#201815] text-left cursor-pointer"
                >
                  <span>Jewellery Care Guidance</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A6655] transition-transform ${
                      openAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-[#5E4A3B] font-light leading-relaxed space-y-1">
                    <p>• Avoid direct contact with perfumes, sanitizers, and harsh household chemicals.</p>
                    <p>• Remove before swimming or rigorous exercise to preserve the lustrous finish.</p>
                    <p>• Store individually in our signature velvet keepsake box when not in use.</p>
                    <p>• Clean gently with a soft microfibre cloth after wearing.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery & Returns */}
              <div>
                <button
                  type="button"
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#201815] text-left cursor-pointer"
                >
                  <span>Delivery & Inspection Policy</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A6655] transition-transform ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#5E4A3B] font-light leading-relaxed space-y-1">
                    <p>• Complimentary courier shipping across India on orders exceeding ₹2,999.</p>
                    <p>• Dispatched in discreet, tamper-evident security cartons.</p>
                    <p>• 7-day doorstep return inspection with dedicated pickup assistance.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. RELATED PIECES ("DISCOVER MORE PIECES")
          ───────────────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 border-t border-[#E8DFD3]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium mb-1">
                <span>CURATED RECOMMENDATIONS</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A101C] font-normal">
                Discover More Pieces
              </h2>
            </div>
            <Link
              to={`/category/${product.category}`}
              className="text-xs uppercase tracking-[0.16em] text-[#4A101C] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                product={relProduct}
                isInWishlist={isInWishlist(relProduct.id)}
                isJustAdded={relatedAddedId === relProduct.id}
                onAddToCart={(p, e) => {
                  e.stopPropagation();
                  addToCart(p, 1);
                  setRelatedAddedId(p.id);
                  setTimeout(() => setRelatedAddedId(null), 1800);
                }}
                onToggleWishlist={(pId, e) => {
                  e.stopPropagation();
                  toggleWishlist(pId);
                }}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
