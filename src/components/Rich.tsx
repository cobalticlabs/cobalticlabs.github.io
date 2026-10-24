import { emphasis } from "@/lib/emphasis";

export function Rich({
  text,
  as: Tag = "strong",
}: {
  text: string;
  as?: "strong" | "em";
}) {
  return emphasis(text).map((part, i) =>
    part.strong ? <Tag key={i}>{part.text}</Tag> : part.text,
  );
}
