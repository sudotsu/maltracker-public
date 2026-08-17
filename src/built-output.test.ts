import { describe, expect, it } from "vitest";
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { findForbiddenFingerprints } from "@/data/forbidden";

const root = path.resolve(__dirname, "..");

function htmlFiles(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

describe("built output", () => {
  it("renders at least one page and leaks nothing", () => {
    execSync("npm run build", { cwd: root, stdio: "inherit" });
    const pages = htmlFiles(path.join(root, ".next", "server", "app"));
    expect(pages.length).toBeGreaterThan(0);

    const corpus = pages.map((file) => readFileSync(file, "utf8")).join("\n");
    expect(findForbiddenFingerprints(corpus)).toEqual([]);
  }, 180_000);
});
