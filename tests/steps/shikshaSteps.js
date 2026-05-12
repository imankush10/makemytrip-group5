const { Given, When, Then } = require('@cucumber/cucumber');
const { ShikshaPage } = require('C:/Users/ARYAN/OneDrive/Desktop/makemytrip-group5/tests/pages/ShikshaPage.js');
const { expect } = require('@playwright/test');
const fs = require('fs');


Given('I navigate to the Shiksha homepage', async function () {
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

  const filePath = await this.shikshaPage.takeScreenshot();
  if (fs.existsSync(filePath)) {
    const image = fs.readFileSync(filePath);
    await this.attach(image, 'image/png');
  }
});