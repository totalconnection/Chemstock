import LeadDashboard from '../../components/lead-dashboard';
export const metadata = {
  title: 'Lead workspace',
  robots: { index: false, follow: false },
};
export default function Leads() {
  return (
    <main id="main" className="container section">
      <LeadDashboard />
    </main>
  );
}
