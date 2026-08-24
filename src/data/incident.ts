export type SiteStatus = "live" | "built" | "todo";

export type Site = {
  id: string;
  status: SiteStatus;
  note: string;
};

export const incident = {
  lastReviewed: "2026-08-24",

  figures: {
    sitesOnOneAccount: 17,
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
    {
      when: "21 August 2026",
      what: "Nine of eleven rebuilt sites live; the estate-wide functional sweep begins.",
    },
    {
      when: "24 August 2026",
      what: "All eleven rebuilt sites live with valid HTTPS; the final migrated mail route is verified.",
    },
  ],

  sites: [
    { id: "Client A", status: "live", note: "Rebuilt, verified, and live." },
    { id: "Client B", status: "live", note: "Rebuilt, verified, and live." },
    { id: "Client C", status: "live", note: "Rebuilt, verified, and live." },
    { id: "Client D", status: "live", note: "Rebuilt and live; mail restored and tested." },
    { id: "Client E", status: "live", note: "Rebuilt from surviving content and verified." },
    { id: "Client F", status: "live", note: "Recovered from an isolated archive and verified." },
    { id: "Client G", status: "live", note: "Reconstructed from public captures and verified." },
    { id: "Client H", status: "live", note: "Rebuilt, functionally audited, and live." },
    { id: "Client I", status: "live", note: "Rebuilt, functionally audited, and live." },
    { id: "Client J", status: "live", note: "Rebuilt, functionally audited, and live." },
    { id: "Client K", status: "live", note: "Rebuilt; web and mail paths verified." },
  ] as Site[],
} as const;

export function siteCounts() {
  return {
    live: incident.sites.filter((site) => site.status === "live").length,
    built: incident.sites.filter((site) => site.status === "built").length,
    todo: incident.sites.filter((site) => site.status === "todo").length,
  };
}
