import { ArrowUpRight, Mail } from 'lucide-react';
import { PageHero } from '../../components/site';
export const metadata = { title: 'Contact' };
export default function Contact() {
  return (
    <main id="main">
      <PageHero
        label="Contact"
        title="Let’s make the right connection."
        description="A material to find, a specification to discuss, or a question about an order. Start a conversation with Chemstock."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>Talk to our team.</h2>
            <div className="contact-detail">
              <small>Email</small>
              <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com ↗</a>
            </div>
            <div className="contact-detail">
              <small>Phone</small>
              <a href="tel:+17157261437">715-726-1437 ↗</a>
            </div>
            <div className="contact-detail">
              <small>Mailing address</small>
              <span>
                Chemstock Inc.
                <br />
                P.O. Box 33
                <br />
                Farmingdale, NJ 07727
              </span>
            </div>
          </div>
          <div>
            <section className="contact-panel">
              <div className="eyebrow">Sourcing & availability</div>
              <h2>Tell us what you need.</h2>
              <p>For a useful starting point, have these details ready:</p>
              <ul>
                <li>Chemical name or CAS number</li>
                <li>Quantity, grade, and key specifications</li>
                <li>Delivery destination and required timing</li>
              </ul>
              <a className="btn navy" href="/quote/">
                Prepare a quote request <ArrowUpRight size={18} />
              </a>
            </section>
            <section id="documents" style={{ paddingTop: 40 }}>
              <h3>Need an SDS or technical specification?</h3>
              <p>
                Tell us the product name and intended grade so we can help you
                obtain the appropriate documentation.
              </p>
              <a
                className="text-link"
                href="mailto:evelyn@chemstock.com?subject=Product%20documentation%20request"
              >
                Request product documents <Mail size={17} />
              </a>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
