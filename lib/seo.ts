import type { Metadata } from 'next';
export const siteUrl = 'https://chemstock.com';
export const indexable = process.env.CHEMSTOCK_INDEXABLE === 'true';
export const absoluteUrl = (path: string) => siteUrl + path;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  excluded = false,
): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: indexable && !excluded,
      follow: !excluded,
      'max-image-preview': 'large',
    },
    openGraph: {
      type: 'website',
      siteName: 'Chemstock',
      locale: 'en_US',
      title: `${title} | Chemstock`,
      description,
      url,
      images: [
        {
          url: absoluteUrl('/images/chemstock-social.jpg'),
          alt: 'Industrial chemical storage illustration',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Chemstock`,
      description,
      images: [absoluteUrl('/images/chemstock-social.jpg')],
    },
  };
}
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'Chemstock Inc.',
  url: siteUrl + '/',
  logo: absoluteUrl('/images/chemstock-logo.svg'),
  foundingDate: '2001',
  description: 'Independent specialty and industrial chemical distribution.',
  email: 'sourcing@chemstock.com',
  telephone: '+1-715-726-1437',
  address: {
    '@type': 'PostalAddress',
    postOfficeBoxNumber: '33',
    addressLocality: 'Farmingdale',
    addressRegion: 'NJ',
    postalCode: '07727',
    addressCountry: 'US',
  },
};
