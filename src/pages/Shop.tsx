import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/products';
import { ProductCategory } from '../types';

type SortOption = 'featured' | 'price-asc' | 'price-desc';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramCat = searchParams.get('category') as ProductCategory | null;
  const paramQuery = searchParams.get('q') ?? '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    paramCat && PRODUCT_CATEGORIES.includes(paramCat) ? paramCat : 'All',
  );
  const [searchQuery, setSearchQuery] = useState(paramQuery);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    const nextCat = searchParams.get('category') as ProductCategory | null;
    if (nextCat && PRODUCT_CATEGORIES.includes(nextCat)) {
      setSelectedCategory(nextCat);
    } else if (!nextCat) {
      setSelectedCategory('All');
    }
    setSearchQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const updateFilters = (category: ProductCategory, query: string) => {
    const nextParams: Record<string, string> = {};
    if (category !== 'All') nextParams.category = category;
    if (query.trim()) nextParams.q = query.trim();
    setSearchParams(nextParams);
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCat =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-gold">Studio Print & Gift Store</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-obsidian sm:text-5xl">
            Online Shop
          </h1>
          <p className="mt-3 text-base leading-relaxed text-taupe">
            Handcrafted wooden frames, linen photo albums, canvas prints, photo bouquets, and personalized keepsakes ordered conveniently via WhatsApp.
          </p>
        </div>

        {/* Search + Sort Bar */}
        <div className="mt-8 flex flex-col gap-4 border-b border-[#E6DFD4] pb-6 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                updateFilters(selectedCategory, value);
              }}
              placeholder="Search products by name..."
              aria-label="Search products by name"
              className="h-11 w-full rounded-lg border border-[#E6DFD4] bg-white pl-10 pr-9 text-sm text-obsidian placeholder:text-taupe focus:border-gold focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  updateFilters(selectedCategory, '');
                }}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-taupe hover:text-obsidian"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="text-xs font-medium tabular-nums text-taupe">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-taupe" aria-hidden="true" />
              <label htmlFor="shop-sort" className="sr-only">
                Sort products
              </label>
              <select
                id="shop-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-11 rounded-lg border border-[#E6DFD4] bg-white px-3 text-sm font-medium text-obsidian focus:border-gold focus:outline-none"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          role="tablist"
          aria-label="Shop categories"
          className="mt-5 flex flex-wrap items-center gap-2"
        >
          {PRODUCT_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                  updateFilters(category, searchQuery);
                }}
                className={`h-9 rounded-lg px-3.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-obsidian text-white'
                    : 'bg-sand text-taupe hover:bg-[#E6DFD4] hover:text-obsidian'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="mt-10">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-[#E6DFD4] bg-white px-6 py-16 text-center">
              <h2 className="font-serif text-2xl font-semibold text-obsidian">
                No matching products found
              </h2>
              <p className="mt-2 text-sm text-taupe">
                Try a different keyword or clear your active category filter.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 inline-flex h-10 items-center rounded-lg bg-obsidian px-5 text-xs font-semibold text-white hover:bg-[#2A2622]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
