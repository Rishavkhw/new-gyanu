import { MessageCircle } from 'lucide-react';
import { ServiceItem } from '../types';
import { formatNPR } from '../utils/formatPrice';
import { getServiceInquiryMessage, openWhatsApp } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E6DFD4] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F2EDE6]">
        <ImageWithFallback
          src={service.image}
          alt={service.name}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-2xl font-semibold text-[#141210]">{service.name}</h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#665E54]">
          {service.shortDescription}
        </p>

        {service.deliverables.length > 0 && (
          <p className="mt-3 text-xs text-[#665E54]">
            {service.deliverables.join(' · ')}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E6DFD4] pt-4">
          <div>
            <span className="block text-[11px] font-medium text-[#665E54]">Starting from</span>
            <span className="text-base font-semibold tabular-nums text-[#141210]">
              {formatNPR(service.startingPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp(getServiceInquiryMessage(service.name))}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#141210] px-4 text-xs font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#A8823A]"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Inquire Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}
