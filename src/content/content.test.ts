import { describe, expect, it } from "vitest";
import { contact, founder, hero, services, stack, steps, work } from "./home";
import { absoluteUrl, element, nav, site } from "./site";

describe("site", () => {
  it("uses https for every outside link", () => {
    expect(site.url).toMatch(/^https:\/\/[^/]+$/);
    expect(site.callUrl).toMatch(/^https:\/\//);
    expect(founder.portfolio).toMatch(/^https:\/\//);
  });

  it("has a valid email address", () => {
    expect(site.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/);
  });

  it("builds absolute URLs with a single slash", () => {
    expect(absoluteUrl("/")).toBe(`${site.url}/`);
    expect(absoluteUrl("work")).toBe(`${site.url}/work`);
  });

  it("matches cobalt on the periodic table", () => {
    expect(element).toEqual({ symbol: "Co", number: 27, mass: "58.933 u" });
  });

  it("points every nav link at a section on the page", () => {
    for (const item of nav) expect(item.href).toMatch(/^\/#[a-z]+$/);
  });
});

describe("home content", () => {
  it("keeps the headline short enough for the hero", () => {
    expect(hero.headline.length).toBeLessThanOrEqual(3);
  });

  it("lists each technology once", () => {
    expect(new Set(stack).size).toBe(stack.length);
  });

  it("gives every service a summary and tags", () => {
    for (const service of services) {
      expect(service.summary.length).toBeGreaterThan(20);
      expect(service.tags.length).toBeGreaterThan(0);
    }
  });

  it("gives every project its own element symbol", () => {
    const symbols = work.map((p) => p.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
    for (const symbol of symbols) expect(symbol).toMatch(/^[A-Z][a-z]?$/);
    expect(symbols).not.toContain(element.symbol);
  });

  it("has four process steps with unique labels", () => {
    expect(steps).toHaveLength(4);
    expect(new Set(steps.map((s) => s.label)).size).toBe(4);
  });

  it("has a call to action", () => {
    expect(contact.cta).toBeTruthy();
    expect(contact.title).toBeTruthy();
  });
});
