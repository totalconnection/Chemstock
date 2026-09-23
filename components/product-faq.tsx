'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
export function ProductFAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion className="product-faq">
      {items.map((x, i) => (
        <AccordionItem key={x.question} value={String(i)}>
          <AccordionTrigger>{x.question}</AccordionTrigger>
          <AccordionContent>
            <p>{x.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
