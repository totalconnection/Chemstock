import { pageMetadata } from '../../lib/seo';
import { LegalPage } from '../../components/legal';
export const metadata = pageMetadata(
  'Terms of Service',
  'Read the terms for using the Chemstock website, catalogue information, and chemical sourcing enquiry services.',
  '/terms/',
);
export default function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      description="Information about using the Chemstock website and making a sourcing inquiry."
    >
      <p>
        <strong>Effective September 23, 2026</strong>
      </p>
      <p>
        These terms cover use of the Chemstock Inc. website, catalogue, and
        inquiry tools. Please read them before using these services. Separate
        written agreements govern any purchase or supply of chemicals.
      </p>
      <h2>Purpose of this website</h2>
      <p>
        This website introduces Chemstock’s chemical sourcing services and
        provides general product information for business customers. It is
        intended to help you identify materials and discuss requirements with
        our team.
      </p>
      <h2>Product information</h2>
      <p>
        Catalogue entries describe selected products and typical applications.
        Listed properties, grades, packaging, and specifications may vary by
        source or change over time. A catalogue listing does not confirm current
        inventory, suitability for a specific use, or availability in a
        particular location.
      </p>
      <p>
        Before ordering or using a product, obtain and review the current
        specifications, safety data sheet, and any application-specific
        documentation. The buyer is responsible for evaluating the product for
        the intended application and following applicable handling, storage, and
        use requirements.
      </p>
      <h2>Inquiries, quotes, and orders</h2>
      <p>
        Preparing or sending a quote request does not place an order or create a
        supply commitment. Pricing, availability, quantity, quality
        requirements, packaging, delivery, payment, and other transaction terms
        must be confirmed separately in writing. The terms agreed for a
        transaction govern that transaction.
      </p>
      <h2>Submitted information and files</h2>
      <p>
        Provide accurate business contact information and submit only material
        you are authorized to share. You retain rights in your documents and
        authorize Chemstock and its service providers to process them for your
        inquiry and related business communications. Do not submit malicious
        files, unlawful content, unnecessary sensitive personal information, or
        information restricted by a third-party agreement. Contact us before
        sending information that requires a separate confidentiality agreement.
      </p>
      <p>
        A submission confirmation records receipt of a request, not acceptance
        of an order. Automated notifications may be delayed or fail; contact our
        team directly for time-sensitive requirements. Information handling is
        described in our <a href="/privacy/">privacy policy</a>.
      </p>
      <h2>Permitted use</h2>
      <p>
        You may browse the website and use its product information to evaluate
        Chemstock’s services. Do not attempt to interfere with the operation of
        the site, access systems without authorization, impersonate another
        person, or submit unlawful content.
      </p>
      <h2>Content and third-party resources</h2>
      <p>
        Website text, branding, design, and other materials may be protected by
        intellectual property rights. Third-party marks and resources belong to
        their respective owners. Links to external resources are provided for
        reference; those websites have their own terms and privacy practices.
      </p>
      <h2>Availability and corrections</h2>
      <p>
        We may update product descriptions and website content. Information can
        contain omissions or errors, and access may occasionally be interrupted.
        Contact our team if you notice an issue or need current product
        information.
      </p>
      <h2>Website information and responsibility</h2>
      <p>
        Website content is provided for general business reference, as
        available. To the extent permitted by law, Chemstock does not warrant
        that website information is complete, error-free, continuously
        available, or suitable for a particular application. Reference data and
        links, including public chemical databases, do not replace
        supplier-specific specifications, certificates of analysis, or current
        safety data sheets.
      </p>
      <p>
        Nothing in these terms excludes liability or rights that cannot lawfully
        be excluded, or changes warranties and obligations expressly agreed in a
        separate written transaction. These website terms do not establish
        payment terms, a credit facility, or an assurance of regulatory approval
        for any product or use.
      </p>
      <h2>Updates</h2>
      <p>
        We may revise these terms as the website changes, with the effective
        date shown above. Updated website terms do not change existing written
        purchase or supply agreements. If any provision is unenforceable, the
        remaining provisions continue to apply to the extent permitted by law.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about the website can be directed to{' '}
        <a href="mailto:sourcing@chemstock.com">sourcing@chemstock.com</a> or{' '}
        <a href="tel:+17157261437">715-726-1437</a>. Mailing address: Chemstock
        Inc., P.O. Box 33, Farmingdale, NJ 07727.
      </p>
    </LegalPage>
  );
}
