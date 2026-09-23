import { handleLeads, type LeadEnvironment } from '../../server/leads';
export const onRequest: PagesFunction<LeadEnvironment> = ({ request, env }) =>
  handleLeads(request, { ...env, LOCAL_PREVIEW: false });
