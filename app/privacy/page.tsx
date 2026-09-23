import { pageMetadata } from '../../lib/seo';
import { LegalPage } from '../../components/legal';
export const metadata = pageMetadata(
  'Privacy Policy',
  'Read how Chemstock handles website enquiries, quote details, uploaded specifications, and contact information.',
  '/privacy/',
);
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      description="How information is handled when you explore this website or contact Chemstock."
    >
      <p>
        <strong>Effective September 23, 2026</strong>
      </p>
      <h2>Who we are and what this covers</h2>
      <p>
        Chemstock Inc. operates this chemical catalogue and sourcing website.
        This policy covers information collected through the website, quote
        requests, and related communications. Contact us at{' '}
        <a href="mailto:sourcing@chemstock.com">sourcing@chemstock.com</a>,{' '}
        <a href="tel:+17157261437">715-726-1437</a>, or P.O. Box 33,
        Farmingdale, NJ 07727.
      </p>
      <h2>Information you provide</h2>
      <p>
        When you request a quote, we collect your name, company, email address,
        selected chemicals and CAS numbers, quantities, application or
        specification requirements, order type, timing, delivery destination,
        and any notes or documents you choose to submit. Uploaded documents
        include their filenames and contents. We also keep a request reference,
        submission time, and notification-delivery status.
      </p>
      <p>
        Please provide only information needed for your sourcing request. Do not
        upload payment-card details, government identification, health
        information, passwords, or personal information you are not authorized
        to share. This website does not accept payments or create customer
        accounts.
      </p>
      <h2>How we use information</h2>
      <p>
        We use inquiry information to respond, identify materials, obtain
        sourcing options, prepare quotations, provide requested documentation,
        and follow up on your requirements. We also use operational information
        to protect the site, prevent duplicate submissions and abuse,
        troubleshoot issues, and maintain business records. Sending a request
        does not subscribe you to a newsletter.
      </p>
      <h2>Storage and service providers</h2>
      <ul>
        <li>
          <strong>Cloudflare:</strong> hosts the website through Pages,
          processes submissions through Functions, and stores request records,
          CSV records, and uploaded files in private R2 storage. Access to saved
          leads, exports, and files requires administrator authorization.
        </li>
        <li>
          <strong>Resend:</strong> sends quote notifications to Chemstock at
          sourcing@chemstock.com. The notification contains your request details
          and filenames, with your email as the reply address. Uploaded file
          contents are stored separately and are not attached to these automated
          notifications. See{' '}
          <a href="https://resend.com/legal/privacy-policy">
            Resend’s privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Business email:</strong> notifications and subsequent
          correspondence are processed through Chemstock’s Microsoft 365 email
          service. If you choose the email alternative, your own email provider
          also handles the message and any attachments you send.
        </li>
      </ul>
      <p>
        Authorized personnel can review requests and download CSV exports and
        documents for sourcing follow-up. Relevant requirements may be shared
        with suppliers and logistics providers when needed to respond to your
        inquiry or arrange supply. Information may also be disclosed where
        required by law or necessary to protect legal rights and prevent abuse.
      </p>
      <h2>Security verification and technical information</h2>
      <p>
        Cloudflare Turnstile protects the quote submission step from automated
        abuse. It processes technical signals, such as IP address, browser and
        device information, and interaction signals, to evaluate a request. Our
        server validates the resulting verification token. Hosting and security
        providers may also process network information and request logs to
        deliver and protect the site. See the{' '}
        <a href="https://www.cloudflare.com/turnstile-privacy-policy/">
          Cloudflare Turnstile privacy notice
        </a>
        .
      </p>
      <h2>Cookies and browser storage</h2>
      <p>
        The quote list uses your browser’s local storage to remember selected
        products, quantities, units, and product notes between visits. This
        storage has no automatic expiry in the website. Remove items from your
        quote list or clear this site’s data in your browser to remove them.
        Clearing browser storage does not delete a request already submitted to
        Chemstock.
      </p>
      <p>
        Contact details and selected upload files are held in the current page
        while you prepare a request; they are not saved in the persistent quote
        list. They are transmitted when you submit. If you choose to copy the
        request, its text is placed on your device’s clipboard.
      </p>
      <p>
        If you allow analytics, Google Analytics uses cookies to measure page
        visits and interactions, with technical information such as browser,
        device, and approximate location. Google processes this information to
        provide website usage reports. The Google tag is loaded only after you
        choose Allow analytics. Advertising storage and personalization are
        disabled. We do not send quote contents or uploaded documents to Google
        Analytics. Your analytics choice is stored in this browser. You can
        change it using Analytics preferences at the bottom of the page;
        declining stops further tracking and removes this site’s Analytics
        cookies. See{' '}
        <a href="https://policies.google.com/privacy">Google’s privacy policy</a>.
      </p>
      <p>
        We do not install advertising pixels or session-replay tools, or sell website
        inquiry information or share it for cross-context behavioral
        advertising. Essential hosting and security technologies may operate
        when you use the site; blocking them may prevent online submission. You
        can contact us directly instead.
      </p>
      <h2>How long information is kept</h2>
      <p>
        Submitted requests and attachments do not currently have an automatic
        deletion schedule. They remain in our private lead records until
        removed; email correspondence and downloaded business records may be
        kept separately. Retention depends on the inquiry, any resulting
        business relationship, legal recordkeeping needs, and dispute or
        security requirements. Contact us to request deletion or discuss a
        particular record. We may need to retain information where applicable
        law permits or requires it.
      </p>
      <h2>Your choices and privacy rights</h2>
      <p>
        You may contact us to request access to information you provided,
        correct it, request deletion, or stop inquiry follow-up. Depending on
        your location and applicable law, you may also have rights to receive a
        copy, restrict or object to processing, withdraw consent where
        processing relies on it, or complain to a privacy regulator. We may ask
        for information reasonably needed to verify your identity and authority
        before acting on a request.
      </p>
      <p>
        Where applicable, we process information to take steps at your request
        before a contract, fulfill a contract, meet legal obligations, and
        pursue legitimate interests in responding to business inquiries and
        securing the website. Consent is used where required. Chemstock is based
        in the United States, and our service providers may process information
        in the United States and other countries. Contact us for questions about
        processing that applies to your request.
      </p>
      <h2>Children and external links</h2>
      <p>
        This website is intended for business customers and is not directed to
        children under 13. Contact us if you believe a child has supplied
        personal information. External resources, including chemical reference
        databases, have their own privacy practices; this policy does not govern
        those websites.
      </p>
      <h2>Policy updates</h2>
      <p>
        We will update this page and its effective date when these practices
        change. Where required, we will provide additional notice of material
        changes.
      </p>
    </LegalPage>
  );
}
