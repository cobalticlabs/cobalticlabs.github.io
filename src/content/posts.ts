import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "five-jobs-ai-can-take-off-your-teams-plate",
    title: "Five jobs AI can take off your team's plate",
    summary:
      "Practical places where AI saves time today, and a simple way to tell whether a task is a good fit.",
    date: "2026-10-24",
    tags: ["AI automation", "Operations"],
    body: `Most talk about AI is about the future. This note is about the boring work your team does today, every day, that AI can already do well. None of these replace people. They take away the copying, sorting and first drafts, so people spend their time on the decisions.

## 1. Reading documents that arrive by email

Invoices, purchase orders, delivery notes and CVs all arrive as PDFs, and someone types their contents into a spreadsheet or a system. An AI pipeline can read each document, pull out the fields you care about and save them where they belong.

The important part is what happens when the model is unsure. A good pipeline checks its own work, for example that line items add up to the total, and sends anything doubtful to a person instead of guessing.

## 2. Answering questions from your own documents

Support and operations teams answer the same questions again and again, and the answers already live in policies, manuals and past tickets. A chatbot built on retrieval-augmented generation (RAG) answers only from those documents and shows where each answer came from.

When the answer is not in your documents, it should say so and hand the question to a person. That one rule is what makes customers trust it.

## 3. Sorting and routing incoming messages

Contact forms, support inboxes and WhatsApp messages need someone to read each one and decide where it goes. AI can tag each message by topic, urgency and language, route it to the right person and draft a first reply for them to check.

## 4. Summarising calls and meetings

A call recording can become a short summary, a list of action items and notes in your CRM, a few minutes after the call ends. People stop spending the next half hour writing up what was said.

## 5. Writing first drafts of routine reports

Weekly sales numbers, project updates and stock summaries follow the same shape every time. AI can pull the data and write the first draft, and a person edits it before it goes out.

## How to tell if a task is a good fit

- It happens often, so the time adds up
- The input is text, documents or data, not judgement calls
- A mistake can be caught before it does harm
- You can describe what "done" looks like

If a task ticks all four, it is worth trying.

## Where to start

Pick one task. Measure how long it takes today. Automate it with a person still checking the output, then compare after a few weeks. Starting small shows you what AI can do for your business before you spend on anything bigger.`,
  },
  {
    slug: "how-we-test-ai-features-before-they-ship",
    title: "How we test AI features before they ship",
    summary:
      "Why we judge an AI feature by what it changes in the database, not by how good its answer sounds.",
    date: "2026-10-24",
    tags: ["AI engineering", "Testing"],
    body: `An AI feature that only writes text is easy to review: you read the answer. An AI agent that can call tools, such as creating an order, issuing a refund or updating a record, is different. What it says and what it does can drift apart.

## The problem with reading the answer

Imagine asking an agent to cancel an order and refund the customer. It replies: "Done, the order is cancelled and the refund is on its way." The reply reads perfectly. But underneath, the tool call might have cancelled the wrong order, or refunded twice.

If you grade the reply, you are grading the description of the work, not the work.

## Check what actually happened

So we test against the database instead of the transcript:

- Take a snapshot of the database before the run
- Run the model with its real tools, through the real code
- Take a second snapshot and compare the two
- Check that the expected changes happened, and that nothing else changed

\`\`\`python
before = snapshot(db)
run_agent("Cancel order A-2291 and refund the customer")
after = snapshot(db)

changes = diff(before, after)
assert changes.updated("orders", "A-2291", status="cancelled")
assert changes.inserted("refunds", order="A-2291", count=1)
assert changes.nothing_else()
\`\`\`

The last line matters most. Many bugs are not a missing change but an extra one.

## Make it a gate

Each test case becomes part of a suite that runs whenever the model, the prompt or the tools change. A new model version ships only if every case still passes. That turns "the new model seems better" into something you can check.

## What this means for you

When we build an AI feature for a client, it comes with tests like these. You can switch models, change prompts and add tools later, and the tests will tell you if something broke, before your customers do.`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
