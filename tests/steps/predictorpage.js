const { Given, When, Then , setDefaultTimeout} = require('@cucumber/cucumber');
const { JeePredictorPage } = require('../pages/predictor');
const { expect } = require('@playwright/test');
const fs = require('fs');

Given('I go to Shiksha website for JEE predictor', async function () {
  this.jeePage = new JeePredictorPage(this.page);
  await this.jeePage.goTo();
  // assert page loaded
  const title = await this.page.title();
  expect(title.length).toBeGreaterThan(0);
});

When('I click on Engineering tab', async function () {
  await this.jeePage.clickEngineeringTab();
});

// When('I hover on College Predictors', async function () {
//   await this.jeePage.hoverCollegePredictors();
// });

// When('I click on JEE Main College Predictor', async function () {
//   await this.jeePage.clickJeeMainPredictor();
//   // assert url changed to predictor page
//   const url = this.page.url();
//   expect(url).toContain('shiksha.com');
// });
// In steps file - combine into one atomic action if hover keeps failing:
When('I hover on College Predictors', async function () {
  await this.jeePage.hoverCollegePredictors();
  // Don't wait long here — menu will close!
});

When('I click on JEE Main College Predictor', async function () {
  // This must run immediately after hover step
  await this.jeePage.clickJeeMainPredictor();
  const url = this.page.url();
  expect(url).toContain('shiksha.com');
});
When('I enter JEE Main rank {}', async function (rank) {
  await this.jeePage.enterRank(rank);
});

When('I select gender {}', async function (gender) {
  await this.jeePage.selectGender(gender);
});

When('I select category {} from dropdown', async function (category) {
  await this.jeePage.selectCategory(category);
});

When('I select domicile state {} from dropdown', async function (state) {
  await this.jeePage.selectDomicileState(state);
});

When('I click Predict Results', async function () {
  await this.jeePage.clickPredictResults();
  // assert results page loaded
  const url = this.page.url();
  expect(url).toContain('shiksha.com');
});

When('I apply location filter {}', async function (location) {
  await this.jeePage.applyFilter(location);
});

When('I apply fee filter {}', async function (fee) {
  await this.jeePage.applyFilter(fee);
});

When('I apply specialization filter {}', async function (specialization) {
  await this.jeePage.applyFilter(specialization);
});

When('I apply ownership filter {}', async function (ownership) {
  await this.jeePage.applyFilter(ownership);
});

When('I click shortlist for the first college', async function () {
  await this.jeePage.clickShortlistFirstCollege();
  // assert page still on shiksha after shortlist
  const url = this.page.url();
  expect(url).toContain('shiksha.com');
});

Then('I take a screenshot of the final loaded page', async function () {
  // assert page has content
  const bodyText = await this.page.locator('//body').innerText();
  expect(bodyText.length).toBeGreaterThan(0);

  const filePath = await this.jeePage.takeScreenshot('jee_predictor_final');
  expect(fs.existsSync(filePath)).toBe(true);

  const image = fs.readFileSync(filePath);
  await this.attach(image, 'image/png');
});