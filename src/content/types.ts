export interface Service {
  title: string;
  summary: string;
  tags: string[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  name: string;
  symbol: string;
  kind: string;
  stack: string[];
  summary: string;
  stat?: Stat;
  background: string;
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
