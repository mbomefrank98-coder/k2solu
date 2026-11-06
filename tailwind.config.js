/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Orbital" theme — slate-navy surfaces (from the logo), teal→blue gradient accent, warm coral signal
        night: {
          950: '#141d28',
          900: '#1a2634',
          800: '#22303f',
          700: '#2b3a4e',
          600: '#34465c',
          500: '#3f556d',
          400: '#4f6a85',
        },
        line: {
          DEFAULT: '#2f4154',
          strong: '#3e5468',
        },
        // teal accent (kept under the legacy `volt` name so existing pages re-theme)
        volt: {
          DEFAULT: '#3fe0cf',
          dim: '#28b8c9',
          deep: '#1a8f9a',
          ink: '#07202a',
        },
        ocean: {
          DEFAULT: '#2a9be3',
          dim: '#1e7fd8',
          deep: '#1558b8',
        },
        signal: {
          DEFAULT: '#ff8a5b',
          dim: '#e8704a',
        },
        bone: {
          DEFAULT: '#eef3f7',
          muted: '#a7b7c7',
          faint: '#6e8396',
        },
        primary: {
          DEFAULT: '#3fe0cf',
          dark: '#28b8c9',
          light: '#8ef0e5',
        },
        accent: {
          DEFAULT: '#2a9be3',
          dark: '#1e7fd8',
          light: '#6dbdf0',
        },
        secondary: {
          DEFAULT: '#2b3a4e',
          dark: '#1a2634',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        DEFAULT: '10px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #3fe0cf 0%, #28b8c9 45%, #1e7fd8 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(63,224,207,0.18) 0%, rgba(30,127,216,0.18) 100%)',
        'grid-faint': 'linear-gradient(rgba(238,243,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(238,243,247,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(63,224,207,0.35), 0 12px 40px -12px rgba(63,224,207,0.45)',
        'glow-sm': '0 0 0 1px rgba(63,224,207,0.3), 0 6px 20px -8px rgba(63,224,207,0.4)',
        'glow-blue': '0 12px 40px -12px rgba(42,155,227,0.55)',
        card: '0 1px 0 0 rgba(255,255,255,0.03) inset, 0 20px 50px -30px rgba(0,0,0,0.7)',
        navy: '0 24px 60px -24px rgba(10, 16, 24, 0.9)',
        // legacy aliases
        volt: '0 0 0 1px rgba(63,224,207,0.35), 0 12px 40px -12px rgba(63,224,207,0.45)',
        hard: '0 12px 40px -12px rgba(63,224,207,0.45)',
        'hard-sm': '0 6px 20px -8px rgba(63,224,207,0.4)',
        'hard-white': '0 12px 40px -12px rgba(238,243,247,0.3)',
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        orbit: 'orbit 18s linear infinite',
        'orbit-rev': 'orbit 26s linear infinite reverse',
        float: 'float 7s ease-in-out infinite',
        pulse2: 'pulse2 2.4s ease-in-out infinite',
        rise: 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        blink: 'blink 1.2s steps(2, start) infinite',
        scan: 'scan 6s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.85)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: { to: { visibility: 'hidden' } },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
