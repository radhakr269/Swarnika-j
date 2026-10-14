import React, { useState } from 'react';
import {
  Search,
  Heart,
  Bell,
  Home,
  Crown,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Star,
  Plus,
  Minus,
  Trash2,
  Gift,
  ShieldCheck,
  Truck,
  RotateCcw,
  Watch,
  ChevronRight,
  Check,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS, Product } from '../data/jewelryData';
import { SafeImage } from './SafeImage';

export const LumiereView: React.FC = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setIsCheckoutOpen,
    setViewMode,
  } = useShop();

  const [activeTab, setActiveTab] = useState('Home');
  const [searchWord, setSearchWord] = useState('');

  const sidebarNavItems = [
    { label: 'Home', icon: Home },
    { label: 'Necklaces', icon: Sparkles },
    { label: 'Rings', icon: Crown },
    { label: 'Earrings', icon: Sparkles },
    { label: 'Bracelets', icon: Sparkles },
    { label: 'Watches', icon: Watch },
    { label: 'Collections', icon: Crown },
    { label: 'Gifts', icon: Gift },
    { label: 'Offers', icon: Sparkles },
    { label: 'My Orders', icon: ShoppingBag },
  ];

  const circularCategories = [
    { name: 'Rings', img: '/public/assist/image/categories/rings.jpg' },
    { name: 'Necklaces', img: '/public/assist/image/categories/necklaces.jpg' },
    { name: 'Earrings', img: '/public/assist/image/categories/earrings.jpg' },
    { name: 'Bracelets', img: '/public/assist/image/categories/bracelets.jpg' },
    { name: 'Pendants', img: '/public/assist/image/categories/pendants.jpg' },
    { name: 'Watches', img: '/public/assist/image/categories/watches.jpg' },
    { name: 'Engagement', img: '/public/assist/image/categories/engagement.jpg' },
  ];

  const newArrivals = ALL_PRODUCTS.slice(4, 8);
  const featured = ALL_PRODUCTS.slice(8, 12);
  const recommended = ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#111113] text-[#E4DFD7] flex">
      {/* 1. Left Dark Sidebar (Exact match to Screenshot 2) */}
      <aside className="w-56 bg-[#161619] border-r border-[#26262B] hidden lg:flex flex-col justify-between py-6 shrink-0 sticky top-0 h-screen">
        <div>
          {/* Logo */}
          <div className="px-6 mb-8 text-center">
            <div className="flex items-center justify-center text-[#D4AF37] mb-1">
              <Crown className="w-6 h-6 stroke-[1.6]" />
            </div>
            <h1 className="font-serif-luxury tracking-[0.25em] text-lg font-bold text-[#F3EBE1] uppercase">
              LUMIÈRE
            </h1>
            <p className="text-[8px] uppercase tracking-[0.25em] text-[#9A876B]">
              JEWELRY FOR A BRIGHTER YOU
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 px-3">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#C5A059] text-[#121214] font-semibold shadow-md'
                      : 'text-[#9E9BA3] hover:text-white hover:bg-[#202025]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Motif */}
        <div className="px-6 text-center border-t border-[#232328] pt-6 space-y-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37] mx-auto" />
          <h4 className="font-serif-luxury text-sm text-[#F3EBE1]">Shine Everyday</h4>
          <p className="text-[10px] text-[#86838D] leading-tight">
            More Than Jewelry <br /> A Feeling
          </p>

          <button
            onClick={() => setViewMode('aurelia')}
            className="mt-3 w-full py-1.5 px-2 bg-[#232328] hover:bg-[#2D2D33] text-[10px] text-[#C5A059] rounded border border-[#3A3840] transition-colors"
          >
            Switch to Aurelia View
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#0F0F12] pb-16 overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#161619]/90 backdrop-blur-md border-b border-[#26262B] px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Search bar */}
          <div className="flex-1 max-w-lg relative">
            <input
              type="text"
              placeholder="Search for gold, diamond, rings, necklaces..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full bg-[#202025] border border-[#2D2D35] rounded-lg py-2 pl-4 pr-10 text-xs text-[#E4DFD7] placeholder-[#797782] focus:outline-none focus:border-[#C5A059]"
            />
            <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#797782] hover:text-white">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* User profile & quick actions */}
          <div className="flex items-center gap-4">
            <button className="text-[#9E9BA3] hover:text-white p-1">
              <Heart className="w-5 h-5" />
            </button>
            <button className="text-[#9E9BA3] hover:text-white p-1 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#C5A059] rounded-full" />
            </button>

            {/* User Pill */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-[#26262B]">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A059]">
                <SafeImage
                  src="/public/assist/image/avatars/ananya_sharma.jpg"
                  alt="Ayesha"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-semibold text-[#F3EBE1]">Hi, Ayesha</span>
                <span className="block text-[10px] text-[#C5A059] font-medium">Gold Member</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-10 max-w-6xl mx-auto">
          {/* Hero Banner (Timeless Elegance) */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1E1A16] to-[#2B231B] border border-[#3E3427] min-h-[300px] sm:min-h-[340px] flex items-center p-8 sm:p-12 shadow-2xl">
            <div className="relative z-10 max-w-md space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-semibold">
                FOR LIFE'S MOST PRECIOUS MOMENTS
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl text-[#F9F5EF] leading-tight">
                Timeless Elegance
              </h2>
              <p className="text-xs text-[#B5AFA4] font-light">
                JEWELRY THAT TELLS YOUR STORY
              </p>
              <button
                onClick={() => {
                  const el = document.getElementById('lumiere-arrivals');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#B38F48] text-[#121214] text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
              >
                <span>SHOP THE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block">
              <SafeImage
                src="/public/assist/image/banners/hero_model_portrait.jpg"
                alt="Model wearing diamond jewelry"
                className="w-full h-full object-cover object-top opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E1A16] via-[#1E1A16]/40 to-transparent" />
            </div>
          </div>

          {/* Category Pills (Circular Row) */}
          <div className="flex items-center gap-6 overflow-x-auto pb-2 no-scrollbar">
            {circularCategories.map((c) => (
              <div key={c.name} className="flex flex-col items-center shrink-0 group cursor-pointer">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#3A3840] group-hover:border-[#C5A059] p-0.5 transition-colors">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#202025]">
                    <SafeImage src={c.img} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <span className="text-[11px] font-medium text-[#AFAAB5] group-hover:text-white mt-2">
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          {/* New Arrivals Section */}
          <section id="lumiere-arrivals" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif-luxury font-medium text-[#F3EBE1]">New Arrivals</h3>
                <p className="text-[11px] text-[#7E7B86]">Discover our latest collections</p>
              </div>
              <button className="text-xs text-[#C5A059] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newArrivals.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#18181C] border border-[#26262D] rounded-xl p-3 flex flex-col justify-between hover:border-[#3D3A44] transition-all group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-[#121215] mb-2.5">
                    <SafeImage src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center text-white/80 hover:text-white"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(prod.id) ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-[#E4DFD7] truncate">{prod.name}</h4>
                    <p className="text-xs font-semibold text-[#C5A059] tabular-nums">${prod.price.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    className="mt-3 w-full py-1.5 bg-[#25252B] hover:bg-[#C5A059] hover:text-[#121214] text-xs font-medium text-[#DDD8CE] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Exclusive Deals 40% OFF Banner (Matching Screenshot 2) */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#1F1911] via-[#2A2215] to-[#1F1911] border border-[#4A3B23] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                EXCLUSIVE DEALS
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F9F5EF]">
                UP TO 40% OFF
              </h3>
              <p className="text-xs text-[#B5AFA4]">On Selected Jewelry Collections</p>
              <div className="pt-2">
                <button
                  onClick={() => addToCart(ALL_PRODUCTS[0])}
                  className="bg-[#C5A059] hover:bg-[#B38F48] text-[#121214] text-xs uppercase tracking-wider font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  SHOP DEALS →
                </button>
              </div>
            </div>

            <div className="w-full sm:w-64 h-32 rounded-lg overflow-hidden border border-[#3E3427]">
              <SafeImage
                src="/public/assist/image/products/P14_Ziva_Tennis_Bracelet_Product.jpg"
                alt="Gold Diamond Bangle"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Featured Products */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif-luxury font-medium text-[#F3EBE1]">Featured Products</h3>
                <p className="text-[11px] text-[#7E7B86]">Handpicked favorites just for you</p>
              </div>
              <button className="text-xs text-[#C5A059] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#18181C] border border-[#26262D] rounded-xl p-3 flex flex-col justify-between hover:border-[#3D3A44] transition-all group"
                >
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-[#121215] mb-2.5">
                    <SafeImage src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-xs flex items-center justify-center text-white/80 hover:text-white"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isInWishlist(prod.id) ? 'fill-[#C5A059] text-[#C5A059]' : ''}`} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-[#E4DFD7] truncate">{prod.name}</h4>
                    <p className="text-xs font-semibold text-[#C5A059] tabular-nums">${prod.price.toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => addToCart(prod)}
                    className="mt-3 w-full py-1.5 bg-[#25252B] hover:bg-[#C5A059] hover:text-[#121214] text-xs font-medium text-[#DDD8CE] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* VIP Lumière Circle Banner (Matching Screenshot 2) */}
          <div className="rounded-xl bg-[#1A191D] border border-[#2E2B35] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#26221D] border border-[#483B25] flex items-center justify-center text-[#D4AF37]">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-luxury text-base text-[#F3EBE1]">LUMIÈRE CIRCLE</h4>
                <p className="text-xs text-[#8E8B95]">Exclusive Rewards & Private Vault for Special People</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#C5A059] font-medium">Early Access • Double Points</span>
              <button
                onClick={() => alert('Welcome to Lumière Circle VIP Membership!')}
                className="bg-[#C5A059] hover:bg-[#B38F48] text-[#121214] text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Right Cart Panel (Dedicated on Desktop in Lumière View) */}
      <aside className="w-80 bg-[#161619] border-l border-[#26262B] hidden xl:flex flex-col justify-between p-6 shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#26262B]">
            <h3 className="font-serif-luxury text-base font-semibold text-[#F3EBE1]">
              Your Cart ({cartItemCount})
            </h3>
            <span className="text-xs text-[#C5A059] font-mono">
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          {/* Cart Items */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.product.id} className="p-2.5 bg-[#1F1F24] border border-[#2D2D35] rounded-xl flex gap-3">
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/40 shrink-0">
                  <SafeImage src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <h5 className="text-xs font-medium text-[#E4DFD7] truncate">{item.product.name}</h5>
                    <button onClick={() => removeFromCart(item.product.id)} className="text-[#7A7782] hover:text-red-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5 text-xs text-[#9E9BA3]">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-0.5 hover:text-white">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-0.5 hover:text-white">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-[#C5A059] tabular-nums">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gift Box Upsell (Matching Screenshot 2) */}
          <div className="p-3 bg-[#1C1B17] border border-[#3D3320] rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Gift className="w-5 h-5 text-[#C5A059] shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-[#F3EBE1]">A Special Gift Awaits</p>
                <p className="text-[9px] text-[#8E8B95]">Add velvet gift box for just $19</p>
              </div>
            </div>
            <button
              onClick={() => addToCart(ALL_PRODUCTS[0], 1, 'Gift Wrap')}
              className="px-2.5 py-1 bg-[#C5A059] hover:bg-[#B38F48] text-[#121214] text-[10px] font-bold rounded-md transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Subtotal & Checkout */}
        <div className="pt-4 border-t border-[#26262B] space-y-3">
          <div className="flex items-center justify-between text-xs text-[#9E9BA3]">
            <span>Subtotal</span>
            <span className="text-sm font-semibold text-white tabular-nums">${cartTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full bg-[#C5A059] hover:bg-[#B38F48] text-[#121214] text-xs uppercase tracking-wider font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-3 gap-1 pt-2 text-center text-[9px] text-[#7E7B86]">
            <span>Free Shipping</span>
            <span>Secure Payment</span>
            <span>Easy Returns</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
