export type QuoteAnswers = {
  mode: string;
  product: string;
  requirements: string;
  cas: string;
  orderType: string;
  quantity: string;
  unit: string;
  quantityUnknown: boolean;
  timing: string;
  destination: string;
  name: string;
  company: string;
  email: string;
};
export function quoteEmail(answers: QuoteAnswers) {
  const material =
    answers.mode === 'help' ? 'Sourcing assistance' : answers.product.trim();
  const body = [
    'Hello Chemstock,',
    '',
    'Please help with the following sourcing request:',
    '',
    `Material: ${material}`,
    `CAS: ${answers.mode === 'help' ? 'To identify' : answers.cas.trim() || 'Not specified'}`,
    `Application / requirements: ${answers.requirements.trim() || 'To discuss'}`,
    `Order type: ${answers.orderType}`,
    `Quantity: ${answers.quantityUnknown ? 'Please help determine quantity' : answers.quantity + ' ' + answers.unit}`,
    `Timing: ${answers.timing}`,
    `Destination: ${answers.destination.trim() || 'To confirm'}`,
    '',
    `Name: ${answers.name.trim()}`,
    `Company: ${answers.company.trim()}`,
    `Email: ${answers.email.trim()}`,
    '',
    'Thank you.',
  ].join('\n');
  return {
    body,
    href:
      'mailto:evelyn@chemstock.com?subject=' +
      encodeURIComponent('Chemical sourcing request: ' + material) +
      '&body=' +
      encodeURIComponent(body),
  };
}
