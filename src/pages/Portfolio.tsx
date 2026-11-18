import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Lightbox } from '../components/Lightbox';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from '../data/portfolio';
import { PortfolioCategory } from '../types';

export function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as PortfolioCategory | null;

  const validCategory =
    initialCategory && PORTFOLIO_CATEGORIES.includes(initialCategory)
      ? initialCategory
      : 'All';

  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>(validCategory);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const paramCat = searchParams.get('category') as PortfolioCategory | null;
    if (paramCat && PORTFOLIO_CATEGORIES.includes(paramCat)) {
      setSelectedCategory(paramCat);
    } else if (!paramCat) {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleCategoryChange = (category: PortfolioCategory) => {
    setSelectedCategory(category);
    setLightboxIndex(null);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_ITEMS;
    return PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-[#A8823A]">Curated Archive</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-[#141210] sm:text-5xl">
            Photography Portfolio
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#665E54]">
            A selection of weddings, intimate portraits, mountain pre-weddings, and commercial studio commissions. Click any frame to inspect it in full detail.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Portfolio categories"
          className="mt-8 flex flex-wrap items-center gap-2 border-b border-[#E6DFD4] pb-5"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`h-9 rounded-lg px-4 text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#141210] text-white'
                    : 'bg-[#F2EDE6] text-[#665E54] hover:bg-[#E6DFD4] hover:text-[#141210]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Gallery */}
        <div className="mt-10">
          {filteredItems.length > 0 ? (
            <PortfolioGallery
              items={filteredItems}
              onSelect={(index) => setLightboxIndex(index)}
            />
          ) : (
            <div className="rounded-xl border border-[#E6DFD4] bg-white py-16 text-center">
              <p className="font-serif text-2xl text-[#141210]">
                No photographs in this category yet.
              </p>
              <button
                type="button"
                onClick={() => handleCategoryChange('All')}
                className="mt-4 inline-flex h-10 items-center rounded-lg bg-[#141210] px-5 text-xs font-semibold text-white"
              >
                Show All Photographs
              </button>
            </div>
          )}
        </div>
      </div>

      <Lightbox
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
