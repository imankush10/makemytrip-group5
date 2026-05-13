const { Given, When, Then } = require('@cucumber/cucumber');
const { ShikshaPage } = require('../../tests/pages/ShikshaPage.js');
const { expect } = require('@playwright/test');
const fs = require('fs');

Given('I navigate to Shiksha homepage', async function () {
  this.shikshaPage = new ShikshaPage(this.page);
  await this.shikshaPage.goTo();
  const title = await this.page.title();
  expect(title.length).toBeGreaterThan(0);
});


When('I click on the MBA tab', async function () {
  await this.shikshaPage.clickMbaTab();
});

When('I select CAT Percentile Predictor from the dropdown', async function () {
  await this.shikshaPage.selectCatPredictor();
  const url = this.page.url();
  expect(url).not.toBe('https://www.shiksha.com/');
});


When('I click Predict Now with empty score', async function () {
  await this.shikshaPage.clickPredictNowWithEmptyScore();

  const errorText = await this.shikshaPage.getErrorMessageText();
  console.log(`[NEG - Empty Score] Error shown: ${errorText}`);

  expect(errorText).toContain('Enter Score');


  const path = await this.shikshaPage.takeScreenshot('neg_empty_score');
  if (fs.existsSync(path)) {
    const img = fs.readFileSync(path);
    await this.attach(img, 'image/png');
  }
});

When('I enter score {string} and click Predict Now', async function (score) {
  await this.shikshaPage.enterScoreAndPredict(score);
  await this.page.waitForTimeout(2000);

  if (score === '0' || score === '198') {
    const noResultMsg = this.page.locator(
      '//*[contains(text(),"No result found for")]'
    ).first();
    await noResultMsg.waitFor({ state: 'visible', timeout: 10000 });
    const msgText = await noResultMsg.innerText();
    console.log(`[NEG - Score: ${score}] Page message: ${msgText}`);
    expect(msgText).toContain('No result found for');

    const path = await this.shikshaPage.takeScreenshot(`neg_score_${score}`);
    if (fs.existsSync(path)) {
      const img = fs.readFileSync(path);
      await this.attach(img, 'image/png');
    }

    await this.shikshaPage.clickReset();
    await this.page.waitForTimeout(1000);

  } else {
    // 199, -1, abc — inline validation error on same page
    const errorLocator = this.page.locator(
      '//*[contains(text(),"Score should be less than or equal to 198")] | //*[contains(text(),"Enter Score")] | //*[contains(text(),"valid number")]'
    ).first();
    await errorLocator.waitFor({ state: 'visible', timeout: 10000 });
    const errorText = await errorLocator.innerText();
    console.log(`[NEG - Score: ${score}] Error shown: ${errorText}`);

    if (score === '199') {
      expect(errorText).toContain('less than or equal to 198');
    } else if (score === '-1') {
      expect(errorText).toContain('less than or equal to 198');
    } else if (score === 'abc') {
      expect(errorText).toContain('valid number');
    }

    const safeName = score.replace('-', 'minus');
    const path = await this.shikshaPage.takeScreenshot(`neg_score_${safeName}`);
    if (fs.existsSync(path)) {
      const img = fs.readFileSync(path);
      await this.attach(img, 'image/png');
    }

    // clear field for next step
    await this.shikshaPage.clearScoreAfterNegativeTest();
  }
});


When('I enter the first CAT score', async function () {
  await this.shikshaPage.enterFirstScore();
});

When('I enter the second CAT score', async function () {
  await this.shikshaPage.enterSecondScore();
});

When('I click Predict Now', async function () {
  await this.shikshaPage.clickPredictNow();
});

When('I click Reset', async function () {
  await this.shikshaPage.clickReset();
});

When('I apply all location filters', async function () {
  await this.shikshaPage.applyAllLocationFilters();
});

When('I apply the fees filter', async function () {
  await this.shikshaPage.applyFeesFilter();
});

When('I apply the specialization filter', async function () {
  await this.shikshaPage.applySpecializationFilter();
});

When('I shortlist the first college', async function () {
  await this.shikshaPage.shortlistFirstCollege();
  const bodyText = await this.page.locator('body').innerText();
  expect(bodyText.length).toBeGreaterThan(0);
});

Then('I take a screenshot of the final page', async function () {
  const url = this.page.url();
  expect(url).toContain('shiksha.com');
  const title = await this.page.title();
  expect(typeof title).toBe('string');
  expect(title.length).toBeGreaterThan(0);

  const filePath = await this.shikshaPage.takeScreenshot('final');
  if (fs.existsSync(filePath)) {
    const image = fs.readFileSync(filePath);
    await this.attach(image, 'image/png');
  }
});