import { describe, expect, it } from "vitest";
import { clamp, smoothstep, stagePose, type StageInput } from "./stage";

const desktop = (overrides: Partial<StageInput> = {}): StageInput => ({
  width: 1440,
  height: 900,
  hero: { top: 0, bottom: 820 },
  services: { top: 1700, bottom: 2600 },
  shape: "browser",
  ...overrides,
});

describe("smoothstep", () => {
  it("eases from 0 to 1 between its edges, in either direction", () => {
    expect(smoothstep(0, 10, -5)).toBe(0);
    expect(smoothstep(0, 10, 5)).toBe(0.5);
    expect(smoothstep(0, 10, 15)).toBe(1);
    expect(smoothstep(10, 0, 0)).toBe(1);
  });

  it("clamps to the range", () => {
    expect(clamp(2)).toBe(1);
    expect(clamp(-1)).toBe(0);
  });
});

describe("stagePose", () => {
  it("sits on the right of the hero at the top of the page", () => {
    const pose = stagePose(desktop());
    expect(pose.shape).toBe("blob");
    expect(pose.opacity).toBe(1);
    expect(pose.x).toBeGreaterThan(720);
    expect(pose.y).toBe(410);
  });

  it("moves beside the services and takes the active shape", () => {
    const pose = stagePose(
      desktop({
        hero: { top: -1500, bottom: -680 },
        services: { top: 100, bottom: 1000 },
      }),
    );
    expect(pose.shape).toBe("browser");
    expect(pose.x).toBeCloseTo(1152);
    expect(pose.y).toBe(450);
    expect(pose.opacity).toBe(1);
  });

  it("keeps the whole shape on screen, wobble included", () => {
    for (const width of [1100, 1280, 1440, 1920]) {
      const pose = stagePose(
        desktop({ width, hero: { top: 0, bottom: 1000 } }),
      );
      expect(pose.x + pose.radius * 1.35).toBeLessThanOrEqual(width - 16);
    }
  });

  it("fades out once the services have scrolled past", () => {
    const pose = stagePose(
      desktop({
        hero: { top: -2500, bottom: -1680 },
        services: { top: -900, bottom: 0 },
      }),
    );
    expect(pose.opacity).toBe(0);
  });

  it("stays in the hero on a tablet, where there is no room beside the services", () => {
    const pose = stagePose(
      desktop({
        width: 1000,
        hero: { top: -1500, bottom: -680 },
        services: { top: 100, bottom: 1000 },
      }),
    );
    expect(pose.shape).toBe("blob");
    expect(pose.y).toBeLessThan(0);
  });

  it("stays in the hero on a phone and fades as the hero leaves", () => {
    const phone = {
      width: 390,
      height: 844,
      services: { top: 100, bottom: 900 },
    };
    const top = stagePose(desktop({ ...phone, hero: { top: 0, bottom: 900 } }));
    expect(top.shape).toBe("blob");
    expect(top.x).toBe(195);
    expect(top.opacity).toBe(1);
    const gone = stagePose(
      desktop({ ...phone, hero: { top: -900, bottom: 0 } }),
    );
    expect(gone.opacity).toBe(0);
  });
});
