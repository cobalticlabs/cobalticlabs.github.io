import { describe, expect, it } from "vitest";
import { emphasis } from "./emphasis";

describe("emphasis", () => {
  it("marks the words between asterisks", () => {
    expect(emphasis("with *AI* inside")).toEqual([
      { text: "with ", strong: false },
      { text: "AI", strong: true },
      { text: " inside", strong: false },
    ]);
  });

  it("handles emphasis at either end", () => {
    expect(emphasis("*Fast* and *simple*")).toEqual([
      { text: "Fast", strong: true },
      { text: " and ", strong: false },
      { text: "simple", strong: true },
    ]);
  });

  it("leaves plain text and a lone asterisk alone", () => {
    expect(emphasis("plain")).toEqual([{ text: "plain", strong: false }]);
    expect(emphasis("5 * 3")).toEqual([{ text: "5 * 3", strong: false }]);
  });

  it("returns nothing for an empty string", () => {
    expect(emphasis("")).toEqual([]);
  });
});
