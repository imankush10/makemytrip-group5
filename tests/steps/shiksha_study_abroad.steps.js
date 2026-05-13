const { expect } = require('@playwright/test');
const { ShikshaStudyAbroadPage } = require('../pages/shiksha_study_abroad.page.js');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const { Given, When, Then } = require('@cucumber/cucumber');

// All test data comes from JSON — no hardcoded values here
const data = JSON.parse(
    readFileSync(resolve('tests/fixtures/shiksha_data.json'), 'utf-8')
).studyAbroad;

// Shared page object across all steps in this scenario
let studyAbroadPage;

Given('I am on the Shiksha homepage', async function () {
    const { page } = this;
    studyAbroadPage = new ShikshaStudyAbroadPage(page);
    await studyAbroadPage.navigate();
});

When('I click on Study Abroad and select Top Universities Abroad', async function () {
    const { page } = this;
    await studyAbroadPage.navigateToTopUniversities();
});

Then('I should land on the Top Universities Abroad page', async function () {
    const { page } = this;
    const currentUrl = await studyAbroadPage.verifyOnTopUniversitiesPage();
    console.log(`Landed on: ${currentUrl}`);
    expect(currentUrl).toContain('shiksha.com');
});

When('I scroll to find the target university in the ranked list', async function () {
    const { page } = this;
    // Target university name is read from JSON (e.g. "Stanford University")
    await studyAbroadPage.scrollToUniversity(data.targetUniversity);
});

When('I click the Download Brochure button for the target university', async function () {
    const { page } = this;
    await studyAbroadPage.clickDownloadBrochure(data.targetUniversity);
});

When('I select the second course from the course dropdown', async function () {
    const { page } = this;
    // nthCourse from JSON (value: 2 = second option in the dropdown)
    await studyAbroadPage.selectCourse(data.brochureForm.nthCourse);
});

When('I fill in my details in the brochure lead form', async function () {
    const { page } = this;
    // All values come from shiksha_data.json — no hardcoding here
    await studyAbroadPage.fillBrochureForm(
        data.brochureForm.startYear,
        data.brochureForm.graduationPercentage,
        data.brochureForm.backlogs,
        data.brochureForm.workExperience
    );
});

When('I submit the brochure form', async function () {
    const { page } = this;
    await studyAbroadPage.submitBrochureForm();
});

Then('I should see a brochure download confirmation', async function () {
    const { page } = this;
    const confirmationText = await studyAbroadPage.getBrochureConfirmationText();
    console.log(`Confirmation text: ${confirmationText}`);
    expect(confirmationText).toBeTruthy();
});

// Uses the confirmed XPath (//a[@class="get-back"])[1] to return to the ranking list
When('I click the go back link to return to the university list', async function () {
    const { page } = this;
    await studyAbroadPage.goBackToList();
});

When('I click on the 5th ranked university', async function () {
    const { page } = this;
    // nthUniversityToClick is read from JSON (value: 2)
    await studyAbroadPage.clickNthUniversity(data.nthUniversityToClick);
});

Then('the university detail page should open', async function () {
    const { page } = this;
    const currentUrl = page.url();
    console.log(`University detail page URL: ${currentUrl}`);
    // University pages use country paths: /usa/universities/ or /uk/universities/
    expect(currentUrl).toContain('/universities/');
});

When('I click the Compare button on the university page', async function () {
    const { page } = this;
    await studyAbroadPage.clickCompare();
});



Then('the comparison view should be displayed', async function () {
    const { page } = this;
    const comparisonText = await studyAbroadPage.getComparisonContent();
    console.log(`Comparison content loaded: ${comparisonText?.substring(0, 80)}`);
    expect(comparisonText).toBeTruthy();
});
