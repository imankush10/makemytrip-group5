const { BeforeAll, AfterAll, Before, After, setWorldConstructor, setDefaultTimeout, World } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(120 * 1000);

// ─── World ────────────────────────────────────────────────────────────────────
class PlaywrightWorld extends World {
  constructor(options) {
    super(options);
    this.page    = null;
    this.context = null;
    this.questionText = null;
    this.answerText = null;
  }
}
setWorldConstructor(PlaywrightWorld);

// ─── Config ───────────────────────────────────────────────────────────────────
const STORAGE_STATE_PATH = path.resolve(process.cwd(), 'storageState.json');
const HEADLESS  = process.env.HEADLESS   === 'true';
const SLOW_MO   = Number(process.env.SLOW_MO_MS ?? 200);

// ─── Browser lifecycle (shared across all scenarios) ─────────────────────────
let browser;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: HEADLESS, slowMo: SLOW_MO });
});

AfterAll(async function () {
  await browser?.close();
});

// ─── Context + page lifecycle (per scenario) ─────────────────────────────────
Before(async function () {
  const contextOptions = {
    viewport: { width: 1440, height: 900 },
    locale: 'en-IN',
  };

  if (fs.existsSync(STORAGE_STATE_PATH)) {
    contextOptions.storageState = STORAGE_STATE_PATH;
  } else {
    console.warn(`⚠️  storageState.json not found at ${STORAGE_STATE_PATH}. Running without saved session.`);
  }

  this.context = await browser.newContext(contextOptions);
  this.page    = await this.context.newPage();
  this.page.setDefaultTimeout(30000);

  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }
});

After(async function (scenario) {
  if (scenario.result?.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    if (typeof this.attach === 'function') {
      await this.attach(screenshot, 'image/png');
    }
  }

  await this.page?.close();
  await this.context?.close();
});