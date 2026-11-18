import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PortfolioItem } from '../types';

interface LightboxProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onSelectIndex }: LightboxProps) {
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen && activeIndex !== null ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % items.length);
      } else if (event.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || !activeItem || activeIndex === null) {
    return null;
  }

  const handlePrev = () => {
    onSelectIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onSelectIndex((activeIndex + 1) % items.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeItem.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#141210]/95 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#141210]/70 text-white transition-colors hover:bg-white hover:text-[#141210] sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous photograph"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#141210]/70 text-white transition-colors hover:bg-white hover:text-[#141210] sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next photograph"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#141210]/70 text-white transition-colors hover:bg-white hover:text-[#141210] sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        className="flex max-h-[90vh] max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-lg bg-[#1F1C18] shadow-2xl">
          <img
            src={activeItem.image}
            alt={activeItem.title}
            referrerPolicy="no-referrer"
            className="max-h-[74vh] w-auto max-w-full object-contain"
          />
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-between gap-2 text-center text-white sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-medium text-[#D4B475]">
              {activeItem.category}
              {activeItem.location ? ` · ${activeItem.location}` : ''}
            </p>
            <h3 className="mt-0.5 font-serif text-2xl font-medium text-white">
              {activeItem.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-white/75">{activeItem.caption}</p>
          </div>
          <span className="shrink-0 text-xs tabular-nums text-white/60">
            {activeIndex + 1} / {items.length}
          </span>
        </div>
      </div>
    </div>
  );
}
