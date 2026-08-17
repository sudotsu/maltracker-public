import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { FORBIDDEN, findForbiddenFingerprints } from "@/data/forbidden";

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (["node_modules", ".next", ".git", "out"].includes(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|css|md|json|mjs|mts)$/.test(entry)) out.push(full);
  }
  return out;
}

describe("anonymity guard", () => {
  const files = walk(path.resolve(__dirname, ".."));
  const corpus = files.map((file) => readFileSync(file, "utf8")).join("\n");
  const matches = findForbiddenFingerprints(corpus);

  it("finds source files to scan", () => {
    expect(files.length).toBeGreaterThan(5);
  });

  it("has a non-trivial fingerprint list", () => {
    expect(FORBIDDEN.length).toBeGreaterThan(30);
  });

  for (const fingerprint of FORBIDDEN) {
    it(`does not contain restricted fingerprint ${fingerprint.sha256.slice(0, 12)}`, () => {
      expect(matches).not.toContain(fingerprint.sha256);
    });
  }
});
