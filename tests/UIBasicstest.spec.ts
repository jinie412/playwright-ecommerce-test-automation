import { expect, test } from "@playwright/test";

test.only("Browser Context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // css, xpath
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");

  // wait until this locator show up on the page
  await userName.fill("learning");
  await password.fill("learning");
  await signIn.click();

  const message = await page.locator("[style*='block']");
  await expect(message).toContainText("Incorrect");

  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await signIn.click();

  const cardTitles = page.locator(".card-body a");
  // console.log(await cardTitles.nth(0).textContent());

  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");

  await userName.fill("rahulshettyacademy");
  await password.fill("Learning@830$3mK2");
  await dropdown.selectOption("teach");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  

  await signIn.click();
});
