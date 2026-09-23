import { notFound } from 'next/navigation';
import {
  ArrowUpRight,
  FileText,
  FlaskConical,
  ClipboardList,
  Package,
  Globe2,
  Mail,
  ArrowRight,
  CircleHelp,
} from 'lucide-react';
import { products, industries } from '../../../lib/catalogue';
import {
  chemicalProfiles,
  getChemicalIdentity,
  documentTypes,
  regulatoryReview,
} from '../../../lib/chemical-profiles';
import { ProductFAQ } from '../../../components/product-faq';
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
    title: p
      ? /^\d{2,7}-\d{2}-\d$/.test(p.cas)
        ? `${p.name} · CAS ${p.cas}`
        : p.name
      : 'Chemical not found',
    description: p?.description,
  };
}
function Formula({ value }: { value: string }) {
  return (
    <>
      {value
        .split(/(\d+)/)
        .map((part, i) =>
          /^\d+$/.test(part) ? <sub key={i}>{part}</sub> : part,
        )}
    </>
  );
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  const profile = chemicalProfiles[slug];
  if (!p || !profile) notFound();
  const identity = getChemicalIdentity(profile.cid, profile.identity);
  const molecularWeightHasUnits = /^\d/.test(identity.MolecularWeight);
  const hasStructure = [
    'maleic-acid',
    'sebacic-acid',
    'methyl-methacrylate',
  ].includes(p.slug);
  const request = (document: string) =>
    'mailto:evelyn@chemstock.com?subject=' +
    encodeURIComponent(document + ': ' + p.name + ' (CAS ' + p.cas + ')') +
    '&body=' +
    encodeURIComponent(
      `Hello Chemstock,\n\nPlease help us obtain ${document.toLowerCase()} for ${p.name}, CAS ${p.cas}.\n\nRequired grade: \nIntended application: \nDestination country: \nCompany: \nLot number (if applicable): \n\nThank you.`,
    );
  const sections = [
    ['overview', 'Overview'],
    ['specifications', 'Specifications'],
    ['applications', 'Applications'],
    ['documents', 'Documents'],
    ['supply', 'Supply & packaging'],
    ['safety', 'Safety'],
    ['regulatory', 'Qualification'],
  ];
  return (
    <main id="main" className="chemical-page">
      <section className="chemical-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a> / <a href="/catalogue/">Chemical catalogue</a>{' '}
            / {p.name}
          </div>
          <div className="chemical-hero-grid">
            <div>
              <div className="eyebrow">{profile.classification}</div>
              <h1>{p.name}</h1>
              <p>{p.description}</p>
              <div className="identity-strip">
                <div>
                  <span>CAS number</span>
                  <strong>{p.cas}</strong>
                </div>
                <div>
                  <span>Molecular formula</span>
                  <strong>
                    <Formula value={p.formula} />
                  </strong>
                </div>
                <div>
                  <span>Molecular weight</span>
                  <strong>
                    {identity.MolecularWeight}{' '}
                    {molecularWeightHasUnits && <small>g/mol</small>}
                  </strong>
                </div>
                <div>
                  <span>Physical form</span>
                  <strong>{p.form}</strong>
                </div>
              </div>
              <div className="chemical-hero-actions">
                <a
                  href={'/quote/?product=' + encodeURIComponent(p.name)}
                  className="btn navy"
                >
                  Request a quote <ArrowUpRight size={18} />
                </a>
                <a href="#documents" className="btn outline">
                  <FileText size={17} /> Request documents
                </a>
              </div>
            </div>
            <figure className="structure-card">
              {hasStructure ? (
                <img
                  width="600"
                  height="400"
                  src={'/images/structures/' + p.slug + '.png'}
                  alt={'Two-dimensional molecular structure of ' + p.name}
                />
              ) : (
                <div className="structure-placeholder">
                  <FlaskConical size={42} />
                  <strong>Product documentation</strong>
                  <span>
                    Structure and composition details are available with the
                    source-specific technical package.
                  </span>
                </div>
              )}
              <figcaption>
                <span>
                  {hasStructure ? '2D molecular structure' : 'Catalogue source'}
                </span>
                <a href={p.identitySource} target="_blank" rel="noreferrer">
                  {hasStructure ? 'PubChem' : 'Reference'}{' '}
                  <ArrowUpRight size={13} />
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
      <nav className="product-jump-nav" aria-label="Product sections">
        <div className="container">
          {sections.map(([id, label]) => (
            <a href={'#' + id} key={id}>
              {label}
            </a>
          ))}
        </div>
      </nav>
      <div className="container technical-layout">
        <div className="technical-content">
          <section id="overview" className="technical-section">
            <div className="section-kicker">
              <FlaskConical size={18} /> Chemical reference
            </div>
            <h2>Know your material.</h2>
            <p>{profile.overview}</p>
            <dl className="identity-grid">
              <div>
                <dt>IUPAC name</dt>
                <dd>{identity.IUPACName}</dd>
              </div>
              <div>
                <dt>EC number</dt>
                <dd>{profile.ec}</dd>
              </div>
              <div className="identity-wide">
                <dt>Common names & synonyms</dt>
                <dd>{p.synonyms.join(' · ')}</dd>
              </div>
              <div>
                <dt>Chemical family</dt>
                <dd>{profile.classification}</dd>
              </div>
              {profile.cid ? (
                <div>
                  <dt>PubChem CID</dt>
                  <dd>
                    <a href={p.identitySource} target="_blank" rel="noreferrer">
                      {profile.cid} ↗
                    </a>
                  </dd>
                </div>
              ) : (
                <div>
                  <dt>Identity reference</dt>
                  <dd>Confirmed with proposed source</dd>
                </div>
              )}
              {identity.InChIKey && (
                <div className="identity-wide">
                  <dt>InChIKey</dt>
                  <dd className="identifier-code">{identity.InChIKey}</dd>
                </div>
              )}
            </dl>
            <h3>Reference physical properties</h3>
            <p className="small-copy">
              Substance reference values, separate from the supplied-grade
              specification. Conditions and source are shown so your technical
              team can interpret the data.
            </p>
            <Table className="spec-table technical-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Reference value</TableHead>
                  <TableHead>Conditions / source</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profile.physicalProperties.map((x) => (
                  <TableRow key={x.name}>
                    <TableCell>{x.name}</TableCell>
                    <TableCell>{x.value}</TableCell>
                    <TableCell>
                      {x.context}{' '}
                      <a href={'#source-' + x.source}>
                        [
                        {profile.references.findIndex(
                          (r) => r.id === x.source,
                        ) + 1}
                        ]
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <section id="specifications" className="technical-section">
            <div className="section-kicker">
              <ClipboardList size={18} /> Technical qualification
            </div>
            <h2>Typical product specifications.</h2>
            <p className="small-copy">{profile.specificationsNote}</p>
            <Table className="spec-table technical-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Published limit / value</TableHead>
                  <TableHead>Method / conditions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profile.specifications.map(([name, value, condition]) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{value}</TableCell>
                    <TableCell>{condition}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="technical-callout">
              <FileText size={21} />
              <div>
                <strong>Qualify against the current specification.</strong>
                <p>
                  Request the grade-specific technical sheet, analytical
                  methods, and a representative CoA. Batch results belong on the
                  shipment’s certificate of analysis.
                </p>
                <a
                  href={request(
                    'Technical specification and representative CoA',
                  )}
                  className="text-link"
                >
                  Request a technical package <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <h3>What to define with your technical team</h3>
            <div className="qualification-grid">
              {profile.qualification.map((x, i) => (
                <article key={x.title}>
                  <span>0{i + 1}</span>
                  <h4>{x.title}</h4>
                  <p>{x.detail}</p>
                </article>
              ))}
            </div>
          </section>
          <section id="applications" className="technical-section">
            <div className="section-kicker">
              <FlaskConical size={18} /> Application fit
            </div>
            <h2>Where it works. What to evaluate.</h2>
            <div className="application-details">
              {profile.applications.map((x) => (
                <article key={x.name}>
                  <h3>{x.name}</h3>
                  <p>{x.detail}</p>
                  <div>
                    <span>Qualification focus</span>
                    {x.qualify}
                  </div>
                </article>
              ))}
            </div>
            <div className="industry-pills">
              {p.industries.map((key) => (
                <a key={key} href={'/catalogue/?industry=' + key}>
                  {industries.find((i) => i.key === key)?.name}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </section>
          <section id="documents" className="technical-section">
            <div className="section-kicker">
              <FileText size={18} /> Documentation
            </div>
            <h2>The detail behind your approval.</h2>
            <p>
              Product documents are available on request. Tell us the required
              grade and destination so we can identify the right documentation
              for your review.
            </p>
            <div className="document-grid">
              {documentTypes.map((doc) => (
                <article key={doc.key}>
                  <div className="document-top">
                    <FileText size={24} />
                    <span>On request</span>
                  </div>
                  <h3>{doc.title}</h3>
                  <p>{doc.detail}</p>
                  <small>
                    <strong>Include:</strong> {doc.include}
                  </small>
                  <a href={request(doc.title)} className="text-link">
                    Request {doc.short} <ArrowUpRight size={15} />
                  </a>
                </article>
              ))}
            </div>
            <p className="small-copy document-footnote">
              Certificates apply to a named source, site, grade, or batch.
              Request the scope and current revision needed for your approval
              process.
            </p>
          </section>
          <section id="supply" className="technical-section">
            <div className="section-kicker">
              <Package size={18} /> Procurement & logistics
            </div>
            <h2>Plan the supply around your operation.</h2>
            <p>
              Discuss the source, commercial requirements, and delivery schedule
              before placing an order.
            </p>
            <dl className="supply-list">
              {profile.sourcing.map(([name, value]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <div className="technical-callout">
              <ClipboardList size={21} />
              <div>
                <strong>Supplier onboarding or a second-source review?</strong>
                <p>
                  Share your qualification questionnaire, incoming
                  specification, required documentation, and change-notification
                  expectations with our team.
                </p>
                <a
                  className="text-link"
                  href={request('Supplier qualification information')}
                >
                  Discuss supplier qualification <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </section>
          <section id="safety" className="technical-section">
            <div className="section-kicker">
              <FileText size={18} /> EHS review
            </div>
            <h2>Safety, handling & storage.</h2>
            <p className="small-copy">
              This overview supports initial review and does not replace a
              current SDS, site risk assessment, or grade-specific handling
              instructions.
            </p>
            <div className="safety-list">
              {profile.safety.map((x) => (
                <article key={x.title}>
                  <h3>{x.title}</h3>
                  <p>
                    {x.detail}{' '}
                    {x.source && (
                      <a href={'#source-' + x.source}>
                        Reference [
                        {profile.references.findIndex(
                          (r) => r.id === x.source,
                        ) + 1}
                        ]
                      </a>
                    )}
                  </p>
                </article>
              ))}
            </div>
            <a className="text-link" href={request('Safety data sheet')}>
              Request the current SDS <ArrowUpRight size={15} />
            </a>
          </section>
          <section id="regulatory" className="technical-section">
            <div className="section-kicker">
              <Globe2 size={18} /> Market & supplier qualification
            </div>
            <h2>Confirm the requirements for your market.</h2>
            <p>
              Applicable requirements depend on the source, destination, and end
              use. Use this list to identify the statements and evidence your
              team needs; it is not a claim of certification or regulatory
              approval.
            </p>
            <dl className="supply-list">
              {regulatoryReview.map(([name, detail]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
            <a
              className="text-link"
              href={request('Regulatory and supplier declarations')}
            >
              Request supporting declarations <ArrowUpRight size={15} />
            </a>
          </section>
          <section className="technical-section" id="questions">
            <div className="section-kicker">
              <CircleHelp size={18} /> Technical questions
            </div>
            <h2>Before you qualify this material.</h2>
            <ProductFAQ items={profile.faqs} />
          </section>
          <section
            className="technical-section reference-section"
            id="references"
          >
            <div className="section-kicker">Sources & information quality</div>
            <h2>Traceable information.</h2>
            <p className="small-copy">
              Reference data checked September 22, 2026. Public references
              describe the substance; only the current supplier documents
              establish the specification, certifications, and shipment details
              for the material you purchase.
            </p>
            <ol>
              {profile.references.map((r) => (
                <li id={'source-' + r.id} key={r.id}>
                  <a href={r.url} target="_blank" rel="noreferrer">
                    {r.name} <ArrowUpRight size={14} />
                  </a>
                  <p>{r.scope}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside className="technical-aside">
          <div className="aside-sticky">
            <div className="quote-card">
              <div className="eyebrow">Your sourcing partner</div>
              <h2>
                Let’s talk
                <br />
                {p.name.toLowerCase()}.
              </h2>
              <p>Share your requirements for a source-specific response.</p>
              <a
                className="btn"
                href={'/quote/?product=' + encodeURIComponent(p.name)}
              >
                Request a quote <ArrowUpRight size={18} />
              </a>
              <small>
                Pricing, availability, and lead times confirmed on request.
              </small>
            </div>
            <div className="aside-docs">
              <FileText size={25} />
              <h3>Qualifying a material?</h3>
              <p>
                SDS, specifications, CoAs, and supplier certifications are
                available on request.
              </p>
              <a href="#documents" className="text-link">
                Explore documents <ArrowRight size={16} />
              </a>
            </div>
            <div className="aside-contact">
              <span>Direct access to our team</span>
              <a href="tel:+17157261437">715-726-1437</a>
              <a href="mailto:evelyn@chemstock.com">
                <Mail size={15} /> evelyn@chemstock.com
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
