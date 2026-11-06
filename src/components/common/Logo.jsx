import Link from 'next/link';
import { useId } from 'react';
import { BRAND } from '@/lib/brandMark';

// Same geometry as lib/brandMark.js — keep both in sync.
const SWOOSH = 'M -95.4 -3.5 A 96 44 0 1 0 95.4 -3.5 A 96 44 0 0 1 -95.4 -3.5 Z';

export function LogoMark({ size = 36, className = '', bare = true }) {
  const id = useId().replace(/:/g, '');
  const { slate, teal, tealMid, blue, blueDeep, orbHighlight, orbMid, orbDeep } = BRAND;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={teal} />
          <stop offset="0.55" stopColor={tealMid} />
          <stop offset="1" stopColor={blueDeep} />
        </linearGradient>
        <linearGradient id={`${id}-orbit`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={teal} />
          <stop offset="1" stopColor={blue} />
        </linearGradient>
        <linearGradient id={`${id}-orbit2`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor={teal} />
          <stop offset="1" stopColor={blue} />
        </linearGradient>
        <radialGradient id={`${id}-orb`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor={orbHighlight} />
          <stop offset="0.45" stopColor={orbMid} />
          <stop offset="1" stopColor={orbDeep} />
        </radialGradient>
        <pattern id={`${id}-grid`} width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#fff" strokeOpacity="0.06" strokeWidth="1" />
        </pattern>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {!bare && (
        <>
          <rect width="200" height="200" rx="28" fill={slate} />
          <rect width="200" height="200" rx="28" fill={`url(#${id}-grid)`} />
        </>
      )}

      <g transform="translate(100 100) rotate(-32)">
        <path d={SWOOSH} fill={`url(#${id}-orbit)`} opacity="0.95" />
      </g>
      <circle cx="100" cy="100" r="50" stroke={`url(#${id}-ring)`} strokeWidth="13" filter={`url(#${id}-glow)`} />
      <text
        x="100"
        y="101"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial Black, Arial, Helvetica, sans-serif"
        fontWeight="900"
        fontSize="74"
        fill="#fff"
      >
        K
      </text>
      <g transform="translate(100 100) rotate(122)">
        <path d={SWOOSH} fill={`url(#${id}-orbit2)`} opacity="0.95" />
      </g>
      <g transform="translate(100 100) rotate(-32)">
        <circle cx="-96" cy="0" r="10" fill={`url(#${id}-orb)`} />
        <circle cx="-48" cy="38" r="7.5" fill={`url(#${id}-orb)`} />
      </g>
      <g transform="translate(100 100) rotate(122)">
        <circle cx="-62" cy="33.5" r="7.5" fill={`url(#${id}-orb)`} />
      </g>
    </svg>
  );
}

export default function Logo({ size = 40, showDomain = true, href = '/', className = '' }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 group w-fit ${className}`} aria-label="K2SolutionPro home">
      <LogoMark size={size} className="shrink-0 transition-transform duration-700 ease-out group-hover:rotate-[360deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display font-bold tracking-tight text-bone" style={{ fontSize: size * 0.5 }}>
          K2<span className="gradient-text">Solution</span>Pro
        </span>
        {showDomain && (
          <span className="font-mono text-[9px] tracking-[0.28em] uppercase text-bone-faint mt-1.5">
            k2solutionpro.com
          </span>
        )}
      </span>
    </Link>
  );
}
