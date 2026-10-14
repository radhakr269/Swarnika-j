import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, RotateCcw, Gift, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    addToCart,
    addToast,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2999;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - cartTotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'SWARNIKA15' || promoInput.trim().toUpperCase() === 'WELCOME15') {
      setPromoApplied(true);
      const discount = Math.round(cartTotal * 0.15);
      setDiscountAmount(discount);
      addToast({
        title: 'Privilege Applied',
        message: '15% VIP discount has been applied to your acquisition.',
        type: 'success',
      });
    } else {
      addToast({
        title: 'Invalid Code',
        message: 'Please try SWARNIKA15 for 15% VIP privilege.',
        type: 'info',
      });
    }
  };

  const finalSubtotal = Math.max(0, cartTotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E6D9CB] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#EDE2D4] bg-[#FAF8F5] flex items-center justify-between">
            <div>
              <h2 className="font-serif-luxury text-lg sm:text-xl font-medium text-[#2D241E]">
                Shopping Bag ({cartItemCount})
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#8C7662]">
                Complimentary tamper-evident insured delivery
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#7A6451] hover:text-[#2D241E] hover:bg-[#F2E8DC] rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#F4EDE4] border-b border-[#E8DCCE] text-xs">
            {amountNeeded > 0 ? (
              <p className="text-[#6D543F] mb-1.5 flex items-center justify-between text-[11px] sm:text-xs">
                <span>
                  Add <strong className="text-[#2D241E] tabular-nums">₹{amountNeeded.toLocaleString()}</strong> more for <strong>Free Express Shipping</strong>
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#4A1622]">
                  {Math.round(progressToFreeShipping)}%
                </span>
              </p>
            ) : (
              <p className="text-[#2E6B3E] font-medium mb-1.5 flex items-center gap-1.5 text-[11px] sm:text-xs">
                <Truck className="w-4 h-4 text-[#2E6B3E]" />
                You've unlocked Complimentary Insured Shipping!
              </p>
            )}
            <div className="w-full bg-[#E5D6C4] h-1.5 rounded-none overflow-hidden">
              <div
                className="bg-[#4A1622] h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EDE4] flex items-center justify-center text-[#4A1622]">
                  <Gift className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#2D241E]">
                  Your shopping bag is empty
                </h3>
                <p className="text-xs text-[#7A6451] max-w-xs leading-relaxed">
                  Discover our timeless collections of handcrafted gold-plated jewellery for women and men.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#4A1622] hover:bg-[#350F18] text-white text-xs uppercase tracking-[0.18em] font-medium px-6 py-3 rounded-none transition-colors cursor-pointer"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedMetal}`}
                    className="flex gap-3 sm:gap-4 p-3 bg-white border border-[#EDE2D4] rounded-none shadow-xs"
                  >
                    {/* Item Image */}
                    <div className="w-18 h-18 sm:w-20 sm:h-20 bg-[#F7F2EB] rounded-none overflow-hidden shrink-0 border border-[#EBE0D3]">
                      <SafeImage
                        src={item.product.image}
                        fallbackSrc={item.product.fallbackImage}
                        alt={item.product.name}
                        fallbackCategory={item.product.category}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#2D241E] leading-snug">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-[#8C7662]">
                            {item.selectedMetal} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#AFA193] hover:text-[#B43838] transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#DCCEC0] bg-[#FAF8F5]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 px-2 text-[#6D5844] hover:bg-[#EDE1D3] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#2D241E]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 px-2 text-[#6D5844] hover:bg-[#EDE1D3] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs sm:text-sm font-semibold text-[#2D241E] tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Upsell Velvet Jewellery Box */}
                <div className="bg-[#F6EFE6] border border-[#E2D2BF] p-3 sm:p-4 rounded-none flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-none overflow-hidden bg-white border border-[#D5C2AF] shrink-0">
                      <SafeImage
                        src="/public/assist/image/products/03_Cart_Gift_Packaging.jpg"
                        alt="Royal Velvet Presentation Box"
                        fallbackCategory="Gift Box"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif-luxury text-xs font-semibold text-[#2D241E]">
                        Royal Velvet Gift Box
                      </p>
                      <p className="text-[10px] text-[#7A6451]">
                        Add signature keepsake case for ₹499
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(
                        {
                          id: 'royal-velvet-box',
                          name: 'Royal Velvet Gift Box',
                          pictureName: '03_Cart_Gift_Packaging.jpg',
                          modelPictureName: '03_Cart_Gift_Packaging.jpg',
                          category: 'all',
                          price: 499,
                          rating: 5,
                          reviewsCount: 88,
                          image: '/public/assist/image/products/03_Cart_Gift_Packaging.jpg',
                          modelImage: '/public/assist/image/products/03_Cart_Gift_Packaging.jpg',
                          fallbackImage: '/public/assist/image/03_Cart_Gift_Packaging.jpg',
                          fallbackModelImage: '/public/assist/image/03_Cart_Gift_Packaging.jpg',
                          description: 'Plush crimson velvet keepsake jewelry box with gold trim.',
                          metals: ['Royal Velvet'],
                          inStock: true,
                        },
                        1,
                        'Crimson Velvet'
                      );
                    }}
                    className="px-2.5 py-1.5 bg-[#4A1622] hover:bg-[#350F18] text-white text-[9.5px] uppercase font-semibold tracking-wider rounded-none shrink-0 transition-colors cursor-pointer"
                  >
                    ADD
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#EAE0D3] space-y-3 sm:space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="PROMO CODE (SWARNIKA15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-[#FAF8F5] border border-[#D5C2AF] px-3 py-2 text-[11px] uppercase tracking-wider text-[#2D241E] focus:outline-none focus:border-[#4A1622] rounded-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#FAF8F5] hover:bg-[#F2E8DC] text-[#4A1622] border border-[#D5C2AF] text-[10px] uppercase tracking-wider font-semibold rounded-none transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {/* Subtotal lines */}
              <div className="space-y-1 text-xs text-[#6C5643]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#2D241E] tabular-nums">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-[#2E6B3E]">
                    <span>VIP 15% Privilege Discount</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="text-[#2E6B3E] font-medium">
                    {amountNeeded === 0 ? 'FREE' : '₹199'}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-semibold text-[#2D241E] pt-2 border-t border-[#EDE2D4]">
                  <span>Total</span>
                  <span className="tabular-nums font-serif-luxury text-base sm:text-lg text-[#4A1622]">
                    ₹{(finalSubtotal + (amountNeeded === 0 ? 0 : 199)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full bg-[#4A1622] hover:bg-[#350F18] text-white py-3 sm:py-3.5 text-xs uppercase tracking-[0.2em] font-medium rounded-none transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[9.5px] text-[#7A6451]">
                <div className="flex flex-col items-center">
                  <Truck className="w-3.5 h-3.5 text-[#4A1622] mb-0.5" />
                  <span>Free Insured Delivery</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4A1622] mb-0.5" />
                  <span>100% Certified</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-3.5 h-3.5 text-[#4A1622] mb-0.5" />
                  <span>7-Day Returns</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
