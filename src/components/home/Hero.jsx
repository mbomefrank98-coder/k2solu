'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiShield, FiPackage, FiGlobe, FiCheckCircle, FiMail } from 'react-icons/fi';
import { LogoMark } from '@/components/common/Logo';

const TRUST_CHIPS = [
  { icon: FiShield, label: 'Discreet packaging' },
  { icon: FiPackage, label: 'Tracked shipping' },
  { icon: FiGlobe, label: '50+ countries' },
];

const ORBIT_CHIPS = [
  { label: 'K2 Paper', emoji: '📄', angle: 0 },
  { label: 'Liquid Spray', emoji: '🧪', angle: 72 },
  { label: 'K2 Powder', emoji: '⚗️', angle: 144 },
  { label: 'Etomidate', emoji: '🔬', angle: 216 },
  { label: 'K-Pods', emoji: '💨', angle: 288 },
];

const STATS = [
  { value: '12k+', label: 'Orders shipped' },
  { value: '50+', label: 'Countries served' },
  { value: '72h', label: 'Dispatch window' },
  { value: '4.9', label: 'Average rating' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function OrbitalArt() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Glow */}
      <div aria-hidden className="absolute inset-[18%] rounded-full bg-brand-gradient opacity-25 blur-3xl animate-pulse2" />

      {/* Rings */}
      <div aria-hidden className="orbit-ring inset-[6%] border-dashed" />
      <div aria-hidden className="orbit-ring inset-[20%] border-volt/15" />
      <div aria-hidden className="orbit-ring inset-[34%] border-ocean/25" />

      {/* Orbiting chips */}
      <div className="absolute inset-[6%] animate-orbit [animation-duration:40s] [container-type:size]">
        {ORBIT_CHIPS.map(({ label, emoji, angle }) => (
          <div
            key={label}
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{ transform: `rotate(${angle}deg) translateX(50cqw)` }}
          >
            <div style={{ transform: `rotate(${-angle}deg)` }}>
              <div className="animate-orbit [animation-duration:40s] [animation-direction:reverse]">
                <div className="w-max -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-line bg-night-900/90 backdrop-blur px-3 py-1.5 shadow-card whitespace-nowrap">
                  <span className="text-sm">{emoji}</span>
                  <span className="text-[12px] font-semibold text-bone">{label}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centre logo */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[27%] animate-float"
      >
        <div className="relative h-full w-full rounded-[28%] bg-night-700 border border-white/10 shadow-navy overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-grid-faint [background-size:24px_24px]" />
          <LogoMark size="100%" className="relative h-full w-full" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : '/products');
  };

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-ocean/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-[40%] left-[-15%] h-[500px] w-[500px] rounded-full bg-volt/10 blur-3xl" />

      <div className="wrap relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20"
        >
          {/* Copy */}
          <div>
            <motion.p variants={item} className="tag mb-6">
              Trusted supplier since 2019
            </motion.p>

            <motion.h1 variants={item} className="h-display text-[clamp(2.5rem,6vw,4.6rem)]">
              Premium K2 products,
              <br />
              <span className="gradient-text">delivered discreetly</span>
              <br />
              worldwide.
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed text-bone-muted sm:text-lg">
              K2SolutionPro supplies research-grade K2 paper sheets, liquid spray, cannabinoid powder,
              etomidate and K-Pods — sealed, batch-coded and tracked to your door.
            </motion.p>

            {/* Search */}
            <motion.form
              variants={item}
              onSubmit={handleSearch}
              className="mt-9 flex max-w-xl items-center rounded-full border border-line bg-night-800/80 p-1.5 backdrop-blur transition-all focus-within:border-volt/60 focus-within:shadow-glow-sm"
            >
              <FiSearch className="ml-4 h-4 w-4 shrink-0 text-bone-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search paper, spray, powder, etomidate…"
                className="w-full border-0 bg-transparent px-3 py-2.5 text-sm text-bone placeholder:text-bone-faint focus:outline-none focus:ring-0"
                aria-label="Search products"
              />
              <button type="submit" className="btn-volt !py-2.5 !px-5 shrink-0">
                Search
              </button>
            </motion.form>

            {/* CTAs */}
            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/products" className="btn-bone">
                Browse catalog <FiArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/17406027691" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Chat on WhatsApp
              </a>
              <a
                href="mailto:order@k2solutionpro.com?subject=Order%20request"
                aria-label="Email us"
                title="order@k2solutionpro.com"
                className="grid h-[46px] w-[46px] place-items-center rounded-full border border-line-strong bg-white/[0.03] text-bone transition-colors hover:border-volt/70 hover:text-volt hover:bg-volt/5"
              >
                <FiMail size={18} />
              </a>
            </motion.div>

            <motion.ul variants={item} className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
              {TRUST_CHIPS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-bone-muted">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-volt/10 text-volt"><Icon className="h-3.5 w-3.5" /></span>
                  {label}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Art */}
          <motion.div variants={item} className="relative -mt-14 sm:-mt-24 lg:-mt-40">
            <OrbitalArt />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative -mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line/60 shadow-card lg:grid-cols-4"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-night-800/90 backdrop-blur px-6 py-6 sm:py-7">
              <p className="font-display text-3xl font-bold text-bone sm:text-4xl">
                <span className="gradient-text">{value}</span>
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-bone-muted">
                <FiCheckCircle className="h-3.5 w-3.5 text-volt" /> {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
