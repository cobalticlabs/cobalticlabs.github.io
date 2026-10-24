"use client";

import { useEffect, useRef } from "react";

export function CobaltCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/cobalt-scene").then(({ startCobaltScene }) => {
      if (cancelled) return;
      stop = startCobaltScene(canvas, host, reduceMotion) ?? undefined;
      if (stop) canvas.classList.add("is-ready");
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />;
}
