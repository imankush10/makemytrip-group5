const { Given, When, Then } = require('@cucumber/cucumber');
const { ShikshaOnlinePage } = require('C:/Users/ARYAN/OneDrive/Desktop/New folder (5)/tests/pages/ShikshaOnlinePage.js');
const { expect } = require('@playwright/test');
const fs = require('fs');


Given('I go to the Shiksha homepage', async function () {
  this.shikshaOnlinePage = new ShikshaOnlinePage(this.page);
  await this.shikshaOnlinePage.goTo();
});

When('I click on Shiksha Online', async function () {
  await this.shikshaOnlinePage.clickShikshaOnline();
});

When('I select Management from the menu', async function () {
  await this.shikshaOnlinePage.clickManagement();
});

When('I apply specialization filters {string}', async function (spec1) {
  await this.shikshaOnlinePage.applySpecializationFilters(spec1);
});

When('I apply courses filter {string}', async function (course) {
  await this.shikshaOnlinePage.applyCoursesFilter(course);
  const results = this.page.locator('//a[contains(@href,"course")] | //article').first();
  await expect(results).toBeVisible();
});

When('I apply rating filter {string}', async function (rating) {
  await this.shikshaOnlinePage.applyRatingFilter(rating);
  const results = this.page.locator('//a[contains(@href,"course")] | //article').first();
  await expect(results).toBeVisible();
});

When('I apply fees filters {string} and {string} and {string}', async function (fees1, fees2, fees3) {
  await this.shikshaOnlinePage.applyFeesFilters(fees1, fees2, fees3);
});

When('I apply course duration filter {string}', async function (duration) {
  await this.shikshaOnlinePage.applyDurationFilter(duration);
});

When('I apply mode of study filter {string}', async function (mode) {
  await this.shikshaOnlinePage.applyModeFilter(mode);
});

Then('I take a screenshot of the filtered results page', async function () {
  const filePath = await this.shikshaOnlinePage.takeScreenshot('filtered_results');

  if (fs.existsSync(filePath)) {
    const image = fs.readFileSync(filePath);
    await this.attach(image, 'image/png');
  }
});

When('I click on the first course in the results', async function () {
  const exists = await this.shikshaOnlinePage.assertFirstCourseExists();
  expect(exists).toBe(true);

  await this.shikshaOnlinePage.clickFirstCourse();
});

Then('I take a screenshot of the course page', async function () {
  const url = this.page.url();
  expect(url).toContain('shiksha.com');
  expect(url).not.toBe('https://www.shiksha.com/');

  const filePath = await this.shikshaOnlinePage.takeScreenshot('course_page');

  if (fs.existsSync(filePath)) {
    const image = fs.readFileSync(filePath);
    await this.attach(image, 'image/png');
  }
});