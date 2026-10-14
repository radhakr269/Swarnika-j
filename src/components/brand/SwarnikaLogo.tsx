import React from 'react';

export interface SwarnikaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'gold';
  showWordmark?: boolean;
  wordmarkSize?: 'sm' | 'md' | 'lg';
  className?: string;
  animateHover?: boolean;
}

export const SwarnikaLogo: React.FC<SwarnikaLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showWordmark = false,
  wordmarkSize = 'md',
  className = '',
  animateHover = true,
}) => {
  // Dimensions for the icon
  const iconDimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  }[size];

  // Stroke and fill colors based on variant
  const colors = {
    dark: {
      primary: '#4A1622',
      secondary: '#A48257',
      centerBg: '#FAF7F2',
      primaryFill: 'rgba(74, 22, 34, 0.08)',
      textPrimary: '#201815',
      textSecondary: '#8A735E',
    },
    light: {
      primary: '#FAF7F2',
      secondary: '#ECE0D1',
      centerBg: '#201815',
      primaryFill: 'rgba(250, 247, 242, 0.12)',
      textPrimary: '#FAF7F2',
      textSecondary: '#ECE0D1',
    },
    gold: {
      primary: '#A77B3D',
      secondary: '#4A1622',
      centerBg: '#FAF7F2',
      primaryFill: 'rgba(167, 123, 61, 0.12)',
      textPrimary: '#201815',
      textSecondary: '#A77B3D',
    },
  }[variant];

  const wordmarkStyles = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl sm:text-2xl tracking-[0.24em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.26em]',
  }[wordmarkSize];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`} role="img" aria-label="SWARNIKA Luxury Jewellery Logo">
      {/* Geometric Sacred Diamond & Star Emblem */}
      <div
        className={`${iconDimensions} shrink-0 flex items-center justify-center transition-transform duration-300 ${
          animateHover ? 'group-hover:rotate-45' : ''
        }`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" aria-hidden="true">
          {/* Outer Diamond */}
          <polygon
            points="50,4 64,36 96,50 64,64 50,96 36,64 4,50 36,36"
            stroke={colors.primary}
            strokeWidth="3.5"
            fill={colors.primaryFill}
          />
          {/* Inner Geometric Star */}
          <polygon
            points="50,18 60,40 82,50 60,60 50,82 40,60 18,50 40,40"
            stroke={colors.secondary}
            strokeWidth="2.5"
            fill="none"
          />
          {/* Center Radiant Core */}
          <circle cx="50" cy="50" r="10" stroke={colors.primary} strokeWidth="2.5" fill={colors.centerBg} />
          <circle cx="50" cy="50" r="4.5" fill={colors.secondary} />
        </svg>
      </div>

      {/* Optional Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-serif-luxury ${wordmarkStyles} font-normal uppercase leading-none`}
            style={{ color: colors.textPrimary }}
          >
            SWARNIKA
          </span>
          <span
            className="text-[7.5px] uppercase tracking-[0.34em] font-sans -mt-0.5 font-medium"
            style={{ color: colors.textSecondary }}
          >
            TIMELESS JEWELLERY
          </span>
        </div>
      )}
    </div>
  );
};
