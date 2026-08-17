# Anatomy of a hosting breach

A public, anonymised account of a real incident in which one shared hosting
account put 29 small-business websites within reach of a single break-in.

The site is deliberately separate from the private incident record. It contains
no client names, domains, addresses, infrastructure identifiers, credentials, or
links back to that record. Identifiers that must never enter this repository are
represented only by one-way fingerprints. The source and rendered HTML are both
checked before release.

## Local development

Node.js 22 is required.

```bash
npm install
npm run dev
```

## Verification

```bash
npm run check
npm run test:release
npm run test:e2e
```

`npm run check` runs linting, TypeScript, unit tests, the source anonymity guard,
and a production build. The release test scans rendered HTML. The browser tests
verify that all nine sections render, text remains legible on a phone, heading
order is sound, and the page never scrolls sideways.
