import { SectionHead } from "./SectionHead";
import { engagements, engagementsIntro } from "@/content/home";
import { site } from "@/content/site";

export function Engagements() {
  return (
    <section className="wrap" id="pricing" aria-labelledby="pricing-title">
      <SectionHead id="pricing-title" {...engagementsIntro} />
      <div className="plans">
        {engagements.map((plan) => (
          <article key={plan.name} className="plan" data-reveal="">
            <h3>{plan.name}</h3>
            <p className="plan__for">{plan.bestFor}</p>
            <ul>
              {plan.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="plan__price mono">{plan.price}</p>
            <a
              className="btn btn--ghost"
              href={site.callUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk about this
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
