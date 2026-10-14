import React from 'react';

export interface SwarnikaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'gold';
  showWordmark?: boolean;
  wordmarkSize?: 'sm' | 'md' | 'lg';
  layout?: 'horizontal' | 'stacked';
  subtitle?: string;
  className?: string;
  animateHover?: boolean;
}

export const SwarnikaLogo: React.FC<SwarnikaLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showWordmark = false,
  wordmarkSize = 'md',
  layout = 'horizontal',
  subtitle = 'JEWELLERY FOR A BRIGHTER YOU',
  className = '',
  animateHover = true,
}) => {
  // Dimensions for the icon
  const iconDimensions = {
    sm: 'w-5 h-5 sm:w-6 sm:h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
    xl: 'w-12 h-12',
  }[size];

  // Colors based on variant
  const colors = {
    dark: {
      primary: '#A77B3D',
      secondary: '#4A101C',
      textPrimary: '#201914',
      textSecondary: '#6C5849',
    },
    light: {
      primary: '#ECE0D1',
      secondary: '#FAF7F2',
      textPrimary: '#FFFDF9',
      textSecondary: '#ECE0D1',
    },
    gold: {
      primary: '#A77B3D',
      secondary: '#C9A875',
      textPrimary: '#4A101C',
      textSecondary: '#A77B3D',
    },
  }[variant];

  const wordmarkStyles = {
    sm: 'text-base sm:text-lg tracking-[0.22em]',
    md: 'text-xl sm:text-2xl lg:text-[25px] tracking-[0.24em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.26em]',
  }[wordmarkSize];

  const subtitleStyles = {
    sm: 'text-[6.5px] sm:text-[7px] tracking-[0.26em]',
    md: 'text-[7.5px] sm:text-[8px] tracking-[0.3em]',
    lg: 'text-[8.5px] sm:text-[9.5px] tracking-[0.32em]',
  }[wordmarkSize];

  return (
    <div
      className={`inline-flex items-center ${
        layout === 'stacked' ? 'flex-col text-center gap-1 sm:gap-1.5' : 'flex-row gap-2 sm:gap-2.5 text-left'
      } ${className}`}
      role="img"
      aria-label="SWARNIKA Luxury Jewellery Logo"
    >
      {/* Exquisite Sacred Lotus / Heritage Emblem */}
      <div
        className={`${iconDimensions} shrink-0 flex items-center justify-center transition-transform duration-300 ${
          animateHover ? 'group-hover:scale-105' : ''
        }`}
      >
        <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Outer Lotus Petals */}
          <path
            d="M24 6C24 6 27.5 15.5 35 19.5C31 22 28 27 24 33C20 27 17 22 13 19.5C20.5 15.5 24 6 24 6Z"
            fill={colors.primary}
            fillOpacity="0.18"
            stroke={colors.primary}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Flanking Side Petals */}
          <path
            d="M24 16C28 19 36 21 40 28C34 30 29 29 24 33C19 29 14 30 8 28C12 21 20 19 24 16Z"
            stroke={colors.primary}
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {/* Center Petal Core */}
          <path
            d="M24 10C24 10 26.5 17 29 21C26 23 24 27 24 27C24 27 22 23 19 21C21.5 17 24 10 24 10Z"
            fill={colors.secondary}
            stroke={colors.secondary}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Base Ornamental Arc */}
          <path
            d="M17 35C20 37 24 37.5 24 37.5C24 37.5 28 37 31 35"
            stroke={colors.primary}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="24" cy="38" r="1.5" fill={colors.primary} />
        </svg>
      </div>

      {/* Wordmark and Subtitle */}
      {showWordmark && (
        <div className={`flex flex-col ${layout === 'stacked' ? 'items-center' : 'items-start'}`}>
          <span
            className={`font-serif-luxury ${wordmarkStyles} font-normal uppercase leading-none`}
            style={{ color: colors.textPrimary }}
          >
            SWARNIKA
          </span>
          {subtitle && (
            <span
              className={`uppercase font-sans font-medium mt-1 ${subtitleStyles}`}
              style={{ color: colors.textSecondary }}
            >
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
