# Lead storage and CSV exports

## Current state

Implemented and tested locally. Live storage, public hosting, and email delivery are **not connected**, as requested. No notification emails were sent during development.

`npm run dev` starts the lead API alongside the preview. Local submissions save into `.leads/` (ignored by Git and blocked from Vite file serving):

- `csv/CS-<reference>.csv`: one CSV per request; multi-material requests have one row per material.
- `records/CS-<reference>.json`: request metadata and email-delivery state used by the private workspace.
- `files/CS-<reference>/<index>`: private attachments.
- `admin-token.txt`: generated local access key, file permissions 0600. Do not commit, expose, or email this key.

Visit `/leads/`, enter the key from `.leads/admin-token.txt`, then review leads or download the combined CSV. Downloads require authorization, including attachments. The key remains in the current tab only. There is no CRM dependency.

The local preview intentionally never sends email, even if production credentials exist elsewhere. The UI labels preview saves accordingly. Files persist across local server restarts. Back up `.leads/` privately if retaining local records.

## Later: production connection

Use Cloudflare Pages with frontend output `out`, build `npm run build`, and root `functions/` included in the deployment. Do not deploy only `out` if enabling the backend. The backend is independent of Vinext SSR and does not expose the development server.

Configure:

1. A **private** R2 bucket bound as `LEADS`. Keep public access disabled.
2. A random `ADMIN_TOKEN` secret of at least 32 characters. Share through a password manager. Rotate by replacing the secret.
3. Cloudflare Turnstile `TURNSTILE_SITE_KEY` and secret `TURNSTILE_SECRET`, restricted to the deployed hostname. Production submissions fail closed until configured.
4. Resend `RESEND_API_KEY` and `EMAIL_FROM` using a verified sending domain. The recipient is fixed in the backend to `evelyn@chemstock.com`; the buyer's email is Reply-To.

The service stores a lead before trying notification. Failed or unconfigured notifications remain visible in the workspace, with a retry action. Provider idempotency keys use the lead reference. Large specification files are stored privately and accessed in the workspace rather than attached to notification emails.

Production configuration must be tested with an explicitly authorized real delivery when connected. No such delivery has been performed. Add host-level rate limits, set retention/access policy, and configure backups before accepting public leads. No automatic deletion schedule or virus scanner is enabled; uploaded documents are served only as downloads to authenticated staff and should be treated as untrusted files.

## Verification

`node tests/leads.mjs` exercises storage, repeat requests, changed-payload rejection, CSV formula escaping, multi-product requests, input validation, authenticated exports/files, and fail-closed production configuration. `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run validate:export` validate the complete site.

CSV exports neutralize spreadsheet formula prefixes. Incoming requests are limited to 50 materials, 5 attachments, 10 MB per file and 20 MB total. Export currently supports up to 10,000 saved requests and returns an explicit limit error above that, rather than silently truncating.

## References

- Cloudflare Turnstile server verification: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Resend email idempotency: https://resend.com/docs/dashboard/emails/idempotency-keys
