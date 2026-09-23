import { ArrowUpRight, BookOpen } from 'lucide-react';
export const metadata = {
  title: 'Blog',
  description:
    'Future articles and perspectives from Chemstock on chemical sourcing and industry applications.',
};
export default function Blog() {
  return (
    <main id="main">
      <section className="blog-hero container">
        <span className="eyebrow">The Chemstock blog</span>
        <h1>
          A closer look
          <br />
          <em>at chemistry.</em>
        </h1>
        <p>Perspectives on materials, applications, and chemical sourcing.</p>
      </section>
      <section className="container blog-empty">
        <div className="blog-empty-icon">
          <BookOpen size={32} strokeWidth={1.3} />
        </div>
        <div>
          <h2>Our first articles are on the way.</h2>
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
