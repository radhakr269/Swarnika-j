/**
 * SWARNIKA — Visual Diary & Editorial Lookbook
 * Curated jewellery impressions showcase without dead or generic external social links.
 */

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
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
              ATELIER VISUAL ARCHIVE
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#201815] font-normal tracking-tight">
              Curated Lookbook & Moments
            </h2>
          </div>

          <div className="text-[10px] sm:text-xs text-[#7A6451] font-light hidden sm:block">
            <span>Jaipur-inspired aesthetics and royal silhouettes</span>
          </div>
        </div>

        {/* 6-Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square overflow-hidden bg-[#F2EAE0] block shadow-xs border border-[#E8DED1]"
            >
              <SafeImage
                src={post.image}
                alt={post.caption}
                fallbackCategory="Swarnika Lifestyle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-[#201815]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2 text-center">
                <Sparkles className="w-4 h-4 mb-1 text-[#E0D2C2]" />
                <p className="text-[10px] font-medium leading-tight line-clamp-2">
                  {post.caption}
                </p>
                <div className="flex items-center gap-1 text-[9px] text-[#E0D2C2] mt-1 font-sans">
                  <Heart className="w-2.5 h-2.5 fill-[#E0D2C2]" />
                  <span>{post.likes.toLocaleString()} curations</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
