# Chemstock handoff

## Hosting

Source repository: https://github.com/totalconnection/Chemstock

Recommended production host: Cloudflare Pages connected to this GitHub repository. Railway is not required. This build exports static HTML, CSS, and JavaScript and has no server-side runtime, database, secrets, or monthly application server requirement.

Cloudflare Pages configuration:

- Framework preset: None
- Production branch: main
- Build command: npm run build
- Output directory: out
- Node version: 22.16.0 or later in the 22 LTS line

Confirm the actual output directory from the build summary if framework tooling changes. Preview the pages.dev deployment before changing the existing Chemstock.com DNS. Cloudflare account access and domain/DNS access are not configured by this repository.

GitHub Pages is not the recommended production host for a quote-driven commercial catalogue, given its commercial-use limitations: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
Cloudflare static hosting: https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

## Current scope

Home, About, Industries, Contact, Request a quote, Chemical catalogue, three chemical detail pages, Privacy, Accessibility, Terms, and a not-found page. A modern SVG logo is included in public/images/chemstock-logo.svg.

The catalogue contains three representative products from the existing Chemstock site. This is not a complete catalogue migration. Search accepts product names, CAS numbers, synonyms, formulas, families, and application terms. Industry and physical-form filters operate on this selected collection.

The quote tool prepares a mailto draft. It does not submit, store, or send anything on its own. A visitor must open and send the draft in their email client. Replace this with a connected form service or server endpoint if browser-only submissions and lead tracking are needed. Railway is one possible backend host, not a prerequisite; Cloudflare Functions or a form service would also work.

## Before production launch

- Import and verify the complete chemical catalogue, classifications, documents, specifications, packaging, and availability language. Do not treat typical product specs as current guaranteed specifications.
- Confirm product data with Chemstock's source records. CAS numbers and formulas were cross-checked against PubChem, with source URLs retained in lib/catalogue.ts.
- Approve the new logo and company copy. Confirm the photo reuse rights for the existing Chemstock homepage image.
- Review Privacy and Terms drafts with the business and legal adviser. Confirm legal entity, processing practices, retention, providers, applicable jurisdiction, and effective dates. Draft notices are intentionally visible until that review.
- Complete keyboard, screen-reader, mobile, and browser QA. The accessibility page deliberately does not claim audited conformance.
- Review and remove preview-only robots restrictions: public/robots.txt, X-Robots-Tag in public/_headers, and robots metadata in app/layout.tsx. Add a production sitemap after the catalogue is finalized.
- Confirm the chosen hosting account and domain ownership; connect Chemstock.com only after review. Preserve any existing mail DNS records.

## Assets

Hero image copied from the user's existing Chemstock website:
https://chemstock.com/wp-content/uploads/2022/09/AdobeStock_199067491-scaled.jpeg
No new stock photo license was purchased.

Logo: original code-native geometric C / chemical-ring concept, navy #112e4b, green #83b84e. Vector source is editable.

## Optional browser-agent support

The catalogue registers search_chemstock_catalogue when the browser supports document.modelContext. It validates input, updates visible query and filters, and returns matching records. Registration is feature-detected; unsupported browsers work normally. No supported WebMCP testing context was available during this build, so that optional integration has not been verified end to end.

## Repository validation automation

The connected GitHub OAuth credential does not have the workflow scope. The proposed workflow is therefore included as docs/github-validation-workflow.yml.example, rather than installed under .github/workflows. An authorized repository maintainer can install it later. Local type checks, lint, the complete static build, seven catalogue search checks, and generated internal link/asset checks passed.

## Dependency review

The pinned starter dependency tree currently has npm audit advisories affecting server/build tooling, including Vinext, React Server Components, Vite, and transitive packages. The delivered production artifact is static and does not run these server packages. Do not deploy the development server or add server-side rendering without resolving the relevant advisories and retesting the framework update.
