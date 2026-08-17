import { describe, expect, it } from "vitest";
import { incident, siteCounts } from "@/data/incident";

describe("incident data", () => {
  it("has eight sites in scope", () => {
    expect(incident.sites).toHaveLength(8);
  });

  it("derives counts from the site list rather than repeating them", () => {
    const counts = siteCounts();
    expect(counts.live + counts.built + counts.todo).toBe(incident.sites.length);
  });

  it("gives every site a stable identifier and a status", () => {
    for (const site of incident.sites) {
      expect(site.id).toMatch(/^Client [A-H]$/);
      expect(["live", "built", "todo"]).toContain(site.status);
    }
  });

  it("uses only anonymous client labels", () => {
    expect(incident.sites.map((site) => site.id)).toEqual(
      Array.from({ length: 8 }, (_, index) => `Client ${String.fromCharCode(65 + index)}`),
    );
  });

  it("records when it was last reviewed", () => {
    expect(incident.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("live count matches the sites marked live", () => {
    const live = incident.sites.filter((site) => site.status === "live");
    expect(siteCounts().live).toBe(live.length);
  });
});
