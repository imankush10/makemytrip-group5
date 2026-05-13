// const { expect } = require('@playwright/test');

// class EngineeringPage {

//     constructor(page) {

//         this.page = page;

//         // Popup
//         this.closePopupBtn = page.locator('//button[contains(@class,"close") or contains(@class,"Close")]');

//         // Navigation Menu
//         this.engineeringMenu = page.locator("text=Engineering").first();
//         this.topEngineeringColleges = page.locator("text=Top Engineering Colleges").first();

//         // Filters
//        this.locationFilter = page.locator('//span[contains(text(),"Location")]');
//        this.delhiOption = page.locator('(//label[@class="checkbox-label lead"])[1]');

// //         this.courseFilter = page.locator('//span[contains(text(),"Course")]').first();
// //         this.btechOption = page.getByText('B.E/B.Tech', {
// //     exact: true
// // }).first();

//         this.specializationFilter = page.locator('//span[contains(text(),"Specialization")]');
//         this.cseOption = page.locator('(//label[contains(.,"Computer Science Engineering")])[1]');

//         this.collegeTypeFilter = page.locator('//span[contains(text(),"College Type")]');
//         this.privateOption = page.locator('(//label[contains(.,"Private")])[1]');

//         this.ratingOption = page.locator('(//label[contains(.,"4 - 5 Star")])[1]');

//         // College Results
//         this.collegeCards = page.locator("(//h4[@class='f14_bold link'])[1]");

//         // College Sections
//         this.overviewSection = page.locator('text=Overview');
//         this.feesSection = page.locator("//a[@title='Sharda University Fees']");
//         this.placementSection = page.locator("//a[@title='Sharda University Placements 2026']");
//         this.admissionSection = page.locator("//a[@title='Sharda University Admissions 2026']");
//         this.courseSection = page.locator("//a[@title='Sharda University Courses']");
//     }


//  async launchWebsite() {

//     await this.page.goto('https://www.shiksha.com/', {
//         waitUntil: 'domcontentloaded',
//         timeout: 60000
//     });
// }

//     async closePopupIfPresent() {

//         try {

//             if (await this.closePopupBtn.isVisible({ timeout: 5000 })) {

//                 await this.closePopupBtn.click();
//             }

//         } catch (error) {

//             console.log('Popup not displayed');
//         }
//     }


//     async hoverEngineeringMenu() {

//         await this.engineeringMenu.hover();
//     }


//     async clickTopEngineeringColleges() {

//         await this.topEngineeringColleges.click();
//     }


//     async verifyEngineeringPage() {

//         await expect(this.page).toHaveURL(/engineering/);
//     }


//   async selectLocation() {

//     await this.page.waitForTimeout(5000);

//     await this.delhiOption.waitFor({
//         state: 'visible',
//         timeout: 10000
//     });

//     await this.delhiOption.click();
// }

// // async selectCourse() {

// //     await this.page.waitForTimeout(3000);

// //     await this.btechOption.scrollIntoViewIfNeeded();

// //     await this.btechOption.click({
// //         force: true
// //     });
// // }


//     async selectSpecialization() {

//     await this.page.waitForTimeout(3000);

//     await this.cseOption.scrollIntoViewIfNeeded();

//     await this.cseOption.click({
//         force: true
//     });
// }

// async selectCollegeType() {

//     await this.page.waitForTimeout(3000);

//     await this.privateOption.scrollIntoViewIfNeeded();

//     await this.privateOption.click({
//         force: true
//     });
// }

// async selectRanking() {

//     await this.page.waitForTimeout(3000);

//     await this.ratingOption.scrollIntoViewIfNeeded();

//     await this.ratingOption.click({
//         force: true
//     });
// }


//     async verifyFilteredResults() {

//         await expect(this.collegeCards.first()).toBeVisible();
//     }


//     async openFirstCollege() {

//         await this.collegeCards.first().click();
//     }


//     async verifyCollegePage() {

//         await expect(this.overviewSection).toBeVisible();
//     }


//     async verifyOverviewSection() {

//         await expect(this.overviewSection).toBeVisible();
//     }


//     async verifyFeesSection() {

//         await expect(this.feesSection).toBeVisible();
//     }


//     async verifyPlacementSection() {

//         await expect(this.placementSection).toBeVisible();
//     }


//     async verifyAdmissionSection() {

//         await expect(this.admissionSection).toBeVisible();
//     }


//     async verifyCourseSection() {

//         await expect(this.courseSection).toBeVisible();
//     }
// }

// module.exports = { EngineeringPage };