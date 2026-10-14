/**
 * Swarnika Asset Resolution Utility
 * 
 * In standard Vite production builds, assets placed in the `public/` directory
 * are served from the web root (`/`), not under `/public/`.
 * This helper canonicalizes asset URLs to `/assist/image/...`.
 */

export const CANONICAL_ASSET_BASE = '/assist/image';

/**
 * Normalizes an image path to its canonical public web URL.
 */
export function getAssetUrl(path?: string | null): string {
  if (!path) return '';

  let normalized = path.trim();

  // Convert Windows backslashes
  normalized = normalized.replace(/\\/g, '/');

  // Strip leading /public/ or public/
  if (normalized.startsWith('/public/')) {
    normalized = normalized.substring(7); // starts with '/'
  } else if (normalized.startsWith('public/')) {
    normalized = '/' + normalized.substring(7);
  }

  // Handle /public-assist-image/ or public-assist-image/
  if (normalized.startsWith('/public-assist-image/')) {
    normalized = '/assist/image/' + normalized.substring('/public-assist-image/'.length);
  } else if (normalized.startsWith('public-assist-image/')) {
    normalized = '/assist/image/' + normalized.substring('public-assist-image/'.length);
  }

  // Ensure absolute path
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }

  return normalized;
}

/**
 * Canonical brand and static editorial banner assets
 */
export const BRAND_ASSETS = {
  logoSvg: '/assist/image/brand/swarnika_logo.svg',
  heroBanner: '/assist/image/banners/hero_banner.jpg',
  heroPortrait: '/assist/image/banners/hero_model_portrait.jpg',
  craftsmanshipBanner: '/assist/image/banners/story_craftsmanship.jpg',
  bridalPromo: '/assist/image/banners/promo_bridal.jpg',
  everydayPromo: '/assist/image/banners/promo_everyday.jpg',
  newsletterGift: '/assist/image/banners/newsletter_gift.jpg',
  giftPackaging: '/assist/image/products/03_Cart_Gift_Packaging.jpg',
} as const;
