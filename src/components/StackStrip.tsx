import { stack } from "@/content/home";

export function StackStrip() {
  return (
    <div className="strip" aria-label="Technologies we work with">
      <div className="strip__track">
        {stack.map((name) => (
          <span key={name}>{name}</span>
        ))}
        {stack.map((name) => (
          <span key={`${name}-again`} aria-hidden="true">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
