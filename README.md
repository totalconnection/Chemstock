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

No Railway service or application database is required for the current implementation. Quote requests are prepared as email drafts; they are not sent or stored by the website.

Product pages include sourced identity and reference properties, typical published specifications, procurement guidance, and documentation available on request. These references do not establish supplier certification or replace a current product SDS or lot-specific CoA.

The four-step quote wizard collects material, quantity, timing, and contact details before preparing an email. The site uses cobalt, red, charcoal, and white. Logo concepts are under review; generated concept artwork is not a final vector identity.
