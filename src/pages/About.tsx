import { Link } from 'react-router-dom';
import { Award, Camera, Eye, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';

const VALUES = [
  {
    title: 'Creativity',
    description:
      'Every frame is composed with an eye for natural light, authentic gesture, and visual storytelling.',
    icon: Camera,
  },
  {
    title: 'Professionalism',
    description:
      'Punctual preparation, dependable equipment, and respectful coordination on your milestone days.',
    icon: ShieldCheck,
  },
  {
    title: 'Quality',
    description:
      'Color-calibrated workflows paired with archival papers, solid hardwood frames, and heirloom albums.',
    icon: Award,
  },
  {
    title: 'Customer Satisfaction',
    description:
      'Clear communication from your first WhatsApp message through final print pickup or delivery.',
    icon: HeartHandshake,
  },
  {
    title: 'Attention to Detail',
    description:
      'Careful skin-tone preservation, thoughtful styling, and hand-finished print inspection.',
    icon: Eye,
  },
];

const STUDIO_GALLERY = [
  {
    src: '/src/assets/images/studio_about_workspace_1794992355143.jpg',
    alt: 'Gyanu Photo Studio daylight interior and framed gallery wall',
  },
  {
    src: '/src/assets/images/prod_wooden_frame_1794992352327.jpg',
    alt: 'Handcrafted walnut photo frame on travertine surface',
  },
  {
    src: '/src/assets/images/prod_photo_album_1794992353332.jpg',
    alt: 'Linen-bound wedding album craftsmanship',
  },
];

export function About() {
  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Intro & Story */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col justify-center lg:col-span-6">
            <p className="text-xs font-semibold text-gold">About Gyanu Photo Studio</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight tracking-tight text-obsidian [text-wrap:balance] sm:text-5xl">
              Preserving Life’s Defining Chapters with Quiet Craft.
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-taupe">
              <p>
                Gyanu Photo Studio is a dedicated photography and fine-art print studio built around a simple belief: meaningful moments deserve to be held, framed, and revisited—not buried in phone folders.
              </p>
              <p>
                Whether documenting traditional wedding ceremonies, guiding an unhurried studio portrait, or crafting a custom keepsake frame, we bring calm direction, honest color, and care to every step.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#E6DFD4] bg-sand lg:col-span-6">
            <ImageWithFallback
              src="/src/assets/images/studio_about_workspace_1794992355143.jpg"
              alt="Gyanu Photo Studio interior with lighting and framed prints"
              loading="eager"
              className="lg:h-full"
            />
          </div>
        </div>

        {/* Our Vision */}
        <section className="mt-20 rounded-2xl border border-[#E6DFD4] bg-white p-8 sm:p-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-gold">Our Vision</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-obsidian sm:text-4xl">
              Timeless imagery that feels as vivid decades from now as it does today.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-taupe">
              We pair thoughtful creative direction with high-grade printing and custom framing so your photographs live naturally in your home—as heirlooms passed across generations rather than fleeting digital files.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gold">How We Work</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-obsidian sm:text-4xl">
              Our Values
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-xl border border-[#E6DFD4] bg-white p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sand text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-2xl font-semibold text-obsidian">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-taupe">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Studio Gallery */}
        <section className="mt-20">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gold">Inside the Studio</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-obsidian sm:text-4xl">
              Studio Gallery
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {STUDIO_GALLERY.map((photo) => (
              <div
                key={photo.alt}
                className="aspect-[4/3] overflow-hidden rounded-xl border border-[#E6DFD4] bg-sand"
              >
                <ImageWithFallback src={photo.src} alt={photo.alt} />
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 rounded-2xl bg-obsidian px-6 py-14 text-center text-white sm:px-12">
          <h2 className="font-serif text-3xl font-semibold [text-wrap:balance] sm:text-4xl">
            Every Moment Deserves to Be Remembered.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Reach out to discuss an upcoming celebration, studio portrait session, or custom print order.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex h-11 items-center justify-center rounded-lg bg-gold px-7 text-sm font-semibold text-white transition-colors hover:bg-[#8F6D2E]"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
