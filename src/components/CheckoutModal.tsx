import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Lock, Truck, ArrowRight, CreditCard, Smartphone, Banknote, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    shippingFee,
    finalTotal,
    appliedPromo,
    cartItemCount,
    clearCart,
    addToast,
  } = useShop();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  
  // Save confirmed order snapshot before clearCart() wipes the state
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    itemsCount: number;
    shipping: number;
    promoCode?: string;
    promoDiscount?: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    fullName: 'Sophia Sharma',
    email: 'sophia.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42, Royal Palms, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    upiId: 'sophia@okhdfcbank',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '08/28',
    cvv: '888',
  });

  if (!isCheckoutOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      const generatedOrderNum = `SWN-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrder({
        orderNumber: generatedOrderNum,
        total: finalTotal,
        itemsCount: cartItemCount,
        shipping: shippingFee,
        promoCode: appliedPromo?.code,
        promoDiscount: appliedPromo?.amount,
      });

      setStep('confirmed');
      clearCart();
      addToast({
        title: 'Acquisition Confirmed',
        message: `Order #${generatedOrderNum} placed successfully with complimentary insured delivery.`,
        type: 'success',
      });
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      <div onClick={handleClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" />

      <div className="relative bg-[#FAF8F5] rounded-none max-w-lg w-full border border-[#E4D5C4] shadow-2xl overflow-hidden z-10 p-5 sm:p-8 space-y-5">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-[#7A6451] hover:text-[#2D241E] rounded-full hover:bg-[#F2E8DC] cursor-pointer"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {step !== 'confirmed' ? (
          <>
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#4A1622] font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-[#2D241E] mt-1">
                {step === 'shipping' ? 'Atelier Delivery Address' : 'Payment Method'}
              </h2>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center gap-2 text-xs">
              <span className={`px-2.5 py-1 font-semibold ${step === 'shipping' ? 'bg-[#4A1622] text-white' : 'bg-[#EBDDCF] text-[#4A1622]'}`}>
                1. Delivery
              </span>
              <span className="w-4 h-[1px] bg-[#D5C6B5]" />
              <span className={`px-2.5 py-1 font-semibold ${step === 'payment' ? 'bg-[#4A1622] text-white' : 'bg-[#EBDDCF] text-[#4A1622]'}`}>
                2. Payment
              </span>
            </div>

            <form onSubmit={handleNextStep} className="space-y-4">
              {step === 'shipping' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#554336] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-[#554336] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase text-[#554336] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-[#554336] mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-[#554336] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-[#554336] mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold uppercase text-[#554336] mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full bg-white border border-[#D5C6B5] p-2.5 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Payment method selector */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 border text-center transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'border-[#4A1622] bg-[#FAF3EC] text-[#4A1622] font-semibold'
                          : 'border-[#D5C6B5] text-[#554336]'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] uppercase">UPI / QR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 border text-center transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#4A1622] bg-[#FAF3EC] text-[#4A1622] font-semibold'
                          : 'border-[#D5C6B5] text-[#554336]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] uppercase">Cards</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 border text-center transition-all cursor-pointer ${
                        paymentMethod === 'cod'
                          ? 'border-[#4A1622] bg-[#FAF3EC] text-[#4A1622] font-semibold'
                          : 'border-[#D5C6B5] text-[#554336]'
                      }`}
                    >
                      <Banknote className="w-4 h-4 mx-auto mb-1" />
                      <span className="text-[10px] uppercase">COD</span>
                    </button>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="p-3 bg-white border border-[#D5C6B5] space-y-2">
                      <label className="block text-[11px] font-semibold uppercase text-[#554336]">
                        Enter Virtual Payment Address (UPI ID)
                      </label>
                      <input
                        type="text"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        placeholder="yourname@okhdfcbank"
                        className="w-full bg-[#FAF8F5] border border-[#D5C6B5] p-2 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                      />
                      <p className="text-[10px] text-[#7A6451]">
                        Compatible with Google Pay, PhonePe, Paytm, BHIM and Cred.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="p-3 bg-white border border-[#D5C6B5] space-y-2.5">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase text-[#554336] mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full bg-[#FAF8F5] border border-[#D5C6B5] p-2 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-[#554336] mb-1">
                            Expiry
                          </label>
                          <input
                            type="text"
                            value={formData.expiry}
                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-[#D5C6B5] p-2 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold uppercase text-[#554336] mb-1">
                            CVV
                          </label>
                          <input
                            type="password"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            className="w-full bg-[#FAF8F5] border border-[#D5C6B5] p-2 text-xs text-[#201815] focus:outline-none focus:border-[#4A1622]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-3 bg-[#F6EFE6] border border-[#D5C6B5] text-xs text-[#554336] leading-relaxed">
                      Pay via Cash or UPI at your doorstep upon receiving the tamper-evident sealed parcel.
                    </div>
                  )}
                </div>
              )}

              {/* Order Summary line */}
              <div className="pt-2 border-t border-[#EDE2D4] space-y-1 text-xs">
                <div className="flex justify-between text-[#6D5844]">
                  <span>Items Subtotal:</span>
                  <span className="tabular-nums">₹{cartTotal.toLocaleString()}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-[#2E6B3E]">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Promo ({appliedPromo.code}):
                    </span>
                    <span className="tabular-nums">-₹{appliedPromo.amount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6D5844]">
                  <span>Insured Delivery:</span>
                  <span className="text-[#2E6B3E] font-medium">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E8DDCE] text-sm">
                  <span className="font-semibold text-[#2D241E]">Total Payable:</span>
                  <span className="font-serif-luxury text-base font-semibold text-[#4A1622] tabular-nums">
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-[#4A1622] hover:bg-[#381019] text-white py-3 text-xs uppercase tracking-[0.2em] font-medium transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {step === 'shipping'
                    ? 'CONTINUE TO PAYMENT'
                    : `AUTHORIZE PAYMENT • ₹${finalTotal.toLocaleString()}`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EBF5EE] text-[#2E6B3E] flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#4A1622] font-semibold block mb-1">
                ACQUISITION CONFIRMED
              </span>
              <h2 className="font-serif-luxury text-2xl text-[#2D241E]">
                Thank You, {formData.fullName}!
              </h2>
              <p className="text-xs text-[#6D5844] mt-1 max-w-sm mx-auto leading-relaxed">
                Your order <strong className="text-[#2D241E]">#{confirmedOrder?.orderNumber}</strong> has been registered at our atelier. A tracking link has been dispatched to <strong>{formData.email}</strong>.
              </p>
            </div>

            <div className="p-4 bg-white border border-[#EDE2D4] text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between text-[#7A6451]">
                <span>Status:</span>
                <span className="font-semibold text-[#2E6B3E]">Atelier Crafting</span>
              </div>
              <div className="flex justify-between text-[#7A6451]">
                <span>Total Amount:</span>
                <span className="font-semibold text-[#2D241E] tabular-nums">
                  ₹{confirmedOrder?.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#7A6451]">
                <span>Delivery Address:</span>
                <span className="font-semibold text-[#2D241E] truncate max-w-[180px]">
                  {formData.city}, {formData.pincode}
                </span>
              </div>
              <div className="flex justify-between text-[#7A6451]">
                <span>Estimated Arrival:</span>
                <span className="font-semibold text-[#2D241E]">2 - 3 Business Days</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="bg-[#4A1622] hover:bg-[#381019] text-white py-3 px-8 text-xs uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
