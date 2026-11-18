import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Aperture,
  ArrowRight,
  Camera,
  Gift,
  HeartHandshake,
  Printer,
  SlidersHorizontal,
} from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { Lightbox } from '../components/Lightbox';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { ProductCard } from '../components/ProductCard';
import { ServiceCard } from '../components/ServiceCard';
import { FEATURED_CATEGORIES, PORTFOLIO_ITEMS } from '../data/portfolio';
import { PRODUCTS } from '../data/products';
import { SERVICES } from '../data/services';
import { TESTIMONIALS } from '../data/testimonials';

const WHY_CHOOSE_US = [
  {
    title: 'Professional Photography',
    description:
      'Composed framing, calibrated lighting, and calm direction for weddings, portraits, and commercial shoots.',
    icon: Camera,
  },
  {
    title: 'Creative Editing',
    description:
      'True-to-life color grading and natural retouching that preserve atmosphere without looking over-processed.',
    icon: SlidersHorizontal,
  },
  {
    title: 'High-Quality Printing',
    description:
      'Archival pigment inks and heavyweight museum papers engineered to resist fading for decades.',
    icon: Printer,
  },
  {
    title: 'Customized Photography Products',
    description:
      'Bespoke wooden frames, lay-flat linen albums, photo bouquets, and personalized keepsake gifts.',
    icon: Gift,
  },
  {
    title: 'Customer Satisfaction',
    description:
      'Direct one-on-one communication via WhatsApp from initial inquiry through final delivery.',
    icon: HeartHandshake,
  },
  {
    title: 'Memorable Experiences',
    description:
      'Unrushed sessions designed around comfort and authenticity so every photograph feels genuinely yours.',
    icon: Aperture,
  },
];

export function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredPortfolio = PORTFOLIO_ITEMS.filter((item) => item.featured);
  const featuredServices = SERVICES.filter((service) => service.featured);
  const featuredProducts = PRODUCTS.filter((product) => product.featured).slice(0, 6);

  return (
    <div>
      {/* A. Hero Section */}
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[#141210] pt-18">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/hero_studio_wedding_1794992348895.jpg"
            alt="Bride and groom walking through a sunlit stone courtyard at golden hour"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#141210]/85 via-[#141210]/55 to-[#141210]/25"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold tracking-wider text-[#D4B475]">
              Gyanu Photo Studio · Fine-Art Photography & Print Shop
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white [text-wrap:balance] sm:text-6xl lg:text-7xl">
              Capturing Moments, Creating Memories.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Every photograph tells a story. Let us capture yours with creativity, passion, and perfection.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/shop"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#A8823A] px-7 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#8F6D2E]"
              >
                <span>Explore Our Shop</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/35 bg-white/10 px-6 text-sm font-semibold text-white whitespace-nowrap backdrop-blur-sm transition-colors hover:bg-white hover:text-[#141210]"
              >
                <span>View Portfolio</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* B. Featured Photography Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#A8823A]">Photography Genres</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#141210] sm:text-4xl">
              Featured Photography Categories
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141210] hover:text-[#A8823A]"
          >
            <span>Browse Full Portfolio</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_CATEGORIES.map((cat) => (
            <article
              key={cat.title}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#E6DFD4] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EDE6]">
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.title}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[#141210]">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#665E54]">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    to={`/portfolio?category=${encodeURIComponent(cat.category)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141210] transition-colors hover:text-[#A8823A]"
                  >
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* C. Featured Portfolio */}
      <section className="border-y border-[#E6DFD4] bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-[#A8823A]">Selected Stories</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#141210] sm:text-4xl">
                Featured Portfolio
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-5 text-sm font-semibold text-[#141210] transition-colors hover:bg-[#141210] hover:text-white"
            >
              <span>View Portfolio</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10">
            <PortfolioGallery
              items={featuredPortfolio}
              onSelect={(index) => setLightboxIndex(index)}
            />
          </div>
        </div>
      </section>

      {/* D. Our Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#A8823A]">Studio Offerings</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#141210] sm:text-4xl">
              Our Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#141210] hover:text-[#A8823A]"
          >
            <span>View All 12 Services</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* E. Featured Products */}
      <section className="border-y border-[#E6DFD4] bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-[#A8823A]">Frames, Albums & Gifts</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#141210] sm:text-4xl">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#141210] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#2A2622]"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Why Choose Us? + Client Notes */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#A8823A]">The Studio Standard</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#141210] sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-3 text-base text-[#665E54]">
            Thoughtful visual storytelling backed by in-house color calibration, archival materials, and attentive client care.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-[#E6DFD4] bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#F2EDE6] text-[#A8823A]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-serif text-2xl font-semibold text-[#141210]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#665E54]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Client Voices */}
        <div className="mt-16 grid grid-cols-1 gap-6 border-t border-[#E6DFD4] pt-14 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.id}
              className="flex flex-col justify-between rounded-xl border border-[#E6DFD4] bg-[#F2EDE6]/60 p-6"
            >
              <p className="font-serif text-xl italic leading-relaxed text-[#141210]">
                “{t.quote}”
              </p>
              <footer className="mt-5 border-t border-[#E6DFD4] pt-4">
                <p className="text-sm font-semibold text-[#141210]">{t.name}</p>
                <p className="text-xs text-[#665E54]">
                  {t.role} · {t.service}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* G. Call to Action */}
      <section className="bg-[#141210] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-semibold text-[#D4B475]">Begin Your Story</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight [text-wrap:balance] sm:text-5xl">
            Let’s Make Your Moments Unforgettable.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            Whether it’s a special celebration or a beautiful memory, Gyanu Photo Studio is here to capture it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#A8823A] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#8F6D2E]"
            >
              Contact Us
            </Link>
            <Link
              to="/services"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-7 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#141210]"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <Lightbox
        items={featuredPortfolio}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
