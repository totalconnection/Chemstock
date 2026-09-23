'use client';
import { BasketEditor } from './quote-basket';
import { useQuoteBasket } from '../lib/quote-basket';
import QuoteDelivery from './quote-delivery';
import RequirementsUpload from './requirements-upload';
import { useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Check,
  FlaskConical,
  Package,
  Repeat2,
  Clock3,
  CalendarDays,
  Lightbulb,
  Search,
  Mail,
  ClipboardCopy,
  Phone,
  ArrowUpRight,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { useLocationSearch } from '../lib/use-location-search';
import { products } from '../lib/catalogue';
import { quoteEmail, type QuoteAnswers } from '../lib/quote';
const steps = ['Your material', 'Quantity', 'Timing', 'Your details'];
const orderOptions = [
  {
    value: 'Sample / trial',
    title: 'Sample or trial',
    description: 'Qualify a material first',
    icon: FlaskConical,
  },
  {
    value: 'One-time order',
    title: 'One-time order',
    description: 'For a specific requirement',
    icon: Package,
  },
  {
    value: 'Recurring supply',
    title: 'Recurring supply',
    description: 'Plan ongoing production',
    icon: Repeat2,
  },
];
const timingOptions = [
  {
    value: 'As soon as possible',
    title: 'As soon as possible',
    description: 'An urgent requirement',
    icon: Clock3,
  },
  {
    value: 'Within the next month',
    title: 'Within a month',
    description: 'For an upcoming project',
    icon: CalendarDays,
  },
  {
    value: 'Planning ahead',
    title: 'Planning ahead',
    description: 'Exploring future supply',
    icon: Lightbulb,
  },
];
export default function QuoteWizard() {
  const query = useLocationSearch();
  const basket = useQuoteBasket();
  const [basketOverride, setBasketOverride] = useState<boolean | null>(null);
  const usingBasket =
    (basketOverride ?? new URLSearchParams(query).has('basket')) &&
    basket.length > 0;
  const [files, setFiles] = useState<File[]>([]);
  const initialProduct = new URLSearchParams(query).get('product') || '';
  const [answers, setAnswers] = useState<QuoteAnswers>({
    mode: 'known',
    product: '',
    requirements: new URLSearchParams(query).get('application') || '',
    cas: '',
    orderType: '',
    quantity: '',
    unit: 'kg',
    quantityUnknown: false,
    timing: '',
    destination: '',
    name: '',
    company: '',
    email: '',
  });
  const [requirementsEdited, setRequirementsEdited] = useState(false);
  const [review, setReview] = useState<{
    answers: QuoteAnswers;
    files: File[];
  } | null>(null);
  const [productEdited, setProductEdited] = useState(false);
  const values = {
    ...answers,
    product: productEdited ? answers.product : initialProduct,
    requirements: requirementsEdited
      ? answers.requirements
      : new URLSearchParams(query).get('application') || answers.requirements,
  };
  const matchedProduct = products.find(
    (product) =>
      product.name.toLowerCase() === values.product.trim().toLowerCase() ||
      product.cas === values.product.trim(),
  );
  values.cas = matchedProduct?.cas || answers.cas;
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [submitted, setSubmitted] = useState<{
    id: string;
    preview: boolean;
  } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  function update<K extends keyof QuoteAnswers>(
    key: K,
    value: QuoteAnswers[K],
  ) {
    if (key === 'requirements') setRequirementsEdited(true);
    if (key === 'product') setProductEdited(true);
    setAnswers((a) => ({ ...a, [key]: value }));
    setError('');
    setCopied(false);
  }
  function go(next: number) {
    setStep(next);
    setError('');
    setTimeout(() => {
      titleRef.current?.focus({ preventScroll: true });
      document.getElementById('quote-wizard')?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
        block: 'start',
      });
    }, 0);
  }
  function next() {
    if (!formRef.current?.reportValidity()) return;
    if (
      step === 0 &&
      !usingBasket &&
      values.mode === 'known' &&
      !values.product.trim()
    ) {
      setError('Enter a chemical name or CAS number.');
      return;
    }
    if (
      step === 0 &&
      !usingBasket &&
      values.mode === 'help' &&
      !values.requirements.trim() &&
      !files.length
    ) {
      setError('Tell us briefly what you need the material to do.');
      return;
    }
    if (step === 1 && !values.orderType) {
      setError('Choose the type of order you have in mind.');
      return;
    }
    if (
      step === 1 &&
      !usingBasket &&
      !values.quantityUnknown &&
      (!values.quantity ||
        !Number.isFinite(Number(values.quantity)) ||
        Number(values.quantity) <= 0)
    ) {
      setError('Enter an estimated quantity, or choose “Not sure yet.”');
      return;
    }
    if (
      step === 1 &&
      usingBasket &&
      basket.some(
        (p) =>
          !p.unknown &&
          (!p.quantity ||
            !Number.isFinite(Number(p.quantity)) ||
            Number(p.quantity) <= 0 ||
            Number(p.quantity) > 1000000000),
      )
    ) {
      setError(
        'Enter a valid quantity for each material, or choose quantity to discuss.',
      );
      return;
    }
    if (step === 2 && !values.timing) {
      setError('Choose a timing option so we can prioritize your request.');
      return;
    }
    if (step === 3) {
      if (!values.name.trim() || !values.company.trim()) {
        setError('Add your name and company to finish the request.');
        return;
      }
      setReview({ answers: quotePayload, files: [...files] });
      setReady(true);
      setTimeout(() => titleRef.current?.focus(), 0);
      return;
    }
    go(step + 1);
  }
  const quotePayload = {
    ...values,
    files: files.map((f) => f.name),
    items: usingBasket
      ? basket.map((item) => {
          const p = products.find((p) => p.slug === item.slug)!;
          return {
            name: p.name,
            cas: p.cas,
            quantity: item.quantity,
            unit: item.unit,
            unknown: item.unknown,
            notes: item.notes,
          };
        })
      : undefined,
  };
  const request = quoteEmail(ready && review ? review.answers : quotePayload);
  return (
    <section id="quote-wizard" className="wizard-shell">
      <div className="wizard-intro">
        <a href="/catalogue/" className="wizard-back">
          <ArrowLeft size={15} /> Back to catalogue
        </a>
        <div className="eyebrow">Chemical sourcing</div>
        <h1>Request a quote.</h1>
        <p>
          Tell us what you need. We’ll help you work through the sourcing
          details.
        </p>
        <div className="wizard-promises">
          <div>
            <Check size={18} />
            <span>No account needed</span>
          </div>
          <div>
            <Check size={18} />
            <span>Not sure about a detail? We can help.</span>
          </div>
          <div>
            <Check size={18} />
            <span>A real person on the other end</span>
          </div>
        </div>
        <div className="wizard-direct">
          <span>Prefer a conversation?</span>
          <a href="tel:+17157261437">
            <Phone size={17} />
            715-726-1437
          </a>
          <a href="mailto:evelyn@chemstock.com">
            evelyn@chemstock.com <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="wizard-card">
        <div className="wizard-progress">
          <div className="wizard-step-label">
            <span>
              {submitted
                ? 'Saved'
                : ready
                  ? 'Ready to send'
                  : `Step ${step + 1} of ${steps.length}`}
            </span>
            <span>{ready ? 'Your request' : steps[step]}</span>
          </div>
          <Progress
            value={ready ? 100 : ((step + 1) / steps.length) * 100}
            aria-label="Quote request progress"
          />
          <ol className="wizard-step-list">
            {steps.map((label, i) => (
              <li
                key={label}
                aria-current={!ready && step === i ? 'step' : undefined}
              >
                <button
                  type="button"
                  disabled={i > step || ready}
                  onClick={() => go(i)}
                >
                  <span>{i < step || ready ? <Check size={12} /> : i + 1}</span>
                  {label}
                </button>
              </li>
            ))}
          </ol>
        </div>
        {ready ? (
          <div className="wizard-ready">
            <div className="ready-icon">
              <Mail size={30} />
            </div>
            <h2 tabIndex={-1} ref={titleRef}>
              {submitted
                ? submitted.preview
                  ? 'Preview request saved.'
                  : 'Your request has been received.'
                : 'Your request is ready.'}
            </h2>
            <p>
              {submitted ? (
                <>
                  Reference: <strong>{submitted.id}</strong>
                </>
              ) : (
                <>
                  Review your details and send your request.{' '}
                  <strong>Nothing has been sent yet.</strong>
                </>
              )}
            </p>
            <div className="request-preview">
              <span>To: evelyn@chemstock.com</span>
              <pre>{request.body}</pre>
            </div>
            <QuoteDelivery
              answers={review?.answers || quotePayload}
              files={review?.files || files}
              emailHref={request.href}
              onSaved={(id, preview) => setSubmitted({ id, preview })}
            />
            <button
              type="button"
              className="copy-request"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(request.body);
                  setCopied(true);
                } catch {
                  setError(
                    'Copy the request text above and email it to evelyn@chemstock.com.',
                  );
                }
              }}
            >
              <ClipboardCopy size={16} />
              {copied ? 'Copied to clipboard' : 'Copy request instead'}
            </button>
            <p className="wizard-note" aria-live="polite">
              {error ||
                'No email app? Copy the request and paste it into your preferred email service.'}
            </p>
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setReady(false);
                setSubmitted(null);
                setReview(null);
                go(3);
              }}
            >
              <ArrowLeft size={15} /> Edit my request
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
            noValidate
          >
            <div className="wizard-step-content">
              {step === 0 && (
                <>
                  <span className="wizard-question-number">
                    01 / YOUR MATERIAL
                  </span>
                  <h2 tabIndex={-1} ref={titleRef}>
                    What are you looking for?
                  </h2>
                  <p>Choose a chemical or tell us about your application.</p>
                  {basket.length > 0 && (
                    <button
                      type="button"
                      className="basket-mode"
                      aria-pressed={usingBasket}
                      onClick={() => setBasketOverride(!usingBasket)}
                    >
                      {usingBasket
                        ? '✓ Using your quote list'
                        : 'Use your saved quote list'}{' '}
                      · {basket.length}{' '}
                      {basket.length === 1 ? 'product' : 'products'}
                    </button>
                  )}
                  {usingBasket ? (
                    <BasketEditor />
                  ) : (
                    <>
                      <RadioGroup
                        className="mode-choices"
                        value={values.mode}
                        onValueChange={(v) => update('mode', String(v))}
                        aria-label="How can we help source your material?"
                      >
                        <label
                          htmlFor="mode-known"
                          className={
                            'mode-choice ' +
                            (values.mode === 'known' ? 'selected' : '')
                          }
                        >
                          <RadioGroupItem id="mode-known" value="known" />
                          <Search size={18} />
                          <span>I know the chemical</span>
                        </label>
                        <label
                          htmlFor="mode-help"
                          className={
                            'mode-choice ' +
                            (values.mode === 'help' ? 'selected' : '')
                          }
                        >
                          <RadioGroupItem id="mode-help" value="help" />
                          <Lightbulb size={18} />
                          <span>I need sourcing help</span>
                        </label>
                      </RadioGroup>
                      {values.mode === 'known' ? (
                        <>
                          <label className="wizard-field">
                            Chemical name or CAS number{' '}
                            <span aria-hidden="true">*</span>
                            <input
                              name="product"
                              required
                              maxLength={150}
                              value={values.product}
                              onChange={(e) => {
                                update('product', e.target.value);
                                update('cas', '');
                              }}
                              placeholder="e.g. Sebacic Acid or 111-20-6"
                              autoComplete="off"
                            />
                          </label>
                          <div className="suggested-products">
                            <span>From our catalogue</span>
                            <div>
                              {products
                                .filter((p) =>
                                  [
                                    'maleic-acid',
                                    'sebacic-acid',
                                    'methyl-methacrylate',
                                  ].includes(p.slug),
                                )
                                .map((p) => (
                                  <button
                                    key={p.slug}
                                    type="button"
                                    onClick={() => {
                                      update('product', p.name);
                                      update('cas', p.cas);
                                    }}
                                  >
                                    {p.name} <span>+</span>
                                  </button>
                                ))}
                            </div>
                          </div>
                          <Accordion className="wizard-optional">
                            <AccordionItem value="details">
                              <AccordionTrigger>
                                Add specifications or context{' '}
                                <span className="optional-label">Optional</span>
                              </AccordionTrigger>
                              <AccordionContent>
                                <label className="wizard-field">
                                  Grade, application, or other requirements
                                  <textarea
                                    rows={3}
                                    maxLength={700}
                                    value={values.requirements}
                                    onChange={(e) =>
                                      update('requirements', e.target.value)
                                    }
                                    placeholder="Purity, grade, packaging, or specifications your team needs"
                                  />
                                </label>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </>
                      ) : (
                        <label className="wizard-field">
                          What do you need the material to do?{' '}
                          <span aria-hidden="true">*</span>
                          <textarea
                            rows={4}
                            required={!files.length}
                            maxLength={700}
                            value={values.requirements}
                            onChange={(e) =>
                              update('requirements', e.target.value)
                            }
                            placeholder="Tell us about your application, target performance, or hard-to-find material."
                          />
                        </label>
                      )}
                    </>
                  )}
                  <RequirementsUpload files={files} onChange={setFiles} />
                </>
              )}
              {step === 1 && (
                <>
                  <span className="wizard-question-number">02 / QUANTITY</span>
                  <h2 tabIndex={-1} ref={titleRef}>
                    How much do you have in mind?
                  </h2>
                  <p>An estimate is enough to start the conversation.</p>
                  <RadioGroup
                    className="wizard-choice-grid"
                    value={values.orderType}
                    onValueChange={(v) => update('orderType', String(v))}
                    aria-label="Order type"
                  >
                    {orderOptions.map((o) => (
                      <label
                        key={o.value}
                        className={
                          'wizard-choice ' +
                          (values.orderType === o.value ? 'selected' : '')
                        }
                      >
                        <RadioGroupItem value={o.value} />
                        <o.icon size={25} strokeWidth={1.5} />
                        <strong>{o.title}</strong>
                        <small>{o.description}</small>
                      </label>
                    ))}
                  </RadioGroup>
                  {usingBasket ? (
                    <BasketEditor quantities />
                  ) : (
                    <>
                      <div className="quantity-fields">
                        <label className="wizard-field">
                          Estimated quantity
                          {!values.quantityUnknown && (
                            <span aria-hidden="true"> *</span>
                          )}
                          <input
                            type="number"
                            name="quantity"
                            min="0.001"
                            step="any"
                            max="1000000000"
                            required={!values.quantityUnknown}
                            disabled={values.quantityUnknown}
                            value={values.quantity}
                            onChange={(e) => update('quantity', e.target.value)}
                            placeholder="e.g. 1,000"
                          />
                        </label>
                        <div className="wizard-field">
                          <label htmlFor="quantity-unit">Unit</label>
                          <Select
                            value={values.unit}
                            onValueChange={(v) => update('unit', v || 'kg')}
                            disabled={values.quantityUnknown}
                          >
                            <SelectTrigger
                              className="filter-select"
                              id="quantity-unit"
                            >
                              <SelectValue>{values.unit}</SelectValue>
                            </SelectTrigger>
                            <SelectContent className="select-options">
                              {[
                                'kg',
                                'lb',
                                'metric tons',
                                'liters',
                                'gallons',
                              ].map((u) => (
                                <SelectItem key={u} value={u}>
                                  {u}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <button
                        className={
                          'not-sure ' +
                          (values.quantityUnknown ? 'selected' : '')
                        }
                        type="button"
                        aria-pressed={values.quantityUnknown}
                        onClick={() =>
                          update('quantityUnknown', !values.quantityUnknown)
                        }
                      >
                        {values.quantityUnknown ? (
                          <Check size={16} />
                        ) : (
                          <Lightbulb size={16} />
                        )}
                        Not sure yet—let’s discuss it
                      </button>
                    </>
                  )}
                </>
              )}
              {step === 2 && (
                <>
                  <span className="wizard-question-number">
                    03 / TIMING & DESTINATION
                  </span>
                  <h2 tabIndex={-1} ref={titleRef}>
                    When do you need it?
                  </h2>
                  <p>Help us understand your timeline and delivery needs.</p>
                  <RadioGroup
                    className="wizard-choice-grid"
                    value={values.timing}
                    onValueChange={(v) => update('timing', String(v))}
                    aria-label="Required timing"
                  >
                    {timingOptions.map((o) => (
                      <label
                        key={o.value}
                        className={
                          'wizard-choice ' +
                          (values.timing === o.value ? 'selected' : '')
                        }
                      >
                        <RadioGroupItem value={o.value} />
                        <o.icon size={25} strokeWidth={1.5} />
                        <strong>{o.title}</strong>
                        <small>{o.description}</small>
                      </label>
                    ))}
                  </RadioGroup>
                  <label className="wizard-field">
                    Where will it be delivered?{' '}
                    <span className="optional-label">Optional</span>
                    <input
                      maxLength={150}
                      name="destination"
                      value={values.destination}
                      onChange={(e) => update('destination', e.target.value)}
                      placeholder="City, state / region, and country"
                      autoComplete="off"
                    />
                  </label>
                  <p className="wizard-field-help">
                    A destination helps us assess sourcing and freight options.
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  <span className="wizard-question-number">
                    04 / YOUR DETAILS
                  </span>
                  <h2 tabIndex={-1} ref={titleRef}>
                    Who should we follow up with?
                  </h2>
                  <p>Just the essentials so our team knows who to contact.</p>
                  <div className="wizard-contact-fields">
                    <label className="wizard-field">
                      Your name <span aria-hidden="true">*</span>
                      <input
                        autoComplete="name"
                        name="name"
                        required
                        maxLength={100}
                        value={values.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Full name"
                      />
                    </label>
                    <label className="wizard-field">
                      Company <span aria-hidden="true">*</span>
                      <input
                        autoComplete="organization"
                        name="company"
                        required
                        maxLength={150}
                        value={values.company}
                        onChange={(e) => update('company', e.target.value)}
                        placeholder="Company name"
                      />
                    </label>
                    <label className="wizard-field full">
                      Work email <span aria-hidden="true">*</span>
                      <input
                        autoComplete="email"
                        name="email"
                        type="email"
                        required
                        maxLength={150}
                        value={values.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@company.com"
                      />
                    </label>
                  </div>
                  <div className="wizard-summary">
                    <div>
                      <strong>Your request at a glance</strong>
                      <button type="button" onClick={() => go(0)}>
                        Edit
                      </button>
                    </div>
                    <dl>
                      <div>
                        <dt>Material</dt>
                        <dd>
                          {usingBasket
                            ? `${basket.length} ${basket.length === 1 ? 'product' : 'products'} in your quote list`
                            : values.mode === 'help'
                              ? 'Sourcing assistance'
                              : values.product}
                        </dd>
                      </div>
                      <div>
                        <dt>Quantity</dt>
                        <dd>
                          {usingBasket
                            ? 'Specified per product'
                            : values.quantityUnknown
                              ? 'To discuss'
                              : values.quantity + ' ' + values.unit}{' '}
                          · {values.orderType}
                        </dd>
                      </div>
                      <div>
                        <dt>Timing</dt>
                        <dd>{values.timing}</dd>
                      </div>
                      {values.destination && (
                        <div>
                          <dt>Destination</dt>
                          <dd>{values.destination}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <p className="wizard-note">
                    Next, review your request before submitting it. See our{' '}
                    <a href="/privacy/">privacy policy</a>.
                  </p>
                </>
              )}
            </div>
            {error && (
              <p className="wizard-error" role="alert">
                {error}
              </p>
            )}
            <div className="wizard-controls">
              {step > 0 ? (
                <button
                  type="button"
                  className="wizard-back-button"
                  onClick={() => go(step - 1)}
                >
                  <ArrowLeft size={17} />
                  Back
                </button>
              ) : (
                <span className="wizard-control-note">
                  No purchase commitment.
                </span>
              )}
              <button type="submit" className="btn wizard-next">
                {step === 3 ? 'Review request' : 'Continue'}
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="wizard-footnote">
              <span>Your answers stay here while you move between steps.</span>
              {step > 0 && (
                <span>
                  {values.mode === 'known'
                    ? values.product
                    : 'Sourcing assistance'}
                </span>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
