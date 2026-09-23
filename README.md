# Chemstock

Modern Chemstock website and initial searchable chemical catalogue. React 19, Vinext, TypeScript, and static export.

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
