/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { ShopCataloguePage } from './pages/ShopCataloguePage';
import { WomenLandingPage } from './pages/WomenLandingPage';
import { MenLandingPage } from './pages/MenLandingPage';
import { CollectionsLandingPage } from './pages/CollectionsLandingPage';
import { RoutePlaceholderPage } from './pages/RoutePlaceholderPage';

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Storefront Homepage (9 original sections in exact order) */}
            <Route index element={<HomePage />} />

            {/* Editorial Landing Pages (Phase 5: Women, Men, Collections) */}
            <Route path="women" element={<WomenLandingPage />} />
            <Route path="men" element={<MenLandingPage />} />
            <Route path="collections" element={<CollectionsLandingPage />} />

            {/* Catalogue & Category Architecture (Phase 4: Shop All, Category) */}
            <Route path="shop" element={<ShopCataloguePage mode="shop" />} />
            <Route path="category/:slug" element={<ShopCataloguePage mode="category" />} />
            <Route path="product/:slug" element={<RoutePlaceholderPage />} />

            {/* Shopping & Acquisition Architecture (Phases 7-8) */}
            <Route path="wishlist" element={<RoutePlaceholderPage />} />
            <Route path="cart" element={<RoutePlaceholderPage />} />
            <Route path="checkout" element={<RoutePlaceholderPage />} />

            {/* Customer Account & Concierge (Phase 8) */}
            <Route path="account" element={<RoutePlaceholderPage />} />
            <Route path="account/orders" element={<RoutePlaceholderPage />} />
            <Route path="account/orders/:orderId" element={<RoutePlaceholderPage />} />

            {/* 404 Wildcard */}
            <Route path="*" element={<RoutePlaceholderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}
