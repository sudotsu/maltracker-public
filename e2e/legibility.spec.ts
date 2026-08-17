import { expect, test } from "@playwright/test";

test("no text is too small to read on a phone", async ({ page }) => {
  await page.goto("/");
  const tooSmall = await page.evaluate(() => {
    const bad: string[] = [];
    for (const element of Array.from(document.querySelectorAll("body *"))) {
      const text = (element.textContent ?? "").trim();
      if (!text || element.children.length > 0) continue;
      const size = Number.parseFloat(getComputedStyle(element).fontSize);
      if (size < 14) bad.push(`${size}px: ${text.slice(0, 40)}`);
    }
    return bad;
  });
  expect(tooSmall, tooSmall.join("\n")).toEqual([]);
});

test("the page never scrolls sideways", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const offenders = Array.from(document.querySelectorAll("body *"))
      .filter((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.width > 0 && (bounds.left < -1 || bounds.right > viewport + 1);
      })
      .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);
    return {
      overflow: document.documentElement.scrollWidth - viewport,
      offenders,
    };
  });
  expect(result.offenders, result.offenders.join("\n")).toEqual([]);
  expect(result.overflow).toBeLessThanOrEqual(1);
});

test("has exactly one h1 and headings do not skip levels", async ({ page }) => {
  await page.goto("/");
  const levels = await page.$$eval("h1,h2,h3,h4", (elements) =>
    elements.map((element) => Number(element.tagName[1])),
  );
  expect(levels.filter((level) => level === 1)).toHaveLength(1);
  for (let index = 1; index < levels.length; index += 1) {
    expect(levels[index] - levels[index - 1]).toBeLessThanOrEqual(1);
  }
});
