/**
 * SWARNIKA — Customer Order History Page (/account/orders)
 * Truthful patron acquisitions view with clear system status and verified navigation.
 */

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Package,
  Search,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { ROUTES } from '../config/navigation';
import { STORE_CONFIG } from '../config/store';
import { CustomerOrder } from '../types/account';
import { InvoiceModal } from '../components/account/InvoiceModal';

export const OrdersPage: React.FC = () => {
  const { orders } = useAccount();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_transit' | 'delivered' | 'processing'>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<CustomerOrder | null>(null);

  // Filter orders if any authentic authenticated orders exist
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (statusFilter !== 'all') {
        if (statusFilter === 'in_transit' && order.status !== 'in_transit') return false;
        if (statusFilter === 'delivered' && order.status !== 'delivered') return false;
        if (statusFilter === 'processing' && order.status !== 'processing' && order.status !== 'quality_check') return false;
      }

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesOrderNum = order.orderNumber.toLowerCase().includes(query);
        const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(query));
        return matchesOrderNum || matchesItem;
      }

      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-[#7A6451]">
          <Link to={ROUTES.HOME} className="hover:text-[#4A1622] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={ROUTES.ACCOUNT} className="hover:text-[#4A1622] transition-colors">
            Patron Account
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#2D241E]">Order History</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8DED1] pb-5">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#4A1622] font-semibold block mb-1">
              PATRON ACQUISITIONS
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#2D241E]">
              Order History & Consignment Archive
            </h1>
            <p className="text-xs sm:text-sm text-[#7A6451] mt-1">
              Review verified orders, tracking records, and tax invoices.
            </p>
          </div>

          <Link
            to={ROUTES.SHOP}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-xs shrink-0 self-start sm:self-end"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Explore All Heirlooms</span>
          </Link>
        </div>

        {/* Orders Listing or Truthful Empty/Unavailable State */}
        {orders.length > 0 && filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8DED1] p-5 space-y-4 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0E6D8] pb-3 text-xs">
                  <div>
                    <span className="text-[#7A6451]">Order #</span>
                    <span className="font-mono font-semibold text-[#2D241E] ml-1.5">{order.orderNumber}</span>
                  </div>
                  <span className="text-[#7A6451]">{order.orderDate}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Truthful Empty/Unavailable Experience (Required by Phase 09) */
          <div className="bg-white border border-[#E8DED1] p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-xs space-y-5">
            <div className="w-16 h-16 bg-[#F4EDE4] text-[#4A1622] rounded-full flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 stroke-[1.6]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#A77B3D] font-semibold block">
                ORDER ARCHIVE STATUS
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
                No Acquisitions on Record
              </h2>
              <p className="text-sm text-[#4A1622] font-medium max-w-md mx-auto leading-relaxed pt-1">
                Order history will become available when secure customer accounts and ordering are enabled.
              </p>
              <p className="text-xs text-[#7A6451] max-w-md mx-auto leading-relaxed">
                Tracking information is not yet available. In accordance with consumer privacy and e-commerce standards, authentic order archives require verified patron authentication and live commerce backend activation.
              </p>
            </div>

            {/* Action buttons with verified destinations */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={ROUTES.SHOP}
                className="w-full sm:w-auto px-6 py-3 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop All Heirlooms</span>
              </Link>

              <a
                href={`mailto:${STORE_CONFIG.concierge.email}`}
                className="w-full sm:w-auto px-6 py-3 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#2D241E] text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Headphones className="w-4 h-4 text-[#A77B3D]" />
                <span>Contact Atelier Concierge</span>
              </a>
            </div>
          </div>
        )}

        {/* Security & System Status Note (Strictly Truthful) */}
        <div className="p-4 bg-[#F4EDE4] border border-[#E0D2C2] text-xs text-[#554336] leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#4A1622] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[11px] block mb-0.5">
              Patron Privacy & Security Boundary
            </span>
            SWARNIKA strictly protects customer privacy. No simulated orders or third-party consignment records are rendered without authenticated patron authorization and verified gateway integration.
          </div>
        </div>
      </div>

      {/* Invoice Modal (only active if an authentic order is selected) */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={true}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}
    </div>
  );
};
