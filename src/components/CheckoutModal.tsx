/**
 * SWARNIKA — Checkout Safety Gateway Modal
 * PCI-DSS compliant checkout safety gate.
 * Disables simulated payment, prevents collection of card numbers in frontend forms,
 * and truthfully reports that production payment requires a secure server gateway.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldAlert, Lock, ArrowLeft, ShoppingBag, ExternalLink, Package, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ROUTES } from '../config/navigation';
import { SafeImage } from './SafeImage';

export const CheckoutModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    shippingFee,
    finalTotal,
    appliedPromo,
    cartItemCount,
  } = useShop();

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
  };

  const handleReturnToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCheckoutOpen(false);
    navigate(ROUTES.SHOP);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
      {/* Backdrop */}
      <div onClick={handleClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] max-w-xl w-full border border-[#E4D5C4] shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] cursor-pointer"
          aria-label="Close checkout preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security & System Status Header */}
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#A77B3D] font-semibold mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Commerce Gateway Status • Inactive</span>
          </div>
          <h2 id="checkout-modal-title" className="font-serif-luxury text-2xl sm:text-3xl text-[#2D241E]">
            Checkout & Acquisition Summary
          </h2>
          <p className="text-xs text-[#7A6451] mt-1 leading-relaxed">
            Review your bag items and delivery estimation prior to production gateway connection.
          </p>
        </div>

        {/* Safety Callout Box (Strict Phase 09 Rule: No Fake Payments / No Custom Card Forms) */}
        <div className="p-4 bg-[#F4EDE4] border border-[#E0D2C2] text-xs text-[#554336] space-y-2">
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#8C3A49] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#4A1622] uppercase tracking-wider text-[11px] block mb-0.5">
                Production Payment Gateway Required (Phase 07 Dependency)
              </span>
              <p className="text-[11.5px] leading-relaxed text-[#5A4637]">
                In compliance with strict consumer security and PCI-DSS standards, SWARNIKA does not collect credit card numbers, CVVs, or simulated UPI payments in frontend forms. Live payment processing requires a certified payment aggregator and authenticated commerce server.
              </p>
            </div>
          </div>
        </div>

        {/* Bag Summary Preview */}
        <div className="bg-white border border-[#E8DED1] p-4 text-xs space-y-3">
          <div className="flex justify-between items-center border-b border-[#F0E6D8] pb-2 font-semibold text-[#2D241E]">
            <span>Bag Items ({cartItemCount})</span>
            <span className="text-[11px] text-[#7A6451]">Safe & Preserved</span>
          </div>

          <div className="max-h-40 overflow-y-auto divide-y divide-[#F0E6D8] pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 bg-[#FAF8F5] border border-[#E8DED1] shrink-0 overflow-hidden">
                    <SafeImage
                      src={item.product.image || item.product.fallbackImage}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif-luxury text-xs text-[#2D241E] truncate font-medium">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-[#7A6451]">
                      {item.selectedMetal} • Qty {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium text-[#2D241E] tabular-nums shrink-0">
                  ₹{(item.product.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-2 border-t border-[#F0E6D8] space-y-1 text-[#6D5844]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="tabular-nums font-medium text-[#2D241E]">₹{cartTotal.toLocaleString()}</span>
            </div>
            {appliedPromo && (
              <div className="flex justify-between text-[#2E6B3E]">
                <span>VIP Privilege ({appliedPromo.code}):</span>
                <span className="tabular-nums">-₹{appliedPromo.amount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span className="text-[#2E6B3E] font-medium">{shippingFee === 0 ? 'Complimentary' : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-[#2D241E] font-serif-luxury text-base font-bold text-[#4A1622]">
              <span>Estimated Total:</span>
              <span className="tabular-nums">₹{finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            onClick={handleReturnToCart}
            className="flex-1 bg-[#4A1622] hover:bg-[#350F18] text-white py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Return to Shopping Bag</span>
          </button>

          <button
            onClick={handleContinueShopping}
            className="flex-1 bg-white border border-[#D5C6B5] hover:bg-[#F2E8DC] text-[#2D241E] py-3 px-4 text-xs uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#A77B3D]" />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};
