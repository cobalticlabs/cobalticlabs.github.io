import type { Project } from "./types";

export const work: Project[] = [
  {
    slug: "legiflow",
    name: "Legiflow",
    symbol: "Lf",
    kind: "AI",
    stack: ["FastAPI", "Gemini", "Next.js"],
    summary:
      "An AI assistant for lawyers that answers only from the case file in front of it, with a citation for every answer.",
    stat: { value: "40%", label: "less time reviewing case files" },
    background:
      "radial-gradient(80% 90% at 30% 20%, #3d63ff, #0b2bb8 55%, #06080f)",
    caseStudy: {
      summary:
        "AI for legal documents: lawyers upload case files and ask questions that are answered only from that case, with citations.",
      role: "Built by our founder as an Associate Software Engineer at Devsarch",
      problem:
        "Lawyers were reviewing case documents by hand. A chatbot could speed that up, but only if it never mixed one case with another: an answer drawn from the wrong case file is worse than no answer at all. So the hard requirement was that a question could only ever be answered from the case file in scope.",
      built: [
        "Entity extraction that pulls the structure out of each document into structured storage",
        "Chunking and embeddings stored in PostgreSQL, every chunk tagged with its case file",
        "Retrieval scoped to a single case file, so no passage from another case can reach the answer",
        "Answers written by Gemini from the retrieved passages, each with a citation the lawyer can check",
        "A FastAPI backend, a Next.js app for lawyers, and case files in Wasabi or S3 storage",
      ],
      results: [
        "Reduced manual review time by 40%",
        "Every answer cites its source in the case file, so it can be verified instead of trusted",
      ],
    },
  },
  {
    slug: "talkspresso",
    name: "Talkspresso",
    symbol: "Ts",
    kind: "Web",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    summary:
      "Booking, payments and built-in video calls for coaches and consultants, built end to end by one developer.",
    stat: { value: "1", label: "developer, frontend to payments" },
    background:
      "radial-gradient(80% 90% at 70% 25%, #8fa4ff, #2b50ff 45%, #0c1120)",
    href: "https://talkspresso.com/",
    caseStudy: {
      summary:
        "An AI-powered booking and payments platform for coaches, consultants and freelancers, built end to end as the only developer.",
      role: "Built by our founder as the sole full-stack developer",
      problem:
        "Coaches, consultants and freelancers need session creation, calendars, video calls and payments. Talkspresso puts all of them in one place.",
      built: [
        "The frontend UI and the backend services",
        "AI-driven session generation",
        "Calendar sync with Google and Microsoft",
        "Built-in video calls and session recordings",
        "Payment processing and automated CI/CD workflows",
      ],
      results: [
        "Built and shipped as the only developer",
        "Live at talkspresso.com",
      ],
    },
  },
  {
    slug: "llm-evaluator",
    name: "LLM Evaluator",
    symbol: "Ev",
    kind: "AI",
    stack: ["FastAPI", "PostgreSQL", "Pytest"],
    summary:
      "Checks AI tool calls against the real database, so a model change ships only when nothing breaks.",
    background:
      "radial-gradient(80% 90% at 40% 80%, #1f3bd6, #121a30 55%, #06080f)",
    caseStudy: {
      summary:
        "Evaluation pipelines that grade tool-calling models on what they did to the database, not on what they said.",
      role: "Built by our founder at Devsarch, for a client",
      problem:
        "When a model can call tools that write to a database, what it says and what it does can drift apart. A response can read perfectly while the tool call underneath wrote the wrong row, or wrote two. Grading the transcript rewards the description of the work, not the work.",
      built: [
        "A snapshot of the database before each run",
        "Runs of the model with its tool calls, through the real code path",
        "A second snapshot after the run, diffed against the first",
        "Assertions that the expected changes happened and nothing else changed",
        "A regression gate: a model or prompt change ships only if every assertion still holds",
      ],
      results: [
        "Model output judged against database state instead of a transcript",
        "Model and prompt changes blocked automatically when they break something",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return work.find((p) => p.slug === slug);
}
