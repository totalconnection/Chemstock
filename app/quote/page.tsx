import { pageMetadata } from '../../lib/seo';
import QuoteWizard from '../../components/quote-wizard';
export const metadata = pageMetadata(
  'Request a Chemical Quote',
  'Request a quote for one chemical or a purchasing list. Specify grade, quantity, destination, timing, and documents using our quote wizard.',
  '/quote/',
);
export default function Quote() {
  return (
    <main id="main" className="quote-page">
      <div className="container">
        <QuoteWizard />
      </div>
    </main>
  );
}
