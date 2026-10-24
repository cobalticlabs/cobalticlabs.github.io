import Link from "next/link";
import type { Route } from "next";
import { SectionHead } from "./SectionHead";
import { workIntro } from "@/content/home";
import { work } from "@/content/work";
import type { Project } from "@/content/types";

export function ElementCard({ project }: { project: Project }) {
  return (
    <div className="el" aria-hidden="true">
      <div className="el__inner">
        <div className="el__face el__front">
          <i>{project.kind}</i>
          <b>{project.symbol}</b>
          <small>{project.stack.slice(0, 2).join(" · ")}</small>
        </div>
        <div className="el__face el__back">
          <small>{project.stack.join(" · ")}</small>
          <span>Read the case study →</span>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section className="wrap" id="work" aria-labelledby="work-title">
      <SectionHead id="work-title" {...workIntro} />
      <div className="work">
        {work.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}/` as Route}
            className="card"
          >
            <div
              className="card__visual"
              data-tilt=""
              style={{ "--card-bg": project.background } as React.CSSProperties}
            >
              <ElementCard project={project} />
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
          </Link>
        ))}
      </div>
    </section>
  );
}
