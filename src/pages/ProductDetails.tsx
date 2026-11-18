import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS } from '../data/products';
import { calculateDiscountPercent, formatNPR } from '../utils/formatPrice';
import { getProductBuyNowMessage, openWhatsApp } from '../utils/whatsapp';

export function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = useMemo(
    () => PRODUCTS.find((item) => item.slug === slug),
    [slug],
  );

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
  }, [slug]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 text-center sm:px-6">
        <h1 className="font-serif text-4xl font-semibold text-[#141210]">
          Product Not Found
        </h1>
        <p className="mt-3 text-base text-[#665E54]">
          The product you are looking for is unavailable or has moved.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-[#141210] px-6 text-sm font-semibold text-white hover:bg-[#2A2622]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Shop</span>
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured),
  ).slice(0, 3);

  const wishlisted = isInWishlist(product.id);
  const discount = calculateDiscountPercent(product.price, product.originalPrice);
  const mainImage = product.images[selectedImageIdx] ?? product.images[0];

  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#665E54]">
          <Link to="/shop" className="inline-flex items-center gap-1.5 font-medium hover:text-[#141210]">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Shop</span>
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#141210]"
          >
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[#141210]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#E6DFD4] bg-white">
              <ImageWithFallback src={mainImage} alt={product.name} loading="eager" />
            </div>

            {product.images.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={`${product.id}-img-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    aria-label={`View image ${idx + 1} of ${product.name}`}
                    className={`h-20 w-24 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-[#A8823A]'
                        : 'border-[#E6DFD4] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Purchase Module */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#E6DFD4] bg-white p-6 sm:p-8 lg:sticky lg:top-24">
              <p className="text-xs font-semibold text-[#A8823A]">{product.category}</p>
              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-[#141210] sm:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl font-semibold tabular-nums text-[#141210]">
                  {formatNPR(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base tabular-nums text-[#665E54] line-through">
                      {formatNPR(product.originalPrice)}
                    </span>
                    {discount !== null && (
                      <span className="text-xs font-semibold text-[#A8823A]">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#665E54]">
                {product.description}
              </p>

              {(product.dimensions || product.material) && (
                <dl className="mt-6 space-y-2.5 border-y border-[#E6DFD4] py-4 text-sm">
                  {product.dimensions && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#665E54]">Size / Format</dt>
                      <dd className="text-right font-medium text-[#141210]">
                        {product.dimensions}
                      </dd>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#665E54]">Materials</dt>
                      <dd className="text-right font-medium text-[#141210]">
                        {product.material}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#665E54]">Availability</dt>
                    <dd className="text-right font-medium text-[#1E8E49]">
                      {product.inStock ? 'Made to Order in Studio' : 'Out of Stock'}
                    </dd>
                  </div>
                </dl>
              )}

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-[#141210]">Quantity</span>
                <div className="inline-flex items-center rounded-lg border border-[#E6DFD4] bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center text-[#141210] hover:bg-[#F2EDE6]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold tabular-nums text-[#141210]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center text-[#141210] hover:bg-[#F2EDE6]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity, true)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#141210] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2A2622]"
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>Add to Cart · {formatNPR(product.price * quantity)}</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWhatsApp(getProductBuyNowMessage(product, quantity))}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1E8E49] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#18763C]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Buy Now via WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-5 text-sm font-medium text-[#141210] transition-colors hover:bg-[#F2EDE6]"
                >
                  <Heart
                    className={`h-4 w-4 ${wishlisted ? 'fill-[#A8823A] text-[#A8823A]' : ''}`}
                    aria-hidden="true"
                  />
                  <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-[#E6DFD4] pt-14">
            <h2 className="font-serif text-3xl font-semibold text-[#141210]">
              Related Studio Products
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
