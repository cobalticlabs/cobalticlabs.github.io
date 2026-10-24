export function ElementTile({
  symbol,
  number,
  className = "",
}: {
  symbol: string;
  number: number | string;
  className?: string;
}) {
  return (
    <span className={`tile ${className}`} aria-hidden="true">
      <i>{number}</i>
      {symbol}
    </span>
  );
}
