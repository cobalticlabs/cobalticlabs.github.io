import Link from "next/link";
import { ElementTile } from "./ElementTile";
import { element, nav, site } from "@/content/site";

export function Header() {
  return (
    <header className="top">
      <div className="wrap top__inner">
        <Link className="brand" href="/#top" aria-label={`${site.name} home`}>
          <ElementTile symbol={element.symbol} number={element.number} />
          <span className="brand__name">{site.name}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          className="btn btn--primary top__cta"
          href={site.callUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}
