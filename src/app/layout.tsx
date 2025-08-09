// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Comfort Guardians | HVAC Services',
  description:
    'The Comfort Guardians provide top-rated HVAC services with expert installation, maintenance, and repairs.',
  openGraph: {
    title: 'The Comfort Guardians | HVAC Services',
    description: 'Expert HVAC installation, repair, and maintenance.',
    url: 'https://thecomfortguardians.com',
    type: 'website',
    images: ['https://thecomfortguardians.com/og-image.jpg'],
  },
  alternates: { canonical: 'https://thecomfortguardians.com' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: 'The Comfort Guardians',
    url: 'https://thecomfortguardians.com',
    image: 'https://thecomfortguardians.com/logo.png',
    telephone: '+1-404-542-4332',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main St',
      addressLocality: 'MyCity',
      addressRegion: 'ST',
      postalCode: '12345',
      addressCountry: 'US',
    },
  };

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id='business-schema'
          type='application/ld+json'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <Navbar />
        <main>{children}</main> {/* match navbar height */}
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
