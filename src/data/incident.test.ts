import { describe, expect, it } from "vitest";
import { incident, siteCounts } from "@/data/incident";

describe("incident data", () => {
  it("has eleven rebuilt sites in the current recovery set", () => {
    expect(incident.sites).toHaveLength(11);
  });

  it("derives counts from the site list rather than repeating them", () => {
    const counts = siteCounts();
    expect(counts.live + counts.built + counts.todo).toBe(incident.sites.length);
  });

  it("gives every site a stable identifier and a status", () => {
    for (const site of incident.sites) {
      expect(site.id).toMatch(/^Client [A-K]$/);
      expect(["live", "built", "todo"]).toContain(site.status);
    }
  });

  it("uses only anonymous client labels", () => {
    expect(incident.sites.map((site) => site.id)).toEqual(
      Array.from({ length: 11 }, (_, index) => `Client ${String.fromCharCode(65 + index)}`),
    );
  });

  it("records when it was last reviewed", () => {
    expect(incident.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("live count matches the sites marked live", () => {
    const live = incident.sites.filter((site) => site.status === "live");
    expect(siteCounts().live).toBe(live.length);
  });

  it("records the corrected hosted-site count and completed recovery status", () => {
    expect(incident.figures.sitesOnOneAccount).toBe(17);
    expect(siteCounts()).toEqual({ live: 11, built: 0, todo: 0 });
  });

  it("describes the earliest confirmed activity without claiming the entry route is known", () => {
    expect(incident.timeline[0]).toEqual({
      when: "14 October 2025",
      what: expect.stringMatching(/earliest confirmed.*entry route remains unproven/i),
    });
    expect(incident.timeline.map((event) => event.what).join(" ")).not.toMatch(
      /intrusion begins|every credential rotated|the attacker is out/i,
    );
  });
});
