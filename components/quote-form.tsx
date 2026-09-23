'use client';
import { useState } from 'react';
import { useLocationSearch } from '../lib/use-location-search';
import { ArrowUpRight, Mail } from 'lucide-react';
export default function QuoteForm() {
  const queryString = useLocationSearch();
  const [productOverride, setProduct] = useState<string | null>(null);
  const product =
    productOverride ?? new URLSearchParams(queryString).get('product') ?? '';
  const [emailLink, setEmailLink] = useState('');
  return (
    <form
      className="quote-form"
      onChange={() => setEmailLink('')}
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const field = (name: string) => {
          const value = d.get(name);
          return typeof value === 'string' ? value : '';
        };
        const body = `Hello Chemstock,\n\nI would like a quote for:\nProduct: ${field('product')}\nCAS number: ${field('cas')}\nQuantity: ${field('quantity')}\nGrade / specifications: ${field('specs')}\nDelivery destination: ${field('destination')}\nRequired timing: ${field('timing')}\n\nName: ${field('name')}\nCompany: ${field('company')}\nEmail: ${field('email')}\n\nThank you.`;
        setEmailLink(
          'mailto:sourcing@chemstock.com?subject=' +
            encodeURIComponent('Sourcing request: ' + product) +
            '&body=' +
            encodeURIComponent(body),
        );
      }}
    >
      <h2>Your sourcing requirements</h2>
      <p>Prepare a request, then send it to our team using your email app.</p>
      <div className="form-grid">
        <label className="wide">
          Chemical or product name <span>*</span>
          <input
            required
            maxLength={150}
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. Sebacic Acid"
          />
        </label>
        <label>
          CAS number
          <input name="cas" maxLength={60} placeholder="If known" />
        </label>
        <label>
          Quantity <span>*</span>
          <input
            required
            maxLength={100}
            name="quantity"
            placeholder="e.g. 1,000 kg"
          />
        </label>
        <label className="wide">
          Grade and specifications
          <textarea
            name="specs"
            rows={3}
            maxLength={1200}
            placeholder="Purity, packaging, application, or other requirements"
          />
        </label>
        <label>
          Delivery destination
          <input
            name="destination"
            maxLength={150}
            placeholder="City, state, country"
          />
        </label>
        <label>
          Required timing
          <input
            name="timing"
            maxLength={100}
            placeholder="e.g. Within 4 weeks"
          />
        </label>
        <label>
          Your name <span>*</span>
          <input name="name" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Company <span>*</span>
          <input
            name="company"
            autoComplete="organization"
            required
            maxLength={150}
          />
        </label>
        <label className="wide">
          Work email <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
          />
        </label>
      </div>
      <p className="small-copy">
        Your details stay in this page until you choose to send the email. See
        our <a href="/privacy/">privacy policy</a>.
      </p>
      <button type="submit" className="btn navy">
        Prepare email request <ArrowUpRight size={18} />
      </button>
      {emailLink && (
        <div className="email-ready" aria-live="polite">
          <strong>Your email is ready to open.</strong>
          <p>
            No request has been sent yet. Open your email app, review the
            details, and send it to Chemstock.
          </p>
          <a href={emailLink} className="btn">
            <Mail size={18} /> Open email draft
          </a>
          <p className="small-copy">
            No email app configured? Email sourcing@chemstock.com with the details
            above.
          </p>
        </div>
      )}
    </form>
  );
}
