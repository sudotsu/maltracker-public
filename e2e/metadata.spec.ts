import { expect, test } from "@playwright/test";
import { publicSite } from "../src/data/public-site";

test("publishes canonical and social-sharing metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(publicSite.title);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    publicSite.description,
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", publicSite.url);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    publicSite.title,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
    "content",
    /twitter-image/,
  );
});

test("publishes crawl instructions and a one-page sitemap", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain(`Sitemap: ${publicSite.url}/sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(`<loc>${publicSite.url}</loc>`);
});

test("serves the static case study with defensive browser headers", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();

  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-powered-by"]).toBeUndefined();
});
