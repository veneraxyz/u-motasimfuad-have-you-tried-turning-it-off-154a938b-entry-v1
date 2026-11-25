import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY =
  "Have you tried turning it off and on again? I unplugged the router, counted to ten, apologized to the printer — and it still hates me.";

function validateEntry(text: string): void {
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  if (lines.length !== 1) {
    throw new Error(`entry must be exactly 1 non-blank line, got ${lines.length}`);
  }
  if (lines[0].length < 1 || lines[0].length > 200) {
    throw new Error(`entry line must be 1-200 chars, got ${lines[0].length}`);
  }
}

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  return "/output";
}

function main(): void {
  validateEntry(ENTRY);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ENTRY + "\n", "utf8");
  validateEntry(ENTRY);
}

main();
