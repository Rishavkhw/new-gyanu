import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, getGeneralInquiryMessage, STUDIO_WHATSAPP_RAW } from '../utils/whatsapp';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  // { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const SHOP_CATEGORIES = [
  { label: 'Photo Frames', category: 'Photo Frames' },
  { label: 'Photo Albums', category: 'Photo Albums' },
  { label: 'Canvas Prints', category: 'Canvas Prints' },
  { label: 'Customized Gifts', category: 'Customized Gifts' },
  { label: 'Printed Photographs', category: 'Printed Photographs' },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E6DFD4] bg-obsidian text-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Section 1: Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 bg-white/5 text-[#D4B475]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M7 5l1.5-2h7L17 5" />
                </svg>
              </span>
              <span className="font-serif text-2xl font-semibold tracking-tight text-white">
                Gyanu Photo Studio
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Capturing life’s milestones with quiet artistry, fine-art printing, and bespoke keepsakes crafted to endure.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/bipinbaastolaa?utm_source=ig_web_button_share_sheet&jplx=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4B475] hover:text-[#D4B475]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/bipina.bastola.2025"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4B475] hover:text-[#D4B475]"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={buildWhatsAppUrl(getGeneralInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#25D366] hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-medium text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-white/70 transition-colors hover:text-[#D4B475]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Shop Categories */}
          <div>
            <h3 className="font-serif text-lg font-medium text-white">Shop Categories</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SHOP_CATEGORIES.map((item) => (
                <li key={item.category}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(item.category)}`}
                    className="text-white/70 transition-colors hover:text-[#D4B475]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Contact */}
          <div>
            <h3 className="font-serif text-lg font-medium text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#D4B475]" aria-hidden="true" />
                <a href={`tel:+977${STUDIO_WHATSAPP_RAW}`} className="tabular-nums hover:text-white">
                  +977 {STUDIO_WHATSAPP_RAW}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D4B475]" aria-hidden="true" />
                <a
                  href={buildWhatsAppUrl(getGeneralInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tabular-nums hover:text-white"
                >
                  WhatsApp: {STUDIO_WHATSAPP_RAW}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#D4B475]" aria-hidden="true" />
                <a href="mailto:gyanuphotostudio@gmail.com" className="hover:text-white">
                  gyanuphotostudio@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4B475]" aria-hidden="true" />
                <span>Janta Multiple Campus Road Line, Itahari-5, Sunsari, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/60 sm:flex-row">
          <p>© 2026 Gyanu Photo Studio. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/cart" className="hover:text-white">
              Cart
            </Link>
            {/* <Link to="/wishlist" className="hover:text-white">
              Wishlist
            </Link> */}
            <Link to="/contact" className="hover:text-white">
              Inquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
