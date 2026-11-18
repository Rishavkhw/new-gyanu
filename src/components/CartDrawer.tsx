import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatNPR } from '../utils/formatPrice';
import { getCartOrderMessage, openWhatsApp } from '../utils/whatsapp';

export function CartDrawer() {
  const {
    items,
    totalItems,
    totalAmount,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const handleWhatsAppOrder = () => {
    const message = getCartOrderMessage(items, totalAmount);
    openWhatsApp(message);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className="fixed inset-0 bg-[#141210]/55 backdrop-blur-[2px] transition-opacity"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#FAF8F5] text-[#141210] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#E6DFD4] bg-white px-6 py-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#141210]">Your Cart</h2>
            <p className="text-xs text-[#665E54] tabular-nums">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Close cart drawer"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#665E54] transition-colors hover:bg-[#F2EDE6] hover:text-[#141210]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F2EDE6] text-[#A8823A]">
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-[#141210]">
                Your cart is empty
              </h3>
              <p className="mt-2 max-w-xs text-sm text-[#665E54]">
                Explore handcrafted frames, linen photo albums, and personalized studio keepsakes.
              </p>
              <Link
                to="/shop"
                onClick={closeDrawer}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#141210] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2A2622]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#E6DFD4]">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <Link
                    to={`/shop/${product.slug}`}
                    onClick={closeDrawer}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-[#E6DFD4] bg-white"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/shop/${product.slug}`}
                          onClick={closeDrawer}
                          className="block truncate text-sm font-semibold text-[#141210] hover:text-[#A8823A]"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 text-xs tabular-nums text-[#665E54]">
                          {formatNPR(product.price)} each
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded p-1.5 text-[#665E54] transition-colors hover:bg-[#F2EDE6] hover:text-[#141210]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-[#E6DFD4] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="flex h-8 w-8 items-center justify-center text-[#141210] hover:bg-[#F2EDE6]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="flex h-8 w-8 items-center justify-center text-[#141210] hover:bg-[#F2EDE6]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold tabular-nums text-[#141210]">
                        {formatNPR(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E6DFD4] bg-white p-6">
            <div className="flex items-center justify-between text-base font-semibold text-[#141210]">
              <span>Total Amount</span>
              <span className="tabular-nums">{formatNPR(totalAmount)}</span>
            </div>
            <p className="mt-1 text-xs text-[#665E54]">
              Orders are confirmed directly with our studio team via WhatsApp.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#1E8E49] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#18763C]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Order via WhatsApp</span>
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/cart"
                  onClick={closeDrawer}
                  className="flex h-10 items-center justify-center rounded-lg border border-[#E6DFD4] bg-[#FAF8F5] px-4 text-xs font-semibold text-[#141210] transition-colors hover:bg-[#F2EDE6]"
                >
                  View Cart Page
                </Link>
                <Link
                  to="/shop"
                  onClick={closeDrawer}
                  className="flex h-10 items-center justify-center rounded-lg border border-[#E6DFD4] bg-white px-4 text-xs font-semibold text-[#141210] transition-colors hover:bg-[#FAF8F5]"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
