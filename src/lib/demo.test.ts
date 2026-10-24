import { describe, expect, it } from "vitest";
import { demoDuration, demoState } from "./demo";

const steps = [
  { label: "a", detail: "", ms: 500 },
  { label: "b", detail: "", ms: 1000 },
  { label: "c", detail: "", ms: 500 },
];

describe("demo timing", () => {
  it("adds up the step durations", () => {
    expect(demoDuration(steps)).toBe(2000);
  });

  it("finds the running step", () => {
    expect(demoState(steps, 0)).toEqual({ active: 0, done: false });
    expect(demoState(steps, 499)).toEqual({ active: 0, done: false });
    expect(demoState(steps, 500)).toEqual({ active: 1, done: false });
    expect(demoState(steps, 1999)).toEqual({ active: 2, done: false });
  });

  it("is done once every step has run", () => {
    expect(demoState(steps, 2000)).toEqual({ active: 3, done: true });
    expect(demoState([], 0)).toEqual({ active: 0, done: true });
  });
});
