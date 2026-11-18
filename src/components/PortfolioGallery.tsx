import { Expand } from 'lucide-react';
import { PortfolioItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  onSelect: (index: number) => void;
}

export function PortfolioGallery({ items, onSelect }: PortfolioGalleryProps) {
  return (
    <div className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={`Open ${item.title} in lightbox`}
          className="group relative block w-full break-inside-avoid overflow-hidden rounded-xl border border-[#E6DFD4] bg-[#F2EDE6] text-left focus-visible:outline-2"
        >
          <div
            className={`w-full overflow-hidden ${
              item.aspect === 'portrait'
                ? 'aspect-[3/4]'
                : item.aspect === 'square'
                  ? 'aspect-square'
                  : 'aspect-[4/3]'
            }`}
          >
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-[#141210]/85 via-[#141210]/20 to-transparent p-5 opacity-90 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
            <div className="flex justify-end">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#141210] shadow-sm">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-[#D4B475]">
                {item.category}
                {item.location ? ` · ${item.location}` : ''}
              </p>
              <h3 className="mt-0.5 font-serif text-xl font-medium text-white">
                {item.title}
              </h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
