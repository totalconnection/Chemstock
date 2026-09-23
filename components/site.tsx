import { ArrowUpRight, Menu } from 'lucide-react';
import { QuoteListLink } from './quote-basket';
export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Chemstock home">
      <svg
        className="brand-mark"
        viewBox="0 0 44 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M33 9 21 2 3 12v23l18 11 12-7"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="m31 15-10-6-11 7v15l11 7 10-6"
          stroke="#e5323c"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle cx="35" cy="24" r="5" fill="#e5323c" />
      </svg>
      <span className="brand-name">
        chem<b>stock</b>
        <small>Specialty chemical sourcing</small>
      </span>
    </a>
  );
}
const links = [
  ['Catalogue', '/catalogue/'],
  ['Industries', '/industries/'],
  ['About us', '/about/'],
  ['Blog', '/blog/'],
  ['Contact', '/contact/'],
];
export function Header() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="utility">
        <div className="container">
          <span>Your chemical sourcing partner. Since 2001.</span>
          <span>
            <a href="tel:+17157261437">715-726-1437</a>
            <a href="mailto:evelyn@chemstock.com">
              evelyn@chemstock.com <span aria-hidden="true">↗</span>
            </a>
          </span>
        </div>
      </div>
      <header className="nav">
        <div className="container nav-inner">
          <Brand />
          <nav className="nav-links" aria-label="Main navigation">
            {links.map(([label, url]) => (
              <a key={url} href={url}>
                {label}
              </a>
            ))}
            <QuoteListLink />
            <a className="btn" href="/quote/">
              Request a quote <ArrowUpRight size={18} />
            </a>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Open navigation">
              <Menu size={25} />
            </summary>
            <nav aria-label="Mobile navigation">
              {links.map(([label, url]) => (
                <a key={url} href={url}>
                  {label}
                </a>
              ))}
              <QuoteListLink />
              <a className="btn" href="/quote/">
                Request a quote <ArrowUpRight size={18} />
              </a>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand />
            <p>
              The right chemistry.
              <br />
              The right sourcing partner.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <div className="footer-links">
              <a href="/catalogue/">Chemical catalogue</a>
              <a href="/industries/">Industries we serve</a>
              <a href="/about/">About Chemstock</a>
              <a href="/blog/">Blog</a>
            </div>
          </div>
          <div>
            <h3>Let’s work together</h3>
            <div className="footer-links">
              <a href="/quote/">Request a quote</a>
              <a href="/contact/">Contact our team</a>
              <a href="/contact/#documents">Request SDS & specifications</a>
            </div>
          </div>
          <div>
            <h3>Get in touch</h3>
            <div className="footer-links">
              <a href="tel:+17157261437">715-726-1437</a>
              <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com</a>
              <span>
                P.O. Box 33
                <br />
                Farmingdale, NJ 07727
              </span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Chemstock Inc. All rights reserved.
          </span>
          <div>
            <a href="/privacy/">Privacy policy</a>
            <a href="/accessibility/">Accessibility</a>
            <a href="/terms/">Terms of service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function CTA() {
  return (
    <div className="container">
      <section className="cta">
        <div>
          <h2>Let’s find your next solution.</h2>
          <p>
            A specific material. A challenging specification. A tight deadline.
            <br />
            Tell us what you need, and we’ll get to work.
          </p>
        </div>
        <a href="/quote/" className="btn">
          Talk to our sourcing team <ArrowUpRight size={19} />
        </a>
      </section>
    </div>
  );
}
export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Home</a> <span aria-hidden="true">/</span> {label}
        </div>
        <div className="eyebrow">{label}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
