import "./globals.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import VisitorTracker from "@/components/tracking/VisitorTracker";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Providers
import AuthProvider from "@/components/auth/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.k2solutionpro.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'K2SolutionPro | K2 Paper, Liquid Spray, Powder, Etomidate & K-Pods',
    template: '%s | K2SolutionPro',
  },
  description: 'Buy K2 paper sheets, K2 liquid spray, cannabinoid K2 powder, research-grade etomidate, vapes and K-Pods online at K2SolutionPro.com. Premium quality and discreet worldwide shipping.',
  keywords: [
    'k2 paper sheets', 'k2 paper', 'k2 liquid spray', 'k2 spray', 'k2 powder',
    'cannabinoids k2 powder', 'k2 spice', 'k2 spice paper',
    'etomidate', 'etomidate powder', 'etomidate for sale', 'buy etomidate',
    'etomidate vape', 'k-pods', 'etomidate k-pods', 'vape pods',
    'buy k2 online', 'k2 for sale', 'k2solutionpro',
  ],
  other: { 'theme-color': '#1a2634' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'K2SolutionPro',
    title: 'K2SolutionPro | K2 Paper, Liquid Spray, Powder, Etomidate & K-Pods',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder, research-grade etomidate and K-Pods. Worldwide discreet shipping.',
    images: [
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'K2SolutionPro — K2 Paper, Spray, Powder, Etomidate & K-Pods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K2SolutionPro | K2 Paper, Liquid Spray, Powder, Etomidate & K-Pods',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder, research-grade etomidate and K-Pods. Worldwide discreet shipping.',
    images: [`${BASE_URL}/images/logo.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon.svg',
  },
  verification: {
    // google: 'your-google-site-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-volt focus:text-volt-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <CartProvider>
            <VisitorTracker />
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: { background: '#22303f', color: '#eef3f7', border: '1px solid #3e5468', borderRadius: 14, fontSize: 13 },
                success: { iconTheme: { primary: '#3fe0cf', secondary: '#07202a' } },
                error: { iconTheme: { primary: '#ff8a5b', secondary: '#141d28' } },
              }}
            />
            <WhatsAppButton />
            <ConditionalNavbar>
              <Navbar />
            </ConditionalNavbar>
            <main id="main-content" className="flex-grow">{children}</main>
            <ConditionalNavbar>
              <Footer />
            </ConditionalNavbar>
          </CartProvider>
        </AuthProvider>
        <Script id="tawk-to" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            Tawk_API.customStyle = { visibility: { desktop: { position: 'bl', xOffset: 24, yOffset: 24 }, mobile: { position: 'bl', xOffset: 16, yOffset: 16 } } };
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/6af2d6ca83ad0c3c3fd2e21c/1k729e2b7';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
