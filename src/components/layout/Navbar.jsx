'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { useCart } from '@/components/cart/CartProvider';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineShoppingBag, HiOutlineMagnifyingGlass, HiOutlineXMark, HiOutlineBars3BottomRight,
  HiOutlineArrowUpRight, HiOutlineArrowRight, HiOutlineChevronDown, HiOutlineUser, HiOutlineEnvelope,
} from 'react-icons/hi2';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import Logo from '@/components/common/Logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

const shopCategories = [
  { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets', desc: 'Infused A4 & letter sheets', emoji: '📄' },
  { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray', desc: 'High-strength sealed bottles', emoji: '🧪' },
  { href: '/products?category=k2-powder', label: 'K2 Powder', desc: 'Pure cannabinoid powder', emoji: '⚗️' },
  { href: '/products?category=etomidate', label: 'Etomidate', desc: 'Research powders & crystals', emoji: '🔬' },
  { href: '/products?category=vapes-kpods', label: 'Vapes / K-Pods', desc: 'Pre-filled pods & kits', emoji: '💨' },
  { href: '/products?category=benzos', label: 'Benzos', desc: 'Research-grade benzo analogues', emoji: '💊' },
  { href: '/products?category=opioids', label: 'Opioids', desc: 'Research-grade opioid reference compounds', emoji: '🔬' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const userRef = useRef(null);
  const catRef = useRef(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = cart ? cart.reduce((s, i) => s + i.quantity, 0) : 0;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    setMenuOpen(false); setSearchOpen(false); setCatOpen(false); setUserOpen(false);
  }, [pathname]);
  useEffect(() => { if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50); }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setSearchOpen(o => !o); }
      if (e.key === 'Escape') { setSearchOpen(false); setCatOpen(false); setUserOpen(false); setMenuOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, searchOpen]);

  const go = useCallback((q) => {
    window.location.href = q.trim() ? `/products?search=${encodeURIComponent(q.trim())}` : '/products';
  }, []);

  const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand-gradient text-volt-ink">
        <div className="wrap h-9 flex items-center justify-center gap-3 text-[12px] font-semibold tracking-wide">
          <span className="hidden sm:inline">Discreet worldwide shipping</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span>Bitcoin accepted</span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline">72h dispatch after confirmation</span>
        </div>
      </div>

      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="wrap">
          <div
            className={`relative flex items-center justify-between gap-4 rounded-2xl border px-3 sm:px-4 h-16 transition-all duration-300 ${
              scrolled || catOpen ? 'bg-night-900/85 border-line backdrop-blur-xl shadow-navy' : 'bg-night-800/60 border-white/[0.06] backdrop-blur-md'
            }`}
          >
            {/* Brand */}
            <Logo size={38} showDomain={false} />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(href) ? 'text-volt bg-volt/10' : 'text-bone-muted hover:text-bone hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div ref={catRef} className="relative">
                <button
                  onClick={() => setCatOpen(o => !o)}
                  aria-expanded={catOpen}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    catOpen ? 'text-volt bg-volt/10' : 'text-bone-muted hover:text-bone hover:bg-white/5'
                  }`}
                >
                  Categories
                  <HiOutlineChevronDown size={14} className={`transition-transform ${catOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {catOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[720px] rounded-3xl border border-line bg-night-900/95 backdrop-blur-xl shadow-navy p-3"
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {shopCategories.map(({ href, label, desc, emoji }) => (
                          <Link key={href} href={href} onClick={() => setCatOpen(false)} className="group flex items-center gap-4 rounded-2xl p-3.5 hover:bg-white/5 transition-colors">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft border border-volt/20 text-lg">{emoji}</span>
                            <span className="min-w-0">
                              <span className="block font-display font-semibold text-bone text-[15px] group-hover:text-volt transition-colors">{label}</span>
                              <span className="block text-bone-faint text-xs mt-0.5">{desc}</span>
                            </span>
                            <HiOutlineArrowRight className="ml-auto text-bone-faint group-hover:text-volt group-hover:translate-x-0.5 transition-all" size={16} />
                          </Link>
                        ))}
                        <Link href="/products" onClick={() => setCatOpen(false)} className="group flex items-center justify-between rounded-2xl p-3.5 bg-brand-gradient text-volt-ink">
                          <span>
                            <span className="block font-display font-bold text-[15px]">View full catalog</span>
                            <span className="block text-xs opacity-75 mt-0.5">Every product, every format</span>
                          </span>
                          <HiOutlineArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="h-10 w-10 grid place-items-center rounded-full text-bone-muted hover:text-bone hover:bg-white/5 transition-colors"
              >
                <HiOutlineMagnifyingGlass size={19} />
              </button>

              <a href="https://t.me/K2solutionpro" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-bone-muted hover:text-bone hover:bg-white/5 transition-colors">
                <FaTelegramPlane size={17} />
              </a>

              {mounted && user ? (
                <div className="relative hidden md:block" ref={userRef}>
                  <button
                    onClick={() => setUserOpen(o => !o)}
                    className={`h-10 pl-1 pr-3 flex items-center gap-2 rounded-full border transition-colors ${userOpen ? 'border-volt/50 bg-volt/10' : 'border-line hover:border-line-strong'}`}
                  >
                    <span className="h-8 w-8 rounded-full bg-brand-gradient text-volt-ink grid place-items-center font-bold text-[12px]">{user.name.charAt(0).toUpperCase()}</span>
                    <span className="hidden xl:inline text-sm font-medium text-bone">{user.name.split(' ')[0]}</span>
                  </button>
                  <AnimatePresence>
                    {userOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-line bg-night-900/95 backdrop-blur-xl shadow-navy overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-line">
                          <p className="text-sm font-semibold text-bone truncate">{user.name}</p>
                          <p className="text-[12px] text-bone-faint truncate">{user.email}</p>
                        </div>
                        <div className="p-1.5">
                          <Link href="/profile" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-bone-muted hover:text-bone hover:bg-white/5 transition-colors">Profile <HiOutlineArrowUpRight size={14} /></Link>
                          <Link href="/account/orders" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-bone-muted hover:text-bone hover:bg-white/5 transition-colors">Orders <HiOutlineArrowUpRight size={14} /></Link>
                          {user.isAdmin && <Link href="/admin" className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-bone-muted hover:text-bone hover:bg-white/5 transition-colors">Admin <HiOutlineArrowUpRight size={14} /></Link>}
                          <button onClick={() => { setUserOpen(false); logout(); }} className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-signal hover:bg-signal/10 transition-colors">Sign out</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                mounted && (
                  <Link href="/auth/login" aria-label="Account" className="hidden md:grid h-10 w-10 place-items-center rounded-full text-bone-muted hover:text-bone hover:bg-white/5 transition-colors">
                    <HiOutlineUser size={19} />
                  </Link>
                )
              )}

              <Link href="/cart" className="cart-icon relative h-10 flex items-center gap-2 pl-3 pr-3.5 rounded-full bg-brand-gradient text-volt-ink text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-shadow">
                <HiOutlineShoppingBag size={18} />
                <span className="hidden sm:inline">Cart</span>
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-night-950 text-volt text-[11px] grid place-items-center font-bold border border-volt/40">{cartCount}</span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden h-10 w-10 grid place-items-center rounded-full text-bone hover:bg-white/5 transition-colors"
              >
                <HiOutlineBars3BottomRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[70] bg-night-950/80 backdrop-blur-sm flex items-start justify-center px-4 pt-[12vh]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              initial={{ y: 16, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 16, scale: 0.98 }} transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={(e) => { e.preventDefault(); go(query); }}
              className="w-full max-w-2xl rounded-3xl border border-line bg-night-900 shadow-navy overflow-hidden"
            >
              <div className="flex items-center gap-3 px-5 h-16 border-b border-line">
                <HiOutlineMagnifyingGlass size={20} className="text-volt shrink-0" />
                <input
                  ref={searchRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search paper, spray, powder, etomidate…"
                  className="flex-1 bg-transparent text-bone text-lg outline-none placeholder:text-bone-faint"
                />
                <kbd className="hidden sm:inline font-mono text-[10px] text-bone-faint border border-line rounded-md px-1.5 py-0.5">ESC</kbd>
                <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-bone-muted hover:text-bone"><HiOutlineXMark size={22} /></button>
              </div>
              <div className="p-4">
                <p className="tag-plain mb-3">Quick links</p>
                <div className="flex flex-wrap gap-2">
                  {shopCategories.map(({ href, label }) => (
                    <Link key={href} href={href} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-bone-muted hover:text-volt hover:border-volt/60 transition-colors">{label}</Link>
                  ))}
                </div>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-night-950/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[61] w-[88vw] max-w-sm bg-night-900 border-l border-line flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-line">
                <Logo size={32} showDomain={false} />
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="h-10 w-10 grid place-items-center rounded-full border border-line text-bone hover:border-volt hover:text-volt"><HiOutlineXMark size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <form onSubmit={(e) => { e.preventDefault(); setMenuOpen(false); go(query); }} className="flex items-center gap-3 rounded-xl border border-line bg-night-800 px-4 h-12 mb-6">
                  <HiOutlineMagnifyingGlass className="text-volt" size={18} />
                  <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="flex-1 bg-transparent text-bone outline-none text-sm" />
                </form>

                <nav className="space-y-1">
                  {navLinks.map(({ href, label }, i) => (
                    <motion.div key={href} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                      <Link href={href} className={`flex items-center justify-between rounded-xl px-4 py-3.5 font-display font-semibold text-xl ${isActive(href) ? 'text-volt bg-volt/10' : 'text-bone hover:bg-white/5'}`}>
                        {label}
                        <HiOutlineArrowUpRight size={16} className="text-bone-faint" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <p className="tag-plain mt-8 mb-3">Categories</p>
                <div className="grid grid-cols-1 gap-1">
                  {shopCategories.map(({ href, label, emoji }) => (
                    <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-bone-muted hover:text-volt hover:bg-white/5 transition-colors">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-gradient-soft border border-volt/20 text-base">{emoji}</span>
                      <span className="text-sm font-medium">{label}</span>
                      <HiOutlineArrowRight className="ml-auto" size={14} />
                    </Link>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-2">
                  <a href="https://wa.me/17406027691" target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3"><FaWhatsapp /> WhatsApp</a>
                  <a href="https://t.me/K2solutionpro" target="_blank" rel="noopener noreferrer" className="btn-ghost !px-3"><FaTelegramPlane /> Telegram</a>
                  <a href="mailto:info@k2solutionpro.com?subject=Order%20request" className="btn-ghost !px-3 col-span-2"><HiOutlineEnvelope size={17} /> Email</a>
                </div>
              </div>

              <div className="border-t border-line px-5 py-4 flex items-center gap-3">
                {mounted && user ? (
                  <>
                    <Link href="/profile" className="btn-ghost flex-1">Profile</Link>
                    <button onClick={logout} className="btn-ghost flex-1 text-signal border-signal/40">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="btn-ghost flex-1">Sign in</Link>
                    <Link href="/auth/register" className="btn-volt flex-1">Register</Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
