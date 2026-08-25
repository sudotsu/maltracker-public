import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fingerprintSource = readFileSync(resolve(root, "src/data/forbidden.ts"), "utf8");
const fingerprints = [
  ...fingerprintSource.matchAll(/\{ length: (\d+), sha256: "([a-f0-9]{64})" \}/g),
].map((match) => ({ length: Number(match[1]), sha256: match[2] }));

if (fingerprints.length < 30) {
  throw new Error(
    `Expected at least 30 protected fingerprints, found ${fingerprints.length}. ` +
      "The history guard may no longer match the fingerprint source format.",
  );
}

const fingerprintsByLength = new Map();
for (const fingerprint of fingerprints) {
  const hashes = fingerprintsByLength.get(fingerprint.length) ?? new Set();
  hashes.add(fingerprint.sha256);
  fingerprintsByLength.set(fingerprint.length, hashes);
}

function git(args, encoding = "utf8") {
  return execFileSync("git", args, {
    cwd: root,
    encoding,
    maxBuffer: 32 * 1024 * 1024,
  });
}

const matches = new Set();

function scan(value) {
  const corpus = value.toString("utf8").toLowerCase();

  for (const [length, hashes] of fingerprintsByLength) {
    for (let index = 0; index <= corpus.length - length; index += 1) {
      const candidate = corpus.slice(index, index + length);
      const fingerprint = createHash("sha256").update(candidate).digest("hex");
      if (hashes.has(fingerprint)) matches.add(fingerprint);
    }
  }
}

const objectRows = git(["rev-list", "--objects", "--all"])
  .trim()
  .split(/\n/)
  .filter(Boolean);
const objectIds = [...new Set(objectRows.map((row) => row.split(" ", 1)[0]))];

let uniqueBlobs = 0;
for (const objectId of objectIds) {
  if (git(["cat-file", "-t", objectId]).trim() !== "blob") continue;
  uniqueBlobs += 1;
  scan(git(["cat-file", "-p", objectId], null));
}

scan(git(["log", "--all", "--format=%H%n%s%n%b"], null));

const commits = Number(git(["rev-list", "--count", "--all"]).trim());
const summary = {
  commits,
  uniqueBlobs,
  fingerprintRules: fingerprints.length,
  matches: matches.size,
};

if (matches.size > 0) {
  console.error("Reachable Git history contains protected fingerprints.");
  console.error(JSON.stringify({ ...summary, fingerprintPrefixes: [...matches].map((hash) => hash.slice(0, 12)) }));
  process.exitCode = 1;
} else {
  console.log(`Reachable-history anonymity check passed: ${JSON.stringify(summary)}`);
}
