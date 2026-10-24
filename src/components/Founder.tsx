import { founder } from "@/content/home";

export function Founder() {
  return (
    <section className="wrap" aria-label="Founder">
      <figure className="founder">
        <blockquote>“{founder.quote}”</blockquote>
        <figcaption className="founder__who">
          <strong>{founder.name}</strong>
          <span>{founder.role}</span>
          <a href={founder.portfolio} target="_blank" rel="noopener noreferrer">
            See my portfolio ↗
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
