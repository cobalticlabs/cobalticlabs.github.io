"use client";

import { useEffect, useRef, useState } from "react";

const FOLLOW = 0.2;
const INTERACTIVE = "a, button, summary, label, [data-cursor]";
const TEXT_FIELDS = "input, textarea, select";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduce || !dot || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let frame = 0;

    const loop = () => {
      rx += (x - rx) * FOLLOW;
      ry += (y - ry) * FOLLOW;
      dot.style.translate = `${x}px ${y}px`;
      ring.style.translate = `${rx}px ${ry}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const update = (target: Element | null) => {
      const field = target?.closest(TEXT_FIELDS);
      const hit = field ? null : target?.closest<HTMLElement>(INTERACTIVE);
      root.classList.toggle("cursor-hidden", Boolean(field));
      root.classList.toggle("cursor-hover", Boolean(hit));
      setLabel(hit?.dataset.cursor ?? "");
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      update(e.target instanceof Element ? e.target : null);
    };
    const scroll = () => {
      if (x >= 0) update(document.elementFromPoint(x, y));
    };
    const leave = () => root.classList.add("cursor-hidden");
    const enter = () => root.classList.remove("cursor-hidden");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      root.classList.remove("has-cursor", "cursor-hover", "cursor-hidden");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={label ? "cursor-ring has-label" : "cursor-ring"}
        aria-hidden="true"
      >
        <span>{label}</span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
