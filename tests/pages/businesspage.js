const { expect } = require('@playwright/test');

class EngineeringPage {

    constructor(page) {

        this.page = page;

        // Popup
        this.closePopupBtn = page.locator('//button[contains(@class,"close") or contains(@class,"Close")]');

        // Navigation Menu
        this.engineeringMenu = page.locator("text=Engineering").first();
        this.topEngineeringColleges = page.locator("text=Top Engineering Colleges").first();

        // Filters
       this.locationFilter = page.locator('//span[contains(text(),"Location")]');
       this.delhiOption = page.locator('(//label[@class="checkbox-label lead"])[1]');

//         this.courseFilter = page.locator('//span[contains(text(),"Course")]').first();
//         this.btechOption = page.getByText('B.E/B.Tech', {
//     exact: true
// }).first();

        this.specializationFilter = page.locator('//span[contains(text(),"Specialization")]');
        this.cseOption = page.locator('(//label[contains(.,"Computer Science Engineering")])[1]');

        this.collegeTypeFilter = page.locator('//span[contains(text(),"College Type")]');
        this.privateOption = page.locator('(//label[contains(.,"Private")])[1]');

        this.ratingOption = page.locator('(//label[contains(.,"4 - 5 Star")])[1]');

        // College Results
        this.collegeCards = page.locator("(//h4[@class='f14_bold link'])[1]");

        // College Sections
        this.overviewSection = page.getByText('Overview', { exact: false }).first();
        this.feesSection = page.getByText('Fees', { exact: false }).first();
        this.placementSection = page.getByText('Placements', { exact: false }).first();
        this.admissionSection = page.getByText('Admissions', { exact: false }).first();
        this.courseSection = page.getByText('Courses', { exact: false }).first();
    }


 async launchWebsite() {

    await this.page.goto('https://www.shiksha.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
}

    async closePopupIfPresent() {

        try {

            if (await this.closePopupBtn.isVisible({ timeout: 5000 })) {

                await this.closePopupBtn.click();
            }

        } catch (error) {

            console.log('Popup not displayed');
        }
    }


    async hoverEngineeringMenu() {

        await this.engineeringMenu.hover();
    }


    async clickTopEngineeringColleges() {

        await this.topEngineeringColleges.click();
    }


    async verifyEngineeringPage() {

        await expect(this.page).toHaveURL(/engineering/);
    }


  async selectLocation() {

    await this.page.waitForTimeout(5000);

    await this.delhiOption.waitFor({
        state: 'visible',
        timeout: 10000
    });

    await this.delhiOption.click();
}

// async selectCourse() {

//     await this.page.waitForTimeout(3000);

//     await this.btechOption.scrollIntoViewIfNeeded();

//     await this.btechOption.click({
//         force: true
//     });
// }


    async selectSpecialization() {

    await this.page.waitForTimeout(3000);

    await this.cseOption.scrollIntoViewIfNeeded();

    await this.cseOption.click({
        force: true
    });
}

async selectCollegeType() {

    await this.page.waitForTimeout(3000);

    await this.privateOption.scrollIntoViewIfNeeded();

    await this.privateOption.click({
        force: true
    });
}

async selectRanking() {

    await this.page.waitForTimeout(3000);

    await this.ratingOption.scrollIntoViewIfNeeded();

    await this.ratingOption.click({
        force: true
    });
}


    async verifyFilteredResults() {

        await expect(this.collegeCards.first()).toBeVisible();
    }


    async openFirstCollege() {

        await this.collegeCards.first().click();
        // Wait for the college details page to load
        await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
        await this.page.waitForTimeout(2000); // Additional wait for dynamic content
    }


    async verifyCollegePage() {

        try {
            await expect(this.overviewSection).toBeVisible({ timeout: 15000 });
        } catch (error) {
            console.log('Overview section not found, page title:', await this.page.title());
            console.log('Page URL:', this.page.url());
            throw error;
        }
    }


    async verifyOverviewSection() {

        await expect(this.overviewSection).toBeVisible({ timeout: 15000 });
    }


    async verifyFeesSection() {

        await expect(this.feesSection).toBeVisible({ timeout: 15000 });
    }


    async verifyPlacementSection() {

        await expect(this.placementSection).toBeVisible({ timeout: 15000 });
    }


    async verifyAdmissionSection() {

        await expect(this.admissionSection).toBeVisible({ timeout: 15000 });
    }


    async verifyCourseSection() {

        await expect(this.courseSection).toBeVisible({ timeout: 15000 });
    }
}

module.exports = EngineeringPage;