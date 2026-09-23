import { organizationSchema, siteUrl } from '../lib/seo';
import { StructuredData } from '../components/structured-data';
import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '../components/site';
import { Analytics } from '../components/analytics';
export const metadata: Metadata = {
  title: {
    default: 'Chemstock | Specialty Chemical Sourcing',
    template: '%s | Chemstock',
  },
  metadataBase: new URL(siteUrl),
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: { icon: '/favicon.svg' },
  robots: { index: false, follow: false },
  description:
    'Specialty chemical sourcing with a personal approach. Explore chemicals by industry and application, and connect with Chemstock for your next sourcing requirement.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={organizationSchema} />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
