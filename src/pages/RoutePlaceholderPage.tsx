import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Sparkles, Clock, ShoppingBag } from 'lucide-react';
import { SwarnikaLogo } from '../components/brand/SwarnikaLogo';
import { ROUTES } from '../config/navigation';
import { useShop } from '../context/ShopContext';

interface RoutePlaceholderProps {
  pageTitle?: string;
  phaseScheduled?: string;
  description?: string;
}

export const RoutePlaceholderPage: React.FC<RoutePlaceholderProps> = ({
  pageTitle,
  phaseScheduled,
  description,
}) => {
  const { slug, orderId } = useParams<{ slug?: string; orderId?: string }>();
  const location = useLocation();
  const { setSelectedCategory, setIsCartOpen } = useShop();

  // Determine title and phase dynamically based on current path
  const path = location.pathname;
  let resolvedTitle = pageTitle;
  let resolvedPhase = phaseScheduled;
  let resolvedDesc = description;

  if (!resolvedTitle) {
    if (path.startsWith('/shop')) {
      resolvedTitle = 'Shop All Curations';
      resolvedPhase = 'Phase 4: Complete Catalogue Architecture & Filtering';
      resolvedDesc = 'A full-page responsive grid with advanced multi-tier facet filters, karat selections, and sorting.';
    } else if (path.startsWith('/women')) {
      resolvedTitle = "Women's Royal Collection";
      resolvedPhase = 'Phase 4: Category Architecture';
      resolvedDesc = 'Curated heritage jhumkas, bridal necklaces, polki chandbalis, and everyday gold hoops.';
    } else if (path.startsWith('/men')) {
      resolvedTitle = "Men's Modern Strength";
      resolvedPhase = 'Phase 4: Category Architecture';
      resolvedDesc = 'Heavyweight Cuban chains, diamond-cut rope chains, signet rings, and link bracelets.';
    } else if (path.startsWith('/collections')) {
      resolvedTitle = 'Curated Collections';
      resolvedPhase = 'Phase 5: Curated Editorial Collections';
      resolvedDesc = 'Bridal suites, eternal engagement bands, everyday heirlooms, and gift edits.';
    } else if (path.startsWith('/category/')) {
      const formattedSlug = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category';
      resolvedTitle = `${formattedSlug} Collection`;
      resolvedPhase = 'Phase 4: Category Architecture';
      resolvedDesc = `Exclusive handcrafted ${slug || 'jewellery'} designs with refined 18K gold-plated finishes.`;
    } else if (path.startsWith('/product/')) {
      resolvedTitle = 'Product Details Atelier';
      resolvedPhase = 'Phase 6: Dedicated Product Page';
      resolvedDesc = `Comprehensive multi-angle zoom gallery, karat specifications, certified weights, and customer reviews.`;
    } else if (path.startsWith('/wishlist')) {
      resolvedTitle = 'Curated Wishlist';
      resolvedPhase = 'Phase 7: Full-Page Saved Heirlooms';
      resolvedDesc = 'Review and manage your saved bespoke jewellery pieces across multiple devices.';
    } else if (path.startsWith('/cart')) {
      resolvedTitle = 'Shopping Bag';
      resolvedPhase = 'Phase 7: Dedicated Cart Architecture';
      resolvedDesc = 'Detailed line items, insurance verification, and complimentary packaging preferences.';
    } else if (path.startsWith('/checkout')) {
      resolvedTitle = 'Checkout & Secure Acquisition';
      resolvedPhase = 'Phase 8: Verified Checkout & Payment Integration';
      resolvedDesc = 'Secure checkout with address validation, GST compliance, and certified payment gateway.';
    } else if (path.startsWith('/account/orders')) {
      resolvedTitle = orderId ? `Order #${orderId} Details` : 'Acquisition History & Orders';
      resolvedPhase = 'Phase 8: Customer Account & Order Tracking';
      resolvedDesc = 'Track real-time courier dispatch status, download tax invoices, and manage returns.';
    } else if (path.startsWith('/account')) {
      resolvedTitle = 'Customer Concierge Account';
      resolvedPhase = 'Phase 8: Customer Account & Profile';
      resolvedDesc = 'Manage personal addresses, saved ring sizes, anniversary reminders, and VIP tier.';
    } else {
      resolvedTitle = 'Page Under Development';
      resolvedPhase = 'Scheduled in Swarnika Multi-Phase Roadmap';
      resolvedDesc = 'This route is architected and will be styled in its designated implementation phase.';
    }
  }

  const handleReturnToCategory = (cat: string) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="min-h-[60vh] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      {/* Brand Emblem */}
      <div className="mb-4">
        <SwarnikaLogo size="lg" animateHover={false} />
      </div>

      {/* Development Scaffolding Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F4EDE4] border border-[#E0D2C2] text-[#4A1622] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold mb-3">
        <Clock className="w-3.5 h-3.5" />
        <span>Architectural Scaffold • {resolvedPhase}</span>
      </div>

      {/* Page Title */}
      <h1 className="font-serif-luxury text-2xl sm:text-4xl lg:text-5xl text-[#201815] font-normal tracking-tight mb-3">
        {resolvedTitle}
      </h1>

      {/* Description */}
      <p className="text-xs sm:text-sm md:text-base text-[#6E5746] max-w-xl font-light leading-relaxed mb-6">
        {resolvedDesc}
      </p>

      {/* Route Info Box */}
      <div className="p-3 bg-white border border-[#E8DED1] text-left text-xs font-mono text-[#554336] max-w-md w-full mb-8 shadow-xs">
        <div className="flex justify-between border-b border-[#F0E6D8] pb-1.5 mb-1.5 text-[11px]">
          <span className="font-sans font-semibold text-[#8C7662]">Current Path:</span>
          <span className="text-[#4A1622]">{location.pathname}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="font-sans font-semibold text-[#8C7662]">Status:</span>
          <span className="text-[#2E6B3E] font-sans font-medium">Route Connected & Active</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Storefront</span>
        </Link>

        {path.startsWith('/checkout') || path.startsWith('/cart') ? (
          <button
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D5C2AD] hover:bg-[#F2E8DC] text-[#201815] text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#4A1622]" />
            <span>Open Shopping Bag</span>
          </button>
        ) : (
          <Link
            to={ROUTES.HOME}
            onClick={() => handleReturnToCategory('all')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D5C2AD] hover:bg-[#F2E8DC] text-[#201815] text-xs uppercase tracking-[0.18em] font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
            <span>Browse All 20 Heirlooms</span>
          </Link>
        )}
      </div>
    </div>
  );
};
