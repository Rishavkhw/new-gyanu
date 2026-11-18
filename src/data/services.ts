import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'wedding-photography',
    name: 'Wedding Photography',
    shortDescription: 'Full-day documentary & editorial wedding coverage capturing rituals, portraits, and candid joy.',
    description:
      'Our flagship wedding photography service preserves every meaningful glance, ceremony tradition, and celebration with natural color grading and archival print-ready files.',
    startingPrice: 45000,
    image: '/src/assets/images/cat_wedding_photography_1794992350311.jpg',
    deliverables: ['Full-day coverage', 'Color-graded high-res gallery', 'Curated online preview'],
    featured: true,
  },
  {
    id: 'srv-2',
    slug: 'wedding-videography',
    name: 'Wedding Videography',
    shortDescription: 'Cinematic wedding highlight films and full ceremony storytelling with crystal-clear audio.',
    description:
      'Relive the voices, music, and movement of your wedding day through a thoughtfully edited highlight film and complete ceremony chronicle.',
    startingPrice: 55000,
    image: '/src/assets/images/hero_studio_wedding_1794992348895.jpg',
    deliverables: ['4K cinematic highlight film', 'Full ceremony edit', 'Licensed ambient audio'],
    featured: true,
  },
  {
    id: 'srv-3',
    slug: 'pre-wedding-photography',
    name: 'Pre-Wedding Photography',
    shortDescription: 'Relaxed sunrise or golden-hour couple sessions in mountain, courtyard, or studio locations.',
    description:
      'Celebrate your engagement with a tailored half-day or full-day outdoor editorial session designed around natural light and effortless posing.',
    startingPrice: 18000,
    image: '/src/assets/images/cat_prewedding_photography_1794992350561.jpg',
    deliverables: ['Location guidance', '50+ edited portraits', 'Print-ready digital files'],
    featured: true,
  },
  {
    id: 'srv-4',
    slug: 'birthday-photography',
    name: 'Birthday Photography',
    shortDescription: 'Joyful, candid coverage for milestone birthdays, family dinners, and kids celebrations.',
    description:
      'From cake-cutting moments to heartfelt family portraits, we capture the warmth and energy of your birthday gathering without interrupting the fun.',
    startingPrice: 8500,
    image: '/src/assets/images/cat_events_celebrations_1794992349596.jpg',
    deliverables: ['Up to 4 hours coverage', 'Edited event gallery', 'Quick social previews'],
  },
  {
    id: 'srv-5',
    slug: 'passport-size-photography',
    name: 'Passport Size Photography',
    shortDescription: 'Accurate, studio-lit passport, visa, and official ID photos printed immediately on site.',
    description:
      'Clean studio lighting, exact country-specific sizing compliance, subtle natural retouching, and both instant printed copies and digital files.',
    startingPrice: 300,
    image: '/src/assets/images/cat_portrait_photography_1794992349933.jpg',
    deliverables: ['Instant studio prints', 'Digital soft copy', 'Visa & passport compliant'],
  },
  {
    id: 'srv-6',
    slug: 'event-photography',
    name: 'Event Photography',
    shortDescription: 'Dependable visual coverage for anniversaries, corporate gatherings, and cultural programs.',
    description:
      'Discreet, detail-oriented event documentation covering speakers, atmosphere, guest interactions, and architectural styling.',
    startingPrice: 12000,
    image: '/src/assets/images/cat_events_celebrations_1794992349596.jpg',
    deliverables: ['Dedicated event photographer', 'Fast turnaround gallery', 'Full usage rights'],
  },
  {
    id: 'srv-7',
    slug: 'portrait-photography',
    name: 'Portrait Photography',
    shortDescription: 'Fine-art individual, graduation, maternity, and family portraits in our sunlit studio.',
    description:
      'Unrushed studio sessions using flattering softbox and window light to craft timeless portraits ready to hang on your walls.',
    startingPrice: 4500,
    image: '/src/assets/images/cat_portrait_photography_1794992349933.jpg',
    deliverables: ['1-hour studio session', '15 retouched portraits', 'Optional framing advice'],
    featured: true,
  },
  {
    id: 'srv-8',
    slug: 'product-photography',
    name: 'Product Photography',
    shortDescription: 'Elevated studio product imagery on stone, linen, and clean surfaces for modern brands.',
    description:
      'Sharp, color-accurate commercial still-life photography crafted for e-commerce stores, lookbooks, menus, and packaging launches.',
    startingPrice: 6000,
    image: '/src/assets/images/cat_product_photography_1794992351886.jpg',
    deliverables: ['Styled tabletop sets', 'Color-calibrated exports', 'Web & print crops'],
  },
  {
    id: 'srv-9',
    slug: 'fashion-photography',
    name: 'Fashion Photography',
    shortDescription: 'Editorial studio and on-location shoots for apparel labels, boutiques, and portfolios.',
    description:
      'Sculpted studio lighting and cohesive art direction designed to showcase fabric texture, drape, and contemporary silhouettes.',
    startingPrice: 15000,
    image: '/src/assets/images/cat_fashion_photography_1794992351384.jpg',
    deliverables: ['Studio lighting setup', 'Editorial retouching', 'Lookbook-ready delivery'],
  },
  {
    id: 'srv-10',
    slug: 'photo-editing',
    name: 'Photo Editing',
    shortDescription: 'Careful color grading, skin retouching, old photo restoration, and background refinement.',
    description:
      'Breathe new life into cherished family archives or polish commercial photography with natural, non-destructive retouching.',
    startingPrice: 500,
    image: '/src/assets/images/studio_about_workspace_1794992355143.jpg',
    deliverables: ['Natural skin & tone work', 'Archival restoration', 'High-res delivery'],
  },
  {
    id: 'srv-11',
    slug: 'photo-printing',
    name: 'Photo Printing',
    shortDescription: 'Archival matte, lustre, and glossy photographic prints in standard and custom gallery sizes.',
    description:
      'True-to-life color calibration on heavyweight photographic paper so your memories look crisp and vibrant for decades.',
    startingPrice: 150,
    image: '/src/assets/images/prod_gift_mug_polaroid_1794992353471.jpg',
    deliverables: ['Archival pigment inks', 'Matte or lustre finish', 'Same-day standard sizes'],
  },
  {
    id: 'srv-12',
    slug: 'photo-framing',
    name: 'Photo Framing',
    shortDescription: 'Custom wooden, classic black, and gallery-matted frames crafted to fit your artwork.',
    description:
      'Precision-cut archival mats, clear protective glazing, and handcrafted hardwood or matte black mouldings tailored to any print size.',
    startingPrice: 1200,
    image: '/src/assets/images/prod_wooden_frame_1794992352327.jpg',
    deliverables: ['Custom size cutting', 'Acid-free mat boards', 'Ready-to-hang hardware'],
  },
];
