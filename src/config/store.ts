/**
 * SWARNIKA — Store Configuration & Commercial Rules
 * Centralizes commercial parameters, promo rules, thresholds, and brand constants.
 */

export const STORE_CONFIG = {
  brandName: 'SWARNIKA',
  brandTagline: 'Timeless Jewellery, Crafted to Be Seen',

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

  // Contact & Concierge (Inquiry channel)
  concierge: {
    email: 'concierge@swarnika.com',
  },

  // Trust Highlights (Accurate, restrained commercial standards)
  guarantees: [
    {
      title: 'Thoughtfully Designed',
      description: 'Artisanal jewellery crafted with premium gold-plated finishes and intricate detailing',
    },
    {
      title: 'Complimentary Delivery',
      description: 'Free courier shipping across India on all orders exceeding ₹2,999',
    },
    {
      title: 'Atelier Sizing Assistance',
      description: 'Dedicated support for sizing adjustments, custom fits, and personal styling',
    },
  ],
} as const;

/**
 * Format currency in Indian Rupees format (e.g. ₹4,499)
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
