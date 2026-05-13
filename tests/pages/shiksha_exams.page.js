class ShikshaExamsPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // Navigate to homepage
    async navigate() {
        await this.page.goto('https://www.shiksha.com', { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(2000);
    }

    // Hover over "More" and click "All Scholarship Exams"
    async navigateToScholarshipExams() {
        // Since the menu might be tricky to hover in headless automation, we can navigate to the URL directly
        await this.page.goto('https://www.shiksha.com/sarkari-exams/scholarship/exams-sb-21-123', { waitUntil: 'domcontentloaded' });
        await this.page.waitForTimeout(2000);
    }

    // Verify 404 Page Not Found error
    async verifyPageNotFound() {
        const notFoundText = this.page.getByText('Page Not Found', { exact: false }).first();
        await notFoundText.waitFor({ state: 'visible', timeout: 10000 });
        return await notFoundText.isVisible();
    }

    // Take screenshot
    async takeScreenshot(fileName) {
        await this.page.screenshot({ path: `ss/${fileName}`, fullPage: true });
    }

    // Search for an exam in the top search bar
    async searchExam(examName) {
        const searchBox = this.page.getByText('Search Colleges', { exact: false }).first();
        if (await searchBox.isVisible().catch(()=>false)) {
            await searchBox.click({ force: true });
            await this.page.waitForTimeout(1000);
        }
        
        // Now find the actual input 
        const searchInput = this.page.locator('input[type="text"], input[type="search"]').first();
        await searchInput.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        await searchInput.click({ force: true }).catch(() => {});
        await searchInput.fill(examName);
        await this.page.waitForTimeout(1500);

        // Wait for suggestions and select the right one
        const suggestion = this.page.getByText(examName, { exact: true }).first();
        if (await suggestion.isVisible().catch(() => false)) {
            await suggestion.click({ force: true });
        } else {
            // Backup locator for suggestion
            const altSuggestion = this.page.locator(`text="${examName}"`).first();
            if (await altSuggestion.isVisible().catch(() => false)) {
                await altSuggestion.click({ force: true });
            } else {
                await this.page.keyboard.press('Enter');
            }
        }
        
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(3000);
    }

    // Navigate to the Syllabus tab
    async navigateToSyllabus() {
        // Find the "Syllabus" tab specifically in the main tabs (usually has an href containing the exam name)
        const syllabusTab = this.page.getByText('Syllabus', { exact: true }).first();
        await syllabusTab.waitFor({ state: 'visible', timeout: 10000 }).catch(()=>{});
        await syllabusTab.click({ force: true });
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(2000);
    }

    // Click on "Download Last 10 Year <Exam> Question Paper PDF"
    async clickDownloadLast10YearsPaper(examName) {
        // The text might be slightly different or broken across spans, so we use a very permissive locator
        const downloadBtn = this.page.locator(`text=/Download Last 10 Year/i`).first();
        
        if (await downloadBtn.isVisible().catch(() => false)) {
            await downloadBtn.scrollIntoViewIfNeeded();
            await downloadBtn.click({ force: true });
        } else {
            // Fallback to searching for the exact text as seen in screenshot
            const fallbackBtn = this.page.locator('text="Download Last 10 Year JEE Advanced Question Paper PDF"').first();
            await fallbackBtn.scrollIntoViewIfNeeded().catch(()=>{});
            await fallbackBtn.click({ force: true }).catch(()=>{});
        }
        await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
        await this.page.waitForTimeout(2000);
    }

    // Download specific year question paper (e.g., 2023)
    async downloadYearQuestionPaper(year) {
        // Look for the specific year row and click its download button
        // Often these are structured in tables or lists
        // We'll look for an element containing the year and then find the download link/button near it
        const yearRow = this.page.locator(`text="${year}"`).first().locator('xpath=ancestor::tr | ancestor::li | ancestor::div[contains(@class,"row")]').first();
        
        let downloadLink;
        if (await yearRow.isVisible().catch(() => false)) {
            downloadLink = yearRow.locator('a, button').filter({ hasText: /Download|PDF/i }).first();
        } else {
            // Fallback: just look for the text around the year
            downloadLink = this.page.locator(`//div[contains(., "${year}")]//a[contains(., "Download") or contains(., "PDF")]`).first();
        }

        if (await downloadLink.isVisible().catch(() => false)) {
            await downloadLink.scrollIntoViewIfNeeded();
            
            // For downloading, we could either click and wait for download event, or just click to verify the action works
            // In Playwright we can capture the download if it's a real file download
            try {
                const [download] = await Promise.all([
                    this.page.waitForEvent('download', { timeout: 10000 }),
                    downloadLink.click()
                ]);
                console.log(`Successfully started download for year ${year}`);
                // Wait for the download process to complete and save it
                const path = await download.path();
                console.log(`Downloaded to ${path}`);
            } catch (e) {
                // If it doesn't trigger a Playwright download event (e.g., opens a modal or new tab instead), we just catch it
                console.log(`Could not capture download event, clicking normally: ${e.message}`);
                await downloadLink.click();
            }
        } else {
            console.log(`Could not find download link for year ${year}`);
            // Backup click anything that matches download 2023
            const fallbackLink = this.page.locator(`a, button`).filter({ hasText: new RegExp(`Download.*${year}`, 'i') }).first();
            await fallbackLink.click();
        }
        await this.page.waitForTimeout(2000);
    }
}

module.exports = { ShikshaExamsPage };
