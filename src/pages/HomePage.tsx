import React from 'react';
import { SwarnikaHero } from '../components/SwarnikaHero';
import { SwarnikaValueProps } from '../components/SwarnikaValueProps';
import { SwarnikaCategories } from '../components/SwarnikaCategories';
import { SwarnikaBestsellers } from '../components/SwarnikaBestsellers';
import { DualPromoBanner } from '../components/DualPromoBanner';
import { OurStorySection } from '../components/OurStorySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { InstagramCommunitySection } from '../components/InstagramCommunitySection';
import { NewsletterSection } from '../components/NewsletterSection';

/**
 * HomePage Component
 * Renders the exact 9 storefront sections in their original sequence:
 * 1. SwarnikaHero
 * 2. SwarnikaValueProps
 * 3. SwarnikaCategories
 * 4. SwarnikaBestsellers
 * 5. DualPromoBanner
 * 6. OurStorySection
 * 7. TestimonialsSection
 * 8. InstagramCommunitySection
 * 9. NewsletterSection
 */
export const HomePage: React.FC = () => {
  return (
    <>
      {/* Section 1: Hero Section */}
      <SwarnikaHero />

      {/* Section 2: Value Proposition Strip */}
      <SwarnikaValueProps />

      {/* Section 3: SHOP BY CATEGORY */}
      <SwarnikaCategories />

      {/* Section 4: BESTSELLING PIECES */}
      <SwarnikaBestsellers />

      {/* Section 5: Editorial Spotlight */}
      <DualPromoBanner />

      {/* Section 6: Our Story & Heritage Guild */}
      <OurStorySection />

      {/* Section 7: What Our Clients Say / Loved by Thousands */}
      <TestimonialsSection />

      {/* Section 8: Instagram @SWARNIKA_JEWELS Community */}
      <InstagramCommunitySection />

      {/* Section 9: VIP Privileges & Exclusive Newsletter */}
      <NewsletterSection />
    </>
  );
};
