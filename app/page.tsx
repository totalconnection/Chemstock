import {
  ArrowUpRight,
  ArrowRight,
  Search,
  Globe2,
  ShieldCheck,
  Handshake,
  Truck,
  Paintbrush,
  Layers3,
  Factory,
  Droplets,
  Leaf,
  FlaskConical,
  Sparkles,
  Wheat,
} from 'lucide-react';
import { CTA } from '../components/site';
const industries = [
  {
    name: 'Coatings, adhesives & sealants',
    icon: Paintbrush,
    tag: 'Built for performance',
    key: 'coatings',
  },
  {
    name: 'Plastics & rubber',
    icon: Layers3,
    tag: 'Materials that make more',
    key: 'plastics',
  },
  {
    name: 'Industrial & petrochemicals',
    icon: Factory,
    tag: 'Keeping industry moving',
    key: 'industrial',
  },
  {
    name: 'Oil, gas & drilling',
    icon: Droplets,
    tag: 'Chemistry in the field',
    key: 'oil-gas',
  },
  {
    name: 'Nutrition & botanicals',
    icon: Leaf,
    tag: 'Naturally considered',
    key: 'nutrition',
  },
  {
    name: 'Cosmetics & personal care',
    icon: Sparkles,
    tag: 'Ingredients with purpose',
    key: 'personal-care',
  },
  {
    name: 'Flavor & fragrance',
    icon: FlaskConical,
    tag: 'Designed for the senses',
    key: 'flavor',
  },
  {
    name: 'Food & beverage',
    icon: Wheat,
    tag: 'The ingredients behind it',
    key: 'food',
  },
];
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              A world of chemistry. A personal connection.
            </div>
            <h1>
              The right chemistry.
              <br />
              <em>
                Without the
                <br />
                complexity.
              </em>
            </h1>
            <p>
              Specialty chemicals, global sourcing, and a team that knows your
              business. Let’s keep your next project moving.
            </p>
            <form className="hero-search" action="/catalogue/">
              <Search size={20} aria-hidden="true" />
              <input
                name="q"
                aria-label="Search the chemical catalogue"
                placeholder="Search by chemical name, CAS number, or synonym"
              />
              <button className="btn" aria-label="Search catalogue">
                <ArrowRight size={21} />
              </button>
            </form>
            <div className="search-help">
              Your next solution starts with the right material.
            </div>
            <div className="hero-bottom">
              <a href="/catalogue/" className="text-link">
                Explore the catalogue <ArrowUpRight size={17} />
              </a>
              <a href="/quote/" className="text-link">
                Get sourcing help <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="/images/chemstock-hero.jpg"
              alt="Industrial storage and distribution facility"
            />
            <div className="image-caption">
              <Globe2 size={32} />
              <div>
                <strong>Global reach. Personal commitment.</strong>
                <p>Connecting your business with the chemistry it needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trust" aria-label="Our approach">
        <div className="container trust-grid">
          {[
            {
              icon: Handshake,
              title: 'Independent since 2001',
              text: 'Relationships built to last',
            },
            {
              icon: Globe2,
              title: 'Global sourcing network',
              text: 'More connections. More possibilities.',
            },
            {
              icon: ShieldCheck,
              title: 'Your specifications first',
              text: 'Chemistry for your application',
            },
            {
              icon: Truck,
              title: 'Supply chain support',
              text: 'From sourcing to delivery',
            },
          ].map((x) => (
            <div className="trust-item" key={x.title}>
              <x.icon size={25} />
              <div>
                <strong>{x.title}</strong>
                <span>{x.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Chemistry across industries</div>
              <h2>Your industry. Our expertise.</h2>
            </div>
            <a className="text-link" href="/industries/">
              Explore all industries <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="industry-grid">
            {industries.map((x) => (
              <a
                href={'/catalogue/?industry=' + x.key}
                className="industry-card"
                key={x.key}
              >
                <x.icon size={30} strokeWidth={1.4} />
                <h3>{x.name}</h3>
                <span>{x.tag}</span>
                <ArrowUpRight className="card-arrow" />
              </a>
            ))}
          </div>
          <div className="section-note">
            Don’t see what you’re looking for?
            <a href="/quote/">Let our sourcing team find it.</a>
          </div>
        </div>
      </section>
      <section className="section pale">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Explore our chemistry</div>
              <h2>A closer look at our materials.</h2>
            </div>
            <a className="text-link" href="/catalogue/">
              Browse the catalogue <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="product-preview">
            {[
              {
                name: 'Maleic Acid',
                slug: 'maleic-acid',
                category: 'Chemical intermediates',
                text: 'A versatile intermediate for resins, coatings, and lubricant additives.',
              },
              {
                name: 'Sebacic Acid',
                slug: 'sebacic-acid',
                category: 'Oleochemicals',
                text: 'Castor oil derived chemistry for polymers, plasticizers, and lubricants.',
              },
              {
                name: 'Methyl Methacrylate',
                slug: 'methyl-methacrylate',
                category: 'Monomers',
                text: 'A building block for acrylic materials and coating applications.',
              },
            ].map((x) => (
              <article className="product-card" key={x.slug}>
                <span className="product-category">{x.category}</span>
                <h3>{x.name}</h3>
                <p>{x.text}</p>
                <a className="text-link" href={'/catalogue/' + x.slug + '/'}>
                  View chemical <ArrowUpRight size={17} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <div>
            <div className="eyebrow">More than a supplier</div>
            <h2>
              Good chemistry starts
              <br />
              with a good partnership.
            </h2>
            <div className="story-facts">
              <div>
                <strong>2001</strong>
                <span>Our story began</span>
              </div>
              <div>
                <strong>Global</strong>
                <span>Connections. Personal service.</span>
              </div>
            </div>
          </div>
          <div>
            <p>
              Every business has a different set of requirements. We take the
              time to understand yours—from the material specifications to the
              timing that matters.
            </p>
            <p>
              As an independently owned chemical distributor, we combine
              international sourcing relationships with direct, personal
              support. You’ll work with people who care about getting your
              project across the finish line.
            </p>
            <a href="/about/" className="text-link">
              Get to know Chemstock <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="section pale" style={{ marginBottom: 80 }}>
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">A straightforward process</div>
              <h2>From your requirements to your door.</h2>
            </div>
          </div>
          <div className="steps">
            {[
              {
                title: 'Tell us what you need',
                text: 'Find your material in our catalogue or share your chemical, specifications, quantity, and timeline.',
              },
              {
                title: 'Explore your options',
                text: 'Your sourcing contact works with our network to identify options and prepare a quote.',
              },
              {
                title: 'Move forward with confidence',
                text: 'Once you approve the details, we coordinate your order and keep you informed along the way.',
              },
            ].map((x, i) => (
              <div className="step" key={x.title}>
                <span className="number">0{i + 1} /</span>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </main>
  );
}
