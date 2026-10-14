/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { SwarnikaNavbar } from './components/SwarnikaNavbar';
import { SwarnikaHero } from './components/SwarnikaHero';
import { SwarnikaValueProps } from './components/SwarnikaValueProps';
import { SwarnikaCategories } from './components/SwarnikaCategories';
import { SwarnikaBestsellers } from './components/SwarnikaBestsellers';
import { DualPromoBanner } from './components/DualPromoBanner';
import { OurStorySection } from './components/OurStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InstagramCommunitySection } from './components/InstagramCommunitySection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { StoryModal } from './components/StoryModal';
import { ToastContainer } from './components/ToastContainer';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FAF7F2] text-[#201815] flex flex-col font-sans-luxury pb-14 md:pb-0">
        {/* Main Header with Logo on the left of SWARNIKA (No pop-up above header) */}
        <SwarnikaNavbar />

        {/* Main Storefront Sections */}
        <main className="flex-1 w-full">
          {/* Section 1: Hero Section (Matching CSS Selectors 1 & 2, Edge-to-Edge, exact proportions) */}
          <SwarnikaHero />

          {/* Section 2: Value Proposition Strip (Matching CSS Selectors 3, 4, 5, 6) */}
          <SwarnikaValueProps />

          {/* Section 3: SHOP BY CATEGORY — (4 Landscape Category Cards) */}
          <SwarnikaCategories />

          {/* Section 4: BESTSELLING PIECES — (Filterable Product Grid & Quick View) */}
          <SwarnikaBestsellers />

          {/* Section 5: Editorial Spotlight (Dual Curated Banners) */}
          <DualPromoBanner />

          {/* Section 6: Our Story & Heritage Guild */}
          <OurStorySection />

          {/* Section 7: What Our Clients Say / Loved by Thousands */}
          <TestimonialsSection />

          {/* Section 8: Instagram @SWARNIKA_JEWELS Community */}
          <InstagramCommunitySection />

          {/* Section 9: VIP Privileges & Exclusive Newsletter */}
          <NewsletterSection />
        </main>

        {/* Luxury Brand Footer */}
        <Footer />

        {/* Mobile Quick Bottom Navigation Bar */}
        <MobileBottomNav />
      </div>

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductQuickViewModal />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <StoryModal />
      <ToastContainer />
    </ShopProvider>
  );
}
