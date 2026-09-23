export type QuoteAnswers = {
  items?: {
    name: string;
    cas: string;
    quantity: string;
    unit: string;
    unknown: boolean;
    notes: string;
  }[];
  files?: string[];
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
  const material = answers.items?.length
    ? `${answers.items.length} materials`
    : answers.mode === 'help'
      ? 'Sourcing assistance'
      : answers.product.trim();
  const body = [
    'Hello Chemstock,',
    '',
    'Please help with the following sourcing request:',
    '',
    ...(answers.items?.length
      ? answers.items.flatMap((item, i) => [
          `${i + 1}. ${item.name}`,
          `CAS: ${item.cas}`,
          `Quantity: ${item.unknown ? 'To discuss' : item.quantity + ' ' + item.unit}`,
          `Requirements: ${item.notes || 'To discuss'}`,
          '',
        ])
      : [`Material: ${material}`]),
    answers.items?.length
      ? ''
      : `CAS: ${answers.mode === 'help' ? 'To identify' : answers.cas.trim() || 'Not specified'}`,
    `Application / requirements: ${answers.requirements.trim() || 'To discuss'}`,
    `Order type: ${answers.orderType}`,
    answers.items?.length
      ? 'Quantities: listed per material above'
      : `Quantity: ${answers.quantityUnknown ? 'Please help determine quantity' : answers.quantity + ' ' + answers.unit}`,
    `Timing: ${answers.timing}`,
    `Destination: ${answers.destination.trim() || 'To confirm'}`,
    '',
    `Name: ${answers.name.trim()}`,
    `Company: ${answers.company.trim()}`,
    `Email: ${answers.email.trim()}`,
    '',
    ...(answers.files?.length
      ? ['Documents to attach: ' + answers.files.join(', '), '']
      : []),
    'Thank you.',
  ].join('\n');
  return {
    body,
    href:
      'mailto:sourcing@chemstock.com?subject=' +
      encodeURIComponent('Chemical sourcing request: ' + material) +
      '&body=' +
      encodeURIComponent(body),
  };
}
