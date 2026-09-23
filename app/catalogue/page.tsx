import { PageHero, CTA } from '../../components/site';
import Catalogue from '../../components/catalogue';
export const metadata = { title: 'Chemical catalogue' };
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
        </div>
      </section>
      <CTA />
    </main>
  );
}
