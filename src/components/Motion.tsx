"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TILT_DEG = 8;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function hasFinePointer() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const root = document.documentElement;
    root.classList.add("motion-ok");

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      },
      { threshold: 0.35 },
    );
    document
      .querySelectorAll("[data-split]:not(.is-in), [data-reveal]:not(.is-in)")
      .forEach((el) => reveal.observe(el));

    const cleanups: (() => void)[] = [];
    if (hasFinePointer()) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const move = (e: PointerEvent) => {
          const box = el.getBoundingClientRect();
          const px = (e.clientX - box.left) / box.width - 0.5;
          const py = (e.clientY - box.top) / box.height - 0.5;
          el.style.setProperty("--ry", `${(px * TILT_DEG * 2).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${(-py * TILT_DEG * 2).toFixed(2)}deg`);
        };
        const leave = () => {
          el.style.removeProperty("--rx");
          el.style.removeProperty("--ry");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      reveal.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
