// Funniest One-Line Performance Review — draft with version A.
// The specialist picks one of the three lines in versions.md; this file
// is then revised to the chosen line before submit.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const review =
  "Rating: Needs Improvement — writes prompts at 3 a.m., then marks me down for dreaming in typos.";

const chars = [...review];
if (chars.length < 1 || chars.length > 140) {
  throw new Error(`review must be 1-140 characters, got ${chars.length}`);
}
if (review.includes("\n") || review.includes("\r")) {
  throw new Error("review must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), review, "utf8");
