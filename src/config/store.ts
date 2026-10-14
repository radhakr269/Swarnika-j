/**
 * SWARNIKA — Store Configuration & Commercial Rules
 * Centralizes commercial parameters, promo rules, thresholds, and brand constants.
 */

export const STORE_CONFIG = {
  brandName: 'SWARNIKA',
  brandTagline: 'Timeless Jewellery, Crafted to Be Seen',
  foundingYear: 1994,

  // Commercial Shipping Rules
  freeShippingThreshold: 2999,
  standardShippingFee: 199,

  // VIP Privilege Codes
  promoCodes: [
    { code: 'SWARNIKA15', discountPercent: 15, description: '15% First Acquisition Privilege' },
    { code: 'WELCOME15', discountPercent: 15, description: '15% Welcome Privilege' },
  ],

  // Currency
  currency: {
    symbol: '₹',
    code: 'INR',
    locale: 'en-IN',
  },

  // Contact & Concierge (verified email channel only)
  concierge: {
    email: 'concierge@swarnika.com',
  },

  // Trust Highlights
  guarantees: [
    { title: '100% Certified Authentic', description: 'BIS Hallmarked and certified precious plating' },
    { title: 'Complimentary Insured Delivery', description: 'Tamper-evident transit packaging on orders over ₹2,999' },
    { title: '7-Day Return Policy', description: 'Hassle-free inspection with prepaid collection' },
  ],
} as const;

/**
 * Format currency in Indian Rupees format (e.g. ₹4,499)
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
