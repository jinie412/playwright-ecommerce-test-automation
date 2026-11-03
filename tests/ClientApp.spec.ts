import { expect, test } from "@playwright/test";

test.only("Browser Context Playwright test", async ({ browser, page }) => {
  const productName = "ZARA COAT 3";
  const email = "khanhhan@gmail.com";
  const products = page.locator(".card-body");

  await page.goto("https://rahulshettyacademy.com/client");

  const userEmail = page.locator("#userEmail");
  const userPassword = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");

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

  // Checkout page
  await page.locator("text=Checkout").click();

  await page.locator("[value*='4542']").fill("4242 4242 4242 4242");
  await page.locator("select.input").first().selectOption({ label: "08" });
  await page.locator("select.input").last().selectOption({ label: "30" });
  await page.locator('div.field:has(:text("CVV Code ")) input').fill("123");
  await page
    .locator('div.field:has(:text("Name on Card ")) input')
    .fill("Pham Van B");

  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 150 });

  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();

  const optionsCount = await dropdown.locator("button").count();
  console.log(optionsCount);

  for (let i = 0; i < optionsCount; ++i) {
    //console.log(await dropdown.locator("button").nth(i).textContent());
    if ((await dropdown.locator("button").nth(i).textContent()) === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );

  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .first()
    .textContent();

  console.log(orderId);

  await page.locator('label:has-text("Orders History Page")').click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");
  const rowsCount = await rows.count();

  for (let i = 0; i < rowsCount; i++) {
    const text = (await rows.nth(i).locator("th").textContent()) ?? "";
    if (orderId?.includes(text)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  await page.locator(".col-text").waitFor();
  const orderDetail = (await page.locator(".col-text").textContent()) ?? "";
  expect(orderId?.includes(orderDetail)).toBeTruthy();
});
