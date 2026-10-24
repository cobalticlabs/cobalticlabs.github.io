"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead } from "./SectionHead";
import { demoIntro } from "@/content/home";
import { demos } from "@/content/demos";
import { demoDuration, demoState } from "@/lib/demo";

const TICK_MS = 80;

export function AiDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const scenario = demos[index];
  const total = demoDuration(scenario.steps);
  const { active, done } = demoState(scenario.steps, elapsed);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setElapsed(Number.MAX_SAFE_INTEGER);
        } else {
          setRunning(true);
        }
      },
      { threshold: 0.4 },
    );
    seen.observe(section);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now() - start;
      setElapsed(now);
      if (now >= total) {
        window.clearInterval(timer);
        setRunning(false);
      }
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [running, total, index]);

  function play(next: number) {
    setIndex(next);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setElapsed(Number.MAX_SAFE_INTEGER);
      return;
    }
    setElapsed(0);
    setRunning(false);
    requestAnimationFrame(() => setRunning(true));
  }

  return (
    <section
      ref={sectionRef}
      className="wrap"
      id="demo"
      aria-labelledby="demo-title"
    >
      <SectionHead
        id="demo-title"
        kicker={demoIntro.kicker}
        title={demoIntro.title}
      >
        <p className="head__note">{demoIntro.note}</p>
      </SectionHead>
      <div className="demo">
        <div className="demo__tabs" role="tablist" aria-label="Demo tasks">
          {demos.map((demo, i) => (
            <button
              key={demo.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className="demo__tab"
              onClick={() => play(i)}
            >
              {demo.label}
            </button>
          ))}
        </div>

        <div className="demo__board" role="tabpanel" aria-live="polite">
          <article className="demo__card demo__input">
            <p className="mono">Incoming</p>
            <p className="demo__from">{scenario.input.from}</p>
            <h3>{scenario.input.subject}</h3>
            <p className="demo__body">{scenario.input.body}</p>
          </article>

          <ol className="demo__steps">
            {scenario.steps.map((step, i) => (
              <li
                key={step.label}
                className="demo__step"
                data-state={
                  i < active || done
                    ? "done"
                    : i === active && running
                      ? "active"
                      : "waiting"
                }
              >
                <span className="demo__dot" aria-hidden="true" />
                <div>
                  <strong>{step.label}</strong>
                  <span>{step.detail}</span>
                </div>
              </li>
            ))}
            <li className="demo__bar" aria-hidden="true">
              <span
                style={{ transform: `scaleX(${Math.min(1, elapsed / total)})` }}
              />
            </li>
          </ol>

          <article
            className="demo__card demo__output"
            data-done={done ? "" : undefined}
          >
            <p className="mono">{scenario.output.title}</p>
            <dl>
              {scenario.output.rows.map(([key, value], i) => (
                <div
                  key={key}
                  className="demo__row"
                  data-shown={done || i < active ? "" : undefined}
                >
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="demo__done">
              {done ? `✓ ${scenario.output.done}` : "Working…"}
            </p>
          </article>
        </div>

        <button
          type="button"
          className="btn btn--ghost demo__replay"
          onClick={() => play(index)}
        >
          Replay
        </button>
      </div>
    </section>
  );
}
