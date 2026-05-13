// No external imports needed — Playwright's page object is injected via the constructor

class ShikshaRegisterPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // --- Registration form locators ---
        this.signUpLink        = page.locator('a[data-label="Register"], a[href*="register"], a:has-text("Sign Up"), button:has-text("Sign Up")').first();
        this.phoneInput        = page.locator('input[type="tel"], input[placeholder*="phone"], input[placeholder*="Phone"], input[name*="phone"], input[id*="phone"]').first();
        this.nameInput         = page.locator('input[placeholder*="Name"], input[placeholder*="name"], input[name*="name"], input[id*="name"]').first();
        this.emailInput        = page.locator('input[type="email"], input[placeholder*="Email"], input[placeholder*="email"]').first();

        // T&C: the <input> itself is hidden; clicking its <label> is the correct way to toggle it
        this.termsCheckboxLabel = page.locator('label[for="legalHelpTip"], label:has(input[type="checkbox"][id*="legal"]), label:has(input[type="checkbox"][id*="term"])').first();
        // Keep a reference to the hidden input only for reading its checked state
        this.termsCheckboxInput = page.locator('input[type="checkbox"][id*="legal"], input[type="checkbox"][id*="term"], input[type="checkbox"][name*="agree"]').first();

        // Sign Up submit button — exact ARIA role locator confirmed via Playwright codegen
        this.registerButton    = page.getByRole('button', { name: 'Sign up', exact: true });

        // --- OTP popup dismiss locators (exact XPath confirmed via Playwright codegen) ---
        // The X/cross icon to close the OTP verification popup
        this.otpPopupClose = page.locator('//span[@class="cross-x"]');
        // The Skip option that appears after closing the OTP popup
        this.skipOtpButton = page.locator('//strong[text()="Skip"]');


    }

    // Navigate directly to shiksha.com
    async navigate() {
        await this.page.goto('https://www.shiksha.com/', { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(2000);
    }

    // Click the Sign Up / Register button in the top navigation
    async clickSignUp() {
        await this.signUpLink.waitFor({ state: 'visible', timeout: 15000 });
        await this.signUpLink.click();
        await this.page.waitForTimeout(1500);
    }

    // Fill in phone, name, and email in the registration form
    async fillRegistrationDetails(phone, name, email) {
        await this.phoneInput.waitFor({ state: 'visible', timeout: 15000 });
        await this.phoneInput.fill(phone);

        await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.nameInput.fill(name);

        await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.emailInput.fill(email);
    }

    // Tick the T&C checkbox by clicking its visible label (the input itself is hidden)
    async acceptTermsAndConditions() {
        await this.termsCheckboxLabel.waitFor({ state: 'visible', timeout: 10000 });
        // Read checked state from the hidden input before clicking
        const isChecked = await this.termsCheckboxInput.isChecked();
        if (!isChecked) {
            await this.termsCheckboxLabel.click();
        }
        await this.page.waitForTimeout(500);
    }

    // Click the Sign Up / Register submit button — this sends the OTP to the phone
    async clickRegister() {
        await this.registerButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.page.waitForTimeout(500);
        await this.registerButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Close the OTP verification popup by clicking the X cross icon
    async closeOtpPopup() {
        try {
            await this.otpPopupClose.waitFor({ state: 'visible', timeout: 10000 });
            await this.otpPopupClose.click();
            await this.page.waitForTimeout(1000);
        } catch {
            console.log('OTP cross icon not found, continuing...');
        }
    }

    // Click the Skip option to bypass OTP verification entirely
    async skipOtpVerification() {
        try {
            await this.skipOtpButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.skipOtpButton.click();
            await this.page.waitForTimeout(2000);
        } catch {
            console.log('Skip button not found, continuing...');
        }
    }


}

module.exports = { ShikshaRegisterPage };
