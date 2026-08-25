import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { publicSite } from "@/data/public-site";

const root = path.resolve(__dirname, "..");
const read = (file: string) => readFileSync(path.join(root, file), "utf8");

describe("public presentation", () => {
  const readme = read("README.md");
  const layout = read("src/app/layout.tsx");
  const story = read("src/content/sections.tsx");

  it("makes the repository purpose and live case study immediately clear", () => {
    expect(readme).toContain(publicSite.url);
    expect(readme).toMatch(/contains the source.*anonymized case study/i);
    expect(readme).toMatch(/not a malware scanner/i);
  });

  it("attributes the response without linking to the affected company", () => {
    expect(readme).toContain(publicSite.responder.url);
    expect(story).toContain("Contact the responder");
    expect(story).toContain("Inspect the source");
  });

  it("does not reintroduce the superseded 29-site claim or unnecessary location detail", () => {
    const corpus = `${readme}\n${layout}\n${story}`;
    expect(corpus).not.toMatch(/29 small-business websites|Omaha web development company/i);
    expect(readme).toMatch(/Seventeen hosted domains/i);
  });

  it("uses the shared public-site metadata instead of duplicating public URLs", () => {
    expect(layout).toContain("metadataBase: new URL(publicSite.url)");
    expect(layout).toContain("description: publicSite.description");
    expect(story).toContain("publicSite.repositoryUrl");
  });
});
