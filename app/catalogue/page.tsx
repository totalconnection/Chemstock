import { products } from '../../lib/catalogue';
import { pageMetadata } from '../../lib/seo';
import { PageHero, CTA } from '../../components/site';
import Catalogue from '../../components/catalogue';
export const metadata = pageMetadata(
  'Specialty Chemical Catalogue',
  'Browse 284 chemical products and grades by name, CAS number, family, or application. Request specifications, documentation, and a sourcing quote.',
  '/catalogue/',
);
export default function CataloguePage() {
  return (
    <main id="main">
      <PageHero
        label="Chemical catalogue"
        title="Chemical catalogue."
        description="Explore our chemical catalogue by name, CAS number, formula, or synonym. Need something else? We’re ready to help source it."
      />
      <section className="section">
        <div className="container">
          <Catalogue />
          <details className="sourcing-answer material-directory">
            <summary>All materials A–Z</summary>
            <ul>
              {[...products]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((p) => (
                  <li key={p.slug}>
                    <a href={`/catalogue/${p.slug}/`}>{p.name}</a>
                  </li>
                ))}
            </ul>
          </details>
        </div>
      </section>
      <CTA />
    </main>
  );
}
