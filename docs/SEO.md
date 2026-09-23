# SEO and answer-engine readiness

## Implemented

- Route-specific titles, descriptions, absolute canonical URLs, Open Graph and Twitter sharing metadata across 303 real pages. Query variants point to the clean route.
- Organization and WebSite JSON-LD, Product data on 284 catalogue entries, and BreadcrumbList data on product and industry pages. No invented manufacturer, offers, price, stock, review, or certification claims. Product markup describes the catalogue; it does not make these quote-only pages eligible for all shopping rich results.
- A generated XML sitemap with 301 eligible URLs, excluding the private lead workspace, empty blog, and 404 page. No invented last-modified timestamps.
- All 284 materials linked in the initial catalogue HTML through the A–Z directory, in addition to interactive search.
- Product answers use native HTML details/summary, with answers present without JavaScript. Contact includes direct answers about quote requirements, documentation, availability, and unlisted materials. Existing chemical reference citations and source-specific qualifications remain intact.
- Responsive WebP images and a 1200×630 JPEG sharing image. Homepage image reduced from about 852 KB to about 144 KB (1200 px) or 60 KB (640 px). These are file-size measurements, not Core Web Vitals scores.
- 92 explicit redirect rules covering slash/non-slash legacy variants, including the additional quote form and four old topic articles. Article URLs lead to their relevant industry guides, not newly invented blog content.
- The existing brochure PDF is preserved at its original public URL. The legacy WordPress sample page intentionally receives a 404.
- Optional Google verification meta tag via GOOGLE_SITE_VERIFICATION. DNS verification remains the preferred option for a domain property.

## Launch settings

Keep CHEMSTOCK_INDEXABLE unset on local and preview builds. Set CHEMSTOCK_INDEXABLE=true **only in the production hosting build environment** when Chemstock.com is ready to launch. It must apply to the whole npm run build command, not only the export preparation script. This enables public-page robots metadata, removes the global noindex response header, and publishes crawl permissions with the sitemap URL. Do not copy public/ directly over out/ afterward: that would restore preview restrictions.

The lead workspace and API remain excluded. The blog stays noindex until it contains useful published articles; at that time update its page metadata and the exclusion sets in scripts/prepare-static.mjs and scripts/validate-seo.mjs.

Production validation:

```
CHEMSTOCK_INDEXABLE=true npm run build
CHEMSTOCK_INDEXABLE=true npm run validate:seo
npm run validate:export
```

Then rebuild the normal preview artifact with npm run build before sharing a preview deployment. Both indexing modes were tested locally. No production deployment has been made by this SEO pass.

## Account and live-domain work

1. Verify or use the existing chemstock.com property in Google Search Console. A domain property needs the exact Google-provided DNS TXT token; preserve existing email DNS records. Alternatively use an HTTPS URL-prefix property and set the exact GOOGLE_SITE_VERIFICATION token for the production build. Account access/token was not supplied during this pass.
2. Submit https://chemstock.com/sitemap.xml after launch. Use URL Inspection for the homepage, a product page, and an industry page. Review indexing, canonical selection, and any generative-search visibility settings available in the property.
3. Check the deployed robots.txt, response headers, canonical URLs, actual 301 redirects, and genuine 404 responses. Redirect destinations were validated against the export; hosting execution must be verified after deployment.
4. Run PageSpeed Insights/Lighthouse against the production domain on mobile and desktop. Monitor Core Web Vitals in Search Console as field data accumulates. Local image and HTML checks cannot establish production performance.
5. Monitor traffic and crawl errors after migration. Expand the redirect inventory using historical analytics/Search Console/backlink exports if available; the current inventory covers the live WordPress page/post sitemaps, not every historical URL ever published.

## AEO approach and limitations

Clear identification, readable answers, source references, crawlable HTML, and consistent company information support traditional and answer-engine search. No rankings or AI citations are guaranteed. The robots policy permits public-page crawlers at launch without adding separate AI-agent exclusions; production WAF/CDN settings must also allow legitimate crawlers.

Do not add fabricated pricing or unsupported certifications to satisfy structured-data validators. Do not replace missing supplier records with generated claims. Most brochure-only records still need confirmed grade-level specifications and original business information to become stronger resources for procurement teams. User requested no blog content yet, so no articles were generated.

No special llms.txt file or FAQ rich-result promise is used. Google explicitly says its generative search does not need special AI files or schema. Its FAQ rich-result feature was deprecated in May 2026; readable questions and answers remain useful to customers.

References checked:

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/updates
- https://developers.openai.com/api/docs/bots
- https://chemstock.com/wp-sitemap.xml

## Validation

npm run validate:seo checks canonical uniqueness, titles, descriptions, robots modes, sharing tags, JSON-LD presence, crawlable product links, sitemap exclusions, and redirect targets. npm run validate:export checks exported internal links and assets. Browser spot checks confirmed native product answers open and no warnings/errors appeared in the inspected log.
