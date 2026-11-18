import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ShoppingBag, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatNPR } from '../utils/formatPrice';
import { getProductBuyNowMessage, openWhatsApp } from '../utils/whatsapp';

export function Wishlist() {
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E6DFD4] pb-6">
          <p className="text-xs font-semibold text-[#A8823A]">Saved Keepsakes</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-[#141210]">
            Your Wishlist
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="mt-12 rounded-xl border border-[#E6DFD4] bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F2EDE6] text-[#A8823A]">
              <Heart className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#141210]">
              Your wishlist is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#665E54]">
              Tap the heart icon on any frame, album, or personalized gift to save it here for later.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#141210] px-6 text-sm font-semibold text-white hover:bg-[#2A2622]"
            >
              Explore Our Shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistProducts.map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-[#E6DFD4] bg-white"
              >
                <div className="relative aspect-[4/3] w-full bg-[#F2EDE6]">
                  <Link to={`/shop/${product.slug}`} className="block h-full w-full">
                    <ImageWithFallback src={product.images[0]} alt={product.name} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#141210] shadow-sm hover:bg-[#141210] hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-[#665E54]">{product.category}</p>
                  <h2 className="mt-1 font-serif text-xl font-semibold text-[#141210]">
                    <Link to={`/shop/${product.slug}`} className="hover:text-[#A8823A]">
                      {product.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-base font-semibold tabular-nums text-[#141210]">
                    {formatNPR(product.price)}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => addToCart(product, 1, false)}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#141210] px-3 text-xs font-semibold text-white hover:bg-[#2A2622]"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openWhatsApp(getProductBuyNowMessage(product, 1))}
                      className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#1E8E49] bg-white px-3 text-xs font-semibold text-[#1E8E49] hover:bg-[#1E8E49] hover:text-white"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
