import { SplitWords } from "./SplitWords";

export function SectionHead({
  id,
  kicker,
  title,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="head">
      <p className="mono">{kicker}</p>
      <h2 id={id} data-split="">
        <SplitWords text={title} />
      </h2>
      {children}
    </div>
  );
}
