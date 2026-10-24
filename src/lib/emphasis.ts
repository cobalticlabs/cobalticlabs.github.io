export interface Part {
  text: string;
  strong: boolean;
}

export function emphasis(source: string): Part[] {
  const parts: Part[] = [];
  const pattern = /\*([^*]+)\*/g;
  let last = 0;
  for (const match of source.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > last)
      parts.push({ text: source.slice(last, start), strong: false });
    parts.push({ text: match[1], strong: true });
    last = start + match[0].length;
  }
  if (last < source.length)
    parts.push({ text: source.slice(last), strong: false });
  return parts;
}
