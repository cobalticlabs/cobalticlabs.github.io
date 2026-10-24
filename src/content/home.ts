import type {
  Engagement,
  Faq,
  Founder,
  Service,
  Step,
  TableElement,
  Testimonial,
} from "./types";

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
    shape: "browser",
  },
  {
    title: "Mobile apps",
    summary:
      "iOS and Android apps from one codebase, with the backend, payments and admin panel they need.",
    tags: ["React Native", "iOS", "Android", "Payments"],
    shape: "phone",
  },
  {
    title: "AI automations & agents",
    summary:
      "Chatbots that answer from your own documents, agents that take over repetitive work, and pipelines that read PDFs and emails for you.",
    tags: ["RAG", "Agents", "Document AI", "Evaluation"],
    shape: "network",
  },
];

export const tableIntro = {
  kicker: "Our elements",
  title: "The periodic table of what we build with.",
  hint: "Pick a group to light it up.",
};

export const groups = [
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "backend", label: "Backend" },
  { id: "ai", label: "AI" },
] as const;

export const elements: TableElement[] = [
  { symbol: "Nx", name: "Next.js", group: "web" },
  { symbol: "Re", name: "React", group: "web" },
  { symbol: "Ts", name: "TypeScript", group: "web" },
  { symbol: "Tw", name: "Tailwind CSS", group: "web" },
  { symbol: "Hn", name: "Hono", group: "web" },
  { symbol: "Vt", name: "Vite", group: "web" },
  { symbol: "Rn", name: "React Native", group: "mobile" },
  { symbol: "Io", name: "iOS", group: "mobile" },
  { symbol: "Ad", name: "Android", group: "mobile" },
  { symbol: "Fa", name: "FastAPI", group: "backend" },
  { symbol: "Py", name: "Python", group: "backend" },
  { symbol: "Nd", name: "Node.js", group: "backend" },
  { symbol: "Pg", name: "PostgreSQL", group: "backend" },
  { symbol: "Rd", name: "Redis", group: "backend" },
  { symbol: "Ce", name: "Celery", group: "backend" },
  { symbol: "Rb", name: "RabbitMQ", group: "backend" },
  { symbol: "Dk", name: "Docker", group: "backend" },
  { symbol: "Ga", name: "GitHub Actions", group: "backend" },
  { symbol: "St", name: "Stripe", group: "backend" },
  { symbol: "Lm", name: "LLMs", group: "ai" },
  { symbol: "Rg", name: "RAG", group: "ai" },
  { symbol: "Ag", name: "Agents", group: "ai" },
  { symbol: "Ev", name: "Evals", group: "ai" },
  { symbol: "Dc", name: "Document AI", group: "ai" },
  { symbol: "Em", name: "Embeddings", group: "ai" },
];

export const demoIntro = {
  kicker: "See it work",
  title: "An AI automation, step by step.",
  note: "A demo with sample data. Pick a task to watch it run.",
};

export const workIntro = {
  kicker: "Selected work · built by our founder",
  title: "Every project gets its own element.",
};

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

export const engagementsIntro = {
  kicker: "Ways to work with us",
  title: "Pick the setup that fits.",
};

export const engagements: Engagement[] = [
  {
    name: "Fixed-price project",
    bestFor: "Websites, apps and first versions with a clear goal.",
    includes: [
      "A written plan and a fixed price before work starts",
      "Weekly demos you can click through",
      "Launch, handover and a walkthrough for your team",
    ],
    price: "Price agreed after the first call",
  },
  {
    name: "Monthly support",
    bestFor: "Products that keep growing after launch.",
    includes: [
      "A set number of hours every month",
      "New features, fixes and updates",
      "Help when something breaks",
    ],
    price: "Monthly, based on hours",
  },
  {
    name: "AI automation audit",
    bestFor: "Teams that want to know where AI can help.",
    includes: [
      "A look at how your team works today",
      "A list of the tasks AI can take over",
      "A plan with costs and next steps",
    ],
    price: "A short, fixed-price review",
  },
];

export const testimonialsIntro = {
  kicker: "Kind words",
  title: "What people say.",
};

export const testimonials: Testimonial[] = [];

export const faqIntro = {
  kicker: "Questions",
  title: "Things people ask before we start.",
};

export const faqs: Faq[] = [
  {
    question: "How much does a project cost?",
    answer:
      "It depends on what you need. After a free 30-minute call we send a written plan with a fixed price, so you know the cost before any work starts.",
  },
  {
    question: "How long does it take?",
    answer:
      "A marketing website usually takes a few weeks. A mobile app or an AI system takes longer. The written plan includes a timeline with weekly milestones.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. Once the project is paid, the code, designs and accounts are yours, and we hand everything over.",
  },
  {
    question: "Can you work with our existing team or code?",
    answer:
      "Yes. We can join an existing codebase, work alongside your developers, or pick up a project that has stalled.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We watch the launch closely and fix anything that comes up. After that you can keep us on monthly support for new features and updates, or run it yourself.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. We're happy to sign an NDA before you share the details of your idea.",
  },
  {
    question: "Do you work with clients outside Pakistan?",
    answer:
      "Yes. We're based in Lahore and work with clients anywhere. Calls happen over video at a time that suits both sides.",
  },
];

export const founder: Founder = {
  name: "Abdul Basit",
  role: "Founder · Software engineer building AI systems, LLM pipelines and full-stack apps.",
  quote:
    "I started Cobaltic Labs to build software the way I'd want it built for me: simple to use, fast, and with AI where it actually saves time.",
  portfolio: "https://abdulbaxit.github.io",
};

export const blogIntro = {
  kicker: "Blog",
  title: "Notes from the lab.",
  lede: "Short, practical writing about building software and putting AI to work.",
};

export const contact = {
  kicker: "Start a project",
  title: "Have an idea? Let's build it.",
  body: "Tell us what you want to make. We'll reply within one working day with honest advice and a rough plan.",
  cta: "Book a 30-minute call",
  formTitle: "Or send a message",
  projectTypes: [
    "Website",
    "Web app",
    "Mobile app",
    "AI automation",
    "Not sure yet",
  ],
};
