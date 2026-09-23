import { LegalPage } from '../../components/legal';
export const metadata = { title: 'Terms of service' };
export default function Terms() {
  return (
    <LegalPage
      title="Terms of service"
      description="Information about using the Chemstock website and making a sourcing inquiry."
    >
      <div className="notice">
        Review draft for the redesigned website. Confirm the legal entity,
        commercial terms, and applicable law with Chemstock’s legal adviser
        before launch.
      </div>
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
      <h2>Contact</h2>
      <p>
        Questions about the website can be directed to{' '}
        <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com</a> or{' '}
        <a href="tel:+17157261437">715-726-1437</a>. Mailing address: Chemstock
        Inc., P.O. Box 33, Farmingdale, NJ 07727.
      </p>
    </LegalPage>
  );
}
