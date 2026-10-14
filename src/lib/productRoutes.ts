import { Product, ALL_PRODUCTS } from '../data/jewelryData';

/**
 * Converts a product into a canonical URL slug.
 * Format: {ID}-{sanitized-name}
 * Example: "P06-aafreen-royal-chandbali-earrings"
 */
export function getProductSlug(product: Product): string {
  const sanitizedName = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${product.id}-${sanitizedName}`;
}

/**
 * Returns the canonical URL path for a product.
 * Example: "/product/P06-aafreen-royal-chandbali-earrings"
 */
export function getProductUrl(product: Product): string {
  return `/product/${getProductSlug(product)}`;
}

/**
 * Resolves a product by slug or product ID.
 * Supports:
 * - Canonical slug: "P06-aafreen-royal-chandbali-earrings" (case-insensitive)
 * - Raw ID: "P06" or "p06"
 * - Partial slug with ID prefix: "P06-anything"
 * Returns undefined if no product matches.
 */
export function getProductBySlug(
  slug?: string | null,
  products: Product[] = ALL_PRODUCTS
): Product | undefined {
  if (!slug) return undefined;

  const raw = decodeURIComponent(slug).trim().toLowerCase();

  // 1. Direct ID match (e.g. "p06")
  const idMatch = products.find((p) => p.id.toLowerCase() === raw);
  if (idMatch) return idMatch;

  // 2. Prefix ID match (e.g. "p06-...")
  const prefixId = raw.split('-')[0];
  const prefixMatch = products.find((p) => p.id.toLowerCase() === prefixId);
  if (prefixMatch) return prefixMatch;

  // 3. Exact slug match
  return products.find((p) => getProductSlug(p).toLowerCase() === raw);
}
