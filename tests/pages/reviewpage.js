class ReviewPage {
    constructor(page, expect) {
        this.page   = page
        this.expect = expect

        // ── Main page ─────────────────────────────────────────────────────────
        this.writeReviewLink = page.locator('//a[text()="Write Review"]')

        // ── Review form - page 1 ──────────────────────────────────────────────
        this.emailTF          = null  // initialized after new tab opens
        this.fullNameTF       = null
        this.genderSF         = null
        this.collegeTF        = null
        this.suggestionList   = null
        this.locationSF       = null
        this.courseTF         = null
        this.graduationSF     = null
        this.upiTF            = null
        this.tncCheckbox      = null
        this.mobileTF         = null
        this.nextBtn          = null
        this.phoneErrorMsg    = null

        // ── Review form - page 2 ──────────────────────────────────────────────
        this.submitBtn        = null
    }

    // ── Called after new tab opens ────────────────────────────────────────────

    initNewPage(newPage) {
        this.newPage = newPage

        this.emailTF       = newPage.getByPlaceholder('name@email.com')
        this.fullNameTF    = newPage.getByPlaceholder('Enter Full Name')
        this.genderSF      = newPage.locator('//select[@name="gender"]')
        this.collegeTF     = newPage.getByPlaceholder('Select Your College')
        this.suggestionList = newPage.locator('#suggestionList')
        this.locationSF    = newPage.locator('//select[@name="location"]')
        this.courseTF      = newPage.locator('//div[text()="Select Course"]/following-sibling::div/input')
        this.graduationSF  = newPage.locator('//select[@name="yearOfGraduation"]')
        this.upiTF         = newPage.getByPlaceholder('Enter UPI')
        this.tncCheckbox   = newPage.locator('//div[@class="tncBoxOnRvw"]//input')
        this.mobileTF      = newPage.getByPlaceholder('Enter Mobile Number')
        this.nextBtn       = newPage.locator('#nxtBtn')
        this.phoneErrorMsg = newPage.locator('//span[@class="cr-err-msg"]').last()
        this.submitBtn     = newPage.locator('//input[@type="submit"]')
    }

    // ── Page 1 actions ────────────────────────────────────────────────────────

    async fillEmail(email) {
        await this.emailTF.fill(email)
    }

    async fillFullName(name) {
        await this.fullNameTF.fill(name)
    }

    async selectGender(gender) {
        await this.genderSF.selectOption(gender)
    }

    async fillCollegeAndSelectFirst(collegeName) {
        await this.collegeTF.fill(collegeName)
        await this.suggestionList.first().click()
    }

    async selectLocation() {
        await this.locationSF.selectOption({ index: 1 })
    }

    async fillCourseAndSelectFirst(course) {
        await this.courseTF.pressSequentially(course, { delay: 100 })
        await this.newPage.waitForTimeout(500)
        await this.newPage.keyboard.press('Tab')
    }

    async selectGraduationYear(year) {
        await this.graduationSF.selectOption(year)
    }

    async fillUpi(upi) {
        await this.upiTF.fill(upi)
    }

    async uncheckTnc() {
        await this.tncCheckbox.uncheck()
    }

    async fillMobileNumber(number) {
        await this.mobileTF.fill(number)
    }

    async clickNext() {
        await this.nextBtn.click()
    }

    // ── Page 2 actions ────────────────────────────────────────────────────────

    async fillReviewSection(sectionIndex, reviewText) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//textarea`).fill(reviewText)
    }

    async selectStarRating(sectionIndex) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//i[5]`).click()
    }

    async selectBothStarRatingsInSection(sectionIndex) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//div[@class="inputBox"][1]//i[5]`).click()
        await this.newPage.locator(`//form/div[${sectionIndex}]//div[@class="inputBox"][2]//i[5]`).click()
    }

    async fillShortComment(sectionIndex, comment) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//textarea`).fill(comment)
    }

    async fillFeeAmount(sectionIndex, amount) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//input`).fill(amount)
    }

    async checkYesRecommendation(sectionIndex) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//label[@for="rcmndedYes"]`).check()
    }

    async fillAdditionalComments(sectionIndex, comment) {
        await this.newPage.locator(`//form/div[${sectionIndex}]//textarea`).fill(comment)
    }

    async clickSubmit() {
        await this.submitBtn.click()
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    async verifyPhoneErrorMessage(expectedText) {
        await this.expect(this.phoneErrorMsg).toContainText(new RegExp(expectedText))
    }

    async takeScreenshot(path) {
        await this.newPage.screenshot({ path })
    }
}

module.exports = { ReviewPage }