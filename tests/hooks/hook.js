const { BeforeAll, AfterAll, Before, After, setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(120 * 1000);

class PlaywrightWorld {
  constructor({ attach }) {
    this.attach = attach;
    this.page = null;
    this.context = null;
  }
}
setWorldConstructor(PlaywrightWorld);

let browser;
const STORAGE_STATE_PATH = path.resolve(process.cwd(), 'storageState.json'); 

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 200,
  });
});

AfterAll(async function () {
  await browser.close();
});

Before(async function () {
  const contextOptions = {
    viewport: { width: 1440, height: 900 },
    locale: 'en-IN',
  };

  // Load storageState (cookies + localStorage) if the file exists
  if (fs.existsSync(STORAGE_STATE_PATH)) {
    contextOptions.storageState = STORAGE_STATE_PATH;
  } else {
    console.warn(`⚠️  storageState.json not found at ${STORAGE_STATE_PATH}. Running without saved session.`);
  }

  this.context = await browser.newContext(contextOptions);
  this.page = await this.context.newPage();

  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED') {
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
  }
  await this.page.close();
  await this.context.close();
});