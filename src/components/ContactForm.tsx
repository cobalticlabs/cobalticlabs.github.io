"use client";

import { useState } from "react";
import { contact } from "@/content/home";
import { contactForm, site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const ENDPOINT = "https://api.web3forms.com/submit";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const type = String(data.get("type") ?? "");
    const message = String(data.get("message") ?? "");

    if (!contactForm.web3formsKey) {
      const body = `${message}\n\nProject: ${type}\nFrom: ${name} <${email}>`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `New project: ${type}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: contactForm.web3formsKey,
          subject: `New project from ${name}: ${type}`,
          name,
          email,
          project: type,
          message,
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!result.success) throw new Error("not sent");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="cform" onSubmit={onSubmit}>
      <p className="cform__title">{contact.formTitle}</p>
      <div className="cform__row">
        <label>
          <span>Your name</span>
          <input id="cf-name" name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </label>
      </div>
      <label>
        <span>What do you need?</span>
        <select id="cf-type" name="type" defaultValue={contact.projectTypes[0]}>
          {contact.projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Tell us about it</span>
        <textarea id="cf-message" name="message" rows={4} required />
      </label>
      <input
        type="checkbox"
        name="botcheck"
        className="cform__trap"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="cform__foot">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="cform__status" role="status">
          {status === "sent" && "Thanks! We'll reply within one working day."}
          {status === "mailto" &&
            "Your email app opened with the message. Press send there."}
          {status === "error" &&
            `That didn't go through. Email us at ${site.email}.`}
        </p>
      </div>
    </form>
  );
}
