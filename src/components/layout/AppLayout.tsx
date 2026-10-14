import React from 'react';
import { Outlet } from 'react-router-dom';
import { SwarnikaNavbar } from '../SwarnikaNavbar';
import { Footer } from '../Footer';
import { MobileBottomNav } from '../MobileBottomNav';
import { CartDrawer } from '../CartDrawer';
import { ProductQuickViewModal } from '../ProductQuickViewModal';
import { WishlistDrawer } from '../WishlistDrawer';
import { SearchModal } from '../SearchModal';
import { CheckoutModal } from '../CheckoutModal';
import { StoryModal } from '../StoryModal';
import { ToastContainer } from '../ToastContainer';

/**
 * AppLayout
 * Reusable application shell providing shared header, footer,
 * mobile bottom navigation, main route outlet, and global modals.
 */
export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#201815] flex flex-col font-sans-luxury pb-14 md:pb-0">
      {/* Shared Header Navigation */}
      <SwarnikaNavbar />

      {/* Main Route Outlet */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Shared Luxury Brand Footer */}
      <Footer />

      {/* Mobile Quick Bottom Navigation */}
      <MobileBottomNav />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductQuickViewModal />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <StoryModal />
      <ToastContainer />
    </div>
  );
};
