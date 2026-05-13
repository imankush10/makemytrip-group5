const { chromium } = require("@playwright/test");

const SITE_URL = "https://www.shiksha.com/";
const PHONE_NUMBER = process.env.SHIKSHA_PHONE || "8944993220";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(SITE_URL);
    await page.waitForLoadState("domcontentloaded");

    await page.locator(".gnbY21loginLnk").click();
    await page.locator("//input[@name='phone']").fill(PHONE_NUMBER);
    await page.getByRole("button", { name: "Get OTP", exact: true }).click();

    // Fill OTP manually in the browser, then click Resume in the Playwright inspector
    await page.pause();

    // By the time you resume, you're logged in — just save state
    await context.storageState({ path: "storageState2.json" });
    console.log("✅ storageState.json saved successfully");
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
