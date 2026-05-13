class ShikshaOnlinePage {
    constructor(page) {
        this.page = page;

        
        this.shikshaOnlineLink = page.locator('//a[@lang="en" and contains(text(),"Shiksha Online")]').first();
        this.managementLink = page.getByRole('link', { name: 'Management' }).first();
        this.firstCourse = page.locator('//a[contains(@href,"course")] | //article//a').first();

        this.specializationLocators = {
            spec1: page.getByLabel('Marketing Analytics')
        };

        this.courseLocators = {
            course1: page.locator('//input[@id="Certificate_193"]')
        };

        this.ratingLocators = {
            star4: page.locator('//*[@id="4 - 5 Star_r4"]')
        };

        this.feeLocators = {
            range1: page.getByLabel('Free'),
            range2: page.getByLabel('Upto Rs. 1,000'),
            range3: page.getByLabel('Rs. 1,000 to 5,000')
        };

        this.durationLocators = {
            short: page.getByLabel('Less than 1 month')
        };

        this.modeLocators = {
            online: page.locator('//*[@id="Online_et_21::dm_39"]')
        };
    }


    async goTo() {
        await this.page.goto('https://www.shiksha.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000,
        });
        await this.page.waitForTimeout(5000);
    }

    async clickShikshaOnline() {
        await this.shikshaOnlineLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.shikshaOnlineLink.click();
        await this.page.waitForTimeout(4000);
    }

    async clickManagement() {
        await this.managementLink.waitFor({ state: 'visible', timeout: 30000 });
        await this.managementLink.click();
        await this.page.waitForTimeout(4000);
    }

    async applySpecializationFilters(spec1Name, spec2Name) {
        await this.specializationLocators.spec1.scrollIntoViewIfNeeded();
        await this.specializationLocators.spec1.click();
        await this.page.waitForTimeout(2000);
    }

    async applyCoursesFilter(courseName) {
        await this.courseLocators.course1.scrollIntoViewIfNeeded();
        await this.courseLocators.course1.click();
        await this.page.waitForTimeout(3000);
    }

    async applyRatingFilter(ratingValue) {
        await this.ratingLocators.star4.scrollIntoViewIfNeeded();
        await this.ratingLocators.star4.click();
        await this.page.waitForTimeout(3000);
    }

    async applyFeesFilters(f1, f2, f3) {
        await this.feeLocators.range1.click();
        await this.page.waitForTimeout(1000);
        await this.feeLocators.range2.click();
        await this.page.waitForTimeout(1000);
        await this.feeLocators.range3.click();
        await this.page.waitForTimeout(3000);
    }

    async applyDurationFilter(duration) {
        await this.durationLocators.short.scrollIntoViewIfNeeded();
        await this.durationLocators.short.click();
        await this.page.waitForTimeout(3000);
    }

    async applyModeFilter(mode) {
        await this.modeLocators.online.scrollIntoViewIfNeeded();
        await this.modeLocators.online.click();
        await this.page.waitForTimeout(3000);
    }


    async assertPageLoaded(expectedText) {
        const heading = this.page.locator(
            `//h1[contains(text(),"${expectedText}")] | //h2[contains(text(),"${expectedText}")] | //h3[contains(text(),"${expectedText}")]`
        ).first();
        const isVisible = await heading.isVisible().catch(() => false);
        return isVisible;
    }

    async assertResultsExist() {
        const results = this.page.locator('//a[contains(@href,"course")] | //article').first();
        await results.waitFor({ state: 'visible', timeout: 15000 });
        const count = await this.page.locator('//a[contains(@href,"course")] | //article').count();
        return count > 0;
    }

    async assertFirstCourseExists() {
        await this.firstCourse.waitFor({ state: 'visible', timeout: 15000 });
        return await this.firstCourse.isVisible();
    }

    async clickFirstCourse() {
        await this.firstCourse.waitFor({ state: 'visible', timeout: 15000 });
        await this.firstCourse.scrollIntoViewIfNeeded();
        await this.firstCourse.click();
        await this.page.waitForTimeout(4000);
    }


    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = `screenshots/${name}_${timestamp}.png`;
        await this.page.screenshot({ path: filePath, fullPage: true });
        return filePath;
    }
}

module.exports = { ShikshaOnlinePage };