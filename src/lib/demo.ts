import type { DemoStep } from "@/content/types";

export interface DemoState {
  active: number;
  done: boolean;
}

export function demoDuration(steps: DemoStep[]): number {
  return steps.reduce((total, step) => total + step.ms, 0);
}

export function demoState(steps: DemoStep[], elapsed: number): DemoState {
  let end = 0;
  for (let i = 0; i < steps.length; i++) {
    end += steps[i].ms;
    if (elapsed < end) return { active: i, done: false };
  }
  return { active: steps.length, done: true };
}
