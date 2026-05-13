class CollegeComparePage {
    constructor(page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://www.shiksha.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
        await this.page.waitForTimeout(5000);
        const title = await this.page.title();
    }

    async clickMbaTab() {
        await this.page.locator('//a[text()="MBA"]').first().hover();
        await this.page.waitForTimeout(2000);
    }

    async clickTopRankedColleges() {
        await this.page.locator('//a[text()="MBA"]').first().hover();
        await this.page.waitForTimeout(1500);
        await this.page.locator('//a[text()="Top Ranked Colleges"]').first().click();
        await this.page.waitForTimeout(3000);
    }

    async clickTopMBACollegesInIndia() {
        await this.page.locator('//a[text()="Top MBA Colleges in India"]').first().click();
        await this.page.waitForTimeout(4000);
        const url = this.page.url();
    }

    async clickIIMAhmedabad() {
        const iimLink = this.page.locator('//a[@title="IIM Ahmedabad - Indian Institute of Management"]').first();
        const isVisible = await iimLink.isVisible();
        if (!isVisible) {
            throw new Error('IIM Ahmedabad link not found on the page');
        }
        await iimLink.scrollIntoViewIfNeeded();
        await iimLink.click();
        await this.page.waitForTimeout(4000);
    }

    async clickCompareButton() {
        await this.page.locator('//button[text()="Compare"]').first().scrollIntoViewIfNeeded();
        await this.page.locator('//button[text()="Compare"]').first().click();
        await this.page.waitForTimeout(3000);
    }

    async searchCollege(collegeName) {
        const searchInput = this.page.locator('//input[contains(@placeholder,"Search")]').first();
        const isVisible = await searchInput.isVisible();
        if (!isVisible) {
            throw new Error('Search input not found in compare modal');
        }
        await searchInput.clear();
        await searchInput.fill(collegeName);
        await this.page.waitForTimeout(2000);
    }

    async selectCollegeFromSuggestions(collegeName) {
        const suggestion = this.page.locator(`//li[contains(text(),"${collegeName}")]`).first();
        const isVisible = await suggestion.isVisible();
        if (!isVisible) {
            throw new Error(`Suggestion not found for: ${collegeName}`);
        }
        await suggestion.click();
        await this.page.waitForTimeout(2000);
    }

    async clickCompareNow() {
        await this.page.locator('//button[contains(text(),"Compare now") or contains(text(),"Compare Now")]').first().waitFor({ state: 'visible', timeout: 15000 });
        await this.page.locator('//button[contains(text(),"Compare now") or contains(text(),"Compare Now")]').first().click();
        await this.page.waitForTimeout(4000);
    }

    async clickAddCollege() {
        const addCollegeImg = this.page.locator('//img[contains(@class,"a7cd1d") and contains(@class,"b5fe9a")]').first();
        await addCollegeImg.waitFor({ state: 'visible', timeout: 15000 });
        await this.page.evaluate(() => {
            const el = document.querySelector('img.a7cd1d.b5fe9a');
            el.click();
        });
        await this.page.waitForTimeout(3000);
    }

    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `screenshots/${name}_${timestamp}.png`;
        await this.page.screenshot({ path: filePath, fullPage: true });
        return filePath;
    }
}

module.exports = { CollegeComparePage };