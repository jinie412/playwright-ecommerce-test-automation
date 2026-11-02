import { expect, test } from "@playwright/test";

test.only("Browser Context Playwright test", async ({ browser, page }) => {
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");

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

  const count = await products.count();

  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // add the product to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();

  const bool = await page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(bool).toBeTruthy();
});
