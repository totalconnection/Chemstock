import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import posts from '../../../lib/blog-posts.json';
import { absoluteUrl, breadcrumbSchema, pageMetadata } from '../../../lib/seo';
import { StructuredData } from '../../../components/structured-data';
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) return { title: 'Article not found', robots: { index: false } };
  const metadata = pageMetadata(post.title, post.description, `/blog/${slug}/`);
  return { ...metadata, openGraph: { ...metadata.openGraph, type: 'article', publishedTime: post.publishedAt } };
}
export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const path = `/blog/${post.slug}/`;
  return (
    <main id="main" className="published-blog-article container">
      <StructuredData data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog/' }, { name: post.title, path }])} />
      <StructuredData data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description: post.description, datePublished: post.publishedAt, mainEntityOfPage: absoluteUrl(path), url: absoluteUrl(path), publisher: { '@id': absoluteUrl('/#organization') }, inLanguage: 'en-US', wordCount: post.wordCount }} />
      <a className="text-link" href="/blog/"><ArrowLeft size={17} /> All purchasing guides</a>
      <article>
        <header className="published-blog-heading">
          <span className="eyebrow">{post.product}</span>
          <h1>{post.title}</h1>
          <div className="published-blog-meta"><time dateTime={post.publishedAt}>Published September 23, 2026</time><span>{Math.ceil(post.wordCount / 200)} min read</span></div>
        </header>
        <div className="published-blog-body" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
      </article>
    </main>
  );
}
