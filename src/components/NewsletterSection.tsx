import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'info');
      return;
    }
    setIsSubscribed(true);
    addToast('Welcome to Swarnika', 'Your 15% discount code is SWARNIKA15!');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('SWARNIKA15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    addToast('Code Copied', '15% coupon SWARNIKA15 copied to clipboard.');
  };

  return (
    <section id="newsletter-section" className="py-8 sm:py-12 md:py-14 bg-[#EDE3D6] border-t border-[#DFD0BE]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="bg-[#FAF6F0] border border-[#E6D9CA] p-5 sm:p-8 md:p-10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 space-y-2.5 sm:space-y-3">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#201815] font-normal tracking-tight">
                Get Exclusive Offers
              </h2>
              <p className="text-[11px] sm:text-xs md:text-sm text-[#735F4C] max-w-md font-light leading-relaxed">
                Subscribe and receive 15% off your first handcrafted piece, plus priority invitations to private collections and private trunk shows.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="pt-1.5 flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="flex-1 bg-white border border-[#D5C2AD] px-3.5 py-2.5 text-xs text-[#201815] placeholder-[#9E8B79] uppercase tracking-wider focus:outline-none focus:border-[#4A1622]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#4A1622] hover:bg-[#381019] text-white text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold px-5 py-2.5 transition-colors shrink-0 shadow-none cursor-pointer"
                  >
                    REVEAL 15% CODE
                  </button>
                </form>
              ) : (
                <div className="pt-1.5 space-y-2">
                  <div className="inline-flex items-center gap-2 bg-[#F0E6D8] border border-[#D5C2AD] px-3 py-1.5 text-xs text-[#3E3024]">
                    <span className="font-medium">Use code:</span>
                    <span className="font-mono font-bold text-[#4A1622] tracking-wider">SWARNIKA15</span>
                    <button
                      onClick={handleCopyCode}
                      className="ml-2 text-[#4A1622] hover:text-[#201815] flex items-center gap-1 text-[11px] font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#7A6451]">
                    Applied automatically at checkout for 15% off your order.
                  </p>
                </div>
              )}
            </div>

            {/* Right Decorative Gift Showcase */}
            <div className="md:col-span-5 relative flex items-center justify-center md:justify-end">
              <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-none overflow-hidden shadow-sm border border-[#E8DECE]/60 bg-[#F4E9DD]">
                <SafeImage
                  src="/assist/image/banners/newsletter_gift.jpg"
                  alt="Swarnika luxury gift packaging"
                  fallbackCategory="Luxury Packaging"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white">
                    Signature Velvet Box Included
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
