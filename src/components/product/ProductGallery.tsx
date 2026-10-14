import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../../data/jewelryData';
import { SafeImage } from '../SafeImage';

interface ProductGalleryProps {
  product: Product;
}

interface GalleryImage {
  id: 'product' | 'model' | 'closeup';
  label: string;
  src: string;
  fallbackSrc: string;
  altText: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  // Construct genuine image list based strictly on available images
  const images: GalleryImage[] = [
    {
      id: 'product',
      label: 'Still-Life',
      src: product.image,
      fallbackSrc: product.fallbackImage,
      altText: `${product.name} studio still-life photography`,
    },
    {
      id: 'model',
      label: 'Worn on Model',
      src: product.modelImage,
      fallbackSrc: product.fallbackModelImage,
      altText: `${product.name} worn on model`,
    },
  ];

  // Only add close-up if present and distinct
  if (product.closeupImage && product.closeupImage !== product.image) {
    images.push({
      id: 'closeup',
      label: 'Macro Detail',
      src: product.closeupImage,
      fallbackSrc: product.fallbackImage,
      altText: `${product.name} macro craftsmanship closeup`,
    });
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const zoomCloseButtonRef = useRef<HTMLButtonElement>(null);

  const activeImage = images[activeIndex] || images[0];

  // Reset active index if product changes
  useEffect(() => {
    setActiveIndex(0);
  }, [product.id]);

  // Lock background scroll when zoom lightbox is open
  useEffect(() => {
    if (isZoomOpen) {
      document.body.style.overflow = 'hidden';
      zoomCloseButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomOpen]);

  // Escape key handler for zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isZoomOpen) {
        setIsZoomOpen(false);
      } else if (isZoomOpen && e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (isZoomOpen && e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, images.length]);

  return (
    <div className="w-full flex flex-col space-y-3 sm:space-y-4">
      {/* ─────────────────────────────────────────────────────────────
          MAIN IMAGE CONTAINER
          ───────────────────────────────────────────────────────────── */}
      <div className="relative aspect-square w-full bg-[#F5ECE1] border border-[#E8DFD3] overflow-hidden group select-none">
        <SafeImage
          src={activeImage.src}
          fallbackSrc={activeImage.fallbackSrc}
          alt={activeImage.altText}
          fallbackCategory={product.category}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
        />

        {/* Minimalist Tag Badge if present */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-block bg-[#FAF7F2]/95 backdrop-blur-xs text-[#201815] border border-[#D5C8B8] px-2.5 py-0.5 text-[9.5px] uppercase font-medium tracking-wide shadow-2xs">
              {product.tag}
            </span>
          </div>
        )}

        {/* Active View Label Tag */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-block bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 text-[9px] uppercase tracking-wider font-light">
            {activeImage.label}
          </span>
        </div>

        {/* Zoom Trigger Button */}
        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#201815] hover:text-[#4A101C] flex items-center justify-center shadow-xs transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C]"
          aria-label="Enlarge image view"
          title="Zoom image"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          THUMBNAIL NAVIGATION STRIP
          ───────────────────────────────────────────────────────────── */}
      <div
        role="tablist"
        aria-label="Product image thumbnails"
        className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1"
      >
        {images.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={img.id}
              role="tab"
              aria-selected={isActive}
              aria-label={`View ${img.label}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative flex-1 aspect-square max-w-[80px] sm:max-w-[90px] bg-[#F5ECE1] border transition-all cursor-pointer overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A101C] ${
                isActive
                  ? 'border-[#4A101C] ring-1 ring-[#4A101C] shadow-2xs'
                  : 'border-[#E8DFD3] opacity-75 hover:opacity-100 hover:border-[#BFAFA0]'
              }`}
            >
              <SafeImage
                src={img.src}
                fallbackSrc={img.fallbackSrc}
                alt={`Thumbnail ${idx + 1}: ${img.label}`}
                fallbackCategory={product.category}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
              <span className="sr-only">{img.label}</span>
            </button>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ACCESSIBLE LIGHTBOX / IMAGE ENLARGER MODAL
          ───────────────────────────────────────────────────────────── */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${product.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
        >
          {/* Backdrop Click to close */}
          <div
            onClick={() => setIsZoomOpen(false)}
            className="absolute inset-0 cursor-zoom-out"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            {/* Top Bar with counter & close */}
            <div className="w-full flex items-center justify-between text-white/90 pb-3 select-none">
              <span className="text-xs uppercase tracking-widest font-light">
                {activeImage.label} ({activeIndex + 1} of {images.length})
              </span>
              <button
                ref={zoomCloseButtonRef}
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Close enlarged view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Enlarged Image Display */}
            <div className="relative aspect-square max-h-[75vh] w-auto bg-[#F5ECE1] border border-white/20 shadow-2xl overflow-hidden">
              <SafeImage
                src={activeImage.src}
                fallbackSrc={activeImage.fallbackSrc}
                alt={activeImage.altText}
                fallbackCategory={product.category}
                fallbackTitle={product.name}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-hidden"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-hidden"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail dots in lightbox */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 pt-3">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 transition-all rounded-full cursor-pointer ${
                      idx === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Jump to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
