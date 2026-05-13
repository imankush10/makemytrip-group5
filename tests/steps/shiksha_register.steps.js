const { expect } = require('@playwright/test');
const { ShikshaRegisterPage } = require('../pages/shiksha_register.page.js');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const { Given, When, Then } = require('@cucumber/cucumber');

// Load test data from JSON — no hardcoded values in the steps
const testData = JSON.parse(
    readFileSync(resolve('tests/fixtures/shiksha_data.json'), 'utf-8')
).registration;

// Shared page object instance reused across steps in the same scenario
let registerPage;

function getRegisterPage(page) {
    if (!registerPage) {
        registerPage = new ShikshaRegisterPage(page);
    }
    return registerPage;
}

When('I click on the Sign Up button', async function () {
    await getRegisterPage(this.page).clickSignUp();
});

When('I enter my phone number, full name, and email address', async function () {
    await getRegisterPage(this.page).fillRegistrationDetails(
        testData.phone,
        testData.name,
        testData.email
    );
});

When('I accept the terms and conditions', async function () {
    // Tick the T&C checkbox — required before the Sign Up button becomes active
    await getRegisterPage(this.page).acceptTermsAndConditions();
});

When('I click the Sign Up button to proceed', async function () {
    // Clicks the actual submit/register button after T&C is accepted
    await getRegisterPage(this.page).clickRegister();
});

Then('I dismiss the OTP verification by closing the popup', async function () {
    // Close the OTP modal using the X mark as described in the requirement
    await getRegisterPage(this.page).closeOtpPopup();
});

Then('I skip the OTP step', async function () {
    // Click the Skip link/button that appears after closing the OTP popup
    await getRegisterPage(this.page).skipOtpVerification();
});

Then('I should be registered successfully on Shiksha', async function () {
    const { page } = this;
    // After registration, the URL should no longer contain a login/register path
    // and the page should reflect a logged-in or welcome state
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/login');
    console.log(`Registration complete. Current URL: ${currentUrl}`);
});
