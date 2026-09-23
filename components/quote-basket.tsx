'use client';
import { useState } from 'react';
import { Plus, Check, ListPlus, Trash2 } from 'lucide-react';
import {
  useQuoteBasket,
  addToBasket,
  removeFromBasket,
  updateBasket,
} from '../lib/quote-basket';
import { products } from '../lib/catalogue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
export function AddToQuote({ slug }: { slug: string }) {
  const items = useQuoteBasket();
  const [error, setError] = useState('');
  const added = items.some((p) => p.slug === slug);
  return (
    <div className="quote-add">
      <button
        type="button"
        className={'quote-add-button ' + (added ? 'added' : '')}
        aria-pressed={added}
        onClick={() => {
          if (added) removeFromBasket(slug);
          else if (!addToBasket(slug))
            setError(
              'Your list holds up to 50 products. Send this request before adding more.',
            );
        }}
      >
        {added ? <Check size={16} /> : <Plus size={16} />}{' '}
        {added ? 'Added to quote' : 'Add to quote'}
      </button>
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
export function QuoteListLink() {
  const items = useQuoteBasket();
  return (
    <a className="quote-list-link" href="/quote/?basket=1">
      <ListPlus size={18} />
      <span>
        Quote list <b>{items.length}</b>
      </span>
    </a>
  );
}
export function BasketEditor({ quantities = false }: { quantities?: boolean }) {
  const items = useQuoteBasket();
  return (
    <div className="basket-editor">
      {items.map((item) => {
        const p = products.find((p) => p.slug === item.slug)!;
        return (
          <article className="basket-row" key={item.slug}>
            <div className="basket-row-heading">
              <div>
                <a href={'/catalogue/' + p.slug + '/'}>{p.name}</a>
                <small>{/^\d/.test(p.cas) ? 'CAS ' + p.cas : p.family}</small>
              </div>
              <button
                type="button"
                aria-label={'Remove ' + p.name}
                onClick={() => removeFromBasket(item.slug)}
              >
                <Trash2 size={17} />
              </button>
            </div>
            {quantities && (
              <>
                <div className="basket-quantity">
                  <label>
                    Quantity
                    <input
                      type="number"
                      min="0.001"
                      max="1000000000"
                      step="any"
                      required={!item.unknown}
                      disabled={item.unknown}
                      value={item.quantity}
                      onChange={(e) =>
                        updateBasket(item.slug, { quantity: e.target.value })
                      }
                    />
                  </label>
                  <div>
                    <label htmlFor={'unit-' + item.slug}>Unit</label>
                    <Select
                      value={item.unit}
                      disabled={item.unknown}
                      onValueChange={(v) =>
                        updateBasket(item.slug, { unit: v || 'kg' })
                      }
                    >
                      <SelectTrigger
                        id={'unit-' + item.slug}
                        className="filter-select"
                      >
                        <SelectValue>{item.unit}</SelectValue>
                      </SelectTrigger>
                      <SelectContent className="select-options">
                        {['kg', 'lb', 'metric tons', 'liters', 'gallons'].map(
                          (u) => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <button
                  type="button"
                  className="basket-unknown"
                  aria-pressed={item.unknown}
                  onClick={() =>
                    updateBasket(item.slug, { unknown: !item.unknown })
                  }
                >
                  {item.unknown
                    ? '✓ Quantity to discuss'
                    : 'Not sure about quantity?'}
                </button>
                <label className="basket-notes">
                  Grade or packaging requirements <span>Optional</span>
                  <input
                    maxLength={500}
                    value={item.notes}
                    placeholder="e.g. required purity, drum size"
                    onChange={(e) =>
                      updateBasket(item.slug, { notes: e.target.value })
                    }
                  />
                </label>
              </>
            )}
          </article>
        );
      })}
      <a className="text-link" href="/catalogue/">
        + Browse more products
      </a>
      <p className="small-copy">
        Your product list is saved in this browser. Contact details and files
        are not saved with it.
      </p>
    </div>
  );
}
