"use client";

import { useEffect, useRef } from "react";

export function CobaltStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/cobalt-scene").then(({ startCobaltScene }) => {
      if (cancelled) return;
      stop = startCobaltScene(canvas, reduceMotion) ?? undefined;
      if (stop) canvas.classList.add("is-ready");
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="stage" aria-hidden="true" />;
}
