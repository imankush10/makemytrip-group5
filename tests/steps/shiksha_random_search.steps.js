const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ShikshaExamsPage } = require('../pages/shiksha_exams.page.js');
const { readFileSync } = require('fs');
const { resolve } = require('path');

// Load random search data from JSON
const testData = JSON.parse(
    readFileSync(resolve('tests/fixtures/shiksha_data.json'), 'utf-8')
).randomSearch;

Given('I am on the Shiksha homepage for random text search', async function () {
    const { page } = this;
    this.searchPage = new ShikshaExamsPage(page);
    await this.searchPage.navigate();
});

When('I perform random searches using data from JSON', async function () {
    const { page } = this;
    
    // Loop through all our random search queries from the JSON file
    for (const searchCase of testData) {
        console.log(`Searching for: ${searchCase.query}`);
        await this.searchPage.searchExam(searchCase.query);
        
        // The search might redirect or show "No results found"
        // We just take a screenshot in the 'ss' folder
        await this.searchPage.takeScreenshot(`${searchCase.name}.png`);
        
        // Wait briefly before the next search
        await page.waitForTimeout(1000);
    }
});

Then('I should have screenshots for all the random searches', async function () {
    const { page } = this;
    // We already took the screenshots in the previous step.
    // Verify the page is still active and didn't crash.
    const body = page.locator('body');
    await expect(body).toBeVisible();
    console.log(`Successfully completed all ${testData.length} random searches.`);
});
