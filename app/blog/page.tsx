import { pageMetadata } from '../../lib/seo';
import { ArrowUpRight, BookOpen } from 'lucide-react';
export const metadata = pageMetadata(
  'Blog',
  'Chemical sourcing and industry articles from Chemstock. No articles are published yet; explore our catalogue or contact the sourcing team.',
  '/blog/',
  true,
);
export default function Blog() {
  return (
    <main id="main">
      <section className="blog-hero container">
        <span className="eyebrow">The Chemstock blog</span>
        <h1>Blog</h1>
        <p>Perspectives on materials, applications, and chemical sourcing.</p>
      </section>
      <section className="container blog-empty">
        <div className="blog-empty-icon">
          <BookOpen size={32} strokeWidth={1.3} />
        </div>
        <div>
          <h2>No articles published yet.</h2>
          <p>
            There are no published posts yet. In the meantime, explore the
            catalogue or talk with our sourcing team.
          </p>
          <div className="hero-bottom">
            <a className="text-link" href="/catalogue/">
              Explore materials <ArrowUpRight size={17} />
            </a>
            <a className="text-link" href="/contact/">
              Contact Chemstock <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
