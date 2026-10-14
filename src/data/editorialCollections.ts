/**
 * SWARNIKA — Editorial Collections Configuration
 * Four approved luxury editorial themes with verified product mappings.
 */

export interface EditorialCollection {
  id: 'bridal' | 'festive' | 'minimal' | 'gifting';
  title: string;
  subtitle: string;
  eyebrow: string;
  description: string;
  image: string;
  productIds: string[];
  ctaLabel: string;
  ctaLink: string;
}

export const EDITORIAL_COLLECTIONS: EditorialCollection[] = [
  {
    id: 'bridal',
    title: 'Bridal Edit',
    subtitle: 'Auspicious Ceremonial Heirlooms',
    eyebrow: 'CHAPTER 01 · VIVAH & HIGH CELEBRATION',
    description:
      'Opulent bridal suites featuring handcrafted uncut polki chokers, crescent chandbalis, traditional floral temple bangles, and sacred mangalsutras created for memorable wedding ceremonies.',
    image: '/assist/image/banners/promo_bridal.jpg',
    productIds: ['P17', 'P06', 'P18', 'P16'],
    ctaLabel: 'Explore Bridal Edit',
    ctaLink: '/shop?category=necklaces',
  },
  {
    id: 'festive',
    title: 'Festive Gold',
    subtitle: 'Traditional Celebration Finishes',
    eyebrow: 'CHAPTER 02 · TRADITION & FESTIVE RADIANCE',
    description:
      'Celebratory designs featuring royal filigree dome jhumkas, emerald and pearl drop accents, twisted rope kadas, and floral cocktail rings designed for festive gatherings and receptions.',
    image: '/assist/image/categories/women.jpg',
    productIds: ['P07', 'P08', 'P13', 'P12'],
    ctaLabel: 'Explore Festive Gold',
    ctaLink: '/shop?category=earrings',
  },
  {
    id: 'minimal',
    title: 'Minimal Statements',
    subtitle: 'Modern Everyday Refinement',
    eyebrow: 'CHAPTER 03 · EFFORTLESS DAILY ELEGANCE',
    description:
      'Understated contemporary luxury featuring micro-pavé huggie hoops, solitaire studs, continuous tennis bracelets, open cuffs, and brilliant halo rings designed for effortless daily wear.',
    image: '/assist/image/banners/promo_everyday.jpg',
    productIds: ['P10', 'P09', 'P14', 'P15', 'P11'],
    ctaLabel: 'Explore Minimal Statements',
    ctaLink: '/shop?category=bracelets',
  },
  {
    id: 'gifting',
    title: 'Gifted Elegance',
    subtitle: 'Distinctive Pieces for Memorable Occasions',
    eyebrow: 'CHAPTER 04 · MILESTONES & TIMELESS GIFTS',
    description:
      'Thoughtfully selected jewellery for birthdays, anniversaries, and personal milestones, including radiant tennis wristwear, classic chain links, signet crest rings, and comfort bands.',
    image: '/assist/image/products/03_Cart_Gift_Packaging.jpg',
    productIds: ['P14', 'P09', 'P19', 'P22', 'P25'],
    ctaLabel: 'Explore Gifted Elegance',
    ctaLink: '/shop?category=all',
  },
];

export const VALID_COLLECTION_IDS = ['bridal', 'festive', 'minimal', 'gifting'] as const;
export type CollectionId = (typeof VALID_COLLECTION_IDS)[number];
