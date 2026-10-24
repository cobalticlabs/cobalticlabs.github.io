import { SectionHead } from "./SectionHead";
import { testimonials, testimonialsIntro } from "@/content/home";

export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section
      className="wrap"
      id="kind-words"
      aria-labelledby="kind-words-title"
    >
      <SectionHead id="kind-words-title" {...testimonialsIntro} />
      <div className="quotes">
        {testimonials.map((t) => (
          <figure key={t.name} className="quote" data-reveal="">
            <blockquote>“{t.quote}”</blockquote>
            <figcaption>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
