/**
 * SWARNIKA — Customer Order Details Atelier & Live Tracking
 * Complete order inspection, BlueDart courier tracking timeline, item cards, and tax invoice.
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  FileText,
  RotateCcw,
  Headphones,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAccount } from '../context/AccountContext';
import { useShop } from '../context/ShopContext';
import { ROUTES } from '../config/navigation';
import { InvoiceModal } from '../components/account/InvoiceModal';
import { SafeImage } from '../components/SafeImage';

export const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, orders } = useAccount();
  const { addToast } = useShop();
  const navigate = useNavigate();

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnReason, setReturnReason] = useState('Ring size adjustment needed');
  const [lookupInput, setLookupInput] = useState('');

  const order = orderId ? getOrderById(orderId) : undefined;

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReturnModalOpen(false);
    addToast(
      'Exchange Request Registered',
      'Our atelier concierge will contact you within 4 hours to arrange insured pickup.',
      'success'
    );
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupInput.trim()) return;
    navigate(ROUTES.ORDER_DETAILS(lookupInput.trim()));
  };

  // Fallback if order not found
  if (!order) {
    return (
      <div className="min-h-[60vh] py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <div className="w-14 h-14 bg-[#F4EDE4] text-[#4A1622] rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-7 h-7" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#4A1622] font-semibold block mb-1">
          ORDER LOOKUP
        </span>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E] mb-3">
          Acquisition #{orderId} Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6451] max-w-md mx-auto leading-relaxed mb-6">
          We could not locate this consignment in your local session. You can look up active orders below or explore our active demo shipment.
        </p>

        {/* Search input */}
        <form onSubmit={handleLookup} className="flex max-w-md mx-auto gap-2 mb-6">
          <input
            type="text"
            value={lookupInput}
            onChange={(e) => setLookupInput(e.target.value)}
            placeholder="Enter Order # e.g. SWN-74192"
            className="flex-1 bg-white border border-[#D5C6B5] px-3.5 py-2.5 text-xs text-[#2D241E] focus:outline-hidden focus:border-[#4A1622]"
          />
          <button
            type="submit"
            className="bg-[#4A1622] text-white px-5 py-2.5 text-xs uppercase tracking-wider font-medium hover:bg-[#350F18] cursor-pointer"
          >
            Locate
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to={ROUTES.ORDER_DETAILS('SWN-74192')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FAF8F5] border border-[#D5C6B5] hover:bg-[#F2E8DC] text-xs font-medium text-[#4A1622]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#A77B3D]" />
            <span>View Active Demo Consignment (SWN-74192)</span>
          </Link>
          <Link
            to={ROUTES.ORDERS}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#4A1622] text-white hover:bg-[#350F18] text-xs font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Order History</span>
          </Link>
        </div>
      </div>
    );
  }

  // Get status color
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
          <Link to={ROUTES.ORDERS} className="hover:text-[#4A1622] transition-colors">
            Orders
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#2D241E]">#{order.orderNumber}</span>
        </nav>

        {/* Order Header Card */}
        <div className="bg-white border border-[#E8DED1] p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F0E6D8] pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
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
              <p className="text-xs text-[#7A6451] flex items-center gap-3 flex-wrap">
                <span>Placed on <strong>{order.orderDate}</strong></span>
                <span>•</span>
                <span>Est. Delivery: <strong className="text-[#2D241E]">{order.estimatedDelivery}</strong></span>
                <span>•</span>
                <span>Courier: <strong>{order.courier.partner}</strong></span>
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setIsInvoiceOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-xs uppercase tracking-wider font-medium text-[#2D241E] transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#4A1622]" />
                <span>Tax Invoice</span>
              </button>
              <button
                onClick={() => setIsReturnModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-xs uppercase tracking-wider font-medium text-[#2D241E] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#A77B3D]" />
                <span>Exchange / Return</span>
              </button>
            </div>
          </div>

          {/* Courier AWB Callout */}
          <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#E8DED1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2E6B3E] shrink-0" />
              <span className="text-[#554336]">
                Insured Air Consignment: <strong className="font-mono text-[#2D241E]">{order.courier.awbNumber}</strong>
              </span>
            </div>
            <span className="text-[11px] text-[#7A6451]">
              Current Sorting: <strong>{order.courier.currentHub}</strong>
            </span>
          </div>
        </div>

        {/* Live Tracking Progress Timeline */}
        <div className="bg-white border border-[#E8DED1] p-5 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#4A1622] block mb-0.5">
                DISPATCH STEWARDSHIP
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E]">
                Consignment Journey & Milestones
              </h2>
            </div>
            <span className="text-[11px] text-[#7A6451] hidden sm:block">
              Updates authenticated in real-time
            </span>
          </div>

          <div className="relative border-l-2 border-[#E8DED1] ml-4 sm:ml-6 space-y-7 pb-2">
            {order.trackingTimeline.map((step, idx) => (
              <div key={step.id} className="relative pl-6 sm:pl-8">
                {/* Node marker icon */}
                <span
                  className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.isCompleted
                      ? 'bg-[#4A1622] border-[#4A1622] text-white shadow-xs'
                      : step.isCurrent
                      ? 'bg-white border-[#4A1622] text-[#4A1622] animate-pulse ring-4 ring-[#4A1622]/15'
                      : 'bg-white border-[#D5C6B5] text-[#A69584]'
                  }`}
                >
                  {step.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : step.isCurrent ? (
                    <Truck className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                </span>

                {/* Content */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3
                      className={`text-sm font-semibold tracking-wide ${
                        step.isCurrent
                          ? 'text-[#4A1622]'
                          : step.isCompleted
                          ? 'text-[#2D241E]'
                          : 'text-[#8C7662]'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-mono text-[#7A6451]">
                      {step.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#6D5844] mt-1 leading-relaxed">
                    {step.description}
                  </p>
                  <p className="text-[11px] text-[#8C7662] mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#A77B3D]" />
                    <span>{step.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Ordered Items vs Shipping & Payment Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Items Breakdown (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E8DED1] p-5 sm:p-7 shadow-xs space-y-4">
            <h2 className="font-serif-luxury text-xl text-[#2D241E] border-b border-[#F0E6D8] pb-3">
              Jewellery In This Consignment ({order.itemCount})
            </h2>

            <div className="divide-y divide-[#F0E6D8]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex gap-4 items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#FAF8F5] border border-[#E8DED1] shrink-0 overflow-hidden">
                    <SafeImage
                      src={item.pictureUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif-luxury text-sm sm:text-base text-[#2D241E] font-medium truncate">
                      {item.name}
                    </h3>
                    <div className="text-xs text-[#7A6451] mt-0.5 space-y-0.5">
                      <p>Finish: <strong className="text-[#4A3B32]">{item.metal}</strong></p>
                      {item.size && <p>Size: <strong className="text-[#4A3B32]">{item.size}</strong></p>}
                      <p>Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-medium text-sm sm:text-base text-[#2D241E] tabular-nums">
                      ₹{item.lineTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Atelier Care Guarantee */}
            <div className="mt-4 p-3.5 bg-[#FAF8F5] border border-[#E8DED1] text-xs text-[#6D5844] space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-[#4A1622] text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#2E6B3E]" />
                <span>Atelier Finishing & Care Support</span>
              </div>
              <p className="leading-relaxed">
                Every Swarnika creation is crafted with artisanal precision. Our concierge provides complimentary guidance for ultrasonic cleaning, seasonal care, and bespoke sizing adjustments.
              </p>
            </div>
          </div>

          {/* Right: Delivery Address, Payment & Financial Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Delivery Address Card */}
            <div className="bg-white border border-[#E8DED1] p-5 shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#4A1622]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Delivery Destination</span>
              </div>
              <p className="font-semibold text-sm text-[#2D241E]">
                {order.shippingAddress.fullName}
              </p>
              <p className="text-[#6D5844] leading-relaxed">
                {order.shippingAddress.addressLine1}
                {order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}
                {order.shippingAddress.landmark ? ` (Near ${order.shippingAddress.landmark})` : ''}
              </p>
              <p className="text-[#6D5844]">
                {order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}
              </p>
              <p className="text-[#7A6451] pt-1">
                Contact: <strong className="text-[#2D241E]">{order.shippingAddress.phone}</strong>
              </p>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white border border-[#E8DED1] p-5 shadow-xs space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-[#4A1622]">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Payment Authentication</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6D5844]">{order.payment.label}</span>
                <span className="px-2 py-0.5 bg-[#EBF5EE] text-[#2E6B3E] font-semibold text-[10px] uppercase tracking-wider">
                  {order.payment.status}
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#8C7662]">
                Ref: {order.payment.transactionRef}
              </p>
            </div>

            {/* Pricing Summary Card */}
            <div className="bg-white border border-[#E8DED1] p-5 shadow-xs space-y-2.5 text-xs">
              <h3 className="font-serif-luxury text-base text-[#2D241E] border-b border-[#F0E6D8] pb-2">
                Acquisition Summary
              </h3>

              <div className="flex justify-between text-[#6D5844]">
                <span>Items Subtotal:</span>
                <span className="tabular-nums">₹{order.pricing.subtotal.toLocaleString()}</span>
              </div>

              {order.pricing.discountAmount > 0 && (
                <div className="flex justify-between text-[#2E6B3E] font-medium">
                  <span>VIP Privilege Savings:</span>
                  <span className="tabular-nums">-₹{order.pricing.discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6D5844]">
                <span>GST (3% Inclusive):</span>
                <span className="tabular-nums">₹{order.pricing.gstAmount.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-[#6D5844]">
                <span>Insured Courier Delivery:</span>
                <span className="text-[#2E6B3E] font-medium">
                  {order.pricing.shippingFee === 0 ? 'Complimentary' : `₹${order.pricing.shippingFee}`}
                </span>
              </div>

              <div className="pt-2.5 border-t border-[#2D241E] flex justify-between items-baseline font-serif-luxury text-lg text-[#4A1622] font-bold">
                <span>Total Amount Paid:</span>
                <span className="tabular-nums">₹{order.pricing.finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Concierge Assistance */}
            <div className="p-4 bg-[#F4EDE4] border border-[#E0D2C2] text-xs text-[#554336] flex items-start gap-3">
              <Headphones className="w-5 h-5 text-[#4A1622] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#4A1622] uppercase tracking-wider text-[11px]">
                  Need Personalized Assistance?
                </p>
                <p className="text-[11px] mt-0.5 leading-relaxed">
                  Our private client concierge is ready to assist with transit coordination, gift notes, or sizing adjustments.
                </p>
                <a
                  href="mailto:concierge@swarnika.com?subject=Inquiry for Order #"
                  className="inline-block mt-1.5 text-[11px] font-semibold text-[#4A1622] underline"
                >
                  concierge@swarnika.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        order={order}
      />

      {/* Return / Exchange Inquiry Modal */}
      {isReturnModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
          <div
            onClick={() => setIsReturnModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="relative bg-[#FAF8F5] border border-[#E4D5C4] shadow-2xl max-w-md w-full z-10 p-6 space-y-4">
            <h3 className="font-serif-luxury text-xl text-[#2D241E]">
              Atelier Exchange & Care Request
            </h3>
            <p className="text-xs text-[#7A6451] leading-relaxed">
              Swarnika offers a 15-day complimentary exchange policy for unused jewels in original velvet packaging.
            </p>

            <form onSubmit={handleReturnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                  Reason for Request
                </label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full bg-white border border-[#D5C6B5] px-3 py-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                >
                  <option value="Ring size adjustment needed">Ring size adjustment needed</option>
                  <option value="Exchange for different design">Exchange for different design</option>
                  <option value="Packaging / gift box replacement">Packaging / gift box replacement</option>
                  <option value="Complimentary polish service">Complimentary polish service</option>
                  <option value="Return for store credit / refund">Return for store credit / refund</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider font-semibold text-[#554336] mb-1">
                  Specific Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell our jewellery specialists what would suit you best..."
                  className="w-full bg-white border border-[#D5C6B5] p-2 text-xs focus:outline-hidden focus:border-[#4A1622]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReturnModalOpen(false)}
                  className="w-1/2 py-2.5 border border-[#D5C6B5] text-xs uppercase tracking-wider hover:bg-[#F2E8DC] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#4A1622] text-white text-xs uppercase tracking-wider hover:bg-[#350F18] cursor-pointer"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
