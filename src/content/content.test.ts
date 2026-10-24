import { describe, expect, it } from "vitest";
import { demos } from "./demos";
import {
  contact,
  elements,
  engagements,
  faqs,
  founder,
  groups,
  hero,
  services,
  stack,
  steps,
  testimonials,
} from "./home";
import { getPost, posts } from "./posts";
import { absoluteUrl, brandStory, element, nav, site } from "./site";
import { getProject, work } from "./work";

describe("site", () => {
  it("uses https for every outside link", () => {
    expect(site.url).toMatch(/^https:\/\/[^/]+$/);
    expect(site.callUrl).toMatch(/^https:\/\//);
    expect(founder.portfolio).toMatch(/^https:\/\//);
    for (const p of work) if (p.href) expect(p.href).toMatch(/^https:\/\//);
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

  it("explains the name in one short line and one sentence", () => {
    expect(brandStory.short.length).toBeLessThan(24);
    expect(brandStory.long).toContain("cobalt");
  });

  it("points every nav link at a section or a page", () => {
    for (const item of nav) expect(item.href).toMatch(/^\/(#[a-z]+|blog)$/);
  });
});

describe("home content", () => {
  it("keeps the headline short enough for the hero", () => {
    expect(hero.headline.length).toBeLessThanOrEqual(3);
  });

  it("lists each technology once", () => {
    expect(new Set(stack).size).toBe(stack.length);
  });

  it("gives every service a summary, tags and its own shape", () => {
    for (const service of services) {
      expect(service.summary.length).toBeGreaterThan(20);
      expect(service.tags.length).toBeGreaterThan(0);
    }
    expect(new Set(services.map((s) => s.shape)).size).toBe(services.length);
  });

  it("has four process steps with unique labels", () => {
    expect(steps).toHaveLength(4);
    expect(new Set(steps.map((s) => s.label)).size).toBe(4);
  });

  it("has a call to action and project types for the form", () => {
    expect(contact.cta).toBeTruthy();
    expect(contact.projectTypes.length).toBeGreaterThan(1);
  });

  it("answers every question", () => {
    for (const faq of faqs) {
      expect(faq.question.endsWith("?")).toBe(true);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });

  it("gives every way of working a price line and what it includes", () => {
    for (const plan of engagements) {
      expect(plan.includes.length).toBeGreaterThan(0);
      expect(plan.price).toBeTruthy();
    }
  });

  it("only shows complete testimonials", () => {
    for (const t of testimonials) {
      expect(t.quote && t.name && t.role).toBeTruthy();
    }
  });
});

describe("periodic table", () => {
  it("gives every element a unique, well-formed symbol", () => {
    const symbols = elements.map((e) => e.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
    for (const symbol of symbols) expect(symbol).toMatch(/^[A-Z][a-z]?$/);
  });

  it("puts every element in a known group, and every group has elements", () => {
    const ids = groups.map((g) => g.id as string);
    for (const el of elements) expect(ids).toContain(el.group);
    for (const id of ids)
      expect(elements.some((e) => e.group === id)).toBe(true);
  });
});

describe("work", () => {
  it("gives every project its own slug and element symbol", () => {
    expect(new Set(work.map((p) => p.slug)).size).toBe(work.length);
    const symbols = work.map((p) => p.symbol);
    expect(new Set(symbols).size).toBe(symbols.length);
    for (const symbol of symbols) expect(symbol).toMatch(/^[A-Z][a-z]?$/);
    expect(symbols).not.toContain(element.symbol);
  });

  it("has a full case study for every project", () => {
    for (const p of work) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
      expect(p.caseStudy.built.length).toBeGreaterThan(0);
      expect(p.caseStudy.results.length).toBeGreaterThan(0);
      expect(getProject(p.slug)).toBe(p);
    }
    expect(getProject("missing")).toBeUndefined();
  });
});

describe("demos", () => {
  it("has a unique id and at least one step and output row per demo", () => {
    expect(new Set(demos.map((d) => d.id)).size).toBe(demos.length);
    for (const demo of demos) {
      expect(demo.steps.length).toBeGreaterThan(0);
      expect(demo.output.rows.length).toBeGreaterThan(0);
      for (const step of demo.steps) expect(step.ms).toBeGreaterThan(0);
    }
  });
});

describe("posts", () => {
  it("has unique slugs, ISO dates and a body", () => {
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    for (const post of posts) {
      expect(post.slug).toMatch(/^[a-z0-9-]+$/);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.body.length).toBeGreaterThan(200);
      expect(getPost(post.slug)).toBe(post);
    }
  });
});
