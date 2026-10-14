/**
 * SWARNIKA — Customer Account Dashboard (/account)
 * Luxury patron portal with tabbed navigation: Overview, Orders, Saved Addresses, Sizing & Preferences, and Concierge.
 * Truthful guest patron architecture strictly adhering to Phase 09 security directives.
 */

import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Package,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Lock,
  Headphones,
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { useShop } from '../context/ShopContext';
import { ROUTES } from '../config/navigation';
import { STORE_CONFIG } from '../config/store';
import { CustomerAddress } from '../types/account';
import { AddressModal } from '../components/account/AddressModal';
import { AuthModal } from '../components/account/AuthModal';

export const AccountPage: React.FC = () => {
  const {
    profile,
    addresses,
    orders,
    updatePreferences,
    setIsAuthModalOpen,
    setAuthView,
  } = useAccount();

  const { wishlist, addToast } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active tab from URL query param or default 'overview'
  const currentTab = (searchParams.get('tab') as
    | 'overview'
    | 'orders'
    | 'addresses'
    | 'preferences'
    | 'concierge') || 'overview';

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<CustomerAddress | null>(null);

  // Preference editing state (local session assistance)
  const [prefForm, setPrefForm] = useState(profile.preferences);

  const setTab = (tab: string) => {
    setSearchParams({ tab });
  };

  const handlePrefSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(prefForm);
    addToast('Preferences Updated', 'Your bespoke sizing and metal preferences have been saved for this session.', 'success');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#7A6451]">
          <Link to={ROUTES.HOME} className="hover:text-[#4A1622] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#2D241E]">Patron Account</span>
        </nav>

        {/* Patron Header Banner (Truthful Guest Portal) */}
        <div className="bg-white border border-[#E8DED1] p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#F4EDE4] border border-[#E8DED1] rounded-full flex items-center justify-center text-[#4A1622] shrink-0 font-serif-luxury text-xl font-bold">
                G
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
                    Guest Patron Atelier Portal
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#FAF8F5] border border-[#D5C6B5] text-[#4A1622] text-[10px] uppercase tracking-[0.18em] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#A77B3D]" />
                    <span>Silver Patron (Guest Access)</span>
                  </span>
                </div>
                <p className="text-xs text-[#7A6451] mt-1 flex items-center gap-2 flex-wrap">
                  <span>Explore bespoke sizing guides, saved wishlist heirlooms, and atelier concierge privileges.</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  setAuthView('signin');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer shadow-xs"
              >
                Patron Sign In
              </button>
              <button
                onClick={() => {
                  setAuthView('register');
                  setIsAuthModalOpen(true);
                }}
                className="px-4 py-2 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#2D241E] text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer"
              >
                Register
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-t border-[#F0E6D8] mt-6 pt-4 gap-2 sm:gap-4 overflow-x-auto text-xs uppercase tracking-wider font-medium">
            <button
              onClick={() => setTab('overview')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                currentTab === 'overview'
                  ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                  : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setTab('orders')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                currentTab === 'orders'
                  ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                  : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
              }`}
            >
              Orders ({orders.length})
            </button>

            <button
              onClick={() => setTab('addresses')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                currentTab === 'addresses'
                  ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                  : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
              }`}
            >
              Saved Addresses ({addresses.length})
            </button>

            <button
              onClick={() => setTab('preferences')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                currentTab === 'preferences'
                  ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                  : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
              }`}
            >
              Sizing & Heirlooms
            </button>

            <button
              onClick={() => setTab('concierge')}
              className={`py-2 px-3 border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                currentTab === 'concierge'
                  ? 'border-[#4A1622] text-[#4A1622] font-semibold'
                  : 'border-transparent text-[#7A6451] hover:text-[#2D241E]'
              }`}
            >
              VIP Concierge
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {currentTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white border border-[#E8DED1] p-4 text-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#4A1622] block">
                  {orders.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6451] font-semibold mt-0.5 block">
                  Total Acquisitions
                </span>
              </div>

              <div className="bg-white border border-[#E8DED1] p-4 text-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#7A6451] block">
                  0
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6451] font-semibold mt-0.5 block">
                  In Insured Transit
                </span>
              </div>

              <div className="bg-white border border-[#E8DED1] p-4 text-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#4A1622] block">
                  {wishlist.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6451] font-semibold mt-0.5 block">
                  Saved Heirlooms
                </span>
              </div>

              <div className="bg-white border border-[#E8DED1] p-4 text-center">
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#C5A265] block">
                  Silver
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#7A6451] font-semibold mt-0.5 block">
                  Patron Tier
                </span>
              </div>
            </div>

            {/* Orders Spotlight: Truthful Empty State */}
            <div className="bg-white border border-[#E8DED1] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#F0E6D8] mb-5">
                <h2 className="font-serif-luxury text-xl text-[#2D241E]">
                  Recent Acquisitions
                </h2>
                <Link
                  to={ROUTES.ORDERS}
                  className="text-xs uppercase tracking-wider font-semibold text-[#4A1622] hover:underline flex items-center gap-1"
                >
                  <span>Order Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="text-center py-6 px-4 space-y-3">
                <div className="w-12 h-12 bg-[#FAF8F5] text-[#8C7662] rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-[#2D241E]">
                  Order history will become available when secure customer accounts and ordering are enabled.
                </p>
                <p className="text-xs text-[#7A6451] max-w-md mx-auto">
                  Tracking information is not yet available. Browse our curated catalogue of gold-plated heirlooms or save favourites to your wishlist.
                </p>
                <div className="pt-2">
                  <Link
                    to={ROUTES.SHOP}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shop All Heirlooms</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Split Row: Saved Addresses & Sizing Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Saved Addresses */}
              <div className="bg-white border border-[#E8DED1] p-5 sm:p-6 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#F0E6D8] pb-2.5">
                  <span className="font-serif-luxury text-base text-[#2D241E] font-medium">
                    Delivery Addresses
                  </span>
                  <button
                    onClick={() => setTab('addresses')}
                    className="text-[11px] font-semibold text-[#4A1622] uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    View
                  </button>
                </div>

                <div className="py-3 text-[#7A6451] space-y-1">
                  <p className="leading-relaxed">
                    Saved delivery addresses require a verified customer account. This service will be enabled alongside secure patron authentication.
                  </p>
                </div>
              </div>

              {/* Sizing & Metal Snapshot */}
              <div className="bg-white border border-[#E8DED1] p-5 sm:p-6 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#F0E6D8] pb-2.5">
                  <span className="font-serif-luxury text-base text-[#2D241E] font-medium">
                    Jewellery Sizing Guide & Profile
                  </span>
                  <button
                    onClick={() => setTab('preferences')}
                    className="text-[11px] font-semibold text-[#4A1622] uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Adjust
                  </button>
                </div>

                <div className="space-y-1.5 text-[#6D5844]">
                  <div className="flex justify-between">
                    <span>Ring Size Reference:</span>
                    <strong className="text-[#2D241E]">{profile.preferences.ringSize}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Bangle / Wrist Size:</span>
                    <strong className="text-[#2D241E]">{profile.preferences.braceletSize}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Preferred Polish:</span>
                    <strong className="text-[#2D241E]">{profile.preferences.preferredMetal}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Chain Length:</span>
                    <strong className="text-[#2D241E]">{profile.preferences.necklaceLength}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS */}
        {currentTab === 'orders' && (
          <div className="bg-white border border-[#E8DED1] p-8 sm:p-12 shadow-xs text-center space-y-4">
            <div className="w-14 h-14 bg-[#FAF8F5] text-[#8C7662] rounded-full flex items-center justify-center mx-auto">
              <Package className="w-7 h-7" />
            </div>
            <h2 className="font-serif-luxury text-2xl text-[#2D241E]">
              Patron Order History
            </h2>
            <p className="text-sm font-medium text-[#4A1622] max-w-md mx-auto">
              Order history will become available when secure customer accounts and ordering are enabled.
            </p>
            <p className="text-xs text-[#7A6451] max-w-md mx-auto leading-relaxed">
              Tracking information is not yet available. Real-time consignment updates require verified patron authentication and order management service activation.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link
                to={ROUTES.SHOP}
                className="px-5 py-2.5 bg-[#4A1622] text-white hover:bg-[#350F18] text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-xs"
              >
                Browse Jewellery Catalogue
              </Link>
              <Link
                to={ROUTES.WISHLIST}
                className="px-5 py-2.5 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#2D241E] text-xs uppercase tracking-[0.16em] font-medium transition-colors"
              >
                View Saved Heirlooms
              </Link>
            </div>
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {currentTab === 'addresses' && (
          <div className="bg-white border border-[#E8DED1] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F0E6D8] gap-3">
              <div>
                <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E]">
                  Saved Delivery Addresses
                </h2>
                <p className="text-xs text-[#7A6451] mt-0.5">
                  Delivery location preferences for insured courier dispatch and tax invoice billing.
                </p>
              </div>

              <button
                onClick={() => {
                  setAddressToEdit(null);
                  setIsAddressModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#4A1622] text-white hover:bg-[#350F18] text-xs uppercase tracking-wider font-medium cursor-pointer shadow-xs self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Address</span>
              </button>
            </div>

            <div className="bg-[#FAF8F5] border border-[#E8DED1] p-6 text-center space-y-3">
              <div className="w-12 h-12 bg-white text-[#8C7662] rounded-full flex items-center justify-center mx-auto">
                <Lock className="w-5 h-5 text-[#A77B3D]" />
              </div>
              <p className="text-sm font-medium text-[#2D241E]">
                Saved delivery addresses require a verified customer account.
              </p>
              <p className="text-xs text-[#7A6451] max-w-md mx-auto leading-relaxed">
                This service will be enabled alongside secure patron authentication. Delivery details will be collected during authenticated checkout once active.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: SIZING & PREFERENCES */}
        {currentTab === 'preferences' && (
          <div className="bg-white border border-[#E8DED1] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F0E6D8] pb-4">
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E]">
                Jewellery Profile & Atelier Sizing Guide
              </h2>
              <p className="text-xs text-[#7A6451] mt-0.5 leading-relaxed">
                Explore standard ring, bangle, and necklace measurements so your future acquisitions fit impeccably.
              </p>
            </div>

            <form onSubmit={handlePrefSave} className="space-y-4 max-w-xl text-xs text-[#2D241E]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                    Ring Size Preference
                  </label>
                  <select
                    value={prefForm.ringSize}
                    onChange={(e) => setPrefForm({ ...prefForm, ringSize: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                  >
                    <option value="Indian 10 (US 5)">Indian 10 (US 5 - 15.7mm)</option>
                    <option value="Indian 12 (US 6)">Indian 12 (US 6 - 16.5mm)</option>
                    <option value="Indian 14 (US 7)">Indian 14 (US 7 - 17.3mm)</option>
                    <option value="Indian 16 (US 8)">Indian 16 (US 8 - 18.1mm)</option>
                    <option value="Indian 18 (US 9)">Indian 18 (US 9 - 18.9mm)</option>
                    <option value="Indian 20 (US 10)">Indian 20 (US 10 - 19.8mm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                    Bangle / Bracelet Size
                  </label>
                  <select
                    value={prefForm.braceletSize}
                    onChange={(e) => setPrefForm({ ...prefForm, braceletSize: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                  >
                    <option value="2.2 (Small)">2.2 (Small - 2.12 inch diameter)</option>
                    <option value="2.4 (Small/Medium)">2.4 (Small/Medium - 2.25 inch)</option>
                    <option value="2.6 (Medium/Standard)">2.6 (Medium/Standard - 2.37 inch)</option>
                    <option value="2.8 (Large)">2.8 (Large - 2.50 inch)</option>
                    <option value="2.10 (Extra Large)">2.10 (Extra Large - 2.62 inch)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                    Preferred Polish & Metal
                  </label>
                  <select
                    value={prefForm.preferredMetal}
                    onChange={(e) => setPrefForm({ ...prefForm, preferredMetal: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                  >
                    <option value="18K Gold Plated">18K Warm Yellow Gold</option>
                    <option value="Rose Gold Plated">Rose Gold Warm Blush</option>
                    <option value="White Rhodium Plated">Platinum / White Rhodium</option>
                    <option value="Antique Heritage Polish">Antique Heritage Kundan Polish</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                    Necklace Chain Length
                  </label>
                  <select
                    value={prefForm.necklaceLength}
                    onChange={(e) => setPrefForm({ ...prefForm, necklaceLength: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                  >
                    <option value="16 Inch (Choker Length)">16 Inch (Choker Length)</option>
                    <option value="18 Inch (Princess Length)">18 Inch (Princess Length - Standard)</option>
                    <option value="20 Inch (Matinee Length)">20 Inch (Matinee Length)</option>
                    <option value="24 Inch (Opera Length)">24 Inch (Opera Length)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="bg-[#4A1622] hover:bg-[#350F18] text-white py-2.5 px-6 text-xs uppercase tracking-[0.18em] font-medium transition-colors cursor-pointer shadow-xs"
                >
                  SAVE ATELIER PREFERENCES
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: VIP CONCIERGE */}
        {currentTab === 'concierge' && (
          <div className="bg-white border border-[#E8DED1] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-[#F0E6D8] pb-4">
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#4A1622] block mb-0.5">
                PRIVATE CLIENT SERVICES
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E]">
                Swarnika VIP Atelier Concierge
              </h2>
              <p className="text-xs text-[#7A6451] mt-0.5">
                Exclusive privileges extended to patrons and fine jewellery connoisseurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#FAF8F5] border border-[#E8DED1] space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#F4EDE4] text-[#4A1622] flex items-center justify-center font-serif-luxury font-bold">
                  1
                </div>
                <h3 className="font-semibold text-sm text-[#2D241E]">
                  Complimentary Annual Polish
                </h3>
                <p className="text-[#6D5844] leading-relaxed">
                  Send your heirloom to our Jaipur atelier once a year for ultrasonic stone inspection, prong tightening, and fresh micron gold plating.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#E8DED1] space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#F4EDE4] text-[#4A1622] flex items-center justify-center font-serif-luxury font-bold">
                  2
                </div>
                <h3 className="font-semibold text-sm text-[#2D241E]">
                  Insured Transit Stewardship
                </h3>
                <p className="text-[#6D5844] leading-relaxed">
                  Every acquisition dispatched to your address travels under verified courier transit coverage with tamper-evident presentation packaging.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] border border-[#E8DED1] space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#F4EDE4] text-[#4A1622] flex items-center justify-center font-serif-luxury font-bold">
                  3
                </div>
                <h3 className="font-semibold text-sm text-[#2D241E]">
                  Bespoke Bridal Sizing
                </h3>
                <p className="text-[#6D5844] leading-relaxed">
                  Direct consultation with our master craftspersons for custom choker lengths, antique finishes, or special anniversary sizing.
                </p>
              </div>
            </div>

            <div className="p-5 bg-[#F4EDE4] border border-[#E0D2C2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-[#4A1622] text-sm">
                  Connect with Your Dedicated Patron Specialist
                </p>
                <p className="text-xs text-[#554336] mt-0.5">
                  Available Monday through Saturday, 10:00 to 19:00 IST.
                </p>
              </div>
              <a
                href={`mailto:${STORE_CONFIG.concierge.email}?subject=Patron Atelier Assistance`}
                className="px-4 py-2 bg-[#4A1622] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#350F18] shrink-0"
              >
                Email Concierge
              </a>
            </div>
          </div>
        )}

        {/* Security & System Status Note (Strictly Truthful) */}
        <div className="p-4 bg-[#F4EDE4] border border-[#E0D2C2] text-xs text-[#554336] leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#4A1622] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[11px] block mb-0.5">
              Patron Privacy & Security Notice
            </span>
            SWARNIKA strictly respects your data privacy. Customer sign-in, cloud address persistence, and verified order history will be enabled upon secure backend gateway activation.
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        addressToEdit={addressToEdit}
      />

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};
