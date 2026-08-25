# Anatomy of a hosting breach

This repository contains the source for **[Anatomy of a hosting breach](https://maltracker-public.vercel.app)**, a public, anonymized case study of a real incident response.

Seventeen hosted domains shared one account boundary. During an active compromise, the response contained attacker execution, preserved evidence, reconstructed damaged content, and rebuilt eleven production sites in isolated hosting accounts.

This is not a malware scanner or a copy of the private incident tracker. It is the public account of what happened, why cleanup in place was rejected, how the recovery was performed, and which follow-up work remains open.

## What the case study demonstrates

- Containing an active compromise before attempting cleanup.
- Reconstructing an attack from filesystem, database, scanner, and access-log evidence.
- Separating clean content from hostile executable material.
- Recovering sites from databases, media, independent archives, and public captures.
- Rebuilding the hosting architecture so one site cannot write into another.
- Verifying web, TLS, mail, mobile, and release behavior before calling recovery complete.
- Recording unknowns and unfinished work instead of hiding them behind a clean homepage.

## Outcome

- All eleven sites in the production rebuild set are live on isolated accounts.
- Known hosting access routes were closed on 13 August 2026.
- No post-containment attacker execution has been observed.
- Migrated mail routes were protocol-tested.
- Legacy-provider exit, Search Console review, and redundant evidence storage remain explicitly tracked.

The original access route remains unproven because the required historical logs are held by the former hosting provider. The case study distinguishes that unknown from the containment and recovery work that has been verified.

## Privacy and evidence boundary

The public account is deliberately separate from the private incident record. It is anonymized: direct client identifiers, domains, addresses, credentials, sensitive infrastructure details, and links to the private record are excluded.

Identifiers that must never enter this repository are represented only by one-way fingerprints. The current source, generated HTML, and reachable Git history are checked for those fingerprints before release. The public case study contains no production credentials, private evidence archive, malware samples, or client database contents.

## Response and authorship

The containment, investigation, reconstruction, and public case study were produced by **[sudotsu](https://github.com/sudotsu)**. For recovery, rebuild, or technical-investigation work, use the contact information on that profile.

## Local development

Node.js 22 is required.

```bash
npm ci
npm run dev
```

Then open `http://localhost:3000`.

## Verification

```bash
npm run check
npm run test:release
npm run test:e2e
npm run verify
```

- `npm run check` runs linting, TypeScript, unit tests, the source anonymity guard, the reachable-history anonymity guard, and a production build.
- `npm run test:release` builds the site and scans rendered HTML for protected fingerprints.
- `npm run test:e2e` verifies the nine-section story, client-facing links, metadata, heading structure, mobile legibility, and horizontal overflow.
- `npm run verify` runs the complete release gate used by CI.

## Licensing

The application source code is available under the MIT License. The incident narrative, case-study copy, incident figures, and visual design are copyright © 2026 sudotsu and are not included in that software license. See [LICENSE.md](LICENSE.md).
