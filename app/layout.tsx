import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/config';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-serif' });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: `${site.brand.name} | ${site.brand.tagline}`,
  description: site.brand.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
