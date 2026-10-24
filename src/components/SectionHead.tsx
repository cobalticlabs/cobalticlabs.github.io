export function SectionHead({
  id,
  kicker,
  title,
}: {
  id: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="head">
      <p className="mono">{kicker}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}
