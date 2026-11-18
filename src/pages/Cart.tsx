import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatNPR } from '../utils/formatPrice';
import { getCartOrderMessage, openWhatsApp } from '../utils/whatsapp';

export function Cart() {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="pt-26 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#E6DFD4] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#A8823A]">Order Summary</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold text-[#141210]">
              Shopping Cart
            </h1>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="self-start text-xs font-medium text-[#665E54] underline-offset-4 hover:text-[#141210] hover:underline sm:self-auto"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-xl border border-[#E6DFD4] bg-white px-6 py-20 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F2EDE6] text-[#A8823A]">
              <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#141210]">
              Your shopping cart is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#665E54]">
              Browse our collection of wooden photo frames, linen albums, canvas prints, and personalized photo gifts.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-[#141210] px-6 text-sm font-semibold text-white hover:bg-[#2A2622]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8">
              <ul className="divide-y divide-[#E6DFD4] rounded-xl border border-[#E6DFD4] bg-white">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <Link
                        to={`/shop/${product.slug}`}
                        className="h-22 w-24 shrink-0 overflow-hidden rounded-lg border border-[#E6DFD4] bg-[#F2EDE6]"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </Link>
                      <div className="min-w-0">
                        <p className="text-xs text-[#665E54]">{product.category}</p>
                        <Link
                          to={`/shop/${product.slug}`}
                          className="mt-0.5 block font-serif text-xl font-semibold text-[#141210] hover:text-[#A8823A]"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-xs tabular-nums text-[#665E54]">
                          Unit Price: {formatNPR(product.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-6 sm:justify-end">
                      <div className="inline-flex items-center rounded-lg border border-[#E6DFD4] bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease quantity of ${product.name}`}
                          className="flex h-9 w-9 items-center justify-center text-[#141210] hover:bg-[#F2EDE6]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-9 text-center text-sm font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase quantity of ${product.name}`}
                          className="flex h-9 w-9 items-center justify-center text-[#141210] hover:bg-[#F2EDE6]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="block text-sm font-semibold tabular-nums text-[#141210]">
                          {formatNPR(product.price * quantity)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-lg p-2 text-[#665E54] transition-colors hover:bg-[#F2EDE6] hover:text-[#141210]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#141210] hover:text-[#A8823A]"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-4">
              <div className="rounded-xl border border-[#E6DFD4] bg-white p-6 lg:sticky lg:top-24">
                <h2 className="font-serif text-2xl font-semibold text-[#141210]">
                  Cart Summary
                </h2>
                <dl className="mt-5 space-y-3 border-b border-[#E6DFD4] pb-5 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-[#665E54]">Total Items</dt>
                    <dd className="font-medium tabular-nums text-[#141210]">{totalItems}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#665E54]">Order Channel</dt>
                    <dd className="font-medium text-[#141210]">Direct WhatsApp</dd>
                  </div>
                </dl>

                <div className="mt-5 flex items-baseline justify-between">
                  <span className="text-base font-semibold text-[#141210]">Total Amount</span>
                  <span className="text-2xl font-semibold tabular-nums text-[#141210]">
                    {formatNPR(totalAmount)}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#665E54]">
                  Clicking below opens WhatsApp with your complete itemized list ready to confirm directly with Gyanu Photo Studio.
                </p>

                <button
                  type="button"
                  onClick={() => openWhatsApp(getCartOrderMessage(items, totalAmount))}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1E8E49] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#18763C]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
