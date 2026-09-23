import { PageHero } from './site';
export function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main id="main">
      <PageHero
        label="Website information"
        title={title}
        description={description}
      />
      <section className="section">
        <div className="container legal-layout">
          <nav className="legal-nav" aria-label="Website policies">
            <a href="/privacy/">Privacy policy</a>
            <a href="/accessibility/">Accessibility</a>
            <a href="/terms/">Terms of service</a>
            <a href="/contact/">Contact Chemstock</a>
          </nav>
          <article className="prose">{children}</article>
        </div>
      </section>
    </main>
  );
}
