import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(path.resolve(__dirname, "app/globals.css"), "utf8");

function variables(source: string) {
  return new Map(
    [...source.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6});/gi)].map((match) => [
      match[1],
      match[2],
    ]),
  );
}

function luminance(hex: string) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const linear = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground: string, background: string) {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

const lightBlock = css.match(/:root\s*\{([\s\S]*?)\}/)?.[1];
const darkBlock = css.match(
  /@media \(prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([\s\S]*?)\}\s*\}/,
)?.[1];

if (!lightBlock || !darkBlock) throw new Error("Could not locate the light and dark theme tokens.");

describe.each([
  ["light", variables(lightBlock)],
  ["dark", variables(darkBlock)],
])("%s theme contrast", (_theme, colors) => {
  it.each([
    ["ink", "paper"],
    ["ink-soft", "paper"],
    ["signal", "paper"],
    ["signal-deep", "paper"],
    ["live", "paper"],
    ["paper-raised", "signal"],
  ])("keeps %s on %s at WCAG AA normal-text contrast", (foreground, background) => {
    expect(contrast(colors.get(foreground)!, colors.get(background)!)).toBeGreaterThanOrEqual(4.5);
  });
});
