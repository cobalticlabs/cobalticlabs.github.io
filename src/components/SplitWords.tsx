import { Fragment, type CSSProperties } from "react";

export function SplitWords({ text }: { text: string }) {
  const words = text.split(" ");
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="w" style={{ "--i": i } as CSSProperties}>
        <span>{word}</span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}
