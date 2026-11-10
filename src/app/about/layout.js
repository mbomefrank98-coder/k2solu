export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.k2solutionpro.com'),
  title: 'About Us | Trusted K2, Etomidate & K-Pod Supplier',
  description: 'Learn about K2SolutionPro — a trusted supplier of K2 paper sheets, K2 liquid spray, cannabinoid K2 powder, research-grade etomidate and K-Pods with discreet worldwide shipping.',
  keywords: [
    'K2SolutionPro', 'k2 supplier', 'buy k2 online',
    'k2 paper sheets', 'k2 liquid spray', 'k2 powder', 'k2 spice',
    'etomidate', 'etomidate powder', 'buy etomidate',
    'etomidate vape', 'k-pods', 'discreet shipping',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About K2SolutionPro | Trusted K2, Etomidate & K-Pod Supplier',
    description: 'K2SolutionPro supplies premium K2 paper sheets, liquid spray, powder, etomidate and K-Pods worldwide with discreet shipping.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({ children }) {
  return children;
}
