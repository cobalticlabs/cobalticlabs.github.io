import Link from "next/link";
import { CobaltCanvas } from "./CobaltCanvas";
import { ArrowIcon } from "./Icons";
import { Rich } from "./Rich";
import { hero } from "@/content/home";
import { element, site } from "@/content/site";

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Introduction">
      <CobaltCanvas />
      <div className="wrap hero__inner">
        <p className="mono rise" style={{ "--d": 0 } as React.CSSProperties}>
          {hero.eyebrow}
        </p>
        <h1>
          {hero.headline.map((line, i) => (
            <span
              key={line}
              className="rise"
              style={{ "--d": i + 1 } as React.CSSProperties}
            >
              <Rich text={line} as="em" />
            </span>
          ))}
        </h1>
        <p
          className="hero__lede rise"
          style={{ "--d": 4 } as React.CSSProperties}
        >
          <Rich text={hero.lede} />
        </p>
        <div
          className="hero__ctas rise"
          style={{ "--d": 5 } as React.CSSProperties}
        >
          <a
            className="btn btn--primary"
            href={site.callUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a call
            <ArrowIcon />
          </a>
          <Link className="btn btn--ghost" href="/#work">
            See our work
          </Link>
        </div>
        <div
          className="hero__meta mono rise"
          style={{ "--d": 6 } as React.CSSProperties}
        >
          <span>
            {element.symbol} · {element.number} · {element.mass}
          </span>
          <span>{site.coordinates}</span>
          <span className="hero__hint">{hero.hint}</span>
        </div>
      </div>
    </section>
  );
}
