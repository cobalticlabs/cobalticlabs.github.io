import { SectionHead } from "./SectionHead";
import { elements, groups, tableIntro } from "@/content/home";

export function PeriodicTable() {
  return (
    <section className="wrap" id="elements" aria-labelledby="elements-title">
      <SectionHead
        id="elements-title"
        kicker={tableIntro.kicker}
        title={tableIntro.title}
      >
        <p className="head__note">{tableIntro.hint}</p>
      </SectionHead>
      <div className="ptable">
        <div className="ptable__legend" role="group" aria-label="Groups">
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              className="ptable__chip"
              data-g={group.id}
            >
              {group.label}
            </button>
          ))}
        </div>
        <ol className="ptable__grid">
          {elements.map((el, i) => (
            <li key={el.symbol} className="ptable__cell" data-g={el.group}>
              <span className="ptable__n">{i + 1}</span>
              <b aria-hidden="true">{el.symbol}</b>
              <span className="ptable__name">{el.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
