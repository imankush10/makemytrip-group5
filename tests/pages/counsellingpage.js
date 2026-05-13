class CounsellingPage {
    constructor(page, expect) {
        this.page   = page
        this.expect = expect

        // ── Nav ───────────────────────────────────────────────────────────────
        this.counsellingTab        = page.locator('(//div[@id="_innerNav"]/ul/li)[7]')
        this.careersAfter12thLink  = page.locator('(//div[@id="_innerNav"]/ul/li)[7]//li[@key="Careers after 12th"]')
        this.scienceLink           = page.locator('((//div[@id="_innerNav"]/ul/li)[7]//li[@key="Careers after 12th"]//li)[2]')

        // ── Stream page ───────────────────────────────────────────────────────
        this.streamHeading         = page.locator('//h2[@class="stream-title"]')
        this.maxChoiceText         = page.locator('//h1[@class="choice-option"]/strong')
        this.allChoiceInputs       = page.locator('//ul[@id="stream-details"]//input')
        this.continueBtn           = page.locator('//input[@value="Continue"]')
        this.closePopupBtn         = page.locator('//div[@id="close2"]')

        // ── Results page ──────────────────────────────────────────────────────
        this.careersFoundHeading   = page.locator('//div[@class="suggestion-header"]/h1')
    }

    async launch(url) {
        await this.page.goto(url)
    }

    // ── Nav actions ───────────────────────────────────────────────────────────

    async clickCounsellingTab() {
        await this.counsellingTab.click()
    }

    async clickCareersAfter12th() {
        await this.careersAfter12thLink.click()
    }

    async clickScienceLink() {
        await this.scienceLink.click()
    }

    // ── Choice selection ──────────────────────────────────────────────────────

    async selectMaxAllowedChoices() {
        let maxText = await this.maxChoiceText.textContent()
        this.maxAllowedChoice = Number(maxText.replace("Max ", ""))
        this.selectedChoices  = []

        for (let i = 1; i <= this.maxAllowedChoice; i++) {
            await this.page.locator(`//ul[@id="stream-details"]//input[@id="${i}"]`).check()
            const label = await this.page.locator(`//ul[@id="stream-details"]//input[@id="${i}"]/parent::label`).textContent()
            this.selectedChoices.push(label)
        }
    }

    async clickContinue() {
        await this.continueBtn.click()
    }

    async closePopup() {
        await this.closePopupBtn.click()
    }

    // ── Assertions ────────────────────────────────────────────────────────────

    async verifyStreamHeading(text) {
        await this.expect(this.streamHeading).toContainText(text)
    }

    async verifyRemainingChoicesDisabled() {
        const total = await this.allChoiceInputs.count()
        for (let i = this.maxAllowedChoice + 1; i <= total; i++) {
            await this.expect(
                this.page.locator(`//ul[@id="stream-details"]//input[@id="${i}"]`)
            ).toBeDisabled()
        }
    }

    async verifySelectedChoicesInList() {
        for (let i = 1; i < this.maxAllowedChoice; i++) {
            await this.expect(
                this.page.locator(`(//ul[@class="selection-items"]/li/em)[${i}]`)
            ).toContainText(this.selectedChoices[i - 1])
        }
    }

    async verifyCareersFoundCount(prefix) {
        let text = await this.careersFoundHeading.textContent()
        let count = parseFloat(text.replace(prefix, ""))
        await this.expect(count).toBeTruthy()
    }
    async takeScreenshot(path) {
        await this.page.screenshot({ path })
    }
}

module.exports = { CounsellingPage }