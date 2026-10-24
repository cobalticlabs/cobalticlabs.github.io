export type ShapeId = "blob" | "browser" | "phone" | "network";

export interface Service {
  title: string;
  summary: string;
  tags: string[];
  shape: ShapeId;
}

export interface Stat {
  value: string;
  label: string;
}

export interface CaseStudy {
  summary: string;
  role: string;
  problem: string;
  built: string[];
  results: string[];
}

export interface Project {
  slug: string;
  name: string;
  symbol: string;
  kind: string;
  stack: string[];
  summary: string;
  stat?: Stat;
  background: string;
  href?: string;
  caseStudy: CaseStudy;
}

export interface Step {
  label: string;
  title: string;
  body: string;
}

export interface Founder {
  name: string;
  role: string;
  quote: string;
  portfolio: string;
}

export type ElementGroup = "web" | "mobile" | "backend" | "ai";

export interface TableElement {
  symbol: string;
  name: string;
  group: ElementGroup;
}

export interface DemoStep {
  label: string;
  detail: string;
  ms: number;
}

export interface DemoScenario {
  id: string;
  label: string;
  input: { from: string; subject: string; body: string };
  steps: DemoStep[];
  output: { title: string; rows: [string, string][]; done: string };
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Engagement {
  name: string;
  bestFor: string;
  includes: string[];
  price: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  body: string;
}
