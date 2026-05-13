const { expect } = require('@playwright/test');
const { ShikshaLoginPage } = require('../pages/shiksha_login.page.js');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const { Given, When, Then } = require('@cucumber/cucumber');

// Auth state file path — saved after login, reused by other tests
const AUTH_FILE = 'tests/fixtures/shiksha_auth.json';

// Load login credentials from JSON — no hardcoded values here
const loginData = JSON.parse(
    readFileSync(resolve('tests/fixtures/shiksha_data.json'), 'utf-8')
).login;

// Shared page object reused across all steps in the scenario
let loginPage;

Given('I open the Shiksha website', async function () {
    const { page } = this;
    loginPage = new ShikshaLoginPage(page);
    await loginPage.navigate();
});

When('I click on the Login button', async function () {
    const { page } = this;
    await loginPage.clickLoginNav();
});

When('I choose to login through email', async function () {
    const { page } = this;
    await loginPage.selectLoginWithEmail();
});

When('I enter my registered email address', async function () {
    const { page } = this;
    // Email comes from shiksha_data.json — not hardcoded
    await loginPage.enterEmail(loginData.email);
});

When('I click Get OTP to receive the OTP on my email', async function () {
    const { page } = this;
    await loginPage.clickGetOtp();
});

Then('I wait for the user to enter the OTP and complete login', async function () {
    const { page } = this;
    // Pauses execution — enter OTP in the browser, click Login,
    // then click Resume (▶) in the Playwright Inspector to continue
    await loginPage.waitForUserToEnterOtp();

    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');
    console.log(`Login complete. Current URL: ${currentUrl}`);
});

Then('my session is saved so other tests stay logged in', async function () {
    const { page } = this;
    // Saves cookies and localStorage to disk so any test using storageState
    // will start with an already-authenticated session
    await loginPage.saveSession(AUTH_FILE);
});
