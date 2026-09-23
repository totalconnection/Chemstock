'use client';
import { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import { searchProducts, products } from '../lib/catalogue';
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from './ui/combobox';
export default function ProductSearch({
  value,
  onChange,
  onPick,
  label = 'Search chemicals',
  name,
  id,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onPick?: (name: string, cas: string) => void;
  label?: string;
  name?: string;
  id?: string;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const input = value ?? query;
  const results = input.trim() ? searchProducts(input).slice(0, 7) : [];
  return (
    <div className="smart-search">
      <Search size={20} aria-hidden="true" />
      <Combobox
        items={results.map((p) => p.slug)}
        filter={null}
        value={null}
        open={open}
        onOpenChange={setOpen}
        inputValue={input}
        onInputValueChange={(v, details) => {
          if (details.reason !== 'input-change') return;
          setOpen(!!v.trim());
          setQuery(v);
          onChange?.(v);
        }}
        itemToStringLabel={(slug) =>
          products.find((p) => p.slug === slug)?.name || ''
        }
        onValueChange={(slug) => {
          const p = products.find((p) => p.slug === slug);
          if (!p) return;
          if (onPick) onPick(p.name, p.cas);
          else window.location.assign('/catalogue/' + p.slug + '/');
        }}
      >
        <ComboboxInput
          id={id}
          name={name}
          aria-label={label}
          placeholder="Chemical name, CAS number, or synonym"
          showTrigger={false}
          autoComplete="off"
        />
        <ComboboxContent className="search-suggestions">
          <ComboboxEmpty>
            {input.trim() ? (
              <a href={'/quote/?product=' + encodeURIComponent(input)}>
                No match? Ask us to source “{input}” <ArrowUpRight size={14} />
              </a>
            ) : (
              'Start typing to explore the catalogue.'
            )}
          </ComboboxEmpty>
          <ComboboxList>
            {(slug: string) => {
              const p = products.find((p) => p.slug === slug)!;
              return (
                <ComboboxItem key={slug} value={slug}>
                  <span>
                    <strong>{p.name}</strong>
                    <small>
                      {/^\d/.test(p.cas) ? 'CAS ' + p.cas + ' · ' : ''}
                      {p.family}
                    </small>
                  </span>
                  <ArrowUpRight size={16} />
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
