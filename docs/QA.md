# Website QA — September 23, 2026

Checked the revised supplier-directory design and existing site navigation.

- Static export: 304 pages built successfully.
- Internal audit: 18,375 link, asset, and fragment references across all exported HTML pages; no missing targets or anchors.
- External audit: 69 of 73 unique public URLs returned HTTP 200. Four returned HTTP 403 and remain unverified: ECHA dossier 15528, CDC NIOSH npgd0426, Fisher Scientific sebacic acid, and TCI S0022. A blocked automated request is not proof of a broken page.
- Browser checks: desktop and mobile homepage layout, mobile menu, material search suggestions, search submission, product navigation, quote basket, and navigation through all four wizard steps. No browser warnings or errors observed in the inspected log.
- Checks passed: TypeScript, lint, static export validation, and the existing lead-storage regression checks.

Fixed during this pass: the homepage search label association, suggestion opening, search text resetting on dismissal/blur, utility email wrapping, selection contrast, and singular product wording in the wizard.

The logo and quote wizard structure are retained. Homepage and shared styling now use flatter surfaces, product rows, fewer decorative elements, and direct sourcing copy.

This is a local preview and export check, not a production deployment or full accessibility certification. Live delivery to Evelyn and hosting integration remain deferred. No email was sent during the audit.
