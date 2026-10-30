import { expect, test } from "@playwright/test";

test.only("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // css, xpath
  await page.locator("#username").fill("rahulshettyacademy ");
  await page.locator("[type='password']").fill("learning@830$3mK2");
  await page.locator("#signInBtn").click();

  // wait until this locator show up on the page
  const message = await page.locator("[style*='block']");
  await expect(message).toContainText("Incorrect");
});

test("Page Context Playwright test", async ({ page }) => {
  await page.goto("https://google.com");

  // get title
  const title = await page.title();

  await expect(page).toHaveTitle("Google");
});
