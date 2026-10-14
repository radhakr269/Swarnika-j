import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  Trash2,
} from 'lucide-react';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/product/ProductCard';
import { ROUTES } from '../config/navigation';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct, isInWishlist } = useShop();
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Resolve genuine product objects for each saved ID in wishlist
  const savedProducts = ALL_PRODUCTS.filter((product) => wishlist.includes(product.id));

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((current) => (current === product.id ? null : current));
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
            Wishlist
          </li>
        </ol>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          2. HEADER SECTION
          ───────────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8DFD3] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6655] font-medium mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
              <span>SAVED HEIRLOOMS</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#4A101C] font-normal leading-tight">
              Your Wishlist
            </h1>
          </div>

          <div className="text-xs text-[#7A6655]">
            {savedProducts.length === 1 ? (
              <span>
                <strong className="font-semibold text-[#201815]">1</strong> piece saved
              </span>
            ) : (
              <span>
                <strong className="font-semibold text-[#201815]">{savedProducts.length}</strong> pieces saved
              </span>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. PRODUCT GRID OR EMPTY STATE
            ───────────────────────────────────────────────────────────── */}
        {savedProducts.length > 0 ? (
          <div className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {savedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={true}
                  isJustAdded={justAddedId === product.id}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 pt-8 border-t border-[#E8DFD3] flex flex-wrap items-center justify-between gap-4">
              <Link
                to={ROUTES.SHOP}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#4A101C] hover:text-[#350B14] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue Exploring Catalogue</span>
              </Link>

              <span className="text-xs text-[#7A6655] font-light">
                Selections are preserved automatically in your browser.
              </span>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="py-16 sm:py-24 text-center max-w-lg mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF0E6] border border-[#E8DFD3] flex items-center justify-center text-[#4A101C] mb-5">
              <Heart className="w-7 h-7 stroke-[1.2]" />
            </div>

            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#4A101C] font-normal mb-3">
              Your Wishlist is Empty
            </h2>

            <p className="text-xs sm:text-sm text-[#5E4A3B] font-light leading-relaxed mb-8">
              You haven't saved any heirloom jewellery pieces yet. Browse our curated designs and tap the heart icon on any piece to save it here for later.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to={ROUTES.SHOP}
                className="px-6 py-3.5 bg-[#4A101C] hover:bg-[#350B14] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs"
              >
                Shop All Curations
              </Link>
              <Link
                to={ROUTES.WOMEN}
                className="px-5 py-3.5 bg-white border border-[#D5C2AD] hover:bg-[#FAF7F2] text-[#201815] text-xs uppercase tracking-[0.18em] font-medium transition-colors"
              >
                Women's Collection
              </Link>
              <Link
                to={ROUTES.MEN}
                className="px-5 py-3.5 bg-white border border-[#D5C2AD] hover:bg-[#FAF7F2] text-[#201815] text-xs uppercase tracking-[0.18em] font-medium transition-colors"
              >
                Men's Collection
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
