import { expect, test } from "@playwright/test";
import { publicSite } from "../src/data/public-site";

test("all nine sections are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section.section")).toHaveCount(9);
});

test("the open-questions section is on the page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/still open/i).first()).toBeVisible();
});

test("a prospective client can identify and contact the responder", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Contact the responder" })).toHaveAttribute(
    "href",
    publicSite.responder.url,
  );
  await expect(page.getByRole("link", { name: "Inspect the source" })).toHaveAttribute(
    "href",
    publicSite.repositoryUrl,
  );
});
