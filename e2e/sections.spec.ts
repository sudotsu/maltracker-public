import { expect, test } from "@playwright/test";

test("all nine sections are present", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("section.section")).toHaveCount(9);
});

test("the open-questions section is on the page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/still open/i).first()).toBeVisible();
});
