export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};
import { PageHero } from '../components/site';
export default function NotFound() {
  return (
    <main id="main">
      <PageHero
        label="Page not found"
        title="Let’s get you back on track."
        description="The page you’re looking for isn’t here. Explore our catalogue or contact us for help."
      />
      <section className="section">
        <div className="container">
          <a className="btn navy" href="/catalogue/">
            Explore the catalogue
          </a>{' '}
          <a className="btn outline" href="/contact/">
            Contact Chemstock
          </a>
        </div>
      </section>
    </main>
  );
}
