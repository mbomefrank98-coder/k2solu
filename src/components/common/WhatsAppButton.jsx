'use client';

import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { useState } from 'react';

const CHANNELS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/17406027691',
    Icon: FaWhatsapp,
    accent: 'bg-volt text-volt-ink',
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:order@k2solutionpro.com?subject=Order%20request',
    Icon: FaEnvelope,
    accent: 'bg-signal text-night-950',
    external: false,
  },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded options */}
      <div className={`flex flex-col gap-2 transition-all duration-200 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
        {CHANNELS.map(({ label, href, Icon, accent, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group flex items-center gap-3 rounded-full border border-line bg-night-900/90 pl-4 pr-1.5 py-1.5 shadow-navy backdrop-blur-md transition-colors hover:border-volt/60"
            aria-label={`Contact us on ${label}`}
          >
            <span className="text-[12px] font-semibold text-bone-muted group-hover:text-bone transition-colors">{label}</span>
            <span className={`w-9 h-9 rounded-full grid place-items-center ${accent}`}><Icon size={16} /></span>
          </a>
        ))}
      </div>

      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Contact us"
        className={`flex items-center gap-2.5 h-12 px-5 rounded-full text-sm font-semibold shadow-glow-sm transition-all ${
          open ? 'bg-bone text-night-900' : 'bg-brand-gradient text-volt-ink hover:shadow-glow'
        }`}
      >
        <HiOutlineChatBubbleLeftRight size={18} />
        <span className="hidden sm:inline">{open ? 'Close' : 'Order now'}</span>
      </button>
    </div>
  );
}
