//@ts-check
import { test, expect } from "@playwright/test";

test("login,logout,filter and tracing", async ({ page, context }) => {
  //start tracing
  await context.tracing.start({ screenshots: true, snapshots: true });

  //visit website
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  //wait
  await page.waitForTimeout(5000);

  //login using css selector
  // await page.locator('input[placeholder="Username"]').fill('Admin')
  // await page.locator('input[placeholder="Password"]').fill('admin123')
  // await page.locator('button[type="submit"]').click()

  //login using get
  // await page.getByPlaceholder("Username").fill("Admin")
  // await page.getByPlaceholder("password").fill("admin123")
  // await page.getByRole("button",{name:"Login"}).click()

  //login using xpath
  await page.locator("//input[@placeholder='Username']").fill("Admin");
  await page.locator("//input[@placeholder='Password']").fill("admin123");
  await page.locator("//button[normalize-space()='Login']").click();

  //go to Leave
  //1.
  //await page.getByRole("link",{name:"Leave"}).click()

  //2.filter
  // await page.getByRole("listitem").filter({hasText:"Leave"}).click()

  //3.filter by using child
  await page
    .getByRole("listitem")
    .filter({ has: page.getByRole("link", { name: "Leave" }) })
    .click();

  //logout
  await page.getByAltText("profile picture").click();
  await page.getByText("Logout").click();

  let CurrentDate = new Date();
  let FormatDate = CurrentDate.toISOString().replace(/[:.Z-]/g, "_") + ".zip";

  //end tracing
  await context.tracing.stop({ path: FormatDate });

  await page.waitForTimeout(7000);
});
