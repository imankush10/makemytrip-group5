import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto('https://www.makemytrip.com');
await page.waitForTimeout(5000);
await page.locator('.commonModal__close').click();
await page.waitForTimeout(5000);
await page.waitForSelector("//li[@data-cy='account']");
await page.locator("//li[@data-cy='account']").click();
await page.waitForTimeout(5000);

const mobileInput = page.getByRole('textbox', { name: 'Enter Mobile Number', exact: true });
await mobileInput.type("8544789286");
await page.waitForTimeout(5000);
await mobileInput.press("Enter");

await page.waitForTimeout(15000);

await context.storageState({ path: 'auth.json' });
console.log('Session saved to auth.json');

await browser.close();