const testData = require('../../tests/data/testData.json');

class ShikshaPage {
  constructor(page) {
    this.page = page;


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

    // Error message locator covers all validation messages on predictor
    this.errorMessage = page.locator(
      '//*[contains(text(),"Score should be less than or equal to 198")] | //*[contains(text(),"Enter Score")] | //*[contains(text(),"valid number")] | //*[contains(text(),"No result found for")]'
    ).first();

  
    this.firstShortlistBtn = page.locator(
      '//button[text()="Shortlist"] | //a[text()="Shortlist"]'
    ).first();
  }

 

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


  async clickPredictNowWithEmptyScore() {
    // clear the field completely then click predict
    await this.scoreInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.scoreInput.clear();
    await this.predictNowBtn.click();
    await this.page.waitForTimeout(2000);
  }

  async enterScoreAndPredict(score) {
  await this.scoreInput.waitFor({ state: 'visible', timeout: 15000 });
  await this.scoreInput.click({ clickCount: 3 });
  await this.page.keyboard.press('Backspace');
  await this.page.waitForTimeout(300);
  await this.scoreInput.fill(String(score));
  await this.page.waitForTimeout(1000);

  // check if Predict Now button is enabled before clicking
  const isDisabled = await this.predictNowBtn.isDisabled().catch(() => false);
  if (!isDisabled) {
    await this.predictNowBtn.click();
  } else {
    console.log(`[INFO] Predict Now is disabled for score: ${score} — inline validation fired, skipping click`);
  }
  await this.page.waitForTimeout(2000);
}

  async getErrorMessageText() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.innerText();
  }

  async clearScoreAfterNegativeTest() {
    await this.scoreInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.scoreInput.click({ clickCount: 3 });
    // backspace clears the selected text and triggers input events
    await this.page.keyboard.press('Backspace');
    await this.page.waitForTimeout(500);
    await this.scoreInput.fill('');
    await this.page.waitForTimeout(500);
  }


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

  async takeScreenshot(name = 'final') {
    const filePath = `screenshots/${name}.png`;
    await this.page.screenshot({ path: filePath, fullPage: true });
    return filePath;
  }
}

module.exports = { ShikshaPage };