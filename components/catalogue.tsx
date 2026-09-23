'use client';
import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Search, ArrowUpRight, SlidersHorizontal, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useLocationSearch } from '../lib/use-location-search';
import { industries, searchProducts } from '../lib/catalogue';
export default function Catalogue() {
  const queryString = useLocationSearch();
  const params = new URLSearchParams(queryString);
  const [qOverride, setQ] = useState<string | null>(null);
  const [industryOverride, setIndustry] = useState<string | null>(null);
  const [form, setForm] = useState('all');
  const q = qOverride ?? params.get('q') ?? '';
  const requestedIndustry = params.get('industry');
  const industry =
    industryOverride ??
    (industries.some((x) => x.key === requestedIndustry)
      ? requestedIndustry!
      : 'all');
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const controller = new AbortController();
    try {
      Promise.resolve(
        context.registerTool(
          {
            name: 'search_chemstock_catalogue',
            description:
              'Search the three currently published Chemstock chemical records and update the visible catalogue results. This does not confirm stock or availability.',
            inputSchema: {
              type: 'object',
              properties: {
                query: { type: 'string' },
                industry: {
                  type: 'string',
                  enum: ['all', ...industries.map((x) => x.key)],
                },
              },
              required: ['query'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute: (input: unknown) => {
              if (
                !input ||
                typeof input !== 'object' ||
                !('query' in input) ||
                typeof input.query !== 'string'
              )
                throw new Error('query must be a string');
              const value = input as { query: string; industry?: string };
              if (
                Object.keys(value).some(
                  (k) => !['query', 'industry'].includes(k),
                )
              )
                throw new Error('Unknown field');
              if (
                value.industry !== undefined &&
                value.industry !== 'all' &&
                !industries.some((x) => x.key === value.industry)
              )
                throw new Error('Unknown industry');
              flushSync(() => {
                setQ(value.query);
                setIndustry(value.industry || 'all');
                setForm('all');
              });
              return searchProducts(value.query, value.industry || 'all').map(
                (p) => ({
                  name: p.name,
                  cas: p.cas,
                  url: '/catalogue/' + p.slug + '/',
                }),
              );
            },
          },
          { signal: controller.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => controller.abort();
  }, []);
  const results = searchProducts(q, industry, form);
  const filtered = q || industry !== 'all' || form !== 'all';
  return (
    <div className="catalogue-layout">
      <aside className="filter-panel">
        <h2>
          <SlidersHorizontal size={18} /> Refine your search
        </h2>
        <label htmlFor="industry-filter">Industry</label>
        <Select value={industry} onValueChange={(v) => setIndustry(v || 'all')}>
          <SelectTrigger id="industry-filter" className="filter-select">
            <SelectValue>
              {industry === 'all'
                ? 'All industries'
                : industries.find((x) => x.key === industry)?.name}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="select-options">
            <SelectItem value="all">All industries</SelectItem>
            {industries.map((x) => (
              <SelectItem key={x.key} value={x.key}>
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label htmlFor="form-filter">Physical form</label>
        <Select value={form} onValueChange={(v) => setForm(v || 'all')}>
          <SelectTrigger id="form-filter" className="filter-select">
            <SelectValue>{form === 'all' ? 'All forms' : form}</SelectValue>
          </SelectTrigger>
          <SelectContent className="select-options">
            {['all', 'Solid', 'Liquid'].map((x) => (
              <SelectItem key={x} value={x}>
                {x === 'all' ? 'All forms' : x}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {filtered && (
          <button
            className="reset"
            onClick={() => {
              setQ('');
              setIndustry('all');
              setForm('all');
            }}
          >
            <X size={15} /> Clear filters
          </button>
        )}
        <div className="filter-help">
          <h3>More than what’s listed.</h3>
          <p>
            Looking for another chemical? Our sourcing network goes beyond these
            published products.
          </p>
          <a href="/quote/" className="text-link">
            Ask our team <ArrowUpRight size={16} />
          </a>
        </div>
      </aside>
      <div>
        <div className="catalogue-search">
          <Search size={21} />
          <input
            aria-label="Search chemicals"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Chemical name, CAS number, formula, or synonym"
          />
          {q && (
            <button aria-label="Clear search" onClick={() => setQ('')}>
              <X size={18} />
            </button>
          )}
        </div>
        <div className="results-bar">
          <span aria-live="polite">
            {results.length} {results.length === 1 ? 'chemical' : 'chemicals'}
            {filtered ? ' matching your search' : ' in this collection'}
          </span>
          <span>Alphabetical · A–Z</span>
        </div>
        <div className="catalogue-results">
          {results.map((p) => (
            <article className="result-card" key={p.slug}>
              <div>
                <span className="product-category">{p.family}</span>
                <h2>
                  <a href={'/catalogue/' + p.slug + '/'}>{p.name}</a>
                </h2>
                <div className="chemical-identifiers">
                  <span>
                    CAS <b>{p.cas}</b>
                  </span>
                  <span>{p.formula}</span>
                  <span>{p.form}</span>
                </div>
                <p>{p.description}</p>
                <div className="tags">
                  {p.applications.slice(0, 2).map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
              <a
                className="result-link"
                href={'/catalogue/' + p.slug + '/'}
                aria-label={'View ' + p.name}
              >
                <ArrowUpRight size={24} />
              </a>
            </article>
          ))}
        </div>
        {results.length === 0 && (
          <div className="no-results">
            <Search size={35} />
            <h2>Let’s look a little further.</h2>
            <p>
              No listed chemicals match these filters. That doesn’t mean we
              can’t source your material.
            </p>
            <button
              className="btn outline"
              onClick={() => {
                setQ('');
                setIndustry('all');
                setForm('all');
              }}
            >
              Clear search
            </button>{' '}
            <a
              className="btn navy"
              href={'/quote/?product=' + encodeURIComponent(q)}
            >
              Ask us to source it <ArrowUpRight size={18} />
            </a>
          </div>
        )}
        <p className="catalogue-note">
          A selection of Chemstock’s published products. Contact us to confirm
          the grade, documentation, packaging, and availability for your
          application.
        </p>
      </div>
    </div>
  );
}
