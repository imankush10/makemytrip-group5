const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const EngineeringPage = require('../pages/businesspage');

let browser;
let context;
let page;
let engineering;


Given('user launches the Shiksha website', async function () {

    browser = await chromium.launch({

        headless: false,
        slowMo: 1000
    });

    context = await browser.newContext();

    page = await context.newPage();

    engineering = new EngineeringPage(page);

    await engineering.launchWebsite();
});


When('user closes popup if displayed', async function () {

    await engineering.closePopupIfPresent();
});


When('user hovers on Engineering menu from homepage', async function () {

    await engineering.hoverEngineeringMenu();
});


When('user clicks on Top Engineering Colleges option', async function () {

    await engineering.clickTopEngineeringColleges();
});


Then('engineering colleges page should open successfully', async function () {

    await engineering.verifyEngineeringPage();
});


When('user selects location as Delhi NCR', async function () {

    await engineering.selectLocation();
});


When('user selects course as B.Tech', async function () {

    await engineering.selectCourse();
});


When('user selects specialization as Computer Science Engineering', async function () {

    await engineering.selectSpecialization();
});


When('user selects college type as Private', async function () {

    await engineering.selectCollegeType();
});


When('user selects ranking filter', async function () {

    await engineering.selectRanking();
});


When('user clicks on Apply Filters button', async function () {

    await engineering.applyFilters();
});


Then('filtered engineering colleges should be displayed', async function () {

    await engineering.verifyFilteredResults();
});


When('user clicks on first engineering college', async function () {

    await engineering.openFirstCollege();
});


Then('selected college details page should open', async function () {

    await engineering.verifyCollegePage();
});


When('user verifies college overview section', async function () {

    await engineering.verifyOverviewSection();
});


When('user verifies fees section', async function () {

    await engineering.verifyFeesSection();
});


When('user verifies placement section', async function () {

    await engineering.verifyPlacementSection();
});


When('user verifies admission section', async function () {

    await engineering.verifyAdmissionSection();
});


When('user verifies course details section', async function () {

    await engineering.verifyCourseSection();
});


Then('user should successfully validate engineering college information', async function () {

    console.log('Engineering college validation completed successfully');

    await browser.close();
});