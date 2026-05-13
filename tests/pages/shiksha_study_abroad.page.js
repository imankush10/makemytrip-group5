class ShikshaStudyAbroadPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Stored after navigating to the ranking page — used to return cleanly after brochure
        this.rankingPageUrl = null;
    }

    // Open Shiksha home page
    async navigate() {
        await this.page.goto('https://www.shiksha.com', { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(2000);
    }

    // Use confirmed nav selectors to reach the Top Universities Abroad page
    async navigateToTopUniversities() {
        // Click "Study Abroad" inside the inner nav bar
        await this.page.locator('[id="_innerNav"]').getByText('Study Abroad').click();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});

        // Pick "Top Universities Abroad" from the dropdown that appears
        await this.page.getByText('Top Universities Abroad', { exact: true }).click();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});

        // Save the URL so we can navigate back to it after the brochure flow
        this.rankingPageUrl = this.page.url();
    }

    // Confirm we landed on the Top Universities page by checking the URL
    async verifyOnTopUniversitiesPage() {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        return this.page.url();
    }

    // Scroll until the target university row is in view and return its container element
    async scrollToUniversity(universityName) {
        const universityRow = this.page
            .locator(`tr:has-text("${universityName}"), [class*="row"]:has-text("${universityName}"), li:has-text("${universityName}")`)
            .first();

        await universityRow.waitFor({ state: 'visible', timeout: 20000 });
        await universityRow.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(500);
        return universityRow;
    }

    // Click the "Download Brochure" button on the row of the target university
    async clickDownloadBrochure(universityName) {
        const row = await this.scrollToUniversity(universityName);

        const brochureButton = row
            .locator('button:has-text("Download Brochure"), a:has-text("Download Brochure"), [class*="brochure"]')
            .first();

        await brochureButton.waitFor({ state: 'visible', timeout: 10000 });
        await brochureButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Fill the education preference form that appears after clicking Download Brochure.
    // Personal details (name/email/phone) are auto-populated from the logged-in session.
    async fillBrochureForm(startYear, graduationPct, backlogs, workExperience) {
        // Wait for the form page to fully settle
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(1500);

        // Select the preferred study start year via its radio label
        const yearLabel = this.page.locator(`label`).filter({ hasText: new RegExp(`^${startYear}$`) }).first();
        if (await yearLabel.isVisible().catch(() => false)) {
            await yearLabel.click();
        }
        await this.page.waitForTimeout(500);

        // The numeric input box next to the Graduation Percentage slider (1st number input)
        const gradInputs = this.page.locator('input[type="number"]');
        if (await gradInputs.first().isVisible().catch(() => false)) {
            await gradInputs.nth(0).fill(graduationPct);
        }

        // The numeric input box next to the Number of Backlogs slider (2nd number input)
        if (await gradInputs.nth(1).isVisible().catch(() => false)) {
            await gradInputs.nth(1).fill(backlogs);
        }

        // Work Experience input — exact XPath confirmed from live DOM: (//input[@type="number"])[3]
        const workExpInput = this.page.locator('(//input[@type="number"])[3]');
        if (await workExpInput.isVisible().catch(() => false)) {
            await workExpInput.fill(workExperience);
        }
        await this.page.waitForTimeout(500);

        // Click the "Booked" radio for "Have you given any study abroad exam?"
        // Exact XPath confirmed from live DOM: //input[@value="booked"]
        const bookedRadio = this.page.locator('//input[@value="booked"]');
        if (await bookedRadio.isVisible().catch(() => false)) {
            await bookedRadio.click();
        }
        await this.page.waitForTimeout(300);

        // Ensure the Terms & Conditions checkbox is ticked before submitting.
        // Exact XPath confirmed: //input[@id="termCondition"]
        const termCondition = this.page.locator('//input[@id="termCondition"]');
        const isTermChecked = await termCondition.isChecked().catch(() => false);
        if (!isTermChecked) {
            await termCondition.click();
        }
        await this.page.waitForTimeout(500);
    }

    // Click the orange "Download Brochure" submit button
    async submitBrochureForm() {
        const downloadButton = this.page.getByRole('button', { name: 'Download Brochure', exact: true });
        await downloadButton.waitFor({ state: 'visible', timeout: 10000 });
        await downloadButton.click();
        await this.page.waitForTimeout(2000);
    }

    // Select a course from the "Select Course At This University" dropdown on the brochure form.
    // nthOption is 1-based (1 = first option, 2 = second option, etc.)
    async selectCourse(nthOption) {
        // Open the custom course dropdown
        const dropdown = this.page
            .locator('[class*="select"], [class*="Select"], [class*="dropdown"]')
            .filter({ hasText: /select course|course/i })
            .first();

        await dropdown.waitFor({ state: 'visible', timeout: 10000 });
        await dropdown.click();
        await this.page.waitForTimeout(800);

        // Pick the nth option from the list that opens
        const options = this.page.locator('[class*="option"], [class*="Option"], li[role="option"]');
        await options.nth(nthOption - 1).waitFor({ state: 'visible', timeout: 8000 });
        const optionText = await options.nth(nthOption - 1).textContent();
        console.log(`Selecting course option #${nthOption}: ${optionText?.trim()}`);
        await options.nth(nthOption - 1).click();
        await this.page.waitForTimeout(500);
    }

    // After submitting the brochure form, the confirmation page always shows
    // the "get-back" link. Waiting for it is the most reliable success signal.
    async getBrochureConfirmationText() {
        const backLink = this.page.locator('(//a[@class="get-back"])[1]');
        await backLink.waitFor({ state: 'visible', timeout: 15000 });
        const text = await backLink.textContent();
        console.log(`Brochure confirmation page loaded. Back link text: "${text?.trim()}"`);
        return text || 'confirmed';
    }

    // Click the exact "get-back" link on the brochure confirmation page to return to the ranking list
    async goBackToList() {
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(1500);

        // Exact XPath confirmed from live DOM
        const backLink = this.page.locator('(//a[@class="get-back"])[1]');
        await backLink.waitFor({ state: 'visible', timeout: 10000 });
        await backLink.click();

        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(1500);
    }

    // Click the nth university in the ranked list (1-based index).
    // NOTE: links have target="_blank" so clicking opens a new tab.
    // Instead we read the href and navigate directly on the same page.
    async clickNthUniversity(n) {
        const universityLinks = this.page.locator(
            'table tbody tr a[href*="/universities/"]'
        );

        const count = await universityLinks.count();
        console.log(`Found ${count} university links in ranking table.`);

        await universityLinks.nth(n - 1).waitFor({ state: 'visible', timeout: 15000 });
        const linkText = await universityLinks.nth(n - 1).textContent();
        const linkHref = await universityLinks.nth(n - 1).getAttribute('href');
        console.log(`Navigating to university #${n}: ${linkText?.trim()} → ${linkHref}`);

        // Navigate directly to avoid target="_blank" opening a separate tab
        await this.page.goto(linkHref, { waitUntil: 'domcontentloaded' });
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    }

    // Click the Compare button on the university detail page.
    // This navigates to the dedicated compare page (compare-{uni}-{id}).
    // Then clicks "Add College" to reveal the suggestion search interface.
    async clickCompare() {
        const compareButton = this.page.locator('//button[contains(., "Compare")]').first();
        await compareButton.waitFor({ state: 'visible', timeout: 10000 });
        await compareButton.scrollIntoViewIfNeeded();
        await compareButton.click();
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(2000);

        // On the compare page, click "Add College" placeholder to reveal the suggestion list
        // DOM confirmed: the add college area reveals the search-input-container
        const addCollege = this.page
            .locator('[class*="add-college"], [class*="addCollege"], text="Add College"')
            .or(this.page.locator('//div[contains(text(),"Add College")] | //span[contains(text(),"Add College")]'))
            .first();

        if (await addCollege.isVisible().catch(() => false)) {
            await addCollege.click();
            await this.page.waitForTimeout(1500);
            
            // Try to select the second suggestion to ensure Compare Now becomes active
            const suggestions = this.page.locator('li, [class*="suggestion"], [class*="item"]').filter({ hasText: /University/i });
            if (await suggestions.nth(1).isVisible().catch(() => false)) {
                await suggestions.nth(1).click();
                await this.page.waitForTimeout(1000);
            } else if (await suggestions.first().isVisible().catch(() => false)) {
                await suggestions.first().click();
                await this.page.waitForTimeout(1000);
            }
        }
    }


    async clickCompareNow() {
        const compareBtn = this.page.locator('text=/Compare [Nn]ow/').first();
        if (await compareBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
            await compareBtn.click({ force: true });
            await this.page.waitForTimeout(4000);
        } else {
            // Backup locator if it's just 'Compare'
            const backupBtn = this.page.locator('button, a').filter({ hasText: /^Compare$/i }).last();
            if (await backupBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
                await backupBtn.click({ force: true });
                await this.page.waitForTimeout(4000);
            }
        }
    }

    // Verify the comparison result view is visible
    async getComparisonContent() {
        const comparisonView = this.page
            .locator('[class*="compare"], [class*="comparison"], [id*="compare"]')
            .first();

        await comparisonView.waitFor({ state: 'visible', timeout: 15000 });
        return await comparisonView.textContent();
    }
}

module.exports = { ShikshaStudyAbroadPage };
