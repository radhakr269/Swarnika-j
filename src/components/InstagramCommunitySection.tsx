import React from 'react';
import { ArrowRight, Heart, Instagram } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/jewelryData';
import { SafeImage } from './SafeImage';

export const InstagramCommunitySection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[#FAF6F0] border-t border-[#EBE1D3]">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        
        {/* Header row */}
        <div className="flex items-end justify-between mb-4 sm:mb-6 pb-2.5 border-b border-[#EBE1D3] gap-2">
          <div>
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.24em] text-[#987853] font-semibold block mb-0.5">
              FOLLOW US ON INSTAGRAM @SWARNIKA_JEWELS
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#201815] font-normal tracking-tight">
              Join Our Shining Community
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-[10px] sm:text-xs uppercase tracking-[0.14em] font-medium text-[#201815] hover:text-[#4A1622] transition-colors shrink-0"
          >
            <span>Follow on Instagram</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* 6-Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[#F2EAE0] block shadow-xs"
            >
              <SafeImage
                src={post.image}
                alt={post.caption}
                fallbackCategory="Swarnika Lifestyle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-[#201815]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-1 text-center">
                <Instagram className="w-4 h-4 mb-0.5 text-white/90" />
                <div className="flex items-center gap-1 text-[10px] font-semibold">
                  <Heart className="w-2.5 h-2.5 fill-white" />
                  <span>{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
