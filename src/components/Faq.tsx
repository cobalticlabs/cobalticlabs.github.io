import { SectionHead } from "./SectionHead";
import { faqIntro, faqs } from "@/content/home";

export function Faq() {
  return (
    <section className="wrap" id="faq" aria-labelledby="faq-title">
      <SectionHead id="faq-title" {...faqIntro} />
      <div className="faq">
        {faqs.map((item) => (
          <details key={item.question} className="faq__item">
            <summary>
              {item.question}
              <span className="faq__icon" aria-hidden="true" />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
