import { pageMetadata } from '../../lib/seo';
import { LegalPage } from '../../components/legal';
export const metadata = pageMetadata(
  'Accessibility',
  'Learn about accessibility on our website and how to contact our team for help using the catalogue or requesting a quote.',
  '/accessibility/',
);
export default function Accessibility() {
  return (
    <LegalPage
      title="Accessibility"
      description="Making chemical sourcing information easier to access and use."
    >
      <h2>Our approach</h2>
      <p>
        We want people with a range of abilities and assistive technologies to
        be able to explore our products and contact our team. The redesigned
        site uses semantic headings, labeled form fields, keyboard-operable
        controls, visible focus indicators, and layouts that adapt to smaller
        screens.
      </p>
      <h2>Design target</h2>
      <p>
        The design aims to follow the{' '}
        <a
          href="https://www.w3.org/WAI/standards-guidelines/wcag/"
          target="_blank"
          rel="noreferrer"
        >
          Web Content Accessibility Guidelines (WCAG) 2.2
        </a>{' '}
        at Level AA. A comprehensive accessibility audit has not yet been
        completed, so this statement is not a claim of verified conformance.
      </p>
      <h2>Using the website</h2>
      <ul>
        <li>
          A “Skip to content” link is available when you begin navigating with a
          keyboard.
        </li>
        <li>
          Navigation, catalogue filters, and forms can be reached using a
          keyboard.
        </li>
        <li>
          Form fields use visible labels and indicate required information.
        </li>
        <li>The site respects your device’s reduced-motion preference.</li>
        <li>
          Contact information is available outside the quote request tool.
        </li>
      </ul>
      <h2>Documents and external services</h2>
      <p>
        Some product documents and external services may have different
        accessibility characteristics. If you need help accessing a
        specification or safety data sheet, contact us with the product name and
        your preferred format.
      </p>
      <h2>Tell us about a barrier</h2>
      <p>
        Email{' '}
        <a href="mailto:evelyn@chemstock.com?subject=Website%20accessibility%20assistance">
          evelyn@chemstock.com
        </a>{' '}
        or call <a href="tel:+17157261437">715-726-1437</a>. Please include the
        page or document, the task you were trying to complete, and the
        assistance you need. Sharing your browser or assistive technology can
        help us understand the issue, but is optional.
      </p>
    </LegalPage>
  );
}
