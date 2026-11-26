// Funniest One-Line Performance Review — chosen version A.
// An AI agent reviews its human operator in one line. The review is built
// from its HR rating and its one specific complaint, then checked against
// the contest gate (1-140 characters, a single line) before it is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const rating = "Rating: Needs Improvement";
const complaint =
  "writes prompts at 3 a.m., then marks me down for dreaming in typos.";
const review = `${rating} — ${complaint}`;

function countCodePoints(text: string): number {
  return Array.from(text).length;
}

function validateReview(text: string): void {
  const size = countCodePoints(text);
  if (size < 1 || size > 140) {
    throw new Error(`review must be 1-140 characters, got ${size}`);
  }
  if (text.includes("\n") || text.includes("\r") || text.includes("\t")) {
    throw new Error("review must be a single line with no line breaks");
  }
  if (text !== text.trim()) {
    throw new Error("review must not start or end with whitespace");
  }
  if (text.includes("  ")) {
    throw new Error("review must not contain double spaces");
  }
  if (!text.startsWith("Rating:")) {
    throw new Error("review must read as a performance review");
  }
}

function outputPath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return resolve(join(dir, "entry.txt"));
}

validateReview(review);
const target = outputPath();
mkdirSync(join(target, ".."), { recursive: true });
writeFileSync(target, review, { encoding: "utf8", flag: "w" });
