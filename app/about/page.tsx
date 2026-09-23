import { ArrowUpRight, Globe2, Handshake, ClipboardCheck } from 'lucide-react';
import { PageHero, CTA } from '../../components/site';
export const metadata = { title: 'About us' };
export default function About() {
  return (
    <main id="main">
      <PageHero
        label="About Chemstock"
        title="About Chemstock."
        description="A privately owned chemical distributor serving manufacturing and formulation businesses since 2001."
      />
      <section className="section">
        <div className="container story-grid">
          <div>
            <div className="eyebrow">Our story</div>
            <h2>
              Connecting people
              <br />
              and chemistry
              <br />
              since 2001.
            </h2>
          </div>
          <div>
            <p>
              Chemstock is a privately owned international chemical distributor.
              Since 2001, we have worked with customers in plastics and
              specialty chemicals to help them source the materials their
              businesses depend on.
            </p>
            <p>
              Our approach starts with a conversation. We want to understand the
              specification you need, the application you’re working on, and the
              deadline you’re facing. Then we put our sourcing relationships and
              chemical expertise to work.
            </p>
            <p>
              Whether you’re planning your next production run or looking for a
              hard-to-find material, we bring the same personal attention to
              your request.
            </p>
          </div>
        </div>
      </section>
      <section className="section pale">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">The way we work</div>
              <h2>How we work.</h2>
            </div>
          </div>
          <div className="values-grid">
            {[
              {
                icon: Handshake,
                title: 'Personal from the start',
                text: 'Direct conversations with people who take the time to understand your business and follow through on your requirements.',
              },
              {
                icon: Globe2,
                title: 'Connected around the world',
                text: 'International sourcing relationships help us explore options across a broad range of specialty chemicals and applications.',
              },
              {
                icon: ClipboardCheck,
                title: 'Clarity at every step',
                text: 'We work through specifications, sourcing options, and order details with you, so you know what happens next.',
              },
            ].map((x) => (
              <article className="value" key={x.title}>
                <x.icon size={32} strokeWidth={1.4} />
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <div>
            <div className="eyebrow">Built around your business</div>
            <h2>
              Different industries.
              <br />
              The same commitment.
            </h2>
          </div>
          <div>
            <p>
              From coatings and plastics to personal care and food ingredients,
              our work spans a broad range of industries. What connects them is
              the need for a sourcing partner who listens and responds.
            </p>
            <a className="text-link" href="/industries/">
              Explore the industries we serve <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="human-contact">
          <div className="contact-monogram" aria-hidden="true">
            C.
          </div>
          <div>
            <span className="eyebrow">Your direct contact</span>
            <h2>Contact Evelyn.</h2>
            <p>
              Share the material, specification, and timeline. Start with an
              email or a call, and work through the sourcing details with
              Chemstock.
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
      <CTA />
    </main>
  );
}
