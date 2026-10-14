import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  fallbackTitle?: string;
  fallbackSrc?: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'Luxury Jewelry',
  fallbackCategory = 'Fine Jewelry',
  fallbackTitle,
  fallbackSrc,
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // When src changes, update currentSrc and reset state
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback URL if the primary src failed
      setCurrentSrc(fallbackSrc);
      setIsLoaded(false);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#F5EFE6] via-[#EFE6D9] to-[#E5D7C3] text-[#7A644C] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full border border-[#D5C2AB] flex items-center justify-center bg-white/50 mb-1.5 shadow-xs">
          <Sparkles className="w-5 h-5 text-[#9A7B56]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#8F7453] text-center">
          {fallbackCategory}
        </span>
        {fallbackTitle && (
          <span className="text-[11px] font-serif italic text-[#574431] mt-0.5 text-center line-clamp-1 px-2">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5EFE6] to-[#E9DECE] animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
