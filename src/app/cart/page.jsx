'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  FaTrash, FaArrowLeft, FaLock, FaShoppingCart, FaBitcoin,
  FaShieldAlt, FaShippingFast, FaMinus, FaPlus, FaWhatsapp, FaEnvelope, FaApplePay,
} from 'react-icons/fa';
import { useCart } from '@/components/cart/CartProvider';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="wrap py-20 sm:py-28">
          <div className="cell mx-auto max-w-md p-10 text-center">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-brand-gradient-soft border border-volt/20">
              <FaShoppingCart className="text-3xl text-volt" />
            </div>
            <p className="tag mb-4 justify-center">Cart</p>
            <h1 className="h-display mb-3 text-3xl">Your cart is empty</h1>
            <p className="mb-8 text-sm leading-relaxed text-bone-muted">
              Browse the catalog and add some products — they&apos;ll show up here.
            </p>
            <Link href="/products" className="btn-volt w-full">
              <FaArrowLeft className="h-3.5 w-3.5" /> Browse products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="wrap py-10 sm:py-14">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <nav className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
              <Link href="/" className="transition-colors hover:text-volt">Home</Link>
              <span>/</span>
              <span className="text-bone-muted">Cart</span>
            </nav>
            <h1 className="h-display text-3xl sm:text-4xl">Shopping cart</h1>
          </div>
          <span className="rounded-full border border-volt/30 bg-volt/10 px-4 py-1.5 text-[12px] font-semibold text-volt">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* Items */}
          <div className="space-y-4">
            {cart.map((item, index) => {
              const unitPrice = Number(item.price ?? item.variant?.price ?? 0);
              const lineTotal = unitPrice * item.quantity;
              const variantLabel = item.variant?.label
                || (item.variant?.grams ? `${item.variant.grams}g` : item.variant?.quantity ? `${item.variant.quantity}g` : '');
              return (
                <div key={`${item._id || item.id || index}`} className="cell group flex gap-4 p-4 sm:gap-5 sm:p-5">
                  {/* Image */}
                  <Link
                    href={`/products/${item.slug || item.id}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-line bg-night-700 sm:h-28 sm:w-28"
                  >
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center font-mono text-[10px] text-bone-faint">N/A</div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link
                          href={`/products/${item.slug || item.id}`}
                          className="line-clamp-2 font-display text-[15px] font-semibold leading-snug text-bone transition-colors hover:text-volt sm:text-base"
                        >
                          {item.name}
                        </Link>
                        {variantLabel && (
                          <span className="mt-1.5 inline-flex rounded-full border border-line px-2.5 py-0.5 text-[11px] font-medium text-bone-muted">
                            {variantLabel}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variant?._id, item.variant?.grams)}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-bone-faint transition-colors hover:bg-signal/10 hover:text-signal"
                        aria-label={`Remove ${item.name}`}
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center rounded-full border border-line-strong">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?._id)}
                          disabled={item.quantity <= 1}
                          className="grid h-8 w-8 place-items-center rounded-full text-bone transition-colors hover:text-volt disabled:opacity-30"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-8 text-center font-display text-sm font-bold text-bone">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?._id)}
                          className="grid h-8 w-8 place-items-center rounded-full text-bone transition-colors hover:text-volt"
                          aria-label="Increase quantity"
                        >
                          <FaPlus className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[11px] text-bone-faint">&euro;{unitPrice.toFixed(2)} each</p>
                        <p className="font-display text-lg font-bold text-bone">&euro;{lineTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={clearCart}
                className="text-[12px] font-medium text-bone-faint transition-colors hover:text-signal"
              >
                Clear all items
              </button>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[12px] font-semibold text-volt transition-colors hover:text-bone"
              >
                <FaArrowLeft className="h-3 w-3" /> Continue shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="cell sticky top-28 overflow-hidden">
              <div className="h-1 w-full bg-brand-gradient" />
              <div className="p-6">
                <h2 className="mb-5 font-display text-base font-semibold text-bone">
                  Order summary
                </h2>

                <div className="mb-5 space-y-3 text-sm">
                  <div className="flex justify-between text-bone-muted">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span className="font-medium text-bone">&euro;{Number(cartTotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-bone-muted">
                    <span>Shipping</span>
                    <span className="text-bone-faint">calculated at checkout</span>
                  </div>
                  <div className="flex justify-between border-t border-line pt-3">
                    <span className="font-semibold text-bone">Estimated total</span>
                    <span className="font-display text-xl font-bold gradient-text">&euro;{Number(cartTotal).toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={handleCheckout} className="btn-volt w-full">
                  <FaLock className="h-3.5 w-3.5" /> Proceed to checkout
                </button>

                <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-bone-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <FaBitcoin className="text-signal" /> BTC
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FaApplePay className="text-sm text-bone" /> accepted
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FaLock className="text-volt" /> Secure
                  </span>
                </div>

                {/* Trust row */}
                <div className="mt-5 space-y-2.5 border-t border-line pt-5">
                  {[
                    { Icon: FaShieldAlt, text: 'Discreet, scent-proof packaging' },
                    { Icon: FaShippingFast, text: 'Tracked — dispatched within 72h' },
                  ].map(({ Icon, text }) => (
                    <p key={text} className="flex items-center gap-2.5 text-[12px] text-bone-muted">
                      <Icon className="text-volt" /> {text}
                    </p>
                  ))}
                </div>

                {/* Quick order links */}
                <div className="mt-5 border-t border-line pt-5">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-bone-faint">
                    Prefer to order directly?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href="https://wa.me/17406027691"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost !px-3 !py-2 !text-[12px]"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>
                    <a
                      href="mailto:info@k2solutionpro.com?subject=Order%20request"
                      className="btn-ghost !px-3 !py-2 !text-[12px]"
                    >
                      <FaEnvelope /> Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
