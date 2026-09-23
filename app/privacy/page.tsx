import { LegalPage } from '../../components/legal';
export const metadata = { title: 'Privacy policy' };
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      description="How information is handled when you explore this website or contact Chemstock."
    >
      <div className="notice">
        Review draft for the redesigned website. This policy must be confirmed
        against Chemstock’s business practices and final hosting setup before
        launch.
      </div>
      <h2>About this policy</h2>
      <p>
        This policy describes information associated with browsing Chemstock’s
        website and making a sourcing inquiry. For questions, contact{' '}
        <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com</a> or write
        to Chemstock Inc., P.O. Box 33, Farmingdale, NJ 07727.
      </p>
      <h2>Information you provide</h2>
      <p>
        You may provide your name, company, work email address, chemical
        requirements, delivery destination, and other information when
        contacting Chemstock. We use the information in your inquiry to
        communicate with you, understand your needs, and discuss sourcing or
        order details.
      </p>
      <h2>The quote request tool</h2>
      <p>
        The quote tool prepares an email using details entered into the page.
        Preparing a draft does not submit a request to Chemstock. The draft
        opens in your email application, where you can review and send it.
        Details entered into the form are not saved to a customer account or a
        website database in this version.
      </p>
      <h2>Website operation</h2>
      <p>
        The hosting provider may process technical information, including IP
        addresses and request logs, to deliver and protect the website. This
        version of the site does not include advertising pixels, third-party
        analytics, or a newsletter signup. External websites and your email
        provider operate under their own privacy policies.
      </p>
      <h2>Using and sharing inquiry information</h2>
      <p>
        Information sent to Chemstock may be used to respond to an inquiry,
        prepare sourcing options, provide product documentation, and support an
        order. Relevant requirements may need to be shared with suppliers or
        service providers involved in that work. The final policy will describe
        the confirmed recipients, retention practices, and any additional
        processing before the new site is launched.
      </p>
      <h2>Your questions and choices</h2>
      <p>
        You can ask about the information you have provided, request a
        correction, or ask to stop receiving follow-up communications by
        emailing <a href="mailto:evelyn@chemstock.com">evelyn@chemstock.com</a>.
        Applicable privacy rights and any legal recordkeeping requirements
        depend on the circumstances and jurisdiction.
      </p>
      <h2>Changes to this policy</h2>
      <p>
        When information handling or website services change, this policy should
        be updated to reflect those practices. The approved policy will display
        its effective date.
      </p>
    </LegalPage>
  );
}
