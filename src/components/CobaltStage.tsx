"use client";

import { useEffect, useRef } from "react";

const IDLE_TIMEOUT_MS = 2000;
const IDLE_FALLBACK_MS = 300;

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
    const begin = () =>
      import("@/lib/cobalt-scene").then(({ startCobaltScene }) => {
        if (cancelled) return;
        stop = startCobaltScene(canvas, reduceMotion) ?? undefined;
        if (stop) canvas.classList.add("is-ready");
      });
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(begin, { timeout: IDLE_TIMEOUT_MS })
      : window.setTimeout(begin, IDLE_FALLBACK_MS);
    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      stop?.();
    };
  }, []);

  return <canvas ref={canvasRef} className="stage" aria-hidden="true" />;
}
