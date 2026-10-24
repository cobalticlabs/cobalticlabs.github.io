import Link from "next/link";
import { ElementTile } from "./ElementTile";
import { brandStory, element, nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="wrap foot">
      <Link className="brand" href="/#top">
        <ElementTile symbol={element.symbol} number={element.number} />
        <span>
          {site.name} · {site.city}, {site.country}
        </span>
      </Link>
      <nav aria-label="Footer">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <p className="foot__story">{brandStory.long}</p>
    </footer>
  );
}
