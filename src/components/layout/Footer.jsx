'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaWhatsapp, FaBitcoin, FaTelegramPlane } from 'react-icons/fa';
import { HiOutlineArrowUpRight, HiOutlineEnvelope, HiOutlineShieldCheck, HiOutlineTruck } from 'react-icons/hi2';
import Logo, { LogoMark } from '@/components/common/Logo';

const columns = [
  {
    title: 'Shop',
    links: [
      { href: '/products', label: 'All products' },
      { href: '/products?category=k2-paper-sheets', label: 'K2 Paper Sheets' },
      { href: '/products?category=k2-liquid-spray', label: 'K2 Liquid Spray' },
      { href: '/products?category=k2-powder', label: 'K2 Powder' },
      { href: '/products?category=etomidate', label: 'Etomidate' },
      { href: '/products?category=vapes-kpods', label: 'Vapes / K-Pods' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: '/shipping', label: 'Shipping' },
      { href: '/refund', label: 'Refunds' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/terms', label: 'Terms of service' },
      { href: '/privacy', label: 'Privacy policy' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setTimeout(() => { setStatus('done'); setEmail(''); setTimeout(() => setStatus('idle'), 3000); }, 800);
  };

  return (
    <footer className="relative mt-28 overflow-hidden">
      {/* Glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-ocean/15 blur-3xl" />

      <div className="wrap relative pt-16">
        {/* Newsletter card */}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-night-800/70 backdrop-blur-sm p-8 lg:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center shadow-card">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 opacity-[0.08]">
            <LogoMark size={420} />
          </div>
          <div className="relative">
            <p className="tag mb-5">Restock alerts</p>
            <h3 className="h-display text-3xl lg:text-4xl mb-3">New batches. <span className="gradient-text">One email.</span></h3>
            <p className="text-bone-muted text-sm max-w-md">No marketing noise — one short message when fresh stock lands or a new format is released.</p>
          </div>
          <form onSubmit={subscribe} className="relative flex items-center rounded-full border border-line bg-night-900/80 p-1.5 focus-within:border-volt/60 focus-within:shadow-glow-sm transition-all">
            <HiOutlineEnvelope className="ml-4 text-bone-faint shrink-0" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="flex-1 min-w-0 bg-transparent px-3 py-2.5 text-sm text-bone outline-none"
            />
            <button type="submit" disabled={status !== 'idle'} className="btn-volt !py-2.5 !px-5 disabled:opacity-70">
              {status === 'done' ? 'Added' : status === 'loading' ? '…' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 py-16">
          <div className="col-span-2">
            <Logo size={40} showDomain={false} />
            <p className="text-bone-muted text-sm leading-relaxed mt-5 max-w-xs">
              K2 paper, liquid spray, powder, etomidate and K-Pods. Batch-checked, plain-packaged and tracked to 50+ countries.
            </p>
            <div className="mt-6 flex gap-2">
              <a href="https://wa.me/17406027691" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="h-10 w-10 grid place-items-center rounded-full border border-line text-bone-muted hover:text-volt hover:border-volt/60 transition-colors"><FaWhatsapp size={17} /></a>
              <a href="https://t.me/K2solutionpro" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="h-10 w-10 grid place-items-center rounded-full border border-line text-bone-muted hover:text-volt hover:border-volt/60 transition-colors"><FaTelegramPlane size={17} /></a>
              <a href="mailto:info@k2solutionpro.com?subject=Order%20request" aria-label="Email" className="h-10 w-10 grid place-items-center rounded-full border border-line text-bone-muted hover:text-volt hover:border-volt/60 transition-colors"><HiOutlineEnvelope size={17} /></a>
            </div>
          </div>

          {columns.map(({ title, links }) => (
            <div key={title} className={title === 'Shop' ? 'col-span-1 md:col-span-1' : ''}>
              <p className="font-display font-semibold text-bone text-sm mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-bone-muted hover:text-volt transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-1">
            <p className="font-display font-semibold text-bone text-sm mb-4">Trust</p>
            <ul className="space-y-3 text-sm text-bone-muted">
              <li className="flex items-start gap-2.5"><HiOutlineShieldCheck className="text-volt mt-0.5 shrink-0" size={16} /> Discreet, scent-proof packaging</li>
              <li className="flex items-start gap-2.5"><HiOutlineTruck className="text-volt mt-0.5 shrink-0" size={16} /> Tracked worldwide delivery</li>
              <li className="flex items-start gap-2.5"><FaBitcoin className="text-signal mt-0.5 shrink-0" size={15} /> Bitcoin (BTC) &amp; Apple Pay</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line/70">
        <div className="wrap py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-bone-faint">
          <p>&copy; {new Date().getFullYear()} K2SolutionPro &middot; k2solutionpro.com</p>
          <p className="flex items-center gap-2"><span className="status-dot animate-pulse2" /> All systems operational</p>
          <p className="flex items-center gap-1.5">Research use only <HiOutlineArrowUpRight size={12} className="opacity-50" /></p>
        </div>
      </div>
    </footer>
  );
}
