const { Given, When, Then } = require('@cucumber/cucumber');
const { CollegeComparePage } = require('../pages/CollegeComparePage');
const { expect } = require('@playwright/test');
const fs = require('fs');

Given('I navigate to Shiksha and login', async function () {
  this.comparePage = new CollegeComparePage(this.page);
  await this.comparePage.goTo();
});

When('I click on MBA in the navigation bar', async function () {
  await this.comparePage.clickMbaTab();
});

When('I click on Top Ranked Colleges', async function () {
  await this.comparePage.clickTopRankedColleges();
});

When('I click on Top MBA Colleges in India', async function () {
  await this.comparePage.clickTopMBACollegesInIndia();
  const url = this.page.url();
  expect(url).toContain('mba');
});

When('I click on IIM Ahmedabad college', async function () {
  await this.comparePage.clickIIMAhmedabad();
  const url = this.page.url();
  expect(url).toContain('iim-ahmedabad');
});

When('I click on the Compare button', async function () {
  await this.comparePage.clickCompareButton();
});

When('I search for college {} in the compare box', async function (collegeName) {
  await this.comparePage.searchCollege(collegeName);
});

When('I click on Compare Now', async function () {
  await this.comparePage.clickCompareNow();
});

When('I click on Add College', async function () {
  await this.comparePage.clickAddCollege();
});

Then('I take a screenshot of the comparison page', async function () {
  const url = this.page.url();
  expect(url).toContain('shiksha.com');

  const filePath = await this.comparePage.takeScreenshot('college_comparison');
  expect(fs.existsSync(filePath)).toBe(true);

  const image = fs.readFileSync(filePath);
  await this.attach(image, 'image/png');
});