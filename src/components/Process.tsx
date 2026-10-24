import { SectionHead } from "./SectionHead";
import { processIntro, steps } from "@/content/home";

export function Process() {
  return (
    <section className="wrap" id="process" aria-labelledby="process-title">
      <SectionHead id="process-title" {...processIntro} />
      <ol className="steps">
        {steps.map((step, i) => (
          <li key={step.label} className="step">
            <span className="step__n">
              {String(i + 1).padStart(2, "0")} / {step.label}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
