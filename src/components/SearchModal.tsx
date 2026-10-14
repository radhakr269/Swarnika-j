import React, { useState } from 'react';
import { Search, X, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ALL_PRODUCTS } from '../data/jewelryData';
import { SafeImage } from './SafeImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useShop();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 6);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-12 sm:pt-20 p-3 sm:p-4">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-none max-w-2xl w-full border border-[#E4D5C4] shadow-2xl overflow-hidden z-10 p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-[#D8C7B4] pb-3 sm:pb-4">
          <Search className="w-5 h-5 text-[#4A1622] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gold necklaces, ruby rings, jhumkas, hoops..."
            className="w-full bg-transparent text-sm sm:text-lg text-[#2D241E] placeholder-[#9E8B79] focus:outline-none"
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#7A6451] hover:text-[#2D241E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs text-[#6C5541]">
          <span className="font-semibold uppercase text-[9.5px] tracking-wider text-[#4A1622]">
            Popular:
          </span>
          {['Ruby Pendant', 'Fluted Hoops', 'Cuban Chain', 'Statement Ring', 'Polki Drops', 'Signet Ring'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="bg-[#F0E6D8] hover:bg-[#E8D9C6] px-2.5 py-1 text-[11px] rounded-none transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results grid */}
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8C7662]">
            {query.trim() ? `Search Results (${filtered.length})` : 'Curated Recommendations'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
            {filtered.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  setQuickViewProduct(prod);
                  setIsSearchOpen(false);
                }}
                className="flex items-center gap-3 p-2.5 bg-white border border-[#EDE2D4] hover:border-[#4A1622] cursor-pointer transition-colors shadow-xs group"
              >
                <div className="w-14 h-14 bg-[#F5ECE1] shrink-0 overflow-hidden">
                  <SafeImage
                    src={prod.image}
                    fallbackSrc={prod.fallbackImage}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#201815] truncate group-hover:text-[#4A1622] transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-[10px] text-[#8C7662] capitalize">
                    {prod.category}
                  </p>
                  <p className="text-xs font-bold text-[#4A1622] tabular-nums mt-0.5">
                    ₹{prod.price.toLocaleString()}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full border border-[#D5C6B5] flex items-center justify-center text-[#4A1622] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
