import type { Founder, Project, Service, Step } from "./types";

export const hero = {
  eyebrow: "Software studio · Lahore, Pakistan",
  headline: ["Software", "with *AI*", "built in."],
  lede: "We design and build *websites, mobile apps and AI automations* for startups and growing businesses. One team, from the first call to launch day.",
  hint: "Move your mouse over the shape",
};

export const stack = [
  "Next.js",
  "React Native",
  "FastAPI",
  "Python",
  "PostgreSQL",
  "LLM pipelines",
  "RAG",
  "AI agents",
  "Stripe",
  "Docker",
];

export const servicesIntro = {
  kicker: "What we build",
  title: "Three things, done properly.",
};

export const services: Service[] = [
  {
    title: "Websites & web apps",
    summary:
      "Marketing sites that load fast and rank on Google, and web apps your customers log into every day.",
    tags: ["Next.js", "React", "SEO", "Dashboards"],
  },
  {
    title: "Mobile apps",
    summary:
      "iOS and Android apps from one codebase, with the backend, payments and admin panel they need.",
    tags: ["React Native", "iOS", "Android", "Payments"],
  },
  {
    title: "AI automations & agents",
    summary:
      "Chatbots that answer from your own documents, agents that take over repetitive work, and pipelines that read PDFs and emails for you.",
    tags: ["RAG", "Agents", "Document AI", "Evaluation"],
  },
];

export const workIntro = {
  kicker: "Selected work · built by our founder",
  title: "Every project gets its own element.",
};

export const work: Project[] = [
  {
    name: "Legiflow",
    symbol: "Lf",
    kind: "AI",
    stack: ["FastAPI", "Gemini"],
    summary:
      "An AI assistant for lawyers that answers only from the case file in front of it, with a citation for every answer.",
    stat: { value: "40%", label: "less time reviewing case files" },
    background:
      "radial-gradient(80% 90% at 30% 20%, #3d63ff, #0b2bb8 55%, #06080f)",
  },
  {
    name: "Talkspresso",
    symbol: "Ts",
    kind: "Web",
    stack: ["Next.js", "Node.js"],
    summary:
      "Booking, payments and built-in video calls for coaches and consultants, built end to end by one developer.",
    stat: { value: "1", label: "developer, frontend to payments" },
    background:
      "radial-gradient(80% 90% at 70% 25%, #8fa4ff, #2b50ff 45%, #0c1120)",
  },
  {
    name: "LLM Evaluator",
    symbol: "Ev",
    kind: "AI",
    stack: ["FastAPI", "Pytest"],
    summary:
      "Checks AI tool calls against the real database, so a model change ships only when nothing breaks.",
    background:
      "radial-gradient(80% 90% at 40% 80%, #1f3bd6, #121a30 55%, #06080f)",
  },
];

export const processIntro = {
  kicker: "How we work",
  title: "From idea to launch in four steps.",
};

export const steps: Step[] = [
  {
    label: "Call",
    title: "Talk it through",
    body: "A 30-minute call about your idea. You leave with clear next steps, even if we don't work together.",
  },
  {
    label: "Plan",
    title: "Agree the scope",
    body: "A written plan with features, timeline and price, so everyone knows what is being built.",
  },
  {
    label: "Build",
    title: "See it every week",
    body: "Weekly demos you can click through. You see real progress, not status reports.",
  },
  {
    label: "Launch",
    title: "Ship and support",
    body: "We launch it, watch it in production and stay on for fixes and new features.",
  },
];

export const founder: Founder = {
  name: "Abdul Basit",
  role: "Founder · Software engineer building AI systems, LLM pipelines and full-stack apps.",
  quote:
    "I started Cobaltic Labs to build software the way I'd want it built for me: simple to use, fast, and with AI where it actually saves time.",
  portfolio: "https://abdulbaxit.github.io",
};

export const contact = {
  kicker: "Start a project",
  title: "Have an idea? Let's build it.",
  body: "Tell us what you want to make. We'll reply within one working day with honest advice and a rough plan.",
  cta: "Book a 30-minute call",
};
