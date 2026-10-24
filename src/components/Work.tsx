import { SectionHead } from "./SectionHead";
import { work, workIntro } from "@/content/home";

export function Work() {
  return (
    <section className="wrap" id="work" aria-labelledby="work-title">
      <SectionHead id="work-title" {...workIntro} />
      <div className="work">
        {work.map((project) => (
          <article key={project.name} className="card">
            <div
              className="card__visual"
              style={{ "--card-bg": project.background } as React.CSSProperties}
            >
              <div className="el" aria-hidden="true">
                <i>{project.kind}</i>
                <b>{project.symbol}</b>
                <small>{project.stack.join(" · ")}</small>
              </div>
            </div>
            <div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              {project.stat && (
                <p className="card__stat">
                  <b>{project.stat.value}</b>
                  <span>{project.stat.label}</span>
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
