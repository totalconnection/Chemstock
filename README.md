# Chemstock

Modern Chemstock website and initial searchable chemical catalogue. React 19, Vinext, TypeScript, and static export.

The catalogue includes 284 product and grade records from Chemstock's public product pages and specialty-chemicals brochure. See [source review](docs/catalogue-source-review.md) for coverage and items needing confirmation.

## Local development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

The static export can be hosted on Cloudflare Pages. See [launch notes](docs/LAUNCH.md) for hosting configuration, content sources, current scope, and the remaining production review items.

No Railway service is required. The local preview stores leads as private CSV and JSON records in `.leads/`, with separate attachment files. `/leads/` provides authenticated review and CSV export. Live Cloudflare storage and email delivery are deliberately not connected yet. See [backend setup](docs/LEADS.md).

Product pages include sourced identity and reference properties, typical published specifications, procurement guidance, and documentation available on request. These references do not establish supplier certification or replace a current product SDS or lot-specific CoA.

The four-step quote wizard supports a multi-product list, per-product quantities, specification files, and request references. Industry guides and ten approved chemical purchasing articles are included. Blog content is stored in lib/blog-posts.json; production builds include the listing and article routes in the sitemap. The site uses cobalt, red, charcoal, and white and retains the selected logo.
