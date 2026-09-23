import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '../components/site';
export const metadata: Metadata = {
  title: {
    default: 'Chemstock | Specialty Chemical Sourcing',
    template: '%s | Chemstock',
  },
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
