export function ProductFAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="product-faq">
      {items.map((item) => (
        <details key={item.question} className="sourcing-answer">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
