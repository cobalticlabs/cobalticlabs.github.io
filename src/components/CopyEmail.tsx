"use client";

import { useRef, useState } from "react";

const RESET_MS = 1400;

export function CopyEmail({ email }: { email: string }) {
  const textRef = useRef<HTMLAnchorElement>(null);
  const [label, setLabel] = useState("Copy");

  function selectText() {
    const node = textRef.current;
    if (!node) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    setLabel("Press ⌘C");
  }

  function copy() {
    if (!navigator.clipboard) return selectText();
    navigator.clipboard.writeText(email).then(() => {
      setLabel("Copied");
      window.setTimeout(() => setLabel("Copy"), RESET_MS);
    }, selectText);
  }

  return (
    <span className="email">
      <a ref={textRef} href={`mailto:${email}`}>
        {email}
      </a>
      <button type="button" onClick={copy} aria-live="polite">
        {label}
      </button>
    </span>
  );
}
