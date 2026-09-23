import { pageMetadata } from '../../lib/seo';
import { ArrowUpRight } from 'lucide-react';
import posts from '../../lib/blog-posts.json';
export const metadata = pageMetadata(
  'Chemical Purchasing Guides',
  'Practical guides to DINP, DOTP, DIDP, DOS and sebacic acid: compare costs, evaluate specifications and prepare your next chemical purchase.',
  '/blog/',
);
export default function Blog() {
  return (
    <main id="main">
      <section className="blog-hero container">
        <span className="eyebrow">The Chemstock blog</span>
        <h1>Chemical purchasing guides</h1>
        <p>Practical guidance for comparing materials, reviewing specifications and planning your next purchase.</p>
      </section>
      <section className="container published-blog-grid" aria-label="Articles">
        {posts.map((post) => (
          <article className="published-blog-card" key={post.slug}>
            <span className="eyebrow">{post.product}</span>
            <h2><a href={`/blog/${post.slug}/`}>{post.title}</a></h2>
            <p>{post.description}</p>
            <div className="published-blog-meta"><time dateTime={post.publishedAt}>September 23, 2026</time><span>{Math.ceil(post.wordCount / 200)} min read</span></div>
            <a className="text-link" href={`/blog/${post.slug}/`}>Read guide <ArrowUpRight size={17} /></a>
          </article>
        ))}
      </section>
    </main>
  );
}
