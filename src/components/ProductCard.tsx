import { Link } from 'react-router-dom';
import { Heart, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import { calculateDiscountPercent, formatNPR } from '../utils/formatPrice';
import { getProductBuyNowMessage, openWhatsApp } from '../utils/whatsapp';
import { ImageWithFallback } from './ImageWithFallback';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const discount = calculateDiscountPercent(product.price, product.originalPrice);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E6DFD4] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EDE6]">
        <Link to={`/shop/${product.slug}`} className="block h-full w-full">
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-colors ${
            wishlisted
              ? 'border-[#A8823A] bg-[#A8823A] text-white'
              : 'border-white/60 bg-white/90 text-[#141210] hover:bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {discount !== null && (
          <span className="absolute left-3 top-3 rounded bg-[#141210] px-2 py-1 text-[11px] font-semibold tabular-nums text-white">
            Save {discount}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-[#665E54]">{product.category}</p>
        <h3 className="mt-1 font-serif text-xl font-semibold leading-snug text-[#141210]">
          <Link to={`/shop/${product.slug}`} className="hover:text-[#A8823A]">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#665E54]">
          {product.shortDescription}
        </p>

        <div className="mt-4 flex items-baseline gap-2.5">
          <span className="text-base font-semibold tabular-nums text-[#141210]">
            {formatNPR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs tabular-nums text-[#665E54] line-through">
              {formatNPR(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => addToCart(product, 1, false)}
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg bg-[#141210] px-3 text-xs font-semibold text-white whitespace-nowrap transition-colors hover:bg-[#2A2622]"
          >
            <ShoppingBag className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Add to Cart</span>
          </button>
          <button
            type="button"
            onClick={() => openWhatsApp(getProductBuyNowMessage(product, 1))}
            className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#1E8E49] bg-white px-3 text-xs font-semibold text-[#1E8E49] whitespace-nowrap transition-colors hover:bg-[#1E8E49] hover:text-white"
          >
            <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Buy Now</span>
          </button>
        </div>

        <Link
          to={`/shop/${product.slug}`}
          className="mt-2.5 text-center text-xs font-medium text-[#665E54] underline-offset-4 hover:text-[#141210] hover:underline"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
