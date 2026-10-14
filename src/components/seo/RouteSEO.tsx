/**
 * SWARNIKA — Route-Specific SEO & Privacy Directives
 * Dynamically synchronizes document title, description, OpenGraph, Twitter cards,
 * private route noindex directives, and truthful Schema.org JSON-LD.
 */

import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ALL_PRODUCTS } from '../../data/jewelryData';

export const RouteSEO: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    let title = 'Swarnika — Timeless Jewellery, Crafted to Be Seen';
    let description =
      'Exquisite gold-plated and artisanal jewellery for women and men, designed for modern elegance and lasting impressions.';
    let isPrivate = false;
    let structuredData: object | null = null;

    if (path === '/') {
      title = 'Swarnika — Timeless Jewellery, Crafted to Be Seen';
      description =
        'Explore Jaipur-inspired uncut polki, handcrafted jhumkas, bridal necklaces, and modern signets by Swarnika.';
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Swarnika',
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/shop?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      };
    } else if (path === '/shop') {
      title = 'Shop All Jewellery Curations | Swarnika';
      description =
        'Browse our complete catalogue of 20 artisanal heirlooms: necklaces, earrings, rings, and link bracelets in 18K gold polish.';
    } else if (path === '/women') {
      title = "Women's Royal Jewellery Collection | Swarnika";
      description =
        'Handcrafted heritage polki chokers, crescent chandbalis, dome jhumkas, and timeless necklaces for women.';
    } else if (path === '/men') {
      title = "Men's Modern Jewellery Collection | Swarnika";
      description =
        'Architectural signet rings, heavyweight chains, and bold cuffs engineered with substantial presence and refined finish.';
    } else if (path === '/collections') {
      title = 'Curated Editorial Suites & Bridal Edit | Swarnika';
      description =
        'Discover thematic bridal edits, festive gold, minimal everyday statements, and gifted elegance.';
    } else if (path.startsWith('/category/')) {
      const slug = path.replace('/category/', '').split('/')[0];
      const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);
      title = `${capitalized} Collection | Swarnika Fine Jewellery`;
      description = `Discover handcrafted ${slug} featuring uncut polki stones, artisanal filigree, and warm gold-plated finishes.`;
    } else if (path.startsWith('/product/')) {
      const slug = path.replace('/product/', '').split('/')[0];
      const product = ALL_PRODUCTS.find(
        (p) => p.id.toLowerCase() === slug.toLowerCase() || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
      );

      if (product) {
        title = `${product.name} | Swarnika Fine Jewellery`;
        description = product.description;
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: [window.location.origin + product.image],
          description: product.description,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          },
        };
      } else {
        title = 'Artisanal Piece Details | Swarnika';
      }
    } else if (path === '/wishlist') {
      title = 'Saved Heirlooms & Wishlist | Swarnika';
      description = 'Review your saved favourite jewellery selections and wishlist heirlooms.';
      isPrivate = true;
    } else if (path === '/cart') {
      title = 'Shopping Bag | Swarnika';
      isPrivate = true;
    } else if (path === '/checkout') {
      title = 'Checkout Gateway | Swarnika';
      isPrivate = true;
    } else if (path.startsWith('/account')) {
      title = 'Patron Account & Consignments | Swarnika';
      description = 'Manage your saved delivery addresses, sizing preferences, and insured consignments.';
      isPrivate = true;
    }

    // 1. Update Title
    document.title = title;

    // 2. Helper to set or update meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', path.startsWith('/product/') ? 'product' : 'website');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    // 3. Privacy Directives (noindex for private customer routes)
    if (isPrivate) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow');
    }

    // 4. Schema.org JSON-LD structured data injection
    const existingScript = document.getElementById('swarnika-seo-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (structuredData && !isPrivate) {
      const script = document.createElement('script');
      script.id = 'swarnika-seo-jsonld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [path]);

  return null;
};
