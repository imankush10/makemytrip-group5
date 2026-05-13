class Design {
    constructor(page, expect) {
        this.page = page
        this.expect = expect

        this.designTab               = page.locator('(//div[@id="_innerNav"]/ul/li)[4]')
        this.popularSpecSection      = page.locator('(//div[@id="_innerNav"]/ul/li)[4]//li[@key="Popular Specializations"]')
        this.gameDesignLink          = page.locator('((//div[@id="_innerNav"]/ul/li)[4]//li[@key="Popular Specializations"]//li)[7]')
        this.examsSection            = page.locator('(//div[@id="_innerNav"]/ul/li)[4]//li[@key="Exams"]')
        this.allDesignExamsLink      = page.locator('(//div[@id="_innerNav"]/ul/li)[4]//li[@key="Exams"]//li[last()]')

        this.pageH1                  = page.locator('//h1')

        this.trendingProgramsTab     = page.locator('//div[@class="trendingTagsWdgt"]/div/span[text()="Programs"]')
        this.trendingDropdown        = page.locator('//div[@class="trendingTagsWdgt"]/div/span[@class="fissyDropBox"]')
        this.trendingUGOption        = page.locator('(//div[@class="trendingTagsWdgt"]/div/div[@class="dropdownList "]//li)[1]')
        this.trendingNextBtn         = page.locator('//div[@class="trendingTagsWdgt"]//div[@class="paginationBox"]/div/a[@class="nxtData navBtn "]')
        this.trendingLastPercentage  = page.locator('//ul[@class="trendingDataList"]/li[last()]//span[@class="prcnt"]')

        this.viewAllExamsBtn         = page.locator('//button[contains(text(),"View All Exams")]')
        this.examPopupSecondLast     = page.locator('((//div[@id="exam_popupLayer"])[1]/div/div[last() - 2]//a)[1]')
        this.closeExamPopupBtn       = page.locator('//div[@id="exam_popupLayer"]/parent::div/preceding-sibling::div/a')

        this.popularCourseRatings    = page.locator('(//ul[@class="specialization-list"])[1]//span[@class="rating-block"]')

        this.allCommentsLink         = page.locator('//div[@class="ana--comments_btn"]/div/a')

        this.lastPaginationBtn       = page.locator('//ul[@class="pagniatn-ul"]/li')
        this.lastExamOnPage          = page.locator('//div[@class="pwaexams_container"]/div/div[last()]//p[@class="hide-examname"]/a')
    }


    async launch(url) {
        await this.page.goto(url)
    }

    async clickDesignTab() {
        await this.designTab.click()
    }

    async clickPopularSpecializations() {
        await this.popularSpecSection.click()
    }

    async clickGameDesignLink() {
        await this.gameDesignLink.click()
    }

    async clickExamsSection() {
        await this.examsSection.click()
    }

    async clickAllDesignExamsLink() {
        await this.allDesignExamsLink.click()
    }


    async scrollAndClickTrendingPrograms(scrollWaitMs = 420) {
        while (!(await this.trendingProgramsTab.isVisible())) {
            await this.page.keyboard.press('PageDown')
            await this.page.waitForTimeout(scrollWaitMs)
        }
        await this.trendingProgramsTab.click()
    }

    async clickTrendingDropdown() {
        await this.trendingDropdown.click()
    }

    async selectUGFromDropdown() {
        await this.trendingUGOption.click()
    }

    async clickTrendingNextPage() {
        await this.trendingNextBtn.click()
    }


    async clickViewAllExams() {
        await this.viewAllExamsBtn.click()
    }

    async closeExamPopup() {
        await this.closeExamPopupBtn.click()
    }


    async clickAllComments() {
        await this.allCommentsLink.click()
    }


    async clickLastPaginationButton() {
        await this.lastPaginationBtn.last().click()
    }


    async verifyHeadingContains(text) {
        await this.expect(this.pageH1).toContainText(text)
    }

    async verifyLastPercentageIs(expectedValue) {
        await this.expect(this.trendingLastPercentage).toHaveText(expectedValue)
    }

    async verifyExamPopupSecondLastContains(examName) {
        await this.expect(this.examPopupSecondLast).toContainText(examName)
    }

    async verifyAtLeastOneRatingAbove(minRating) {
        const ratings = await this.popularCourseRatings.allInnerTexts()
        const hasHighRating = ratings.some(r => parseFloat(r) >= minRating)
        await this.expect(hasHighRating).toBe(true)
    }

    async verifyLastExamContains(examName) {
        await this.expect(this.lastExamOnPage).toContainText(examName)
    }
    async takeScreenshot(path) {
        await this.page.screenshot({ path })
    }
}

module.exports = { Design }