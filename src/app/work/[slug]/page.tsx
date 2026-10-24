import type { Metadata, Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SplitWords } from "@/components/SplitWords";
import { ElementCard } from "@/components/Work";
import { getProject, work } from "@/content/work";
import { absoluteUrl, site } from "@/content/site";

export function generateStaticParams() {
  return work.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const url = absoluteUrl(`/work/${project.slug}/`);
  return {
    title: `${project.name} case study`,
    description: project.caseStudy.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${project.name} case study`,
      description: project.caseStudy.summary,
      url,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630 }],
    },
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const study = project.caseStudy;
  const next = work[(work.indexOf(project) + 1) % work.length];

  return (
    <>
      <Header />
      <main className="wrap page">
        <Link href="/#work" className="page__back">
          ← All work
        </Link>
        <header className="case__head">
          <div
            className="card__visual case__visual"
            data-tilt=""
            style={{ "--card-bg": project.background } as React.CSSProperties}
          >
            <ElementCard project={project} />
          </div>
          <div className="case__intro">
            <p className="mono">Case study · {project.kind}</p>
            <h1 data-split="">
              <SplitWords text={project.name} />
            </h1>
            <p className="page__lede">{study.summary}</p>
            <dl className="case__facts">
              <div>
                <dt>Role</dt>
                <dd>{study.role}</dd>
              </div>
              <div>
                <dt>Stack</dt>
                <dd>{project.stack.join(" · ")}</dd>
              </div>
              {project.href && (
                <div>
                  <dt>Live</dt>
                  <dd>
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {new URL(project.href).host.replace(/^www\./, "")} ↗
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        <div className="case__body">
          <section>
            <h2>The problem</h2>
            <p>{study.problem}</p>
          </section>
          <section>
            <h2>What we built</h2>
            <ul>
              {study.built.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Results</h2>
            <ul className="case__results">
              {study.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <nav className="page__next" aria-label="More work">
          <Link href="/#contact" className="btn btn--primary">
            Start a project like this
          </Link>
          <Link
            href={`/work/${next.slug}/` as Route}
            className="page__next-link"
          >
            Next: {next.name} →
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
