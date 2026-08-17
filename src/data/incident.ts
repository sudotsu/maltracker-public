export type SiteStatus = "live" | "built" | "todo";

export type Site = {
  id: string;
  status: SiteStatus;
  note: string;
};

export const incident = {
  lastReviewed: "2026-08-17",

  figures: {
    sitesOnOneAccount: 29,
    companyAgeYears: 30,
    otherAccountsTargeted: 1_190,
    maliciousLinksAtArchive: 583_299,
    maliciousLinksLive: 1_177_495,
    droppersAtArchive: 16_583,
    droppersLive: 28_963,
    backdoors: 103,
    backdoorsPresentInArchive: 0,
    adminBackdoorsOnDisk: 360,
    scannerDetections: 62_877,
    quotedCleanupPerSite: 109,
    successfulAttackerRequestsInOneDay: 115,
    doublingWindowHours: 28,
    sitesTakenDown: 8,
  },

  timeline: [
    { when: "December 2025", what: "Intrusion begins. Nobody notices." },
    {
      when: "9 August 2026",
      what: "The hosting company’s own scanner reports 62,877 infected files. It offers a paid cleanup.",
    },
    {
      when: "13 August 2026",
      what: "Execution denied account-wide. Every credential rotated. The attacker is out.",
    },
    { when: "14 August 2026", what: "First site rebuilt on isolated hosting." },
    { when: "16 August 2026", what: "Four sites live on the new host." },
  ],

  sites: [
    { id: "Client A", status: "live", note: "Rebuilt and verified." },
    { id: "Client B", status: "live", note: "Rebuilt and verified." },
    { id: "Client C", status: "live", note: "Rebuilt and verified." },
    { id: "Client D", status: "live", note: "Rebuilt and verified. Mail moved." },
    { id: "Client E", status: "built", note: "Rebuilt and verified; awaiting a domain change." },
    { id: "Client F", status: "built", note: "Rebuilt and verified; awaiting a domain change." },
    {
      id: "Client G",
      status: "todo",
      note: "No surviving copy. Rebuild by hand from public archive captures.",
    },
    { id: "Client H", status: "todo", note: "Scope unresolved." },
  ] satisfies Site[],
} as const;

export function siteCounts() {
  return {
    live: incident.sites.filter((site) => site.status === "live").length,
    built: incident.sites.filter((site) => site.status === "built").length,
    todo: incident.sites.filter((site) => site.status === "todo").length,
  };
}
