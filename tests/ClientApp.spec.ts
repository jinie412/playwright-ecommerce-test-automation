import { expect, test } from "@playwright/test";

test.only("Browser Context Playwright test", async ({ browser, page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  const userEmail = await page.locator("#userEmail");
  const userPassword = await page.locator("#userPassword");
  const loginBtn = await page.locator("[value='Login']");

  await userEmail.fill("khanhhan@gmail.com");
  await userPassword.fill("Ha123456*");
  await loginBtn.click();

  //await page.waitForLoadState("networkidle");

  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
