'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiPackage,
  FiLock,
  FiMessageCircle,
  FiStar,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import Hero from '@/components/home/Hero';
import ProductCard from '@/components/product/ProductCard';
import SEOKeywords from '@/components/seo/SEOKeywords';
import HomeSEOContent from '@/components/seo/HomeSEOContent';
import { LogoMark } from '@/components/common/Logo';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function SectionHead({ tag, title, text, action, center = false }) {
  return (
    <div className={`mb-12 flex flex-col gap-6 ${center ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        <p className="tag mb-4">{tag}</p>
        <h2 className="h-display text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
        {text && <p className="mt-4 text-bone-muted text-[15px] sm:text-base leading-relaxed">{text}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------- Why us ---------- */

const PROMISES = [
  { icon: FiShield, title: 'Discreet by default', text: 'Vacuum-sealed, scent-proof packaging with zero external branding or product references.' },
  { icon: FiPackage, title: 'Tracked worldwide', text: 'Every order ships with tracking. Dispatch within 72 hours of confirmed payment.' },
  { icon: FiLock, title: 'Bitcoin (BTC)', text: 'Pay with BTC — instructions sent with your order confirmation.' },
  { icon: FiMessageCircle, title: 'Human support', text: 'WhatsApp and email, seven days a week. Real answers, not ticket queues.' },
];

function WhyUs() {
  return (
    <section className="wrap pt-28 pb-8 sm:pt-32">
      <SectionHead
        tag="Why K2SolutionPro"
        title={<>Built around <span className="gradient-text">trust</span> and consistency</>}
        text="Four promises we keep on every single order — from the moment you message us to the moment it lands."
      />
      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {PROMISES.map(({ icon: Icon, title, text }) => (
          <motion.div key={title} variants={fadeUp} className="cell cell-hover group p-7">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient-soft border border-volt/20 text-volt transition-transform group-hover:scale-105">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-6 font-display text-lg font-semibold text-bone">{title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-bone-muted">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- Categories ---------- */

const CATEGORIES = [
  { slug: 'k2-paper-sheets', name: 'K2 Paper Sheets', desc: 'Evenly infused A4 sheets. Strong, consistent, undetectable.', emoji: '📄', span: 'lg:col-span-2', image: '/images/k2-paper' },
  { slug: 'k2-liquid-spray', name: 'K2 Liquid Spray', desc: 'High-strength spray in sealed bottles.', emoji: '🧪' },
  { slug: 'k2-powder', name: 'K2 Powder', desc: 'Pure cannabinoid powder for custom blends.', emoji: '⚗️' },
  { slug: 'etomidate', name: 'Etomidate', desc: 'Research-grade powder & crystal. COA per batch.', emoji: '🔬' },
  { slug: 'vapes-kpods', name: 'Vapes / K-Pods', desc: 'Pre-filled pods and disposables, sealed for freshness.', emoji: '💨' },
  { slug: 'benzos', name: 'Benzos', desc: 'Research-grade benzodiazepine analogues, purity-verified.', emoji: '💊', span: 'lg:col-span-1' },
  { slug: 'opioids', name: 'Opioids', desc: 'Opioid reference compounds for analytical research.', emoji: '🔬', span: 'lg:col-span-1' },
];

function Categories() {
  return (
    <section className="wrap py-20 sm:py-24">
      <SectionHead
        tag="Shop by category"
        title={<>Pick your <span className="gradient-text">format</span></>}
        action={
          <Link href="/products" className="btn-ghost shrink-0">
            Full catalog <FiArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {CATEGORIES.map((cat, i) => (
          <motion.div key={cat.slug} variants={fadeUp} className={cat.span || ''}>
            <Link
              href={`/products?category=${cat.slug}`}
              className={`group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-line p-7 transition-all duration-300 hover:-translate-y-1 hover:border-volt/60 hover:shadow-glow-sm ${
                i === 0 ? 'bg-brand-gradient text-volt-ink' : 'bg-night-800/80'
              }`}
            >
              {i === 0 && (
                <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 opacity-20">
                  <LogoMark size={320} />
                </div>
              )}
              <div className="relative flex items-start justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${i === 0 ? 'bg-white/20' : 'bg-brand-gradient-soft border border-volt/20'}`}>{cat.emoji}</span>
                <span className={`grid h-10 w-10 place-items-center rounded-full border transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${i === 0 ? 'border-volt-ink/30 text-volt-ink' : 'border-line text-bone-faint group-hover:text-volt group-hover:border-volt/60'}`}>
                  <FiArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="relative mt-10">
                <h3 className={`font-display text-xl font-semibold ${i === 0 ? 'text-volt-ink' : 'text-bone group-hover:text-volt transition-colors'}`}>{cat.name}</h3>
                <p className={`mt-1.5 text-sm leading-relaxed ${i === 0 ? 'text-volt-ink/75' : 'text-bone-muted'}`}>{cat.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- Featured ---------- */

function Featured({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div className="wrap">
        <SectionHead
          tag="Featured stock"
          title={<>Currently <span className="gradient-text">in stock</span></>}
          action={
            <Link href="/products" className="btn-ghost shrink-0">
              View all <FiArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.slice(0, 8).map((product) => (
            <motion.div key={product._id || product.slug} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

const STEPS = [
  { n: '1', title: 'Select', text: 'Browse the catalog, pick your format and quantity. No account required.' },
  { n: '2', title: 'Confirm', text: 'Send your order via WhatsApp or email. We confirm stock and total in minutes.' },
  { n: '3', title: 'Pay', text: 'Settle with Bitcoin (BTC). Your payment is verified before dispatch.' },
  { n: '4', title: 'Receive', text: 'Sealed, tracked package dispatched within 72 hours. Delivered to your door.' },
];

function Process() {
  return (
    <section className="wrap py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-night-800/70 p-8 sm:p-12 lg:p-16 shadow-card">
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-volt/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-ocean/15 blur-3xl" />

        <div className="relative">
          <SectionHead
            center
            tag="How it works"
            title={<>From message to mailbox in <span className="gradient-text">four steps</span></>}
          />
          <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div aria-hidden className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-volt/0 via-volt/50 to-volt/0 lg:block" />
            {STEPS.map((step) => (
              <motion.li
                key={step.n}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
                className="relative flex flex-col items-center text-center lg:items-center"
              >
                <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-gradient font-display text-lg font-bold text-volt-ink shadow-glow-sm">
                  {step.n}
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-bone">{step.title}</h3>
                <p className="mt-2 max-w-[260px] text-sm leading-relaxed text-bone-muted">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const TESTIMONIALS = [
  { quote: 'Third order in. Sheets landed in 6 days, packaging completely bland — exactly as described. Strength is consistent every time.', name: 'Verified buyer', meta: 'K2 paper sheets · EU', avatar: '/images/avatar-1.jpg' },
  { quote: 'The spray is legitimately strong. Replied on WhatsApp within minutes and sent tracking the next morning. No complaints.', name: 'Verified buyer', meta: 'K2 liquid spray · US', avatar: '/images/avatar-2.jpg' },
  { quote: 'Ordered powder to make my own blends. Purity checked out, batch code matched the COA they sent. Professional operation.', name: 'Verified buyer', meta: 'K2 powder · CA', avatar: '/images/avatar-3.jpg' },
];

function Testimonials() {
  return (
    <section className="wrap py-20 sm:py-24">
      <SectionHead
        center
        tag="Customer reviews"
        title={<>Rated <span className="gradient-text">4.9 / 5</span> by verified buyers</>}
      />
      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        {TESTIMONIALS.map((t) => (
          <motion.blockquote key={t.meta} variants={fadeUp} className="cell cell-hover flex flex-col p-7 sm:p-8">
            <div className="flex gap-1 text-volt">
              {[...Array(5)].map((_, i) => <FiStar key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-5 flex-1 text-[15px] leading-relaxed text-bone-muted">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-7 flex items-center gap-3 border-t border-line pt-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover ring-2 ring-volt/30" />
              <div>
                <p className="text-sm font-semibold text-bone">{t.name}</p>
                <p className="text-[12px] text-bone-faint">{t.meta}</p>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section className="wrap pt-8 pb-4">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient px-8 py-14 sm:px-14 sm:py-20 text-volt-ink">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-28 opacity-20">
          <LogoMark size={460} />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-60" />
        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-volt-ink/70">Ready when you are</p>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">Stock moves fast.<br />Lock yours in today.</h2>
            <p className="mt-4 text-volt-ink/80">Message us for stock confirmation and payment details — BTC only, replies in minutes, seven days a week.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn border-night-950 bg-night-950 text-bone hover:bg-night-800">
              Shop now <FiArrowRight className="h-4 w-4" />
            </Link>
            <a href="https://wa.me/17406027691" target="_blank" rel="noopener noreferrer" className="btn border-volt-ink/30 bg-white/15 text-volt-ink hover:bg-white/25">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="mailto:info@k2solutionpro.com?subject=Order%20request" className="btn border-volt-ink/30 bg-white/15 text-volt-ink hover:bg-white/25">
              <HiOutlineEnvelope size={17} /> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page assembly ---------- */

export default function HomeClient({ featuredProducts }) {
  return (
    <div className="min-h-screen">
      <SEOKeywords />
      <Hero />
      <WhyUs />
      <Categories />
      <Featured products={featuredProducts} />
      <Process />
      <Testimonials />
      <HomeSEOContent />
      <CTA />
    </div>
  );
}
