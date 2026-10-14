/**
 * SWARNIKA — Route & Navigation Configuration
 * Centralized typed routes and navigation items across desktop, mobile and footer.
 */

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  WOMEN: '/women',
  MEN: '/men',
  COLLECTIONS: '/collections',
  CATEGORY: (slug: string) => `/category/${slug}`,
  PRODUCT: (slug: string) => `/product/${slug}`,
  WISHLIST: '/wishlist',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  ORDERS: '/account/orders',
  ORDER_DETAILS: (orderId: string) => `/account/orders/${orderId}`,
} as const;

export interface NavItem {
  label: string;
  href: string;
  categoryFilter?: string;
  isAction?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: ROUTES.HOME },
  { label: 'Shop All', href: ROUTES.SHOP, categoryFilter: 'all' },
  { label: 'Women', href: ROUTES.WOMEN, categoryFilter: 'women' },
  { label: 'Men', href: ROUTES.MEN, categoryFilter: 'men' },
  { label: 'Collections', href: ROUTES.COLLECTIONS },
  { label: 'Necklaces', href: ROUTES.CATEGORY('necklaces'), categoryFilter: 'necklaces' },
  { label: 'Rings', href: ROUTES.CATEGORY('rings'), categoryFilter: 'rings' },
  { label: 'Our Story', href: '#about-section', isAction: true },
];

export const CATEGORY_NAV_ITEMS = [
  { id: 'women', label: 'Women', href: ROUTES.WOMEN },
  { id: 'men', label: 'Men', href: ROUTES.MEN },
  { id: 'necklaces', label: 'Necklaces & Pendants', href: ROUTES.CATEGORY('necklaces') },
  { id: 'earrings', label: 'Earrings & Hoops', href: ROUTES.CATEGORY('earrings') },
  { id: 'rings', label: 'Rings & Bands', href: ROUTES.CATEGORY('rings') },
  { id: 'bracelets', label: 'Bracelets & Cuffs', href: ROUTES.CATEGORY('bracelets') },
] as const;

export const FOOTER_SHOP_LINKS = [
  { label: 'All Jewelry', href: ROUTES.SHOP, filter: 'all' },
  { label: 'Rings', href: ROUTES.CATEGORY('rings'), filter: 'rings' },
  { label: 'Necklaces', href: ROUTES.CATEGORY('necklaces'), filter: 'necklaces' },
  { label: 'Earrings', href: ROUTES.CATEGORY('earrings'), filter: 'earrings' },
  { label: 'Bracelets', href: ROUTES.CATEGORY('bracelets'), filter: 'bracelets' },
  { label: 'Wedding', href: ROUTES.COLLECTIONS, filter: 'wedding' },
  { label: 'Gifts', href: ROUTES.SHOP, filter: 'necklaces' },
];

export const FOOTER_ABOUT_LINKS = [
  { label: 'Our Story', href: '#about-section', action: 'story' },
  { label: 'Craftsmanship & Atelier', href: '#about-section', action: 'story' },
  { label: 'Hallmark & Certification', href: '#about-section', action: 'story' },
  { label: 'Sustainability & Ethics', href: '#about-section', action: 'story' },
];
