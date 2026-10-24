import type { DemoScenario } from "./types";

export const demos: DemoScenario[] = [
  {
    id: "invoice",
    label: "Read an invoice",
    input: {
      from: "accounts@northwind-supplies.example",
      subject: "Invoice INV-0142 for October",
      body: "Hi, please find attached invoice INV-0142. Attached: invoice-0142.pdf",
    },
    steps: [
      {
        label: "Email arrives",
        detail: "A new email with a PDF attached",
        ms: 700,
      },
      {
        label: "AI reads the PDF",
        detail: "Finds the supplier, dates and totals",
        ms: 1400,
      },
      {
        label: "Checks the numbers",
        detail: "Line items add up to the total",
        ms: 900,
      },
      { label: "Saves the row", detail: "Added to the finance sheet", ms: 800 },
    ],
    output: {
      title: "Finance sheet · new row",
      rows: [
        ["Supplier", "Northwind Supplies"],
        ["Invoice", "INV-0142"],
        ["Due", "15 November"],
        ["Total", "PKR 184,500"],
      ],
      done: "Posted to #finance for approval",
    },
  },
  {
    id: "support",
    label: "Answer a customer",
    input: {
      from: "sara@example.com",
      subject: "Where is my order?",
      body: "Hi, I ordered a desk lamp last week (order A-2291). When will it arrive?",
    },
    steps: [
      {
        label: "Email arrives",
        detail: "A customer asks about an order",
        ms: 700,
      },
      {
        label: "Finds the order",
        detail: "Looks up A-2291 in the database",
        ms: 1100,
      },
      {
        label: "Drafts a reply",
        detail: "Uses the courier's tracking status",
        ms: 1300,
      },
      {
        label: "Waits for approval",
        detail: "A person checks before it's sent",
        ms: 800,
      },
    ],
    output: {
      title: "Draft reply",
      rows: [
        ["Order", "A-2291 · Desk lamp"],
        ["Status", "Out for delivery"],
        ["Arrives", "Tomorrow"],
        ["Tone", "Friendly, short"],
      ],
      done: "Sent after one click from the support team",
    },
  },
  {
    id: "lead",
    label: "Sort a new lead",
    input: {
      from: "Website contact form",
      subject: "New enquiry from Bilal",
      body: "We run 3 clinics and want patients to book appointments from their phones.",
    },
    steps: [
      {
        label: "Form submitted",
        detail: "A new enquiry from the website",
        ms: 700,
      },
      {
        label: "Understands the need",
        detail: "Reads what the person is asking for",
        ms: 1200,
      },
      {
        label: "Tags and scores",
        detail: "Project type, size and urgency",
        ms: 1000,
      },
      {
        label: "Creates a CRM card",
        detail: "With a suggested call time",
        ms: 800,
      },
    ],
    output: {
      title: "CRM · new lead",
      rows: [
        ["Need", "Mobile booking app"],
        ["Business", "Clinics, 3 locations"],
        ["Fit", "High"],
        ["Next step", "Book an intro call"],
      ],
      done: "Assigned to the sales inbox",
    },
  },
];
