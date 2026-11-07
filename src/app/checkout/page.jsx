'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/cart/CartProvider';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderContactForm from '@/components/checkout/OrderContactForm';
import { FaLock, FaBitcoin, FaApplePay, FaTelegramPlane } from 'react-icons/fa';

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: 0,
    shipping: 40,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + ((item.price ?? 0) * item.quantity), 0);
    const shipping = 40; // Flat shipping fee
    const tax = 0; // No tax
    const total = subtotal + shipping + tax;

    setOrderDetails({ subtotal, shipping, tax, total });
    setLoading(false);
  }, [router, cart]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-night-900">
        <span className="loader h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-900 pb-20">
      <div className="wrap py-12 sm:py-16">
        {/* Breadcrumb + secure badge */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-bone-faint" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-volt">Home</Link>
            <span>/</span>
            <Link href="/cart" className="transition-colors hover:text-volt">Cart</Link>
            <span>/</span>
            <span className="text-bone-muted">Checkout</span>
          </nav>
          <div className="flex items-center gap-1.5 border border-volt/40 bg-volt/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-volt">
            <FaLock className="h-3 w-3" />
            Secure checkout
          </div>
        </div>

        <p className="tag mb-4">order.finalize</p>
        <h1 className="h-display mb-8 text-3xl sm:text-4xl">Complete your order</h1>

        {/* Payment method notice */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-signal/50 bg-signal/10 px-5 py-4">
          <div className="flex shrink-0 gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-signal/40 bg-night-950">
              <FaBitcoin className="text-2xl text-signal" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-night-950">
              <FaApplePay className="text-3xl text-bone" />
            </div>
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wide text-bone">
              We accept Bitcoin (BTC) &amp; Apple Pay
            </p>
            <p className="mt-1 text-xs leading-relaxed text-bone-muted">
              After you send your order on WhatsApp, Telegram, or by email, we&apos;ll reply with payment instructions for your chosen method — BTC wallet address or Apple Pay details.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Order form */}
          <div className="space-y-4 lg:col-span-2">
            <OrderContactForm cart={cart} orderDetails={orderDetails} />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <OrderSummary cartItems={cart} orderDetails={orderDetails} />

            <div className="cell p-5">
              <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wide text-bone">
                Need help?
              </h3>
              <p className="mb-4 text-xs leading-relaxed text-bone-muted">
                Questions about your order? Our team is here to assist.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://wa.me/17406027691"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone"
                >
                  WhatsApp support &rarr;
                </a>
                <a
                  href="https://t.me/K2solutionpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone"
                >
                  <FaTelegramPlane className="h-3 w-3" /> Telegram support &rarr;
                </a>
                <a
                  href="mailto:order@k2solutionpro.com?subject=Order%20support"
                  className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-colors hover:text-bone"
                >
                  order@k2solutionpro.com &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
