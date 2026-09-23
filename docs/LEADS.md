# Lead storage and CSV exports

## Current state

The site is deployed at https://chemstock.pages.dev under the approved Cloudflare account. On September 23, 2026, the following production-environment connections were configured:

- Private R2 bucket `chemstock-leads`, bound as `LEADS` (public access disabled by default).
- Verified Resend domain `notifications.chemstock.com`; GoDaddy published the DKIM and sending CNAME records. The existing Microsoft 365 MX record remains unchanged.
- Domain-restricted, sending-only Resend key stored as encrypted `RESEND_API_KEY`.
- `EMAIL_FROM`: `Chemstock Quotes <quotes@notifications.chemstock.com>`.
- Turnstile widget for `chemstock.pages.dev` and `chemstock.com`, with site key and encrypted server secret configured.

Deployment `18a6d9ae-4c7d-4401-add8-f789f8f905c0` succeeded with these settings. The user explicitly chose to skip the end-to-end delivery test; no setup request was submitted. On September 23, the user approved enabling administrative dashboard access, and `ADMIN_TOKEN` was saved as an encrypted production secret. The private local key is held in `.leads/production-admin-token.txt` and is not committed. Do not confuse it with the separate local-preview key. Configuration deployment `2ffa0be1-e127-44e0-a66a-713ba0a7b02d` succeeded and applied it.

The main Chemstock.com site and nameservers have not been switched. Search indexing remains disabled on staging.

`npm run dev` starts the lead API alongside the preview. Local submissions save into `.leads/` (ignored by Git and blocked from Vite file serving):

- `csv/CS-<reference>.csv`: one CSV per request; multi-material requests have one row per material.
- `records/CS-<reference>.json`: request metadata and email-delivery state used by the private workspace.
- `files/CS-<reference>/<index>`: private attachments.
- `admin-token.txt`: generated local access key, file permissions 0600. Do not commit, expose, or email this key.

Visit `/leads/`, enter the key from `.leads/admin-token.txt`, then review leads or download the combined CSV. Downloads require authorization, including attachments. The key remains in the current tab only. There is no CRM dependency.

The local preview intentionally never sends email, even if production credentials exist elsewhere. The UI labels preview saves accordingly. Files persist across local server restarts. Back up `.leads/` privately if retaining local records.

## Production configuration reference

Use Cloudflare Pages with frontend output `out`, build `npm run build`, and root `functions/` included in the deployment. Do not deploy only `out` if enabling the backend. The backend is independent of Vinext SSR and does not expose the development server.

Configure:

1. A **private** R2 bucket bound as `LEADS`. Keep public access disabled.
2. A random `ADMIN_TOKEN` secret of at least 32 characters. Share through a password manager. Rotate by replacing the secret.
3. Cloudflare Turnstile `TURNSTILE_SITE_KEY` and secret `TURNSTILE_SECRET`, restricted to the deployed hostname. Production submissions fail closed until configured.
4. Resend `RESEND_API_KEY` and `EMAIL_FROM` using a verified sending domain. The recipient is fixed in the backend to `sourcing@chemstock.com`; the buyer's email is Reply-To.

The service stores a lead before trying notification. Failed or unconfigured notifications remain visible in the workspace, with a retry action. Provider idempotency keys use the lead reference. Large specification files are stored privately and accessed in the workspace rather than attached to notification emails.

End-to-end delivery verification was skipped at the user’s request. No real test delivery has been performed. Add host-level rate limits, set retention/access policy, and configure backups before accepting public leads. No automatic deletion schedule or virus scanner is enabled; uploaded documents are served only as downloads to authenticated staff and should be treated as untrusted files.

## Verification

`node tests/leads.mjs` exercises storage, repeat requests, changed-payload rejection, CSV formula escaping, multi-product requests, input validation, authenticated exports/files, and fail-closed production configuration. `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run validate:export` validate the complete site.

CSV exports neutralize spreadsheet formula prefixes. Incoming requests are limited to 50 materials, 5 attachments, 10 MB per file and 20 MB total. Export currently supports up to 10,000 saved requests and returns an explicit limit error above that, rather than silently truncating.

## References

- Cloudflare Turnstile server verification: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Resend email idempotency: https://resend.com/docs/dashboard/emails/idempotency-keys
