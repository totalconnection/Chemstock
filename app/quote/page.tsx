import QuoteWizard from '../../components/quote-wizard';
export const metadata = { title: 'Request a quote' };
export default function Quote() {
  return (
    <main id="main" className="quote-page">
      <div className="container">
        <QuoteWizard />
      </div>
    </main>
  );
}
