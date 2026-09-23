import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { industries, products } from '../../../lib/catalogue';
import { industryGuides } from '../../../lib/industry-guides';
import { AddToQuote } from '../../../components/quote-basket';
export function generateStaticParams() {
  return industries.map((i) => ({ key: i.key }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  return { title: industries.find((i) => i.key === key)?.name || 'Industry' };
}
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const industry = industries.find((i) => i.key === key);
  const guide = industryGuides[key];
  if (!industry || !guide) notFound();
  const matches = products.filter((p) => p.industries.includes(key));
  const families = [...new Set(matches.map((p) => p.family))];
  return (
    <main id="main">
      <section className="industry-hero">
        <div className="container">
          <div className="breadcrumb">
            <a href="/industries/">Industries</a> / {industry.name}
          </div>
          <div className="industry-hero-inner">
            <div>
              <span className="eyebrow">{industry.name}</span>
              <h1>{guide.headline}</h1>
              <p>{guide.intro}</p>
              <a
                className="btn navy"
                href={
                  '/quote/?application=' + encodeURIComponent(industry.name)
                }
              >
                Discuss your requirements <ArrowUpRight size={18} />
              </a>
            </div>
            <aside className="industry-brief">
              <span className="eyebrow">A useful starting point</span>
              <h2>Bring your requirements.</h2>
              <ul>
                {guide.checklist.map((c) => (
                  <li key={c}>
                    <Check size={18} />
                    {c}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>
      {(key === 'plastics' || key === 'coatings') && (
        <figure className="container industry-application-image">
          <img
            src={
              '/images/' +
              (key === 'plastics' ? 'plastics' : 'coatings') +
              '-application.jpg'
            }
            alt={
              key === 'plastics'
                ? 'Plastic film production equipment'
                : 'Large-format printing equipment in operation'
            }
            width="1600"
            height="650"
            loading="lazy"
          />
          <figcaption>
            {key === 'plastics'
              ? 'Materials for polymer processing and production.'
              : 'Chemistry for printing and surface applications.'}
          </figcaption>
        </figure>
      )}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Sourcing considerations</span>
              <h2>Sourcing requirements.</h2>
            </div>
          </div>
          <div className="values-grid">
            {guide.priorities.map(([title, body], i) => (
              <article className="value" key={title}>
                <span className="number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section pale">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Explore the catalogue</span>
              <h2>Related materials.</h2>
            </div>
            <a className="text-link" href={'/catalogue/?industry=' + key}>
              View all related materials <ArrowUpRight size={17} />
            </a>
          </div>
          {matches.length ? (
            <>
              <div className="family-ribbon">
                {families.map((f) => (
                  <a
                    key={f}
                    href={
                      '/catalogue/?industry=' +
                      key +
                      '&q=' +
                      encodeURIComponent(f)
                    }
                  >
                    {f} ↗
                  </a>
                ))}
              </div>
              <div className="industry-products">
                {matches.slice(0, 6).map((p) => (
                  <article key={p.slug}>
                    <span className="eyebrow">{p.family}</span>
                    <h3>
                      <a href={'/catalogue/' + p.slug + '/'}>{p.name}</a>
                    </h3>
                    <p>{p.description}</p>
                    <AddToQuote slug={p.slug} />
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-industry">
              <h3>Tell us which ingredient you need.</h3>
              <p>
                We do not yet have individually qualified listings for this
                category. Send your requirements so the team can assess sourcing
                options.
              </p>
              <a
                className="btn"
                href={
                  '/quote/?application=' + encodeURIComponent(industry.name)
                }
              >
                Ask the sourcing team
              </a>
            </div>
          )}
        </div>
      </section>
      <section className="container section">
        <div className="human-contact">
          <div className="contact-monogram" aria-hidden="true">
            C.
          </div>
          <div>
            <span className="eyebrow">A direct conversation</span>
            <h2>Contact our sourcing team.</h2>
            <p>
              Send your specification, explain the application, or ask which
              documents to request for supplier qualification.
            </p>
            <a className="text-link" href="mailto:evelyn@chemstock.com">
              evelyn@chemstock.com <ArrowUpRight size={17} />
            </a>
          </div>
          <a className="btn outline" href="tel:+17157261437">
            715-726-1437
          </a>
        </div>
      </section>
    </main>
  );
}
