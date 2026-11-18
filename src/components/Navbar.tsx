import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { formatNPR } from '../utils/formatPrice';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'Shop', to: '/shop' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { totalItems, openDrawer } = useCart();
  const { wishlistIds } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHomeHero = pathname === '/' && !scrolled && !mobileOpen && !searchOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [searchOpen]);

  const liveResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    setSearchOpen(false);
    setMobileOpen(false);
    if (trimmed) {
      navigate(`/shop?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/shop');
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        isHomeHero
          ? 'bg-gradient-to-b from-[#141210]/70 to-transparent text-white'
          : 'border-b border-[#E6DFD4] bg-white/95 text-[#141210] shadow-xs backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        {/* Brand Zone */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap focus-visible:outline-2"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${
              isHomeHero
                ? 'border-white/30 bg-white/10 text-white'
                : 'border-[#E6DFD4] bg-[#FAF8F5] text-[#141210]'
            }`}
          >
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
          <span className="font-serif text-xl font-semibold tracking-tight sm:text-2xl">
            Gyanu Photo Studio
          </span>
        </Link>

        {/* Center Navigation Links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                  isHomeHero
                    ? isActive
                      ? 'text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#D4B475]'
                      : 'text-white/85 hover:text-white'
                    : isActive
                      ? 'text-[#141210] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#A8823A]'
                      : 'text-[#665E54] hover:text-[#141210]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions Zone: Search, Wishlist, Cart, Mobile Menu */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label={searchOpen ? 'Close search' : 'Search products'}
            aria-expanded={searchOpen}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isHomeHero
                ? 'text-white hover:bg-white/15'
                : 'text-[#141210] hover:bg-[#F2EDE6]'
            }`}
          >
            {searchOpen ? <X className="h-4.5 w-4.5" /> : <Search className="h-4.5 w-4.5" />}
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlistIds.length} items)`}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
              isHomeHero
                ? 'text-white hover:bg-white/15'
                : 'text-[#141210] hover:bg-[#F2EDE6]'
            }`}
          >
            <Heart className="h-4.5 w-4.5" />
            {wishlistIds.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A8823A] px-1 text-[10px] font-semibold tabular-nums text-white">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Shopping cart (${totalItems} items)`}
            className={`relative flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
              isHomeHero
                ? 'bg-white/15 text-white hover:bg-white/25'
                : 'bg-[#141210] text-white hover:bg-[#2A2622]'
            }`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            <span className="tabular-nums">{totalItems}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`ml-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
              isHomeHero
                ? 'text-white hover:bg-white/15'
                : 'text-[#141210] hover:bg-[#F2EDE6]'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#E6DFD4] bg-white px-4 py-4 text-[#141210] shadow-lg sm:px-6">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#665E54]"
                  aria-hidden="true"
                />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search frames, albums, canvas prints, gifts..."
                  aria-label="Search shop products by title"
                  className="h-11 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] pl-10 pr-4 text-sm text-[#141210] placeholder:text-[#665E54] focus:border-[#A8823A] focus:bg-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="h-11 shrink-0 rounded-lg bg-[#141210] px-5 text-sm font-medium text-white transition-colors hover:bg-[#2A2622] whitespace-nowrap"
              >
                Search
              </button>
            </form>

            {searchQuery.trim() && (
              <div className="mt-3 divide-y divide-[#E6DFD4] rounded-lg border border-[#E6DFD4] bg-[#FAF8F5]">
                {liveResults.length > 0 ? (
                  liveResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/shop/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between gap-4 px-3.5 py-2.5 transition-colors hover:bg-[#F2EDE6]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 shrink-0 rounded object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#141210]">
                            {product.name}
                          </p>
                          <p className="truncate text-xs text-[#665E54]">{product.category}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-sm font-semibold tabular-nums text-[#141210]">
                        {formatNPR(product.price)}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-[#665E54]">
                    No products matched “{searchQuery}”. Press Search to browse the full shop.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`overflow-hidden border-t border-[#E6DFD4] bg-white text-[#141210] transition-all duration-200 lg:hidden ${
          mobileOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 border-t-0 opacity-0'
        }`}
      >
        <div className="space-y-4 px-4 py-5 sm:px-6">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#665E54]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-11 w-full rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] pl-9 pr-3 text-sm text-[#141210] focus:border-[#A8823A] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-[#141210] px-4 text-sm font-medium text-white"
            >
              Go
            </button>
          </form>

          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#E6DFD4]/60">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3 text-base font-medium transition-colors ${
                    isActive ? 'text-[#A8823A]' : 'text-[#141210]'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
            <Link
              to="/cart"
              className="flex items-center justify-between py-3 text-base font-medium text-[#141210]"
            >
              <span>Shopping Cart</span>
              <span className="text-sm tabular-nums text-[#665E54]">{totalItems} items</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
