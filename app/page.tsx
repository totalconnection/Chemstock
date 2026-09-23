import { StructuredData } from '../components/structured-data';
import { pageMetadata } from '../lib/seo';
export const metadata = pageMetadata(
  'Specialty Chemical Sourcing & Distribution',
  'Chemstock sources specialty and industrial chemicals for manufacturing and formulation. Browse materials, request specifications, and send your purchasing requirements.',
  '/',
);
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import ProductSearch from '../components/product-search';
import { products, industries } from '../lib/catalogue';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/table';
const featured = [
  'maleic-acid',
  'sebacic-acid',
  'methyl-methacrylate',
  'propylene-glycol',
  'hydroquinone',
]
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p) => !!p);
export default function Home() {
  return (
    <main id="main" className="home-revised">
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          '@id': 'https://chemstock.com/#website',
          name: 'Chemstock',
          url: 'https://chemstock.com/',
          publisher: { '@id': 'https://chemstock.com/#organization' },
        }}
      />
      <section className="home-intro container">
        <div className="home-intro-copy">
          <p className="section-label">
            Independent chemical distribution · Since 2001
          </p>
          <h1>
            Specialty chemicals.
            <br />
            Sourced to specification.
          </h1>
          <p className="home-description">
            Chemstock supplies specialty chemicals for manufacturing and
            formulation. Send us the material, grade, quantity, and delivery
            requirements. We’ll work through the sourcing options with you.
          </p>
          <form className="home-product-search" action="/catalogue/">
            <label htmlFor="home-catalogue-search">Find a material</label>
            <div>
              <ProductSearch
                id="home-catalogue-search"
                name="q"
                label="Find a material"
              />
              <button className="btn navy" aria-label="Search catalogue">
                <ArrowRight size={21} />
              </button>
            </div>
          </form>
          <div className="home-intro-links">
            <a href="/catalogue/">
              Browse {products.length} products & grades{' '}
              <ArrowUpRight size={16} />
            </a>
            <a href="/quote/">
              Request a quote <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <figure className="home-warehouse">
          <img
            src="/images/chemstock-hero-1200.webp"
            srcSet="/images/chemstock-hero-640.webp 640w, /images/chemstock-hero-1200.webp 1200w"
            sizes="(max-width: 760px) 100vw, 40vw"
            fetchPriority="high"
            alt="Chemical drums in an industrial warehouse"
            width="1200"
            height="800"
          />
          <figcaption>Specialty chemicals / Industrial supply</figcaption>
        </figure>
      </section>
      <section
        className="home-directory container"
        aria-labelledby="home-products"
      >
        <div className="home-section-heading">
          <div>
            <p className="section-label">Product directory</p>
            <h2 id="home-products">Start with the material.</h2>
          </div>
          <a href="/catalogue/">
            Full catalogue <ArrowUpRight size={17} />
          </a>
        </div>
        <Table className="home-material-table">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>CAS number</TableHead>
              <TableHead className="material-family">Family</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featured.map((p) => (
              <TableRow key={p.slug}>
                <TableCell>
                  <a href={'/catalogue/' + p.slug + '/'}>{p.name}</a>
                </TableCell>
                <TableCell>{p.cas}</TableCell>
                <TableCell className="material-family">{p.family}</TableCell>
                <TableCell>
                  <a
                    href={'/catalogue/' + p.slug + '/'}
                    aria-label={'View ' + p.name}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="directory-note">
          SDS, grade specifications, and supplier documentation are available on
          request. Confirm current availability with our team.
        </p>
      </section>
      <section className="home-markets container">
        <div>
          <p className="section-label">Markets</p>
          <h2>What are you making?</h2>
          <p>Explore materials and sourcing requirements by industry.</p>
        </div>
        <div className="home-market-list">
          {industries.map((i) => (
            <a key={i.key} href={'/industries/' + i.key + '/'}>
              <span>{i.name}</span>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </section>
      <section className="home-company container">
        <div>
          <p className="section-label">About Chemstock</p>
          <h2>Independent since 2001.</h2>
          <a className="text-link" href="/about/">
            About the company <ArrowUpRight size={16} />
          </a>
        </div>
        <div>
          <p>
            Privately owned and based in New Jersey, Chemstock works with
            international sourcing partners across specialty and industrial
            chemicals.
          </p>
          <p>
            You can send a single material request or a purchasing list. We’ll
            review the specification, identify sourcing options, and discuss the
            documents needed to qualify the proposed supply.
          </p>
          <div className="home-contact-line">
            <span>Contact Evelyn</span>
            <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com</a>
            <a href="tel:+17157261437">715-726-1437</a>
          </div>
        </div>
      </section>
    </main>
  );
}
