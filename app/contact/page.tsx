import { ProductFAQ } from '../../components/product-faq';
import { pageMetadata } from '../../lib/seo';
import { ArrowUpRight, Mail } from 'lucide-react';
import { PageHero } from '../../components/site';
export const metadata = pageMetadata(
  'Contact & Chemical Documentation Requests',
  'Contact Chemstock for chemical sourcing, SDS, grade specifications, and supplier documentation. Send your material requirements to Evelyn.',
  '/contact/',
);
export default function Contact() {
  return (
    <main id="main">
      <PageHero
        label="Contact"
        title="Contact Chemstock."
        description="A material to find, a specification to discuss, or a question about an order. Start a conversation with Chemstock."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2>Talk to our team.</h2>
            <div className="contact-detail">
              <small>Email</small>
              <a href="mailto:sourcing@chemstock.com">sourcing@chemstock.com ↗</a>
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
                href="mailto:sourcing@chemstock.com?subject=Product%20documentation%20request"
              >
                Request product documents <Mail size={17} />
              </a>
            </section>
          </div>
        </div>
      </section>
      <section
        className="container section"
        aria-labelledby="sourcing-questions"
      >
        <h2 id="sourcing-questions">Chemical sourcing questions</h2>
        <ProductFAQ
          items={[
            {
              question:
                'What information should I include in a chemical quote request?',
              answer:
                'Provide the material name or CAS number, required grade or specification, quantity, delivery destination, and timing. You can include multiple materials and upload a purchasing list or specification in the quote wizard.',
            },
            {
              question: 'How do I request an SDS or product specification?',
              answer:
                'Email sourcing@chemstock.com with the material name and required grade. SDS, product specifications, and supplier documentation are provided on request. Confirm the documents for the proposed source and grade before qualification.',
            },
            {
              question:
                'Does a catalogue listing confirm stock or availability?',
              answer:
                'No. Contact Chemstock to confirm current availability, packaging, minimum order requirements, lead time, and grade. A catalogue listing is a starting point for a sourcing enquiry.',
            },
            {
              question:
                'Can I request a chemical that is not in the catalogue?',
              answer:
                'Yes. Send the chemical name, CAS number if known, and your application or specification. Chemstock will review your sourcing requirement.',
            },
          ]}
        />
      </section>
    </main>
  );
}
