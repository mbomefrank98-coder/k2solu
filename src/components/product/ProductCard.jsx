'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    console.error('ProductCard received undefined product');
    return null;
  }

  const displayPrice = product.price && product.price > 0
    ? product.price
    : product.priceVariants && product.priceVariants.length > 0
      ? product.priceVariants.reduce((min, v) => v.price < min ? v.price : min, product.priceVariants[0]?.price || 0)
      : 0;

  const variants = product.priceVariants || [];
  const href = `/products/${product.slug || product._id}`;
  const inStock = product.countInStock > 0;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex h-full flex-col rounded-3xl border border-line bg-night-800/60 p-2 transition-all duration-300 hover:-translate-y-1.5 hover:border-volt/50 hover:shadow-glow"
    >
      {/* Inset image */}
      <Link
        href={href}
        className="relative block h-48 w-full overflow-hidden rounded-2xl bg-night-700"
        aria-label={`View ${product.name}`}
      >
        {product.images && product.images.length > 0 ? (
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full w-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name || 'Product image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
              quality={85}
              onError={(e) => { e.target.onerror = null; e.target.src = '/images/Laboratory-Science.jpg'; }}
            />
          </motion.div>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-bone-faint">No image</span>
          </div>
        )}

        {/* Price pill */}
        <span className="absolute right-2.5 top-2.5 rounded-full bg-night-950/80 px-3 py-1.5 font-display text-sm font-bold text-volt backdrop-blur-sm">
          {variants.length > 1 && <span className="mr-1 text-[10px] font-medium text-bone-muted">from</span>}
          &euro;{displayPrice.toFixed(2)}
        </span>

        {product.featured && inStock && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-volt-ink shadow-glow-sm">
            Featured
          </span>
        )}

        {/* Out of stock */}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-night-950/70 backdrop-blur-[2px]">
            <span className="rounded-full border border-signal/60 bg-night-950 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-signal">
              Sold out
            </span>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        {/* Name + rating */}
        <Link href={href}>
          <h3 className="line-clamp-1 font-display text-[15px] font-semibold leading-snug text-bone transition-colors group-hover:text-volt">
            {product.name || 'Unnamed Product'}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`h-3 w-3 ${i < Math.round(product.rating) ? 'text-volt' : 'text-line-strong'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-bone-faint">({product.numReviews ?? 0})</span>
          {inStock && (
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-volt">
              <span className="h-1.5 w-1.5 rounded-full bg-volt animate-pulse2" /> In stock
            </span>
          )}
        </div>

        {/* Variant pills */}
        {variants.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {variants.slice(0, 3).map((v, i) => (
              <span key={i} className="rounded-full border border-line bg-night-900/60 px-2.5 py-1 text-[10px] font-medium text-bone-muted">
                {v.label || `${v.quantity}g`}
              </span>
            ))}
            {variants.length > 3 && (
              <span className="rounded-full border border-line bg-night-900/60 px-2.5 py-1 text-[10px] font-medium text-bone-faint">
                +{variants.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4">
          {inStock ? (
            <Link
              href={href}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient py-3 text-[13px] font-bold text-volt-ink shadow-glow-sm transition-all hover:shadow-glow hover:brightness-110 active:scale-[0.98]"
            >
              <FaShoppingCart className="h-3.5 w-3.5" /> Order now
            </Link>
          ) : (
            <span className="flex w-full items-center justify-center rounded-2xl border border-line-strong py-3 text-[13px] font-semibold text-bone-faint">
              Sold out
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
