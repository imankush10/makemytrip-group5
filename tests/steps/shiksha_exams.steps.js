const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { ShikshaExamsPage } = require('../pages/shiksha_exams.page.js');

let examsPage;

Given('I am on the Shiksha homepage for exams', async function () {
    const { page } = this;
    examsPage = new ShikshaExamsPage(page);
    await examsPage.navigate();
});

When('I hover over {string} in the navigation bar', async function (menuItem) {
    const { page } = this;
    // Handling specific menu item internally in POM for now, or could pass string
    if (menuItem === 'More') {
        // Will be handled in navigateToScholarshipExams
    }
});

When('I click on {string}', async function (linkText) {
    const { page } = this;
    if (linkText === 'All Scholarship Exams') {
        await examsPage.navigateToScholarshipExams();
    } else if (linkText === 'Download Last 10 Year JEE Advanced Question Paper PDF') {
        await examsPage.clickDownloadLast10YearsPaper('JEE Advanced');
    }
});

Then('I should see a Page Not Found error', async function () {
    const { page } = this;
    const isErrorVisible = await examsPage.verifyPageNotFound();
    expect(isErrorVisible).toBeTruthy();
});

Then('I take a screenshot of the error page', async function () {
    const { page } = this;
    await examsPage.takeScreenshot('error_page.png');
});

When('I search for {string} in the top search bar', async function (searchTerm) {
    const { page } = this;
    await examsPage.searchExam(searchTerm);
});

Then('I should land on the {string} exam page', async function (examName) {
    const { page } = this;
    const currentUrl = page.url();
    expect(currentUrl.toLowerCase()).toContain(examName.toLowerCase().replace(' ', '-'));
});

When('I navigate to the Syllabus section', async function () {
    const { page } = this;
    await examsPage.navigateToSyllabus();
});

When('I download the {int} question paper', async function (year) {
    const { page } = this;
    await examsPage.downloadYearQuestionPaper(year);
});
