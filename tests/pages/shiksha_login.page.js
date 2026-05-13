class ShikshaLoginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // Navigate to shiksha.com
    async navigate() {
        await this.page.goto('https://www.shiksha.com/', { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(2000);
    }

    // Click the "Login" text link in the top navigation
    async clickLoginNav() {
        const loginButton = this.page.getByText('Login').first();

        // If not visible, user might already be logged in — skip gracefully
        if (!(await loginButton.isVisible().catch(() => false))) {
            console.log('Login button not visible — possibly already logged in.');
            return;
        }

        await loginButton.click();
        await this.page.waitForTimeout(1000);
    }

    // Choose "Login through Email" from the login modal options
    async selectLoginWithEmail() {
        const emailLogin = this.page
            .getByText(/email/i)
            .or(this.page.getByRole('button', { name: /email/i }))
            .first();

        if (await emailLogin.isVisible().catch(() => false)) {
            await emailLogin.click();
        }

        await this.page.waitForTimeout(500);
    }

    // Fill in the email address on the login form
    async enterEmail(email) {
        await this.page.getByRole('textbox', { name: 'Email address' }).fill(email);
    }

    // Click the OTP/Continue/Login button to trigger OTP delivery
    async clickGetOtp() {
        await this.page
            .getByRole('button', { name: /login|continue|get otp|send otp/i })
            .first()
            .click();

        await this.page.waitForTimeout(1000);
    }

    // Pause the test so the user can manually enter the OTP in the browser.
    // After entering OTP and clicking Login, press Resume in the Playwright Inspector.
    async waitForUserToEnterOtp() {
        await this.page.pause();
    }

    // Save the authenticated browser session (cookies + localStorage) to disk.
    // This file is reused by subsequent tests so they start already logged in.
    async saveSession(filePath) {
        await this.page.context().storageState({ path: filePath });
        console.log(`Session saved to: ${filePath}`);
    }
}

module.exports = { ShikshaLoginPage };
