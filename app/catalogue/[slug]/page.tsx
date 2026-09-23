import { notFound } from 'next/navigation';
import { ArrowUpRight, FileText } from 'lucide-react';
import { products } from '../../../lib/catalogue';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableHeader,
} from '../../../components/ui/table';
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  return {
    title: p ? `${p.name} · CAS ${p.cas}` : 'Chemical not found',
    description: p?.description,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a> / <a href="/catalogue/">Chemical catalogue</a>{' '}
            / {p.name}
          </div>
          <div className="eyebrow">{p.family}</div>
          <h1>{p.name}</h1>
          <div className="chemical-identifiers large">
            <span>
              CAS <b>{p.cas}</b>
            </span>
            <span>{p.formula}</span>
            <span>{p.form}</span>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container product-layout">
          <div>
            <h2>Overview</h2>
            <p>{p.description}</p>
            <div className="synonyms">
              <strong>Also known as</strong>
              <p>{p.synonyms.join(' · ')}</p>
            </div>
            <h2>Typical applications</h2>
            <ul className="application-list">
              {p.applications.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h2>Product information</h2>
            <p className="small-copy">
              Typical information from Chemstock’s existing catalogue. Confirm
              current specifications and available grades with our team before
              ordering.
            </p>
            <Table className="spec-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Typical information</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {p.specifications.map(([a, b]) => (
                  <TableRow key={a}>
                    <TableCell>{a}</TableCell>
                    <TableCell>{b}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="source-note">
              Chemical identifiers:{' '}
              <a href={p.identitySource} target="_blank" rel="noreferrer">
                PubChem ↗
              </a>
            </p>
          </div>
          <aside>
            <div className="quote-card">
              <div className="eyebrow">Let’s talk specifications</div>
              <h2>Source {p.name}.</h2>
              <p>
                Share your quantity, grade, destination, and timeline. We’ll
                explore the options with you.
              </p>
              <a
                className="btn"
                href={'/quote/?product=' + encodeURIComponent(p.name)}
              >
                Request a quote <ArrowUpRight size={18} />
              </a>
              <small>Availability and lead times confirmed by our team.</small>
            </div>
            <div className="document-card">
              <FileText size={25} />
              <h3>Product documents</h3>
              <p>
                Request the SDS and technical specifications for your required
                grade.
              </p>
              <a
                className="text-link"
                href={
                  'mailto:evelyn@chemstock.com?subject=' +
                  encodeURIComponent('Document request: ' + p.name)
                }
              >
                Request documents <ArrowUpRight size={17} />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
