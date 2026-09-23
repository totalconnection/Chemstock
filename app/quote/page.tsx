import { PageHero } from '../../components/site';
import QuoteForm from '../../components/quote-form';
export const metadata = { title: 'Request a quote' };
export default function Quote() {
  return (
    <main id="main">
      <PageHero
        label="Request a quote"
        title="Your next solution starts here."
        description="Tell us about the material you need. We’ll help you work through the sourcing details."
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            <div className="eyebrow">Personal sourcing support</div>
            <h2>
              A real conversation.
              <br />A clear next step.
            </h2>
            <p>
              Whether you’ve found your chemical in our catalogue or need help
              locating it, share your requirements with our team.
            </p>
            <div className="contact-detail">
              <small>Prefer to talk?</small>
              <a href="tel:+17157261437">715-726-1437 ↗</a>
            </div>
            <div className="contact-detail">
              <small>Email us directly</small>
              <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com ↗</a>
            </div>
            <p className="small-copy">
              Quote requests are inquiries, not orders. Price, availability,
              specifications, and delivery terms are confirmed separately.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
