import { pageMetadata } from '../../lib/seo';
import LeadDashboard from '../../components/lead-dashboard';
export const metadata = pageMetadata(
  'Lead Workspace',
  'Private Chemstock enquiry management workspace.',
  '/leads/',
  true,
);
export default function Leads() {
  return (
    <main id="main" className="container section">
      <LeadDashboard />
    </main>
  );
}
