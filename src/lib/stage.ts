import type { ShapeId } from "@/content/types";

export interface Band {
  top: number;
  bottom: number;
}

export interface StageInput {
  width: number;
  height: number;
  hero: Band;
  services: Band | null;
  shape: ShapeId;
}

export interface Pose {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  shape: ShapeId;
}

export const WIDE_MIN_PX = 760;
export const FOLLOW_MIN_PX = 1100;
const BLOB_REACH = 1.35;

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(
  edge0: number,
  edge1: number,
  value: number,
): number {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function heroPose({ width, height, hero }: StageInput): Pose {
  const heroHeight = hero.bottom - hero.top;
  if (width < WIDE_MIN_PX) {
    const radius = Math.min(width * 0.36, 150);
    return {
      x: width / 2,
      y: hero.top + radius + 40,
      radius,
      opacity: smoothstep(0, height * 0.35, hero.bottom - radius),
      shape: "blob",
    };
  }
  const radius = Math.min(heroHeight * 0.33, width * 0.18, 300);
  return {
    x: Math.min(width * 0.72, width - radius * BLOB_REACH - 16),
    y: hero.top + heroHeight * 0.5,
    radius,
    opacity: 1,
    shape: "blob",
  };
}

export function stagePose(input: StageInput): Pose {
  const start = heroPose(input);
  const { width, height, services } = input;
  if (width < FOLLOW_MIN_PX || !services) return start;

  const enter = smoothstep(height * 0.85, height * 0.35, services.top);
  if (enter === 0) return start;

  const radius = Math.min(height * 0.22, width * 0.13, 190);
  const parked = {
    x: width * 0.8,
    y: Math.min(height * 0.5, services.bottom - radius - 32),
  };
  const leave = smoothstep(height * 0.55, height * 0.15, services.bottom);

  return {
    x: mix(start.x, parked.x, enter),
    y: mix(start.y, parked.y, enter),
    radius: mix(start.radius, radius, enter),
    opacity: 1 - leave,
    shape: enter > 0.5 ? input.shape : "blob",
  };
}
