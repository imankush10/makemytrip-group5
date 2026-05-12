const testData = require('C:/Users/ARYAN/OneDrive/Desktop/makemytrip-group5/tests/data/testData.json');

class ShikshaPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.mbaTab = page.locator('//a[text()="MBA"]').first();

    this.catPredictorLink = page.locator(
      '//a[text()="CAT Percentile Predictor"]'
    ).first();

    // Predictor
    this.scoreInput = page.locator(
      '//input[@name="examScore[score]"]'
    );

    this.predictNowBtn = page.locator(
      '//button[text()="Predict Now"]'
    ).first();

    this.resetBtn = page.locator(
      '//button[text()="Reset"] | //a[text()="Reset"]'
    ).first();

    // College list
    this.firstShortlistBtn = page.locator(
      '//button[text()="Shortlist"] | //a[text()="Shortlist"]'
    ).first();
  }

  // Navigation

  async goTo() {
    await this.page.goto('https://www.shiksha.com/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    await this.page.waitForTimeout(5000);
  }

  async clickMbaTab() {
    await this.mbaTab.waitFor({ state: 'visible', timeout: 15000 });
    await this.mbaTab.hover();
    await this.page.waitForTimeout(800);
  }

  async selectCatPredictor() {
    await this.catPredictorLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.catPredictorLink.click();
    await this.page.waitForTimeout(3000);
  }

  async enterScore(score) {
    await this.scoreInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.scoreInput.clear();
    await this.scoreInput.fill(String(score));
  }

  async enterFirstScore() {
    await this.enterScore(testData.catPredictor.firstScore);
  }

  async enterSecondScore() {
    await this.enterScore(testData.catPredictor.secondScore);
  }

  async clickPredictNow() {
    await this.predictNowBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.predictNowBtn.click();
    await this.page.waitForTimeout(3000);
  }

  async clickReset() {
    await this.resetBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.resetBtn.click();
    await this.page.waitForTimeout(1000);
  }

  // Filters

  async applyFilter(filterText) {
    const filterLocator = this.page.locator(
      `//label[contains(text(),"${filterText}")] | //span[contains(text(),"${filterText}")]`
    ).first();
    await filterLocator.waitFor({ state: 'visible', timeout: 15000 });
    await filterLocator.scrollIntoViewIfNeeded();
    await filterLocator.click();
    await this.page.waitForTimeout(3000);
    await this.page.waitForTimeout(1500);
  }

  async applyAllLocationFilters() {
    for (const city of testData.filters.locations) {
      await this.applyFilter(city);
    }
  }

  async applyFeesFilter() {
    await this.applyFilter(testData.filters.fees);
  }

  async applySpecializationFilter() {
    await this.applyFilter(testData.filters.specialization);
  }

  async shortlistFirstCollege() {
    await this.firstShortlistBtn.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstShortlistBtn.scrollIntoViewIfNeeded();
    await this.firstShortlistBtn.click();
    await this.page.waitForTimeout(3000);
  }

  // Screenshot

  async takeScreenshot() {
    const filePath = `screenshots/final.png`;
    await this.page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }
}

module.exports = { ShikshaPage };