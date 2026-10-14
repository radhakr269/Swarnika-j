/**
 * SWARNIKA — Customer Order History Page (/account/orders)
 * Comprehensive order listing with status filtering, search by order number/item, and quick invoice triggers.
 */

import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Package,
  Search,
  Truck,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { useShop } from '../context/ShopContext';
import { ROUTES } from '../config/navigation';
import { SafeImage } from '../components/SafeImage';
import { InvoiceModal } from '../components/account/InvoiceModal';
import { CustomerOrder } from '../types/account';

export const OrdersPage: React.FC = () => {
  const { orders } = useAccount();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_transit' | 'delivered' | 'processing'>('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<CustomerOrder | null>(null);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status match
      if (statusFilter !== 'all') {
        if (statusFilter === 'in_transit' && order.status !== 'in_transit') return false;
        if (statusFilter === 'delivered' && order.status !== 'delivered') return false;
        if (statusFilter === 'processing' && order.status !== 'processing' && order.status !== 'quality_check') return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesOrderNum = order.orderNumber.toLowerCase().includes(query);
        const matchesAwb = order.courier.awbNumber.toLowerCase().includes(query);
        const matchesItem = order.items.some((i) => i.name.toLowerCase().includes(query));
        return matchesOrderNum || matchesAwb || matchesItem;
      }

      return true;
    });
  }, [orders, statusFilter, searchQuery]);

  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'bg-[#EBF5FB] border-[#BDDCF0] text-[#1B4F72]';
      case 'delivered':
        return 'bg-[#EBF5EE] border-[#C2E4CD] text-[#2E6B3E]';
      case 'quality_check':
        return 'bg-[#FEF9E7] border-[#F9E79F] text-[#7D6608]';
      default:
        return 'bg-[#FAF8F5] border-[#E8DED1] text-[#4A1622]';
    }
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
              Track active air shipments, examine artisanal craftsmanship, and review tax invoices.
            </p>
          </div>

          <Link
            to={ROUTES.SHOP}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.16em] font-medium transition-colors shadow-xs shrink-0 self-start sm:self-end"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A265]" />
            <span>Explore New Heirlooms</span>
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-[#E8DED1] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            {(
              [
                { id: 'all', label: `All (${orders.length})` },
                { id: 'in_transit', label: 'In Insured Transit' },
                { id: 'processing', label: 'Atelier Crafting' },
                { id: 'delivered', label: 'Delivered' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 border text-xs cursor-pointer transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-[#4A1622] text-white border-[#4A1622] font-semibold'
                    : 'bg-[#FAF8F5] text-[#554336] border-[#D5C6B5] hover:border-[#4A1622]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order # or Jewel name..."
              className="w-full bg-[#FAF8F5] border border-[#D5C6B5] pl-8 pr-3 py-2 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
            />
            <Search className="w-3.5 h-3.5 text-[#8C7662] absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Orders Listing */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8DED1] shadow-xs hover:border-[#D5C2AD] transition-all overflow-hidden"
              >
                {/* Card Top Banner */}
                <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#F0E6D8] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-serif-luxury text-lg text-[#2D241E] font-medium">
                      Order #{order.orderNumber}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold border ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      <Truck className="w-3 h-3" />
                      <span>{order.statusLabel}</span>
                    </span>
                  </div>

                  <div className="text-xs text-[#7A6451] flex items-center gap-3 flex-wrap">
                    <span>Date: <strong>{order.orderDate}</strong></span>
                    <span>•</span>
                    <span>
                      Total: <strong className="text-[#4A1622] tabular-nums font-semibold">₹{order.pricing.finalTotal.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>

                {/* Card Body: Items Preview & Destination */}
                <div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
                  {/* Items previews */}
                  <div className="space-y-3 flex-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3.5">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#FAF8F5] border border-[#E8DED1] shrink-0 overflow-hidden">
                          <SafeImage
                            src={item.pictureUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif-luxury text-sm text-[#2D241E] font-medium truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-[#7A6451]">
                            Finish: {item.metal} {item.size ? `• Size: ${item.size}` : ''} • Qty: {item.quantity}
                          </p>
                          <p className="text-xs text-[#4A1622] font-medium tabular-nums">
                            ₹{item.lineTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Location & Courier Details */}
                  <div className="lg:w-72 pt-3 lg:pt-0 lg:border-l lg:border-[#F0E6D8] lg:pl-6 text-xs text-[#6D5844] space-y-1.5 shrink-0">
                    <p className="font-semibold text-[#2D241E] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                      <Truck className="w-3.5 h-3.5 text-[#4A1622]" />
                      <span>{order.courier.partner}</span>
                    </p>
                    <p className="text-[11px] font-mono text-[#7A6451]">
                      AWB: {order.courier.awbNumber}
                    </p>
                    <p className="text-[11px] text-[#8C7662]">
                      Destination: {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                    <p className="text-[11px] text-[#2E6B3E] font-medium">
                      Est. Delivery: {order.estimatedDelivery}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#F0E6D8]">
                    <Link
                      to={ROUTES.ORDER_DETAILS(order.id)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.14em] font-medium transition-colors cursor-pointer text-center"
                    >
                      <span>Track Journey</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-xs uppercase tracking-[0.14em] font-medium text-[#2D241E] transition-colors cursor-pointer text-center"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#4A1622]" />
                      <span>View Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-[#E8DED1] p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 bg-[#FAF8F5] text-[#8C7662] rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-7 h-7" />
            </div>
            <h3 className="font-serif-luxury text-xl text-[#2D241E] mb-1">
              No Matching Acquisitions Found
            </h3>
            <p className="text-xs text-[#7A6451] mb-6 leading-relaxed">
              {searchQuery
                ? `No orders matching "${searchQuery}". Clear your search or filter.`
                : 'You have not placed any acquisitions under this filter.'}
            </p>
            <div className="flex justify-center gap-3">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 border border-[#D5C6B5] text-xs uppercase tracking-wider hover:bg-[#F2E8DC]"
                >
                  Clear Search
                </button>
              )}
              <Link
                to={ROUTES.SHOP}
                className="px-5 py-2.5 bg-[#4A1622] text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#350F18]"
              >
                Browse Jewellery Catalogue
              </Link>
            </div>
          </div>
        )}

        {/* Security & Backend Transparency Note */}
        <div className="p-4 bg-[#F4EDE4] border border-[#E0D2C2] text-xs text-[#554336] leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#4A1622] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[11px] block mb-0.5">
              Secure Order Record Stewardship
            </span>
            All customer acquisitions placed in this preview session are encrypted and recorded locally in your browser sandbox. For enterprise deployments, orders are securely validated with real-time BlueDart and IndiaPost webhooks.
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
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
