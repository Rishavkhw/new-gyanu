import { MessageCircle } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES } from '../data/services';
import { getGeneralInquiryMessage, openWhatsApp } from '../utils/whatsapp';

export function Services() {
  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#E6DFD4] pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-gold">Studio & On-Location</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-obsidian sm:text-5xl">
              Photography & Print Services
            </h1>
            <p className="mt-3 text-base leading-relaxed text-taupe">
              From full-day wedding storytelling to passport portraits, archival printing, and bespoke framing. Select any service below to message our team directly on WhatsApp.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp(getGeneralInquiryMessage())}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1E8E49] px-6 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#18763C]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span>Custom Package Inquiry</span>
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
