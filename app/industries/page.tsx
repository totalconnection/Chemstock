import { ArrowUpRight } from 'lucide-react';
import { PageHero, CTA } from '../../components/site';
import { industries } from '../../lib/catalogue';
export const metadata = { title: 'Industries' };
export default function Industries() {
  return (
    <main id="main">
      <PageHero
        label="Industries"
        title="Industries we serve."
        description="Explore the markets we serve. We’ll help you connect your application with the right sourcing options."
      />
      <section className="section">
        <div className="container">
          <div className="industry-detail-grid">
            {industries.map((x, i) => (
              <article className="industry-detail" key={x.key}>
                <span className="number">0{i + 1} /</span>
                <h2>{x.name}</h2>
                <p>{x.description}</p>
                <a className="text-link" href={'/industries/' + x.key + '/'}>
                  Explore this industry <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
          <div className="section-note">
            Have another application in mind?
            <a href="/contact/">Let’s talk about it.</a>
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}
